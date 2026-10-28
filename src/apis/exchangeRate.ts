import { get } from "./client";
import type { ExchangeRate } from "../types/exchangeRate";

// 환율 조회 (보내는 통화는 KRW 만 지원)
export const getExchangeRate = (
  sendCurrency: string,
  receiveCurrency: string,
  signal?: AbortSignal,
) =>
  get<ExchangeRate>("/v1/exchange-rates", {
    params: { sendCurrency, receiveCurrency },
    signal,
  });
