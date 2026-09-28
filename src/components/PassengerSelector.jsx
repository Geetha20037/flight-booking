import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";

const defaultPassengers = {
  adults: 1,
  children: 0,
  infants: 0,
};

export default function PassengerSelector({
  passengers,
  setPassengers,
  cabin,
  setCabin,
}) {
  const [open, setOpen] = useState(false);

  // Safety fallback so the component never crashes
  const safePassengers = {
    ...defaultPassengers,
    ...(passengers || {}),
  };

  const updatePassenger = (type, change) => {
    const minimum = type === "adults" ? 1 : 0;

    const currentValue = Number(safePassengers[type]) || 0;
    const newValue = Math.max(minimum, currentValue + change);

    setPassengers({
      ...safePassengers,
      [type]: newValue,
    });
  };

  const totalPassengers =
    safePassengers.adults +
    safePassengers.children +
    safePassengers.infants;

  const passengerLabel =
    totalPassengers === 1
      ? "1 Passenger"
      : `${totalPassengers} Passengers`;

  return (
    <div className="relative z-[70] w-full">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        Passengers & Class
      </label>

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex min-h-[60px] w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 text-left transition hover:border-sky-300 hover:bg-sky-50/30"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Users size={19} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">
              {passengerLabel}
            </p>

            <p className="truncate text-xs font-medium text-slate-400">
              {cabin || "Economy"}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-[100] mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
          >
            <div className="mb-4">
              <p className="text-sm font-black text-slate-800">
                Passengers
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Select the number of travellers
              </p>
            </div>

            <div className="space-y-3">
              <PassengerRow
                title="Adults"
                description="12+ years"
                value={safePassengers.adults}
                onDecrease={() => updatePassenger("adults", -1)}
                onIncrease={() => updatePassenger("adults", 1)}
                disableDecrease={safePassengers.adults <= 1}
              />

              <PassengerRow
                title="Children"
                description="2–11 years"
                value={safePassengers.children}
                onDecrease={() => updatePassenger("children", -1)}
                onIncrease={() => updatePassenger("children", 1)}
                disableDecrease={safePassengers.children <= 0}
              />

              <PassengerRow
                title="Infants"
                description="Under 2 years"
                value={safePassengers.infants}
                onDecrease={() => updatePassenger("infants", -1)}
                onIncrease={() => updatePassenger("infants", 1)}
                disableDecrease={safePassengers.infants <= 0}
              />
            </div>

            <div className="my-4 border-t border-slate-100" />

            <div>
              <p className="mb-3 text-sm font-black text-slate-800">
                Cabin Class
              </p>

              <div className="grid grid-cols-2 gap-2">
                {["Economy", "Premium Economy", "Business", "First Class"].map(
                  (className) => (
                    <button
                      key={className}
                      type="button"
                      onClick={() => setCabin(className)}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                        cabin === className
                          ? "border-sky-500 bg-sky-50 text-sky-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50"
                      }`}
                    >
                      {className}
                    </button>
                  ),
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-xl bg-sky-600 py-3 text-sm font-black text-white transition hover:bg-sky-700"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PassengerRow({
  title,
  description,
  value,
  onDecrease,
  onIncrease,
  disableDecrease,
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-400">{description}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          disabled={disableDecrease}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Decrease ${title}`}
        >
          <Minus size={15} />
        </button>

        <span className="w-6 text-center text-sm font-black text-slate-800">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white transition hover:bg-sky-700"
          aria-label={`Increase ${title}`}
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}