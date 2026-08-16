// Script ponctuel : importe le portfolio historique (ex src/data/prestations.js) dans la base
// de données + les uploads. À exécuter une seule fois, jamais au démarrage du serveur.
// Usage : node scripts/migrate-prestations.js

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { db, UPLOADS_DIR } from '../src/db/client.js'
import { albums, albumPhotos } from '../src/db/schema.js'
import { saveResizedPhoto } from '../src/lib/uploads.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_PUBLIC_DIR = path.resolve(__dirname, '../../public')

const PRESTATIONS = [
  {
    titre: 'Jardin des Agrumes',
    lieu: 'Hyères, Var',
    tag: 'Soirée privée',
    description:
      "Entre orangers et fontaine, une carte d'élixirs citronnés composée sur place, avec atelier parfums et ambiance acoustique pour un coucher de soleil provençal.",
    photos: ['lieu/agrumes.jpeg'],
  },
  {
    titre: 'Terrasse des Falaises',
    lieu: 'Cassis, Bouches-du-Rhône',
    tag: 'Anniversaire',
    description:
      'Face à la Méditerranée, cocktails signature, finger food et saxophoniste live pour une soirée suspendue au-dessus des calanques.',
    photos: ['lieu/falaises.jpeg'],
  },
  {
    titre: 'Frégate Provence',
    lieu: 'Garden Frégate',
    tag: 'Soirée privée',
    description:
      "Sous les guirlandes lumineuses, une sélection de cocktails signature accompagnée d'animations et d'une ambiance live music jusqu'au bout de la nuit.",
    photos: ['lieu/freg.jpeg', 'lieu/freg-1.jpeg', 'lieu/freg-2.jpeg', 'lieu/freg-3.jpeg'],
  },
  {
    titre: 'Château des Marres',
    lieu: 'Saint-Tropez, Var',
    tag: 'Mariage',
    description:
      'Au cœur des vignes tropéziennes, une carte du terroir revisitée en cocktails, atelier rose & gin et DJ set au soleil couchant.',
    photos: ['lieu/marres.jpeg'],
  },
  {
    titre: 'Domaine du Vieux Pressoir',
    lieu: 'Le Beausset, Var',
    tag: 'Événement professionnel',
    description:
      "Masterclass cocktails et mixologie artisanale au milieu des oliviers, dans un ancien domaine viticole reconverti pour l'occasion.",
    photos: ['lieu/pressoir.jpeg'],
  },
  {
    titre: 'Château du Rouët',
    lieu: 'Le Muy, Var',
    tag: 'Afterwork',
    description:
      "Cocktails créatifs élaborés à partir des vins du domaine, foodtruck et bar à vin pour un afterwork d'été convivial au milieu des vignes.",
    photos: ['lieu/rouet.jpeg'],
  },
]

async function migrate() {
  const existing = db.select().from(albums).all()
  if (existing.length > 0) {
    console.log('[migrate] Des albums existent déjà en base — migration ignorée pour éviter les doublons.')
    return
  }

  console.log(`[migrate] Lecture des images depuis : ${SOURCE_PUBLIC_DIR}`)
  console.log(`[migrate] Écriture des uploads dans : ${UPLOADS_DIR}`)

  let cursor = Date.now() - PRESTATIONS.length * 60000

  for (const prestation of PRESTATIONS) {
    const now = new Date(cursor)
    cursor += 60000

    const albumRow = db
      .insert(albums)
      .values({
        titre: prestation.titre,
        lieu: prestation.lieu,
        tag: prestation.tag,
        description: prestation.description,
        published: true,
        createdAt: now,
        updatedAt: now,
      })
      .run()
    const albumId = albumRow.lastInsertRowid

    let imported = 0
    for (const relativePath of prestation.photos) {
      const sourcePath = path.join(SOURCE_PUBLIC_DIR, relativePath)
      if (!fs.existsSync(sourcePath)) {
        console.warn(`[migrate]   fichier introuvable, ignoré : ${sourcePath}`)
        continue
      }
      const buffer = fs.readFileSync(sourcePath)
      const filename = await saveResizedPhoto(buffer)

      db.insert(albumPhotos)
        .values({
          albumId,
          filename,
          alt: `${prestation.titre} — ${prestation.lieu}`,
          createdAt: now,
        })
        .run()
      imported += 1
    }

    console.log(`[migrate] Album créé : "${prestation.titre}" (${imported}/${prestation.photos.length} photo(s))`)
  }

  console.log('[migrate] Terminé.')
}

migrate().catch((err) => {
  console.error('[migrate] Échec :', err)
  process.exit(1)
})
