

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ExchangeRatesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TimeseriesEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRatesSDK.test()
    const ent = testsdk.Timeseries()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'timeseries.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base":{"a":true,"h":"Base","n":"base","r":false,"t":"`$STRING`","key$":"base","index$":0},"end_date":{"a":true,"h":"End Date","n":"end_date","r":false,"t":"`$STRING`","key$":"end_date","index$":1},"rates":{"a":true,"h":"Rates","n":"rates","r":false,"t":"`$OBJECT`","key$":"rates","index$":2},"start_date":{"a":true,"h":"Start Date","n":"start_date","r":false,"t":"`$STRING`","key$":"start_date","index$":3},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":4},"timeseries":{"a":true,"h":"Timeseries","n":"timeseries","r":false,"t":"`$BOOLEAN`","key$":"timeseries","index$":5}},"name":"timeseries","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /timeseries","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"AUD","k":"query","n":"base","or":"base","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2025-08-31","k":"query","n":"end_date","or":"end_date","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"2025-08-01","k":"query","n":"start_date","or":"start_date","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"USD,EUR,GBP","k":"query","n":"symbol","or":"symbol","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/timeseries","q":{"exist":["base","end_date","start_date","symbol"]},"r":{},"s":[{"lit":"timeseries"}],"t":{"req":"`reqdata`","res":"`body.rates`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"timeseries","name__orig":"timeseries","Name":"Timeseries","name_":"timeseries","name-":"timeseries","NAME":"TIMESERIES","index$":7}, {"active":true,"entity":"timeseries","key$":"BasicTimeseriesFlow","kind":"basic","name":"BasicTimeseriesFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"timeseries_ref01","srcdatavar":"timeseries_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-timeseries_ref01"}}],"index$":0}]}, 'Timeseries', {"GET /timeseries":{"protocol":"http","operationId":"getTimeseriesRates","responses":{"200":{"description":"Historical exchange rates","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"timeseries":{"example":true,"key$":"timeseries","type":"boolean"},"start_date":{"key$":"start_date","pattern":"^\\d{4}-\\d{2}-\\d{2}$","type":"string"},"end_date":{"key$":"end_date","pattern":"^\\d{4}-\\d{2}-\\d{2}$","type":"string"},"base":{"example":"AUD","key$":"base","type":"string"},"rates":{"additionalProperties":{"additionalProperties":{"description":"Exchange rate (AUD per unit of foreign currency) with precision varying by currency (up to 6 decimal places for most, whole numbers for IDR/VND as provided by RBA)","minimum":0,"type":"number"},"description":"Object containing currency codes as keys and exchange rates as values","type":"object","x-ref":"#/components/schemas/RatesObject","key$":"additionalProperties"},"description":"Object with dates as keys and rate objects as values","key$":"rates","type":"object"}},"required":["success","timeseries","start_date","end_date","base","rates"],"x-ref":"#/components/schemas/TimeseriesResponse"},"example":{"success":true,"timeseries":true,"start_date":"2025-08-01","end_date":"2025-08-31","base":"AUD","rates":{"2025-08-01":{"USD":0.678234,"EUR":0.612345},"2025-08-02":{"USD":0.679123,"EUR":0.613456}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code"},"type":{"type":"string","description":"Error type identifier"},"info":{"type":"string","description":"Human-readable error description"}},"required":["code","type","info"]}},"required":["success","error"],"x-ref":"#/components/schemas/Error"},"example":{"success":false,"error":{"code":400,"type":"bad_request","info":"Invalid currency format. Use 3-letter currency code (e.g., USD)"}}}},"x-ref":"#/components/responses/BadRequest"},"401":{"description":"Authentication required","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code"},"type":{"type":"string","description":"Error type identifier"},"info":{"type":"string","description":"Human-readable error description"}},"required":["code","type","info"]}},"required":["success","error"],"x-ref":"#/components/schemas/Error"},"example":{"success":false,"error":{"code":401,"type":"unauthorized","info":"Invalid or missing API key"}}}},"x-ref":"#/components/responses/Unauthorized"},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code"},"type":{"type":"string","description":"Error type identifier"},"info":{"type":"string","description":"Human-readable error description"}},"required":["code","type","info"]}},"required":["success","error"],"x-ref":"#/components/schemas/Error"},"example":{"success":false,"error":{"code":404,"type":"not_found","info":"No data available for the specified date"}}}},"x-ref":"#/components/responses/NotFound"}},"parameters":[{"name":"start_date","in":"query","required":true,"description":"Start date (YYYY-MM-DD)","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"example":"2025-08-01","index$":0},{"name":"end_date","in":"query","required":true,"description":"End date (YYYY-MM-DD)","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"example":"2025-08-31","index$":1},{"name":"symbols","in":"query","required":false,"description":"Comma-separated list of currency codes to filter","schema":{"type":"string"},"example":"USD,EUR,GBP","index$":2},{"name":"base","in":"query","required":false,"description":"Base currency (currently only AUD supported)","schema":{"type":"string","enum":["AUD"],"default":"AUD"},"index$":3}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"API key authentication using Bearer token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let timeseries_ref01_data = Object.values(setup.data.existing.timeseries)[0] as any

    // LOAD
    const timeseries_ref01_ent = client.Timeseries()
    const timeseries_ref01_match_dt0: any = {}
    const timeseries_ref01_data_dt0 = (await timeseries_ref01_ent.load(timeseries_ref01_match_dt0)).data()
    assert(null != timeseries_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/timeseries/TimeseriesTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ExchangeRatesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['timeseries01','timeseries02','timeseries03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATES_TEST_TIMESERIES_ENTID': idmap,
    'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
    'EXCHANGE_RATES_APIKEY': '',
  })

  idmap = env['EXCHANGE_RATES_TEST_TIMESERIES_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATES_TEST_TIMESERIES_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ExchangeRatesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.EXCHANGE_RATES_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.EXCHANGE_RATES_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
