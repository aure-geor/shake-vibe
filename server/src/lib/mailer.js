import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return transporter
}

export async function sendQuoteEmail(data) {
  const to = process.env.QUOTE_TO_EMAIL
  const from = process.env.QUOTE_FROM_EMAIL || process.env.SMTP_USER

  if (!to || !process.env.SMTP_HOST) {
    console.warn('[mailer] SMTP non configuré — email de demande de devis non envoyé.')
    return false
  }

  const lines = [
    `Nouvelle demande de devis — ${data.prenom} ${data.nom}`,
    '',
    `Téléphone : ${data.telephone}`,
    `Email : ${data.email || '(non renseigné)'}`,
    `Type d'évènement : ${data.typeEvenement}`,
    `Date : ${data.dateEvenement}`,
    `Heure de début : ${data.heureDebut}`,
    `Lieu : ${data.lieuEvenement}`,
    `Nombre de personnes : ${data.nombrePersonnes}`,
    `Durée : ${data.duree.jours}j ${data.duree.heures}h ${data.duree.minutes}min`,
    `Expérience cocktails souhaitée : ${data.experienceCocktails}`,
    `Type de cocktails : ${data.typeCocktails}`,
    `Rappel téléphonique souhaité : ${data.rappelTelephone}`,
    '',
    'Description :',
    data.description || '(aucune)',
  ]

  await getTransporter().sendMail({
    from,
    to,
    replyTo: data.email || undefined,
    subject: `Demande de devis — ${data.prenom} ${data.nom} (${data.typeEvenement})`,
    text: lines.join('\n'),
  })
  return true
}

export async function sendPasswordResetCode(recoveryEmail, code) {
  const from = process.env.QUOTE_FROM_EMAIL || process.env.SMTP_USER

  if (!recoveryEmail || !process.env.SMTP_HOST) {
    console.warn('[mailer] SMTP non configuré — code de réinitialisation non envoyé.')
    return false
  }

  await getTransporter().sendMail({
    from,
    to: recoveryEmail,
    subject: 'Code de réinitialisation — Shake & Vibe',
    text: [
      'Vous avez demandé à changer le mot de passe de votre espace administrateur Shake & Vibe.',
      '',
      `Code de vérification : ${code}`,
      '',
      'Ce code est valable 15 minutes et ne peut être utilisé qu\'une seule fois.',
      "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message.",
    ].join('\n'),
  })
  return true
}
