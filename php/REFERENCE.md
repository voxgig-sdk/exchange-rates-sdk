# ExchangeRates PHP SDK Reference

Complete API reference for the ExchangeRates PHP SDK.


## ExchangeRatesSDK

### Constructor

```php
require_once __DIR__ . '/exchangerates_sdk.php';

$client = new ExchangeRatesSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ExchangeRatesSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ExchangeRatesSDK::test();
```


### Instance Methods

#### `Convert($data = null)`

Create a new `ConvertEntity` instance. Pass `null` for no initial data.

#### `GetApiRoot($data = null)`

Create a new `GetApiRootEntity` instance. Pass `null` for no initial data.

#### `GetHistoricalRateForCurrencyAndDate($data = null)`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance. Pass `null` for no initial data.

#### `GetHistoricalRatesForDate($data = null)`

Create a new `GetHistoricalRatesForDateEntity` instance. Pass `null` for no initial data.

#### `Latest($data = null)`

Create a new `LatestEntity` instance. Pass `null` for no initial data.

#### `Status($data = null)`

Create a new `StatusEntity` instance. Pass `null` for no initial data.

#### `Symbol($data = null)`

Create a new `SymbolEntity` instance. Pass `null` for no initial data.

#### `Timeseries($data = null)`

Create a new `TimeseriesEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ExchangeRatesUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ConvertEntity

```php
$convert = $client->Convert();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | Yes |  |
| `free` | `bool` | No |  |
| `info` | `array` | Yes |  |
| `query` | `array` | Yes |  |
| `result` | `float` | Yes |  |
| `success` | `bool` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Convert()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConvertEntity`

Create a new `ConvertEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetApiRootEntity

```php
$get_api_root = $client->GetApiRoot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `success` | `bool` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetApiRoot()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetApiRootEntity`

Create a new `GetApiRootEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetHistoricalRateForCurrencyAndDateEntity

```php
$get_historical_rate_for_currency_and_date = $client->GetHistoricalRateForCurrencyAndDate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `rate` | `array` | Yes |  |
| `success` | `bool` | Yes |  |
| `timestamp` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetHistoricalRateForCurrencyAndDate()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetHistoricalRateForCurrencyAndDateEntity`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetHistoricalRatesForDateEntity

```php
$get_historical_rates_for_date = $client->GetHistoricalRatesForDate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `rate` | `array` | Yes |  |
| `success` | `bool` | Yes |  |
| `timestamp` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetHistoricalRatesForDate()->load(["id" => "get_historical_rates_for_date_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetHistoricalRatesForDateEntity`

Create a new `GetHistoricalRatesForDateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LatestEntity

```php
$latest = $client->Latest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `rate` | `array` | Yes |  |
| `success` | `bool` | Yes |  |
| `timestamp` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Latest()->load(["id" => "latest_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LatestEntity`

Create a new `LatestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StatusEntity

```php
$status = $client->Status();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | `string` | Yes |  |
| `next_update_expected` | `string` | Yes |  |
| `stale` | `bool` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Status()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StatusEntity`

Create a new `StatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SymbolEntity

```php
$symbol = $client->Symbol();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes |  |
| `count` | `int` | Yes |  |
| `note` | `string` | Yes |  |
| `success` | `bool` | Yes |  |
| `symbol` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Symbol()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SymbolEntity`

Create a new `SymbolEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TimeseriesEntity

```php
$timeseries = $client->Timeseries();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes |  |
| `end_date` | `string` | Yes |  |
| `rate` | `array` | Yes |  |
| `start_date` | `string` | Yes |  |
| `success` | `bool` | Yes |  |
| `timeseries` | `bool` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Timeseries()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TimeseriesEntity`

Create a new `TimeseriesEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ExchangeRatesSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

