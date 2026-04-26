import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        if (observed.has(el) || el.classList.contains('in')) return;
        observed.add(el);
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('in');
          return;
        }
        observer.observe(el);
      });
    };

    const t = setTimeout(observeAll, 50);
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        if (!el.classList.contains('in')) el.classList.add('in');
      });
    }, 3000);

    return () => {
      clearTimeout(t);
      clearTimeout(safety);
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}
