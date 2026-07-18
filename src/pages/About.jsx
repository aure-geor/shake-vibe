import { Link } from 'react-router-dom'
import { ArrowRight, Compass, MapPin, Plane, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const ETAPES = [
  {
    lieu: 'La Havane, Cuba',
    icon: Plane,
    texte:
      "Premières nuits derrière un bar de quartier, entre canne à sucre, rhum vieilli et rythmes de salsa. C'est là qu'est né le goût du geste précis et généreux.",
  },
  {
    lieu: 'Oaxaca, Mexique',
    icon: Compass,
    texte:
      "La découverte du mezcal artisanal et des agaves fumés, une leçon d'authenticité et de patience transmise par les mezcaleros locaux.",
  },
  {
    lieu: 'Tokyo, Japon',
    icon: Sparkles,
    texte:
      "L'apprentissage de la précision à la japonaise : la glace taillée à la main, le geste millimétré, le respect absolu du produit.",
  },
  {
    lieu: 'Florence, Italie',
    icon: MapPin,
    texte:
      "L'art de l'aperitivo : partager un verre simplement, sans artifice, au cœur d'une place ensoleillée entre amis.",
  },
]

export function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Qui sommes-nous ?
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        L&apos;histoire d&apos;un barman voyageur
      </h1>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-white/80 sm:text-lg">
        <p>
          Tout a commencé par une envie simple&nbsp;: partir. Sac sur le dos, shaker dans
          la valise, direction les bars du monde entier pour apprendre, goûter et
          comprendre ce qui fait, dans chaque culture, la magie d&apos;un bon cocktail.
          Des ruelles animées de La Havane aux bars discrets de Tokyo, chaque étape a
          laissé une empreinte durable&nbsp;: une technique, une saveur, une manière
          d&apos;accueillir l&apos;autre autour d&apos;un verre.
        </p>
        <p>
          De retour en France, cette expérience est devenue une conviction&nbsp;: un
          cocktail ne se limite pas à un mélange d&apos;ingrédients, c&apos;est un
          souvenir de voyage servi dans un verre. C&apos;est cette philosophie qui a donné
          naissance à <span className="font-medium text-gold">Shake &amp; Vibe</span>,
          un service de barman privé pensé pour transformer chaque évènement en une
          expérience sensorielle unique.
        </p>
      </div>

      <Separator className="my-14 bg-gold/15" />

      <h2 className="text-center font-heading text-2xl font-semibold sm:text-3xl">
        Un voyage, une inspiration
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
        Quelques étapes qui continuent aujourd&apos;hui d&apos;inspirer chaque carte de
        cocktails, sur-mesure pour chaque évènement.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {ETAPES.map(({ lieu, icon: Icon, texte }) => (
          <div
            key={lieu}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-gold/30"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">{lieu}</h3>
            <p className="mt-2 text-sm text-white/65">{texte}</p>
          </div>
        ))}
      </div>

      <Separator className="my-14 bg-gold/15" />

      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
          Aujourd&apos;hui, ce voyage continue dans chaque verre
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Chaque prestation Shake &amp; Vibe est composée sur-mesure&nbsp;: une écoute
          attentive de vos envies, un service soigné et une carte de cocktails unique,
          élaborée pour raconter, le temps d&apos;une soirée, une histoire qui vous
          ressemble.
        </p>
        <Button
          render={<Link to="/devis" />}
          nativeButton={false}
          size="lg"
          className="mt-8 bg-gold text-black hover:bg-gold/90"
        >
          Obtenir mon devis
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
