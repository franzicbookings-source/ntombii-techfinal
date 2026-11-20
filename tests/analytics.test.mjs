import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function setup(choice, hostname = "ntombii.tech") {
  const cookies = new Map(choice ? [["ntombii_cookie_choice", choice]] : []);
  const scripts = [];
  const document = {
    title: "A public service page | Ntombii Tech",
    referrer: "https://www.facebook.com/private-path?email=private@example.com",
    head: { appendChild(script) { scripts.push(script); } },
    createElement() { return {}; },
    get cookie() { return [...cookies].map(([k, v]) => `${k}=${v}`).join("; "); },
    set cookie(text) {
      const [pair] = text.split(";"); const [key, value] = pair.split("=");
      if (/Max-Age=0(?:;|$)/.test(text)) cookies.delete(key); else cookies.set(key, value);
    },
  };
  const window = { location: new URL(`https://${hostname}/services/websites?name=PrivateName&email=private@example.com#private`) };
  const context = vm.createContext({ document, window, URL, Date });
  const modules = new Map();
  function load(name) {
    if (modules.has(name)) return modules.get(name);
    const source = readFileSync(new URL(`../components/${name}.ts`, import.meta.url), "utf8");
    const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
    const module = { exports: {} }; modules.set(name, module.exports);
    const run = vm.runInContext(`(function(require,module,exports){${code}\n})`, context);
    run(path => load(path.replace("./", "")), module, module.exports);
    return module.exports;
  }
  const analytics = load("analytics");
  const commands = () => Array.from(window.dataLayer ?? [], args => Array.from(args));
  return { analytics, window, document, cookies, scripts, commands };
}

test("analytics never loads without explicit analytics consent or on preview domains", () => {
  for (const [choice, host] of [[undefined, "ntombii.tech"], ["essential", "ntombii.tech"], ["marketing", "ntombii.tech"], ["analytics", "localhost"]]) {
    const { analytics, scripts, commands } = setup(choice, host);
    analytics.syncAnalyticsConsent(); analytics.trackPageView(); analytics.trackQuoteHandoff("website_quote");
    assert.equal(scripts.length, 0);
    assert.equal(commands().length, 0);
  }
});

test("consented navigation records one view per page and strips private URL details", () => {
  const { analytics, window, scripts, commands } = setup("analytics");
  analytics.syncAnalyticsConsent(); analytics.trackPageView();
  analytics.syncAnalyticsConsent(); analytics.trackPageView();
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-JT3MH8VDXB&l=dataLayer");
  let events = commands().filter(args => args[0] === "event");
  assert.equal(events.length, 1);
  assert.equal(events[0][1], "page_view");
  assert.equal(events[0][2].page_location, "https://ntombii.tech/services/websites");
  assert.equal(events[0][2].page_referrer, "https://www.facebook.com");
  window.location = new URL("https://ntombii.tech/pricing?business=PrivateBusiness");
  analytics.trackPageView(); analytics.trackWhatsAppClick("pricing"); analytics.trackQuoteHandoff("website_quote");
  events = commands().filter(args => args[0] === "event");
  assert.deepEqual(events.map(args => args[1]), ["page_view", "page_view", "whatsapp_click", "quote_form_handoff"]);
  assert.doesNotMatch(JSON.stringify(commands()), /PrivateName|PrivateBusiness|private@example|private-path|wa\.me/);
  const config = commands().find(args => args[0] === "config")[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
});

test("withdrawal clears analytics cookies and pending events while preserving other cookies", () => {
  const { analytics, window, cookies, commands, scripts } = setup("analytics");
  analytics.syncAnalyticsConsent(); analytics.trackPageView(); analytics.trackQuoteHandoff("website_quote");
  cookies.set("_ga", "test"); cookies.set("_ga_JT3MH8VDXB", "test"); cookies.set("unrelated", "keep");
  cookies.set("ntombii_cookie_choice", "essential"); analytics.syncAnalyticsConsent();
  analytics.trackPageView(); analytics.trackWhatsAppClick("hero"); analytics.trackQuoteHandoff("kzn_print");
  assert.equal(window["ga-disable-G-JT3MH8VDXB"], true);
  assert.equal(cookies.has("_ga"), false); assert.equal(cookies.has("_ga_JT3MH8VDXB"), false);
  assert.equal(cookies.get("unrelated"), "keep"); assert.equal(cookies.get("ntombii_cookie_choice"), "essential");
  assert.equal(commands().filter(args => args[0] === "event").length, 0);
  cookies.set("ntombii_cookie_choice", "analytics"); analytics.syncAnalyticsConsent(); analytics.trackPageView(); analytics.trackPageView();
  assert.equal(scripts.length, 1);
  assert.equal(commands().filter(args => args[0] === "event").length, 1);
});

test("restricted cookie storage and an unsaved opt-out do not break the site or leave analytics active", () => {
  const { analytics, window, document, commands } = setup("analytics");
  analytics.syncAnalyticsConsent(); analytics.trackPageView();
  Object.defineProperty(document, "cookie", { get() { throw new Error("Storage blocked"); }, set() { throw new Error("Storage blocked"); } });
  assert.doesNotThrow(() => analytics.stopAnalytics());
  assert.doesNotThrow(() => analytics.syncAnalyticsConsent());
  analytics.trackQuoteHandoff("website_quote");
  assert.equal(window["ga-disable-G-JT3MH8VDXB"], true);
  assert.equal(commands().filter(args => args[0] === "event").length, 0);
});

test("an explicit opt-out stays in effect if a blocked cookie write leaves an old opt-in behind", () => {
  const { analytics, window, commands } = setup("analytics");
  analytics.syncAnalyticsConsent(); analytics.trackPageView();
  analytics.stopAnalytics(true);
  window.location = new URL("https://ntombii.tech/pricing");
  analytics.syncAnalyticsConsent(); analytics.trackPageView(); analytics.trackQuoteHandoff("website_quote");
  assert.equal(window["ga-disable-G-JT3MH8VDXB"], true);
  assert.equal(commands().filter(args => args[0] === "event").length, 0);
  analytics.syncAnalyticsConsent(true); analytics.trackPageView();
  assert.equal(commands().filter(args => args[0] === "event").length, 1);
});
