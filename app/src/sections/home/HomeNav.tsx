import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HomeNavProps {
  onCmdkOpen: () => void;
}

export function HomeNav({ onCmdkOpen }: HomeNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`pf-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="pf-nav-inner">
        <a href="#hero" className="pf-nav-brand">
          <span className="pf-nav-brand-mark">JZ</span>
          <span>Justin Zhao</span>
        </a>

        <div className="pf-nav-links">
          <a className="pf-nav-link" href="#work">Work</a>
          <a className="pf-nav-link" href="#experience">Experience</a>
          <a className="pf-nav-link" href="#about">About</a>
          <Link className="pf-nav-link" to="/projects">All Projects</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="pf-nav-status">
            <span className="pf-status-dot"></span>
            Available
          </span>
          <button className="pf-nav-cta" onClick={onCmdkOpen}>
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>
    </nav>
  );
}
