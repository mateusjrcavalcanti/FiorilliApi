import { Page } from 'puppeteer';

export * from './links';
export * from './removeDadosConsolidados';
export * from './goPage';
export * from './defExercicio';
export * from './defEntidade';
export * from './getTotal';
export * from './responseType';
export * from './getColuns';
export * from './getDadosEmpenho';
export * from './getDadosEmpenhoFromList';
export * from './tratamento';
export * from './args';
export * from './getData';

export async function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export async function waitResponse(page: Page, url: string) {
  const retorno = await page.waitForResponse(
    (response) => response.url().includes(url) && response.status() == 200,
  );
  return retorno;
}
