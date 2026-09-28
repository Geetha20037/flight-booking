import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";

export default function FlightSort({ value, onChange }) {
  return (
    <motion.div
      layout
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2"
    >
      <ArrowDownUp size={16} className="text-slate-400" />

      <span className="hidden text-xs font-bold uppercase tracking-wider text-slate-400 sm:block">
        Sort by
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent py-1 text-sm font-bold text-slate-700 outline-none"
      >
        <option value="recommended">Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="duration">Shortest Duration</option>
        <option value="departure">Earliest Departure</option>
        <option value="rating">Highest Rated</option>
      </select>
    </motion.div>
  );
}