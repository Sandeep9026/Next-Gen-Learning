"use client";

import {
  AlertTriangle,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Flame,
  LineChart,
  Lock,
  MonitorPlay,
  RadioTower,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  Trophy,
  Zap
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { DashboardData } from "@/lib/types";
import type { NavSection } from "@/components/sidebar";
import { BentoTile } from "@/components/bento-tile";
import { CourseCard } from "@/components/course-card";
import { ActivityGraph } from "@/components/activity-graph";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12 }
  }
};

const item = {
  hidden: { opacity: 1, y: 18 },
  show: { opacity: 1, y: 0 }
};

const focusSessions = [
  { title: "Neural warmup", time: "09:00", accent: "text-teal-100" },
  { title: "React lab", time: "11:30", accent: "text-pink-100" },
  { title: "Revision sprint", time: "17:00", accent: "text-sky-100" }
];

const skillStats = [
  { label: "React", value: 86 },
  { label: "Systems", value: 71 },
  { label: "Data UI", value: 64 },
  { label: "Testing", value: 58 }
];

const plannerItems = [
  { task: "Finish RSC notes", tag: "Today", done: true },
  { task: "Record course summary", tag: "Today", done: false },
  { task: "Ship portfolio case study", tag: "Fri", done: false },
  { task: "Mock interview drill", tag: "Sun", done: false }
];

const settings = [
  { label: "Focus mode", value: "Enabled", icon: Target },
  { label: "Streak reminders", value: "8:30 PM", icon: Bell },
  { label: "Private progress", value: "On", icon: Lock },
  { label: "Verified learning", value: "Synced", icon: ShieldCheck }
];

export function AnimatedDashboard({
  data,
  activeSection
}: {
  data: DashboardData;
  activeSection: NavSection;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={activeSection}
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {activeSection === "Home" ? <HomeView data={data} /> : null}
        {activeSection === "Courses" ? <CoursesView data={data} /> : null}
        {activeSection === "Analytics" ? <AnalyticsView data={data} /> : null}
        {activeSection === "Planner" ? <PlannerView /> : null}
        {activeSection === "Settings" ? <SettingsView /> : null}
      </motion.section>
    </AnimatePresence>
  );
}

function HomeView({ data }: { data: DashboardData }) {
  return (
    <>
      <HeroTile />
      <MetricTile icon={Flame} value="12" label="day learning streak" tone="text-orange-200" />
      <MetricTile icon={RadioTower} value={String(data.courses.length)} label="active Supabase courses" tone="text-teal-200" />
      <MetricTile icon={Zap} value="487" label="energy points this month" tone="text-yellow-100" />
      {data.error ? <SupabaseErrorTile error={data.error} /> : data.courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} variants={item} />)}
      <ActivityTile />
      <FocusQueueTile />
    </>
  );
}

function CoursesView({ data }: { data: DashboardData }) {
  return (
    <>
      <SectionHero
        title="Course Command Center"
        copy="Track every active course, progress velocity, and next action from one dense learning cockpit."
        icon={BookOpenCheck}
      />
      {data.error ? <SupabaseErrorTile error={data.error} /> : data.courses.map((course) => <CourseCard key={course.id} course={course} variants={item} />)}
      <BentoTile as={motion.article} variants={item} className="md:col-span-2">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold">Course Pipeline</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Research", "Practice", "Assessment"].map((stage, index) => (
              <article key={stage} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-zinc-400">Stage {index + 1}</p>
                <p className="mt-2 text-lg font-semibold">{stage}</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${72 - index * 13}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-200 to-pink-300"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </BentoTile>
    </>
  );
}

function AnalyticsView({ data }: { data: DashboardData }) {
  const average = data.courses.length
    ? Math.round(data.courses.reduce((total, course) => total + course.progress, 0) / data.courses.length)
    : 0;

  return (
    <>
      <SectionHero
        title="Learning Analytics"
        copy="A premium performance board for weekly momentum, skill balance, streak quality, and practice consistency."
        icon={LineChart}
      />
      <MetricTile icon={Trophy} value={`${average}%`} label="average course progress" tone="text-pink-100" />
      <MetricTile icon={Clock3} value="18.4h" label="deep work this week" tone="text-sky-100" />
      <ActivityTile />
      <BentoTile as={motion.section} variants={item} className="md:col-span-2">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold">Skill Balance</h2>
          <div className="mt-6 space-y-4">
            {skillStats.map((skill) => (
              <article key={skill.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-300">{skill.label}</span>
                  <span className="text-zinc-500">{skill.value}%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-200 via-sky-300 to-pink-300"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </BentoTile>
    </>
  );
}

function PlannerView() {
  return (
    <>
      <SectionHero
        title="Study Planner"
        copy="A focused schedule for daily execution, built around sessions, tasks, and next review windows."
        icon={CalendarCheck}
      />
      <FocusQueueTile />
      <BentoTile as={motion.section} variants={item} className="md:col-span-2">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Execution List</h2>
            <TimerReset className="text-teal-200" size={24} aria-hidden />
          </div>
          <div className="mt-5 space-y-3">
            {plannerItems.map((itemData) => (
              <article key={itemData.task} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3">
                <CheckCircle2 className={itemData.done ? "text-teal-200" : "text-zinc-600"} size={20} aria-hidden />
                <p className="min-w-0 flex-1 text-sm text-zinc-200">{itemData.task}</p>
                <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-zinc-400">{itemData.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </BentoTile>
      <BentoTile as={motion.article} variants={item}>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <MonitorPlay className="text-pink-100" size={28} aria-hidden />
          <div>
            <p className="text-4xl font-semibold">42m</p>
            <p className="mt-2 text-sm text-zinc-400">next live practice block</p>
          </div>
        </div>
      </BentoTile>
    </>
  );
}

function SettingsView() {
  return (
    <>
      <SectionHero
        title="Learning Profile"
        copy="Submission-ready settings, notification states, privacy signals, and sync status for the student dashboard."
        icon={Settings2}
      />
      {settings.map((setting) => {
        const Icon = setting.icon;
        return (
          <BentoTile key={setting.label} as={motion.article} variants={item}>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <Icon className="text-teal-200" size={28} aria-hidden />
              <div>
                <p className="text-lg font-semibold">{setting.label}</p>
                <p className="mt-2 text-sm text-zinc-400">{setting.value}</p>
              </div>
            </div>
          </BentoTile>
        );
      })}
    </>
  );
}

function HeroTile() {
  return (
    <BentoTile
      as={motion.section}
      variants={item}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="min-h-[390px] md:col-span-2 xl:col-span-2 xl:row-span-2"
    >
      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-teal-200/15 bg-teal-200/10 px-3 py-2 text-sm text-teal-100">
            <Sparkles size={16} aria-hidden />
            Today&apos;s focus window is open
          </div>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Welcome back, Aaryan
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-zinc-300">
            Your Supabase-powered learning cockpit is ready with courses, streaks, analytics, and a planner built for daily execution.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStat value="12" label="day streak" />
          <MiniStat value="84%" label="weekly goal" />
          <MiniStat value="3.2h" label="today learned" />
        </div>
      </div>
    </BentoTile>
  );
}

function SectionHero({
  title,
  copy,
  icon: Icon
}: {
  title: string;
  copy: string;
  icon: typeof Rocket;
}) {
  return (
    <BentoTile as={motion.section} variants={item} className="min-h-[260px] md:col-span-2 xl:col-span-2">
      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <Icon className="text-teal-200" size={34} aria-hidden />
        <div>
          <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">{copy}</p>
        </div>
      </div>
    </BentoTile>
  );
}

function MetricTile({
  icon: Icon,
  value,
  label,
  tone
}: {
  icon: typeof Flame;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <BentoTile as={motion.article} variants={item} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <Icon className={tone} size={28} aria-hidden />
        <div>
          <p className="text-4xl font-semibold">{value}</p>
          <p className="mt-2 text-sm text-zinc-400">{label}</p>
        </div>
      </div>
    </BentoTile>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <article className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="text-3xl font-semibold text-teal-100">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </article>
  );
}

function SupabaseErrorTile({ error }: { error: string }) {
  return (
    <BentoTile as={motion.article} variants={item} className="md:col-span-2">
      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <AlertTriangle className="text-amber-200" size={30} aria-hidden />
        <div>
          <h2 className="text-xl font-semibold">Connect Supabase to load course tiles</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{error}</p>
        </div>
      </div>
    </BentoTile>
  );
}

function ActivityTile() {
  return (
    <BentoTile as={motion.section} variants={item} className="min-h-[300px] md:col-span-2 xl:col-span-2">
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Activity Pulse</h2>
            <p className="mt-1 text-sm text-zinc-400">Contribution rhythm across the last eight weeks</p>
          </div>
          <LineChart className="shrink-0 text-sky-200" size={24} aria-hidden />
        </div>
        <ActivityGraph />
      </div>
    </BentoTile>
  );
}

function FocusQueueTile() {
  return (
    <BentoTile as={motion.section} variants={item} className="md:col-span-2">
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Focus Queue</h2>
          <BrainCircuit className="text-pink-100" size={24} aria-hidden />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {focusSessions.map((session) => (
            <article key={session.title} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className={`text-2xl font-semibold ${session.accent}`}>{session.time}</p>
              <p className="mt-2 text-sm text-zinc-400">{session.title}</p>
            </article>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}
