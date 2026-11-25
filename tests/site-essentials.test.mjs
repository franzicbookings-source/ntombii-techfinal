import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
async function page(path) {
  const response = await worker.fetch(new Request(`https://ntombii.tech${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test("all sitemap pages have unique titles and descriptions after the metadata cleanup", async () => {
  const { html: sitemap } = await page("/sitemap.xml");
  const paths = [...sitemap.matchAll(/<loc>https:\/\/ntombii.tech([^<]*)<\/loc>/g)].map(match => match[1] || "/");
  assert.equal(paths.length, 37);
  const titles = new Set(); const descriptions = new Set();
  for (const path of paths) {
    const { status, html } = await page(path); assert.equal(status, 200, path);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title, path); assert.ok(description, path);
    assert.ok(!titles.has(title), `Duplicate title: ${path}`); titles.add(title);
    assert.ok(!descriptions.has(description), `Duplicate description: ${path}`); descriptions.add(description);
    assert.match(html, /href="\/apple-touch-icon.png"|href="https:\/\/ntombii.tech\/apple-touch-icon.png"/);
    assert.match(html, /href="\/site.webmanifest"|href="https:\/\/ntombii.tech\/site.webmanifest"/);
  }
});

test("favicon exports have their declared dimensions and the manifest preserves browser behavior", async () => {
  for (const [file, size] of [["favicon-16x16.png",16],["favicon-32x32.png",32],["favicon-48x48.png",48],["apple-touch-icon.png",180],["icons/icon-192.png",192],["icons/icon-512.png",512]]) {
    const png = await readFile(new URL(`../public/${file}`, import.meta.url));
    assert.equal(png.readUInt32BE(16), size); assert.equal(png.readUInt32BE(20), size);
  }
  const ico = await readFile(new URL("../public/favicon.ico", import.meta.url));
  assert.equal(ico.readUInt16LE(2), 1); assert.equal(ico.readUInt16LE(4), 3);
  const manifest = JSON.parse(await readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.name, "Ntombii Tech"); assert.equal(manifest.display, "browser");
  assert.deepEqual(manifest.icons.map(icon => icon.sizes), ["192x192", "512x512"]);
});
