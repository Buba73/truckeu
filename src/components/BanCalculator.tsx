"use client";

import { useState, useMemo } from "react";
import { drivingBans, isBanActive } from "@/lib/data";

function toLocalISOString(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const DAY_NAMES_CS = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];

export default function BanCalculator() {
  const [datetime, setDatetime] = useState(() => toLocalISOString(new Date()));
  const [filter, setFilter] = useState<"all" | "active" | "free">("all");

  const selectedDate = useMemo(() => new Date(datetime), [datetime]);

  const results = useMemo(
    () =>
      drivingBans.map((ban) => ({
        ban,
        active: isBanActive(ban, selectedDate),
      })),
    [selectedDate]
  );

  const activeCount = results.filter((r) => r.active).length;
  const dayName = DAY_NAMES_CS[selectedDate.getDay()];

  const displayed = results.filter((r) =>
    filter === "all" ? true : filter === "active" ? r.active : !r.active
  );

  return (
    <div>
      {/* Controls */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">
              Datum a čas jízdy
            </label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "free"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {f === "all" ? "Vše" : f === "active" ? "Aktivní zákazy" : "Volno"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-5 pt-5 border-t border-slate-700 flex flex-wrap gap-4 items-center">
          <div className="text-slate-300 text-sm">
            Vybraný čas:{" "}
            <span className="text-white font-semibold">
              {selectedDate.toLocaleString("cs-CZ", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              {activeCount} {activeCount === 1 ? "zákaz aktivní" : activeCount < 5 ? "zákazy aktivní" : "zákazů aktivních"}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-900/20 border border-emerald-700/40 text-emerald-400 text-xs px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {drivingBans.length - activeCount} zemí volno
            </span>
          </div>
        </div>
      </div>

      {/* Info banner for weekend */}
      {(selectedDate.getDay() === 0 || selectedDate.getDay() === 6) && (
        <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-4 mb-6 text-amber-200 text-sm">
          📅 Vybraný den je <strong>{dayName}</strong> — víkendové zákazy mohou být aktivní.
          Zkontrolujte časy platnosti pro každou zemi.
        </div>
      )}

      {/* Results grid */}
      {displayed.length === 0 ? (
        <div className="text-center text-slate-400 py-12">Žádné výsledky pro zvolený filtr.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map(({ ban, active }) => (
            <div
              key={ban.countryCode}
              className={`bg-slate-800 border rounded-xl p-4 ${
                active ? "border-red-600/60" : "border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ban.flag}</span>
                  <div>
                    <div className="font-semibold text-white text-sm">{ban.country}</div>
                    <div className="text-xs text-slate-500">nad {ban.maxWeight}</div>
                  </div>
                </div>
                {active ? (
                  <span className="shrink-0 inline-flex items-center gap-1 bg-red-600/20 border border-red-600/50 text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    ZÁKAZ
                  </span>
                ) : (
                  <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-900/20 border border-emerald-700/50 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    VOLNO
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">{ban.weekend}</div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500 mt-8 text-center">
        Časy jsou vyhodnoceny v místním čase každé země. Informace jsou orientační — vždy ověřte aktuální předpisy.
      </p>
    </div>
  );
}
