import { useState, useEffect } from 'react';
import { TopMarquee } from './sections/home/TopMarquee';
import { HomeNav } from './sections/home/HomeNav';
import { HomeHero } from './sections/home/HomeHero';
import { HomeWork } from './sections/home/HomeWork';
import { HomeExperience } from './sections/home/HomeExperience';
import { HomeStack } from './sections/home/HomeStack';
import { HomeAbout } from './sections/home/HomeAbout';
import { HomeContact } from './sections/home/HomeContact';
import { HomeCmdK } from './sections/home/HomeCmdK';

function useReveal() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        if (observed.has(el) || el.classList.contains('in')) return;
        observed.add(el);
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('in');
          return;
        }
        observer.observe(el);
      });
    };

    const t = setTimeout(observeAll, 50);
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        if (!el.classList.contains('in')) el.classList.add('in');
      });
    }, 3000);

    return () => {
      clearTimeout(t);
      clearTimeout(safety);
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}

function App() {
  const [cmdkOpen, setCmdkOpen] = useState(false);
  useReveal();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen((o) => !o);
      }
      if (e.key === 'Escape') setCmdkOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      className="pf-root"
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: 'var(--mono)',
        fontSize: '14px',
        lineHeight: '1.55',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <div className="grid-bg" aria-hidden="true" />

      <TopMarquee />
      <HomeNav onCmdkOpen={() => setCmdkOpen(true)} />

      <main>
        <HomeHero />
        <HomeWork />
        <HomeExperience />
        <HomeStack />
        <HomeAbout />
        <HomeContact />
      </main>

      <HomeCmdK open={cmdkOpen} onClose={() => setCmdkOpen(false)} />
    </div>
  );
}

export default App;
