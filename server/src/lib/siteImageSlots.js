// Liste fixe des emplacements photo du site. Chaque emplacement correspond à un endroit
// précis dans le code (voir les pages Home/About/Cocktails) — l'admin ne peut pas en créer
// de nouveaux, seulement assigner/remplacer l'image de chaque emplacement existant.
export const SITE_IMAGE_SLOTS = [
  {
    key: 'accueil-hero',
    label: 'Image principale',
    page: 'Accueil',
    hint: 'Format paysage large, en fond de la section d’introduction.',
  },
  {
    key: 'apropos-portrait',
    label: 'Portrait de Florian',
    page: 'Qui sommes-nous',
    hint: 'Format portrait ou carré.',
  },
  {
    key: 'accueil-mariages',
    label: 'Prestation — Mariages',
    page: 'Accueil',
    hint: 'Format portrait ou carré.',
  },
  {
    key: 'accueil-evenements-prives',
    label: 'Prestation — Événements privés',
    page: 'Accueil',
    hint: 'Format portrait ou carré.',
  },
  {
    key: 'accueil-seminaires',
    label: 'Prestation — Séminaires d’entreprises',
    page: 'Accueil',
    hint: 'Format portrait ou carré.',
  },
  {
    key: 'accueil-ateliers-cocktails',
    label: 'Prestation — Ateliers cocktails',
    page: 'Accueil',
    hint: 'Format portrait ou carré.',
  },
  {
    key: 'apropos-sur-mesure',
    label: 'Une expertise sur-mesure (bandeau de fin)',
    page: 'Qui sommes-nous',
    hint: 'Format paysage large.',
  },
  {
    key: 'cocktails-elegante',
    label: 'Expérience élégante',
    page: 'Nos cocktails',
    hint: 'Format carré ou portrait.',
  },
  {
    key: 'cocktails-festive',
    label: 'Expérience festive',
    page: 'Nos cocktails',
    hint: 'Format carré ou portrait.',
  },
  {
    key: 'cocktails-sur-mesure',
    label: 'Expérience sur-mesure',
    page: 'Nos cocktails',
    hint: 'Format carré ou portrait.',
  },
  {
    key: 'cocktails-vin-fond',
    label: 'Cocktails aux vins du domaine (fond de section)',
    page: 'Nos cocktails',
    hint: 'Format paysage large.',
  },
]

export const SITE_IMAGE_SLOT_KEYS = new Set(SITE_IMAGE_SLOTS.map((s) => s.key))
