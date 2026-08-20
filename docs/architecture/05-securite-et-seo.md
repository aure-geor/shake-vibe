# Sécurité et SEO

## Sécurité applicative

### En-têtes HTTP (Helmet, dans `server/index.js`)

Content-Security-Policy stricte, appliquée à toutes les réponses :

| Directive | Valeur | Effet |
|---|---|---|
| `default-src`, `script-src`, `style-src`, `font-src`, `connect-src` | `'self'` | Aucune ressource externe autorisée (scripts, styles, polices, appels réseau) — tout doit venir du domaine lui-même |
| `img-src` | `'self' data: blob:` | Images du domaine + images générées en mémoire (aperçus, etc.) |
| `object-src` | `'none'` | Bloque les plugins type Flash/Java |
| `frame-ancestors` | `'self'` | Le site ne peut pas être affiché dans une `<iframe>` d'un autre domaine (anti-clickjacking) |
| `upgrade-insecure-requests` | activé | Force le HTTPS pour toute ressource |

Autres en-têtes ajoutés par Helmet : `Strict-Transport-Security` (HSTS), `X-Content-Type-Options: nosniff`, `X-Frame-Options`, `Referrer-Policy: no-referrer`, `Cross-Origin-Opener-Policy`.

**Cas particulier — `Cross-Origin-Resource-Policy`** : mis à `cross-origin` uniquement sur les fichiers statiques servis (`/uploads`, `/assets`, `public/`), pour permettre aux outils d'aperçu de lien (réseaux sociaux) et aux navigateurs d'afficher les images en cross-origin. Le reste des réponses (API, HTML) garde la valeur stricte par défaut de Helmet (`same-origin`).

### Authentification admin

- Mot de passe haché avec **bcrypt** (jamais stocké en clair).
- Session par cookie **signé** (`SESSION_SECRET`), `httpOnly` (inaccessible en JavaScript, donc pas volable par une faille XSS), `secure` en production (HTTPS uniquement), durée de vie 12h.
- Un changement de mot de passe invalide immédiatement toute session ouverte avant ce changement.
- Réinitialisation par code à 6 chiffres à usage unique, envoyé uniquement à l'adresse de récupération pré-configurée (pas de champ email en saisie libre — empêche l'énumération de comptes, site mono-admin de toute façon).

### Limitation de débit (anti-brute-force / anti-spam)

Voir le tableau détaillé dans [03-backend-et-donnees.md](./03-backend-et-donnees.md) — appliqué sur la connexion admin, la réinitialisation de mot de passe, et le formulaire de devis. Comptabilisé par IP réelle du visiteur (`CF-Connecting-IP`, restituée par nginx — voir [04](./04-infrastructure-et-deploiement.md)), pas par IP de Cloudflare.

### Formulaire de devis

- Double validation : côté client (React Hook Form + Zod) **et** côté serveur (Zod, `server/src/lib/validation.js`) — ne jamais faire confiance uniquement à la validation navigateur.
- Champ **honeypot** invisible : un bot qui remplit ce champ (les vrais visiteurs ne le voient jamais) reçoit une fausse réponse de succès sans qu'aucune donnée ne soit traitée, sans révéler la détection.

### Validation des uploads

- Type de fichier vérifié (JPEG/PNG/WebP uniquement), taille max 8 Mo côté application (multer) + 10 Mo côté nginx.
- Toute image est re-traitée par Sharp (redimensionnement + conversion WebP) avant stockage — jamais le fichier brut envoyé par l'utilisateur qui est écrit sur le disque.

### Isolation de l'infrastructure

Voir [04-infrastructure-et-deploiement.md](./04-infrastructure-et-deploiement.md) : conteneur lié uniquement à `127.0.0.1`, utilisateur de déploiement sans sudo ni accès Docker, Cloudflare + Authenticated Origin Pulls (le serveur ne répond qu'aux requêtes qui passent réellement par Cloudflare), isolation totale avec l'API Garmin (`api-f1`) qui partage le même VPS.

### `robots.txt` (`public/robots.txt`)

- **Bloque explicitement** les robots connus d'entraînement de modèles IA : `GPTBot`, `ChatGPT-User`, `CCBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `PerplexityBot`, `Diffbot`, `meta-externalagent`, `FacebookBot`, `cohere-ai`, `Omgilibot`, `Timpibot`.
- **Autorise explicitement** `Googlebot` et `Bingbot` sur tout le site sauf `/admin` — indispensable pour le référencement, à ne surtout pas bloquer par erreur.
- Autorise tout le reste par défaut (`User-agent: *`), toujours sauf `/admin`.
- Référence l'emplacement du sitemap.

## SEO

### Balises meta dynamiques (`server/src/lib/seo.js`)

Contrairement à une SPA "pure", le `<title>`, la meta description, les balises Open Graph/Twitter Card et le JSON-LD sont **injectés côté serveur** avant l'envoi du HTML, selon l'URL demandée (objet `PAGES`). Un moteur de recherche ou un robot d'aperçu de lien voit donc immédiatement le bon titre/description sans avoir besoin d'exécuter le JavaScript de la page.

⚠️ **Limite connue** : seules ces balises `<head>` sont pré-rendues. Le **contenu visible de la page** (titres, paragraphes) reste, lui, entièrement généré côté client par React après chargement du JavaScript — le HTML brut envoyé au tout premier chargement ne contient aucun texte de contenu. Google gère ce cas (il exécute le JavaScript en seconde passe), mais avec un délai et moins de fiabilité qu'un rendu déjà présent dans le HTML initial. Un vrai rendu serveur (SSR) ou un pré-rendu résoudrait ça, mais représente un chantier à part entière, volontairement mis de côté pour l'instant.

### Données structurées (JSON-LD)

Un bloc `LocalBusiness` est injecté sur toutes les pages publiques (pas sur `/admin`) : nom, description, adresse, téléphone, TVA, zone de service (`France`), liens vers les réseaux sociaux.

### Gestion des pages inexistantes

Toute URL qui ne correspond à aucune route connue (`KNOWN_PATHS`, dérivé de `PAGES` + les routes admin) renvoie un vrai statut HTTP **404**, avec une page "introuvable" cohérente avec le design du site (`src/pages/NotFound.jsx`). Corrige un problème de "soft 404" (toute URL renvoyait 200 auparavant), déconseillé par la documentation officielle Google pour l'exploration/indexation.

### Sitemap (`public/sitemap.xml`)

Liste statique des pages publiques avec une priorité indicative par page (accueil = 1.0, pages légales = 0.3, etc.). Pas de génération automatique — à mettre à jour manuellement si une page est ajoutée ou retirée.

### Favicon

`public/favicon.png`, recomposé à partir de `og-image.jpg` (fond noir arrondi + logo) — remplace un ancien fichier `favicon.svg` qui n'avait en réalité aucun rapport avec l'identité visuelle du site (résidu de scaffolding jamais corrigé).

### Contenu textuel ciblant les mots-clés métier

Les expressions "barman privé" et "barman à domicile" ont été délibérément intégrées dans le texte **visible** des pages (titre de l'accueil, sous-titre de la page Prestations, texte de la page Qui sommes-nous) — et pas seulement dans les balises meta — car Google se base prioritairement sur le texte visible pour évaluer la pertinence d'une page sur une requête donnée.

### Ce qui reste hors du site (mais influence fortement le référencement local)

- **Fiche Google Business Profile** — existe déjà pour "Shake and Vibe" (note 5,0/5, 13 avis au moment de la rédaction), gérée directement par le client dans son propre tableau de bord Google, hors de portée du code.
- **Google Search Console** — pas encore mis en place à la date de rédaction ; permettrait de suivre l'indexation réelle et de soumettre le sitemap directement à Google.
