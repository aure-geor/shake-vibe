import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { getCached, setCached } from '@/lib/dataCache'

const CACHE_KEY = '/api/site-images'

// Récupère l'ensemble des emplacements photo publiés (clé -> { url, alt }).
// Un emplacement sans image assignée est simplement absent de la réponse.
export function useSiteImages() {
  const [images, setImages] = useState(() => getCached(CACHE_KEY) || {})

  useEffect(() => {
    api
      .get('/api/site-images')
      .then((data) => {
        setCached(CACHE_KEY, data)
        setImages(data)
      })
      .catch(() => {})
  }, [])

  return images
}
