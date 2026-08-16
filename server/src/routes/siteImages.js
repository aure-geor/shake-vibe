import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { eq } from 'drizzle-orm'
import { db, UPLOADS_DIR } from '../db/client.js'
import { siteImages } from '../db/schema.js'
import { requireAdmin } from '../lib/auth.js'
import { uploadPhoto, saveResizedPhoto } from '../lib/uploads.js'
import { SITE_IMAGE_SLOTS, SITE_IMAGE_SLOT_KEYS } from '../lib/siteImageSlots.js'

export const siteImagesRouter = Router()

function rowsByKey() {
  const rows = db.select().from(siteImages).all()
  return new Map(rows.map((r) => [r.key, r]))
}

siteImagesRouter.get('/', (_req, res) => {
  const byKey = rowsByKey()
  const result = {}
  for (const slot of SITE_IMAGE_SLOTS) {
    const row = byKey.get(slot.key)
    if (row?.filename) {
      result[slot.key] = { url: `/uploads/${row.filename}`, alt: row.alt }
    }
  }
  res.json(result)
})

siteImagesRouter.get('/admin/all', requireAdmin, (_req, res) => {
  const byKey = rowsByKey()
  const result = SITE_IMAGE_SLOTS.map((slot) => {
    const row = byKey.get(slot.key)
    return {
      ...slot,
      url: row?.filename ? `/uploads/${row.filename}` : null,
      alt: row?.alt || '',
    }
  })
  res.json(result)
})

siteImagesRouter.post('/:key', requireAdmin, (req, res) => {
  const { key } = req.params
  if (!SITE_IMAGE_SLOT_KEYS.has(key)) {
    return res.status(404).json({ error: 'Emplacement inconnu.' })
  }

  uploadPhoto(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu.' })

    try {
      const filename = await saveResizedPhoto(req.file.buffer)
      const existing = db.select().from(siteImages).where(eq(siteImages.key, key)).get()

      if (existing?.filename) {
        await fs.unlink(path.join(UPLOADS_DIR, existing.filename)).catch(() => {
          console.warn(`[site-images] fichier déjà absent du disque : ${existing.filename}`)
        })
      }

      const alt = req.body.alt || ''
      if (existing) {
        db.update(siteImages)
          .set({ filename, alt, updatedAt: new Date() })
          .where(eq(siteImages.key, key))
          .run()
      } else {
        db.insert(siteImages).values({ key, filename, alt, updatedAt: new Date() }).run()
      }

      res.status(201).json({ url: `/uploads/${filename}`, alt })
    } catch (e) {
      console.error('[site-images] traitement image échoué :', e.message)
      res.status(500).json({ error: "Le traitement de l'image a échoué." })
    }
  })
})

siteImagesRouter.delete('/:key', requireAdmin, async (req, res) => {
  const { key } = req.params
  if (!SITE_IMAGE_SLOT_KEYS.has(key)) {
    return res.status(404).json({ error: 'Emplacement inconnu.' })
  }

  const existing = db.select().from(siteImages).where(eq(siteImages.key, key)).get()
  if (!existing?.filename) return res.json({ ok: true })

  await fs.unlink(path.join(UPLOADS_DIR, existing.filename)).catch(() => {
    console.warn(`[site-images] fichier déjà absent du disque : ${existing.filename}`)
  })
  db.update(siteImages)
    .set({ filename: null, alt: '', updatedAt: new Date() })
    .where(eq(siteImages.key, key))
    .run()

  res.json({ ok: true })
})
