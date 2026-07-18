import { useState } from 'react'
import { prestations } from '@/data/prestations'
import { PrestationCard } from '@/components/PrestationCard'
import { PrestationDialog } from '@/components/PrestationDialog'

export function Prestations() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Nos prestations effectuées
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        Des évènements sur-mesure, partout en France
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white/65">
        Un aperçu de quelques prestations réalisées. Cliquez sur une vignette pour
        découvrir l&apos;évènement en détail.
      </p>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {prestations.map((prestation) => (
          <PrestationCard
            key={prestation.id}
            prestation={prestation}
            onOpen={setSelected}
          />
        ))}
      </div>

      <PrestationDialog
        prestation={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  )
}
