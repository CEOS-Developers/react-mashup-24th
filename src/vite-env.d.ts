/// <reference types="vite/client" />

// .env 에 적은 환경 변수의 타입입니다. (VITE_ 로 시작해야 코드에서 읽을 수 있음)
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
