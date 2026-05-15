package core

type ExchangeRatesError struct {
	IsExchangeRatesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewExchangeRatesError(code string, msg string, ctx *Context) *ExchangeRatesError {
	return &ExchangeRatesError{
		IsExchangeRatesError: true,
		Sdk:              "ExchangeRates",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ExchangeRatesError) Error() string {
	return e.Msg
}
