import type { ReactNode } from 'react';

export interface ProjectPageHeaderProps {
  /** Optional hero image URL. If omitted, a white placeholder is shown. */
  heroImageUrl?: string;
  /** Tagline inside the hero card (e.g. "INTERVIEW PREP FOR UX DESIGNERS"). */
  heroTagline?: string;
  icon?: ReactNode;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  readTime: string;
  techStackSummary: string;
}

const heroMinHeight = 'min-h-[200px] sm:min-h-[240px]';

export function ProjectPageHeader({
  heroImageUrl,
  title,
  subtitle,
  role,
  duration,
  readTime,
  techStackSummary,
}: ProjectPageHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero: large white card (image or placeholder) */}
      <div
        className={`relative w-full rounded-xl overflow-hidden bg-[#0B0B0B] shadow-sm border border-border/20 ${heroMinHeight}`}
      >
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt=""
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div className={`absolute inset-0 bg-[#0B0B0B] ${heroMinHeight}`} aria-hidden />
        )}
      </div>

      {/* Title and subtitle: centered */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground tracking-wider max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Metadata card: 4 columns */}
      <div className="bento-card bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-wrap">
          <div className="px-5 py-4 flex-1 min-w-[120px]">
            <span className="text-xs text-muted-foreground tracking-wider uppercase block">
              Role
            </span>
            <span className="text-sm text-foreground font-medium mt-0.5 block">{role}</span>
          </div>
          <div className="px-5 py-4 flex-1 min-w-[120px]">
            <span className="text-xs text-muted-foreground tracking-wider uppercase block">
              Duration
            </span>
            <span className="text-sm text-foreground font-medium mt-0.5 block">{duration}</span>
          </div>
          <div className="px-5 py-4 flex-1 min-w-[120px]">
            <span className="text-xs text-muted-foreground tracking-wider uppercase block">
              Read Time
            </span>
            <span className="text-sm text-foreground font-medium mt-0.5 block">{readTime}</span>
          </div>
          <div className="px-5 py-4 flex-1 min-w-[120px]">
            <span className="text-xs text-muted-foreground tracking-wider uppercase block">
              Tech Stack
            </span>
            <span className="text-sm text-foreground font-medium mt-0.5 block">
              {techStackSummary}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
