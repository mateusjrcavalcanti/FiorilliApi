export async function getColuns(page: any, idGrid: string) {
  await page.waitForSelector(`#${idGrid}_DXHeadersRow`, {
    visible: true,
  });
  const colunas = await page.evaluate((idGrid: string) => {
    let childrens: any = document.querySelectorAll(
      `#${idGrid}_DXHeadersRow > td > table > tbody > tr > td`,
    );
    let itens = [];
    for (let i = 0; i < childrens.length; i++) {
      itens.push(
        childrens[i].innerText.normalize('NFD').replace(/[^a-zA-Zs]/g, ''),
      );
    }
    return itens;
  }, idGrid);

  return colunas;
}
