import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'ALL PROJECTS', to: '/projects' as const },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'INFO', href: '#info' },
];

const linkClass = 'text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider';

export function Navbar() {
  return (
    <div className="bento-card col-span-full bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4">
      {/* Nav Links */}
      <nav className="flex items-center justify-center gap-6">
        {navLinks.map((link) =>
          'to' in link && link.to ? (
            <Link key={link.name} to={link.to} className={linkClass}>
              {link.name}
            </Link>
          ) : (
            <a key={link.name} href={link.href} className={linkClass}>
              {link.name}
            </a>
          )
        )}
      </nav>
      {/* Navigate Prompt */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-muted-foreground">{''}</span>
        <span className="text-sm text-muted-foreground tracking-wider">
          
        </span>
      </div>

      
    </div>
  );
}
