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
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'free',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'info',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'query',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'convert',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'amount',
                        'orig' => 'amount',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'example' => '2025-08-31',
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'AUD',
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
              'name' => 'documentation',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'message',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'version',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
          ],
          'name' => 'get_api_root',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/',
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'parts' => [],
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'timestamp',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'get_historical_rate_for_currency_and_date',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'USD',
                        'kind' => 'param',
                        'name' => 'currency',
                        'orig' => 'currency',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2025-08-31',
                        'kind' => 'param',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'timestamp',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'get_historical_rates_for_date',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '2025-08-31',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'timestamp',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'latest',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'AUD',
                        'kind' => 'query',
                        'name' => 'base',
                        'orig' => 'base',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'USD,EUR,GBP',
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
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
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'USD',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'currency',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
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
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
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
              'name' => 'last_update',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'next_update_expected',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'stale',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
          ],
          'name' => 'status',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/status',
                  'parts' => [
                    'status',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'count',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'note',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'symbol',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'symbol',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/symbols',
                  'parts' => [
                    'symbols',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
              'name' => 'base',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'end_date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'rate',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'start_date',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'success',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'timeseries',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'timeseries',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'AUD',
                        'kind' => 'query',
                        'name' => 'base',
                        'orig' => 'base',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2025-08-31',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2025-08-01',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'USD,EUR,GBP',
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
