import { defineConfig } from 'astro/config';

export default defineConfig({
  // Served from GitHub Pages as a project site
  site: 'https://gobhai-dev.github.io',
  base: '/hiremalek-astro',
  server: { port: 4323 },
  vite: {
    // lightningcss (Vite's default CSS minifier) folds animation-timeline into the animation shorthand, which browsers
    // reject, silently dropping every scroll-driven animation. esbuild keeps the longhands as written.
    build: { cssMinify: 'esbuild' },
  },
});
