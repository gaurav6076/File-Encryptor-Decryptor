import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import fs from 'fs';

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const ALGORITHM = 'aes-256-cbc';
const KEY = randomBytes(32); // For demo only. Use persistent key in production
const IV = randomBytes(16);

function encrypt(buffer) {
  const cipher = createCipheriv(ALGORITHM, KEY, IV);
  return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

function decrypt(buffer) {
  const decipher = createDecipheriv(ALGORITHM, KEY, IV);
  return Buffer.concat([decipher.update(buffer), decipher.final()]);
}

app.post('/encrypt', upload.single('file'), (req, res) => {
  const data = fs.readFileSync(req.file.path);
  const encrypted = encrypt(data);
  fs.unlinkSync(req.file.path);
  res.setHeader('Content-Disposition', `attachment; filename="${req.file.originalname}.enc"`);
  res.end(encrypted);
});

app.post('/decrypt', upload.single('file'), (req, res) => {
  const data = fs.readFileSync(req.file.path);
  const decrypted = decrypt(data);
  fs.unlinkSync(req.file.path);
  res.setHeader('Content-Disposition', `attachment; filename="${req.file.originalname.replace(/\\.enc$/, '')}.dec"`);
  res.end(decrypted);
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
