"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRetroAudio } from "./retro-audio";
import {
  Sparkles,
  Trophy,
  Flame,
  Code,
  Layers,
  ExternalLink,
  ChevronRight,
  Zap,
  Clock,
  Award,
} from "lucide-react";

interface RoadmapLevel {
  id: number;
  levelNum: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  islandImage: string;
  tagColor: string;
  bgColor: string;
  description: string;
  highlights: { label: string; icon: React.ElementType }[];
  awaits: string[];
  details: {
    teamSize: string;
    rounds: string;
    prize: string;
  };
}

export function EventsRoadmap() {
  const { playSfx } = useRetroAudio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pacmanRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<RoadmapLevel | null>(null);
  const [eatenCount, setEatenCount] = useState(0);

  // Total pellets along the path
  const PELLET_COUNT = 32;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const section = sectionRef.current;
    const pacman = pacmanRef.current;
    const path = pathRef.current;

    if (!section || !pacman || !path) return;

    const ctx = gsap.context(() => {
      // Animate Pac-Man along the SVG path scrubbed to scroll
      gsap.to(pacman, {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Update how many pellets are eaten
            const eaten = Math.floor(progress * PELLET_COUNT);
            setEatenCount(eaten);
          },
        },
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      });

      // Animate level cards on entrance
      const cards = gsap.utils.toArray<HTMLElement>(".level-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const levels = [
    {
      id: 1,
      levelNum: "LEVEL 01",
      badge: "FIRST CHALLENGE AHEAD!",
      badgeColor: "bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/50",
      title: "CRAFT N CODE '26",
      subtitle: "National 24-Hour Flagship Hackathon",
      islandImage: "/assets/level 1 base.png",
      tagColor: "border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]",
      bgColor: "from-[#00f0ff]/10 to-transparent border-[#00f0ff]/40",
      description:
        "Assemble your elite squad of builders, designers, and problem solvers. Build breakthrough software and hardware solutions within 24 hours under the guidance of top industry mentors.",
      highlights: [
        { label: "24 Hours Non-Stop", icon: Clock },
        { label: "Real-World Tracks", icon: Zap },
        { label: "₹1,00,000+ Prize Pool", icon: Trophy },
        { label: "Internship & VC Direct Track", icon: Award },
      ],
      awaits: [
        "Hardware IoT & Web3 Track bounties",
        "Free food, energy drinks & gaming lounges",
        "Exclusive limited-edition D³ swag packs",
      ],
      details: {
        teamSize: "2 - 4 Members",
        rounds: "Online Abstract -> 24hr On-Campus Finale",
        prize: "₹1,00,000 Cash + Swag + Goodies",
      },
    },
    {
      id: 2,
      levelNum: "LEVEL 02",
      badge: "1v1 BATTLE ROYALE!",
      badgeColor: "bg-[#ff007f]/20 text-[#ff007f] border-[#ff007f]/50",
      title: "CODE KOMBAT",
      subtitle: "1v1 Speed & Algorithmic Elimination Showdown",
      islandImage: "/assets/lvl2 entry.png",
      tagColor: "border-[#ff007f] text-[#ff007f] shadow-[0_0_15px_rgba(255,0,127,0.4)]",
      bgColor: "from-[#ff007f]/10 to-transparent border-[#ff007f]/40",
      description:
        "Step into the digital colosseum. Face off head-to-head in rapid elimination rounds where every millisecond, optimization, and edge-case counts towards glorious victory.",
      highlights: [
        { label: "1v1 Head-to-Head", icon: Flame },
        { label: "Instant Elimination", icon: Zap },
        { label: "Algorithmic Showdowns", icon: Code },
        { label: "Grand Champion Trophy", icon: Trophy },
      ],
      awaits: [
        "Live code projection arena with spectators",
        "Mystery wildcard constraints each round",
        "Exclusive Code Kombat champion rings & merch",
      ],
      details: {
        teamSize: "Individual (Solo)",
        rounds: "Qualifier -> Quarter -> Semi -> Grand Finale",
        prize: "₹45,000 Cash + Combat Badges",
      },
    },
    {
      id: 3,
      levelNum: "LEVEL 03",
      badge: "EXPLORE THE FUTURE!",
      badgeColor: "bg-[#ffe600]/20 text-[#ffe600] border-[#ffe600]/50",
      title: "TECHXPO '26",
      subtitle: "Innovation on Display & Live Startup Booths",
      islandImage: "/assets/lvl3_entry.png",
      tagColor: "border-[#ffe600] text-[#ffe600] shadow-[0_0_15px_rgba(255,230,0,0.4)]",
      bgColor: "from-[#ffe600]/10 to-transparent border-[#ffe600]/40",
      description:
        "The flagship technology exhibition bringing together cutting-edge student projects, robotics demonstrations, AI innovations, and live startup showcases in front of angel investors.",
      highlights: [
        { label: "Live Startup Booths", icon: Layers },
        { label: "Hardware & Robotics Arena", icon: Zap },
        { label: "Investor Pitch Sessions", icon: Trophy },
        { label: "Public Crowd Voting", icon: Award },
      ],
      awaits: [
        "Direct feedback from seed investors & CXOs",
        "Live demo stalls with hands-on interaction",
        "Incubation and cloud credit grants",
      ],
      details: {
        teamSize: "1 - 5 Members",
        rounds: "Expo Display -> Jury Pitch -> Awards Gala",
        prize: "₹50,000 + Incubation Grants",
      },
    },
  ];

  // Generate coordinates for pellets along SVG path
  const pelletDots = Array.from({ length: PELLET_COUNT }, (_, i) => i);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative w-full min-h-screen bg-[#050510] py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Starfield & Space Decors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,10,60,0.4)_0%,_#050510_75%)]" />
        <div className="absolute inset-0 crt-scanlines opacity-25" />

        {/* Floating Space Island Decor */}
        <div className="absolute top-[10%] left-[2%] w-36 h-36 opacity-35 animate-retro-float">
          <Image
            src="/assets/island.png"
            alt="Island"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute top-[48%] right-[3%] w-32 h-32 opacity-40 animate-retro-float [animation-delay:2s]">
          <Image
            src="/assets/small island2.png"
            alt="Small Island"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute top-[82%] left-[4%] w-36 h-36 opacity-35 animate-retro-float [animation-delay:1s]">
          <Image
            src="/assets/small island.png"
            alt="Small Island"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-20 max-w-4xl mx-auto text-center mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/80 border border-[#39ff14] text-[#39ff14] font-pixel text-[10px] sm:text-xs tracking-wider mb-4 shadow-[0_0_15px_rgba(57,255,20,0.3)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ROADMAP // CHOOSE YOUR QUEST</span>
        </div>
        <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-white tracking-wider mb-4">
          EVENT <span className="text-[#00f0ff] neon-cyan">LEVELS</span> &{" "}
          <span className="text-[#ff007f] neon-pink">ARENAS</span>
        </h2>
        <p className="font-vt323 text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto">
          Navigate the quest line below. Follow Pac-Man as you scroll through the arenas of D³ FEST 2026.
        </p>
      </div>

      {/* Relative Container for SVG Path, Follower & Level Cards */}
      <div className="relative z-20 max-w-6xl mx-auto min-h-[1600px] flex flex-col justify-between">
        {/* SVG Motion Path & Pac-Man Trail */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 1600"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* The Winding Snaking Path connecting Levels 1, 2, 3 */}
            <path
              ref={pathRef}
              d="M 500 40 
                 C 800 180, 850 340, 500 480 
                 C 150 620, 150 820, 500 960 
                 C 850 1100, 850 1300, 500 1480 
                 L 500 1580"
              stroke="rgba(0, 240, 255, 0.2)"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
          </svg>

          {/* Glowing Animated Pac-Man Scroll Follower Sprite */}
          <div
            ref={pacmanRef}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-40 pointer-events-none drop-shadow-[0_0_15px_#ffe600]"
          >
            <Image
              src="/assets/pacman.png"
              alt="Pac-Man Follower"
              fill
              className="object-contain animate-pacman-chomp"
            />
          </div>

          {/* Dots along the path showing eaten state */}
          <div className="absolute inset-0">
            {pelletDots.map((dotIndex) => {
              // Distribute dots proportionally along vertical height
              const isEaten = dotIndex <= eatenCount;
              return (
                <div
                  key={dotIndex}
                  className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                    isEaten
                      ? "opacity-20 scale-75 bg-zinc-600"
                      : "opacity-100 scale-100 bg-[#ffe600] shadow-[0_0_10px_#ffe600] animate-pulse"
                  }`}
                  style={{
                    top: `${(dotIndex / PELLET_COUNT) * 94 + 3}%`,
                    left: `${50 + Math.sin(dotIndex * 0.7) * 28}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Level Cards Stack */}
        <div className="flex flex-col gap-24 sm:gap-36 relative z-30">
          {levels.map((lvl, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={lvl.id}
                className={`level-card w-full flex flex-col ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 lg:gap-12`}
              >
                {/* Level Graphic / Floating Platform */}
                <div className="w-full md:w-5/12 flex flex-col items-center justify-center relative group">
                  {/* Floating Level Island / Entry portal */}
                  <div className="relative w-72 sm:w-80 h-64 sm:h-72 p-4 flex items-center justify-center">
                    <div className="relative w-full h-full animate-retro-float">
                      <Image
                        src={lvl.islandImage}
                        alt={lvl.title}
                        fill
                        className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Floating Arcade Ghost Badges */}
                    <div className="absolute top-2 right-4 px-2.5 py-1 bg-black/90 border font-pixel text-[9px] uppercase tracking-wider rounded-none animate-bounce shadow-[0_0_12px_rgba(255,0,127,0.4)] border-[#ff007f] text-[#ff007f]">
                      {lvl.badge}
                    </div>
                  </div>
                </div>

                {/* Level Quest Card Details */}
                <div className="w-full md:w-7/12">
                  <div
                    className={`relative p-6 sm:p-8 bg-gradient-to-br ${lvl.bgColor} bg-black/80 backdrop-blur-md border-2 ${lvl.tagColor} transition-all duration-300 hover:shadow-2xl`}
                  >
                    {/* Header Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="font-pixel text-xs sm:text-sm text-white px-2.5 py-1 bg-black/80 border border-white/30">
                        {lvl.levelNum}
                      </span>
                      <span
                        className={`font-pixel text-[9px] sm:text-[10px] px-2.5 py-1 border ${lvl.badgeColor}`}
                      >
                        {lvl.badge}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h3 className="font-pixel text-xl sm:text-2xl lg:text-3xl text-white tracking-wide mb-1">
                      {lvl.title}
                    </h3>
                    <p className="font-vt323 text-lg sm:text-xl text-[#00f0ff] mb-4 tracking-wider">
                      {lvl.subtitle}
                    </p>

                    {/* Description */}
                    <p className="font-vt323 text-lg sm:text-xl text-zinc-300 mb-6 leading-relaxed">
                      {lvl.description}
                    </p>

                    {/* Key Highlights Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {lvl.highlights.map((h, hIdx) => {
                        const IconComp = h.icon;
                        return (
                          <div
                            key={hIdx}
                            className="flex items-center gap-2 p-2.5 bg-black/60 border border-white/10"
                          >
                            <IconComp className="w-4 h-4 text-[#ffe600] shrink-0" />
                            <span className="font-vt323 text-base sm:text-lg text-zinc-200">
                              {h.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* WHAT AWAITS? Section */}
                    <div className="p-4 bg-black/90 border border-white/15 mb-6">
                      <div className="flex items-center gap-2 font-pixel text-[10px] text-[#39ff14] mb-2 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        WHAT AWAITS?
                      </div>
                      <ul className="space-y-1.5">
                        {lvl.awaits.map((item, aIdx) => (
                          <li
                            key={aIdx}
                            className="flex items-start gap-2 font-vt323 text-base sm:text-lg text-zinc-300"
                          >
                            <ChevronRight className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          playSfx("coin");
                          setSelectedEvent(lvl);
                        }}
                        onMouseEnter={() => playSfx("blip")}
                        className="px-5 py-2.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-[10px] sm:text-xs tracking-wider uppercase font-bold border border-white shadow-[0_0_15px_rgba(0,240,255,0.5)] active:translate-y-0.5 transition-all cursor-pointer"
                      >
                        VIEW MISSION DETAILS
                      </button>

                      <a
                        href="https://drive.google.com/file/d/1iyiSNVeNCb1sEuLReG3oIY8hC8bFBZ0u/view"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playSfx("blip")}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white font-pixel text-[10px] border border-white/20 transition-all"
                      >
                        <span>RULEBOOK</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Mission Briefing Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#050510] border-2 border-[#00f0ff] p-6 sm:p-8 shadow-[0_0_40px_rgba(0,240,255,0.6)]">
            <div className="flex items-center justify-between mb-4 border-b border-white/15 pb-3">
              <div className="flex items-center gap-2 font-pixel text-xs text-[#00f0ff]">
                <Zap className="w-4 h-4 text-[#ffe600]" />
                <span>MISSION INTEL // {selectedEvent.levelNum}</span>
              </div>
              <button
                onClick={() => {
                  playSfx("blip");
                  setSelectedEvent(null);
                }}
                className="px-2 py-1 font-pixel text-xs bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white"
              >
                CLOSE [X]
              </button>
            </div>

            <h3 className="font-pixel text-xl sm:text-2xl text-white mb-1">
              {selectedEvent.title}
            </h3>
            <p className="font-vt323 text-lg text-[#ff007f] mb-4">
              {selectedEvent.subtitle}
            </p>

            <div className="space-y-3 mb-6 bg-black/60 p-4 border border-white/10 font-vt323 text-lg text-zinc-200">
              <p>
                <strong className="text-[#ffe600]">TEAM FORMAT:</strong>{" "}
                {selectedEvent.details.teamSize}
              </p>
              <p>
                <strong className="text-[#39ff14]">STRUCTURE:</strong>{" "}
                {selectedEvent.details.rounds}
              </p>
              <p>
                <strong className="text-[#00f0ff]">BOUNTY POOL:</strong>{" "}
                {selectedEvent.details.prize}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <a
                href="https://drive.google.com/file/d/1iyiSNVeNCb1sEuLReG3oIY8hC8bFBZ0u/view"
                target="_blank"
                rel="noreferrer"
                onClick={() => playSfx("powerup")}
                className="w-full text-center py-3 bg-[#ff007f] hover:bg-[#ff007f]/90 text-white font-pixel text-xs uppercase tracking-widest border border-white shadow-[0_0_20px_rgba(255,0,127,0.6)]"
              >
                DOWNLOAD FULL RULEBOOK PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
