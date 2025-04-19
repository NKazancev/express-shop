import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { join } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@config': join(__dirname, './src/config'),
      '@shared': join(__dirname, './src/shared'),
      '@widgets': join(__dirname, './src/widgets'),
    },
  },
});
