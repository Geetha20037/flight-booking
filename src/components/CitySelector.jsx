import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { airports } from "../data/airports";

export default function CitySelector({
  label,
  value,
  onChange,
  excludeCity,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredAirports = airports.filter((airport) => {
    const matchesQuery =
      airport.city.toLowerCase().includes(query.toLowerCase()) ||
      airport.code.toLowerCase().includes(query.toLowerCase());

    const isExcluded = airport.city === excludeCity;

    return matchesQuery && !isExcluded;
  });

  const selectedAirport = airports.find((airport) => airport.city === value);

  return (
    <div className="relative flex-1">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left transition hover:border-sky-300 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <MapPin size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-bold text-slate-900">
            {selectedAirport?.city || "Select city"}
          </div>
          <div className="truncate text-xs text-slate-400">
            {selectedAirport
              ? `${selectedAirport.code} · ${selectedAirport.airport}`
              : "Choose airport"}
          </div>
        </div>

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
          >
            <div className="relative mb-2">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search city or airport..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
                autoFocus
              />
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredAirports.map((airport) => (
                <button
                  type="button"
                  key={airport.code}
                  onClick={() => {
                    onChange(airport.city);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-sky-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-600">
                    {airport.code}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-800">
                      {airport.city}
                    </div>
                    <div className="truncate text-xs text-slate-400">
                      {airport.airport}
                    </div>
                  </div>

                  {airport.city === value && (
                    <Check size={18} className="text-sky-600" />
                  )}
                </button>
              ))}

              {filteredAirports.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-slate-400">
                  No airports found.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}