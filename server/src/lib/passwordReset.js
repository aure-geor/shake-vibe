import crypto from 'node:crypto'
import { eq, and, isNull, gt } from 'drizzle-orm'
import { db } from '../db/client.js'
import { passwordResetCodes } from '../db/schema.js'

const CODE_TTL_MS = 15 * 60 * 1000 // 15 minutes

function hashCode(code) {
  return crypto.createHash('sha256').update(code).digest('hex')
}

export function createResetCode(adminId) {
  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')
  const now = new Date()
  const expiresAt = new Date(now.getTime() + CODE_TTL_MS)

  db.insert(passwordResetCodes)
    .values({ adminId, codeHash: hashCode(code), expiresAt, createdAt: now })
    .run()

  return code
}

export function consumeResetCode(adminId, code) {
  const now = new Date()
  const row = db
    .select()
    .from(passwordResetCodes)
    .where(
      and(
        eq(passwordResetCodes.adminId, adminId),
        eq(passwordResetCodes.codeHash, hashCode(code)),
        isNull(passwordResetCodes.usedAt),
        gt(passwordResetCodes.expiresAt, now)
      )
    )
    .get()

  if (!row) return false

  db.update(passwordResetCodes).set({ usedAt: now }).where(eq(passwordResetCodes.id, row.id)).run()
  return true
}
