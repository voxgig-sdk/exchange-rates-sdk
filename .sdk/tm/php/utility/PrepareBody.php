<?php
declare(strict_types=1);

// ExchangeRates SDK utility: prepare_body

class ExchangeRatesPrepareBody
{
    public static function call(ExchangeRatesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
