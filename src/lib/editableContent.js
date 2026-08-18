// Catalogue de tout le texte éditable du site. Chaque entrée définit une clé
// (utilisée en base et par les pages via useSiteContent), un libellé et un
// type de champ pour l'admin, et le texte par défaut (fallback) affiché tant
// que le client n'a rien personnalisé.
export const CONTENT_SCHEMA = [
  {
    page: 'Boutons "Demander un devis"',
    fields: [
      {
        key: 'cta.request_quote',
        label: 'Texte du bouton (utilisé partout sur le site)',
        type: 'text',
        fallback: 'Demander un devis',
      },
    ],
  },
  {
    page: 'Accueil',
    fields: [
      {
        key: 'home.hero.title',
        label: 'Titre principal',
        type: 'text',
        fallback: 'Le barman privé à domicile qui transforme votre évènement en expérience',
      },
      {
        key: 'home.hero.subtitle',
        label: 'Sous-titre',
        type: 'textarea',
        fallback:
          'Créez une expérience unique pour vos évènements privés et professionnels avec une approche élégante et festive.',
      },
      {
        key: 'home.hero.cta_secondary',
        label: 'Bouton secondaire du hero',
        type: 'text',
        fallback: 'Découvrir notre approche',
      },
      {
        key: 'home.how.eyebrow',
        label: 'Petit titre au-dessus de "Notre approche"',
        type: 'text',
        fallback: 'Notre approche',
      },
      {
        key: 'home.how.title',
        label: 'Titre de la section "Notre approche"',
        type: 'text',
        fallback: "L'excellence au service de votre évènement",
      },
      {
        key: 'home.how.item1.title',
        label: 'Approche — carte 1 — titre',
        type: 'text',
        fallback: 'Cocktails sur mesure',
      },
      {
        key: 'home.how.item1.text',
        label: 'Approche — carte 1 — texte',
        type: 'textarea',
        fallback: 'Des recettes personnalisées adaptées à votre évènement et à vos envies.',
      },
      {
        key: 'home.how.item2.title',
        label: 'Approche — carte 2 — titre',
        type: 'text',
        fallback: 'Bar mobile autonome',
      },
      {
        key: 'home.how.item2.text',
        label: 'Approche — carte 2 — texte',
        type: 'textarea',
        fallback: 'Une installation élégante et flexible, adaptée à tous types de lieux.',
      },
      {
        key: 'home.how.item3.title',
        label: 'Approche — carte 3 — titre',
        type: 'text',
        fallback: 'Verrerie disponible',
      },
      {
        key: 'home.how.item3.text',
        label: 'Approche — carte 3 — texte',
        type: 'textarea',
        fallback: "Jusqu'à 240 verres disponibles pour vos évènements.",
      },
      {
        key: 'home.how.item4.title',
        label: 'Approche — carte 4 — titre',
        type: 'text',
        fallback: 'Animation & flair bartending',
      },
      {
        key: 'home.how.item4.text',
        label: 'Approche — carte 4 — texte',
        type: 'textarea',
        fallback: 'Une expérience visuelle qui apporte une vraie valeur ajoutée à votre évènement.',
      },
      {
        key: 'home.how.item5.title',
        label: 'Approche — carte 5 — titre',
        type: 'text',
        fallback: "Déplacement en France et à l'international",
      },
      {
        key: 'home.how.item5.text',
        label: 'Approche — carte 5 — texte',
        type: 'textarea',
        fallback:
          "Mariages, séminaires, soirées privées et évènements professionnels, partout en France et à l'étranger.",
      },
      {
        key: 'home.how.item6.title',
        label: 'Approche — carte 6 — titre',
        type: 'text',
        fallback: 'Accompagnement personnalisé',
      },
      {
        key: 'home.how.item6.text',
        label: 'Approche — carte 6 — texte',
        type: 'textarea',
        fallback: 'Conseils, préparation et suivi pour un évènement organisé en toute sérénité.',
      },
      {
        key: 'home.what.eyebrow',
        label: 'Petit titre au-dessus de "Ce que nous proposons"',
        type: 'text',
        fallback: 'Ce que nous proposons',
      },
      {
        key: 'home.what.title',
        label: 'Titre de la section "Ce que nous proposons"',
        type: 'text',
        fallback: 'Une prestation clé en main, partout où vous en avez besoin',
      },
      {
        key: 'home.what.text',
        label: 'Texte de la section "Ce que nous proposons"',
        type: 'textarea',
        fallback:
          "Shake & Vibe se déplace directement sur le lieu de votre évènement avec tout le nécessaire : bar mobile, matériel professionnel, verrerie, ingrédients, carte cocktails personnalisée. Nous prenons en charge votre espace bar de A à Z pour vous offrir une prestation entièrement autonome et adaptée à votre évènement.",
      },
      {
        key: 'home.what.cta_secondary',
        label: 'Bouton secondaire (voir réalisations)',
        type: 'text',
        fallback: 'Voir nos réalisations',
      },
    ],
  },
  {
    page: 'Accueil — cartes prestations',
    fields: [
      { key: 'services.mariages.titre', label: 'Carte 1 — titre', type: 'text', fallback: 'Mariages' },
      {
        key: 'services.mariages.description',
        label: 'Carte 1 — description',
        type: 'textarea',
        fallback: 'Cocktails sur mesure pour le plus beau jour de votre vie.',
      },
      {
        key: 'services.evenements-prives.titre',
        label: 'Carte 2 — titre',
        type: 'text',
        fallback: 'Événements privés',
      },
      {
        key: 'services.evenements-prives.description',
        label: 'Carte 2 — description',
        type: 'textarea',
        fallback: 'Anniversaires, villas et réceptions sur mesure.',
      },
      {
        key: 'services.seminaires.titre',
        label: 'Carte 3 — titre',
        type: 'text',
        fallback: "Séminaires d'entreprises",
      },
      {
        key: 'services.seminaires.description',
        label: 'Carte 3 — description',
        type: 'textarea',
        fallback: 'Une animation conviviale pour vos collaborateurs.',
      },
      {
        key: 'services.ateliers-cocktails.titre',
        label: 'Carte 4 — titre',
        type: 'text',
        fallback: 'Ateliers cocktails',
      },
      {
        key: 'services.ateliers-cocktails.description',
        label: 'Carte 4 — description',
        type: 'textarea',
        fallback: "Une immersion ludique dans l'univers de la mixologie.",
      },
    ],
  },
  {
    page: 'Qui sommes-nous',
    fields: [
      {
        key: 'about.title',
        label: 'Titre de la page',
        type: 'text',
        fallback: "Florian, l'art de la mixologie et du flair bartending",
      },
      {
        key: 'about.intro1',
        label: 'Premier paragraphe',
        type: 'textarea',
        fallback:
          "Tout commence par une passion pour le flair bartending : le geste spectaculaire qui transforme un service en performance. Florian y a bâti une expertise reconnue à l'international, où précision technique et sens du spectacle ne font qu'un.",
      },
      {
        key: 'about.intro2',
        label: 'Deuxième paragraphe',
        type: 'textarea',
        fallback:
          "Cette expertise s'est forgée au fil de voyages en Amérique centrale, au Brésil et dans les Caraïbes, berceau des plus grandes traditions de bar. De retour en France, une conviction s'impose : un cocktail ne se boit pas, il se vit. C'est cette philosophie qui a donné naissance à Shake & Vibe, un service de barman privé à domicile pour vos évènements, partout en France.",
      },
      {
        key: 'about.journey.title',
        label: 'Titre de la frise voyage',
        type: 'text',
        fallback: 'Un voyage au cœur des spiritueux d’Amérique latine et des Caraïbes',
      },
      {
        key: 'about.journey.subtitle',
        label: 'Sous-titre de la frise voyage',
        type: 'textarea',
        fallback:
          "Quelques étapes qui continuent aujourd'hui d'inspirer chaque carte de cocktails, sur-mesure pour chaque évènement.",
      },
      { key: 'about.etape1.lieu', label: 'Étape 1 — lieu', type: 'text', fallback: 'Mexique' },
      {
        key: 'about.etape1.texte',
        label: 'Étape 1 — texte',
        type: 'textarea',
        fallback:
          "La découverte du mezcal artisanal et des agaves fumés, une leçon d'authenticité transmise par les mezcaleros locaux.",
      },
      { key: 'about.etape2.lieu', label: 'Étape 2 — lieu', type: 'text', fallback: 'Brésil' },
      {
        key: 'about.etape2.texte',
        label: 'Étape 2 — texte',
        type: 'textarea',
        fallback:
          "La caipirinha et l'énergie du flair bartending, où performance visuelle et convivialité ne font qu'un.",
      },
      { key: 'about.etape3.lieu', label: 'Étape 3 — lieu', type: 'text', fallback: 'Belize' },
      {
        key: 'about.etape3.texte',
        label: 'Étape 3 — texte',
        type: 'textarea',
        fallback:
          'Le rhum artisanal et le cacao maya, entre forêt tropicale et mer des Caraïbes, une richesse de saveurs encore méconnue.',
      },
      { key: 'about.etape4.lieu', label: 'Étape 4 — lieu', type: 'text', fallback: 'Caraïbes' },
      {
        key: 'about.etape4.texte',
        label: 'Étape 4 — texte',
        type: 'textarea',
        fallback:
          "D'île en île, la tradition du rhum épicé et des cocktails tiki, où chaque recette raconte l'histoire d'un archipel.",
      },
      {
        key: 'about.closing.title',
        label: 'Titre du bloc final',
        type: 'text',
        fallback: "Aujourd'hui, cette expertise se retrouve dans chaque évènement",
      },
      {
        key: 'about.closing.text',
        label: 'Texte du bloc final',
        type: 'textarea',
        fallback:
          'Chaque prestation Shake & Vibe est composée sur-mesure : une écoute attentive de vos envies, un service soigné et une carte de cocktails unique, élaborée pour raconter, le temps d’une soirée, une histoire qui vous ressemble.',
      },
    ],
  },
  {
    page: 'Nos prestations',
    fields: [
      {
        key: 'prestations.title',
        label: 'Titre de la page',
        type: 'text',
        fallback: 'Des évènements sur mesure, partout où vous nous emmenez',
      },
      {
        key: 'prestations.subtitle',
        label: 'Sous-titre de la page',
        type: 'textarea',
        fallback: 'Découvrez quelques-unes de nos prestations de barman privé à domicile, partout en France.',
      },
      {
        key: 'prestations.instagram_cta',
        label: 'Texte du bouton vers Instagram',
        type: 'text',
        fallback: 'Plus de contenus ici',
      },
    ],
  },
  {
    page: 'Nos cocktails',
    fields: [
      {
        key: 'cocktails.title',
        label: 'Titre de la page',
        type: 'text',
        fallback: 'Des cocktails qui marquent les esprits',
      },
      {
        key: 'cocktails.subtitle',
        label: 'Sous-titre de la page',
        type: 'textarea',
        fallback:
          "Des créations originales, pensées pour s'adapter à votre évènement, à vos envies et à votre univers.\nClassiques revisités, créations signatures ou recettes entièrement sur mesure. Chaque carte est imaginée pour offrir une véritable expérience à vos invités.",
      },
      {
        key: 'cocktails.experience.elegante',
        label: 'Carte "Élégante & Raffinée"',
        type: 'textarea',
        fallback:
          "Des cocktails classiques revisités avec précision, pensés pour les évènements raffinés : mariages, réceptions et soirées d'entreprise.",
      },
      {
        key: 'cocktails.experience.festive',
        label: 'Carte "Festive & Dynamique"',
        type: 'textarea',
        fallback:
          "Une carte audacieuse et généreuse, portée par l'énergie du flair bartending, pour des soirées privées et anniversaires mémorables.",
      },
      {
        key: 'cocktails.experience.sur-mesure',
        label: 'Carte "Sur-mesure"',
        type: 'textarea',
        fallback:
          'Une carte entièrement composée avec vous : thème, couleurs, ingrédients de saison, pour une expérience qui vous ressemble.',
      },
      {
        key: 'cocktails.menu.eyebrow',
        label: 'Petit titre au-dessus de "Notre carte de cocktails"',
        type: 'text',
        fallback: 'La carte',
      },
      {
        key: 'cocktails.menu.title',
        label: 'Titre "Notre carte de cocktails"',
        type: 'text',
        fallback: 'Notre carte de cocktails',
      },
      {
        key: 'cocktails.menu.subtitle',
        label: 'Sous-titre de la carte',
        type: 'textarea',
        fallback:
          'Des créations originales et pour toutes les envies. Imaginées par Shake & Vibe pour vous surprendre autant par les saveurs que par la présentation.',
      },
      {
        key: 'cocktails.menu.upsell',
        label: 'Texte "sur mesure" après la carte',
        type: 'textarea',
        fallback:
          'Vous ne trouvez pas votre bonheur ? Notre carte n’est qu’un aperçu. Nous pouvons également imaginer des cocktails sur mesure selon vos goûts, votre thème ou l’univers de votre évènement.',
      },
      {
        key: 'cocktails.wine.eyebrow',
        label: 'Petit titre au-dessus de la section vins',
        type: 'text',
        fallback: 'Une offre dédiée aux domaines',
      },
      {
        key: 'cocktails.wine.title',
        label: 'Titre de la section vins',
        type: 'text',
        fallback: 'Vos cuvées autrement.',
      },
      {
        key: 'cocktails.wine.subtitle',
        label: 'Texte de la section vins',
        type: 'textarea',
        fallback:
          "Et si vos vins devenaient la signature d'une création unique ?\nChez Shake & Vibe, nous imaginons des cocktails sur mesure spécialement conçus autour des cuvées de votre domaine.\nVin blanc, rosé, rouge, effervescent ou champagne : chaque création est travaillée en fonction du profil de votre vin afin de mettre en valeur ses arômes et son identité, sans les dénaturer. L'objectif : offrir une nouvelle manière de découvrir vos cuvées, valoriser votre savoir-faire et proposer à vos visiteurs une expérience de dégustation.",
      },
      {
        key: 'cocktails.wine.download_cta',
        label: 'Texte du bouton de téléchargement de la carte des vins',
        type: 'textarea',
        fallback:
          "L'objectif : offrir une nouvelle manière de découvrir vos cuvées, valoriser votre savoir-faire et proposer à vos visiteurs une expérience de dégustation originale et mémorable.",
      },
      {
        key: 'cocktails.final.title',
        label: 'Titre "Avec ou sans alcool"',
        type: 'text',
        fallback: 'Avec ou sans alcool, à vous de choisir',
      },
      {
        key: 'cocktails.final.text',
        label: 'Texte "Avec ou sans alcool"',
        type: 'textarea',
        fallback:
          'Toutes nos créations sont proposées en version classique ou sans alcool, sans compromis sur le goût ni la présentation.',
      },
    ],
  },
  {
    page: 'Navigation & réseaux sociaux',
    fields: [
      { key: 'nav.qui_sommes_nous', label: 'Lien de menu — Qui sommes-nous ?', type: 'text', fallback: 'Qui sommes-nous ?' },
      { key: 'nav.prestations', label: 'Lien de menu — Nos prestations', type: 'text', fallback: 'Nos prestations' },
      { key: 'nav.cocktails', label: 'Lien de menu — Nos cocktails', type: 'text', fallback: 'Nos cocktails' },
      { key: 'nav.devis', label: 'Lien de menu — Demande de devis', type: 'text', fallback: 'Demande de devis' },
      {
        key: 'links.instagram',
        label: 'Lien Instagram',
        type: 'text',
        fallback: 'https://www.instagram.com/shakeandvibe?igsh=YWxvemZ3a2Z6Zm91',
      },
      {
        key: 'links.tiktok',
        label: 'Lien TikTok',
        type: 'text',
        fallback: 'https://www.tiktok.com/@shakeandvibe_?_r=1&_t=ZN-98bx5hIixCF',
      },
    ],
  },
  {
    page: 'Mentions légales',
    fields: [
      { key: 'legal.mentions.title', label: 'Titre de la page', type: 'text', fallback: 'Mentions légales' },
      { key: 'legal.mentions.s1.title', label: 'Section 1 — titre', type: 'text', fallback: '1. Éditeur du site' },
      {
        key: 'legal.mentions.s1.body',
        label: 'Section 1 — texte',
        type: 'textarea',
        fallback:
          'Le présent site est édité par Shake & Vibe, entreprise individuelle, immatriculée sous le numéro SIREN 990 511 636, dont le siège est situé 105 chemin du Beausset au Castellet, 83330 Le Beausset.\n\nNuméro de TVA intracommunautaire : FR60990511636\nAdresse électronique : contact@shakeandvibe.com\nTéléphone : 06 62 28 02 69',
      },
      { key: 'legal.mentions.s2.title', label: 'Section 2 — titre', type: 'text', fallback: '2. Directeur de la publication' },
      {
        key: 'legal.mentions.s2.body',
        label: 'Section 2 — texte',
        type: 'textarea',
        fallback: "Le directeur de la publication est Florian Lopez, en qualité d'entrepreneur individuel exploitant Shake & Vibe.",
      },
      { key: 'legal.mentions.s3.title', label: 'Section 3 — titre', type: 'text', fallback: '3. Hébergement' },
      {
        key: 'legal.mentions.s3.body',
        label: 'Section 3 — texte',
        type: 'textarea',
        fallback:
          'Le site est hébergé par OVH SAS, société immatriculée au RCS de Lille Métropole sous le numéro 424 761 419 00045, dont le siège social est situé 2 rue Kellermann, 59100 Roubaix, France.',
      },
      { key: 'legal.mentions.s4.title', label: 'Section 4 — titre', type: 'text', fallback: '4. Propriété intellectuelle' },
      {
        key: 'legal.mentions.s4.body',
        label: 'Section 4 — texte',
        type: 'textarea',
        fallback:
          "La marque Shake & Vibe est une marque déposée. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, du nom, du logo ou des éléments visuels associés, sans autorisation écrite préalable, est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.\n\nL'ensemble des photographies présentes sur ce site est la propriété exclusive de Shake & Vibe ou lui a été concédé sous licence. Toute reproduction ou réutilisation de ces images, sur quelque support que ce soit, sans autorisation écrite préalable, est interdite.",
      },
      { key: 'legal.mentions.s5.title', label: 'Section 5 — titre', type: 'text', fallback: '5. Protection des données personnelles' },
      {
        key: 'legal.mentions.s5.body',
        label: 'Section 5 — texte',
        type: 'textarea',
        fallback:
          "Les informations relatives au traitement des données personnelles collectées via ce site (notamment via le formulaire de demande de devis) sont détaillées dans notre politique de confidentialité, accessible depuis le pied de page du site.",
      },
      { key: 'legal.mentions.s6.title', label: 'Section 6 — titre', type: 'text', fallback: '6. Contact' },
      {
        key: 'legal.mentions.s6.body',
        label: 'Section 6 — texte',
        type: 'textarea',
        fallback: 'Pour toute question relative au site ou à son contenu, vous pouvez nous contacter à l’adresse suivante : contact@shakeandvibe.com.',
      },
    ],
  },
  {
    page: 'CGV',
    fields: [
      { key: 'legal.cgv.title', label: 'Titre de la page', type: 'text', fallback: 'Conditions générales de vente' },
      {
        key: 'legal.cgv.body',
        label: 'Texte de la page',
        type: 'textarea',
        fallback:
          'Cette page est en cours de rédaction. Les conditions générales de vente de Shake & Vibe seront prochainement disponibles ici.',
      },
    ],
  },
  {
    page: 'Politique de confidentialité',
    fields: [
      { key: 'legal.privacy.title', label: 'Titre de la page', type: 'text', fallback: 'Politique de confidentialité' },
      { key: 'legal.privacy.s1.title', label: 'Section 1 — titre', type: 'text', fallback: '1. Responsable du traitement' },
      {
        key: 'legal.privacy.s1.body',
        label: 'Section 1 — texte',
        type: 'textarea',
        fallback:
          'Le responsable du traitement des données collectées sur ce site est Shake & Vibe. Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l’adresse suivante : contact@shakeandvibe.com.',
      },
      { key: 'legal.privacy.s2.title', label: 'Section 2 — titre', type: 'text', fallback: '2. Données collectées et finalité' },
      {
        key: 'legal.privacy.s2.body',
        label: 'Section 2 — texte',
        type: 'textarea',
        fallback:
          "Lorsque vous complétez le formulaire de demande de devis, nous collectons les données suivantes : nom, prénom, adresse email, numéro de téléphone, ainsi que les informations relatives à votre évènement (date, lieu, nombre de personnes, préférences de cocktails, description).\n\nCes données sont utilisées exclusivement pour traiter votre demande, établir une proposition commerciale personnalisée et vous recontacter à cet effet. Elles ne sont ni cédées, ni vendues, ni utilisées à des fins de prospection commerciale tierce.",
      },
      { key: 'legal.privacy.s3.title', label: 'Section 3 — titre', type: 'text', fallback: '3. Durée de conservation' },
      {
        key: 'legal.privacy.s3.body',
        label: 'Section 3 — texte',
        type: 'textarea',
        fallback:
          'Les données transmises via le formulaire de devis sont conservées pendant une durée maximale de 3 ans à compter de notre dernier échange, sauf obligation légale de conservation plus longue (notamment comptable) ou relation contractuelle en cours.',
      },
      { key: 'legal.privacy.s4.title', label: 'Section 4 — titre', type: 'text', fallback: '4. Vos droits' },
      {
        key: 'legal.privacy.s4.body',
        label: 'Section 4 — texte',
        type: 'textarea',
        fallback:
          "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données, ainsi que d'un droit d'opposition et de limitation du traitement.\n\nVous pouvez exercer ces droits à tout moment en nous écrivant à l'adresse indiquée à l'article 1. Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr.",
      },
      { key: 'legal.privacy.s5.title', label: 'Section 5 — titre', type: 'text', fallback: '5. Cookies' },
      {
        key: 'legal.privacy.s5.body',
        label: 'Section 5 — texte',
        type: 'textarea',
        fallback:
          "Ce site n'utilise aucun cookie de mesure d'audience ou de suivi publicitaire. Si un tel outil venait à être ajouté, cette politique serait mise à jour et un bandeau de consentement vous serait présenté conformément à la réglementation en vigueur.\n\nUn unique cookie technique (sv_session) est déposé, exclusivement lors de la connexion à l'espace d'administration du site. Strictement nécessaire à l'authentification, il n'est jamais déposé lors d'une navigation classique et ne requiert pas de consentement.",
      },
      { key: 'legal.privacy.s6.title', label: 'Section 6 — titre', type: 'text', fallback: '6. Hébergement des données' },
      {
        key: 'legal.privacy.s6.body',
        label: 'Section 6 — texte',
        type: 'textarea',
        fallback: 'Les données collectées sont stockées sur un serveur situé en France, chez OVH SAS.',
      },
    ],
  },
]

export const CONTENT_FALLBACKS = Object.fromEntries(
  CONTENT_SCHEMA.flatMap((group) => group.fields.map((field) => [field.key, field.fallback]))
)
