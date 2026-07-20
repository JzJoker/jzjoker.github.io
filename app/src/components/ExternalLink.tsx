import { Link } from 'react-router-dom';

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 17L17 7 M8 7h9v9"
      />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function ExternalLink({
  href,
  label,
  size = 'sm',
  variant = 'label',
  onClick,
}: {
  href: string;
  label: string;
  size?: 'sm' | 'md';
  variant?: 'label' | 'inline';
  onClick?: (e: React.MouseEvent) => void;
}) {
  const isSmall = size === 'sm';
  const isInternal = href.startsWith('/');
  const base =
    "relative inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 after:ease-out hover:after:w-full";
  const variantClasses =
    variant === 'label'
      ? `font-mono uppercase tracking-widest ${isSmall ? 'text-[11px]' : 'text-sm'}`
      : `font-medium ${isSmall ? 'text-sm' : 'text-base'}`;
  const classes = `${base} ${variantClasses}`;
  const iconClass = isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3';

  if (isInternal) {
    return (
      <Link to={href} onClick={onClick} className={classes}>
        {label}
        <ArrowRight className={iconClass} />
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={classes}
    >
      {label}
      <ArrowUpRight className={iconClass} />
    </a>
  );
}

/**
 * Inline text link that inherits the surrounding font size/weight — for prose
 * (e.g. inside a heading, subtitle, or paragraph). Always blue with the same
 * left-to-right underline sweep on hover.
 */
export function InlineLink({
  href,
  children,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
}) {
  const isInternal = href.startsWith('/');
  const cls =
    "relative inline-flex items-baseline gap-1 text-blue-600 dark:text-blue-400 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 after:ease-out hover:after:w-full";

  if (isInternal) {
    return (
      <Link to={href} className={cls}>
        {children}
        {arrow && <ArrowRight className="w-3 h-3 self-center" />}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
      {arrow && <ArrowUpRight className="w-3 h-3 self-center" />}
    </a>
  );
}
