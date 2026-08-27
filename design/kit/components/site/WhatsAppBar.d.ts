/**
 * Fixed mobile conversion bar — WhatsApp plus click-to-call.
 */
export interface WhatsAppBarProps {
  /** wa.me deep link with a prefilled Hebrew greeting. Defaults to the store's. */
  whatsappHref?: string;
  /** tel: link. Defaults to +972524381666. */
  telHref?: string;
  /** Hebrew button label. Keep it under 4 words. */
  label?: string;
  /** false slides the bar out of view (e.g. while a lightbox is open). */
  visible?: boolean;
  /** "hero" (default) keeps the bar hidden until the reader scrolls past the hero; "always" pins it from the top. */
  revealAfter?: "hero" | "always";
  style?: React.CSSProperties;
}
export declare function WhatsAppBar(props: WhatsAppBarProps): JSX.Element;
export declare const WHATSAPP_LINK: string;
