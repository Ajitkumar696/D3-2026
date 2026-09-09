"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playSfx: (type: "blip" | "coin" | "powerup" | "start") => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
  playSfx: () => {},
});

export const useRetroAudio = () => useContext(AudioContext);

// 80s Synthwave / Chiptune melody notes (Frequencies in Hz)
const synthwaveBass = [
  110, 110, 130.81, 130.81, 146.83, 146.83, 164.81, 164.81,
  110, 110, 130.81, 130.81, 196.00, 196.00, 164.81, 146.83,
];
const synthwaveLead = [
  440, 523.25, 659.25, 587.33, 523.25, 440, 392, 440,
  523.25, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25,
];

export function RetroAudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API Context
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;
      }
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playChiptuneStep = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx || !gainNodeRef.current) return;

    const t = ctx.currentTime;
    const step = noteIndexRef.current % 16;
    noteIndexRef.current++;

    // 1. Bassline (Sawtooth / Square)
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = "sawtooth";
    bassOsc.frequency.setValueAtTime(synthwaveBass[step] / 2, t);
    
    bassGain.gain.setValueAtTime(0.12, t);
    bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    
    bassOsc.connect(bassGain);
    bassGain.connect(gainNodeRef.current);
    bassOsc.start(t);
    bassOsc.stop(t + 0.2);

    // 2. Lead Arpeggio (Pulse / Square)
    if (step % 2 === 0 || step % 3 === 0) {
      const leadOsc = ctx.createOscillator();
      const leadGain = ctx.createGain();
      leadOsc.type = "square";
      leadOsc.frequency.setValueAtTime(synthwaveLead[step], t);
      
      leadGain.gain.setValueAtTime(0.08, t);
      leadGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      
      leadOsc.connect(leadGain);
      leadGain.connect(gainNodeRef.current);
      leadOsc.start(t);
      leadOsc.stop(t + 0.15);
    }

    // 3. 8-Bit Snare / Hi-Hat Noise
    if (step % 4 === 2) {
      // Snare hit
      const snareOsc = ctx.createOscillator();
      const snareGain = ctx.createGain();
      snareOsc.type = "triangle";
      snareOsc.frequency.setValueAtTime(180, t);
      snareOsc.frequency.exponentialRampToValueAtTime(40, t + 0.08);

      snareGain.gain.setValueAtTime(0.1, t);
      snareGain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      snareOsc.connect(snareGain);
      snareGain.connect(gainNodeRef.current);
      snareOsc.start(t);
      snareOsc.stop(t + 0.09);
    }
  }, []);

  const startMusicLoop = useCallback(() => {
    getAudioContext();
    if (timerRef.current) clearInterval(timerRef.current);
    // 130 BPM tempo -> 16th notes = ~115ms
    timerRef.current = window.setInterval(playChiptuneStep, 120);
    setIsPlaying(true);
  }, [getAudioContext, playChiptuneStep]);

  const stopMusicLoop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      stopMusicLoop();
    } else {
      startMusicLoop();
    }
  }, [isPlaying, startMusicLoop, stopMusicLoop]);

  const playSfx = useCallback((type: "blip" | "coin" | "powerup" | "start") => {
    const ctx = getAudioContext();
    if (!ctx || !gainNodeRef.current) return;
    const t = ctx.currentTime;

    if (type === "blip") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(gainNodeRef.current);
      osc.start(t);
      osc.stop(t + 0.06);
    } else if (type === "coin") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, t); // B5
      osc.frequency.setValueAtTime(1318.51, t + 0.08); // E6
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(gainNodeRef.current);
      osc.start(t);
      osc.stop(t + 0.35);
    } else if (type === "powerup") {
      const freqs = [330, 392, 659, 523, 587, 784];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(f, t + idx * 0.05);
        gain.gain.setValueAtTime(0.08, t + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.08);
        osc.connect(gain);
        gain.connect(gainNodeRef.current!);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.09);
      });
    } else if (type === "start") {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, t + idx * 0.08);
        gain.gain.setValueAtTime(0.15, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.18);
        osc.connect(gain);
        gain.connect(gainNodeRef.current!);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.2);
      });
    }
  }, [getAudioContext]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playSfx }}>
      {children}
    </AudioContext.Provider>
  );
}

export function AudioToggleButton({ className = "" }: { className?: string }) {
  const { isPlaying, toggleAudio, playSfx } = useRetroAudio();

  const handleClick = () => {
    playSfx("coin");
    toggleAudio();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => playSfx("blip")}
      aria-label={isPlaying ? "Mute retro music" : "Play retro 80s music"}
      className={`group relative flex items-center gap-2 px-3 py-1.5 border-2 transition-all cursor-pointer font-pixel text-[10px] sm:text-xs uppercase tracking-wider ${
        isPlaying
          ? "border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)]"
          : "border-[#ff007f]/50 bg-black/60 text-zinc-400 hover:border-[#ff007f] hover:text-[#ff007f]"
      } ${className}`}
    >
      <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
        <Image
          src="/assets/sound icon.png"
          alt="Sound"
          width={16}
          height={16}
          className={`object-contain transition-transform ${isPlaying ? "scale-110" : "opacity-60"}`}
        />
      </div>

      <span className="font-bold">
        {isPlaying ? "BGM ON" : "BGM OFF"}
      </span>

      {/* Retro visualizer bars when playing */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-3 ml-0.5">
          <span className="w-1 bg-[#00f0ff] animate-[pulse_0.4s_ease-in-out_infinite] h-2" />
          <span className="w-1 bg-[#ff007f] animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
          <span className="w-1 bg-[#39ff14] animate-[pulse_0.3s_ease-in-out_infinite] h-1.5" />
        </div>
      )}
    </button>
  );
}
