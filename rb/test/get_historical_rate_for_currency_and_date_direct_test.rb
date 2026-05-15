# GetHistoricalRateForCurrencyAndDate direct test

require "minitest/autorun"
require "json"
require_relative "../ExchangeRates_sdk"
require_relative "runner"

class GetHistoricalRateForCurrencyAndDateDirectTest < Minitest::Test
  def test_direct_load_get_historical_rate_for_currency_and_date
    setup = get_historical_rate_for_currency_and_date_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-get_historical_rate_for_currency_and_date", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      params["currency"] = "USD"
      params["date"] = "2025-08-31"
    else
      params["currency"] = "direct01"
      params["date"] = "direct02"
    end

    result, err = client.direct({
      "path" => "{date}/{currency}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      # Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      # than fail when the load endpoint isn't reachable with the IDs
      # we can construct from setup.idmap.
      if !err.nil?
        skip("load call failed (likely synthetic IDs against live API): #{err}")
        return
      end
      unless result["ok"]
        skip("load call not ok (likely synthetic IDs against live API)")
        return
      end
      status = Helpers.to_int(result["status"])
      if status < 200 || status >= 300
        skip("expected 2xx status, got #{status}")
        return
      end
    else
      assert_nil err
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def get_historical_rate_for_currency_and_date_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "EXCHANGERATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID" => {},
    "EXCHANGERATES_TEST_LIVE" => "FALSE",
    "EXCHANGERATES_APIKEY" => "NONE",
  })

  live = env["EXCHANGERATES_TEST_LIVE"] == "TRUE"

  if live
    merged_opts = {
      "apikey" => env["EXCHANGERATES_APIKEY"],
    }
    client = ExchangeRatesSDK.new(merged_opts)
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = ExchangeRatesSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
