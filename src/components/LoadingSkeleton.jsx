
import { motion } from "framer-motion";
import { Cloud, Plane, Sparkles } from "lucide-react";

export default function LoadingSkeleton({
  fullScreen = false,
  text = "Searching the best flights for you...",
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen
          ? "fixed inset-0 z-[9999] min-h-screen bg-slate-950"
          : "min-h-[420px] w-full bg-slate-50"
      }`}
    >
      <div className="relative w-full max-w-xl px-6">
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* Decorative stars */}
          <motion.div
            className="absolute left-10 top-8 text-sky-400"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            <Sparkles size={15} />
          </motion.div>

          <motion.div
            className="absolute right-14 top-16 text-sky-300"
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: 0.5,
            }}
          >
            <Sparkles size={12} />
          </motion.div>

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-xl shadow-sky-500/30"
            >
              <Plane
                size={30}
                className="-rotate-[20deg]"
                strokeWidth={2.5}
              />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-black uppercase tracking-[0.25em] text-sky-400"
            >
              SkyBook
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-2xl font-black text-white sm:text-3xl"
            >
              Finding your perfect flight
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm font-medium text-slate-400"
            >
              {text}
            </motion.p>
          </div>

          {/* Flight path */}
          <div className="relative mx-auto mt-12 h-20 max-w-md">
            {/* Clouds */}
            <motion.div
              className="absolute left-3 top-3 text-slate-700"
              animate={{ x: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cloud size={30} />
            </motion.div>

            <motion.div
              className="absolute right-10 bottom-2 text-slate-700"
              animate={{ x: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cloud size={24} />
            </motion.div>

            {/* Flight path */}
            <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-sky-500/30" />

            {/* Animated path glow */}
            <motion.div
              className="absolute left-0 top-1/2 h-[2px] bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Moving airplane */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2"
              animate={{
                x: ["0%", "calc(100% - 36px)"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  y: [0, -3, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/40"
              >
                <Plane
                  size={18}
                  className="rotate-0"
                  strokeWidth={2.5}
                />
              </motion.div>
            </motion.div>

            {/* Destination dots */}
            <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.7)]" />

            <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-sky-400 bg-slate-950" />
          </div>

          {/* Loading progress */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
              <span className="text-slate-500">
                Scanning airlines
              </span>

              <motion.span
                className="text-sky-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
              >
                Please wait
              </motion.span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-sky-500"
                initial={{ width: "5%" }}
                animate={{ width: ["5%", "75%", "100%", "5%"] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Bottom text */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live fare comparison
            <span className="text-slate-700">•</span>
            Secure search
          </div>
        </div>
      </div>
    </div>
  );
}