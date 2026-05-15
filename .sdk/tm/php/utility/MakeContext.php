<?php
declare(strict_types=1);

// ExchangeRates SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ExchangeRatesMakeContext
{
    public static function call(array $ctxmap, ?ExchangeRatesContext $basectx): ExchangeRatesContext
    {
        return new ExchangeRatesContext($ctxmap, $basectx);
    }
}
