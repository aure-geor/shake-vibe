import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Prestations } from '@/pages/Prestations'
import { Devis } from '@/pages/Devis'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="qui-sommes-nous" element={<About />} />
          <Route path="prestations" element={<Prestations />} />
          <Route path="devis" element={<Devis />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
