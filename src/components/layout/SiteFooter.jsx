import { Link } from 'react-router-dom'
import { asset } from '@/lib/assets'

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link to="/" className="flex items-center">
          <img src={asset('logo.png')} alt="Shake & Vibe" className="h-2622 w-auto" />
        </Link>

        <nav className="flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:gap-8">
          <Link to="/qui-sommes-nous" className="transition-colors hover:text-gold">
            Qui sommes-nous ?
          </Link>
          <Link to="/prestations" className="transition-colors hover:text-gold">
            Nos prestations effectuées
          </Link>
          <Link to="/devis" className="transition-colors hover:text-gold">
            Demande de devis
          </Link>
        </nav>

        <p className="text-xs tracking-wide text-white/40 uppercase">
          © {new Date().getFullYear()} Shake &amp; Vibe — Barman privé pour vos évènements
        </p>
      </div>
    </footer>
  )
}
