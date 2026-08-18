# ExchangeRates SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "free",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "info",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "query",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "result",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "success",
            "req": True,
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "convert",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "amount",
                      "orig": "amount",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "2025-08-31",
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "AUD",
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/convert",
                "parts": [
                  "convert",
                ],
                "select": {
                  "exist": [
                    "amount",
                    "date",
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "success",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "version",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "get_api_root",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "name": "get_historical_rate_for_currency_and_date",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "USD",
                      "kind": "param",
                      "name": "currency",
                      "orig": "currency",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2025-08-31",
                      "kind": "param",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{date}/{currency}",
                "parts": [
                  "{date}",
                  "{currency}",
                ],
                "select": {
                  "exist": [
                    "currency",
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
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
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "name": "get_historical_rates_for_date",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "2025-08-31",
                      "kind": "param",
                      "name": "id",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{date}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "date": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
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
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timestamp",
            "type": "`$INTEGER`",
          },
        ],
        "name": "latest",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "AUD",
                      "kind": "query",
                      "name": "base",
                      "orig": "base",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "USD,EUR,GBP",
                      "kind": "query",
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/latest",
                "parts": [
                  "latest",
                ],
                "select": {
                  "exist": [
                    "base",
                    "symbol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "USD",
                      "kind": "param",
                      "name": "id",
                      "orig": "currency",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/latest/{currency}",
                "parts": [
                  "latest",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "currency": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "next_update_expected",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "stale",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "status",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/status",
                "parts": [
                  "status",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "symbol",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "symbol",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/symbols",
                "parts": [
                  "symbols",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.symbols`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "end_date",
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "type": "`$OBJECT`",
          },
          {
            "name": "start_date",
            "type": "`$STRING`",
          },
          {
            "name": "success",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "timeseries",
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
                "args": {
                  "query": [
                    {
                      "example": "AUD",
                      "kind": "query",
                      "name": "base",
                      "orig": "base",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2025-08-31",
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2025-08-01",
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "USD,EUR,GBP",
                      "kind": "query",
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/timeseries",
                "parts": [
                  "timeseries",
                ],
                "select": {
                  "exist": [
                    "base",
                    "end_date",
                    "start_date",
                    "symbol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rates`",
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
