export interface BadgeProps {
  children: React.ReactNode;
  /** sand on cream sections, navy for emphasis, ice for a cool highlight, coral for a real sale, outline for quiet metadata. */
  tone?: "sand" | "navy" | "ice" | "coral" | "outline";
  /** Optional icon stem from assets/icons, rendered at 20px. */
  icon?: string;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
