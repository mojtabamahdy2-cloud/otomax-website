"use client";

import React, { useRef, useState } from "react";
import NavBar from "@/components/ui/navBar";
import { Footer7 } from "@/components/footer-7";
import Noura from "@/components/Noura";
import { CrmOnboardingModal } from "@/components/crm-onboarding-modal";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  Bot,
  Bell,
  Inbox,
  ShieldCheck,
  History,
  RefreshCw,
  LayoutDashboard,
  Zap,
  BarChart3,
  TrendingUp,
  Lock,
  Users,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

/* ── Animation helpers ────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Feature data ─────────────────────────────────────────── */
const coreFeatures = [
  {
    icon: <Zap size={24} />,
    title: "Zero Per-Seat Fees",
    description: "Add your entire team without worrying about ballooning licence costs. One flat system, unlimited users.",
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Instant Lead Capture",
    description: "Automatically pull leads from WhatsApp, Instagram DMs, and website forms into one unified view — in real time.",
  },
  {
    icon: <Bot size={24} />,
    title: "AI-Drafted Follow-ups",
    description: "The CRM drafts personalised email and text replies based on each lead's specific inquiry, saving hours every day.",
  },
  {
    icon: <Bell size={24} />,
    title: "Auto-Reminders",
    description: "Never forget a follow-up. Automated tasks and push notifications keep your pipeline moving without manual effort.",
  },
  {
    icon: <Inbox size={24} />,
    title: "Omnichannel Inbox",
    description: "See all emails, SMS, and WhatsApp messages tied to a specific contact — in a single, clutter-free inbox.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Privacy First",
    description: "End-to-end encryption and Multi-Factor Authentication (2FA) built in by default — ideal for businesses handling sensitive client data.",
  },
  {
    icon: <History size={24} />,
    title: "Unified Communication History",
    description: "Every email, chat, and phone call visible in one chronological timeline — always in context, never siloed.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Real-time Synchronisation",
    description: "Changes from a mobile app or landing page reflect instantly across every dashboard, everywhere.",
  },
  {
    icon: <LayoutDashboard size={24} />,
    title: "Clean Interface",
    description: "A minimalist, vibe-coded dashboard that surfaces what matters — no cluttered menus, no cognitive overload.",
  },
  {
    icon: <Zap size={24} />,
    title: "Fast Performance",
    description: "Low-latency search and instant record loading, even in high-volume environments with thousands of contacts.",
  },
];

const analyticsFeatures = [
  {
    icon: <BarChart3 size={24} />,
    title: "Visual Dashboards",
    description: "Drag-and-drop reports that visualise the full sales pipeline, conversion rates, and team performance at a glance.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Revenue Forecasting",
    description: "Use historical data to predict future revenue and inventory needs — turning your CRM into a strategic planning tool.",
  },
];

const exclusivePerks = [
  "Fully customised to your business workflows",
  "Onboarding and dedicated setup support",
  "Direct integration with your existing Otomax website",
  "Priority feature requests as a current client",
  "White-glove data migration from your previous system",
];

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
import { useTranslations } from "next-intl";

export default function CrmPage() {
  const t = useTranslations("CRM");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coreFeatures = [
    { icon: <Zap size={24} />, title: t("features.items.noFees.title"), description: t("features.items.noFees.desc") },
    { icon: <MessageSquare size={24} />, title: t("features.items.leadCapture.title"), description: t("features.items.leadCapture.desc") },
    { icon: <Bot size={24} />, title: t("features.items.aiDrafts.title"), description: t("features.items.aiDrafts.desc") },
    { icon: <Bell size={24} />, title: t("features.items.reminders.title"), description: t("features.items.reminders.desc") },
    { icon: <Inbox size={24} />, title: t("features.items.inbox.title"), description: t("features.items.inbox.desc") },
    { icon: <ShieldCheck size={24} />, title: t("features.items.privacy.title"), description: t("features.items.privacy.desc") },
    { icon: <History size={24} />, title: t("features.items.history.title"), description: t("features.items.history.desc") },
    { icon: <RefreshCw size={24} />, title: t("features.items.sync.title"), description: t("features.items.sync.desc") },
    { icon: <LayoutDashboard size={24} />, title: t("features.items.ui.title"), description: t("features.items.ui.desc") },
    { icon: <Zap size={24} />, title: t("features.items.performance.title"), description: t("features.items.performance.desc") },
  ];

  const analyticsFeatures = [
    { icon: <BarChart3 size={24} />, title: t("analytics.items.dashboards.title"), description: t("analytics.items.dashboards.desc") },
    { icon: <TrendingUp size={24} />, title: t("analytics.items.forecasting.title"), description: t("analytics.items.forecasting.desc") },
  ];

  const exclusivePerks = t.raw("exclusive.perks");

  const howItWorksSteps = t.raw("howItWorks.steps");

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden">
      <NavBar />

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-36 pb-20 md:pb-24 px-6">
        <div className="container mx-auto max-w-4xl text-center relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter"
          >
            {t("hero.title1")}{" "}
            <span className="text-[#7B2FFF]">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            {t("hero.desc")}
          </motion.p>

          {/* Exclusive notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-50 border border-violet-100 text-[#7B2FFF] text-sm font-bold mt-4 mb-10"
          >
            <Lock size={14} />
            {t("hero.exclusive")}
          </motion.div>

        </div>
      </section>

      {/* ─── Core Features Grid ─────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <Section className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </Section>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {coreFeatures.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default group text-start"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-5 group-hover:bg-[#7B2FFF] group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Analytics & Reporting ──────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <Section className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("analytics.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("analytics.subtitle")}
            </p>
          </Section>

          <div className="grid md:grid-cols-2 gap-8">
            {analyticsFeatures.map((f, i) => (
              <Section key={i}>
                <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 h-full text-start">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#7B2FFF] shadow-sm mb-6 border border-slate-100">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Exclusive Clients Section ──────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Section className="text-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-100 text-[#7B2FFF] text-sm font-bold mb-6 shadow-sm">
                <Users size={14} /> {t("exclusive.tagline")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                {t("exclusive.title")}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                {t("exclusive.desc1")}
              </p>
              <p className="text-slate-500 leading-relaxed">
                {t("exclusive.desc2")}
              </p>
            </Section>

            <Section>
              <div className="space-y-4">
                {exclusivePerks.map((perk: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} className="text-[#7B2FFF]" />
                    </div>
                    <p className="text-slate-700 font-medium text-start">{perk}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ─── Process Steps ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <Section className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("howItWorks.title")}</h2>
            <p className="text-slate-500">{t("howItWorks.subtitle")}</p>
          </Section>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorksSteps.map((step: any, i: number) => (
              <Section key={i}>
                <div className="text-center group">
                  <div className="w-14 h-14 rounded-full border-2 border-[#7B2FFF] text-[#7B2FFF] flex items-center justify-center font-black text-lg mx-auto mb-5 group-hover:bg-[#7B2FFF] group-hover:text-white transition-all duration-300">
                    {step.num}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Section>
            <div className="bg-[#1a0b2e] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">

              {/* Subtle orb decorations */}
              <div className="absolute top-0 left-0 w-56 h-56 bg-violet-800/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-violet-700/15 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-violet-200 text-sm font-semibold border border-white/10 mb-6">
                  <Lock size={14} /> {t("cta.tagline")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t("cta.title1")}
                  <br />
                  <span className="text-violet-300">{t("cta.title2")}</span>
                </h2>
                <p className="text-violet-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  {t("cta.desc")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#1a0b2e] rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform"
                  >
                    {t("cta.button")}
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <Footer7 />
      <Noura />
      <CrmOnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
