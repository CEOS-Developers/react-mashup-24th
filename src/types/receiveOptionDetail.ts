import type { SpeedType } from "./receiveOption";

// 받는 방법 상세 조회 API(RECEIVE-OPTION200_2) 의 result 입니다.
// 같은 받는 방법의 속도별 요금제가 빠른 순으로 옵니다. (선택 불가 방법은 plans 가 빈 배열)
export interface ReceiveOptionPlan {
  speedType: SpeedType;
  transferTime: string; // ex. "15분 ~ 1일"
  fixedFee: number;
}

export interface ReceiveOptionDetail {
  plans: ReceiveOptionPlan[];
}
