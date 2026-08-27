export interface SectionHeadingProps {
  /** Short Hebrew eyebrow, 1–3 words, preceded by a short rule. */
  eyebrow?: string;
  title: React.ReactNode;
  /** One or two sentences of supporting copy. */
  lead?: string;
  align?: "start" | "center";
  /** dark when the section background is navy. */
  tone?: "light" | "dark";
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
