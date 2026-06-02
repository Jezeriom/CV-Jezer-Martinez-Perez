import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/CV-Jezer-Martinez-Perez/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
