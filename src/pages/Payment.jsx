
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard as CreditCardIcon,
  Luggage,
  Plane,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../context/BookingContext";
import ProgressSteps from "../components/ProgressSteps";
import PaymentForm from "../components/PaymentForm";

export default function Payment() {
  const navigate = useNavigate();

  const {
    selectedFlight,
    selectedSeat,
    search,
    passengerDetails,
  } = useBooking();

  /*
   * Redirect only after React has rendered.
   * This avoids calling navigate() directly during render.
   */
  useEffect(() => {
    if (!selectedFlight) {
      navigate("/results", { replace: true });
    }
  }, [selectedFlight, navigate]);

  /*
   * Keep all values safe so the page does not crash
   * if some booking information is temporarily missing.
   */
  const passengers = search?.passengers || {};

  const adultCount = Number(passengers.adults) || 0;
  const childCount = Number(passengers.children) || 0;
  const infantCount = Number(passengers.infants) || 0;

  const totalPassengers =
    adultCount + childCount + infantCount;

  const flightPrice = Number(selectedFlight?.price) || 0;
  const seatFee = Number(selectedSeat?.price) || 0;

  /*
   * If no passenger information exists, use 1 passenger
   * so the payment summary still displays correctly.
   */
  const payablePassengers =
    totalPassengers > 0 ? totalPassengers : 1;

  const baseFare =
    flightPrice * payablePassengers;

  const convenienceFee = 199;

  const taxes = Math.round(
    (baseFare + seatFee) * 0.05,
  );

  const totalAmount =
    baseFare +
    seatFee +
    convenienceFee +
    taxes;

  const passengerName =
    passengerDetails?.fullName ||
    passengerDetails?.name ||
    "Passenger";

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Selected date";
    }

    const date = new Date(
      `${dateString}T00:00:00`,
    );

    if (Number.isNaN(date.getTime())) {
      return "Selected date";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /*
   * useMemo is now always called in the same order.
   */
  const flightSummary = useMemo(
    () => ({
      date: formatDate(search?.date),
      passengerCount: payablePassengers,
      route: `${selectedFlight?.fromCode || "---"} → ${
        selectedFlight?.toCode || "---"
      }`,
    }),
    [
      search?.date,
      payablePassengers,
      selectedFlight?.fromCode,
      selectedFlight?.toCode,
    ],
  );

  /*
   * Wait for redirect if no flight exists.
   */
  if (!selectedFlight) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ProgressSteps currentStep={3} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={() => navigate("/seat-selection")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-sky-600"
          >
            <ArrowLeft size={18} />
            Back to Seat Selection
          </button>

          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
              Step 3 of 4
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Complete your payment
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Your seat is reserved. Choose a payment method
              and securely complete your booking.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Payment Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <CreditCardIcon size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Payment details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>

              <PaymentForm amount={totalAmount} />
            </div>

            {/* Security Information */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid gap-4 sm:grid-cols-3"
            >

              {/* Secure Payment */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={20} />
                </div>

                <h3 className="font-bold text-slate-900">
                  Secure payment
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your payment information is protected.
                </p>
              </div>

              {/* Instant Confirmation */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CheckCircle2 size={20} />
                </div>

                <h3 className="font-bold text-slate-900">
                  Instant confirmation
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Receive your booking confirmation instantly.
                </p>
              </div>

              {/* Quick Checkout */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock3 size={20} />
                </div>

                <h3 className="font-bold text-slate-900">
                  Quick checkout
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Complete your booking in just a few steps.
                </p>
              </div>

            </motion.div>
          </motion.section>

          {/* Booking Summary */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="h-fit lg:sticky lg:top-24"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {/* Summary Header */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white">

                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                      Booking Summary
                    </p>

                    <h2 className="mt-1 text-xl font-black">
                      {flightSummary.route}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Plane size={21} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-900">
                    {selectedFlight.airlineCode || "FL"}
                  </div>

                  <div>
                    <p className="font-bold">
                      {selectedFlight.airline || "Airline"}
                    </p>

                    <p className="text-xs text-slate-300">
                      {selectedFlight.flightNumber || "Flight"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flight Details */}
              <div className="space-y-5 p-6">

                {/* Departure / Arrival */}
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-2xl font-black text-slate-900">
                      {selectedFlight.departure || "--:--"}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {selectedFlight.fromCode || "---"}
                    </p>
                  </div>

                  <div className="flex flex-1 items-center justify-center px-3">
                    <div className="relative w-full">
                      <div className="border-t border-dashed border-slate-300" />

                      <Plane
                        size={16}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-white text-sky-600"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900">
                      {selectedFlight.arrival || "--:--"}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {selectedFlight.toCode || "---"}
                    </p>
                  </div>

                </div>

                {/* Booking Tags */}
                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {flightSummary.date}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {flightSummary.passengerCount}{" "}
                    {flightSummary.passengerCount === 1
                      ? "Passenger"
                      : "Passengers"}
                  </span>

                  <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                    {search?.cabin || "Economy"}
                  </span>

                </div>

                {/* Passenger */}
                <div className="border-t border-slate-100 pt-5">

                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Passenger
                  </p>

                  <p className="font-bold text-slate-900">
                    {passengerName}
                  </p>

                </div>

                {/* Selected Seat */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Selected seat
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      Seat {selectedSeat?.code || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-black text-sky-700">
                    ₹
                    {seatFee.toLocaleString("en-IN")}
                  </div>

                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Luggage
                      size={15}
                      className="text-sky-600"
                    />

                    {selectedFlight.baggage || "15 kg"}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Utensils
                      size={15}
                      className="text-sky-600"
                    />

                    {selectedFlight.meal || "Meal available"}
                  </div>

                </div>

                {/* Price Breakdown */}
                <div className="border-t border-slate-200 pt-5">

                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Base fare × {payablePassengers}
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{baseFare.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Seat selection
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{seatFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Taxes & fees
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{taxes.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mb-4 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Convenience fee
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{convenienceFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex items-end justify-between border-t border-slate-200 pt-4">

                    <div>
                      <p className="text-sm font-bold text-slate-500">
                        Total amount
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Inclusive of taxes
                      </p>
                    </div>

                    <p className="text-2xl font-black text-slate-900">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}