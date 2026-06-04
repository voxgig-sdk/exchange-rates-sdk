# ExchangeRates SDK

Official Reserve Bank of Australia exchange rates as clean JSON, with AUD as the base currency

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About RBA Exchange Rates API

The [RBA Exchange Rates API](https://api.exchangeratesapi.com.au) is a developer-friendly REST service that republishes official [Reserve Bank of Australia](https://www.rba.gov.au/) exchange rate data as clean JSON. Rates are quoted against AUD as the base currency and refreshed daily from RBA sources.

What you get from the API:

- Latest AUD exchange rates against 24+ currencies (USD, EUR, GBP, JPY, CHF, CAD, CNY, KRW, SGD, NZD, HKD, TWD, INR, THB, MYR, IDR, VND, PHP, and more).
- Historical rates for a specific date, or for a single currency on a given date.
- Time series queries across a date range.
- A currency conversion endpoint and a list of supported symbols.
- A service status / health endpoint.

Operational notes: requests are authenticated with a bearer token (`Authorization: Bearer <api_key>`). The published free tier allows 300 requests per month with no credit card required. Responses follow a standard shape with `success`, `timestamp`, `base` (`AUD`), `date`, and a `rates` object. The operator is independent of the RBA.

## Try it

**TypeScript**
```bash
npm install exchange-rates
```

**Python**
```bash
pip install exchange-rates-sdk
```

**PHP**
```bash
composer require voxgig/exchange-rates-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/exchange-rates-sdk/go
```

**Ruby**
```bash
gem install exchange-rates-sdk
```

**Lua**
```bash
luarocks install exchange-rates-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ExchangeRatesSDK } from 'exchange-rates'

const client = new ExchangeRatesSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o exchange-rates-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "exchange-rates": {
      "command": "/abs/path/to/exchange-rates-mcp"
    }
  }
}
```

## Entities

The API exposes 8 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Convert** | Convert an amount from one currency to another using current or historical RBA rates. | `/convert` |
| **GetApiRoot** | Root endpoint returning service metadata at `/`. | `/` |
| **GetHistoricalRateForCurrencyAndDate** | Fetch the AUD exchange rate for a single currency on a specific past date. | `/{date}/{currency}` |
| **GetHistoricalRatesForDate** | Fetch all AUD exchange rates for a specific past date. | `/{date}` |
| **Latest** | Latest AUD exchange rates against supported currencies via `/latest`. | `/latest` |
| **Status** | Service health and status indicator. | `/status` |
| **Symbol** | Lookup or list of supported currency symbols via `/symbols`. | `/symbols` |
| **Timeseries** | Exchange rate time series for a range of dates against AUD. | `/timeseries` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from exchangerates_sdk import ExchangeRatesSDK

client = ExchangeRatesSDK({})


# Load a specific convert
convert, err = client.Convert(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'exchangerates_sdk.php';

$client = new ExchangeRatesSDK([]);


// Load a specific convert
[$convert, $err] = $client->Convert(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/exchange-rates-sdk/go"

client := sdk.NewExchangeRatesSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ExchangeRates_sdk"

client = ExchangeRatesSDK.new({})


# Load a specific convert
convert, err = client.Convert(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("exchange-rates_sdk")

local client = sdk.new({})


-- Load a specific convert
local convert, err = client:Convert(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ExchangeRatesSDK.test()
const result = await client.Convert().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ExchangeRatesSDK.test(None, None)
result, err = client.Convert(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ExchangeRatesSDK::test(null, null);
[$result, $err] = $client->Convert(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Convert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ExchangeRatesSDK.test(nil, nil)
result, err = client.Convert(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Convert(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the RBA Exchange Rates API

- Upstream: [https://api.exchangeratesapi.com.au](https://api.exchangeratesapi.com.au)
- API docs: [https://docs.exchangeratesapi.com.au](https://docs.exchangeratesapi.com.au)

- This SDK is distributed under the MIT licence.
- Exchange rate data originates from the Reserve Bank of Australia (RBA), which publishes the underlying figures publicly.
- The API operator states they are not affiliated with or endorsed by the RBA.
- Check the upstream service terms at https://api.exchangeratesapi.com.au before redistributing data.

---

Generated from the RBA Exchange Rates API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
