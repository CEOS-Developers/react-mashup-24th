import { useEffect, useState } from "react";
import axios from "axios";
import {
  getReceiveOptionDetails,
  type ReceiveOptionDetailsParams,
} from "../apis/receiveOptionDetails";
import type { ReceiveOptionDetail } from "../types/receiveOptionDetail";

interface ReceiveOptionDetailsState {
  key: string;
  data?: ReceiveOptionDetail;
  error?: Error;
}

// 받는 방법 상세(속도별 요금제)를 불러옵니다. params 가 null 이면(모달이 닫혀 있으면) 요청하지 않습니다.
export function useReceiveOptionDetails(
  params: ReceiveOptionDetailsParams | null,
) {
  const key = params
    ? `${params.receiveCurrency}-${params.methodType}-${params.methodProvider}`
    : "";
  const [state, setState] = useState<ReceiveOptionDetailsState>({ key: "" });

  const receiveCurrency = params?.receiveCurrency;
  const methodType = params?.methodType;
  const methodProvider = params?.methodProvider;

  useEffect(() => {
    if (!receiveCurrency || !methodType || !methodProvider) return;
    const controller = new AbortController();
    getReceiveOptionDetails(
      { receiveCurrency, methodType, methodProvider },
      controller.signal,
    )
      .then((data) => setState({ key, data }))
      .catch((error: Error) => {
        if (axios.isCancel(error)) return; // 모달을 닫거나 다른 방법을 열어서 취소된 요청은 무시
        setState({ key, error });
      });
    return () => controller.abort();
  }, [key, receiveCurrency, methodType, methodProvider]);

  const current = params && state.key === key ? state : undefined;
  return {
    data: current?.data,
    error: current?.error,
    isLoading: params !== null && !current,
  };
}
