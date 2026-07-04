# ExchangeRates TypeScript SDK Reference

Complete API reference for the ExchangeRates TypeScript SDK.


## ExchangeRatesSDK

### Constructor

```ts
new ExchangeRatesSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ExchangeRatesSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ExchangeRatesSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ExchangeRatesSDK` instance in test mode.


### Instance Methods

#### `Convert(data?: object)`

Create a new `Convert` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConvertEntity` instance.

#### `GetApiRoot(data?: object)`

Create a new `GetApiRoot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetApiRootEntity` instance.

#### `GetHistoricalRateForCurrencyAndDate(data?: object)`

Create a new `GetHistoricalRateForCurrencyAndDate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetHistoricalRateForCurrencyAndDateEntity` instance.

#### `GetHistoricalRatesForDate(data?: object)`

Create a new `GetHistoricalRatesForDate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetHistoricalRatesForDateEntity` instance.

#### `Latest(data?: object)`

Create a new `Latest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LatestEntity` instance.

#### `Status(data?: object)`

Create a new `Status` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatusEntity` instance.

#### `Symbol(data?: object)`

Create a new `Symbol` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SymbolEntity` instance.

#### `Timeseries(data?: object)`

Create a new `Timeseries` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TimeseriesEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ExchangeRatesSDK.test()`.

**Returns:** `ExchangeRatesSDK` instance in test mode.


---

## ConvertEntity

```ts
const convert = client.convert
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.convert.load({ id: 'convert_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConvertEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetApiRootEntity

```ts
const get_api_root = client.get_api_root
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | Yes |  |
| `message` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.get_api_root.load({ id: 'get_api_root_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetApiRootEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetHistoricalRateForCurrencyAndDateEntity

```ts
const get_historical_rate_for_currency_and_date = client.get_historical_rate_for_currency_and_date
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.get_historical_rate_for_currency_and_date.load({ id: 'get_historical_rate_for_currency_and_date_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetHistoricalRateForCurrencyAndDateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetHistoricalRatesForDateEntity

```ts
const get_historical_rates_for_date = client.get_historical_rates_for_date
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.get_historical_rates_for_date.load({ id: 'get_historical_rates_for_date_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetHistoricalRatesForDateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LatestEntity

```ts
const latest = client.latest
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.latest.load({ id: 'latest_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LatestEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatusEntity

```ts
const status = client.status
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | ``$STRING`` | Yes |  |
| `next_update_expected` | ``$STRING`` | Yes |  |
| `stale` | ``$BOOLEAN`` | Yes |  |
| `status` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.status.load({ id: 'status_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SymbolEntity

```ts
const symbol = client.symbol
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.symbol.load({ id: 'symbol_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SymbolEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TimeseriesEntity

```ts
const timeseries = client.timeseries
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.timeseries.load({ id: 'timeseries_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TimeseriesEntity` instance with the same client and
options.

#### `client()`

Return the parent `ExchangeRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ExchangeRatesSDK({
  feature: {
    test: { active: true },
  }
})
```

