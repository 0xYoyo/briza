/**
 * Briza's typographic mark — the Hebrew store name, set like the storefront sign.
 */
export interface WordmarkProps {
  /** sm = footer/nav, md = default, lg = section mark, hero = hero over photography. */
  size?: "sm" | "md" | "lg" | "hero";
  /** Ice-blue halo, as on the lit sign. Only on dark backgrounds. */
  glow?: boolean;
  /** light = ice letters for navy/photo backgrounds. dark = navy letters on cream. */
  tone?: "light" | "dark";
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Wordmark(props: WordmarkProps): JSX.Element;
