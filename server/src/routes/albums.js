import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs/promises'
import { eq, desc } from 'drizzle-orm'
import { db, UPLOADS_DIR } from '../db/client.js'
import { albums, albumPhotos } from '../db/schema.js'
import { requireAdmin } from '../lib/auth.js'
import { uploadPhoto, saveResizedPhoto } from '../lib/uploads.js'
import { albumInputSchema } from '../lib/validation.js'

export const albumsRouter = Router()

function serializeAlbum(album, photos) {
  const sorted = photos.slice().sort((a, b) => a.id - b.id)
  return {
    id: album.id,
    titre: album.titre,
    lieu: album.lieu,
    tag: album.tag,
    description: album.description,
    published: album.published,
    image: sorted[0] ? `/uploads/${sorted[0].filename}` : null,
    photos: sorted.map((p) => `/uploads/${p.filename}`),
    photoDetails: sorted.map((p) => ({ id: p.id, url: `/uploads/${p.filename}`, alt: p.alt })),
  }
}

function loadAlbumWithPhotos(album) {
  const photoRows = db.select().from(albumPhotos).where(eq(albumPhotos.albumId, album.id)).all()
  return serializeAlbum(album, photoRows)
}

albumsRouter.get('/', (_req, res) => {
  const rows = db.select().from(albums).where(eq(albums.published, true)).orderBy(desc(albums.createdAt)).all()
  const result = rows.map(loadAlbumWithPhotos).filter((a) => a.photos.length > 0)
  res.json(result)
})

albumsRouter.get('/admin/all', requireAdmin, (_req, res) => {
  const rows = db.select().from(albums).orderBy(desc(albums.createdAt)).all()
  res.json(rows.map(loadAlbumWithPhotos))
})

albumsRouter.post('/', requireAdmin, (req, res) => {
  const parsed = albumInputSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Album invalide.', issues: parsed.error.issues })

  const now = new Date()
  const data = parsed.data
  const row = db
    .insert(albums)
    .values({
      titre: data.titre,
      lieu: data.lieu,
      tag: data.tag,
      description: data.description || '',
      published: !!data.published,
      createdAt: now,
      updatedAt: now,
    })
    .run()

  res.status(201).json({ id: row.lastInsertRowid })
})

albumsRouter.put('/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id)
  const parsed = albumInputSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Album invalide.', issues: parsed.error.issues })

  const existing = db.select().from(albums).where(eq(albums.id, id)).get()
  if (!existing) return res.status(404).json({ error: 'Album introuvable.' })

  db.update(albums)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(albums.id, id))
    .run()

  res.json({ ok: true })
})

albumsRouter.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const existing = db.select().from(albums).where(eq(albums.id, id)).get()
  if (!existing) return res.status(404).json({ error: 'Album introuvable.' })

  const photoRows = db.select().from(albumPhotos).where(eq(albumPhotos.albumId, id)).all()
  db.delete(albums).where(eq(albums.id, id)).run()

  await Promise.all(
    photoRows.map((p) =>
      fs.unlink(path.join(UPLOADS_DIR, p.filename)).catch(() => {
        console.warn(`[albums] fichier déjà absent du disque : ${p.filename}`)
      })
    )
  )

  res.json({ ok: true })
})

albumsRouter.post('/:id/photos', requireAdmin, (req, res) => {
  const albumId = Number(req.params.id)
  const existing = db.select().from(albums).where(eq(albums.id, albumId)).get()
  if (!existing) return res.status(404).json({ error: 'Album introuvable.' })

  uploadPhoto(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu.' })

    try {
      const filename = await saveResizedPhoto(req.file.buffer)
      const row = db
        .insert(albumPhotos)
        .values({
          albumId,
          filename,
          alt: req.body.alt || `${existing.titre} — ${existing.lieu}`,
          createdAt: new Date(),
        })
        .run()
      res.status(201).json({ id: row.lastInsertRowid, filename })
    } catch (e) {
      console.error('[albums] traitement image échoué :', e.message)
      res.status(500).json({ error: "Le traitement de l'image a échoué." })
    }
  })
})

albumsRouter.delete('/:id/photos/:photoId', requireAdmin, async (req, res) => {
  const photoId = Number(req.params.photoId)
  const photo = db.select().from(albumPhotos).where(eq(albumPhotos.id, photoId)).get()
  if (!photo) return res.status(404).json({ error: 'Photo introuvable.' })

  db.delete(albumPhotos).where(eq(albumPhotos.id, photoId)).run()
  try {
    await fs.unlink(path.join(UPLOADS_DIR, photo.filename))
  } catch {
    console.warn(`[albums] fichier déjà absent du disque : ${photo.filename}`)
  }
  res.json({ ok: true })
})
