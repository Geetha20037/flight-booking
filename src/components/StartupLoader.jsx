
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const routePoints = [
  { x: "8%", y: "68%" },
  { x: "24%", y: "42%" },
  { x: "39%", y: "58%" },
  { x: "54%", y: "28%" },
  { x: "70%", y: "45%" },
  { x: "88%", y: "22%" },
];

export default function StartupLoader() {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true);
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={
        finished
          ? {
              opacity: 0,
              scale: 1.08,
              filter: "blur(8px)",
            }
          : {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="fixed inset-0 z-[99999] overflow-hidden bg-[#020617]"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Main route area */}
      <div className="absolute inset-0">
        {/* Connecting route lines */}
        {routePoints.slice(0, -1).map((point, index) => {
          const next = routePoints[index + 1];

          return (
            <motion.div
              key={`line-${index}`}
              className="absolute origin-left border-t border-dashed border-sky-400/30"
              style={{
                left: point.x,
                top: point.y,
                width: "18%",
                transform: `rotate(${
                  index % 2 === 0 ? -10 : 12
                }deg)`,
              }}
              initial={{
                scaleX: 0,
                opacity: 0,
              }}
              animate={{
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.45 + index * 0.28,
                duration: 0.55,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Route points */}
        {routePoints.map((point, index) => (
          <motion.div
            key={`point-${index}`}
            className="absolute"
            style={{
              left: point.x,
              top: point.y,
            }}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.25 + index * 0.28,
              duration: 0.45,
              type: "spring",
              stiffness: 220,
            }}
          >
            {/* Pulse */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-sky-400/20"
              animate={{
                scale: [0.7, 1.6],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />

            <div className="relative h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
          </motion.div>
        ))}

        {/* Moving route scanner */}
        <motion.div
          className="absolute top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-sky-400/60 to-transparent"
          initial={{ left: "-5%" }}
          animate={{ left: "105%" }}
          transition={{
            duration: 2.8,
            ease: "linear",
          }}
        />
      </div>

      {/* Center branding */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative text-center">
          {/* Orbit ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/10"
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 360,
            }}
            transition={{
              scale: {
                delay: 0.3,
                duration: 1,
              },
              opacity: {
                delay: 0.3,
                duration: 1,
              },
              rotate: {
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />

          {/* Center mark */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              rotate: -12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 1.2,
              duration: 0.7,
              type: "spring",
              stiffness: 160,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(14,165,233,0.15)",
                  "0 0 55px rgba(14,165,233,0.45)",
                  "0 0 20px rgba(14,165,233,0.15)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-sky-400/30 bg-sky-500/10 backdrop-blur-xl"
            >
              <span className="text-2xl font-black tracking-tighter text-sky-400">
                SB
              </span>
            </motion.div>
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
              letterSpacing: "0.8em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.18em",
            }}
            transition={{
              delay: 1.45,
              duration: 0.8,
            }}
            className="mt-7"
          >
            <h1 className="text-4xl font-black text-white sm:text-5xl">
              SKYBOOK
            </h1>

            <p className="mt-3 text-[10px] font-bold uppercase text-slate-500">
              Your journey, beautifully connected
            </p>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 2,
            }}
            className="mt-8"
          >
            <div className="flex items-center justify-center gap-2">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-sky-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Mapping your journey
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-10 left-1/2 w-52 -translate-x-1/2">
        <div className="mb-2 flex justify-between text-[8px] font-bold uppercase tracking-widest text-slate-600">
          <span>Initializing</span>
          <span>Ready</span>
        </div>

        <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            initial={{
              width: "0%",
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}