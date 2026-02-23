import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface ImageLightboxContextValue {
  openImage: (src: string, alt?: string) => void;
  closeImage: () => void;
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null);

export function useImageLightbox(): ImageLightboxContextValue | null {
  return useContext(ImageLightboxContext);
}

interface ImageLightboxProviderProps {
  children: ReactNode;
}

const LIGHTBOX_EXIT_DURATION_MS = 200;

export function ImageLightboxProvider({ children }: ImageLightboxProviderProps) {
  const [image, setImage] = useState<{ src: string; alt?: string } | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openImage = useCallback((src: string, alt?: string) => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
    setIsExiting(false);
    setImage({ src, alt });
  }, []);

  const closeImage = useCallback(() => {
    if (!image) return;
    if (exitTimeoutRef.current) return;
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      exitTimeoutRef.current = null;
      setImage(null);
      setIsExiting(false);
    }, LIGHTBOX_EXIT_DURATION_MS);
  }, [image]);

  useEffect(() => {
    if (!image) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [image, closeImage]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  const showLightbox = image !== null;
  // Enter: use animate-in. Exit: use transitions only (no animate-out) to avoid flash from swapping keyframes.
  const overlayClasses = isExiting
    ? 'opacity-0 transition-opacity duration-200'
    : 'animate-in fade-in-0 duration-200';
  const imageClasses = isExiting
    ? 'opacity-0 scale-95 transition-opacity transition-transform duration-200'
    : 'animate-in fade-in-0 zoom-in-95 duration-200';

  return (
    <ImageLightboxContext.Provider value={{ openImage, closeImage }}>
      {children}
      {showLightbox && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 transition-opacity duration-200 ${overlayClasses}`}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image"
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <img
            src={image.src}
            alt={image.alt ?? ''}
            className={`max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-opacity duration-200 transition-transform duration-200 ${imageClasses}`}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      )}
    </ImageLightboxContext.Provider>
  );
}
