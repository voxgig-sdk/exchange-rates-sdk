# Typed models for the ExchangeRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ConvertRequired(TypedDict):
    date: str
    info: dict
    query: dict
    result: float
    success: bool


class Convert(ConvertRequired, total=False):
    free: bool


class ConvertLoadMatch(TypedDict, total=False):
    date: str
    free: bool
    info: dict
    query: dict
    result: float
    success: bool


class GetApiRoot(TypedDict):
    documentation: str
    message: str
    success: bool
    version: str


class GetApiRootLoadMatch(TypedDict, total=False):
    documentation: str
    message: str
    success: bool
    version: str


class GetHistoricalRateForCurrencyAndDate(TypedDict):
    base: str
    date: str
    rate: dict
    success: bool
    timestamp: int


class GetHistoricalRateForCurrencyAndDateLoadMatch(TypedDict):
    currency: str
    date: str


class GetHistoricalRatesForDate(TypedDict):
    base: str
    date: str
    rate: dict
    success: bool
    timestamp: int


class GetHistoricalRatesForDateLoadMatch(TypedDict):
    id: str


class Latest(TypedDict):
    base: str
    date: str
    rate: dict
    success: bool
    timestamp: int


class LatestLoadMatch(TypedDict, total=False):
    id: str


class Status(TypedDict):
    last_update: str
    next_update_expected: str
    stale: bool
    status: str


class StatusLoadMatch(TypedDict, total=False):
    last_update: str
    next_update_expected: str
    stale: bool
    status: str


class Symbol(TypedDict):
    base: str
    count: int
    note: str
    success: bool
    symbol: dict


class SymbolLoadMatch(TypedDict, total=False):
    base: str
    count: int
    note: str
    success: bool
    symbol: dict


class Timeseries(TypedDict):
    base: str
    end_date: str
    rate: dict
    start_date: str
    success: bool
    timeseries: bool


class TimeseriesLoadMatch(TypedDict, total=False):
    base: str
    end_date: str
    rate: dict
    start_date: str
    success: bool
    timeseries: bool
