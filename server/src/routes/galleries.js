import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { eq, asc, max } from 'drizzle-orm'
import { db, UPLOADS_DIR } from '../db/client.js'
import { galleryPhotos } from '../db/schema.js'
import { requireAdmin } from '../lib/auth.js'
import { uploadPhoto, saveResizedPhoto } from '../lib/uploads.js'
import { GALLERY_SECTIONS, GALLERY_SECTION_KEYS } from '../lib/gallerySections.js'

export const galleriesRouter = Router()

function serialize(row) {
  return { id: row.id, url: `/uploads/${row.filename}`, alt: row.alt }
}

galleriesRouter.get('/admin/all', requireAdmin, (_req, res) => {
  const result = GALLERY_SECTIONS.map((section) => {
    const rows = db
      .select()
      .from(galleryPhotos)
      .where(eq(galleryPhotos.section, section.key))
      .orderBy(asc(galleryPhotos.sortOrder))
      .all()
    return { ...section, photos: rows.map(serialize) }
  })
  res.json(result)
})

galleriesRouter.get('/:section', (req, res) => {
  const { section } = req.params
  if (!GALLERY_SECTION_KEYS.has(section)) {
    return res.status(404).json({ error: 'Section inconnue.' })
  }
  const rows = db
    .select()
    .from(galleryPhotos)
    .where(eq(galleryPhotos.section, section))
    .orderBy(asc(galleryPhotos.sortOrder))
    .all()
  res.json(rows.map(serialize))
})

galleriesRouter.post('/:section', requireAdmin, (req, res) => {
  const { section } = req.params
  if (!GALLERY_SECTION_KEYS.has(section)) {
    return res.status(404).json({ error: 'Section inconnue.' })
  }

  uploadPhoto(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu.' })

    try {
      const filename = await saveResizedPhoto(req.file.buffer)
      const [{ value: maxOrder }] = db
        .select({ value: max(galleryPhotos.sortOrder) })
        .from(galleryPhotos)
        .where(eq(galleryPhotos.section, section))
        .all()

      const row = db
        .insert(galleryPhotos)
        .values({
          section,
          filename,
          alt: req.body.alt || '',
          sortOrder: (maxOrder ?? -1) + 1,
          createdAt: new Date(),
        })
        .run()

      res.status(201).json({ id: row.lastInsertRowid, url: `/uploads/${filename}` })
    } catch (e) {
      console.error('[galleries] traitement image échoué :', e.message)
      res.status(500).json({ error: "Le traitement de l'image a échoué." })
    }
  })
})

galleriesRouter.delete('/photos/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const photo = db.select().from(galleryPhotos).where(eq(galleryPhotos.id, id)).get()
  if (!photo) return res.status(404).json({ error: 'Photo introuvable.' })

  db.delete(galleryPhotos).where(eq(galleryPhotos.id, id)).run()
  try {
    await fs.unlink(path.join(UPLOADS_DIR, photo.filename))
  } catch {
    console.warn(`[galleries] fichier déjà absent du disque : ${photo.filename}`)
  }
  res.json({ ok: true })
})
