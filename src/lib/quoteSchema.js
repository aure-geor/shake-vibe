import { z } from 'zod'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9\s.+-]+$/

export const TYPES_EVENEMENT = [
  { value: 'mariage', label: 'Mariage' },
  { value: 'anniversaire', label: 'Anniversaire' },
  { value: 'soiree-privee', label: 'Soirée privée' },
  { value: 'evenement-professionnel', label: 'Événement professionnel' },
  { value: 'autre', label: 'Autre' },
]

export const NOMBRES_PERSONNES = [
  { value: 'moins-20', label: 'Moins de 20' },
  { value: '20-50', label: 'De 20 à 50' },
  { value: '50-100', label: 'De 50 à 100' },
  { value: '100-plus', label: '100 et plus' },
]

export const EXPERIENCES_COCKTAILS = [
  { value: 'elegante', label: 'Élégante & Raffinée' },
  { value: 'festive', label: 'Festive & Dynamique' },
  { value: 'sur-mesure', label: 'Sur-mesure' },
]

export const TYPES_COCKTAILS = [
  { value: 'avec-alcool', label: 'Avec Alcool' },
  { value: 'sans-alcool', label: 'Sans Alcool' },
  { value: 'les-deux', label: 'Les deux' },
]

export const quoteSchema = z
  .object({
    nom: z.string().trim().min(1, 'Le nom est requis.'),
    prenom: z.string().trim().min(1, 'Le prénom est requis.'),
    email: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || EMAIL_REGEX.test(v), {
        message: "Merci de renseigner une adresse mail valide (ex : nom@domaine.fr).",
      }),
    telephone: z
      .string()
      .trim()
      .min(1, 'Le numéro de téléphone est requis.')
      .refine((v) => PHONE_REGEX.test(v), {
        message: 'Le numéro ne doit contenir ni lettres, ni caractères spéciaux.',
      })
      .refine((v) => v.replace(/\D/g, '').length >= 10, {
        message: 'Le numéro doit comporter au moins 10 chiffres.',
      }),
    typeEvenement: z.enum(TYPES_EVENEMENT.map((t) => t.value), {
      error: "Merci de sélectionner un type d'évènement.",
    }),
    dateEvenement: z.date({ error: "Merci de sélectionner une date d'évènement." }),
    lieuEvenement: z.string().trim().min(1, "Le lieu de l'évènement est requis."),
    nombrePersonnes: z.enum(NOMBRES_PERSONNES.map((n) => n.value), {
      error: 'Merci de sélectionner le nombre de personnes.',
    }),
    duree: z
      .object({
        jours: z.coerce.number().min(0).max(30),
        heures: z.coerce.number().min(0).max(23),
        minutes: z.coerce.number().min(0).max(59),
      })
      .refine((d) => d.jours > 0 || d.heures > 0 || d.minutes > 0, {
        message: 'Merci de préciser une durée de prestation.',
      }),
    experienceCocktails: z.enum(EXPERIENCES_COCKTAILS.map((e) => e.value), {
      error: "Merci de sélectionner une expérience cocktails.",
    }),
    typeCocktails: z.enum(TYPES_COCKTAILS.map((t) => t.value), {
      error: 'Merci de sélectionner un type de cocktails.',
    }),
    description: z.string().trim().optional(),
    rappelTelephone: z.enum(['oui', 'non'], {
      error: 'Merci de préciser si vous souhaitez être rappelé par téléphone.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.rappelTelephone === 'non' && !(data.email && EMAIL_REGEX.test(data.email))) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message:
          'Veuillez renseigner une adresse mail ou une adresse mail valide pour pouvoir être recontacté.',
      })
    }
  })

export const quoteDefaultValues = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  typeEvenement: null,
  dateEvenement: undefined,
  lieuEvenement: '',
  nombrePersonnes: null,
  duree: { jours: 0, heures: 0, minutes: 0 },
  experienceCocktails: null,
  typeCocktails: null,
  description: '',
  rappelTelephone: null,
}
