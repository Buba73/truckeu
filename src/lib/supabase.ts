import { createClient } from "@supabase/supabase-js";

export interface OfficialPortal {
  id: number;
  country_code: string;
  portal_type: "toll" | "traffic_info" | "bans" | "regulations" | "permits" | "general";
  name: string;
  url: string;
  language: string | null;
  notes: string | null;
}

export async function getPortals(countryCode: string): Promise<OfficialPortal[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return [];
  const sb = createClient(url, key);
  const { data } = await sb
    .from("official_portals")
    .select("id, country_code, portal_type, name, url, language, notes")
    .eq("country_code", countryCode.toUpperCase())
    .order("portal_type");
  return data ?? [];
}

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
