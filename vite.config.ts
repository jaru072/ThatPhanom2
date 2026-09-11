import { defineConfig } from 'vite';

// Google AI Studio preview wrapper.
// The production site remains in /dist.
export default defineConfig({
  root: 'dist',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    hmr: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: '../ai-studio-build',
    emptyOutDir: true,
  },
});
