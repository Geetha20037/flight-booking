import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  Download,
  Mail,
  Plane,
  UserRound,
} from "lucide-react";

import { useBooking } from "../context/BookingContext";

export default function BookingConfirmation() {
  const {
    bookingId,
    selectedFlight,
    selectedSeat,
    passengerDetails,
    search,
    totalPassengers,
  } = useBooking();

  if (!selectedFlight) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-xl font-black text-slate-900">
          Booking information is unavailable.
        </h2>
      </div>
    );
  }

  const formattedDate = search.date
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(`${search.date}T00:00:00`))
    : "Travel date";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-12 text-center text-white">
        <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-white/10" />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
          }}
          className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-600 shadow-xl"
        >
          <Check size={38} strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">
            Booking confirmed
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            You're all set!
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-50">
            Your flight has been booked successfully. We’ve created your
            itinerary and booking reference.
          </p>
        </motion.div>
      </div>

      <div className="p-5 sm:p-8">
        <div className="flex flex-col justify-between gap-3 border-b border-dashed border-slate-200 pb-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Booking reference
            </p>

            <p className="mt-1 text-2xl font-black tracking-wider text-slate-900">
              {bookingId || "SKYBOOK"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <Download size={16} />
            Save ticket
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-black">
              {selectedFlight.airlineCode}
            </div>

            <div>
              <p className="font-black">
                {selectedFlight.airline}
              </p>
              <p className="text-xs text-slate-400">
                {selectedFlight.flightNumber}
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-black">
                {selectedFlight.departure}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-400">
                {search.from} · {selectedFlight.fromCode}
              </p>
            </div>

            <div className="flex flex-1 items-center gap-2 px-3">
              <div className="h-px flex-1 bg-slate-700" />
              <Plane
                size={17}
                className="rotate-90 text-sky-400"
              />
              <div className="h-px flex-1 bg-slate-700" />
            </div>

            <div className="text-right">
              <p className="text-3xl font-black">
                {selectedFlight.arrival}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-400">
                {search.to} · {selectedFlight.toCode}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <CalendarDays size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Travel date
              </span>
            </div>

            <p className="mt-2 font-black text-slate-900">
              {formattedDate}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <UserRound size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Passenger
              </span>
            </div>

            <p className="mt-2 font-black text-slate-900">
              {passengerDetails?.fullName || "Lead passenger"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Plane size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Seat
              </span>
            </div>

            <p className="mt-2 font-black text-slate-900">
              {selectedSeat?.code || "Assigned"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Travellers
              </span>
            </div>

            <p className="mt-2 font-black text-slate-900">
              {totalPassengers}{" "}
              {totalPassengers === 1 ? "passenger" : "passengers"}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-sky-700">
          A confirmation email would be sent to{" "}
          <strong>{passengerDetails?.email || "your registered email"}</strong>{" "}
          in a real booking system.
        </div>
      </div>
    </div>
  );
}