# Timeseries entity test

require "minitest/autorun"
require "json"
require_relative "../ExchangeRates_sdk"
require_relative "runner"

class TimeseriesEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ExchangeRatesSDK.test(nil, nil)
    ent = testsdk.Timeseries(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = timeseries_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "timeseries." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EXCHANGERATES_TEST_TIMESERIES_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    timeseries_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.timeseries")))
    timeseries_ref01_data = nil
    if timeseries_ref01_data_raw.length > 0
      timeseries_ref01_data = Helpers.to_map(timeseries_ref01_data_raw[0][1])
    end

    # LOAD
    timeseries_ref01_ent = client.Timeseries(nil)
    timeseries_ref01_match_dt0 = {}
    timeseries_ref01_data_dt0_loaded = timeseries_ref01_ent.load(timeseries_ref01_match_dt0, nil)
    assert !timeseries_ref01_data_dt0_loaded.nil?

  end
end

def timeseries_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "timeseries", "TimeseriesTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ExchangeRatesSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["timeseries01", "timeseries02", "timeseries03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["EXCHANGERATES_TEST_TIMESERIES_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EXCHANGERATES_TEST_TIMESERIES_ENTID" => idmap,
    "EXCHANGERATES_TEST_LIVE" => "FALSE",
    "EXCHANGERATES_TEST_EXPLAIN" => "FALSE",
    "EXCHANGERATES_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["EXCHANGERATES_TEST_TIMESERIES_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EXCHANGERATES_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["EXCHANGERATES_APIKEY"],
      },
      extra || {},
    ])
    client = ExchangeRatesSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["EXCHANGERATES_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["EXCHANGERATES_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
