import { Ano, Prisma, PrismaClient } from '@prisma/client';
import puppeteer, { Page, BrowserContext } from 'puppeteer';
import {
  defEntidade,
  defExercicio,
  delay,
  getColuns,
  getDadosEmpenho,
  getDadosEmpenhoFromList,
  getData,
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

interface receitasGeraisProps {
  workers?: number;
  ano: AnoWithEntidadeName;
}

const prisma = new PrismaClient();

export async function receitas({ workers, ano }: receitasGeraisProps) {
  const exercicio = `${ano.ano}`;
  const entidade = `${ano.entidadeName.name}`;
  const url = ano.entidadeName.entidade.portal.url;

  const browser = await puppeteer.launch(args);
  const context = await browser.createIncognitoBrowserContext();

  const receitas = await getAllReceitas(exercicio, entidade, url, context);
  const retorno = await saveReceitas({ ano, receitas });
  console.log(`Inserido no banco: ${retorno.length} registros`);

  await browser.close();
}

export default async function getAllReceitas(
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
  await goPage(page, url, 'lnkReceitaExtraOrcamentaria');
  await removeDadosConsolidados(page, url, 'lnkReceitaExtraOrcamentaria');

  const colunas = await getColuns(page, 'gridReceitas');
  let todasLinhas: any[] = [];
  do {
    await page.evaluate(() => eval('AtualizarGrid()'));
    await waitResponse(page, 'ReceitasPorEntidade.aspx');
    let linhas = await page.$$eval(
      `#gridReceitas_DXMainTable > tbody > tr.dxgvDataRow`,
      (elements: any) => {
        let linhas: any[] = [];
        elements.map((el: any) => {
          let linha: any[] = [];
          Array.from(el.children).map((col: any) => linha.push(col.innerText));
          linhas.push(linha);
        });
        return linhas;
      },
    );
    if (linhas.length) todasLinhas.push(...linhas);
    await page.evaluate(() =>
      eval(`aspxGVPagerOnClick('gridReceitas','PBN');`),
    );
  } while (
    await page.evaluate(
      () => document.querySelectorAll('img.dxWeb_pNext').length,
    )
  );

  let data = await getData(colunas, todasLinhas);
  for await (const linha of await data) {
    linha.Exercicio = linha.Data.split('/')[2];
  }
  return data;
}

async function saveReceitas({ ano, receitas }: { ano: Ano; receitas: any[] }) {
  let result = [];
  for await (const receita of receitas) await tratamento(receita);
  for await (const receita of receitas) {
    await prisma.receita.upsert({
      where: {
        Extra_Data: {
          Extra: receita.Extra,
          Data: receita.Data,
        },
      },
      update: {
        ...receita,
      },
      create: {
        anoId: ano?.id,
        ...receita,
      },
    });
    result.push({ receita });
  }
  return result;
}
