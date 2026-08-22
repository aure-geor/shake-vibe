import { Link } from 'react-router-dom'
import { ArrowRight, Flame, MapPin, Sparkles, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
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
      <h1 className={cn('mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl', t.color('about.title', 'white'))}>
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
          className={`space-y-6 text-base leading-relaxed sm:text-lg ${portrait ? 'sm:col-span-3' : ''}`}
        >
          <p className={t.color('about.intro1', 'gray')}>{t('about.intro1')}</p>
          <p className={t.color('about.intro2', 'gray')}>{t('about.intro2')}</p>
        </div>
      </div>

      <Separator className="my-14 bg-gold/15" />

      <h2 className={cn('text-center font-heading text-2xl font-semibold sm:text-3xl', t.color('about.journey.title', 'white'))}>
        {t('about.journey.title')}
      </h2>
      <p className={cn('mx-auto mt-3 max-w-xl text-center', t.color('about.journey.subtitle', 'gray'))}>
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
            <h3 className={cn('mt-4 font-heading text-lg font-semibold', t.color(`about.etape${i + 1}.lieu`, 'white'))}>
              {t(`about.etape${i + 1}.lieu`)}
            </h3>
            <p className={cn('mt-2 text-sm', t.color(`about.etape${i + 1}.texte`, 'gray'))}>
              {t(`about.etape${i + 1}.texte`)}
            </p>
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
          <h2 className={cn('font-heading text-2xl font-semibold sm:text-3xl', t.color('about.closing.title', 'white'))}>
            {t('about.closing.title')}
          </h2>
          <p className={cn('mx-auto mt-4 max-w-2xl', t.color('about.closing.text', 'gray'))}>
            {t('about.closing.text')}
          </p>
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
