import { tips } from "@/lib/data";
import SubNav from "@/components/SubNav";

const categories = [
  "Dokumenty",
  "Tachograf",
  "Mýtné",
  "Bezpečnost",
  "Kabotáž",
  "Ekologie",
  "Zimní provoz",
];

export default function RadyPage() {
  return (
    <>
    <SubNav active="/rady" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">💡 Rady & Tipy</h1>
        <p className="text-slate-400">
          Praktické informace pro každodenní práci kamioňáka — dokumenty, předpisy, bezpečnost a ekologie.
        </p>
      </div>

      {/* Categories quick-nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <span
            key={cat}
            className="bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-600"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
          >
            <div className="bg-slate-700/50 px-5 py-4 flex items-center gap-3">
              <span className="text-3xl">{tip.icon}</span>
              <div>
                <h2 className="font-bold text-white">{tip.title}</h2>
                <span className="text-xs text-amber-400 font-medium">{tip.category}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-slate-300 text-sm leading-relaxed">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency contacts section */}
      <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">📞 Tísňová čísla v Evropě</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { country: "🇪🇺 EU", number: "112", label: "Tísňové volání" },
            { country: "🇩🇪 Německo", number: "110 / 112", label: "Policie / Záchrana" },
            { country: "🇦🇹 Rakousko", number: "133 / 144", label: "Policie / Záchrana" },
            { country: "🇨🇭 Švýcarsko", number: "117 / 118", label: "Policie / Hasiči" },
            { country: "🇫🇷 Francie", number: "17 / 15", label: "Policie / SAMU" },
            { country: "🇮🇹 Itálie", number: "113 / 118", label: "Policie / Záchrana" },
            { country: "🇵🇱 Polsko", number: "997 / 999", label: "Policie / Záchrana" },
            { country: "🇸🇰 Slovensko", number: "158 / 155", label: "Policie / Záchrana" },
          ].map((e) => (
            <div key={e.country} className="bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-sm font-medium text-white mb-1">{e.country}</div>
              <div className="text-amber-400 font-bold text-lg">{e.number}</div>
              <div className="text-slate-400 text-xs">{e.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Useful apps */}
      <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">📱 Doporučené aplikace</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {[
            { name: "TruckPark Europe", desc: "Parkoviště pro kamiony, recenze" },
            { name: "iOverlander / Park4Night", desc: "Bezpečná místa pro parkování a odpočinek" },
            { name: "Waze / Google Maps (Truck)", desc: "Navigace s výškovými/váhovými omezeními" },
            { name: "Sygic Truck GPS", desc: "Profesionální navigace pro nákladní vozy" },
            { name: "Transics / TomTom Webfleet", desc: "Telematika, monitoring, podpora dispečera" },
            { name: "DKV / UTA Card", desc: "Mýtné a pohonné hmoty po celé Evropě" },
          ].map((app) => (
            <div key={app.name} className="bg-slate-700 rounded-lg p-3">
              <div className="font-medium text-white">📱 {app.name}</div>
              <div className="text-slate-400 text-xs mt-0.5">{app.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
