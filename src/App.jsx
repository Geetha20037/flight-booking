
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { BookingProvider } from "./context/BookingContext";

import StartupLoader from "./components/StartupLoader";

import Home from "./pages/Home";
import FlightResults from "./pages/FlightResults";
import PassengerDetails from "./pages/PassengerDetails";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <StartupLoader />}

      <div
        className={`transition-opacity duration-700 ${
          showLoader
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/results"
            element={<FlightResults />}
          />

          <Route
            path="/passenger-details"
            element={<PassengerDetails />}
          />

          <Route
            path="/seat-selection"
            element={<SeatSelection />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/confirmation"
            element={<Confirmation />}
          />

          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </BrowserRouter>
  );
}