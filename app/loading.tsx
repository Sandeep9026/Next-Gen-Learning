import { DashboardSkeleton } from "@/components/dashboard-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6">
      <DashboardSkeleton />
    </main>
  );
}
