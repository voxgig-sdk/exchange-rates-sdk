-- Typed models for the ExchangeRates SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Convert
---@field date string
---@field free? boolean
---@field info table
---@field query table
---@field result number
---@field success boolean

---@class ConvertLoadMatch
---@field date? string
---@field free? boolean
---@field info? table
---@field query? table
---@field result? number
---@field success? boolean

---@class GetApiRoot
---@field documentation string
---@field message string
---@field success boolean
---@field version string

---@class GetApiRootLoadMatch
---@field documentation? string
---@field message? string
---@field success? boolean
---@field version? string

---@class GetHistoricalRateForCurrencyAndDate
---@field base string
---@field date string
---@field rate table
---@field success boolean
---@field timestamp number

---@class GetHistoricalRateForCurrencyAndDateLoadMatch
---@field currency string
---@field date string

---@class GetHistoricalRatesForDate
---@field base string
---@field date string
---@field rate table
---@field success boolean
---@field timestamp number

---@class GetHistoricalRatesForDateLoadMatch
---@field id string

---@class Latest
---@field base string
---@field date string
---@field rate table
---@field success boolean
---@field timestamp number

---@class LatestLoadMatch
---@field id? string

---@class Status
---@field last_update string
---@field next_update_expected string
---@field stale boolean
---@field status string

---@class StatusLoadMatch
---@field last_update? string
---@field next_update_expected? string
---@field stale? boolean
---@field status? string

---@class Symbol
---@field base string
---@field count number
---@field note string
---@field success boolean
---@field symbol table

---@class SymbolLoadMatch
---@field base? string
---@field count? number
---@field note? string
---@field success? boolean
---@field symbol? table

---@class Timeseries
---@field base string
---@field end_date string
---@field rate table
---@field start_date string
---@field success boolean
---@field timeseries boolean

---@class TimeseriesLoadMatch
---@field base? string
---@field end_date? string
---@field rate? table
---@field start_date? string
---@field success? boolean
---@field timeseries? boolean

local M = {}

return M
