import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
const works = JSON.parse(await readFile(new URL("../components/graphic-works.json", import.meta.url), "utf8"));
async function page(path) {
  const response = await worker.fetch(new Request(`https://ntombii.tech${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test("the graphics portfolio renders all selected artwork with its own canonical and accurate image schema", async () => {
  const { status, html } = await page("/graphics");
  assert.equal(status, 200);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /href="https:\/\/ntombii\.tech\/graphics"/);
  assert.equal([...html.matchAll(/class="graphics-artwork(?: [^"]*)?"/g)].length, works.length);
  assert.equal(works.length, 29);
  for (const work of works) {
    assert.ok(html.includes(work.thumbnail));
    assert.ok(work.alt.length > 30);
  }
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const portfolio = schemas.find(schema => schema["@type"] === "CollectionPage");
  assert.equal(portfolio.hasPart.length, works.length);
  assert.equal(portfolio.url, "https://ntombii.tech/graphics");
  assert.doesNotMatch(html, /applying for jobs|job applications|hiring me/i);
});

test("graphics is discoverable from the existing site and included in its sitemap", async () => {
  for (const path of ["/", "/work", "/services/branding-print"]) {
    const { status, html } = await page(path);
    assert.equal(status, 200);
    assert.match(html, /href="\/graphics"/);
  }
  const { status, html } = await page("/sitemap.xml");
  assert.equal(status, 200);
  assert.match(html, /https:\/\/ntombii\.tech\/graphics/);
});

 test("retired festival work is removed and client artwork is identified", async () => {
  for (const path of ["/", "/work", "/graphics", "/website-design-kzn", "/services/websites", "/sitemap.xml"]) {
    const { html } = await page(path);
    assert.doesNotMatch(html, /amcordam|work-festival|before-the-gates/i);
  }
  assert.equal((await page("/work/amcordam-festival")).status, 404);
  assert.equal(works.filter(work => work.brand === "Snesenzo Security Group").length, 4);
});


test("the graphics collection opens with a curated selection while retaining every artwork and its deep link", async () => {
  const { html } = await page("/graphics");
  const articles = [...html.matchAll(/<article class="graphics-piece"[^>]*>/g)].map(match => match[0]);
  assert.equal(articles.length, 29);
  assert.equal(articles.filter(tag => !/\bhidden(?:[ =>])/.test(tag)).length, 9);
  assert.match(articles[0], /id="business-browsable"/);
  assert.match(html, /Filter graphic design work/);
  for (const label of ["All work", "Client campaigns", "Websites", "Products", "Print &amp; branding"]) assert.ok(html.includes(label));
  assert.match(html, /Show more work/);
  for (const work of works) assert.ok(articles.some(tag => tag.includes(`id="${work.slug}"`)));
});
