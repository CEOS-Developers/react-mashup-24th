// 받는 방법 리스트 조회 API(RECEIVE-OPTION) 응답 타입입니다.

export type SpeedType = "EXPRESS" | "STANDARD";

// 서버 정렬 기준 (TIME: 빠른 도착, FEE: 낮은 수수료, RATE: 받는 금액 큰 순 · 기본값)
export type ReceiveOptionSort = "TIME" | "FEE" | "RATE";

// 선택 가능한 받는 방법입니다. 화면(카드)에서는 이 타입만 씁니다.
export interface ReceiveOption {
  methodType: string; // ex. "CARD", "BANK"
  methodProvider: string; // ex. "ATM", "VISA", "NONE"
  methodName: string; // 화면에 보이는 이름 ex. "은행"
  speedType: SpeedType;
  fixedFee: number;
  rateMargin: number;
  totalAmount: number;
  transferTime: string; // ex. "15분 ~ 1일"
  arrivalDate: string; // "YYYY-MM-DD"
  badges?: string[]; // ex. ["RECOMMENDED"], 없으면 필드가 빠져서 옴
}

type AmountFields = "fixedFee" | "rateMargin" | "totalAmount" | "arrivalDate";

// API 가 주는 그대로의 받는 방법입니다.
// 선택 불가 옵션은 금액 정보 없이 unselectableReason 만 오므로, 금액 필드가 없을 수 있습니다.
export type ReceiveOptionResponse = Omit<ReceiveOption, AmountFields> &
  Partial<Pick<ReceiveOption, AmountFields>> & {
    unselectableReason?: string;
  };

export interface ReceiveOptionsResult {
  sendCurrency: string;
  receiveCurrency: string;
  sendAmount: number;
  options: ReceiveOptionResponse[];
}

// 선택 가능한 옵션인지 확인합니다. 걸러낸 뒤에는 금액 필드가 모두 있는 ReceiveOption 이 됩니다.
export const isSelectableOption = (
  option: ReceiveOptionResponse,
): option is ReceiveOption =>
  !option.unselectableReason &&
  option.fixedFee !== undefined &&
  option.rateMargin !== undefined &&
  option.totalAmount !== undefined &&
  option.arrivalDate !== undefined;

// 카드 하나를 구분하는 key 입니다. (API 에 id 가 없어서 조합해서 사용)
// 같은 방법이 속도별로 두 장씩 올 수 있어서 speedType 까지 넣습니다. ex) BANK-NONE-STANDARD, BANK-NONE-EXPRESS
export const getReceiveOptionKey = (
  option: Pick<ReceiveOption, "methodType" | "methodProvider" | "speedType">,
) => `${option.methodType}-${option.methodProvider}-${option.speedType}`;

// 받는 방법(속도 무관)을 구분하는 key 입니다. 상세 안내처럼 방법별로 같은 정보를 찾을 때 씁니다. ex) BANK-NONE
export const getReceiveMethodKey = (
  option: Pick<ReceiveOption, "methodType" | "methodProvider">,
) => `${option.methodType}-${option.methodProvider}`;
