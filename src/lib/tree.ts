// The "How I work" tree, drawn once at build time. The original page generated this
// same SVG in the browser on every visit from a fixed seed (7), so the output never
// changed; computing it here ships the finished markup and no script.

function rng(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Seg = [depth: number, d: string, width: number];
type Tip = [x: number, y: number, angle: number];

export function treeSvg(): string {
  const R = rng(7);
  const u = (a: number, b: number) => a + R() * (b - a);
  const GX = 300, GY = 410;
  const br: Seg[] = [], rt: Seg[] = [], tips: Tip[] = [];

  function grow(x: number, y: number, ang: number, len: number, d: number, maxd: number, w: number, out: Seg[], kind: 'b' | 'r') {
    const r = (ang * Math.PI) / 180;
    const x2 = x + Math.cos(r) * len, y2 = y + Math.sin(r) * len;
    const b = u(-0.12, 0.12) * len;
    const mx = (x + x2) / 2 + Math.cos(r + Math.PI / 2) * b;
    const my = (y + y2) / 2 + Math.sin(r + Math.PI / 2) * b;
    out.push([d, `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`, w]);
    if (d == maxd) {
      if (kind == 'b') tips.push([x2, y2, ang]);
      return;
    }
    let kids: [number, number][];
    if (kind == 'b') {
      const sp = u(20, 28) + d * 1.5;
      kids = [[-sp, 0.76], [sp, 0.76]];
      if (d == 1 || d == 2) kids.push([u(-6, 6), 0.62]);
    } else {
      const sp2 = u(24, 34);
      kids = [[-sp2, 0.66], [sp2, 0.66]];
    }
    kids.forEach((k) => grow(x2, y2, ang + k[0] + u(-4, 4), len * k[1] * u(0.92, 1.05), d + 1, maxd, Math.max(0.9, w * 0.66), out, kind));
  }
  grow(GX, GY, -90, 96, 0, 6, 9, br, 'b');
  grow(GX, GY + 2, 90, 58, 0, 4, 3, rt, 'r');
  grow(GX, GY + 2, 150, 62, 1, 4, 2.4, rt, 'r');
  grow(GX, GY + 2, 30, 62, 1, 4, 2.4, rt, 'r');

  let s = '<svg class="tree" viewBox="0 0 600 640" role="img" aria-label="A tree growing from seed to fruit"><defs><radialGradient id="cg"><stop offset="0" stop-color="#E0A45A" stop-opacity=".22"/><stop offset=".6" stop-color="#E0A45A" stop-opacity=".06"/><stop offset="1" stop-color="#E0A45A" stop-opacity="0"/></radialGradient><radialGradient id="sg"><stop offset="0" stop-color="#F2C27E" stop-opacity=".7"/><stop offset="1" stop-color="#F2C27E" stop-opacity="0"/></radialGradient><linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#C9B8A0" stop-opacity="0"/><stop offset=".5" stop-color="#C9B8A0" stop-opacity=".55"/><stop offset="1" stop-color="#C9B8A0" stop-opacity="0"/></linearGradient><filter id="sf" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter></defs>';
  s += '<circle class="glowc" cx="300" cy="200" r="250" fill="url(#cg)"/><line x1="60" y1="410" x2="540" y2="410" stroke="url(#gl)"/>';
  const lines = (arr: Seg[], cls: string, col: string) =>
    `<g class="${cls}" stroke="${col}" fill="none" stroke-linecap="round">` +
    arr.map((p) => `<path class="ln" style="--k:${p[0]}" pathLength="1000" d="${p[1]}" stroke-width="${p[2].toFixed(2)}"/>`).join('') +
    '</g>';
  s += lines(rt, 'roots', '#9C8A72') + lines(br, 'branches', '#E6DAC6') + '<g>';

  const cols = ['#7FA383', '#93B593', '#6E9474', '#A7C4A0'];
  for (let i = tips.length - 1; i > 0; i--) {
    const j = Math.floor(R() * (i + 1));
    [tips[i], tips[j]] = [tips[j], tips[i]];
  }
  tips.forEach((t, i) => {
    [-38, 38, 0].forEach((off, j) => {
      if (j == 2 && i % 2) return;
      const la = t[2] + off + u(-10, 10), L = u(13, 19), d = u(0, 0.75).toFixed(2);
      s += `<g transform="translate(${t[0].toFixed(1)} ${t[1].toFixed(1)}) rotate(${la.toFixed(1)})"><path class="leaf" style="--d:${d}" d="M0 0 C${(L * 0.35).toFixed(1)} ${(-L * 0.32).toFixed(1)},${(L * 0.75).toFixed(1)} ${(-L * 0.28).toFixed(1)},${L.toFixed(1)} 0 C${(L * 0.75).toFixed(1)} ${(L * 0.28).toFixed(1)},${(L * 0.35).toFixed(1)} ${(L * 0.32).toFixed(1)},0 0Z" fill="${cols[(i + j) % 4]}" opacity=".92"/></g>`;
    });
  });

  s += '</g><g>';
  const step = Math.max(1, Math.floor(tips.length / 15));
  for (let k = 0, n = 0; k < tips.length && n < 15; k += step, n++) {
    const t = tips[k], r = u(5, 7), d = ((n / 15) * 0.7).toFixed(2), cy = t[1] + 7;
    s += `<g class="fr" style="--d:${d}"><circle cx="${t[0].toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 2.2).toFixed(1)}" fill="#E0A45A" opacity=".35" filter="url(#sf)"/><circle cx="${t[0].toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="#E8A95C"/><circle cx="${(t[0] - r * 0.35).toFixed(1)}" cy="${(cy - r * 0.35).toFixed(1)}" r="${(r * 0.3).toFixed(1)}" fill="#FBE2B8"/></g>`;
  }
  s += '</g><g class="seed"><circle cx="300" cy="410" r="26" fill="url(#sg)"/><path d="M291 410 C294 401,306 401,309 410 C306 418,294 418,291 410Z" fill="#D9A566"/></g></svg>';
  return s;
}
