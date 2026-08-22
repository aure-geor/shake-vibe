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
    page: 'Galerie photos',
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
      {
        key: 'nav.galerie_photos',
        label: 'Lien de menu — Galerie photos',
        type: 'text',
        fallback: 'Galerie photos',
      },
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
        key: 'legal.cgv.updated',
        label: 'Date de mise à jour',
        type: 'text',
        fallback: 'Dernière mise à jour : août 2026',
      },
      { key: 'legal.cgv.s1.title', label: 'Section 1 — titre', type: 'text', fallback: 'Article 1 – Objet' },
      {
        key: 'legal.cgv.s1.body',
        label: 'Section 1 — texte',
        type: 'textarea',
        fallback:
          "Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les conditions dans lesquelles Shake & Vibe propose et réalise ses prestations événementielles, notamment : bar à cocktails événementiel, cocktails et mocktails, bar mobile, flair bartending, animations cocktails, ateliers et prestations associées.\n\nLe site internet de Shake & Vibe a notamment pour objet de présenter les prestations proposées et de permettre aux visiteurs d'effectuer une demande de renseignements ou de devis.\n\nL'envoi d'une demande via le site internet ne constitue ni une commande ni une réservation ferme.\n\nToute prestation fait l'objet d'un devis personnalisé dans les conditions définies ci-dessous.",
      },
      { key: 'legal.cgv.s2.title', label: 'Section 2 — titre', type: 'text', fallback: "Article 2 – Champ d'application" },
      {
        key: 'legal.cgv.s2.body',
        label: 'Section 2 — texte',
        type: 'textarea',
        fallback:
          'Les présentes CGV s\'appliquent aux prestations réalisées par Shake & Vibe auprès de clients particuliers et professionnels.\n\nCertaines dispositions peuvent différer selon la qualité du client lorsque cela est expressément précisé.\n\nLa signature ou l\'acceptation du devis entraîne l\'acceptation pleine et entière des présentes CGV par le client.',
      },
      { key: 'legal.cgv.s3.title', label: 'Section 3 — titre', type: 'text', fallback: 'Article 3 – Demande de devis et devis' },
      {
        key: 'legal.cgv.s3.body',
        label: 'Section 3 — texte',
        type: 'textarea',
        fallback:
          "Toute demande effectuée par l'intermédiaire du site internet, par téléphone, par courrier électronique, via les réseaux sociaux ou par tout autre moyen constitue uniquement une demande d'information ou de devis et n'entraîne aucune réservation automatique de la date souhaitée.\n\nChaque prestation fait l'objet d'un devis personnalisé établi notamment en fonction de la date, du lieu, du nombre de participants, de la formule choisie et des prestations demandées.\n\nSauf mention contraire, les devis émis par Shake & Vibe sont valables pendant 30 jours à compter de leur date d'émission, sous réserve de la disponibilité de la date au moment de la confirmation.",
      },
      { key: 'legal.cgv.s4.title', label: 'Section 4 — titre', type: 'text', fallback: 'Article 4 – Réservation et acompte' },
      {
        key: 'legal.cgv.s4.body',
        label: 'Section 4 — texte',
        type: 'textarea',
        fallback:
          "Pour les clients particuliers, un acompte correspondant à 30 % du montant TTC de la prestation est demandé afin de confirmer la réservation.\n\nPour les clients professionnels, Shake & Vibe peut demander un acompte lorsque celui-ci est prévu au devis.\n\nLa réservation devient définitive après acceptation du devis et réception de l'acompte lorsqu'un acompte est prévu.\n\nTant que ces conditions ne sont pas réunies, la date n'est pas considérée comme définitivement réservée et Shake & Vibe reste libre d'accepter une autre prestation à cette même date.",
      },
      { key: 'legal.cgv.s5.title', label: 'Section 5 — titre', type: 'text', fallback: 'Article 5 – Tarifs' },
      {
        key: 'legal.cgv.s5.body',
        label: 'Section 5 — texte',
        type: 'textarea',
        fallback:
          "Les tarifs applicables sont ceux figurant sur le devis accepté par le client.\n\nLes tarifs sont établis en fonction des caractéristiques propres à chaque événement et notamment du nombre de participants, du lieu, de la durée, de la formule choisie, des cocktails sélectionnés et des prestations complémentaires demandées.\n\nLes éventuels frais de déplacement et prestations supplémentaires sont précisés sur le devis.\n\nLes tarifs ou mentions « à partir de » éventuellement présentés sur le site internet sont donnés à titre indicatif et ne constituent pas une offre contractuelle.",
      },
      { key: 'legal.cgv.s6.title', label: 'Section 6 — titre', type: 'text', fallback: 'Article 6 – Paiement' },
      {
        key: 'legal.cgv.s6.body',
        label: 'Section 6 — texte',
        type: 'textarea',
        fallback:
          "Sauf disposition particulière indiquée sur le devis ou la facture, le solde de la prestation est payable au plus tard le jour de la prestation, avant son commencement.\n\nLes moyens de paiement acceptés sont notamment :\nvirement bancaire ;\nchèque ;\nespèces.\n\nToute condition de paiement particulière figurant sur le devis accepté prévaut sur les présentes dispositions.",
      },
      { key: 'legal.cgv.s7.title', label: 'Section 7 — titre', type: 'text', fallback: 'Article 7 – Annulation par le client' },
      {
        key: 'legal.cgv.s7.body',
        label: 'Section 7 — texte',
        type: 'textarea',
        fallback:
          "Toute annulation doit être communiquée à Shake & Vibe par écrit.\n\nEn cas d'annulation par le client :\nPlus de 30 jours avant : l'acompte de 30 % reste acquis.\nEntre 30 et 8 jours avant : 50 % du montant total est dû.\n7 jours ou moins avant : 100 % du montant total est dû.\n\nLes sommes déjà versées sont imputées sur les montants restants éventuellement dus.\n\nCes conditions tiennent notamment compte de la réservation de la date, de l'organisation préalable de l'événement, des achats, des préparatifs et de l'impossibilité éventuelle pour Shake & Vibe d'accepter une autre prestation sur la date réservée.",
      },
      { key: 'legal.cgv.s8.title', label: 'Section 8 — titre', type: 'text', fallback: 'Article 8 – Report de la prestation' },
      {
        key: 'legal.cgv.s8.body',
        label: 'Section 8 — texte',
        type: 'textarea',
        fallback:
          "Toute demande de report formulée par le client est étudiée en fonction des disponibilités de Shake & Vibe.\n\nLe report n'est jamais automatique et doit faire l'objet d'un accord écrit entre les parties.\n\nLes éventuels frais déjà engagés ou différences tarifaires résultant du changement de date, de lieu ou des caractéristiques de la prestation pourront faire l'objet d'une facturation complémentaire.",
      },
      { key: 'legal.cgv.s9.title', label: 'Section 9 — titre', type: 'text', fallback: 'Article 9 – Modification de la prestation' },
      {
        key: 'legal.cgv.s9.body',
        label: 'Section 9 — texte',
        type: 'textarea',
        fallback:
          "Toute modification concernant notamment le nombre de participants, les horaires, le lieu, la formule choisie ou les prestations demandées doit être communiquée à Shake & Vibe dans les meilleurs délais.\n\nUne augmentation du nombre de participants ou l'ajout de prestations pourra entraîner l'établissement d'un devis complémentaire.\n\nUne diminution du nombre de participants devra intervenir avant que les achats et préparatifs correspondants aient été engagés. Dans le cas contraire, les montants déjà engagés ou facturés pourront rester dus.\n\nToute modification reste soumise à la faisabilité technique et aux disponibilités de Shake & Vibe.",
      },
      { key: 'legal.cgv.s10.title', label: 'Section 10 — titre', type: 'text', fallback: 'Article 10 – Dépassement des horaires' },
      {
        key: 'legal.cgv.s10.body',
        label: 'Section 10 — texte',
        type: 'textarea',
        fallback:
          "Les horaires prévus sont ceux mentionnés sur le devis accepté.\n\nToute demande de prolongation de la prestation est soumise à l'accord et aux disponibilités de Shake & Vibe.\n\nToute prolongation pourra donner lieu à une facturation complémentaire.",
      },
      { key: 'legal.cgv.s11.title', label: 'Section 11 — titre', type: 'text', fallback: 'Article 11 – Déplacements' },
      {
        key: 'legal.cgv.s11.body',
        label: 'Section 11 — texte',
        type: 'textarea',
        fallback:
          "Sauf indication contraire figurant sur le devis, les 20 premiers kilomètres sont inclus dans le tarif de la prestation.\n\nAu-delà, les éventuels frais de déplacement sont indiqués sur le devis.\n\nDes frais supplémentaires peuvent également être prévus lorsque les caractéristiques du déplacement l'exigent, notamment en cas de péages, stationnement ou déplacement nécessitant des conditions particulières. Ils sont alors précisés au client.",
      },
      { key: 'legal.cgv.s12.title', label: 'Section 12 — titre', type: 'text', fallback: 'Article 12 – Conditions météorologiques' },
      {
        key: 'legal.cgv.s12.body',
        label: 'Section 12 — texte',
        type: 'textarea',
        fallback:
          "Pour toute prestation organisée en extérieur, le client s'engage à prévoir une solution de repli adaptée permettant la réalisation de la prestation en cas de conditions météorologiques défavorables.\n\nLe matériel et le personnel de Shake & Vibe ne pourront être exposés à des conditions susceptibles de compromettre leur sécurité ou d'endommager le matériel.\n\nLorsque les conditions météorologiques empêchent la réalisation de la prestation dans des conditions normales et qu'aucune solution de repli adaptée n'a été prévue, Shake & Vibe et le client rechercheront prioritairement une solution amiable, notamment un éventuel report lorsque celui-ci est possible.\n\nÀ défaut de solution, les conditions d'annulation prévues aux présentes CGV pourront s'appliquer.",
      },
      { key: 'legal.cgv.s13.title', label: 'Section 13 — titre', type: 'text', fallback: 'Article 13 – Installation et accès' },
      {
        key: 'legal.cgv.s13.body',
        label: 'Section 13 — texte',
        type: 'textarea',
        fallback:
          "Le client s'engage à mettre à disposition de Shake & Vibe un emplacement adapté à la prestation réservée.\n\nIl garantit notamment un accès suffisant au lieu de l'événement pour permettre l'installation, le déchargement, le chargement et le démontage du matériel.\n\nLe client est également responsable de l'obtention des autorisations éventuellement nécessaires à l'organisation de l'événement et à l'installation de la prestation sur le lieu choisi.\n\nLes éventuels besoins techniques spécifiques sont précisés préalablement entre les parties.",
      },
      { key: 'legal.cgv.s14.title', label: 'Section 14 — titre', type: 'text', fallback: 'Article 14 – Sécurité' },
      {
        key: 'legal.cgv.s14.body',
        label: 'Section 14 — texte',
        type: 'textarea',
        fallback:
          "Shake & Vibe se réserve le droit de suspendre ou d'interrompre tout ou partie de la prestation lorsque les conditions de sécurité ne permettent plus d'assurer normalement le service ou présentent un risque pour les personnes ou le matériel.\n\nLe client s'engage à veiller au respect du matériel et du personnel de Shake & Vibe par les participants et autres prestataires présents lors de l'événement.",
      },
      {
        key: 'legal.cgv.s15.title',
        label: 'Section 15 — titre',
        type: 'text',
        fallback: 'Article 15 - Service et consommation de boissons alcoolisées',
      },
      {
        key: 'legal.cgv.s15.body',
        label: 'Section 15 — texte',
        type: 'textarea',
        fallback:
          "Dans le cadre des prestations comprenant le service de boissons alcoolisées, Shake & Vibe se réserve le droit de refuser de servir toute personne mineure, manifestement en état d'ébriété ou présentant un comportement susceptible de mettre en danger sa sécurité ou celle d'autrui.\nLe client demeure responsable du comportement de ses invités et participants ainsi que du respect des règles applicables à l'événement.\n\nLe service réalisé par Shake & Vibe est effectué dans le cadre et les limites de la prestation définie au devis et conformément à la réglementation applicable.",
      },
      { key: 'legal.cgv.s16.title', label: 'Section 16 — titre', type: 'text', fallback: 'Article 16 – Matériel' },
      {
        key: 'legal.cgv.s16.body',
        label: 'Section 16 — texte',
        type: 'textarea',
        fallback:
          "Le bar mobile, la verrerie, les équipements et plus généralement le matériel mis à disposition dans le cadre de la prestation demeurent la propriété de Shake & Vibe.\n\nLe client s'engage à respecter le matériel et à veiller, dans la mesure du raisonnable, à son respect par ses invités et les autres prestataires présents.\n\nEn cas de perte, casse, dégradation ou détérioration importante résultant d'une faute, d'une négligence ou d'un usage anormal imputable au client, à ses invités ou à ses prestataires, Shake & Vibe pourra facturer les frais nécessaires à la réparation ou au remplacement du matériel concerné.",
      },
      { key: 'legal.cgv.s17.title', label: 'Section 17 — titre', type: 'text', fallback: 'Article 17 – Obligations de Shake & Vibe' },
      {
        key: 'legal.cgv.s17.body',
        label: 'Section 17 — texte',
        type: 'textarea',
        fallback:
          "Shake & Vibe s'engage à mettre en œuvre les moyens humains et matériels nécessaires à la bonne exécution de la prestation conformément au devis accepté.\n\nShake & Vibe s'engage à réaliser la prestation avec professionnalisme et conformément aux caractéristiques convenues avec le client.",
      },
      { key: 'legal.cgv.s18.title', label: 'Section 18 — titre', type: 'text', fallback: 'Article 18 – Responsabilité' },
      {
        key: 'legal.cgv.s18.body',
        label: 'Section 18 — texte',
        type: 'textarea',
        fallback:
          "Shake & Vibe est tenue à une obligation de moyens dans l'exécution de ses prestations.\n\nSa responsabilité ne pourra être engagée pour les conséquences résultant notamment :\nd'informations incorrectes ou incomplètes transmises par le client ;\nd'un manquement du client à ses obligations ;\ndu comportement d'un participant ou d'un autre prestataire ;\nd'une impossibilité d'accès ou d'installation non signalée préalablement ;\nd'un événement relevant de la force majeure.\n\nAucune disposition des présentes CGV n'a pour objet d'exclure ou de limiter une responsabilité qui ne pourrait légalement être exclue ou limitée.",
      },
      { key: 'legal.cgv.s19.title', label: 'Section 19 — titre', type: 'text', fallback: 'Article 19 – Force majeure' },
      {
        key: 'legal.cgv.s19.body',
        label: 'Section 19 — texte',
        type: 'textarea',
        fallback:
          "Aucune des parties ne pourra être tenue responsable d'un manquement à ses obligations lorsque celui-ci résulte d'un événement de force majeure au sens de l'article 1218 du Code civil.\n\nDans une telle situation, Shake & Vibe et le client rechercheront prioritairement une solution amiable permettant, lorsque cela est possible, le report ou l'adaptation de la prestation.",
      },
      {
        key: 'legal.cgv.s20.title',
        label: 'Section 20 — titre',
        type: 'text',
        fallback: 'Article 20 – Droit de rétractation des consommateurs',
      },
      {
        key: 'legal.cgv.s20.body',
        label: 'Section 20 — texte',
        type: 'textarea',
        fallback:
          "Lorsque le contrat est conclu à distance ou hors établissement avec un client consommateur, celui-ci bénéficie du droit de rétractation prévu par le Code de la consommation lorsqu'il est applicable.\n\nToutefois, conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut notamment pas être exercé pour certaines prestations d'activités de loisirs devant être fournies à une date ou à une période déterminée.\n\nLorsque la prestation réservée auprès de Shake & Vibe relève d'une exception légale au droit de rétractation, le client en est informé.\n\nLes présentes dispositions ne privent en aucun cas le consommateur des droits impératifs qui lui sont reconnus par la législation applicable.",
      },
      { key: 'legal.cgv.s21.title', label: 'Section 21 — titre', type: 'text', fallback: "Article 21 – Droit à l'image" },
      {
        key: 'legal.cgv.s21.body',
        label: 'Section 21 — texte',
        type: 'textarea',
        fallback:
          "Shake & Vibe peut être amenée à réaliser des photographies ou vidéos de ses installations, cocktails, animations ou prestations à des fins de communication et de promotion de son activité.\n\nLe client peut s'opposer par écrit, avant la prestation, à l'utilisation d'images permettant de l'identifier personnellement ou concernant un événement dont il souhaite préserver le caractère privé.\n\nL'utilisation de l'image identifiable de toute personne reste soumise aux règles applicables au droit à l'image et au respect de la vie privée.",
      },
      {
        key: 'legal.cgv.s22.title',
        label: 'Section 22 — titre',
        type: 'text',
        fallback: 'Article 22 – Protection des données personnelles',
      },
      {
        key: 'legal.cgv.s22.body',
        label: 'Section 22 — texte',
        type: 'textarea',
        fallback:
          "Shake & Vibe collecte et traite les données personnelles nécessaires notamment à :\nla gestion des demandes de contact et de devis ;\nl'établissement des devis ;\nl'organisation et l'exécution des prestations ;\nla gestion de la relation client ;\nla facturation et la comptabilité ;\nle respect de ses obligations légales.\n\nLes données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées ainsi que pendant les durées imposées par les obligations légales applicables.\n\nConformément à la réglementation relative à la protection des données personnelles, les personnes concernées disposent notamment, selon les conditions applicables, de droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité.\n\nCes droits peuvent être exercés en contactant Shake & Vibe aux coordonnées indiquées sur le site internet.\n\nLes données personnelles ne sont ni vendues ni cédées à des tiers à des fins commerciales.\n\nDes informations complémentaires concernant le traitement des données personnelles sont disponibles dans la Politique de confidentialité du site internet.",
      },
      {
        key: 'legal.cgv.s23.title',
        label: 'Section 23 — titre',
        type: 'text',
        fallback: 'Article 23 – Retard de paiement – Clients professionnels',
      },
      {
        key: 'legal.cgv.s23.body',
        label: 'Section 23 — texte',
        type: 'textarea',
        fallback:
          "En cas de retard de paiement d'un client professionnel, les pénalités de retard prévues par les dispositions applicables du Code de commerce seront exigibles.\n\nUne indemnité forfaitaire de 40 € pour frais de recouvrement sera également due de plein droit pour chaque facture payée en retard, sans préjudice de toute indemnisation complémentaire pouvant être réclamée lorsque les frais de recouvrement effectivement engagés sont supérieurs à ce montant, dans les conditions prévues par la réglementation.",
      },
      {
        key: 'legal.cgv.s24.title',
        label: 'Section 24 — titre',
        type: 'text',
        fallback: 'Article 24 – Réclamations et médiation de la consommation',
      },
      {
        key: 'legal.cgv.s24.body',
        label: 'Section 24 — texte',
        type: 'textarea',
        fallback:
          "En cas de difficulté ou de réclamation concernant une prestation, le client est invité à contacter préalablement Shake & Vibe afin de rechercher une solution amiable.\n\nPour les clients consommateurs, conformément aux dispositions du Code de la consommation relatives à la médiation, le consommateur peut, après avoir adressé une réclamation écrite préalable à Shake & Vibe et en l'absence de résolution amiable du litige, recourir gratuitement au médiateur de la consommation dont relève Shake & Vibe.\n\nMédiateur de la consommation :\nNom : [À COMPLÉTER]\nAdresse : [À COMPLÉTER]\nSite internet : [À COMPLÉTER]\n\nCes informations seront complétées dès l'adhésion de Shake & Vibe à un dispositif de médiation de la consommation.",
      },
      {
        key: 'legal.cgv.s25.title',
        label: 'Section 25 — titre',
        type: 'text',
        fallback: 'Article 25 – Droit applicable et règlement des litiges',
      },
      {
        key: 'legal.cgv.s25.body',
        label: 'Section 25 — texte',
        type: 'textarea',
        fallback:
          "Les présentes Conditions Générales de Vente sont soumises au droit français.\n\nEn cas de différend, les parties s'engagent à rechercher prioritairement une solution amiable.\n\nPour les clients consommateurs, les règles légales impératives relatives à la compétence juridictionnelle demeurent applicables.\n\nPour les clients professionnels, les règles de compétence applicables seront celles prévues par la législation en vigueur, sauf clause particulière valablement convenue entre les parties.",
      },
      { key: 'legal.cgv.s26.title', label: 'Section 26 — titre', type: 'text', fallback: 'Informations sur Shake & Vibe' },
      {
        key: 'legal.cgv.s26.body',
        label: 'Section 26 — texte',
        type: 'textarea',
        fallback:
          "Nom commercial : Shake & Vibe\nSIRET : 990 511 636 00013\nRCS : RCS Toulon 990 511 636\nAdresse : 105 Chemin du Beausset au Castellet - Résidence les vents d'anges Bât A4 - 83330 LE BEAUSSET\nE-mail : contact.shakeandvibe@gmail.com\nTéléphone : 06 62 28 02 69",
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
