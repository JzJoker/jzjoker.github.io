import { lazy, Suspense } from 'react';

const BedroomRoom   = lazy(() => import('../Room3D').then((m) => ({ default: m.Room3D })));
const OfficeRoom    = lazy(() => import('./OfficeRoom').then((m) => ({ default: m.OfficeRoom })));
const CafeRoom      = lazy(() => import('./CafeRoom').then((m) => ({ default: m.CafeRoom })));
const ClassroomRoom = lazy(() => import('./ClassroomRoom').then((m) => ({ default: m.ClassroomRoom })));

export type RoomId = 'bedroom' | 'office' | 'cafe' | 'classroom';

export const ROOMS: { id: RoomId; label: string }[] = [
  { id: 'bedroom',   label: 'home'   },
  { id: 'office',    label: 'office' },
  { id: 'cafe',      label: 'café'   },
  { id: 'classroom', label: 'study'  },
];

/** Renders only the active room canvas — no switcher UI. */
export function RoomCanvas({ active }: { active: RoomId }) {
  return (
    <Suspense
      fallback={
        <div style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            rendering
          </span>
        </div>
      }
    >
      {active === 'bedroom'   && <BedroomRoom />}
      {active === 'office'    && <OfficeRoom />}
      {active === 'cafe'      && <CafeRoom />}
      {active === 'classroom' && <ClassroomRoom />}
    </Suspense>
  );
}
