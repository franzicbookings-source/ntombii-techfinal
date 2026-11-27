// Capture the real Moyandi Scents mobile UI states for the walkthrough film. Every non-GET request is blocked,
// so nothing is saved on the live store (no carts, orders or analytics). Writes assets/ui/*.png and assets/ui/taps.json.
const { chromium, devices } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const out = path.join(__dirname, "assets/ui");
const SITE = "https://moyandiscents.co.za";
const taps = {};

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices["iPhone 13"], deviceScaleFactor: 3.5, reducedMotion: "reduce" });
  await ctx.route("**/*", route => ["GET", "HEAD"].includes(route.request().method()) ? route.continue() : route.abort());
  const page = await ctx.newPage();
  const shot = async (name, opts = {}) => { await page.waitForTimeout(700); await page.screenshot({ path: path.join(out, `${name}.png`), ...opts }); console.log("captured", name); };
  const box = async (name, locator) => { const b = await locator.boundingBox(); taps[name] = b && { x: b.x + b.width / 2, y: b.y + b.height / 2, w: b.width, h: b.height }; };
  const hide = () => page.addStyleTag({ content: ".skip-link,[class*=skip]{display:none!important}*{caret-color:transparent!important}" });

  await page.goto(SITE + "/", { waitUntil: "networkidle" });
  const reject = page.getByRole("button", { name: "Reject optional" }); if (await reject.count()) await reject.first().click();
  await hide();
  await shot("home");
  await shot("home-long", { fullPage: true, clip: { x: 0, y: 0, width: 390, height: 2400 } });
  await page.evaluate(() => document.querySelector("#collection")?.scrollIntoView({ block: "start" }));
  await shot("home-collection");
  await box("candle-card", page.locator('a[href="/products/double-wick-glass-jar-candle"]').first());

  await page.goto(SITE + "/products/double-wick-glass-jar-candle", { waitUntil: "networkidle" }); await hide();
  await shot("product");
  await box("scent-rose", page.getByRole("radio", { name: "Rose & Peony" }).or(page.getByRole("button", { name: "Rose & Peony" })).first());
  await page.getByRole("radio", { name: "Rose & Peony" }).or(page.getByRole("button", { name: "Rose & Peony" })).first().click();
  await shot("product-rose");
  await box("add-to-cart", page.getByRole("button", { name: "Add to cart" }));
  await page.getByRole("button", { name: "Add to cart" }).click();
  await shot("cart");
  await box("checkout-btn", page.getByRole("link", { name: /checkout/i }).or(page.getByRole("button", { name: /checkout/i })).first());

  await page.goto(SITE + "/gifts", { waitUntil: "networkidle" }); await hide();
  await shot("gifts");
  const combo = page.getByText("Candle, diffuser & linen spray").first();
  await combo.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -140));
  await shot("gifts-combos");
  await box("combo-3", combo);
  await combo.click();
  const sandal = page.getByRole("radio", { name: "Sandalwood" }).or(page.getByRole("button", { name: "Sandalwood" })).first();
  await sandal.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -200));
  await shot("gifts-scents");
  await box("scent-sandalwood", sandal);
  await sandal.click();
  await shot("gifts-scents-picked");
  const total = page.getByText("Gift set total").first();
  await total.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -260));
  await shot("gifts-total");

  await page.goto(SITE + "/checkout", { waitUntil: "networkidle" }); await hide();
  await shot("checkout-1");
  await page.getByLabel("Email").fill("thandi@example.com");
  await page.getByLabel("First name").fill("Thandi");
  await page.getByLabel("Last name").fill("Mokoena");
  await page.getByLabel("Mobile number").fill("082 000 0000");
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  await shot("checkout-1-filled");
  await box("continue-delivery", page.getByRole("button", { name: /continue to delivery/i }));
  await page.getByRole("button", { name: /continue to delivery/i }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot("checkout-2");
  const locker = page.getByText("Locker collection").first();
  await box("locker", locker);
  await locker.click();
  await shot("checkout-2-locker");
  const pay = page.getByRole("button", { name: /continue to secure payment/i });
  await pay.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, 160));
  await shot("checkout-2-pay");
  await box("secure-payment", pay);

  fs.writeFileSync(path.join(out, "taps.json"), JSON.stringify(taps, null, 2));
  await browser.close();
})();
