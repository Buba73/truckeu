/**
 * Tři stavy zobrazení informace:
 *   verified  – máme ověřenou hodnotu z oficiálního zdroje
 *   unknown   – v DB je NULL (zatím neověřeno)
 *   community – komunitní tip (zatím jen vizuální placeholder, data neimplementována)
 */
export type InfoState = "verified" | "unknown" | "community";

interface InfoFieldProps {
  label: string;
  value?: string | number | null;
  unit?: string;
  state?: InfoState;
  sourceUrl?: string;
  note?: string;
}

export default function InfoField({ label, value, unit, state, sourceUrl, note }: InfoFieldProps) {
  const resolved: InfoState = state ?? (value != null ? "verified" : "unknown");

  return (
    <div className="bg-slate-700 rounded-lg p-3">
      <div className="text-xs text-slate-400 mb-1">{label}</div>

      {resolved === "verified" && (
        <div className="flex items-baseline gap-1">
          <span className="text-amber-400 font-bold font-mono">{value}</span>
          {unit && <span className="text-xs text-slate-500">{unit}</span>}
        </div>
      )}

      {resolved === "unknown" && (
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 text-sm italic">Zatím neověřeno</span>
          <span
            title="Pracujeme na doplnění dat z oficiálního zdroje."
            className="text-slate-600 cursor-help text-xs"
          >
            ?
          </span>
        </div>
      )}

      {resolved === "community" && (
        <div className="flex items-center gap-1.5">
          <span className="text-blue-400 text-sm">{value}</span>
          <span className="bg-blue-900/50 text-blue-400 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
            komunita
          </span>
        </div>
      )}

      {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}

      {sourceUrl && resolved === "verified" && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-slate-600 hover:text-amber-400 mt-1 block"
        >
          zdroj ↗
        </a>
      )}
    </div>
  );
}
