import type { ApiResponse, ReceiveOptionsResult } from "../types/receiveOption";

// "오늘 도착" 카드 확인용으로 오늘 날짜를 "YYYY-MM-DD" 로 만듭니다. (날짜가 지나도 항상 오늘로 보이게)
const now = new Date();
const TODAY = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

// 받는 방법 리스트 조회 API 응답 예시입니다.
// 나중에 api 연동시 이 파일을 지우고, import 하는 곳을 API 응답으로 교체하면 됩니다.
export const MOCK_RECEIVE_OPTIONS_RESPONSE: ApiResponse<ReceiveOptionsResult> =
  {
    isSuccess: true,
    code: "RECEIVE-OPTION200_1",
    message: "받는 방법 리스트 조회에 성공하였습니다.",
    result: {
      sendCurrency: "KRW",
      receiveCurrency: "VND",
      sendAmount: 1000000,
      options: [
        {
          methodType: "CARD",
          methodProvider: "ATM",
          methodName: "ATM카드",
          speedType: "EXPRESS",
          fixedFee: 5000,
          rateMargin: 0.0005,
          totalAmount: 18443074,
          transferTime: "15분 ~ 1일",
          arrivalDate: TODAY,
          badges: ["RECOMMENDED"],
        },
        {
          methodType: "BANK",
          methodProvider: "NONE",
          methodName: "은행",
          speedType: "STANDARD",
          fixedFee: 2500,
          rateMargin: 0.0015,
          totalAmount: 18424622,
          transferTime: "영업일 2~3일",
          arrivalDate: "2026-10-12",
        },
      ],
    },
  };
