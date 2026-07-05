# ExchangeRates Ruby SDK Reference

Complete API reference for the ExchangeRates Ruby SDK.


## ExchangeRatesSDK

### Constructor

```ruby
require_relative 'ExchangeRates_sdk'

client = ExchangeRatesSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ExchangeRatesSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ExchangeRatesSDK.test
```


### Instance Methods

#### `Convert(data = nil)`

Create a new `Convert` entity instance. Pass `nil` for no initial data.

#### `GetApiRoot(data = nil)`

Create a new `GetApiRoot` entity instance. Pass `nil` for no initial data.

#### `GetHistoricalRateForCurrencyAndDate(data = nil)`

Create a new `GetHistoricalRateForCurrencyAndDate` entity instance. Pass `nil` for no initial data.

#### `GetHistoricalRatesForDate(data = nil)`

Create a new `GetHistoricalRatesForDate` entity instance. Pass `nil` for no initial data.

#### `Latest(data = nil)`

Create a new `Latest` entity instance. Pass `nil` for no initial data.

#### `Status(data = nil)`

Create a new `Status` entity instance. Pass `nil` for no initial data.

#### `Symbol(data = nil)`

Create a new `Symbol` entity instance. Pass `nil` for no initial data.

#### `Timeseries(data = nil)`

Create a new `Timeseries` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ConvertEntity

```ruby
convert = client.Convert
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `String` | Yes |  |
| `free` | `Boolean` | No |  |
| `info` | `Hash` | Yes |  |
| `query` | `Hash` | Yes |  |
| `result` | `Float` | Yes |  |
| `success` | `Boolean` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Convert.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConvertEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetApiRootEntity

```ruby
get_api_root = client.GetApiRoot
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `String` | Yes |  |
| `message` | `String` | Yes |  |
| `success` | `Boolean` | Yes |  |
| `version` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetApiRoot.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetApiRootEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetHistoricalRateForCurrencyAndDateEntity

```ruby
get_historical_rate_for_currency_and_date = client.GetHistoricalRateForCurrencyAndDate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `String` | Yes |  |
| `date` | `String` | Yes |  |
| `rate` | `Hash` | Yes |  |
| `success` | `Boolean` | Yes |  |
| `timestamp` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetHistoricalRateForCurrencyAndDate.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetHistoricalRatesForDateEntity

```ruby
get_historical_rates_for_date = client.GetHistoricalRatesForDate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `String` | Yes |  |
| `date` | `String` | Yes |  |
| `rate` | `Hash` | Yes |  |
| `success` | `Boolean` | Yes |  |
| `timestamp` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetHistoricalRatesForDate.load({ "id" => "get_historical_rates_for_date_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetHistoricalRatesForDateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LatestEntity

```ruby
latest = client.Latest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `String` | Yes |  |
| `date` | `String` | Yes |  |
| `rate` | `Hash` | Yes |  |
| `success` | `Boolean` | Yes |  |
| `timestamp` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Latest.load({ "id" => "latest_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LatestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StatusEntity

```ruby
status = client.Status
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | `String` | Yes |  |
| `next_update_expected` | `String` | Yes |  |
| `stale` | `Boolean` | Yes |  |
| `status` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Status.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SymbolEntity

```ruby
symbol = client.Symbol
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `String` | Yes |  |
| `count` | `Integer` | Yes |  |
| `note` | `String` | Yes |  |
| `success` | `Boolean` | Yes |  |
| `symbol` | `Hash` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Symbol.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SymbolEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TimeseriesEntity

```ruby
timeseries = client.Timeseries
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `String` | Yes |  |
| `end_date` | `String` | Yes |  |
| `rate` | `Hash` | Yes |  |
| `start_date` | `String` | Yes |  |
| `success` | `Boolean` | Yes |  |
| `timeseries` | `Boolean` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Timeseries.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TimeseriesEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ExchangeRatesSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

