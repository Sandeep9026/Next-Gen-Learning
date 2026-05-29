"use client";

import { useState } from "react";
import { Sidebar, type NavSection } from "@/components/sidebar";
import { AnimatedDashboard } from "@/components/animated-dashboard";
import { FloatingLogo } from "@/components/floating-logo";
import type { DashboardData } from "@/lib/types";

export function DashboardApp({ data }: { data: DashboardData }) {
  const [activeSection, setActiveSection] = useState<NavSection>("Home");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl gap-4">
      <Sidebar active={activeSection} onSelect={setActiveSection} />
      <FloatingLogo />
      <main className="min-w-0 flex-1" aria-label={`${activeSection} dashboard`}>
        <AnimatedDashboard data={data} activeSection={activeSection} />
      </main>
    </div>
  );
}
