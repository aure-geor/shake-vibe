import { useEffect, useRef, useState } from 'react'
import { Loader2, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/devis/FormField'
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

export function PhotosPanel() {
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const formRef = useRef(null)

  const load = () => api.get('/api/photos').then(setPhotos).catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const onUpload = async (e) => {
    e.preventDefault()
    setError(null)
    setUploading(true)
    try {
      const formData = new FormData(e.currentTarget)
      await api.post('/api/photos', formData)
      formRef.current?.reset()
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const confirmDelete = async () => {
    if (!toDelete) return
    try {
      await api.delete(`/api/photos/${toDelete.id}`)
      setToDelete(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={onUpload}
        className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2"
      >
        <FormField label="Photo (JPEG, PNG ou WebP)" htmlFor="photo" required className="sm:col-span-2">
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="w-full text-sm text-white/70 file:mr-3 file:rounded-lg file:border file:border-gold/30 file:bg-transparent file:px-3 file:py-1.5 file:text-sm file:text-gold"
          />
        </FormField>
        <FormField label="Description (texte alternatif)" htmlFor="alt">
          <Input id="alt" name="alt" placeholder="Ex : Cocktail signature au mariage X" />
        </FormField>
        <FormField label="Prestation associée" htmlFor="prestation">
          <Input id="prestation" name="prestation" placeholder="Ex : mariage" />
        </FormField>
        <div className="flex items-end sm:col-span-2">
          <Button type="submit" disabled={uploading} className="bg-gold text-black hover:bg-gold/90">
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Ajouter la photo
          </Button>
        </div>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {photos.length === 0 ? (
        <p className="mt-8 text-sm text-white/50">Aucune photo pour le moment.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg border border-white/10">
              <img
                src={`/uploads/${photo.filename}`}
                alt={photo.alt || ''}
                className="aspect-square w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setToDelete(photo)}
                className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/80"
                aria-label="Supprimer la photo"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer cette photo ?</DialogTitle>
            <DialogDescription>
              Cette action est définitive : le fichier sera supprimé du serveur et ne pourra pas
              être récupéré.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Annuler</DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
