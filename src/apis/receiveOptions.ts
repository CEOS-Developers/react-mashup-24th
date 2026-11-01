import { get } from "./client";
import type {
  ReceiveOptionSort,
  ReceiveOptionsResult,
} from "../types/receiveOption";

export interface ReceiveOptionsParams {
  sendCurrency: string;
  receiveCurrency: string;
  amount: number; // 0 보다 커야 함 (0 이하면 COMMON400_1)
  sort?: ReceiveOptionSort;
}

// 받는 방법 리스트 조회 (보내는 통화는 KRW 만 지원, sort 생략 시 RATE)
export const getReceiveOptions = (
  params: ReceiveOptionsParams,
  signal?: AbortSignal,
) => get<ReceiveOptionsResult>("/v1/receive-options", { params, signal });
