# hiremalek-astro

A rebuild of [hiremalek.com](https://www.hiremalek.com) in Astro, with the page's interactions moved from JavaScript into CSS and HTML.

- Scroll effects (hero zoom, manifesto, tree, reveals, stat count-up, reading line) use scroll-driven animations (`animation-timeline`) behind `@supports`; other browsers get a static page.
- Tabs and the slideshow are radio buttons with `:has()`; case studies and films are `<dialog>`s opened with invoker commands (`commandfor`); the phone menu is a `:target`.
- The tree SVG is generated at build time (`src/lib/tree.ts`).
- The only script, `src/scripts/video.ts`, stops YouTube players when they are hidden, autoplays films and pauses the hero video.

Content lives in `src/data/*.json`. Images and video are served from the original Webflow CDN.

```bash
npm install
npm run dev
```

Pushes to `main` deploy to GitHub Pages.
