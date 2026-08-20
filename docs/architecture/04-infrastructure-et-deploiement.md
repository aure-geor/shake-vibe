# Infrastructure et déploiement

## Le serveur (VPS)

| Élément | Valeur |
|---|---|
| Hébergeur | OVH |
| Nom d'hôte | `vps-2b7ae7c2` |
| Système | Debian GNU/Linux 13 (trixie) |
| Accès SSH | `ssh -p 59498 debian@aureliengeor.ovh` (port non standard) |
| Domaine | `shakeandvibe.com` |

⚠️ **Ce VPS héberge aussi une API en production pour de vraies montres Garmin** (`api-f1`), totalement indépendante. Elle a son propre utilisateur système (`apif1`), son propre bloc nginx, son propre service systemd, son propre dossier (`/srv/api-f1/`). **Ne jamais y toucher.** Après toute modification touchant nginx/ufw/systemd, vérifier que `curl https://aureliengeor.ovh/f1-garmin` répond toujours `200`.

## Docker

Le site tourne dans un conteneur, défini par deux fichiers sur le VPS (pas dans le dépôt Git — le dépôt ne contient que le code applicatif, l'infra est configurée à la main sur le serveur) :

**`/srv/shake-vibe/compose.yaml`**
```yaml
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
    image: shake-vibe-app:latest
    container_name: shake-vibe-app
    restart: unless-stopped
    ports:
      - "127.0.0.1:8081:3000"
    volumes:
      - ./data:/app/data
    env_file:
      - .env
```

Points clés :
- Le port `8081` n'est exposé **que sur `127.0.0.1`** (pas `0.0.0.0`) — le conteneur n'est joignable que depuis la machine elle-même, jamais directement depuis internet. Seul nginx peut lui parler.
- `./data:/app/data` — la base SQLite et les photos uploadées vivent **en dehors du conteneur**, sur le disque de l'hôte (`/srv/shake-vibe/data/`). Un redéploiement (qui recrée le conteneur) ne perd donc jamais ces données.
- `restart: unless-stopped` — le conteneur redémarre automatiquement si le VPS reboote ou si le processus plante.

**`/srv/shake-vibe/app/Dockerfile`**
```dockerfile
FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
```

Image de base `node:22-slim`, installe uniquement les dépendances de production (`--omit=dev`), lance directement `node index.js` (pas de build à faire ici — le build du frontend a déjà eu lieu côté GitHub Actions avant l'envoi).

## nginx

Bloc de configuration dédié : `/etc/nginx/sites-available/shake-vibe` (fichier séparé de celui d'`api-f1`, aucun risque de collision).

Rôle : reçoit le trafic HTTPS sur le port 443, le transmet en `proxy_pass` vers `http://127.0.0.1:8081` (le conteneur).

Points notables de la config :
- **`client_max_body_size 10m`** — augmenté depuis la valeur par défaut de nginx (1 Mo), pour permettre l'upload de photos jusqu'à 10 Mo (cohérent avec la limite de 8 Mo déjà appliquée côté Multer/Express).
- **Authenticated Origin Pulls** (`ssl_client_certificate` + `ssl_verify_client on`) — nginx exige un certificat client que seul Cloudflare peut présenter. Une connexion qui tenterait d'atteindre le serveur directement par son IP (en contournant Cloudflare) est rejetée dès la poignée de main TLS.
- **`set_real_ip_from` (liste des plages IP Cloudflare) + `real_ip_header CF-Connecting-IP`** — sans ça, nginx et l'application ne verraient que les IP de Cloudflare pour toutes les requêtes (utile pour le rate limiting par IP réelle et les logs).
- **Certificat TLS** géré automatiquement par Certbot (Let's Encrypt), renouvellement automatique via un cron déjà en place sur le système (`/etc/cron.d/certbot`).

## Cloudflare

Domaine `shakeandvibe.com` proxifié via Cloudflare (nuage orange) :
- **Cache** des ressources statiques (JS/CSS/images) selon les en-têtes `Cache-Control` envoyés par le serveur.
- **Bot Fight Mode** activé — couche de protection anti-scraping/anti-bot. Injecte un petit script de détection dans le HTML (visible en inspectant la page, sans impact réel sur le fonctionnement du site ni sur le SEO).
- **DNS** : enregistrements `A` pour `shakeandvibe.com` et `www`, MX/SPF/DKIM en "DNS only" (nuage gris, jamais proxifiés — sinon la messagerie Zimbra cesserait de fonctionner).

## Stockage des photos

Les photos uploadées via l'admin sont stockées sur le disque du VPS, dans `/srv/shake-vibe/data/uploads/` (monté dans le conteneur en `/app/data/uploads`). Chaque fichier est nommé `{timestamp}-{hash aléatoire}.webp`. **Aucune purge automatique** — une photo supprimée par l'admin est supprimée du disque en même temps que sa ligne en base, mais rien ne nettoie les fichiers tout seul en dehors de ça (décision volontaire, gestion 100% manuelle par le client).

## Sauvegardes

Deux mécanismes actuellement en place :
1. **Sauvegarde automatique avant chaque déploiement** — le script `deploy-watch.sh` (voir plus bas) archive tout le dossier applicatif (`/root/shake-vibe-backups/app-{date}-{ancien-sha}.tar.gz`) avant de reconstruire, et ne garde que les 15 dernières.
2. **Aucune sauvegarde régulière programmée et hors VPS** à ce jour — sujet explicitement mis de côté par le client ("on verra plus tard, pour l'instant je n'ai pas de solution de stockage externe"). Une sauvegarde qui reste sur la même machine qu'elle protège ne protège de rien en cas de panne du VPS — à traiter quand une solution de stockage externe sera choisie.

## Le pipeline de déploiement, de bout en bout

```
git push sur main
      │
      ▼
GitHub Actions (.github/workflows/deploy.yml)
      │  1. npm ci && npm run build        (compile le frontend React → dist/)
      │  2. Assemble un paquet de déploiement :
      │       - le code du serveur (server/, sans node_modules)
      │       - le frontend compilé, copié dans deploy-payload/public/
      │       - un fichier DEPLOY_SHA contenant le SHA du commit
      │  3. Vérifie que le paquet n'est pas suspicieusement vide/petit
      │  4. Envoie tout par rsync vers le VPS
      ▼
Utilisateur système `deploy-shake-vibe` sur le VPS
      │  - PAS de sudo, PAS dans le groupe docker
      │  - clé SSH restreinte par `rrsync` : ne peut écrire QUE dans /srv/shake-vibe/app
      ▼
Fichiers déposés dans /srv/shake-vibe/app/ (dont le nouveau DEPLOY_SHA)
      │
      ▼
Cron root, toutes les minutes : /srv/shake-vibe/deploy-watch.sh
      │  1. Compare DEPLOY_SHA (nouveau) à .last-deployed-sha (dernier appliqué)
      │  2. Si différent : sauvegarde l'ancien app/ dans /root/shake-vibe-backups/
      │  3. docker compose build app  (reconstruit l'image avec le nouveau code)
      │  4. docker compose up -d app  (recrée le conteneur)
      │  5. Si succès : met à jour .last-deployed-sha
      ▼
Nouveau conteneur en ligne, ancien conteneur remplacé
```

### Pourquoi cette architecture en deux temps (rsync puis cron) plutôt qu'un déploiement direct par SSH depuis GitHub Actions ?

**Sécurité par séparation des privilèges.** Le secret GitHub (`VPS_DEPLOY_SSH_KEY`) donne accès à un utilisateur qui ne peut *que* déposer des fichiers dans un dossier précis — même si ce secret fuitait, il ne donnerait ni accès root, ni accès Docker, ni accès à quoi que ce soit d'autre sur le VPS (notamment pas à `api-f1`). C'est le cron root, qui ne dépend d'aucun secret externe, qui fait le travail privilégié (build Docker) — et seulement après avoir vérifié que les fichiers reçus sont bien légitimes.

### Fichiers clés de ce pipeline

| Fichier | Où | Rôle |
|---|---|---|
| `.github/workflows/deploy.yml` | Dépôt Git | Le workflow GitHub Actions décrit ci-dessus |
| `/srv/shake-vibe/deploy-watch.sh` | VPS (root) | Le script cron qui détecte un nouveau déploiement et reconstruit le conteneur |
| `/srv/shake-vibe/.last-deployed-sha` | VPS (root) | Mémorise le dernier SHA effectivement appliqué |
| `/srv/shake-vibe/app/DEPLOY_SHA` | VPS (déposé par rsync) | Le SHA du dernier commit envoyé |
| `/var/log/shake-vibe-deploy.log` | VPS | Journal de chaque exécution de `deploy-watch.sh` (succès/échec, sortie du build Docker) |

### Vérifier qu'un déploiement est bien passé

```bash
# Sur le VPS :
sudo cat /srv/shake-vibe/app/DEPLOY_SHA        # dernier SHA reçu
sudo cat /srv/shake-vibe/.last-deployed-sha    # dernier SHA effectivement appliqué
# Les deux doivent être identiques.

# Depuis n'importe où :
curl -I https://shakeandvibe.com                    # doit répondre 200
curl -I https://aureliengeor.ovh/f1-garmin           # doit rester 200 (Garmin, jamais impacté)
```

Si le cron n'a pas encore tourné (il tourne chaque minute), on peut le déclencher manuellement :
```bash
sudo bash /srv/shake-vibe/deploy-watch.sh
```
