import type { VercelRequest, VercelResponse } from '@vercel/node';

const USERNAME = 'justinzhao1324';

const QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
        totalActiveDays
        streak
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const currentYear = new Date().getUTCFullYear();
  const years = req.query.year
    ? [Number(req.query.year)]
    : [currentYear - 1, currentYear];

  async function fetchYear(year: number) {
    const gqlRes = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': `https://leetcode.com/${USERNAME}/`,
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: USERNAME, year },
      }),
    });
    const raw = (await gqlRes.json()) as {
      data?: {
        matchedUser?: {
          userCalendar?: {
            submissionCalendar: string;
            totalActiveDays: number;
            streak: number;
          };
        };
      };
    };
    return raw?.data?.matchedUser?.userCalendar ?? null;
  }

  try {
    const cals = await Promise.all(years.map(fetchYear));

    const merged: Record<string, number> = {};
    let totalActiveDays = 0;
    let streak = 0;

    for (const cal of cals) {
      if (!cal) continue;
      totalActiveDays += cal.totalActiveDays;
      streak = Math.max(streak, cal.streak);
      const parsed = JSON.parse(cal.submissionCalendar) as Record<string, number>;
      for (const [ts, count] of Object.entries(parsed)) {
        merged[ts] = (merged[ts] ?? 0) + count;
      }
    }

    const contributions = Object.entries(merged)
      .map(([ts, count]) => ({
        date: new Date(Number(ts) * 1000).toISOString().slice(0, 10),
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return res.status(200).json({ contributions, totalActiveDays, streak });
  } catch (e) {
    return res.status(200).json({ contributions: [], error: String(e) });
  }
}
