
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ExchangeRatesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ExchangeRatesSDK.test()
    equal(testsdk instanceof ExchangeRatesSDK, true,
      'ExchangeRatesSDK.test() must return a client synchronously')
  })

})
