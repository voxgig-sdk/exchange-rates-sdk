import { ExchangeRatesEntityBase } from '../ExchangeRatesEntityBase';
import type { ExchangeRatesSDK } from '../ExchangeRatesSDK';
import type { Control } from '../types';
import type { GetApiRoot, GetApiRootLoadMatch } from '../ExchangeRatesTypes';
declare class GetApiRootEntity extends ExchangeRatesEntityBase<GetApiRoot> {
    constructor(client: ExchangeRatesSDK, entopts: any);
    make(this: GetApiRootEntity): GetApiRootEntity;
    load(this: any, reqmatch?: GetApiRootLoadMatch, ctrl?: Control): Promise<GetApiRootEntity>;
}
export { GetApiRootEntity };
