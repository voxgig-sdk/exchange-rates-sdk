

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


describe('StatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRatesSDK.test()
    const ent = testsdk.Status()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"last_update":{"a":true,"h":"Last Update","n":"last_update","r":true,"sh":"Last successful data update timestamp or 'unknown'","t":"`$STRING`","key$":"last_update","index$":0},"next_update_expected":{"a":true,"h":"Next Update Expected","n":"next_update_expected","r":true,"sh":"ISO 8601 timestamp of when next RBA update is expected","t":"`$STRING`","key$":"next_update_expected","index$":1},"stale":{"a":true,"h":"Stale","n":"stale","r":true,"sh":"Whether the data is considered stale","t":"`$BOOLEAN`","key$":"stale","index$":2},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Current API status","t":"`$STRING`","key$":"status","index$":3}},"name":"status","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /status","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/status","q":{},"r":{},"s":[{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"status","name__orig":"status","Name":"Status","name_":"status","name-":"status","NAME":"STATUS","index$":5}, {"active":true,"entity":"status","key$":"BasicStatusFlow","kind":"basic","name":"BasicStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"status_ref01","srcdatavar":"status_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-status_ref01"}}],"index$":0}]}, 'Status', {"GET /status":{"protocol":"http","operationId":"getApiStatus","responses":{"200":{"description":"API status information","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"description":"Current API status","enum":["operational","degraded"],"key$":"status","type":"string"},"last_update":{"description":"Last successful data update timestamp or 'unknown'","key$":"last_update","type":"string"},"stale":{"description":"Whether the data is considered stale","key$":"stale","type":"boolean"},"next_update_expected":{"description":"ISO 8601 timestamp of when next RBA update is expected","key$":"next_update_expected","type":"string"}},"required":["status","last_update","stale","next_update_expected"],"x-ref":"#/components/schemas/StatusResponse","index$":0},"example":{"status":"operational","last_update":"2025-09-01T16:00:00Z","stale":false,"next_update_expected":"2025-09-02T06:00:00Z"}}}},"503":{"description":"Service unavailable","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"description":"Current API status","enum":["operational","degraded"],"key$":"status","type":"string"},"last_update":{"description":"Last successful data update timestamp or 'unknown'","key$":"last_update","type":"string"},"stale":{"description":"Whether the data is considered stale","key$":"stale","type":"boolean"},"next_update_expected":{"description":"ISO 8601 timestamp of when next RBA update is expected","key$":"next_update_expected","type":"string"}},"required":["status","last_update","stale","next_update_expected"],"x-ref":"#/components/schemas/StatusResponse"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"API key authentication using Bearer token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let status_ref01_data = Object.values(setup.data.existing.status)[0] as any

    // LOAD
    const status_ref01_ent = client.Status()
    const status_ref01_match_dt0: any = {}
    const status_ref01_data_dt0 = (await status_ref01_ent.load(status_ref01_match_dt0)).data()
    assert(null != status_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/status/StatusTestData.json')

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
    ['status01','status02','status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATES_TEST_STATUS_ENTID': idmap,
    'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
    'EXCHANGE_RATES_APIKEY': '',
  })

  idmap = env['EXCHANGE_RATES_TEST_STATUS_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATES_TEST_STATUS_ENTID']
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
  
