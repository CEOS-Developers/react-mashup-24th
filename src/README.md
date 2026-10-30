# 소스 구조와 동작

```text
src/
├── apis/         # Axios 설정 및 도메인별 API 요청 함수
├── assets/       # 이미지와 SVG 아이콘
│   └── icons/    # SVG 아이콘
├── components/   # 여러 페이지에서 재사용하는 UI 컴포넌트
├── constants/    # 공통 상수와 고정된 옵션 목록
├── hooks/        # 커스텀 훅
├── layouts/      # Outlet을 포함하는 공통 페이지 레이아웃
├── pages/        # 라우트에 연결되는 페이지 컴포넌트
├── types/        # 여러 파일에서 공유하는 타입과 API 요청·응답 타입
├── utils/        # 날짜 변환 등 React에 의존하지 않는 유틸리티 함수
├── App.tsx       # 앱 구성 및 라우트 정의
├── index.css     # Tailwind 및 전역 스타일
├── main.tsx      # React 진입점과 QueryClientProvider·AuthGate 구성
└── vite-env.d.ts # Vite 환경 타입 선언
```

## 파일 배치 기준

- 컴포넌트와 페이지는 `PascalCase.tsx`로 작성합니다. 예: `ActionButton.tsx`, `HomePage.tsx`.
- 커스텀 훅은 `use` 접두사를 사용합니다. 예: `hooks/useCities.ts`.
- `useMutation`을 사용하는 커스텀 훅은 `useMutationFavoriteArea`, `useMutationFavoriteMatch`처럼 `useMutation` 접두사를 사용하고 파일명도 훅 이름과 일치시킵니다.
- API 함수와 공유 타입은 `apis/region.ts`, `types/region.ts`처럼 도메인별로 묶습니다.
- 특정 컴포넌트에서만 사용하는 타입은 해당 컴포넌트 파일에 둡니다. 여러 파일에서 공유할 때 `types/`로 분리합니다.

## 진입과 인증

- `main.tsx`에서 `QueryClientProvider`와 `AuthGate`로 앱을 감쌉니다.
- `AuthGate`는 `POST /api/auth/refresh`로 인증을 복원합니다. 이 요청이 401이면서 서비스 코드가 `AUTH_INVALID_REFRESH_TOKEN` 또는 `AUTH_INVALID_GUEST`이면 `POST /api/auth/guest`로 게스트를 생성하고, 다른 오류이면 재시도 화면을 표시합니다.
- Access Token은 `apis/auth.ts`의 메모리에 보관합니다. Refresh Token 쿠키는 브라우저가 처리하며 Axios의 `withCredentials`로 전송합니다.
- `apis/axios.ts`는 토큰이 있으면 Bearer 헤더를 붙입니다. 401의 서비스 코드가 `AUTH_UNAUTHORIZED`, `AUTH_INVALID_TOKEN`, `COMMON401`이면 토큰을 갱신하거나 이미 갱신된 토큰을 재사용해 원래 요청을 한 번 재시도합니다. `AUTH_INVALID_GUEST` 또는 `AUTH_INVALID_REFRESH_TOKEN`이면 토큰을 지우고 오류를 전달합니다.
- `App.tsx`의 `/` 경로에서 375px 너비의 `MobileLayout`과 `HomePage`를 표시합니다.

## 로컬 API 프록시

- `.env`의 `VITE_API_BASE_URL`에는 `/api`를 제외한 백엔드 서버 주소를 설정합니다.
- Axios의 기본 주소는 `/`이며, API 함수는 `/api/auth/guest`처럼 `/api`로 시작하는 경로를 사용합니다.
- 개발 중에는 `http://localhost:5173/api/...` 요청을 Vite가 백엔드로 전달합니다. 쿠키의 `SameSite`, `Secure`, `HttpOnly` 속성은 유지합니다.
- `Origin` 헤더는 그대로 전달하므로 백엔드의 `http://localhost:5173` 허용 설정을 유지합니다.
- 이 프록시는 개발 서버용입니다. 배포 시에는 Vercel 등 배포 서버에도 `/api` 전달 규칙이 필요합니다.

개발 환경에서는 Vite 개발 서버를 프록시 서버로 사용해 `/api` 요청을 백엔드로 전달합니다. 실행 방법과 프록시 설정은 [루트 README](../README.md)를 참고하세요.

## 서버 데이터 관리

도시 목록, 도시별 지역 목록, 현재 게스트의 관심 지역 목록을 TanStack Query의 캐시로 관리합니다. 도시별 지역 목록은 도시 ID를 기준으로 구분하며, 관심 지역 등록·해제 시 관련 목록도 함께 갱신합니다.

## 매치 목록 조회

- `apis/match.ts`의 `getMatches`는 `GET /api/matches`, `searchMatches`는 `POST /api/matches/search`를 호출합니다. 두 API는 동일한 `MatchListParams` 요청 필드와 `MatchListResponse` 응답 타입을 공유합니다.
- `hooks/useMatches.ts`의 `useMatches({ date, ...filters })`는 유효한 추가 필터가 있으면 POST, 없으면 GET으로 0번 페이지부터 20개씩 조회합니다. 날짜는 KST 기준 `YYYY-MM-DD`이며, `size`도 지정할 수 있습니다.
- 서버의 `hasNext`와 `page`로 다음 페이지를 결정하고, 날짜·필터·페이지 크기를 쿼리 키에 포함해 목록별 캐시를 분리합니다. 날짜를 바꾸면 해당 날짜의 목록으로 전환하고 이전 요청을 취소합니다.
- 목록 하단이 가까워지면 다음 페이지를 불러옵니다. 오류 시 자동 추가 조회를 멈추고 기존 목록과 재시도 버튼을 표시합니다.
- GET/POST 캐시는 `['matches', 'list', 'GET' | 'POST', params]`로 구분합니다. 필터 적용·초기화 시 캐시가 있어도 서버에서 다시 조회하며, 변경된 날짜·조건의 목록은 별도 캐시에서 조회합니다.
- 빈 배열·미선택 값과 `indoor`·`awning`·`parking`의 false는 생략합니다. `shoeRental: false`, `earlybird: false`, `timeAfter: 0`은 유효한 조건으로 유지합니다. 실제 서버는 `hideClosed: false` 단독 조건도 `MATCH4001`로 거절하므로, `hideClosed`와 페이지 정보는 추가 필터로 세지 않습니다.
- `HomePage`는 `appliedFilter: FilterState`와 `appliedRegion: RegionSelection`을 내부 상태로 관리합니다. 필터 바텀시트 안의 선택 중인 값은 임시 상태로 관리하고, 적용 버튼을 누를 때만 `setAppliedFilter`로 반영합니다. 필터 초기화는 일반 필터만 비우며, 적용한 지역이 남아 있으면 POST 검색을 유지합니다. 지역과 일반 필터가 모두 비어 있으면 GET 목록을 조회합니다. 미선택 시간·성별과 얼리버드·신발 대여 칩은 요청 조건에서 생략합니다. 캘린더로 날짜를 바꿔도 적용한 지역과 필터는 유지합니다.
- 즐겨찾기는 `useMutationFavoriteMatch`의 `useMutation`으로 PUT/DELETE API를 호출합니다. 하트와 찜 수를 먼저 변경하고, 실패하면 해당 매치만 복원하며 토스트를 표시합니다. 성공하면 서버 응답으로 갱신합니다.

## 지역 선택

- `FilterBar`의 지도 버튼 또는 내 지역 버튼으로 공용 `BottomSheet`를 사용하는 `RegionBottomSheet`를 엽니다.
- 열 때마다 내 지역부터 표시합니다. `selectedCityId`가 `null`이면 전체 관심 지역 목록을, 숫자이면 해당 도시의 지역 목록을 표시합니다.
- 지역 이름은 표시만 하고 하트로 관심 지역을 등록·해제합니다. 하트는 공용 `FavoriteButton`을 사용하며 지역 행에 별도의 선택 상태는 없습니다.
- 하트 변경 시 도시별 지역 목록과 전체 관심 지역 목록의 캐시를 낙관적으로 갱신합니다. 실패하면 해당 지역을 이전 상태로 복구하고 바텀시트에 오류를 표시합니다. 요청 완료 후 관련 목록을 무효화하고 사용 중인 목록을 다시 조회합니다. 변경 요청 중에는 하트 버튼을 비활성화합니다.
- 하트 변경은 즉시 서버에 저장하며 닫기 버튼으로 취소되지 않습니다.
- 적용 버튼을 누르면 전체 관심 지역 ID를 HomePage의 `appliedRegion`에 저장하고 `useMatches`의 `areaId`로 전달합니다. 기존 날짜·필터 조건과 함께 검색하고, 지역 조건이 바뀌면 해당 조건의 목록을 0페이지부터 조회합니다. 하트만 변경하거나 닫기 버튼을 누른 경우에는 매치 검색 조건을 바꾸지 않습니다.
- 내 지역 칩은 적용된 지역 ID가 있을 때만 연두색으로 표시합니다. 처음에는 회색이며, 관심 지역이 없는 상태에서 적용하면 지역 조건을 제거하고 회색으로 돌아갑니다. 이때 일반 필터가 남아 있으면 해당 필터로 검색합니다.
