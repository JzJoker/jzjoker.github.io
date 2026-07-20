import { useEffect, useState } from 'react';

export interface SectionItem {
  id: string;
  label: string;
}

export function SectionNav({ items }: { items: SectionItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', `#${id}`);
    setActive(id);
  };

  return (
    <nav className="hidden lg:block fixed right-[var(--rail-inset)] top-1/2 -translate-y-1/2 z-30">
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest"
              >
                <span
                  className={`inline-block h-px transition-all duration-300 ${
                    isActive
                      ? 'w-5 bg-neutral-950 dark:bg-white'
                      : 'w-2 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-950 dark:group-hover:bg-white'
                  }`}
                />
                <span
                  className={`transition-colors ${
                    isActive
                      ? 'text-neutral-950 dark:text-white'
                      : 'text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
