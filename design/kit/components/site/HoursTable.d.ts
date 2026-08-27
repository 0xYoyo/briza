export interface HoursRow {
  /** Hebrew day or day range, e.g. "ראשון–חמישי". */
  day: string;
  /** Hours as written on the door, e.g. "9:30–19:00", or "סגור". */
  hours: string;
  closed?: boolean;
}
export interface HoursTableProps {
  /** Defaults to Briza's real hours (exported as `brizaHours`). */
  rows?: HoursRow[];
  /** Index of the row to bold with a "היום" marker. */
  todayIndex?: number;
  tone?: "light" | "dark";
  style?: React.CSSProperties;
}
export declare function HoursTable(props: HoursTableProps): JSX.Element;
export declare const brizaHours: HoursRow[];
