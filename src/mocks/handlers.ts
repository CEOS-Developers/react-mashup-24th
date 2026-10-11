import { http, HttpResponse } from 'msw';

export const handlers = [
  // 예시: MSW가 동작하는지 확인용
  http.get('*/api/ping', () => {
    return HttpResponse.json({ message: 'pong' });
  }),
];