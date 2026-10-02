import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true, // 파일 변경 강제 감지 옵션
      interval: 100,    // 0.1초 주기
    },
    proxy: {
      '/api': {
        target: "http://localhost:8080",
        changeOrigin: true,
      }
    }
  }
})