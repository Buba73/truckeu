import Link from "next/link";
import { drivingBans, roadAlerts } from "@/lib/data";
import { SeverityBadge, TypeBadge } from "@/components/AlertBadge";

export default function HomePage() {
  const highAlerts = roadAlerts.filter((a) => a.severity === "high");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          🚛 <span className="text-amber-400">TruckEU</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Kompletní informace pro kamionovou dopravu v Evropě — zákazy jízd,
          silniční uzavírky, omezení a profesionální rady.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Sledovaných zemí", value: drivingBans.length, icon: "🗺️" },
          { label: "Aktivních upozornění", value: roadAlerts.length, icon: "⚠️" },
          { label: "Kritických alertů", value: highAlerts.length, icon: "🚨" },
          { label: "Rad & tipů", value: "8+", icon: "💡" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-800 rounded-xl p-5 text-center border border-slate-700"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Urgent alerts */}
      {highAlerts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🚨 Kritická upozornění
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {highAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-red-950 border border-red-800 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{alert.flag}</span>
                    <span className="font-semibold text-white">{alert.title}</span>
                  </div>
                  <TypeBadge type={alert.type} />
                </div>
                <p className="text-slate-300 text-sm mb-3">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>📍 {alert.route}</span>
                  <span>Platí do: {alert.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation cards */}
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            href: "/zakazy",
            icon: "🚫",
            title: "Zákazy jízd",
            desc: "Přehled zákazů jízdy o víkendech a svátcích pro všechny země EU",
            color: "from-red-900 to-red-950 border-red-800",
          },
          {
            href: "/upozorneni",
            icon: "⚠️",
            title: "Uzavírky & Omezení",
            desc: "Aktuální silniční uzavírky, tonážní omezení a výstrahy",
            color: "from-amber-900 to-amber-950 border-amber-800",
          },
          {
            href: "/rady",
            icon: "💡",
            title: "Rady & Tipy",
            desc: "Dokumenty, tachograf, mýtné, zimní provoz a bezpečnost",
            color: "from-blue-900 to-blue-950 border-blue-800",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`bg-gradient-to-br ${card.color} border rounded-xl p-6 hover:scale-105 transition-transform`}
          >
            <div className="text-4xl mb-3">{card.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
            <p className="text-slate-300 text-sm">{card.desc}</p>
          </Link>
        ))}
      </div>

      {/* Country overview */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          🗺️ Přehled zemí — víkendové zákazy
        </h2>
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700 text-slate-300">
                  <th className="text-left p-4">Země</th>
                  <th className="text-left p-4">Víkend</th>
                  <th className="text-left p-4 hidden md:table-cell">Svátky</th>
                  <th className="text-left p-4 hidden lg:table-cell">Platí od</th>
                </tr>
              </thead>
              <tbody>
                {drivingBans.map((ban, i) => (
                  <tr
                    key={ban.country}
                    className={`border-t border-slate-700 ${i % 2 === 0 ? "" : "bg-slate-800/50"}`}
                  >
                    <td className="p-4 font-medium text-white">
                      {ban.flag} {ban.country}
                    </td>
                    <td className="p-4 text-slate-300">{ban.weekend}</td>
                    <td className="p-4 text-slate-300 hidden md:table-cell">{ban.holiday}</td>
                    <td className="p-4 text-amber-400 hidden lg:table-cell">{ban.maxWeight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-slate-400 text-sm mt-2">
          * Zobrazena maximální hmotnost vozidla, od které se zákaz vztahuje.{" "}
          <Link href="/zakazy" className="text-amber-400 hover:underline">
            Zobrazit detaily →
          </Link>
        </p>
      </div>
    </div>
  );
}
