import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const phase = ['3', '4'].includes(process.env.PREVIEW_PHASE) ? process.env.PREVIEW_PHASE : '2';
const root = fileURLToPath(new URL(phase === '4' ? '../dist/' : `../design/phase-${phase}/`, import.meta.url));
const port = Number(process.env.PORT ?? (phase === '4' ? 4175 : phase === '3' ? 4174 : 4173));
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('PORT must be between 1024 and 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.pdf': 'application/pdf', '.json': 'application/json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
const server = createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const routePath = phase === '4' && !extname(pathname) && !pathname.endsWith('/') ? `${pathname}/` : pathname;
    const file = resolve(root, `.${routePath.endsWith('/') ? `${routePath}index.html` : routePath}`);
    if (!file.startsWith(root.endsWith(sep) ? root : `${root}${sep}`)) { response.writeHead(403).end(); return; }
    let content = await readFile(file);
    if (phase === '4' && process.env.PREVIEW_CLEAN === '1' && extname(file) === '.html') {
      content = Buffer.from(content.toString('utf8').replace('<html lang="en">', '<html lang="en" class="clean-preview">'));
    }
    const headers = { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes' };
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]); const end = Math.min(range[2] ? Number(range[2]) : content.length - 1, content.length - 1);
      if (start > end || start >= content.length) { response.writeHead(416, { 'Content-Range': `bytes */${content.length}` }).end(); return; }
      response.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${content.length}`, 'Content-Length': end - start + 1 });
      response.end(request.method === 'HEAD' ? undefined : content.subarray(start, end + 1));
    } else {
      response.writeHead(200, { ...headers, 'Content-Length': content.length });
      response.end(request.method === 'HEAD' ? undefined : content);
    }
  } catch {
    if (phase === '4') {
      const content = await readFile(resolve(root, '404.html'));
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(request.method === 'HEAD' ? undefined : content);
      return;
    }
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Preview file not found.');
  }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`${process.env.PREVIEW_CLEAN === '1' ? 'Clean' : 'Design'} preview: http://127.0.0.1:${port}`));
