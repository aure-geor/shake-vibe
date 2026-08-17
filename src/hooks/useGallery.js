import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { getCached, setCached } from '@/lib/dataCache'

// Récupère les photos d'une galerie (carrousel) publique, dans leur ordre d'affichage.
export function useGallery(section) {
  const cacheKey = `/api/galleries/${section}`
  const [photos, setPhotos] = useState(() => getCached(cacheKey) || [])

  useEffect(() => {
    api
      .get(cacheKey)
      .then((data) => {
        setCached(cacheKey, data)
        setPhotos(data)
      })
      .catch(() => {})
  }, [cacheKey])

  return photos
}
