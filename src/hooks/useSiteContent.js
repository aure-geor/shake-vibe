import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { CONTENT_FALLBACKS } from '@/lib/editableContent'

// Retourne une fonction t(key) qui renvoie le texte personnalisé par le
// client, ou le texte par défaut du site si rien n'a été personnalisé.
export function useSiteContent() {
  const [content, setContent] = useState({})

  useEffect(() => {
    api
      .get('/api/content')
      .then(setContent)
      .catch(() => setContent({}))
  }, [])

  return (key) => content[key] || CONTENT_FALLBACKS[key] || ''
}
