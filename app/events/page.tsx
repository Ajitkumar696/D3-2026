"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useRetroAudio } from "@/components/retro-audio";
import { RetroFooter } from "@/components/retro-footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Box,
  Lightbulb,
  Swords,
  Zap,
  Store,
  Eye,
  Users,
  ExternalLink,
  X,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Lock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Search,
} from "lucide-react";
import { FEST_CONFIG, EventItem } from "@/lib/d3fest.config";

export default function EventsPage() {
  const { playSfx } = useRetroAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const pacmanRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const currentActiveIdx = useRef<number>(-1);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showStateModal, setShowStateModal] = useState(false);
  const [craftEvent, setCraftEvent] = useState<EventItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allEvents = FEST_CONFIG.events;

  const categories = [
    "ALL",
    "24-Hour Flagship Hackathon",
    "Competitive Programming",
    "Innovation Exhibition & Startup Stalls",
    "Cybersecurity & Cryptography",
    "Design & Product Experience",
    "Robotics & Hardware",
    "Autonomous & FPV Robotics",
    "Masterclasses & Workshops",
    "Festival Ceremony",
  ];

  const filteredGridEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesCategory =
        activeCategory === "ALL" || event.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allEvents, activeCategory, searchQuery]);

  // Orthogonal waypoints connecting left (x: 25%) and right (x: 75%) card rows
  const pathWaypoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const totalEvents = allEvents.length;

    for (let i = 0; i < totalEvents; i++) {
      const isEven = i % 2 === 0;
      // y-position matching the center of each card row
      const yPos = 2.5 + (i / (totalEvents - 1)) * 93;
      const cardX = isEven ? 25 : 75;

      if (i === 0) {
        points.push({ x: 25, y: yPos });
      } else {
        const prevX = points[points.length - 1].x;
        // 1. Move vertically down to new row
        points.push({ x: prevX, y: yPos });
        // 2. Move horizontally 90-degrees across to the new card
        points.push({ x: cardX, y: yPos });
      }
    }

    // Finale path leading straight down to the Consolidated All-Events Grid
    const lastX = points[points.length - 1].x;
    points.push({ x: lastX, y: 98 });
    points.push({ x: 50, y: 98 });
    points.push({ x: 50, y: 100 });

    return points;
  }, [allEvents.length]);

  // Generate continuous yellow grid dots along each orthogonal segment
  const allDots = useMemo(() => {
    const dots: { x: number; y: number; id: number }[] = [];
    let dotId = 0;

    for (let i = 0; i < pathWaypoints.length - 1; i++) {
      const p1 = pathWaypoints[i];
      const p2 = pathWaypoints[i + 1];
      const isH = p1.y === p2.y;
      const steps = isH
        ? Math.max(6, Math.round(Math.abs(p2.x - p1.x) / 1.6))
        : Math.max(5, Math.round(Math.abs(p2.y - p1.y) / 0.8));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        dots.push({
          x: p1.x + (p2.x - p1.x) * t,
          y: p1.y + (p2.y - p1.y) * t,
          id: dotId++,
        });
      }
    }
    return dots;
  }, [pathWaypoints]);

  // Calculate Pac-Man position and orthogonal rotation along waypoints
  const getPacmanPos = useMemo(() => {
    return (prog: number) => {
      const totalSegs = pathWaypoints.length - 1;
      const scaled = Math.min(prog * totalSegs, totalSegs - 0.001);
      const segIdx = Math.floor(scaled);
      const segT = scaled - segIdx;

      const p1 = pathWaypoints[segIdx];
      const p2 = pathWaypoints[segIdx + 1];

      const x = p1.x + (p2.x - p1.x) * segT;
      const y = p1.y + (p2.y - p1.y) * segT;

      let rot = 0;
      let flipY = false;

      if (p2.x > p1.x) {
        rot = 0;
      } else if (p2.x < p1.x) {
        rot = 180;
        flipY = true;
      } else if (p2.y > p1.y) {
        rot = 90;
      } else if (p2.y < p1.y) {
        rot = 270;
      }

      return { x, y, rot, flipY };
    };
  }, [pathWaypoints]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pacmanEl = pacmanRef.current;
    if (!container || !pacmanEl) return;

    // Refresh ScrollTrigger when layout mounts
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top+=80",
        end: "bottom bottom-=80",
        scrub: 0.1,
        onUpdate: (self) => {
          const prog = self.progress;
          const pos = getPacmanPos(prog);

          // 1. Direct 60fps DOM update for Pac-Man (never lags or freezes)
          pacmanEl.style.left = `${pos.x}%`;
          pacmanEl.style.top = `${pos.y}%`;
          pacmanEl.style.transform = `translate(-50%, -50%) rotate(${pos.rot}deg) ${
            pos.flipY ? "scaleY(-1)" : ""
          }`;

          // 2. Dim eaten dots
          if (dotsContainerRef.current) {
            const dotElements = dotsContainerRef.current.children;
            const eatenIndex = Math.floor(prog * dotElements.length);
            for (let i = 0; i < dotElements.length; i++) {
              const el = dotElements[i] as HTMLElement;
              if (i <= eatenIndex) {
                el.style.opacity = "0.15";
                el.style.transform = "translate(-50%, -50%) scale(0.6)";
                el.style.backgroundColor = "#52525b";
                el.style.boxShadow = "none";
              } else {
                el.style.opacity = "1";
                el.style.transform = "translate(-50%, -50%) scale(1)";
                el.style.backgroundColor = "#ffe600";
                el.style.boxShadow = "0 0 8px #ffe600";
              }
            }
          }

          // 3. Highlight & GLOW the active event card as Pac-Man arrives
          const totalEvents = allEvents.length;
          const targetCardIdx = Math.min(
            Math.floor(prog * totalEvents),
            totalEvents - 1
          );

          if (targetCardIdx !== currentActiveIdx.current) {
            currentActiveIdx.current = targetCardIdx;

            cardRefs.current.forEach((cardEl, idx) => {
              if (!cardEl) return;
              if (idx === targetCardIdx) {
                // Glow active card
                cardEl.classList.add(
                  "ring-2",
                  "ring-[#ffe600]",
                  "scale-[1.02]",
                  "shadow-[0_0_35px_rgba(255,230,0,0.7)]"
                );
              } else {
                // Remove active glow
                cardEl.classList.remove(
                  "ring-2",
                  "ring-[#ffe600]",
                  "scale-[1.02]",
                  "shadow-[0_0_35px_rgba(255,230,0,0.7)]"
                );
              }
            });
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [allEvents.length, getPacmanPos]);

  const handleCtaClick = (event: EventItem) => {
    if (event.stateRounds && event.stateRounds.length > 0) {
      playSfx("powerup");
      setCraftEvent(event);
      setShowStateModal(true);
    } else if (event.unstopLink) {
      playSfx("coin");
      window.open(event.unstopLink, "_blank", "noopener,noreferrer");
    } else {
      playSfx("blip");
    }
  };

  const getAwaitsIcon = (index: number) => {
    const icons = [Clock, Box, Lightbulb, ShieldCheck, Zap, Swords, Store, Eye, Users];
    const IconComp = icons[index % icons.length];
    return <IconComp className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />;
  };

  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff7bf5] selection:text-white overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(25,10,45,0.7)_0%,_#05020c_75%)]" />
        <div className="absolute top-[8%] right-[8%] w-24 h-24 opacity-35">
          <Image src="/assets/planet.png" alt="Planet" fill className="object-contain" />
        </div>
        <div className="absolute top-[40%] left-[3%] w-24 h-24 opacity-25">
          <Image src="/assets/side_planet.png" alt="Side Planet" fill className="object-contain" />
        </div>
        <div className="absolute top-[65%] right-[4%] w-28 h-28 opacity-30">
          <Image src="/assets/satellite.png" alt="Satellite" fill className="object-contain" />
        </div>
        <div className="absolute inset-0 crt-scanlines opacity-25" />
      </div>

      {/* ========================================================================= */}
      {/* 1. COMPACT 2-COLUMN ZIG-ZAG ROADMAP WITH SNAKING PAC-MAN TRAIL */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pt-24 pb-12 flex flex-col justify-between"
        style={{ minHeight: `${allEvents.length * 270}px` }}
      >
        {/* Orthogonal Yellow Dot Trail Layer (snaking between left & right cards) */}
        <div
          ref={dotsContainerRef}
          className="absolute inset-0 pointer-events-none hidden md:block z-20"
        >
          {allDots.map((dot) => (
            <div
              key={dot.id}
              className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-[#ffe600] shadow-[0_0_8px_#ffe600] rounded-none transition-all duration-75"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
              }}
            />
          ))}
        </div>

        {/* SINGLE Animated Pac-Man Sprite (Positioned directly on the dot path) */}
        <div
          ref={pacmanRef}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 z-25 pointer-events-none drop-shadow-[0_0_15px_#ffe600] will-change-transform hidden md:block"
          style={{
            left: "25%",
            top: "2.5%",
            transform: "translate(-50%, -50%) rotate(0deg)",
          }}
        >
          <Image
            src="/assets/pacman.png"
            alt="Pac-Man"
            fill
            className="object-contain animate-pacman-chomp"
          />
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN ALTERNATING ZIG-ZAG CARDS (HIGH DENSITY: 3-4 VISIBLE PER SCREEN) */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-6 sm:gap-8 relative z-30 pt-2">
          {allEvents.map((event, idx) => {
            const isEven = idx % 2 === 0; // Even => Left, Odd => Right
            const themeColor =
              idx % 3 === 0
                ? "border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                : idx % 3 === 1
                ? "border-[#ff7bf5] shadow-[0_0_15px_rgba(255,123,245,0.3)]"
                : "border-[#ffe600] shadow-[0_0_15px_rgba(255,230,0,0.3)]";

            const badgeBg =
              idx % 3 === 0
                ? "bg-[#00f0ff] text-black"
                : idx % 3 === 1
                ? "bg-[#ff7bf5] text-black"
                : "bg-[#ffe600] text-black";

            return (
              <div
                key={event.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`w-full md:w-[48%] max-w-[580px] ${
                  isEven ? "self-start md:mr-auto" : "self-end md:ml-auto"
                } transition-all duration-200`}
              >
                {/* Compact Level Tag Header */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 ${badgeBg} font-pixel text-[9px] sm:text-[10px] font-bold tracking-widest border border-white`}
                    >
                      {event.level}
                    </span>
                    <span className="font-pixel text-[8px] sm:text-[9px] text-[#ffe600] tracking-wider truncate max-w-[180px]">
                      {event.bannerBadge || event.category}
                    </span>
                  </div>
                  <span className="font-pixel text-[8px] text-zinc-500 uppercase shrink-0">
                    ARENA #{idx + 1}
                  </span>
                </div>

                {/* Dual-Monitor Layout: Main Monitor + Side "WHAT AWAITS?" Panel */}
                <div
                  className={`flex flex-col sm:flex-row items-stretch gap-2.5 p-3 sm:p-3.5 bg-black/95 border-2 ${themeColor}`}
                >
                  {/* Main Monitor */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Title & Subtitle */}
                      <div className="flex items-start justify-between gap-1.5 mb-1 border-b border-white/10 pb-1">
                        <div className="min-w-0">
                          <h3 className="font-pixel text-sm sm:text-base text-white tracking-wide truncate">
                            {event.title}
                          </h3>
                          <p className="font-pixel text-[9px] sm:text-[10px] text-[#ff7bf5] uppercase tracking-wider truncate">
                            {event.subtitle}
                          </p>
                        </div>
                        <span className="font-vt323 text-xs text-[#00f0ff] shrink-0">
                          {event.teamFormat || "All Teams"}
                        </span>
                      </div>

                      {/* Compact Description */}
                      <p className="font-vt323 text-sm sm:text-base text-zinc-300 leading-snug mb-2 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Schedule Strip */}
                      <div className="grid grid-cols-3 gap-1 bg-[#090514] p-1.5 border border-white/10 font-vt323 text-xs text-zinc-300 mb-2.5 text-center">
                        <div>
                          <span className="text-zinc-500 text-[9px] block leading-none">DATE</span>
                          <strong className="text-[#00f0ff] font-pixel text-[8px]">{event.date}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[9px] block leading-none">TIME</span>
                          <strong className="text-[#ffe600] font-pixel text-[8px]">{event.time}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[9px] block leading-none">VENUE</span>
                          <strong className="text-[#39ff14] font-pixel text-[8px] truncate block">{event.venue.split("(")[0]}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1.5 pt-1 border-t border-white/10">
                      {event.stateRounds && event.stateRounds.length > 0 ? (
                        <button
                          onClick={() => handleCtaClick(event)}
                          onMouseEnter={() => playSfx("blip")}
                          className="flex-1 py-1.5 px-2 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-[8px] sm:text-[9px] font-bold uppercase border border-white shadow-[0_0_8px_rgba(0,240,255,0.6)] cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1"
                        >
                          <span>QUALIFIERS</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ) : event.unstopLink ? (
                        <button
                          onClick={() => handleCtaClick(event)}
                          onMouseEnter={() => playSfx("blip")}
                          className="flex-1 py-1.5 px-2 bg-[#ff7bf5] hover:bg-[#ff7bf5]/90 text-black font-pixel text-[8px] sm:text-[9px] font-bold uppercase border border-white shadow-[0_0_8px_rgba(255,123,245,0.6)] cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1"
                        >
                          <span>REGISTER</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 py-1.5 px-2 bg-zinc-900 border border-zinc-700 text-zinc-500 font-pixel text-[8px] sm:text-[9px] uppercase flex items-center justify-center gap-1 cursor-not-allowed"
                        >
                          <Lock className="w-2.5 h-2.5 text-zinc-500" />
                          <span>COMING SOON</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          playSfx("coin");
                          setSelectedEvent(event);
                        }}
                        onMouseEnter={() => playSfx("blip")}
                        className="px-2.5 py-1.5 bg-black border border-white/20 hover:border-white text-white font-pixel text-[8px] uppercase transition-all cursor-pointer"
                      >
                        INTEL
                      </button>
                    </div>
                  </div>

                  {/* Side Panel (WHAT AWAITS?) */}
                  <div className="w-full sm:w-36 p-2 bg-[#090514] border border-white/10 flex flex-col justify-between shrink-0">
                    <div>
                      <span className="font-pixel text-[8px] text-[#ffe600] border-b border-white/10 pb-1 mb-1.5 block tracking-wider">
                        WHAT AWAITS?
                      </span>
                      <ul className="space-y-1 font-vt323 text-xs text-zinc-300">
                        {event.whatAwaits.slice(0, 4).map((item, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-1 truncate">
                            {getAwaitsIcon(aIdx)}
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-1 border-t border-white/10 mt-1 flex items-center justify-between text-[10px] font-vt323 text-zinc-400">
                      <span>LVL {idx + 1}</span>
                      <span className="text-[#39ff14] font-pixel text-[7px]">READY</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONSOLIDATED ALL-EVENTS GRID VIEW */}
      {/* ========================================================================= */}
      <section
        id="all-events-grid"
        className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-28"
      >
        <div className="border-t-2 border-white/20 pt-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border-2 border-[#39ff14] text-[#39ff14] font-pixel text-[9px] sm:text-[10px] tracking-wider mb-2.5 shadow-[0_0_10px_rgba(57,255,20,0.3)]">
              <Layers className="w-3.5 h-3.5" />
              <span>CONSOLIDATED FESTIVAL DIRECTORY</span>
            </div>
            <h2 className="font-pixel text-xl sm:text-2xl text-white tracking-wide mb-1.5">
              ALL 17 <span className="text-[#39ff14] neon-green">ARENAS</span> & TRACKS
            </h2>
            <p className="font-vt323 text-base sm:text-lg text-zinc-300">
              Filter by category or search through every official competition, workshop, and ceremony.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-md mx-auto mb-5 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#00f0ff] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search arenas by keyword..."
                className="w-full bg-[#090514] border-2 border-white/20 focus:border-[#00f0ff] pl-9 pr-4 py-1.5 text-white font-vt323 text-base placeholder:text-zinc-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSfx("blip");
                  setActiveCategory(cat);
                }}
                className={`px-2.5 py-1 font-pixel text-[8px] sm:text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#ff7bf5] text-black border border-white shadow-[0_0_10px_#ff7bf5] scale-105"
                    : "bg-black/80 text-zinc-400 border border-white/15 hover:border-[#ff7bf5] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGridEvents.map((event) => (
              <div
                key={event.id}
                className="bg-black/90 border-2 border-white/20 hover:border-[#00f0ff] p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:-translate-y-0.5 group"
              >
                <div>
                  {/* Category Badge & Level */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className="px-1.5 py-0.5 bg-[#090514] border border-[#00f0ff]/50 text-[#00f0ff] font-pixel text-[7px] uppercase tracking-wider">
                      {event.category}
                    </span>
                    <span className="font-pixel text-[8px] text-[#ffe600] font-bold">
                      {event.level}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-pixel text-sm text-white group-hover:text-[#00f0ff] transition-colors mb-0.5 truncate">
                    {event.title}
                  </h3>
                  <p className="font-vt323 text-xs text-[#ff7bf5] mb-1.5 truncate">
                    {event.subtitle}
                  </p>

                  <p className="font-vt323 text-xs sm:text-sm text-zinc-300 line-clamp-2 mb-2.5 leading-snug">
                    {event.description}
                  </p>
                </div>

                <div>
                  {/* Schedule Badges: DATE: TBA | TIME: TBA | VENUE: TBA */}
                  <div className="space-y-0.5 bg-[#090514] p-2 border border-white/10 font-vt323 text-xs text-zinc-300 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                        <Calendar className="w-2.5 h-2.5 text-[#00f0ff]" /> DATE:
                      </span>
                      <strong className="text-white font-pixel text-[8px]">{event.date}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                        <Clock className="w-2.5 h-2.5 text-[#ffe600]" /> TIME:
                      </span>
                      <strong className="text-white font-pixel text-[8px]">{event.time}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                        <MapPin className="w-2.5 h-2.5 text-[#39ff14]" /> VENUE:
                      </span>
                      <strong className="text-[#39ff14] font-pixel text-[8px] truncate max-w-[110px]">{event.venue}</strong>
                    </div>
                  </div>

                  {/* Action Buttons: Register on Unstop / Qualifier or Coming Soon & Mission Intel */}
                  <div className="flex gap-1.5">
                    {event.stateRounds && event.stateRounds.length > 0 ? (
                      <button
                        onClick={() => handleCtaClick(event)}
                        className="flex-1 py-1.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-[8px] font-bold uppercase border border-white shadow-[0_0_8px_rgba(0,240,255,0.5)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>QUALIFIERS</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ) : event.unstopLink ? (
                      <button
                        onClick={() => handleCtaClick(event)}
                        className="flex-1 py-1.5 bg-[#ff7bf5] hover:bg-[#ff7bf5]/90 text-black font-pixel text-[8px] font-bold uppercase border border-white shadow-[0_0_8px_rgba(255,123,245,0.5)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>REGISTER</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-500 font-pixel text-[8px] uppercase flex items-center justify-center gap-1 cursor-not-allowed"
                      >
                        <Lock className="w-2.5 h-2.5 text-zinc-500" />
                        <span>COMING SOON</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        playSfx("coin");
                        setSelectedEvent(event);
                      }}
                      onMouseEnter={() => playSfx("blip")}
                      className="px-2 py-1.5 bg-black border border-white/20 hover:border-white text-white font-pixel text-[8px] uppercase cursor-pointer transition-all"
                    >
                      INTEL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CRAFT N CODE STATE SELECTOR POPUP (ARCADE STAGE SELECT) */}
      {/* ========================================================================= */}
      {showStateModal && craftEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-[#070314] border-2 border-[#00f0ff] p-4 sm:p-6 shadow-[0_0_35px_rgba(0,240,255,0.8)] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3.5 border-b-2 border-white/20 pb-2.5">
              <div className="flex items-center gap-2 font-pixel text-xs text-[#00f0ff]">
                <Sparkles className="w-4 h-4 text-[#ffe600]" />
                <span>STAGE SELECT // REGIONAL QUALIFIERS</span>
              </div>
              <button
                onClick={() => {
                  playSfx("blip");
                  setShowStateModal(false);
                }}
                className="flex items-center gap-1 px-2 py-1 font-pixel text-xs bg-red-500/20 text-red-400 border border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>

            <div className="text-center mb-4">
              <h3 className="font-pixel text-lg sm:text-xl text-white mb-1">
                CHOOSE YOUR <span className="text-[#ffe600]">QUALIFIER ZONE</span>
              </h3>
              <p className="font-vt323 text-base text-zinc-300">
                Select your respective state/regional qualifier portal to register your team on Unstop.
              </p>
            </div>

            {/* Regional Qualifier Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {craftEvent.stateRounds?.map((round, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-black/80 border-2 border-white/20 hover:border-[#ff7bf5] transition-all hover:shadow-[0_0_10px_rgba(255,123,245,0.4)] flex flex-col justify-between gap-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[8px] text-[#00f0ff]">
                      ZONE #{idx + 1}
                    </span>
                    <MapPin className="w-3 h-3 text-[#ffe600] group-hover:scale-110 transition-transform" />
                  </div>

                  <h4 className="font-pixel text-xs text-white group-hover:text-[#ff7bf5] transition-colors truncate">
                    {round.state}
                  </h4>

                  <a
                    href={round.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playSfx("coin")}
                    className="w-full py-1.5 bg-[#ff7bf5] hover:bg-[#ff7bf5]/90 text-black font-pixel text-[8px] font-bold uppercase border border-white text-center flex items-center justify-center gap-1 shadow-[0_0_8px_#ff7bf5]"
                  >
                    <span>ENTER QUALIFIER</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="p-2 bg-black border border-white/10 text-center font-vt323 text-xs sm:text-sm text-zinc-400">
              Teams qualifying from any regional track advance to the 24-Hour Grand Finale on-campus at IIIT Bhubaneswar!
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. GENERAL EVENT MISSION INTEL MODAL */}
      {/* ========================================================================= */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#05020c] border-2 border-[#00f0ff] p-4 sm:p-6 shadow-[0_0_35px_rgba(0,240,255,0.7)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 border-b-2 border-white/20 pb-2">
              <div className="flex items-center gap-1.5 font-pixel text-xs text-[#00f0ff]">
                <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" />
                <span>MISSION INTEL // {selectedEvent.category}</span>
              </div>
              <button
                onClick={() => {
                  playSfx("blip");
                  setSelectedEvent(null);
                }}
                className="flex items-center gap-1 px-2 py-1 font-pixel text-xs bg-red-500/20 text-red-400 border border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>

            <h3 className="font-pixel text-lg sm:text-xl text-white mb-0.5">
              {selectedEvent.title}
            </h3>
            <p className="font-vt323 text-base text-[#ff7bf5] mb-2.5">
              {selectedEvent.subtitle}
            </p>

            <p className="font-vt323 text-sm sm:text-base text-zinc-300 mb-3 bg-black/80 p-2.5 border border-white/10 leading-relaxed">
              {selectedEvent.description}
            </p>

            {/* Schedule Highlights: DATE: TBA | TIME: TBA | VENUE: TBA */}
            <div className="grid grid-cols-3 gap-1.5 mb-3 font-vt323 text-xs sm:text-sm text-zinc-300 bg-[#090514] p-2 border border-white/15 text-center">
              <div>
                <span className="text-zinc-500 block text-[10px]">DATE</span>
                <strong className="text-[#00f0ff] font-pixel text-[9px]">{selectedEvent.date}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">TIME</span>
                <strong className="text-[#ffe600] font-pixel text-[9px]">{selectedEvent.time}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">LOCATION</span>
                <strong className="text-[#39ff14] font-pixel text-[8px] truncate block">{selectedEvent.venue}</strong>
              </div>
            </div>

            {/* What Awaits */}
            {selectedEvent.whatAwaits && selectedEvent.whatAwaits.length > 0 && (
              <div className="space-y-1 mb-4 bg-black p-2.5 border border-white/20">
                <h4 className="font-pixel text-[9px] text-[#ffe600] mb-1 uppercase">
                  WHAT AWAITS?
                </h4>
                <ul className="space-y-0.5 font-vt323 text-xs text-zinc-300">
                  {selectedEvent.whatAwaits.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-[#00f0ff] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action CTA */}
            <div className="space-y-2">
              {selectedEvent.stateRounds && selectedEvent.stateRounds.length > 0 ? (
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setShowStateModal(true);
                    setCraftEvent(selectedEvent);
                  }}
                  className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-xs uppercase tracking-widest font-bold border-2 border-white shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                >
                  <span>SELECT REGIONAL QUALIFIER</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : selectedEvent.unstopLink ? (
                <a
                  href={selectedEvent.unstopLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSfx("powerup")}
                  className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#ff7bf5] hover:bg-[#ff7bf5]/90 text-black font-pixel text-xs uppercase tracking-widest font-bold border-2 border-white shadow-[0_0_12px_rgba(255,123,245,0.6)]"
                >
                  <span>REGISTER ON UNSTOP</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-zinc-900 border border-zinc-700 text-zinc-500 font-pixel text-xs uppercase cursor-not-allowed"
                >
                  <Lock className="w-3 h-3 text-zinc-500" />
                  <span>REGISTRATION COMING SOON</span>
                </button>
              )}

              {selectedEvent.rulebookLink && (
                <a
                  href={selectedEvent.rulebookLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSfx("blip")}
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-black border border-white/30 hover:border-white text-zinc-300 hover:text-white font-pixel text-[8px] sm:text-[9px] uppercase transition-all"
                >
                  <span>DOWNLOAD RULEBOOK PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <RetroFooter />
    </div>
  );
}
