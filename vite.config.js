import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  
   
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  server: {
    host: '0.0.0.0', // Permite accesos desde cualquier IP
    port: 8080,
    strictPort: true,
    cors: true, // Habilita CORS en caso de ser necesario
  },

  preview: {
    host: '0.0.0.0', 
    port: 8080,
    allowedHosts: "all"
  },
})
