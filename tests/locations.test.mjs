import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
async function page(path) {
  const response = await worker.fetch(new Request(`https://ntombii.tech${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}
function linkedData(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(match => { const data = JSON.parse(match[1]); return data["@graph"] ?? [data]; });
}

test("Pretoria and Centurion have one indexable regional page with real prices, work and an area-specific enquiry", async () => {
  const { status, html } = await page("/website-design-pretoria");
  assert.equal(status, 200);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /Website design in Pretoria and Centurion\./);
  assert.match(html, /rel="canonical" href="https:\/\/ntombii.tech\/website-design-pretoria"/);
  assert.doesNotMatch(html, /<meta[^>]*content="[^"]*noindex/i);
  for (const text of ["Hatfield", "Brooklyn", "Lynnwood", "Menlyn", "Irene", "Lyttelton", "R2,500", "R5,000", "by appointment", "14 days"]) assert.ok(html.includes(text), text);
  for (const path of ["/work/snesenzo-security", "/work/legend-black-jesus", "/work/friday-consulting", "/pricing", "/website-design-kzn", "/services/ai-digital-tools"]) assert.ok(html.includes(`href="${path}"`));
  const enquiry = [...html.matchAll(/href="(https:\/\/wa.me\/27812360230[^\"]*)"/g)].map(match => new URL(match[1].replaceAll("&amp;", "&").replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex ?? decimal, hex ? 16 : 10)))));
  assert.ok(enquiry.some(url => /Pretoria or Centurion/.test(url.searchParams.get("text")) && /My area is:/.test(url.searchParams.get("text"))));
  const service = linkedData(html).find(item => item["@type"] === "Service");
  assert.equal(service.url, "https://ntombii.tech/website-design-pretoria");
  assert.equal(service.provider["@id"], "https://ntombii.tech/#business");
  assert.ok(service.areaServed.some(place => place.name === "Centurion"));
  assert.ok(!service.address);
});

test("shared business identity serves both cities while retaining its Newcastle address", async () => {
  const { html } = await page("/");
  assert.match(html, /from Newcastle, KZN, and Pretoria, Gauteng, for businesses across South Africa/);
  assert.match(html, /Newcastle, KZN · Pretoria, Gauteng/);
  const business = linkedData(html).find(item => item["@type"] === "ProfessionalService");
  assert.equal(business.address.addressLocality, "Newcastle");
  assert.ok(!business.address.streetAddress);
  for (const name of ["Newcastle", "Osizweni", "Madadeni", "Pretoria", "Centurion", "Hatfield", "Lyttelton"]) assert.ok(business.areaServed.some(place => place.name === name), name);
  assert.equal(business.telephone, "+27812360230");
  assert.match(html, /<title>Website Design in Newcastle &amp; Pretoria \| Ntombii Tech<\/title>/);
  assert.match(html, /property="og:image:alt"[^>]*Pretoria/);
});

test("both regions remain discoverable and physical service areas stay in KZN", async () => {
  for (const path of ["/", "/services/websites", "/contact", "/website-design-kzn"]) {
    const { status, html } = await page(path);
    assert.equal(status, 200);
    assert.ok(html.includes('href="/website-design-pretoria"'), path);
    assert.ok(html.includes('href="/website-design-kzn"'), path);
  }
  const { html: sitemap } = await page("/sitemap.xml");
  assert.equal((sitemap.match(/<loc>https:\/\/ntombii.tech\/website-design-pretoria<\/loc>/g) ?? []).length, 1);
  assert.doesNotMatch(sitemap, /website-design-(hatfield|menlyn|lynnwood|irene|centurion)/);
  const { html: printing } = await page("/services/printing");
  const printService = linkedData(printing).find(item => item["@type"] === "Service");
  assert.equal(printService.areaServed.name, "KwaZulu-Natal");
});
