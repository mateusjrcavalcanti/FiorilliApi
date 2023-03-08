import puppeteer from "puppeteer";
import { Page } from "puppeteer";

export default async function getDespesa({
  baseURL,
  exercicio,
  numero,
}: {
  baseURL: string;
  exercicio: number;
  numero: string;
}) {
  const entidade =
    exercicio > 2022
      ? "CAMARA MUNICIPAL DE DORMENTES - PE"
      : "CAMARA MUNICIPAL DE DORMENTES";
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    args: [
      "--disable-web-security",
      "--enable-feature=NetworkService",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.goto(baseURL);

  await page.waitForSelector("input[name=cmbExercicio]");
  const anoElement = await page.$("input[name=cmbExercicio]");
  const anoAtual = await page.evaluate((el) => el?.value, anoElement);

  if (Number(anoAtual) != exercicio) {
    await page.evaluate(
      (el: any, exercicio: any) => el.setAttribute("value", `${exercicio}`),
      anoElement,
      exercicio
    );
    await page.evaluate(() => eval(`aspxETextChanged('cmbExercicio')`));
    await waitResponse(page, "AtualizaTabelaPesquisaGeral");
    console.log("Ano atualizado");
  }

  await page.waitForSelector("input[name=cmbEntidadeContabil]");
  const entidadeElement = await page.$("input[name=cmbEntidadeContabil]");
  const entidadeAtual = await page.evaluate((el) => el?.value, entidadeElement);
  if (entidadeAtual != entidade) {
    await page.evaluate(
      (el: any, entidade: string) => el.setAttribute("value", `${entidade}`),
      entidadeElement,
      entidade
    );
    await page.evaluate(() => eval(`aspxETextChanged('cmbEntidadeContabil')`));
    const teste = await waitResponse(page, "AtualizaTabelaPesquisaGeral");
    console.log("Entidade atualizada");
  }

  await delay(2 * 1000);
  // Navega para os empenhos
  await page.evaluate(() =>
    eval(`ProcessaDados('lnkDespesasPor_NotaEmpenho')`)
  );
  await waitResponse(page, "RecuperarDados");
  //page.waitForNavigation();
  await page.goto(`${baseURL}/DespesasPorEntidade.aspx`);

  // Remove os dados consolidados
  await page?.waitForSelector("#chkMostrarDadosConsolidados");
  await page?.$eval("input[name=chkMostrarDadosConsolidados]", (e) => {
    e.removeAttribute("checked");
    eval(`AtualizarGrid()`);
  });
  console.log("Dados consolidados removidos");

  await waitResponse(page, "DespesasPorEntidade.aspx");

  // Procurar pelo numero do emprenho
  await page.waitForSelector("input[id=gridDespesas_DXFREditorcol3_I]");
  const numEmpenhoElement = await page.$(
    "input[id=gridDespesas_DXFREditorcol3_I]"
  );
  await page.evaluate(
    (el: any, numero: string) => el.setAttribute("value", numero),
    numEmpenhoElement,
    numero
  );
  await page.evaluate(() =>
    eval(`aspxEValueChanged('gridDespesas_DXFREditorcol3')`)
  );
  console.log("Numero do empenho inserido");

  await waitResponse(page, "DespesasPorEntidade.aspx");
  await page.evaluate(() =>
    eval(`aspxGVCommandCustomButton('gridDespesas','btnDetalhes',0)`)
  );

  await waitResponse(page, "DadosEmpenho.aspx");
  const empenho = await getDadosEmpenho(page);
  console.log("Dados do empenho recuperados");

  await browser.close();
  console.log("Browser fechado");

  return empenho;
}

async function getDadosEmpenho(page: any) {
  let empenho: { [key: string]: string } = {};

  let iframe = await page.$("#_ifrLoaderWindow");
  let iframeContent = await iframe?.contentFrame();
  await iframeContent?.waitForSelector("#btnFecharDetalhe", {
    visible: true,
    timeout: 5000,
  });

  //-> Pegar todos os campos do formulario
  let campos = await iframeContent?.$$eval(
    `span.LabelDadosCampo`,
    (elements: any) =>
      elements.map((item: any) => {
        return { [item.id.replace("txt", "")]: item.innerText };
      })
  );

  const historico = await iframeContent?.$$eval(
    `span.LabelDadosHistorico`,
    (elements: any) =>
      elements.map((item: any) => {
        if (item.id.replace("txt", "") == "Historico") return item.innerText;
      })
  );
  for await (const opt of historico) {
    if (opt !== null) empenho["Historico"] = opt;
  }

  //   //-> Pegar as liquidações
  let liquidacoes = await iframeContent.$$eval(
    `#gridParcelas_DXMainTable > tbody > tr.dxgvDataRow`,
    (elements: any) =>
      elements.map((item: any) => {
        let itens = item.getElementsByClassName("dxgv");
        return {
          numero: itens[1].innerText,
          data: itens[2].innerText,
          valor: itens[3].innerText,
          Vencimento: itens[4].innerText,
        };
      })
  );
  //   //-> Pegar os pagamentos
  let pagamentos = await iframeContent.$$eval(
    `#gridPagamentos_DXMainTable > tbody > tr.dxgvDataRow`,
    (elements: any) =>
      elements.map((item: any) => {
        let itens = item.getElementsByClassName("dxgv");
        return {
          numero: itens[0].innerText,
          parcela: itens[1].innerText,
          data: itens[2].innerText,
          valor: itens[3].innerText,
          retencao: itens[4].innerText,
          pago: itens[5].innerText,
        };
      })
  );

  for await (const campo of campos) {
    Object.keys(campo).forEach((k) => {
      empenho[k] = campo[k];
    });
  }
  //await iframeContent?.evaluate(() => eval(`FecharDetalhes()`));
  empenho = { ...empenho, liquidacoes, pagamentos };
  return empenho;
}

async function getDadosEmpenhoFromList(page: any) {
  let empenhos = [];
  await page?.waitForSelector("#gridDespesasEmpenhos_DXMainTable", {
    setTimeout: 5000,
  });

  //Recupera o total de dados
  let sumarioElement = await page.$("td.dxpSummary");
  let sumario = await page.evaluate(
    (el: any) => el.textContent,
    sumarioElement
  );
  sumario = sumario.match(/(Total de linhas - )([\d\w\.]+)/)[2];
  for (let i = 0; i < sumario; i++) {
    await page.evaluate(
      (i: any) =>
        eval(
          `aspxGVCommandCustomButton('gridDespesasEmpenhos','btnDetalhes',${i})`
        ),
      i
    );
    await waitResponse(page, "DadosEmpenho.aspx");
    empenhos.push(await getDadosEmpenho(page));
  }
  await page?.evaluate(() => eval(`VoltarDespesas()`));
  await page?.waitForSelector("#chkMostrarDadosConsolidados", {
    timeout: 5000,
  });
  return empenhos;
}

async function waitResponse(page: Page, url: string) {
  return await page.waitForResponse(
    (response) => response.url().includes(url) && response.status() == 200
  );
}

export function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
