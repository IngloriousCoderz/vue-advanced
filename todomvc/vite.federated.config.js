// todomvc/vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'todomvc', // Nome del remote
      filename: 'remoteEntry.js',

      // Esponi i componenti che vuoi rendere disponibili
      exposes: {
        './TodoApp': './src/05-state-manager/App.vue', // Componente principale
        // './TodoHeader': './src/05-state-manager/AppHeader.vue', // Esempio: componente specifico
      },

      // Condividi dipendenze con l'host per evitare duplicazioni
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

  // Server dev su porta diversa dall'host
  server: {
    port: 5174,
    cors: true, // Importante per permettere caricamento cross-origin
  },

  preview: {
    port: 5174,
    cors: true,
  },
})
