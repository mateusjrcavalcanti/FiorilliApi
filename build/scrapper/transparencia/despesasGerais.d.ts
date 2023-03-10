import { Prisma } from '@prisma/client';
type AnoWithEntidadeName = Prisma.AnoGetPayload<{
    include: {
        entidadeName: {
            include: {
                entidade: {
                    include: {
                        portal: true;
                    };
                };
            };
        };
    };
}>;
interface DespesasGeraisProps {
    workers?: number;
    ano: AnoWithEntidadeName;
}
export declare function despesasGerais({ workers, ano }: DespesasGeraisProps): Promise<void>;
export {};
