// dashboard/vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'dashboard',

      // Configura i microfrontend remoti
      remotes: {
        todomvc: 'http://localhost:5174/assets/remoteEntry.js', // URL del remote
      },

      // Stesse dipendenze condivise
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.5.0',
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^5.0.1',
        },
        pinia: {
          singleton: true,
          requiredVersion: '^3.0.4',
        },
      },
    }),
  ],

  build: {
    target: 'esnext',
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 5173,
  },
})
