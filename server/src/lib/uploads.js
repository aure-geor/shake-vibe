import multer from 'multer'
import sharp from 'sharp'
import path from 'node:path'
import crypto from 'node:crypto'
import { UPLOADS_DIR } from '../db/client.js'

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp'])

const storage = multer.memoryStorage()

export const uploadPhoto = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      cb(new Error('Format non supporté (JPEG, PNG ou WebP uniquement).'))
      return
    }
    cb(null, true)
  },
}).single('photo')

export async function saveResizedPhoto(buffer) {
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.webp`
  const filePath = path.join(UPLOADS_DIR, filename)
  await sharp(buffer)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(filePath)
  return filename
}
