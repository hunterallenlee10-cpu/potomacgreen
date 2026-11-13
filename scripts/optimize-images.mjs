// Converts the raw Drive assets in public/images/raw into optimised .webp files.
// Run with `npm run images`. Writes public/images/*.webp, lib/image-manifest.json,
// the favicons in app/ and public/favicon.ico.
import sharp from "sharp";
import { readdir, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rawDir = path.join(root, "public/images/raw");
const outDir = path.join(root, "public/images");
const WIDTHS = [640, 1280, 2400];

const files = (await readdir(rawDir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const input = path.join(rawDir, file);
  const meta = await sharp(input).metadata();
  const isLogo = base.startsWith("00-");
  const widths = isLogo
    ? [64, 128, meta.width].filter((w, i, a) => w <= meta.width && a.indexOf(w) === i)
    : [...new Set(WIDTHS.map((w) => Math.min(w, meta.width)))];

  const entry = { width: meta.width, height: meta.height, widths: [] };
  for (const w of widths) {
    const out = path.join(outDir, `${base}-${w}.webp`);
    // The hero is the LCP image: keep it lean.
    const quality = base.startsWith("01-") ? (w >= 2400 ? 62 : 66) : w >= 2400 ? 66 : 72;
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: isLogo ? 90 : quality, effort: 6, alphaQuality: 100 })
      .toFile(out);
    entry.widths.push(w);
  }
  if (isLogo) await copyFile(input, path.join(outDir, `${base}.png`));
  manifest[base] = entry;
  console.log(base, entry.widths.join(","));
}

// Art-directed phone crop of the hero: keeps the door and urns, drops the left lawn.
{
  const base = "01-STOCK-white-brick-home-black-mulch-beds-boxwood-urns-HERO-mobile";
  const input = path.join(rawDir, "01-STOCK-white-brick-home-black-mulch-beds-boxwood-urns-HERO.jpg");
  const crop = { left: 1000, top: 0, width: 1600, height: 1733 };
  const entry = { width: crop.width, height: crop.height, widths: [] };
  for (const w of [640, 960, 1280]) {
    await sharp(input).extract(crop).resize({ width: w }).webp({ quality: 64, effort: 6 }).toFile(path.join(outDir, `${base}-${w}.webp`));
    entry.widths.push(w);
  }
  manifest[base] = entry;
}
// Extra 1600 and 1920 steps for the desktop hero so common laptops skip the 2400 file.
{
  const base = "01-STOCK-white-brick-home-black-mulch-beds-boxwood-urns-HERO";
  for (const w of [1600, 1920]) {
    await sharp(path.join(rawDir, `${base}.jpg`)).resize({ width: w }).webp({ quality: 62, effort: 6 }).toFile(path.join(outDir, `${base}-${w}.webp`));
  }
  manifest[base].widths = [640, 1280, 1600, 1920, 2400];
}

await writeFile(path.join(root, "lib/image-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// Favicons from the site icon.
const icon = path.join(rawDir, "00-logo-2-logo-site-icon-512.png");
await mkdir(path.join(root, "app"), { recursive: true });
await sharp(icon).resize(192).png().toFile(path.join(root, "app/icon.png"));
await sharp(icon).resize(180).flatten({ background: "#073E2B" }).png().toFile(path.join(root, "app/apple-icon.png"));

// favicon.ico with one embedded 32px PNG.
const png32 = await sharp(icon).resize(32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(path.join(root, "app/favicon.ico"), Buffer.concat([header, png32]));
console.log("favicons done");
