import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
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

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => api.off('select', onSelect)
  }, [api])

  if (!photos || photos.length === 0) return null

  const plugins = []
  if (autoplay) plugins.push(Autoplay({ delay: 4500, stopOnInteraction: false }))
  if (fade) plugins.push(Fade())

  return (
    <div className={className}>
      <Carousel opts={{ loop: true, align: 'start' }} plugins={plugins} setApi={setApi}>
        <CarouselContent className={cn(fade ? 'ml-0' : gap.replace('gap-', '-ml-'))}>
          {photos.map((photo) => (
            <CarouselItem
              key={photo.id}
              className={cn(fade ? 'pl-0' : gap.replace('gap-', 'pl-'), itemBasis)}
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
    </div>
  )
}
