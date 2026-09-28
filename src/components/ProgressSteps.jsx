import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  UserRound,
  Armchair,
} from "lucide-react";

const steps = [
  {
    id: 1,
    label: "Passenger",
    icon: UserRound,
  },
  {
    id: 2,
    label: "Seat",
    icon: Armchair,
  },
  {
    id: 3,
    label: "Payment",
    icon: CreditCard,
  },
  {
    id: 4,
    label: "Confirmation",
    icon: Check,
  },
];

export default function ProgressSteps({ activeStep }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl">
      <div className="relative flex items-start justify-between">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-200" />

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          className="absolute left-0 top-5 h-0.5 bg-sky-600"
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const completed = step.id < activeStep;
          const current = step.id === activeStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: current ? 1.08 : 1,
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                  completed || current
                    ? "bg-sky-600 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                <Icon size={16} />
              </motion.div>

              <span
                className={`mt-2 text-xs font-bold ${
                  current || completed
                    ? "text-sky-600"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}