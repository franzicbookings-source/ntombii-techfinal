import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
async function page(path) {
  const response = await worker.fetch(new Request(`https://ntombii.tech${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}
const clips = html => [...html.matchAll(/<source src="\/videos\/work\/([a-z0-9-]+)\.mp4"/g)].map(match => match[1]);

test("every portfolio project has a motion clip and poster, with accessible playback and no overlay icon", async () => {
  const { status, html } = await page("/work");
  assert.equal(status, 200);
  const ids = clips(html);
  assert.equal(ids.length, 7);
  for (const id of ids) {
    await access(new URL(`../public/videos/work/${id}.mp4`, import.meta.url));
    await access(new URL(`../public/videos/work/${id}-poster.webp`, import.meta.url));
  }
  assert.equal((html.match(/class="project-motion-control"/g) ?? []).length, ids.length);
  assert.match(html, /aria-label="Play the Friday Consulting video"/);
  assert.match(html, /preload="none"/);
  assert.doesNotMatch(html, /project-motion-toggle/);
});

test("the homepage shows every project clip and keeps the refreshed structure", async () => {
  const { html } = await page("/");
  assert.equal(clips(html).length, 7);
  assert.doesNotMatch(html, /class="eyebrow"/);
  assert.doesNotMatch(html, /id="home-articles-title"/);
  assert.match(html, /aria-label="Previous project"/);
  assert.match(html, /aria-label="Next project"/);
  for (const path of ["/work/friday-consulting", "/work/legend-black-jesus", "/services/websites", "/pricing"]) {
    const { html: other } = await page(path);
    assert.ok(clips(other).length >= 1, path);
  }
});
