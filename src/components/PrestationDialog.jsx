import { asset } from '@/lib/assets'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'

export function PrestationDialog({ prestation, onOpenChange }) {
  return (
    <Dialog open={Boolean(prestation)} onOpenChange={onOpenChange}>
      <DialogContent className="border-gold/20 bg-black text-white sm:max-w-xl">
        {prestation && (
          <>
            <DialogHeader>
              <Badge className="mb-1 w-fit border-gold/40 bg-transparent text-gold">
                {prestation.tag}
              </Badge>
              <DialogTitle className="text-xl text-white">
                {prestation.titre}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                {prestation.lieu}
              </DialogDescription>
            </DialogHeader>

            <Carousel className="w-full">
              <CarouselContent>
                {prestation.photos.map((photo, index) => (
                  <CarouselItem key={photo + index}>
                    <img
                      src={asset(photo)}
                      alt={`${prestation.titre} — photo ${index + 1}`}
                      className="max-h-[65vh] w-full rounded-lg object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {prestation.photos.length > 1 && (
                <>
                  <CarouselPrevious className="border-gold/30 bg-black/70 text-white hover:bg-black" />
                  <CarouselNext className="border-gold/30 bg-black/70 text-white hover:bg-black" />
                </>
              )}
            </Carousel>

            <p className="text-sm leading-relaxed text-white/75">
              {prestation.description}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
