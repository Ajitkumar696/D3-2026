"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRetroAudio } from "./retro-audio";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

export function RetroNavbar() {
  const pathname = usePathname();
  const { isPlaying, toggleAudio, playSfx } = useRetroAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Merch", href: "/merch" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3 px-3 sm:px-6 select-none pointer-events-auto transition-all duration-300 ${
        isScrolled
          ? "bg-[#05020c]/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: D³ FEST Logo */}
        <Link
          href="/"
          onClick={() => playSfx("start")}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="relative w-28 sm:w-36 h-9 sm:h-11">
            <Image
              src="/assets/logo.png"
              alt="D³ FEST - IIIT BHUBANESWAR"
              fill
              priority
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            />
          </div>
        </Link>

        {/* Center: Pink Pixel-Pill Buttons strictly matching Canva reference */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => playSfx("blip")}
                onMouseEnter={() => playSfx("blip")}
                className={`relative px-3.5 xl:px-4 py-1.5 font-pixel text-[11px] xl:text-xs tracking-wider transition-all duration-100 ${
                  isActive
                    ? "bg-[#ff7bf5] text-black shadow-[0_0_15px_#ff7bf5] scale-105"
                    : "bg-[#f9a8f5] hover:bg-[#ff7bf5] text-black hover:scale-105"
                } text-black font-bold uppercase rounded-none`}
                style={{
                  clipPath:
                    "polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))",
                  border: "2px solid #000",
                  boxShadow: isActive
                    ? "0 0 12px rgba(255, 123, 245, 0.8), inset 0 2px 0 rgba(255,255,255,0.7), inset 0 -2px 0 rgba(0,0,0,0.3)"
                    : "inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.3)",
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Retro Speaker Audio Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSfx("coin");
              toggleAudio();
            }}
            onMouseEnter={() => playSfx("blip")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-black text-[#00f0ff] hover:text-white border border-[#00f0ff]/60 font-pixel text-[10px] sm:text-xs tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            )}
            <span className="font-bold">{isPlaying ? "ON" : "OFF"}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              playSfx("blip");
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1.5 bg-[#f9a8f5] text-black font-pixel text-xs border border-black flex items-center justify-center cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-black" />
            ) : (
              <Menu className="w-4 h-4 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a051b]/98 border-2 border-[#ff7bf5] p-3 flex flex-col gap-2 mt-2 shadow-2xl max-w-xs ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => {
                playSfx("blip");
                setMobileMenuOpen(false);
              }}
              className="font-pixel text-xs py-2 px-3 bg-[#f9a8f5] text-black font-bold text-center border border-black"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
