import assert from "node:assert/strict";
import test from "node:test";

let worker;
async function render(path) {
  worker ??= (await import(new URL("../dist/server/index.js", import.meta.url))).default;
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  return { response, html: await response.text() };
}

test("missing pages keep a 404 response and offer branded recovery links", async () => {
  const { response, html } = await render("/an-unavailable-page");
  assert.equal(response.status, 404);
  assert.match(html, /We can’t find that page/);
  assert.match(html, /Back to home/);
  assert.match(html, /Explore our work/);
});

test("all nine reviews have a crawlable reading page without duplicated marquee copies", async () => {
  const { response, html } = await render("/reviews");
  assert.equal(response.status, 200);
  assert.equal((html.match(/class="review-card"/g) ?? []).length, 9);
  assert.match(html, /Thandeka Nkosi/);
  assert.match(html, /Anele Mbatha/);
  assert.match(html, /rel="canonical" href="https:\/\/ntombii.tech\/reviews"/);
});

test("the homepage includes its hero and quote form in main and links to privacy and all reviews", async () => {
  const { html } = await render("/");
  const main = html.slice(html.indexOf('<main id="main">'), html.indexOf('</main>'));
  assert.match(main, /<h1/);
  assert.match(main, /class="quote-form"/);
  assert.match(html, /href="\/reviews"/);
  assert.match(html, /href="\/privacy"/);
  const { response, html: privacy } = await render("/privacy");
  assert.equal(response.status, 200);
  assert.match(privacy, /ntombii_cookie_choice/);
  assert.match(privacy, /180 days/);
  assert.match(privacy, /Optional analytics/);
  assert.match(privacy, /Analytics only starts after you choose/);
  assert.match(privacy, /Advertising tracking is disabled/);
});
