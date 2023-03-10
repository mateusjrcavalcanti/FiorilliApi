import { Page } from 'puppeteer';
export declare function getDadosEmpenhoFromList(page: Page): Promise<{
    [key: string]: string;
}[]>;
