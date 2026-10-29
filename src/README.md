# 소스 폴더 구조

```text
src/
├── apis/         # Axios 설정 및 도메인별 API 요청 함수
├── assets/       # 이미지, 아이콘, 폰트 등 정적 리소스
│   └── icons/    # SVG 아이콘
├── components/   # 여러 페이지에서 재사용하는 UI 컴포넌트
├── constants/    # 공통 상수와 고정된 옵션 목록
├── hooks/        # 커스텀 훅 및 React Query 조회·변경 훅
├── layouts/      # Outlet을 포함하는 공통 페이지 레이아웃
├── pages/        # 라우트에 연결되는 페이지 컴포넌트
├── stores/       # Zustand 전역 클라이언트 상태
├── types/        # 여러 파일에서 공유하는 타입과 API 요청·응답 타입
├── utils/        # 날짜 변환 등 React에 의존하지 않는 유틸리티 함수
├── App.tsx       # 앱 구성 및 라우트 정의
├── index.css     # Tailwind 및 전역 스타일
├── main.tsx      # React 진입점
└── vite-env.d.ts # Vite 환경 타입 선언
```

## 파일 배치 기준

- 컴포넌트와 페이지는 `PascalCase.tsx`로 작성합니다. 예: `Button.tsx`, `HomePage.tsx`.
- 커스텀 훅은 `use` 접두사를 사용합니다. 예: `hooks/useMatches.ts`.
- API 함수, 타입, 상수는 도메인별로 묶습니다. 예: `apis/match.ts`, `types/match.ts`, `constants/match.ts`.
- Zustand 스토어는 `stores/useAuthStore.ts`처럼 이름을 붙입니다. 서버에서 가져온 데이터는 React Query로 관리하고, 전역 클라이언트 상태는 Zustand로 관리합니다.
- 특정 컴포넌트에서만 사용하는 타입은 해당 컴포넌트 파일에 둡니다. 여러 파일에서 공유할 때 `types/`로 분리합니다.
- 한 페이지에서만 쓰는 컴포넌트가 늘어나면 `pages/home/HomePage.tsx`, `pages/home/components/`처럼 페이지 폴더 안에 모읍니다. 여러 페이지에서 재사용하면 `components/`로 옮깁니다.
- 빈 폴더의 `.gitkeep`은 Git에 폴더를 남기기 위한 파일입니다. 실제 파일을 추가한 뒤 삭제해도 됩니다.

## 로컬 API 프록시

- `.env`의 `VITE_API_BASE_URL`에는 `/api`를 제외한 백엔드 서버 주소를 설정합니다.
- Axios의 기본 주소는 `/`이며, API 함수는 `/api/auth/guest`처럼 `/api`로 시작하는 경로를 사용합니다.
- 개발 중에는 `http://localhost:5173/api/...` 요청을 Vite가 백엔드로 전달합니다. 쿠키의 `SameSite`, `Secure`, `HttpOnly` 속성은 유지합니다.
- `Origin` 헤더는 그대로 전달하므로 백엔드의 `http://localhost:5173` 허용 설정을 유지합니다.
- 이 프록시는 개발 서버용입니다. 배포 시에는 Vercel 등 배포 서버에도 `/api` 전달 규칙이 필요합니다.

## 매치 목록 조회

- `apis/match.ts`의 `getMatches`는 `GET /api/matches`, `searchMatches`는 `POST /api/matches/search`를 호출합니다. 두 API는 동일한 `MatchListParams` 요청 필드와 `MatchListResponse` 응답 타입을 공유합니다.
- `hooks/useMatches.ts`의 `useMatches({ date, ...filters })`는 유효한 추가 필터가 있으면 POST, 없으면 GET으로 0번 페이지부터 20개씩 조회합니다. 날짜는 KST 기준 `YYYY-MM-DD`이며, `size`도 지정할 수 있습니다.
- 서버의 `hasNext`와 `page`로 다음 페이지를 결정하고, 날짜·필터·페이지 크기를 쿼리 키에 포함해 목록별 캐시를 분리합니다. 날짜를 바꾸면 해당 날짜의 목록으로 전환하고 이전 요청을 취소합니다.
- 목록 하단이 가까워지면 다음 페이지를 불러옵니다. 오류 시 자동 추가 조회를 멈추고 기존 목록과 재시도 버튼을 표시합니다.
- GET/POST 캐시는 `['matches', 'list', 'GET' | 'POST', params]`로 구분합니다. 필터 적용·초기화 시 캐시가 있어도 서버에서 다시 조회하며, 변경된 날짜·조건의 목록은 별도 캐시에서 조회합니다.
- 빈 배열·미선택 값과 `indoor`·`awning`·`parking`의 false는 생략합니다. `shoeRental: false`, `earlybird: false`, `timeAfter: 0`은 유효한 조건으로 유지합니다. 실제 서버는 `hideClosed: false` 단독 조건도 `MATCH4001`로 거절하므로, `hideClosed`와 페이지 정보는 추가 필터로 세지 않습니다.
- `HomePage`는 `appliedFilters: MatchFilters`를 내부 상태로 관리합니다. 추후 바텀시트 안의 선택 중인 값은 임시 상태로 관리하고, 확정 버튼을 누를 때만 `setAppliedFilters(nextFilters)`로 반영합니다. 초기화 시 `{}`를 설정하면 GET 목록으로 돌아갑니다. 캘린더로 날짜를 바꿔도 적용한 필터는 유지합니다.
- 즐겨찾기는 `useMatchFavorite`의 `useMutation`으로 PUT/DELETE API를 호출합니다. 하트와 찜 수를 먼저 변경하고, 실패하면 해당 매치만 복원하며 토스트를 표시합니다. 성공하면 서버 응답으로 갱신합니다.
