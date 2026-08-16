import { useEffect, useState } from 'react'
import { Loader2, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { api } from '@/lib/api'

export function GaleriePanel() {
  const [sections, setSections] = useState([])
  const [error, setError] = useState(null)
  const [uploadingKey, setUploadingKey] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const load = () => api.get('/api/galleries/admin/all').then(setSections).catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const onUpload = async (key, file) => {
    setUploadingKey(key)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('photo', file)
      await api.post(`/api/galleries/${key}`, formData)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploadingKey(null)
    }
  }

  const confirmDelete = async () => {
    if (!toDelete) return
    try {
      await api.delete(`/api/galleries/photos/${toDelete}`)
      setToDelete(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <p className="text-sm text-white/60">
        Ces galeries s&apos;affichent en carrousel sur le site. Ajoutez ou retirez des
        photos librement — l&apos;ordre suit l&apos;ordre d&apos;ajout.
      </p>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <div key={section.key}>
            <h3 className="font-heading text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              {section.label}
            </h3>
            <p className="text-xs text-white/50">{section.page}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              {section.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative size-28 overflow-hidden rounded-lg border border-white/10"
                >
                  <img src={photo.url} alt={photo.alt} className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setToDelete(photo.id)}
                    className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/80"
                    aria-label="Retirer la photo"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}

              <label className="flex size-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gold/30 text-gold transition-colors hover:border-gold/60">
                {uploadingKey === section.key ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <Upload className="size-5" />
                    <span className="text-xs">Ajouter</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) onUpload(section.key, file)
                    e.target.value = ''
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Retirer cette photo ?</DialogTitle>
            <DialogDescription>
              Cette action est définitive : le fichier sera supprimé du serveur.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Annuler</DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Retirer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
