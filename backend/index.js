import http from 'http';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { URL } from 'url';

const ALGORITHM = 'aes-256-cbc';
const KEY = randomBytes(32); // demo only
const IV = randomBytes(16);

function encrypt(buffer) {
  const cipher = createCipheriv(ALGORITHM, KEY, IV);
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

function decrypt(buffer) {
  const decipher = createDecipheriv(ALGORITHM, KEY, IV);
  return Buffer.concat([decipher.update(buffer), decipher.final()]);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && (url.pathname === '/encrypt' || url.pathname === '/decrypt')) {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const data = Buffer.concat(chunks);
      const result = url.pathname === '/encrypt' ? encrypt(data) : decrypt(data);
      const name = url.searchParams.get('filename') || 'file';
      const out = url.pathname === '/encrypt' ? name + '.enc' : name.replace(/\.enc$/, '') + '.dec';
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${out}"`
      });
      res.end(result);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
