import { countries } from "@/lib/countries";
import SubNav from "@/components/SubNav";
import Link from "next/link";

export default function ZemePage() {
  return (
    <>
      <SubNav active="/zeme" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🌍 Státy EU & okolí</h1>
          <p className="text-slate-400">
            Předpisy pro kamionovou dopravu v každé zemi — mýtné, rychlosti, zákazy jízd, povinná výbava.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/zeme/${c.slug}`}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center hover:border-amber-500 hover:bg-slate-700 transition-all group"
            >
              <div className="text-4xl mb-2">{c.flag}</div>
              <div className="font-semibold text-white text-sm group-hover:text-amber-400">{c.name}</div>
              <div className="text-xs text-slate-500 mt-1">Max {c.maxWeight} t · {c.tollSystem.split(" ")[0]}</div>
            </Link>
          ))}
        </div>

        {/* Rychlé srovnání */}
        <h2 className="text-xl font-bold text-white mb-4">📊 Rychlé srovnání</h2>
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700 text-slate-300 text-xs uppercase tracking-wide">
                  <th className="text-left p-3">Země</th>
                  <th className="text-center p-3">Max t</th>
                  <th className="text-center p-3">Dálnice km/h</th>
                  <th className="text-left p-3">Mýtný systém</th>
                  <th className="text-left p-3 hidden md:table-cell">Zimní pneu</th>
                  <th className="text-center p-3">Tísňové</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c, i) => (
                  <tr key={c.code} className={`border-t border-slate-700 hover:bg-slate-700/50 ${i % 2 === 0 ? "" : "bg-slate-800/30"}`}>
                    <td className="p-3">
                      <Link href={`/zeme/${c.slug}`} className="flex items-center gap-2 hover:text-amber-400">
                        <span className="text-lg">{c.flag}</span>
                        <span className="font-medium text-white">{c.name}</span>
                      </Link>
                    </td>
                    <td className="p-3 text-center text-amber-400 font-mono">{c.maxWeight}</td>
                    <td className="p-3 text-center text-slate-300 font-mono">{c.speedHighway}</td>
                    <td className="p-3 text-slate-300 text-xs">{c.tollSystem.split("(")[0].trim()}</td>
                    <td className="p-3 hidden md:table-cell">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.winterTyresRequired ? "bg-blue-900 text-blue-300" : "bg-slate-700 text-slate-400"}`}>
                        {c.winterTyresRequired ? "Povinné" : "Doporučené"}
                      </span>
                    </td>
                    <td className="p-3 text-center text-amber-400 font-mono text-xs">{c.emergencyNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
