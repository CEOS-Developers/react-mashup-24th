import type { TransferMethodTabValue } from "../components/w2/TransferMethodTab";
import type { ReceiveOption, ReceiveOptionSort } from "../types/receiveOption";

// 탭 → 서버 정렬 기준
export const SORT_BY_TAB: Record<TransferMethodTabValue, ReceiveOptionSort> = {
  rate: "RATE", // 좋은 환율: 받는 금액 큰 순
  speed: "TIME", // 빠른 도착
  fee: "FEE", // 낮은 수수료
};

const isRecommended = (option: ReceiveOption) =>
  option.badges?.includes("RECOMMENDED") ?? false;

// 정렬은 서버(sort)가 하고, 추천 뱃지 카드만 맨 위로 올립니다. 나머지는 서버 순서를 그대로 유지합니다.
export function sortReceiveOptions(options: readonly ReceiveOption[]) {
  return [
    ...options.filter(isRecommended),
    ...options.filter((option) => !isRecommended(option)),
  ];
}
