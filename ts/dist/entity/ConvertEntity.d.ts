import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { Convert, ConvertLoadMatch } from '../ExchangeRatesTypes';
declare class ConvertEntity extends ExchangeRatesEntityBase<Convert> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: ConvertEntity): ConvertEntity;
    load(this: any, reqmatch?: ConvertLoadMatch, ctrl?: Control): Promise<ConvertEntity>;
}
export { ConvertEntity };
