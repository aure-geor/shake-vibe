# Architecture du site Shake & Vibe

Documentation technique complète du site shakeandvibe.com : ce que fait chaque fichier, comment tout s'assemble, quelle configuration tourne en production, et avec quels outils.
le 20 août 2026 — à mettre à jour si l'architecture change significativement (nouvelle dépendance majeure, nouvelle table, changement d'hébergeur, etc.). Ce n'est pas un document généré automatiquement : il faudra le retoucher à la main après une évolution importante.

## Comment lire cette documentation

| Fichier | Contenu |
|---|---|
| [01-vue-ensemble.md](./01-vue-ensemble.md) | Le principe général : deux applications (site public + API), qui parle à qui, stack technique en un coup d'œil |
| [02-frontend.md](./02-frontend.md) | Le site que voient les visiteurs et l'admin : chaque page, chaque composant, chaque fichier de `src/` |
| [03-backend-et-donnees.md](./03-backend-et-donnees.md) | Le serveur (API), les routes, et la base de données : chaque fichier de `server/` |
| [04-infrastructure-et-deploiement.md](./04-infrastructure-et-deploiement.md) | Le VPS, Docker, nginx, Cloudflare, et la chaîne de déploiement automatique |
| [05-securite-et-seo.md](./05-securite-et-seo.md) | Les mesures de sécurité en place et la configuration SEO |
| [06-outils-et-versions.md](./06-outils-et-versions.md) | La liste précise de tous les outils/librairies utilisés, avec leur version exacte |

## Résumé en une phrase

Le site est une **application React (SPA)** servie par un **serveur Express** qui héberge aussi son **API** et sa **base de données SQLite**, le tout tournant dans un **conteneur Docker** sur un **VPS OVH**, derrière **Cloudflare** (protection/CDN), avec un **déploiement automatique** à chaque `git push` sur `main`.
