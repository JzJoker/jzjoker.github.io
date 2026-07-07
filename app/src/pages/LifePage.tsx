import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeNav } from '@/sections/home/HomeNav';
import { useReveal } from '@/hooks/useReveal';
import { Heatmap, type HeatmapDay } from '@/components/Heatmap';
import { CRUNCH_CHECKINS } from '@/data/crunch';
import { NEETCODE_ACTIVITY } from '@/data/neetcode';

interface Repo {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  recentCommits: number;
  lastCommit: string | null;
  progress: number;
}

function useGitHubHeatmap() {
  const [data, setData] = useState<HeatmapDay[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/JzJoker?y=last')
      .then((r) => r.json())
      .then((j: { contributions: HeatmapDay[]; total: Record<string, number> }) => {
        setData(j.contributions ?? []);
        const t = j.total ?? {};
        const sum = Object.values(t).reduce((a, b) => a + b, 0);
        setTotal(sum);
      })
      .catch(() => setData([]));
  }, []);
  return { data, total };
}

function useLeetCodeHeatmap() {
  const [data, setData] = useState<HeatmapDay[] | null>(null);
  const [activeDays, setActiveDays] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  useEffect(() => {
    const merge = (lc: HeatmapDay[]): { days: HeatmapDay[]; active: number } => {
      const map = new Map<string, number>();
      for (const [date, count] of Object.entries(NEETCODE_ACTIVITY)) {
        if (count > 0) map.set(date, count);
      }
      for (const d of lc) {
        map.set(d.date, Math.max(map.get(d.date) ?? 0, d.count));
      }
      const days = Array.from(map, ([date, count]) => ({ date, count })).sort((a, b) =>
        a.date.localeCompare(b.date),
      );
      return { days, active: days.filter((d) => d.count > 0).length };
    };

    fetch('/api/leetcode')
      .then((r) => r.json())
      .then((j: { contributions: HeatmapDay[]; totalActiveDays?: number; streak?: number }) => {
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
  const counts = new Map<string, number>();
  for (const d of CRUNCH_CHECKINS) counts.set(d, (counts.get(d) ?? 0) + 1);
  const data: HeatmapDay[] = Array.from(counts, ([date, count]) => ({ date, count }));
  return { data, total: CRUNCH_CHECKINS.length };
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

function Card({
  title,
  subtitle,
  meta,
  children,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="reveal border border-border bg-card rounded-xl p-6 sm:p-8 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-foreground"
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: '28px',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-[12px] text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {meta && (
          <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground whitespace-nowrap">
            {meta}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function LifePage() {
  useReveal();
  const gh = useGitHubHeatmap();
  const lc = useLeetCodeHeatmap();
  const crunch = useCrunchHeatmap();
  const repos = useTopRepos();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="grid-bg" aria-hidden="true" />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-200px',
          right: '-200px',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(212,255,90,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <HomeNav />
      <div className="pt-20 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <div className="pt-8 pb-24">
            <Link
              to="/"
              className="reveal inline-flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground hover:text-accent transition-colors mb-12 group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Back to home
            </Link>

            <h1
              className="reveal mb-6 leading-none tracking-[-0.03em] text-foreground"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 'clamp(56px, 9vw, 120px)',
                lineHeight: 0.95,
              }}
            >
              A dashboard for{' '}
              <em className="italic text-accent not-italic" style={{ fontStyle: 'italic' }}>
                life
              </em>
              <em className="italic text-accent" style={{ fontStyle: 'italic' }}>
                .
              </em>
            </h1>

            <p className="reveal text-sm text-muted-foreground max-w-xl mb-16 leading-relaxed">
              Code, reps, and problems solved — the shape of the year so far.
            </p>

            <div className="reveal-stagger grid grid-cols-1 gap-6">
              <Card
                title="GitHub"
                subtitle="Public commits, issues, PRs — last 12 months."
                meta={`${gh.total} contributions`}
              >
                {gh.data === null ? (
                  <div className="text-[11px] text-muted-foreground">Loading…</div>
                ) : (
                  <Heatmap data={gh.data} colorAccent="#d4ff5a" />
                )}
              </Card>

              <Card
                title="LeetCode"
                subtitle="@justinzhao1324 · problems solved (incl. NeetCode history)"
                meta={
                  lc.data === null
                    ? undefined
                    : `${lc.activeDays} active · ${lc.streak} streak`
                }
              >
                {lc.data === null ? (
                  <div className="text-[11px] text-muted-foreground">Loading…</div>
                ) : (
                  <Heatmap data={lc.data} colorAccent="#ffa116" />
                )}
              </Card>

              <Card
                title="Crunch Fitness"
                subtitle="Check-ins — manually logged."
                meta={`${crunch.total} sessions`}
              >
                <Heatmap data={crunch.data} colorAccent="#ff2d55" />
              </Card>

              <Card
                title="Current projects"
                subtitle="Top repos ranked by commits in the last 30 days."
              >
                {repos === null ? (
                  <div className="text-[11px] text-muted-foreground">Loading…</div>
                ) : repos.length === 0 ? (
                  <div className="text-[11px] text-muted-foreground">
                    No repos with recent commits.
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {repos.map((r) => (
                      <a
                        key={r.fullName}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col gap-2 no-underline text-inherit"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex items-baseline gap-3 min-w-0">
                            <span
                              className="text-foreground truncate group-hover:text-accent transition-colors"
                              style={{
                                fontFamily: '"Instrument Serif", Georgia, serif',
                                fontSize: '22px',
                                lineHeight: 1.1,
                              }}
                            >
                              {r.name}
                            </span>
                            {r.language && (
                              <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                                {r.language}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground whitespace-nowrap">
                            {r.recentCommits} commits · 30d
                          </span>
                        </div>
                        {r.description && (
                          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
                            {r.description}
                          </p>
                        )}
                        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: `${Math.max(4, r.progress * 100)}%` }}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
