<?php
declare(strict_types=1);

// ExchangeRates SDK utility: result_body

class ExchangeRatesResultBody
{
    public static function call(ExchangeRatesContext $ctx): ?ExchangeRatesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
