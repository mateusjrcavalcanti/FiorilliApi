export async function responseType(page: any) {
  const type = await page.waitForResponse((response: any) => {
    return (
      (response.url().includes('DadosEmpenho.aspx') ||
        response.url().includes('DespesasEmpenhosLista')) &&
      response.status(200)
    );
  });
  return type;
}
