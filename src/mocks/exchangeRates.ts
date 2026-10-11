// UI 확인용 임의 환율입니다. 실시간 시세가 아니며 1 KRW 기준입니다.
// 나중에 api 연동시 이 파일을 지우고, import 하는 곳을 API 응답으로 교체하면 됩니다.
const MOCK_EXCHANGE_RATES: Record<string, number> = {
  KRW: 1,
  VND: 19.03,
  SGD: 0.00095,
  IDR: 11.5,
};

// KRW 기준 환율로 두 통화 사이의 교차 환율을 계산합니다.
export function getMockRate(fromCurrency: string, toCurrency: string) {
  const from = MOCK_EXCHANGE_RATES[fromCurrency];
  const to = MOCK_EXCHANGE_RATES[toCurrency];
  return from && to ? to / from : undefined;
}
