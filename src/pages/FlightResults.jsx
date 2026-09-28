import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FlightCard from "../components/FlightCard";
import FlightDetails from "../components/FlightDetails";
import FlightFilters from "../components/FlightFilters";
import FlightSort from "../components/FlightSort";
import LoadingSkeleton from "../components/LoadingSkeleton";

import { useBooking } from "../context/BookingContext";
import { flights } from "../data/flights";

const DEFAULT_SEARCH = {
  tripType: "Round Trip",
  from: "Bengaluru",
  to: "Delhi",
  date: "",
  returnDate: "",
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  cabin: "Economy",
};

export default function FlightResults() {
  const navigate = useNavigate();

  const {
    search,
    setSelectedFlight,
  } = useBooking();

  const safeSearch = {
    ...DEFAULT_SEARCH,
    ...(search || {}),
    passengers: {
      ...DEFAULT_SEARCH.passengers,
      ...(search?.passengers || {}),
    },
  };

  const [loading, setLoading] = useState(true);

  const [selectedDetails, setSelectedDetails] =
    useState(null);

  const [mobileFilters, setMobileFilters] =
    useState(false);

  const [sort, setSort] = useState("recommended");

  const maxAvailablePrice = useMemo(() => {
    if (!flights || flights.length === 0) {
      return 10000;
    }

    return Math.max(
      ...flights.map((flight) => flight.price),
    );
  }, []);

  const [filters, setFilters] = useState({
    maxPrice: maxAvailablePrice,
    airlines: [],
    departure: "All",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Find flights matching the selected route.
   */
  const routeFlights = useMemo(() => {
    if (!flights || flights.length === 0) {
      return [];
    }

    const from = safeSearch.from?.toLowerCase();
    const to = safeSearch.to?.toLowerCase();

    return flights.filter(
      (flight) =>
        flight.from?.toLowerCase() === from &&
        flight.to?.toLowerCase() === to,
    );
  }, [safeSearch.from, safeSearch.to]);

  /*
   * Apply filters.
   */
  const filteredFlights = useMemo(() => {
    const result = routeFlights.filter((flight) => {
      const priceMatch =
        flight.price <= filters.maxPrice;

      const airlineMatch =
        filters.airlines.length === 0 ||
        filters.airlines.includes(flight.airline);

      const departureMatch =
        filters.departure === "All" ||
        flight.departurePeriod ===
          filters.departure;

      return (
        priceMatch &&
        airlineMatch &&
        departureMatch
      );
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "duration":
          return (
            a.durationMinutes -
            b.durationMinutes
          );

        case "departure":
          return a.departure.localeCompare(
            b.departure,
          );

        case "rating":
          return b.rating - a.rating;

        default:
          return a.price - b.price;
      }
    });
  }, [
    routeFlights,
    filters,
    sort,
  ]);

  /*
   * When a flight is selected,
   * save it and continue to passenger details.
   */
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);

    navigate("/passenger-details");
  };

  /*
   * Format selected date.
   */
  const formattedDate = safeSearch.date
    ? new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(
        new Date(
          `${safeSearch.date}T00:00:00`,
        ),
      )
    : "Select date";

  const totalPassengers =
    Number(
      safeSearch.passengers.adults,
    ) +
    Number(
      safeSearch.passengers.children,
    ) +
    Number(
      safeSearch.passengers.infants,
    );

  /*
   * Clear filters.
   */
  const clearFilters = () => {
    setFilters({
      maxPrice: maxAvailablePrice,
      airlines: [],
      departure: "All",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-sky-600"
          >
            <ArrowLeft size={16} />

            Modify search
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {/* Route */}
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-400">
                <span>
                  {safeSearch.from}
                </span>

                <ChevronRight size={14} />

                <span>
                  {safeSearch.to}
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Choose your flight
              </h1>

              {/* Search details */}
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                  <CalendarDays size={13} />

                  {formattedDate}
                </span>

                <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                  <Users size={13} />

                  {totalPassengers}

                  {" "}

                  {totalPassengers === 1
                    ? "passenger"
                    : "passengers"}
                </span>

                <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-600">
                  {safeSearch.cabin}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                  {safeSearch.tripType}
                </span>
              </div>
            </div>

            {/* Available flight count */}
            <div className="rounded-2xl bg-sky-50 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Available flights
              </p>

              <p className="mt-1 text-2xl font-black text-sky-700">
                {routeFlights.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Mobile filter button */}
        <button
          type="button"
          onClick={() =>
            setMobileFilters(
              (value) => !value,
            )
          }
          className="mb-4 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-600 lg:hidden"
        >
          {mobileFilters
            ? "Hide filters"
            : "Show filters"}
        </button>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Filters */}
          <div
            className={`${
              mobileFilters
                ? "block"
                : "hidden"
            } lg:block`}
          >
            <FlightFilters
              filters={filters}
              setFilters={setFilters}
              maxAvailablePrice={
                maxAvailablePrice
              }
            />
          </div>

          {/* Results */}
          <div className="min-w-0">
            {/* Results toolbar */}
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {loading
                    ? "Searching available flights..."
                    : `${filteredFlights.length} flights available`}
                </p>
              </div>

              <FlightSort
                value={sort}
                onChange={setSort}
              />
            </div>

            {/* Loading */}
            {loading && (
              <LoadingSkeleton />
            )}

            {/* Flight cards */}
            {!loading &&
              filteredFlights.length > 0 && (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className="space-y-4"
                  >
                    {filteredFlights.map(
                      (flight) => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          onDetails={
                            setSelectedDetails
                          }
                          onSelect={
                            handleSelectFlight
                          }
                        />
                      ),
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

            {/* Empty state */}
            {!loading &&
              filteredFlights.length === 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <MapPin size={25} />
                  </div>

                  <h2 className="mt-5 text-xl font-black text-slate-900">
                    No flights match your search
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Try changing your route or
                    clearing one or more filters
                    to see more flights.
                  </p>

                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
                    >
                      Clear filters
                    </button>

                    <Link
                      to="/"
                      className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-600"
                    >
                      Modify search
                    </Link>
                  </div>
                </motion.div>
              )}
          </div>
        </div>
      </div>

      {/* Flight details modal */}
      <AnimatePresence>
        {selectedDetails && (
          <FlightDetails
            flight={selectedDetails}
            onClose={() =>
              setSelectedDetails(null)
            }
            onSelect={handleSelectFlight}
          />
        )}
      </AnimatePresence>
    </div>
  );
}