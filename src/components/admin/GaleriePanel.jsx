import { useEffect, useState } from 'react'
import { GripVertical, Loader2, Trash2, Upload } from 'lucide-react'
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
  const [dragged, setDragged] = useState(null) // { sectionKey, photoId }

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

  const onDrop = async (sectionKey, targetPhotoId) => {
    if (!dragged || dragged.sectionKey !== sectionKey || dragged.photoId === targetPhotoId) {
      setDragged(null)
      return
    }

    const section = sections.find((s) => s.key === sectionKey)
    const ids = section.photos.map((p) => p.id)
    const fromIndex = ids.indexOf(dragged.photoId)
    const toIndex = ids.indexOf(targetPhotoId)
    ids.splice(toIndex, 0, ids.splice(fromIndex, 1)[0])

    setSections((prev) =>
      prev.map((s) =>
        s.key === sectionKey ? { ...s, photos: ids.map((id) => s.photos.find((p) => p.id === id)) } : s
      )
    )
    setDragged(null)

    try {
      await api.patch('/api/galleries/reorder', { section: sectionKey, order: ids })
    } catch (err) {
      setError(err.message)
      load()
    }
  }

  return (
    <div>
      <p className="text-sm text-white/60">
        Ces galeries s&apos;affichent en carrousel sur le site. Ajoutez ou retirez des
        photos librement, et glissez-déposez une vignette pour changer l&apos;ordre
        d&apos;affichage.
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
                  draggable
                  onDragStart={() => setDragged({ sectionKey: section.key, photoId: photo.id })}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(section.key, photo.id)}
                  className="group relative size-28 cursor-grab overflow-hidden rounded-lg border border-white/10 active:cursor-grabbing"
                >
                  <img src={photo.url} alt={photo.alt} className="size-full object-cover" />
                  <div className="absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <GripVertical className="size-3.5" />
                  </div>
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
