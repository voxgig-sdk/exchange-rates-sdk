# ExchangeRates SDK utility: make_context

from core.context import ExchangeRatesContext


def make_context_util(ctxmap, basectx):
    return ExchangeRatesContext(ctxmap, basectx)
