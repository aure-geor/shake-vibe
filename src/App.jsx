import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Prestations } from '@/pages/Prestations'
import { Cocktails } from '@/pages/Cocktails'
import { Devis } from '@/pages/Devis'
import { MentionsLegales } from '@/pages/MentionsLegales'
import { CGV } from '@/pages/CGV'
import { PolitiqueConfidentialite } from '@/pages/PolitiqueConfidentialite'
import { AdminLogin } from '@/pages/admin/AdminLogin'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { ResetPassword } from '@/pages/admin/ResetPassword'

function App() {
  return (
    <BrowserRouter>
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
        </Route>
        <Route path="admin/connexion" element={<AdminLogin />} />
        <Route path="admin/mot-de-passe-oublie" element={<ResetPassword />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
