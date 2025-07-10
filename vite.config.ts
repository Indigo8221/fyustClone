import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/fyustClone/', // 修正为正确的仓库名
  server: {
    port: 5173
  }
  
}) 
