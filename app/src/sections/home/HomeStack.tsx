const stackItems = [
  { name: 'TypeScript', cat: 'Language',  years: '4y', glyph: 'TS' },
  { name: 'React',      cat: 'Frontend',  years: '4y', glyph: '◐'  },
  { name: 'Next.js',    cat: 'Framework', years: '3y', glyph: '▲'  },
  { name: 'Python',     cat: 'Language',  years: '5y', glyph: '🐍' },
  { name: 'PostgreSQL', cat: 'Database',  years: '4y', glyph: '◇'  },
  { name: 'AWS',        cat: 'Cloud',     years: '3y', glyph: '☁'  },
  { name: 'Docker',     cat: 'Infra',     years: '3y', glyph: '▣'  },
  { name: 'PowerShell', cat: 'Scripting', years: '3y', glyph: '⚡' },
];

export function HomeStack() {
  return (
    <section className="pf-stack" id="stack">
      <div className="pf-container">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">03</span>
          <span>Stack</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">tools I reach for daily</span>
        </div>

        <div className="pf-stack-grid reveal-stagger">
          {stackItems.map(s => (
            <div key={s.name} className="pf-stack-cell">
              <div className="pf-stack-cell-icon" style={{ fontFamily: 'var(--mono)', fontSize: '14px' }}>
                {s.glyph}
              </div>
              <div className="pf-stack-cell-name">{s.name}</div>
              <div className="pf-stack-cell-years">{s.years} of practice</div>
              <div className="pf-stack-cell-cat">{s.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
