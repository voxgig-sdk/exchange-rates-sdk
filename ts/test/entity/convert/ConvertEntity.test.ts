

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


describe('ConvertEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRatesSDK.test()
    const ent = testsdk.Convert()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'convert.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"h":"Date","n":"date","r":true,"t":"`$STRING`","key$":"date","index$":0},"free":{"a":true,"h":"Free","n":"free","r":false,"sh":"Indicates if this was a free (unauthenticated) request","t":"`$BOOLEAN`","key$":"free","index$":1},"info":{"a":true,"h":"Info","n":"info","r":true,"t":"`$OBJECT`","key$":"info","index$":2},"query":{"a":true,"h":"Query","n":"query","r":true,"t":"`$OBJECT`","key$":"query","index$":3},"result":{"a":true,"h":"Result","n":"result","r":true,"sh":"Conversion result","t":"`$NUMBER`","key$":"result","index$":4},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":5}},"name":"convert","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /convert","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":100,"k":"query","n":"amount","or":"amount","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"ex":"2025-08-31","k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"AUD","k":"query","n":"from","or":"from","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"USD","k":"query","n":"to","or":"to","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/convert","q":{"exist":["amount","date","from","to"]},"r":{},"s":[{"lit":"convert"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"convert","name__orig":"convert","Name":"Convert","name_":"convert","name-":"convert","NAME":"CONVERT","index$":0}, {"active":true,"entity":"convert","key$":"BasicConvertFlow","kind":"basic","name":"BasicConvertFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"convert_ref01","srcdatavar":"convert_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-convert_ref01"}}],"index$":0}]}, 'Convert', {"GET /convert":{"protocol":"http","operationId":"convertCurrency","responses":{"200":{"description":"Conversion result","headers":{"X-RateLimit-Limit-Monthly":{"description":"Monthly request limit based on plan (Free=300, Starter=5,000, Professional=50,000, Business=500,000)","schema":{"type":"integer"}},"X-RateLimit-Remaining-Monthly":{"description":"Remaining requests in current monthly period","schema":{"type":"integer"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"query":{"key$":"query","properties":{"amount":{"type":"number"},"from":{"type":"string"},"to":{"type":"string"}},"required":["from","to","amount"],"type":"object"},"info":{"key$":"info","properties":{"rate":{"description":"Exchange rate used for conversion with precision varying by currency (up to 6 decimal places for most, whole numbers for IDR/VND as provided by RBA)","type":"number"},"timestamp":{"description":"Unix timestamp of the rate date","type":"integer"}},"required":["rate"],"type":"object"},"date":{"key$":"date","pattern":"^\\d{4}-\\d{2}-\\d{2}$","type":"string"},"result":{"description":"Conversion result","key$":"result","type":"number"},"free":{"description":"Indicates if this was a free (unauthenticated) request","key$":"free","type":"boolean"}},"required":["success","query","info","date","result"],"x-ref":"#/components/schemas/ConvertResponse","index$":0},"example":{"success":true,"query":{"from":"AUD","to":"USD","amount":100},"info":{"timestamp":1725148800,"rate":0.678234},"date":"2025-09-01","result":67.8234,"free":true}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code"},"type":{"type":"string","description":"Error type identifier"},"info":{"type":"string","description":"Human-readable error description"}},"required":["code","type","info"]}},"required":["success","error"],"x-ref":"#/components/schemas/Error"},"example":{"success":false,"error":{"code":400,"type":"bad_request","info":"Invalid currency format. Use 3-letter currency code (e.g., USD)"}}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code"},"type":{"type":"string","description":"Error type identifier"},"info":{"type":"string","description":"Human-readable error description"}},"required":["code","type","info"]}},"required":["success","error"],"x-ref":"#/components/schemas/Error"},"example":{"success":false,"error":{"code":429,"type":"rate_limit","info":"Monthly quota exceeded. Free=300, Starter=5,000, Professional=50,000, Business=500,000 requests per month."}}}},"x-ref":"#/components/responses/RateLimitExceeded"},"503":{"description":"Service temporarily unavailable","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP status code"},"type":{"type":"string","description":"Error type identifier"},"info":{"type":"string","description":"Human-readable error description"}},"required":["code","type","info"]}},"required":["success","error"],"x-ref":"#/components/schemas/Error"},"example":{"success":false,"error":{"code":503,"type":"unavailable","info":"Rates temporarily unavailable"}}}},"x-ref":"#/components/responses/ServiceUnavailable"}},"parameters":[{"name":"from","in":"query","required":true,"description":"Source currency code","schema":{"type":"string","enum":["AUD","USD","EUR","GBP","JPY","CNY","KRW","INR","SGD","NZD","THB","MYR","IDR","VND","HKD","PHP","CAD","CHF","TWD","TWI","SDR"],"description":"Three-letter currency code","x-ref":"#/components/schemas/CurrencyCode"},"example":"AUD","index$":0},{"name":"to","in":"query","required":true,"description":"Target currency code","schema":{"type":"string","enum":["AUD","USD","EUR","GBP","JPY","CNY","KRW","INR","SGD","NZD","THB","MYR","IDR","VND","HKD","PHP","CAD","CHF","TWD","TWI","SDR"],"description":"Three-letter currency code","x-ref":"#/components/schemas/CurrencyCode"},"example":"USD","index$":1},{"name":"amount","in":"query","required":true,"description":"Amount to convert","schema":{"type":"number","minimum":0,"exclusiveMinimum":true},"example":100,"index$":2},{"name":"date","in":"query","required":false,"description":"Historical date for conversion (YYYY-MM-DD). Requires authentication.","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"example":"2025-08-31","index$":3}],"security":[{"bearerAuth":[]},{}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"API key authentication using Bearer token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let convert_ref01_data = Object.values(setup.data.existing.convert)[0] as any

    // LOAD
    const convert_ref01_ent = client.Convert()
    const convert_ref01_match_dt0: any = {}
    const convert_ref01_data_dt0 = (await convert_ref01_ent.load(convert_ref01_match_dt0)).data()
    assert(null != convert_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/convert/ConvertTestData.json')

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
    ['convert01','convert02','convert03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATES_TEST_CONVERT_ENTID': idmap,
    'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
    'EXCHANGE_RATES_APIKEY': '',
  })

  idmap = env['EXCHANGE_RATES_TEST_CONVERT_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATES_TEST_CONVERT_ENTID']
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
  
