export interface CardProps {
  children: React.ReactNode;
  /** light = white on cream (default). dark = navy panel inside an inverse section. */
  tone?: "light" | "dark";
  /** Adds hover lift + deeper shadow. Only for cards that are themselves clickable. */
  interactive?: boolean;
  /** CSS padding value; defaults to var(--space-6). */
  padding?: string;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
