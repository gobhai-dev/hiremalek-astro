// The page's only script: video playback that CSS can't control.
// - Stop a film or tile when its dialog closes, or when the In motion slide changes, by swapping each iframe for a fresh
//   copy of itself (back to its thumbnail page).
// - Start a film as soon as its poster opens the dialog, instead of needing a second click on the thumbnail.
// - Pause and resume the looping hero film.
const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
const reset = (scope: ParentNode) => {
  scope.querySelectorAll('iframe.yt-live').forEach((f) => f.remove());
  scope.querySelectorAll('iframe.yt-frame').forEach((f) => f.replaceWith(f.cloneNode()));
};

document.querySelectorAll('dialog').forEach((d) => d.addEventListener('close', () => reset(d)));
document.querySelectorAll('input[name="slide"]').forEach((r) => r.addEventListener('change', () => reset(document.querySelector('.screen')!)));

document.querySelectorAll<HTMLElement>('[data-autoplay]').forEach((b) =>
  b.addEventListener('click', () => {
    const box = document.getElementById(b.getAttribute('commandfor')!)?.querySelector('.player');
    if (!box) return;
    const f = Object.assign(document.createElement('iframe'), { className: 'yt-frame yt-live', title: b.textContent!.trim(), src: embed(b.dataset.autoplay!) });
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    box.append(f);
  }),
);

const film = document.querySelector<HTMLVideoElement>('.hero-video');
const pause = document.querySelector<HTMLButtonElement>('.hero-pause');
if (film && pause && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  pause.hidden = false;
  pause.addEventListener('click', () => {
    film.paused ? film.play() : film.pause();
    pause.setAttribute('aria-pressed', String(film.paused));
    pause.textContent = film.paused ? 'Play film' : 'Pause film';
  });
}
