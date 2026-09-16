package voxgigexchangeratessdk

import (
	"github.com/voxgig-sdk/exchange-rates-sdk/go/core"
	"github.com/voxgig-sdk/exchange-rates-sdk/go/entity"
	"github.com/voxgig-sdk/exchange-rates-sdk/go/feature"
	_ "github.com/voxgig-sdk/exchange-rates-sdk/go/utility"
)

// Type aliases preserve external API.
type ExchangeRatesSDK = core.ExchangeRatesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ExchangeRatesEntity = core.ExchangeRatesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ExchangeRatesError = core.ExchangeRatesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewConvertEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewConvertEntity(client, entopts)
	}
	core.NewGetApiRootEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewGetApiRootEntity(client, entopts)
	}
	core.NewGetHistoricalRateForCurrencyAndDateEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewGetHistoricalRateForCurrencyAndDateEntity(client, entopts)
	}
	core.NewGetHistoricalRatesForDateEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewGetHistoricalRatesForDateEntity(client, entopts)
	}
	core.NewLatestEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewLatestEntity(client, entopts)
	}
	core.NewStatusEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewStatusEntity(client, entopts)
	}
	core.NewSymbolEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewSymbolEntity(client, entopts)
	}
	core.NewTimeseriesEntityFunc = func(client *core.ExchangeRatesSDK, entopts map[string]any) core.ExchangeRatesEntity {
		return entity.NewTimeseriesEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewExchangeRatesSDK = core.NewExchangeRatesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewExchangeRatesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ExchangeRatesSDK  { return NewExchangeRatesSDK(nil) }
func Test() *ExchangeRatesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
