import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api'

export function useAdminSession() {
  const [admin, setAdmin] = useState(undefined) // undefined = chargement, null = non connecté

  const refresh = useCallback(() => {
    api
      .get('/api/admin/me')
      .then(setAdmin)
      .catch(() => setAdmin(null))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { admin, loading: admin === undefined, refresh }
}
