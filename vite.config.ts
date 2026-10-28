import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    // 팀 개발 서버 포트 3000 고정 (사용 중이면 다른 포트로 넘어가지 않고 에러)
    server: {
      port: 3000,
      strictPort: true,
      // /api 로 시작하는 요청을 백엔드로 대신 보내서 CORS 를 피합니다. (개발 서버에서만 동작)
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
