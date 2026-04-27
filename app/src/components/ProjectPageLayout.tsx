import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { HomeNav } from '@/sections/home/HomeNav';
import { ProjectPageHeader } from '@/components/ProjectPageHeader';
import type { ProjectPageHeaderProps } from '@/components/ProjectPageHeader';
import { useReveal } from '@/hooks/useReveal';

interface ProjectPageLayoutProps extends ProjectPageHeaderProps {
  children: ReactNode;
  /** Where the back button goes. Defaults to /projects. */
  backHref?: string;
}

export function ProjectPageLayout({
  children,
  backHref = '/projects',
  ...headerProps
}: ProjectPageLayoutProps) {
  useReveal();
  const backLabel = backHref === '/' ? 'Home' : 'Projects';
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--mono)', fontSize: '14px', lineHeight: '1.55' }}>
      <div className="grid-bg" aria-hidden="true" />
      <HomeNav />
      <div className="pt-20 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Link
            to={backHref}
            className="reveal inline-flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground hover:text-accent transition-colors self-start group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Back to {backLabel}
          </Link>
          <ProjectPageHeader {...headerProps} />
          {children}
        </div>
      </div>
    </div>
  );
}
