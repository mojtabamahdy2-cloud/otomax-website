"use client";
import { cn } from "@/lib/utils";
import React, { Suspense, lazy } from "react";
const Spline = lazy(() => import('@splinetool/react-spline'));
import { 
  Globe, 
  Database, 
  FileText, 
  Clock, 
  Calendar, 
  Zap,
  MessageSquare
} from "lucide-react";

export interface CpuArchitectureSvgProps {
  className?: string;
  width?: string;
  height?: string;
  text?: string;
  showCpuConnections?: boolean;
  lineMarkerSize?: number;
  animateText?: boolean;
  animateLines?: boolean;
  animateMarkers?: boolean;
}

const CpuArchitecture = ({
  className,
  width = "100%",
  height = "100%",
  text = "A.I.",
  showCpuConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
}: CpuArchitectureSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      <g fill="none" strokeWidth="0.5">
        {/* Static Background Lines (Thin Gray) */}
        <path id="route-1" d="M 92.5 35 v -10 q 0 -5 -5 -5 h -77.5" stroke="#333" strokeOpacity="0.5" />
        <path id="route-2" d="M 107.5 35 v -20 q 0 -5 5 -5 h 67.5" stroke="#333" strokeOpacity="0.5" />
        <path id="route-3" d="M 82 48 h -47 q -5 0 -5 -5 v -13" stroke="#333" strokeOpacity="0.5" />
        <path id="route-4" d="M 118 48 h 47 q 5 0 5 5 v 27" stroke="#333" strokeOpacity="0.5" />
        <path id="route-5" d="M 92.5 65 q -4.5 0 -4.5 5 v 18" stroke="#333" strokeOpacity="0.5" />
        <path id="route-6" d="M 107.5 65 q 5 0 5 0 h 22.5" stroke="#333" strokeOpacity="0.5" />

        {/* Pulse Animations (Electrical Activity Outwards) */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <g key={`pulse-${i}`}>
            <circle r="0.8" fill="#00E8ED" filter="url(#glow)">
              <animateMotion dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                <mpath href={`#route-${i}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          </g>
        ))}
      </g>

      {/* Functional Icons at Node Endpoints */}
      {[
        { pos: { x: 10, y: 20 }, icon: <Globe />, label: "Social" },
        { pos: { x: 180, y: 10 }, icon: <Database />, label: "Database" },
        { pos: { x: 30, y: 30 }, icon: <FileText />, label: "Files" },
        { pos: { x: 170, y: 80 }, icon: <Clock />, label: "24/7" },
        { pos: { x: 88, y: 88 }, icon: <Calendar />, label: "Booking" },
        { pos: { x: 135, y: 65 }, icon: <Zap />, label: "Automation" },
      ].map((item, idx) => (
        <g key={`icon-node-${idx}`}>
          {/* Pulsing ring around icon */}
          <circle cx={item.pos.x} cy={item.pos.y} r="5" fill="none" stroke="#00E8ED" strokeWidth="0.2">
             <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <foreignObject x={item.pos.x - 5} y={item.pos.y - 5} width="10" height="10">
            <div className="w-full h-full flex items-center justify-center bg-neutral-950/80 border border-neutral-800 rounded-full p-1.5 backdrop-blur-sm shadow-[0_0_10px_rgba(0,232,237,0.1)]">
              {React.cloneElement(item.icon as React.ReactElement<any>, { 
                strokeWidth: 2.5,
                className: "w-full h-full text-[#00E8ED]" 
              })}
            </div>
          </foreignObject>
        </g>
      ))}

      {/* Lights moving along paths */}
      <g mask="url(#cpu-mask-1)">
        <circle className="cpu-architecture cpu-line-1" cx="0" cy="0" r="4" fill="url(#cpu-blue-grad)" />
      </g>
      <g mask="url(#cpu-mask-2)">
        <circle className="cpu-architecture cpu-line-2" cx="0" cy="0" r="4" fill="url(#cpu-yellow-grad)" />
      </g>
      <g mask="url(#cpu-mask-3)">
        <circle className="cpu-architecture cpu-line-3" cx="0" cy="0" r="4" fill="url(#cpu-pinkish-grad)" />
      </g>
      <g mask="url(#cpu-mask-4)">
        <circle className="cpu-architecture cpu-line-4" cx="0" cy="0" r="4" fill="url(#cpu-white-grad)" />
      </g>
      <g mask="url(#cpu-mask-5)">
        <circle className="cpu-architecture cpu-line-5" cx="0" cy="0" r="4" fill="url(#cpu-green-grad)" />
      </g>
      <g mask="url(#cpu-mask-6)">
        <circle className="cpu-architecture cpu-line-6" cx="0" cy="0" r="4" fill="url(#cpu-orange-grad)" />
      </g>
      {/* CPU Box */}
      <g>
        {/* Cpu connections */}
        {showCpuConnections && (
          <g fill="url(#cpu-connection-gradient)">
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect
              x="116.3"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="122.8"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="104"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="114.5"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="80"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
            <rect
              x="87"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
          </g>
        )}
        {/* 3D Spline Robot - Replacing SVG Head */}
        <foreignObject x="75" y="25" width="50" height="50">
          <div className="w-full h-full flex items-center justify-center pointer-events-none">
            <Suspense fallback={<div className="w-4 h-4 rounded-full bg-cyan-500/20 animate-pulse" />}>
              <Spline
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full transform scale-150 origin-center"
              />
            </Suspense>
          </div>
        </foreignObject>

        {/* AI AGENT Text - Re-positioned below the Spline model */}
        <text
          x="100"
          y="78"
          textAnchor="middle"
          fontSize="4"
          fill="url(#cpu-text-gradient)"
          fontWeight="700"
          letterSpacing="0.1em"
          style={{ fontFamily: 'Cairo, sans-serif', opacity: 0.8 }}
        >
          AI AGENT
        </text>
      </g>
      {/* Masks */}
      <defs>
        <mask id="cpu-mask-1">
          <path d="M 10 20 h 77.5 q 5 0 5 5 v 10" strokeWidth="1" stroke="white" />
        </mask>
        <mask id="cpu-mask-2">
          <path d="M 180 10 h -67.5 q -5 0 -5 5 v 20" strokeWidth="1" stroke="white" />
        </mask>
        <mask id="cpu-mask-3">
          <path d="M 30 30 h 50 q 4 0 4 5 v 15" strokeWidth="1" stroke="white" />
        </mask>
        <mask id="cpu-mask-4">
          <path d="M 170 80 v -25 q 0 -5 -5 -5 h -50" strokeWidth="1" stroke="white" />
        </mask>
        <mask id="cpu-mask-5">
          <path d="M 88 88 v -18 q 0 -5 4.5 -5" strokeWidth="1" stroke="white" />
        </mask>
        <mask id="cpu-mask-6">
          <path d="M 135 65 h -22.5 q -5 0 -5 0" strokeWidth="1" stroke="white" />
        </mask>
        {/* Gradients */}
        <radialGradient id="cpu-blue-grad" fx="1">
          <stop offset="0%" stopColor="#00E8ED" />
          <stop offset="50%" stopColor="#08F" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#FFD800" />
          <stop offset="50%" stopColor="#FFD800" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-pinkish-grad" fx="1">
          <stop offset="0%" stopColor="#830CD1" />
          <stop offset="50%" stopColor="#FF008B" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-white-grad" fx="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-green-grad" fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-orange-grad" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-cyan-grad" fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-rose-grad" fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter
          id="cpu-light-shadow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feDropShadow
            dx="1.5"
            dy="1.5"
            stdDeviation="1"
            floodColor="black"
            floodOpacity="0.1"
          />
        </filter>
        <marker
          id="cpu-circle-marker"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle
            id="innerMarkerCircle"
            cx="5"
            cy="5"
            r="2"
            fill="black"
            stroke="#232323"
            strokeWidth="0.5"
          >
            {animateMarkers && (
              <animate attributeName="r" values="0; 3; 2" dur="0.5s" />
            )}
          </circle>
        </marker>
        {/* Cpu connection gradient */}
        <linearGradient
          id="cpu-connection-gradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>
        {/* Add CPU Text Gradient */}
        <linearGradient id="cpu-text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2;"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export { CpuArchitecture };
