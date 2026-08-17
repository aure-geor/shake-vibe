import { useGallery } from '@/hooks/useGallery'
import { useSiteContent } from '@/hooks/useSiteContent'
import { PhotoCarousel } from '@/components/PhotoCarousel'

export function Prestations() {
  const t = useSiteContent()
  const photos = useGallery('prestations')

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

      {photos.length === 0 ? (
        <p className="mt-14 text-center text-white/50">
          Aucune réalisation publiée pour le moment.
        </p>
      ) : (
        <PhotoCarousel
          photos={photos}
          aspect="aspect-2/3"
          fit="contain"
          itemBasis="basis-[68%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          gap="gap-3"
          showDots={false}
          className="mt-14"
        />
      )}
    </div>
  )
}
