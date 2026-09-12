import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { Timeseries, TimeseriesLoadMatch } from '../ExchangeRatesTypes';
declare class TimeseriesEntity extends ExchangeRatesEntityBase<Timeseries> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: TimeseriesEntity): TimeseriesEntity;
    load(this: any, reqmatch?: TimeseriesLoadMatch, ctrl?: Control): Promise<TimeseriesEntity>;
}
export { TimeseriesEntity };
