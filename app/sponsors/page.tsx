"use client";

import React from "react";
import { useRetroAudio } from "@/components/retro-audio";
import { RetroFooter } from "@/components/retro-footer";
import { Handshake, Mail, Clock, Sparkles, ExternalLink, ShieldAlert } from "lucide-react";

export default function SponsorsPage() {
  const { playSfx } = useRetroAudio();

  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff007f] selection:text-white overflow-x-hidden">
      <div className="relative w-full min-h-screen pt-28 pb-32 px-4 sm:px-6">
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black border-2 border-[#00f0ff] text-[#00f0ff] font-pixel text-[10px] sm:text-xs tracking-wider mb-4 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <Handshake className="w-4 h-4" />
              <span>ALLIES & GUILDS // FEST SPONSORS</span>
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl text-white tracking-wide mb-3">
              OUR <span className="text-[#00f0ff] neon-cyan">SPONSORS</span> & PARTNERS
            </h1>

            {/* Coming Soon Glowing Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-black/90 border-2 border-[#39ff14] text-[#39ff14] font-pixel text-sm sm:text-lg tracking-widest my-4 shadow-[0_0_20px_rgba(57,255,20,0.5)] animate-pulse">
              <Clock className="w-5 h-5" />
              <span>COMING SOON</span>
            </div>

            <p className="font-vt323 text-xl sm:text-2xl text-zinc-300 max-w-2xl mx-auto mt-2">
              Our 2026 sponsors & strategic industry partners lineup is finalizing. Full showcase reveal will unlock soon!
            </p>
          </div>

          {/* Prominent Callout Card for Interested Sponsors */}
          <div className="p-6 sm:p-10 bg-black/95 border-2 border-[#ffe600] shadow-[0_0_35px_rgba(255,230,0,0.35)] mb-12">
            <div className="flex items-center gap-3 border-b-2 border-white/15 pb-4 mb-6">
              <Sparkles className="w-6 h-6 text-[#ffe600] shrink-0" />
              <h2 className="font-pixel text-lg sm:text-2xl text-[#ffe600]">
                INTERESTED IN SPONSORING D³ FEST 2026?
              </h2>
            </div>

            <p className="font-vt323 text-xl sm:text-2xl text-zinc-200 leading-relaxed mb-6">
              Connect with 1,000+ passionate engineers, top developers, designers, and innovators from across the country. Partner with East India&apos;s premier techno-cultural extravaganza.
            </p>

            <div className="p-5 bg-[#090514] border-2 border-[#00f0ff] mb-8">
              <div className="flex items-center gap-2 text-[#00f0ff] font-pixel text-xs sm:text-sm mb-3">
                <Mail className="w-4 h-4" />
                <span>OFFICIAL SPONSORSHIP DIRECT INBOXES:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-vt323 text-xl text-white">
                <a
                  href="mailto:dcube_techfest@iiit-bh.ac.in"
                  onMouseEnter={() => playSfx("blip")}
                  className="flex items-center gap-2 p-3 bg-black border border-white/20 hover:border-[#ffe600] hover:text-[#ffe600] transition-all"
                >
                  <Mail className="w-4 h-4 text-[#ffe600] shrink-0" />
                  <span>dcube_techfest@iiit-bh.ac.in</span>
                </a>

                <a
                  href="mailto:tech-society@iiit-bh.ac.in"
                  onMouseEnter={() => playSfx("blip")}
                  className="flex items-center gap-2 p-3 bg-black border border-white/20 hover:border-[#39ff14] hover:text-[#39ff14] transition-all"
                >
                  <Mail className="w-4 h-4 text-[#39ff14] shrink-0" />
                  <span>tech-society@iiit-bh.ac.in</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://drive.google.com/file/d/1iyiSNVeNCb1sEuLReG3oIY8hC8bFBZ0u/view"
                target="_blank"
                rel="noreferrer"
                onClick={() => playSfx("powerup")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ff7bf5] hover:bg-[#ff7bf5]/90 text-black font-pixel text-xs uppercase tracking-wider font-bold border-2 border-white shadow-[0_0_20px_rgba(255,123,245,0.6)] active:scale-95 transition-all w-full sm:w-auto"
              >
                <span>DOWNLOAD SPONSORSHIP BROCHURE</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="mailto:dcube_techfest@iiit-bh.ac.in?subject=Sponsorship%20Inquiry%20-%20D3%20Fest%202026"
                onClick={() => playSfx("coin")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-xs uppercase tracking-wider font-bold border-2 border-white shadow-[0_0_20px_rgba(0,240,255,0.6)] active:scale-95 transition-all w-full sm:w-auto"
              >
                <span>SEND DIRECT PITCH</span>
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Notice Banner */}
          <div className="p-4 bg-black/80 border border-white/15 flex items-center gap-3 text-zinc-400 font-vt323 text-lg">
            <ShieldAlert className="w-5 h-5 text-[#ffe600] shrink-0" />
            <span>
              All corporate sponsorship slots, title rights, and track bounties are subject to selection and mutual partnership agreements with the IIIT Bhubaneswar Technical Society.
            </span>
          </div>
        </div>
      </div>
      <RetroFooter />
    </div>
  );
}
