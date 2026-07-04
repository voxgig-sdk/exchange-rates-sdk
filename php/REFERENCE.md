# ExchangeRates PHP SDK Reference

Complete API reference for the ExchangeRates PHP SDK.


## ExchangeRatesSDK

### Constructor

```php
require_once __DIR__ . '/exchange-rates_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$convert = $client->convert();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->convert()->load(["id" => "convert_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ConvertEntity`

Create a new `ConvertEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetApiRootEntity

```php
$get_api_root = $client->get_api_root();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | Yes |  |
| `message` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_api_root()->load(["id" => "get_api_root_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetApiRootEntity`

Create a new `GetApiRootEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetHistoricalRateForCurrencyAndDateEntity

```php
$get_historical_rate_for_currency_and_date = $client->get_historical_rate_for_currency_and_date();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_historical_rate_for_currency_and_date()->load(["id" => "get_historical_rate_for_currency_and_date_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetHistoricalRateForCurrencyAndDateEntity`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetHistoricalRatesForDateEntity

```php
$get_historical_rates_for_date = $client->get_historical_rates_for_date();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_historical_rates_for_date()->load(["id" => "get_historical_rates_for_date_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetHistoricalRatesForDateEntity`

Create a new `GetHistoricalRatesForDateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LatestEntity

```php
$latest = $client->latest();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->latest()->load(["id" => "latest_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LatestEntity`

Create a new `LatestEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StatusEntity

```php
$status = $client->status();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | ``$STRING`` | Yes |  |
| `next_update_expected` | ``$STRING`` | Yes |  |
| `stale` | ``$BOOLEAN`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->status()->load(["id" => "status_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StatusEntity`

Create a new `StatusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SymbolEntity

```php
$symbol = $client->symbol();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->symbol()->load(["id" => "symbol_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SymbolEntity`

Create a new `SymbolEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TimeseriesEntity

```php
$timeseries = $client->timeseries();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->timeseries()->load(["id" => "timeseries_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TimeseriesEntity`

Create a new `TimeseriesEntity` instance with the same client and
options.

#### `getName(): string`

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

