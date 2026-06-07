import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers
    target: 'es2015',

    // Vite 8 uses oxc (rolldown) — do NOT set minify:'esbuild' (esbuild not bundled)
    // oxc is the default and fastest option
    minify: true,

    // No source maps in production (security + speed)
    sourcemap: false,

    // Warn when a chunk exceeds 600kb
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
        },
        // Content-hash filenames for long-term cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    },

    // Split CSS per chunk
    cssCodeSplit: true,

    // Inline tiny assets as base64 (< 4kb saves HTTP requests)
    assetsInlineLimit: 4096,
  },

  // Pre-bundle these for faster HMR
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },

  preview: {
    port: 4173,
    strictPort: false,
  }
})
