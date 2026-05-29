"use client";

import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-white">
      <section className="max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-glow backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-teal-200/70">Dashboard interrupted</p>
        <h1 className="mt-3 text-2xl font-semibold">Something paused the learning feed.</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-teal-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-200"
        >
          <RotateCcw size={16} aria-hidden />
          Retry
        </button>
      </section>
    </main>
  );
}
