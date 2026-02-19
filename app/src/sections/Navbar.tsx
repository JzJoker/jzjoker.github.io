const navLinks = [
  { name: 'WORKS', href: '#works' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'INFO', href: '#info' },
];

export function Navbar() {
  return (
    <div className="bento-card col-span-full bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Nav Links */}
      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
          >
            {link.name}
          </a>
        ))}
      </nav>
      {/* Navigate Prompt */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{''}</span>
        <span className="text-sm text-muted-foreground tracking-wider">
          
        </span>
      </div>

      
    </div>
  );
}
