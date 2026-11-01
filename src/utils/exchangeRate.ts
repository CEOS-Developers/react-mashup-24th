import type {
  TransferDraft,
  TransferQuote,
} from "../components/w1/CardTransfer";
import type { ExchangeRate } from "../types/exchangeRate";

// 보내는 통화 1 단위가 받는 통화로 얼마인지 계산합니다.
// API 는 1 KRW 가 1 보다 작은 통화(ex. SGD)를 "1 SGD = N KRW" 로 뒤집어서 주므로, 그때는 역수를 씁니다.
// (API rate 는 소수점 2자리 반올림 값이라 계산 결과에 약간의 오차가 있습니다.)
export function getRatePerSendUnit(
  sendCurrency: string,
  exchangeRate: ExchangeRate,
) {
  if (exchangeRate.from === sendCurrency) return exchangeRate.rate;
  if (exchangeRate.to === sendCurrency) return 1 / exchangeRate.rate;
  return undefined;
}

// 환율 API 결과로 견적을 만듭니다. 받는 금액 = 보내는 금액 × 환율 (소수점 둘째 자리 반올림)
export function getQuoteFromExchangeRate(
  draft: TransferDraft,
  exchangeRate: ExchangeRate | undefined,
): TransferQuote | undefined {
  if (!exchangeRate || draft.sendAmount === "") return undefined;
  const rate = getRatePerSendUnit(draft.fromCurrency, exchangeRate);
  if (rate === undefined) return undefined;

  const receiveAmount = Math.round(Number(draft.sendAmount) * rate * 100) / 100;

  return {
    id: `exchange-rate-${exchangeRate.baseDate}`,
    sendAmount: draft.sendAmount,
    fromCurrency: draft.fromCurrency,
    toCurrency: draft.toCurrency,
    receiveAmount: String(receiveAmount),
    rate,
  };
}
