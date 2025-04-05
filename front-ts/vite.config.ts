// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    watch: {
      usePolling: true, // ช่วยในการตรวจจับการเปลี่ยนแปลงในไฟล์
    },
    host: '0.0.0.0',
    port: 3000
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test-setup.ts",
  },
})
