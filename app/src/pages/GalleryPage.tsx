import { Navbar } from '@/components/Navbar';
import { galleryImages as images } from '@/data/galleryImages';

export function GalleryPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[var(--page-max)]">
        <main className="px-8 md:px-12 py-24 md:py-32 flex flex-col gap-16">
          <section id="header" className="space-y-6 max-w-[900px]">
            <div className="space-y-1">
              <h1 className="text-4xl font-medium tracking-tight leading-[1.05]">Gallery</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Photos from my life, work, and more.
              </p>
            </div>
          </section>

          <section>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
              {images.map((img, i) => (
                <div
                  key={img.src + i}
                  className="mb-4 md:mb-6 break-inside-avoid overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 ease-out hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
