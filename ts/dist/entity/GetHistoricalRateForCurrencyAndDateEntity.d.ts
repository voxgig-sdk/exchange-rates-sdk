import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { GetHistoricalRateForCurrencyAndDate, GetHistoricalRateForCurrencyAndDateLoadMatch } from '../ExchangeRatesTypes';
declare class GetHistoricalRateForCurrencyAndDateEntity extends ExchangeRatesEntityBase<GetHistoricalRateForCurrencyAndDate> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: GetHistoricalRateForCurrencyAndDateEntity): GetHistoricalRateForCurrencyAndDateEntity;
    load(this: any, reqmatch?: GetHistoricalRateForCurrencyAndDateLoadMatch, ctrl?: Control): Promise<GetHistoricalRateForCurrencyAndDateEntity>;
}
export { GetHistoricalRateForCurrencyAndDateEntity };
