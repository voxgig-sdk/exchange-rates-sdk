// Typed models for the ExchangeRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Convert {
  date: string
  free?: boolean
  info: Record<string, any>
  query: Record<string, any>
  result: number
  success: boolean
}

export type ConvertLoadMatch = Partial<Convert>

export interface GetApiRoot {
  documentation: string
  message: string
  success: boolean
  version: string
}

export type GetApiRootLoadMatch = Partial<GetApiRoot>

export interface GetHistoricalRateForCurrencyAndDate {
  base: string
  date: string
  rate: Record<string, any>
  success: boolean
  timestamp: number
}

export interface GetHistoricalRateForCurrencyAndDateLoadMatch {
  currency: string
  date: string
}

export interface GetHistoricalRatesForDate {
  base: string
  date: string
  rate: Record<string, any>
  success: boolean
  timestamp: number
}

export interface GetHistoricalRatesForDateLoadMatch {
  id: string
}

export interface Latest {
  base: string
  date: string
  rate: Record<string, any>
  success: boolean
  timestamp: number
}

export interface LatestLoadMatch {
  id: string
}

export interface Status {
  last_update: string
  next_update_expected: string
  stale: boolean
  status: string
}

export type StatusLoadMatch = Partial<Status>

export interface Symbol {
  base: string
  count: number
  note: string
  success: boolean
  symbol: Record<string, any>
}

export type SymbolLoadMatch = Partial<Symbol>

export interface Timeseries {
  base: string
  end_date: string
  rate: Record<string, any>
  start_date: string
  success: boolean
  timeseries: boolean
}

export type TimeseriesLoadMatch = Partial<Timeseries>

