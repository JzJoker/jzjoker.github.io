import { StrictMode, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import './index.css';
import App from './App.tsx';
import { ProjectDetailPage } from './pages/ProjectDetail.tsx';
import { LifePage } from './pages/LifePage.tsx';
import { BlogPage } from './pages/BlogPage.tsx';
import { BlogPostPage } from './pages/BlogPost.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

inject();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/life" element={<LifePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
