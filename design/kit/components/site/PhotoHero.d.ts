/**
 * Full-bleed photographic hero with scrim, wordmark and one action.
 */
export interface PhotoHeroProps {
  /** Storefront photograph — the lit sign shot is the canonical hero image. */
  image: string;
  /** Descriptive Hebrew alt text. */
  alt?: string;
  /** One-line Hebrew value proposition, max ~12 words. */
  tagline?: string;
  /** The action — normally a single <Button variant="whatsapp">. */
  children?: React.ReactNode;
  /** CSS min-height; 78svh on phones, up to 88svh on desktop. */
  minHeight?: string;
  style?: React.CSSProperties;
}
export declare function PhotoHero(props: PhotoHeroProps): JSX.Element;
