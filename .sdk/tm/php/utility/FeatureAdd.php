<?php
declare(strict_types=1);

// ExchangeRates SDK utility: feature_add

class ExchangeRatesFeatureAdd
{
    public static function call(ExchangeRatesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
