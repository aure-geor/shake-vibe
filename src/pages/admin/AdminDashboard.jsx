import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KeyRound, Loader2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlbumsPanel } from '@/components/admin/AlbumsPanel'
import { EmplacementsPanel } from '@/components/admin/EmplacementsPanel'
import { GaleriePanel } from '@/components/admin/GaleriePanel'
import { PhotosPanel } from '@/components/admin/PhotosPanel'
import { ContenuPanel } from '@/components/admin/ContenuPanel'
import { useAdminSession } from '@/hooks/useAdminSession'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'contenu', label: 'Contenu', Panel: ContenuPanel },
  { id: 'albums', label: 'Réalisations', Panel: AlbumsPanel },
  { id: 'emplacements', label: 'Emplacements', Panel: EmplacementsPanel },
  { id: 'galerie', label: 'Galerie', Panel: GaleriePanel },
  { id: 'photos', label: 'Photos', Panel: PhotosPanel },
]

export function AdminDashboard() {
  const navigate = useNavigate()
  const { admin, loading } = useAdminSession()
  const [tab, setTab] = useState('contenu')

  useEffect(() => {
    if (!loading && admin === null) navigate('/admin/connexion', { replace: true })
  }, [loading, admin, navigate])

  const onLogout = async () => {
    await api.post('/api/admin/logout')
    navigate('/admin/connexion', { replace: true })
  }

  if (loading || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="size-6 animate-spin text-gold" />
      </div>
    )
  }

  const ActivePanel = TABS.find((t) => t.id === tab)?.Panel ?? AlbumsPanel

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between border-b border-gold/15 px-6 py-4">
        <div>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Administration</p>
          <p className="text-sm text-white/60">{admin.email}</p>
        </div>
        <div className="flex gap-2">
          <Button
            render={<Link to="/admin/mot-de-passe-oublie" />}
            nativeButton={false}
            variant="outline"
            className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
          >
            <KeyRound className="size-4" /> Changer le mot de passe
          </Button>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
          >
            <LogOut className="size-4" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex gap-2 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                tab === t.id ? 'border-b-2 border-gold text-gold' : 'text-white/60 hover:text-white'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <ActivePanel />
        </div>
      </div>
    </div>
  )
}
