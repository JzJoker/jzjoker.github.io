import { useRef, useState, type ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { SectionNav } from '@/components/SectionNav';
import { SectionHeading } from '@/components/SectionHeading';
import { ExternalLink, InlineLink } from '@/components/ExternalLink';
import { ImageCarousel } from '@/components/ImageCarousel';
import { featuredProjects, type ProjectDetail } from '@/data/projectDetails';
import { carouselImages } from '@/data/galleryImages';

const homeSections = [
  { id: 'hero', label: 'Intro' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Teams' },
  { id: 'contact', label: 'Contact' },
];

interface RoleItem {
  role: string;
  company: string;
  companyUrl?: string;
  detail: string;
  period: string;
}

const experience: RoleItem[] = [
  {
    role: 'Site Reliability Engineer',
    company: 'Vanguard',
    companyUrl:
      'https://corporate.vanguard.com/content/corporatesite/us/en/corp/why-vanguard/sets-us-apart/client-centered-technology.html',
    detail: 'Product-owned ScriptHub — an Electron + PowerShell remote script execution platform.',
    period: '2024 — 2025',
  },
  {
    role: 'Software Development Intern',
    company: 'RIT ITS',
    companyUrl: 'https://www.rit.edu/its/',
    detail: 'Built TCTools — post-image setup automation adopted department-wide.',
    period: '2024',
  },
  {
    role: 'Web Developer',
    company: 'RIT HR',
    companyUrl: 'https://www.rit.edu/humanresources/',
    detail: 'Led a department-wide Drupal site redesign; migrated every HR site under one system.',
    period: '2022 — 2023',
  },
];

interface PreviewState {
  title: string;
  description: ReactNode;
  image: string;
  x: number;
  y: number;
  visible: boolean;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-widest border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-500 uppercase">
      {children}
    </span>
  );
}

function ProjectRow({
  project,
  onEnter,
  onMove,
  onLeave,
}: {
  project: ProjectDetail;
  onEnter: () => void;
  onMove: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const hasLinks =
    project.repoUrl || project.liveUrl || project.demoUrl || project.blogUrl || project.devpostUrl;

  return (
    <div
      className="project-row group py-3 md:py-4 transition-all duration-300"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="text-lg font-medium tracking-tight leading-snug">{project.title}</h3>
            <span className="text-xs font-mono text-neutral-400 whitespace-nowrap">
              {project.duration}
            </span>
          </div>
          <p className="text-sm leading-snug">
            {project.subtitle}
          </p>
          {hasLinks && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.repoUrl && <ExternalLink href={project.repoUrl} label="GitHub" />}
              {project.liveUrl && <ExternalLink href={project.liveUrl} label="Live" />}
              {project.demoUrl && <ExternalLink href={project.demoUrl} label="Demo" />}
              {project.devpostUrl && <ExternalLink href={project.devpostUrl} label="Devpost" />}
              {project.blogUrl && <ExternalLink href={project.blogUrl} label="Read" />}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [preview, setPreview] = useState<PreviewState>({
    title: '',
    description: '',
    image: '',
    x: 0,
    y: 0,
    visible: false,
  });
  const previewRef = useRef<HTMLDivElement | null>(null);

  const isMobile = () => window.innerWidth < 768;

  const showPreview = (title: string, description: ReactNode, image: string) => {
    if (isMobile()) return;
    setPreview((p) => ({ ...p, title, description, image, visible: true }));
  };

  const movePreview = (e: React.MouseEvent) => {
    if (isMobile()) return;
    const xOffset = 20;
    const yOffset = 20;
    const panelWidth = 320;
    const panelHeight = previewRef.current?.offsetHeight ?? 260;

    let x = e.clientX + xOffset;
    let y = e.clientY + yOffset;
    if (x + panelWidth > window.innerWidth) x = e.clientX - panelWidth - xOffset;
    if (y + panelHeight > window.innerHeight) y = e.clientY - panelHeight - yOffset;

    setPreview((p) => ({ ...p, x, y }));
  };

  const hidePreview = () => {
    if (isMobile()) return;
    setPreview((p) => ({ ...p, visible: false }));
  };

  return (
    <>
      <Navbar />
      <SectionNav items={homeSections} />

      <div className="mx-auto max-w-[var(--page-max)]">
      <main className="px-8 md:px-12 py-24 md:py-32 flex flex-col gap-24">
        <section id="hero">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-4xl font-medium tracking-tight leading-[1.05]">
                  Justin Zhao
                </h1>
                <p className="text-lg leading-snug">
                  Currently working on cloud infrastructure &amp; building LLM agents
                </p>
              </div>
              <p className="text-base leading-relaxed max-w-[62ch]">
                I like building cool things, winning hackathons, and experimenting. This site is where I write about my experiments, projects, competitions, and more. Read my write ups to learn about my technical process or view the gallery for a glimpse into my life!
              </p>
            </div>
            <div className="hidden lg:block">
              <ImageCarousel images={carouselImages} />
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-8 max-w-[900px]">
          <SectionHeading>Technical Work</SectionHeading>
          <div className="project-list">
            {featuredProjects.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                onEnter={() =>
                  showPreview(
                    project.title,
                    project.intro[0] ?? project.subtitle,
                    project.heroImage ?? '',
                  )
                }
                onMove={movePreview}
                onLeave={hidePreview}
              />
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-8 max-w-[900px]">
          <SectionHeading>Teams</SectionHeading>
          <div className="space-y-10">
            {experience.map((e) => (
              <div key={e.role} className="flex justify-between items-start gap-6">
                <div className="space-y-1.5">
                  <p className="text-lg font-medium tracking-tight leading-snug">
                    {e.role} @{' '}
                    {e.companyUrl ? (
                      <InlineLink href={e.companyUrl}>{e.company}</InlineLink>
                    ) : (
                      e.company
                    )}
                  </p>
                  <p className="text-sm leading-snug">
                    {e.detail}
                  </p>
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 whitespace-nowrap pt-1.5">
                  {e.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-8 pb-32 max-w-[900px]">
          <SectionHeading>Contact</SectionHeading>
          <div className="space-y-6">
            <p className="text-base leading-relaxed max-w-[62ch]">
              Open to full-time roles and collaborations on interesting web or infra problems.
            </p>
            <div className="flex flex-wrap gap-8">
              <ExternalLink
                href="mailto:justinzhao1324@gmail.com"
                label="justinzhao1324@gmail.com"
                variant="inline"
              />
              <ExternalLink
                href="https://github.com/JzJoker"
                label="GitHub"
                variant="inline"
              />
              <ExternalLink
                href="https://www.linkedin.com/in/justinzhao1/"
                label="LinkedIn"
                variant="inline"
              />
            </div>
          </div>
        </section>
      </main>
      </div>

      <div
        id="preview-panel"
        ref={previewRef}
        className={`hidden md:block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 pointer-events-none${
          preview.visible ? ' active' : ''
        }`}
        style={{ left: preview.x, top: preview.y }}
      >
        <div className="w-full h-40 bg-neutral-100 dark:bg-neutral-800 mb-4 overflow-hidden">
          {preview.image ? (
            <img src={preview.image} alt={preview.title} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{preview.title}</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {preview.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
