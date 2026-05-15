# ExchangeRates PHP SDK

The PHP SDK for the ExchangeRates API. Provides an entity-oriented interface using PHP conventions.


## Install
```bash
composer require voxgig/exchange-rates-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'exchangerates_sdk.php';

$client = new ExchangeRatesSDK([
    "apikey" => getenv("EXCHANGE-RATES_APIKEY"),
]);
```

### 3. Load a convert

```php
[$result, $err] = $client->Convert(null)->load(["id" => "example_id"], null);
if ($err) { throw new \Exception($err); }
print_r($result);
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = ExchangeRatesSDK::test(null, null);

[$result, $err] = $client->ExchangeRates(null)->load(
    ["id" => "test01"], null
);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ExchangeRatesSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
EXCHANGE-RATES_TEST_LIVE=TRUE
EXCHANGE-RATES_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ExchangeRatesSDK

```php
require_once 'exchangerates_sdk.php';
$client = new ExchangeRatesSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ExchangeRatesSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ExchangeRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Convert` | `($data): ConvertEntity` | Create a Convert entity instance. |
| `GetApiRoot` | `($data): GetApiRootEntity` | Create a GetApiRoot entity instance. |
| `GetHistoricalRateForCurrencyAndDate` | `($data): GetHistoricalRateForCurrencyAndDateEntity` | Create a GetHistoricalRateForCurrencyAndDate entity instance. |
| `GetHistoricalRatesForDate` | `($data): GetHistoricalRatesForDateEntity` | Create a GetHistoricalRatesForDate entity instance. |
| `Latest` | `($data): LatestEntity` | Create a Latest entity instance. |
| `Status` | `($data): StatusEntity` | Create a Status entity instance. |
| `Symbol` | `($data): SymbolEntity` | Create a Symbol entity instance. |
| `Timeseries` | `($data): TimeseriesEntity` | Create a Timeseries entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const convert = client.Convert()`

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
const convert = await client.Convert().load({ id: 'convert_id' })
```


### GetApiRoot

Create an instance: `const get_api_root = client.GetApiRoot()`

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
const get_api_root = await client.GetApiRoot().load({ id: 'get_api_root_id' })
```


### GetHistoricalRateForCurrencyAndDate

Create an instance: `const get_historical_rate_for_currency_and_date = client.GetHistoricalRateForCurrencyAndDate()`

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
const get_historical_rate_for_currency_and_date = await client.GetHistoricalRateForCurrencyAndDate().load({ id: 'get_historical_rate_for_currency_and_date_id' })
```


### GetHistoricalRatesForDate

Create an instance: `const get_historical_rates_for_date = client.GetHistoricalRatesForDate()`

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
const get_historical_rates_for_date = await client.GetHistoricalRatesForDate().load({ id: 'get_historical_rates_for_date_id' })
```


### Latest

Create an instance: `const latest = client.Latest()`

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
const latest = await client.Latest().load({ id: 'latest_id' })
```


### Status

Create an instance: `const status = client.Status()`

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
const status = await client.Status().load({ id: 'status_id' })
```


### Symbol

Create an instance: `const symbol = client.Symbol()`

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
const symbol = await client.Symbol().load({ id: 'symbol_id' })
```


### Timeseries

Create an instance: `const timeseries = client.Timeseries()`

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
const timeseries = await client.Timeseries().load({ id: 'timeseries_id' })
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── exchangerates_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`exchangerates_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
