import { countries, getCountryBySlug } from "@/lib/countries";
import SubNav from "@/components/SubNav";
import InfoField from "@/components/InfoField";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getPortals, type OfficialPortal } from "@/lib/supabase";

export async function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

// Typ řádku z country_regulations (jen sloupce, které používáme)
interface CountryReg {
  speed_motorway_kmh: number | null;
  speed_road_kmh: number | null;
  speed_city_kmh: number | null;
  speed_note: string | null;
  speed_source_url: string | null;
  ban_has_national_bans: boolean | null;
  ban_note: string | null;
  ban_source_url: string | null;
  max_weight_t: number | null;
  max_width_m: number | null;
  max_height_m: number | null;
  max_length_m: number | null;
  dimensions_note: string | null;
  dimensions_source_url: string | null;
  required_equipment: string[] | null;
  equipment_source_url: string | null;
  toll_has_toll: boolean | null;
  toll_system_name: string | null;
  toll_payment_url: string | null;
  toll_systems: { name: string; description?: string; payment_url?: string }[] | null;
  toll_note: string | null;
  toll_source_url: string | null;
  alcohol_general_gl: number | null;
  alcohol_note: string | null;
  alcohol_source_url: string | null;
}

async function getRegulations(countryCode: string): Promise<CountryReg | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;

  const sb = createClient(url, key);
  const { data } = await sb
    .from("country_regulations")
    .select([
      "speed_motorway_kmh", "speed_road_kmh", "speed_city_kmh", "speed_note", "speed_source_url",
      "ban_has_national_bans", "ban_note", "ban_source_url",
      "max_weight_t", "max_width_m", "max_height_m", "max_length_m", "dimensions_note", "dimensions_source_url",
      "required_equipment", "equipment_source_url",
      "toll_has_toll", "toll_system_name", "toll_payment_url", "toll_systems", "toll_note", "toll_source_url",
      "alcohol_general_gl", "alcohol_note", "alcohol_source_url",
    ].join(","))
    .eq("country_code", countryCode.toUpperCase())
    .maybeSingle();

  return (data as CountryReg | null) ?? null;
}

// ── Plánované uzavírky ───────────────────────────────────
interface PlannedRestriction {
  id: number;
  restriction_type: string;
  vehicle_type: string;
  valid_from: string | null;
  valid_to: string | null;
  road_number: string | null;
  location_text: string | null;
  description_cs: string | null;
  source_url: string;
  source_label: string | null;
  is_active: boolean;
}

async function getRestrictions(countryCode: string): Promise<PlannedRestriction[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return [];
  const sb = createClient(url, key);
  const { data } = await sb
    .from("planned_restrictions")
    .select("id, restriction_type, vehicle_type, valid_from, valid_to, road_number, location_text, description_cs, source_url, source_label, is_active")
    .eq("country_code", countryCode.toUpperCase())
    .order("valid_from", { ascending: true });
  return (data as PlannedRestriction[]) ?? [];
}

// ── Pomocné mapování pro UI ──────────────────────────────
const RESTRICTION_LABELS: Record<string, { label: string; color: string }> = {
  closure:      { label: "Uzavírka",          color: "bg-red-900/60 text-red-300 border-red-700" },
  ban:          { label: "Zákaz vjezdu",       color: "bg-orange-900/60 text-orange-300 border-orange-700" },
  weight_limit: { label: "Omez. hmotnosti",    color: "bg-yellow-900/60 text-yellow-300 border-yellow-700" },
  height_limit: { label: "Omez. výšky",        color: "bg-yellow-900/60 text-yellow-300 border-yellow-700" },
  width_limit:  { label: "Omez. šířky",        color: "bg-yellow-900/60 text-yellow-300 border-yellow-700" },
  speed_limit:  { label: "Omez. rychlosti",    color: "bg-yellow-900/60 text-yellow-300 border-yellow-700" },
  convoy:       { label: "Kolona",             color: "bg-blue-900/60 text-blue-300 border-blue-700" },
  detour:       { label: "Objížďka",           color: "bg-purple-900/60 text-purple-300 border-purple-700" },
  other:        { label: "Jiné",               color: "bg-slate-700 text-slate-300 border-slate-600" },
};

const RESTRICTION_BORDER: Record<string, string> = {
  closure:      "border-red-700",
  ban:          "border-orange-700",
  weight_limit: "border-yellow-700",
  height_limit: "border-yellow-700",
  width_limit:  "border-yellow-700",
  speed_limit:  "border-yellow-700",
  convoy:       "border-blue-700",
  detour:       "border-purple-700",
  other:        "border-slate-600",
};

const VEHICLE_LABELS: Record<string, string> = {
  HGV:     "Kamiony >3,5 t",
  HGV_7_5: "Kamiony >7,5 t",
  HGV_12:  "Kamiony >12 t",
  all:     "Všechna vozidla",
  other:   "Jiná vozidla",
};

const PORTAL_ICONS: Record<OfficialPortal["portal_type"], string> = {
  toll:         "💳",
  traffic_info: "🗺️",
  bans:         "🚫",
  regulations:  "📋",
  permits:      "📄",
  general:      "🏛️",
};

const PORTAL_TYPE_LABELS: Record<OfficialPortal["portal_type"], string> = {
  toll:         "Mýtné",
  traffic_info: "Doprava",
  bans:         "Zákazy",
  regulations:  "Předpisy",
  permits:      "Povolení",
  general:      "Obecný",
};

function formatDateRange(from: string | null, to: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleString("cs-CZ", {
      day: "numeric", month: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  if (from && to) return `${fmt(from)} – ${fmt(to)}`;
  if (from) return `od ${fmt(from)}`;
  if (to) return `do ${fmt(to)}`;
  return "Datum neupřesněno";
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const [reg, restrictions, portals] = await Promise.all([
    getRegulations(country.code),
    getRestrictions(country.code),
    getPortals(country.code),
  ]);

  // Pomocník: vrátí hodnotu z DB, nebo fallback ze statických dat
  const spd = (dbVal: number | null, staticVal: number) =>
    dbVal != null ? dbVal : staticVal;

  const speedMotorway = reg?.speed_motorway_kmh ?? null;
  const speedRoad     = reg?.speed_road_kmh     ?? null;
  const speedCity     = reg?.speed_city_kmh     ?? null;

  // Mýtné
  const hasToll    = reg?.toll_has_toll ?? null;
  const tollName   = reg?.toll_system_name ?? country.tollSystem ?? null;
  const tollNote   = reg?.toll_note ?? country.tollInfo ?? null;
  const tollPayUrl = reg?.toll_payment_url ?? null;

  // Alkohol
  const alcoholGl  = reg?.alcohol_general_gl ?? null;

  return (
    <>
      <SubNav active="/zeme" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-6xl">{country.flag}</span>
          <div>
            <div className="text-slate-400 text-sm mb-1">
              <Link href="/zeme" className="hover:text-amber-400">← Všechny státy</Link>
            </div>
            <h1 className="text-3xl font-bold text-white">{country.name}</h1>
            <p className="text-slate-400">{country.capital} · {country.currency}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Rozměry a hmotnost */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">⚖️ Povolené rozměry</h2>
            <div className="grid grid-cols-2 gap-3">
              <InfoField
                label="Max. hmotnost"
                value={reg?.max_weight_t ?? country.maxWeight}
                unit="t"
                sourceUrl={reg?.dimensions_source_url ?? undefined}
              />
              <InfoField
                label="Max. délka"
                value={reg?.max_length_m ?? country.maxLength}
                unit="m"
              />
              <InfoField
                label="Max. šířka"
                value={reg?.max_width_m ?? country.maxWidth}
                unit="m"
              />
              <InfoField
                label="Max. výška"
                value={reg?.max_height_m ?? country.maxHeight}
                unit="m"
              />
            </div>
            {(reg?.dimensions_note ?? null) && (
              <p className="text-xs text-slate-400 mt-3 border-t border-slate-700 pt-3">
                {reg!.dimensions_note}
              </p>
            )}
          </div>

          {/* Rychlosti */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">🚦 Max. rychlost pro kamiony</h2>
            <div className="grid grid-cols-3 gap-3">
              <InfoField
                label="Dálnice"
                value={speedMotorway ?? spd(null, country.speedHighway)}
                unit="km/h"
                state={reg ? (speedMotorway != null ? "verified" : "unknown") : "verified"}
                sourceUrl={reg?.speed_source_url ?? undefined}
              />
              <InfoField
                label="Silnice"
                value={speedRoad ?? spd(null, country.speedRoad)}
                unit="km/h"
                state={reg ? (speedRoad != null ? "verified" : "unknown") : "verified"}
              />
              <InfoField
                label="Město"
                value={speedCity ?? spd(null, country.speedCity)}
                unit="km/h"
                state={reg ? (speedCity != null ? "verified" : "unknown") : "verified"}
              />
            </div>
            {(reg?.speed_note ?? country.speedNote) && (
              <p className="text-xs text-slate-400 mt-3 border-t border-slate-700 pt-3">
                {reg?.speed_note ?? country.speedNote}
              </p>
            )}
          </div>

          {/* Alkohol */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">🍺 Povolená hladina alkoholu</h2>
            <div className="grid grid-cols-2 gap-3">
              {reg ? (
                <InfoField
                  label="Obecný limit"
                  value={alcoholGl != null ? `${alcoholGl}` : null}
                  unit="g/l"
                  state={alcoholGl != null ? "verified" : "unknown"}
                  sourceUrl={reg.alcohol_source_url ?? undefined}
                  note={reg.alcohol_note ?? undefined}
                />
              ) : country.alcoholGeneral ? (
                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Obecný limit</div>
                  <div className="text-amber-400 font-bold font-mono">{country.alcoholGeneral} ‰</div>
                  <div className="text-xs text-slate-500">g/l krve</div>
                </div>
              ) : null}
              {country.alcoholProfessional && (
                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Profesionální řidič</div>
                  <div className={`font-bold font-mono ${country.alcoholProfessional === "0,0" ? "text-red-400" : "text-amber-400"}`}>
                    {country.alcoholProfessional} ‰
                  </div>
                  <div className="text-xs text-slate-500">kamion / autobus</div>
                </div>
              )}
            </div>
          </div>

          {/* Zákazy jízd */}
          <div className="bg-slate-800 border border-red-900/50 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">🚫 Zákazy jízd</h2>
            {reg ? (
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Celostátní zákazy</div>
                  {reg.ban_has_national_bans === true && (
                    <div className="text-red-400 text-sm font-medium">Ano – celostátní zákazy platí</div>
                  )}
                  {reg.ban_has_national_bans === false && (
                    <div className="text-green-400 text-sm">Žádné celostátní zákazy jízd</div>
                  )}
                  {reg.ban_has_national_bans === null && (
                    <div className="text-slate-500 text-sm italic">Zatím neověřeno</div>
                  )}
                </div>
                {reg.ban_note && (
                  <p className="text-slate-300 text-sm border-t border-slate-700 pt-3">{reg.ban_note}</p>
                )}
                {reg.ban_source_url && (
                  <a
                    href={reg.ban_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-600 hover:text-amber-400"
                  >
                    zdroj ↗
                  </a>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Víkend</div>
                  <div className="text-slate-200 text-sm">{country.banWeekend}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Státní svátky</div>
                  <div className="text-slate-200 text-sm">{country.banHoliday}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Noční zákaz</div>
                  <div className="text-slate-200 text-sm">{country.banNight}</div>
                </div>
              </div>
            )}
          </div>

          {/* Mýtné */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">💳 Mýtné</h2>
            {reg ? (
              <div className="space-y-2">
                {hasToll === true && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-900/40 text-amber-300 mb-2">
                    ✓ Mýtné existuje
                  </div>
                )}
                {hasToll === false && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-slate-700 text-slate-300 mb-2">
                    ○ Žádné mýto pro kamiony
                  </div>
                )}
                {hasToll === null && (
                  <div className="text-slate-500 text-sm italic mb-2">Mýtný systém – zatím neověřeno</div>
                )}
                {tollName && hasToll !== false && (
                  <div className="text-amber-400 font-semibold text-sm">{tollName}</div>
                )}
                {tollNote && (
                  <p className="text-slate-300 text-sm">{tollNote}</p>
                )}
                {tollPayUrl && (
                  <a
                    href={tollPayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-1"
                  >
                    Platba mýtného ↗
                  </a>
                )}
              </div>
            ) : (
              <>
                <div className="text-amber-400 font-semibold mb-2">{country.tollSystem}</div>
                <p className="text-slate-300 text-sm">{country.tollInfo}</p>
              </>
            )}
          </div>

          {/* Zimní pneumatiky */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">❄️ Zimní pneumatiky</h2>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-3 ${country.winterTyresRequired ? "bg-blue-900 text-blue-300" : "bg-slate-700 text-slate-300"}`}>
              {country.winterTyresRequired ? "✓ Povinné" : "○ Doporučené"}
            </div>
            <p className="text-slate-300 text-sm">{country.winterTyresPeriod}</p>
          </div>

          {/* Povinná výbava */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">🧰 Povinná výbava</h2>
            {reg ? (
              reg.required_equipment && reg.required_equipment.length > 0 ? (
                <>
                  <ul className="space-y-1">
                    {reg.required_equipment.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="text-amber-400">›</span> {item}
                      </li>
                    ))}
                  </ul>
                  {reg.equipment_source_url && (
                    <a
                      href={reg.equipment_source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-600 hover:text-amber-400 mt-2 block"
                    >
                      zdroj ↗
                    </a>
                  )}
                </>
              ) : (
                <p className="text-slate-500 text-sm italic">Zatím neověřeno</p>
              )
            ) : (
              <ul className="space-y-1">
                {country.requiredEquipment.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-amber-400">›</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Lokální a regionální zákazy */}
        {country.localBans.length > 0 && (
          <div className="mt-6 bg-slate-800 border border-orange-900/50 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">⚠️ Lokální a regionální zákazy</h2>
            <div className="space-y-4">
              {country.localBans.map((ban) => (
                <div key={ban.title} className="border-l-2 border-orange-700 pl-4">
                  <div className="font-semibold text-white text-sm mb-1">{ban.title}</div>
                  {ban.routes && (
                    <div className="text-xs text-orange-400 mb-1">Trasy: {ban.routes}</div>
                  )}
                  {ban.period && (
                    <div className="text-xs text-slate-400 mb-1">Platnost: {ban.period}</div>
                  )}
                  <p className="text-slate-300 text-sm mb-2">{ban.description}</p>
                  <a
                    href={ban.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                  >
                    Zdroj: {ban.sourceLabel} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tísňová čísla */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">📞 Tísňová čísla</h2>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-red-900/40 border border-red-800 rounded-lg px-5 py-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Záchranná služba / Hasiči</div>
              <div className="text-2xl font-bold text-red-400 font-mono">{country.emergencyNumber}</div>
            </div>
            <div className="bg-slate-700 border border-slate-600 rounded-lg px-5 py-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Policie</div>
              <div className="text-2xl font-bold text-amber-400 font-mono">{country.policeNumber}</div>
            </div>
          </div>
        </div>

        {/* Poznámky */}
        {country.notes && (
          <div className="mt-6 bg-amber-900/20 border border-amber-800/50 rounded-xl p-5">
            <h2 className="font-bold text-white mb-2 flex items-center gap-2">ℹ️ Důležité poznámky</h2>
            <p className="text-slate-300 text-sm">{country.notes}</p>
          </div>
        )}

        {/* Plánované uzavírky a omezení */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">🚧 Plánované uzavírky a omezení</h2>
          {restrictions.length === 0 ? (
            <p className="text-slate-500 text-sm italic">
              Pro tuto zemi zatím nemáme žádné plánované uzavírky z oficiálních zdrojů.
            </p>
          ) : (
            <div className="space-y-4">
              {restrictions.map((r) => {
                const typeInfo = RESTRICTION_LABELS[r.restriction_type] ?? RESTRICTION_LABELS.other;
                const borderColor = RESTRICTION_BORDER[r.restriction_type] ?? "border-slate-600";
                return (
                  <div key={r.id} className={`border-l-2 pl-4 ${borderColor}`}>
                    {/* Štítky */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded border bg-slate-700 text-slate-300 border-slate-600">
                        {VEHICLE_LABELS[r.vehicle_type] ?? r.vehicle_type}
                      </span>
                      {r.is_active && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded border bg-green-900/50 text-green-400 border-green-700">
                          Aktivní
                        </span>
                      )}
                    </div>
                    {/* Silnice / úsek */}
                    {(r.road_number || r.location_text) && (
                      <div className="text-white text-sm font-semibold mb-0.5">
                        {[r.road_number, r.location_text].filter(Boolean).join(" · ")}
                      </div>
                    )}
                    {/* Datum */}
                    <div className="text-xs text-slate-400 mb-1">
                      {formatDateRange(r.valid_from, r.valid_to)}
                    </div>
                    {/* Popis */}
                    {r.description_cs && (
                      <p className="text-slate-300 text-sm mb-1">{r.description_cs}</p>
                    )}
                    {/* Zdroj */}
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      {r.source_label ? `Zdroj: ${r.source_label}` : "Zdroj"} ↗
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Oficiální portály */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">🌐 Oficiální portály</h2>
          {portals.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 gap-3">
                {portals.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-700 border border-slate-600 rounded-lg p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{PORTAL_ICONS[p.portal_type]}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-600 text-slate-300">
                        {PORTAL_TYPE_LABELS[p.portal_type]}
                      </span>
                    </div>
                    <div className="text-white text-sm font-medium leading-snug">{p.name}</div>
                    {p.notes && (
                      <div className="text-slate-400 text-xs">{p.notes}</div>
                    )}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 hover:underline"
                    >
                      Otevřít portál ↗
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Informace jsou orientační. Vždy ověřujte aktuální předpisy na oficiálních stránkách.
              </p>
            </>
          ) : (
            // Fallback: statické zdroje ze souboru countries.ts
            <>
              <div className="grid sm:grid-cols-2 gap-2">
                {country.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-amber-500 rounded-lg px-4 py-3 text-sm text-slate-300 hover:text-amber-400 transition-all"
                  >
                    <span>{s.label}</span>
                    <span className="text-slate-500 text-xs ml-2">↗</span>
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Informace jsou orientační. Vždy ověřujte aktuální předpisy na oficiálních stránkách.
              </p>
            </>
          )}
        </div>

      </div>
    </>
  );
}
