# ExchangeRates SDK exists test

require "minitest/autorun"
require_relative "../ExchangeRates_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ExchangeRatesSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
