import { Page } from 'puppeteer';
export * from './links';
export * from './removeDadosConsolidados';
export * from './goPage';
export * from './defExercicio';
export * from './defEntidade';
export * from './getTotal';
export * from './responseType';
export * from './getColuns';
export * from './getDadosEmpenho';
export * from './getDadosEmpenhoFromList';
export * from './tratamento';
export * from './args';
export * from './getData';
export declare function delay(time: number): Promise<unknown>;
export declare function waitResponse(page: Page, url: string): Promise<import("puppeteer").HTTPResponse>;