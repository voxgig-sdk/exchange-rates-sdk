import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { GetHistoricalRatesForDate, GetHistoricalRatesForDateLoadMatch } from '../ExchangeRatesTypes';
declare class GetHistoricalRatesForDateEntity extends ExchangeRatesEntityBase<GetHistoricalRatesForDate> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: GetHistoricalRatesForDateEntity): GetHistoricalRatesForDateEntity;
    load(this: any, reqmatch?: GetHistoricalRatesForDateLoadMatch, ctrl?: Control): Promise<GetHistoricalRatesForDateEntity>;
}
export { GetHistoricalRatesForDateEntity };
