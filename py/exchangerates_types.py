# Typed models for the ExchangeRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Convert:
    date: str
    info: dict
    query: dict
    result: float
    success: bool
    free: Optional[bool] = None


@dataclass
class ConvertLoadMatch:
    date: Optional[str] = None
    free: Optional[bool] = None
    info: Optional[dict] = None
    query: Optional[dict] = None
    result: Optional[float] = None
    success: Optional[bool] = None


@dataclass
class GetApiRoot:
    documentation: str
    message: str
    success: bool
    version: str


@dataclass
class GetApiRootLoadMatch:
    documentation: Optional[str] = None
    message: Optional[str] = None
    success: Optional[bool] = None
    version: Optional[str] = None


@dataclass
class GetHistoricalRateForCurrencyAndDate:
    base: str
    date: str
    rate: dict
    success: bool
    timestamp: int


@dataclass
class GetHistoricalRateForCurrencyAndDateLoadMatch:
    currency: str
    date: str


@dataclass
class GetHistoricalRatesForDate:
    base: str
    date: str
    rate: dict
    success: bool
    timestamp: int


@dataclass
class GetHistoricalRatesForDateLoadMatch:
    id: str


@dataclass
class Latest:
    base: str
    date: str
    rate: dict
    success: bool
    timestamp: int


@dataclass
class LatestLoadMatch:
    id: str


@dataclass
class Status:
    last_update: str
    next_update_expected: str
    stale: bool
    status: str


@dataclass
class StatusLoadMatch:
    last_update: Optional[str] = None
    next_update_expected: Optional[str] = None
    stale: Optional[bool] = None
    status: Optional[str] = None


@dataclass
class Symbol:
    base: str
    count: int
    note: str
    success: bool
    symbol: dict


@dataclass
class SymbolLoadMatch:
    base: Optional[str] = None
    count: Optional[int] = None
    note: Optional[str] = None
    success: Optional[bool] = None
    symbol: Optional[dict] = None


@dataclass
class Timeseries:
    base: str
    end_date: str
    rate: dict
    start_date: str
    success: bool
    timeseries: bool


@dataclass
class TimeseriesLoadMatch:
    base: Optional[str] = None
    end_date: Optional[str] = None
    rate: Optional[dict] = None
    start_date: Optional[str] = None
    success: Optional[bool] = None
    timeseries: Optional[bool] = None

