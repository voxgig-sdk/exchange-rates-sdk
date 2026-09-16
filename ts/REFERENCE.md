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
const convert = client.Convert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | Yes |  |
| `free` | `boolean` | No | Indicates if this was a free (unauthenticated) request |
| `info` | `Record<string, any>` | Yes |  |
| `query` | `Record<string, any>` | Yes |  |
| `result` | `number` | Yes | Conversion result |
| `success` | `boolean` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Convert().load({ amount: 1, from: 'from', to: 'to' })
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
const get_api_root = client.GetApiRoot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | Yes |  |
| `message` | `string` | Yes |  |
| `success` | `boolean` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetApiRoot().load()
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
const get_historical_rate_for_currency_and_date = client.GetHistoricalRateForCurrencyAndDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | No |  |
| `date` | `string` | No |  |
| `id` | `string` | No |  |
| `rates` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |
| `timestamp` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetHistoricalRateForCurrencyAndDate().load({ currency: 'currency', date: 'date' })
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
const get_historical_rates_for_date = client.GetHistoricalRatesForDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | No |  |
| `date` | `string` | No |  |
| `id` | `string` | No |  |
| `rates` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |
| `timestamp` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetHistoricalRatesForDate().load({ id: 'get_historical_rates_for_date_id' })
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
const latest = client.Latest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | No |  |
| `date` | `string` | No |  |
| `id` | `string` | No |  |
| `rates` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |
| `timestamp` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Latest().load({ id: 'latest_id' })
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
const status = client.Status()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `last_update` | `string` | Yes | Last successful data update timestamp or 'unknown' |
| `next_update_expected` | `string` | Yes | ISO 8601 timestamp of when next RBA update is expected |
| `stale` | `boolean` | Yes | Whether the data is considered stale |
| `status` | `string` | Yes | Current API status |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Status().load()
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
const symbol = client.Symbol()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `string` | Yes | Country or region |
| `name` | `string` | Yes | Full name of the currency |
| `symbol` | `string` | Yes | Currency symbol |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Symbol().load()
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
const timeseries = client.Timeseries()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | No |  |
| `end_date` | `string` | No |  |
| `rates` | `Record<string, any>` | No |  |
| `start_date` | `string` | No |  |
| `success` | `boolean` | No |  |
| `timeseries` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Timeseries().load({ end_date: 'end_date', start_date: 'start_date' })
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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new ExchangeRatesSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

