import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeCmdK } from './HomeCmdK';

interface HomeNavProps {
  /** Set true on the home page so the nav sits below the 32px top marquee bar. */
  hasMarquee?: boolean;
}

export function HomeNav({ hasMarquee = false }: HomeNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [cmdkOpen, setCmdkOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <>
      <nav
        className={`pf-nav${scrolled ? ' scrolled' : ''}`}
        style={{ top: hasMarquee ? '32px' : '0' }}
      >
        <div className="pf-nav-inner">
          <Link to="/" className="pf-nav-brand">
            <span className="pf-nav-brand-mark">JZ</span>
            <span>Justin Zhao</span>
          </Link>

          <div className="pf-nav-links">
            <a className="pf-nav-link" href={hasMarquee ? '#work' : '/#work'}>Work</a>
            <a className="pf-nav-link" href={hasMarquee ? '#experience' : '/#experience'}>Experience</a>
            <a className="pf-nav-link" href={hasMarquee ? '#about' : '/#about'}>About</a>
            <Link className="pf-nav-link" to="/projects">All Projects</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="pf-nav-status">
              <span className="pf-status-dot" />
              Available
            </span>
            <button className="pf-nav-cta" onClick={() => setCmdkOpen(true)}>
              <span>Search</span>
              <kbd>⌘K</kbd>
            </button>
          </div>
        </div>
      </nav>

      <HomeCmdK open={cmdkOpen} onClose={() => setCmdkOpen(false)} />
    </>
  );
}
