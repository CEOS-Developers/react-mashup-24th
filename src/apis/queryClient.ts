import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 없는 판례처럼 다시 불러도 같은 결과인 실패는 반복하지 않는다
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
