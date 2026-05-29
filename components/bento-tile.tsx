"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoTileProps = Omit<HTMLMotionProps<"article">, "children"> & {
  as?: typeof motion.article | typeof motion.section;
  children: ReactNode;
};

export function BentoTile({ as: Component = motion.article, className, children, ...props }: BentoTileProps) {
  return (
    <Component
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "grain-overlay group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-glow backdrop-blur-xl",
        "before:transition-opacity hover:border-teal-200/35 hover:bg-white/[0.075] hover:shadow-violet-glow",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-grain opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-px rounded-lg border border-white/[0.03]" />
      {children}
    </Component>
  );
}
