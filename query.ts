export async function abstractQuery({
  url,
  instance,
  exercicio,
  empresa,
  inicio,
  fim,
}: {
  url: { categoria: string; listagem: string; rest?: string };
  instance: any;
  exercicio: number;
  empresa: string;
  inicio: { dia: number; mes: number };
  fim: { dia: number; mes: number };
}) {
  const reqURL = `${url.categoria}/?Listagem=${url.listagem}&DiaInicioPeriodo=${
    inicio.dia
  }&Empresa=${empresa}&MesInicialPeriodo=${inicio.mes}&DiaFinalPeriodo=${
    fim.dia
  }&MesFinalPeriodo=${
    fim.mes
  }&Exercicio=${exercicio}&MostraDadosConsolidado=False${
    url.rest ? url.rest : ""
  }`;
  const { headers } = await instance.get(
    `${url.categoria}/?Listagem=DefineExercicio&ConectarExercicio=${exercicio}`,
    {
      withCredentials: true,
    }
  );
  const { data } = await instance.get(reqURL, {
    withCredentials: true,
    headers: {
      Cookie: headers["set-cookie"] ? headers["set-cookie"][0] : "",
    },
  });
  return data;
}

export async function execQuery({
  instance,
  url,
  empresa,
  inicio,
  fim,
}: {
  instance: any;
  url: { categoria: string; listagem: string; rest?: string };
  empresa: string;
  inicio: Date;
  fim: Date;
}) {
  if (inicio.getFullYear() === fim.getFullYear()) {
    return await abstractQuery({
      instance,
      url,
      exercicio: inicio.getFullYear(),
      empresa,
      inicio: { dia: inicio.getDate(), mes: inicio.getMonth() + 1 },
      fim: { dia: fim.getDate(), mes: fim.getMonth() + 1 },
    });
  } else if (inicio > fim) {
    return await abstractQuery({
      instance,
      url,
      exercicio: inicio.getFullYear(),
      empresa,
      inicio: { dia: inicio.getDate(), mes: inicio.getMonth() + 1 },
      fim: { dia: 31, mes: 12 },
    });
  } else {
    const data1 = await abstractQuery({
      instance,
      url,
      exercicio: inicio.getFullYear(),
      empresa,
      inicio: { dia: inicio.getDate(), mes: inicio.getMonth() + 1 },
      fim: { dia: 31, mes: 12 },
    });
    const data2 = await abstractQuery({
      instance,
      url,
      exercicio: fim.getFullYear(),
      empresa,
      inicio: { dia: 1, mes: 1 },
      fim: { dia: fim.getDate(), mes: fim.getMonth() + 1 },
    });

    return [...data1, ...data2];
  }
}

export async function DetalhesEmpenhoPorNumeroEmpenho({
  instance,
  numero,
}: {
  instance: any;
  numero: string;
}) {
  const reqURL = `/Despesas/?Listagem=DetalhesEmpenhoPorNumeroEmpenho&intNumeroEmpenho=${numero}&strTipoEmpenho=OR&bolMostrarFornecedor=True`;
  const { data } = await instance.get(reqURL);
  return data;
}
