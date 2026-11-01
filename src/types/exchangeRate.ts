// 환율 조회 API(EXCHANGE-RATE) 의 result 입니다.
// 1 KRW 가 1 보다 작은 통화(ex. SGD)는 from/to 가 반대로 와서 "1 SGD = N KRW" 를 뜻합니다.
// rate 는 소수점 2자리로 반올림한 표시용 값이라 금액 계산에 쓰지 않습니다.
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  baseDate: string; // 환율 고시 시각 ex. "2026-10-27T15:00:00"
}
