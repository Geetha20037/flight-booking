
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { useBooking } from "../context/BookingContext";

const initialForm = {
  email: "",
  phone: "",
  fullName: "",
  gender: "Male",
  dateOfBirth: "",
  idNumber: "",
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  error,
}) {
  const safeValue = value || "";
  const valid = safeValue.trim() !== "" && !error;

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          value={safeValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white py-3.5 ${
            Icon ? "pl-10" : "px-4"
          } ${
            error
              ? "border-red-300 ring-2 ring-red-50"
              : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
          } outline-none transition`}
        />

        {valid && (
          <CheckCircle2
            size={17}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
          />
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs font-semibold text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PassengerForm({ onComplete }) {
  const { passengerDetails, setPassengerDetails } = useBooking();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    ...initialForm,
    ...(passengerDetails || {}),
  });

  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  /* ------------------------------
     Validate Contact Details
  ------------------------------ */

  const validateContact = () => {
    const nextErrors = {};

    const email = form.email?.trim() || "";
    const phone = form.phone?.trim() || "";

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* ------------------------------
     Validate Passenger Details
  ------------------------------ */

  const validatePassenger = () => {
    const nextErrors = {};

    const fullName = form.fullName?.trim() || "";
    const idNumber = form.idNumber?.trim() || "";

    if (!fullName) {
      nextErrors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
      nextErrors.fullName = "Enter your complete name.";
    }

    if (!form.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!idNumber) {
      nextErrors.idNumber = "Government ID is required.";
    } else if (idNumber.length < 4) {
      nextErrors.idNumber = "Enter a valid ID number.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* ------------------------------
     Continue From Step 1
  ------------------------------ */

  const nextStep = () => {
    const isValid = validateContact();

    if (!isValid) {
      return;
    }

    setStep(2);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ------------------------------
     Final Submit
  ------------------------------ */

  const submit = (event) => {
    event.preventDefault();

    const isValid = validatePassenger();

    if (!isValid) {
      return;
    }

    const savedDetails = {
      ...form,
      email: form.email.trim(),
      phone: form.phone.trim(),
      fullName: form.fullName.trim(),
      idNumber: form.idNumber.trim(),
    };

    setPassengerDetails(savedDetails);

    if (typeof onComplete === "function") {
      onComplete(savedDetails);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
              Passenger information
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              {step === 1
                ? "Contact details"
                : "Traveller details"}
            </h2>
          </div>

          <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
            Step {step} of 2
          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: "50%" }}
            animate={{
              width: step === 1 ? "50%" : "100%",
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="h-full rounded-full bg-sky-600"
          />
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="p-5 sm:p-7"
      >
        <AnimatePresence mode="wait">

          {/* STEP 1 */}
          {step === 1 ? (
            <motion.div
              key="contact"
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -25,
              }}
              transition={{
                duration: 0.25,
              }}
              className="space-y-5"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Email */}
                <Field
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    update("email", value)
                  }
                  placeholder="you@example.com"
                  icon={Mail}
                  error={errors.email}
                />

                {/* Phone */}
                <Field
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={(value) =>
                    update("phone", value)
                  }
                  placeholder="10-digit mobile number"
                  icon={Phone}
                  error={errors.phone}
                />

              </div>

              {/* Information */}
              <div className="rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-sky-700">
                We'll send your booking confirmation and
                travel updates to these contact details.
              </div>

              {/* Continue */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 active:scale-[0.98]"
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              </div>

            </motion.div>
          ) : (

            /* STEP 2 */
            <motion.div
              key="passenger"
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -25,
              }}
              transition={{
                duration: 0.25,
              }}
              className="space-y-5"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}
                <Field
                  label="Full name"
                  value={form.fullName}
                  onChange={(value) =>
                    update("fullName", value)
                  }
                  placeholder="Enter name as on ID"
                  icon={UserRound}
                  error={errors.fullName}
                />

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Gender
                  </label>

                  <select
                    value={form.gender}
                    onChange={(event) =>
                      update(
                        "gender",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-50"
                  >
                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Date of Birth */}
                <Field
                  label="Date of birth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(value) =>
                    update(
                      "dateOfBirth",
                      value,
                    )
                  }
                  error={errors.dateOfBirth}
                />

                {/* Government ID */}
                <Field
                  label="Government ID"
                  value={form.idNumber}
                  onChange={(value) =>
                    update(
                      "idNumber",
                      value,
                    )
                  }
                  placeholder="Enter ID number"
                  error={errors.idNumber}
                />

              </div>

              {/* Information */}
              <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-700">
                Please make sure your name matches the
                identification document you will carry
                during your journey.
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setErrors({});
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 active:scale-[0.98]"
                >
                  Continue to seats
                  <ArrowRight size={17} />
                </button>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </form>
    </div>
  );
}