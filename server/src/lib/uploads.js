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
  try {
    await sharp(buffer)
      .rotate()
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(filePath)
  } catch (e) {
    if (/heif|security limit/i.test(e.message)) {
      throw new Error(
        "Cette photo est dans un format HEIC/HEIF que le serveur ne peut pas traiter automatiquement (limite de sécurité de la bibliothèque de décodage). Exportez-la en JPEG depuis votre téléphone (sur iPhone : lors du partage, Options > Format > « Le plus compatible ») puis réessayez."
      )
    }
    throw e
  }
  return filename
}
