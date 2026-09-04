import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  root: 'demo',
  plugins: [react()],
  publicDir: 'public',
  build: {
    emptyOutDir: false,
    copyPublicDir: false,
    outDir: resolve(import.meta.dirname, 'dist'),
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'pigeon-maps', 'pigeon-maps/providers'],
    },
  },
})
