import { Page } from 'puppeteer';
import { getDadosEmpenho } from '.';

export async function getDadosEmpenhoFromList(page: Page) {
  let empenhos = [];
  await page?.waitForSelector('#gridDespesasEmpenhos_DXMainTable');

  //Recupera o total de dados
  let sumarioElement = await page.$('td.dxpSummary');
  let sumario = await page.evaluate(
    (el: any) => el.textContent,
    sumarioElement,
  );
  sumario = sumario.match(/(Total de linhas - )([\d\w\.]+)/)[2];
  for (let i = 0; i < sumario; i++) {
    await page.evaluate(
      (i: any) =>
        eval(
          `aspxGVCommandCustomButton('gridDespesasEmpenhos','btnDetalhes',${i})`,
        ),
      i,
    );
    await page.waitForResponse(
      (response) =>
        response.url().includes('DadosEmpenho.aspx') &&
        response.status() == 200,
    );
    empenhos.push(await getDadosEmpenho(page));
  }
  await page?.evaluate(() => eval(`VoltarDespesas()`));
  await page?.waitForSelector('#chkMostrarDadosConsolidados');
  return empenhos;
}
