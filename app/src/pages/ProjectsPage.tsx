import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/sections/Navbar';

interface ArchiveProject {
  num: string;
  name: string;
  desc: string;
  tags: string[];
  year: string;
  cat: string;
  slug?: string;
}

const ALL: ArchiveProject[] = [
  {
    num: '01',
    name: 'UX Interviewer',
    desc: 'AI-powered interview prep tool that simulates real product-design loops with real-time STAR scoring.',
    tags: ['Next.js', 'AWS', 'AI'],
    year: '2025',
    cat: 'Product',
    slug: 'ux-interviewer',
  },
  {
    num: '02',
    name: 'Homelab',
    desc: 'Self-hosted sandbox running Plex, Jellyfin, Pi-hole, nginx, and automated backups on Ubuntu Server.',
    tags: ['Docker', 'Ubuntu', 'Linux'],
    year: '2026',
    cat: 'Infra',
    slug: 'homelab',
  },
  {
    num: '03',
    name: 'Ballights',
    desc: 'ML-powered basketball highlight generator using computer vision to detect and clip key plays automatically.',
    tags: ['Python', 'YOLOv5', 'PyTorch'],
    year: '2026',
    cat: 'Toy',
    slug: 'ballights',
  },
  {
    num: '04',
    name: 'TCTools',
    desc: 'Post-image setup automation suite that streamlined device provisioning across an enterprise fleet.',
    tags: ['TypeScript', 'PowerShell'],
    year: '2024',
    cat: 'Internal',
    slug: 'TCTools',
  },
  {
    num: '05',
    name: 'ScriptHub',
    desc: 'Remote script execution platform for SRE teams — run, schedule, and audit PowerShell scripts across endpoints.',
    tags: ['Electron', 'PowerShell', 'AWS'],
    year: '2024',
    cat: 'Internal',
    slug: 'scripthub',
  },
  {
    num: '06',
    name: 'Department-Wide Site Redesign',
    desc: 'Redesigned and migrated 25+ pages for RIT Human Resources, modernizing the CMS and improving accessibility.',
    tags: ['Drupal', 'JavaScript', 'CSS'],
    year: '2022',
    cat: 'Work',
    slug: 'department-wide-site-redesign',
  },
];

const CATS = ['All', 'Product', 'Infra', 'Internal', 'Toy', 'Work'];

export function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? ALL : ALL.filter((p) => p.cat === filter);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Navbar />

          <div className="pt-8 pb-24">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground hover:text-accent transition-colors mb-12 group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Back to home
            </Link>

            {/* Headline */}
            <h1
              className="mb-6 leading-none tracking-[-0.03em] text-foreground"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 'clamp(56px, 9vw, 120px)',
                lineHeight: 0.95,
                whiteSpace: 'nowrap',
              }}
            >
              Every{' '}
              <em className="italic text-accent not-italic" style={{ fontStyle: 'italic' }}>
                thing
              </em>{' '}
              I've shipped
              <em className="italic text-accent" style={{ fontStyle: 'italic' }}>
                .
              </em>
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-muted-foreground max-w-xl mb-16 leading-relaxed">
              Six projects spanning client work, side projects, and weekends-with-too-much-coffee
              experiments. Filter by category — or read the whole archive.
            </p>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap mb-8 pb-6 border-b border-border items-center">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`text-[11px] tracking-[0.08em] uppercase px-3.5 py-2 rounded border transition-all cursor-pointer ${
                    filter === c
                      ? 'bg-accent text-black border-accent'
                      : 'text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground'
                  }`}
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {c}
                </button>
              ))}
              <span
                className="ml-auto text-[11px] tracking-[0.08em] uppercase text-muted-foreground self-center"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.length === 0 && (
                <div
                  className="col-span-full py-20 text-center text-muted-foreground text-sm"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  No projects in this category yet.
                </div>
              )}
              {filtered.map((p) => {
                const cardContent = (
                  <>
                    <div className="flex justify-between text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-4">
                      <span>
                        <span className="text-accent">No. {p.num}</span> · {p.cat}
                      </span>
                      <span>{p.year}</span>
                    </div>

                    <div
                      className="text-foreground mb-3"
                      style={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontSize: '32px',
                        lineHeight: 1.05,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {p.name}
                    </div>

                    <p className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-6">
                      {p.desc}
                    </p>

                    <div className="flex justify-between items-center mt-auto">
                      <span
                        className="text-[10px] tracking-[0.08em] uppercase text-muted-foreground"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        {p.tags.join(' · ')}
                      </span>
                      <span className="text-muted-foreground text-sm transition-all duration-200 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                  </>
                );

                const cardClass =
                  'group border border-border bg-card rounded-xl p-8 flex flex-col min-h-[260px] text-inherit no-underline transition-all duration-200 hover:border-border/60 hover:-translate-y-0.5';

                return p.slug ? (
                  <Link key={p.num} to={`/projects/${p.slug}`} className={cardClass}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={p.num} className={cardClass}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
