import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Agregamos esta línea para forzar la ruta absoluta desde la raíz
  base: '/',
  preview: {
    allowedHosts: true,
  },
})