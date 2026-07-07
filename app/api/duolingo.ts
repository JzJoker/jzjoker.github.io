import type { VercelRequest, VercelResponse } from '@vercel/node';

const USERNAME = 'justinzhao869949';

const LANGUAGE_LABELS: Record<string, string> = {
  zh: 'Chinese',
  es: 'Spanish',
  fr: 'French',
  ja: 'Japanese',
  ko: 'Korean',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
};

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const r = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } },
    );
    const j = (await r.json()) as {
      users?: Array<{
        name?: string;
        streak?: number;
        totalXp?: number;
        learningLanguage?: string;
        streakData?: {
          currentStreak?: { length: number; startDate: string; endDate: string };
        };
        courses?: Array<{ learningLanguage: string; xp: number; title: string }>;
      }>;
    };

    const u = j.users?.[0];
    if (!u) return res.status(200).json({ error: 'user not found' });

    const langCode = u.learningLanguage ?? '';
    const course = u.courses?.find((c) => c.learningLanguage === langCode);

    return res.status(200).json({
      name: u.name ?? null,
      streak: u.streak ?? 0,
      totalXp: u.totalXp ?? 0,
      language: course?.title ?? LANGUAGE_LABELS[langCode] ?? langCode,
      streakStart: u.streakData?.currentStreak?.startDate ?? null,
      streakEnd: u.streakData?.currentStreak?.endDate ?? null,
      courseXp: course?.xp ?? 0,
    });
  } catch (e) {
    return res.status(200).json({ error: String(e) });
  }
}
