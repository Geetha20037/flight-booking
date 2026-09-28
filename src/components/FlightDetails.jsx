import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Coffee,
  Luggage,
  Plane,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

export default function FlightDetails({
  flight,
  onClose,
  onSelect,
}) {
  const [openSection, setOpenSection] = useState("fare");

  if (!flight) return null;

  const sections = [
    {
      id: "fare",
      title: "Fare benefits",
      content: (
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500" />
            Free web check-in
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500" />
            {flight.baggage} checked baggage
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500" />
            {flight.cabinBaggage} cabin baggage
          </div>
        </div>
      ),
    },
    {
      id: "aircraft",
      title: "Aircraft information",
      content: (
        <div className="text-sm text-slate-500">
          This flight is operated using a{" "}
          <strong className="text-slate-800">
            {flight.aircraft}
          </strong>{" "}
          aircraft.
        </div>
      ),
    },
    {
      id: "services",
      title: "On-board services",
      content: (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 font-semibold text-slate-600">
            <Coffee size={15} />
            {flight.meal}
          </span>
          <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 font-semibold text-slate-600">
            <Luggage size={15} />
            {flight.baggage}
          </span>
        </div>
      ),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 backdrop-blur-sm sm:items-center sm:p-6"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 25 }}
          className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Flight details
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-900">
                {flight.airline} · {flight.flightNumber}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 sm:p-7">
            <div className="rounded-3xl bg-slate-950 p-5 text-white sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black">
                    {flight.departure}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-400">
                    {flight.from} · {flight.fromCode}
                  </p>
                </div>

                <div className="flex flex-1 items-center gap-2 px-5">
                  <div className="h-px flex-1 bg-slate-700" />
                  <Plane
                    size={18}
                    className="rotate-90 text-sky-400"
                  />
                  <div className="h-px flex-1 bg-slate-700" />
                </div>

                <div className="text-right">
                  <p className="text-3xl font-black">
                    {flight.arrival}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-400">
                    {flight.to} · {flight.toCode}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4 text-center">
                <div>
                  <Clock3 className="mx-auto mb-1 text-sky-400" size={17} />
                  <p className="text-xs text-slate-400">Duration</p>
                  <p className="font-bold">{flight.duration}</p>
                </div>

                <div>
                  <ShieldCheck className="mx-auto mb-1 text-emerald-400" size={17} />
                  <p className="text-xs text-slate-400">Stops</p>
                  <p className="font-bold">{flight.stops}</p>
                </div>

                <div>
                  <Luggage className="mx-auto mb-1 text-violet-400" size={17} />
                  <p className="text-xs text-slate-400">Baggage</p>
                  <p className="font-bold">{flight.baggage}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-200">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSection(
                        openSection === section.id ? null : section.id,
                      )
                    }
                    className="flex w-full items-center justify-between px-4 py-4 text-left font-bold text-slate-800"
                  >
                    {section.title}
                    <span className="text-sky-600">
                      {openSection === section.id ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openSection === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden px-4 pb-4"
                      >
                        {section.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Total fare from
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ₹{flight.price.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelect(flight)}
                className="rounded-2xl bg-sky-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
              >
                Select this flight
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}