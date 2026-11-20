import assert from "node:assert/strict";
import test from "node:test";
const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));

test("the about page presents both team members with accurate roles and page metadata", async () => {
  const response = await worker.fetch(new Request("https://ntombii.tech/about", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.match(html, /href="https:\/\/ntombii\.tech\/about"/);
  assert.match(html, /href="#team"/);
  assert.match(html, /id="sabelo-ndlovu"/);
  assert.match(html, /id="sthembile-ndlovu"/);
  assert.match(html, /Design Lead/);
  assert.match(html, /src="\/images\/sthembile-ndlovu.webp"/);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const about = schemas.find(schema => schema["@type"] === "AboutPage");
  assert.ok(about);
  assert.deepEqual(about.mainEntity.member.map(person => person.name), ["Sabelo Ndlovu", "Sthembile Ndlovu"]);
  assert.equal(about.mainEntity.member[1].jobTitle, "Design Lead");
  assert.equal(about.mainEntity.member[1]["@id"], "https://ntombii.tech/about#sthembile-ndlovu");
  assert.match(html, /Grade 9/);
  assert.doesNotMatch(html, /dateOfBirth|birthDate/);
  assert.match(html, /https:\/\/wa.me\/27812360230/);
  assert.match(html, /id="our-story"/);
  assert.doesNotMatch(html, /id="sabelo-story"|id="sthembile-story"/);
  assert.match(html, /managing artists and booking their shows/);
  assert.doesNotMatch(html, /I was making music/);
});
