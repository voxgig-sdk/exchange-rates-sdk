"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ConvertEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EXCHANGE_RATES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ExchangeRatesSDK.test();
        const ent = testsdk.Convert();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'convert.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "date", "req": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "free", "req": false, "short": "Indicates if this was a free (unauthenticated) request", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "info", "req": true, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "query", "req": true, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "result", "req": true, "short": "Conversion result", "type": "`$NUMBER`", "index$": 4 }, { "active": true, "name": "success", "req": true, "type": "`$BOOLEAN`", "index$": 5 }], "name": "convert", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 100, "kind": "query", "name": "amount", "orig": "amount", "reqd": true, "type": "`$NUMBER`", "index$": 0 }, { "active": true, "example": "2025-08-31", "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "AUD", "kind": "query", "name": "from", "orig": "from", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "USD", "kind": "query", "name": "to", "orig": "to", "reqd": true, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /convert", "json": "{\"operationId\":\"convertCurrency\",\"parameters\":[{\"description\":\"Source currency code\",\"example\":\"AUD\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"description\":\"Three-letter currency code\",\"enum\":[\"AUD\",\"USD\",\"EUR\",\"GBP\",\"JPY\",\"CNY\",\"KRW\",\"INR\",\"SGD\",\"NZD\",\"THB\",\"MYR\",\"IDR\",\"VND\",\"HKD\",\"PHP\",\"CAD\",\"CHF\",\"TWD\",\"TWI\",\"SDR\"],\"type\":\"string\"}},{\"description\":\"Target currency code\",\"example\":\"USD\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"description\":\"Three-letter currency code\",\"enum\":[\"AUD\",\"USD\",\"EUR\",\"GBP\",\"JPY\",\"CNY\",\"KRW\",\"INR\",\"SGD\",\"NZD\",\"THB\",\"MYR\",\"IDR\",\"VND\",\"HKD\",\"PHP\",\"CAD\",\"CHF\",\"TWD\",\"TWI\",\"SDR\"],\"type\":\"string\"}},{\"description\":\"Amount to convert\",\"example\":100,\"in\":\"query\",\"name\":\"amount\",\"required\":true,\"schema\":{\"exclusiveMinimum\":true,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Historical date for conversion (YYYY-MM-DD). Requires authentication.\",\"example\":\"2025-08-31\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"date\":\"2025-09-01\",\"free\":true,\"info\":{\"rate\":0.678234,\"timestamp\":1725148800},\"query\":{\"amount\":100,\"from\":\"AUD\",\"to\":\"USD\"},\"result\":67.8234,\"success\":true},\"schema\":{\"properties\":{\"date\":{\"pattern\":\"^\\\\d{4}-\\\\d{2}-\\\\d{2}$\",\"type\":\"string\"},\"free\":{\"description\":\"Indicates if this was a free (unauthenticated) request\",\"type\":\"boolean\"},\"info\":{\"properties\":{\"rate\":{\"description\":\"Exchange rate used for conversion with precision varying by currency (up to 6 decimal places for most, whole numbers for IDR/VND as provided by RBA)\",\"type\":\"number\"},\"timestamp\":{\"description\":\"Unix timestamp of the rate date\",\"type\":\"integer\"}},\"required\":[\"rate\"],\"type\":\"object\"},\"query\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"from\":{\"type\":\"string\"},\"to\":{\"type\":\"string\"}},\"required\":[\"from\",\"to\",\"amount\"],\"type\":\"object\"},\"result\":{\"description\":\"Conversion result\",\"type\":\"number\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"required\":[\"success\",\"query\",\"info\",\"date\",\"result\"],\"type\":\"object\"}}},\"description\":\"Conversion result\",\"headers\":{\"X-RateLimit-Limit-Monthly\":{\"description\":\"Monthly request limit based on plan (Free=300, Starter=5,000, Professional=50,000, Business=500,000)\",\"schema\":{\"type\":\"integer\"}},\"X-RateLimit-Remaining-Monthly\":{\"description\":\"Remaining requests in current monthly period\",\"schema\":{\"type\":\"integer\"}}}},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":400,\"info\":\"Invalid currency format. Use 3-letter currency code (e.g., USD)\",\"type\":\"bad_request\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":429,\"info\":\"Monthly quota exceeded. Free=300, Starter=5,000, Professional=50,000, Business=500,000 requests per month.\",\"type\":\"rate_limit\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"503\":{\"content\":{\"application/json\":{\"example\":{\"error\":{\"code\":503,\"info\":\"Rates temporarily unavailable\",\"type\":\"unavailable\"},\"success\":false},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"info\":{\"description\":\"Human-readable error description\",\"type\":\"string\"},\"type\":{\"description\":\"Error type identifier\",\"type\":\"string\"}},\"required\":[\"code\",\"type\",\"info\"],\"type\":\"object\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"required\":[\"success\",\"error\"],\"type\":\"object\"}}},\"description\":\"Service temporarily unavailable\"}},\"security\":[{\"bearerAuth\":[]},{}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"API Key\",\"description\":\"API key authentication using Bearer token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/convert", "segments": [{ "lit": "convert" }], "select": { "exist": ["amount", "date", "from", "to"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "convert", "name__orig": "convert", "Name": "Convert", "name_": "convert", "name-": "convert", "NAME": "CONVERT", "index$": 0 }, { "active": true, "entity": "convert", "key$": "BasicConvertFlow", "kind": "basic", "name": "BasicConvertFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "convert_ref01", "srcdatavar": "convert_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-convert_ref01" } }], "index$": 0 }] }, 'Convert');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let convert_ref01_data = Object.values(setup.data.existing.convert)[0];
        // LOAD
        const convert_ref01_ent = client.Convert();
        const convert_ref01_match_dt0 = {};
        const convert_ref01_data_dt0 = (await convert_ref01_ent.load(convert_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != convert_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/convert/ConvertTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ExchangeRatesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['convert01', 'convert02', 'convert03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EXCHANGE_RATES_TEST_CONVERT_ENTID': idmap,
        'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
        'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
        'EXCHANGE_RATES_APIKEY': '',
    });
    idmap = env['EXCHANGE_RATES_TEST_CONVERT_ENTID'];
    const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EXCHANGE_RATES_TEST_CONVERT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ExchangeRatesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.EXCHANGE_RATES_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.EXCHANGE_RATES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ConvertEntity.test.js.map