import { Outlet } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ScrollToTop } from '@/components/layout/ScrollToTop'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
