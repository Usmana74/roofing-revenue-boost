import { createFileRoute } from "@tanstack/react-router";
import {
  ScarcityBanner, Navbar, HeroSection, RecoveredJobValueSection, ProblemSection,
  HiddenCostSection, StatsSection, WhyPilotSection, HowItWorksSection, LiveDemoSection,
  BenefitsSection, PilotSection, MetricsSection, FounderSection,
  FAQSection, FinalCTA, Footer,
} from "@/components/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roof Revenue Recovery — Stop Losing Roofing Leads to Faster Competitors" },
      { name: "description", content: "Done-for-you revenue recovery service for roofing companies. Respond to estimate requests in minutes, book more inspections, win more jobs." },
      { property: "og:title", content: "Roof Revenue Recovery — Stop Losing Roofing Leads to Faster Competitors" },
      { property: "og:description", content: "Done-for-you revenue recovery service for roofing companies. Respond to estimate requests in minutes, book more inspections, win more jobs." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ScarcityBanner />
      <div className="pt-10">
        <Navbar />
        <main>
          <HeroSection />
          <RecoveredJobValueSection />
          <ProblemSection />
          <HiddenCostSection />
          <StatsSection />
          <WhyPilotSection />
          <HowItWorksSection />
          <LiveDemoSection />
          <BenefitsSection />
          <MetricsSection />
          <FounderSection />
          <PilotSection />
          <FAQSection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
