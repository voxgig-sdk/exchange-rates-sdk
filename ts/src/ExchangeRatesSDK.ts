// ExchangeRates Ts SDK

import { ConvertEntity } from './entity/ConvertEntity'
import { GetApiRootEntity } from './entity/GetApiRootEntity'
import { GetHistoricalRateForCurrencyAndDateEntity } from './entity/GetHistoricalRateForCurrencyAndDateEntity'
import { GetHistoricalRatesForDateEntity } from './entity/GetHistoricalRatesForDateEntity'
import { LatestEntity } from './entity/LatestEntity'
import { StatusEntity } from './entity/StatusEntity'
import { SymbolEntity } from './entity/SymbolEntity'
import { TimeseriesEntity } from './entity/TimeseriesEntity'

export type * from './ExchangeRatesTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ExchangeRatesEntityBase } from './ExchangeRatesEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class ExchangeRatesSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _convert?: ConvertEntity

  // Idiomatic facade: `client.convert.list()` / `client.convert.load({ id })`.
  get convert(): ConvertEntity {
    return (this._convert ??= new ConvertEntity(this, undefined))
  }

  /** @deprecated Use `client.convert` instead. */
  Convert(data?: any) {
    const self = this
    return new ConvertEntity(self,data)
  }


  _get_api_root?: GetApiRootEntity

  // Idiomatic facade: `client.get_api_root.list()` / `client.get_api_root.load({ id })`.
  get get_api_root(): GetApiRootEntity {
    return (this._get_api_root ??= new GetApiRootEntity(this, undefined))
  }

  /** @deprecated Use `client.get_api_root` instead. */
  GetApiRoot(data?: any) {
    const self = this
    return new GetApiRootEntity(self,data)
  }


  _get_historical_rate_for_currency_and_date?: GetHistoricalRateForCurrencyAndDateEntity

  // Idiomatic facade: `client.get_historical_rate_for_currency_and_date.list()` / `client.get_historical_rate_for_currency_and_date.load({ id })`.
  get get_historical_rate_for_currency_and_date(): GetHistoricalRateForCurrencyAndDateEntity {
    return (this._get_historical_rate_for_currency_and_date ??= new GetHistoricalRateForCurrencyAndDateEntity(this, undefined))
  }

  /** @deprecated Use `client.get_historical_rate_for_currency_and_date` instead. */
  GetHistoricalRateForCurrencyAndDate(data?: any) {
    const self = this
    return new GetHistoricalRateForCurrencyAndDateEntity(self,data)
  }


  _get_historical_rates_for_date?: GetHistoricalRatesForDateEntity

  // Idiomatic facade: `client.get_historical_rates_for_date.list()` / `client.get_historical_rates_for_date.load({ id })`.
  get get_historical_rates_for_date(): GetHistoricalRatesForDateEntity {
    return (this._get_historical_rates_for_date ??= new GetHistoricalRatesForDateEntity(this, undefined))
  }

  /** @deprecated Use `client.get_historical_rates_for_date` instead. */
  GetHistoricalRatesForDate(data?: any) {
    const self = this
    return new GetHistoricalRatesForDateEntity(self,data)
  }


  _latest?: LatestEntity

  // Idiomatic facade: `client.latest.list()` / `client.latest.load({ id })`.
  get latest(): LatestEntity {
    return (this._latest ??= new LatestEntity(this, undefined))
  }

  /** @deprecated Use `client.latest` instead. */
  Latest(data?: any) {
    const self = this
    return new LatestEntity(self,data)
  }


  _status?: StatusEntity

  // Idiomatic facade: `client.status.list()` / `client.status.load({ id })`.
  get status(): StatusEntity {
    return (this._status ??= new StatusEntity(this, undefined))
  }

  /** @deprecated Use `client.status` instead. */
  Status(data?: any) {
    const self = this
    return new StatusEntity(self,data)
  }


  _symbol?: SymbolEntity

  // Idiomatic facade: `client.symbol.list()` / `client.symbol.load({ id })`.
  get symbol(): SymbolEntity {
    return (this._symbol ??= new SymbolEntity(this, undefined))
  }

  /** @deprecated Use `client.symbol` instead. */
  Symbol(data?: any) {
    const self = this
    return new SymbolEntity(self,data)
  }


  _timeseries?: TimeseriesEntity

  // Idiomatic facade: `client.timeseries.list()` / `client.timeseries.load({ id })`.
  get timeseries(): TimeseriesEntity {
    return (this._timeseries ??= new TimeseriesEntity(this, undefined))
  }

  /** @deprecated Use `client.timeseries` instead. */
  Timeseries(data?: any) {
    const self = this
    return new TimeseriesEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ExchangeRatesSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ExchangeRatesSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'ExchangeRates' }
  }

  toString() {
    return 'ExchangeRates ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ExchangeRatesSDK


export {
  stdutil,

  BaseFeature,
  ExchangeRatesEntityBase,

  ExchangeRatesSDK,
  SDK,
}


