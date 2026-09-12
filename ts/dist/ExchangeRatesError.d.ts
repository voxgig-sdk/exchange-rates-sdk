import { Context } from './Context';
declare class ExchangeRatesError extends Error {
    isExchangeRatesError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ExchangeRatesError };
