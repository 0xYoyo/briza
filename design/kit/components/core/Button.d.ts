/**
 * Briza action button. RTL-first: the icon sits at the reading start (right).
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** whatsapp = the conversion action, one per view. dark = secondary (call, navigate). outline = tertiary on light. ghostOnDark = on navy photography. */
  variant?: "whatsapp" | "dark" | "outline" | "ghostOnDark";
  /** lg (64px) for hero and sticky bar, md (56px) inside cards. Never smaller. */
  size?: "lg" | "md";
  /** Icon stem from assets/icons, e.g. "whatsapp", "phone", "navigation". */
  icon?: string;
  /** Renders an <a> when present, a <button> otherwise. */
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Renders the icon alone in a square tap target; `label` then supplies the accessible name. */
  iconOnly?: boolean;
  /** Hebrew aria-label — required with iconOnly. */
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
