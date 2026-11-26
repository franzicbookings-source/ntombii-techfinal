import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("article-tests", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
async function fetchPage(path) {
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}
const slugs = ["website-design-newcastle-business-guide", "get-found-google-ai-search"];
const projectIds = ["la-raza", "moyandi-scents", "keep-newcastle-alive", "friday-consulting", "fezile-security", "legend-black-jesus", "snesenzo-security"];
function linkedData(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(match => { const data = JSON.parse(match[1]); return data["@graph"] ?? [data]; });
}

test("article URLs render indexable, useful content and accurate article metadata", async () => {
  for (const slug of slugs) {
    const response = await fetchPage(`/articles/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.match(html, /Sources and further reading/);
    assert.match(html, /12 October 2026/);
    assert.match(html, /href="\/services\/websites"/);
    assert.match(html, /href="\/contact"/);
    assert.doesNotMatch(html, /<meta[^>]*content="[^"]*noindex/i);
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]).find(link => /rel="canonical"/.test(link));
    assert.ok(canonical?.includes(`href="https://ntombii.tech/articles/${slug}"`));
    const article = linkedData(html).find(item => item["@type"] === "BlogPosting");
    assert.ok(article);
    assert.equal(article.url, `https://ntombii.tech/articles/${slug}`);
    assert.equal(article.datePublished, "2026-10-12");
    assert.equal(article.author.name, "Ntombii Tech");
    assert.ok(html.includes(article.headline.replaceAll("&", "&amp;")));
    assert.ok(article.image[0].startsWith("https://ntombii.tech/images/"));
  }
});

test("articles and all project stories have crawlable paths from the Site", async () => {
  const index = await fetchPage("/articles");
  assert.equal(index.status, 200);
  const html = await index.text();
  for (const slug of slugs) assert.ok(html.includes(`href="/articles/${slug}"`));
  const portfolio = await fetchPage("/work");
  assert.equal(portfolio.status, 200);
  const portfolioHtml = await portfolio.text();
  for (const id of projectIds) {
    assert.ok(portfolioHtml.includes(`href="/work/${id}"`));
    const story = await fetchPage(`/work/${id}`);
    assert.equal(story.status, 200);
    assert.match(await story.text(), /Why we built it this way/);
  }
  const sitemapResponse = await fetchPage("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const slug of slugs) assert.ok(sitemap.includes(`https://ntombii.tech/articles/${slug}`));
  assert.ok(sitemap.includes("https://ntombii.tech/work/legend-black-jesus"));
});

test("an unknown article returns 404 rather than an indexable empty article", async () => {
  assert.equal((await fetchPage("/articles/not-a-real-article")).status, 404);
});


test("all project stories pair design decisions with real desktop, detail and phone screenshots", async () => {
  for (const id of projectIds) {
    const response = await fetchPage(`/work/${id}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal([...html.matchAll(/role="tabpanel"/g)].length, 3);
    assert.match(html, /aria-label="Project screens"/);
    assert.match(html, /Open homepage screenshot at full size/);
    assert.match(html, /On a phone/);
    assert.match(html, /class="story-screen-viewer"/);
    assert.ok(html.includes(`rel="canonical" href="https://ntombii.tech/work/${id}"`));
    assert.doesNotMatch(html, /class="work-flow-grid"/);
  }
});

test("the award story connects the issuer, the website and the mobile check", async () => {
  const path = "/articles/ntombii-tech-2026-web-design-award";
  const [article, home, sitemap] = await Promise.all([path, "/", "/sitemap.xml"].map(fetchPage));
  assert.equal(article.status, 200);
  const html = await article.text();
  const post = linkedData(html).find(node => node["@type"] === "BlogPosting");
  const site = linkedData(await home.text()).find(node => node["@type"] === "WebSite" && node["@id"] === "https://ntombii.tech/#website");
  assert.equal(site.subjectOf["@id"], post["@id"]);
  assert.match(html, /id="phone-check"/);
  assert.match(html, /web-design\.co\.za\/web-design-awards\.php/);
  assert.ok((await sitemap.text()).includes(post.url));
});
