/** 백엔드가 모든 성공·실패 응답을 감싸서 내려주는 공통 형태 */
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  error: unknown;
}
