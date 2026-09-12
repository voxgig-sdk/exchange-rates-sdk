import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { Latest, LatestLoadMatch } from '../ExchangeRatesTypes';
declare class LatestEntity extends ExchangeRatesEntityBase<Latest> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: LatestEntity): LatestEntity;
    load(this: any, reqmatch?: LatestLoadMatch, ctrl?: Control): Promise<LatestEntity>;
}
export { LatestEntity };
