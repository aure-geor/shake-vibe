import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { asset } from '@/lib/assets'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const NAV_LINKS = [
  { to: '/qui-sommes-nous', label: 'Qui sommes-nous ?' },
  { to: '/prestations', label: 'Nos prestations effectuées' },
  { to: '/devis', label: 'Demande de devis' },
]

function NavLinks({ className, linkClassName, onNavigate }) {
  return (
    <nav className={className}>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              linkClassName,
              'transition-colors hover:text-gold',
              isActive ? 'text-gold' : 'text-white/85',
            ].join(' ')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 flex items-center justify-between gap-4 border-b px-4 transition-colors duration-300 sm:px-6 lg:px-10',
          scrolled
            ? 'border-gold/20 bg-black/90 backdrop-blur-md'
            : 'border-transparent bg-black',
        ].join(' ')}
      >
        <Link to="/" className="flex shrink-0 items-center py-2">
          <img
            src={asset('logo.png')}
            alt="Shake & Vibe — Barman privé pour vos évènements"
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <NavLinks className="hidden items-center gap-8 text-sm font-medium tracking-wide uppercase md:flex" />

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            aria-label="Ouvrir le menu"
            className="rounded-md p-2 text-white transition-colors hover:text-gold md:hidden"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-gold/20 bg-black text-white"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-10 flex flex-col items-start gap-2 px-2">
              <img src={asset('logo.png')} alt="" className="mb-6 h-14 w-auto" />
              <NavLinks
                className="flex w-full flex-col gap-1"
                linkClassName="w-full rounded-md px-2 py-3 text-base font-medium"
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <img
        src={asset('banniere.png')}
        alt="Shake & Vibe — Barman privé pour vos évènements : soirées, anniversaires, mariages, séminaires, ateliers cocktails"
        className="mx-auto block h-auto w-full max-w-4xl"
      />
    </>
  )
}
