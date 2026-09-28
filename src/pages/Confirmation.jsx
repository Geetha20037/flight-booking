import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

import BookingConfirmation from "../components/BookingConfirmation";
import ProgressSteps from "../components/ProgressSteps";

export default function Confirmation() {
  return (
    <div className="bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ProgressSteps activeStep={4} />

        <BookingConfirmation />

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            <Home size={16} />
            Back to home
          </Link>

          <Link
            to="/results"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Search another flight
          </Link>
        </div>
      </div>
    </div>
  );
}