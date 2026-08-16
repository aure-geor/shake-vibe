import { useSiteContent } from '@/hooks/useSiteContent'

const SECTIONS = [1, 2, 3, 4, 5, 6]

export function MentionsLegales() {
  const t = useSiteContent()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Mentions légales
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        {t('legal.mentions.title')}
      </h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/75 sm:text-base">
        {SECTIONS.map((n) => (
          <section key={n}>
            <h2 className="font-heading text-lg font-semibold text-gold">
              {t(`legal.mentions.s${n}.title`)}
            </h2>
            <p className="mt-3 whitespace-pre-line">{t(`legal.mentions.s${n}.body`)}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
