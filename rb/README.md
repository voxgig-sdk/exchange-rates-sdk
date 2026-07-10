# ExchangeRates Ruby SDK



The Ruby SDK for the ExchangeRates API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Convert` — with named operations (`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/exchange-rates-sdk/releases](https://github.com/voxgig-sdk/exchange-rates-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "ExchangeRates_sdk"

client = ExchangeRatesSDK.new({
  "apikey" => ENV["EXCHANGE_RATES_APIKEY"],
})
```

### 3. Load a convert

```ruby
begin
  # load returns the bare Convert record (raises on error).
  convert = client.Convert.load()
  puts convert
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  convert = client.Convert.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = ExchangeRatesSDK.test

# Entity ops return the bare mock record (raises on error).
convert = client.Convert.load()
puts convert
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ExchangeRatesSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
EXCHANGE_RATES_TEST_LIVE=TRUE
EXCHANGE_RATES_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ExchangeRatesSDK

```ruby
require_relative "ExchangeRates_sdk"
client = ExchangeRatesSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ExchangeRatesSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ExchangeRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Convert` | `(data) -> ConvertEntity` | Create a Convert entity instance. |
| `GetApiRoot` | `(data) -> GetApiRootEntity` | Create a GetApiRoot entity instance. |
| `GetHistoricalRateForCurrencyAndDate` | `(data) -> GetHistoricalRateForCurrencyAndDateEntity` | Create a GetHistoricalRateForCurrencyAndDate entity instance. |
| `GetHistoricalRatesForDate` | `(data) -> GetHistoricalRatesForDateEntity` | Create a GetHistoricalRatesForDate entity instance. |
| `Latest` | `(data) -> LatestEntity` | Create a Latest entity instance. |
| `Status` | `(data) -> StatusEntity` | Create a Status entity instance. |
| `Symbol` | `(data) -> SymbolEntity` | Create a Symbol entity instance. |
| `Timeseries` | `(data) -> TimeseriesEntity` | Create a Timeseries entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `ExchangeRatesError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Convert

| Field | Description |
| --- | --- |
| `date` |  |
| `free` |  |
| `info` |  |
| `query` |  |
| `result` |  |
| `success` |  |

Operations: Load.

API path: `/convert`

#### GetApiRoot

| Field | Description |
| --- | --- |
| `documentation` |  |
| `message` |  |
| `success` |  |
| `version` |  |

Operations: Load.

API path: `/`

#### GetHistoricalRateForCurrencyAndDate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |
| `success` |  |
| `timestamp` |  |

Operations: Load.

API path: `/{date}/{currency}`

#### GetHistoricalRatesForDate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |
| `success` |  |
| `timestamp` |  |

Operations: Load.

API path: `/{date}`

#### Latest

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |
| `success` |  |
| `timestamp` |  |

Operations: Load.

API path: `/latest`

#### Status

| Field | Description |
| --- | --- |
| `last_update` |  |
| `next_update_expected` |  |
| `stale` |  |
| `status` |  |

Operations: Load.

API path: `/status`

#### Symbol

| Field | Description |
| --- | --- |
| `base` |  |
| `count` |  |
| `note` |  |
| `success` |  |
| `symbol` |  |

Operations: Load.

API path: `/symbols`

#### Timeseries

| Field | Description |
| --- | --- |
| `base` |  |
| `end_date` |  |
| `rate` |  |
| `start_date` |  |
| `success` |  |
| `timeseries` |  |

Operations: Load.

API path: `/timeseries`



## Entities


### Convert

Create an instance: `convert = client.Convert`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `String` |  |
| `free` | `Boolean` |  |
| `info` | `Hash` |  |
| `query` | `Hash` |  |
| `result` | `Float` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Convert record (raises on error).
convert = client.Convert.load()
```


### GetApiRoot

Create an instance: `get_api_root = client.GetApiRoot`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `String` |  |
| `message` | `String` |  |
| `success` | `Boolean` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare GetApiRoot record (raises on error).
get_api_root = client.GetApiRoot.load()
```


### GetHistoricalRateForCurrencyAndDate

Create an instance: `get_historical_rate_for_currency_and_date = client.GetHistoricalRateForCurrencyAndDate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `String` |  |
| `date` | `String` |  |
| `rate` | `Hash` |  |
| `success` | `Boolean` |  |
| `timestamp` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare GetHistoricalRateForCurrencyAndDate record (raises on error).
get_historical_rate_for_currency_and_date = client.GetHistoricalRateForCurrencyAndDate.load({ "currency" => "currency", "date" => "date" })
```


### GetHistoricalRatesForDate

Create an instance: `get_historical_rates_for_date = client.GetHistoricalRatesForDate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `String` |  |
| `date` | `String` |  |
| `rate` | `Hash` |  |
| `success` | `Boolean` |  |
| `timestamp` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare GetHistoricalRatesForDate record (raises on error).
get_historical_rates_for_date = client.GetHistoricalRatesForDate.load({ "id" => "get_historical_rates_for_date_id" })
```


### Latest

Create an instance: `latest = client.Latest`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `String` |  |
| `date` | `String` |  |
| `rate` | `Hash` |  |
| `success` | `Boolean` |  |
| `timestamp` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Latest record (raises on error).
latest = client.Latest.load({ "id" => "latest_id" })
```


### Status

Create an instance: `status = client.Status`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_update` | `String` |  |
| `next_update_expected` | `String` |  |
| `stale` | `Boolean` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Status record (raises on error).
status = client.Status.load()
```


### Symbol

Create an instance: `symbol = client.Symbol`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `String` |  |
| `count` | `Integer` |  |
| `note` | `String` |  |
| `success` | `Boolean` |  |
| `symbol` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Symbol record (raises on error).
symbol = client.Symbol.load()
```


### Timeseries

Create an instance: `timeseries = client.Timeseries`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `String` |  |
| `end_date` | `String` |  |
| `rate` | `Hash` |  |
| `start_date` | `String` |  |
| `success` | `Boolean` |  |
| `timeseries` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Timeseries record (raises on error).
timeseries = client.Timeseries.load()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── ExchangeRates_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`ExchangeRates_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
convert = client.Convert
convert.load()

# convert.data_get now returns the convert data from the last load
# convert.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
