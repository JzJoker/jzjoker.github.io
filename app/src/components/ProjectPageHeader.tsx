import type { ReactNode } from 'react';

export interface ProjectPageHeaderProps {
  /** Optional hero image URL. If omitted, a white placeholder is shown. */
  heroImageUrl?: string;
  /** Tagline inside the hero card (e.g. "INTERVIEW PREP FOR UX DESIGNERS"). */
  heroTagline?: string;
  icon?: ReactNode;
  title: ReactNode;
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
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h1 className="pf-work-card-title" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: '12px' }}>
          {title}
        </h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--fg-2)', letterSpacing: '0.04em', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      </div>

      {/* Metadata card: 4 columns */}
      <div className="reveal" style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[
            { label: 'Role', value: role },
            { label: 'Duration', value: duration },
            { label: 'Read Time', value: readTime },
            { label: 'Tech Stack', value: techStackSummary },
          ].map((item, i, arr) => (
            <div key={i} style={{ padding: '16px 20px', flex: '1', minWidth: '120px', borderRight: i < arr.length - 1 ? '1px solid var(--line)' : undefined }}>
              <span style={{ display: 'block', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: '6px' }}>
                {item.label}
              </span>
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--fg)', fontFamily: 'var(--mono)' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
