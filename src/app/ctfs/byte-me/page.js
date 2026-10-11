"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrtCardHeader from "@/components/CrtCardHeader";

export default function ByteMeHub() {
  const tracks = [
    {
      title: "Vormir Forensics & Memory",
      slug: "forensics",
      platform: "Byte Me CTF 2026",
      category: "FORENSICS TRACK",
      points: "3 LABS // 6 FLAGS",
      tagline: "4 Sequential Memory Missions • Audio Reversing • Network PCAP Carving",
      description: "Deep technical breakdowns across Windows x64 kernel memory dump analysis (2.77 GB) structured as 4 sequential missions, plus localhost FTP reconstruction and audio speech reversal with trailing XOR decryption.",
      image: "/images/byteme_echoes_sacrifice.png",
      tags: ["Volatility 3", "Windows Memory", "VAD Carving", "Wireshark", "Audio Forensics", "Whisper", "Repeated XOR"],
      challengesCount: "3 Operations (4 Sequential Memory Missions + PCAP + Audio)",
      href: "/ctfs/byte-me/forensics"
    },
    {
      title: "Missions & OSINT (Unemployed at its Peak)",
      slug: "missions",
      platform: "Byte Me CTF 2026",
      category: "MISC / RECON TRACK",
      points: "6 MISSIONS // 5 FLAGS",
      tagline: "Algorithmic QR Assembly • Impostor Elimination • Orbital Telemetry Triage",
      description: "Full reverse engineering of scattered QR code puzzle pieces across 5 escalation tiers (Levels 0 through 4), along with reconnaissance telemetry triage of the Vormir's Hidden Witness orbital satellite challenge.",
      image: "/images/byteme_l3_montage.png",
      tags: ["Python", "OpenCV", "SAT / Backtracking", "Super-Tiles", "zxing-cpp", "QR Forensics", "OSINT"],
      challengesCount: "6 Operations (5 Algorithmic QR Levels + OSINT Recon)",
      href: "/ctfs/byte-me/missions"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-grow pt-6 pb-20">
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14 text-center">
          {/* Breadcrumb Pill */}
          <div className="mb-4 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-3 sm:px-4 py-1.5 rounded-full animate-glow-pulse">
            <Link href="/ctfs" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-wider">
              ← CTF HUB
            </Link>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="font-mono text-[10px] sm:text-xs text-white uppercase tracking-wider sm:tracking-[0.25em]">
              BYTE ME CTF 2026 // PCCOE
              <span className="animate-blink inline-block w-1.5 h-3 bg-white ml-2 align-middle"></span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal sm:tracking-widest font-[family-name:var(--font-silkscreen)] mb-4">
            Byte Me CTF 2026
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Writeups for Byte Me CTF 2026: Windows memory forensics, audio analysis, network stream carving, and algorithmic QR puzzle reconstruction.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> 8 Solved Operations (9 Flags)
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> 11 Verified Flags Extracted
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> Orbital Satellite Recon Track
            </div>
          </div>
        </div>

        {/* 2 Main Track Cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                SELECT TRACK
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                Investigation Tracks (2)
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">Single-Page Interactive Dossiers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track) => (
              <Link
                key={track.slug}
                href={track.href}
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-xl min-w-0 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-zinc-500"
              >
                {/* CRT Monitor Header */}
                <CrtCardHeader
                  platform={track.platform}
                  category={track.category}
                  points={track.points}
                  slug={track.slug}
                />

                <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-20 min-w-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                      {track.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:theme-text transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                    {track.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {track.description}
                  </p>

                  {/* Thumbnail Preview */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-black">
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-3 font-mono text-[11px] text-zinc-300 bg-black/70 px-2 py-0.5 rounded border border-zinc-800 backdrop-blur-sm">
                      {track.challengesCount}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-4">
                    {track.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Footer */}
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider">Enter Dossier</span>
                    <span className="theme-cta font-bold flex items-center gap-1.5 text-white group-hover:translate-x-1 transition-transform">
                      Open All Challenges →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
