# ExchangeRates SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ExchangeRatesFeatures
  def self.make_feature(name)
    case name
    when "base"
      ExchangeRatesBaseFeature.new
    when "test"
      ExchangeRatesTestFeature.new
    else
      ExchangeRatesBaseFeature.new
    end
  end
end
