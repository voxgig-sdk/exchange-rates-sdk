# ProjectName SDK exists test

import pytest
from exchangerates_sdk import ExchangeRatesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ExchangeRatesSDK.test(None, None)
        assert testsdk is not None
