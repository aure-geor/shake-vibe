import { Router } from 'express'
import { db } from '../db/client.js'
import { adminUsers } from '../db/schema.js'
import { adminLoginSchema, passwordResetConfirmSchema } from '../lib/validation.js'
import {
  verifyAdminCredentials,
  createSessionCookie,
  clearSessionCookie,
  requireAdmin,
  updateAdminPassword,
} from '../lib/auth.js'
import { createResetCode, consumeResetCode } from '../lib/passwordReset.js'
import { sendPasswordResetCode } from '../lib/mailer.js'
import { loginLimiter, passwordResetLimiter } from '../middleware/rateLimit.js'

export const adminRouter = Router()

adminRouter.post('/login', loginLimiter, async (req, res) => {
  const parsed = adminLoginSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Identifiants invalides.' })

  const user = await verifyAdminCredentials(parsed.data.email, parsed.data.password)
  if (!user) return res.status(401).json({ error: 'Identifiants invalides.' })

  createSessionCookie(res, user.id)
  res.json({ ok: true, email: user.email })
})

adminRouter.post('/logout', requireAdmin, (req, res) => {
  clearSessionCookie(res)
  res.json({ ok: true })
})

adminRouter.get('/me', requireAdmin, (req, res) => {
  res.json({ email: req.admin.email })
})

// Réinitialisation du mot de passe — pas d'authentification requise (couvre aussi le mot de passe
// oublié), mais protégée par un code à usage unique envoyé sur l'adresse de récupération.
adminRouter.post('/password-reset/request', passwordResetLimiter, async (_req, res) => {
  // Site mono-admin : on cible toujours le seul compte existant, pas de champ email en entrée
  // (évite en plus toute énumération de compte).
  const admin = db.select().from(adminUsers).get()
  if (!admin?.recoveryEmail) {
    console.warn('[admin] Demande de réinitialisation reçue mais aucune adresse de récupération configurée.')
    return res.json({ ok: true })
  }

  const code = createResetCode(admin.id)
  try {
    await sendPasswordResetCode(admin.recoveryEmail, code)
  } catch (err) {
    console.error('[admin] envoi du code de réinitialisation échoué :', err.message)
  }

  // Réponse identique que l'envoi ait réussi ou non, pour ne rien révéler côté client.
  res.json({ ok: true })
})

adminRouter.post('/password-reset/confirm', passwordResetLimiter, async (req, res) => {
  const parsed = passwordResetConfirmSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Code ou mot de passe invalide.', issues: parsed.error.issues })
  }

  const admin = db.select().from(adminUsers).get()
  if (!admin) return res.status(400).json({ error: 'Code invalide ou expiré.' })

  const valid = consumeResetCode(admin.id, parsed.data.code)
  if (!valid) return res.status(400).json({ error: 'Code invalide ou expiré.' })

  await updateAdminPassword(admin.id, parsed.data.newPassword)
  res.json({ ok: true })
})
