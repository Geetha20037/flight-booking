import { motion } from "framer-motion";
import { Wifi, CreditCard as CreditCardIcon } from "lucide-react";

export default function CreditCard({
  cardNumber = "",
  cardHolder = "",
  expiry = "",
  cvv = "",
  flipped = false,
}) {
  const formattedNumber =
    cardNumber
      .replace(/\D/g, "")
      .match(/.{1,4}/g)
      ?.join(" ") || "•••• •••• •••• ••••";

  return (
    <div
      className="mx-auto h-56 w-full max-w-sm"
      style={{
        perspective: "1200px",
      }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/20 blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                SkyBook
              </p>

              <p className="mt-1 text-sm font-bold">
                Travel Card
              </p>
            </div>

            <Wifi
              size={27}
              className="rotate-90 text-sky-300"
            />
          </div>

          <div className="relative mt-8">
            <p className="font-mono text-xl font-semibold tracking-wider sm:text-2xl">
              {formattedNumber}
            </p>
          </div>

          <div className="relative mt-7 flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">
                Card Holder
              </p>

              <p className="mt-1 max-w-[190px] truncate text-sm font-bold uppercase">
                {cardHolder || "YOUR NAME"}
              </p>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">
                Expires
              </p>

              <p className="mt-1 text-sm font-bold">
                {expiry || "MM/YY"}
              </p>
            </div>

            <CreditCardIcon
              size={28}
              className="text-sky-300"
            />
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mt-8 h-12 bg-black/70" />

          <div className="px-6 pt-5">
            <div className="flex items-center gap-3">
              <div className="h-9 flex-1 rounded-lg bg-white/90" />

              <div className="w-16 rounded-lg bg-white px-2 py-2 text-right text-xs font-black text-slate-900">
                {cvv || "•••"}
              </div>
            </div>

            <p className="mt-5 text-right text-[10px] text-slate-400">
              CVV
            </p>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] text-slate-400">
            <span>Secure payment</span>
            <span>SkyBook</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}