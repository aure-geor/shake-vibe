# Frontend (`src/`)

Application React 19, compilée par Vite. Point d'entrée : `index.html` → `src/main.jsx` → `src/App.jsx`.

## Fichiers racine

| Fichier | Rôle |
|---|---|
| `index.html` | Le squelette HTML de base. Contient le favicon, la description meta par défaut, et le `<div id="root">` où React s'attache. Le titre/description réels sont réinjectés côté serveur par `server/src/lib/seo.js` selon la page demandée. |
| `src/main.jsx` | Point d'entrée JS : monte le composant `App` dans le DOM. |
| `src/App.jsx` | Définit toutes les routes du site (React Router). Charge la plupart des pages en "lazy loading" (`React.lazy`) pour ne télécharger le code d'une page qu'au moment où on la visite — réduit la taille du chargement initial. |
| `src/index.css` | Feuille de style globale : import de Tailwind, variables de couleurs (`--gold`, etc.), police (Geist). |
| `vite.config.js` | Configuration du build : plugin React, plugin Tailwind, alias `@` → `src/`, proxy `/api` et `/uploads` vers `localhost:3000` en développement local. |

## Routes définies dans `App.jsx`

| URL | Page | Fichier |
|---|---|---|
| `/` | Accueil | `pages/Home.jsx` |
| `/qui-sommes-nous` | À propos de Florian | `pages/About.jsx` |
| `/prestations` | Carrousel de réalisations | `pages/Prestations.jsx` |
| `/nos-cocktails` | Carte des cocktails | `pages/Cocktails.jsx` |
| `/devis` | Formulaire de demande de devis | `pages/Devis.jsx` |
| `/mentions-legales` | Mentions légales | `pages/MentionsLegales.jsx` |
| `/cgv` | Conditions générales de vente | `pages/CGV.jsx` |
| `/politique-de-confidentialite` | Politique de confidentialité (RGPD) | `pages/PolitiqueConfidentialite.jsx` |
| `*` (tout le reste) | Page "introuvable" (vrai statut HTTP 404) | `pages/NotFound.jsx` |
| `/admin/connexion` | Connexion admin | `pages/admin/AdminLogin.jsx` |
| `/admin/mot-de-passe-oublie` | Réinitialisation du mot de passe admin | `pages/admin/ResetPassword.jsx` |
| `/admin` | Tableau de bord admin (CMS) | `pages/admin/AdminDashboard.jsx` |

Les pages du site public (hors admin) sont enveloppées dans `components/layout/Layout.jsx`, qui ajoute l'en-tête et le pied de page communs.

## `src/pages/` — les pages

- **`Home.jsx`** — page d'accueil : hero (titre + image + boutons), section "Notre approche" (6 items), section "Ce que nous proposons" (4 cartes de prestations : mariages, événements privés, séminaires, ateliers).
- **`About.jsx`** — page "Qui sommes-nous" : portrait + histoire de Florian, frise de son parcours (4 étapes : Mexique, Brésil, Belize, Caraïbes), bandeau de clôture avec photo de fond.
- **`Prestations.jsx`** — carrousel de photos de réalisations passées (section `prestations` de la galerie générique, voir plus bas), avec un bouton vers Instagram sous le carrousel.
- **`Cocktails.jsx`** — cartes des 3 expériences cocktails (élégante/festive/sur-mesure), carrousel de la carte, section "offre pour les domaines" (cocktails aux vins) avec un second carrousel.
- **`Devis.jsx`** — le formulaire de demande de devis complet (coordonnées, détails de l'évènement, préférences cocktails). Utilise React Hook Form + Zod (`src/lib/quoteSchema.js`) pour la validation, envoie via `src/lib/sendQuote.js`.
- **`MentionsLegales.jsx` / `CGV.jsx` / `PolitiqueConfidentialite.jsx`** — les trois pages légales. Toutes les trois suivent le même schéma : une liste de sections numérotées, chaque section ayant un titre et un corps de texte éditables depuis l'admin (clés `legal.mentions.sN`, `legal.cgv.sN`, `legal.privacy.sN`).
- **`NotFound.jsx`** — page affichée pour toute URL qui ne correspond à aucune route, avec liens de retour vers l'accueil et le devis.
- **`admin/AdminLogin.jsx`** — formulaire email + mot de passe.
- **`admin/ResetPassword.jsx`** — flux "mot de passe oublié" en deux étapes : demande d'un code à 6 chiffres envoyé par email, puis saisie du code + nouveau mot de passe.
- **`admin/AdminDashboard.jsx`** — page conteneur du CMS : affiche un menu d'onglets (Contenu / Galerie / Emplacements / Photos) et le panneau correspondant.

## `src/components/layout/` — ossature commune

- **`Layout.jsx`** — enveloppe toutes les pages publiques : en-tête + `<Outlet />` (contenu de la page active) + pied de page.
- **`SiteHeader.jsx`** — barre de navigation. Contient le logo, les liens vers les pages, le bouton "Demander un devis", et un menu mobile (`Sheet`, composant tiroir) affiché sous 768px de large (`md:hidden` / `md:flex`).
- **`SiteFooter.jsx`** — logo, liens de navigation, réseaux sociaux, copyright, liens vers les pages légales.
- **`SocialLinks.jsx`** — icônes Instagram/TikTok, liens éditables via l'admin (clés `links.instagram`, `links.tiktok`).
- **`ScrollToTop.jsx`** — remet la page en haut à chaque changement de route (sans ça, React Router garde la position de scroll précédente).

## `src/components/` — composants réutilisables

- **`PhotoCarousel.jsx`** — le carrousel de photos générique utilisé partout (Prestations, Cocktails × 2). Basé sur `embla-carousel-react`. Inclut une lightbox intégrée (clic sur une photo → agrandissement en `Dialog` avec navigation précédent/suivant).
- **`icons/SocialIcons.jsx`** — icônes SVG Instagram/TikTok/Bluesky faites maison (pas de dépendance externe pour ça).
- **`devis/FormField.jsx`** — wrapper label + erreur pour un champ de formulaire.
- **`devis/DureeField.jsx`** — sélecteur de durée de prestation (jours/heures/minutes) dans un popover.
- **`devis/HeureDebutField.jsx`** — sélecteur d'heure de début dans un popover.

## `src/components/ui/` — bibliothèque de composants (style shadcn)

Composants génériques bas-niveau construits sur `@base-ui/react`, réutilisés partout dans l'app : `button`, `input`, `label`, `textarea`, `checkbox`, `radio-group`, `select`, `dialog`, `sheet`, `popover`, `calendar`, `carousel`, `separator`, `badge`. Chacun est un petit fichier autonome qui applique les styles Tailwind du thème (couleur `gold`, fond noir) par-dessus le comportement de `@base-ui/react`.

## `src/components/admin/` — le CMS

- **`ContenuPanel.jsx`** — éditeur de texte générique. Lit `CONTENT_SCHEMA` (voir `lib/editableContent.js`) et génère automatiquement un formulaire pour chaque champ déclaré, regroupé par page. Aucune ligne de code à ajouter ici pour qu'un nouveau texte devienne éditable : il suffit de l'ajouter au schéma.
- **`GaleriePanel.jsx`** — gestion des carrousels de photos (galeries génériques). Upload, suppression, et réordonnancement par glisser-déposer (drag & drop HTML5natif) pour chaque section déclarée dans `GALLERY_SECTIONS` côté serveur.
- **`EmplacementsPanel.jsx`** — gestion des "emplacements photo" fixes du site (le portrait de Florian, l'image de fond du hero, etc. — voir `SITE_IMAGE_SLOTS` côté serveur). Chaque emplacement a un seul fichier assignable + un texte alternatif.
- **`PhotosPanel.jsx`** — panneau historique de gestion de photos individuelles (table `photos`), conservé mais plus utilisé par aucune page publique actuellement.

## `src/hooks/` — logique réutilisable

- **`useSiteContent.js`** — retourne une fonction `t(clé)` qui renvoie le texte personnalisé par l'admin, ou le texte par défaut (`CONTENT_FALLBACKS`) si rien n'a été personnalisé. Va chercher `/api/content` au premier rendu, avec mise en cache mémoire (voir `lib/dataCache.js`) pour ne pas rafraîchir à vide à chaque changement de page.
- **`useSiteImages.js`** — même principe pour les emplacements photo fixes (`/api/site-images`).
- **`useGallery.js`** — même principe pour un carrousel donné (`/api/galleries/:section`).
- **`useAdminSession.js`** — vérifie si l'admin est connecté (`/api/admin/me`), utilisé pour protéger `/admin`.

## `src/lib/` — utilitaires

- **`api.js`** — petit wrapper autour de `fetch` : gère le JSON automatiquement, inclut les cookies (`credentials: 'include'`), lève une erreur lisible en cas d'échec.
- **`dataCache.js`** — cache mémoire partagé entre les pages de la session en cours. Évite de réafficher un état vide à chaque navigation en attendant la réponse de l'API (voir explication dans le README de la conversation d'origine : ajouté pour corriger une lenteur perçue à la navigation).
- **`editableContent.js`** — **fichier central du CMS texte**. Définit `CONTENT_SCHEMA`, la liste de tous les textes éditables du site (clé, libellé affiché dans l'admin, type de champ, texte par défaut). C'est ce fichier qui pilote à la fois ce que l'admin peut éditer (`ContenuPanel.jsx`) et ce qui s'affiche par défaut sur le site (`CONTENT_FALLBACKS`, dérivé automatiquement du même schéma).
- **`quoteSchema.js`** — schéma de validation Zod du formulaire de devis (frontend), + les listes de valeurs possibles (types d'évènement, tranches de nombre de personnes, etc.).
- **`sendQuote.js`** — envoie la demande de devis à l'API (`POST /api/quote`), formate la date au format attendu par le serveur.
- **`assets.js`** — construit le chemin correct vers un fichier statique du dossier `public/` (préfixe la base Vite).
- **`utils.js`** — fonction `cn()` (fusion de classes Tailwind sans conflit, via `clsx` + `tailwind-merge`) utilisée dans quasiment tous les composants UI.

## `src/data/`

- **`services.js`** — les 4 cartes de prestations affichées sur l'accueil (id, titre, description). Note : les titres/descriptions réels affichés proviennent en fait de `editableContent.js` (clés `services.*`) — ce fichier sert de valeurs par défaut/référence de structure.

## `public/` — fichiers statiques servis tels quels

| Fichier | Usage |
|---|---|
| `logo.png` | Logo complet (palmiers + rayons + texte "SHAKE & VIBE"), utilisé dans l'en-tête, le pied de page, les pages de connexion admin. |
| `favicon.png` | Icône affichée dans l'onglet du navigateur et les résultats Google — recomposée à partir de `og-image.jpg` (fond noir arrondi). |
| `og-image.jpg` | Image affichée lors du partage d'un lien du site sur les réseaux sociaux (Open Graph). |
| `sunburst.png` | Le motif "rayons de soleil" seul, utilisé comme séparateur décoratif sur l'accueil. |
| `banniere.png` | Image de bannière (usage ponctuel). |
| `carte-vins.jpg` | PDF/image de la carte des vins téléchargeable depuis la page Cocktails. |
| `icons.svg` | Sprite SVG des icônes de réseaux sociaux (symbols réutilisés par `SocialIcons.jsx`). |
| `robots.txt` | Règles d'exploration pour les moteurs de recherche (voir [05-securite-et-seo.md](./05-securite-et-seo.md)). |
| `sitemap.xml` | Plan du site pour les moteurs de recherche. |
| `lieu/` | Anciennes photos de prestations (historique, utilisées par le script de migration ponctuel `server/scripts/migrate-prestations.js`). |
