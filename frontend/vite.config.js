import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env files based on mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // Server configuration
    server: {
      port: 5173,
      // Proxy API requests to avoid CORS issues in development
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          // Optional: rewrite path if needed
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/health': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    
    // Define global constants (optional)
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    
    // Resolve aliases (optional - for cleaner imports)
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@hooks': '/src/hooks',
        '@lib': '/src/lib',
      },
    },
  }
})