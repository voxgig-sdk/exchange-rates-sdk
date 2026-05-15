<?php
declare(strict_types=1);

// ExchangeRates SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ExchangeRatesUtility::setRegistrar(function (ExchangeRatesUtility $u): void {
    $u->clean = [ExchangeRatesClean::class, 'call'];
    $u->done = [ExchangeRatesDone::class, 'call'];
    $u->make_error = [ExchangeRatesMakeError::class, 'call'];
    $u->feature_add = [ExchangeRatesFeatureAdd::class, 'call'];
    $u->feature_hook = [ExchangeRatesFeatureHook::class, 'call'];
    $u->feature_init = [ExchangeRatesFeatureInit::class, 'call'];
    $u->fetcher = [ExchangeRatesFetcher::class, 'call'];
    $u->make_fetch_def = [ExchangeRatesMakeFetchDef::class, 'call'];
    $u->make_context = [ExchangeRatesMakeContext::class, 'call'];
    $u->make_options = [ExchangeRatesMakeOptions::class, 'call'];
    $u->make_request = [ExchangeRatesMakeRequest::class, 'call'];
    $u->make_response = [ExchangeRatesMakeResponse::class, 'call'];
    $u->make_result = [ExchangeRatesMakeResult::class, 'call'];
    $u->make_point = [ExchangeRatesMakePoint::class, 'call'];
    $u->make_spec = [ExchangeRatesMakeSpec::class, 'call'];
    $u->make_url = [ExchangeRatesMakeUrl::class, 'call'];
    $u->param = [ExchangeRatesParam::class, 'call'];
    $u->prepare_auth = [ExchangeRatesPrepareAuth::class, 'call'];
    $u->prepare_body = [ExchangeRatesPrepareBody::class, 'call'];
    $u->prepare_headers = [ExchangeRatesPrepareHeaders::class, 'call'];
    $u->prepare_method = [ExchangeRatesPrepareMethod::class, 'call'];
    $u->prepare_params = [ExchangeRatesPrepareParams::class, 'call'];
    $u->prepare_path = [ExchangeRatesPreparePath::class, 'call'];
    $u->prepare_query = [ExchangeRatesPrepareQuery::class, 'call'];
    $u->result_basic = [ExchangeRatesResultBasic::class, 'call'];
    $u->result_body = [ExchangeRatesResultBody::class, 'call'];
    $u->result_headers = [ExchangeRatesResultHeaders::class, 'call'];
    $u->transform_request = [ExchangeRatesTransformRequest::class, 'call'];
    $u->transform_response = [ExchangeRatesTransformResponse::class, 'call'];
});
