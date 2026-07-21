import { projects } from './projectDetails';

export interface GalleryImage {
  src: string;
  alt: string;
}

const extras: GalleryImage[] = [
  { src: '/images/gallery/aws-summit.jpg', alt: 'AWS Summit NYC 2026' },
  { src: '/images/gallery/hackprinceton-campus.jpg', alt: 'HackPrinceton — Princeton campus' },
  { src: '/images/gallery/rit-its-team.jpg', alt: 'RIT ITS team' },
];

export const galleryImages: GalleryImage[] = [
  ...projects
    .filter((p) => p.heroImage?.startsWith('/images/awards/'))
    .map((p) => ({ src: p.heroImage!, alt: p.title })),
  ...extras,
];
