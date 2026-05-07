import { useEffect, useState } from 'react';
import { RoomCanvas, ROOMS } from '../../components/rooms/RoomCanvas';
import type { RoomId } from '../../components/rooms/RoomCanvas';
import { useCalendarRoom } from '../../hooks/useCalendarRoom';

const ROOM_STATUS: Record<string, string> = {
  bedroom:   'at home',
  office:    'in the office',
  cafe:      'at a café',
  classroom: 'in class',
};

const btnBase: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 9,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '3px 9px',
  borderRadius: 3,
  border: '1px solid transparent',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.15s',
  lineHeight: 1,
};

export function HomeHero() {
  const [isManual, setIsManual] = useState(false);
  const calendarRoom = useCalendarRoom();
  const [room, setRoom] = useState<RoomId | null>(null);

  useEffect(() => {
    if (calendarRoom && !isManual) setRoom(calendarRoom);
  }, [calendarRoom, isManual]);

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
            {room && <RoomCanvas active={room} />}
            <span style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-2)', pointerEvents: 'none', opacity: 0.9, lineHeight: 1.5 }}>
              {!room
                ? 'Currently loading...'
                : isManual
                  ? `Viewing ${ROOMS.find((r) => r.id === room)?.label} scene`
                  : `Currently ${ROOM_STATUS[room]}`}
            </span>
          </div>
        </div>

        {/* switcher lives outside pf-hero-3d-wrap so canvas CSS rules can't block it */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginTop: 10, paddingRight: 2, position: 'relative', zIndex: 3 }}>
          {ROOMS.map(({ id, label }) => {
            const isActive = id === room;
            return (
              <button
                key={id}
                onClick={() => { setIsManual(true); setRoom(id); }}
                style={{
                  ...btnBase,
                  borderColor: isActive ? 'var(--fg-3)' : 'transparent',
                  background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: isActive ? 'var(--fg-2)' : 'var(--fg-3)',
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                {label}
              </button>
            );
          })}
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
