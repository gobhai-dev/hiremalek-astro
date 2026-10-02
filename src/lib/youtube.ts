// The thumbnail page a YouTube tile shows until it is clicked (see YouTube.astro)
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export const player = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
export const thumbDoc = (id: string, title: string, tag?: string) => `<!doctype html><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap"><style>
html,body{margin:0;height:100%;overflow:hidden;background:transparent}
a{position:absolute;inset:0;display:block;cursor:pointer}
img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:72px;height:72px;border-radius:50%;background:rgba(250,248,243,.92);display:flex;align-items:center;justify-content:center;font:22px system-ui,sans-serif;color:#1d1d1f;transition:transform .3s}
a:hover .play{transform:translate(-50%,-50%) scale(1.06)}
.tag{position:absolute;left:16px;bottom:16px;background:rgba(250,248,243,.88);color:#1d1d1f;padding:7px 12px;border-radius:999px;font:500 12px/20px "Fira Code",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}
@media (max-width:200px){.play{width:44px;height:44px;font-size:15px}}
</style><a href="${player(id)}" aria-label="Play ${esc(title)}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt=""><span class="play">▶</span>${tag ? `<span class="tag">${esc(tag)}</span>` : ''}</a>`;
