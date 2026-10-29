export interface ReceiveMethodDetailSection {
  title: string;
  items: string[];
}

// 상세 모달의 공통 안내입니다. 실제 API 연동 전까지 이곳에서 문구를 수정합니다.
const VND_RECEIVE_NOTICES = [
  "하루 최대 송금액은 10,000,000 KRW이에요",
  "USD가 아닌 VND로만 송금할 수 있어요",
  "Agribank 거래 시 은행에 의해 별도로 44,000 VND가 청구돼요",
  "입금은 NAPAS 은행 상황에 따라 더 걸릴 수 있어요",
  "일 최대 180,000,000 VND까지 송금 가능해요",
];

// 국가별 한도·은행 안내는 해당 통화에만 적용합니다.
// 다른 국가의 실제 정책은 API 연동 또는 목데이터 추가 시 등록합니다.
export function getMockReceiveNotices(
  fromCurrency: string,
  toCurrency: string,
) {
  if (toCurrency === "VND") {
    return VND_RECEIVE_NOTICES.filter(
      (_, index) => index !== 0 || fromCurrency === "KRW",
    );
  }

  return [`받는 금액은 ${toCurrency}로 입금돼요`];
}

// getReceiveMethodKey(option)의 값(예: BANK-NONE)을 키로 사용합니다. (속도와 무관하게 방법별로 같은 안내)
// 추가 안내가 필요하면 해당 키에 { title, items } 배열을 넣습니다.
// 등록하지 않은 방법에는 공통 유의사항만 표시됩니다.
export const RECEIVE_METHOD_DETAIL_SECTIONS: Record<
  string,
  ReceiveMethodDetailSection[]
> = {};
