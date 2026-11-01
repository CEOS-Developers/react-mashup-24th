import { get } from "./client";
import type { ReceiveOptionDetail } from "../types/receiveOptionDetail";

export interface ReceiveOptionDetailsParams {
  receiveCurrency: string;
  methodType: string;
  methodProvider: string; // 제공사가 없는 수단(은행 등)은 "NONE"
}

// 받는 방법 상세 조회 (속도별 요금제)
export const getReceiveOptionDetails = (
  params: ReceiveOptionDetailsParams,
  signal?: AbortSignal,
) =>
  get<ReceiveOptionDetail>("/v1/receive-options/details", { params, signal });
