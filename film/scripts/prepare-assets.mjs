// Copies the site's own brand files and project clips into film/public/site so the film always uses the live originals.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const film = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(film, "..", "public");
const files = [
  "fonts/aeonik-regular.woff",
  "images/hero-atmosphere.webp",
  "brand/ntombii-logo-light.svg",
  "images/work-new/moyandi-scents-desktop.webp",
  "videos/work/moyandi-scents.mp4",
  "videos/work/friday-consulting.mp4",
];
for (const file of files) {
  const target = join(film, "public", "site", file);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(site, file), target);
}
console.log(`Copied ${files.length} site assets into public/site/`);
