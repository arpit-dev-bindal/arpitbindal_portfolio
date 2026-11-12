import { turbyAssets } from './studies/turby-assets.ts';
const dialog = document.querySelector<HTMLDialogElement>('.turby-dialog')!;
const image = dialog.querySelector<HTMLImageElement>('img')!;
const title = dialog.querySelector<HTMLElement>('#turby-view-title')!;
const position = dialog.querySelector<HTMLElement>('[data-gallery-position]')!;
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-turby-index]')];
let selected = 0;
let opener: HTMLAnchorElement | null = null;
let previousOverflow = '';
function show(index: number) {
 selected = (index + turbyAssets.length) % turbyAssets.length;
 const asset = turbyAssets[selected]!;
 image.src = `/turby/${asset.file}`;
 image.alt = asset.alt;
 title.textContent = asset.name;
 position.textContent = `${selected + 1} of ${turbyAssets.length}`;
}
links.forEach((link, index) => link.addEventListener('click', event => {
 if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
 event.preventDefault(); opener = link; show(index);
 previousOverflow = document.body.style.overflow;
 dialog.showModal(); document.body.style.overflow = 'hidden';
 dialog.querySelector<HTMLButtonElement>('[data-gallery-close]')!.focus();
}));
dialog.querySelector('[data-gallery-close]')!.addEventListener('click', () => dialog.close());
dialog.querySelector('[data-gallery-previous]')!.addEventListener('click', () => show(selected - 1));
dialog.querySelector('[data-gallery-next]')!.addEventListener('click', () => show(selected + 1));
dialog.addEventListener('keydown', event => {
 if (event.key === 'Tab') {
  const buttons = [...dialog.querySelectorAll<HTMLButtonElement>('button')];
  const first = buttons[0]!; const last = buttons[buttons.length - 1]!;
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
 }

 if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(selected + (event.key === 'ArrowRight' ? 1 : -1)); }
});
dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; opener?.focus({ preventScroll: true }); });
dialog.dataset.ready = 'true';
