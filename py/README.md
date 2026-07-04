# ExchangeRates Python SDK



The Python SDK for the ExchangeRates API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/exchange-rates-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from exchangerates_sdk import ExchangeRatesSDK

client = ExchangeRatesSDK({
    "apikey": os.environ.get("EXCHANGE_RATES_APIKEY"),
})
```

### 3. Load a convert

```python
try:
    result = client.convert.load({"id": "example_id"})
    print(result)
except Exception as err:
    print(f"load failed: {err}")
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    print(result["err"])     # error value
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ExchangeRatesSDK.test()

result = client.convert.load({"id": "test01"})
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ExchangeRatesSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ExchangeRatesSDK

```python
from exchangerates_sdk import ExchangeRatesSDK

client = ExchangeRatesSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ExchangeRatesSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ExchangeRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `const convert = client.convert`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | ``$STRING`` |  |
| `free` | ``$BOOLEAN`` |  |
| `info` | ``$OBJECT`` |  |
| `query` | ``$OBJECT`` |  |
| `result` | ``$NUMBER`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const convert = await client.convert.load({ id: 'convert_id' })
```


### GetApiRoot

Create an instance: `const get_api_root = client.get_api_root`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | ``$STRING`` |  |
| `message` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const get_api_root = await client.get_api_root.load({ id: 'get_api_root_id' })
```


### GetHistoricalRateForCurrencyAndDate

Create an instance: `const get_historical_rate_for_currency_and_date = client.get_historical_rate_for_currency_and_date`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |
| `timestamp` | ``$INTEGER`` |  |

#### Example: Load

```ts
const get_historical_rate_for_currency_and_date = await client.get_historical_rate_for_currency_and_date.load({ id: 'get_historical_rate_for_currency_and_date_id' })
```


### GetHistoricalRatesForDate

Create an instance: `const get_historical_rates_for_date = client.get_historical_rates_for_date`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |
| `timestamp` | ``$INTEGER`` |  |

#### Example: Load

```ts
const get_historical_rates_for_date = await client.get_historical_rates_for_date.load({ id: 'get_historical_rates_for_date_id' })
```


### Latest

Create an instance: `const latest = client.latest`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |
| `success` | ``$BOOLEAN`` |  |
| `timestamp` | ``$INTEGER`` |  |

#### Example: Load

```ts
const latest = await client.latest.load({ id: 'latest_id' })
```


### Status

Create an instance: `const status = client.status`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_update` | ``$STRING`` |  |
| `next_update_expected` | ``$STRING`` |  |
| `stale` | ``$BOOLEAN`` |  |
| `status` | ``$STRING`` |  |

#### Example: Load

```ts
const status = await client.status.load({ id: 'status_id' })
```


### Symbol

Create an instance: `const symbol = client.symbol`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `count` | ``$INTEGER`` |  |
| `note` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `symbol` | ``$OBJECT`` |  |

#### Example: Load

```ts
const symbol = await client.symbol.load({ id: 'symbol_id' })
```


### Timeseries

Create an instance: `const timeseries = client.timeseries`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | ``$STRING`` |  |
| `end_date` | ``$STRING`` |  |
| `rate` | ``$OBJECT`` |  |
| `start_date` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `timeseries` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const timeseries = await client.timeseries.load({ id: 'timeseries_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── exchangerates_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`exchangerates_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
convert = client.convert
convert.load({"id": "example_id"})

# convert.data_get() now returns the loaded convert data
# convert.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
