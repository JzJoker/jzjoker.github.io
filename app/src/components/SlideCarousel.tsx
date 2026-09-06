import { useCallback, useEffect, useState } from 'react';
import { ZoomableImage } from '@/components/ZoomableImage';

export interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

export function SlideCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  const total = slides.length;

  const next = useCallback(() => setIndex((n) => (n + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((n) => (n - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (total === 0) return null;

  const current = slides[index];

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        {slides.map((slide, i) => (
          <ZoomableImage
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            wrapperClassName={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
            className="w-full h-full object-contain"
          />
        ))}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors z-20"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors z-20"
        >
          →
        </button>

        <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-white mix-blend-difference z-20">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-1.5 h-1.5 transition-colors ${
              i === index
                ? 'bg-neutral-950 dark:bg-white'
                : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-500'
            }`}
          />
        ))}
      </div>

      {current.caption && (
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 text-center max-w-[62ch] mx-auto">
          {current.caption}
        </p>
      )}
    </div>
  );
}
