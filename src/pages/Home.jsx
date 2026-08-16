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
import { services } from '@/data/services'
import { useSiteImages } from '@/hooks/useSiteImages'

// HOW — notre méthode, ce qui nous différencie
const HOW_ITEMS = [
  {
    icon: Martini,
    titre: 'Cocktails sur mesure',
    texte: 'Des recettes personnalisées adaptées à votre évènement et à vos envies.',
  },
  {
    icon: Truck,
    titre: 'Bar mobile autonome',
    texte: 'Une installation élégante et flexible, adaptée à tous types de lieux.',
  },
  {
    icon: Wine,
    titre: 'Verrerie disponible',
    texte: "Jusqu'à 240 verres disponibles pour vos évènements.",
  },
  {
    icon: Flame,
    titre: 'Animation & flair bartending',
    texte: 'Une expérience visuelle qui apporte une vraie valeur ajoutée à votre évènement.',
  },
  {
    icon: Navigation,
    titre: 'Déplacement en France et à l\'international',
    texte: 'Mariages, séminaires, soirées privées et évènements professionnels, partout en France et à l\'étranger.',
  },
  {
    icon: HeartHandshake,
    titre: 'Accompagnement personnalisé',
    texte: 'Conseils, préparation et suivi pour un évènement organisé en toute sérénité.',
  },
]

// WHAT — ce que nous proposons concrètement
const SERVICE_ICONS = {
  mariages: Heart,
  'evenements-prives': PartyPopper,
  seminaires: Briefcase,
  'ateliers-cocktails': Martini,
}

export function Home() {
  const images = useSiteImages()
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
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          </>
        )}
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Notre conviction
          </p>
          <h1 className="mt-6 font-heading text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl">
            Un cocktail ne se contente pas de se boire,
            <br className="hidden sm:block" /> il se vit et se raconte
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            Nous croyons que chaque évènement mérite mieux qu&apos;un simple service de
            boissons&nbsp;: il mérite un instant de spectacle, de précision et de partage.
            C&apos;est cette conviction qui anime chaque prestation Shake &amp; Vibe.
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
              render={<a href="#notre-approche" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
            >
              Découvrir notre approche
            </Button>
          </div>
        </div>
      </section>

      {/* HOW — notre approche */}
      <section id="notre-approche" className="border-t border-gold/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Notre approche
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
            L&apos;excellence au service de votre évènement
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_ITEMS.map(({ icon: Icon, titre, texte }) => (
              <div
                key={titre}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-gold/30"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-semibold text-white">{titre}</h3>
                <p className="text-sm text-white/60">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT — ce que nous proposons */}
      <section className="border-t border-gold/10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Ce que nous proposons
          </p>
          <h2 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
            Une prestation pensée pour chaque occasion
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ id, titre, description }) => {
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
                      className="aspect-4/5 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <span className="flex size-11 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{titre}</h3>
                    <p className="text-sm text-white/60">{description}</p>
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
              Voir nos réalisations
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
