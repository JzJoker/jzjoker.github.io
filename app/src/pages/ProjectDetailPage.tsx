import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projectDetails } from '@/data/projectDetails';
import { experiences } from '@/data/experiences';
import { ProjectPageLayout } from '@/components/ProjectPageLayout';
import { Navbar } from '@/sections/Navbar';
import { ImageLightboxProvider } from '@/components/ImageLightbox';

const validProjectSlugs = new Set(
  Object.values(experiences).flatMap((e) =>
    e.projects.map((p) => p.slug).filter((s): s is string => Boolean(s))
  )
);
import { projectDetailContent } from '@/components/ProjectDetailContent';

function UnderConstructionPlaceholder({
  slug,
  backHref = '/projects',
}: {
  slug: string;
  backHref?: string;
}) {
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
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
          <div className="bento-card bg-card border border-border rounded-xl p-12 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground tracking-wider uppercase">
              Under construction
            </p>
            <h1 className="text-xl font-bold uppercase text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground max-w-md">
              This project page is being built. Check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCROLL_THRESHOLD = 400;

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const from = location.state?.from as string | undefined;
  const backHref = from === '/' ? '/' : '/projects';
  const data = slug ? projectDetails[slug] : undefined;

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const notFound = !data && (!slug || !validProjectSlugs.has(slug));
  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-muted-foreground text-sm">Project not found.</p>
        <Link
          to="/projects"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
        >
          &lt; BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  const isUnderConstruction = !data && slug && validProjectSlugs.has(slug);

  const backToTopButton = showBackToTop ? (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex size-10 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-md transition-opacity hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  ) : null;

  if (isUnderConstruction) {
    return (
      <>
        <UnderConstructionPlaceholder slug={slug!} backHref={backHref} />
        {backToTopButton}
      </>
    );
  }

  const { header, introParagraphs, conclusionParagraphs } = data!;
  const CustomContent = slug ? projectDetailContent[slug] : undefined;

  return (
    <>
      <ImageLightboxProvider>
        <ProjectPageLayout
          backHref={backHref}
          title={header.title}
          subtitle={header.subtitle}
          role={header.role}
          duration={header.duration}
          readTime={header.readTime}
          techStackSummary={header.techStackSummary}
          heroImageUrl={header.heroImageUrl}
          icon={header.icon}
        >
          <div className="flex flex-col gap-6">
            {/* Intro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {introParagraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            {CustomContent && <CustomContent data={data!} />}

            {/* Conclusion */}
            <div className="flex flex-col gap-3">
              {conclusionParagraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </ProjectPageLayout>
        {backToTopButton}
      </ImageLightboxProvider>
    </>
  );
}
