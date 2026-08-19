import { Link } from 'react-router-dom'
import { asset } from '@/lib/assets'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { useSiteContent } from '@/hooks/useSiteContent'

export function SiteFooter() {
  const t = useSiteContent()
  return (
    <footer className="border-t border-gold/15 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link to="/" className="flex items-center">
          <img src={asset('logo.png')} alt="Shake & Vibe" className="h-18 w-auto" />
        </Link>

        <nav className="flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:gap-8">
          <Link to="/qui-sommes-nous" className="transition-colors hover:text-gold">
            {t('nav.qui_sommes_nous')}
          </Link>
          <Link to="/prestations" className="transition-colors hover:text-gold">
            {t('nav.prestations')}
          </Link>
          <Link to="/nos-cocktails" className="transition-colors hover:text-gold">
            {t('nav.cocktails')}
          </Link>
          <Link to="/devis" className="transition-colors hover:text-gold">
            {t('nav.devis')}
          </Link>
        </nav>

        <SocialLinks />
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs tracking-wide text-white/40 uppercase">
            © {new Date().getFullYear()} Shake &amp; Vibe - Barman privé à domicile pour vos évènements
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-white/40 sm:justify-end">
            <Link to="/mentions-legales" className="transition-colors hover:text-gold">
              Mentions légales
            </Link>
            <Link to="/cgv" className="transition-colors hover:text-gold">
              CGV
            </Link>
            <Link to="/politique-de-confidentialite" className="transition-colors hover:text-gold">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
