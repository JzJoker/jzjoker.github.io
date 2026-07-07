import { useMemo, useRef, useState } from 'react';

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
}

interface HeatmapProps {
  data: HeatmapDay[];
  weeks?: number;
  colorAccent?: string; // hex or rgb; defaults to accent lime
  emptyColor?: string;
  label?: string;
  unitLabel?: string; // e.g. "contributions", "problems"
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

interface Hover {
  day: HeatmapDay;
  x: number;
  y: number;
}

export function Heatmap({
  data,
  weeks = 53,
  colorAccent = '#d4ff5a',
  emptyColor = 'rgba(255,255,255,0.05)',
  label,
  unitLabel = 'contributions',
}: HeatmapProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Hover | null>(null);

  const { grid, months, max } = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of data) map.set(d.date, d.count);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const endDay = new Date(today);
    endDay.setUTCDate(endDay.getUTCDate() + (6 - endDay.getUTCDay()));
    const start = new Date(endDay);
    start.setUTCDate(start.getUTCDate() - (weeks * 7 - 1));

    const grid: (HeatmapDay | null)[][] = [];
    let maxCount = 0;
    const monthCols: { col: number; label: string }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < weeks; w++) {
      const col: (HeatmapDay | null)[] = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(start);
        day.setUTCDate(day.getUTCDate() + w * 7 + d);
        if (day > today) {
          col.push(null);
          continue;
        }
        const iso = toISODate(day);
        const count = map.get(iso) ?? 0;
        if (count > maxCount) maxCount = count;
        col.push({ date: iso, count });
        if (d === 0) {
          const m = day.getUTCMonth();
          if (m !== lastMonth) {
            monthCols.push({ col: w, label: MONTH_LABELS[m] });
            lastMonth = m;
          }
        }
      }
      grid.push(col);
    }

    return { grid, months: monthCols, max: maxCount };
  }, [data, weeks]);

  const [ar, ag, ab] = hexToRgb(colorAccent);

  const cellColor = (count: number): string => {
    if (count <= 0 || max <= 0) return emptyColor;
    const t = Math.min(1, Math.log(count + 1) / Math.log(max + 1));
    const alpha = 0.18 + t * 0.82;
    return `rgba(${ar},${ag},${ab},${alpha.toFixed(3)})`;
  };

  const cellSize = 11;
  const gap = 3;
  const width = weeks * (cellSize + gap);
  const height = 7 * (cellSize + gap) + 18;

  const handleEnter = (day: HeatmapDay, e: React.MouseEvent<SVGRectElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    setHover({
      day,
      x: rect.left - wrapperRect.left + rect.width / 2,
      y: rect.top - wrapperRect.top,
    });
  };

  return (
    <div ref={wrapperRef} className="w-full" style={{ position: 'relative' }}>
      {label && (
        <div className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-2">
          {label}
        </div>
      )}
      <div className="overflow-x-auto" style={{ direction: 'rtl' }}>
        <svg width={width} height={height} style={{ display: 'block', direction: 'ltr' }}>
          {months.map((m) => (
            <text
              key={`${m.col}-${m.label}`}
              x={m.col * (cellSize + gap)}
              y={10}
              fontSize={9}
              fontFamily='"JetBrains Mono", monospace'
              fill="rgba(255,255,255,0.4)"
            >
              {m.label}
            </text>
          ))}
          {grid.map((col, wi) =>
            col.map((day, di) => {
              if (!day) return null;
              const x = wi * (cellSize + gap);
              const y = 16 + di * (cellSize + gap);
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx={2}
                  ry={2}
                  fill={cellColor(day.count)}
                  onMouseEnter={(e) => handleEnter(day, e)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer' }}
                />
              );
            }),
          )}
        </svg>
      </div>
      {hover && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            left: hover.x,
            top: hover.y - 8,
            transform: 'translate(-50%, -100%)',
            pointerEvents: 'none',
            background: 'rgba(10,10,12,0.96)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            padding: '6px 10px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            lineHeight: 1.35,
            color: 'rgba(255,255,255,0.92)',
            whiteSpace: 'nowrap',
            zIndex: 20,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ color: colorAccent }}>
            {hover.day.count} {unitLabel}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.55)' }}>{formatDate(hover.day.date)}</div>
        </div>
      )}
    </div>
  );
}
