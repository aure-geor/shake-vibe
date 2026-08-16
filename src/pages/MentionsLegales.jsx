export function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Mentions légales
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        Mentions légales
      </h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/75 sm:text-base">
        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">1. Éditeur du site</h2>
          <p className="mt-3">
            Le présent site est édité par <strong className="text-white">Shake &amp; Vibe</strong>,
            entreprise individuelle, immatriculée sous le numéro SIREN 990 511 636, dont le
            siège est situé 105 chemin du Beausset au Castellet, 83330 Le Beausset.
          </p>
          <p className="mt-2">
            Numéro de TVA intracommunautaire : FR60990511636
            <br />
            Adresse électronique : contact@shakeandvibe.com
            <br />
            Téléphone : 06 62 28 02 69
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            2. Directeur de la publication
          </h2>
          <p className="mt-3">
            Le directeur de la publication est <strong className="text-white">Florian Lopez</strong>,
            en qualité d&apos;entrepreneur individuel exploitant Shake &amp; Vibe.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">3. Hébergement</h2>
          <p className="mt-3">
            Le site est hébergé par OVH SAS, société immatriculée au RCS de Lille Métropole
            sous le numéro 424 761 419 00045, dont le siège social est situé 2 rue Kellermann,
            59100 Roubaix, France.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            4. Propriété intellectuelle
          </h2>
          <p className="mt-3">
            La marque <strong className="text-white">Shake &amp; Vibe</strong> est une marque
            déposée. Toute reproduction, représentation, modification ou exploitation, totale
            ou partielle, du nom, du logo ou des éléments visuels associés, sans autorisation
            écrite préalable, est strictement interdite et constitue une contrefaçon
            sanctionnée par le Code de la propriété intellectuelle.
          </p>
          <p className="mt-2">
            L&apos;ensemble des photographies présentes sur ce site est la propriété exclusive
            de Shake &amp; Vibe ou lui a été concédé sous licence. Toute reproduction ou
            réutilisation de ces images, sur quelque support que ce soit, sans autorisation
            écrite préalable, est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            5. Protection des données personnelles
          </h2>
          <p className="mt-3">
            Les informations relatives au traitement des données personnelles collectées via
            ce site (notamment via le formulaire de demande de devis) sont détaillées dans
            notre{' '}
            <a href="/politique-de-confidentialite" className="text-gold underline underline-offset-2">
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">6. Contact</h2>
          <p className="mt-3">
            Pour toute question relative au site ou à son contenu, vous pouvez nous contacter à
            l&apos;adresse suivante :{' '}
            <a href="mailto:contact@shakeandvibe.com" className="text-gold underline underline-offset-2">
              contact@shakeandvibe.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
