"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRetroAudio } from "./retro-audio";
import { FEST_CONFIG } from "@/lib/d3fest.config";

export function HeroCabinetZoom() {
  const { playSfx } = useRetroAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cabinetWrapperRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: "/assets/trophy.png",
      value: "20+",
      label: "EVENTS",
    },
    {
      icon: "/assets/star.png",
      value: "1.9L+",
      label: "PRIZE POOL",
    },
    {
      icon: "/assets/group.png",
      value: FEST_CONFIG.stats.participants,
      label: "PARTICIPANTS",
    },
    {
      icon: "/assets/heart.png",
      value: FEST_CONFIG.stats.days,
      label: "NON-STOP",
    },
  ];

  const dotColors = [
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=180%",
          pin: pinSectionRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Hide the scroll prompt immediately on scroll
      tl.to(
        promptRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.15,
          ease: "power1.out",
        },
        0
      );

      // 2. Zoom cabinet capped at scale 3.25 directly on CRT center (50% 39%)
      tl.to(
        cabinetWrapperRef.current,
        {
          scale: 3.25,
          transformOrigin: "50% 39%",
          duration: 0.85,
          ease: "power1.inOut",
        },
        0
      );

      // 3. Smooth crossfade to crisp full-screen hero layout at 80-100% of scroll
      tl.to(
        cabinetWrapperRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        },
        0.75
      );

      tl.fromTo(
        heroOverlayRef.current,
        {
          opacity: 0,
          scale: 0.96,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.25,
          ease: "power1.out",
        },
        0.75
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative w-full min-h-screen bg-[#05020c]">
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
      >
        {/* Deep Synthwave Perspective Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Synthwave horizon sun glow */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-t from-[#ff007f] via-[#ffe600] to-orange-500 opacity-40 blur-md shadow-[0_0_80px_rgba(255,0,127,0.4)]" />

          {/* Perspective 3D Grid Floor with Pink Horizon */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[46vh] origin-bottom [transform:perspective(380px)_rotateX(62deg)]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255, 0, 127, 0.45) 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#05020c]/70 to-[#05020c]" />
          </div>

          {/* Scanline CRT overlay */}
          <div className="absolute inset-0 crt-scanlines opacity-30" />
        </div>

        {/* ========================================================================= */}
        {/* 1. 3D ARCADE CABINET WITH EMBEDDED CRT SCREEN */}
        {/* ========================================================================= */}
        <div
          ref={cabinetWrapperRef}
          className="relative z-20 w-[310px] sm:w-[390px] md:w-[450px] h-[430px] sm:h-[540px] md:h-[625px] flex items-center justify-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] will-change-transform"
          style={{ transformOrigin: "50% 39%" }}
        >
          {/* Main Arcade Cabinet Graphic */}
          <div className="relative w-full h-full pointer-events-none z-10">
            <Image
              src="/assets/arcade.png"
              alt="D³ FEST Arcade Machine"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Embedded Monitor Screen (proportionally fit inside cabinet bezel) */}
          <div
            className="absolute z-20 top-[21.5%] left-[19%] w-[59.5%] h-[35.5%] overflow-hidden rounded-[6px] sm:rounded-[8px] bg-[#070314] flex flex-col justify-between p-2.5 sm:p-3.5 text-white"
            style={{
              boxShadow: "inset 0 0 16px rgba(0, 255, 255, 0.3), inset 0 0 25px rgba(0, 0, 0, 0.9)",
              background: "radial-gradient(ellipse at center, rgba(18, 8, 42, 0.98) 0%, rgba(5, 2, 12, 1) 100%)",
            }}
          >
            <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none z-30" />

            <div className="relative z-20 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                {/* Left: DREAM DARE DEVELOP */}
                <div className="flex flex-col items-start gap-0.5">
                  <span
                    className="font-pixel text-[11px] sm:text-[14px] md:text-[17px] leading-tight tracking-wider text-[#00f0ff] uppercase"
                    style={{ textShadow: "0 2px 0 #005f73, 0 0 8px rgba(0, 240, 255, 0.6)" }}
                  >
                    DREAM
                  </span>
                  <span
                    className="font-pixel text-[11px] sm:text-[14px] md:text-[17px] leading-tight tracking-wider text-[#ff7bf5] uppercase"
                    style={{ textShadow: "0 2px 0 #9d0208, 0 0 8px rgba(255, 123, 245, 0.6)" }}
                  >
                    DARE
                  </span>
                  <span
                    className="font-pixel text-[11px] sm:text-[14px] md:text-[17px] leading-tight tracking-wider text-[#39ff14] uppercase"
                    style={{ textShadow: "0 2px 0 #208b3a, 0 0 8px rgba(57, 255, 20, 0.6)" }}
                  >
                    DEVELOP
                  </span>

                  <div className="flex items-center gap-0.5 mt-0.5">
                    {dotColors.slice(0, 10).map((color, idx) => (
                      <span
                        key={idx}
                        className="w-1 h-1 rounded-none"
                        style={{ backgroundColor: color, boxShadow: `0 0 3px ${color}` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Pac-Man & LET'S START */}
                <div className="flex flex-col items-end justify-center pl-1">
                  <div className="flex items-center gap-1 p-0.5">
                    <div className="relative w-3.5 sm:w-5 h-3.5 sm:h-5 shrink-0 animate-pacman-chomp">
                      <Image
                        src="/assets/pacman.png"
                        alt="Pac-Man"
                        fill
                        className="object-contain filter drop-shadow-[0_0_6px_#ffe600]"
                      />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-1 bg-[#ffe600] shadow-[0_0_3px_#ffe600]" />
                      <span className="w-1 h-1 bg-[#ffe600] shadow-[0_0_3px_#ffe600]" />
                      <ArrowRight className="w-2.5 h-2.5 text-[#ffe600] shrink-0" />
                    </div>
                    <span
                      className="font-pixel text-[7px] sm:text-[9px] text-[#ffe600] tracking-wider uppercase"
                      style={{ textShadow: "0 0 6px rgba(255, 230, 0, 0.8)" }}
                    >
                      LET&apos;S START
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CRT Bottom Micro Stats */}
            <div className="relative z-20 border-t border-white/20 pt-1 mt-0.5">
              <div className="grid grid-cols-4 gap-0.5 text-center items-center">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center">
                    <span className="font-pixel text-[6px] sm:text-[8px] font-bold text-white tracking-wider leading-none">
                      {stat.value}
                    </span>
                    <span className="font-pixel text-[4px] sm:text-[5px] text-[#00f0ff] tracking-tight leading-none mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. FULL-SCREEN CRISP OVERLAY (Crossfaded at 80-100% Zoom) */}
        {/* ========================================================================= */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-30 flex flex-col justify-between items-center py-20 px-4 sm:px-8 opacity-0 pointer-events-none"
        >
          {/* Starry Space backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(25,10,50,0.85)_0%,_#05020c_85%)] pointer-events-none" />
          <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />

          {/* Main Hero Row */}
          <div className="relative z-20 w-full max-w-7xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-10">
            {/* Left: 3D Typography */}
            <div className="lg:col-span-7 flex flex-col items-start gap-2 sm:gap-3 pl-2 sm:pl-6">
              <h1
                className="font-pixel text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#00f0ff] uppercase"
                style={{
                  textShadow: "0 6px 0 #005f73, 0 10px 0 #002b36, 0 0 25px rgba(0, 240, 255, 0.6)",
                }}
              >
                DREAM
              </h1>
              <h2
                className="font-pixel text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#ff7bf5] uppercase"
                style={{
                  textShadow: "0 6px 0 #9d0208, 0 10px 0 #370617, 0 0 25px rgba(255, 123, 245, 0.6)",
                }}
              >
                DARE
              </h2>
              <h3
                className="font-pixel text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#39ff14] uppercase"
                style={{
                  textShadow: "0 6px 0 #208b3a, 0 10px 0 #0f4c1e, 0 0 25px rgba(57, 255, 20, 0.6)",
                }}
              >
                DEVELOP
              </h3>

              {/* Colorful dot trail */}
              <div className="flex items-center gap-2 mt-4 pt-2">
                {dotColors.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-none"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Pac-Man dot-trail pointing to LET'S START */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-center justify-center gap-4 pr-2 sm:pr-6">
              <Link
                href="/events"
                onClick={() => playSfx("powerup")}
                onMouseEnter={() => playSfx("blip")}
                className="group flex items-center gap-3 sm:gap-4 p-4 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="relative w-12 sm:w-14 h-12 sm:h-14 shrink-0 animate-pacman-chomp">
                  <Image
                    src="/assets/pacman.png"
                    alt="Pac-Man"
                    fill
                    className="object-contain filter drop-shadow-[0_0_12px_#ffe600]"
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
                  <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
                  <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
                  <ArrowRight className="w-6 h-6 text-[#ffe600] shrink-0 group-hover:translate-x-1.5 transition-transform" />
                </div>

                <span
                  className="font-pixel text-xl sm:text-3xl text-[#ffe600] tracking-wider uppercase group-hover:text-white transition-colors"
                  style={{ textShadow: "0 0 15px rgba(255, 230, 0, 0.8)" }}
                >
                  LET&apos;S START
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom HUD Stats Bar */}
          <div className="relative z-20 w-full max-w-6xl border-t border-white/20 pt-6 pb-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-between text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2.5 sm:gap-3">
                  <div className="relative w-6 sm:w-8 h-6 sm:h-8 shrink-0">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-pixel text-xs sm:text-sm font-bold text-white tracking-wider">
                      {stat.value}
                    </span>
                    <span className="font-pixel text-[8px] sm:text-[9px] text-[#00f0ff] tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Instruction Prompt */}
        <div
          ref={promptRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 select-none pointer-events-none"
        >
          <div className="px-4 py-2 bg-black border-2 border-[#00f0ff] text-[#00f0ff] font-pixel text-[9px] sm:text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <span>SCROLL DOWN TO ENTER THE ARCADE</span>
          </div>
          <ChevronDown className="w-5 h-5 text-[#ff007f] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
