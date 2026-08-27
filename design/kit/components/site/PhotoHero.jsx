import React from "react";
import { Wordmark } from "../brand/Wordmark.jsx";

/** Full-bleed storefront photo with a bottom scrim, wordmark, and one action. */
export function PhotoHero({ image, alt = "", tagline, children, minHeight = "78svh", style, ...rest }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "var(--surface-inverse)",
        ...style,
      }}
      {...rest}
    >
      <img
        src={image}
        alt={alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)" }} />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        gap: "var(--space-5)",
          padding: "var(--space-10) var(--gutter) var(--space-12)",
          width: "100%",
          maxWidth: "var(--content-max)",
          margin: "0 auto",
        }}
      >
        <Wordmark size="hero" as="h1" />
        {tagline ? (
          <p
            style={{
              fontSize: "var(--text-lead)",
              lineHeight: "var(--leading-snug)",
              color: "var(--text-on-inverse)",
              maxWidth: "var(--measure-prose)",
              margin: 0,
            }}
          >
            {tagline}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
