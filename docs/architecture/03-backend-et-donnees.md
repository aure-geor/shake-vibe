# Backend (`server/`) et base de données

Serveur Node.js/Express, point d'entrée `server/index.js`. En production, il tourne dans un conteneur Docker et sert à la fois l'API et les fichiers du frontend compilé.

## `server/index.js` — le point d'entrée

Ce fichier fait, dans l'ordre :
1. Configure la sécurité HTTP (Helmet — en-têtes CSP, HSTS, etc. — voir [05-securite-et-seo.md](./05-securite-et-seo.md)).
2. Configure CORS (autorise uniquement l'origine définie par `CORS_ORIGIN`).
3. Branche toutes les routes `/api/*` (une par fichier dans `server/src/routes/`).
4. Sert les photos uploadées (`/uploads`) et les fichiers du build frontend (`/assets`, puis le reste de `public/`), avec des règles de cache différentes selon le type de fichier (voir tableau plus bas).
5. Pour toute autre route (`app.get('*', ...)`) : sert le HTML de la SPA (`index.html`), avec le `<title>`/meta/JSON-LD réinjectés dynamiquement selon la page demandée (voir `src/lib/seo.js`). Renvoie un vrai statut **404** si l'URL ne correspond à aucune page connue (`KNOWN_PATHS`), **200** sinon — évite le problème de "soft 404" pour les moteurs de recherche.
6. Initialise le compte admin s'il n'existe pas encore (`seedAdminIfNeeded`), puis démarre le serveur.

### Règles de cache par type de fichier

| Chemin | Durée de cache | Pourquoi |
|---|---|---|
| `/assets/*` (JS/CSS buildés par Vite) | 1 an, `immutable` | Le nom de fichier contient un hash du contenu (`index-XXXX.js`) — si le contenu change, le nom change aussi, donc un cache très long est sûr. |
| `/uploads/*` (photos) | 30 jours, `immutable` | ⚠️ Comme le nom de fichier ne change pas si on remplace une photo, un remplacement "en place" reste bloqué en cache jusqu'à expiration — toujours donner un nouveau nom de fichier à une photo modifiée. |
| Reste de `public/` (logo, favicon...) | 1 heure | Fichiers non hashés, remplaçables sans changer de nom, cache court. |

## `server/src/routes/` — les routes API

| Fichier | Base URL | Rôle |
|---|---|---|
| `quote.js` | `POST /api/quote` | Reçoit le formulaire de devis, valide (Zod), enregistre en base (`quote_requests`), envoie l'email au client. Protégé par rate limiting (5 requêtes / 15 min / IP) et un champ honeypot anti-bot. |
| `admin.js` | `/api/admin/*` | Connexion (`/login`), déconnexion (`/logout`), session courante (`/me`), réinitialisation de mot de passe en 2 étapes (`/password-reset/request` puis `/confirm`). |
| `content.js` | `/api/content` | `GET` = tous les textes personnalisés (clé → valeur). `PUT` (admin uniquement) = met à jour un ou plusieurs textes. |
| `siteImages.js` | `/api/site-images` | Gestion des emplacements photo fixes du site (liste dans `src/lib/siteImageSlots.js`) — un seul fichier par emplacement, remplaçable. |
| `galleries.js` | `/api/galleries/*` | Gestion des carrousels de photos génériques (liste dans `src/lib/gallerySections.js`) — upload, suppression, réordonnancement (`PATCH /reorder`), nombre de photos illimité. |
| `photos.js` | `/api/photos` | Route historique de gestion de photos individuelles (table `photos`), conservée mais plus utilisée par le frontend actuel. |
| `albums.js` | `/api/albums` | Route historique du système d'"albums" de réalisations (avant son remplacement par le carrousel générique de `galleries.js`). Toujours montée pour préserver les données existantes, mais plus utilisée par aucune page publique. |

## `server/src/lib/` — logique métier

- **`auth.js`** — vérification email/mot de passe (bcrypt), création/lecture du cookie de session signé (`sv_session`, httpOnly, 12h), middleware `requireAdmin` qui protège les routes admin. Une session émise avant un changement de mot de passe est automatiquement invalidée.
- **`passwordReset.js`** — génère un code à 6 chiffres (haché en SHA-256 avant stockage), valable 15 minutes, à usage unique.
- **`mailer.js`** — configure le transport SMTP (Nodemailer) et envoie deux types d'email : la notification de nouvelle demande de devis, et le code de réinitialisation de mot de passe.
- **`validation.js`** — schémas Zod côté serveur (miroir de `src/lib/quoteSchema.js` côté frontend — ne jamais faire confiance uniquement à la validation client).
- **`uploads.js`** — configuration de Multer (upload en mémoire, 8 Mo max, JPEG/PNG/WebP uniquement) et fonction `saveResizedPhoto()` qui redimensionne (max 2000×2000, sans agrandir) et convertit toute image uploadée en WebP via Sharp. Si le fichier est un HEIC/HEIF dont la structure dépasse la limite de sécurité de libheif, renvoie un message d'erreur explicite plutôt que le message générique.
- **`seo.js`** — construit dynamiquement les balises `<title>`, meta description, Open Graph, Twitter Card et JSON-LD (`LocalBusiness`) selon la page demandée. Exporte aussi `KNOWN_PATHS`, la liste des routes valides du site, utilisée par `index.js` pour distinguer une vraie page (200) d'une page inexistante (404).
- **`gallerySections.js`** — liste fixe des sections de galerie disponibles (`prestations`, `cocktails-menu`, `cocktails-vin`). L'admin ne peut pas en créer de nouvelles, seulement gérer les photos de celles qui existent.
- **`siteImageSlots.js`** — liste fixe des emplacements photo individuels du site (hero, portrait, cartes de prestations, etc.).
- **`seedAdmin.js`** — à la toute première exécution du serveur (aucun admin en base), crée le compte administrateur à partir des variables d'environnement `ADMIN_EMAIL` / `ADMIN_INITIAL_PASSWORD` / `ADMIN_RECOVERY_EMAIL`.

## `server/src/middleware/rateLimit.js`

Trois limiteurs de débit (`express-rate-limit`), tous par IP réelle du visiteur (voir `trust proxy` + en-tête `CF-Connecting-IP` dans le nginx, [04](./04-infrastructure-et-deploiement.md)) :

| Limiteur | Fenêtre | Limite | Utilisé sur |
|---|---|---|---|
| `quoteLimiter` | 15 min | 5 requêtes | `POST /api/quote` |
| `loginLimiter` | 15 min | 10 requêtes | `POST /api/admin/login` |
| `passwordResetLimiter` | 1 heure | 5 requêtes | les deux routes de réinitialisation |

## `server/scripts/migrate-prestations.js`

Script **ponctuel**, à lancer manuellement une seule fois (`node scripts/migrate-prestations.js`), jamais au démarrage du serveur. A servi à importer l'ancien portfolio de réalisations (6 lieux, codés en dur dans le script) dans la base de données et le dossier `uploads/`, au moment de la mise en place du système d'albums. Ne rien y toucher aujourd'hui — il ne s'exécute que si la table `albums` est vide, donc il est déjà "consommé".

## Base de données — `server/src/db/`

**SQLite**, un simple fichier (`db.sqlite`) sur le disque, pas de serveur de base de données séparé. Accès via `better-sqlite3` (driver natif synchrone) + `drizzle-orm` (constructeur de requêtes typé, protège contre l'injection SQL par construction).

- **`client.js`** — ouvre la connexion SQLite, active le mode `WAL` (meilleure gestion de la concurrence lecture/écriture) et les clés étrangères, et surtout : **crée toutes les tables si elles n'existent pas encore** (`CREATE TABLE IF NOT EXISTS`) à chaque démarrage du serveur. Contient aussi quelques `ALTER TABLE` protégés par `try/catch` pour ajouter des colonnes apparues après la création initiale de certaines bases (migrations légères, pas d'outil de migration dédié).
- **`schema.js`** — la définition Drizzle de chaque table (les mêmes tables que dans `client.js`, mais sous forme d'objets JS utilisables dans les requêtes).

### Les tables

| Table | Sert à | Toujours utilisée aujourd'hui ? |
|---|---|---|
| `admin_users` | Le compte administrateur (un seul) | ✅ |
| `password_reset_codes` | Codes de réinitialisation de mot de passe à usage unique | ✅ |
| `site_content` | Tous les textes personnalisés par l'admin (clé → valeur) | ✅ |
| `gallery_photos` | Photos des carrousels génériques (Prestations, Cocktails × 2) | ✅ |
| `site_images` | Les emplacements photo fixes du site | ✅ |
| `quote_requests` | Copie de chaque demande de devis reçue (en plus de l'email envoyé) | ✅ |
| `photos` | Ancien système de photos individuelles | ⚠️ Historique, plus utilisée par le frontend |
| `albums` / `album_photos` | Ancien système de "réalisations" (fiches lieu/tag/description) | ⚠️ Historique, données conservées mais plus affichées publiquement |
| `news_posts` | Système d'actualités | ⚠️ Table créée dès le départ, jamais implémentée côté frontend |

## Variables d'environnement (`server/.env`)

Fichier **jamais commité** (listé dans `.gitignore`), présent uniquement sur le VPS dans `/srv/shake-vibe/.env`. Modèle de référence : `server/.env.example`.

| Variable | Rôle |
|---|---|
| `PORT` | Port d'écoute interne du serveur Node (3000 dans le conteneur) |
| `DATA_DIR` | Dossier de stockage des données (base SQLite + uploads) — `/app/data` dans le conteneur, monté depuis `/srv/shake-vibe/data` sur l'hôte |
| `NODE_ENV` | `production` en prod (active le cookie de session en mode `secure`) |
| `SESSION_SECRET` | Clé de signature des cookies de session admin |
| `ADMIN_EMAIL` / `ADMIN_INITIAL_PASSWORD` / `ADMIN_RECOVERY_EMAIL` | Utilisées une seule fois, à la création du compte admin s'il n'existe pas encore |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Identifiants du serveur mail (Zimbra OVH) |
| `QUOTE_TO_EMAIL` / `QUOTE_FROM_EMAIL` | Adresses d'envoi/réception des demandes de devis |
| `CORS_ORIGIN` | Origine autorisée par CORS (`https://shakeandvibe.com` en prod) |
