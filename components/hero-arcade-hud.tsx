"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRetroAudio } from "./retro-audio";

export function HeroArcadeHud() {
  const { playSfx } = useRetroAudio();

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
      value: "1000",
      label: "PARTICIPANTS",
    },
    {
      icon: "/assets/heart.png",
      value: "3 DAYS",
      label: "NON-STOP",
    },
  ];

  // Alternating colorful dots below DREAM DARE DEVELOP
  const dotColors = [
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
    "#00f0ff", "#ff007f", "#ffe600", "#39ff14",
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#05020c] flex flex-col justify-between items-center py-20 px-4 sm:px-8 overflow-hidden select-none">
      {/* Starry Night Space Backdrop matching Slide 4 of 1.png */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,5,40,0.6)_0%,_#05020c_80%)]" />
        <div className="absolute inset-0 crt-scanlines opacity-25" />
      </div>

      {/* Main Screen Content Grid matching Slide 4 of 1.png */}
      <div className="relative z-20 w-full max-w-7xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
        {/* Left Col: Giant 3D Pixel Typography (DREAM DARE DEVELOP) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-2 sm:gap-3 pl-2 sm:pl-6">
          {/* DREAM (Cyan) */}
          <h1
            className="font-pixel text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#00f0ff] uppercase"
            style={{
              textShadow: "0 6px 0 #005f73, 0 10px 0 #002b36, 0 0 25px rgba(0, 240, 255, 0.6)",
            }}
          >
            DREAM
          </h1>

          {/* DARE (Pink) */}
          <h2
            className="font-pixel text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#ff7bf5] uppercase"
            style={{
              textShadow: "0 6px 0 #9d0208, 0 10px 0 #370617, 0 0 25px rgba(255, 123, 245, 0.6)",
            }}
          >
            DARE
          </h2>

          {/* DEVELOP (Green) */}
          <h3
            className="font-pixel text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#39ff14] uppercase"
            style={{
              textShadow: "0 6px 0 #208b3a, 0 10px 0 #0f4c1e, 0 0 25px rgba(57, 255, 20, 0.6)",
            }}
          >
            DEVELOP
          </h3>

          {/* Row of alternating colorful pixel dots */}
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

        {/* Right Col: Pac-Man dot-trail pointing to LET'S START */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-center justify-center gap-4 pr-2 sm:pr-6">
          <Link
            href="/events"
            onClick={() => playSfx("powerup")}
            onMouseEnter={() => playSfx("blip")}
            className="group flex flex-wrap items-center gap-3 sm:gap-4 p-4 hover:scale-105 transition-transform cursor-pointer"
          >
            {/* Pac-Man Yellow Sprite */}
            <div className="relative w-12 sm:w-14 h-12 sm:h-14 shrink-0 animate-pacman-chomp">
              <Image
                src="/assets/pacman.png"
                alt="Pac-Man"
                fill
                className="object-contain filter drop-shadow-[0_0_12px_#ffe600]"
              />
            </div>

            {/* Glowing Yellow Dots */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
              <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
              <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
              <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
              <span className="w-2.5 h-2.5 bg-[#ffe600] shadow-[0_0_8px_#ffe600]" />
              <span className="text-[#ffe600] text-xl font-bold">➜</span>
            </div>

            {/* LET'S START / SCROLL TO START Text */}
            <div className="flex flex-col">
              <span
                className="font-pixel text-lg sm:text-2xl text-[#ffe600] tracking-wider uppercase group-hover:text-white transition-colors"
                style={{ textShadow: "0 0 12px rgba(255, 230, 0, 0.8)" }}
              >
                LET&apos;S START
              </span>
              <span className="font-pixel text-[9px] sm:text-[10px] text-zinc-400 tracking-widest uppercase">
                SCROLL TO START
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom HUD Stats Bar matching Slide 4 of 1.png */}
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
    </section>
  );
}
