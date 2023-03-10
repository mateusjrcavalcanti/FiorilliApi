import { Page } from 'puppeteer';
import { delay } from '.';
import { getLink } from './links';

export async function goPage(page: Page, url: string, link: string) {
  const { pageUrl } = getLink(link);

  console.log('Acessando link: ' + link);
  await delay(1000);
  await page?.evaluate((link) => eval(`ProcessaDados('${link}')`), link);

  const response = await page.waitForResponse(
    (response) =>
      response.url().includes('default.aspx/RecuperarDados') &&
      response.status() == 200,
  );

  await page?.goto(`${url}${pageUrl}`);
}
