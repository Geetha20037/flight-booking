import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../context/BookingContext";
import CreditCardComponent from "./CreditCard";

function formatCardNumber(value = "") {
  const numbers = String(value).replace(/\D/g, "").slice(0, 16);
  return numbers.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value = "") {
  const numbers = String(value).replace(/\D/g, "").slice(0, 4);

  if (numbers.length <= 2) {
    return numbers;
  }

  return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
}

export default function PaymentForm({ total, amount }) {
  const navigate = useNavigate();

  const { completeBooking } = useBooking();

  // Support both prop names:
  // total and amount.
  const safeTotal = Number(total ?? amount) || 0;

  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [errors, setErrors] = useState({});

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upi, setUpi] = useState("");

  const [bank, setBank] = useState("State Bank of India");

  const methods = [
    {
      id: "card",
      label: "Credit / Debit Card",
      icon: CreditCard,
    },
    {
      id: "upi",
      label: "UPI",
      icon: Smartphone,
    },
    {
      id: "netbanking",
      label: "Net Banking",
      icon: Building2,
    },
  ];

  const validate = () => {
    const nextErrors = {};

    if (method === "card") {
      const cardNumber = card.number.replace(/\D/g, "");

      if (cardNumber.length !== 16) {
        nextErrors.number = "Enter a valid 16-digit card number.";
      }

      if (!card.name.trim()) {
        nextErrors.name = "Card holder name is required.";
      }

      if (card.expiry.length !== 5) {
        nextErrors.expiry = "Enter expiry as MM/YY.";
      } else {
        const [month, year] = card.expiry.split("/");

        const monthNumber = Number(month);
        const yearNumber = Number(year);

        if (
          !monthNumber ||
          monthNumber < 1 ||
          monthNumber > 12 ||
          !year ||
          year.length !== 2
        ) {
          nextErrors.expiry = "Enter a valid expiry date.";
        } else {
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;

          if (
            yearNumber < currentYear ||
            (yearNumber === currentYear && monthNumber < currentMonth)
          ) {
            nextErrors.expiry = "Card expiry date has passed.";
          }
        }
      }

      if (card.cvv.length !== 3) {
        nextErrors.cvv = "Enter a valid 3-digit CVV.";
      }
    }

    if (method === "upi") {
      const upiValue = upi.trim();

      if (!upiValue) {
        nextErrors.upi = "UPI ID is required.";
      } else if (!/^[\w.-]+@[\w.-]+$/.test(upiValue)) {
        nextErrors.upi = "Enter a valid UPI ID.";
      }
    }

    if (method === "netbanking" && !bank) {
      nextErrors.bank = "Please select your bank.";
    }

    if (safeTotal <= 0) {
      nextErrors.amount = "Unable to calculate the payment amount.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handlePayment = () => {
    if (processing) {
      return;
    }

    if (!validate()) {
      return;
    }

    setProcessing(true);

    const paymentData = {
      method,
      amount: safeTotal,

      cardLastFour:
        method === "card"
          ? card.number.replace(/\D/g, "").slice(-4)
          : null,

      upi: method === "upi" ? upi.trim() : null,

      bank: method === "netbanking" ? bank : null,
    };

    setTimeout(() => {
      completeBooking(paymentData);
      navigate("/confirmation");
    }, 1400);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Lock size={20} />
        </div>

        <div>
          <h2 className="font-black text-slate-900">
            Secure payment
          </h2>

          <p className="text-xs font-semibold text-slate-400">
            Your payment information is encrypted.
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {methods.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setMethod(item.id);
                setErrors({});
                setFlipped(false);
              }}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition ${
                method === item.id
                  ? "border-sky-500 bg-sky-50 text-sky-600"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Payment Method Content */}
      <AnimatePresence mode="wait">
        {/* CARD */}
        {method === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-7"
          >
            <CreditCardComponent
              cardNumber={card.number}
              cardName={card.name}
              expiry={card.expiry}
              cvv={card.cvv}
              flipped={flipped}
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {/* Card Number */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Card number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={card.number}
                  onChange={(event) =>
                    setCard((previous) => ({
                      ...previous,
                      number: formatCardNumber(event.target.value),
                    }))
                  }
                  onFocus={() => setFlipped(false)}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full rounded-xl border px-4 py-3.5 font-mono outline-none transition ${
                    errors.number
                      ? "border-red-300 ring-2 ring-red-50"
                      : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
                  }`}
                />

                {errors.number && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {errors.number}
                  </p>
                )}
              </div>

              {/* Card Holder */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Card holder
                </label>

                <input
                  type="text"
                  autoComplete="cc-name"
                  value={card.name}
                  onChange={(event) =>
                    setCard((previous) => ({
                      ...previous,
                      name: event.target.value.toUpperCase(),
                    }))
                  }
                  onFocus={() => setFlipped(false)}
                  placeholder="YOUR NAME"
                  className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                    errors.name
                      ? "border-red-300 ring-2 ring-red-50"
                      : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-3">
                {/* Expiry */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Expiry
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={card.expiry}
                    onChange={(event) =>
                      setCard((previous) => ({
                        ...previous,
                        expiry: formatExpiry(event.target.value),
                      }))
                    }
                    onFocus={() => setFlipped(false)}
                    placeholder="MM/YY"
                    className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                      errors.expiry
                        ? "border-red-300 ring-2 ring-red-50"
                        : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
                    }`}
                  />

                  {errors.expiry && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {errors.expiry}
                    </p>
                  )}
                </div>

                {/* CVV */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    CVV
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={card.cvv}
                    onChange={(event) =>
                      setCard((previous) => ({
                        ...previous,
                        cvv: event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 3),
                      }))
                    }
                    onFocus={() => setFlipped(true)}
                    placeholder="123"
                    maxLength={3}
                    className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                      errors.cvv
                        ? "border-red-300 ring-2 ring-red-50"
                        : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
                    }`}
                  />

                  {errors.cvv && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* UPI */}
        {method === "upi" && (
          <motion.div
            key="upi"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-7"
          >
            <label className="mb-2 block text-sm font-bold text-slate-700">
              UPI ID
            </label>

            <input
              type="text"
              value={upi}
              onChange={(event) => {
                setUpi(event.target.value);
                setErrors((previous) => ({
                  ...previous,
                  upi: "",
                }));
              }}
              placeholder="yourname@upi"
              className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                errors.upi
                  ? "border-red-300 ring-2 ring-red-50"
                  : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
              }`}
            />

            {errors.upi && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.upi}
              </p>
            )}

            <div className="mt-4 rounded-2xl bg-sky-50 p-4 text-sm text-sky-700">
              Enter your UPI ID and you’ll receive a payment request in your
              UPI application.
            </div>
          </motion.div>
        )}

        {/* NET BANKING */}
        {method === "netbanking" && (
          <motion.div
            key="netbanking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-7"
          >
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Select your bank
            </label>

            <select
              value={bank}
              onChange={(event) => setBank(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
            >
              <option value="State Bank of India">
                State Bank of India
              </option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Kotak Mahindra Bank">
                Kotak Mahindra Bank
              </option>
            </select>

            {errors.bank && (
              <p className="mt-1 text-xs font-semibold text-red-500">
                {errors.bank}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Amount + Pay */}
      <div className="mt-7 border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-500">
            Amount payable
          </span>

          <span className="text-2xl font-black text-slate-900">
            ₹{safeTotal.toLocaleString("en-IN")}
          </span>
        </div>

        {errors.amount && (
          <p className="mt-2 text-right text-xs font-semibold text-red-500">
            {errors.amount}
          </p>
        )}

        <button
          type="button"
          disabled={processing || safeTotal <= 0}
          onClick={handlePayment}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 py-4 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {processing ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "linear",
                }}
                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
              />

              Processing payment...
            </>
          ) : (
            <>
              <CheckCircle2 size={17} />

              Pay ₹{safeTotal.toLocaleString("en-IN")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}