import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

// Récupère l'ensemble des emplacements photo publiés (clé -> { url, alt }).
// Un emplacement sans image assignée est simplement absent de la réponse.
export function useSiteImages() {
  const [images, setImages] = useState({})

  useEffect(() => {
    api
      .get('/api/site-images')
      .then(setImages)
      .catch(() => setImages({}))
  }, [])

  return images
}
