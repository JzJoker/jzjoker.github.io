import type { VercelRequest, VercelResponse } from '@vercel/node';

const USERNAME = 'JzJoker';

interface RepoOut {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  recentCommits: number;
  totalCommits: number;
  lastCommit: string | null;
}

async function gh<T>(url: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'jzjoker-life-dashboard',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${await r.text()}`);
  return r.json() as Promise<T>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token = process.env.GITHUB_TOKEN;
  const limit = Number(req.query.limit ?? 5);
  const sinceDays = Number(req.query.sinceDays ?? 30);
  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();

  try {
    type Repo = {
      name: string;
      full_name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      fork: boolean;
      archived: boolean;
      private: boolean;
      pushed_at: string;
    };

    const repos = await gh<Repo[]>(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      token,
    );

    const candidates = repos
      .filter((r) => !r.fork && !r.archived && !r.private)
      .filter((r) => new Date(r.pushed_at).getTime() >= Date.now() - sinceDays * 24 * 60 * 60 * 1000)
      .slice(0, 15);

    const detailed: RepoOut[] = await Promise.all(
      candidates.map(async (r) => {
        type Commit = { commit: { author: { date: string } } };
        let recent: Commit[] = [];
        try {
          recent = await gh<Commit[]>(
            `https://api.github.com/repos/${r.full_name}/commits?since=${since}&per_page=100`,
            token,
          );
        } catch {
          recent = [];
        }
        return {
          name: r.name,
          fullName: r.full_name,
          url: r.html_url,
          description: r.description,
          language: r.language,
          recentCommits: recent.length,
          totalCommits: recent.length,
          lastCommit: recent[0]?.commit.author.date ?? r.pushed_at,
        };
      }),
    );

    const top = detailed
      .sort((a, b) => b.recentCommits - a.recentCommits)
      .slice(0, limit);

    const maxCommits = Math.max(1, ...top.map((r) => r.recentCommits));

    return res.status(200).json({
      repos: top.map((r) => ({ ...r, progress: r.recentCommits / maxCommits })),
      sinceDays,
    });
  } catch (e) {
    return res.status(200).json({ repos: [], error: String(e) });
  }
}
