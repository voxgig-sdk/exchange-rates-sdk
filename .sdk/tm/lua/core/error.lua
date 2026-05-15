-- ExchangeRates SDK error

local ExchangeRatesError = {}
ExchangeRatesError.__index = ExchangeRatesError


function ExchangeRatesError.new(code, msg, ctx)
  local self = setmetatable({}, ExchangeRatesError)
  self.is_sdk_error = true
  self.sdk = "ExchangeRates"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ExchangeRatesError:error()
  return self.msg
end


function ExchangeRatesError:__tostring()
  return self.msg
end


return ExchangeRatesError
