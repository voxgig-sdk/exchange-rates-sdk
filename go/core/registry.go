package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewConvertEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewGetApiRootEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewGetHistoricalRateForCurrencyAndDateEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewGetHistoricalRatesForDateEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewLatestEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewStatusEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewSymbolEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

var NewTimeseriesEntityFunc func(client *ExchangeRatesSDK, entopts map[string]any) ExchangeRatesEntity

