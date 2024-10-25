import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Base public path when served in development or production.
  base: '/',

  // Directory to serve as plain static assets.
  publicDir: 'public',

  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true,
  },

  // Server options
  server: {
    port: 9054,
  },

  // Plugins
  plugins: [vue()],
})
