export default function getDespesa({ baseURL, exercicio, numero, }: {
    baseURL: string;
    exercicio: number;
    numero: string;
}): Promise<{
    [key: string]: string;
}>;
export declare function delay(time: number): Promise<unknown>;
