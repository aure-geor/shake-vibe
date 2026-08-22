import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { CONTENT_FALLBACKS, TEXT_COLOR_CLASSES } from '@/lib/editableContent'
import { getCached, setCached } from '@/lib/dataCache'

const CACHE_KEY = '/api/content'

// Retourne une fonction t(key) qui renvoie le texte personnalisé par le
// client, ou le texte par défaut du site si rien n'a été personnalisé.
// t.color(key, couleurParDefaut) renvoie la classe Tailwind de la couleur
// choisie pour ce texte (jaune/blanc/gris), stockée sous la clé `${key}__color`.
export function useSiteContent() {
  const [content, setContent] = useState(() => getCached(CACHE_KEY) || {})

  useEffect(() => {
    api
      .get('/api/content')
      .then((data) => {
        setCached(CACHE_KEY, data)
        setContent(data)
      })
      .catch(() => {})
  }, [])

  const t = (key) => content[key] || CONTENT_FALLBACKS[key] || ''
  t.color = (key, fallbackColor) =>
    TEXT_COLOR_CLASSES[content[`${key}__color`]] || TEXT_COLOR_CLASSES[fallbackColor]
  return t
}
