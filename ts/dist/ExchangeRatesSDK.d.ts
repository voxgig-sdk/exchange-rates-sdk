import { ConvertEntity } from './entity/ConvertEntity';
import { GetApiRootEntity } from './entity/GetApiRootEntity';
import { GetHistoricalRateForCurrencyAndDateEntity } from './entity/GetHistoricalRateForCurrencyAndDateEntity';
import { GetHistoricalRatesForDateEntity } from './entity/GetHistoricalRatesForDateEntity';
import { LatestEntity } from './entity/LatestEntity';
import { StatusEntity } from './entity/StatusEntity';
import { SymbolEntity } from './entity/SymbolEntity';
import { TimeseriesEntity } from './entity/TimeseriesEntity';
export type * from './ExchangeRatesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ExchangeRatesEntityBase } from './ExchangeRatesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ExchangeRatesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Convert(entopts?: Record<string, any>): ConvertEntity;
    GetApiRoot(entopts?: Record<string, any>): GetApiRootEntity;
    GetHistoricalRateForCurrencyAndDate(entopts?: Record<string, any>): GetHistoricalRateForCurrencyAndDateEntity;
    GetHistoricalRatesForDate(entopts?: Record<string, any>): GetHistoricalRatesForDateEntity;
    Latest(entopts?: Record<string, any>): LatestEntity;
    Status(entopts?: Record<string, any>): StatusEntity;
    Symbol(entopts?: Record<string, any>): SymbolEntity;
    Timeseries(entopts?: Record<string, any>): TimeseriesEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ExchangeRatesSDK;
    tester(testopts?: any, sdkopts?: any): ExchangeRatesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ExchangeRatesSDK;
export { stdutil, config, BaseFeature, ExchangeRatesEntityBase, ExchangeRatesSDK, SDK, };
