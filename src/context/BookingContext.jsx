
import { createContext, useContext, useMemo, useState } from "react";

const BookingContext = createContext(null);

const DEFAULT_PASSENGERS = {
  adults: 1,
  children: 0,
  infants: 0,
};

function getDateAfterDays(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

const initialSearch = {
  tripType: "Round Trip",
  from: "Bengaluru",
  to: "Delhi",
  date: getDateAfterDays(7),
  returnDate: getDateAfterDays(14),
  passengers: {
    ...DEFAULT_PASSENGERS,
  },
  cabin: "Economy",
};

export function BookingProvider({ children }) {
  const [search, setSearchState] = useState(initialSearch);

  const [selectedFlight, setSelectedFlight] = useState(null);

  const [passengerDetails, setPassengerDetails] = useState(null);

  const [selectedSeat, setSelectedSeat] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [paymentDetails, setPaymentDetails] = useState(null);

  const [bookingId, setBookingId] = useState(null);

  const setSearch = (updates = {}) => {
    setSearchState((previous) => ({
      ...previous,
      ...updates,
      passengers: {
        ...DEFAULT_PASSENGERS,
        ...(previous.passengers || {}),
        ...(updates.passengers || {}),
      },
    }));
  };

  const safePassengers = {
    ...DEFAULT_PASSENGERS,
    ...(search?.passengers || {}),
  };

  const totalPassengers =
    Number(safePassengers.adults || 0) +
    Number(safePassengers.children || 0) +
    Number(safePassengers.infants || 0);

  /*
   * MULTI-SEAT SELECTION
   *
   * Seats are identified by their "code"
   * such as 1A, 1B, 2A, etc.
   */
  const toggleSeat = (seat) => {
    if (!seat) {
      return;
    }

    setSelectedSeats((previous) => {
      const seatCode = seat.code;

      const exists = previous.some(
        (item) => item?.code === seatCode,
      );

      /*
       * If the seat is already selected,
       * clicking it again removes it.
       */
      if (exists) {
        return previous.filter(
          (item) => item?.code !== seatCode,
        );
      }

      /*
       * Do not allow more seats than passengers.
       */
      if (previous.length >= totalPassengers) {
        return previous;
      }

      /*
       * Add the new seat.
       */
      return [...previous, seat];
    });
  };

  const clearSelectedSeats = () => {
    setSelectedSeats([]);
    setSelectedSeat(null);
  };

  const completeBooking = (payment) => {
    setPaymentDetails(payment);

    const randomNumber = Math.floor(
      100000 + Math.random() * 900000,
    );

    const id = `SKY${randomNumber}`;

    setBookingId(id);

    return id;
  };

  const resetBooking = () => {
    setSelectedFlight(null);
    setPassengerDetails(null);
    setSelectedSeat(null);
    setSelectedSeats([]);
    setPaymentDetails(null);
    setBookingId(null);
  };

  const value = useMemo(
    () => ({
      search,
      setSearch,

      selectedFlight,
      setSelectedFlight,

      passengerDetails,
      setPassengerDetails,

      /*
       * Old single-seat API kept for compatibility.
       */
      selectedSeat,
      setSelectedSeat,

      /*
       * New multiple-seat API.
       */
      selectedSeats,
      setSelectedSeats,
      toggleSeat,
      clearSelectedSeats,

      paymentDetails,
      setPaymentDetails,

      bookingId,
      setBookingId,

      totalPassengers,

      completeBooking,
      resetBooking,
    }),
    [
      search,
      selectedFlight,
      passengerDetails,
      selectedSeat,
      selectedSeats,
      paymentDetails,
      bookingId,
      totalPassengers,
    ],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking must be used inside BookingProvider",
    );
  }

  return context;
}