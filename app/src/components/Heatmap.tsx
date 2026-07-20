import { useMemo, useState } from 'react';

export interface HeatmapDay {
  date: string;
  count: number;
}

interface Cell {
  date: string;
  count: number;
  level: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildGrid(data: HeatmapDay[], weeks: number): { columns: Cell[][]; max: number } {
  const map = new Map<string, number>();
  let max = 0;
  for (const d of data) {
    map.set(d.date, d.count);
    if (d.count > max) max = d.count;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = today;

  const start = new Date(end);
  start.setDate(end.getDate() - (weeks * 7 - 1));
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  const columns: Cell[][] = [];
  const cursor = new Date(start);
  for (let w = 0; w < weeks; w++) {
    const col: Cell[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = toISO(cursor);
      const count = map.get(iso) ?? 0;
      let level = 0;
      if (count > 0 && max > 0) {
        const ratio = count / max;
        if (ratio > 0.75) level = 4;
        else if (ratio > 0.5) level = 3;
        else if (ratio > 0.25) level = 2;
        else level = 1;
      }
      col.push({ date: iso, count: cursor > end ? -1 : count, level: cursor > end ? -1 : level });
      cursor.setDate(cursor.getDate() + 1);
    }
    columns.push(col);
  }

  return { columns, max };
}

function levelClasses(level: number): string {
  if (level === -1) return 'bg-transparent';
  if (level === 0) return 'bg-neutral-200/60 dark:bg-neutral-800/60';
  return '';
}

function levelStyle(level: number, accent: string): React.CSSProperties {
  if (level <= 0) return {};
  const opacity = { 1: 0.28, 2: 0.5, 3: 0.75, 4: 1 }[level as 1 | 2 | 3 | 4];
  return { backgroundColor: accent, opacity };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function Heatmap({
  data,
  accent = '#2563eb',
  unitLabel = 'entries',
  weeks = 52,
}: {
  data: HeatmapDay[];
  accent?: string;
  unitLabel?: string;
  weeks?: number;
}) {
  const [hover, setHover] = useState<Cell | null>(null);
  const { columns } = useMemo(() => buildGrid(data, weeks), [data, weeks]);

  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  columns.forEach((col, i) => {
    const firstReal = col.find((c) => c.count >= 0);
    if (!firstReal) return;
    const m = Number(firstReal.date.slice(5, 7)) - 1;
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTHS[m], col: i });
      lastMonth = m;
    }
  });

  return (
    <div className="space-y-2 select-none">
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="inline-block">
          <div
            className="grid mb-1"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
              gap: '2px',
            }}
          >
            {columns.map((_, i) => {
              const label = monthLabels.find((m) => m.col === i);
              return (
                <div
                  key={i}
                  className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 h-3"
                  style={{ minWidth: 11 }}
                >
                  {label?.label ?? ''}
                </div>
              );
            })}
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
              gap: '2px',
            }}
          >
            {columns.map((col, ci) => (
              <div key={ci} className="grid grid-rows-7 gap-[2px]">
                {col.map((cell, ri) => (
                  <div
                    key={ri}
                    onMouseEnter={() => cell.count >= 0 && setHover(cell)}
                    onMouseLeave={() => setHover((h) => (h === cell ? null : h))}
                    className={`w-[11px] h-[11px] rounded-[2px] transition-opacity ${levelClasses(
                      cell.level,
                    )}`}
                    style={levelStyle(cell.level, accent)}
                    title={cell.count >= 0 ? `${formatDate(cell.date)} · ${cell.count}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 h-3">
          {hover ? `${formatDate(hover.date)} · ${hover.count} ${unitLabel}` : ' '}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              className={`w-[10px] h-[10px] rounded-[2px] ${
                l === 0 ? 'bg-neutral-200/60 dark:bg-neutral-800/60' : ''
              }`}
              style={l === 0 ? {} : levelStyle(l, accent)}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
