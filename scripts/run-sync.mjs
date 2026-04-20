/**
 * Lokální sync bez Next.js serveru
 * Stáhne data z autobahn.de a uloží do Supabase (bez překladu pokud chybí GEMINI_API_KEY)
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Načti .env.local
try {
  const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
  for (const line of env.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && !key.startsWith("#")) process.env[key.trim()] = vals.join("=").trim();
  }
} catch { /* ignore */ }

const BASE = "https://verkehr.autobahn.de/o/autobahn";
const PRIORITY_ROADS = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function translate(text) {
  if (!process.env.GEMINI_API_KEY || !text) return text;
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  const res = await model.generateContent(
    `Přelož následující německý dopravní text do češtiny. Odpověz POUZE přeloženým textem:\n\n${text}`
  );
  return res.response.text().trim();
}

async function main() {
  console.log("🚛 TruckEU sync start...\n");

  const { roads } = await fetch(`${BASE}/`).then(r => r.json());
  const toProcess = roads.filter(r => PRIORITY_ROADS.includes(r));
  console.log(`📍 Zpracovávám ${toProcess.length} dálnic: ${toProcess.join(", ")}\n`);

  let saved = 0, errors = 0;

  for (const road of toProcess) {
    process.stdout.write(`${road}: `);
    const [{ roadworks = [] }, { closure = [] }] = await Promise.all([
      fetch(`${BASE}/${road}/services/roadworks`).then(r => r.json()).catch(() => ({})),
      fetch(`${BASE}/${road}/services/closure`).then(r => r.json()).catch(() => ({})),
    ]);

    const items = [
      ...roadworks.map(i => ({ ...i, type: "roadworks" })),
      ...closure.map(i => ({ ...i, type: "closure" })),
    ];

    process.stdout.write(`${items.length} položek... `);

    for (const item of items) {
      try {
        const descRaw = (item.description || []).filter(Boolean).join("\n");
        const [titleCs, descCs] = await Promise.all([
          translate(item.title),
          translate(descRaw),
        ]);

        const { error } = await sb.from("roadworks").upsert({
          identifier: item.identifier,
          autobahn: road,
          type: item.type,
          title_cs: titleCs || item.title,
          description_cs: descCs || descRaw,
          start_date: item.startTimestamp || null,
          coordinates: item.coordinate,
          updated_at: new Date().toISOString(),
        }, { onConflict: "identifier" });

        if (error) throw error;
        saved++;
      } catch (e) {
        errors++;
      }
    }
    console.log("✅");
  }

  const { data } = await sb.from("roadworks").select("count");
  console.log(`\n🎉 Hotovo! Uloženo: ${saved}, chyb: ${errors}`);
  console.log(`📊 Celkem v DB: ${data?.[0]?.count ?? "?"} záznamů`);
}

main().catch(e => { console.error("❌", e); process.exit(1); });
