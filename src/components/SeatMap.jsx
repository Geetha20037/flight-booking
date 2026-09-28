import { motion } from "framer-motion";
import { Armchair, Check } from "lucide-react";

import { seats } from "../data/seats";

export default function SeatMap({
  selectedSeats = [],
  onSelect,
  requiredSeats = 1,
}) {
  const safeSelectedSeats = Array.isArray(selectedSeats)
    ? selectedSeats
    : [];

  const isSelected = (seat) =>
    safeSelectedSeats.some(
      (selectedSeat) => selectedSeat?.code === seat.code,
    );

  const selectionComplete =
    safeSelectedSeats.length === requiredSeats;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
            Select your seats
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            Choose seats for all passengers
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-400">
            Select {requiredSeats}{" "}
            {requiredSeats === 1 ? "seat" : "seats"} for{" "}
            {requiredSeats}{" "}
            {requiredSeats === 1 ? "passenger" : "passengers"}.
          </p>
        </div>

        {/* Selection Counter */}
        <div
          className={`shrink-0 rounded-2xl px-4 py-3 text-center ${
            selectionComplete
              ? "bg-emerald-50 text-emerald-700"
              : "bg-sky-50 text-sky-700"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider">
            Seats selected
          </p>

          <p className="mt-0.5 text-lg font-black">
            {safeSelectedSeats.length} / {requiredSeats}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-slate-50 ring-1 ring-slate-200" />
          Available
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-slate-900" />
          Selected
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-slate-300" />
          Occupied
        </span>
      </div>

      {/* Aircraft */}
      <div className="mx-auto max-w-md">
        {/* Front */}
        <div className="mb-6 rounded-[50%] rounded-b-3xl bg-slate-100 px-6 py-4 text-center">
          <div className="mx-auto flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <Armchair size={15} />
            Front of aircraft
          </div>
        </div>

        {/* Column Labels */}
        <div className="mb-4 grid grid-cols-[30px_repeat(6,1fr)] gap-2 text-center text-xs font-black text-slate-400">
          <div />

          {["A", "B", "C", "D", "E", "F"].map(
            (column) => (
              <div key={column}>{column}</div>
            ),
          )}
        </div>

        {/* Seats */}
        <div className="space-y-2">
          {seats.map((row) => (
            <div
              key={row[0]?.row}
              className="grid grid-cols-[30px_repeat(6,1fr)] gap-2"
            >
              {/* Row Number */}
              <div className="flex items-center justify-center text-xs font-bold text-slate-400">
                {row[0]?.row}
              </div>

              {/* Seats */}
              {row.map((seat) => {
                const selected = isSelected(seat);

                const canSelect =
                  !seat.occupied &&
                  (selected ||
                    safeSelectedSeats.length < requiredSeats);

                return (
                  <motion.button
                    key={seat.code}
                    type="button"
                    disabled={!canSelect}
                    whileHover={
                      canSelect
                        ? { scale: 1.08 }
                        : {}
                    }
                    whileTap={
                      canSelect
                        ? { scale: 0.92 }
                        : {}
                    }
                    onClick={() => onSelect?.(seat)}
                    className={`relative h-10 rounded-xl text-xs font-black transition sm:h-11 ${
                      selected
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-300"
                        : seat.occupied
                          ? "cursor-not-allowed bg-slate-300 text-slate-400"
                          : safeSelectedSeats.length >=
                                requiredSeats
                            ? "cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-300"
                            : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600"
                    } ${
                      seat.column === "D"
                        ? "ml-2"
                        : ""
                    }`}
                  >
                    {seat.code}

                    {selected && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats */}
      <div className="mt-7 border-t border-slate-100 pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Selected seats
            </p>

            {safeSelectedSeats.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {safeSelectedSeats.map((seat) => (
                  <span
                    key={seat.code}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-black text-white"
                  >
                    {seat.code}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm font-semibold text-slate-400">
                No seats selected yet.
              </p>
            )}
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Seat fees
            </p>

            <p className="mt-1 text-lg font-black text-slate-900">
              ₹
              {safeSelectedSeats
                .reduce(
                  (total, seat) =>
                    total +
                    (Number(seat?.price) || 0),
                  0,
                )
                .toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div
        className={`mt-5 rounded-2xl p-4 text-sm font-semibold ${
          selectionComplete
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {selectionComplete ? (
          <span className="flex items-center gap-2">
            <Check size={17} />
            All passenger seats have been selected.
          </span>
        ) : (
          <>
            Please select{" "}
            {requiredSeats -
              safeSelectedSeats.length}{" "}
            more{" "}
            {requiredSeats -
              safeSelectedSeats.length ===
            1
              ? "seat"
              : "seats"}{" "}
            to continue.
          </>
        )}
      </div>
    </div>
  );
}