import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { adminUsers } from '../db/schema.js'

const COOKIE_NAME = 'sv_session'
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000 // 12h

export async function verifyAdminCredentials(email, password) {
  const user = db.select().from(adminUsers).where(eq(adminUsers.email, email)).get()
  if (!user) return null
  const valid = await bcrypt.compare(password, user.passwordHash)
  return valid ? user : null
}

export function createSessionCookie(res, adminId) {
  res.cookie(COOKIE_NAME, `${adminId}.${Date.now()}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    signed: true,
    maxAge: SESSION_MAX_AGE_MS,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME)
}

export function requireAdmin(req, res, next) {
  const raw = req.signedCookies?.[COOKIE_NAME]
  if (!raw) return res.status(401).json({ error: 'Non authentifié.' })

  const [adminIdStr, issuedAtStr] = String(raw).split('.')
  const adminId = Number(adminIdStr)
  const issuedAt = Number(issuedAtStr)
  if (!adminId || !issuedAt) return res.status(401).json({ error: 'Non authentifié.' })

  const user = db.select().from(adminUsers).where(eq(adminUsers.id, adminId)).get()
  if (!user) return res.status(401).json({ error: 'Non authentifié.' })

  // Une session ouverte avant le dernier changement de mot de passe n'est plus valide.
  if (user.passwordChangedAt && issuedAt < user.passwordChangedAt.getTime()) {
    return res.status(401).json({ error: 'Session expirée, merci de vous reconnecter.' })
  }

  req.admin = user
  next()
}

export async function updateAdminPassword(adminId, newPassword) {
  const passwordHash = await bcrypt.hash(newPassword, 12)
  db.update(adminUsers)
    .set({ passwordHash, passwordChangedAt: new Date() })
    .where(eq(adminUsers.id, adminId))
    .run()
}
