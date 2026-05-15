# ExchangeRates SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ExchangeRatesUtility.registrar = ->(u) {
  u.clean = ExchangeRatesUtilities::Clean
  u.done = ExchangeRatesUtilities::Done
  u.make_error = ExchangeRatesUtilities::MakeError
  u.feature_add = ExchangeRatesUtilities::FeatureAdd
  u.feature_hook = ExchangeRatesUtilities::FeatureHook
  u.feature_init = ExchangeRatesUtilities::FeatureInit
  u.fetcher = ExchangeRatesUtilities::Fetcher
  u.make_fetch_def = ExchangeRatesUtilities::MakeFetchDef
  u.make_context = ExchangeRatesUtilities::MakeContext
  u.make_options = ExchangeRatesUtilities::MakeOptions
  u.make_request = ExchangeRatesUtilities::MakeRequest
  u.make_response = ExchangeRatesUtilities::MakeResponse
  u.make_result = ExchangeRatesUtilities::MakeResult
  u.make_point = ExchangeRatesUtilities::MakePoint
  u.make_spec = ExchangeRatesUtilities::MakeSpec
  u.make_url = ExchangeRatesUtilities::MakeUrl
  u.param = ExchangeRatesUtilities::Param
  u.prepare_auth = ExchangeRatesUtilities::PrepareAuth
  u.prepare_body = ExchangeRatesUtilities::PrepareBody
  u.prepare_headers = ExchangeRatesUtilities::PrepareHeaders
  u.prepare_method = ExchangeRatesUtilities::PrepareMethod
  u.prepare_params = ExchangeRatesUtilities::PrepareParams
  u.prepare_path = ExchangeRatesUtilities::PreparePath
  u.prepare_query = ExchangeRatesUtilities::PrepareQuery
  u.result_basic = ExchangeRatesUtilities::ResultBasic
  u.result_body = ExchangeRatesUtilities::ResultBody
  u.result_headers = ExchangeRatesUtilities::ResultHeaders
  u.transform_request = ExchangeRatesUtilities::TransformRequest
  u.transform_response = ExchangeRatesUtilities::TransformResponse
}
