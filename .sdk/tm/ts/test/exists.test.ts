
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ExchangeRatesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ExchangeRatesSDK.test()
    equal(null !== testsdk, true)
  })

})
