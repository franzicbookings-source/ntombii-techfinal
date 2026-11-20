import assert from "node:assert/strict";
import test from "node:test";

const url = new URL("../dist/server/index.js", import.meta.url);
url.searchParams.set("regional-test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(url.href);
async function request(path) {
  return worker.fetch(new Request(`http://localhost${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}
const guides = {
  signage: "signage-newcastle-kzn-quote-guide",
  printing: "business-printing-newcastle-kzn-guide",
  "ink-toner": "printer-toner-ink-newcastle-kzn-guide",
};
function schemas(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => { const data = JSON.parse(match[1]); return data["@graph"] ?? [data]; });
}

test("three useful print services and guides render with distinct canonicals and truthful schemas", async () => {
  for (const [service, slug] of Object.entries(guides)) {
    const response = await request(`/services/${service}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.ok(html.includes(`href="https://ntombii.tech/services/${service}"`));
    assert.ok(html.includes(`href="/articles/${slug}"`));
    assert.match(html, /enquiries|request/);
    const data = schemas(html).find(item => item["@type"] === "Service");
    assert.equal(data.url, `https://ntombii.tech/services/${service}`);
    assert.equal(data.areaServed.name, "KwaZulu-Natal");
    assert.equal(data.provider["@id"], "https://ntombii.tech/#business");
    assert.ok(!data.address);
    const guide = await request(`/articles/${slug}`);
    assert.equal(guide.status, 200);
    const articleHtml = await guide.text();
    assert.ok(articleHtml.includes(`href="/services/${service}"`));
    assert.ok(articleHtml.includes('href="/printing-signage-toner-kzn"'));
    assert.match(articleHtml, /example|illustration|mockup/);
    assert.doesNotMatch(articleHtml, /An actual website we built/);
    const article = schemas(articleHtml).find(item => item["@type"] === "BlogPosting");
    assert.equal(article.url, `https://ntombii.tech/articles/${slug}`);
    assert.equal(article.author.name, "Ntombii Tech");
  }
});

test("the single KZN page is a useful enquiry destination and is linked from existing pages", async () => {
  const response = await request("/printing-signage-toner-kzn");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /name="town"/);
  assert.match(html, /name="details"/);
  assert.match(html, /Based in Newcastle|based in Newcastle/);
  for (const [service, slug] of Object.entries(guides)) {
    assert.ok(html.includes(`href="/services/${service}"`));
    assert.ok(html.includes(`href="/articles/${slug}"`));
  }
  for (const path of ["/services/branding-print", "/articles", "/"]) {
    const r = await request(path);
    assert.equal(r.status, 200);
    assert.ok((await r.text()).includes('href="/printing-signage-toner-kzn"'));
  }
  const sitemap = await (await request("/sitemap.xml")).text();
  assert.ok(sitemap.includes("https://ntombii.tech/printing-signage-toner-kzn"));
  for (const [service, slug] of Object.entries(guides)) {
    assert.ok(sitemap.includes(`https://ntombii.tech/services/${service}`));
    assert.ok(sitemap.includes(`https://ntombii.tech/articles/${slug}`));
  }
  assert.doesNotMatch(sitemap, /printing-in-durban|toner-in-utrecht/);
});

test("existing location links redirect straight to the appropriate service without duplicate town pages", async () => {
  for (const [path, destination] of [["/signage-newcastle", "/services/signage"], ["/signage-dundee", "/services/signage"], ["/printing-services-newcastle", "/services/printing"], ["/printing-services-utrecht", "/services/printing"], ["/ink-toner-newcastle", "/services/ink-toner"], ["/ink-toner-ladysmith", "/services/ink-toner"]]) {
    const response = await request(path);
    assert.equal(response.status, 301);
    assert.equal(new URL(response.headers.get("location")).pathname, destination);
    assert.equal((await request(destination)).status, 200);
  }
});
