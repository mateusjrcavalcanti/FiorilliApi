export declare function abstractQuery({ url, instance, exercicio, empresa, inicio, fim, }: {
    url: {
        categoria: string;
        listagem: string;
        rest?: string;
    };
    instance: any;
    exercicio: number;
    empresa: string;
    inicio: {
        dia: number;
        mes: number;
    };
    fim: {
        dia: number;
        mes: number;
    };
}): Promise<any>;
export declare function execQuery({ instance, url, empresa, inicio, fim, }: {
    instance: any;
    url: {
        categoria: string;
        listagem: string;
        rest?: string;
    };
    empresa: string;
    inicio: Date;
    fim: Date;
}): Promise<any>;
