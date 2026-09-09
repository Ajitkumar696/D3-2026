"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRetroAudio } from "./retro-audio";
import { ShoppingBag, Check } from "lucide-react";

export function MerchSection() {
  const { playSfx } = useRetroAudio();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const merchItems = [
    {
      id: "hoodie",
      name: "CYBERPUNK GLITCH HOODIE",
      category: "LIMITED APPAREL",
      price: "₹899",
      tag: "HOT DROP",
      tagColor: "bg-[#ff007f] text-white",
      image: "/assets/box2.png",
      description: "Heavyweight 380 GSM fleece hoodie with glowing cybernetic screen print on back and retro pixel sleeve accents.",
    },
    {
      id: "mug",
      name: "RETRO CHIPTUNE MUG",
      category: "ACCESSORIES",
      price: "₹299",
      tag: "EXCLUSIVE",
      tagColor: "bg-[#00f0ff] text-black",
      image: "/assets/mug.png",
      description: "Ceramic matte-black arcade mug with heat-reactive Pac-Man stage graphics.",
    },
    {
      id: "stickers",
      name: "8-BIT STICKER BUNDLE PACK",
      category: "COLLECTIBLES",
      price: "₹149",
      tag: "POPULAR",
      tagColor: "bg-[#ffe600] text-black",
      image: "/assets/laptop.png",
      description: "15x holographic weatherproof vinyl stickers featuring D³ Fest 2026 pixel avatars, ghosts, and tech logos.",
    },
    {
      id: "flag",
      name: "VICTORY PENNANT FLAG",
      category: "SOUVENIR",
      price: "₹199",
      tag: "FLAGSHIP",
      tagColor: "bg-[#39ff14] text-black",
      image: "/assets/red falg.png",
      description: "Felt arcade tournament pennant with embroidered retro badge.",
    },
  ];

  const handleOrderTeaser = (name: string) => {
    playSfx("coin");
    setSelectedItem(name);
    setTimeout(() => {
      setSelectedItem(null);
    }, 3000);
  };

  return (
    <section id="merch" className="relative w-full py-24 bg-[#050510] px-4 sm:px-6 overflow-hidden border-t border-[#ff007f]/20">
      {/* Scanline background */}
      <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/80 border border-[#ffe600] text-[#ffe600] font-pixel text-[10px] sm:text-xs tracking-wider mb-4 shadow-[0_0_12px_rgba(255,230,0,0.3)]">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ITEM SHOP // ARCADE BOOTHS</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white tracking-wide mb-3">
            OFFICIAL <span className="text-[#ffe600] neon-yellow">MERCH</span> DROP
          </h2>
          <p className="font-vt323 text-xl sm:text-2xl text-zinc-400">
            Equip your player with official D³ FEST 2026 limited-edition apparel and loot.
          </p>
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-black/75 border-2 border-white/15 hover:border-[#ffe600] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,230,0,0.25)] hover:-translate-y-1"
            >
              {/* Item Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-vt323 text-sm text-zinc-400 tracking-wider">
                  {item.category}
                </span>
                <span className={`font-pixel text-[8px] px-2 py-0.5 ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>

              {/* Merch Image */}
              <div className="relative w-full h-44 my-2 flex items-center justify-center bg-[#0a0a18] p-4 border border-white/5 group-hover:border-[#ffe600]/30 transition-colors">
                <div className="relative w-32 h-32 animate-retro-float">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="mt-4">
                <h3 className="font-pixel text-xs sm:text-sm text-white tracking-wide mb-1 group-hover:text-[#ffe600] transition-colors">
                  {item.name}
                </h3>
                <p className="font-vt323 text-base text-zinc-400 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-pixel text-sm text-[#00f0ff] font-bold">
                    {item.price}
                  </span>

                  <button
                    onClick={() => handleOrderTeaser(item.name)}
                    onMouseEnter={() => playSfx("blip")}
                    className="px-3 py-1.5 bg-[#ffe600] hover:bg-[#ffe600]/90 text-black font-pixel text-[9px] uppercase font-bold tracking-wider border border-white active:scale-95 transition-all cursor-pointer"
                  >
                    {selectedItem === item.name ? (
                      <span className="flex items-center gap-1 text-green-900">
                        <Check className="w-3 h-3" /> RESERVED
                      </span>
                    ) : (
                      "PRE-ORDER"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
