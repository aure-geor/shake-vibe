# Outils et versions

Versions exactes installées au 20 août 2026 (`package-lock.json`), pas les plages `^x.y.z` déclarées dans les `package.json`.

## Environnement d'exécution

| Outil | Version |
|---|---|
| Node.js (poste de développement) | 22.14.0 |
| Node.js (conteneur de production, `node:22-slim`) | 22.23.2 |
| Docker (VPS) | 29.7.1 |
| nginx (VPS) | 1.26.3 |
| Système du VPS | Debian GNU/Linux 13 (trixie) |
| Certbot (certificats TLS) | 4.0.0 |

## Frontend (`package.json` racine)

### Dépendances

| Paquet | Version | Rôle |
|---|---|---|
| `react` | 19.2.7 | Bibliothèque UI |
| `react-dom` | 19.2.7 | Rendu React dans le navigateur |
| `react-router-dom` | 7.18.2 | Routage côté client |
| `@base-ui/react` | 1.6.0 | Primitives UI accessibles (base des composants `components/ui/`) |
| `tailwindcss` | 4.3.3 | Framework CSS utilitaire |
| `@tailwindcss/vite` | 4.3.3 | Intégration Tailwind ↔ Vite |
| `tw-animate-css` | 1.4.0 | Animations CSS additionnelles pour Tailwind |
| `tailwind-merge` | 3.6.0 | Fusion de classes Tailwind sans conflit |
| `class-variance-authority` | 0.7.1 | Gestion des variantes de style des composants UI |
| `clsx` | 2.1.1 | Concaténation conditionnelle de classes CSS |
| `react-hook-form` | 7.82.0 | Gestion du formulaire de devis |
| `@hookform/resolvers` | 5.4.0 | Pont entre React Hook Form et Zod |
| `zod` | 4.4.3 | Validation de schémas (formulaire de devis, côté frontend) |
| `react-day-picker` | 10.0.1 | Sélecteur de date (formulaire de devis) |
| `date-fns` | 4.4.0 | Manipulation de dates |
| `embla-carousel-react` | 8.6.0 | Moteur des carrousels de photos |
| `embla-carousel-autoplay` | 8.6.0 | Plugin de défilement automatique pour Embla |
| `embla-carousel-fade` | 8.6.0 | Plugin de transition en fondu pour Embla |
| `lucide-react` | 1.25.0 | Bibliothèque d'icônes |
| `@fontsource-variable/geist` | 5.2.9 | Police "Geist" auto-hébergée (pas de dépendance à Google Fonts) |

### Dépendances de développement

| Paquet | Version | Rôle |
|---|---|---|
| `vite` | 8.1.5 | Outil de build et serveur de développement |
| `@vitejs/plugin-react` | 6.0.3 | Support React (JSX, Fast Refresh) pour Vite |
| `oxlint` | 1.74.0 | Linter JS/JSX (`npm run lint`) |
| `shadcn` | 4.13.1 | CLI utilisée pour générer les composants `components/ui/` |
| `@types/react` | 19.2.17 | Types TypeScript (autocomplétion IDE, projet en JS pur) |
| `@types/react-dom` | 19.2.3 | Idem pour `react-dom` |

## Backend (`server/package.json`)

| Paquet | Version | Rôle |
|---|---|---|
| `express` | 4.22.2 | Serveur HTTP / routage API |
| `better-sqlite3` | 11.10.0 | Driver SQLite natif (synchrone) |
| `drizzle-orm` | 0.45.2 | Constructeur de requêtes SQL typé |
| `helmet` | 7.2.0 | En-têtes de sécurité HTTP |
| `cors` | 2.8.6 | Gestion des requêtes cross-origin |
| `cookie-parser` | 1.4.7 | Lecture/écriture des cookies (session admin) |
| `express-rate-limit` | 7.5.1 | Limitation de débit par IP |
| `bcryptjs` | 2.4.3 | Hachage des mots de passe |
| `multer` | 2.2.0 | Réception des fichiers uploadés (multipart/form-data) |
| `sharp` | 0.35.3 | Traitement d'images (redimensionnement, conversion WebP) |
| `nodemailer` | 9.0.3 | Envoi d'emails via SMTP |
| `zod` | 4.4.3 | Validation de schémas côté serveur |
| `dotenv` | 16.6.1 | Chargement des variables d'environnement depuis `.env` |

### Bibliothèques internes à Sharp (traitement d'image), notables

| Composant | Version |
|---|---|
| `vips` (libvips, moteur de traitement d'image) | 8.18.3 |
| `heif` (libheif, décodage HEIC/HEIF) | 1.23.0 |
| `mozjpeg` (compression JPEG) | build 0826579 |
| `webp` (libwebp) | 1.6.0 |
| `png` (libpng) | 1.6.58 |

## CI/CD

| Outil | Version |
|---|---|
| `actions/checkout` (GitHub Actions) | v4 |
| `actions/setup-node` (GitHub Actions) | v4, configuré pour Node 22 |
| Runner GitHub Actions | `ubuntu-latest` |

## Comment mettre à jour ce tableau

```bash
# Frontend (racine du projet) :
node -e "const l=require('./package-lock.json'),p=require('./package.json'); for (const n of [...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})]) console.log(n, l.packages['node_modules/'+n]?.version)"

# Backend :
cd server && node -e "const l=require('./package-lock.json'),p=require('./package.json'); for (const n of Object.keys(p.dependencies||{})) console.log(n, l.packages['node_modules/'+n]?.version)"

# Versions système du VPS :
ssh -p 59498 debian@aureliengeor.ovh "sudo docker --version; sudo nginx -v; cat /etc/os-release | grep PRETTY; sudo docker exec shake-vibe-app node --version"
```
