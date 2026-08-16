import { Router } from 'express'
import { db } from '../db/client.js'
import { siteContent } from '../db/schema.js'
import { requireAdmin } from '../lib/auth.js'

export const contentRouter = Router()

contentRouter.get('/', (_req, res) => {
  const rows = db.select().from(siteContent).all()
  res.json(Object.fromEntries(rows.map((row) => [row.key, row.value])))
})

contentRouter.put('/', requireAdmin, (req, res) => {
  const updates = req.body?.updates
  if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
    return res.status(400).json({ error: 'Corps invalide.' })
  }

  const entries = Object.entries(updates)
  if (entries.some(([key, value]) => typeof key !== 'string' || typeof value !== 'string')) {
    return res.status(400).json({ error: 'Chaque valeur doit être une chaîne de caractères.' })
  }

  const now = new Date()
  for (const [key, value] of entries) {
    db.insert(siteContent)
      .values({ key, value, updatedAt: now })
      .onConflictDoUpdate({ target: siteContent.key, set: { value, updatedAt: now } })
      .run()
  }

  res.json({ ok: true })
})
