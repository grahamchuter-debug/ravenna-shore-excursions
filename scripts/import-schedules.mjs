#!/usr/bin/env node
/**
 * Import Ravenna (Porto Corsini) cruise ship schedules from CSV into JSON.
 *
 * Usage:  node scripts/import-schedules.mjs
 *
 * Source:  data/schedule-sources/ravenna.csv
 * Output:  src/data/imported-schedules/ravenna.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "data/schedule-sources/ravenna.csv");
const OUTPUT_DIR = resolve(ROOT, "src/data/imported-schedules");
const OUTPUT = resolve(OUTPUT_DIR, "ravenna.json");

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",").map((c) => c.trim());
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row;
  });
}

function toEntry(row) {
  const arrival = row.arrival || row.Arrival || "";
  const departure = row.departure || row.Departure || "";
  return {
    date: row.date || row.Date,
    ship: row.ship || row.Ship,
    cruiseLine: row.cruiseLine || row.cruise_line || row["Cruise Line"] || "",
    arrival,
    departure,
    timeInPort: row.timeInPort || row.time_in_port || "",
    terminal: row.terminal || row.Terminal || "Porto Corsini",
    callType: row.callType || row.call_type || "Scheduled call — verify itinerary",
    notes:
      row.notes ||
      row.Notes ||
      "Confirm arrival and all-aboard times with your cruise line — schedules can change.",
  };
}

if (!existsSync(SOURCE)) {
  console.error(`Missing CSV: ${SOURCE}`);
  console.error("Create data/schedule-sources/ravenna.csv or maintain ravenna.json directly.");
  process.exit(1);
}

const rows = parseCsv(readFileSync(SOURCE, "utf8"));
const entries = rows.map(toEntry).filter((e) => e.date && e.ship);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(entries, null, 2) + "\n");
console.log(`Wrote ${entries.length} entries → ${OUTPUT}`);
