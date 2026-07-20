import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SectionNav, type SectionItem } from '@/components/SectionNav';
import { SectionHeading } from '@/components/SectionHeading';
import { ExternalLink } from '@/components/ExternalLink';
import { featuredProjects, getProject } from '@/data/projectDetails';

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-widest border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-500 uppercase">
      {children}
    </span>
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
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Project not found
            </h1>
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

  const currentFeaturedIndex = featuredProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentFeaturedIndex === -1
      ? featuredProjects[0]
      : featuredProjects[(currentFeaturedIndex + 1) % featuredProjects.length];
  const currentPath = `/work/${project.slug}`;

  const typedLinks = (
    [
      project.repoUrl && { label: 'GitHub', href: project.repoUrl },
      project.liveUrl && { label: 'Live', href: project.liveUrl },
      project.devpostUrl && { label: 'Devpost', href: project.devpostUrl },
      project.blogUrl && { label: 'Blog', href: project.blogUrl },
    ].filter(Boolean) as { label: string; href: string }[]
  ).filter((l) => l.href !== currentPath);

  const allLinks = [...typedLinks, ...(project.links ?? [])];

  const navItems: SectionItem[] = useMemo(() => {
    const items: SectionItem[] = [
      { id: 'header', label: 'Top' },
      { id: 'overview', label: 'Overview' },
    ];
    if (project.techStack?.length) items.push({ id: 'stack', label: 'Stack' });
    if (project.screenshots?.length) items.push({ id: 'gallery', label: 'Gallery' });
    if (project.conclusion?.length) items.push({ id: 'notes', label: 'Notes' });
    if (allLinks.length) items.push({ id: 'links', label: 'Links' });
    items.push({ id: 'next', label: 'Next' });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <section id="header" className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-snug max-w-[62ch]">
              {project.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            {typedLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {typedLinks.map((l) => (
                  <ExternalLink key={l.href} href={l.href} label={l.label} />
                ))}
              </div>
            )}
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="space-y-1.5 pt-4">
              <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400">Role</dt>
              <dd className="text-sm">{project.role}</dd>
            </div>
            <div className="space-y-1.5 pt-4">
              <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Duration
              </dt>
              <dd className="text-sm">{project.duration}</dd>
            </div>
            <div className="space-y-1.5 pt-4 col-span-2 md:col-span-1">
              <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Stack
              </dt>
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
                className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[62ch]"
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
                  className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[62ch]"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {allLinks.length > 0 && (
          <section id="links" className="space-y-6">
            <SectionHeading>Links</SectionHeading>
            <div className="flex flex-wrap gap-6">
              {allLinks.map((l) => (
                <ExternalLink key={l.href} href={l.href} label={l.label} size="md" />
              ))}
            </div>
          </section>
        )}

        <section id="next" className="pt-16 border-t border-neutral-200 dark:border-neutral-800 pb-32">
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex justify-between items-baseline gap-4"
          >
            <div className="space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Next project
              </p>
              <p className="text-2xl md:text-3xl font-medium tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
