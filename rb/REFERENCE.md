# ExchangeRates Ruby SDK Reference

Complete API reference for the ExchangeRates Ruby SDK.


## ExchangeRatesSDK

### Constructor

```ruby
require_relative 'exchange-rates_sdk'

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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## ConvertEntity

```ruby
convert = client.Convert
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | Yes |  |
| `free` | ``$BOOLEAN`` | No |  |
| `info` | ``$OBJECT`` | Yes |  |
| `query` | ``$OBJECT`` | Yes |  |
| `result` | ``$NUMBER`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Convert.load({ "id" => "convert_id" })
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
| `documentation` | ``$STRING`` | Yes |  |
| `message` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GetApiRoot.load({ "id" => "get_api_root_id" })
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
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GetHistoricalRateForCurrencyAndDate.load({ "id" => "get_historical_rate_for_currency_and_date_id" })
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
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GetHistoricalRatesForDate.load({ "id" => "get_historical_rates_for_date_id" })
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
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Latest.load({ "id" => "latest_id" })
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
| `last_update` | ``$STRING`` | Yes |  |
| `next_update_expected` | ``$STRING`` | Yes |  |
| `stale` | ``$BOOLEAN`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Status.load({ "id" => "status_id" })
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
| `base` | ``$STRING`` | Yes |  |
| `count` | ``$INTEGER`` | Yes |  |
| `note` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `symbol` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Symbol.load({ "id" => "symbol_id" })
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
| `base` | ``$STRING`` | Yes |  |
| `end_date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `start_date` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timeseries` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Timeseries.load({ "id" => "timeseries_id" })
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

