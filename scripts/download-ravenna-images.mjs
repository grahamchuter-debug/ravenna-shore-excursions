#!/usr/bin/env node
/**
 * Download Ravenna / Porto Corsini destination images from Wikimedia Commons (CC-licensed).
 * Filenames verified via Commons search API.
 */
import { writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "..", "public/images");
const SOURCE = join(import.meta.dirname, "..", "image-sources");
const UA =
  "RavennaShoreExcursions/1.0 (https://ravennashoreexcursions.com; destination image setup)";

const IMAGE_FILES = {
  "hero-home.jpg": [
    "File:Apse mosaic - Basilica of San Vitale (Ravenna).jpg",
    "File:Apse mosaic - Basilica of San Vitale (Ravenna)-edit.jpg",
  ],
  "mosaics.jpg": [
    "File:Mausoleum of Galla Placidia ceiling mosaics.jpg",
    "File:Mausoleum of Galla Placidia mosaics (Ravenna).jpg",
    'File:"The good Shepherd" mosaic - Mausoleum of Galla Placidia.jpg',
  ],
  "san-vitale.jpg": [
    "File:Basilica of San Vitale. Ravenna, Italy.jpg",
    "File:Ravenna - Basilica di San Vitale - 2.jpg",
    "File:Basilica of San Vitale - triumphal arch mosaics.jpg",
  ],
  "og-default.jpg": [
    "File:Ravenna, Basilica of Sant' Apollinare Nuovo - 12523253223.jpg",
    "File:Ravenna, Basilica of Sant' Apollinare Nuovo - 12523490734.jpg",
  ],
  "historic-centre.jpg": [
    "File:Piazza Popolo Ravenna.jpg",
    "File:Piazza del Popolo Ravenna.jpg",
    "File:Ravenna Piazza del Popolo 0099.jpg",
  ],
  "cruise-port.jpg": [
    "File:Ravenna, Porto Corsini (01).jpg",
    "File:Seaport in Ravenna, Italy.jpg",
    "File:Marina Ravenna.jpg",
  ],
  "porto-corsini.jpg": [
    "File:Seaport in Ravenna, Italy.jpg",
    "File:Ravenna, Porto Corsini (01).jpg",
    "File:Faro Porto Corsini.jpg",
  ],
  "bologna.jpg": [
    "File:Piazza Maggiore Bologna.jpg",
    "File:Bologna Piazza Maggiore Fontana del Nettuno 14.jpg",
  ],
  "walking.jpg": [
    "File:Portici di Bologna.jpg",
    "File:Bologna Piazza Maggiore Fontana del Nettuno 10.jpg",
  ],
  "san-marino.jpg": [
    "File:Fortress of Guaita 2013-09-19.jpg",
    "File:Fortress of Guaita - First Tower (San Marino).jpg",
    "File:Torre Guaita, San Marino, 2022-09-20, DD 43.jpg",
  ],
  "photography.jpg": [
    "File:San Marino panorama.jpg",
    "File:Guaita Fortress and San Marino (2023).jpg",
  ],
  "venice.jpg": [
    "File:Gondola on the Grand Canal, Venice, Italy.jpg",
    "File:Venice Gondola Grand Canal.jpg",
    "File:Gondolas, Grand Canal, Venice.jpg",
  ],
  "coast.jpg": [
    "File:Marina-di-ravenna-spiaggia 01.jpg",
    "File:Marina-di-ravenna-spiaggia 03.jpg",
    "File:Marina Ravenna.jpg",
  ],
  "compare.jpg": [
    "File:Bologna Piazza Maggiore Fontana del Nettuno 14.jpg",
    "File:Piazza Popolo Ravenna.jpg",
  ],
  "food.jpg": [
    "File:Tortellini in brodo Bologna.jpg",
    "File:Tortellini in brodo - Bologna.jpg",
    "File:Tortellini in brodo.JPG",
  ],
  "family.jpg": [
    "File:Piazza Popolo Ravenna.jpg",
    "File:Basilica of San Vitale. Ravenna, Italy.jpg",
  ],
};

async function commonsThumbUrl(title, width = 2400) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("titles", title);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url");
  api.searchParams.set("iiurlwidth", String(width));
  api.searchParams.set("format", "json");
  api.searchParams.set("origin", "*");

  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API ${res.status} for ${title}`);
  const data = await res.json();
  const page = Object.values(data.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Download ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  return buf.length;
}

async function resolveAndSave(filename, candidates) {
  for (const title of candidates) {
    try {
      const url = await commonsThumbUrl(title);
      if (!url) {
        console.warn(`  no url: ${title}`);
        continue;
      }
      const outPath = join(OUT, filename);
      const srcPath = join(SOURCE, filename);
      const bytes = await download(url, outPath);
      copyFileSync(outPath, srcPath);
      console.log(`✓ ${filename} ← ${title} (${Math.round(bytes / 1024)}KB)`);
      return true;
    } catch (err) {
      console.warn(`  fail ${title}: ${err.message}`);
    }
  }
  console.error(`✗ FAILED ${filename}`);
  return false;
}

mkdirSync(OUT, { recursive: true });
mkdirSync(SOURCE, { recursive: true });

let ok = 0;
for (const [file, candidates] of Object.entries(IMAGE_FILES)) {
  if (await resolveAndSave(file, candidates)) ok++;
}

writeFileSync(
  join(OUT, "sources.json"),
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      site: "ravennashoreexcursions.com",
      files: Object.keys(IMAGE_FILES),
      note: "Master images sourced from Wikimedia Commons (CC-licensed). See scripts/download-ravenna-images.mjs.",
    },
    null,
    2,
  ),
);

console.log(`\nDownloaded ${ok}/${Object.keys(IMAGE_FILES).length} images`);
if (ok < Object.keys(IMAGE_FILES).length) process.exit(1);
