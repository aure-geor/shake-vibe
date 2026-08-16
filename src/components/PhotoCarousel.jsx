import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export function PhotoCarousel({
  photos,
  autoplay = false,
  fade = false,
  aspect = 'aspect-4/5',
  fit = 'cover',
  itemBasis = 'basis-full',
  gap = 'gap-4',
  showArrows = true,
  showDots = true,
  className = '',
}) {
  const [api, setApi] = useState(null)
  const [selected, setSelected] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => api.off('select', onSelect)
  }, [api])

  useEffect(() => {
    if (lightboxIndex === null || !photos) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % photos.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, photos])

  if (!photos || photos.length === 0) return null

  const plugins = []
  if (autoplay) plugins.push(Autoplay({ delay: 4500, stopOnInteraction: false }))
  if (fade) plugins.push(Fade())

  return (
    <div className={className}>
      <Carousel opts={{ loop: true, align: 'start' }} plugins={plugins} setApi={setApi}>
        <CarouselContent className={cn(fade ? 'ml-0' : gap.replace('gap-', '-ml-'))}>
          {photos.map((photo, index) => (
            <CarouselItem
              key={photo.id}
              className={cn(fade ? 'pl-0' : gap.replace('gap-', 'pl-'), itemBasis)}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label="Agrandir la photo"
                className="block w-full cursor-zoom-in"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className={cn(
                    'w-full rounded-xl',
                    fit === 'contain' ? 'bg-black object-contain' : 'object-cover',
                    aspect
                  )}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && photos.length > 1 && (
          <>
            <CarouselPrevious className="left-2 border-white/20 bg-black/50 text-white hover:bg-black/70" />
            <CarouselNext className="right-2 border-white/20 bg-black/50 text-white hover:bg-black/70" />
          </>
        )}
      </Carousel>

      {showDots && photos.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Aller à la photo ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'size-2 rounded-full transition-colors',
                i === selected ? 'bg-gold' : 'bg-white/25 hover:bg-white/40'
              )}
            />
          ))}
        </div>
      )}

      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && setLightboxIndex(null)}
      >
        <DialogContent
          showCloseButton
          className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[90vw]"
        >
          {lightboxIndex !== null && (
            <div className="relative flex items-center justify-center">
              <img
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].alt}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)
                    }
                    aria-label="Photo précédente"
                    className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((i) => (i + 1) % photos.length)}
                    aria-label="Photo suivante"
                    className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
