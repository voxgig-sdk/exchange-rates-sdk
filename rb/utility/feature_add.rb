# ExchangeRates SDK utility: feature_add
module ExchangeRatesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
