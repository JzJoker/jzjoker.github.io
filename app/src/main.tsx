import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import './index.css'
import App from './App.tsx'
import { ProjectsPage } from './pages/ProjectsPage.tsx'
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx'
import { ExperiencesPage } from './pages/ExperiencesPage.tsx'
import { LifePage } from './pages/LifePage.tsx'

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

inject();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/experience" element={<ExperiencesPage />} />
        <Route path="/life" element={<LifePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
