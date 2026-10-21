"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPlatform, setSelectedPlatform] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // High-Level CTF Competitions & Tactical Dossiers (Only CTFs on Home Page)
  const ctfCompetitions = [
    {
      title: "DEADFACE CTF: Complete Operational Dossier",
      slug: "deadface",
      href: "/ctfs/deadface",
      platform: "DEADFACE CTF",
      category: "Special Dossier",
      points: "15 LABS // 25 FLAGS",
      tagline: "Network PCAP, Memory Dumps, Chrome History, MySQL & OSINT",
      description: "Comprehensive operational dossier across Wireshark HTTP/ICMP/VoIP exfiltration, Volatility 3 kernel memory dumps, Chrome SQLite phishing link reconstruction, Aurora Health SQL queries, Savannah compass OSINT, and LLMNR/SMB poisoning.",
      image: "/images/deadface_ctf_banner.jpg",
      tags: ["DEADFACE CTF", "Volatility 3", "PCAP Forensics", "SQLite Chrome", "MySQL Forensics", "OSINT", "LLMNR / SMB"],
      time: "21 Writeups",
      includedChallenges: [
        "Bad Guys Be Bad & Data Go Brrrrr",
        "Don't Leave Me Hanging (VoIP/IVR)",
        "A Pirate's Life for Me Part 1",
        "Who Goes There? (Volatility 3)",
        "Hooked (Chrome History SQLite)",
        "File Dump 01 (OpenXML Threat Intel)",
        "Art Heist - The Forgery",
        "Aurora Health MySQL Suite (8 Ops)",
        "Ghost of Squares Past (Savannah OSINT)",
        "Uninvited Guest (SMB Poisoning Series)"
      ]
    },
    {
      title: "Byte Me CTF 2026: Vormir Expedition",
      slug: "byte-me",
      href: "/ctfs/byte-me",
      platform: "Byte Me CTF 2026",
      category: "Special Dossier",
      points: "8 LABS // 11 FLAGS",
      tagline: "Windows x64 Memory, Paint VAD DIB, RIFF Carving & Algorithmic QR Solvers",
      description: "Dual-track interactive dossier: Windows x64 kernel memory dump analysis (2.77 GB), bottom-up 32bpp DIB Paint carving, reversed speech transcription, and a 5-level escalation of algorithmic QR puzzle constraint solving.",
      image: "/images/byteme_ctf_banner.jpg",
      tags: ["Volatility 3", "Memory Forensics", "QR Solvers", "PCAP Carving", "Audio Forensics", "Byte Me CTF 2026"],
      time: "8 Writeups",
      includedChallenges: [
        "Echoes of Vormir (Mem 1-4)",
        "Sacrifice",
        "The Last Memory of Vormir",
        "Missions: Lost Edge & QR Puzzles (5 Levels)"
      ]
    },
    {
      title: "War Games 2026: ASCWG Operations Dossier",
      slug: "war-games",
      href: "/ctfs/war-games",
      platform: "ASCWG 2026",
      category: "Tactical Dossier",
      points: "7 LABS // 7 FLAGS",
      tagline: "macOS Mach-O, Windows.db, ICS SCADA, CoinJoin, DeFi & Lattices",
      description: "Complete operational breakdowns across all 7 official ASCWG 2026 challenges: macOS Mach-O reverse engineering, Windows ESE database carving, ICS telemetry covert channels, Bitcoin CoinJoin de-anonymization, DeFi reentrancy, and lattice cryptography.",
      image: "/images/thrushes_macho.jpg",
      tags: ["Mach-O", "Windows.db", "Wireshark", "CoinJoin", "DeFi Reentrancy", "SageMath", "ASCWG 2026"],
      time: "7 Writeups",
      includedChallenges: [
        "The Thrushes (macOS)",
        "Search-Dude (Windows.db)",
        "Sensor Confession (Covert TCP)",
        "NightShade Vendor (CoinJoin)",
        "Cascaded Fallacy (DeFi)",
        "Crypto Suite (SageMath)",
        "Sol-Net Node (Burp)"
      ]
    },
    {
      title: "Kaspersky CTF 2026: Threat Labs Dossier",
      slug: "kaspersky",
      href: "/ctfs/kaspersky",
      platform: "Kaspersky CTF",
      category: "Threat Labs Dossier",
      points: "3 LABS // 3 FLAGS",
      tagline: "Windows RAM, Apple CoreStorage & TLS GREASE Channels",
      description: "Detailed technical walkthroughs for all 3 Kaspersky CTF operations: Windows 10 RAM PoolParty and Havoc Demon triage, Apple CoreStorage Fusion Drive volume reassembly, and TLS 1.3 GREASE covert channels.",
      image: "/images/kaspersky_ping_pong_show.jpg",
      tags: ["Volatility 3", "PoolParty", "CoreStorage", "FileVault", "TLS GREASE", "Kaspersky CTF"],
      time: "3 Writeups",
      includedChallenges: [
        "Ping Pong Show (PoolParty & Havoc Demon)",
        "Ryan Guzling (CoreStorage Fusion Drive)",
        "Time to Install Arch (TLS GREASE Channel)"
      ]
    },
    {
      title: "SunshineCTF 2026: Forensics Dossier",
      slug: "sunshine",
      href: "/ctfs/sunshine",
      platform: "SunshineCTF 2026",
      category: "Forensics Dossier",
      points: "5 LABS // 5 FLAGS",
      tagline: "VoIP Audio, PNG Height, MSKLC Keyboard & PPTM Macros",
      description: "Full forensics operational dossier: VoIP telephony RTP audio carving, PNG IHDR height repair, MSKLC typewriter snake trail and dead key state machines, and malicious PPTM macro deobfuscation.",
      image: "/images/sunshine_welcome_call.jpg",
      tags: ["VoIP", "PNG Forensics", "MSKLC", "PPTM Macros", "Audacity", "SunshineCTF 2026"],
      time: "5 Writeups",
      includedChallenges: [
        "Welcome Call! (VoIP RTP)",
        "u cut me off (PNG IHDR)",
        "suntrail (MSKLC Snake)",
        "NAS coal (PPTM Macro)",
        "my eyes burn (Dead Key FSM)"
      ]
    },
    {
      title: "CAT CTF 2026: Advanced Incident Response",
      slug: "catctf-horus-ra",
      href: "/posts/catctf-horus-ra",
      platform: "CAT CTF 2026",
      category: "Incident Response",
      points: "500 PTS // FULL IR",
      tagline: "Multi-Stage Fileless Malware DFIR & Horus Protector",
      description: "Comprehensive Incident Response investigation of a multi-stage credential stealer: Edge browser SQLite artifacts, PowerShell Event ID 400 stagers, registry chunk reassembly via dnfile, and MoDi RAT PCAP triage.",
      image: "/images/catctf_horus_ra.jpg",
      tags: ["Incident Response", "DFIR", "dnfile / dnSpy", "Horus Protector", "MoDi RAT", "CAT CTF 2026"],
      time: "16 min read",
      includedChallenges: [
        "HORUS Ra (Edge SQLite, PowerShell Event 400, dnfile Registry, MoDi RAT)"
      ]
    },
    {
      title: "PicoCTF: Forensics & Binary Archive",
      slug: "picoctf",
      href: "/ctfs?platform=PicoCTF",
      platform: "PicoCTF",
      category: "Archive Dossier",
      points: "12+ LABS",
      tagline: "Disk Forensics, IMSI Catchers, SSTV & Anti-Forensics",
      description: "In-depth technical writeups covering Apollo SSTV demodulation, cellular IMSI catchers, raw FAT32/ext4 partition carving with Sleuth Kit, and Linux filesystem timestomping analysis.",
      image: "/images/pico_rogue_tower.jpg",
      tags: ["The Sleuth Kit", "Wireshark", "SSTV", "ext4 Forensics", "IMSI Catcher", "PicoCTF"],
      time: "12+ Writeups",
      includedChallenges: [
        "Disko 4",
        "Forensics Git 0-2",
        "Rogue Tower",
        "Timeline 0-1",
        "m00nwalk 1-2",
        "WebNet0",
        "Shark on Wire"
      ]
    },
    {
      title: "DFIR & Threat Defense Labs",
      slug: "labs",
      href: "/labs",
      platform: "Blue Team / CyberDefenders",
      category: "Hands-On Labs",
      points: "MULTI-CASE DFIR",
      tagline: "Malware Analysis, Ransomware & Threat Hunting",
      description: "Real-world forensic investigations, malware reverse engineering, Phobos ransomware deep dives, and threat hunting writeups from CyberDefenders and practical SOC/DFIR scenarios.",
      image: "/images/dfir_threat_labs_banner.png",
      tags: ["Malware Analysis", "Phobos Ransomware", "Memory Forensics", "Threat Hunting", "DFIR"],
      time: "Lab Guides",
      includedChallenges: [
        "Phobos Ransomware Reverse Engineering",
        "Memory Dump SOC Analysis",
        "Threat Hunting Incident Scenarios"
      ]
    },
    {
      title: "All CTFs Master Directory",
      slug: "ctfs-all",
      href: "/ctfs",
      platform: "All Competitions",
      category: "Complete Directory",
      points: "40+ WRITEUPS",
      tagline: "Search, Filter & Browse All Individual Challenges",
      description: "The complete central database of all 40+ individual challenge writeups across every CTF competition, filterable by tool, platform, and forensic category.",
      image: "/images/ctfs_hub.jpg",
      tags: ["All CTFs", "Directory", "Search Engine", "Filters", "Full Index"],
      time: "40+ Writeups",
      includedChallenges: [
        "Granular Search & Filter Engine Across All 40+ Individual Challenges"
      ]
    }
  ];

  // Distinct filter options derived from CTFs
  const allCategories = useMemo(() => {
    const cats = new Set(ctfCompetitions.map((c) => c.category));
    return ["ALL", ...Array.from(cats).sort()];
  }, [ctfCompetitions]);

  const allPlatforms = useMemo(() => {
    const plats = new Set(ctfCompetitions.map((c) => c.platform));
    return ["ALL", ...Array.from(plats).sort()];
  }, [ctfCompetitions]);

  const popularTags = useMemo(() => {
    const tagCount = {};
    ctfCompetitions.forEach((c) => {
      c.tags.forEach((t) => {
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [ctfCompetitions]);

  // Filtered CTFs based on search and selected filters
  const filteredCtfs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return ctfCompetitions.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.platform.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        (c.includedChallenges && c.includedChallenges.some((ch) => ch.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === "ALL" || c.category === selectedCategory;

      const matchesPlatform =
        selectedPlatform === "ALL" || c.platform === selectedPlatform;

      const matchesTag =
        selectedTag === "ALL" || c.tags.includes(selectedTag);

      return matchesQuery && matchesCategory && matchesPlatform && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedPlatform, selectedTag, ctfCompetitions]);

  const isFilteringActive =
    searchQuery.trim() !== "" ||
    selectedCategory !== "ALL" ||
    selectedPlatform !== "ALL" ||
    selectedTag !== "ALL";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedPlatform("ALL");
    setSelectedTag("ALL");
  };

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Universal Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-20">
        
        {/* Search Bar & Filter Controls */}
        <div className="w-full max-w-4xl mx-auto px-4 mb-8 z-30 relative">
          <div className="flex gap-2">
            <div className="relative flex-grow min-w-0">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CTFs by name, concept, or included challenge (e.g. Volatility, Mach-O, Vormir, GREASE)..." 
                className="w-full p-4 pl-12 pr-10 rounded-xl border border-zinc-800 bg-[#0d0d12]/90 focus:bg-[#111117] focus:border-emerald-500/60 focus:outline-none transition-all text-white placeholder-zinc-500 backdrop-blur-md font-mono text-xs md:text-sm shadow-inner" 
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50">
                <svg className="w-5 h-5 fill-current text-zinc-400" viewBox="0 0 512 512">
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                </svg>
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white"
                  aria-label="Clear search"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-5 py-4 rounded-xl border transition-all flex items-center gap-2 font-mono text-xs uppercase tracking-wider backdrop-blur-md ${
                isFilterOpen || isFilteringActive
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                  : "border-zinc-800 bg-[#0d0d12]/90 text-zinc-400 hover:border-emerald-500/40 hover:text-white"
              }`}
              title="Filter by Competition or Category"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 4h20v4h-2v2h-2v2h-2v6h-4v-6h-2v-2h-2v-2h-2z"></path>
              </svg>
              <span className="hidden sm:inline">Filter</span>
              {isFilteringActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Expandable Category & Tag Filter Drawer */}
          {isFilterOpen && (
            <div className="mt-4 p-5 rounded-2xl bg-[#0d0d12]/95 border border-emerald-500/30 backdrop-blur-xl shadow-2xl space-y-5 animate-fadeIn">
              
              {/* Category Filter Chips */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    Filter by Category:
                  </span>
                  {selectedCategory !== "ALL" && (
                    <button 
                      onClick={() => setSelectedCategory("ALL")} 
                      className="font-mono text-[10px] text-zinc-400 hover:text-white underline"
                    >
                      Reset Category
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg font-mono text-xs transition-all border ${
                        selectedCategory === cat
                          ? "theme-filter-active scale-105"
                          : "theme-filter-inactive"
                      }`}
                    >
                      {cat === "ALL" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform / CTF Filter Chips */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    Filter by CTF Platform:
                  </span>
                  {selectedPlatform !== "ALL" && (
                    <button 
                      onClick={() => setSelectedPlatform("ALL")} 
                      className="font-mono text-[10px] text-zinc-400 hover:text-white underline"
                    >
                      Reset Platform
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allPlatforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-3 py-1 rounded-lg font-mono text-xs transition-all border ${
                        selectedPlatform === plat
                          ? "theme-filter-active scale-105"
                          : "theme-filter-inactive"
                      }`}
                    >
                      {plat === "ALL" ? "All Platforms" : plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    Filter by Tool / Discipline:
                  </span>
                  {selectedTag !== "ALL" && (
                    <button 
                      onClick={() => setSelectedTag("ALL")} 
                      className="font-mono text-[10px] text-zinc-400 hover:text-white underline"
                    >
                      Reset Tool
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedTag("ALL")}
                    className={`px-2.5 py-0.5 rounded font-mono text-[11px] transition-all border ${
                      selectedTag === "ALL"
                        ? "theme-filter-active scale-105"
                        : "theme-filter-inactive"
                    }`}
                  >
                    All Tools
                  </button>
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? "ALL" : tag)}
                      className={`px-2.5 py-0.5 rounded font-mono text-[11px] transition-all border ${
                        selectedTag === tag
                          ? "theme-filter-active scale-105"
                          : "theme-filter-inactive"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filter Status & Reset All */}
              {isFilteringActive && (
                <div className="pt-3 border-t border-zinc-800 flex justify-between items-center">
                  <span className="font-mono text-xs text-zinc-400">
                    Found <strong>{filteredCtfs.length}</strong> matching CTF competitions
                  </span>
                  <button 
                    onClick={clearAllFilters}
                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-mono text-xs transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CARDS DISPLAY: CTF COMPETITIONS & DOSSIERS ONLY                            */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                {isFilteringActive ? "Filtered Competitions" : "Tactical Dossiers"}
              </span>
              <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                {isFilteringActive 
                  ? `Matching CTFs (${filteredCtfs.length})` 
                  : "CTF Competitions & Tactical Dossiers"}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              {isFilteringActive ? (
                <button 
                  onClick={clearAllFilters}
                  className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  ← Show All CTFs
                </button>
              ) : null}
              <Link 
                href="/ctfs" 
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                Browse All 40+ Individual Challenges in Directory →
              </Link>
            </div>
          </div>

          {filteredCtfs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6 w-full">
              {filteredCtfs.map((c) => {
                return (
                  <Link 
                    key={c.slug}
                    href={c.href} 
                    className="bg-[#111114] rounded-xl flex flex-col border border-zinc-800/80 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:border-zinc-500/80 group overflow-hidden theme-card relative"
                  >
                    {/* Vintage CRT Phosphor Top Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none" />

                    {/* Banner Image */}
                    {c.image ? (
                      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/60 border-b border-zinc-800/80">
                        <Image
                          src={c.image}
                          alt={c.title}
                          width={600}
                          height={340}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    
                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow text-left">
                      <div className="flex justify-between items-center gap-2 mb-2">
                        <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors text-[11px] font-mono tracking-[0.25em] uppercase font-bold">
                          {c.platform}
                        </p>
                        <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {c.points}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300 text-zinc-100 group-hover:text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                        {c.title}
                      </h2>

                      <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed line-clamp-3 mb-4">
                        {c.tagline || c.description}
                      </p>

                      {/* Included Challenges Preview */}
                      {c.includedChallenges && c.includedChallenges.length > 0 && (
                        <div className="mb-4 p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-900 font-mono text-[11px]">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px] block mb-1">
                            Included Operations:
                          </span>
                          <div className="line-clamp-2 text-zinc-300 text-[11px] leading-relaxed">
                            {c.includedChallenges.join(" • ")}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="mt-auto pt-3.5 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                        {c.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800/90 text-[10px] font-mono px-2 py-0.5 rounded tracking-wider uppercase group-hover:border-zinc-700 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer CTA */}
                      <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                        <span>{c.time}</span>
                        <span className="theme-cta font-bold flex items-center gap-1 transition-colors text-emerald-400 group-hover:text-emerald-300">
                          Open Dossier <span className="transform transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto p-12 bg-[#0e0e13]/80 border border-dashed border-zinc-800 rounded-2xl text-center space-y-4">
              <div className="flex justify-center text-zinc-600">
                <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                No Matching CTF Competitions Found
              </h3>
              <p className="text-zinc-400 text-sm font-sans">
                No competition matched your search. You can also search all 40+ individual challenges in the full directory.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button 
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-mono text-xs font-bold hover:bg-emerald-500/30 transition-all"
                >
                  Reset Filters
                </button>
                <Link 
                  href="/ctfs"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl font-mono text-xs font-bold transition-all"
                >
                  Go to All Challenges →
                </Link>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
