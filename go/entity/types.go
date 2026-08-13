// Typed models for the ExchangeRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/exchange-rates-sdk/go/core"
)

// Convert is the typed data model for the convert entity.
type Convert struct {
	Date string `json:"date"`
	Free *bool `json:"free,omitempty"`
	Info map[string]any `json:"info"`
	Query map[string]any `json:"query"`
	Result float64 `json:"result"`
	Success bool `json:"success"`
}

// ConvertLoadMatch is the typed request payload for Convert.LoadTyped.
type ConvertLoadMatch struct {
	Date *string `json:"date,omitempty"`
	Free *bool `json:"free,omitempty"`
	Info *map[string]any `json:"info,omitempty"`
	Query *map[string]any `json:"query,omitempty"`
	Result *float64 `json:"result,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// GetApiRoot is the typed data model for the get_api_root entity.
type GetApiRoot struct {
	Documentation string `json:"documentation"`
	Message string `json:"message"`
	Success bool `json:"success"`
	Version string `json:"version"`
}

// GetApiRootLoadMatch is the typed request payload for GetApiRoot.LoadTyped.
type GetApiRootLoadMatch struct {
	Documentation *string `json:"documentation,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
	Version *string `json:"version,omitempty"`
}

// GetHistoricalRateForCurrencyAndDate is the typed data model for the get_historical_rate_for_currency_and_date entity.
type GetHistoricalRateForCurrencyAndDate struct {
	Base *string `json:"base,omitempty"`
	Date *string `json:"date,omitempty"`
	Rates *map[string]any `json:"rates,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
}

// GetHistoricalRateForCurrencyAndDateLoadMatch is the typed request payload for GetHistoricalRateForCurrencyAndDate.LoadTyped.
type GetHistoricalRateForCurrencyAndDateLoadMatch struct {
	Currency string `json:"currency"`
	Date string `json:"date"`
}

// GetHistoricalRatesForDate is the typed data model for the get_historical_rates_for_date entity.
type GetHistoricalRatesForDate struct {
	Base *string `json:"base,omitempty"`
	Date *string `json:"date,omitempty"`
	Rates *map[string]any `json:"rates,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
}

// GetHistoricalRatesForDateLoadMatch is the typed request payload for GetHistoricalRatesForDate.LoadTyped.
type GetHistoricalRatesForDateLoadMatch struct {
	Id string `json:"id"`
}

// Latest is the typed data model for the latest entity.
type Latest struct {
	Base *string `json:"base,omitempty"`
	Date *string `json:"date,omitempty"`
	Rates *map[string]any `json:"rates,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
}

// LatestLoadMatch is the typed request payload for Latest.LoadTyped.
type LatestLoadMatch struct {
	Id *string `json:"id,omitempty"`
}

// Status is the typed data model for the status entity.
type Status struct {
	LastUpdate string `json:"last_update"`
	NextUpdateExpected string `json:"next_update_expected"`
	Stale bool `json:"stale"`
	Status string `json:"status"`
}

// StatusLoadMatch is the typed request payload for Status.LoadTyped.
type StatusLoadMatch struct {
	LastUpdate *string `json:"last_update,omitempty"`
	NextUpdateExpected *string `json:"next_update_expected,omitempty"`
	Stale *bool `json:"stale,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Symbol is the typed data model for the symbol entity.
type Symbol struct {
	Country string `json:"country"`
	Name string `json:"name"`
	Symbol string `json:"symbol"`
}

// SymbolLoadMatch is the typed request payload for Symbol.LoadTyped.
type SymbolLoadMatch struct {
	Country *string `json:"country,omitempty"`
	Name *string `json:"name,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
}

// Timeseries is the typed data model for the timeseries entity.
type Timeseries struct {
	Base *string `json:"base,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Rates *map[string]any `json:"rates,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timeseries *bool `json:"timeseries,omitempty"`
}

// TimeseriesLoadMatch is the typed request payload for Timeseries.LoadTyped.
type TimeseriesLoadMatch struct {
	Base *string `json:"base,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Rates *map[string]any `json:"rates,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Success *bool `json:"success,omitempty"`
	Timeseries *bool `json:"timeseries,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
