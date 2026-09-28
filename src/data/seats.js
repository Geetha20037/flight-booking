const columns = ["A", "B", "C", "D", "E", "F"];

const occupiedSeats = [
  "1B",
  "1E",
  "2A",
  "2F",
  "3C",
  "4D",
  "5A",
  "5F",
  "6B",
  "7E",
  "8C",
  "9D",
  "10A",
  "10F",
  "11B",
  "12E",
  "13C",
  "14D",
  "15A",
  "16F",
  "17B",
  "18E",
];

export const seats = Array.from({ length: 18 }, (_, index) => {
  const row = index + 1;

  return columns.map((column) => {
    const code = `${row}${column}`;

    return {
      code,
      row,
      column,
      occupied: occupiedSeats.includes(code),
      price: row <= 3 ? 599 : row <= 6 ? 399 : 249,
    };
  });
});

export const seatColumns = columns;