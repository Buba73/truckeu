import { countries, getCountryBySlug } from "@/lib/countries";
import SubNav from "@/components/SubNav";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

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
              {[
                { label: "Max. hmotnost", value: `${country.maxWeight} t` },
                { label: "Max. délka", value: `${country.maxLength} m` },
                { label: "Max. šířka", value: `${country.maxWidth} m` },
                { label: "Max. výška", value: `${country.maxHeight} m` },
              ].map((item) => (
                <div key={item.label} className="bg-slate-700 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="text-amber-400 font-bold font-mono">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rychlosti */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">🚦 Max. rychlost pro kamiony</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Dálnice", value: `${country.speedHighway}`, unit: "km/h" },
                { label: "Silnice", value: `${country.speedRoad}`, unit: "km/h" },
                { label: "Město", value: `${country.speedCity}`, unit: "km/h" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-700 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">{item.label}</div>
                  <div className="text-amber-400 font-bold text-xl font-mono">{item.value}</div>
                  <div className="text-xs text-slate-500">{item.unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zákazy jízd */}
          <div className="bg-slate-800 border border-red-900/50 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">🚫 Zákazy jízd</h2>
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
          </div>

          {/* Mýtné */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">💳 Mýtné</h2>
            <div className="text-amber-400 font-semibold mb-2">{country.tollSystem}</div>
            <p className="text-slate-300 text-sm">{country.tollInfo}</p>
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
            <ul className="space-y-1">
              {country.requiredEquipment.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-amber-400">›</span> {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lokální a regionální zákazy */}
        {country.localBans.length > 0 && (
          <div className="md:col-span-2 bg-slate-800 border border-orange-900/50 rounded-xl p-5">
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

        {/* Zdroje */}
        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">🔗 Oficiální zdroje</h2>
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
        </div>

      </div>
    </>
  );
}
