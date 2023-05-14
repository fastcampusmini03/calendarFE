import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      '@mui_icons-material_Instagram.js',
      '@mui_icons-material_Twitter.js',
      '@mui_icons-material_Facebook.js',
    ],
  },
})
