// Real Potomac Green job photos go here, once the owner supplies them.
// While this array is empty, the RealWork section renders nothing.
export type GalleryPhoto = {
  src: string; // e.g. "/images/job-bethesda-mulch-bed" (run `npm run images` after adding the raw file)
  width: number;
  height: number;
  alt: string; // describe the job and town, e.g. "Edged mulch bed, Bethesda"
  service?: string;
};

export const gallery: GalleryPhoto[] = [];
