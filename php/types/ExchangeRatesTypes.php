<?php
declare(strict_types=1);

// Typed models for the ExchangeRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Convert entity data model. */
class Convert
{
    public string $date;
    public ?bool $free = null;
    public array $info;
    public array $query;
    public float $result;
    public bool $success;
}

/** Request payload for Convert#load. */
class ConvertLoadMatch
{
    public ?string $date = null;
    public ?bool $free = null;
    public ?array $info = null;
    public ?array $query = null;
    public ?float $result = null;
    public ?bool $success = null;
}

/** GetApiRoot entity data model. */
class GetApiRoot
{
    public string $documentation;
    public string $message;
    public bool $success;
    public string $version;
}

/** Request payload for GetApiRoot#load. */
class GetApiRootLoadMatch
{
    public ?string $documentation = null;
    public ?string $message = null;
    public ?bool $success = null;
    public ?string $version = null;
}

/** GetHistoricalRateForCurrencyAndDate entity data model. */
class GetHistoricalRateForCurrencyAndDate
{
    public string $base;
    public string $date;
    public array $rate;
    public bool $success;
    public int $timestamp;
}

/** Request payload for GetHistoricalRateForCurrencyAndDate#load. */
class GetHistoricalRateForCurrencyAndDateLoadMatch
{
    public string $currency;
    public string $date;
}

/** GetHistoricalRatesForDate entity data model. */
class GetHistoricalRatesForDate
{
    public string $base;
    public string $date;
    public array $rate;
    public bool $success;
    public int $timestamp;
}

/** Request payload for GetHistoricalRatesForDate#load. */
class GetHistoricalRatesForDateLoadMatch
{
    public string $id;
}

/** Latest entity data model. */
class Latest
{
    public string $base;
    public string $date;
    public array $rate;
    public bool $success;
    public int $timestamp;
}

/** Request payload for Latest#load. */
class LatestLoadMatch
{
    public string $id;
}

/** Status entity data model. */
class Status
{
    public string $last_update;
    public string $next_update_expected;
    public bool $stale;
    public string $status;
}

/** Request payload for Status#load. */
class StatusLoadMatch
{
    public ?string $last_update = null;
    public ?string $next_update_expected = null;
    public ?bool $stale = null;
    public ?string $status = null;
}

/** Symbol entity data model. */
class Symbol
{
    public string $base;
    public int $count;
    public string $note;
    public bool $success;
    public array $symbol;
}

/** Request payload for Symbol#load. */
class SymbolLoadMatch
{
    public ?string $base = null;
    public ?int $count = null;
    public ?string $note = null;
    public ?bool $success = null;
    public ?array $symbol = null;
}

/** Timeseries entity data model. */
class Timeseries
{
    public string $base;
    public string $end_date;
    public array $rate;
    public string $start_date;
    public bool $success;
    public bool $timeseries;
}

/** Request payload for Timeseries#load. */
class TimeseriesLoadMatch
{
    public ?string $base = null;
    public ?string $end_date = null;
    public ?array $rate = null;
    public ?string $start_date = null;
    public ?bool $success = null;
    public ?bool $timeseries = null;
}

