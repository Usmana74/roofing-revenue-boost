import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Check, X, Clock, Truck, Users, Phone, Zap, CheckCircle,
  CalendarDays, DollarSign, AlertCircle, MessageCircle, CheckCircle2,
  Home, Layers, Heart, User as UserIcon, PlayCircle, TrendingUp,
  Inbox, Target, BarChart3, Repeat, LineChart,
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

/* ---------- Pilot Notice Banner (honest, non-scarcity) ---------- */

export function ScarcityBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-700 to-blue-600 text-white text-[13px] sm:text-sm font-medium py-2.5 px-4 text-center">
      <span className="pulse-dot inline-block mr-2">●</span>
      We're currently looking for a small number of roofing companies to participate in an early pilot program.
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
            ["Why a Pilot", "#why-pilot"],
            ["What We Measure", "#measure"],
            ["FAQ", "#faq"],
          ].map(([t, h]) => (
            <a key={h} href={h} className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t}</a>
          ))}
        </nav>
        <Button href="#pilot" size="sm">Apply For Pilot</Button>
      </div>
    </header>
  );
}

/* ---------- Sample Dashboard (illustrative) ---------- */

type Activity = { color: string; text: string; time: string };
const ACTIVITIES: Activity[] = [
  { color: "#10B981", text: "Inspection booked — Oak Street", time: "2m ago" },
  { color: "#2563EB", text: "Lead qualified — Maple Ave", time: "8m ago" },
  { color: "#F59E0B", text: "New estimate request received", time: "14m ago" },
  { color: "#10B981", text: "Inspection booked — River Rd", time: "23m ago" },
  { color: "#2563EB", text: "Lead qualified — Cedar Ln", time: "31m ago" },
];

function MiniBars({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px] h-8 mt-3">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.35 + (i / data.length) * 0.65 }} />
      ))}
    </div>
  );
}

export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const leads = useCounter(37, inView);
  const qualified = useCounter(29, inView);
  const insp = useCounter(11, inView);
  const resp = useCounter(42, inView);
  const rev = useCounter(86, inView);
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
          Operations Dashboard — Sample View
        </span>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shrink-0"
          style={{ background: "rgba(245,158,11,0.18)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.35)" }}>
          Illustrative Example
        </span>
      </div>
      <div className="bg-[#0F172A] p-5">
        <div className="grid grid-cols-2 gap-3">
          <Tile label="Leads Received" value={String(leads)} sub="last 30 days" chart={[8, 12, 9, 14, 11, 16, 13]} chartColor="#2563EB" />
          <Tile label="Qualified Leads" value={String(qualified)} sub="78% qualification rate" chart={[6, 9, 7, 11, 10, 12, 11]} chartColor="#10B981" />
          <Tile label="Inspections Scheduled" value={String(insp)} sub="confirmed on calendar" chart={[2, 3, 2, 4, 3, 5, 4]} chartColor="#0EA5E9" />
          <Tile label="Avg. Response Time" value={`${resp}s`} sub="from request to first reply" chart={[60, 55, 48, 50, 44, 42, 42]} chartColor="#F59E0B" />
        </div>
        <div className="mt-3 rounded-xl p-4"
          style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-[#93C5FD] font-bold mb-1.5">Potential Revenue Opportunities</div>
              <div className="text-white font-extrabold text-[34px] leading-none">${rev},000</div>
              <div className="text-[12px] text-[#93C5FD] mt-1.5">estimated pipeline from booked inspections</div>
            </div>
            <TrendingUp size={36} className="text-[#93C5FD] shrink-0" />
          </div>
        </div>
        <div
          className="mt-3 rounded-xl p-3.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="text-[11px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold mb-2.5">
            Activity Feed
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

function Tile({ label, value, sub, chart, chartColor }: { label: string; value: string; sub: string; chart?: number[]; chartColor?: string }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="text-[11px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold mb-2">{label}</div>
      <div className="text-white font-extrabold text-[26px] sm:text-[30px] leading-none mb-1.5">{value}</div>
      <div className="text-[11px] text-[#64748B]">{sub}</div>
      {chart && chartColor && <MiniBars data={chart} color={chartColor} />}
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
> <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

```
    {/* Left Content */}
    <div>

      {/* Pilot Badge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-[#2563EB] mb-7"
        style={{
          background: "rgba(37,99,235,0.08)",
          border: "1px solid rgba(37,99,235,0.2)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#10B981] pulse-dot" />
        Helping Roofing Companies Measure Lost Revenue Opportunities
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-black text-[#0F172A] tracking-[-0.04em] leading-[1.02] mb-6"
        style={{ fontSize: "clamp(42px, 6vw, 72px)" }}
      >
        How Many Roofing Jobs
        <br />
        Are You Losing
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
          }}
        >
          Every Month?
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-[18px] text-[#475569] leading-[1.75] mb-8 max-w-[560px]"
      >
        Homeowners often contact multiple roofing companies before choosing
        a contractor. In many cases, the company that responds first gets
        the inspection. We're running a pilot program to determine whether
        faster follow-up can help roofing companies recover missed
        opportunities and book more inspections.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap gap-3"
      >
        <Button href="#pilot" size="lg">
          Book Free Pilot Call
          <ArrowRight size={18} />
        </Button>

        <Button href="#demo" variant="secondary" size="lg">
          <PlayCircle size={18} />
          Watch 90-Second Demo
        </Button>
      </motion.div>

      {/* Revenue Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-8"
      >
        <div
          className="inline-flex items-center gap-3 px-5 py-4 rounded-xl"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <span className="text-[#10B981] font-semibold">
            Average Roof Replacement:
          </span>

          <span className="font-bold text-[#0F172A] text-lg">
            $10,000 – $20,000+
          </span>
        </div>

        <p className="text-sm text-[#64748B] mt-3 max-w-[520px]">
          Recovering even one additional roofing project can often generate
          significantly more value than the cost of improving response and
          follow-up.
        </p>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-wrap gap-x-8 gap-y-3 mt-10"
      >
        {[
          "No setup fee",
          "No long-term commitment",
          "Results measured transparently",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-[14px] text-[#64748B]"
          >
            <Check size={16} className="text-[#10B981]" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>

    {/* Dashboard Mockup */}
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <DashboardMockup />
    </motion.div>
  </div>
</section>
```

);
}


/* ---------- Recovered Job Value ---------- */

export function RecoveredJobValueSection() {
  const cards = [
    { n: "Recover 1 Roofing Project", v: "+$12,000", grad: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", accent: "#2563EB" },
    { n: "Recover 2 Roofing Projects", v: "+$24,000", grad: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", accent: "#10B981" },
    { n: "Recover 4 Roofing Projects", v: "+$48,000", grad: "linear-gradient(135deg, #FEF3C7, #FDE68A)", accent: "#D97706" },
  ];
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14 max-w-[760px] mx-auto">
          <SectionLabel>The Math of a Missed Lead</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            What Does One Recovered Roofing Job Mean?
          </h2>
          <p className="text-[18px] text-[#64748B] leading-[1.6]">
            A single missed opportunity can represent thousands of dollars in lost revenue.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4 }}
              className="rounded-2xl p-8 text-center"
              style={{ background: c.grad, border: `1.5px solid ${c.accent}25`, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: c.accent }}>{c.n}</div>
              <div className="font-black tracking-[-0.03em] text-[#0F172A]" style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}>{c.v}</div>
              <div className="w-12 h-[3px] rounded-sm mx-auto mt-4" style={{ background: c.accent }} />
              <p className="mt-4 text-[13px] text-[#475569]">in potential project revenue recovered</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-12 max-w-[720px] mx-auto text-center">
          <p className="text-[17px] text-[#475569] leading-[1.7]">
            The goal isn't more software. The goal is helping roofing companies capture opportunities that might otherwise go to competitors.
          </p>
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
              <span className="text-[15px] font-bold text-[#991B1B]">Without Faster Follow-Up</span>
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
                Likely outcome: opportunity lost
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.15 }} className="rounded-[20px] overflow-hidden bg-white" style={{ border: "1.5px solid #A7F3D0" }}>
            <div className="flex items-center gap-3 px-6 py-4 bg-[#ECFDF5]" style={{ borderBottom: "1px solid #A7F3D0" }}>
              <span className="w-7 h-7 rounded-lg bg-[#10B981] grid place-items-center"><Check size={16} color="white" /></span>
              <span className="text-[15px] font-bold text-[#065F46]">With Faster Follow-Up</span>
            </div>
            <div className="p-7">
              <Timeline events={[
                { color: "#94A3B8", time: "2:14 PM", title: "Estimate submitted" },
                { color: "#10B981", time: "2:14 PM — Minutes", title: "Immediate engagement", sub: "Homeowner gets a response before they move on" },
                { color: "#2563EB", time: "2:16 PM", title: "Lead qualified", sub: "Job type, urgency, address confirmed" },
                { color: "#10B981", time: "2:18 PM", title: "Inspection scheduled", sub: "Date confirmed, added to your calendar" },
              ]} />
              <div className="mt-6 rounded-lg px-4 py-3 text-center text-[14px] font-bold text-[#065F46]"
                style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
                Likely outcome: inspection booked
              </div>
            </div>
          </motion.div>
        </div>
        <motion.p {...fadeUp} className="text-center max-w-[560px] mx-auto mt-10 text-[15px] text-[#64748B] leading-[1.65]">
          Often the homeowner doesn't leave because of price. They leave because someone else responded first.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Hidden Cost ---------- */

export function HiddenCostSection() {
  const items = [
    { border: "#F59E0B", iconBg: "#FEF3C7", iconColor: "#D97706", Icon: Clock, title: "Owner on Inspection", body: "You're on a roof assessing storm damage. A homeowner just submitted a request on your website. They'll often wait only a short while before trying the next company." },
    { border: "#EF4444", iconBg: "#FEF2F2", iconColor: "#DC2626", Icon: Truck, title: "Driving Between Jobs", body: "You're on the road managing crews. Missed calls go to voicemail. Some of those callers may already have someone coming out tomorrow." },
    { border: "#2563EB", iconBg: "#EFF6FF", iconColor: "#2563EB", Icon: Users, title: "Managing Crews", body: "Material delivery, crew scheduling, job site issues — your attention goes where it's needed most. Following up on new leads in the moment isn't always possible." },
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
            "Opportunities are often lost not because of pricing or quality of work — but because someone else picked up the phone first."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Why We're Running a Pilot ---------- */

export function WhyPilotSection() {
  const bullets = [
    { Icon: Inbox, t: "How many opportunities are being lost", s: "Quantify the real gap between requests received and inspections booked." },
    { Icon: Zap, t: "Whether faster engagement increases booked inspections", s: "Compare before/after response times against scheduled appointments." },
    { Icon: DollarSign, t: "How much revenue can potentially be recovered", s: "Translate qualified opportunities into pipeline value, in your own numbers." },
  ];
  return (
    <section id="why-pilot" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[960px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <SectionLabel>Why a Pilot</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Why We're Running A Pilot
          </h2>
          <p className="text-[17px] text-[#475569] leading-[1.7] max-w-[720px] mx-auto">
            We believe many roofing companies lose opportunities simply because homeowners contact multiple contractors and often choose whoever responds first.
          </p>
          <p className="text-[17px] text-[#475569] leading-[1.7] max-w-[720px] mx-auto mt-4">
            Before expanding this service, we're working with a small number of roofing businesses to understand:
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {bullets.map((b, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="w-11 h-11 rounded-xl grid place-items-center mb-4"
                style={{ background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" }}>
                <b.Icon size={22} color="#2563EB" />
              </div>
              <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 leading-snug">{b.t}</h3>
              <p className="text-[14px] text-[#64748B] leading-[1.65]">{b.s}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-10 rounded-2xl p-7 text-center bg-white"
          style={{ border: "1px solid #E2E8F0" }}>
          <p className="text-[16px] text-[#374151] leading-[1.7]">
            This pilot allows both sides to measure results transparently.
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
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto" ref={ref}>
        <motion.div {...fadeUp} className="text-center mb-14">
          <SectionLabel>Industry Reality</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            What the Research Suggests
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { big: <><CountStat value={78} isInView={inView} />%</>, size: "64px", desc: "of homeowners tend to choose a contractor that responds quickly" },
            { big: "$8k–18k", size: "40px", desc: "typical value of a residential roof replacement project" },
            { big: <><CountStat value={5} isInView={inView} />×</>, size: "64px", desc: "higher likelihood of booking when contacted within minutes" },
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
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */

export function HowItWorksSection() {
  const steps = [
    { Icon: Phone, title: "Estimate Request Comes In", body: "A homeowner finds you online, sees your truck, or gets a referral. They call or fill out a form. This moment is the starting point." },
    { Icon: Zap, title: "Immediate Engagement", body: "We engage the homeowner quickly on your behalf, so they hear from your business while you're still your primary option." },
    { Icon: CheckCircle, title: "Lead Qualification", body: "Job type, roof size, urgency, address, and timeline are confirmed. Your team gets a qualified lead — not a cold call back to a stranger." },
    { Icon: CalendarDays, title: "Inspection Scheduled", body: "A date and time is agreed while the homeowner is engaged. The appointment lands on your calendar with no back-and-forth phone tag." },
    { Icon: DollarSign, title: "More Inspections Won", body: "You show up to a scheduled inspection with someone who already knows your name — recovering an opportunity that might have gone to a competitor." },
  ];
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F8FAFC]">
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
        <div className="mt-6 flex justify-center">
          <Button href="#demo" variant="secondary" size="lg"><PlayCircle size={18} /> Watch 90-Second Demo</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Live Demo (workflow) ---------- */

export function LiveDemoSection() {
  const cards = [
    { Icon: AlertCircle, color: "#2563EB", bg: "rgba(37,99,235,0.15)", title: "Estimate Request Detected", sub: "New inbound lead or unanswered request", badge: { t: "Detected", c: "#2563EB", bg: "rgba(37,99,235,0.2)" }, glow: "blue" },
    { Icon: Zap, color: "#10B981", bg: "rgba(16,185,129,0.15)", title: "Immediate Follow-Up Initiated", sub: "Homeowner contacted while still actively looking" },
    { Icon: MessageCircle, color: "#F59E0B", bg: "rgba(245,158,11,0.15)", title: "Homeowner Responds", sub: "Engagement confirmed — job details collected" },
    { Icon: CalendarDays, color: "#2563EB", bg: "rgba(37,99,235,0.15)", title: "Inspection Scheduled", sub: "Date confirmed, added to your calendar" },
    { Icon: CheckCircle2, color: "#10B981", bg: "rgba(16,185,129,0.15)", title: "Opportunity Recovered", sub: "Lead stayed with your company instead of a competitor", badge: { t: "Recovered ✓", c: "#10B981", bg: "rgba(16,185,129,0.2)" }, glow: "green" },
  ];
  return (
    <section id="demo" className="py-24 px-6" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
      <div className="max-w-[800px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#93C5FD] mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
            <PlayCircle size={14} />
            90-Second Walkthrough
          </div>
          <h2 className="font-extrabold text-white tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            See the Workflow in Action
          </h2>
          <p className="text-[17px] text-[#94A3B8]">This is the sequence triggered every time a homeowner reaches out.</p>
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
        <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
          <Button href="#pilot" size="lg">Apply For Pilot Program <ArrowRight size={18} /></Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits ---------- */

export function BenefitsSection() {
  const items = [
    { Icon: CalendarDays, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", title: "Book More Inspections", body: "Convert a higher share of estimate requests into confirmed appointments without chasing leads manually." },
    { Icon: Clock, color: "#10B981", bg: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", title: "Respond Faster", body: "Reach homeowners earlier in their decision process — before they've already chosen someone else." },
    { Icon: Home, color: "#D97706", bg: "linear-gradient(135deg, #FEF3C7, #FDE68A)", title: "Recover Missed Opportunities", body: "Reduce the share of jobs lost simply because you were on a roof or driving between sites." },
    { Icon: Layers, color: "#16A34A", bg: "linear-gradient(135deg, #F0FDF4, #DCFCE7)", title: "Less Manual Follow-Up", body: "Your team stays focused on running jobs while the follow-up sequence runs in the background." },
    { Icon: DollarSign, color: "#2563EB", bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", title: "More From Existing Leads", body: "Capture more value from the leads you're already generating — without adding office overhead." },
    { Icon: Heart, color: "#7C3AED", bg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", title: "Stay Top of Mind", body: "Consistent, timely engagement helps build trust — even before you've set foot on the property." },
  ];
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-14 max-w-[700px] mx-auto">
          <SectionLabel>What You Get</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Focused on Business Outcomes
          </h2>
          <p className="text-[17px] text-[#64748B]">No technology to manage. No learning curve. Just measurable improvements in booked inspections.</p>
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
            style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", color: "#1D4ED8" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] pulse-dot" />
            Early Pilot Program
          </div>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Apply For The Pilot Program
          </h2>
          <p className="text-[18px] text-[#475569] max-w-[620px] mx-auto leading-[1.6] mb-10">
            We're currently looking for a small number of roofing companies to participate in an early pilot — measuring how response speed affects booked inspections and recovered revenue opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
            {[
              { t: "No Setup Fee", s: "Zero cost to get started" },
              { t: "No Long-Term Commitment", s: "Test it, measure it, decide" },
              { t: "Transparent Measurement", s: "You see what changed" },
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
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="mailto:hello@roofrevrecovery.com?subject=Pilot Program Application" size="lg">
              See If Faster Follow-Up Can Recover More Opportunities <ArrowRight size={18} />
            </Button>
            <Button href="#demo" variant="secondary" size="lg"><PlayCircle size={18} /> Watch 90-Second Demo</Button>
          </div>
          <p className="text-[13px] text-[#94A3B8] mt-5">
            No payment. No technical setup. A short discovery call to see if there's a fit.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- What We Measure ---------- */

export function MetricsSection() {
  const tiles = [
    { Icon: Inbox, t: "Estimate Requests Received", s: "Total inbound leads tracked during the pilot" },
    { Icon: Clock, t: "Average Response Time", s: "How quickly each lead is engaged" },
    { Icon: Target, t: "Qualified Opportunities", s: "Leads with confirmed job intent and details" },
    { Icon: CalendarDays, t: "Inspections Scheduled", s: "Confirmed appointments on your calendar" },
    { Icon: LineChart, t: "Revenue Opportunities Recovered", s: "Estimated pipeline value from booked inspections", accent: true },
    { Icon: Repeat, t: "Follow-Up Completion Rate", s: "Share of leads that received complete follow-up" },
  ];
  return (
    <section id="measure" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12 max-w-[760px] mx-auto">
          <SectionLabel>Pilot Measurement</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            What We Measure During The Pilot
          </h2>
          <p className="text-[17px] text-[#64748B]">
            The goal of the pilot is simple: measure whether improved response and engagement lead to more booked inspections and revenue opportunities.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tiles.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }} whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: t.accent ? "1.5px solid #BFDBFE" : "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div className="w-10 h-10 rounded-xl grid place-items-center mb-3"
                style={{ background: t.accent ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)" : "#F1F5F9" }}>
                <t.Icon size={20} color={t.accent ? "#2563EB" : "#475569"} />
              </div>
              <div className="text-[15px] font-bold text-[#0F172A] mb-1">{t.t}</div>
              <div className="text-[13px] text-[#64748B] leading-snug">{t.s}</div>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-10 bg-white rounded-2xl p-7 text-center text-[15px] font-medium text-[#374151]"
          style={{ border: "1px solid #E2E8F0" }}>
          At the end of the pilot, you'll have a clear before/after picture — <strong>in your own numbers</strong> — of what faster response did for your business.
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */

export function FounderSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[820px] mx-auto">
        <motion.div {...fadeUp} className="text-center mb-10">
          <SectionLabel>Behind the Service</SectionLabel>
          <h2 className="font-extrabold text-[#0F172A] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            A Note from the Founder
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="relative rounded-[20px] p-10 sm:p-12 bg-[#F8FAFC]" style={{ border: "1px solid #E2E8F0" }}>
          <span className="absolute top-4 left-6 leading-none select-none" style={{ fontSize: 80, color: "#E2E8F0", fontFamily: "Georgia, serif" }}>"</span>
          <div className="relative space-y-5 text-[17px] sm:text-[18px] text-[#374151] leading-[1.75]">
            <p>Roof Revenue Recovery is currently being tested with a small number of roofing companies.</p>
            <p>The mission is simple: help contractors reduce lost opportunities caused by delayed follow-up, and better understand how response speed impacts booked inspections.</p>
            <p>Rather than making bold claims, we're focused on measuring results and improving the process with real businesses.</p>
          </div>
          <div className="mt-10 pt-6 flex items-center gap-4" style={{ borderTop: "1px solid #E2E8F0" }}>
            <div className="w-14 h-14 rounded-2xl grid place-items-center shrink-0" style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}>
              <UserIcon size={26} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[22px] sm:text-[26px] text-[#0F172A] leading-none mb-1.5"
                style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive', fontWeight: 600 }}>
                — The Founder
              </div>
              <div className="text-[13px] text-[#64748B]">Founder, Roof Revenue Recovery · Pilot lead</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function FAQSection() {
  const faqs = [
    { q: "How long does setup take?", a: "Setup typically takes 24–48 hours after our discovery call. We handle everything on our end. You don't need to install anything or change your existing process." },
    { q: "Do I need technical knowledge?", a: "No. There's nothing for you to learn or manage. You continue running your business the way you do today, and you see booked inspections appear on your calendar." },
    { q: "Will this replace my staff?", a: "No. This handles the initial follow-up and qualification — the time-sensitive part between when a homeowner reaches out and when your team can respond. Your team still closes the jobs." },
    { q: "What happens during the pilot?", a: "We run the response and follow-up sequence for your incoming leads. We track every metric — requests received, response times, inspections scheduled — and share a transparent report at the end so you can evaluate the results." },
    { q: "How is success measured?", a: "We compare your inspection booking rate before and during the pilot. Either you see more inspections booked, or you don't. The data is yours either way." },
    { q: "How long is the pilot?", a: "The pilot runs for 30 days. That's enough time to see a meaningful change in booked inspections and generate real data — without asking you to commit to anything long-term upfront." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 px-6 bg-[#F8FAFC]">
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
          <BarChart3 size={14} />
          Early Pilot Program
        </motion.div>
        <motion.h2 {...fadeUp} className="font-black text-white tracking-[-0.03em] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(32px, 5.4vw, 58px)" }}>
          How Many Roofing Opportunities<br />Might You Be Losing?
        </motion.h2>
        <motion.p {...fadeUp} className="text-[20px] text-[#94A3B8] leading-[1.6] max-w-[600px] mx-auto mb-9">
          Let's measure it together — and see whether faster follow-up can recover them.
        </motion.p>
        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3">
          <Button href="#pilot" size="xl">Apply For Pilot Program <ArrowRight size={20} /></Button>
          <Button href="#demo" variant="secondary" size="xl" className="!text-white !border-white/30 hover:!border-white">
            <PlayCircle size={20} /> Watch 90-Second Demo
          </Button>
        </motion.div>
        <motion.p {...fadeUp} className="text-[14px] text-[#475569] mt-5">
          No setup fee · No commitment · 30-day pilot · Results measured transparently
        </motion.p>
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
