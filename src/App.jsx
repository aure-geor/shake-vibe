import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'

const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Prestations = lazy(() => import('@/pages/Prestations').then((m) => ({ default: m.Prestations })))
const Cocktails = lazy(() => import('@/pages/Cocktails').then((m) => ({ default: m.Cocktails })))
const Devis = lazy(() => import('@/pages/Devis').then((m) => ({ default: m.Devis })))
const MentionsLegales = lazy(() =>
  import('@/pages/MentionsLegales').then((m) => ({ default: m.MentionsLegales }))
)
const CGV = lazy(() => import('@/pages/CGV').then((m) => ({ default: m.CGV })))
const PolitiqueConfidentialite = lazy(() =>
  import('@/pages/PolitiqueConfidentialite').then((m) => ({ default: m.PolitiqueConfidentialite }))
)
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })))
const AdminDashboard = lazy(() =>
  import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
)
const ResetPassword = lazy(() =>
  import('@/pages/admin/ResetPassword').then((m) => ({ default: m.ResetPassword }))
)
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="qui-sommes-nous" element={<About />} />
            <Route path="prestations" element={<Prestations />} />
            <Route path="nos-cocktails" element={<Cocktails />} />
            <Route path="devis" element={<Devis />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="cgv" element={<CGV />} />
            <Route path="politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="admin/connexion" element={<AdminLogin />} />
          <Route path="admin/mot-de-passe-oublie" element={<ResetPassword />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
