import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toIsoDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

function getTodayIso() {
  return toIsoDate(new Date());
}

function formatDate(value) {
  if (!value) return "Select date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selectedDate = value ? new Date(`${value}T00:00:00`) : new Date();

  const [visibleMonth, setVisibleMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  useEffect(() => {
    if (value) {
      const date = new Date(`${value}T00:00:00`);
      setVisibleMonth(
        new Date(date.getFullYear(), date.getMonth(), 1),
      );
    }
  }, [value]);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let index = 0; index < firstDay; index += 1) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarDays.push(new Date(year, month, day));
  }

  const previousMonth = () => {
    const today = new Date();
    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    const nextMonth = new Date(year, month - 1, 1);

    if (nextMonth >= currentMonth) {
      setVisibleMonth(nextMonth);
    }
  };

  const nextMonth = () => {
    setVisibleMonth(new Date(year, month + 1, 1));
  };

  const todayIso = getTodayIso();

  return (
    <div className="relative flex-1">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        Departure
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left transition hover:border-sky-300 hover:shadow-md"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <CalendarDays size={19} />
        </div>

        <div className="flex-1">
          <div className="text-base font-bold text-slate-900">
            {formatDate(value)}
          </div>
          <div className="text-xs text-slate-400">
            Choose your travel date
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:w-80"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={previousMonth}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="font-black text-slate-900">
                {monthNames[month]} {year}
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-[11px] font-bold uppercase text-slate-400"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} />;
                }

                const iso = toIsoDate(date);
                const isPast = iso < todayIso;
                const isSelected = iso === value;

                return (
                  <motion.button
                    key={iso}
                    type="button"
                    disabled={isPast}
                    whileHover={!isPast ? { scale: 1.08 } : {}}
                    whileTap={!isPast ? { scale: 0.95 } : {}}
                    onClick={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                    className={`h-9 rounded-xl text-sm font-semibold transition ${
                      isSelected
                        ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
                        : isPast
                          ? "cursor-not-allowed text-slate-300"
                          : "text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    }`}
                  >
                    {date.getDate()}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}