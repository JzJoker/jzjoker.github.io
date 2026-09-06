import { useEffect, useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export function ZoomableImage({ src, alt, className, wrapperClassName }: ZoomableImageProps) {
  const [zoomed, setZoomed] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!zoomed) {
      setEntered(false);
      return;
    }
    const raf = requestAnimationFrame(() => setEntered(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className={`block w-full cursor-pointer ${wrapperClassName ?? ''}`}
        aria-label={`View larger: ${alt}`}
      >
        <img src={src} alt={alt} loading="lazy" className={className} />
      </button>
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm cursor-pointer transition-opacity duration-200 ease-out ${
            entered ? 'opacity-100' : 'opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <img
            src={src}
            alt={alt}
            className={`max-w-[min(90vw,64rem)] max-h-[85vh] w-auto h-auto object-contain rounded-md shadow-2xl transition-transform duration-200 ease-out ${
              entered ? 'scale-100' : 'scale-95'
            }`}
          />
        </div>
      )}
    </>
  );
}
