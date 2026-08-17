import { Link } from 'react-router-dom'
import { ArrowRight, GlassWater, PartyPopper, Sparkles, Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EXPERIENCES_COCKTAILS } from '@/lib/quoteSchema'
import { useSiteImages } from '@/hooks/useSiteImages'
import { useGallery } from '@/hooks/useGallery'
import { useSiteContent } from '@/hooks/useSiteContent'
import { PhotoCarousel } from '@/components/PhotoCarousel'

const EXPERIENCE_ICONS = { elegante: Wine, festive: PartyPopper, 'sur-mesure': Sparkles }

export function Cocktails() {
  const images = useSiteImages()
  const t = useSiteContent()
  const menuPhotos = useGallery('cocktails-menu')
  const winePhotos = useGallery('cocktails-vin')

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Nos cocktails
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t('cocktails.title')}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center whitespace-pre-line text-white/65">
        {t('cocktails.subtitle')}
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {EXPERIENCES_COCKTAILS.map(({ value, label }) => {
          const Icon = EXPERIENCE_ICONS[value]
          const image = images[`cocktails-${value}`]
          return (
            <div
              key={value}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors hover:border-gold/30"
            >
              {image && (
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/5 w-full object-cover"
                />
              )}
              <div className="flex flex-col gap-4 p-6">
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon className="size-5" />
                </span>
                <h2 className="font-heading text-lg font-semibold text-white">{label}</h2>
                <p className="text-sm text-white/60">{t(`cocktails.experience.${value}`)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {menuPhotos.length > 0 && (
        <>
          <Separator className="my-16 bg-gold/15" />
          <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
            {t('cocktails.menu.eyebrow')}
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
            {t('cocktails.menu.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">
            {t('cocktails.menu.subtitle')}
          </p>
          <PhotoCarousel
            photos={menuPhotos}
            aspect="aspect-2/3"
            fit="contain"
            itemBasis="basis-[68%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            gap="gap-3"
            showDots={false}
            className="mt-10"
          />
          <p className="mx-auto mt-10 max-w-2xl text-center text-white/65">
            {t('cocktails.menu.upsell')}
          </p>
        </>
      )}

      <Separator className="my-16 bg-gold/15" />
      <div className="relative min-h-[480px] overflow-hidden rounded-2xl sm:min-h-[560px]">
        {images['cocktails-vin-fond'] && (
          <>
            <img
              src={images['cocktails-vin-fond'].url}
              alt={images['cocktails-vin-fond'].alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
          </>
        )}
        <div className="relative flex min-h-[480px] flex-col justify-center px-6 py-16 text-center sm:min-h-[560px] sm:py-20">
          <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
            {t('cocktails.wine.eyebrow')}
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
            {t('cocktails.wine.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center whitespace-pre-line text-white/65">
            {t('cocktails.wine.subtitle')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              render={<a href="/carte-vins.jpg" download />}
              nativeButton={false}
              size="lg"
              className="h-auto max-w-xl bg-gold py-4 text-center text-black whitespace-normal hover:bg-gold/90"
            >
              {t('cocktails.wine.download_cta')}
            </Button>
          </div>
        </div>
      </div>
      {winePhotos.length > 0 && (
        <PhotoCarousel
          photos={winePhotos}
          aspect="aspect-2/3"
          fit="contain"
          itemBasis="basis-[68%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          gap="gap-3"
          showDots={false}
          className="mt-10"
        />
      )}

      <Separator className="my-16 bg-gold/15" />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
          <GlassWater className="size-5" />
        </span>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
          {t('cocktails.final.title')}
        </h2>
        <p className="max-w-xl text-white/70">{t('cocktails.final.text')}</p>
        <Button
          render={<Link to="/devis" />}
          nativeButton={false}
          size="lg"
          className="mt-4 bg-gold text-black hover:bg-gold/90"
        >
          {t('cta.request_quote')}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
