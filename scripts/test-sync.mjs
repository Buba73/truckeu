/**
 * Test skript: stáhne data z autobahn.de, přeloží jeden výsledek přes Gemini
 * Spuštění: node scripts/test-sync.mjs
 * Vyžaduje .env.local s GEMINI_API_KEY (Supabase není potřeba pro test)
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Načti .env.local
try {
  const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
  for (const line of env.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && !key.startsWith("#")) process.env[key.trim()] = vals.join("=").trim();
  }
} catch {
  console.log("ℹ️  .env.local nenalezen, pokračuji bez Gemini překladu\n");
}

const BASE = "https://verkehr.autobahn.de/o/autobahn";

async function main() {
  console.log("🚗 Test: autobahn.de API + Gemini překlad\n");

  // 1) Seznam dálnic
  const roadsRes = await fetch(`${BASE}/`);
  const { roads } = await roadsRes.json();
  console.log(`✅ Načteno ${roads.length} dálnic:`, roads.slice(0, 8).join(", "), "...");

  // 2) Roadworks pro A8
  const rwRes = await fetch(`${BASE}/A8/services/roadworks`);
  const { roadworks } = await rwRes.json();
  const closRes = await fetch(`${BASE}/A8/services/closure`);
  const { closure } = await closRes.json();

  console.log(`✅ A8 roadworks: ${roadworks?.length ?? 0} položek`);
  console.log(`✅ A8 closures:  ${closure?.length ?? 0} položek\n`);

  // 3) Ukázka prvního záznamu
  const sample = roadworks?.[0] ?? closure?.[0];
  if (!sample) { console.log("⚠️  Žádná data k překladu"); return; }

  console.log("📋 Originální titulek (DE):", sample.title);
  console.log("📋 Originální popis (DE):\n", sample.description.filter(Boolean).join("\n"), "\n");

  // 4) Překlad přes Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("⚠️  GEMINI_API_KEY není nastaven – překlad přeskočen");
    console.log("   Nastav ho v .env.local jako: GEMINI_API_KEY=your_key_here");
    return;
  }

  console.log("🔄 Překládám přes Gemini...");
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const titleRes = await model.generateContent(
    `Přelož následující německý dopravní text do češtiny. Odpověz POUZE přeloženým textem:\n\n${sample.title}`
  );
  const descRes = await model.generateContent(
    `Přelož následující německý dopravní text do češtiny. Odpověz POUZE přeloženým textem:\n\n${sample.description.filter(Boolean).join("\n")}`
  );

  console.log("✅ Přeložený titulek (CS):", titleRes.response.text().trim());
  console.log("✅ Přeložený popis (CS):\n", descRes.response.text().trim());
  console.log("\n🎉 Vše funguje! Flow je připraven.");
}

main().catch((err) => { console.error("❌ Chyba:", err); process.exit(1); });
