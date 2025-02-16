import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Permite que o Vite aceite conexões de fora do contêiner
    port: 5173, // Porta do frontend
    watch: {
      usePolling: true, // Habilita polling para verificar mudanças no arquivo
    },
  },
});