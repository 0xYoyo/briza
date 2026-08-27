/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Astro's Vite config so `.jpg` imports resolve to `ImageMetadata` in unit tests.
export default getViteConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
