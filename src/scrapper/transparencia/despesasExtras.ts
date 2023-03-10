import { Ano, Prisma, PrismaClient } from '@prisma/client';
import puppeteer, { Page, BrowserContext } from 'puppeteer';
import {
  defEntidade,
  defExercicio,
  delay,
  getDadosEmpenho,
  getDadosEmpenhoFromList,
  getTotal,
  goPage,
  removeDadosConsolidados,
  responseType,
  tratamento,
  waitResponse,
} from './utils';
import args from './utils/args';

type AnoWithEntidadeName = Prisma.AnoGetPayload<{
  include: {
    entidadeName: {
      include: {
        entidade: {
          include: { portal: true };
        };
      };
    };
  };
}>;

interface DespesasGeraisProps {
  workers?: number;
  ano: AnoWithEntidadeName;
}

const prisma = new PrismaClient();

export async function despesasExtras({ workers, ano }: DespesasGeraisProps) {
  const exercicio = `${ano.ano}`;
  const entidade = `${ano.entidadeName.name}`;
  const url = ano.entidadeName.entidade.portal.url;

  const browser = await puppeteer.launch(args);
  const context = await browser.createIncognitoBrowserContext();

  const empenhos = await getAllExtra(exercicio, entidade, url, context);
  const retorno = await saveDespesasExtras({ ano, empenhos });
  console.log(`Inserido no banco: ${retorno.empenhos.length} registros`);

  await browser.close();
}

export default async function getAllExtra(
  exercicio: string,
  entidade: string,
  url: string,
  context: BrowserContext,
) {
  const page = await context.newPage();
  //await page.setCacheEnabled(false);
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await client.send('Network.clearBrowserCache');

  await page.goto(url);
  await defExercicio(page, exercicio);
  await defEntidade(page, entidade);
  await goPage(page, url, 'lnkDespesasPor_ExtraOrcamentaria');
  await removeDadosConsolidados(page, url, 'lnkDespesasPor_ExtraOrcamentaria');

  let empenhos: any[] = [];

  while (1) {
    await page.waitForSelector('td.CSS_lnkValor_ASPx');
    const links = await page.$$eval(
      '#gridDespesas_DXMainTable > tbody > tr.dxgvDataRow > td.CSS_lnkValor_ASPx',
      (e: any) => e.map((a: any) => a.getAttribute('onclick')),
    );

    for await (const link of links) {
      await page.evaluate((link: string) => eval(link), link);
      await waitResponse(page, 'RecuperarListaEmpenhos');
      await page?.waitForSelector('#btnVoltarDespesas', {
        visible: true,
        timeout: 15000,
      });
      //await delay(10 * 1000);
      empenhos = empenhos.concat(await getDadosEmpenhoFromList(page));
      await page?.evaluate(() =>
        eval(`javascript:__doPostBack('btnVoltarDespesas','')`),
      );

      await waitResponse(page, 'DespesasPorEntidade.aspx');
      await page?.waitForSelector('#chkMostrarDadosConsolidados', {
        timeout: 5000,
      });
    }

    if (
      await page.evaluate(
        () => document.querySelectorAll('img.dxWeb_pNext').length,
      )
    ) {
      await page.evaluate(() =>
        eval(`aspxGVPagerOnClick('gridDespesas','PBN')`),
      );
      await waitResponse(page, 'DespesasPorEntidade.aspx');
    } else break;
  }

  return empenhos;
}

async function saveDespesasExtras({
  ano,
  empenhos,
}: {
  ano: Ano;
  empenhos: any[];
}) {
  let result = [];
  for await (const empenho of empenhos) await tratamento(empenho);
  for await (const { liquidacoes, pagamentos, ...empenho } of empenhos) {
    const dbempenho = await prisma.empenho.upsert({
      where: {
        anoId_Numero: {
          anoId: ano?.id as number,
          Numero: empenho.Numero,
        },
      },
      update: {
        ...empenho,
      },
      create: {
        anoId: ano?.id,
        ...empenho,
      },
    });
    for await (const liquidacao of liquidacoes) {
      await prisma.liquidacao.upsert({
        where: {
          numero_epenhoId: {
            numero: liquidacao.numero,
            epenhoId: dbempenho.id,
          },
        },
        update: {
          ...liquidacao,
        },
        create: {
          epenhoId: dbempenho.id,
          ...liquidacao,
        },
      });
    }
    for await (const pagamento of pagamentos) {
      await prisma.pagamento.upsert({
        where: {
          numero_epenhoId: {
            numero: pagamento.numero,
            epenhoId: dbempenho.id,
          },
        },
        update: {
          ...pagamento,
        },
        create: {
          epenhoId: dbempenho.id,
          ...pagamento,
        },
      });
    }
    result.push({ empenho });
  }
  return { empenhos };
}
