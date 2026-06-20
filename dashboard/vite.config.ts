import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// RuVigil nvsim dashboard - Vite + Lit + WASM in a Web Worker.
// Hosted at /RuVigil/nvsim/ on GitHub Pages; base path is configurable
// via NVSIM_BASE so local dev (npm run dev) stays at "/".
const base = (globalThis as { process?: { env?: { NVSIM_BASE?: string } } }).process?.env?.NVSIM_BASE ?? '/';

export default defineConfig({
  base,
  publicDir: 'public',
  worker: {
    format: 'es',
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'nvsim-pkg/nvsim.js',
        'nvsim-pkg/nvsim_bg.wasm',
      ],
      manifest: {
        name: 'RuVigil nvsim - NV-Diamond Magnetometer Simulator',
        short_name: 'nvsim',
        description: 'RuVigil deterministic forward simulator for NV-diamond magnetometry with WASM-backed CW-ODMR pipeline and witness-grade SHA-256 proofs.',
        theme_color: '#061014',
        background_color: '#061014',
        display: 'standalone',
        scope: base,
        start_url: base,
        icons: [
          {
            src: 'icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,wasm,woff,woff2}'],
        // WASM is large; bump the precache size budget so workbox doesn't
        // skip nvsim_bg.wasm.
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          lit: ['lit'],
          signals: ['@preact/signals-core'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    fs: {
      allow: ['..', '.'],
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});
