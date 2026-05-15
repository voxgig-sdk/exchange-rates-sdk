<?php
declare(strict_types=1);

// ExchangeRates SDK utility: result_headers

class ExchangeRatesResultHeaders
{
    public static function call(ExchangeRatesContext $ctx): ?ExchangeRatesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
