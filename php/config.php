<?php
declare(strict_types=1);

// ExchangeRates SDK configuration

class ExchangeRatesConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ExchangeRates",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.exchangeratesapi.com.au",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "convert" => [],
                    "get_api_root" => [],
                    "get_historical_rate_for_currency_and_date" => [],
                    "get_historical_rates_for_date" => [],
                    "latest" => [],
                    "status" => [],
                    "symbol" => [],
                    "timeseries" => [],
                ],
            ],
            "entity" => [
        'convert' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'free',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'info',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'query',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'result',
              'req' => true,
              'type' => '`$NUMBER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 5,
            ],
          ],
          'name' => 'convert',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'amount',
                        'orig' => 'amount',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => '2025-08-31',
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'AUD',
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/convert',
                  'parts' => [
                    'convert',
                  ],
                  'select' => [
                    'exist' => [
                      'amount',
                      'date',
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_api_root' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'documentation',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'message',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'version',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'get_api_root',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_historical_rate_for_currency_and_date' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'timestamp',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
          ],
          'name' => 'get_historical_rate_for_currency_and_date',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'USD',
                        'kind' => 'param',
                        'name' => 'currency',
                        'orig' => 'currency',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'example' => '2025-08-31',
                        'kind' => 'param',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 1,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/{date}/{currency}',
                  'parts' => [
                    '{date}',
                    '{currency}',
                  ],
                  'select' => [
                    'exist' => [
                      'currency',
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_historical_rates_for_date' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'timestamp',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
          ],
          'name' => 'get_historical_rates_for_date',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => '2025-08-31',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/{date}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'date' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'latest' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'timestamp',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
          ],
          'name' => 'latest',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'AUD',
                        'kind' => 'query',
                        'name' => 'base',
                        'orig' => 'base',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'USD,EUR,GBP',
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/latest',
                  'parts' => [
                    'latest',
                  ],
                  'select' => [
                    'exist' => [
                      'base',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'USD',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'currency',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/latest/{currency}',
                  'parts' => [
                    'latest',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'currency' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'status' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'last_update',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'next_update_expected',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'stale',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/status',
                  'parts' => [
                    'status',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.status`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'symbol' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'count',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'note',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'symbol',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
          ],
          'name' => 'symbol',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/symbols',
                  'parts' => [
                    'symbols',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'timeseries' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'end_date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'start_date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'timeseries',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 5,
            ],
          ],
          'name' => 'timeseries',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'AUD',
                        'kind' => 'query',
                        'name' => 'base',
                        'orig' => 'base',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '2025-08-31',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '2025-08-01',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'USD,EUR,GBP',
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/timeseries',
                  'parts' => [
                    'timeseries',
                  ],
                  'select' => [
                    'exist' => [
                      'base',
                      'end_date',
                      'start_date',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.timeseries`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ExchangeRatesFeatures::make_feature($name);
    }
}
