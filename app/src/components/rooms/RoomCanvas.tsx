import { lazy, Suspense, useState } from 'react';

const BedroomRoom = lazy(() => import('../Room3D').then((m) => ({ default: m.Room3D })));
const OfficeRoom  = lazy(() => import('./OfficeRoom').then((m) => ({ default: m.OfficeRoom })));
const CafeRoom    = lazy(() => import('./CafeRoom').then((m) => ({ default: m.CafeRoom })));
const ClassroomRoom = lazy(() => import('./ClassroomRoom').then((m) => ({ default: m.ClassroomRoom })));

type RoomId = 'bedroom' | 'office' | 'cafe' | 'classroom';

const ROOMS: { id: RoomId; label: string }[] = [
  { id: 'bedroom',   label: 'home'      },
  { id: 'office',    label: 'office'    },
  { id: 'cafe',      label: 'café'      },
  { id: 'classroom', label: 'study'     },
];

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

export function RoomCanvas() {
  const [active, setActive] = useState<RoomId>('bedroom');

  return (
    <div style={{ width: '100%' }}>
      {/* canvas area */}
      <Suspense
        fallback={
          <div style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              loading
            </span>
          </div>
        }
      >
        {active === 'bedroom'   && <BedroomRoom />}
        {active === 'office'    && <OfficeRoom />}
        {active === 'cafe'      && <CafeRoom />}
        {active === 'classroom' && <ClassroomRoom />}
      </Suspense>

      {/* room switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 8 }}>
        {ROOMS.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
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
    </div>
  );
}
