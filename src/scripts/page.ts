import { HOURS } from "../constants";
import { formatStatusLine, getStatus } from "../hours";

/**
 * The page's only script (PRD §3.7). Two jobs, both progressive enhancement:
 * the computed open/closed line, and a one-shot reveal as blocks scroll in.
 * [no-js-state] with this file absent or failed the page is complete — the
 * status line stays hidden and every block is simply visible.
 * [error-none] nothing here fetches; there is no error state to design.
 */

const slot = document.querySelector<HTMLElement>("[data-status]");
if (slot) {
  slot.textContent = formatStatusLine(getStatus(new Date(), HOURS));
  slot.removeAttribute("hidden");
}

/**
 * [motion-on-entry] fade-and-rise once, the first time a block enters view.
 * Nothing above the fold is marked, so the hidden state is never visible.
 * [reduced-motion] under `reduce` the class is never added, the CSS rule set
 * does not exist, and nothing moves or hides.
 */
const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
const wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)")
  .matches;
if (reveals.length > 0 && wantsMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // reveal on entry, and also for anything the reader has already
        // scrolled past — a restored scroll position must never leave a
        // block invisible.
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of reveals) observer.observe(el);
}
