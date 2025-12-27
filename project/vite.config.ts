import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React ecosystem
          'react-vendor': ['react', 'react-dom'],
          // Separate routing
          'router-vendor': ['react-router-dom'],
          // Separate markdown and syntax highlighting (largest dependencies)
          'markdown-vendor': ['react-markdown', 'react-syntax-highlighter'],
          // Separate utility libraries
          'utils-vendor': ['lucide-react', 'react-helmet-async'],
        },
      },
    },
    // Increase chunk size warning limit to 800kb (from default 500kb)
    chunkSizeWarningLimit: 800,
  },
});
