// Render every portfolio film (or the ones named) and export the web files the site uses.
// Usage (from the repository root): node scripts/motion/films/render.cjs [project-id ...] [--draft]
// Needs the HyperFrames CLI (npm install -g hyperframes), FFmpeg with libx264 and libwebp, and Python 3 with Pillow.
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const here = __dirname;
const site = path.join(here, "../../../public/videos/work");
const work = path.join(here, ".renders");
fs.mkdirSync(work, { recursive: true });
const args = process.argv.slice(2);
const draft = args.includes("--draft");
const wanted = args.filter(a => !a.startsWith("--"));
const projects = require("./projects.json").filter(p => !wanted.length || wanted.includes(p.id));

const size = file => execFileSync("python3", ["-c", "import sys;from PIL import Image;print(*Image.open(sys.argv[1]).size)", file]).toString().trim().split(" ").map(Number);

for (const project of projects) {
  const desktop = `assets/captures/${project.id}-desktop.webp`;
  const mobile = `assets/captures/${project.id}-mobile.webp`;
  const variables = {
    domain: project.domain, accent: project.accent, desktop, mobile,
    desktopHeight: size(path.join(here, desktop))[1], mobileHeight: size(path.join(here, mobile))[1],
  };
  const master = path.join(work, `${project.id}${draft ? "-draft" : ""}.mp4`);
  console.log(`\n${project.id}: rendering`);
  execFileSync("hyperframes", ["render", "--variables", JSON.stringify(variables), "--quality", draft ? "draft" : "delivery", "-o", master], { cwd: here, stdio: "inherit" });
  if (draft) continue;

  // Web copy: silent, fast-start H.264 that loops; poster is the opening frame; thumbnail is the browser shot.
  const ff = (...a) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...a], { stdio: "inherit" });
  ff("-i", master, "-an", "-c:v", "libx264", "-preset", "veryslow", "-crf", "24", "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart", path.join(site, `${project.id}.mp4`));
  ff("-i", master, "-frames:v", "1", "-c:v", "libwebp", "-quality", "82", path.join(site, `${project.id}-poster.webp`));
  ff("-ss", "4.6", "-i", master, "-frames:v", "1", "-vf", "crop=900:720:150:120,scale=160:128", "-c:v", "libwebp", "-quality", "80", path.join(site, `${project.id}-thumb.webp`));
  console.log(`${project.id}: ${(fs.statSync(path.join(site, `${project.id}.mp4`)).size / 1e6).toFixed(2)} MB`);
}
