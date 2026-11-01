# CEOS MashUp Team 02 Web

> 센트비(Sentbe)의 해외송금 과정에서 받는 방법을 쉽게 비교하고 선택할 수 있도록 송금 흐름을 개선한 프론트엔드 프로젝트입니다.

사용자는 송금할 금액과 통화를 입력하고, 환율·도착 속도·수수료를 기준으로 받는 방법을 비교한 뒤 수취인 정보를 입력할 수 있습니다.

## 주요 기능

### 1. 송금 금액 및 통화 설정

- 국가·통화 선택 바텀시트를 통한 통화 설정
- 환율 API를 활용한 예상 수취 금액 계산
- 최근 송금 이력을 활용한 기본 통화 설정
- 최소 송금액 5,000 KRW 검증

### 2. 받는 방법 비교 및 선택

- **좋은 환율 · 빠른 도착 · 낮은 수수료** 탭에 따른 받는 방법 조회
- 받는 방법별 수취 금액, 수수료 및 도착 정보 확인
- 상세 모달에서 속도별 요금제 확인
- 선택한 방법의 수취 금액과 수수료를 반영한 총 출금액 표시
- 목록 스크롤 시 송금 금액 영역을 요약 형태로 전환
- 금액 입력에 500ms 디바운스를 적용해 API 요청 제어

### 3. 수취인 정보 입력 및 송금 요청

- 국적, 계좌은행, 계좌번호, 영문 이름, 연락처, 생년월일 입력
- 수취 국가에 맞는 국가번호 표시
- 필수 입력값 검증 및 베트남 국적 수취인의 중간이름 검증
- 송금 생성 API 요청 및 중복 제출 방지
- 처리 결과 모달 표시, 완료 확인 후 송금 상태 초기화 및 홈 이동

### 4. 화면 간 송금 정보 유지

- Zustand로 통화, 금액, 환율, 선택한 받는 방법 관리
- `sessionStorage`를 통해 새로고침 후에도 송금 상태 유지
- 필수 송금 정보 없이 다음 단계에 접근하면 홈으로 이동

## 화면 흐름

```text
홈 (/) → 받는 방법 비교 (/transfer) → 수취인 정보 입력 (/information)
  ↑                                         │
  └──────────── 완료 확인 후 홈으로 이동 ────────┘
```

| 경로 | 화면 | 주요 역할 |
| --- | --- | --- |
| `/` | HomePage | 통화 선택, 송금 금액 입력, 예상 수취 금액 확인 |
| `/transfer` | TransferPage | 받는 방법 비교, 상세 조회 및 선택 |
| `/information` | InformationPage | 수취인 정보 입력, 검증 및 송금 생성 요청 |

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| UI | React 19, TypeScript 6 |
| 빌드 | Vite 8, React Compiler |
| 스타일 | Tailwind CSS 4, CSS 디자인 토큰, Pretendard Variable |
| 라우팅 | React Router 8 |
| 상태 관리 | Zustand 5, sessionStorage |
| HTTP 통신 | Axios |
| 코드 품질 | ESLint, Prettier |
| 배포 설정 | Vercel |

## 실행 방법

아래 명령은 `react-mashup-24th` 디렉터리를 기준으로 실행합니다.

### 1. 의존성 설치

```bash
npm ci
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 백엔드 서버 주소를 설정합니다.

```dotenv
VITE_API_BASE_URL=http://43.201.63.60:8080
```

현재 사용하는 백엔드 서버 주소는 `http://43.201.63.60:8080`입니다. 개발 서버는 `/api` 요청을 해당 주소로 전달하므로 환경 변수 값에는 `/api`를 붙이지 않습니다. 이 환경 변수는 로컬 개발용 Vite 프록시에서 사용하며, Vercel 배포 환경의 대상 주소는 `vercel.json`에서 별도로 설정합니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

접속 주소: **http://localhost:3000**

개발 서버 포트는 `3000`으로 고정되어 있으며, 해당 포트가 사용 중이면 실행이 중단됩니다. 환율 조회와 받는 방법 비교 등 API 기반 기능을 사용하려면 백엔드 서버에 연결되어 있어야 합니다.

### 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | TypeScript 빌드 검사 및 프로덕션 번들 생성 |
| `npm run preview` | 빌드 결과 로컬 미리보기 |
| `npm run lint` | ESLint 검사 |

## API 연동

Axios 공통 클라이언트의 기본 경로는 `/api`이며, 요청 제한 시간은 5초입니다. 공통 응답의 `isSuccess`를 확인하고 서버 오류를 `ApiError`로 처리합니다.

| 메서드 | 경로 | 용도 |
| --- | --- | --- |
| GET | `/api/v1/exchange-rates` | 통화 간 환율 조회 |
| GET | `/api/v1/receive-options` | 송금 조건 및 정렬 기준에 따른 받는 방법 조회 |
| GET | `/api/v1/receive-options/details` | 받는 방법별 속도·요금제 상세 조회 |
| GET | `/api/v1/remittances/latest` | 최근 송금 이력 조회 |
| POST | `/api/v1/remittances` | 수취 통화와 송금액으로 송금 생성 |

### HTTPS 배포 환경의 API 프록시

Vercel에 배포된 프론트엔드는 **HTTPS**, 현재 백엔드 서버는 **HTTP**(`http://43.201.63.60:8080`)를 사용합니다. 브라우저에서 HTTPS 페이지가 HTTP API를 직접 호출하면 혼합 콘텐츠(Mixed Content)로 차단될 수 있어, `vercel.json`에 API rewrite를 설정했습니다.

프론트엔드는 백엔드 주소를 직접 호출하는 대신 같은 출처의 `/api`로 요청합니다. 브라우저와 Vercel 사이에서는 HTTPS를 사용하고, Vercel이 서버 측에서 HTTP 백엔드로 요청을 전달합니다.

```text
브라우저 → HTTPS 배포 도메인/api/... → Vercel rewrite → http://43.201.63.60:8080/api/...
```

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://43.201.63.60:8080/api/:path*"
    },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

API rewrite를 SPA fallback보다 먼저 배치해 `/api` 요청은 백엔드로 전달하고, 나머지 화면 경로는 `index.html`로 연결합니다. 이를 통해 `/transfer`, `/information` 경로에 직접 접근하거나 새로고침할 수 있습니다.

로컬 개발 환경에서는 `vite.config.ts`의 프록시가 같은 역할로 `/api` 요청을 `VITE_API_BASE_URL`에 지정한 백엔드로 전달합니다.

## 프로젝트 구조

```text
react-mashup-24th/
├── public/                 # 파비콘 및 SVG 리소스
├── src/
│   ├── apis/               # Axios 클라이언트와 API 요청 함수
│   ├── assets/             # 국가별 국기 이미지, 폰트
│   ├── components/         # 공통 UI 및 송금 입력 컴포넌트
│   │   ├── icons/          # 아이콘 컴포넌트
│   │   ├── w1/             # 홈 화면 컴포넌트
│   │   ├── w2/             # 받는 방법 비교 및 상세 컴포넌트
│   │   └── w3/             # 수취인 입력 및 검증 컴포넌트
│   ├── constants/          # 국가·통화 정보
│   ├── hooks/              # API 조회 및 디바운스 훅
│   ├── mocks/              # 화면 구성용 데이터
│   ├── pages/              # HomePage, TransferPage, InformationPage
│   ├── routes/             # 라우터 및 경로 상수
│   ├── stores/             # 송금 정보 전역 상태
│   ├── styles/             # Primitive·Semantic 디자인 토큰
│   ├── types/              # API 및 도메인 타입
│   └── utils/              # 금액 검증, 환율 계산, 옵션 정렬 등
├── vite.config.ts          # 빌드 플러그인, 개발 서버 및 API 프록시
└── vercel.json             # 배포 환경 API rewrite 및 SPA fallback
```

## 👥 Frontend Team

| 이름 | 역할 |
| --- | --- |
| 안정규 | Frontend |
| 최승하 | Frontend |
