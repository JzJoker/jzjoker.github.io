interface ExperienceEntry {
  current?: boolean;
  date: string;
  role: string;
  company: React.ReactNode;
  desc: string;
  tags: string[];
}

const entries: ExperienceEntry[] = [
  {
    current: true,
    date: '2025 — present',
    role: 'Independent',
    company: <>Building <span className="accent">UX Interviewer</span> · Open to collabs</>,
    desc: 'Working full-time on UX Interviewer while taking on select consulting engagements. Focused on AI-augmented productivity tools for designers and engineers.',
    tags: ['AI', 'Next.js', 'AWS', 'Founder'],
  },
  {
    date: '2024 — 2025',
    role: 'Site Reliability Engineer',
    company: <><span className="accent">Vanguard</span> · Malvern, PA</>,
    desc: 'SRE on the endpoint engineering team. Built ScriptHub, an internal Electron app for remote script execution, automating 35K+ endpoint tasks. Completed 20% of team backlog independently.',
    tags: ['AWS', 'Electron', 'Python', 'PowerShell', 'TypeScript'],
  },
  {
    date: '2024',
    role: 'Software Development Intern',
    company: <><span className="accent">RIT ITS</span> · Rochester, NY</>,
    desc: 'Built post-image setup automation tools (TCTools) that achieved 80% faster data backups and 100% department-wide adoption. Led design and development across WPF, C#, and PowerShell.',
    tags: ['TypeScript', 'C#', 'PowerShell', 'WPF', 'Figma'],
  },
  {
    date: '2022 — 2023',
    role: 'Web Developer',
    company: <><span className="accent">RIT HR</span> · Rochester, NY</>,
    desc: 'Web and media developer for the Department of Human Resources. Designed and created 25+ pages, migrated from Drupal 7 to Drupal 11 with new design system.',
    tags: ['Drupal', 'JavaScript', 'HTML', 'CSS', 'Figma'],
  },
];

export function HomeExperience() {
  return (
    <section className="pf-experience" id="experience">
      <div className="pf-container">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">02</span>
          <span>Experience</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">2022 → 2026</span>
        </div>

        <div className="pf-timeline">
          <div className="pf-timeline-side reveal">
            $ history --years
          </div>
          <div className="pf-timeline-list reveal-stagger">
            {entries.map((e, i) => (
              <div key={i} className={`pf-timeline-item${e.current ? ' current' : ''}`}>
                <div className="pf-timeline-date">
                  {e.date}{e.current ? ' · current' : ''}
                </div>
                <div className="pf-timeline-role">{e.role}</div>
                <div className="pf-timeline-company">{e.company}</div>
                <div className="pf-timeline-desc">{e.desc}</div>
                <div className="pf-timeline-tags">
                  {e.tags.map(t => (
                    <span key={t} className="pf-stack-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
