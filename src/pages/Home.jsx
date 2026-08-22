import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Flame,
  Heart,
  HeartHandshake,
  Martini,
  Navigation,
  PartyPopper,
  Truck,
  Wine,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { services } from '@/data/services'
import { useSiteImages } from '@/hooks/useSiteImages'
import { useSiteContent } from '@/hooks/useSiteContent'

// HOW — notre méthode, ce qui nous différencie
const HOW_ICONS = [Martini, Truck, Wine, Flame, Navigation, HeartHandshake]

const SERVICE_ICONS = {
  mariages: Heart,
  'evenements-prives': PartyPopper,
  seminaires: Briefcase,
  'ateliers-cocktails': Martini,
}

export function Home() {
  const images = useSiteImages()
  const t = useSiteContent()
  const hero = images['accueil-hero']

  return (
    <div>
      {/* WHY — notre conviction */}
      <section className="relative overflow-hidden">
        {hero && (
          <>
            <img
              src={hero.url}
              alt={hero.alt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          </>
        )}
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <img src="/sunburst.png" alt="" className="mx-auto mb-6 h-16 w-auto sm:h-20" />
          <h1
            className={cn(
              'font-heading text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl',
              t.color('home.hero.title', 'white')
            )}
          >
            {t('home.hero.title')}
          </h1>
          <p className={cn('mx-auto mt-6 max-w-2xl text-base sm:text-lg', t.color('home.hero.subtitle', 'gray'))}>
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<Link to="/devis" />}
              nativeButton={false}
              size="lg"
              className="bg-gold text-black hover:bg-gold/90"
            >
              {t('cta.request_quote')}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href="#notre-approche" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
            >
              {t('home.hero.cta_secondary')}
            </Button>
          </div>
        </div>
      </section>

      {/* HOW — notre approche */}
      <section id="notre-approche" className="border-t border-gold/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className={cn('text-center text-xs font-medium tracking-[0.3em] uppercase', t.color('home.how.eyebrow', 'gold'))}>
            {t('home.how.eyebrow')}
          </p>
          <h2 className={cn('mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl', t.color('home.how.title', 'white'))}>
            {t('home.how.title')}
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_ICONS.map((Icon, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-gold/30"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon className="size-5" />
                </span>
                <h3
                  className={cn(
                    'font-heading text-lg font-semibold',
                    t.color(`home.how.item${i + 1}.title`, 'white')
                  )}
                >
                  {t(`home.how.item${i + 1}.title`)}
                </h3>
                <p className={cn('text-sm', t.color(`home.how.item${i + 1}.text`, 'gray'))}>
                  {t(`home.how.item${i + 1}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT — ce que nous proposons */}
      <section className="border-t border-gold/10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className={cn('text-center text-xs font-medium tracking-[0.3em] uppercase', t.color('home.what.eyebrow', 'gold'))}>
            {t('home.what.eyebrow')}
          </p>
          <h2 className={cn('mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl', t.color('home.what.title', 'white'))}>
            {t('home.what.title')}
          </h2>
          <p className={cn('mx-auto mt-4 max-w-2xl text-center', t.color('home.what.text', 'gray'))}>
            {t('home.what.text')}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ id }) => {
              const Icon = SERVICE_ICONS[id]
              const image = images[`accueil-${id}`]
              return (
                <div
                  key={id}
                  className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
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
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Icon className="size-5" />
                    </span>
                    <h3
                      className={cn(
                        'font-heading text-lg font-semibold',
                        t.color(`services.${id}.titre`, 'white')
                      )}
                    >
                      {t(`services.${id}.titre`)}
                    </h3>
                    <p className={cn('text-sm', t.color(`services.${id}.description`, 'gray'))}>
                      {t(`services.${id}.description`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              render={<Link to="/devis" />}
              nativeButton={false}
              size="lg"
              className="bg-gold text-black hover:bg-gold/90"
            >
              {t('cta.request_quote')}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link to="/prestations" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
            >
              {t('home.what.cta_secondary')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
