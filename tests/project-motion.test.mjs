import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
async function page(path) {
  const response = await worker.fetch(new Request(`https://ntombii.tech${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}
const clips = html => [...html.matchAll(/<source src="\/videos\/work\/([a-z0-9-]+)\.mp4(?:\?[^"]*)?"/g)].map(match => match[1]);

test("every portfolio project has a motion clip and poster, with accessible playback and no overlay icon", async () => {
  const { status, html } = await page("/work");
  assert.equal(status, 200);
  const ids = clips(html);
  assert.equal(ids.length, 7);
  assert.equal(ids[2], "keep-newcastle-alive");
  for (const id of ids) {
    await access(new URL(`../public/videos/work/${id}.mp4`, import.meta.url));
    await access(new URL(`../public/videos/work/${id}-poster.webp`, import.meta.url));
    await access(new URL(`../public/videos/work/${id}-thumb.webp`, import.meta.url));
  }
  assert.equal((html.match(/class="project-motion-control"/g) ?? []).length, ids.length);
  assert.match(html, /aria-label="Play the Friday Consulting video"/);
  assert.match(html, /preload="none"/);
  assert.doesNotMatch(html, /project-motion-toggle/);
});

test("the homepage shows every project clip and keeps the refreshed structure", async () => {
  const { html } = await page("/");
  const ids = clips(html);
  assert.equal(ids.length, 7);
  assert.equal(ids[2], "keep-newcastle-alive");
  assert.doesNotMatch(html, /class="eyebrow"/);
  assert.doesNotMatch(html, /id="home-articles-title"/);
  assert.match(html, /aria-label="Previous project"/);
  assert.match(html, /aria-label="Next project"/);
  for (const path of ["/work/friday-consulting", "/work/legend-black-jesus", "/services/websites", "/pricing"]) {
    const { html: other } = await page(path);
    assert.ok(clips(other).length >= 1, path);
  }
});

test("every case study links to the next project in portfolio order, including the last", async () => {
  const index = await page("/work");
  const ids = clips(index.html);
  for (const [position, id] of ids.entries()) {
    const story = await page(`/work/${id}`);
    const nextId = ids[(position + 1) % ids.length];
    assert.equal(story.status, 200);
    assert.deepEqual(clips(story.html), [id]);
    assert.match(story.html, new RegExp(`<a[^>]*class="case-next"[^>]*href="/work/${nextId}"|<a[^>]*href="/work/${nextId}"[^>]*class="case-next"`), id);
  }
});
