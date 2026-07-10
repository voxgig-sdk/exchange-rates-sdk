# ExchangeRates Lua SDK



The Lua SDK for the ExchangeRates API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Convert()` — each with the same small set of operations (`load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/exchange-rates-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("exchange-rates_sdk")

local client = sdk.new({
  apikey = os.getenv("EXCHANGE_RATES_APIKEY"),
})
```

### 3. Load a convert

```lua
local convert, err = client:Convert():load()
if err then error(err) end
print(convert)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local convert, err = client:Convert():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Convert():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### ExchangeRatesSDK

```lua
local sdk = require("exchange-rates_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ExchangeRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local convert, err = client:Convert():load()
    if err then error(err) end
    -- convert is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local convert = client:Convert(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `free` | `boolean` |  |
| `info` | `table` |  |
| `query` | `table` |  |
| `result` | `number` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local convert, err = client:Convert():load()
```


### GetApiRoot

Create an instance: `local get_api_root = client:GetApiRoot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `string` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local get_api_root, err = client:GetApiRoot():load()
```


### GetHistoricalRateForCurrencyAndDate

Create an instance: `local get_historical_rate_for_currency_and_date = client:GetHistoricalRateForCurrencyAndDate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `string` |  |
| `date` | `string` |  |
| `rate` | `table` |  |
| `success` | `boolean` |  |
| `timestamp` | `number` |  |

#### Example: Load

```lua
local get_historical_rate_for_currency_and_date, err = client:GetHistoricalRateForCurrencyAndDate():load({ currency = "currency", date = "date" })
```


### GetHistoricalRatesForDate

Create an instance: `local get_historical_rates_for_date = client:GetHistoricalRatesForDate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `string` |  |
| `date` | `string` |  |
| `rate` | `table` |  |
| `success` | `boolean` |  |
| `timestamp` | `number` |  |

#### Example: Load

```lua
local get_historical_rates_for_date, err = client:GetHistoricalRatesForDate():load({ id = "get_historical_rates_for_date_id" })
```


### Latest

Create an instance: `local latest = client:Latest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `string` |  |
| `date` | `string` |  |
| `rate` | `table` |  |
| `success` | `boolean` |  |
| `timestamp` | `number` |  |

#### Example: Load

```lua
local latest, err = client:Latest():load({ id = "latest_id" })
```


### Status

Create an instance: `local status = client:Status(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `last_update` | `string` |  |
| `next_update_expected` | `string` |  |
| `stale` | `boolean` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local status, err = client:Status():load()
```


### Symbol

Create an instance: `local symbol = client:Symbol(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `string` |  |
| `count` | `number` |  |
| `note` | `string` |  |
| `success` | `boolean` |  |
| `symbol` | `table` |  |

#### Example: Load

```lua
local symbol, err = client:Symbol():load()
```


### Timeseries

Create an instance: `local timeseries = client:Timeseries(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `string` |  |
| `end_date` | `string` |  |
| `rate` | `table` |  |
| `start_date` | `string` |  |
| `success` | `boolean` |  |
| `timeseries` | `boolean` |  |

#### Example: Load

```lua
local timeseries, err = client:Timeseries():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── exchange-rates_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`exchange-rates_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local convert = client:Convert()
convert:load()

-- convert:data_get() now returns the convert data from the last load
-- convert:match_get() returns the last match criteria
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
