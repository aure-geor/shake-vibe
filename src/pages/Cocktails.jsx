import { Link } from 'react-router-dom'
import { ArrowRight, GlassWater, PartyPopper, Sparkles, Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EXPERIENCES_COCKTAILS } from '@/lib/quoteSchema'
import { useSiteImages } from '@/hooks/useSiteImages'
import { useGallery } from '@/hooks/useGallery'
import { PhotoCarousel } from '@/components/PhotoCarousel'

const EXPERIENCE_CONTENT = {
  elegante: {
    icon: Wine,
    texte:
      "Des cocktails classiques revisités avec précision, pensés pour les évènements raffinés : mariages, réceptions et soirées d'entreprise.",
  },
  festive: {
    icon: PartyPopper,
    texte:
      "Une carte audacieuse et généreuse, portée par l'énergie du flair bartending, pour des soirées privées et anniversaires mémorables.",
  },
  'sur-mesure': {
    icon: Sparkles,
    texte:
      "Une carte entièrement composée avec vous : thème, couleurs, ingrédients de saison, pour une expérience qui vous ressemble.",
  },
}

export function Cocktails() {
  const images = useSiteImages()
  const menuPhotos = useGallery('cocktails-menu')
  const winePhotos = useGallery('cocktails-vin')

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Nos cocktails
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        Des cocktails qui marquent les esprits
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">
        Des créations originales, entièrement adaptables et disponibles en version sans
        alcool. Chaque recette est pensée pour sublimer vos évènements privés et
        professionnels avec audace et élégance.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {EXPERIENCES_COCKTAILS.map(({ value, label }) => {
          const { icon: Icon, texte } = EXPERIENCE_CONTENT[value]
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
                  className="aspect-4/5 w-full object-cover"
                />
              )}
              <div className="flex flex-col gap-4 p-6">
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon className="size-5" />
                </span>
                <h2 className="font-heading text-lg font-semibold text-white">{label}</h2>
                <p className="text-sm text-white/60">{texte}</p>
              </div>
            </div>
          )
        })}
      </div>

      {menuPhotos.length > 0 && (
        <>
          <Separator className="my-16 bg-gold/15" />
          <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
            La carte
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
            Notre carte de cocktails
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">
            Un aperçu de nos créations, classées par univers de saveurs.
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
        </>
      )}

      {winePhotos.length > 0 && (
        <>
          <Separator className="my-16 bg-gold/15" />
          <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Une exclusivité
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
            Cocktails aux vins du domaine
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">
            Il est également possible de composer des cocktails signature à partir des vins
            de votre domaine, pour une expérience unique qui met en valeur votre lieu de
            réception.
          </p>
          <PhotoCarousel
            photos={winePhotos}
            aspect="aspect-2/3"
            fit="contain"
            itemBasis="basis-[68%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            gap="gap-3"
            showDots={false}
            className="mt-10"
          />
        </>
      )}

      <Separator className="my-16 bg-gold/15" />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
          <GlassWater className="size-5" />
        </span>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
          Avec ou sans alcool, à vous de choisir
        </h2>
        <p className="max-w-xl text-white/70">
          Toutes nos créations sont proposées en version classique ou sans alcool, sans
          compromis sur le goût ni la présentation.
        </p>
        <Button
          render={<Link to="/devis" />}
          nativeButton={false}
          size="lg"
          className="mt-4 bg-gold text-black hover:bg-gold/90"
        >
          Demander un devis
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
