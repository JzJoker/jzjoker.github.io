const socialLinks = [
  { name: 'MEDIUM', href: 'https://medium.com/@justinzhao1324', target: '_blank' },
  { name: 'LINKEDIN', href: 'https://www.linkedin.com/in/justinzhao1/', target: '_blank' },
  { name: 'GITHUB', href: 'https://github.com/JzJoker', target: '_blank' },
  { name: 'EMAIL', href: 'mailto:justinzhao1324@gmail.com' },
];

export function ContactFooter() {
  return (
    <div className="bento-card col-span-full bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 min-h-[100px]">
      {/* Contact Prompt */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{'>'}</span>
        <span className="text-sm text-muted-foreground tracking-wider">
          INITIATE CONTACT...
        </span>
      </div>

      {/* Social Links */}
      <nav className="flex items-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
            target={link.target}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
