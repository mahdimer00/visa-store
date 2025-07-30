// C:\Users\fesas\OneDrive\Desktop\VISASTORE\visa-store\client\vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Change to a different port, e.g., 5174
    open: true,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
  },
  root: '.',
  publicDir: 'public',
});