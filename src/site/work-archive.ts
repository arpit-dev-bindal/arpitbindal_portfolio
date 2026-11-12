function revealEntry(focus: boolean) {
 let id: string;
 try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
 const entry = document.getElementById(id);
 if (!(entry instanceof HTMLDetailsElement) || !entry.hasAttribute('data-archive-entry')) return;
 entry.open = true;
 // Opening an earlier entry changes the document height before the target.
 entry.scrollIntoView({ behavior: 'instant', block: 'start' });
 if (focus) entry.querySelector<HTMLElement>('summary')?.focus({ preventScroll: true });
}
window.addEventListener('hashchange', () => revealEntry(true));
window.addEventListener('pageshow', () => revealEntry(false));
document.querySelectorAll<HTMLAnchorElement>('.archive-index a, .archive-actions a').forEach(link => {
 link.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.hash && link.hash === location.hash) { event.preventDefault(); revealEntry(true); }
 });
});
revealEntry(false);
document.fonts.ready.then(() => { if (location.hash) revealEntry(false); });

export {};
