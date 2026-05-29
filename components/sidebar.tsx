"use client";
import { BarChart3, BookOpen, CalendarDays, Home, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type NavSection = "Home" | "Courses" | "Analytics" | "Planner" | "Settings";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Courses", icon: BookOpen },
  { label: "Analytics", icon: BarChart3 },
  { label: "Planner", icon: CalendarDays },
  { label: "Settings", icon: Settings }
] satisfies Array<{ label: NavSection; icon: typeof Home }>;

export function Sidebar({
  active,
  onSelect
}: {
  active: NavSection;
  onSelect: (section: NavSection) => void;
}) {
  return (
    <>
      <div className="fixed left-4 top-4 z-50 flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-950/90 p-2 shadow-glow backdrop-blur-xl lg:hidden">
        <BrandMark />
        <div>
          <p className="text-sm font-semibold text-white">NovaLearn</p>
          <p className="text-xs text-zinc-500">Student OS</p>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="fixed inset-x-4 bottom-4 z-30 rounded-lg border border-white/10 bg-zinc-950/86 p-2 shadow-glow backdrop-blur-xl lg:static lg:inset-auto lg:flex lg:h-[calc(100vh-2rem)] lg:w-20 lg:shrink-0 lg:flex-col lg:items-center lg:rounded-lg lg:py-4 xl:w-64 xl:items-stretch"
      >
        <div className="hidden items-center gap-3 lg:mb-8 lg:flex xl:px-3">
          <BrandMark />
          <div className="hidden xl:block">
            <p className="text-sm font-semibold text-white">NovaLearn</p>
            <p className="text-xs text-zinc-500">Student OS</p>
          </div>
        </div>

        <div className="flex justify-between gap-1 lg:flex-col xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(item.label)}
                className={cn(
                  "relative flex h-12 flex-1 items-center justify-center rounded-md px-3 text-sm text-zinc-400 transition-colors lg:flex-none xl:justify-start xl:gap-3",
                  isActive && "text-white"
                )}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-md border border-teal-200/15 bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <Icon className="relative z-10" size={20} aria-hidden />
                <span className="relative z-10 hidden xl:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function BrandMark() {
  return (
    <div
      aria-label="NovaLearn logo"
      className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-300 text-zinc-950 shadow-[0_0_26px_rgba(45,212,191,0.28)]"
    >
      <span className="text-base font-black leading-none">N</span>
    </div>
  );
}
