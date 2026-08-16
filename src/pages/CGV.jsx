import { useSiteContent } from '@/hooks/useSiteContent'

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

      <p className="mx-auto mt-10 max-w-xl text-center whitespace-pre-line text-white/60">
        {t('legal.cgv.body')}
      </p>
    </div>
  )
}
