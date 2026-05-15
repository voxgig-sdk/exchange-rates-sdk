<?php
declare(strict_types=1);

// ExchangeRates SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ExchangeRatesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ExchangeRatesBaseFeature();
            case "test":
                return new ExchangeRatesTestFeature();
            default:
                return new ExchangeRatesBaseFeature();
        }
    }
}
