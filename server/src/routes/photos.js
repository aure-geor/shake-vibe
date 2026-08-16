import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { eq, asc } from 'drizzle-orm'
import { db, UPLOADS_DIR } from '../db/client.js'
import { photos } from '../db/schema.js'
import { requireAdmin } from '../lib/auth.js'
import { uploadPhoto, saveResizedPhoto } from '../lib/uploads.js'

export const photosRouter = Router()

photosRouter.get('/', (_req, res) => {
  const rows = db.select().from(photos).orderBy(asc(photos.sortOrder), asc(photos.id)).all()
  res.json(rows)
})

photosRouter.post('/', requireAdmin, (req, res) => {
  uploadPhoto(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu.' })

    try {
      const filename = await saveResizedPhoto(req.file.buffer)
      const row = db
        .insert(photos)
        .values({
          filename,
          prestation: req.body.prestation || null,
          alt: req.body.alt || '',
          sortOrder: Number(req.body.sortOrder) || 0,
          createdAt: new Date(),
        })
        .run()
      res.status(201).json({ id: row.lastInsertRowid, filename })
    } catch (e) {
      console.error('[photos] traitement image échoué :', e.message)
      res.status(500).json({ error: "Le traitement de l'image a échoué." })
    }
  })
})

photosRouter.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const row = db.select().from(photos).where(eq(photos.id, id)).get()
  if (!row) return res.status(404).json({ error: 'Photo introuvable.' })

  db.delete(photos).where(eq(photos.id, id)).run()
  try {
    await fs.unlink(path.join(UPLOADS_DIR, row.filename))
  } catch {
    console.warn(`[photos] fichier déjà absent du disque : ${row.filename}`)
  }
  res.json({ ok: true })
})
