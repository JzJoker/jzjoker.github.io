import { useEffect, useState } from 'react';

export interface CarouselImage {
  src: string;
  alt: string;
}

export function ImageCarousel({
  images,
  interval = 4000,
}: {
  images: CarouselImage[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((n) => (n + 1) % images.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [paused, images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <img
          key={img.src + i}
          src={img.src}
          alt={img.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-white mix-blend-difference">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );
}
