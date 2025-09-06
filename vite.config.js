import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server : {
    proxy:  
        '/api': {
        target: 'https://api-e-commerce-retup-10.vercel.app/', // Replace with your backend API URL
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix when forwarding
      },
    host: true,
    allowedHosts: ['.ngrok-free.app'],
  },
});
