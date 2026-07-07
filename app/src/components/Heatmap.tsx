import { useMemo } from 'react';

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

export function Heatmap({
  data,
  weeks = 53,
  colorAccent = '#d4ff5a',
  emptyColor = 'rgba(255,255,255,0.05)',
  label,
}: HeatmapProps) {
  const { grid, months, max } = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of data) map.set(d.date, d.count);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    // End on the most recent Saturday (>= today), start weeks*7 days back Sunday
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

  return (
    <div className="w-full">
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
                >
                  <title>{`${day.date} — ${day.count}`}</title>
                </rect>
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
}
