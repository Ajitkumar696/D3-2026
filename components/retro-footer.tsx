"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRetroAudio } from "./retro-audio";
import { XIcon } from "lucide-react";

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10v5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.2" cy="7.5" r="1" fill="currentColor" />
      <path d="M12.1 15.8V12.7c0-1.3.9-2.2 2.1-2.2 1.2 0 2 .8 2 2.3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RetroFooter() {
  const { playSfx } = useRetroAudio();

  const highScores = [
    { rank: "1ST", tag: "IIIT_CYBER", score: "999,990", event: "Craft N Code '25" },
    { rank: "2ND", tag: "NEON_VIPER", score: "845,200", event: "Code Kombat '25" },
    { rank: "3RD", tag: "GLITCH_BOY", score: "720,150", event: "TechXpo '25" },
  ];

  return (
    <footer id="contact" className="relative w-full bg-[#030308] border-t-2 border-[#00f0ff]/30 text-white overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 crt-scanlines opacity-30 pointer-events-none" />

      {/* Leaderboard High Scores Bar */}
      <div className="border-b border-white/10 bg-black/60 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src="/assets/trophy.png"
                alt="Trophy"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-pixel text-xs text-[#ffe600] tracking-wider">
                ALL-TIME HALL OF FAME
              </p>
              <p className="font-vt323 text-base text-zinc-400">
                CAN YOU SET A NEW HIGH SCORE IN &apos;26?
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {highScores.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-black/80 px-3 py-1.5 border border-white/15"
              >
                <span className="font-pixel text-[10px] text-[#ff007f]">{s.rank}</span>
                <span className="font-vt323 text-lg text-[#00f0ff]">{s.tag}</span>
                <span className="font-pixel text-[9px] text-[#39ff14]">{s.score} PTS</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Col 1: About & Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 border border-[#00f0ff] p-1 bg-black">
              <Image
                src="/assets/logo.png"
                alt="D3 Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="font-pixel text-sm text-white">D³ FEST 2026</h4>
              <p className="font-vt323 text-sm text-zinc-400">IIIT BHUBANESWAR</p>
            </div>
          </div>
          <p className="font-vt323 text-lg text-zinc-400 leading-relaxed">
            Organized by the Technical Society of International Institute of Information Technology Bhubaneswar.
          </p>
          <p className="font-pixel text-[9px] text-[#39ff14] tracking-widest animate-pulse">
            CREDITS: 99 // GAME READY
          </p>
        </div>

        {/* Col 2: Navigation Quests */}
        <div className="space-y-3">
          <h4 className="font-pixel text-xs text-[#00f0ff] tracking-wider mb-2">
            WARP ZONES
          </h4>
          <ul className="space-y-2 font-vt323 text-lg text-zinc-300">
            <li>
              <Link
                href="#hero"
                onClick={() => playSfx("blip")}
                className="hover:text-[#00f0ff] transition-colors"
              >
                &gt; Hero Cabinet Entrance
              </Link>
            </li>
            <li>
              <Link
                href="#roadmap"
                onClick={() => playSfx("blip")}
                className="hover:text-[#ff007f] transition-colors"
              >
                &gt; Quest Roadmap & Arenas
              </Link>
            </li>
            <li>
              <Link
                href="#merch"
                onClick={() => playSfx("blip")}
                className="hover:text-[#ffe600] transition-colors"
              >
                &gt; Item Shop & Merch
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                onClick={() => playSfx("blip")}
                className="hover:text-[#39ff14] transition-colors"
              >
                &gt; Retro Memory Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Coordinates & Social Signals */}
        <div className="space-y-4">
          <h4 className="font-pixel text-xs text-[#ff007f] tracking-wider mb-2">
            RADAR COORDINATES
          </h4>
          <p className="font-vt323 text-lg text-zinc-400">
            IIIT Bhubaneswar Campus, Gothapatna, Malipada, Bhubaneswar, Odisha 751003
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com/d3fest.iiitbh"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onClick={() => playSfx("coin")}
              className="p-2.5 bg-black/80 border border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_12px_#00f0ff] transition-all"
            >
              <InstagramLogo className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/tech-society-iiitbh/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onClick={() => playSfx("coin")}
              className="p-2.5 bg-black/80 border border-white/20 hover:border-[#ffe600] hover:text-[#ffe600] hover:shadow-[0_0_12px_#ffe600] transition-all"
            >
              <LinkedInLogo className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/techsociiitbh"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              onClick={() => playSfx("coin")}
              className="p-2.5 bg-black/80 border border-white/20 hover:border-[#39ff14] hover:text-[#39ff14] hover:shadow-[0_0_12px_#39ff14] transition-all"
            >
              <XIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-4 px-4 text-center bg-black/90">
        <p className="font-pixel text-[9px] text-zinc-500 tracking-wider">
          © 2026 D³ FEST // IIIT BHUBANESWAR. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
