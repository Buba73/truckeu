const BASE = "https://verkehr.autobahn.de/o/autobahn";

export interface AutobahnItem {
  identifier: string;
  title: string;
  subtitle: string;
  description: string[];
  startTimestamp?: string;
  coordinate: { lat: number; long: number };
  isBlocked: string;
  display_type: string;
}

export async function fetchRoads(): Promise<string[]> {
  const res = await fetch(`${BASE}/`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`Autobahn API error: ${res.status}`);
  const data = await res.json();
  return data.roads as string[];
}

export async function fetchRoadworks(road: string): Promise<AutobahnItem[]> {
  const res = await fetch(`${BASE}/${road}/services/roadworks`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.roadworks ?? []) as AutobahnItem[];
}

export async function fetchClosures(road: string): Promise<AutobahnItem[]> {
  const res = await fetch(`${BASE}/${road}/services/closure`, { next: { revalidate: 0 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.closure ?? []) as AutobahnItem[];
}
