export interface Photo {
  src: string;
  /** Descriptive Hebrew alt text — required for local SEO (PRD §3.8). */
  alt: string;
}
export interface PhotoGridProps {
  photos: Photo[];
  /** 2 on phones, 3 from 900px up. */
  columns?: number;
  /** CSS aspect-ratio string; garment photos are portrait "3 / 4". */
  ratio?: string;
  gap?: string;
  /** When provided, tiles become buttons that open a lightbox at that index. */
  onSelect?: (index: number) => void;
  /** Extra class for grid-level tweaks (e.g. a last-child feature tile). */
  className?: string;
  style?: React.CSSProperties;
}
export declare function PhotoGrid(props: PhotoGridProps): JSX.Element;
