import { roadAlerts } from "@/lib/data";
import { SeverityBadge, TypeBadge } from "@/components/AlertBadge";

export default function UpozorneniPage() {
  const sorted = [...roadAlerts].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">⚠️ Uzavírky & Omezení</h1>
        <p className="text-slate-400">
          Aktuální silniční uzavírky, tonážní omezení, rychlostní restrikce a dopravní upozornění
          pro kamionovou dopravu v Evropě.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-slate-300">Vysoká priorita</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">Střední priorita</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-slate-300">Nízká priorita</span>
        </div>
      </div>

      <div className="grid gap-4">
        {sorted.map((alert) => {
          const borderColor =
            alert.severity === "high"
              ? "border-red-700"
              : alert.severity === "medium"
              ? "border-amber-700"
              : "border-blue-700";

          return (
            <div
              key={alert.id}
              className={`bg-slate-800 border ${borderColor} rounded-xl p-5`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{alert.flag}</span>
                  <div>
                    <h3 className="font-bold text-white">{alert.title}</h3>
                    <span className="text-slate-400 text-sm">{alert.country}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <TypeBadge type={alert.type} />
                  <SeverityBadge severity={alert.severity} />
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4">{alert.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span>📍 Trasa: <span className="text-slate-200">{alert.route}</span></span>
                <span>📅 Platí do: <span className="text-slate-200">{alert.validUntil}</span></span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">🔗 Užitečné zdroje</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { name: "TomTom Traffic", desc: "Navigace a dopravní info v reálném čase" },
            { name: "Viamichelin", desc: "Plánování tras pro nákladní vozidla" },
            { name: "INEA / TEN-T", desc: "Evropská dopravní síť a projekty" },
            { name: "IRU — International Road Transport Union", desc: "Předpisy a novinky EU transportu" },
            { name: "Bundesamt für Güterverkehr (DE)", desc: "Německý kontrolní úřad nákladní dopravy" },
            { name: "ASFINAG (AT)", desc: "Rakouské dálnice a tunely — uzavírky" },
          ].map((r) => (
            <div key={r.name} className="bg-slate-700 rounded-lg p-3">
              <div className="font-medium text-white">{r.name}</div>
              <div className="text-slate-400 text-xs mt-0.5">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
