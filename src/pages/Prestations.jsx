import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useSiteImages } from '@/hooks/useSiteImages'
import { useSiteContent } from '@/hooks/useSiteContent'

const DETAILS = ['detail1', 'detail2', 'detail3']

export function Prestations() {
  const images = useSiteImages()
  const t = useSiteContent()

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Nos prestations
      </p>
      <h1 className={cn('mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl', t.color('prestations.hero.title', 'white'))}>
        {t('prestations.hero.title')}
      </h1>
      <p className={cn('mx-auto mt-4 max-w-2xl text-center', t.color('prestations.hero.intro', 'gray'))}>
        {t('prestations.hero.intro')}
      </p>
      <p className={cn('mx-auto mt-4 max-w-2xl text-center font-heading text-lg', t.color('prestations.hero.tagline', 'gold'))}>
        {t('prestations.hero.tagline')}
      </p>

      {images['prestations-photo1'] && (
        <img
          src={images['prestations-photo1'].url}
          alt={images['prestations-photo1'].alt}
          loading="lazy"
          decoding="async"
          className="mx-auto mt-10 aspect-3/4 w-full max-w-md rounded-xl object-cover"
        />
      )}

      <Separator className="my-14 bg-gold/15" />

      <h2 className={cn('text-center font-heading text-2xl font-semibold sm:text-3xl', t.color('prestations.section1.title', 'white'))}>
        {t('prestations.section1.title')}
      </h2>
      <div className={cn('mx-auto mt-4 max-w-2xl space-y-4 text-center', t.color('prestations.section1.text1', 'gray'))}>
        <p>{t('prestations.section1.text1')}</p>
        <p className={t.color('prestations.section1.text2', 'gray')}>{t('prestations.section1.text2')}</p>
      </div>

      {(images['prestations-photo2'] || images['prestations-photo3']) && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {['prestations-photo2', 'prestations-photo3'].map(
            (key) =>
              images[key] && (
                <img
                  key={key}
                  src={images[key].url}
                  alt={images[key].alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/5 w-full rounded-xl object-cover"
                />
              )
          )}
        </div>
      )}

      <Separator className="my-14 bg-gold/15" />

      <h2 className={cn('text-center font-heading text-2xl font-semibold sm:text-3xl', t.color('prestations.section2.title', 'white'))}>
        {t('prestations.section2.title')}
      </h2>
      <div className="mx-auto mt-4 max-w-2xl space-y-4 text-center">
        <p className={t.color('prestations.section2.text1', 'gray')}>{t('prestations.section2.text1')}</p>
        <p className={t.color('prestations.section2.text2', 'gray')}>{t('prestations.section2.text2')}</p>
      </div>

      {images['prestations-photo4'] && (
        <img
          src={images['prestations-photo4'].url}
          alt={images['prestations-photo4'].alt}
          loading="lazy"
          decoding="async"
          className="mx-auto mt-10 aspect-3/4 w-full max-w-md rounded-xl object-cover"
        />
      )}

      <Separator className="my-14 bg-gold/15" />

      <h2 className={cn('text-center font-heading text-2xl font-semibold sm:text-3xl', t.color('prestations.section3.title', 'white'))}>
        {t('prestations.section3.title')}
      </h2>
      <p className={cn('mx-auto mt-4 max-w-2xl text-center', t.color('prestations.section3.intro', 'gray'))}>
        {t('prestations.section3.intro')}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {DETAILS.map((d) => (
          <div
            key={d}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-gold/30"
          >
            <h3 className={cn('font-heading text-lg font-semibold', t.color(`prestations.${d}.title`, 'white'))}>
              {t(`prestations.${d}.title`)}
            </h3>
            <p className={cn('mt-2 text-sm', t.color(`prestations.${d}.text`, 'gray'))}>
              {t(`prestations.${d}.text`)}
            </p>
          </div>
        ))}
      </div>

      {(images['prestations-photo5'] || images['prestations-photo6'] || images['prestations-photo7']) && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {['prestations-photo5', 'prestations-photo6', 'prestations-photo7'].map(
            (key) =>
              images[key] && (
                <img
                  key={key}
                  src={images[key].url}
                  alt={images[key].alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/5 w-full rounded-xl object-cover"
                />
              )
          )}
        </div>
      )}

      <Separator className="my-14 bg-gold/15" />

      <h2 className={cn('text-center font-heading text-2xl font-semibold sm:text-3xl', t.color('prestations.section4.title', 'white'))}>
        {t('prestations.section4.title')}
      </h2>
      <p className={cn('mx-auto mt-4 max-w-2xl text-center whitespace-pre-line', t.color('prestations.section4.text', 'gray'))}>
        {t('prestations.section4.text')}
      </p>

      {images['prestations-photo8'] && (
        <img
          src={images['prestations-photo8'].url}
          alt={images['prestations-photo8'].alt}
          loading="lazy"
          decoding="async"
          className="mx-auto mt-10 aspect-3/4 w-full max-w-md rounded-xl object-cover"
        />
      )}

      <Separator className="my-14 bg-gold/15" />

      <div className="text-center">
        <h2 className={cn('font-heading text-2xl font-semibold sm:text-3xl', t.color('prestations.closing.title', 'white'))}>
          {t('prestations.closing.title')}
        </h2>
        <p className={cn('mx-auto mt-4 max-w-2xl', t.color('prestations.closing.text', 'gray'))}>
          {t('prestations.closing.text')}
        </p>
        <Button
          render={<Link to="/devis" />}
          nativeButton={false}
          size="lg"
          className="mt-8 bg-gold text-black hover:bg-gold/90"
        >
          {t('prestations.cta')}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
