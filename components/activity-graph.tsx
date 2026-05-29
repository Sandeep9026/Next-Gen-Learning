"use client";

import { motion } from "framer-motion";

const activity = [
  1, 2, 4, 3, 0, 2, 5, 2, 3, 5, 4, 2, 1, 4, 5, 3, 2, 0, 1, 3, 4, 5, 4, 2, 3, 1, 2, 4,
  5, 5, 3, 2, 1, 0, 2, 3, 4, 3, 5, 4, 2, 3, 1, 2, 4, 5, 3, 2, 1, 4, 5, 3, 2, 1, 3, 4
];

const tones = [
  "bg-white/8",
  "bg-teal-300/20",
  "bg-teal-300/35",
  "bg-sky-300/45",
  "bg-pink-300/55",
  "bg-teal-100/80"
];

export function ActivityGraph() {
  return (
    <div className="mt-7 grid flex-1 grid-cols-8 gap-2 sm:grid-cols-14">
      {activity.map((level, index) => (
        <motion.span
          key={`${level}-${index}`}
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20, delay: index * 0.01 }}
          className={`aspect-square rounded-[4px] ${tones[level]} ring-1 ring-white/5`}
          aria-label={`Activity level ${level}`}
        />
      ))}
    </div>
  );
}
