export const SITE_URL = 'https://shakeandvibe.com'
export const SITE_NAME = 'Shake & Vibe'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

const PAGES = {
  '/': {
    title: 'Shake & Vibe - Barman privé pour vos évènements.',
    description:
      'Barman privé pour mariages, événements privés, séminaires et ateliers cocktails partout en France. Devis personnalisé, cocktails sur-mesure, prestation haut de gamme.',
  },
  '/qui-sommes-nous': {
    title: 'Qui sommes-nous ? — L\'équipe Shake & Vibe',
    description:
      'Découvrez l\'histoire de Shake & Vibe et l\'expertise de nos barmen professionnels, façonnée par un parcours international, au service de vos événements.',
  },
  '/prestations': {
    title: 'Nos prestations — Barman privé & bar mobile pour événements',
    description:
      "Un bar mobile installé où vous le souhaitez, des cocktails choisis pour votre événement et un service assuré de bout en bout par nos barmans. Découvrez l'expérience Shake & Vibe.",
  },
  '/galerie-photos': {
    title: 'Galerie photos — Bar mobile & barman privé pour événements',
    description:
      'Mariages, soirées privées, séminaires d\'entreprise : découvrez nos réalisations et notre bar mobile pour des événements sur-mesure partout en France.',
  },
  '/nos-cocktails': {
    title: 'Notre carte de cocktails — Créations sur-mesure',
    description:
      'Cocktails élégants, festifs et sur-mesure, avec ou sans alcool, ainsi que nos créations aux vins du domaine. Une carte pensée pour sublimer votre événement.',
  },
  '/devis': {
    title: 'Demander un devis personnalisé',
    description:
      'Obtenez un devis sur-mesure pour votre mariage, événement privé, séminaire ou atelier cocktails. Réponse rapide, prestation adaptée à vos besoins.',
  },
  '/mentions-legales': {
    title: 'Mentions légales',
    description: 'Mentions légales du site Shake & Vibe.',
  },
  '/cgv': {
    title: 'Conditions générales de vente',
    description: 'Conditions générales de vente de Shake & Vibe.',
  },
  '/politique-de-confidentialite': {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité et protection des données personnelles — Shake & Vibe.',
  },
}

export const KNOWN_PATHS = new Set([
  ...Object.keys(PAGES),
  '/admin',
  '/admin/connexion',
  '/admin/mot-de-passe-oublie',
])

const LOCAL_BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description:
    'Barman privé et bar mobile pour mariages, événements privés, séminaires et ateliers cocktails, partout en France.',
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  email: 'contact@shakeandvibe.com',
  telephone: '+33662280269',
  vatID: 'FR60990511636',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '105 chemin du Beausset au Castellet',
    postalCode: '83330',
    addressLocality: 'Le Beausset',
    addressCountry: 'FR',
  },
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  sameAs: [
    'https://www.instagram.com/shakeandvibe?igsh=YWxvemZ3a2Z6Zm91',
    'https://www.tiktok.com/@shakeandvibe_?_r=1&_t=ZN-98bx5hIixCF',
  ],
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildHead(pathname) {
  const isAdmin = pathname.startsWith('/admin')
  const isHome = pathname === '/'
  const page = PAGES[pathname] ?? PAGES['/']
  const title = isAdmin ? `Espace administrateur — ${SITE_NAME}` : isHome ? page.title : `${page.title} | ${SITE_NAME}`
  const description = isAdmin ? 'Espace administrateur Shake & Vibe.' : page.description
  const canonical = `${SITE_URL}${isHome ? '/' : pathname}`

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  ]

  if (isAdmin) {
    tags.push('<meta name="robots" content="noindex, nofollow" />')
  } else {
    tags.push(
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
      `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
      `<script type="application/ld+json">${JSON.stringify(LOCAL_BUSINESS_JSONLD)}</script>`
    )
  }

  return tags.join('\n    ')
}
