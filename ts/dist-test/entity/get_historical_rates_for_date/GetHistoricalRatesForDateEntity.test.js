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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetHistoricalRatesForDateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EXCHANGE_RATES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EXCHANGE_RATES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ExchangeRatesSDK.test();
        const ent = testsdk.GetHistoricalRatesForDate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EXCHANGE_RATES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_historical_rates_for_date.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "base": { "a": true, "h": "Base", "n": "base", "r": false, "t": "`$STRING`", "key$": "base", "index$": 0 }, "date": { "a": true, "h": "Date", "n": "date", "r": false, "t": "`$STRING`", "key$": "date", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "rates": { "a": true, "h": "Rates", "n": "rates", "r": false, "t": "`$OBJECT`", "key$": "rates", "index$": 3 }, "success": { "a": true, "h": "Success", "n": "success", "r": false, "t": "`$BOOLEAN`", "key$": "success", "index$": 4 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": false, "t": "`$INTEGER`", "key$": "timestamp", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "get_historical_rates_for_date", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /{date}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "2025-08-31", "k": "param", "n": "id", "or": "date", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{date}", "q": { "exist": ["id"] }, "r": { "param": { "date": "id" } }, "s": [{ "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.rates`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_historical_rates_for_date", "name__orig": "get_historical_rates_for_date", "Name": "GetHistoricalRatesForDate", "name_": "get_historical_rates_for_date", "name-": "get-historical-rates-for-date", "NAME": "GET_HISTORICAL_RATES_FOR_DATE", "index$": 3 }, { "active": true, "entity": "get_historical_rates_for_date", "key$": "BasicGetHistoricalRatesForDateFlow", "kind": "basic", "name": "BasicGetHistoricalRatesForDateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "get_historical_rates_for_date_ref01", "srcdatavar": "get_historical_rates_for_date_ref01_data", "suffix": "_dt0" }, "m": { "id": "get_historical_rates_for_date01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_historical_rates_for_date_ref01" } }], "index$": 0 }] }, 'GetHistoricalRatesForDate', { "GET /{date}": { "protocol": "http", "operationId": "getHistoricalRatesForDate", "responses": { "200": { "description": "Exchange rates for the specified date", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "timestamp": { "description": "Unix timestamp of the rate date", "key$": "timestamp", "type": "integer" }, "base": { "example": "AUD", "key$": "base", "type": "string" }, "date": { "description": "Date of the rates (YYYY-MM-DD)", "key$": "date", "pattern": "^\\d{4}-\\d{2}-\\d{2}$", "type": "string" }, "rates": { "additionalProperties": { "description": "Exchange rate (AUD per unit of foreign currency) with precision varying by currency (up to 6 decimal places for most, whole numbers for IDR/VND as provided by RBA)", "minimum": 0, "type": "number", "key$": "additionalProperties" }, "description": "Object containing currency codes as keys and exchange rates as values", "key$": "rates", "type": "object", "x-ref": "#/components/schemas/RatesObject" } }, "required": ["success", "timestamp", "base", "date", "rates"], "x-ref": "#/components/schemas/LatestRatesResponse" }, "example": { "success": true, "timestamp": 1725062400, "base": "AUD", "date": "2025-08-31", "rates": { "USD": 0.678234, "EUR": 0.612345, "GBP": 0.534567 } } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "HTTP status code" }, "type": { "type": "string", "description": "Error type identifier" }, "info": { "type": "string", "description": "Human-readable error description" } }, "required": ["code", "type", "info"] } }, "required": ["success", "error"], "x-ref": "#/components/schemas/Error" }, "example": { "success": false, "error": { "code": 400, "type": "bad_request", "info": "Invalid currency format. Use 3-letter currency code (e.g., USD)" } } } }, "x-ref": "#/components/responses/BadRequest" }, "401": { "description": "Authentication required", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "HTTP status code" }, "type": { "type": "string", "description": "Error type identifier" }, "info": { "type": "string", "description": "Human-readable error description" } }, "required": ["code", "type", "info"] } }, "required": ["success", "error"], "x-ref": "#/components/schemas/Error" }, "example": { "success": false, "error": { "code": 401, "type": "unauthorized", "info": "Invalid or missing API key" } } } }, "x-ref": "#/components/responses/Unauthorized" }, "404": { "description": "Resource not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "object", "properties": { "code": { "type": "integer", "description": "HTTP status code" }, "type": { "type": "string", "description": "Error type identifier" }, "info": { "type": "string", "description": "Human-readable error description" } }, "required": ["code", "type", "info"] } }, "required": ["success", "error"], "x-ref": "#/components/schemas/Error" }, "example": { "success": false, "error": { "code": 404, "type": "not_found", "info": "No data available for the specified date" } } } }, "x-ref": "#/components/responses/NotFound" } }, "parameters": [{ "name": "date", "in": "path", "required": true, "description": "Date in YYYY-MM-DD format", "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }, "example": "2025-08-31", "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "API Key", "description": "API key authentication using Bearer token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_historical_rates_for_date_ref01_data = Object.values(setup.data.existing.get_historical_rates_for_date)[0];
        // LOAD
        const get_historical_rates_for_date_ref01_ent = client.GetHistoricalRatesForDate();
        const get_historical_rates_for_date_ref01_match_dt0 = {};
        get_historical_rates_for_date_ref01_match_dt0.id = get_historical_rates_for_date_ref01_data.id;
        const get_historical_rates_for_date_ref01_data_dt0 = (await get_historical_rates_for_date_ref01_ent.load(get_historical_rates_for_date_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_historical_rates_for_date_ref01_data_dt0.id === get_historical_rates_for_date_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_historical_rates_for_date/GetHistoricalRatesForDateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ExchangeRatesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_historical_rates_for_date01', 'get_historical_rates_for_date02', 'get_historical_rates_for_date03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EXCHANGE_RATES_TEST_GET_HISTORICAL_RATES_FOR_DATE_ENTID': idmap,
        'EXCHANGE_RATES_TEST_LIVE': 'FALSE',
        'EXCHANGE_RATES_TEST_EXPLAIN': 'FALSE',
        'EXCHANGE_RATES_APIKEY': '',
    });
    idmap = env['EXCHANGE_RATES_TEST_GET_HISTORICAL_RATES_FOR_DATE_ENTID'];
    const live = 'TRUE' === env.EXCHANGE_RATES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EXCHANGE_RATES_TEST_GET_HISTORICAL_RATES_FOR_DATE_ENTID'];
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
//# sourceMappingURL=GetHistoricalRatesForDateEntity.test.js.map