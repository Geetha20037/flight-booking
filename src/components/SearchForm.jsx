import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowRightLeft,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../context/BookingContext";
import CitySelector from "./CitySelector";
import DatePicker from "./DatePicker";
import PassengerSelector from "./PassengerSelector";

const DEFAULT_PASSENGERS = {
  adults: 1,
  children: 0,
  infants: 0,
};

export default function SearchForm() {
  const navigate = useNavigate();
  const { search, setSearch } = useBooking();

  const safeSearch = search || {};

  const safePassengers = {
    ...DEFAULT_PASSENGERS,
    ...(safeSearch.passengers || {}),
  };

  const [from, setFrom] = useState(
    safeSearch.from || "Bengaluru",
  );

  const [to, setTo] = useState(
    safeSearch.to || "Delhi",
  );

  const [date, setDate] = useState(
    safeSearch.date || "",
  );

  const [passengers, setPassengers] = useState(
    safePassengers,
  );

  const [cabin, setCabin] = useState(
    safeSearch.cabin || "Economy",
  );

  const [tripType, setTripType] = useState(
    safeSearch.tripType || "Round Trip",
  );

  const [error, setError] = useState("");

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!from) {
      setError("Please select your departure city.");
      return;
    }

    if (!to) {
      setError("Please select your destination city.");
      return;
    }

    if (from === to) {
      setError(
        "Departure and destination cities must be different.",
      );
      return;
    }

    if (!date) {
      setError("Please select your travel date.");
      return;
    }

    const safePassengerData = {
      adults: Number(passengers?.adults) || 0,
      children: Number(passengers?.children) || 0,
      infants: Number(passengers?.infants) || 0,
    };

    const totalPassengers =
      safePassengerData.adults +
      safePassengerData.children +
      safePassengerData.infants;

    if (totalPassengers < 1) {
      setError(
        "Please select at least one passenger.",
      );
      return;
    }

    setSearch({
      from,
      to,
      date,
      passengers: safePassengerData,
      cabin,
      tripType,
    });

    navigate("/results");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="booking-card-enter w-full overflow-visible rounded-[1.75rem] border border-white/20 bg-white p-4 shadow-2xl shadow-black/20 sm:p-5 lg:p-6"
    >
      {/* =========================
          Trip Type
      ========================== */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit rounded-xl bg-slate-100 p-1">
          {["Round Trip", "One Way"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition sm:text-sm ${
                tripType === type
                  ? "bg-white text-sky-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <ShieldIcon />
          Secure booking
        </div>
      </div>

      {/* =========================
          Search Fields
      ========================== */}

      {/*
        Desktop:
        From | Swap | To
        Departure | Passengers

        This gives every field much more room and prevents
        city names, dates and passenger text from being clipped.
      */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* From */}
        <div className="min-w-0">
          <CitySelector
            label="From"
            value={from}
            onChange={setFrom}
            placeholder="Departure city"
            exclude={to}
          />
        </div>

        {/* To */}
        <div className="min-w-0">
          <CitySelector
            label="To"
            value={to}
            onChange={setTo}
            placeholder="Destination city"
            exclude={from}
          />
        </div>

        {/* Departure */}
        <div className="min-w-0">
          <DatePicker
            label="Departure"
            value={date}
            onChange={setDate}
          />
        </div>

        {/* Passengers */}
        <div className="min-w-0">
          <PassengerSelector
            passengers={passengers}
            setPassengers={setPassengers}
            cabin={cabin}
            setCabin={setCabin}
          />
        </div>
      </div>

      {/* =========================
          Swap Button
      ========================== */}
      <div className="my-3 flex justify-center lg:-my-6 lg:relative lg:z-20 lg:justify-center">
        <motion.button
          type="button"
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={swapCities}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-sky-600 shadow-md transition hover:border-sky-200 hover:bg-sky-50"
          aria-label="Swap departure and destination cities"
          title="Swap cities"
        >
          <ArrowRightLeft size={18} />
        </motion.button>
      </div>

      {/* =========================
          Bottom Section
      ========================== */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Message */}
        <div className="flex min-h-6 min-w-0 items-center gap-2">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.p
                key="error"
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                className="text-xs font-semibold text-rose-500"
              >
                {error}
              </motion.p>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-400"
              >
                Compare prices, timings and airlines before
                booking.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-700 sm:w-auto"
        >
          <Search size={18} />

          Start Searching

          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}

function ShieldIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      ✓
    </span>
  );
}