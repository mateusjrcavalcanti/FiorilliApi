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
interface receitasGeraisProps {
    workers?: number;
    ano: AnoWithEntidadeName;
}
export declare function receitas({ workers, ano }: receitasGeraisProps): Promise<void>;
export default function getAllReceitas(exercicio: string, entidade: string, url: string, context: BrowserContext): Promise<any>;
export {};
