// todomvc/vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { federation } from '@module-federation/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'todomvc', // Nome del remote
      filename: 'remoteEntry.js',

      // Esponi i componenti che vuoi rendere disponibili
      exposes: {
        './todo-app': './src/05-state-manager/App.vue', // Componente principale
        // './todo-header': './src/05-state-manager/AppHeader.vue', // Esempio: componente specifico
      },

      // Condividi dipendenze con l'host per evitare duplicazioni
      shared: ['vue', 'vue-router', 'pinia'],

      dts: false, // Il dynamic-remote-type-hints-plugin tenta di aprire una connessione WebSocket per aggiornare le definizioni TypeScript nell'IDE mentre scrivi codice nel Remote
      dev: true,
    }),
  ],

  // Server dev su porta diversa dall'host
  server: {
    port: 5174,
    cors: true, // Importante per permettere caricamento cross-origin
  },

  preview: {
    port: 5174,
    cors: true,
  },

  // Importante: build in library mode per module federation
  build: {
    target: 'esnext',
    minify: false, // Opzionale: disabilita per debug più facile
    cssCodeSplit: false,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
