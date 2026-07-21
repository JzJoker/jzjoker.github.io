import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { projects } from '@/data/projectDetails';

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-500 uppercase">
      {children}
    </span>
  );
}

export function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[var(--page-max)]">
        <main className="px-8 md:px-12 py-24 md:py-32 flex flex-col gap-16">
          <section id="header" className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-medium tracking-tight leading-[1.05]">Blog</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Write-ups on the projects I've built, newest first.
              </p>
            </div>
          </section>

          <section id="articles">
            <div className="project-list divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="project-row group py-6 md:py-8 block transition-all duration-300 no-underline text-inherit"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="w-24 md:w-40 shrink-0 aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      {project.heroImage ? (
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="text-lg font-medium tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs font-mono text-neutral-400 whitespace-nowrap">
                            {project.duration}
                          </span>
                        </div>
                        <p>{project.subtitle}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
