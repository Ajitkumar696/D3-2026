"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRetroAudio } from "@/components/retro-audio";
import { RetroFooter } from "@/components/retro-footer";
import {
  Sparkles,
  Trophy,
  Users,
  Eye,
  Globe,
  Share2,
  Cpu,
  Terminal,
  Layers,
  ArrowRight,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { FEST_CONFIG } from "@/lib/d3fest.config";

export default function AboutPage() {
  const { playSfx } = useRetroAudio();

  const stats = [
    {
      value: FEST_CONFIG.stats.participants,
      label: "TOTAL PARTICIPANTS",
      sublabel: "Highest attendance milestone in IIIT-BH history",
      icon: Users,
      color: "text-[#00f0ff]",
      borderColor: "border-[#00f0ff]",
      shadow: "shadow-[0_0_20px_rgba(0,240,255,0.4)]",
    },
    {
      value: FEST_CONFIG.stats.unstopImpressions,
      label: "UNSTOP IMPRESSIONS",
      sublabel: "1.2M+ views across national student platforms",
      icon: Eye,
      color: "text-[#ff7bf5]",
      borderColor: "border-[#ff7bf5]",
      shadow: "shadow-[0_0_20px_rgba(255,123,245,0.4)]",
    },
    {
      value: FEST_CONFIG.stats.websiteViews,
      label: "WEBSITE PAGEVIEWS",
      sublabel: "High-traffic interactive fest portal engagement",
      icon: Globe,
      color: "text-[#ffe600]",
      borderColor: "border-[#ffe600]",
      shadow: "shadow-[0_0_20px_rgba(255,230,0,0.4)]",
    },
    {
      value: FEST_CONFIG.stats.socialReach,
      label: "SOCIAL MEDIA REACH",
      sublabel: "Reels & media spanning 30K - 200K+ views",
      icon: Share2,
      color: "text-[#39ff14]",
      borderColor: "border-[#39ff14]",
      shadow: "shadow-[0_0_20px_rgba(57,255,20,0.4)]",
    },
    {
      value: `${FEST_CONFIG.stats.colleges} COLLEGES`,
      label: "NATIONAL FOOTPRINT",
      sublabel: `Across ${FEST_CONFIG.stats.states} Indian states competing on-campus`,
      icon: Trophy,
      color: "text-[#00f0ff]",
      borderColor: "border-[#00f0ff]",
      shadow: "shadow-[0_0_20px_rgba(0,240,255,0.4)]",
    },
    {
      value: FEST_CONFIG.stats.days,
      label: "NON-STOP TECHFEST",
      sublabel: "Symphony of arcade aesthetics & future tech",
      icon: Flame,
      color: "text-[#ff7bf5]",
      borderColor: "border-[#ff7bf5]",
      shadow: "shadow-[0_0_20px_rgba(255,123,245,0.4)]",
    },
  ];

  const pillars = [
    {
      step: "01",
      name: "DREAM",
      tagline: "REWIND THE PAST",
      color: "text-[#00f0ff]",
      border: "border-[#00f0ff]",
      desc: "Channel the iconic energy of 80s coin-op cabinets, synthwave aesthetics, and fearless curiosity to envision game-changing digital and hardware ideas.",
    },
    {
      step: "02",
      name: "DARE",
      tagline: "ENTER THE ARENA",
      color: "text-[#ff7bf5]",
      border: "border-[#ff7bf5]",
      desc: "Step into high-stakes 24-hour hackathons, 1v1 algorithmic duels, all-terrain combat bot battles, and cyber capture-the-flag competitions.",
    },
    {
      step: "03",
      name: "DEVELOP",
      tagline: "FAST-FORWARD THE FUTURE",
      color: "text-[#ffe600]",
      border: "border-[#ffe600]",
      desc: "Convert experimental prototypes into scalable, production-ready software, intelligent automation, and venture-backed startup solutions.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff7bf5] selection:text-white overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(25,10,45,0.7)_0%,_#05020c_75%)]" />
        <div className="absolute top-[12%] right-[5%] w-32 h-32 opacity-25">
          <Image src="/assets/planet.png" alt="Planet" fill className="object-contain" />
        </div>
        <div className="absolute top-[50%] left-[3%] w-28 h-28 opacity-20">
          <Image src="/assets/satellite.png" alt="Satellite" fill className="object-contain" />
        </div>
        <div className="absolute inset-0 crt-scanlines opacity-25" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* Header Badge & Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black border-2 border-[#00f0ff] text-[#00f0ff] font-pixel text-[10px] sm:text-xs tracking-wider mb-6 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MISSION DOSSIER // ABOUT US</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide mb-4">
            DREAM. <span className="text-[#ff7bf5] neon-pink">DARE.</span>{" "}
            <span className="text-[#00f0ff] neon-cyan">DEVELOP.</span>
          </h1>

          <p className="font-vt323 text-2xl sm:text-3xl text-[#ffe600] tracking-wider mb-8">
            EAST INDIA&apos;S PREMIER TECHFEST AT IIIT BHUBANESWAR
          </p>

          <div className="relative p-6 sm:p-8 bg-black/90 border-2 border-white/20 shadow-[0_0_35px_rgba(0,0,0,0.9)] text-left">
            <div className="font-pixel text-xs text-[#00f0ff] mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              <span>THE D³ MANIFESTO</span>
            </div>
            <p className="font-vt323 text-xl sm:text-2xl text-zinc-200 leading-relaxed mb-4">
              Get ready to rewind the past and fast-forward the future at <strong>D³ Techfest</strong>!
            </p>
            <p className="font-vt323 text-lg sm:text-xl text-zinc-300 leading-relaxed mb-4">
              Brought to life by the <strong>Technical Society</strong> and <strong>Automation and Robotics Society</strong> of <strong>IIIT Bhubaneswar</strong>, D³ is not just a fest; it&apos;s a four-day symphony of arcade aesthetics and futuristic innovation.
            </p>
            <p className="font-vt323 text-lg sm:text-xl text-zinc-300 leading-relaxed">
              Dive into a world where vintage charm meets tomorrow&apos;s tech, crafted for dreamers, doers, and disruptors across tech, management, and entrepreneurship. Whether you&apos;re channeling 80s arcade energy or pioneering the next big breakthrough, D³ is your stage. It&apos;s not just an event; it&apos;s your evolution in motion.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATS HUD - BENCHMARK MILESTONES */}
        {/* ========================================================================= */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black border border-[#39ff14] text-[#39ff14] font-pixel text-[9px] sm:text-xs tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>OFFICIAL 2025 BENCHMARK STATISTICS</span>
            </div>
            <h2 className="font-pixel text-2xl sm:text-4xl text-white tracking-wide">
              HISTORIC <span className="text-[#39ff14] neon-green">MILESTONES</span> & IMPACT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`relative p-6 bg-black/95 border-2 ${item.borderColor} ${item.shadow} flex flex-col justify-between group hover:-translate-y-1 transition-transform`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-pixel text-xs text-zinc-400">METRIC #{idx + 1}</span>
                    <IconComp className={`w-5 h-5 ${item.color}`} />
                  </div>

                  <div>
                    <h3 className={`font-pixel text-3xl sm:text-4xl ${item.color} mb-2 tracking-wide`}>
                      {item.value}
                    </h3>
                    <p className="font-pixel text-xs text-white tracking-wider mb-2">
                      {item.label}
                    </p>
                    <p className="font-vt323 text-lg text-zinc-400 leading-snug">
                      {item.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3 CORE PILLARS */}
        {/* ========================================================================= */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black border border-[#ffe600] text-[#ffe600] font-pixel text-[9px] sm:text-xs tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>THE 3 CORNERSTONES</span>
            </div>
            <h2 className="font-pixel text-2xl sm:text-4xl text-white tracking-wide">
              HOW WE <span className="text-[#ffe600] neon-yellow">LEVEL UP</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 bg-black/90 border-2 ${p.border} flex flex-col justify-between shadow-[0_0_25px_rgba(0,0,0,0.8)]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <span className="font-pixel text-xs text-zinc-400">{p.tagline}</span>
                    <span className={`font-pixel text-sm font-bold ${p.color}`}>{p.step}</span>
                  </div>

                  <h3 className={`font-pixel text-2xl sm:text-3xl ${p.color} tracking-wide mb-3`}>
                    {p.name}
                  </h3>

                  <p className="font-vt323 text-lg sm:text-xl text-zinc-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ORGANIZING SOCIETIES */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 bg-black/95 border-2 border-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.3)] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#090514] border border-[#00f0ff] text-[#00f0ff] font-pixel text-[9px] sm:text-[10px] tracking-wider mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>POWERED BY IIIT BHUBANESWAR</span>
              </div>
              <h2 className="font-pixel text-2xl sm:text-3xl text-white mb-4">
                ORGANIZED BY STUDENT PIONEERS
              </h2>
              <p className="font-vt323 text-lg sm:text-xl text-zinc-300 leading-relaxed mb-4">
                D³ is curated and hosted under the aegis of IIIT Bhubaneswar by two premier student technical bodies:
              </p>
              <ul className="space-y-3 font-vt323 text-lg sm:text-xl text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#00f0ff] shrink-0" />
                  <span><strong>Technical Society (TechSoc)</strong> — Orchestrating software hackathons, open-source sprints, competitive programming, and web3 tracks.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#ff7bf5] shrink-0" />
                  <span><strong>Automation and Robotics Society (ARS)</strong> — Engineering combat bots, autonomous drones, IoT circuits, and experiential tech showcases.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 bg-[#090514] p-6 border border-white/20 text-center">
              <div className="relative w-28 h-28">
                <Image src="/assets/logo.png" alt="D3 Logo" fill className="object-contain" />
              </div>
              <h3 className="font-pixel text-lg text-white">{FEST_CONFIG.name}</h3>
              <p className="font-vt323 text-lg text-zinc-400">
                {FEST_CONFIG.campus}
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link
                  href="/events"
                  onClick={() => playSfx("blip")}
                  className="px-4 py-2 bg-[#ff7bf5] text-black font-pixel text-xs uppercase font-bold border border-white hover:bg-[#ff7bf5]/90 transition-all flex items-center gap-1.5 shadow-[0_0_12px_#ff7bf5]"
                >
                  <span>VIEW ARENAS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => playSfx("blip")}
                  className="px-4 py-2 bg-black border border-[#00f0ff] text-[#00f0ff] font-pixel text-xs uppercase hover:bg-[#00f0ff] hover:text-black transition-all"
                >
                  CONTACT HQ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RetroFooter />
    </div>
  );
}

