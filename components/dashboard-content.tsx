import { getCourses } from "@/lib/supabase";
import { DashboardApp } from "@/components/dashboard-app";

export async function DashboardContent() {
  const dashboardData = await getCourses();

  return <DashboardApp data={dashboardData} />;
}
