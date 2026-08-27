import { describe, expect, it } from "vitest";
import { GROUP_INVITE_URL, WHATSAPP_NUMBER } from "../src/constants";
import {
  callHref,
  JOIN_FALLBACK_MESSAGE,
  joinHref,
  WRITE_MESSAGE,
  writeHref,
} from "../src/links";

const WA_PREFIX = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

function decodedText(href: string): string {
  expect(href.startsWith(WA_PREFIX)).toBe(true);
  return decodeURIComponent(href.slice(WA_PREFIX.length));
}

describe("links", () => {
  it("writeHref opens a chat with the owner and the write message", () => {
    expect(WHATSAPP_NUMBER).toBe("972524381666");
    expect(decodedText(writeHref())).toBe(WRITE_MESSAGE);
    expect(WRITE_MESSAGE).toBe(
      "שלום אירית, הגעתי מהאתר של בריזה ואשמח לשאול על פריט.",
    );
  });

  it("callHref is a tel: link to the owner's number", () => {
    expect(callHref()).toBe("tel:+972524381666");
  });

  it("joinHref falls back to a chat asking to join while the invite URL is empty", () => {
    expect(GROUP_INVITE_URL).toBe("");
    expect(decodedText(joinHref())).toBe(JOIN_FALLBACK_MESSAGE);
    expect(decodedText(joinHref(""))).toBe(JOIN_FALLBACK_MESSAGE);
    expect(JOIN_FALLBACK_MESSAGE).toBe(
      "שלום אירית, אשמח להצטרף לקבוצת העדכונים של בריזה.",
    );
  });

  it("joinHref returns the invite URL when it is set", () => {
    const invite = "https://chat.whatsapp.com/EXAMPLEinvite";
    expect(joinHref(invite)).toBe(invite);
  });

  // [no-dead-button]
  it("never returns an empty, '#', or undefined href", () => {
    const hrefs = [
      joinHref(),
      joinHref("https://example.invalid/x"),
      writeHref(),
      callHref(),
    ];
    for (const href of hrefs) {
      expect(href).toBeDefined();
      expect(typeof href).toBe("string");
      expect(href).not.toBe("");
      expect(href).not.toBe("#");
      expect(href.trim().length).toBeGreaterThan(0);
    }
  });
});
