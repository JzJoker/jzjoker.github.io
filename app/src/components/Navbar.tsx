import { NavLink } from 'react-router-dom';
import { useDarkMode } from '@/lib/useDarkMode';

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `text-xs font-mono uppercase tracking-widest transition-colors ${
    isActive
      ? 'text-neutral-950 dark:text-white'
      : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-white'
  }`;
}

export function Navbar() {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none bg-neutral-50/70 dark:bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-[var(--page-max)] px-8 py-8 md:px-12 flex items-center justify-end">
        <nav className="pointer-events-auto flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            Gallery
          </NavLink>
          <button
            onClick={toggle}
            className="p-2 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
