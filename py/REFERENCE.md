# ExchangeRates Python SDK Reference

Complete API reference for the ExchangeRates Python SDK.


## ExchangeRatesSDK

### Constructor

```python
from exchangerates_sdk import ExchangeRatesSDK

client = ExchangeRatesSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ExchangeRatesSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ExchangeRatesSDK.test()
```


### Instance Methods

#### `Convert(data=None)`

Create a new `ConvertEntity` instance. Pass `None` for no initial data.

#### `GetApiRoot(data=None)`

Create a new `GetApiRootEntity` instance. Pass `None` for no initial data.

#### `GetHistoricalRateForCurrencyAndDate(data=None)`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance. Pass `None` for no initial data.

#### `GetHistoricalRatesForDate(data=None)`

Create a new `GetHistoricalRatesForDateEntity` instance. Pass `None` for no initial data.

#### `Latest(data=None)`

Create a new `LatestEntity` instance. Pass `None` for no initial data.

#### `Status(data=None)`

Create a new `StatusEntity` instance. Pass `None` for no initial data.

#### `Symbol(data=None)`

Create a new `SymbolEntity` instance. Pass `None` for no initial data.

#### `Timeseries(data=None)`

Create a new `TimeseriesEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ConvertEntity

```python
convert = client.Convert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | Yes |  |
| `free` | `bool` | No |  |
| `info` | `dict` | Yes |  |
| `query` | `dict` | Yes |  |
| `result` | `float` | Yes |  |
| `success` | `bool` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Convert().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConvertEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetApiRootEntity

```python
get_api_root = client.GetApiRoot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `str` | Yes |  |
| `message` | `str` | Yes |  |
| `success` | `bool` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetApiRoot().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetApiRootEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetHistoricalRateForCurrencyAndDateEntity

```python
get_historical_rate_for_currency_and_date = client.GetHistoricalRateForCurrencyAndDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes |  |
| `date` | `str` | Yes |  |
| `rate` | `dict` | Yes |  |
| `success` | `bool` | Yes |  |
| `timestamp` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetHistoricalRateForCurrencyAndDate().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetHistoricalRatesForDateEntity

```python
get_historical_rates_for_date = client.GetHistoricalRatesForDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes |  |
| `date` | `str` | Yes |  |
| `rate` | `dict` | Yes |  |
| `success` | `bool` | Yes |  |
| `timestamp` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetHistoricalRatesForDate().load({"id": "get_historical_rates_for_date_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetHistoricalRatesForDateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LatestEntity

```python
latest = client.Latest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes |  |
| `date` | `str` | Yes |  |
| `rate` | `dict` | Yes |  |
| `success` | `bool` | Yes |  |
| `timestamp` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Latest().load({"id": "latest_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LatestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatusEntity

```python
status = client.Status()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | `str` | Yes |  |
| `next_update_expected` | `str` | Yes |  |
| `stale` | `bool` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Status().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SymbolEntity

```python
symbol = client.Symbol()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes |  |
| `count` | `int` | Yes |  |
| `note` | `str` | Yes |  |
| `success` | `bool` | Yes |  |
| `symbol` | `dict` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Symbol().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SymbolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TimeseriesEntity

```python
timeseries = client.Timeseries()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes |  |
| `end_date` | `str` | Yes |  |
| `rate` | `dict` | Yes |  |
| `start_date` | `str` | Yes |  |
| `success` | `bool` | Yes |  |
| `timeseries` | `bool` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Timeseries().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TimeseriesEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ExchangeRatesSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

