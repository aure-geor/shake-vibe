# Vue d'ensemble

## Le principe général

Le projet contient **deux applications distinctes** qui vivent dans le même dépôt Git, mais qui sont deux programmes séparés :

1. **Le frontend** (`src/`) — une application React qui tourne dans le navigateur du visiteur. C'est elle qui affiche les pages, gère la navigation, envoie le formulaire de devis, etc. Elle est compilée ("buildée") en fichiers HTML/CSS/JS statiques par un outil appelé Vite.
2. **Le backend** (`server/`) — un serveur Node.js (Express) qui tourne en permanence sur le VPS. Il fait deux choses : il sert les fichiers du frontend compilé, et il expose une API (`/api/...`) que le frontend interroge pour récupérer/modifier le contenu du site (textes, photos, devis, connexion admin...).

Ces deux applications communiquent uniquement via des requêtes HTTP (le frontend appelle `fetch('/api/...')`), jamais directement en code.

## Schéma du flux

```
Visiteur (navigateur)
      │
      │  HTTPS
      ▼
 Cloudflare (proxy + protection anti-bot + cache)
      │
      │  (uniquement Cloudflare peut atteindre le serveur, cf. Authenticated Origin Pulls)
      ▼
 nginx (sur le VPS, port 443)
      │
      │  reverse proxy vers 127.0.0.1:8081
      ▼
 Conteneur Docker "shake-vibe-app"  (Node.js + Express, port 3000 en interne)
      │
      ├── sert les fichiers statiques du frontend compilé (server/public/)
      ├── répond aux appels /api/... (lit/écrit dans SQLite, traite les images)
      └── sert les photos uploadées (/uploads/...)
      │
      ▼
 Fichier SQLite (server/data/db.sqlite, monté en volume Docker — survit aux redéploiements)
```

## Les deux "publics" du site

- **Le site public** (`/`, `/prestations`, `/nos-cocktails`, `/devis`, `/qui-sommes-nous`, pages légales) — visible par tout le monde, pas d'authentification.
- **L'espace admin** (`/admin`, `/admin/connexion`, `/admin/mot-de-passe-oublie`) — protégé par mot de passe. C'est le mini-CMS qui permet au client (Florian) de modifier lui-même tous les textes, images et l'ordre des photos, sans toucher au code.

## Stack technique en un coup d'œil

| Couche | Techno | Rôle |
|---|---|---|
| Frontend | React 19 + Vite 8 | Interface utilisateur (SPA — Single Page Application) |
| Routage frontend | React Router 7 | Navigation entre les pages sans recharger le navigateur |
| Style | Tailwind CSS 4 | Toutes les classes CSS du site |
| Composants UI | Base UI (`@base-ui/react`) + composants "shadcn-style" faits maison | Boutons, formulaires, menus, carrousels... |
| Formulaires | React Hook Form + Zod | Le formulaire de devis (validation incluse) |
| Backend | Node.js 22 + Express 4 | Serveur HTTP, API REST |
| Base de données | SQLite (via `better-sqlite3` + Drizzle ORM) | Tout le contenu dynamique du site |
| Traitement d'images | Sharp (+ libvips/libheif) | Redimensionnement et conversion en WebP à l'upload |
| Emails | Nodemailer (SMTP Zimbra OVH) | Envoi des demandes de devis et des codes de réinitialisation |
| Conteneurisation | Docker + Docker Compose | Isole l'application sur le VPS |
| Serveur web / reverse proxy | nginx | Reçoit le trafic HTTPS, le transmet au conteneur |
| CDN / protection | Cloudflare | Cache, protection anti-bot, certificat TLS |
| CI/CD | GitHub Actions | Build + déploiement automatique à chaque push sur `main` |
| Hébergement | VPS OVH (Debian 13) | Machine physique/virtuelle qui fait tourner tout ça |

## Ce que ce projet n'est PAS

- **Pas de framework SSR** (pas de Next.js, Remix, etc.) — le rendu se fait entièrement côté navigateur après chargement du JavaScript (voir [05-securite-et-seo.md](./05-securite-et-seo.md) pour l'implication SEO de ce choix).
- **Pas de base de données externe** (pas de Postgres/MySQL séparé) — SQLite est un simple fichier sur le disque du VPS, monté en volume Docker pour survivre aux redéploiements.
- **Pas de CDN d'images dédié** (pas de Cloudinary/S3) — les photos uploadées sont stockées directement sur le disque du VPS.

## Ce projet partage son VPS avec autre chose

Le même VPS héberge aussi une **API en production utilisée par de vraies montres Garmin** (`api-f1`), totalement indépendante de ce projet. Elle a son propre utilisateur système, son propre bloc nginx, son propre service — **ne jamais y toucher** en travaillant sur Shake & Vibe. Voir [04-infrastructure-et-deploiement.md](./04-infrastructure-et-deploiement.md) pour le détail de l'isolation entre les deux.
