import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://briza-tlv.com",
  integrations: [sitemap()],
});
