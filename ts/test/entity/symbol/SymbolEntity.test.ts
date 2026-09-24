

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


describe('SymbolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRatesSDK.test()
    const ent = testsdk.Symbol()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'symbol.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"country":{"a":true,"h":"Country","n":"country","r":true,"sh":"Country or region","t":"`$STRING`","key$":"country","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Full name of the currency","t":"`$STRING`","key$":"name","index$":1},"symbol":{"a":true,"h":"Symbol","n":"symbol","r":true,"sh":"Currency symbol","t":"`$STRING`","key$":"symbol","index$":2}},"name":"symbol","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /symbols","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/symbols","q":{},"r":{},"s":[{"lit":"symbols"}],"t":{"req":"`reqdata`","res":"`body.symbols`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"symbol","name__orig":"symbol","Name":"Symbol","name_":"symbol","name-":"symbol","NAME":"SYMBOL","index$":6}, {"active":true,"entity":"symbol","key$":"BasicSymbolFlow","kind":"basic","name":"BasicSymbolFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"symbol_ref01","srcdatavar":"symbol_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-symbol_ref01"}}],"index$":0}]}, 'Symbol', {"GET /symbols":{"protocol":"http","operationId":"getSupportedCurrencies","responses":{"200":{"description":"List of supported currencies","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"symbols":{"additionalProperties":{"properties":{"country":{"description":"Country or region","type":"string","key$":"country"},"name":{"description":"Full name of the currency","type":"string","key$":"name"},"symbol":{"description":"Currency symbol","type":"string","key$":"symbol"}},"required":["name","symbol","country"],"type":"object","x-ref":"#/components/schemas/CurrencyInfo","key$":"additionalProperties"},"key$":"symbols","type":"object"},"count":{"description":"Number of supported currencies","key$":"count","type":"integer"},"base":{"example":"AUD","key$":"base","type":"string"},"note":{"key$":"note","type":"string"}},"required":["success","symbols","count","base","note"],"x-ref":"#/components/schemas/SymbolsResponse"},"example":{"success":true,"symbols":{"USD":{"name":"US Dollar","symbol":"$","country":"United States"},"EUR":{"name":"Euro","symbol":"€","country":"European Union"}},"count":21,"base":"AUD","note":"All rates are quoted as AUD per unit of foreign currency from the Reserve Bank of Australia"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"API key authentication using Bearer token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let symbol_ref01_data = Object.values(setup.data.existing.symbol)[0] as any

    // LOAD
    const symbol_ref01_ent = client.Symbol()
    const symbol_ref01_match_dt0: any = {}
    const symbol_ref01_data_dt0 = (await symbol_ref01_ent.load(symbol_ref01_match_dt0)).data()
    assert(null != symbol_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/symbol/SymbolTestData.json')

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
    ['symbol01','symbol02','symbol03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATES_TEST_SYMBOL_ENTID': idmap,
    'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
    'EXCHANGE_RATES_APIKEY': '',
  })

  idmap = env['EXCHANGE_RATES_TEST_SYMBOL_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATES_TEST_SYMBOL_ENTID']
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
  
