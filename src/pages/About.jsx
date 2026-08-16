import { Link } from 'react-router-dom'
import { ArrowRight, Flame, MapPin, Sparkles, Wind } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSiteImages } from '@/hooks/useSiteImages'

const ETAPES = [
  {
    lieu: 'Mexique',
    icon: Wind,
    texte:
      "La découverte du mezcal artisanal et des agaves fumés, une leçon d'authenticité transmise par les mezcaleros locaux.",
  },
  {
    lieu: 'Brésil',
    icon: MapPin,
    texte:
      "La caipirinha et l'énergie du flair bartending, où performance visuelle et convivialité ne font qu'un.",
  },
  {
    lieu: 'Belize',
    icon: Flame,
    texte:
      "Le rhum artisanal et le cacao maya, entre forêt tropicale et mer des Caraïbes, une richesse de saveurs encore méconnue.",
  },
  {
    lieu: 'Caraïbes',
    icon: Sparkles,
    texte:
      "D'île en île, la tradition du rhum épicé et des cocktails tiki, où chaque recette raconte l'histoire d'un archipel.",
  },
]

export function About() {
  const images = useSiteImages()
  const portrait = images['apropos-portrait']
  const surMesure = images['apropos-sur-mesure']

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Qui sommes-nous ?
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        Florian, l&apos;art de la mixologie et du flair bartending
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
          <p>
            Tout commence par une passion pour le{' '}
            <span className="font-medium text-gold">flair bartending</span>&nbsp;: le geste
            spectaculaire qui transforme un service en performance. Florian y a bâti une
            expertise reconnue à l&apos;international, où précision technique et sens du
            spectacle ne font qu&apos;un.
          </p>
          <p>
            Cette expertise s&apos;est forgée au fil de voyages en Amérique centrale, au
            Brésil et dans les Caraïbes, berceau des plus grandes traditions de bar. De
            retour en France, une
            conviction s&apos;impose&nbsp;: un cocktail ne se boit pas, il se vit.
            C&apos;est cette philosophie qui a donné naissance à{' '}
            <span className="font-medium text-gold">Shake &amp; Vibe</span>.
          </p>
        </div>
      </div>

      <Separator className="my-14 bg-gold/15" />

      <h2 className="text-center font-heading text-2xl font-semibold sm:text-3xl">
        Un voyage au cœur des spiritueux d&apos;Amérique latine et des Caraïbes
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

      <div className="relative overflow-hidden rounded-2xl">
        {surMesure && (
          <>
            <img
              src={surMesure.url}
              alt={surMesure.alt}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
          </>
        )}
        <div className="relative px-6 py-16 text-center sm:py-20">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            Aujourd&apos;hui, cette expertise se retrouve dans chaque évènement
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
    </div>
  )
}
