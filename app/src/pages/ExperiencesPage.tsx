import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { experiences } from '@/data/experiences';
import type { Experience } from '@/data/experiences';
import { Navbar } from '@/sections/Navbar';

function getYearsFromPeriod(period: string): number[] {
  if (!period.trim()) return [];
  const parts = period.split('-').map((p) => p.trim());
  if (parts.length === 1) {
    const y = parseInt(parts[0], 10);
    return Number.isNaN(y) ? [] : [y];
  }
  const start = parseInt(parts[0], 10);
  const endRaw = parts[1];
  const end = endRaw.length === 2 ? 2000 + parseInt(endRaw, 10) : parseInt(endRaw, 10);
  if (Number.isNaN(start) || Number.isNaN(end)) return [];
  const years: number[] = [];
  for (let y = start; y <= end; y++) years.push(y);
  return years;
}

function getExperiencesByYear(): { year: number; experiences: Experience[] }[] {
  const jobExperiences = Object.values(experiences).filter(
    (exp) => exp.id !== 'default' && exp.period
  );
  const byYear: Record<number, Experience[]> = {};
  for (const exp of jobExperiences) {
    const years = getYearsFromPeriod(exp.period);
    for (const y of years) {
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(exp);
    }
  }
  const sortedYears = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);
  return sortedYears.map((year) => ({ year, experiences: byYear[year] }));
}

const cardClassName =
  'bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full';

export function ExperiencesPage() {
  const sections = getExperiencesByYear();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Navbar />
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider self-start"
          >
            &lt; HOME
          </Link>
          <h2 className="text-sm text-muted-foreground tracking-wider">ALL EXPERIENCES</h2>
          <div className="relative">
            <div
              className="absolute top-0 bottom-0 left-4 w-px bg-border -translate-x-1/2"
              aria-hidden
            />
            <div className="grid grid-cols-[2rem_1fr] gap-x-6 gap-y-8 items-start">
              {sections.map(({ year, experiences: yearExperiences }) => (
                <Fragment key={year}>
                  <div className="flex justify-center pt-0.5 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-foreground border-2 border-background ring-2 ring-border" aria-hidden />
                  </div>
                  <section>
                  <h3 className="text-sm font-medium text-foreground mb-4 tracking-wider">
                    {year}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full min-w-0">
                    {yearExperiences.map((exp) => (
                      <div
                        key={exp.id}
                        className={cardClassName}
                        style={{ borderLeftColor: exp.accentColor, borderLeftWidth: 3 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground tracking-wider">
                            {exp.role}
                          </span>
                          <span className="text-xs text-muted-foreground">{exp.period}</span>
                        </div>
                        <h4 className="text-lg font-bold mb-2">{exp.company}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{exp.description}</p>
                        <p className="text-xs text-muted-foreground">{exp.timePeriod}</p>
                      </div>
                    ))}
                  </div>
                </section>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
