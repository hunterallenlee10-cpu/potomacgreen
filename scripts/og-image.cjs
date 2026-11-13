// Renders public/og-image.png (1200 x 630) from scripts/og-image.html. Run: node scripts/og-image.cjs
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto("file://" + path.join(__dirname, "og-image.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "../public/og-image.png") });
  await b.close();
  console.log("public/og-image.png written");
})();
