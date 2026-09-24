

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


describe('GetApiRootEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRatesSDK.test()
    const ent = testsdk.GetApiRoot()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_api_root.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"documentation":{"a":true,"fo":"uri","h":"Documentation","n":"documentation","r":true,"t":"`$STRING`","key$":"documentation","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":1},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":2},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$STRING`","key$":"version","index$":3}},"name":"get_api_root","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_api_root","name__orig":"get_api_root","Name":"GetApiRoot","name_":"get_api_root","name-":"get-api-root","NAME":"GET_API_ROOT","index$":1}, {"active":true,"entity":"get_api_root","key$":"BasicGetApiRootFlow","kind":"basic","name":"BasicGetApiRootFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_api_root_ref01","srcdatavar":"get_api_root_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_api_root_ref01"}}],"index$":0}]}, 'GetApiRoot', {"GET /":{"protocol":"http","operationId":"getApiRoot","responses":{"200":{"description":"API information","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"message":{"key$":"message","type":"string"},"documentation":{"format":"uri","key$":"documentation","type":"string"},"version":{"key$":"version","type":"string"}},"required":["success","message","documentation","version"],"x-ref":"#/components/schemas/RootResponse","index$":0},"example":{"success":true,"message":"RBA Exchange Rates API","documentation":"https://docs.exchangeratesapi.com.au","version":"1.0.0"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"API key authentication using Bearer token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_api_root_ref01_data = Object.values(setup.data.existing.get_api_root)[0] as any

    // LOAD
    const get_api_root_ref01_ent = client.GetApiRoot()
    const get_api_root_ref01_match_dt0: any = {}
    const get_api_root_ref01_data_dt0 = (await get_api_root_ref01_ent.load(get_api_root_ref01_match_dt0)).data()
    assert(null != get_api_root_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_api_root/GetApiRootTestData.json')

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
    ['get_api_root01','get_api_root02','get_api_root03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATES_TEST_GET_API_ROOT_ENTID': idmap,
    'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
    'EXCHANGE_RATES_APIKEY': '',
  })

  idmap = env['EXCHANGE_RATES_TEST_GET_API_ROOT_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATES_TEST_GET_API_ROOT_ENTID']
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
  
