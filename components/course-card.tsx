"use client";

import * as Icons from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { Course } from "@/lib/types";
import { BentoTile } from "@/components/bento-tile";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>> = {
  BookOpen: Icons.BookOpen,
  BrainCircuit: Icons.BrainCircuit,
  Code2: Icons.Code2,
  Cpu: Icons.Cpu,
  Database: Icons.Database,
  GraduationCap: Icons.GraduationCap,
  Layers3: Icons.Layers3,
  LineChart: Icons.LineChart,
  Rocket: Icons.Rocket,
  Sigma: Icons.Sigma,
  Sparkles: Icons.Sparkles
};

export function CourseCard({ course, variants }: { course: Course; variants: Variants }) {
  const Icon = iconMap[course.icon_name] ?? Icons.BookOpen;
  const progress = Math.max(0, Math.min(100, course.progress));

  return (
    <BentoTile
      as={motion.article}
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="min-h-[220px]"
    >
      <div className="relative z-10 flex h-full flex-col justify-between gap-7">
        <div className="flex items-start justify-between gap-4">
          <div className="grid size-11 place-items-center rounded-lg border border-teal-200/20 bg-teal-200/10 text-teal-100">
            <Icon size={22} aria-hidden />
          </div>
          <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-300">
            {progress}%
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-snug text-white">{course.title}</h2>
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="progress-shine h-full rounded-full bg-gradient-to-r from-teal-200 via-sky-300 to-pink-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
