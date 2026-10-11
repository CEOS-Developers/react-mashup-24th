import type { ComponentPropsWithoutRef } from "react";
import ExchangeIcon from "./icons/ExchangeIcon";

interface ExchangeRateProps extends ComponentPropsWithoutRef<"div"> {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

// 1 보다 작은 환율(ex. 1 KRW = 0.00073 USD)은 소수점 두 자리로 자르면 0 이 되므로 유효숫자 기준으로 보여줍니다.
function formatRate(rate: number) {
  return rate >= 1
    ? rate.toLocaleString("ko-KR", { maximumFractionDigits: 2 })
    : rate.toLocaleString("ko-KR", { maximumSignificantDigits: 4 });
}

function ExchangeRate({
  fromCurrency,
  toCurrency,
  rate,
  className = "",
  ...props
}: ExchangeRateProps) {
  return (
    <div
      className={`inline-flex h-(--unit-36) items-center justify-center gap-gap-8 rounded-full bg-blue-100 px-padding-wide py-padding-medium text-body-4-semibold text-text-informative ${className}`}
      {...props}
    >
      <span>1 {fromCurrency}</span>
      <ExchangeIcon />
      <span>
        {formatRate(rate)} {toCurrency}
      </span>
    </div>
  );
}

export default ExchangeRate;
