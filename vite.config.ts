import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base 설정
  // 프로덕션에서는 '/cusor1/', 로컬에서는 '/'
  base: process.env.NODE_ENV === 'production' ? '/cusor1/' : '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // 청크 크기 경고 제한 증가
    chunkSizeWarningLimit: 1000,
    // 상대 경로로 빌드
    assetsDir: 'assets',
  }
})
