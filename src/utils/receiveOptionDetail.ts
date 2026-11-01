import type { ReceiveMethodDetailSection } from "../mocks/receiveMethodDetails";
import type { SpeedType } from "../types/receiveOption";
import type { ReceiveOptionPlan } from "../types/receiveOptionDetail";

const SPEED_LABELS: Record<SpeedType, string> = {
  EXPRESS: "익스프레스",
  STANDARD: "스탠다드",
};

// 속도별 요금제를 상세 모달의 구역 모양으로 바꿉니다.
// ex) 익스프레스 · 소요 시간 15분 ~ 1일 · 수수료 5,000 KRW
export function toPlanSections(
  plans: readonly ReceiveOptionPlan[],
  feeCurrency: string,
): ReceiveMethodDetailSection[] {
  return plans.map((plan) => ({
    title: SPEED_LABELS[plan.speedType],
    items: [
      `소요 시간 ${plan.transferTime}`,
      `수수료 ${plan.fixedFee.toLocaleString("ko-KR")} ${feeCurrency}`,
    ],
  }));
}
