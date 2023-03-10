import { Prisma } from '@prisma/client';
import { BrowserContext } from 'puppeteer';
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
export declare function despesasExtras({ workers, ano }: DespesasGeraisProps): Promise<void>;
export default function getAllExtra(exercicio: string, entidade: string, url: string, context: BrowserContext): Promise<any[]>;
export {};
