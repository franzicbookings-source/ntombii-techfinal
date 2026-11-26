// Capture each live client site as a tall desktop page and a tall phone page for the portfolio films.
// Usage (from the repository root): node scripts/motion/films/capture.cjs [project-id ...]
// Needs Playwright with Chromium and Python 3 with Pillow. Writes assets/captures/<id>-desktop.webp and <id>-mobile.webp.
const { chromium } = require("playwright");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const projects = require("./projects.json");

const out = path.join(__dirname, "assets/captures");
const tmp = fs.mkdtempSync(path.join(require("node:os").tmpdir(), "films-"));
fs.mkdirSync(out, { recursive: true });

const modes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, maxHeight: 900 * 5 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1.5, isMobile: true, maxHeight: 844 * 5 },
};

async function capture(browser, project, mode) {
  const settings = modes[mode];
  const context = await browser.newContext({ viewport: settings.viewport, deviceScaleFactor: settings.deviceScaleFactor, isMobile: settings.isMobile, hasTouch: settings.isMobile, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(project.url, { waitUntil: "networkidle", timeout: 60000 }).catch(error => console.warn(`${project.id} ${mode}: ${error.message.split("\n")[0]}`));
  await page.waitForTimeout(1500);
  for (const name of ["Reject optional", "Reject all", "Essential only", "Accept", "Accept all", "Allow all", "Got it", "I agree", "OK"]) {
    const button = page.getByRole("button", { name, exact: true });
    if (await button.count().catch(() => 0)) await button.first().click({ timeout: 1000 }).catch(() => {});
  }
  await page.addStyleTag({ content: '.skip-link,.skip-to-content,[class*="skip-link" i],[class*="skip-to" i],[class*="skiplink" i],a[href="#main"],a[href="#main-content"],a[href="#content"],a[href="#maincontent"]{display:none!important}*{caret-color:transparent!important}' });
  const height = await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.5) {
      window.scrollTo(0, y);
      for (const video of document.querySelectorAll("video")) { video.muted = true; video.play().catch(() => {}); }
      await new Promise(r => setTimeout(r, 400));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 1200));
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    return document.documentElement.scrollHeight;
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  const png = path.join(tmp, `${project.id}-${mode}.png`);
  const clipHeight = Math.min(height, settings.maxHeight);
  await page.screenshot({ path: png, fullPage: true, clip: { x: 0, y: 0, width: settings.viewport.width, height: clipHeight } });
  await context.close();
  const webp = path.join(out, `${project.id}-${mode}.webp`);
  execFileSync("python3", ["-c", "import sys;from PIL import Image;Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2],'WEBP',quality=84,method=6)", png, webp]);
  console.log(`${project.id} ${mode}: ${settings.viewport.width}×${clipHeight} → ${path.relative(process.cwd(), webp)}`);
}

(async () => {
  const wanted = process.argv.slice(2);
  const list = wanted.length ? projects.filter(p => wanted.includes(p.id)) : projects;
  const browser = await chromium.launch();
  for (const project of list) for (const mode of Object.keys(modes)) await capture(browser, project, mode);
  await browser.close();
})();
