<?php
declare(strict_types=1);

// ExchangeRates SDK base feature

class ExchangeRatesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ExchangeRatesContext $ctx, array $options): void {}
    public function PostConstruct(ExchangeRatesContext $ctx): void {}
    public function PostConstructEntity(ExchangeRatesContext $ctx): void {}
    public function SetData(ExchangeRatesContext $ctx): void {}
    public function GetData(ExchangeRatesContext $ctx): void {}
    public function GetMatch(ExchangeRatesContext $ctx): void {}
    public function SetMatch(ExchangeRatesContext $ctx): void {}
    public function PrePoint(ExchangeRatesContext $ctx): void {}
    public function PreSpec(ExchangeRatesContext $ctx): void {}
    public function PreRequest(ExchangeRatesContext $ctx): void {}
    public function PreResponse(ExchangeRatesContext $ctx): void {}
    public function PreResult(ExchangeRatesContext $ctx): void {}
    public function PreDone(ExchangeRatesContext $ctx): void {}
    public function PreUnexpected(ExchangeRatesContext $ctx): void {}
}
