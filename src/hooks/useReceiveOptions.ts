import { useEffect, useState } from "react";
import axios from "axios";
import { getReceiveOptions } from "../apis/receiveOptions";
import { useDebouncedValue } from "./useDebouncedValue";
import type {
  ReceiveOptionSort,
  ReceiveOptionsResult,
} from "../types/receiveOption";

const DEBOUNCE_MS = 500;

interface ReceiveOptionsState {
  key: string; // 어떤 요청의 결과인지 (통화 · 금액 · 정렬)
  pair: string; // 어떤 통화 조합의 결과인지
  data?: ReceiveOptionsResult;
  error?: Error;
}

// 받는 방법 목록을 불러옵니다.
// - 금액 입력이 0.5초 멈추면 요청하고, 금액이 비었거나 0 이면 요청하지 않습니다.
// - 새 결과가 오기 전까지는 같은 통화 조합의 이전 결과를 그대로 보여줘서 카드가 깜빡이지 않게 합니다.
export function useReceiveOptions(
  sendCurrency: string,
  receiveCurrency: string,
  amount: string,
  sort: ReceiveOptionSort,
) {
  const debouncedAmount = useDebouncedValue(amount, DEBOUNCE_MS);
  const amountNumber = Number(debouncedAmount);
  // 입력이 멈췄고(debounce 완료) 0 보다 큰 금액일 때만 요청합니다.
  const enabled =
    debouncedAmount === amount &&
    Number.isFinite(amountNumber) &&
    amountNumber > 0;

  const pair = `${sendCurrency}-${receiveCurrency}`;
  const key = `${pair}-${debouncedAmount}-${sort}`;
  const [state, setState] = useState<ReceiveOptionsState>({
    key: "",
    pair: "",
  });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    getReceiveOptions(
      { sendCurrency, receiveCurrency, amount: amountNumber, sort },
      controller.signal,
    )
      .then((data) => setState({ key, pair, data }))
      .catch((error: Error) => {
        if (axios.isCancel(error)) return; // 입력·통화·정렬이 바뀌어 취소된 요청은 무시
        setState({ key, pair, error });
      });
    return () => controller.abort();
  }, [enabled, key, pair, sendCurrency, receiveCurrency, amountNumber, sort]);

  const isCurrent = state.key === key;
  return {
    data: state.pair === pair ? state.data : undefined,
    error: isCurrent ? state.error : undefined,
    isLoading: amount !== debouncedAmount || (enabled && !isCurrent),
  };
}
