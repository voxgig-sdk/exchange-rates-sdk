# ExchangeRates SDK feature factory

from feature.base_feature import ExchangeRatesBaseFeature
from feature.test_feature import ExchangeRatesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ExchangeRatesBaseFeature(),
        "test": lambda: ExchangeRatesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
