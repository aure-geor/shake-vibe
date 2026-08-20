import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
      <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">Erreur 404</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">Page introuvable</h1>
      <p className="mx-auto mt-4 max-w-md text-white/60">
        La page que vous cherchez n'existe pas ou plus. Vous pouvez retourner à l'accueil ou
        demander un devis pour votre évènement.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button render={<Link to="/" />} nativeButton={false} className="bg-gold text-black hover:bg-gold/90">
          Retour à l'accueil
        </Button>
        <Button
          render={<Link to="/devis" />}
          nativeButton={false}
          variant="outline"
          className="border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
        >
          Demander un devis
        </Button>
      </div>
    </div>
  )
}
