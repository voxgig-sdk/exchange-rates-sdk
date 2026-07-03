# ExchangeRates Golang SDK Reference

Complete API reference for the ExchangeRates Golang SDK.


## ExchangeRatesSDK

### Constructor

```go
func NewExchangeRatesSDK(options map[string]any) *ExchangeRatesSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ExchangeRatesSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ExchangeRatesSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Convert(data map[string]any) ExchangeRatesEntity`

Create a new `Convert` entity instance. Pass `nil` for no initial data.

#### `GetApiRoot(data map[string]any) ExchangeRatesEntity`

Create a new `GetApiRoot` entity instance. Pass `nil` for no initial data.

#### `GetHistoricalRateForCurrencyAndDate(data map[string]any) ExchangeRatesEntity`

Create a new `GetHistoricalRateForCurrencyAndDate` entity instance. Pass `nil` for no initial data.

#### `GetHistoricalRatesForDate(data map[string]any) ExchangeRatesEntity`

Create a new `GetHistoricalRatesForDate` entity instance. Pass `nil` for no initial data.

#### `Latest(data map[string]any) ExchangeRatesEntity`

Create a new `Latest` entity instance. Pass `nil` for no initial data.

#### `Status(data map[string]any) ExchangeRatesEntity`

Create a new `Status` entity instance. Pass `nil` for no initial data.

#### `Symbol(data map[string]any) ExchangeRatesEntity`

Create a new `Symbol` entity instance. Pass `nil` for no initial data.

#### `Timeseries(data map[string]any) ExchangeRatesEntity`

Create a new `Timeseries` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ConvertEntity

```go
convert := client.Convert(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Convert(nil).Load(map[string]any{"id": "convert_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConvertEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetApiRootEntity

```go
get_api_root := client.GetApiRoot(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | Yes |  |
| `message` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetApiRoot(nil).Load(map[string]any{"id": "get_api_root_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetApiRootEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetHistoricalRateForCurrencyAndDateEntity

```go
get_historical_rate_for_currency_and_date := client.GetHistoricalRateForCurrencyAndDate(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetHistoricalRateForCurrencyAndDate(nil).Load(map[string]any{"id": "get_historical_rate_for_currency_and_date_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetHistoricalRatesForDateEntity

```go
get_historical_rates_for_date := client.GetHistoricalRatesForDate(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetHistoricalRatesForDate(nil).Load(map[string]any{"id": "get_historical_rates_for_date_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetHistoricalRatesForDateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LatestEntity

```go
latest := client.Latest(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Latest(nil).Load(map[string]any{"id": "latest_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LatestEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StatusEntity

```go
status := client.Status(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | ``$STRING`` | Yes |  |
| `next_update_expected` | ``$STRING`` | Yes |  |
| `stale` | ``$BOOLEAN`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Status(nil).Load(map[string]any{"id": "status_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SymbolEntity

```go
symbol := client.Symbol(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Symbol(nil).Load(map[string]any{"id": "symbol_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SymbolEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TimeseriesEntity

```go
timeseries := client.Timeseries(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Timeseries(nil).Load(map[string]any{"id": "timeseries_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TimeseriesEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewExchangeRatesSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

