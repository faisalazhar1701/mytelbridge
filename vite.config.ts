import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' works for both github.io/<repo>/ and a custom domain (MyTelBridge.com).
export default defineConfig({ plugins: [react()], base: './' })
