import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { ProjectDetailData } from '@/data/projectDetails';
import { ClickableImage } from '../ClickableImage';

interface TcToolsContentProps {
  data: ProjectDetailData;
}

const tcToolsScreenshots = [
  { src: '/images/screenshots/TCTools-Desktop - 1.png', alt: 'TC-Tools Mock Up 1' },
  { src: '/images/screenshots/TCTools-Desktop - 2.png', alt: 'TC-Tools Mock Up 2' },
  { src: '/images/screenshots/TCTools-Desktop - 3.png', alt: 'TC-Tools Mock Up 3' },
  { src: '/images/screenshots/TCTools-Desktop - 4.png', alt: 'TC-Tools Mock Up 4' },
  { src: '/images/screenshots/TCTools-Desktop - 5.png', alt: 'TC-Tools Mock Up 5' },
  { src: '/images/screenshots/TCTools-Desktop - 6.png', alt: 'TC-Tools Mock Up 6' },
  { src: '/images/screenshots/TCTools-Desktop - 7.png', alt: 'TC-Tools Mock Up 7' }
];

function TcToolsScreenshotsCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on('select', () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} opts={{ align: 'start', loop: true }}>
        <CarouselContent>
          {tcToolsScreenshots.map((img, i) => (
            <CarouselItem key={i}>
              <ClickableImage
                src={img.src}
                alt={img.alt}
                className="w-full h-auto rounded-lg border border-border"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-3">
          {tcToolsScreenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                selectedIndex === i
                  ? 'bg-foreground'
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export function TcToolsContent({ data: _data }: TcToolsContentProps) {
  return (
    <>
      <section className="border-t border-border pt-6">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          SCOPE
        </h2>
        <p className="text-sm text-muted-foreground">
          Automation covered post-image tasks such as installing standard software, applying group
          policies, configuring backup targets, and validating the environment. The TypeScript CLI
          orchestrated PowerShell scripts and reported success or failure for each step so technicians
          could quickly confirm a machine was ready for use.
        </p>
      </section>
      <section className="border-t border-border pt-6">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          DESIGN & ARCHITECTURE
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6 items-start">
          <p className="text-sm text-muted-foreground">
            During the early stages of the project, I began by laying out the architecture and design of the project. 
            I knew I wanted a navigation system on the left side of the screen and a main content area on the right.
            <br />
            <br />
            I also knew I wanted to follow RIT's branding guidelines, so I used the official RIT ITS logo and colors for the project.
            <br />
            <br />
            In addition to this, I made sure to order navigation items chronologically in the order of typical post image setup tasks and 
            included a summary of the task at the top of each page. 
            <br />
            <br />
            Here are the initial high fidelity mock ups.
          </p>
          <TcToolsScreenshotsCarousel />
        </div>
      </section>
    </>
  );
}
