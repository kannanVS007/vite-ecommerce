import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/ecommerce-react-vite/", // GitHub Pages base path
  
  // Build optimizations
  build: {
    rollupOptions: {
      output: {
        // Manually split large chunks to optimize performance
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    
    // Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 500, // Set to a higher limit if you expect larger chunks
  }
})
