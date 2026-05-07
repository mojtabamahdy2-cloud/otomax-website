"use client";

import React, { useState } from "react";
import NavBar from "@/components/ui/navBar";
import RadarOrbitalTimeline, { type TimelineItem } from "@/components/RadarOrbitalTimeline";
import { Footer7 } from "@/components/footer-7";
import { cn } from "@/lib/utils";
import { ConsultationOnboardingModal } from "@/components/consultation-onboarding-modal";
import {
  Rocket, Lock, Database, LineChart, Users, Settings, Bell, Star,
  Search, SlidersHorizontal, FileText, Megaphone, Headphones, Laptop,
  Building2, Map, Lightbulb, Bot, ListChecks, PresentationIcon, Clock, ArrowRight,
} from "lucide-react";

// ─── Data from assessment_info ──────────────────────────────────────────────

import { useTranslations } from "next-intl";

export default function AssessmentPage() {
  const t = useTranslations("Assessment");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const phases = [
    {
      number: "01",
      title: t("phases.discover.title"),
      description: t("phases.discover.desc"),
      icon: Search,
    },
    {
      number: "02",
      title: t("phases.analyse.title"),
      description: t("phases.analyse.desc"),
      icon: SlidersHorizontal,
    },
    {
      number: "03",
      title: t("phases.recommend.title"),
      description: t("phases.recommend.desc"),
      icon: FileText,
    },
  ];

  const areas = [
    {
      title: t("whatWeAssess.areas.leadGen.title"),
      icon: Megaphone,
      color: "text-violet-600 bg-violet-50",
      description: t("whatWeAssess.areas.leadGen.desc"),
      tags: t.raw("whatWeAssess.areas.leadGen.tags"),
      full: false,
    },
    {
      title: t("whatWeAssess.areas.customerService.title"),
      icon: Headphones,
      color: "text-violet-600 bg-violet-50",
      description: t("whatWeAssess.areas.customerService.desc"),
      tags: t.raw("whatWeAssess.areas.customerService.tags"),
      full: false,
    },
    {
      title: t("whatWeAssess.areas.crm.title"),
      icon: Database,
      color: "text-violet-600 bg-violet-50",
      description: t("whatWeAssess.areas.crm.desc"),
      tags: t.raw("whatWeAssess.areas.crm.tags"),
      full: false,
    },
    {
      title: t("whatWeAssess.areas.outreach.title"),
      icon: Laptop,
      color: "text-violet-600 bg-violet-50",
      description: t("whatWeAssess.areas.outreach.desc"),
      tags: t.raw("whatWeAssess.areas.outreach.tags"),
      full: false,
    },
    {
      title: t("whatWeAssess.areas.internal.title"),
      icon: Building2,
      color: "text-violet-600 bg-violet-50",
      description: t("whatWeAssess.areas.internal.desc"),
      tags: t.raw("whatWeAssess.areas.internal.tags"),
      full: true,
    },
  ];

  const outcomes = [
    { icon: Map, title: t("outcomes.items.processMap.title"), description: t("outcomes.items.processMap.desc") },
    { icon: Lightbulb, title: t("outcomes.items.gapAnalysis.title"), description: t("outcomes.items.gapAnalysis.desc") },
    { icon: Bot, title: t("outcomes.items.automationReport.title"), description: t("outcomes.items.automationReport.desc") },
    { icon: ListChecks, title: t("outcomes.items.roadmap.title"), description: t("outcomes.items.roadmap.desc") },
    { icon: PresentationIcon, title: t("outcomes.items.reviewSession.title"), description: t("outcomes.items.reviewSession.desc") },
    { icon: Clock, title: t("outcomes.items.timeSavings.title"), description: t("outcomes.items.timeSavings.desc") },
  ];

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: "Platform Launch",
      date: "Jan 2024",
      content: "Initial release of the core platform with essential SaaS features and onboarding flow.",
      category: "Milestone",
      icon: Rocket,
      relatedIds: [2, 3],
      status: "completed",
      energy: 100,
    },
    {
      id: 2,
      title: "Auth & Security",
      date: "Feb 2024",
      content: "Rolled out multi-factor authentication, SSO support, and role-based access control.",
      category: "Security",
      icon: Lock,
      relatedIds: [1, 4],
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Database Scaling",
      date: "Mar 2024",
      content: "Migrated to distributed database architecture to support 10x user growth.",
      category: "Infrastructure",
      icon: Database,
      relatedIds: [1, 5],
      status: "completed",
      energy: 85,
    },
    {
      id: 4,
      title: "Analytics Dashboard",
      date: "Apr 2024",
      content: "Launched real-time analytics with custom reporting and data export capabilities.",
      category: "Product",
      icon: LineChart,
      relatedIds: [2, 6],
      status: "completed",
      energy: 78,
    },
    {
      id: 5,
      title: "Team Collaboration",
      date: "May 2024",
      content: "Introduced workspaces, shared dashboards, and team permission management.",
      category: "Product",
      icon: Users,
      relatedIds: [3, 7],
      status: "in-progress",
      energy: 65,
    },
    {
      id: 6,
      title: "API & Integrations",
      date: "Jun 2024",
      content: "Public REST API launched with 50+ third-party integrations via webhooks.",
      category: "Platform",
      icon: Settings,
      relatedIds: [4, 8],
      status: "in-progress",
      energy: 55,
    },
    {
      id: 7,
      title: "Smart Notifications",
      date: "Jul 2024",
      content: "AI-powered alerts and notification rules based on user behavior and thresholds.",
      category: "AI",
      icon: Bell,
      relatedIds: [5, 8],
      status: "pending",
      energy: 40,
    },
    {
      id: 8,
      title: "Enterprise Tier",
      date: "Aug 2024",
      content: "Dedicated infrastructure, SLA guarantees, and white-labeling for enterprise clients.",
      category: "Business",
      icon: Star,
      relatedIds: [6, 7],
      status: "pending",
      energy: 30,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Radar Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-white">
        {/* Liquid Glass Text Bubble for Readability */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/30 shadow-xl shadow-violet-500/5 w-fit whitespace-nowrap pointer-events-none">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
            {t("hero.title1")} <span className="text-violet-600">{t("hero.title2")}</span>
          </h1>
        </div>

        {/* Radar scaled down to prevent trimming */}
        <div className="absolute inset-0 z-10 flex items-center justify-center scale-75 md:scale-90 transition-transform duration-700">
          <RadarOrbitalTimeline timelineData={timelineData} />
        </div>
      </section>

      {/* Detailed Info Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 space-y-24">

        {/* Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div key={phase.number} className="group p-8 rounded-3xl border border-neutral-100 hover:border-violet-200 transition-all hover:shadow-xl hover:shadow-violet-50">
                <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase text-violet-300 mb-2">{t("phases.prefix")} {phase.number}</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{phase.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{phase.description}</p>
              </div>
            );
          })}
        </div>

        <hr className="border-neutral-100" />

        {/* Areas */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight mb-4">{t("whatWeAssess.title")}</h2>
            <p className="text-neutral-500 font-medium">{t("whatWeAssess.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className={cn(
                  "p-8 rounded-3xl border border-neutral-100 hover:border-violet-200 transition-all",
                  area.full && "md:col-span-2"
                )}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900">{area.title}</h4>
                  </div>
                  <p className="text-neutral-500 leading-relaxed mb-6">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-neutral-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcomes */}
        <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 space-y-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-tight mb-4">{t("outcomes.title")}</h2>
              <p className="text-neutral-400 font-medium text-lg">{t("outcomes.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {outcomes.map((outcome) => {
                const Icon = outcome.icon;
                return (
                  <div key={outcome.title} className="space-y-3">
                    <div className="text-violet-400">
                      <Icon size={24} />
                    </div>
                    <h5 className="font-bold text-lg">{outcome.title}</h5>
                    <p className="text-neutral-500 text-sm leading-relaxed">{outcome.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-violet-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl shadow-violet-200">
          <div className="space-y-2 text-center md:text-start">
            <h3 className="text-2xl font-black tracking-tight">{t("cta.title")}</h3>
            <p className="text-violet-100 font-medium">{t("cta.subtitle")}</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-white text-violet-600 rounded-2xl font-bold flex items-center gap-3 hover:bg-violet-50 transition-colors shadow-lg"
          >
            {t("cta.button")}
          </button>
        </div>

      </section>

      {/* Footer Section */}
      <Footer7 />

      <ConsultationOnboardingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
