"use client";

import { useState } from "react";
import { GraduationCap, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingLogo() {
  const [open, setOpen] = useState(false);

  return (
    <motion.aside
      drag
      dragMomentum={false}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed right-4 top-4 z-50 hidden touch-none select-none sm:block"
      aria-label="Floating NovaLearn launcher"
    >
      <AnimatePresence>
        {open ? (
          <motion.section
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="mb-3 w-64 rounded-lg border border-white/10 bg-zinc-950/90 p-4 text-white shadow-glow backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-300 text-zinc-950 shadow-[0_0_26px_rgba(45,212,191,0.28)]">
                <GraduationCap size={20} aria-hidden />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-md text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close floating logo panel"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <h2 className="mt-4 text-base font-semibold">NovaLearn</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Drag this launcher anywhere while exploring the student dashboard.
            </p>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="group relative grid size-14 place-items-center rounded-lg border border-teal-200/25 bg-zinc-950/90 text-teal-100 shadow-glow backdrop-blur-xl"
        aria-expanded={open}
        aria-label="Open floating NovaLearn logo panel"
      >
        <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-300/20 via-sky-300/10 to-pink-300/20 opacity-80 transition-opacity group-hover:opacity-100" />
        <Sparkles className="absolute -right-1 -top-1 text-pink-200" size={16} aria-hidden />
        <span className="relative z-10 text-lg font-black leading-none">N</span>
      </motion.button>
    </motion.aside>
  );
}
