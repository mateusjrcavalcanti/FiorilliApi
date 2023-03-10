import { Page } from 'puppeteer';

export async function defEntidade(page: Page, entidade: string) {
  console.log('Definindo entidade: ' + entidade);

  await page.waitForSelector('input[id=cmbEntidadeContabil_I]');
  const updated = await page.$eval(
    'input[id=cmbEntidadeContabil_I]',
    (el, entidade) => {
      if (el.getAttribute('value') !== entidade) {
        el.setAttribute('value', entidade);
        eval(`aspxETextChanged('cmbEntidadeContabil')`);
        return true;
      }
      return false;
    },
    entidade,
  );
  if (updated)
    await page.waitForResponse(
      (response) =>
        response.url().includes('Home.aspx') && response.status() == 200,
    );
}
