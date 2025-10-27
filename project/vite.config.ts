import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: 'public',
  assetsInclude: ['**/*.md', '**/*.csv'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep markdown files in their original structure
          if (assetInfo.name?.endsWith('.md')) {
            return 'content/blogs/[name][extname]';
          }
          // Keep CSV files in their original structure
          if (assetInfo.name?.endsWith('.csv')) {
            return 'content/data/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    copyPublicDir: true,
  },
});
