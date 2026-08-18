# frozen_string_literal: true

# Typed models for the ExchangeRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Convert entity data model.
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] free
#   @return [Boolean, nil]
#
# @!attribute [rw] info
#   @return [Hash]
#
# @!attribute [rw] query
#   @return [Hash]
#
# @!attribute [rw] result
#   @return [Float]
#
# @!attribute [rw] success
#   @return [Boolean]
Convert = Struct.new(
  :date,
  :free,
  :info,
  :query,
  :result,
  :success,
  keyword_init: true
)

# Request payload for Convert#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] free
#   @return [Boolean, nil]
#
# @!attribute [rw] info
#   @return [Hash, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Float, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
ConvertLoadMatch = Struct.new(
  :date,
  :free,
  :info,
  :query,
  :result,
  :success,
  keyword_init: true
)

# GetApiRoot entity data model.
#
# @!attribute [rw] documentation
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] version
#   @return [String]
GetApiRoot = Struct.new(
  :documentation,
  :message,
  :success,
  :version,
  keyword_init: true
)

# Request payload for GetApiRoot#load.
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GetApiRootLoadMatch = Struct.new(
  :documentation,
  :message,
  :success,
  :version,
  keyword_init: true
)

# GetHistoricalRateForCurrencyAndDate entity data model.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rates
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
GetHistoricalRateForCurrencyAndDate = Struct.new(
  :base,
  :date,
  :rates,
  :success,
  :timestamp,
  keyword_init: true
)

# Request payload for GetHistoricalRateForCurrencyAndDate#load.
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] date
#   @return [String]
GetHistoricalRateForCurrencyAndDateLoadMatch = Struct.new(
  :currency,
  :date,
  keyword_init: true
)

# GetHistoricalRatesForDate entity data model.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rates
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
GetHistoricalRatesForDate = Struct.new(
  :base,
  :date,
  :rates,
  :success,
  :timestamp,
  keyword_init: true
)

# Request payload for GetHistoricalRatesForDate#load.
#
# @!attribute [rw] id
#   @return [String]
GetHistoricalRatesForDateLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Latest entity data model.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rates
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
Latest = Struct.new(
  :base,
  :date,
  :rates,
  :success,
  :timestamp,
  keyword_init: true
)

# Request payload for Latest#load.
#
# @!attribute [rw] id
#   @return [String]
LatestLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Status entity data model.
#
# @!attribute [rw] last_update
#   @return [String]
#
# @!attribute [rw] next_update_expected
#   @return [String]
#
# @!attribute [rw] stale
#   @return [Boolean]
#
# @!attribute [rw] status
#   @return [String]
Status = Struct.new(
  :last_update,
  :next_update_expected,
  :stale,
  :status,
  keyword_init: true
)

# Request payload for Status#load.
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] next_update_expected
#   @return [String, nil]
#
# @!attribute [rw] stale
#   @return [Boolean, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
StatusLoadMatch = Struct.new(
  :last_update,
  :next_update_expected,
  :stale,
  :status,
  keyword_init: true
)

# Symbol entity data model.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] symbol
#   @return [String]
SymbolType = Struct.new(
  :country,
  :name,
  :symbol,
  keyword_init: true
)

# Request payload for Symbol#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
SymbolLoadMatch = Struct.new(
  :country,
  :name,
  :symbol,
  keyword_init: true
)

# Timeseries entity data model.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] rates
#   @return [Hash, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timeseries
#   @return [Boolean, nil]
Timeseries = Struct.new(
  :base,
  :end_date,
  :rates,
  :start_date,
  :success,
  :timeseries,
  keyword_init: true
)

# Request payload for Timeseries#load.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] rates
#   @return [Hash, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] timeseries
#   @return [Boolean, nil]
TimeseriesLoadMatch = Struct.new(
  :base,
  :end_date,
  :rates,
  :start_date,
  :success,
  :timeseries,
  keyword_init: true
)

