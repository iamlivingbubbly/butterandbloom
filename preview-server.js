const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const ROOT = __dirname;
const PORT = 8317;
const BUILDERS = { 'build_shop.js': 'build_shop.js', 'build_site.js': 'build_site.js' };
const clients = new Set();

function broadcast(data) {
  const msg = 'data: ' + JSON.stringify(data) + '\n\n';
  for (const res of clients) {
    try { res.write(msg); } catch (_) {}
  }
}

function rebuild(file) {
  const script = BUILDERS[path.basename(file)];
  if (!script) return;
  execFile('node', [script], { cwd: ROOT, timeout: 60000 }, (err, stdout, stderr) => {
    const status = err ? 'error' : 'ok';
    const msg = (err ? stderr : stdout || 'ok').toString().trim();
    console.log('[rebuild ' + script + '] ' + status);
    broadcast({ type: 'reload', file: script, status: status, msg: msg });
  });
}

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:' + PORT);

  if (url.pathname === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('retry: 1000\n\ndata: {"type":"connected"}\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/shop.html';
  if (p === '/ops') p = '/site.html';
  if (p === '/costing') p = '/costing.html';

  const file = path.resolve(ROOT, '.' + p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end('Not found'); return;
  }

  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });

  if (type === 'text/html') {
    let html = fs.readFileSync(file, 'utf8');
    const hook =
      '<style>.bbreload{position:fixed;right:14px;bottom:14px;z-index:99999;font:600 11px/1 sans-serif;' +
      'background:#2f5d4e;color:#fff;padding:6px 10px;border-radius:20px;opacity:.9;pointer-events:none}' +
      '.bbreload.err{background:#9a3324}</style>' +
      '<div class="bbreload" id="bbreload">LIVE · auto-reload on</div>' +
      '<script>var es=new EventSource("/__reload"),el=document.getElementById("bbreload");' +
      'es.onmessage=function(e){var d=JSON.parse(e.data);if(d.type==="connected"){el.textContent="LIVE · preview server";}' +
      'if(d.type==="reload"){el.textContent="Rebuilding "+d.file+"...";el.className="bbreload"+(d.status==="error"?" err":"");' +
      'setTimeout(function(){location.reload();},d.status==="error"?2500:400);}};</script>';
    html = html.replace('</body>', hook + '</body>');
    res.end(html);
    return;
  }

  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, function () {
  console.log('Butter & Bloom preview -> http://localhost:' + PORT + '  (root = shop site, /ops = ops app)');
});

for (const f of Object.keys(BUILDERS)) {
  const fp = path.join(ROOT, f);
  if (fs.existsSync(fp)) fs.watch(fp, () => rebuild(fp));
}

process.on('SIGINT', () => process.exit(0));