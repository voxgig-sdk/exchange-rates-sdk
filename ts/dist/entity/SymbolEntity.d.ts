import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { SymbolType, SymbolLoadMatch } from '../ExchangeRatesTypes';
declare class SymbolEntity extends ExchangeRatesEntityBase<SymbolType> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: SymbolEntity): SymbolEntity;
    load(this: any, reqmatch?: SymbolLoadMatch, ctrl?: Control): Promise<SymbolEntity>;
}
export { SymbolEntity };
