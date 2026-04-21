import { NextResponse } from "next/server";
import { fetchRoads, fetchRoadworks, fetchClosures } from "@/lib/autobahn";
import { translateToCzech } from "@/lib/gemini";
import { bulkUpsertRoadworks } from "@/lib/supabase";

// Zpracujeme 3 dálnice na request – bulk upsert = 1 DB call na dálnici
const ROADS_PER_BATCH = 3;

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const batch = parseInt(url.searchParams.get("batch") ?? "0", 10);

  const results = { processed: 0, errors: 0, roads: [] as string[], batch };

  try {
    const allRoads = await fetchRoads();
    const batchRoads = allRoads.slice(batch * ROADS_PER_BATCH, (batch + 1) * ROADS_PER_BATCH);

    for (const road of batchRoads) {
      try {
        const [roadworks, closures] = await Promise.all([
          fetchRoadworks(road),
          fetchClosures(road),
        ]);

        const items = [
          ...roadworks.map(i => ({ ...i, type: "roadworks" as const })),
          ...closures.map(i => ({ ...i, type: "closure" as const })),
        ];

        // Přeložíme všechny titulky paralelně
        const translated = await Promise.all(
          items.map(async (item) => {
            const descRaw = item.description.filter(Boolean).join("\n");
            const [titleCs, descCs] = await Promise.all([
              translateToCzech(item.title),
              descRaw ? translateToCzech(descRaw) : Promise.resolve(""),
            ]);
            return {
              identifier: item.identifier,
              autobahn: road,
              type: item.type,
              title_cs: titleCs,
              description_cs: descCs,
              start_date: item.startTimestamp ?? null,
              coordinates: JSON.stringify(item.coordinate),
            };
          })
        );

        // Jeden bulk upsert na celou dálnici
        if (translated.length > 0) {
          await bulkUpsertRoadworks(translated);
          results.processed += translated.length;
        }

        results.roads.push(road);
      } catch (err) {
        console.error(`Error syncing road ${road}:`, err);
        results.errors++;
      }
    }
  } catch (err) {
    console.error("Fatal sync error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    ...results,
    totalRoads: Math.ceil(110 / ROADS_PER_BATCH),
    timestamp: new Date().toISOString(),
  });
}
