import { PrismaClient } from '@prisma/client';
import {
  despesasExtras,
  despesasGerais,
  receitas,
  transferencias,
} from './transparencia';

const prisma = new PrismaClient();

const update = async () => {
  const anos = await prisma.ano.findMany({
    include: {
      entidadeName: {
        include: {
          entidade: {
            include: { portal: true },
          },
        },
      },
    },
  });

  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth() + 1;

  for await (const ano of anos) {
    if (
      Number(ano.ano) == anoAtual ||
      (Number(ano.ano) == anoAtual - 1 && mesAtual == 1)
    ) {
      await receitas({ ano, workers: 10 });
      await despesasExtras({ ano, workers: 10 });
      await transferencias({ ano, workers: 10 });
      await despesasGerais({
        ano,
        workers: 10,
      });
    }
  }
};

export default update;
