// Liste fixe des galeries multi-photos du site. Chaque section correspond à un endroit
// précis dans le code — l'admin peut ajouter/retirer des photos dans chaque section,
// mais ne peut pas créer de nouvelle section.
export const GALLERY_SECTIONS = [
  {
    key: 'prestations',
    label: 'Réalisations (carrousel)',
    page: 'Galerie photos',
  },
  {
    key: 'cocktails-menu',
    label: 'Carte des cocktails (carrousel)',
    page: 'Nos cocktails',
  },
  {
    key: 'cocktails-vin',
    label: 'Cocktails aux vins du domaine (carrousel)',
    page: 'Nos cocktails',
  },
]

export const GALLERY_SECTION_KEYS = new Set(GALLERY_SECTIONS.map((s) => s.key))
