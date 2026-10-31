import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command, mode }) => {
  const { VITE_API_BASE_URL: apiTarget } = loadEnv(mode, process.cwd(), 'VITE_');

  if (command === 'serve' && !apiTarget) {
    throw new Error('VITE_API_BASE_URL에 백엔드 서버 주소를 설정해 주세요.');
  }

  return {
    plugins: [react(), tailwindcss(), svgr()],
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
