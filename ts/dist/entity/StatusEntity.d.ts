import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { Status, StatusLoadMatch } from '../ExchangeRatesTypes';
declare class StatusEntity extends ExchangeRatesEntityBase<Status> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: StatusEntity): StatusEntity;
    load(this: any, reqmatch?: StatusLoadMatch, ctrl?: Control): Promise<StatusEntity>;
}
export { StatusEntity };
