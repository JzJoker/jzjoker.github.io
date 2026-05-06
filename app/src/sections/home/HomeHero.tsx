import { RoomCanvas } from '../../components/rooms/RoomCanvas';

export function HomeHero() {
  return (
    <section className="pf-hero" id="hero">
      <div className="pf-hero-glow" />
      <div className="pf-hero-glow-2" />
      <div className="pf-container-wide" style={{ width: '100%' }}>
        <div className="pf-hero-grid">
          <div className="pf-hero-inner">
            <div className="reveal-stagger">
              <div className="pf-hero-meta">
                <span>
                  <span className="pf-hero-meta-dot" style={{ background: 'var(--good)' }} />
                  NEW YORK · 40.71°N
                </span>
                <span><span className="pf-hero-meta-dot" />EST 2022</span>
                <span><span className="pf-hero-meta-dot" />v4.0.1</span>
              </div>

              <h1 className="pf-hero-title">
                Justin Zhao<em>.</em>
              </h1>

              <p className="pf-hero-subtitle">
                <strong>Full-stack engineer</strong> based in New York City. I build
                high-performance interfaces and the cloud infrastructure that runs them.
              </p>

              <div className="pf-hero-cta-row">
                <a href="#work" className="pf-btn pf-btn-primary">
                  View selected work
                  <span className="pf-btn-arrow">→</span>
                </a>
                <a href="#contact" className="pf-btn pf-btn-ghost">
                  Get in touch
                </a>
              </div>
            </div>
          </div>
          <div className="pf-hero-3d-wrap reveal">
            <RoomCanvas />
          </div>
        </div>

        <div className="pf-hero-stats reveal-stagger">
          <div className="pf-hero-stat">
            <div className="pf-hero-stat-value">2x</div>
            <div className="pf-hero-stat-label">Hackathon winner</div>
            <div className="pf-hero-stat-detail">HackPrinceton, ClayHacks</div>
          </div>
          <div className="pf-hero-stat">
            <div className="pf-hero-stat-value">5+</div>
            <div className="pf-hero-stat-label">Years in industry</div>
            <div className="pf-hero-stat-detail">Vanguard, RIT</div>
          </div>
          <div className="pf-hero-stat">
            <div className="pf-hero-stat-value">7</div>
            <div className="pf-hero-stat-label">Projects shipped</div>
            <div className="pf-hero-stat-detail">across 4 years</div>
          </div>
          <div className="pf-hero-stat">
            <div className="pf-hero-stat-value">∞</div>
            <div className="pf-hero-stat-label">Coffee consumed</div>
            <div className="pf-hero-stat-detail">measured in liters</div>
          </div>
        </div>
      </div>
    </section>
  );
}
