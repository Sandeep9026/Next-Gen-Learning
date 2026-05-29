import { Suspense } from "react";
import { DashboardContent } from "@/components/dashboard-content";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-4 pb-24 text-white sm:px-6 lg:pb-4">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
