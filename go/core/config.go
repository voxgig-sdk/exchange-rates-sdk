package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ExchangeRates",
			"slug": "exchange-rates",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.exchangeratesapi.com.au",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"convert": map[string]any{},
				"get_api_root": map[string]any{},
				"get_historical_rate_for_currency_and_date": map[string]any{},
				"get_historical_rates_for_date": map[string]any{},
				"latest": map[string]any{},
				"status": map[string]any{},
				"symbol": map[string]any{},
				"timeseries": map[string]any{},
			},
		},
		"entity": map[string]any{
			"convert": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "free",
						"short": "Indicates if this was a free (unauthenticated) request",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "info",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "query",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "result",
						"req": true,
						"short": "Conversion result",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "success",
						"req": true,
						"type": "`$BOOLEAN`",
					},
				},
				"name": "convert",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "amount",
											"orig": "amount",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "2025-08-31",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "AUD",
											"kind": "query",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "USD",
											"kind": "query",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/convert",
								"segments": []any{
									map[string]any{
										"lit": "convert",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"amount",
										"date",
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"convert",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_api_root": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "uri",
						"name": "documentation",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "get_api_root",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_historical_rate_for_currency_and_date": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"date": "date",
					},
					"name": "id",
					"parts": []any{
						"date",
						"currency",
					},
					"sep": "/",
				},
				"name": "get_historical_rate_for_currency_and_date",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "USD",
											"kind": "param",
											"name": "currency",
											"orig": "currency",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2025-08-31",
											"kind": "param",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{date}/{currency}",
								"segments": []any{
									map[string]any{
										"var": "date",
									},
									map[string]any{
										"var": "currency",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"currency",
										"date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"parts": []any{
									"{date}",
									"{currency}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_historical_rates_for_date": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "get_historical_rates_for_date",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "2025-08-31",
											"kind": "param",
											"name": "id",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{date}",
								"rename": map[string]any{
									"param": map[string]any{
										"date": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"parts": []any{
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"latest": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "latest",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "AUD",
											"kind": "query",
											"name": "base",
											"orig": "base",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "USD,EUR,GBP",
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/latest",
								"segments": []any{
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"parts": []any{
									"latest",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "USD",
											"kind": "param",
											"name": "id",
											"orig": "currency",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/latest/{currency}",
								"rename": map[string]any{
									"param": map[string]any{
										"currency": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "latest",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"parts": []any{
									"latest",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "last_update",
						"req": true,
						"short": "Last successful data update timestamp or 'unknown'",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "next_update_expected",
						"req": true,
						"short": "ISO 8601 timestamp of when next RBA update is expected",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stale",
						"req": true,
						"short": "Whether the data is considered stale",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Current API status",
						"type": "`$STRING`",
					},
				},
				"name": "status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/status",
								"segments": []any{
									map[string]any{
										"lit": "status",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"status",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"symbol": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"req": true,
						"short": "Country or region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Full name of the currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "symbol",
						"req": true,
						"short": "Currency symbol",
						"type": "`$STRING`",
					},
				},
				"name": "symbol",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/symbols",
								"segments": []any{
									map[string]any{
										"lit": "symbols",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.symbols`",
								},
								"parts": []any{
									"symbols",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"timeseries": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timeseries",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "timeseries",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "AUD",
											"kind": "query",
											"name": "base",
											"orig": "base",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2025-08-31",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2025-08-01",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "USD,EUR,GBP",
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/timeseries",
								"segments": []any{
									map[string]any{
										"lit": "timeseries",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base",
										"end_date",
										"start_date",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"parts": []any{
									"timeseries",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
