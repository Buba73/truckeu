import { NextResponse } from "next/server";
import { fetchRoads, fetchRoadworks, fetchClosures, AutobahnItem } from "@/lib/autobahn";
import { translateToCzech } from "@/lib/gemini";
import { upsertRoadwork } from "@/lib/supabase";

// null = všechny dálnice z API
const PRIORITY_ROADS: string[] | null = null;

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Ochrana cron endpointu
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = { processed: 0, errors: 0, roads: [] as string[] };

  try {
    const allRoads = await fetchRoads();
    const roads = PRIORITY_ROADS ? allRoads.filter((r) => PRIORITY_ROADS.includes(r)) : allRoads;

    for (const road of roads) {
      try {
        const [roadworks, closures] = await Promise.all([
          fetchRoadworks(road),
          fetchClosures(road),
        ]);

        const items: Array<{ item: AutobahnItem; type: "roadworks" | "closure" }> = [
          ...roadworks.map((item) => ({ item, type: "roadworks" as const })),
          ...closures.map((item) => ({ item, type: "closure" as const })),
        ];

        for (const { item, type } of items) {
          try {
            const descriptionRaw = item.description.filter(Boolean).join("\n");
            const [titleCs, descCs] = await Promise.all([
              translateToCzech(item.title),
              descriptionRaw ? translateToCzech(descriptionRaw) : Promise.resolve(""),
            ]);

            await upsertRoadwork({
              identifier: item.identifier,
              autobahn: road,
              type,
              title_cs: titleCs,
              description_cs: descCs,
              start_date: item.startTimestamp ?? null,
              coordinates: JSON.stringify(item.coordinate),
            });

            results.processed++;
          } catch (err) {
            console.error(`Error processing ${item.identifier}:`, err);
            results.errors++;
          }
        }

        results.roads.push(road);
      } catch (err) {
        console.error(`Error fetching road ${road}:`, err);
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
    timestamp: new Date().toISOString(),
  });
}
