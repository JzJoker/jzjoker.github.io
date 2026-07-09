import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHEET_ID = '1vcdMpS6CzdrBBcs2rR7D21HVB9Ixz6b5Ir6s-XJn0GA';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function parseDate(raw: string): string | null {
  const s = raw.trim().replace(/^"|"$/g, '');
  if (!s) return null;

  // ISO: 2026-07-07
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return `${m[1]}-${pad(Number(m[2]))}-${pad(Number(m[3]))}`;

  // 7/7/2026 or 07/07/2026
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return `${m[3]}-${pad(Number(m[1]))}-${pad(Number(m[2]))}`;

  // "Monday, July 07, 2026" or "July 7, 2026"
  m = s.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (m) {
    const mo = MONTHS[m[1].slice(0, 3).toLowerCase()];
    if (mo) return `${m[3]}-${pad(mo)}-${pad(Number(m[2]))}`;
  }

  // Fallback: let Date parse it
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  }

  return null;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const r = await fetch(CSV_URL, { redirect: 'follow' });
    if (!r.ok) return res.status(200).json({ checkins: [], error: `csv ${r.status}` });
    const csv = await r.text();

    const lines = csv.split(/\r?\n/).slice(1); // drop header
    const checkins: string[] = [];
    for (const line of lines) {
      const firstCell = line.split(',')[0];
      const date = parseDate(firstCell ?? '');
      if (date) checkins.push(date);
    }

    return res.status(200).json({ checkins });
  } catch (e) {
    return res.status(200).json({ checkins: [], error: String(e) });
  }
}
