import { useEffect, useState } from 'react'
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

export function EmplacementsPanel() {
  const [slots, setSlots] = useState([])
  const [error, setError] = useState(null)
  const [uploadingKey, setUploadingKey] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const load = () => api.get('/api/site-images/admin/all').then(setSlots).catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const onUpload = async (key, file, alt) => {
    setUploadingKey(key)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('photo', file)
      formData.append('alt', alt || '')
      await api.post(`/api/site-images/${key}`, formData)
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
      await api.delete(`/api/site-images/${toDelete}`)
      setToDelete(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const byPage = slots.reduce((acc, slot) => {
    ;(acc[slot.page] ||= []).push(slot)
    return acc
  }, {})

  return (
    <div>
      <p className="text-sm text-white/60">
        Chaque emplacement correspond à un endroit précis du site. Remplacez l&apos;image à
        tout moment&nbsp;: le changement est visible immédiatement sur le site public.
      </p>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-8 space-y-10">
        {Object.entries(byPage).map(([page, pageSlots]) => (
          <div key={page}>
            <h3 className="font-heading text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              {page}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pageSlots.map((slot) => (
                <SlotCard
                  key={slot.key}
                  slot={slot}
                  uploading={uploadingKey === slot.key}
                  onUpload={(file, alt) => onUpload(slot.key, file, alt)}
                  onDelete={() => setToDelete(slot.key)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Retirer cette image ?</DialogTitle>
            <DialogDescription>
              L&apos;emplacement redeviendra vide sur le site public jusqu&apos;à ce
              qu&apos;une nouvelle image soit ajoutée. Cette action est définitive.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Annuler</DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Retirer l&apos;image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SlotCard({ slot, uploading, onUpload, onDelete }) {
  const [alt, setAlt] = useState(slot.alt)

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <div className="aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-black/40">
        {slot.url ? (
          <img src={slot.url} alt={slot.alt} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-white/40">
            Aucune image
          </div>
        )}
      </div>

      <p className="mt-3 text-sm font-medium text-white">{slot.label}</p>
      <p className="text-xs text-white/50">{slot.hint}</p>

      <FormField label="Texte alternatif" htmlFor={`alt-${slot.key}`} className="mt-3">
        <Input
          id={`alt-${slot.key}`}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Description de la photo"
        />
      </FormField>

      <div className="mt-3 flex gap-2">
        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gold/30 px-3 py-2 text-sm text-gold transition-colors hover:border-gold/60">
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {slot.url ? 'Remplacer' : 'Ajouter'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUpload(file, alt)
              e.target.value = ''
            }}
          />
        </label>
        {slot.url && (
          <Button type="button" size="icon" variant="destructive" onClick={onDelete}>
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
