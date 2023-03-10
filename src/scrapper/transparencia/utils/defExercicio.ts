import { Page } from 'puppeteer';

export async function defExercicio(page: Page, exercicio: string) {
  console.log('Definindo exercio: ' + exercicio);

  await page.waitForSelector('input[id=cmbExercicio_I]');
  const updated = await page.$eval(
    'input[id=cmbExercicio_I]',
    (el, exercicio: string) => {
      if (el.getAttribute('value') !== exercicio) {
        el.setAttribute('value', exercicio);
        eval(`aspxETextChanged('cmbExercicio')`);
        return true;
      }
      return false;
    },
    exercicio,
  );
  if (updated)
    await page.waitForResponse(
      (response) =>
        response.url().includes('Home.aspx') && response.status() == 200,
    );
}
