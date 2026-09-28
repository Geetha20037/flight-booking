import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Armchair,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProgressSteps from "../components/ProgressSteps";
import SeatMap from "../components/SeatMap";

import { useBooking } from "../context/BookingContext";

export default function SeatSelection() {
  const navigate = useNavigate();

  const {
    selectedFlight,
    selectedSeats,
    toggleSeat,
    totalPassengers,
  } = useBooking();

  useEffect(() => {
    if (!selectedFlight) {
      navigate("/results", {
        replace: true,
      });
    }
  }, [selectedFlight, navigate]);

  if (!selectedFlight) {
    return null;
  }

  const safeSelectedSeats = Array.isArray(
    selectedSeats,
  )
    ? selectedSeats
    : [];

  const requiredSeats =
    Number(totalPassengers) > 0
      ? Number(totalPassengers)
      : 1;

  const seatsComplete =
    safeSelectedSeats.length === requiredSeats;

  const totalSeatFee =
    safeSelectedSeats.reduce(
      (total, seat) =>
        total + (Number(seat?.price) || 0),
      0,
    );

  const handleSelect = (seat) => {
    if (!seat) {
      return;
    }

    toggleSeat(seat);
  };

  const handleContinue = () => {
    if (!seatsComplete) {
      return;
    }

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Progress */}
        <ProgressSteps activeStep={2} />

        {/* Selected Flight */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mb-6 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Armchair size={20} />
          </div>

          <div className="min-w-0">
            <p className="truncate font-black text-slate-900">
              {selectedFlight.airline ||
                "Airline"}{" "}
              ·{" "}
              {selectedFlight.flightNumber ||
                "Flight"}
            </p>

            <p className="text-sm text-slate-500">
              {selectedFlight.fromCode ||
                "---"}{" "}
              →{" "}
              {selectedFlight.toCode ||
                "---"}
            </p>
          </div>
        </motion.div>

        {/* Seat Map */}
        <SeatMap
          selectedSeats={safeSelectedSeats}
          onSelect={handleSelect}
          requiredSeats={requiredSeats}
        />

        {/* Bottom Information */}
        <motion.div
          layout
          className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Selected Seats */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Selected seats
              </p>

              {safeSelectedSeats.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {safeSelectedSeats.map(
                    (seat) => (
                      <span
                        key={seat.code}
                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-black text-white"
                      >
                        {seat.code}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-1 text-sm font-semibold text-slate-400">
                  Please select seats for all{" "}
                  {requiredSeats} passengers.
                </p>
              )}
            </div>

            {/* Seat Fee */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total seat fees
              </p>

              <p className="mt-1 text-xl font-black text-slate-900">
                ₹
                {totalSeatFee.toLocaleString(
                  "en-IN",
                )}
              </p>
            </div>

            {/* Information */}
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <Info
                size={17}
                className="mt-0.5 shrink-0 text-sky-600"
              />

              <p className="max-w-sm text-xs leading-5 text-slate-500">
                Select one available seat for each
                passenger. Selected seats are shown in
                dark color.
              </p>
            </div>
          </div>

          {/* Continue */}
          <motion.button
            type="button"
            disabled={!seatsComplete}
            whileHover={
              seatsComplete
                ? { y: -1 }
                : {}
            }
            whileTap={
              seatsComplete
                ? { scale: 0.98 }
                : {}
            }
            onClick={handleContinue}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {seatsComplete
              ? "Continue to payment"
              : `Select ${
                  requiredSeats -
                  safeSelectedSeats.length
                } more ${
                  requiredSeats -
                    safeSelectedSeats.length ===
                  1
                    ? "seat"
                    : "seats"
                }`}

            <ArrowRight size={17} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}