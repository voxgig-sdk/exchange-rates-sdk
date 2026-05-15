package voxgigexchangeratessdk

import (
	"github.com/voxgig-sdk/exchange-rates-sdk/core"
	"github.com/voxgig-sdk/exchange-rates-sdk/entity"
	"github.com/voxgig-sdk/exchange-rates-sdk/feature"
	_ "github.com/voxgig-sdk/exchange-rates-sdk/utility"
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
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
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
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
