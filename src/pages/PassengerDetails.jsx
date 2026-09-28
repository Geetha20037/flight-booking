import { motion } from "framer-motion";
import { ArrowLeft, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import PassengerForm from "../components/PassengerForm";
import ProgressSteps from "../components/ProgressSteps";

import { useBooking } from "../context/BookingContext";

export default function PassengerDetails() {
  const navigate = useNavigate();

  const {
    selectedFlight,
    search,
  } = useBooking();

  if (!selectedFlight) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
          <Plane size={26} />
        </div>

        <h1 className="mt-5 text-2xl font-black text-slate-900">
          Select a flight first
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Choose a flight before entering passenger details.
        </p>

        <Link
          to="/results"
          className="mt-6 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white"
        >
          Browse flights
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    navigate("/seat-selection");
  };

  return (
    <div className="bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ProgressSteps activeStep={1} />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Selected flight
            </p>

            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">
                {selectedFlight.airlineCode}
              </div>

              <div>
                <p className="font-black text-slate-900">
                  {selectedFlight.airline} · {selectedFlight.flightNumber}
                </p>

                <p className="text-sm text-slate-500">
                  {search.from} → {search.to} · {selectedFlight.departure}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/results")}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sky-600"
          >
            <ArrowLeft size={16} />
            Change flight
          </button>
        </motion.div>

        <PassengerForm onComplete={handleComplete} />
      </div>
    </div>
  );
}