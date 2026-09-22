// vite.config.js
/* v2.0.0 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.endsWith('.md')) {
          const parsed = matter(code);
          return `export default ${JSON.stringify(parsed)};`;
        }
      }
    }
  ],
  server: {
    port: 5173,
    strictPort: false
  }
});