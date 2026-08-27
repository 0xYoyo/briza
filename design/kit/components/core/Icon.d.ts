export interface IconProps {
  /** File stem in assets/icons, e.g. "whatsapp", "map-pin", "clock". */
  name: string;
  /** Square size in px. 20 inline with text, 24 default, 28–32 for actions. */
  size?: number;
  /** Any CSS color; defaults to currentColor so it inherits the text color. */
  color?: string;
  /** Path to the icon folder. Defaults to window.BRIZA_ICON_BASE || "assets/icons". */
  base?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
