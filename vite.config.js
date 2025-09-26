import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    host: true,
    strictPort: true,
    port: 5173,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./frontend/src/setupTests.js'],
  }
})
