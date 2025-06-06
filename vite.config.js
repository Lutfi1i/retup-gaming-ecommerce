import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import taosPlugin from 'taos/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), taosPlugin],
  server : {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    host: true,
    allowedHosts: ['.ngrok-free.app'],
  },
});
