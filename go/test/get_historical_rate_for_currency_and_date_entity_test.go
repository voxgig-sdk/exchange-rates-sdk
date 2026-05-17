package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/exchange-rates-sdk/go"
	"github.com/voxgig-sdk/exchange-rates-sdk/go/core"

	vs "github.com/voxgig-sdk/exchange-rates-sdk/go/utility/struct"
)

func TestGetHistoricalRateForCurrencyAndDateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetHistoricalRateForCurrencyAndDate(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetHistoricalRateForCurrencyAndDateEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_historical_rate_for_currency_and_dateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_historical_rate_for_currency_and_date." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set EXCHANGERATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getHistoricalRateForCurrencyAndDateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_historical_rate_for_currency_and_date", setup.data)))
		var getHistoricalRateForCurrencyAndDateRef01Data map[string]any
		if len(getHistoricalRateForCurrencyAndDateRef01DataRaw) > 0 {
			getHistoricalRateForCurrencyAndDateRef01Data = core.ToMapAny(getHistoricalRateForCurrencyAndDateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getHistoricalRateForCurrencyAndDateRef01Data

		// LOAD
		getHistoricalRateForCurrencyAndDateRef01Ent := client.GetHistoricalRateForCurrencyAndDate(nil)
		getHistoricalRateForCurrencyAndDateRef01MatchDt0 := map[string]any{}
		getHistoricalRateForCurrencyAndDateRef01DataDt0Loaded, err := getHistoricalRateForCurrencyAndDateRef01Ent.Load(getHistoricalRateForCurrencyAndDateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if getHistoricalRateForCurrencyAndDateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func get_historical_rate_for_currency_and_dateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_historical_rate_for_currency_and_date", "GetHistoricalRateForCurrencyAndDateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_historical_rate_for_currency_and_date test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_historical_rate_for_currency_and_date test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_historical_rate_for_currency_and_date01", "get_historical_rate_for_currency_and_date02", "get_historical_rate_for_currency_and_date03", "date01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("EXCHANGERATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EXCHANGERATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID": idmap,
		"EXCHANGERATES_TEST_LIVE":      "FALSE",
		"EXCHANGERATES_TEST_EXPLAIN":   "FALSE",
		"EXCHANGERATES_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EXCHANGERATES_TEST_GET_HISTORICAL_RATE_FOR_CURRENCY_AND_DATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EXCHANGERATES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["EXCHANGERATES_APIKEY"],
			},
			extra,
		})
		client = sdk.NewExchangeRatesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EXCHANGERATES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EXCHANGERATES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
