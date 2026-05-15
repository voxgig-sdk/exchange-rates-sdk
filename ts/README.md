# ExchangeRates TypeScript SDK

The TypeScript SDK for the ExchangeRates API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install exchange-rates
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ExchangeRatesSDK } from 'exchange-rates'

const client = new ExchangeRatesSDK({
  apikey: process.env.EXCHANGE-RATES_APIKEY,
})
```

### 3. Load a convert

```ts
const result = await client.Convert().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ExchangeRatesSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new ExchangeRatesSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ExchangeRatesSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
EXCHANGE-RATES_TEST_LIVE=TRUE
EXCHANGE-RATES_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### ExchangeRatesSDK

#### Constructor

```ts
new ExchangeRatesSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Convert(data?)` | `ConvertEntity` | Create a Convert entity instance. |
| `GetApiRoot(data?)` | `GetApiRootEntity` | Create a GetApiRoot entity instance. |
| `GetHistoricalRateForCurrencyAndDate(data?)` | `GetHistoricalRateForCurrencyAndDateEntity` | Create a GetHistoricalRateForCurrencyAndDate entity instance. |
| `GetHistoricalRatesForDate(data?)` | `GetHistoricalRatesForDateEntity` | Create a GetHistoricalRatesForDate entity instance. |
| `Latest(data?)` | `LatestEntity` | Create a Latest entity instance. |
| `Status(data?)` | `StatusEntity` | Create a Status entity instance. |
| `Symbol(data?)` | `SymbolEntity` | Create a Symbol entity instance. |
| `Timeseries(data?)` | `TimeseriesEntity` | Create a Timeseries entity instance. |
| `tester(testopts?, sdkopts?)` | `ExchangeRatesSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ExchangeRatesSDK.test(testopts?, sdkopts?)` | `ExchangeRatesSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ExchangeRatesSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

API path: `/convert`

#### GetApiRoot

| Field | Description |
| --- | --- |
| `documentation` |  |
| `message` |  |
| `success` |  |
| `version` |  |

Operations: load.

API path: `/`

#### GetHistoricalRateForCurrencyAndDate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |
| `success` |  |
| `timestamp` |  |

Operations: load.

API path: `/{date}/{currency}`

#### GetHistoricalRatesForDate

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |
| `success` |  |
| `timestamp` |  |

Operations: load.

API path: `/{date}`

#### Latest

| Field | Description |
| --- | --- |
| `base` |  |
| `date` |  |
| `rate` |  |
| `success` |  |
| `timestamp` |  |

Operations: load.

API path: `/latest`

#### Status

| Field | Description |
| --- | --- |
| `last_update` |  |
| `next_update_expected` |  |
| `stale` |  |
| `status` |  |

Operations: load.

API path: `/status`

#### Symbol

| Field | Description |
| --- | --- |
| `base` |  |
| `count` |  |
| `note` |  |
| `success` |  |
| `symbol` |  |

Operations: load.

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

Operations: load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
exchange-rates/
├── src/
│   ├── ExchangeRatesSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ExchangeRatesSDK } from 'exchange-rates'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
