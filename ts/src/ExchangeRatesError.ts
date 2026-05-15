
import { Context } from './Context'


class ExchangeRatesError extends Error {

  isExchangeRatesError = true

  sdk = 'ExchangeRates'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ExchangeRatesError
}

