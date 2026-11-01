import { useEffect, useState } from "react";
import axios from "axios";
import { getExchangeRate } from "../apis/exchangeRate";
import type { ExchangeRate } from "../types/exchangeRate";

interface ExchangeRateState {
  key: string; // 어떤 통화 조합의 결과인지 (ex. "KRW-VND")
  data?: ExchangeRate;
  error?: Error;
}

// 환율을 불러옵니다. 통화가 바뀌면 다시 조회하고, 이전 요청은 취소합니다.
export function useExchangeRate(sendCurrency: string, receiveCurrency: string) {
  const key = `${sendCurrency}-${receiveCurrency}`;
  const [state, setState] = useState<ExchangeRateState>({ key: "" });

  useEffect(() => {
    const controller = new AbortController();
    getExchangeRate(sendCurrency, receiveCurrency, controller.signal)
      .then((data) => setState({ key, data }))
      .catch((error: Error) => {
        if (axios.isCancel(error)) return; // 통화를 바꿔서 취소된 요청은 무시
        setState({ key, error });
      });
    return () => controller.abort();
  }, [key, sendCurrency, receiveCurrency]);

  // 저장된 결과가 지금 통화 조합의 것이 아니면 아직 불러오는 중입니다.
  const current = state.key === key ? state : undefined;
  return {
    data: current?.data,
    error: current?.error,
    isLoading: !current,
  };
}
