"use client";

import React, { useState } from "react";
import { useRetroAudio } from "@/components/retro-audio";
import { RetroFooter } from "@/components/retro-footer";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const { playSfx } = useRetroAudio();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });

  const contacts = [
    {
      role: "FEST CONVENOR",
      name: "Lead Coordinator",
      email: "convenor.d3@iiit-bh.ac.in",
      phone: "+91 98765 43210",
      color: "border-[#00f0ff] text-[#00f0ff]",
    },
    {
      role: "TECHNICAL HEAD",
      name: "Hackathon & Arena Lead",
      email: "tech.d3@iiit-bh.ac.in",
      phone: "+91 91234 56789",
      color: "border-[#ff007f] text-[#ff007f]",
    },
    {
      role: "PUBLIC RELATIONS & SPONSORSHIPS",
      name: "Outreach Lead",
      email: "pr.d3@iiit-bh.ac.in",
      phone: "+91 99887 76655",
      color: "border-[#ffe600] text-[#ffe600]",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx("start");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", query: "" });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#05020c] text-white selection:bg-[#ff007f] selection:text-white overflow-x-hidden">
      <div className="relative w-full min-h-screen pt-28 pb-32 px-4 sm:px-6">
        <div className="absolute inset-0 crt-scanlines opacity-25 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black border-2 border-[#39ff14] text-[#39ff14] font-pixel text-[10px] sm:text-xs tracking-wider mb-4 shadow-[0_0_12px_rgba(57,255,20,0.3)]">
              <Mail className="w-4 h-4" />
              <span>RADAR FREQUENCIES // TRANSMISSION</span>
            </div>
            <h1 className="font-pixel text-3xl sm:text-5xl text-white tracking-wide mb-3">
              CONTACT <span className="text-[#39ff14] neon-green">HQ</span>
            </h1>
            <p className="font-vt323 text-xl sm:text-2xl text-zinc-300">
              Have questions about registrations, rulebooks, or college contingents? Reach out to our organizing committee.
            </p>
          </div>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contacts.map((c, idx) => (
              <div key={idx} className={`p-6 bg-black/90 border-2 ${c.color}`}>
                <span className="font-pixel text-[9px] uppercase tracking-wider block mb-2 opacity-80">
                  {c.role}
                </span>
                <h3 className="font-pixel text-sm text-white mb-4">
                  {c.name}
                </h3>
                <div className="space-y-2 font-vt323 text-lg text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                    <a href={`mailto:${c.email}`} className="hover:underline">
                      {c.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{c.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transmission Terminal Form & Campus Address */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inquiry Form */}
            <div className="bg-black/90 border-2 border-white/20 p-6 sm:p-8">
              <h3 className="font-pixel text-lg text-white mb-6 border-b-2 border-white/15 pb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#00f0ff]" />
                TRANSMIT A MESSAGE
              </h3>

              {submitted ? (
                <div className="p-6 bg-[#39ff14]/10 border-2 border-[#39ff14] text-center">
                  <Check className="w-8 h-8 text-[#39ff14] mx-auto mb-2" />
                  <h4 className="font-pixel text-sm text-[#39ff14] mb-1">
                    TRANSMISSION SENT
                  </h4>
                  <p className="font-vt323 text-lg text-zinc-300">
                    Our communications officer will reply to your frequency shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-pixel text-[10px] text-zinc-400 mb-1">
                      YOUR CALLSIGN / NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#090514] border-2 border-white/20 px-3 py-2 text-white font-vt323 text-lg focus:border-[#00f0ff] focus:outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block font-pixel text-[10px] text-zinc-400 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#090514] border-2 border-white/20 px-3 py-2 text-white font-vt323 text-lg focus:border-[#00f0ff] focus:outline-none"
                      placeholder="player@example.com"
                    />
                  </div>

                  <div>
                    <label className="block font-pixel text-[10px] text-zinc-400 mb-1">
                      MESSAGE / INQUIRY
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      className="w-full bg-[#090514] border-2 border-white/20 px-3 py-2 text-white font-vt323 text-lg focus:border-[#00f0ff] focus:outline-none"
                      placeholder="Write your query here..."
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => playSfx("blip")}
                    className="w-full py-3 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-pixel text-xs uppercase tracking-wider font-bold border-2 border-white shadow-[0_0_15px_rgba(0,240,255,0.5)] active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    TRANSMIT QUERY
                  </button>
                </form>
              )}
            </div>

            {/* Campus Radar Base */}
            <div className="bg-black/90 border-2 border-white/20 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-pixel text-lg text-white mb-6 border-b-2 border-white/15 pb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ff007f]" />
                  CAMPUS RADAR LOCATION
                </h3>
                <div className="space-y-4 font-vt323 text-xl text-zinc-300">
                  <p>
                    <strong className="text-white">VENUE:</strong>
                    <br />
                    International Institute of Information Technology (IIIT) Bhubaneswar
                  </p>
                  <p>
                    <strong className="text-white">ADDRESS:</strong>
                    <br />
                    Gothapatna, PO: Malipada, Bhubaneswar, Odisha 751003
                  </p>
                  <p>
                    <strong className="text-white">COORDINATES:</strong>
                    <br />
                    20.2925° N, 85.7431° E
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#090514] border border-white/15">
                <p className="font-pixel text-[9px] text-[#ffe600] mb-1">
                  RADAR STATUS:
                </p>
                <p className="font-vt323 text-base text-zinc-400">
                  Direct visitor help desk operating at Admin Gate 1 during all 3 days of D³ FEST 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RetroFooter />
    </div>
  );
}
