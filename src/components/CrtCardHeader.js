"use client";

import React, { useMemo } from "react";

export default function CrtCardHeader({ 
  platform = "CTF", 
  category = "FORENSICS", 
  points = "SOLVED", 
  slug = "" 
}) {
  // Deterministic values based on slug
  const { channel, frequency, waveType, hexId } = useMemo(() => {
    let hash = 0;
    const str = slug || platform + category;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const abs = Math.abs(hash);
    const ch = (abs % 89 + 10).toString();
    const freq = (12.4 + (abs % 25) * 0.2).toFixed(1);
    const wave = abs % 4;
    const hex = (abs % 65535).toString(16).toUpperCase().padStart(4, "0");
    return { channel: ch, frequency: freq, waveType: wave, hexId: hex };
  }, [slug, platform, category]);

  // Different authentic oscilloscope vector waveforms
  const waveformPaths = [
    // 0: Classic RF Signal with Carrier Burst
    "M 0 35 Q 25 35, 45 35 T 70 12 T 95 58 T 120 18 T 145 52 T 170 25 T 195 45 T 225 35 L 300 35",
    // 1: Packet Pulse / Square Transition Train
    "M 0 35 L 30 35 L 30 15 L 65 15 L 65 55 L 100 55 L 100 20 L 140 20 L 140 50 L 180 50 L 180 35 L 300 35",
    // 2: Harmonic Sine Resonance
    "M 0 35 Q 25 8, 50 35 T 100 35 T 150 35 T 200 35 T 250 35 L 300 35",
    // 3: Sawtooth Frequency Chirp / Step
    "M 0 45 L 35 15 L 35 45 L 75 15 L 75 45 L 120 15 L 120 45 L 175 15 L 175 45 L 230 25 L 300 35"
  ];

  const selectedPath = waveformPaths[waveType];

  return (
    <div className="w-full flex flex-col rounded-t-xl overflow-hidden border-b border-zinc-800/80 select-none">
      {/* 1. Terminal Window Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-black/75 dark:bg-black/80 light:bg-zinc-200 border-b border-zinc-800/60 font-mono text-[10px]">
        {/* Retro Window Control Buttons [ - □ ✕ ] */}
        <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors inline-block" />
          <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors inline-block" />
          <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors inline-block" />
        </div>

        {/* Channel & Target Identifier */}
        <div className="flex items-center gap-1.5 font-bold tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
          <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
            CH-{channel}
          </span>
          <span className="truncate max-w-[130px] sm:max-w-[160px] uppercase text-[10px]">
            {platform}
          </span>
        </div>

        {/* Live CRT Indicator LED */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase hidden sm:inline">
            REC
          </span>
        </div>
      </div>

      {/* 2. CRT Oscilloscope / Signal Cathode Display Area */}
      <div className="relative w-full h-32 sm:h-36 crt-screen-bg overflow-hidden flex flex-col justify-between p-3">
        {/* Subtle Horizontal CRT Scan Sweep Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent pointer-events-none group-hover:animate-pulse" />

        {/* Screen Top Telemetry Readout */}
        <div className="flex justify-between items-center z-10 font-mono text-[9px] tracking-wider text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">FEED:</span>
            <span className="text-zinc-300 font-bold uppercase truncate max-w-[120px]">
              {category}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">AUTH:</span>
            <span className="text-white font-bold px-1.5 py-0.5 rounded bg-black/60 border border-zinc-700/60">
              {points}
            </span>
          </div>
        </div>

        {/* Center Oscilloscope / Signal Waveform Display */}
        <div className="relative w-full h-16 flex items-center justify-center my-auto z-10">
          {/* Subtle Radar/Oscilloscope Target Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="w-full h-[1px] bg-zinc-400" />
            <div className="h-full w-[1px] bg-zinc-400 absolute" />
          </div>

          {/* Oscilloscope SVG Vector Waveform */}
          <svg 
            viewBox="0 0 300 70" 
            className="w-full h-full preserve-3d overflow-visible"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Shadow Waveform for CRT Depth */}
            <path
              d={selectedPath}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700/60 dark:text-zinc-700/60 opacity-50"
            />
            {/* Foreground Crisp Phosphor Waveform */}
            <path
              d={selectedPath}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-200 dark:text-white transition-all duration-500 group-hover:scale-y-110 group-hover:brightness-125 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]"
            />
          </svg>
        </div>

        {/* Screen Bottom Telemetry Readout */}
        <div className="flex justify-between items-center z-10 font-mono text-[8px] sm:text-[9px] tracking-widest text-zinc-500">
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">&gt; 0x{hexId}</span>
            <span className="hidden sm:inline">• V-SYNC: LOCK</span>
          </div>
          <div>
            <span>{frequency} kHz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
