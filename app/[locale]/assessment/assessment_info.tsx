// AssessmentPage.tsx
// Drop this file into your Next.js /app or /pages directory.
// Requirements: Tailwind CSS, lucide-react (npm install lucide-react)

import {
  Search,
  SlidersHorizontal,
  FileText,
  Megaphone,
  Headphones,
  Database,
  Laptop,
  Building2,
  Map,
  Lightbulb,
  Bot,
  ListChecks,
  PresentationIcon,
  Clock,
  ArrowRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const phases = [
  {
    number: "01",
    title: "Discover",
    description:
      "We map every key process across your operations to understand how work currently flows.",
    icon: Search,
  },
  {
    number: "02",
    title: "Analyse",
    description:
      "We identify gaps, manual bottlenecks, and opportunities for digitalization and automation.",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Recommend",
    description:
      "You receive a clear, prioritized roadmap of exactly what to digitalize, optimize, and automate.",
    icon: FileText,
  },
];

const areas = [
  {
    title: "Lead generation",
    icon: Megaphone,
    color: "text-blue-600 bg-blue-50",
    description:
      "We review how your business attracts and captures leads — from outreach methods and ad campaigns to landing pages and intake forms — pinpointing where manual steps slow down pipeline growth.",
    tags: ["Outreach workflows", "Lead capture forms", "Follow-up sequences"],
    full: false,
  },
  {
    title: "Customer service",
    icon: Headphones,
    color: "text-emerald-600 bg-emerald-50",
    description:
      "We evaluate how your team handles inquiries, support tickets, and client communication — identifying which interactions can be handled by AI and which need the human touch.",
    tags: ["Response workflows", "Ticketing systems", "AI chat opportunities"],
    full: false,
  },
  {
    title: "CRM & client data",
    icon: Database,
    color: "text-amber-600 bg-amber-50",
    description:
      "We assess how client information is stored, updated, and used across your team — uncovering data silos, manual data entry, and missed automation opportunities in your CRM pipeline.",
    tags: ["Data entry processes", "Pipeline management", "CRM integrations"],
    full: false,
  },
  {
    title: "Website & sales outreach",
    icon: Laptop,
    color: "text-rose-600 bg-rose-50",
    description:
      "We look at how your website converts visitors and how your sales team conducts outreach — identifying manual steps in nurturing, follow-ups, and closing that can be streamlined or automated.",
    tags: ["Conversion flows", "Email sequences", "Sales automation"],
    full: false,
  },
  {
    title: "Internal operations & tools",
    icon: Building2,
    color: "text-slate-600 bg-slate-100",
    description:
      "We examine the software, tools, and internal workflows your team uses day-to-day — from project management and reporting to HR and finance processes — identifying everything that can be replaced, connected, or automated through platforms like n8n or AI-powered tools.",
    tags: [
      "Tool stack audit",
      "Workflow automation (n8n)",
      "Reporting & dashboards",
      "Cross-tool integrations",
    ],
    full: true,
  },
];

const outcomes = [
  {
    icon: Map,
    title: "Process map",
    description: "A full visual overview of how your operations work today.",
  },
  {
    icon: Lightbulb,
    title: "Gap analysis",
    description: "Clear identification of every manual or digital gap found.",
  },
  {
    icon: Bot,
    title: "Automation report",
    description: "A prioritized list of AI and n8n automation opportunities.",
  },
  {
    icon: ListChecks,
    title: "Action roadmap",
    description:
      "Step-by-step recommendations ordered by impact and effort.",
  },
  {
    icon: PresentationIcon,
    title: "Review session",
    description:
      "A dedicated walkthrough of all findings and next steps with your team.",
  },
  {
    icon: Clock,
    title: "Time savings estimate",
    description:
      "Projected hours saved per week once changes are implemented.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-5">
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="border-t border-slate-100 my-10" />;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssessmentPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="mb-12">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-5">
          Service Overview
        </span>
        <h1 className="text-3xl font-semibold text-slate-900 leading-snug mb-4">
          Assessment of current operations
        </h1>
        <p className="text-base text-slate-500 leading-relaxed max-w-xl">
          We conduct a thorough, structured review of how your business operates
          today — identifying every process that can be digitalized, optimized,
          or automated — so you stop leaving efficiency on the table.
        </p>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {phases.map((phase) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.number}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-colors"
            >
              <Icon className="w-5 h-5 text-blue-500 mb-3" strokeWidth={1.5} />
              <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-300 mb-1">
                Phase {phase.number}
              </p>
              <p className="text-sm font-semibold text-slate-800 mb-1.5">
                {phase.title}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {phase.description}
              </p>
            </div>
          );
        })}
      </div>

      <Divider />

      {/* Areas */}
      <SectionLabel>What we assess</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {areas.map((area) => {
          const Icon = area.icon;
          return (
            <div
              key={area.title}
              className={`bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-colors ${
                area.full ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`p-2 rounded-lg ${area.color}`}>
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {area.title}
                </p>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-slate-500 border border-slate-200 rounded-full px-3 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Divider />

      {/* Outcomes */}
      <SectionLabel>What you walk away with</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
        {outcomes.map((outcome) => {
          const Icon = outcome.icon;
          return (
            <div
              key={outcome.title}
              className="bg-slate-50 rounded-xl p-4"
            >
              <Icon
                className="w-5 h-5 text-emerald-500 mb-2"
                strokeWidth={1.5}
              />
              <p className="text-sm font-semibold text-slate-800 mb-1">
                {outcome.title}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {outcome.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-800 mb-0.5">
            Ready to see where your business can go further?
          </p>
          <p className="text-xs text-blue-500">
            Book a free discovery call — we&apos;ll explain the process in detail.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-blue-700 bg-white border border-blue-200 rounded-xl px-5 py-2.5 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
        >
          Book a call
        </a>
      </div>

    </section>
  );
}
