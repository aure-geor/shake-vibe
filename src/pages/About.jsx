import { Link } from 'react-router-dom'
import { ArrowRight, Flame, MapPin, Sparkles, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSiteImages } from '@/hooks/useSiteImages'
import { useSiteContent } from '@/hooks/useSiteContent'

const ETAPE_ICONS = [Wind, MapPin, Flame, Sparkles]

export function About() {
  const images = useSiteImages()
  const t = useSiteContent()
  const portrait = images['apropos-portrait']
  const surMesure = images['apropos-sur-mesure']

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Qui sommes-nous ?
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t('about.title')}
      </h1>

      <div className={`mt-10 gap-10 ${portrait ? 'sm:grid sm:grid-cols-5 sm:items-start' : ''}`}>
        {portrait && (
          <img
            src={portrait.url}
            alt={portrait.alt}
            className="mb-8 aspect-4/5 w-full rounded-xl object-cover sm:col-span-2 sm:mb-0"
          />
        )}
        <div
          className={`space-y-6 text-base leading-relaxed text-white/80 sm:text-lg ${portrait ? 'sm:col-span-3' : ''}`}
        >
          <p>{t('about.intro1')}</p>
          <p>{t('about.intro2')}</p>
        </div>
      </div>

      <Separator className="my-14 bg-gold/15" />

      <h2 className="text-center font-heading text-2xl font-semibold sm:text-3xl">
        {t('about.journey.title')}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
        {t('about.journey.subtitle')}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {ETAPE_ICONS.map((Icon, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-gold/30"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              {t(`about.etape${i + 1}.lieu`)}
            </h3>
            <p className="mt-2 text-sm text-white/65">{t(`about.etape${i + 1}.texte`)}</p>
          </div>
        ))}
      </div>

      <Separator className="my-14 bg-gold/15" />

      <div className="relative overflow-hidden rounded-2xl">
        {surMesure && (
          <>
            <img
              src={surMesure.url}
              alt={surMesure.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
          </>
        )}
        <div className="relative px-6 py-16 text-center sm:py-20">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            {t('about.closing.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">{t('about.closing.text')}</p>
          <Button
            render={<Link to="/devis" />}
            nativeButton={false}
            size="lg"
            className="mt-8 bg-gold text-black hover:bg-gold/90"
          >
            {t('cta.request_quote')}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
