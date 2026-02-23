import type { ImgHTMLAttributes } from 'react';
import { useImageLightbox } from '@/components/ImageLightbox';
import { cn } from '@/lib/utils';

export interface ClickableImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** When inside ImageLightboxProvider, click opens image in lightbox. */
}

export function ClickableImage({
  src,
  alt = '',
  className,
  ...props
}: ClickableImageProps) {
  const lightbox = useImageLightbox();

  if (!src) return null;

  if (lightbox) {
    return (
      <button
        type="button"
        onClick={() => lightbox.openImage(src, alt)}
        className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
        aria-label={alt ? `View full size: ${alt}` : 'View full size image'}
      >
        <img
          src={src}
          alt={alt}
          className={cn('w-full h-auto rounded-lg border border-border', className)}
          {...props}
          draggable={false}
        />
      </button>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-full h-auto rounded-lg border border-border', className)}
      {...props}
    />
  );
}
