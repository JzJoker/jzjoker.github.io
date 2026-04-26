import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { HomeNav } from '@/sections/home/HomeNav';
import { ProjectPageHeader } from '@/components/ProjectPageHeader';
import type { ProjectPageHeaderProps } from '@/components/ProjectPageHeader';

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
  const backLabel = backHref === '/' ? 'HOME' : 'PROJECTS';
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HomeNav />
      <div className="pt-20 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Link
            to={backHref}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider self-start"
          >
            &lt; {backLabel}
          </Link>
          <ProjectPageHeader {...headerProps} />
          {children}
        </div>
      </div>
    </div>
  );
}
