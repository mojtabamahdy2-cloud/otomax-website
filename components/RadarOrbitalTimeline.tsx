'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Types ──────────────────


export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: any;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}


export interface RadarOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// ─── Radar Background ──── 

const RadarBackground = ({ beamAngle }: { beamAngle: number }) => {
  const circles = new Array(8).fill(null);

  return (
    <>
      {/* Concentric circles — centred on the container */}
      {circles.map((_, idx) => (
        <motion.div
          key={`bg-circle-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: idx * 0.08, duration: 0.3 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: `${(idx + 1) * 80}px`,
            height: `${(idx + 1) * 80}px`,
            border: `1px solid rgba(71, 85, 105, ${1 - (idx + 1) * 0.1})`,
          }}
        />
      ))}

      {/* Spinning beam — pivot on the centre */}
      <div
        className="absolute left-1/2 top-1/2 z-10 pointer-events-none"
        style={{ 
          transformOrigin: "0% 50%", 
          width: "400px", 
          height: "5px",
          transform: `rotate(${beamAngle}deg) translateY(-50%)`,
        }}
      >
        <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent mt-[2px] shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
      </div>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RadarOrbitalTimeline({
  timelineData,
}: RadarOrbitalTimelineProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [beamAngle, setBeamAngle] = useState(0);
  const [itemRadii, setItemRadii] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Fix all icons on the 6th orbit (diameter 480px, radius 240px)
    const radii = timelineData.map(() => 240);
    setItemRadii(radii);

    let timer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.1) % 360); // Slower icon movement
        setBeamAngle((prev) => (prev + 0.6) % 360); // Significantly slower beam
      }, 30);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate, mounted, timelineData]);

  const getRelatedItems = (itemId: number): number[] =>
    timelineData.find((item) => item.id === itemId)?.relatedIds ?? [];

  const centerViewOnNode = (nodeId: number) => {
    const idx = timelineData.findIndex((item) => item.id === nodeId);
    setRotationAngle(270 - (idx / timelineData.length) * 360);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => { next[parseInt(k)] = false; });
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const pulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return next;
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = itemRadii[index] || 320;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.round(radius * Math.cos(radian) * 10000) / 10000,
      y: Math.round(radius * Math.sin(radian) * 10000) / 10000,
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))),
      currentAngle: angle,
    };
  };

  const isRelatedToActive = (itemId: number) =>
    activeNodeId ? getRelatedItems(activeNodeId).includes(itemId) : false;

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-gray-800 border-gray-800";
      case "in-progress": return "text-white bg-violet-500 border-violet-500";
      case "pending": return "text-gray-600 bg-gray-100 border-gray-300";
      default: return "text-gray-600 bg-gray-100 border-gray-300";
    }
  };

  // SSR placeholder
  if (!mounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/80" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center bg-transparent overflow-hidden"
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">

        {/* ── Radar background layer ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <RadarBackground beamAngle={beamAngle} />
        </div>

        {/* ── Orbital layer ── */}
        <div
          ref={orbitRef}
          className="absolute w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Central pulsating orb */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-400 animate-pulse flex items-center justify-center z-20">
            <div className="absolute w-20 h-20 rounded-full border border-violet-500/20 animate-ping opacity-70" />
            <div
              className="absolute w-24 h-24 rounded-full border border-violet-500/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md" />
          </div>


          {/* Orbiting nodes */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const angleDiff = Math.abs(pos.currentAngle - beamAngle);
            const isTouched = angleDiff < 15 || angleDiff > 345;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy aura */}
                <div
                  className={twMerge(
                    "absolute rounded-full -inset-1 transition-all duration-300",
                    isTouched ? "scale-150 opacity-100" : "opacity-0"
                  )}
                  style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0) 70%)",
                    width: `80px`,
                    height: `80px`,
                    left: `-20px`,
                    top: `-20px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={twMerge(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-100 transform",
                    isExpanded
                      ? "bg-black text-white border-black shadow-lg shadow-black/20 scale-150"
                      : isTouched
                        ? "bg-white text-black border-violet-400 scale-125 shadow-[0_0_15px_rgba(124,58,237,0.6)]"
                        : isRelated
                          ? "bg-gray-200 text-black border-gray-400 animate-pulse"
                          : "bg-white text-black border-black/10"
                  )}
                >
                  <Icon size={24} className={twMerge("transition-colors duration-100", isTouched ? "text-violet-600" : "text-black")} />
                </div>

                {/* Label */}
                <div
                  className={twMerge(
                    "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300",
                    isExpanded ? "text-gray-900 scale-125" : "text-gray-500"
                  )}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white backdrop-blur-lg border-black/10 shadow-xl shadow-black/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-black/30" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE"
                            : item.status === "in-progress" ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-gray-400">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-gray-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-600">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-black/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-gray-500">
                            <Zap size={10} className="mr-1" />Energy Level
                          </span>
                          <span className="font-mono text-gray-700">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-black/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-gray-400 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-gray-400">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const rel = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-black/20 bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {rel?.title}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
