import { asset } from '@/lib/assets'
import { Badge } from '@/components/ui/badge'

export function PrestationCard({ prestation, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(prestation)}
      className="group relative aspect-4/5 w-full overflow-hidden rounded-xl border border-white/10 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold hover:border-gold/50"
    >
      <img
        src={asset(prestation.image)}
        alt={`${prestation.titre} — ${prestation.lieu}`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

      <Badge className="absolute top-3 left-3 border-gold/40 bg-black/70 text-gold">
        {prestation.tag}
      </Badge>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-heading text-lg leading-tight font-semibold text-white">
          {prestation.titre}
        </h3>
        <p className="mt-1 text-sm text-white/70">{prestation.lieu}</p>
      </div>
    </button>
  )
}
