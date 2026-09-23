import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildHeadTags } from './src/lib/seo'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Put the SEO tags in the HTML itself so crawlers and link previews see them without running JS.
    { name: 'seo-head', transformIndexHtml: html => html.replace('<!--seo-head-->', buildHeadTags()) },
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Allow ngrok tunnels (leading dot matches any subdomain).
  server: { allowedHosts: ['.ngrok-free.app'] },
  preview: { allowedHosts: ['.ngrok-free.app'] },
})
