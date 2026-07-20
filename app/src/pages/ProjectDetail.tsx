import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SectionNav, type SectionItem } from '@/components/SectionNav';
import { getProject, projects } from '@/data/projectDetails';

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-500 uppercase">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">{children}</h2>
  );
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <>
        <ThemeToggle />
        <div className="mx-auto max-w-[var(--page-max)]">
          <main className="max-w-[900px] px-8 md:px-12 py-24 md:py-32 flex flex-col gap-6">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">404</p>
            <h1 className="text-xl md:text-2xl font-medium tracking-tight">Project not found</h1>
            <Link
              to="/"
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Back home
            </Link>
          </main>
        </div>
      </>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const navItems: SectionItem[] = useMemo(() => {
    const items: SectionItem[] = [
      { id: 'header', label: 'Top' },
      { id: 'overview', label: 'Overview' },
    ];
    if (project.techStack?.length) items.push({ id: 'stack', label: 'Stack' });
    if (project.screenshots?.length) items.push({ id: 'gallery', label: 'Gallery' });
    if (project.conclusion?.length) items.push({ id: 'notes', label: 'Notes' });
    if (project.links?.length) items.push({ id: 'links', label: 'Links' });
    items.push({ id: 'next', label: 'Next' });
    return items;
  }, [project]);

  return (
    <>
      <ThemeToggle />
      <SectionNav items={navItems} />
      <div className="mx-auto max-w-[var(--page-max)]">
      <main className="max-w-[900px] px-8 md:px-12 py-24 md:py-32 flex flex-col gap-16">
        <Link
          to="/#projects"
          className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors w-fit"
        >
          ← Work
        </Link>

        <section id="header" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-medium tracking-tight">{project.title}</h1>
            <p className="text-neutral-500 dark:text-neutral-400">{project.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="space-y-1 pt-4">
              <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400">Role</dt>
              <dd className="text-sm">{project.role}</dd>
            </div>
            <div className="space-y-1 pt-4">
              <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Duration
              </dt>
              <dd className="text-sm">{project.duration}</dd>
            </div>
            <div className="space-y-1 pt-4 col-span-2 md:col-span-1">
              <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400">Stack</dt>
              <dd className="text-sm">{project.techSummary}</dd>
            </div>
          </dl>
        </section>

        {project.heroImage && (
          <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <section id="overview" className="space-y-4">
          <SectionHeading>Overview</SectionHeading>
          <div className="space-y-4">
            {project.intro.map((p, i) => (
              <p
                key={i}
                className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[720px]"
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {project.techStack && project.techStack.length > 0 && (
          <section id="stack" className="space-y-6">
            <SectionHeading>Tech Stack</SectionHeading>
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              {project.techStack.map((row) => (
                <div
                  key={`${row.layer}-${row.technology}`}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.5fr)] gap-4 py-4 border-b border-neutral-200 dark:border-neutral-800 text-sm"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {row.layer}
                  </span>
                  <span className="font-medium">{row.technology}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">{row.purpose}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.screenshots && project.screenshots.length > 0 && (
          <section id="gallery" className="space-y-6">
            <SectionHeading>Gallery</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((shot) => (
                <figure key={shot.src} className="space-y-2">
                  <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 aspect-video">
                    <img
                      src={shot.src}
                      alt={shot.caption ?? project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {shot.caption && (
                    <figcaption className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      {shot.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.conclusion && project.conclusion.length > 0 && (
          <section id="notes" className="space-y-4">
            <SectionHeading>Notes</SectionHeading>
            <div className="space-y-4">
              {project.conclusion.map((p, i) => (
                <p
                  key={i}
                  className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[720px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {project.links && project.links.length > 0 && (
          <section id="links" className="space-y-6">
            <SectionHeading>Links</SectionHeading>
            <div className="flex flex-wrap gap-8">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </section>
        )}

        <section id="next" className="pt-16 border-t border-neutral-200 dark:border-neutral-800 pb-32">
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex justify-between items-baseline gap-4"
          >
            <div className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Next project
              </p>
              <p className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {nextProject.title}
              </p>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              →
            </span>
          </Link>
        </section>
      </main>
      </div>
    </>
  );
}
