export interface InfoRowProps {
  /** Icon stem: "map-pin", "phone", "clock", "navigation". */
  icon: string;
  /** Short Hebrew label, e.g. "כתובת". */
  label: string;
  /** The fact itself — address, phone number, hours line. */
  value: React.ReactNode;
  /** tel:, https://maps…, wa.me — makes the whole row tappable (56px min). */
  href?: string;
  tone?: "light" | "dark";
  style?: React.CSSProperties;
}
export declare function InfoRow(props: InfoRowProps): JSX.Element;
