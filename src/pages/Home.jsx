import { Link } from 'react-router-dom'
import { ArrowRight, GlassWater, MapPinned, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CARDS = [
  {
    to: '/qui-sommes-nous',
    icon: Sparkles,
    title: 'Qui sommes-nous ?',
    text: "Un barman, un tour du monde, et des cocktails qui racontent une histoire.",
  },
  {
    to: '/prestations',
    icon: MapPinned,
    title: 'Nos prestations effectuées',
    text: 'Mariages, anniversaires, soirées privées et événements professionnels réalisés partout en France.',
  },
  {
    to: '/devis',
    icon: GlassWater,
    title: 'Demande de devis',
    text: 'Décrivez votre évènement, recevez une proposition sur-mesure sous 48h.',
  },
]

export function Home() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
          Barman privé pour vos évènements
        </p>
        <h1 className="mt-6 font-heading text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
          Des cocktails d&apos;exception,
          <br className="hidden sm:block" /> une expérience inoubliable
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
          Mariages, anniversaires, soirées privées ou évènements professionnels : je crée
          pour chaque occasion une carte de cocktails sur-mesure, inspirée de mes voyages
          à travers le monde.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={<Link to="/devis" />}
            nativeButton={false}
            size="lg"
            className="bg-gold text-black hover:bg-gold/90"
          >
            Obtenir mon devis
            <ArrowRight className="size-4" />
          </Button>
          <Button
            render={<Link to="/prestations" />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
          >
            Voir nos prestations
          </Button>
        </div>
      </section>

      <section className="border-t border-gold/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:grid-cols-3 sm:px-10">
          {CARDS.map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-gold/40"
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon className="size-5" />
              </span>
              <h2 className="font-heading text-lg font-semibold text-white">{title}</h2>
              <p className="text-sm text-white/60">{text}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Découvrir <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
