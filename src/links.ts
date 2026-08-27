import { GROUP_INVITE_URL, WHATSAPP_NUMBER } from "./constants";

/** Prefilled WhatsApp messages, customer → owner (PRD §3.5). */
export const WRITE_MESSAGE =
  "שלום אירית, הגעתי מהאתר של בריזה ואשמח לשאול על פריט.";
export const JOIN_FALLBACK_MESSAGE =
  "שלום אירית, אשמח להצטרף לקבוצת העדכונים של בריזה.";

function whatsappChatHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** "Write to Irit": WhatsApp chat with the owner, prefilled greeting. */
export function writeHref(): string {
  return whatsappChatHref(WRITE_MESSAGE);
}

/** Click-to-call the owner's number (PRD §3.2). */
export function callHref(): string {
  return `tel:+${WHATSAPP_NUMBER}`;
}

/**
 * Join the updates group. While `GROUP_INVITE_URL` is empty the button falls
 * back to a chat with the owner asking to be added — [no-dead-button] the
 * site never renders an empty or `#` href (PRD §3.2).
 */
export function joinHref(url: string = GROUP_INVITE_URL): string {
  return url === "" ? whatsappChatHref(JOIN_FALLBACK_MESSAGE) : url;
}
