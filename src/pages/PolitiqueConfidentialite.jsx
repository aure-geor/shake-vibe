export function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Politique de confidentialité
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        Politique de confidentialité
      </h1>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/75 sm:text-base">
        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            1. Responsable du traitement
          </h2>
          <p className="mt-3">
            Le responsable du traitement des données collectées sur ce site est{' '}
            <strong className="text-white">Shake &amp; Vibe</strong>. Pour toute question
            relative à vos données personnelles, vous pouvez nous contacter à l&apos;adresse
            suivante :{' '}
            <a href="mailto:contact@shakeandvibe.com" className="text-gold underline underline-offset-2">
              contact@shakeandvibe.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            2. Données collectées et finalité
          </h2>
          <p className="mt-3">
            Lorsque vous complétez le formulaire de demande de devis, nous collectons les
            données suivantes : nom, prénom, adresse email, numéro de téléphone, ainsi que les
            informations relatives à votre évènement (date, lieu, nombre de personnes,
            préférences de cocktails, description).
          </p>
          <p className="mt-2">
            Ces données sont utilisées exclusivement pour traiter votre demande, établir une
            proposition commerciale personnalisée et vous recontacter à cet effet. Elles ne
            sont ni cédées, ni vendues, ni utilisées à des fins de prospection commerciale
            tierce.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            3. Durée de conservation
          </h2>
          <p className="mt-3">
            Les données transmises via le formulaire de devis sont conservées pendant une
            durée maximale de 3 ans à compter de notre dernier échange, sauf obligation légale
            de conservation plus longue (notamment comptable) ou relation contractuelle en
            cours.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">
            4. Vos droits
          </h2>
          <p className="mt-3">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement et de portabilité de vos données, ainsi que d&apos;un
            droit d&apos;opposition et de limitation du traitement.
          </p>
          <p className="mt-2">
            Vous pouvez exercer ces droits à tout moment en nous écrivant à l&apos;adresse
            indiquée à l&apos;article 1. Vous disposez également du droit d&apos;introduire une
            réclamation auprès de la Commission Nationale de l&apos;Informatique et des
            Libertés (CNIL) — <span className="text-white">www.cnil.fr</span>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">5. Cookies</h2>
          <p className="mt-3">
            Ce site n&apos;utilise aucun cookie de mesure d&apos;audience ou de suivi
            publicitaire. Si un tel outil venait à être ajouté, cette politique serait mise à
            jour et un bandeau de consentement vous serait présenté conformément à la
            réglementation en vigueur.
          </p>
          <p className="mt-2">
            Un unique cookie technique (<code className="text-white">sv_session</code>) est
            déposé, exclusivement lors de la connexion à l&apos;espace d&apos;administration du
            site. Strictement nécessaire à l&apos;authentification, il n&apos;est jamais déposé
            lors d&apos;une navigation classique et ne requiert pas de consentement.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-gold">6. Hébergement des données</h2>
          <p className="mt-3">
            Les données collectées sont stockées sur un serveur situé en France, chez OVH SAS.
          </p>
        </section>
      </div>
    </div>
  )
}
