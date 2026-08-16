import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, GripVertical, Loader2, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
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

const EMPTY_FORM = { titre: '', lieu: '', tag: '', description: '', published: false }

export function AlbumsPanel() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [albums, setAlbums] = useState([])
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [uploadingFor, setUploadingFor] = useState(null)
  const [toDeleteAlbum, setToDeleteAlbum] = useState(null)
  const [toDeletePhoto, setToDeletePhoto] = useState(null)
  const [draggedAlbumId, setDraggedAlbumId] = useState(null)
  const [draggedPhoto, setDraggedPhoto] = useState(null) // { albumId, photoId }

  const load = () => api.get('/api/albums/admin/all').then(setAlbums).catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await api.post('/api/albums', form)
      setForm(EMPTY_FORM)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const togglePublish = async (album) => {
    try {
      await api.put(`/api/albums/${album.id}`, { published: !album.published })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const confirmDeleteAlbum = async () => {
    if (!toDeleteAlbum) return
    try {
      await api.delete(`/api/albums/${toDeleteAlbum.id}`)
      setToDeleteAlbum(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const confirmDeletePhoto = async () => {
    if (!toDeletePhoto) return
    try {
      await api.delete(`/api/albums/${toDeletePhoto.albumId}/photos/${toDeletePhoto.photoId}`)
      setToDeletePhoto(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const onDropAlbum = async (targetId) => {
    if (draggedAlbumId === null || draggedAlbumId === targetId) {
      setDraggedAlbumId(null)
      return
    }
    const ids = albums.map((a) => a.id)
    const fromIndex = ids.indexOf(draggedAlbumId)
    const toIndex = ids.indexOf(targetId)
    ids.splice(toIndex, 0, ids.splice(fromIndex, 1)[0])

    setAlbums((prev) => ids.map((id) => prev.find((a) => a.id === id)))
    setDraggedAlbumId(null)
    try {
      await api.patch('/api/albums/reorder', { order: ids })
    } catch (err) {
      setError(err.message)
      load()
    }
  }

  const onDropPhoto = async (albumId, targetPhotoId) => {
    if (!draggedPhoto || draggedPhoto.albumId !== albumId || draggedPhoto.photoId === targetPhotoId) {
      setDraggedPhoto(null)
      return
    }
    const album = albums.find((a) => a.id === albumId)
    const ids = album.photoDetails.map((p) => p.id)
    const fromIndex = ids.indexOf(draggedPhoto.photoId)
    const toIndex = ids.indexOf(targetPhotoId)
    ids.splice(toIndex, 0, ids.splice(fromIndex, 1)[0])

    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? { ...a, photoDetails: ids.map((id) => a.photoDetails.find((p) => p.id === id)) }
          : a
      )
    )
    setDraggedPhoto(null)
    try {
      await api.patch(`/api/albums/${albumId}/photos/reorder`, { order: ids })
    } catch (err) {
      setError(err.message)
      load()
    }
  }

  const onUploadPhoto = async (albumId, file) => {
    setUploadingFor(albumId)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('photo', file)
      await api.post(`/api/albums/${albumId}/photos`, formData)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploadingFor(null)
    }
  }

  return (
    <div>
      <form
        onSubmit={onCreate}
        className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2"
      >
        <FormField label="Titre" htmlFor="titre" required>
          <Input
            id="titre"
            required
            value={form.titre}
            onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
          />
        </FormField>
        <FormField label="Lieu" htmlFor="lieu" required>
          <Input
            id="lieu"
            required
            value={form.lieu}
            onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))}
          />
        </FormField>
        <FormField label="Tag (ex : Mariage, Anniversaire...)" htmlFor="tag" required>
          <Input
            id="tag"
            required
            value={form.tag}
            onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
          />
        </FormField>
        <FormField label="Description" htmlFor="description" className="sm:col-span-2">
          <Textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </FormField>
        <label className="flex items-center gap-2 text-sm text-white/85 sm:col-span-2">
          <Checkbox
            checked={form.published}
            onCheckedChange={(checked) => setForm((f) => ({ ...f, published: checked }))}
          />
          Publier immédiatement
        </label>

        {error && <p className="text-sm text-destructive sm:col-span-2">{error}</p>}

        <Button
          type="submit"
          disabled={saving}
          className="w-fit bg-gold text-black hover:bg-gold/90 sm:col-span-2"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          Créer l&apos;album
        </Button>
      </form>

      {albums.length === 0 ? (
        <p className="mt-8 text-sm text-white/50">Aucun album pour le moment.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {albums.map((album) => {
            const expanded = expandedId === album.id
            return (
              <div key={album.id} className="rounded-lg border border-white/10 bg-white/[0.02]">
                <div
                  draggable
                  onDragStart={() => setDraggedAlbumId(album.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDropAlbum(album.id)}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="hidden shrink-0 cursor-grab text-white/30 active:cursor-grabbing sm:block">
                    <GripVertical className="size-4" />
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : album.id)}
                    className="flex flex-1 items-center gap-2 text-left"
                  >
                    {expanded ? (
                      <ChevronUp className="size-4 shrink-0 text-gold" />
                    ) : (
                      <ChevronDown className="size-4 shrink-0 text-gold" />
                    )}
                    <div>
                      <p className="font-medium text-white">{album.titre}</p>
                      <p className="text-xs text-white/50">
                        {album.lieu} — {album.tag} — {album.published ? 'Publié' : 'Brouillon'} —{' '}
                        {album.photos.length} photo(s)
                      </p>
                    </div>
                  </button>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => togglePublish(album)}>
                      {album.published ? 'Dépublier' : 'Publier'}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => setToDeleteAlbum(album)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>

                {expanded && (
                  <div className="border-t border-white/10 p-4">
                    {album.description && (
                      <p className="mb-4 text-sm text-white/60">{album.description}</p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {album.photoDetails.map((photo) => (
                        <div
                          key={photo.id}
                          draggable
                          onDragStart={() => setDraggedPhoto({ albumId: album.id, photoId: photo.id })}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => onDropPhoto(album.id, photo.id)}
                          className="group relative size-24 cursor-grab overflow-hidden rounded-lg border border-white/10 active:cursor-grabbing"
                        >
                          <img src={photo.url} alt={photo.alt} className="size-full object-cover" />
                          <div className="absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                            <GripVertical className="size-3.5" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setToDeletePhoto({ albumId: album.id, photoId: photo.id })}
                            className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/80"
                            aria-label="Supprimer la photo"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      ))}

                      <label className="flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gold/30 text-gold transition-colors hover:border-gold/60">
                        {uploadingFor === album.id ? (
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
                            if (file) onUploadPhoto(album.id, file)
                            e.target.value = ''
                          }}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <Dialog open={!!toDeleteAlbum} onOpenChange={(open) => !open && setToDeleteAlbum(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer cet album ?</DialogTitle>
            <DialogDescription>
              Cette action supprime l&apos;album et toutes ses photos du serveur. Elle est
              définitive et ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Annuler</DialogClose>
            <Button variant="destructive" onClick={confirmDeleteAlbum}>
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!toDeletePhoto} onOpenChange={(open) => !open && setToDeletePhoto(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer cette photo ?</DialogTitle>
            <DialogDescription>Cette action est définitive et ne peut pas être annulée.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Annuler</DialogClose>
            <Button variant="destructive" onClick={confirmDeletePhoto}>
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
