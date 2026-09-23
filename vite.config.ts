import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Allow ngrok tunnels (leading dot matches any subdomain).
  server: { allowedHosts: ['.ngrok-free.app'] },
  preview: { allowedHosts: ['.ngrok-free.app'] },
})
