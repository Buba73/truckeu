import { createClient } from "@supabase/supabase-js";

export interface Roadwork {
  id?: number;
  identifier: string;
  autobahn: string;
  type: "roadworks" | "closure";
  title_cs: string;
  description_cs: string;
  start_date: string | null;
  coordinates: string;
  updated_at?: string;
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing: SUPABASE_URL, SUPABASE_SERVICE_KEY");
  return createClient(url, key);
}

export async function upsertRoadwork(item: Omit<Roadwork, "id" | "updated_at">) {
  const supabase = getClient();
  const { error } = await supabase
    .from("roadworks")
    .upsert({ ...item, updated_at: new Date().toISOString() }, { onConflict: "identifier" });
  if (error) throw error;
}

export async function bulkUpsertRoadworks(items: Omit<Roadwork, "id" | "updated_at">[]) {
  const supabase = getClient();
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("roadworks")
    .upsert(items.map(i => ({ ...i, updated_at: now })), { onConflict: "identifier" });
  if (error) throw error;
}

export async function getLatestRoadworks(limit = 10): Promise<Roadwork[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("roadworks")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
