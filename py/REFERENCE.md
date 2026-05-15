# ExchangeRates Python SDK Reference

Complete API reference for the ExchangeRates Python SDK.


## ExchangeRatesSDK

### Constructor

```python
from exchange-rates_sdk import ExchangeRatesSDK

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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## ConvertEntity

```python
convert = client.Convert()
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

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Convert().load({"id": "convert_id"})
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
| `documentation` | ``$STRING`` | Yes |  |
| `message` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.GetApiRoot().load({"id": "get_api_root_id"})
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
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.GetHistoricalRateForCurrencyAndDate().load({"id": "get_historical_rate_for_currency_and_date_id"})
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
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.GetHistoricalRatesForDate().load({"id": "get_historical_rates_for_date_id"})
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
| `base` | ``$STRING`` | Yes |  |
| `date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Latest().load({"id": "latest_id"})
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
| `last_update` | ``$STRING`` | Yes |  |
| `next_update_expected` | ``$STRING`` | Yes |  |
| `stale` | ``$BOOLEAN`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Status().load({"id": "status_id"})
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
| `base` | ``$STRING`` | Yes |  |
| `count` | ``$INTEGER`` | Yes |  |
| `note` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `symbol` | ``$OBJECT`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Symbol().load({"id": "symbol_id"})
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
| `base` | ``$STRING`` | Yes |  |
| `end_date` | ``$STRING`` | Yes |  |
| `rate` | ``$OBJECT`` | Yes |  |
| `start_date` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `timeseries` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Timeseries().load({"id": "timeseries_id"})
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

