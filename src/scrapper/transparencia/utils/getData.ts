export async function getData(coluns: any[], lines: any[]) {
  let array = [];
  for (let i = 0; i < lines.length; i++) {
    let line: any = new Object();
    for (let j = 0; j < coluns.length; j++) {
      if (coluns[j] != '' && lines[i][j] != '') line[coluns[j]] = lines[i][j];
    }
    array[i] = line;
  }
  return JSON.parse(await JSON.stringify(array));
}
