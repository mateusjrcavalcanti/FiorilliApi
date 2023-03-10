import { Page } from 'puppeteer';
import { getLink } from './links';

export async function removeDadosConsolidados(
  page: Page,
  url: string,
  link: string,
) {
  const { pageUrl } = getLink(link);

  console.log('Removendo filtro de dados consolidados');
  await page?.waitForSelector('#chkMostrarDadosConsolidados');
  await page?.$eval('input[name=chkMostrarDadosConsolidados]', (e) => {
    e.removeAttribute('checked');
    eval(`AtualizarGrid()`);
  });
  await page.waitForResponse(
    (response) => response.url().includes(pageUrl) && response.status() == 200,
  );
}
