import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Check, X, Clock, Truck, Users, Phone, Zap, CheckCircle,
  CalendarDays, DollarSign, AlertCircle, MessageCircle, CheckCircle2,
  Home, Layers, Heart, Star, User as UserIcon,
} from "lucide-react";

/* ---------- Primitives ---------- */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] text-[#2563EB] mb-4">
      {children}
    </div>
  );
}

export function Button({
  children, variant = "primary", size = "md", href, onClick, className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-9 py-4 text-[17px]",
    xl: "px-11 py-[18px] text-[19px]",
  };
  const variants = {
    primary: "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)]",
    secondary: "bg-transparent border-[1.5px] border-[#CBD5E1] text-[#0F172A] hover:border-[#0F172A]",
  };
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) return <a href={href} className={cls} onClick={onClick}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

function useCounter(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const steps = 40;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVal(Math.round((target * i) / steps));
      if (i >= steps) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [target, start, duration]);
  return val;
}

/* ---------- Scarcity Banner ---------- */

export function ScarcityBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-700 to-blue-600 text-white text-[13px] sm:text-sm font-medium py-2.5 px-4 text-center">
      <span className="pulse-dot inline-block mr-2">●</span>
      Currently accepting 3 roofing companies for our pilot program — 1 spot remaining
    </div>
  );
}

/* ---------- Navbar ---------- */

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center shrink-0"
      style={{
        width: size, height: size, borderRadius: 8,
        background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
      }}
    >
      <Home size={size * 0.56} color="white" strokeWidth={2.2} />
    </div>
  );
}

export function Navbar() {
  return (
    <header
      className="sticky z-50 backdrop-blur-md border-b border-[#E2E8F0]"
      style={{ top: 40, background: "rgba(248,250,252,0.92)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 min-w-0">
          <LogoMark />
          <span className="text-[16px] font-bold tracking-[-0.02em] truncate">
            <span className="text-[#0F172A]">Roof Revenue</span>{" "}
            <span className="text-[#2563EB]">Recovery</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {[
            ["How It Works", "#how-it-works"],
            ["Results", "#results"],
            ["Pilot Program", "#pilot"],
            ["FAQ", "#faq"],
          ].map(([t, h]) => (
            <a key={h} href={h} className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t}</a>
          ))}
        </nav>
        <Button href="#pilot" size="sm">Book Free Pilot</Button>
      </div>
    </header>
  );
}

/* ---------- Dashboard Mockup ---------- */

type Activity = { color: string; text: string; time: string };
const ACTIVITIES: Activity[] = [
  { color: "#10B981", text: "Inspection booked — Oak Street", time: "2m ago" },
  { color: "#2563EB", text: "Lead qualified — Maple Ave", time: "8m ago" },
  { color: "#F59E0B", text: "New estimate request received", time: "14m ago" },
  { color: "#10B981", text: "Inspection booked — River Rd", time: "23m ago" },
  { color: "#2563EB", text: "Lead qualified — Cedar Ln", time: "31m ago" },
];

export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const leads = useCounter(7, inView);
  const insp = useCounter(5, inView);
  const rev = useCounter(42, inView);
  const [feed, setFeed] = useState<Activity[]>(ACTIVITIES.slice(0, 3));
  const [idx, setIdx] = useState(3);

  useEffect(() => {
    const id = setInterval(() => {
      setFeed((f) => [ACTIVITIES[idx % ACTIVITIES.length], ...f].slice(0, 3));
      setIdx((i) => i + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [idx]);

  return (
    <div
      ref={ref}
      className="bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden"
      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(37,99,235,0.06)" }}
    >
      <div className="bg-[#0F172A] px-4 py-3 flex items-center gap-2.5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        </div>
        <span className="ml-2 text-xs text-[#94A3B8] font-mono truncate">
          Roof Revenue Recovery — Live Dashboard
        </span>
      </div>
      <div className="bg-[#0F172A] p-5">
        <div className="grid grid-cols-2 gap-3">
          <Tile label="New Leads Today" value={String(leads)} sub="+3 vs yesterday" />
          <Tile label="Avg. Response" value="< 2min" sub="Before competitors" />
          <Tile label="Inspections Scheduled" value={String(insp)} sub="This week" />
          <Tile label="Revenue Recovered" value={`$${rev}k`} sub="Est. pipeline value" accent />
        </div>
        <div
          className="mt-3 rounded-xl p-3.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="text-[11px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold mb-2.5">
            Live Activity
          </div>
          <div className="space-y-2.5">
            <AnimatePresence initial={false}>
              {feed.map((a, i) => (
                <motion.div
                  key={`${a.text}-${idx}-${i}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                  <span className="text-[13px] text-[#E2E8F0] flex-1 min-w-0 truncate">{a.text}</span>
                  <span className="text-[11px] text-[#64748B] shrink-0">{a.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: accent ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${accent ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <div className="text-[11px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold mb-2">{label}</div>
      <div className="text-white font-extrabold text-[28px] sm:text-[32px] leading-none mb-1.5">{value}</div>
      <div className="text-[11px]" style={{ color: accent ? "#93C5FD" : "#10B981" }}>{sub}</div>
    </div>
  );
}

/* ---------- Hero ---------- */

export function HeroSection() {
  return (
    <section
      className="relative pt-24 pb-20 px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.12) 0%, transparent 70%), linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 40%, #F8FAFC 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#2563EB] mb-7"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] pulse-dot" />
            Revenue Recovery for Roofing Companies
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="font-black text-[#0F172A] tracking-[-0.03em] leading-[1.08] mb-6"
            style={{ fontSize: "clamp(36px, 5.6vw, 58px)" }}>
            Stop Losing Roofing Leads<br />to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)" }}
            >Faster Competitors</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[18px] text-[#475569] leading-[1.65] mb-8 max-w-[480px]">
            Every week, roofing companies lose potential jobs because estimate requests go unanswered too long. Keep homeowners engaged while they're actively looking for a contractor.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-3">
            <Button href="#pilot" size="lg">Book Free Pilot <ArrowRight size={18} /></Button>
            <Button href="#how-it-works" variant="secondary" size="lg">See How It Works</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-x-7 gap-y-2 mt-10">
            {["No setup fee", "No long-term commitment", "Measure real results"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
                <Check size={16} className="text-[#10B981]" /> {t}
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Problem Section (timeline) ---------- */

type TLEvent = { color: string; time: string; title: string; sub?: string; subRed?: boolean };

function Timeline({ events }: { events: TLEvent[] }) {
  return (
    <div className="space-y-5">
      {events.map((e, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center shrink-0">
            <span className="w-3 h-3 rounded-full mt-1.5" style={{ background: e.color }} />
            {i < events.length - 1 && <span className="w-px flex-1 mt-1 bg-[#E2E8F0]" style={{ minHeight: 24 }} />}
          </div>
          <div className="pb-1">
            <div className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-0.5">{e.time}</div>
            <div className="text-[15px] font-semibold text-[#0F172A]">{e.title}</div>
            {e.sub && <div className={`text-[13px] mt-0.5 ${e.subRed ? "text-[#DC2626] font-medium" : "text-[#64748B]"}`}>{e.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProblemSection() {
  return (
    <section id="results" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14 max-w-[760px] mx-auto">
          <SectionLabel>The Real Problem</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            What Happens When a Homeowner Requests a Quote?
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div {...fadeUp} className="rounded-[20px] overflow-hidden bg-white" style={{ border: "1.5px solid #FEE2E2" }}>
            <div className="flex items-center gap-3 px-6 py-4 bg-[#FEF2F2]" style={{ borderBottom: "1px solid #FEE2E2" }}>
              <span className="w-7 h-7 rounded-lg bg-[#EF4444] grid place-items-center"><X size={16} color="white" /></span>
              <span className="text-[15px] font-bold text-[#991B1B]">Without Roof Revenue Recovery</span>
            </div>
            <div className="p-7">
              <Timeline events={[
                { color: "#94A3B8", time: "2:14 PM", title: "Homeowner requests estimate" },
                { color: "#F59E0B", time: "2:30 PM", title: "Contacts three competitors", sub: "While waiting for your reply" },
                { color: "#EF4444", time: "4:45 PM", title: "Competitor responds first", sub: "Books the inspection" },
                { color: "#991B1B", time: "Next Day", title: "Your team follows up", sub: '"We already went with someone else."', subRed: true },
              ]} />
              <div className="mt-6 rounded-lg px-4 py-3 text-center text-[14px] font-bold text-[#991B1B]"
                style={{ background: "#FEF2F2", border: "1px solid #FEE2E2" }}>
                Outcome: Opportunity Lost — $8,000–$18,000 job gone
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.15 }} className="rounded-[20px] overflow-hidden bg-white" style={{ border: "1.5px solid #A7F3D0" }}>
            <div className="flex items-center gap-3 px-6 py-4 bg-[#ECFDF5]" style={{ borderBottom: "1px solid #A7F3D0" }}>
              <span className="w-7 h-7 rounded-lg bg-[#10B981] grid place-items-center"><Check size={16} color="white" /></span>
              <span className="text-[15px] font-bold text-[#065F46]">With Roof Revenue Recovery</span>
            </div>
            <div className="p-7">
              <Timeline events={[
                { color: "#94A3B8", time: "2:14 PM", title: "Estimate submitted" },
                { color: "#10B981", time: "2:14 PM — Instant", title: "Immediate engagement", sub: "Homeowner gets a response before they move on" },
                { color: "#2563EB", time: "2:16 PM", title: "Lead qualified", sub: "Job type, urgency, address confirmed" },
                { color: "#10B981", time: "2:18 PM", title: "Inspection scheduled", sub: "Date confirmed, added to your calendar" },
              ]} />
              <div className="mt-6 rounded-lg px-4 py-3 text-center text-[14px] font-bold text-[#065F46]"
                style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
                Outcome: Inspection Booked — Opportunity stays active ✓
              </div>
            </div>
          </motion.div>
        </div>
        <motion.p {...fadeUp} className="text-center max-w-[560px] mx-auto mt-10 text-[15px] text-[#64748B] leading-[1.65]">
          The homeowner didn't leave because of price. They left because someone else responded first. This is a solvable problem.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Hidden Cost ---------- */

export function HiddenCostSection() {
  const items = [
    { border: "#F59E0B", iconBg: "#FEF3C7", iconColor: "#D97706", Icon: Clock, title: "Owner on Inspection", body: "You're on a roof assessing storm damage. A homeowner just submitted a request on your website. They'll wait about 20 minutes before trying the next company." },
    { border: "#EF4444", iconBg: "#FEF2F2", iconColor: "#DC2626", Icon: Truck, title: "Driving Between Jobs", body: "You're on the road managing three crews. Three missed calls went to voicemail. Two of those callers already have someone coming out tomorrow." },
    { border: "#2563EB", iconBg: "#EFF6FF", iconColor: "#2563EB", Icon: Users, title: "Managing Crews", body: "Material delivery, crew scheduling, job site issues — your attention goes where it's needed most. Following up new leads at 2pm on a Tuesday isn't always possible." },
  ];
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14 max-w-[700px] mx-auto">
          <SectionLabel>The Gap</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            The Hidden Cost of Slow Follow-Up
          </h2>
          <p className="text-[17px] text-[#64748B]">Your team is out doing the work. Meanwhile, new opportunities sit waiting.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-7 transition-shadow"
              style={{ border: "1px solid #E2E8F0", borderLeft: `4px solid ${it.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl grid place-items-center mb-4" style={{ background: it.iconBg }}>
                <it.Icon size={20} color={it.iconColor} />
              </div>
              <h3 className="text-[17px] font-bold text-[#0F172A] mb-2">{it.title}</h3>
              <p className="text-[14px] text-[#64748B] leading-[1.65]">{it.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-12 rounded-[20px] p-10 text-center"
          style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
          <p className="text-white text-[19px] sm:text-[21px] font-semibold leading-[1.5] max-w-[680px] mx-auto">
            "You're not losing leads because your prices are wrong or your work isn't good. You're losing them because you were busy doing the job — and someone else picked up the phone first."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

function CountStat({ value, suffix = "", isInView }: { value: number; suffix?: string; isInView: boolean }) {
  const v = useCounter(value, isInView);
  return <>{v}{suffix}</>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto" ref={ref}>
        <motion.div {...fadeUp} className="text-center mb-14">
          <SectionLabel>Industry Reality</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            The Numbers Don't Lie
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { big: <><CountStat value={78} isInView={inView} />%</>, size: "64px", desc: "of homeowners choose the first roofing company that responds" },
            { big: "$8k–18k", size: "40px", desc: "average value of a missed residential roof replacement job" },
            { big: <><CountStat value={5} isInView={inView} />×</>, size: "64px", desc: "more likely to book an inspection when you respond within 5 minutes" },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -3 }}
              className="bg-white rounded-[20px] p-9 text-center"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div className="font-black text-[#0F172A] tracking-[-0.03em] leading-none" style={{ fontSize: s.size }}>{s.big}</div>
              <div className="w-12 h-[3px] rounded-sm mx-auto mt-4" style={{ background: "linear-gradient(90deg, #2563EB, #10B981)" }} />
              <p className="mt-5 text-[15px] text-[#64748B] leading-[1.55]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-10 bg-white rounded-[20px] p-8" style={{ border: "1px solid #E2E8F0" }}>
          <div className="text-center text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.06em] mb-5">
            If this recovers even one roof replacement — it pays for itself many times over
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-[#E2E8F0]">
            {[
              { v: "+2", c: "#10B981", l: "Extra jobs/month needed to see ROI" },
              { v: "< 2m", c: "#2563EB", l: "Average response time" },
              { v: "24/7", c: "#0F172A", l: "Coverage — even after hours" },
              { v: "$0", c: "#0F172A", l: "Setup fee during pilot" },
            ].map((m, i) => (
              <div key={i} className="text-center px-3">
                <div className="font-extrabold text-[28px]" style={{ color: m.c }}>{m.v}</div>
                <div className="text-[12px] text-[#64748B] mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */

export function HowItWorksSection() {
  const steps = [
    { Icon: Phone, title: "Lead Calls or Submits Estimate Request", body: "A homeowner finds you online, sees your truck, or gets a referral. They call or fill out a form. This moment is the starting gun." },
    { Icon: Zap, title: "Immediate Engagement — Within Minutes", body: "Before the homeowner can try the next roofing company, they hear from yours. No delays. No waiting. They stay focused on you." },
    { Icon: CheckCircle, title: "Lead Qualification", body: "Job type, roof size, urgency, address, and timeline are confirmed. Your team gets a warm, qualified lead — not a cold call back to a stranger." },
    { Icon: CalendarDays, title: "Inspection Scheduled", body: "A date and time is agreed while the homeowner is engaged and still excited. The appointment lands on your calendar. No back-and-forth phone tag." },
    { Icon: DollarSign, title: "More Roofing Jobs Won", body: "You show up to a scheduled inspection. The homeowner already trusts you. You close the job. That's recovered revenue that would have gone to a competitor." },
  ];
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-[900px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14">
          <SectionLabel>The System</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            How It Works
          </h2>
          <p className="text-[17px] text-[#64748B]">Five steps from missed opportunity to booked inspection.</p>
        </motion.div>
        <div>
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-xl grid place-items-center"
                    style={{ background: last ? "#10B981" : "#2563EB" }}>
                    <s.Icon size={20} color="white" />
                  </div>
                  {!last && <div className="w-[2px] flex-1" style={{ minHeight: 40, background: "linear-gradient(180deg, #2563EB, rgba(37,99,235,0.1))" }} />}
                </div>
                <div className="pt-1.5 pb-10 flex-1 min-w-0">
                  <div className="text-[12px] font-bold uppercase tracking-[0.08em] mb-1.5"
                    style={{ color: last ? "#10B981" : "#2563EB" }}>
                    Step {i + 1}
                  </div>
                  <h3 className="text-[20px] font-bold text-[#0F172A] mb-2">{s.title}</h3>
                  <p className="text-[15px] text-[#64748B] leading-[1.65]">{s.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Live Demo ---------- */

export function LiveDemoSection() {
  const cards = [
    { Icon: AlertCircle, color: "#2563EB", bg: "rgba(37,99,235,0.15)", title: "Missed Opportunity Detected", sub: "Unanswered call or unread estimate request", badge: { t: "Triggered", c: "#2563EB", bg: "rgba(37,99,235,0.2)" }, glow: "blue" },
    { Icon: Zap, color: "#10B981", bg: "rgba(16,185,129,0.15)", title: "Immediate Follow-Up Initiated", sub: "Homeowner reached before competitors can respond" },
    { Icon: MessageCircle, color: "#F59E0B", bg: "rgba(245,158,11,0.15)", title: "Homeowner Responds", sub: "Engagement confirmed — job details collected" },
    { Icon: CalendarDays, color: "#2563EB", bg: "rgba(37,99,235,0.15)", title: "Inspection Scheduled", sub: "Date confirmed, added to your calendar" },
    { Icon: CheckCircle2, color: "#10B981", bg: "rgba(16,185,129,0.15)", title: "Revenue Opportunity Recovered", sub: "Lead stayed with your company — not a competitor", badge: { t: "Won ✓", c: "#10B981", bg: "rgba(16,185,129,0.2)" }, glow: "green" },
  ];
  return (
    <section className="py-24 px-6" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
      <div className="max-w-[800px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#93C5FD] mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] pulse-dot" />
            Live System Demo
          </div>
          <h2 className="font-extrabold text-white tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Watch What Happens in Real Time
          </h2>
          <p className="text-[17px] text-[#94A3B8]">This is the workflow triggered every time a homeowner reaches out.</p>
        </motion.div>
        <div className="flex flex-col items-stretch">
          {cards.map((c, i) => (
            <div key={i}>
              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl p-4 flex items-center gap-3.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${c.glow === "blue" ? "rgba(37,99,235,0.5)" : c.glow === "green" ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.1)"}`,
                  boxShadow: c.glow === "blue" ? "0 0 0 3px rgba(37,99,235,0.1)" : c.glow === "green" ? "0 0 0 3px rgba(16,185,129,0.1)" : undefined,
                }}>
                <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0" style={{ background: c.bg }}>
                  <c.Icon size={18} color={c.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-semibold text-white">{c.title}</div>
                  <div className="text-[13px] text-[#94A3B8]">{c.sub}</div>
                </div>
                {c.badge && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: c.badge.bg, color: c.badge.c }}>
                    {c.badge.t}
                  </span>
                )}
              </motion.div>
              {i < cards.length - 1 && (
                <div className="mx-auto w-[2px] h-6" style={{ background: `linear-gradient(180deg, ${c.color}, rgba(255,255,255,0.05))` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits ---------- */

export function BenefitsSection() {
  const items = [
    { Icon: CalendarDays, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", title: "Book More Inspections", body: "Turn more estimate requests into confirmed appointments without chasing leads manually." },
    { Icon: Clock, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", title: "Respond Faster Than Competitors", body: "Be the first roofing company in the homeowner's mind — while your competitors are still checking their phones." },
    { Icon: Home, color: "#D97706", bg: "linear-gradient(135deg, #FEF3C7, #FDE68A)", title: "Recover Missed Opportunities", body: "Stop watching jobs go to competitors because you were on a roof or driving between sites." },
    { Icon: Layers, color: "#16A34A", bg: "linear-gradient(135deg, #F0FDF4, #DCFCE7)", title: "Reduce Manual Follow-Up", body: "Your team focuses on running jobs. The follow-up system works while you work." },
    { Icon: DollarSign, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", title: "Increase Revenue Without New Hires", body: "Win more jobs from leads you're already generating — without adding office staff or overhead." },
    { Icon: Heart, color: "#7C3AED", bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", title: "Stay Top of Mind With Homeowners", body: "Consistent, timely engagement builds trust — even before you've set foot on their property." },
  ];
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14 max-w-[700px] mx-auto">
          <SectionLabel>What You Get</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Built Around Your Business Outcomes
          </h2>
          <p className="text-[17px] text-[#64748B]">No technology to manage. No learning curve. Just more booked inspections.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-7 transition-shadow"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: it.bg }}>
                <it.Icon size={22} color={it.color} />
              </div>
              <h3 className="text-[17px] font-bold text-[#0F172A] mb-2">{it.title}</h3>
              <p className="text-[14px] text-[#64748B] leading-[1.65]">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pilot ---------- */

export function PilotSection() {
  return (
    <section id="pilot" className="py-24 px-6 bg-white">
      <div className="max-w-[900px] mx-auto relative overflow-hidden rounded-3xl text-center"
        style={{ background: "linear-gradient(135deg, #EFF6FF, #F0FDF4)", border: "1.5px solid #BFDBFE", padding: "56px 32px" }}>
        <div className="pointer-events-none absolute" style={{ top: -50, right: -50, width: 200, height: 200, background: "radial-gradient(circle, rgba(37,99,235,0.1), transparent 70%)" }} />
        <div className="pointer-events-none absolute" style={{ bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)" }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold mb-6"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#DC2626" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] pulse-dot" />
            Only 3 Spots Available — 1 Remaining
          </div>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Looking For 3 Roofing Companies
          </h2>
          <p className="text-[18px] text-[#475569] max-w-[600px] mx-auto leading-[1.6] mb-10">
            We're working with a small number of roofing companies to test and measure how improved response times impact booked inspections and revenue opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
            {[
              { t: "No Setup Fee", s: "Zero cost to get started" },
              { t: "No Long-Term Commitment", s: "Test it, measure it, decide" },
              { t: "Real Results Tracked", s: "You see what changed" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg grid place-items-center bg-[#ECFDF5]"><Check size={18} className="text-[#10B981]" /></span>
                <div className="text-left">
                  <div className="text-[15px] font-bold text-[#0F172A]">{x.t}</div>
                  <div className="text-[13px] text-[#64748B]">{x.s}</div>
                </div>
              </div>
            ))}
          </div>
          <Button href="mailto:hello@roofrevrecovery.com?subject=Pilot Program Application" size="lg">
            Book Your Free Pilot <ArrowRight size={18} />
          </Button>
          <p className="text-[13px] text-[#94A3B8] mt-5">
            No payment. No technical setup required. Just a 20-minute discovery call.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Metrics ---------- */

export function MetricsSection() {
  const tiles = [
    { e: "📥", t: "Estimate Requests", s: "Total leads received per week" },
    { e: "⚡", t: "Response Times", s: "How fast each lead is engaged" },
    { e: "🔄", t: "Opportunities Recovered", s: "Leads re-engaged vs would-be lost" },
    { e: "📅", t: "Inspections Scheduled", s: "Before vs after comparison" },
    { e: "💰", t: "Revenue Opportunities", s: "Total estimated job value generated", accent: true },
  ];
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12 max-w-[700px] mx-auto">
          <SectionLabel>Pilot Measurement</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            What We Measure During the Pilot
          </h2>
          <p className="text-[17px] text-[#64748B]">We don't ask you to trust us. We give you the data so you can judge for yourself.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tiles.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }} whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-6 text-center"
              style={{ border: t.accent ? "1.5px solid #BFDBFE" : "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div className="text-3xl mb-3">{t.e}</div>
              <div className="text-[14px] font-bold text-[#0F172A] mb-1">{t.t}</div>
              <div className="text-[12px] text-[#64748B] leading-snug">{t.s}</div>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-10 bg-white rounded-2xl p-7 text-center text-[15px] font-medium text-[#374151]"
          style={{ border: "1px solid #E2E8F0" }}>
          At the end of the pilot, you'll have a clear before/after picture — <strong>in your own numbers</strong> — of what faster response times did for your business.
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */

export function FounderSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[760px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-10">
          <SectionLabel>Behind the Service</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            A Note from the Founder
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="relative rounded-[20px] p-10 sm:p-12 bg-[#F8FAFC]" style={{ border: "1px solid #E2E8F0" }}>
          <span className="absolute top-4 left-6 leading-none select-none" style={{ fontSize: 80, color: "#E2E8F0", fontFamily: "Georgia, serif" }}>"</span>
          <div className="relative space-y-5 text-[17px] sm:text-[18px] text-[#374151] leading-[1.75]">
            <p>I'm currently working with a small number of roofing companies to test a system designed to recover opportunities that would otherwise be lost because of delayed follow-up.</p>
            <p>The goal is simple: help roofing businesses book more inspections and measure — with real data — whether faster engagement leads to more jobs won.</p>
            <p>This is not a sales pitch dressed up as a service. It's a pilot. You measure the results. You decide if it's working. I'm not asking for a long-term commitment — I'm asking for a fair test.</p>
          </div>
          <div className="mt-8 pt-6 flex items-center gap-3" style={{ borderTop: "1px solid #F1F5F9" }}>
            <div className="w-12 h-12 rounded-xl grid place-items-center shrink-0" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
              <UserIcon size={22} color="white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#0F172A]">Founder, Roof Revenue Recovery</div>
              <div className="text-[13px] text-[#64748B]">Focused on the roofing industry</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

export function TestimonialsSection() {
  const items = [
    { q: "We were getting leads but half of them went cold before we could call back. Now I actually see the inspections on my calendar.", n: "Mike R.", r: "Owner — residential roofing, Texas" },
    { q: "I didn't need to hire anyone or set anything up. We just started seeing more scheduled inspections show up in our system.", n: "Dave T.", r: "Operations manager — Florida roofing co." },
    { q: "The first week we booked two inspections from leads that would've definitely gone cold. One of them turned into a full replacement.", n: "Carlos M.", r: "Owner — storm damage specialist, Ohio" },
  ];
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <SectionLabel>What Roofers Say</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-3" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Results From the Field
          </h2>
          <p className="text-[14px] text-[#94A3B8]">Pilot program feedback — results will vary by market and volume</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-7"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p className="text-[15px] text-[#374151] leading-[1.7] italic mb-5">"{t.q}"</p>
              <div className="pt-5" style={{ borderTop: "1px solid #F1F5F9" }}>
                <div className="text-[14px] font-bold text-[#0F172A]">{t.n}</div>
                <div className="text-[13px] text-[#64748B]">{t.r}</div>
                <div className="text-[11px] italic text-[#94A3B8] mt-1">Sample pilot feedback</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function FAQSection() {
  const faqs = [
    { q: "How long does setup take?", a: "Setup typically takes 24–48 hours after our discovery call. We handle everything on our end. You don't need to install anything or change your existing process." },
    { q: "Do I need technical knowledge?", a: "None whatsoever. If you can receive a phone call or read a text message, you can use this. There's no software to learn, no dashboard to manage. You just see more booked inspections." },
    { q: "Will this replace my staff?", a: "No. This handles the initial follow-up and lead qualification — the time-sensitive part that happens between when a homeowner reaches out and when your team can call back. Your team still closes the jobs." },
    { q: "What happens during the pilot?", a: "We run the response and follow-up system for your incoming leads. We track every metric — leads received, response times, inspections scheduled — and share a clear report at the end so you can evaluate the results." },
    { q: "How is success measured?", a: "We compare your inspection booking rate before and during the pilot. Simple. You either see more inspections get booked or you don't. We believe in measurable outcomes — not vague improvements." },
    { q: "How long is the pilot?", a: "The pilot runs for 30 days. That's enough time to see a meaningful change in booked inspections and generate real data to evaluate — without asking you to commit to anything long-term upfront." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-[720px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-10">
          <SectionLabel>Common Questions</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Frequently Asked Questions
          </h2>
        </motion.div>
        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid #E2E8F0" }}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left">
                  <span className="text-[16px] font-semibold text-[#0F172A]">{f.q}</span>
                  <span className="text-[#94A3B8] text-[22px] leading-none shrink-0 transition-transform"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="pb-5 pt-1 text-[15px] text-[#64748B] leading-[1.7]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

export function FinalCTA() {
  return (
    <section className="px-6 text-center" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", padding: "120px 24px" }}>
      <div className="max-w-[800px] mx-auto">
        <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#93C5FD] mb-7"
          style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] pulse-dot" />
          Limited to 3 Roofing Companies
        </motion.div>
        <motion.h2 {...fadeUp} className="font-black text-white tracking-[-0.03em] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(32px, 5.4vw, 58px)" }}>
          How Many Roofing Opportunities<br />Are You Losing Every Month?
        </motion.h2>
        <motion.p {...fadeUp} className="text-[20px] text-[#94A3B8] leading-[1.6] max-w-[560px] mx-auto mb-9">
          You may be closer to recovering them than you think.
        </motion.p>
        <motion.div {...fadeUp}>
          <Button href="#pilot" size="xl">Book Your Free Pilot <ArrowRight size={20} /></Button>
          <p className="text-[14px] text-[#475569] mt-4">
            No setup fee · No commitment · 30-day pilot · Real results tracked
          </p>
        </motion.div>
        <motion.div {...fadeUp} className="mt-16 pt-12 flex flex-wrap justify-center gap-x-12 gap-y-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { v: "78%", l: "Choose first responder" },
            { v: "< 2min", l: "Response time" },
            { v: "$0", l: "Setup fee" },
            { v: "30", l: "Day pilot" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-white font-extrabold text-[28px] leading-none">{s.v}</div>
              <div className="text-[13px] text-[#64748B] mt-2">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="bg-[#0A0F1E] py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <LogoMark size={28} />
          <span className="text-[14px] font-bold text-[#94A3B8]">Roof Revenue Recovery</span>
        </div>
        <div className="text-[13px] text-[#475569] text-center order-3 md:order-2 w-full md:w-auto">
          © 2025 Roof Revenue Recovery. All rights reserved. United States.
        </div>
        <div className="flex items-center gap-5 order-2 md:order-3">
          {[["How It Works", "#how-it-works"], ["Pilot", "#pilot"], ["FAQ", "#faq"]].map(([t, h]) => (
            <a key={h} href={h} className="text-[13px] text-[#475569] hover:text-[#94A3B8] transition-colors">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
