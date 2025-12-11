import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ajusta `base` al nombre correcto del repositorio para GitHub Pages (proyecto "Anggis-Nail").
export default defineConfig({
  plugins: [react()],
  base: '/Anggis-Nail/'
})
