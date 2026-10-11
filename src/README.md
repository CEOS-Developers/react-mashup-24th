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
