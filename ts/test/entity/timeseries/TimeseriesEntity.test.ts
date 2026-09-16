

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"base","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"end_date","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"rates","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"start_date","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"name":"timeseries","req":false,"type":"`$BOOLEAN`","index$":5}],"name":"timeseries","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"AUD","kind":"query","name":"base","orig":"base","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2025-08-31","kind":"query","name":"end_date","orig":"end_date","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"2025-08-01","kind":"query","name":"start_date","orig":"start_date","reqd":true,"type":"`$STRING`","index$":2},{"active":true,"example":"USD,EUR,GBP","kind":"query","name":"symbol","orig":"symbol","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /timeseries","json":"{\"operationId\":\"getTimeseriesRates\",\"parameters\":[{\"description\":\"Start date (YYYY-MM-DD)\",\"example\":\"2025-08-01\",\"in\":\"query\",\"name\":\"start_date\",\"required\":true,\"schema\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"}},{\"description\":\"End date (YYYY-MM-DD)\",\"example\":\"2025-08-31\",\"in\":\"query\",\"name\":\"end_date\",\"required\":true,\"schema\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"}},{\"description\":\"Comma-separated list of currency codes to filter\",\"example\":\"USD,EUR,GBP\",\"in\":\"query\",\"name\":\"symbols\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Base currency (currently only AUD supported)\",\"in\":\"query\",\"name\":\"base\",\"required\":false,\"schema\":{\"default\":\"AUD\",\"enum\":[\"AUD\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"base\":\"AUD\",\"end_date\":\"2025-08-31\",\"rates\":{\"2025-08-01\":{\"EUR\":0.612345,\"USD\":0.678234},\"2025-08-02\":{\"EUR\":0.613456,\"USD\":0.679123}},\"start_date\":\"2025-08-01\",\"success\":true,\"timeseries\":true},\"schema\":{\"properties\":{\"base\":{\"example\":\"AUD\",\"type\":\"string\"},\"end_date\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"},\"rates\":{\"additionalProperties\":{\"additionalProperties\":{\"description\":\"Exchange rate (AUD per unit of foreign currency) with precision varying by currency (up to 6 decimal places for most, whole numbers for IDR/VND as provided by RBA)\",\"minimum\":0,\"type\":\"number\"},\"description\":\"Object containing currency codes as keys and exchange rates as values\",\"type\":\"object\"},\"description\":\"Object with dates as keys and rate objects as values\",\"type\":\"object\"},\"start_date\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"timeseries\":{\"example\":true,\"type\":\"boolean\"}},\"required\":[\"success\",\"timeseries\",\"start_date\",\"end_date\",\"base\",\"rates\"],\"type\":\"object\"}}},\"description\":\"Historical exchange rates\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":400,\"info\":\"Invalid currency format. Use 3-letter currency code (e.g., USD)\",\"type\":\"bad_request\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":401,\"info\":\"Invalid or missing API key\",\"type\":\"unauthorized\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Authentication required\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":404,\"info\":\"No data available for the specified date\",\"type\":\"not_found\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"API Key\",\"description\":\"API key authentication using Bearer token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/timeseries","segments":[{"lit":"timeseries"}],"select":{"exist":["base","end_date","start_date","symbol"]},"transform":{"req":"`reqdata`","res":"`body.rates`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"timeseries","name__orig":"timeseries","Name":"Timeseries","name_":"timeseries","name-":"timeseries","NAME":"TIMESERIES","index$":7}, {"active":true,"entity":"timeseries","key$":"BasicTimeseriesFlow","kind":"basic","name":"BasicTimeseriesFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"timeseries_ref01","srcdatavar":"timeseries_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-timeseries_ref01"}}],"index$":0}]}, 'Timeseries')
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
  
