import React from "react";
import { HeroCabinetZoom } from "@/components/hero-cabinet-zoom";
import { RetroFooter } from "@/components/retro-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff7bf5] selection:text-white overflow-x-hidden">
      {/* Interactive Arcade Cabinet with Embedded CRT Screen & Zoom Transition */}
      <HeroCabinetZoom />

      {/* Retro Arcade Footer */}
      <RetroFooter />
    </div>
  );
}
