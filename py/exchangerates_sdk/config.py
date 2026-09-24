# ExchangeRates SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ExchangeRates",
            "slug": "exchange-rates",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.exchangeratesapi.com.au",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "convert": {},
                "get_api_root": {},
                "get_historical_rate_for_currency_and_date": {},
                "get_historical_rates_for_date": {},
                "latest": {},
                "status": {},
                "symbol": {},
                "timeseries": {},
            },
        },
        "entity": {
      "convert": {
        "fields": [
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "free",
            "title": "Free",
            "type": "`$BOOLEAN`",
            "short": "Indicates if this was a free (unauthenticated) request",
          },
          {
            "name": "info",
            "title": "Info",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "result",
            "title": "Result",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Conversion result",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
            "req": True,
          },
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
                    "lit": "convert",
                  },
                ],
                "parts": [
                  "convert",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "amount",
                      "orig": "amount",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 100,
                    },
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2025-08-31",
                    },
                    {
                      "name": "from",
                      "orig": "from",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "AUD",
                    },
                    {
                      "name": "to",
                      "orig": "to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "USD",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "amount",
                    "date",
                    "from",
                    "to",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_api_root": {
        "fields": [
          {
            "name": "documentation",
            "title": "Documentation",
            "type": "`$STRING`",
            "req": True,
            "format": "uri",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "req": True,
          },
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
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_historical_rate_for_currency_and_date": {
        "fields": [
          {
            "name": "base",
            "title": "Base",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "date": "date",
          },
          "name": "id",
          "parts": [
            "date",
            "currency",
          ],
          "sep": "/",
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
                    "var": "date",
                  },
                  {
                    "var": "currency",
                  },
                ],
                "parts": [
                  "{date}",
                  "{currency}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "args": {
                  "params": [
                    {
                      "name": "currency",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "USD",
                    },
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2025-08-31",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "currency",
                    "date",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_historical_rates_for_date": {
        "fields": [
          {
            "name": "base",
            "title": "Base",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "var": "id",
                  },
                ],
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "date": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2025-08-31",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "latest": {
        "fields": [
          {
            "name": "base",
            "title": "Base",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "latest",
                  },
                ],
                "parts": [
                  "latest",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "args": {
                  "query": [
                    {
                      "name": "base",
                      "orig": "base",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "AUD",
                    },
                    {
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "USD,EUR,GBP",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "base",
                    "symbol",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/latest/{currency}",
                "segments": [
                  {
                    "lit": "latest",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "latest",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "currency": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "currency",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "USD",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "status": {
        "fields": [
          {
            "name": "last_update",
            "title": "Last Update",
            "type": "`$STRING`",
            "req": True,
            "short": "Last successful data update timestamp or 'unknown'",
          },
          {
            "name": "next_update_expected",
            "title": "Next Update Expected",
            "type": "`$STRING`",
            "req": True,
            "short": "ISO 8601 timestamp of when next RBA update is expected",
          },
          {
            "name": "stale",
            "title": "Stale",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Whether the data is considered stale",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Current API status",
          },
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
                    "lit": "status",
                  },
                ],
                "parts": [
                  "status",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "symbol": {
        "fields": [
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "req": True,
            "short": "Country or region",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Full name of the currency",
          },
          {
            "name": "symbol",
            "title": "Symbol",
            "type": "`$STRING`",
            "req": True,
            "short": "Currency symbol",
          },
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
                    "lit": "symbols",
                  },
                ],
                "parts": [
                  "symbols",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.symbols`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "timeseries": {
        "fields": [
          {
            "name": "base",
            "title": "Base",
            "type": "`$STRING`",
          },
          {
            "name": "end_date",
            "title": "End Date",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "start_date",
            "title": "Start Date",
            "type": "`$STRING`",
          },
          {
            "name": "success",
            "title": "Success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timeseries",
            "title": "Timeseries",
            "type": "`$BOOLEAN`",
          },
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
                    "lit": "timeseries",
                  },
                ],
                "parts": [
                  "timeseries",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
                "args": {
                  "query": [
                    {
                      "name": "base",
                      "orig": "base",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "AUD",
                    },
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "2025-08-31",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "2025-08-01",
                    },
                    {
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "USD,EUR,GBP",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "base",
                    "end_date",
                    "start_date",
                    "symbol",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
