import { Page } from 'puppeteer';
import { defEntidade, defExercicio, goPage, removeDadosConsolidados } from '.';

export async function getTotal(
  page: Page,
  url: string,
  exercicio: string,
  entidade: string,
) {
  console.log('Obtendo total de registros');
  await page.goto(url, {
    timeout: 60000,
  });

  await defExercicio(page, exercicio);
  await defEntidade(page, entidade);

  await goPage(page, url, 'lnkDespesasPor_NotaEmpenho');

  await removeDadosConsolidados(page, url, 'lnkDespesasPor_NotaEmpenho');

  const options = await page.$$eval('tr > td.dxpSummary', (elements) => {
    return elements.map((el) => el.textContent);
  });

  const RegExpMatch = options[0]?.match(
    /(Total de linhas - )([\d\w\.]+)/,
  ) as RegExpMatchArray;

  const sumario = Number(RegExpMatch[2]);

  return sumario;
}
