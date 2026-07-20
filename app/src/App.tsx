import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SectionNav } from '@/components/SectionNav';
import { SectionHeading } from '@/components/SectionHeading';
import { ExternalLink } from '@/components/ExternalLink';
import { featuredProjects, type ProjectDetail } from '@/data/projectDetails';

const homeSections = [
  { id: 'hero', label: 'Intro' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Teams' },
  { id: 'elsewhere', label: 'Elsewhere' },
  { id: 'contact', label: 'Contact' },
];

interface RoleItem {
  role: string;
  detail: string;
  period: string;
}

const experience: RoleItem[] = [
  {
    role: 'Site Reliability Engineer @ Vanguard',
    detail: 'Product-owned ScriptHub — an Electron + PowerShell remote script execution platform.',
    period: '2024 — 2025',
  },
  {
    role: 'Software Development Intern @ RIT ITS',
    detail: 'Built TCTools — post-image setup automation adopted department-wide.',
    period: '2024',
  },
  {
    role: 'Web Developer @ RIT HR',
    detail: 'Led a department-wide Drupal site redesign; migrated every HR site under one system.',
    period: '2022 — 2023',
  },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

interface PreviewState {
  title: string;
  description: string;
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
    project.repoUrl || project.liveUrl || project.blogUrl || project.devpostUrl;

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
            <h3 className="text-lg font-bold tracking-tight leading-snug">{project.title}</h3>
            <span className="text-xs font-mono text-neutral-400 whitespace-nowrap">
              {project.duration}
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">
            {project.subtitle}
          </p>
          {hasLinks && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.repoUrl && <ExternalLink href={project.repoUrl} label="GitHub" />}
              {project.liveUrl && <ExternalLink href={project.liveUrl} label="Live" />}
              {project.devpostUrl && <ExternalLink href={project.devpostUrl} label="Devpost" />}
              {project.blogUrl && <ExternalLink href={project.blogUrl} label="Blog" />}
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

  const showPreview = (title: string, description: string, image: string) => {
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
      <ThemeToggle />
      <SectionNav items={homeSections} />

      <div className="mx-auto max-w-[var(--page-max)]">
      <main className="max-w-[900px] px-8 md:px-12 py-24 md:py-32 flex flex-col gap-24">
        <section id="hero" className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Justin Zhao
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-snug">
              Full-Stack Engineer — Cloud Infrastructure &amp; Interface Design
            </p>
          </div>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[62ch]">
            Based in New York City. I build fast, resilient web products end-to-end — from AWS backends
            and self-hosted infrastructure to typography-first interfaces. Currently working on UX
            Interviewer, the first structured interview prep platform for UI/UX designers.
          </p>
        </section>

        <section id="projects" className="space-y-8">
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

        <section id="experience" className="space-y-8">
          <SectionHeading>Teams</SectionHeading>
          <div className="space-y-10">
            {experience.map((e) => (
              <div key={e.role} className="flex justify-between items-start gap-6">
                <div className="space-y-1.5">
                  <p className="text-lg font-bold tracking-tight leading-snug">{e.role}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">
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

        <section id="elsewhere" className="space-y-8">
          <SectionHeading>Elsewhere</SectionHeading>
          <div className="space-y-4">
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[62ch]">
              A dashboard for the things I track outside of work — code, reps, and problems solved,
              pulled live from GitHub, LeetCode, Duolingo, and my gym log.
            </p>
            <Link
              to="/life"
              className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Life dashboard
              <ArrowIcon className="w-3 h-3 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </section>

        <section id="contact" className="space-y-8 pb-32">
          <SectionHeading>Contact</SectionHeading>
          <div className="space-y-6">
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[62ch]">
              Open to full-time roles and collaborations on interesting web or infra problems.
            </p>
            <div className="flex flex-wrap gap-8">
              <a
                href="mailto:justinzhao1324@gmail.com"
                className="group flex items-center gap-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                justinzhao1324@gmail.com
                <ArrowIcon className="w-3 h-3 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://github.com/JzJoker"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
                <ArrowIcon className="w-3 h-3 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/justinzhao1324/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                LinkedIn
                <ArrowIcon className="w-3 h-3 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
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
