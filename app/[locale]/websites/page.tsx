"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import NavBar from "@/components/ui/navBar";
import { Footer7 } from "@/components/footer-7";
import Noura from "@/components/Noura";
import { WebsiteOnboardingModal } from "@/components/website-onboarding-modal";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Smartphone,
  TrendingUp,
  BarChart3,
  MessageSquareHeart,
  CheckCircle2,
  ArrowRight,
  Globe,
  Star,
  Wrench,
  Bot,
  Gift
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: <Zap size={28} />,
    title: "Fast & High-Performance",
    description: "Lightning-fast load times optimized for Core Web Vitals. Every millisecond counts when converting visitors into clients.",
  },
  {
    icon: <Smartphone size={28} />,
    title: "Mobile-First Design",
    description: "Flawlessly responsive across all devices. Your website looks stunning and functions perfectly on any screen size.",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Automated Lead Capture",
    description: "Built-in forms, smart CTAs, and automated follow-up flows that turn visitors into qualified leads while you sleep.",
  },
  {
    icon: <Globe size={28} />,
    title: "Industry-Specific Landing Pages",
    description: "Custom landing pages tailored to your industry's audience — from real estate to clinics, retail, and professional services.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Built-in Analytics",
    description: "Real-time dashboards showing visitor behavior, conversion rates, and key performance metrics — no third-party setup needed.",
  },
  {
    icon: <Bot size={28} />,
    title: "Free AI Chat Agent",
    description: "Every website comes with a fully configured AI-powered chat agent to engage visitors and capture leads 24/7 — at no extra cost.",
    highlight: true
  }
];

const pricingIncludes = [
  "Full custom website design",
  "Mobile-optimized layout",
  "Lead capture forms & automations",
  "Industry-specific landing page",
  "Built-in analytics dashboard",
  "AI Chat Agent (free gift)",
  "Ongoing monthly maintenance",
  "SEO-ready architecture"
];

import { useTranslations } from "next-intl";

export default function WebsitesPage() {
  const t = useTranslations("Websites");
  const [hovered, setHovered] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const regularFeatures = [
    { icon: <Zap size={28} />, title: t("features.items.fast.title"), description: t("features.items.fast.desc") },
    { icon: <Smartphone size={28} />, title: t("features.items.mobile.title"), description: t("features.items.mobile.desc") },
    { icon: <TrendingUp size={28} />, title: t("features.items.leadCapture.title"), description: t("features.items.leadCapture.desc") },
    { icon: <Globe size={28} />, title: t("features.items.landing.title"), description: t("features.items.landing.desc") },
    { icon: <BarChart3 size={28} />, title: t("features.items.analytics.title"), description: t("features.items.analytics.desc") },
  ];

  const pricingIncludes = t.raw("pricing.includes.items");
  const chatCalloutPoints = t.raw("chatCallout.points");
  const chatTags = t.raw("features.items.chat.tags");
  const howItWorksSteps = t.raw("howItWorks.steps");
  const howItWorksIcons = [<Star size={24} />, <Globe size={24} />, <Wrench size={24} />, <Zap size={24} />];

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
            <span className="text-[#7B2FFF]">
              {t("hero.title2")}
            </span>
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-5 bg-[#7B2FFF] text-white rounded-full font-black shadow-xl shadow-violet-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {t("hero.button")}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* ── Regular Feature Cards ── */}
            {regularFeatures.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative bg-white rounded-3xl p-8 border border-slate-100 shadow-md transition-all duration-300 overflow-hidden cursor-default text-start
                  ${hovered === i ? "scale-[1.02] shadow-xl" : "scale-100"}
                `}
              >
                {/* Icon: monochrome slate bg + dark icon — no color */}
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700 mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.description}</p>
                {/* Violet hover accent */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-[#7B2FFF] transition-opacity duration-300 ${hovered === i ? "opacity-100" : "opacity-0"}`}
                />
              </motion.div>
            ))}

            {/* ── Special Free AI Chat Agent Card ── */}
            <motion.div
              variants={fadeUp}
              className="relative md:col-span-2 lg:col-span-1 rounded-3xl overflow-hidden cursor-default group"
              style={{ minHeight: 320 }}
            >
              {/* Deep gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2d1259] to-[#0a0520]" />

              {/* Animated shimmer sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                animate={{ x: ["-150%", "200%"] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", repeatDelay: 1.5 }}
              />

              {/* Pulsing glow orbs */}
              <motion.div
                className="absolute top-4 right-8 w-32 h-32 bg-violet-500/30 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-6 left-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              />

              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none overflow-hidden">
                <div className="absolute top-12 left-18 scale-[120%] w-full h-full rotate-[45deg] origin-top-right">
                  <Image
                    src="/ui/gift_ribbons.png"
                    alt="Gift Ribbon"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between text-start">
                <div>
                  {/* Free Gift badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-bold mb-6 backdrop-blur-sm">
                    <Gift size={13} /> {t("features.items.chat.badge")}
                  </div>

                  {/* Bot icon — animated */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 mb-5 backdrop-blur-sm"
                    animate={{ boxShadow: ["0 0 0px #00D4FF40", "0 0 24px #00D4FF80", "0 0 0px #00D4FF40"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <Bot size={28} />
                  </motion.div>

                  <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                    {t("features.items.chat.title")}
                  </h3>
                  <p className="text-violet-200 leading-relaxed text-sm">
                    {t("features.items.chat.desc")}
                  </p>
                </div>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {chatTags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-violet-200 text-xs font-semibold backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Free Chat Agent Callout ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-violet-50 to-blue-50 rounded-[2.5rem] p-10 md:p-16 border border-violet-100 text-start">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#7B2FFF] font-bold text-sm mb-5 border border-violet-100 shadow-sm">
                  <Gift size={15} /> {t("chatCallout.badge")}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                  {t("chatCallout.title1")}
                  <br />
                  <span className="text-[#7B2FFF]">{t("chatCallout.title2")}</span>
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {t("chatCallout.desc")}
                </p>
                <ul className="space-y-3">
                  {chatCalloutPoints.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-[#7B2FFF] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bot Icon Visual */}
              <div className="shrink-0 w-48 h-48 rounded-[2rem] bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center shadow-2xl shadow-violet-300">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <Bot size={80} className="text-white" />
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("pricing.title")}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
              {/* Pricing Header */}
              <div className="bg-gradient-to-r from-[#1a0b2e] to-[#2d1259] p-10 md:p-14 text-center">
                <p className="text-violet-300 font-semibold text-sm uppercase tracking-widest mb-4">{t("pricing.package")}</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
                  <div>
                    <p className="text-violet-300 text-sm font-medium mb-1">{t("pricing.installation.label")}</p>
                    <div className="flex items-baseline gap-1 justify-center">
                      <span className="text-4xl md:text-5xl font-black text-white">{t("pricing.installation.price")}</span>
                      <span className="text-violet-300 font-semibold">{t("pricing.installation.unit")}</span>
                    </div>
                    <p className="text-violet-400 text-sm mt-1">{t("pricing.installation.sub")}</p>
                  </div>

                  <div className="hidden md:block w-px h-20 bg-violet-700/40" />
                  <div className="md:hidden h-px w-40 bg-violet-700/40" />

                  <div>
                    <p className="text-violet-300 text-sm font-medium mb-1">{t("pricing.maintenance.label")}</p>
                    <div className="flex items-baseline gap-1 justify-center">
                      <span className="text-4xl md:text-5xl font-black text-white">{t("pricing.maintenance.price")}</span>
                      <span className="text-violet-300 font-semibold">{t("pricing.maintenance.unit")}</span>
                    </div>
                    <p className="text-violet-400 text-sm mt-1">{t("pricing.maintenance.sub")}</p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="p-10 md:p-14 text-start">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{t("pricing.includes.title")}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pricingIncludes.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 size={18} className="text-[#7B2FFF] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-slate-500 text-sm max-w-xs">
                    {t("pricing.footer")}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-[#7B2FFF] text-white rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap"
                  >
                    {t("pricing.button")}
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Process Steps ────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("howItWorks.title")}</h2>
            <p className="text-slate-500">{t("howItWorks.subtitle")}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorksSteps.map((item: any, i: number) => (
              <AnimatedSection key={i}>
                <div className="text-center group">
                  <div className="relative mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#7B2FFF] text-[#7B2FFF] flex items-center justify-center font-black text-lg group-hover:bg-[#7B2FFF] group-hover:text-white transition-all duration-300">
                      {item.num}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1259] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              {/* Decorative orbs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-violet-200 font-semibold text-sm mb-6 border border-white/10">
                  <MessageSquareHeart size={15} /> {t("cta.badge")}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t("cta.title1")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                    {t("cta.title2")}
                  </span>
                </h2>
                <p className="text-violet-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  {t("cta.desc")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-5 bg-white text-[#1a0b2e] rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    {t("cta.button")}
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer7 />
      <Noura />
      <WebsiteOnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
