import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import Footer from "../components/Footer";

const destinations = [
  {
    city: "Delhi",
    code: "DEL",
    description: "Capital city",
    price: "From ₹4,899",
  },
  {
    city: "Mumbai",
    code: "BOM",
    description: "City of dreams",
    price: "From ₹4,299",
  },
  {
    city: "Goa",
    code: "GOI",
    description: "Beach escape",
    price: "From ₹3,999",
  },
  {
    city: "Hyderabad",
    code: "HYD",
    description: "Pearl city",
    price: "From ₹3,699",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    text: "Your booking information is protected.",
  },
  {
    icon: Search,
    title: "Easy Search",
    text: "Compare flight options in seconds.",
  },
  {
    icon: Ticket,
    title: "Instant Tickets",
    text: "Get your booking confirmation instantly.",
  },
  {
    icon: Clock3,
    title: "24/7 Support",
    text: "We're here whenever you need us.",
  },
];

const steps = [
  {
    number: "01",
    title: "Search",
    text: "Choose your origin, destination, date and passengers.",
    icon: Search,
  },
  {
    number: "02",
    title: "Compare",
    text: "Compare airlines, timings, prices and available seats.",
    icon: Plane,
  },
  {
    number: "03",
    title: "Book",
    text: "Enter passenger details, select your seat and pay securely.",
    icon: Ticket,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <Navbar />

      <main>
        {/* =========================================================
            HERO SECTION
        ========================================================= */}
        <section className="relative overflow-visible bg-slate-950">
          {/* Background decorations */}
          <div className="pointer-events-none absolute left-[-140px] top-[-140px] h-[360px] w-[360px] rounded-full bg-sky-500/20 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="pointer-events-none absolute left-1/2 top-20 hidden h-64 w-64 -translate-x-1/2 rounded-full bg-sky-400/5 blur-3xl lg:block" />

          <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pt-18 lg:px-8 lg:pb-20 lg:pt-20">
            {/* Hero content */}
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Left side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-bold text-sky-300 sm:text-sm">
                  <Sparkles size={15} />
                  Your journey starts here
                </div>

                <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Find your next
                  <span className="mt-2 block text-sky-400">
                    adventure in the sky.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
                  Search flights, compare fares, choose your seat and book
                  your complete journey from one simple platform.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/results")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400"
                  >
                    <Ticket size={18} />
                    Book a Flight
                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/results")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:bg-white/15"
                  >
                    <Search size={17} />
                    Explore Flights
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 sm:text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    No hidden fees
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 sm:text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-emerald-400"
                    />
                    Secure payments
                  </div>
                </div>
              </motion.div>

              {/* Right side - search */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.15,
                }}
                className="relative z-20 min-w-0"
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                  <Plane size={17} className="text-sky-400" />
                  Search and compare flights
                </div>

                {/* Important: full-width container prevents clipping */}
                <div className="w-full min-w-0">
                  <SearchForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            BENEFITS
        ========================================================= */}
        <section className="relative z-10 border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.4,
                  }}
                  className="bg-white p-6 sm:p-7"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Icon size={20} />
                  </div>

                  <h3 className="font-extrabold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {benefit.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            POPULAR DESTINATIONS
        ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
                Popular destinations
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Where will you fly next?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Explore popular routes and start planning your next trip.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/results")}
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-sky-600 transition hover:text-sky-700"
            >
              View all flights
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <motion.button
                key={destination.code}
                type="button"
                onClick={() => navigate("/results")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:border-sky-200 hover:shadow-xl"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />

                  <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />

                  <Plane
                    size={54}
                    className="rotate-12 text-white/90 transition duration-500 group-hover:translate-x-3 group-hover:-translate-y-2"
                  />

                  <div className="absolute bottom-4 left-4 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
                    {destination.code}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        {destination.city}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {destination.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-sky-600"
                    />
                  </div>

                  <p className="mt-5 text-sm font-bold text-sky-600">
                    {destination.price}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* =========================================================
            HOW IT WORKS
        ========================================================= */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600">
                Simple process
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                Book your journey in three steps
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Everything you need for a smooth flight booking experience.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4,
                    }}
                    className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
                        <Icon size={21} />
                      </div>

                      <span className="text-4xl font-black text-slate-200">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-sky-600 px-6 py-14 text-center shadow-2xl shadow-sky-600/20 sm:px-12"
          >
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-2xl" />

            <div className="relative">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Ready for your next adventure?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-sky-100 sm:text-base">
                Search available flights and start planning your journey
                today.
              </p>

              <button
                type="button"
                onClick={() => navigate("/results")}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-black text-sky-700 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Start Searching
                <ArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}