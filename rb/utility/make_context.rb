# ExchangeRates SDK utility: make_context
require_relative '../core/context'
module ExchangeRatesUtilities
  MakeContext = ->(ctxmap, basectx) {
    ExchangeRatesContext.new(ctxmap, basectx)
  }
end
