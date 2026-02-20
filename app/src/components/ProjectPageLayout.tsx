import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Navbar } from '@/sections/Navbar';
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
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Navbar />
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
