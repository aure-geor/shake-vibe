import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { CONTENT_FALLBACKS } from '@/lib/editableContent'
import { getCached, setCached } from '@/lib/dataCache'

const CACHE_KEY = '/api/content'

// Retourne une fonction t(key) qui renvoie le texte personnalisé par le
// client, ou le texte par défaut du site si rien n'a été personnalisé.
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

  return (key) => content[key] || CONTENT_FALLBACKS[key] || ''
}
