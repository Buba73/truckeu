import { drivingBans, isBanActive } from "@/lib/data";
import SubNav from "@/components/SubNav";

export const revalidate = 3600;

export default function ZakazyPage() {
  const now = new Date();

  return (
    <>
      <SubNav active="/zakazy" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🚫 Zákazy jízd v EU</h1>
          <p className="text-slate-400">
            Přehled zákazů jízdy pro nákladní vozidla o víkendech a státních svátcích.
            Platí obvykle pro vozidla nad 7,5 t nebo soupravy nad 3,5 t.
          </p>
        </div>

        <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-4 mb-8 text-amber-200 text-sm">
          ⚠️ Informace jsou orientační a pravidelně aktualizované. Před jízdou vždy ověřte
          aktuální platnost u příslušných dopravních úřadů nebo svého dopravce.
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {drivingBans.map((ban) => {
            const active = isBanActive(ban, now);
            return (
              <div
                key={ban.country}
                className={`bg-slate-800 border rounded-xl overflow-hidden ${active ? "border-red-600/70" : "border-slate-700"}`}
              >
                <div className="bg-slate-700 px-5 py-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{ban.flag}</span>
                    <div>
                      <h2 className="text-lg font-bold text-white">{ban.country}</h2>
                      <span className="text-slate-400 text-xs">Max. hmotnost: {ban.maxWeight}</span>
                    </div>
                  </div>
                  {active ? (
                    <span className="shrink-0 inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/60 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      AKTIVNÍ
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1.5 bg-slate-700 border border-slate-600 text-slate-400 text-xs px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      Volno
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Víkend</div>
                    <div className="text-slate-200 text-sm">{ban.weekend}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Státní svátky</div>
                    <div className="text-slate-200 text-sm">{ban.holiday}</div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <div className="text-xs text-slate-400">{ban.notes}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">📌 Obecné zásady zákazů jízd v EU</h2>
          <ul className="space-y-2 text-slate-300 text-sm list-none">
            {[
              "Zákazy se vztahují typicky na vozidla nad 7,5 t celkové hmotnosti nebo soupravy přesahující 3,5 t.",
              "Výjimky existují pro přepravu rychle se kazícího zboží (živá zvířata, čerstvé potraviny, tiskoviny).",
              "Kombinovaná (multimodální) přeprava je v mnoha zemích z zákazu vyjmuta.",
              "Prázdná vozidla jedoucí pro nakládku mají v některých zemích výjimku.",
              "Kontrola probíhá především policií a celnými úřady na dálnicích a silnicích I. třídy.",
              "Za porušení zákazu hrozí pokuty řádově ve stovkách až tisících EUR.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-400 shrink-0">›</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
