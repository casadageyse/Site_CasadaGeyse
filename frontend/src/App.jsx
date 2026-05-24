import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import ClassificadosPage from './pages/ClassificadosPage'
import ProfilePage from './pages/ProfilePage'
import RegrasPage from './pages/RegrasPage'
import AgeGate from './components/AgeGate'

function Analytics() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <AgeGate />
      <Routes>
        <Route path="/"                 element={<Home />} />
        <Route path="/classificados"    element={<ClassificadosPage />} />
        <Route path="/acompanhante/:id" element={<ProfilePage />} />
        <Route path="/acompanhantes"    element={<ClassificadosPage />} />
        <Route path="/regras"           element={<RegrasPage />} />
      </Routes>
    </BrowserRouter>
  )
}
