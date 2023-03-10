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
interface GetDespesasProps {
  url: string;
  context: BrowserContext;
  exercicio: string;
  entidade: string;
  item: { start: number; end: number };
}

const prisma = new PrismaClient();

export async function despesasGerais({ workers, ano }: DespesasGeraisProps) {
  const exercicio = `${ano.ano}`;
  const entidade = `${ano.entidadeName.name}`;
  const url = ano.entidadeName.entidade.portal.url;

  const browser = await puppeteer.launch(args);
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  //await page.setCacheEnabled(false);

  const total = await getTotal(page, url, exercicio, entidade);
  console.log(`Total de despesas: ${total}`);
  await page.close();

  const perPage = Math.trunc(total / (workers || 1));
  const rest = total % (workers || 1);

  const itens: any[] = [];
  for (let i = 0; i < (workers || 1); i++) {
    const start = i * perPage;
    const end =
      i + 1 != (workers || 1) ? start + perPage : start + perPage + rest;
    itens.push({ start, end });
  }

  console.log('Grupos de dados de empenho:', itens);

  for await (const item of itens) {
    let empenhos: any[] = [];
    empenhos = await getDespesas({
      url,
      item,
      exercicio,
      entidade,
      context,
    });
    const retorno = await saveDespesasGerais({ ano, empenhos });
    console.log(`Inserido no banco: ${retorno.length} registros`);
  }

  await browser.close();
}

async function getDespesas({
  url,
  item,
  exercicio,
  entidade,
  context,
}: GetDespesasProps) {
  const page = await context.newPage();
  //await page.setCacheEnabled(false);
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await client.send('Network.clearBrowserCache');

  await page.goto(url);
  await defExercicio(page, exercicio);
  await defEntidade(page, entidade);
  await goPage(page, url, 'lnkDespesasPor_NotaEmpenho');
  await removeDadosConsolidados(page, url, 'lnkDespesasPor_NotaEmpenho');

  let empenhos: any[] = [];

  for (let i = item.start; i < item.end; i++) {
    console.log(`[${item.start + 1} - ${item.end}] - ${i + 1}`);

    await page.evaluate(
      (i) =>
        eval(`aspxGVCommandCustomButton('gridDespesas','btnDetalhes',${i})`),
      i,
    );
    await page.waitForResponse(
      (response) =>
        response.url().includes('DespesasPorEntidade.aspx') &&
        response.status() == 200,
    );
    const resType: any = await responseType(page);
    if (resType.url().includes('DadosEmpenho.aspx'))
      empenhos.push(await getDadosEmpenho(page));
    if (resType.url().includes('DespesasEmpenhosLista.aspx'))
      empenhos = empenhos.concat(await getDadosEmpenhoFromList(page));
  }

  await page.close();

  return empenhos;
}

async function saveDespesasGerais({
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
  return result;
}
