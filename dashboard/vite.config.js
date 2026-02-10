// dashboard/vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',

      // Configura i microfrontend remoti
      remotes: {
        todomvc: {
          type: 'module',
          name: 'todomvc',
          entry: 'http://localhost:5174/remoteEntry.js', // URL del remote
          entryGlobalName: 'todomvc',
          shareScope: 'default',
        },
      },

      // Stesse dipendenze condivise
      shared: ['vue', 'vue-router', 'pinia'],

      dts: false, // Il dynamic-remote-type-hints-plugin tenta di aprire una connessione WebSocket per aggiornare le definizioni TypeScript nell'IDE mentre scrivi codice nel Remote
      dev: true,
    }),
  ],

  server: {
    origin: 'http://localhost:5173',
    port: 5173,
  },

  build: {
    target: 'esnext',
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
