import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, Search } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToFlights = () => {
    navigate("/results");
  };

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed left-0 right-0 top-0 z-[9999] w-full border-b border-white/10 bg-slate-950 text-white shadow-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-500/30">
              <Plane size={22} className="-rotate-[25deg]" />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">
                SkyBook
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Flight Booking
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                location.pathname === "/"
                  ? "bg-white/10 text-sky-400"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={goToFlights}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                location.pathname === "/results"
                  ? "bg-white/10 text-sky-400"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Search size={16} />
              Flights
            </button>

            <button
              type="button"
              onClick={goToFlights}
              className="ml-2 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400 active:scale-95"
            >
              <Plane size={16} />
              Book a Flight
            </button>
          </nav>
        </div>
      </header>

      {/* Navbar spacer */}
      <div className="h-20" />
    </>
  );
}