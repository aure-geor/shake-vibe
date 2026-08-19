import { useSiteContent } from '@/hooks/useSiteContent'

const SECTIONS = Array.from({ length: 26 }, (_, i) => i + 1)

export function CGV() {
  const t = useSiteContent()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Conditions générales de vente
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t('legal.cgv.title')}
      </h1>
      <p className="mt-3 text-center text-sm text-white/50">{t('legal.cgv.updated')}</p>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/75 sm:text-base">
        {SECTIONS.map((n) => (
          <section key={n}>
            <h2 className="font-heading text-lg font-semibold text-gold">
              {t(`legal.cgv.s${n}.title`)}
            </h2>
            <p className="mt-3 whitespace-pre-line">{t(`legal.cgv.s${n}.body`)}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
