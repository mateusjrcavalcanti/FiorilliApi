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
interface transferenciasProps {
    workers?: number;
    ano: AnoWithEntidadeName;
}
export declare function transferencias({ workers, ano }: transferenciasProps): Promise<void>;
export default function getAllReceitas(exercicio: string, entidade: string, url: string, context: BrowserContext): Promise<any>;
export {};
