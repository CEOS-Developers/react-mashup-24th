// 모든 API 가 같이 쓰는 응답 틀입니다. 실패하면 isSuccess 가 false, result 가 null 로 옵니다.
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string; // ex. "EXCHANGE-RATE200_1", "EXCHANGE-RATE404_1"
  message: string;
  result: T;
}

// API 실패를 담는 에러입니다. 화면에서는 code 로 어떤 실패인지 구분합니다.
export class ApiError extends Error {
  code: string;
  status?: number;

  constructor(code: string, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}
