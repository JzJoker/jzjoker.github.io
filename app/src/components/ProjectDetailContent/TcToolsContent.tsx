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
  { src: '/images/screenshots/TCTools-Desktop - 1.png', alt: 'TCTools Mock Up 1' },
  { src: '/images/screenshots/TCTools-Desktop - 2.png', alt: 'TCTools Mock Up 2' },
  { src: '/images/screenshots/TCTools-Desktop - 3.png', alt: 'TCTools Mock Up 3' },
  { src: '/images/screenshots/TCTools-Desktop - 4.png', alt: 'TCTools Mock Up 4' },
  { src: '/images/screenshots/TCTools-Desktop - 5.png', alt: 'TCTools Mock Up 5' },
  { src: '/images/screenshots/TCTools-Desktop - 6.png', alt: 'TCTools Mock Up 6' },
  { src: '/images/screenshots/TCTools-Desktop - 7.png', alt: 'TCTools Mock Up 7' }
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
          POST IMAGE AND DATA TRANSFER PROCESS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6 items-start">
          <p className="text-sm text-muted-foreground">
            The semester prior to working on this project, I was employed part time as a student employee at RIT's IT department, ITS.
            During my early months there, I realized that Post-Image Setup, a task technicians at ITS perform on a daily basis, was tedious, repetitive, and manual.
            <br />
            <br />
            Technicians sat in front of laptops clicking through windows update, clicking through bios updates, installing apps individually. 
            <br />
            <br />
            I quickly realized that this was a low hanging fruit that would make a significant impact if automated. 
            <br />
            <br />
            We also were in dire need of a faster method of data transfer. We had existing scripts to back up standard folders but those scripts 
            were so slow that most technicians would rather do it manually. I pitched the idea of automating both Post-Image Setup and Data Transfer 
            to my supervisor who loved the idea and gave me the green light to proceed.
          </p>
          <div className="flex flex-col gap-2">
          <ClickableImage
            src="/images/screenshots/TCTools-Confluence.png"
            alt="Post Image Setup Confluence Page"
            className="w-full h-auto rounded-lg border border-border"
          />
          <p className="text-sm text-muted-foreground">
            Post Image Setup Confluence Page (Updated to recommend TCTools usage)
          </p>
          </div>
        </div>
      </section>
      <section className="border-t border-border pt-6">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          PRE-CO-OP
        </h2>
        
        <p className="text-sm text-muted-foreground">
          During the weeks I had before begining my co-op, I took the initiative to learn basic WPF and create initial mockups for the application.
          I did not have any experience with WPF prior to this project, but WPF's .NET Framework was perfect for the project, given that,
          having being developed by Microsoft, it included many packages and libraries that would be helpful in automating Windows-specific tasks.
          C#, the language of choice for WPF, was also great, given that, once again it was developed by Microsoft and supported everything we needed automated.
          I quickly started an initial repo at home and built out the skeleton of the project for learning/testing. 
        </p>       
      </section>
      <section className="border-t border-border pt-6">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          DESIGN & FRONTEND
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
