# ExchangeRates SDK feature factory

from exchangerates_sdk.feature.base_feature import ExchangeRatesBaseFeature
from exchangerates_sdk.feature.ratelimit_feature import ExchangeRatesRatelimitFeature
from exchangerates_sdk.feature.retry_feature import ExchangeRatesRetryFeature
from exchangerates_sdk.feature.test_feature import ExchangeRatesTestFeature
from exchangerates_sdk.feature.timeout_feature import ExchangeRatesTimeoutFeature


_FEATURES = {
    "base": lambda: ExchangeRatesBaseFeature(),
    "ratelimit": lambda: ExchangeRatesRatelimitFeature(),
    "retry": lambda: ExchangeRatesRetryFeature(),
    "test": lambda: ExchangeRatesTestFeature(),
    "timeout": lambda: ExchangeRatesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
