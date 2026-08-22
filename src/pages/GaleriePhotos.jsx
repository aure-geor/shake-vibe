import { useGallery } from '@/hooks/useGallery'
import { useSiteContent } from '@/hooks/useSiteContent'
import { PhotoCarousel } from '@/components/PhotoCarousel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function GaleriePhotos() {
  const t = useSiteContent()
  const photos = useGallery('prestations')

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Nos réalisations
      </p>
      <h1 className={cn('mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl', t.color('prestations.title', 'white'))}>
        {t('prestations.title')}
      </h1>
      <p className={cn('mx-auto mt-4 max-w-2xl text-center', t.color('prestations.subtitle', 'gray'))}>
        {t('prestations.subtitle')}
      </p>

      {photos.length === 0 ? (
        <p className="mt-14 text-center text-white/50">
          Aucune réalisation publiée pour le moment.
        </p>
      ) : (
        <>
          <PhotoCarousel
            photos={photos}
            aspect="aspect-2/3"
            fit="contain"
            itemBasis="basis-[68%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            gap="gap-3"
            showDots={false}
            className="mt-14"
          />
          <div className="mt-8 flex justify-center">
            <Button
              render={<a href={t('links.instagram')} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              className="bg-gold text-black hover:bg-gold/90"
            >
              {t('prestations.instagram_cta')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
