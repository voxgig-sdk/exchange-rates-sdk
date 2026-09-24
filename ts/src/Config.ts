
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ExchangeRates',
        slug: "exchange-rates",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.exchangeratesapi.com.au",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        convert: {
        },
  
        get_api_root: {
        },
  
        get_historical_rate_for_currency_and_date: {
        },
  
        get_historical_rates_for_date: {
        },
  
        latest: {
        },
  
        status: {
        },
  
        symbol: {
        },
  
        timeseries: {
        },
  
    }
  }


  entity = {
    "convert": {
      "fields": [
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "free",
          "title": "Free",
          "type": "`$BOOLEAN`",
          "short": "Indicates if this was a free (unauthenticated) request"
        },
        {
          "name": "info",
          "title": "Info",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "query",
          "title": "Query",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "result",
          "title": "Result",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Conversion result"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "convert",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/convert",
              "segments": [
                {
                  "lit": "convert"
                }
              ],
              "parts": [
                "convert"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "amount",
                    "orig": "amount",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "reqd": true,
                    "example": 100
                  },
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-08-31"
                  },
                  {
                    "name": "from",
                    "orig": "from",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "AUD"
                  },
                  {
                    "name": "to",
                    "orig": "to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "USD"
                  }
                ]
              },
              "select": {
                "exist": [
                  "amount",
                  "date",
                  "from",
                  "to"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_api_root": {
      "fields": [
        {
          "name": "documentation",
          "title": "Documentation",
          "type": "`$STRING`",
          "req": true,
          "format": "uri"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "get_api_root",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "segments": [],
              "parts": [],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_historical_rate_for_currency_and_date": {
      "fields": [
        {
          "name": "base",
          "title": "Base",
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "rates",
          "title": "Rates",
          "type": "`$OBJECT`"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "from": {
          "date": "date"
        },
        "name": "id",
        "parts": [
          "date",
          "currency"
        ],
        "sep": "/"
      },
      "name": "get_historical_rate_for_currency_and_date",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/{date}/{currency}",
              "segments": [
                {
                  "var": "date"
                },
                {
                  "var": "currency"
                }
              ],
              "parts": [
                "{date}",
                "{currency}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rates`"
              },
              "args": {
                "params": [
                  {
                    "name": "currency",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "USD"
                  },
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "2025-08-31"
                  }
                ]
              },
              "select": {
                "exist": [
                  "currency",
                  "date"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_historical_rates_for_date": {
      "fields": [
        {
          "name": "base",
          "title": "Base",
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "rates",
          "title": "Rates",
          "type": "`$OBJECT`"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "get_historical_rates_for_date",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/{date}",
              "segments": [
                {
                  "var": "id"
                }
              ],
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "date": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rates`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "2025-08-31"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "latest": {
      "fields": [
        {
          "name": "base",
          "title": "Base",
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "rates",
          "title": "Rates",
          "type": "`$OBJECT`"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "latest",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/latest",
              "segments": [
                {
                  "lit": "latest"
                }
              ],
              "parts": [
                "latest"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rates`"
              },
              "args": {
                "query": [
                  {
                    "name": "base",
                    "orig": "base",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "AUD"
                  },
                  {
                    "name": "symbol",
                    "orig": "symbol",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "USD,EUR,GBP"
                  }
                ]
              },
              "select": {
                "exist": [
                  "base",
                  "symbol"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/latest/{currency}",
              "segments": [
                {
                  "lit": "latest"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "latest",
                "{id}"
              ],
              "rename": {
                "param": {
                  "currency": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rates`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "currency",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "USD"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "status": {
      "fields": [
        {
          "name": "last_update",
          "title": "Last Update",
          "type": "`$STRING`",
          "req": true,
          "short": "Last successful data update timestamp or 'unknown'"
        },
        {
          "name": "next_update_expected",
          "title": "Next Update Expected",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp of when next RBA update is expected"
        },
        {
          "name": "stale",
          "title": "Stale",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the data is considered stale"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true,
          "short": "Current API status"
        }
      ],
      "name": "status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/status",
              "segments": [
                {
                  "lit": "status"
                }
              ],
              "parts": [
                "status"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "symbol": {
      "fields": [
        {
          "name": "country",
          "title": "Country",
          "type": "`$STRING`",
          "req": true,
          "short": "Country or region"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Full name of the currency"
        },
        {
          "name": "symbol",
          "title": "Symbol",
          "type": "`$STRING`",
          "req": true,
          "short": "Currency symbol"
        }
      ],
      "name": "symbol",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/symbols",
              "segments": [
                {
                  "lit": "symbols"
                }
              ],
              "parts": [
                "symbols"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.symbols`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "timeseries": {
      "fields": [
        {
          "name": "base",
          "title": "Base",
          "type": "`$STRING`"
        },
        {
          "name": "end_date",
          "title": "End Date",
          "type": "`$STRING`"
        },
        {
          "name": "rates",
          "title": "Rates",
          "type": "`$OBJECT`"
        },
        {
          "name": "start_date",
          "title": "Start Date",
          "type": "`$STRING`"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "timeseries",
          "title": "Timeseries",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "timeseries",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/timeseries",
              "segments": [
                {
                  "lit": "timeseries"
                }
              ],
              "parts": [
                "timeseries"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rates`"
              },
              "args": {
                "query": [
                  {
                    "name": "base",
                    "orig": "base",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "AUD"
                  },
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "2025-08-31"
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "2025-08-01"
                  },
                  {
                    "name": "symbol",
                    "orig": "symbol",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "USD,EUR,GBP"
                  }
                ]
              },
              "select": {
                "exist": [
                  "base",
                  "end_date",
                  "start_date",
                  "symbol"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

