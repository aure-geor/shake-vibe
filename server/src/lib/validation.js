import { z } from 'zod'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9\s.+-]+$/

export const TYPES_EVENEMENT = ['mariage', 'anniversaire', 'soiree-privee', 'evenement-professionnel', 'autre']
export const NOMBRES_PERSONNES = ['moins-20', '20-50', '50-100', '100-plus']
export const EXPERIENCES_COCKTAILS = ['elegante', 'festive', 'sur-mesure']
export const TYPES_COCKTAILS = ['avec-alcool', 'sans-alcool', 'les-deux']

export const quoteRequestSchema = z
  .object({
    nom: z.string().trim().min(1),
    prenom: z.string().trim().min(1),
    email: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || EMAIL_REGEX.test(v)),
    telephone: z
      .string()
      .trim()
      .min(1)
      .refine((v) => PHONE_REGEX.test(v))
      .refine((v) => v.replace(/\D/g, '').length >= 10),
    typeEvenement: z.enum(TYPES_EVENEMENT),
    dateEvenement: z.string().trim().min(1),
    heureDebut: z.object({
      heures: z.coerce.number().min(0).max(23),
      minutes: z.coerce.number().min(0).max(59),
    }),
    lieuEvenement: z.string().trim().min(1),
    nombrePersonnes: z.enum(NOMBRES_PERSONNES),
    duree: z
      .object({
        jours: z.coerce.number().min(0).max(30),
        heures: z.coerce.number().min(0).max(23),
        minutes: z.coerce.number().min(0).max(59),
      })
      .refine((d) => d.jours > 0 || d.heures > 0 || d.minutes > 0),
    experienceCocktails: z.enum(EXPERIENCES_COCKTAILS),
    typeCocktails: z.enum(TYPES_COCKTAILS),
    description: z.string().trim().optional(),
    rappelTelephone: z.enum(['oui', 'non']),
    // Champ honeypot : accepte n'importe quelle valeur ici, la détection se fait dans la route
    // (un rejet de validation révélerait le mécanisme anti-spam à un bot qui l'aurait rempli).
    honeypot: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.rappelTelephone === 'non' && !(data.email && EMAIL_REGEX.test(data.email))) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Email requis si pas de rappel téléphonique.',
      })
    }
  })

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
})

export const passwordResetConfirmSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Le code doit contenir 6 chiffres.'),
  newPassword: z.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères.'),
})

export const albumInputSchema = z.object({
  titre: z.string().trim().min(1),
  lieu: z.string().trim().min(1),
  tag: z.string().trim().min(1),
  description: z.string().trim().optional(),
  published: z.boolean().optional(),
})

export const newsInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets.'),
  title: z.string().trim().min(1),
  excerpt: z.string().trim().optional(),
  bodyMarkdown: z.string().trim().optional(),
  coverImage: z.string().trim().optional(),
  published: z.boolean().optional(),
})
