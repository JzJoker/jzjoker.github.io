import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SectionNav } from '@/components/SectionNav';
import { projects, type ProjectDetail } from '@/data/projectDetails';

const homeSections = [
  { id: 'hero', label: 'Intro' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'hackathons', label: 'Awards' },
  { id: 'elsewhere', label: 'Elsewhere' },
  { id: 'contact', label: 'Contact' },
];

interface RoleItem {
  role: string;
  detail: string;
  period: string;
}

interface AwardItem {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  image: string;
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

const awards: AwardItem[] = [
  {
    title: 'HackPrinceton',
    subtitle: 'Weekend hackathon at Princeton University.',
    description: 'Shipped a working prototype in 36 hours alongside a small team.',
    year: '2024',
    image: '/images/awards/hackprinceton.jpg',
  },
  {
    title: 'ClayHacks',
    subtitle: 'RIT-hosted student hackathon.',
    description: 'Built and demoed a full-stack project end-to-end during the weekend event.',
    year: '2023',
    image: '/images/awards/clayhacks.jpg',
  },
  {
    title: 'UncommonHacks',
    subtitle: 'Student hackathon at the University of Chicago.',
    description: 'Traveled to compete; delivered a working project within the event window.',
    year: '2023',
    image: '/images/awards/uncommonhacks.jpg',
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
    <span className="font-mono text-[10px] border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-500 uppercase">
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
  return (
    <Link
      to={`/work/${project.slug}`}
      className="project-row group py-8 md:py-10 block cursor-pointer transition-all duration-300 no-underline text-inherit"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

function AwardRow({
  item,
  onEnter,
  onMove,
  onLeave,
  isActive,
  onMobileToggle,
}: {
  item: AwardItem;
  onEnter: () => void;
  onMove: (e: React.MouseEvent) => void;
  onLeave: () => void;
  isActive: boolean;
  onMobileToggle: () => void;
}) {
  return (
    <div
      className={`project-row group py-8 md:py-10 cursor-default transition-all duration-300${
        isActive ? ' active' : ''
      }`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onMobileToggle}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.subtitle}</p>
        </div>
        <p className="text-xs font-mono text-neutral-400">{item.year}</p>
      </div>
      <div className="mobile-expand md:hidden text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {item.description}
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
  const [activeRow, setActiveRow] = useState<string | null>(null);
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
        <section id="hero" className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-medium tracking-tight">Justin Zhao</h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Full-Stack Engineer — Cloud Infrastructure &amp; Interface Design
            </p>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[720px]">
            Based in New York City. I build fast, resilient web products end-to-end — from AWS backends
            and self-hosted infrastructure to typography-first interfaces. Currently working on UX
            Interviewer, the first structured interview prep platform for UI/UX designers.
          </p>
        </section>

        <section id="projects" className="space-y-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Technical Work
          </h2>
          <div className="project-list divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
            {projects.map((project) => (
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

        <section id="experience" className="space-y-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((e) => (
              <div key={e.role} className="flex justify-between items-start gap-6">
                <div className="space-y-1">
                  <p className="font-medium">{e.role}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{e.detail}</p>
                </div>
                <p className="text-xs font-mono text-neutral-400 whitespace-nowrap">{e.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="hackathons" className="space-y-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">Awards</h2>
          <div className="project-list divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
            {awards.map((a) => (
              <AwardRow
                key={a.title}
                item={a}
                onEnter={() => showPreview(a.title, a.description, a.image)}
                onMove={movePreview}
                onLeave={hidePreview}
                isActive={activeRow === a.title}
                onMobileToggle={() =>
                  setActiveRow((cur) => (cur === a.title ? null : a.title))
                }
              />
            ))}
          </div>
        </section>

        <section id="elsewhere" className="space-y-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Elsewhere
          </h2>
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-300 max-w-[720px]">
              A dashboard for the things I track outside of work — code, reps, and problems solved,
              pulled live from GitHub, LeetCode, Duolingo, and my gym log.
            </p>
            <Link
              to="/life"
              className="group inline-flex items-center gap-1 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Life dashboard
              <ArrowIcon className="w-3 h-3 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </section>

        <section id="contact" className="space-y-12 pb-32">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">Contact</h2>
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-300">
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
