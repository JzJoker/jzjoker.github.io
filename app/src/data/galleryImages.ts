import { projects } from './projectDetails';

export interface GalleryImage {
  src: string;
  alt: string;
}

const hiddenFromGallery = new Set(['superplane-hackathon', 'uncommonhacks']);

const hackathonBySlug = new Map(
  projects
    .filter(
      (p) => p.heroImage?.startsWith('/images/awards/') && !hiddenFromGallery.has(p.slug),
    )
    .map((p): [string, GalleryImage] => [p.slug, { src: p.heroImage!, alt: p.title }]),
);

const hackprinceton = hackathonBySlug.get('hackprinceton')!;
const clayhacks = hackathonBySlug.get('clayhacks')!;

const mountainOverlook: GalleryImage = {
  src: '/images/gallery/mountain-overlook.jpg',
  alt: 'Mountain overlook',
};

const koreanDinner: GalleryImage = {
  src: '/images/gallery/korean-dinner.jpg',
  alt: 'Korean dinner spread',
};

const steakPasta: GalleryImage = {
  src: '/images/gallery/steak-pasta.jpg',
  alt: 'Home-cooked steak rigatoni',
};

const snowboarding: GalleryImage = {
  src: '/images/gallery/snowboarding.jpg',
  alt: 'Snowboarding',
};

const fishing: GalleryImage = {
  src: '/images/gallery/fishing.jpg',
  alt: 'Fishing at dusk',
};

const extras: GalleryImage[] = [
  { src: '/images/gallery/aws-summit.jpg', alt: 'AWS Summit NYC 2026' },
  { src: '/images/gallery/hackprinceton-campus.jpg', alt: 'HackPrinceton — Princeton campus' },
  { src: '/images/gallery/city-night.jpg', alt: 'City plaza at night' },
  { src: '/images/gallery/rit-its-team.jpg', alt: 'RIT ITS team' },
  { src: '/images/gallery/bouldering.jpg', alt: 'Bouldering' },
  { src: '/images/gallery/cafe-workspace.jpg', alt: 'Plant-filled cafe workspace' },
];

export const galleryImages: GalleryImage[] = [
  mountainOverlook,
  koreanDinner,
  hackprinceton,
  fishing,
  steakPasta,
  ...extras,
  clayhacks,
  snowboarding,
];
export const carouselImages: GalleryImage[] = galleryImages;
