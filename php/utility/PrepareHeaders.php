<?php
declare(strict_types=1);

// ExchangeRates SDK utility: prepare_headers

class ExchangeRatesPrepareHeaders
{
    public static function call(ExchangeRatesContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
