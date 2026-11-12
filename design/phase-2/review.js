const frame = document.querySelector('iframe');
const shell = document.querySelector('.frame-shell');
const stage = document.querySelector('.stage');
const labels = { home: 'Home', backupdata: 'BackupData', 'ai-systems': 'AI Systems' };
let width = innerWidth < 768 ? 390 : 1440;
let page = 'home';
const resize = () => {
  const padding = parseFloat(getComputedStyle(stage).paddingLeft) * 2;
  const scale = Math.min(1, (stage.clientWidth - padding) / width);
  const height = width === 390 ? 844 : 960;
  frame.style.width = `${width}px`;
  frame.style.height = `${height}px`;
  frame.style.transform = `scale(${scale})`;
  shell.style.width = `${width * scale}px`;
  shell.style.height = `${height * scale}px`;
  document.querySelector('#frame-label').textContent = `${labels[page]} · ${width} × ${height}`;
  document.querySelectorAll('[data-size]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.size) === width)));
};
document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => {
  page = button.dataset.page;
  frame.src = `frames/${page}.html`;
  frame.title = `${labels[page]} design frame`;
  document.querySelector('#open-frame').href = frame.src;
  document.querySelectorAll('[data-page]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  resize();
}));
document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => { width = Number(button.dataset.size); resize(); }));
// Keep the page controls accurate after navigation inside the frame.
frame.addEventListener('load', () => {
  const name = frame.contentWindow.location.pathname.split('/').pop().replace('.html', '');
  if (!labels[name]) return;
  page = name;
  frame.title = `${labels[page]} design frame`;
  document.querySelector('#open-frame').href = `frames/${page}.html`;
  document.querySelectorAll('[data-page]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.page === page)));
  resize();
});
new ResizeObserver(resize).observe(stage);
resize();
