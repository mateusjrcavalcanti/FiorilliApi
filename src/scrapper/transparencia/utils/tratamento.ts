import moment from 'moment';

export async function tratamento(dados: any) {
  Object.keys(dados).forEach(async (k) => {
    if (k == 'Data' || k == 'data' || k == 'Vencimento')
      dados[k] = new Date(moment(dados[k], 'DD/MM/YYYY').format('YYYY-MM-DD'));
    if (k == 'Exercicio' || k == 'Extra') dados[k] = Number(dados[k]);
    if (
      k == 'ValorEmpenhado' ||
      k == 'valor' ||
      k == 'Recebida' ||
      k == 'Concedida' ||
      k == 'retencao' ||
      k == 'pago' ||
      k == 'ArrecTotal'
    )
      dados[k] = Number(dados[k].replace('.', '').replace(',', '.'));
    if (k == 'liquidacoes') {
      for await (const data of dados[k]) await tratamento(data);
    }
    if (k == 'pagamentos')
      for await (const data of dados[k]) await tratamento(data);
  });
}
