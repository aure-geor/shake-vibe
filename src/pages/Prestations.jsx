import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { PrestationCard } from '@/components/PrestationCard'
import { PrestationDialog } from '@/components/PrestationDialog'
import { useSiteContent } from '@/hooks/useSiteContent'

export function Prestations() {
  const t = useSiteContent()
  const [selected, setSelected] = useState(null)
  const [albums, setAlbums] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get('/api/albums')
      .then(setAlbums)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Nos réalisations
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t('prestations.title')}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">
        {t('prestations.subtitle')}
      </p>

      {error && <p className="mt-10 text-center text-sm text-destructive">{error}</p>}
      {!albums && !error && <p className="mt-10 text-center text-white/50">Chargement…</p>}
      {albums?.length === 0 && (
        <p className="mt-10 text-center text-white/50">
          Aucune réalisation publiée pour le moment.
        </p>
      )}

      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {albums?.map((album) => (
          <PrestationCard key={album.id} prestation={album} onOpen={setSelected} />
        ))}
      </div>

      <PrestationDialog
        prestation={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  )
}
