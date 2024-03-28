import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dist/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
