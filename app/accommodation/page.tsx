"use client";

import React from "react";
import { RetroFooter } from "@/components/retro-footer";
import { Bed, MapPin, Plane, Train, Sparkles, HelpCircle } from "lucide-react";

export default function AccommodationPage() {
  const facilities = [
    {
      title: "HOSTEL RESIDENCE",
      desc: "Safe and comfortable on-campus hostel accommodation with beddings and clean amenities for outstation participants.",
      icon: Bed,
      color: "border-[#00f0ff] text-[#00f0ff]",
    },
    {
      title: "HIGH-SPEED CAMPUS WI-FI",
      desc: "Gigabit uninterrupted Wi-Fi coverage across all hackathon arenas, labs, and dormitories.",
      icon: Sparkles,
      color: "border-[#39ff14] text-[#39ff14]",
    },
    {
      title: "24x7 MESS & FOOD COURT",
      desc: "Hygienic meals, snacks, midnight coffee, and energy beverage stations throughout the fest days.",
      icon: Sparkles,
      color: "border-[#ffe600] text-[#ffe600]",
    },
  ];

  const travelModes = [
    {
      type: "VIA RAILWAY",
      name: "Bhubaneswar Railway Station (BBS)",
      distance: "Approx. 16 km from IIIT Bhubaneswar",
      instructions: "Direct auto-rickshaws, app cabs (Ola/Uber), and local buses available 24/7 to Gothapatna campus.",
      icon: Train,
    },
    {
      type: "VIA FLIGHT",
      name: "Biju Patnaik International Airport (BBI)",
      distance: "Approx. 18 km from IIIT Bhubaneswar",
      instructions: "Prepaid taxis and airport cabs take approx. 30-40 minutes via NH16 / Chandaka road.",
      icon: Plane,
    },
  ];

  const faqs = [
    {
      q: "WHEN CAN OUTSTATION TEAMS CHECK IN?",
      a: "Check-in opens from the morning of the day before the events begin. Volunteer desks at the main gate will assist your team.",
    },
    {
      q: "IS ACCOMMODATION FREE FOR HACKATHON PARTICIPANTS?",
      a: "Yes, shortlisted hackathon teams participating in Craft N Code '26 get complimentary on-campus accommodation and food.",
    },
    {
      q: "WHAT SHOULD I CARRY WITH ME?",
      a: "Valid College Photo ID Card, Government ID (Aadhaar/Passport), laptops, chargers, extension boards, and essential toiletries.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff007f] selection:text-white overflow-x-hidden">
      <div className="relative w-full min-h-screen pt-28 pb-32 px-4 sm:px-6">
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black border-2 border-[#ff007f] text-[#ff007f] font-pixel text-[10px] sm:text-xs tracking-wider mb-4 shadow-[0_0_12px_rgba(255,0,127,0.3)]">
              <MapPin className="w-4 h-4" />
              <span>CAMPUS LOGISTICS // BASE STATION</span>
            </div>
            <h1 className="font-pixel text-3xl sm:text-5xl text-white tracking-wide mb-3">
              LOGISTICS & <span className="text-[#ff007f] neon-pink">ACCOMMODATION</span>
            </h1>
            <p className="font-vt323 text-xl sm:text-2xl text-zinc-300">
              Everything you need to know about reaching IIIT Bhubaneswar, stay arrangements, and hospitality.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {facilities.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 bg-black/90 border-2 ${f.color} flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5" />
                      <h3 className="font-pixel text-xs sm:text-sm font-bold text-white">
                        {f.title}
                      </h3>
                    </div>
                    <p className="font-vt323 text-lg text-zinc-300 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How to Reach Guide */}
          <div className="bg-black/90 border-2 border-white/20 p-6 sm:p-8 mb-16">
            <h2 className="font-pixel text-xl text-white mb-6 border-b-2 border-white/15 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00f0ff]" />
              HOW TO REACH IIIT BHUBANESWAR
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {travelModes.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx} className="p-5 bg-[#090514] border border-white/15">
                    <div className="flex items-center gap-2 text-[#ffe600] font-pixel text-xs mb-2">
                      <Icon className="w-4 h-4" />
                      <span>{m.type}</span>
                    </div>
                    <h4 className="font-pixel text-xs sm:text-sm text-white mb-1">
                      {m.name}
                    </h4>
                    <p className="font-vt323 text-base text-[#00f0ff] mb-2">
                      {m.distance}
                    </p>
                    <p className="font-vt323 text-lg text-zinc-300">
                      {m.instructions}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-black/90 border-2 border-white/20 p-6 sm:p-8">
            <h2 className="font-pixel text-xl text-white mb-6 border-b-2 border-white/15 pb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#39ff14]" />
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-[#090514] border border-white/10">
                  <h4 className="font-pixel text-xs text-[#39ff14] mb-2">
                    Q: {faq.q}
                  </h4>
                  <p className="font-vt323 text-lg text-zinc-300">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RetroFooter />
    </div>
  );
}
