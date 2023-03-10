export async function getDadosEmpenho(page: any) {
  let empenho: { [key: string]: string } = {};

  let iframe = await page.$('#_ifrLoaderWindow');
  let iframeContent = await iframe?.contentFrame();
  await iframeContent?.waitForSelector('#btnFecharDetalhe', {
    visible: true,
  });

  //-> Pegar todos os campos do formulario
  let campos = await iframeContent?.$$eval(
    `span.LabelDadosCampo`,
    (elements: any) =>
      elements.map((item: any) => {
        return { [item.id.replace('txt', '')]: item.innerText };
      }),
  );

  const historico = await iframeContent?.$$eval(
    `span.LabelDadosHistorico`,
    (elements: any) =>
      elements.map((item: any) => {
        if (item.id.replace('txt', '') == 'Historico') return item.innerText;
      }),
  );
  for await (const opt of historico) {
    if (opt !== null) empenho['Historico'] = opt;
  }

  //-> Pegar as liquidações
  let liquidacoes = await iframeContent.$$eval(
    `#gridParcelas_DXMainTable > tbody > tr.dxgvDataRow`,
    (elements: any) =>
      elements.map((item: any) => {
        let itens = item.getElementsByClassName('dxgv');
        return {
          numero: itens[1].innerText,
          data: itens[2].innerText,
          valor: itens[3].innerText,
          Vencimento: itens[4].innerText,
        };
      }),
  );
  //-> Pegar os pagamentos
  let pagamentos = await iframeContent.$$eval(
    `#gridPagamentos_DXMainTable > tbody > tr.dxgvDataRow`,
    (elements: any) =>
      elements.map((item: any) => {
        let itens = item.getElementsByClassName('dxgv');
        return {
          numero: itens[0].innerText,
          parcela: itens[1].innerText,
          data: itens[2].innerText,
          valor: itens[3].innerText,
          retencao: itens[4].innerText,
          pago: itens[5].innerText,
        };
      }),
  );

  for await (const campo of campos) {
    Object.keys(campo).forEach((k) => {
      if (!k.includes('ASPxPageControl')) empenho[k] = campo[k];
    });
  }

  //await iframeContent?.evaluate(() => eval(`FecharDetalhes()`));

  await Promise.all([
    iframeContent.click('#btnFecharDetalhe'),
    //page.waitForNavigation(),
  ]);

  empenho = { ...empenho, liquidacoes, pagamentos };
  //console.log(empenho);

  return empenho;
}
