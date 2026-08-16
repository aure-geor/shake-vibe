import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

// Récupère les photos d'une galerie (carrousel) publique, dans leur ordre d'affichage.
export function useGallery(section) {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    api
      .get(`/api/galleries/${section}`)
      .then(setPhotos)
      .catch(() => setPhotos([]))
  }, [section])

  return photos
}
