import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { getPost } from '@/data/blogPosts';

export function BlogPostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = getPost(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-[var(--page-max)]">
          <main className="max-w-[900px] px-8 md:px-12 py-24 md:py-32 flex flex-col gap-6">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">404</p>
            <h1 className="text-4xl font-medium tracking-tight leading-[1.05]">
              Post not found
            </h1>
            <Link
              to="/blog"
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Back to blog
            </Link>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[var(--page-max)]">
        <main className="max-w-[720px] mx-auto px-8 md:px-12 py-24 md:py-32 flex flex-col gap-10">
          <Link
            to="/blog"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors w-fit"
          >
            ← Blog
          </Link>

          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              {post.title}
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-snug max-w-[62ch]">
              {post.subtitle}
            </p>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 pt-2">
              <span>{post.displayDate}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <article className="flex flex-col gap-6">{post.content}</article>

          {post.externalUrl && (
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              Originally published on{' '}
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-neutral-950 dark:hover:text-white transition-colors"
              >
                Medium
              </a>
              .
            </p>
          )}
        </main>
      </div>
    </>
  );
}
