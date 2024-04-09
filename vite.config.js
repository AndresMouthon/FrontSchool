import { defineConfig } from 'vite'
//import  postcss  from 'vite-plugin-postcss' 
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
})
