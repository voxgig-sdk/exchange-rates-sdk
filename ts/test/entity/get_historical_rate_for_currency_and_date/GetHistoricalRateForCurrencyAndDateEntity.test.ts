

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetHistoricalRateForCurrencyAndDateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRatesSDK.test()
    const ent = testsdk.GetHistoricalRateForCurrencyAndDate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_historical_rate_for_currency_and_date.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"base","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"date","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"rates","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"name":"timestamp","req":false,"type":"`$INTEGER`","index$":5}],"id":{"field":"id","from":{"date":"date"},"name":"id","parts":["date","currency"],"sep":"/"},"name":"get_historical_rate_for_currency_and_date","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"USD","kind":"param","name":"currency","orig":"currency","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"2025-08-31","kind":"param","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{date}/{currency}","json":"{\"operationId\":\"getHistoricalRateForCurrencyAndDate\",\"parameters\":[{\"description\":\"Date in YYYY-MM-DD format\",\"example\":\"2025-08-31\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"}},{\"description\":\"Currency code\",\"example\":\"USD\",\"in\":\"path\",\"name\":\"currency\",\"required\":true,\"schema\":{\"description\":\"Three-letter currency code\",\"enum\":[\"AUD\",\"USD\",\"EUR\",\"GBP\",\"JPY\",\"CNY\",\"KRW\",\"INR\",\"SGD\",\"NZD\",\"THB\",\"MYR\",\"IDR\",\"VND\",\"HKD\",\"PHP\",\"CAD\",\"CHF\",\"TWD\",\"TWI\",\"SDR\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"base\":\"AUD\",\"date\":\"2025-08-31\",\"rates\":{\"USD\":0.678234},\"success\":true,\"timestamp\":1725062400},\"schema\":{\"properties\":{\"base\":{\"example\":\"AUD\",\"type\":\"string\"},\"date\":{\"description\":\"Date of the rates (YYYY-MM-DD)\",\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"},\"rates\":{\"additionalProperties\":{\"description\":\"Exchange rate (AUD per unit of foreign currency) with precision varying by currency (up to 6 decimal places for most, whole numbers for IDR/VND as provided by RBA)\",\"minimum\":0,\"type\":\"number\"},\"description\":\"Object containing currency codes as keys and exchange rates as values\",\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"timestamp\":{\"description\":\"Unix timestamp of the rate date\",\"type\":\"integer\"}},\"required\":[\"success\",\"timestamp\",\"base\",\"date\",\"rates\"],\"type\":\"object\"}}},\"description\":\"Exchange rate for the specified currency and date\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":400,\"info\":\"Invalid currency format. Use 3-letter currency code (e.g., USD)\",\"type\":\"bad_request\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":401,\"info\":\"Invalid or missing API key\",\"type\":\"unauthorized\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Authentication required\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":404,\"info\":\"No data available for the specified date\",\"type\":\"not_found\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"API Key\",\"description\":\"API key authentication using Bearer token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{date}/{currency}","segments":[{"var":"date"},{"var":"currency"}],"select":{"exist":["currency","date"]},"transform":{"req":"`reqdata`","res":"`body.rates`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_historical_rate_for_currency_and_date","name__orig":"get_historical_rate_for_currency_and_date","Name":"GetHistoricalRateForCurrencyAndDate","name_":"get_historical_rate_for_currency_and_date","name-":"get-historical-rate-for-currency-and-date","NAME":"GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE","index$":2}, {"active":true,"entity":"get_historical_rate_for_currency_and_date","key$":"BasicGetHistoricalRateForCurrencyAndDateFlow","kind":"basic","name":"BasicGetHistoricalRateForCurrencyAndDateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_historical_rate_for_currency_and_date_ref01","srcdatavar":"get_historical_rate_for_currency_and_date_ref01_data","suffix":"_dt0"},"match":{"date":"date01","id":"get_historical_rate_for_currency_and_date01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_historical_rate_for_currency_and_date_ref01"}}],"index$":0}]}, 'GetHistoricalRateForCurrencyAndDate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_historical_rate_for_currency_and_date_ref01_data = Object.values(setup.data.existing.get_historical_rate_for_currency_and_date)[0] as any

    // LOAD
    const get_historical_rate_for_currency_and_date_ref01_ent = client.GetHistoricalRateForCurrencyAndDate()
    const get_historical_rate_for_currency_and_date_ref01_match_dt0: any = {}
    get_historical_rate_for_currency_and_date_ref01_match_dt0.id = get_historical_rate_for_currency_and_date_ref01_data.id
    const get_historical_rate_for_currency_and_date_ref01_data_dt0 = (await get_historical_rate_for_currency_and_date_ref01_ent.load(get_historical_rate_for_currency_and_date_ref01_match_dt0)).data()
    assert(get_historical_rate_for_currency_and_date_ref01_data_dt0.id === get_historical_rate_for_currency_and_date_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_historical_rate_for_currency_and_date/GetHistoricalRateForCurrencyAndDateTestData.json')

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
    ['get_historical_rate_for_currency_and_date01','get_historical_rate_for_currency_and_date02','get_historical_rate_for_currency_and_date03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID': idmap,
    'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
    'EXCHANGE_RATES_APIKEY': '',
  })

  idmap = env['EXCHANGE_RATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID']
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
  
