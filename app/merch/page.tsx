"use client";

import React, { useState } from "react";
import { useRetroAudio } from "@/components/retro-audio";
import { RetroFooter } from "@/components/retro-footer";
import { ShoppingBag, Clock, Check, Bell } from "lucide-react";

export default function MerchPage() {
  const { playSfx } = useRetroAudio();
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx("coin");
    setNotified(true);
    setTimeout(() => {
      setNotified(false);
      setEmail("");
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff7bf5] selection:text-white overflow-x-hidden">
      <div className="relative w-full min-h-screen pt-28 pb-32 px-4 sm:px-6 flex flex-col justify-center items-center">
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center w-full">
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black border-2 border-[#ffe600] text-[#ffe600] font-pixel text-[10px] sm:text-xs tracking-wider mb-6 shadow-[0_0_12px_rgba(255,230,0,0.3)]">
            <ShoppingBag className="w-4 h-4" />
            <span>ITEM SHOP // INVENTORY LOCKED</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-6xl text-white tracking-wide mb-4">
            OFFICIAL <span className="text-[#ffe600] neon-yellow">MERCH</span> STORE
          </h1>

          {/* Coming Soon Glowing Box */}
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-black/90 border-2 border-[#ff7bf5] text-[#ff7bf5] font-pixel text-base sm:text-xl tracking-widest my-6 shadow-[0_0_25px_rgba(255,123,245,0.6)] animate-pulse">
            <Clock className="w-6 h-6" />
            <span>COMING SOON</span>
          </div>

          <p className="font-vt323 text-xl sm:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The official D³ FEST 2026 apparel & loot drop is currently in production. Pre-orders, sizes, and collection reveal will unlock shortly!
          </p>

          {/* Notify Me Box */}
          <div className="max-w-lg mx-auto p-6 sm:p-8 bg-black/95 border-2 border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.35)] text-center">
            <div className="flex items-center justify-center gap-2 font-pixel text-xs sm:text-sm text-[#00f0ff] mb-3">
              <Bell className="w-4 h-4" />
              <span>GET DROP NOTIFIED</span>
            </div>
            <p className="font-vt323 text-lg text-zinc-300 mb-6">
              Enter your email to receive early-bird pre-order alerts and exclusive coupon power-ups when the store opens.
            </p>

            {notified ? (
              <div className="p-4 bg-[#39ff14]/15 border-2 border-[#39ff14] text-[#39ff14] font-pixel text-xs sm:text-sm flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>RADAR SUBSCRIBED! DROP ALERT SET.</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="player@example.com"
                  className="flex-1 bg-[#090514] border-2 border-white/20 px-4 py-2.5 text-white font-vt323 text-xl focus:border-[#00f0ff] focus:outline-none"
                />
                <button
                  type="submit"
                  onMouseEnter={() => playSfx("blip")}
                  className="px-6 py-2.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-xs font-bold uppercase border-2 border-white cursor-pointer active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                >
                  NOTIFY ME
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <RetroFooter />
    </div>
  );
}
