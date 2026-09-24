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
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "free",
						"title": "Free",
						"type": "`$BOOLEAN`",
						"short": "Indicates if this was a free (unauthenticated) request",
					},
					map[string]any{
						"name": "info",
						"title": "Info",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Conversion result",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "convert",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/convert",
								"segments": []any{
									map[string]any{
										"lit": "convert",
									},
								},
								"parts": []any{
									"convert",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "amount",
											"orig": "amount",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 100,
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-08-31",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "AUD",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "USD",
										},
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
						"name": "documentation",
						"title": "Documentation",
						"type": "`$STRING`",
						"req": true,
						"format": "uri",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "get_api_root",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
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
								"parts": []any{
									"{date}",
									"{currency}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "currency",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "USD",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2025-08-31",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"currency",
										"date",
									},
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
						"title": "Base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
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
								"kind": "http",
								"method": "GET",
								"orig": "/{date}",
								"segments": []any{
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"date": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "2025-08-31",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
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
								"kind": "http",
								"method": "GET",
								"orig": "/latest",
								"segments": []any{
									map[string]any{
										"lit": "latest",
									},
								},
								"parts": []any{
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "base",
											"orig": "base",
											"type": "`$STRING`",
											"kind": "query",
											"example": "AUD",
										},
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"example": "USD,EUR,GBP",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base",
										"symbol",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/latest/{currency}",
								"segments": []any{
									map[string]any{
										"lit": "latest",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"latest",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"currency": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "currency",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "USD",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Last Update",
						"type": "`$STRING`",
						"req": true,
						"short": "Last successful data update timestamp or 'unknown'",
					},
					map[string]any{
						"name": "next_update_expected",
						"title": "Next Update Expected",
						"type": "`$STRING`",
						"req": true,
						"short": "ISO 8601 timestamp of when next RBA update is expected",
					},
					map[string]any{
						"name": "stale",
						"title": "Stale",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the data is considered stale",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Current API status",
					},
				},
				"name": "status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/status",
								"segments": []any{
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"short": "Country or region",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Full name of the currency",
					},
					map[string]any{
						"name": "symbol",
						"title": "Symbol",
						"type": "`$STRING`",
						"req": true,
						"short": "Currency symbol",
					},
				},
				"name": "symbol",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/symbols",
								"segments": []any{
									map[string]any{
										"lit": "symbols",
									},
								},
								"parts": []any{
									"symbols",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.symbols`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Base",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start_date",
						"title": "Start Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "timeseries",
						"title": "Timeseries",
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
								"kind": "http",
								"method": "GET",
								"orig": "/timeseries",
								"segments": []any{
									map[string]any{
										"lit": "timeseries",
									},
								},
								"parts": []any{
									"timeseries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rates`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "base",
											"orig": "base",
											"type": "`$STRING`",
											"kind": "query",
											"example": "AUD",
										},
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2025-08-31",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2025-08-01",
										},
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"example": "USD,EUR,GBP",
										},
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
