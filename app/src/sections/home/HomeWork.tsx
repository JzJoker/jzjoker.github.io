import { Link } from 'react-router-dom';

function UXIVisual() {
  return (
    <div
      className="pf-proj-visual"
      style={{ background: 'linear-gradient(140deg, #0f1410 0%, #181d18 100%)' }}
    >
      <div className="pf-proj-visual-grid" />
      <div
        style={{
          position: 'absolute', inset: '40px',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}
      >
        <div
          style={{
            background: 'rgba(20,20,24,0.8)', border: '1px solid #2e2e38',
            borderRadius: '6px', padding: '14px 16px', fontSize: '11px',
            fontFamily: 'var(--mono)', color: '#c5c2bc', backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ color: '#8a8780', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Interviewer · 00:42
          </div>
          Tell me about a time you redesigned a flow that you initially over-engineered.
        </div>
        <div
          style={{
            background: 'rgba(212,255,90,0.08)', border: '1px solid rgba(212,255,90,0.25)',
            borderRadius: '6px', padding: '14px 16px', fontSize: '11px',
            fontFamily: 'var(--mono)', color: '#e8e6e1', marginLeft: '40px',
          }}
        >
          <div style={{ color: '#d4ff5a', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            You · drafting…
          </div>
          Last spring I built a multi-step wizard for…
          <span style={{ display: 'inline-block', width: '6px', height: '11px', background: '#d4ff5a', verticalAlign: 'middle', marginLeft: '2px' }} />
        </div>
        <div
          style={{
            marginTop: 'auto', display: 'flex', gap: '8px', alignItems: 'center',
            fontSize: '10px', fontFamily: 'var(--mono)', color: '#5a5853',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f57' }} />
          Recording · STAR scoring active
          <div style={{ marginLeft: 'auto' }}>03:18 / 30:00</div>
        </div>
      </div>
    </div>
  );
}

function HomelabVisual() {
  const services = [
    { name: 'portainer',   status: 'running', cpu: '02%', color: '#8aff80' },
    { name: 'nginx-pm',    status: 'running', cpu: '01%', color: '#8aff80' },
    { name: 'uptime-kuma', status: 'running', cpu: '03%', color: '#8aff80' },
    { name: 'netdata',     status: 'running', cpu: '11%', color: '#8aff80' },
    { name: 'homepage',    status: 'running', cpu: '01%', color: '#8aff80' },
    { name: 'tailscale',   status: 'idle',    cpu: '00%', color: '#ffb454' },
  ];

  return (
    <div
      className="pf-proj-visual"
      style={{ background: 'linear-gradient(140deg, #0d1014 0%, #14181d 100%)' }}
    >
      <div className="pf-proj-visual-grid" />
      <div
        style={{
          position: 'absolute', inset: '40px',
          fontFamily: 'var(--mono)', fontSize: '11px', color: '#c5c2bc',
        }}
      >
        <div style={{ color: '#5a5853', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
          justin@homelab — uptime: 142d 06:33
        </div>
        {services.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto',
              gap: '12px', padding: '6px 0', borderBottom: '1px dashed #24242c',
            }}
          >
            <span>{s.name}</span>
            <span style={{ color: s.color, fontSize: '10px' }}>● {s.status}</span>
            <span style={{ color: '#8a8780', width: '32px', textAlign: 'right' }}>{s.cpu}</span>
          </div>
        ))}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', gap: '16px', fontSize: '10px', color: '#5a5853',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          <span>RAM 6.4/16 GB</span>
          <span>NET ↑12 ↓84 MB/s</span>
          <span style={{ marginLeft: 'auto', color: '#d4ff5a' }}>● healthy</span>
        </div>
      </div>
    </div>
  );
}

interface WorkCardProps {
  num: string;
  year: string;
  status: string;
  title: React.ReactNode;
  tagline: string;
  stack: string[];
  impact: { value: string; label: string }[];
  alt?: boolean;
  visual: React.ReactNode;
  slug: string;
}

function WorkCard({ num, year, status, title, tagline, stack, impact, alt, visual, slug }: WorkCardProps) {
  return (
    <div className={`pf-work-card${alt ? ' pf-work-card-alt' : ''}`}>
      <div className="pf-work-card-info">
        <div>
          <div className="pf-work-card-meta">
            <span><span className="pf-work-card-num">{num}</span> · {year}</span>
            <span>{status}</span>
          </div>
        </div>
        <div>
          <h3 className="pf-work-card-title">{title}</h3>
          <p className="pf-work-card-tagline">{tagline}</p>
          <div className="pf-work-card-stack">
            {stack.map(s => <span key={s} className="pf-stack-tag">{s}</span>)}
          </div>
        </div>
        <div className="pf-work-card-footer">
          <Link to={`/projects/${slug}`} state={{ from: '/' }} className="pf-work-card-link">
            Read case study
            <span className="pf-arrow">↗</span>
          </Link>
          <div className="pf-work-card-impact">
            {impact.map((it, i) => (
              <div key={i} className="pf-work-card-impact-item">
                <span className="pf-work-card-impact-value">{it.value}</span>
                <span className="pf-work-card-impact-label">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pf-work-card-visual">{visual}</div>
    </div>
  );
}

export function HomeWork() {
  return (
    <section className="pf-work" id="work">
      <div className="pf-container-wide">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">01</span>
          <span>Selected works</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">2024 — present</span>
        </div>

        <div className="pf-work-grid">
          <div className="reveal">
            <WorkCard
              num="No. 01"
              year="2025 — present"
              status="In production"
              title={<>UX <em>Interviewer</em></>}
              tagline="An AI-powered interview prep tool that simulates real product-design loops. Real-time scoring, STAR feedback, and a transcript that grades itself. Built for the next wave of designers entering big tech."
              stack={['Next.js', 'TypeScript', 'AWS Cognito', 'DynamoDB', 'ElevenLabs']}
              impact={[
                { value: '94%', label: 'Completion' },
              ]}
              visual={<UXIVisual />}
              slug="ux-interviewer"
            />
          </div>
          <div className="reveal">
            <WorkCard
              alt
              num="No. 02"
              year="2026 — present"
              status="Self-hosted"
              title={<>Home<em>lab</em></>}
              tagline="A self-hosted sandbox running on a Ubuntu mini-rack in my apartment. Plex, Jellyfin, Pi-hole, nginx reverse proxy, automated backups — all containerized. My escape hatch from the cloud."
              stack={['Docker', 'Ubuntu', 'Tailscale', 'nginx', 'Pi-hole']}
              impact={[
                { value: '142d', label: 'Uptime' },
                { value: '7', label: 'Services' },
              ]}
              visual={<HomelabVisual />}
              slug="homelab"
            />
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '64px' }}>
          <Link to="/projects" className="pf-btn pf-btn-ghost">
            View all projects
            <span className="pf-btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
