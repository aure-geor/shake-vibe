import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { seedAdminIfNeeded } from './src/lib/seedAdmin.js'
import { quoteRouter } from './src/routes/quote.js'
import { photosRouter } from './src/routes/photos.js'
import { albumsRouter } from './src/routes/albums.js'
import { siteImagesRouter } from './src/routes/siteImages.js'
import { galleriesRouter } from './src/routes/galleries.js'
import { adminRouter } from './src/routes/admin.js'
import { contentRouter } from './src/routes/content.js'
import { UPLOADS_DIR } from './src/db/client.js'
import { buildHead } from './src/lib/seo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// Fait confiance au premier proxy (nginx) pour lire l'IP réelle du visiteur dans X-Forwarded-For.
app.set('trust proxy', 1)

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'blob:'],
        fontSrc: ["'self'"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
  })
)
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser(process.env.SESSION_SECRET))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/quote', quoteRouter)
app.use('/api/photos', photosRouter)
app.use('/api/albums', albumsRouter)
app.use('/api/site-images', siteImagesRouter)
app.use('/api/galleries', galleriesRouter)
app.use('/api/admin', adminRouter)
app.use('/api/content', contentRouter)

// Les images (photos, logo, image de partage) sont publiques par nature et
// doivent pouvoir être affichées par des sites tiers (réseaux sociaux, outils
// d'aperçu de lien) — sans ça, le CORP "same-origin" par défaut de Helmet
// bloque leur chargement en <img> cross-origin dans le navigateur. Ciblé via
// setHeaders (appelé uniquement quand un fichier est réellement servi) pour
// ne pas affaiblir la politique par défaut sur le reste (API, HTML).
const setCrossOriginHeader = (res) => res.set('Cross-Origin-Resource-Policy', 'cross-origin')

app.use(
  '/uploads',
  express.static(UPLOADS_DIR, { maxAge: '30d', immutable: true, setHeaders: setCrossOriginHeader })
)
// Les fichiers dans /assets sont générés par Vite avec un hash dans leur nom
// (index-XXXXX.js) : leur contenu ne change jamais sous une même URL, donc un
// cache long et immuable est sûr et évite un aller-retour réseau à chaque
// visite. Les autres fichiers publics (logo, favicon, images…) ne sont pas
// hashés et peuvent être remplacés sans changer de nom : cache plus court.
app.use(
  '/assets',
  express.static(path.join(__dirname, 'public', 'assets'), {
    maxAge: '1y',
    immutable: true,
    setHeaders: setCrossOriginHeader,
  })
)
app.use(
  express.static(path.join(__dirname, 'public'), {
    index: false,
    maxAge: '1h',
    setHeaders: setCrossOriginHeader,
  })
)

const INDEX_HTML_TEMPLATE = readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf-8')
  .replace(/<title>.*?<\/title>/s, '')
  .replace(/<meta\s+name="description"[\s\S]*?\/>/, '')

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) return next()
  const html = INDEX_HTML_TEMPLATE.replace('</head>', `${buildHead(req.path)}\n  </head>`)
  res.set('Content-Type', 'text/html')
  res.send(html)
})

seedAdminIfNeeded()
  .catch((err) => console.error('[admin] seed échoué :', err))
  .finally(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`shake-vibe server listening on ${PORT}`)
    })
  })
