import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Plugin per ottimizzazioni (da installare con npm/pnpm)
import { visualizer } from 'rollup-plugin-visualizer' // Bundle analysis
import viteCompression from 'vite-plugin-compression' // Gzip/Brotli compression
import { VitePWA } from 'vite-plugin-pwa' // Progressive Web App
import { imagetools } from 'vite-imagetools' // Ottimizzazione immagini
import inspect from 'vite-plugin-inspect' // Ispezione trasformazioni Vite

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    // Analizza il bundle e mostra grafico interattivo delle dimensioni
    // Genera stats.html dopo il build
    visualizer({
      open: true, // Apre automaticamente il report dopo build
      gzipSize: true, // Mostra anche dimensioni gzippate
      brotliSize: true, // Mostra dimensioni brotli
      filename: 'dist/stats.html', // Posizione del report
    }),

    // Compressione Brotli per file statici (migliore di gzip)
    // Il server deve supportare brotli per servire questi file
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br', // Estensione file compressi
      threshold: 10240, // Comprimi solo file > 10kb
      deleteOriginFile: false, // Mantieni anche file originali
    }),

    // Opzionale: anche gzip per compatibilità con server più vecchi
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // PWA - genera service worker e manifest
    VitePWA({
      registerType: 'autoUpdate', // Aggiorna SW automaticamente
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My Vue App',
        short_name: 'VueApp',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Strategia di caching per diversi tipi di risorse
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst', // API: prova network prima, poi cache
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 ora
              },
            },
          },
        ],
      },
    }),

    // Ottimizzazione immagini: genera formati moderni (webp, avif)
    // Uso: import img from './image.jpg?w=400&format=webp'
    imagetools(),

    // Ispeziona trasformazioni Vite: vai a /__inspect/ in dev mode
    inspect(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Configurazione CSS
  css: {
    devSourcemap: true, // Sourcemap CSS in development
    preprocessorOptions: {
      scss: {
        // Variabili SCSS globali disponibili in tutti i componenti
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },

  // Ottimizzazione dipendenze
  optimizeDeps: {
    // Pre-bundle esplicito di librerie pesanti per dev server più veloce
    include: ['vue', 'vue-router', 'pinia'],
    // Escludi pacchetti che sono già ESM e non necessitano pre-bundling
    exclude: ['@vueuse/core'], // esempio: VueUse è già ESM
  },

  // Configurazione build per produzione
  build: {
    // Target browser moderni per bundle più piccoli
    // Rimuovi se devi supportare browser vecchi
    target: 'esnext',

    // Minificazione con esbuild (veloce) - alternative: 'terser' (più lento ma più compatto)
    minify: 'esbuild',

    // Non reportare dimensioni compresse in CI per velocizzare build
    reportCompressedSize: false,

    // Dimensione massima chunk prima di warning (500kb default)
    chunkSizeWarningLimit: 1000,

    // Split CSS per ogni route/chunk invece di un singolo file
    cssCodeSplit: true,

    // CSS minifier: lightningcss è più veloce di default
    cssMinify: 'lightningcss',

    // Sourcemap per produzione (rimuovi se non necessario)
    sourcemap: false, // 'hidden' per sourcemap senza reference nel file

    rollupOptions: {
      output: {
        // Code splitting manuale: separa vendor da codice app
        manualChunks: {
          // Vendor chunk per librerie che cambiano raramente (migliore caching)
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // Separa librerie UI pesanti
          // 'ui-library': ['element-plus'] // esempio
        },

        // Nomi file con hash per cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  // Configurazione server dev
  server: {
    port: 5173,
    strictPort: false, // Prova porte successive se occupata
    // Proxy API calls per evitare CORS in development
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Configurazione preview (serve del build locale)
  preview: {
    port: 4173,
    strictPort: true,
  },
})
