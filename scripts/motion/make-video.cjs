// Make a project's 3D motion clip: capture the live site, render the laptop + phone scene, encode MP4 and poster.
// Usage: node scripts/motion/make-video.cjs <project-id> <live-url> [scroll-fraction=0.7]
// Needs Playwright with Chromium and ffmpeg (with libx264 and libwebp). Not part of the site build.
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const [id, url, fractionArg] = process.argv.slice(2);
if (!id || !url) {
  console.error("Usage: node scripts/motion/make-video.cjs <project-id> <live-url> [scroll-fraction]");
  process.exit(1);
}
const fraction = Number(fractionArg ?? 0.7); // how far down the page the clip scrolls; lower it to skip footers or maps
const FPS = 30, SECONDS = 12, FRAMES = FPS * SECONDS;
const here = __dirname;
const work = path.join(here, ".work");
const output = path.join(here, "../../public/videos/work");
fs.mkdirSync(work, { recursive: true });
fs.mkdirSync(output, { recursive: true });

function run(command, args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: [input ? "pipe" : "ignore", "inherit", "inherit"] });
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
    if (input) input(child.stdin);
  });
}

async function capture(browser, mode) {
  const viewport = mode === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 };
  const context = await browser.newContext({ viewport, deviceScaleFactor: mode === "desktop" ? 1 : 520 / 390, isMobile: mode === "mobile", hasTouch: mode === "mobile" });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(error => console.warn(`${mode}: ${error.message.split("\n")[0]}`));
  await page.waitForTimeout(1500);
  for (const name of ["Accept", "Accept all", "Allow all", "Got it", "I agree", "OK"]) {
    const button = page.getByRole("button", { name, exact: true });
    if (await button.count().catch(() => 0)) await button.first().click({ timeout: 1000 }).catch(() => {});
  }
  // Scroll through once so lazy images and reveal animations have loaded before the full-page capture.
  const height = await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.6) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 800));
    return document.documentElement.scrollHeight;
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  const clipHeight = Math.min(height, Math.round(height * fraction + viewport.height));
  await page.screenshot({ path: path.join(work, `${id}-${mode}.png`), fullPage: true, clip: { x: 0, y: 0, width: viewport.width, height: clipHeight } });
  await context.close();
}

(async () => {
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  console.log(`Capturing ${url}`);
  await capture(browser, "desktop");
  await capture(browser, "mobile");

  console.log("Rendering frames");
  const page = await browser.newPage({ viewport: { width: 1200, height: 960 } });
  await page.goto(`file://${path.join(here, "scene.html")}?id=${encodeURIComponent(id)}&domain=${encodeURIComponent(new URL(url).host.replace(/^www\./, ""))}`);
  await page.evaluate(() => window.ready);
  const master = path.join(work, `${id}-master.mp4`);
  const posterPng = path.join(work, `${id}-poster.png`);
  await run("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-", "-c:v", "libx264", "-preset", "veryslow", "-crf", "12", "-pix_fmt", "yuv444p", master], async stdin => {
    for (let frame = 0; frame < FRAMES; frame++) {
      await page.evaluate(progress => window.renderAt(progress), frame / FRAMES);
      const png = await page.screenshot({ type: "png" });
      if (frame === 0) fs.writeFileSync(posterPng, png);
      if (!stdin.write(png)) await new Promise(resolve => stdin.once("drain", resolve));
    }
    stdin.end();
  });
  await browser.close();

  console.log("Encoding for the web");
  await run("ffmpeg", ["-y", "-loglevel", "error", "-i", master, "-an", "-c:v", "libx264", "-preset", "veryslow", "-crf", "28", "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart", path.join(output, `${id}.mp4`)]);
  await run("ffmpeg", ["-y", "-loglevel", "error", "-i", posterPng, "-c:v", "libwebp", "-quality", "80", "-compression_level", "6", path.join(output, `${id}-poster.webp`)]);
  console.log(`Done: public/videos/work/${id}.mp4 and ${id}-poster.webp`);
})().catch(error => { console.error(error); process.exit(1); });
