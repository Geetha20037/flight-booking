import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Coffee,
  Luggage,
  Plane,
  Star,
} from "lucide-react";

export default function FlightCard({
  flight,
  onDetails,
  onSelect,
}) {
  if (!flight || typeof flight !== "object") {
    return null;
  }

  const {
    airlineCode = "FL",
    airline = "Airline",
    flightNumber = "Flight",
    departure = "--:--",
    arrival = "--:--",
    fromCode = "---",
    toCode = "---",
    duration = "—",
    price = 0,
    stops = "Non-stop",
    baggage = "15 kg",
    cabinBaggage = "7 kg",
    meal = "Available",
    rating = "4.0",
    aircraft = "Aircraft",
  } = flight;

  const safePrice = Number(price) || 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-slate-200/70"
    >
      <div className="p-5 sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

          {/* Airline */}
          <div className="flex items-center gap-3 lg:w-44">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white">
              {airlineCode}
            </div>

            <div className="min-w-0">
              <p className="truncate font-black text-slate-900">
                {airline}
              </p>

              <p className="text-xs font-medium text-slate-400">
                {flightNumber}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4">

            <div className="shrink-0">
              <p className="text-2xl font-black tracking-tight text-slate-900">
                {departure}
              </p>

              <p className="mt-1 text-sm font-bold text-slate-500">
                {fromCode}
              </p>
            </div>

            <div className="min-w-16 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-slate-200" />

                <Plane
                  size={17}
                  className="shrink-0 rotate-90 text-sky-500"
                />

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-2 text-center text-xs font-semibold text-slate-400">
                {duration}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-2xl font-black tracking-tight text-slate-900">
                {arrival}
              </p>

              <p className="mt-1 text-sm font-bold text-slate-500">
                {toCode}
              </p>
            </div>

          </div>

          {/* Price */}
          <div className="border-t border-slate-100 pt-4 lg:w-44 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="flex items-center justify-between lg:block">

              <p className="text-xs font-semibold text-slate-400">
                Starting from
              </p>

              <p className="mt-1 text-2xl font-black text-slate-900">
                ₹{safePrice.toLocaleString("en-IN")}
              </p>

            </div>

            <p className="mt-1 text-xs font-semibold text-slate-400 lg:text-right">
              per passenger
            </p>
          </div>

        </div>

        {/* Flight information */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">

          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            {stops}
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <Luggage size={13} />
            {baggage}
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <BriefcaseBusiness size={13} />
            {cabinBaggage}
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <Coffee size={13} />
            {meal}
          </span>

          <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
            <Star size={13} fill="currentColor" />
            {rating}
          </span>

        </div>

        {/* Buttons */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={() => onDetails?.(flight)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
          >
            View details
          </button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect?.(flight)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-black text-white transition hover:bg-sky-700"
          >
            Select flight
            <ArrowRight size={16} />
          </motion.button>

        </div>

      </div>

      {/* Aircraft */}
      <div className="flex items-center gap-2 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-400 sm:px-6">
        <Clock3 size={13} />
        Aircraft: {aircraft}
      </div>

    </motion.article>
  );
}