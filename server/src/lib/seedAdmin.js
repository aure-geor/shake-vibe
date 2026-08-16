import bcrypt from 'bcryptjs'
import { db } from '../db/client.js'
import { adminUsers } from '../db/schema.js'

export async function seedAdminIfNeeded() {
  const existing = db.select().from(adminUsers).all()
  if (existing.length > 0) return

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_INITIAL_PASSWORD
  const recoveryEmail = process.env.ADMIN_RECOVERY_EMAIL
  if (!email || !password) {
    console.warn(
      "[admin] Aucun compte admin en base et ADMIN_EMAIL/ADMIN_INITIAL_PASSWORD absents — /admin restera inaccessible tant que ces variables ne sont pas définies au démarrage."
    )
    return
  }
  if (!recoveryEmail) {
    console.warn(
      '[admin] ADMIN_RECOVERY_EMAIL absent — la réinitialisation de mot de passe par email ne sera pas disponible.'
    )
  }

  const now = new Date()
  const passwordHash = await bcrypt.hash(password, 12)
  db.insert(adminUsers)
    .values({ email, passwordHash, recoveryEmail: recoveryEmail || null, passwordChangedAt: now, createdAt: now })
    .run()
  console.log(
    `[admin] Compte admin créé pour ${email}. Retirez ADMIN_INITIAL_PASSWORD des variables d'environnement après la première connexion.`
  )
}
