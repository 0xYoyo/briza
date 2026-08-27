export interface SocialLink {
  /** Brand glyph stem: "instagram" | "facebook" | "tiktok" | "whatsapp". */
  network: string;
  /** Omit or leave empty to hide this network until the profile exists. */
  href?: string;
  /** Hebrew aria-label; sensible defaults are built in. */
  label?: string;
}
export interface SocialRowProps {
  links: SocialLink[];
  /** dark for navy footer (default), light on cream. */
  tone?: "dark" | "light";
  size?: number;
  style?: React.CSSProperties;
}
export declare function SocialRow(props: SocialRowProps): JSX.Element;
