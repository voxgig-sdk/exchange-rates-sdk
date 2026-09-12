# ExchangeRates SDK configuration

module ExchangeRatesConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ExchangeRates",
        "slug" => "exchange-rates",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.exchangeratesapi.com.au",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "convert" => {},
          "get_api_root" => {},
          "get_historical_rate_for_currency_and_date" => {},
          "get_historical_rates_for_date" => {},
          "latest" => {},
          "status" => {},
          "symbol" => {},
          "timeseries" => {},
        },
      },
      "entity" => {
        "convert" => {
          "fields" => [
            {
              "name" => "date",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "free",
              "short" => "Indicates if this was a free (unauthenticated) request",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "info",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "query",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "result",
              "req" => true,
              "short" => "Conversion result",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "success",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "convert",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "amount",
                        "orig" => "amount",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "2025-08-31",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "AUD",
                        "kind" => "query",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "USD",
                        "kind" => "query",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/convert",
                  "segments" => [
                    {
                      "lit" => "convert",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "amount",
                      "date",
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "convert",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_api_root" => {
          "fields" => [
            {
              "format" => "uri",
              "name" => "documentation",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "version",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_api_root",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "segments" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_historical_rate_for_currency_and_date" => {
          "fields" => [
            {
              "name" => "base",
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "rates",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "timestamp",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "from" => {
              "date" => "date",
            },
            "name" => "id",
            "parts" => [
              "date",
              "currency",
            ],
            "sep" => "/",
          },
          "name" => "get_historical_rate_for_currency_and_date",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "USD",
                        "kind" => "param",
                        "name" => "currency",
                        "orig" => "currency",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2025-08-31",
                        "kind" => "param",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{date}/{currency}",
                  "segments" => [
                    {
                      "var" => "date",
                    },
                    {
                      "var" => "currency",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "currency",
                      "date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "parts" => [
                    "{date}",
                    "{currency}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_historical_rates_for_date" => {
          "fields" => [
            {
              "name" => "base",
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "rates",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "timestamp",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_historical_rates_for_date",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "2025-08-31",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{date}",
                  "rename" => {
                    "param" => {
                      "date" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "parts" => [
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "latest" => {
          "fields" => [
            {
              "name" => "base",
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "rates",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "timestamp",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "latest",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "AUD",
                        "kind" => "query",
                        "name" => "base",
                        "orig" => "base",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "USD,EUR,GBP",
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/latest",
                  "segments" => [
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "base",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "parts" => [
                    "latest",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "USD",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "currency",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/latest/{currency}",
                  "rename" => {
                    "param" => {
                      "currency" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "latest",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "parts" => [
                    "latest",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "status" => {
          "fields" => [
            {
              "name" => "last_update",
              "req" => true,
              "short" => "Last successful data update timestamp or 'unknown'",
              "type" => "`$STRING`",
            },
            {
              "name" => "next_update_expected",
              "req" => true,
              "short" => "ISO 8601 timestamp of when next RBA update is expected",
              "type" => "`$STRING`",
            },
            {
              "name" => "stale",
              "req" => true,
              "short" => "Whether the data is considered stale",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "Current API status",
              "type" => "`$STRING`",
            },
          ],
          "name" => "status",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/status",
                  "segments" => [
                    {
                      "lit" => "status",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "status",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "symbol" => {
          "fields" => [
            {
              "name" => "country",
              "req" => true,
              "short" => "Country or region",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Full name of the currency",
              "type" => "`$STRING`",
            },
            {
              "name" => "symbol",
              "req" => true,
              "short" => "Currency symbol",
              "type" => "`$STRING`",
            },
          ],
          "name" => "symbol",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/symbols",
                  "segments" => [
                    {
                      "lit" => "symbols",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.symbols`",
                  },
                  "parts" => [
                    "symbols",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "timeseries" => {
          "fields" => [
            {
              "name" => "base",
              "type" => "`$STRING`",
            },
            {
              "name" => "end_date",
              "type" => "`$STRING`",
            },
            {
              "name" => "rates",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "start_date",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "timeseries",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "timeseries",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "AUD",
                        "kind" => "query",
                        "name" => "base",
                        "orig" => "base",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2025-08-31",
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2025-08-01",
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "USD,EUR,GBP",
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/timeseries",
                  "segments" => [
                    {
                      "lit" => "timeseries",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "base",
                      "end_date",
                      "start_date",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.rates`",
                  },
                  "parts" => [
                    "timeseries",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ExchangeRatesFeatures.make_feature(name)
  end
end
