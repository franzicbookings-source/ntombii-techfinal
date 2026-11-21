// Renders stills at given frames from one bundle: node scripts/stills.mjs out/dir 0 120 440 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const film = join(dirname(fileURLToPath(import.meta.url)), "..");
const [outDir, ...frames] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: join(film, "src/index.ts") });
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || null;
const composition = await selectComposition({ serveUrl, id: "TwoLights", browserExecutable });
for (const frame of frames.map(Number)) {
  await renderStill({ serveUrl, composition, frame, output: join(outDir, `f${String(frame).padStart(4, "0")}.png`), browserExecutable, imageFormat: "png" });
  process.stdout.write(`${frame} `);
}
console.log("done");
