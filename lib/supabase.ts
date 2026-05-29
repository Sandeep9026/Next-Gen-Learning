import { createClient } from "@supabase/supabase-js";
import type { Course, DashboardData } from "@/lib/types";

export async function getCourses(): Promise<DashboardData> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      courses: [],
      error:
        "Supabase environment variables are not configured. Copy .env.example to .env.local and add your project URL and anon key."
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data, error } = await supabase
    .from("courses")
    .select("id,title,progress,icon_name,created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return {
      courses: [],
      error: `Unable to load Supabase courses: ${error.message}`
    };
  }

  return {
    courses: (data ?? []) as Course[]
  };
}
