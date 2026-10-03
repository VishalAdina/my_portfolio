import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Keep the critical path small: the animation stack is split out so a
        // change to one library never invalidates React in the browser cache.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/gsap/')) return 'gsap';
          if (id.includes('/motion') || id.includes('/framer-motion')) return 'motion';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // The sandboxed preview is served from a proxied host, so it has to be
    // explicitly trusted (Vite blocks unknown Host headers by default).
    allowedHosts: ['.e2b.app', 'localhost', '127.0.0.1'],
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
}));
