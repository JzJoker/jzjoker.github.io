import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { sortedPosts } from '@/data/blogPosts';

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
                Welcome to my brain dump. Random articles about whatever I want to write about at the moment.
              </p>
            </div>
          </section>

          <section id="articles">
            {sortedPosts.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Nothing here yet — check back soon.
              </p>
            ) : (
              <div className="project-list divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800">
                {sortedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="project-row group py-6 md:py-8 block transition-all duration-300 no-underline text-inherit"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      {post.heroImage && (
                        <div className="w-24 md:w-40 shrink-0 aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                          <img
                            src={post.heroImage}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-4">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h3 className="text-lg font-medium tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>
                            <span className="text-xs font-mono text-neutral-400 whitespace-nowrap">
                              {post.displayDate}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {post.subtitle}
                          </p>
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 whitespace-nowrap">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
