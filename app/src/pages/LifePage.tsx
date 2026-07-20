import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SectionNav } from '@/components/SectionNav';
import { SectionHeading } from '@/components/SectionHeading';
import { Heatmap, type HeatmapDay } from '@/components/Heatmap';
import { NEETCODE_ACTIVITY } from '@/data/neetcode';

interface Repo {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  recentCommits: number;
  progress: number;
}

interface Duo {
  name: string | null;
  streak: number;
  totalXp: number;
  language: string;
  streakStart: string | null;
  streakEnd: string | null;
  courseXp: number;
}

function useGitHubHeatmap() {
  const [data, setData] = useState<HeatmapDay[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/JzJoker?y=last')
      .then((r) => r.json())
      .then((j: { contributions: HeatmapDay[]; total: Record<string, number> }) => {
        setData(j.contributions ?? []);
        setTotal(Object.values(j.total ?? {}).reduce((a, b) => a + b, 0));
      })
      .catch(() => setData([]));
  }, []);
  return { data, total };
}

function useLeetCodeHeatmap() {
  const [data, setData] = useState<HeatmapDay[] | null>(null);
  const [activeDays, setActiveDays] = useState(0);
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    const merge = (lc: HeatmapDay[]) => {
      const map = new Map<string, number>();
      for (const [date, count] of Object.entries(NEETCODE_ACTIVITY)) {
        if (count > 0) map.set(date, count);
      }
      for (const d of lc) map.set(d.date, Math.max(map.get(d.date) ?? 0, d.count));
      const days = Array.from(map, ([date, count]) => ({ date, count })).sort((a, b) =>
        a.date.localeCompare(b.date),
      );
      return { days, active: days.filter((d) => d.count > 0).length };
    };

    fetch('/api/leetcode')
      .then((r) => r.json())
      .then((j: { contributions: HeatmapDay[]; streak?: number }) => {
        const { days, active } = merge(j.contributions ?? []);
        setData(days);
        setActiveDays(active);
        setStreak(j.streak ?? 0);
      })
      .catch(() => {
        const { days, active } = merge([]);
        setData(days);
        setActiveDays(active);
      });
  }, []);
  return { data, activeDays, streak };
}

function useCrunchHeatmap() {
  const [checkins, setCheckins] = useState<string[] | null>(null);
  useEffect(() => {
    fetch('/api/crunch')
      .then((r) => r.json())
      .then((j: { checkins: string[] }) => setCheckins(j.checkins ?? []))
      .catch(() => setCheckins([]));
  }, []);
  const counts = new Map<string, number>();
  for (const d of checkins ?? []) counts.set(d, (counts.get(d) ?? 0) + 1);
  const data: HeatmapDay[] = Array.from(counts, ([date, count]) => ({ date, count }));
  return { data, total: checkins?.length ?? 0, loading: checkins === null };
}

function useDuolingo() {
  const [data, setData] = useState<Duo | null | 'loading'>('loading');
  useEffect(() => {
    fetch('/api/duolingo')
      .then((r) => r.json())
      .then((j: Duo & { error?: string }) => setData(j.error ? null : j))
      .catch(() => setData(null));
  }, []);
  return data;
}

function useTopRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  useEffect(() => {
    fetch('/api/github-top-repos?limit=5&sinceDays=30')
      .then((r) => r.json())
      .then((j: { repos: Repo[] }) => setRepos(j.repos ?? []))
      .catch(() => setRepos([]));
  }, []);
  return repos;
}

const lifeSections = [
  { id: 'header', label: 'Top' },
  { id: 'github', label: 'Code' },
  { id: 'leetcode', label: 'Problems' },
  { id: 'crunch', label: 'Fitness' },
  { id: 'duolingo', label: 'Language' },
  { id: 'repos', label: 'Repos' },
];

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="space-y-1.5">
      <div className="text-3xl md:text-4xl font-medium tracking-tight leading-none">{value}</div>
      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">{label}</div>
    </div>
  );
}

function Loading() {
  return <div className="text-xs font-mono text-neutral-400">Loading…</div>;
}

export function LifePage() {
  const gh = useGitHubHeatmap();
  const lc = useLeetCodeHeatmap();
  const crunch = useCrunchHeatmap();
  const duo = useDuolingo();
  const repos = useTopRepos();

  return (
    <>
      <ThemeToggle />
      <SectionNav items={lifeSections} />
      <div className="mx-auto max-w-[var(--page-max)]">
      <main className="max-w-[900px] px-8 md:px-12 py-24 md:py-32 flex flex-col gap-24">
        <Link
          to="/"
          className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors w-fit"
        >
          ← Home
        </Link>

        <section id="header" className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">Life</h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-snug">
              A public dashboard for the things I track and grind on daily.
            </p>
          </div>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[62ch]">
            Code, reps, and problems solved — the shape of the year so far. All numbers pulled live
            from GitHub, LeetCode, Duolingo, and a Google Sheet I log gym check-ins into.
          </p>
        </section>

        <section id="github" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeading>Code</SectionHeading>
            <span className="text-xs font-mono text-neutral-400">@JzJoker</span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[62ch]">
            Public commits, issues, and PRs — last 52 weeks.
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <Stat value={gh.data === null ? '—' : gh.total.toLocaleString()} label="Contributions" />
          </div>
          {gh.data === null ? <Loading /> : <Heatmap data={gh.data} accent="#10b981" unitLabel="contributions" />}
        </section>

        <section id="leetcode" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeading>Problems</SectionHeading>
            <span className="text-xs font-mono text-neutral-400">@justinzhao1324</span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[62ch]">
            LeetCode submissions — includes historical NeetCode activity from before the switch.
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <Stat value={lc.data === null ? '—' : lc.activeDays} label="Active days" />
            <Stat value={lc.data === null ? '—' : lc.streak} label="Current streak" />
          </div>
          {lc.data === null ? <Loading /> : <Heatmap data={lc.data} accent="#f97316" unitLabel="problems" />}
        </section>

        <section id="crunch" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeading>Fitness</SectionHeading>
            <span className="text-xs font-mono text-neutral-400">Crunch NYC</span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[62ch]">
            Gym check-ins — synced from a personal Google Sheet.
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <Stat value={crunch.loading ? '—' : crunch.total} label="Sessions" />
          </div>
          {crunch.loading ? (
            <Loading />
          ) : (
            <Heatmap data={crunch.data} accent="#f43f5e" unitLabel="check-ins" />
          )}
        </section>

        <section id="duolingo" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeading>Language</SectionHeading>
            <span className="text-xs font-mono text-neutral-400">@justinzhao869949</span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[62ch]">
            {duo && duo !== 'loading' ? `Currently learning ${duo.language}.` : 'Duolingo streak and XP.'}
          </p>
          {duo === 'loading' ? (
            <Loading />
          ) : duo === null ? (
            <p className="text-xs font-mono text-neutral-400">Unavailable.</p>
          ) : (
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <Stat value={duo.streak} label="Day streak" />
              <Stat value={duo.totalXp.toLocaleString()} label="Total XP" />
              <Stat value={duo.courseXp.toLocaleString()} label={`XP in ${duo.language}`} />
            </div>
          )}
          {duo && duo !== 'loading' && duo.streakStart && duo.streakEnd && (
            <p className="text-xs font-mono text-neutral-400">
              Current run: {duo.streakStart} → {duo.streakEnd}
            </p>
          )}
        </section>

        <section id="repos" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeading>Repos</SectionHeading>
            <span className="text-xs font-mono text-neutral-400">Last 30 days</span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[62ch]">
            The GitHub repositories I've committed to most recently.
          </p>
          {repos === null ? (
            <Loading />
          ) : repos.length === 0 ? (
            <p className="text-xs font-mono text-neutral-400">No repos with recent commits.</p>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
              {repos.map((r) => (
                <a
                  key={r.fullName}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-row group py-6 md:py-8 block cursor-pointer transition-all duration-300 no-underline text-inherit"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {r.name}
                      </h3>
                      {r.description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-2">
                          {r.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      {r.language && (
                        <span className="font-mono text-[10px] tracking-widest border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-neutral-500 uppercase">
                          {r.language}
                        </span>
                      )}
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        {r.recentCommits} commits
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-px w-full bg-neutral-200/60 dark:bg-neutral-800/60 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${Math.max(4, r.progress * 100)}%`,
                        backgroundColor: '#2563eb',
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
      </div>
    </>
  );
}
