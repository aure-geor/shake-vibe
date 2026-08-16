import { Router } from 'express'
import { quoteRequestSchema } from '../lib/validation.js'
import { db } from '../db/client.js'
import { quoteRequests } from '../db/schema.js'
import { sendQuoteEmail } from '../lib/mailer.js'
import { quoteLimiter } from '../middleware/rateLimit.js'

export const quoteRouter = Router()

quoteRouter.post('/', quoteLimiter, async (req, res) => {
  const parsed = quoteRequestSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Formulaire invalide.', issues: parsed.error.issues })
  }

  const data = parsed.data
  if (data.honeypot) {
    // Bot détecté — on répond succès sans rien faire, pour ne pas révéler la détection.
    return res.json({ ok: true })
  }

  const heureDebutStr = `${String(data.heureDebut.heures).padStart(2, '0')}:${String(data.heureDebut.minutes).padStart(2, '0')}`

  let emailSent = false
  try {
    emailSent = await sendQuoteEmail({ ...data, heureDebut: heureDebutStr })
  } catch (err) {
    console.error('[quote] envoi email échoué :', err.message)
  }

  db.insert(quoteRequests)
    .values({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email || null,
      telephone: data.telephone,
      typeEvenement: data.typeEvenement,
      dateEvenement: data.dateEvenement,
      heureDebut: heureDebutStr,
      lieuEvenement: data.lieuEvenement,
      nombrePersonnes: data.nombrePersonnes,
      dureeJours: data.duree.jours,
      dureeHeures: data.duree.heures,
      dureeMinutes: data.duree.minutes,
      experienceCocktails: data.experienceCocktails,
      typeCocktails: data.typeCocktails,
      description: data.description || '',
      rappelTelephone: data.rappelTelephone,
      emailSent,
      createdAt: new Date(),
    })
    .run()

  res.json({ ok: true })
})
