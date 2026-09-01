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

  // The 3 Primary Category Hubs
  const primaryHubs = [
    {
      title: "PicoCTF Forensics",
      slug: "picoctf",
      category: "13 CHALLENGES",
      points: "PicoCTF 2019",
      tagline: "File Repair • Stego • PCAP • Audio",
      description: "My complete writeups for all 13 PicoCTF forensics challenges. Includes manual hex breakdowns, Wireshark steps, Python solver scripts, and one-liners.",
      image: "/images/picoctf_hub.jpg",
      tags: ["PNG Repair", "Ghidra", "Wireshark", "SSTV", "LSB Stego"],
      time: "13 Writeups"
    },
    {
      title: "ASCWG 2026 CTF",
      slug: "ascwg",
      category: "4 CHALLENGES",
      points: "Qualifications",
      tagline: "macOS • Windows • Network • Bitcoin",
      description: "Solutions for the Arab Security Cyber Wargames 2026 forensics and OSINT tracks: reversing a trojanized Signal app, ESE database carving, and Bitcoin mixer tracing.",
      image: "/images/cgwars_hub.jpg",
      tags: ["Mach-O", "Windows.db", "TRACE-7", "TCP Urg"],
      time: "4 Writeups"
    },
    {
      title: "DFIR & Threat Labs",
      slug: "labs",
      category: "HANDS-ON LABS",
      points: "Blue Team",
      tagline: "Malware • Memory • Incident Response",
      description: "Real-world forensic investigations, malware reverse engineering, and threat hunting writeups from CyberDefenders and practical DFIR scenarios.",
      image: "/images/cyber_defense_labs.jpg",
      tags: ["Malware Analysis", "Phobos Ransomware", "Memory Forensics", "Threat Hunting"],
      time: "Lab Guides"
    }
  ];

  // All 18 Individual Challenges Across All Hubs
  const allChallenges = [
    // --- ASCWG Challenges ---
    {
      title: "The Thrushes",
      slug: "the-thrushes",
      platform: "ASCWG",
      category: "macOS DFIR",
      points: "MEDIUM",
      tagline: "Signal App Reverse Engineering",
      description: "Investigating an infected macOS machine. We decompile a trojanized Signal Desktop binary in Ghidra, uncover hidden threads, and pull out hardcoded AES-256 keys.",
      image: "/images/thrushes_macho.jpg",
      tags: ["Ghidra", "Mach-O 64-bit", "macOS Triage", "AES-CBC"],
      time: "7 min read"
    },
    {
      title: "Do You Even Search Dude",
      slug: "search-dude",
      platform: "ASCWG",
      category: "Windows Forensics",
      points: "MEDIUM",
      tagline: "Windows Search Database Carving",
      description: "Carving Windows Search (Windows.db) ESE databases and parsing Program Compatibility Assistant (PCA) logs to trace how malware was executed on the host.",
      image: "/images/search_dude_disk.jpg",
      tags: ["Windows.db", "KAPE", "ESE Database", "PCA Artifacts"],
      time: "8 min read"
    },
    {
      title: "Sensor Confession",
      slug: "sensor-confession",
      platform: "ASCWG",
      category: "Network Forensics",
      points: "MEDIUM",
      tagline: "Covert Channel Smuggling",
      description: "Finding data hidden inside raw PCAP traffic. We inspect unusual TCP packets, spot data smuggled inside TCP Urgent Pointers, and reconstruct the full stream.",
      image: "/images/sensor_confession_fiber.jpg",
      tags: ["Wireshark", "tshark", "TCP Urgent Pointer", "PCAP Analysis"],
      time: "6 min read"
    },
    {
      title: "NightShade Vendor",
      slug: "nightshade-vendor",
      platform: "ASCWG",
      category: "Blockchain OSINT",
      points: "MEDIUM",
      tagline: "CoinJoin Mixer De-Anonymization",
      description: "Tracking illicit Bitcoin transactions through a Wasabi CoinJoin mixer. Using the TRACE-7 Peel-Chain method and multi-input clustering to unmask the real destination.",
      image: "/images/nightshade_bitcoin.jpg",
      tags: ["TRACE-7", "CoinJoin Mixing", "Esplora API", "UTXO Graph"],
      time: "9 min read"
    },

    // --- Threat Labs Challenges ---
    {
      title: "Phobos Ransomware Analysis",
      slug: "phobos-ransomware-analysis",
      platform: "Threat Labs",
      category: "Malware Analysis",
      points: "ADVANCED",
      tagline: "Unpacking, Decrypting & Threat Intel",
      description: "Static and dynamic analysis of Phobos ransomware. Decompiling its crypto routine in Ghidra, mapping out persistence keys, and writing custom YARA detection rules.",
      image: "/images/phobos_thumbnail.jpg",
      tags: ["Ghidra", "Ransomware DFIR", "x64dbg", "Threat Intel", "YARA"],
      time: "12 min read"
    },

    // --- PicoCTF 2019 Forensics (13 Challenges) ---
    {
      title: "c0rrupt",
      slug: "picoctf-c0rrupt",
      platform: "PicoCTF",
      category: "File Repair",
      points: "250 PTS",
      tagline: "PNG Specification & Hex Patching",
      description: "Fixing a broken PNG file byte-by-byte in a hex editor. Restoring missing magic headers, repairing IHDR and pHYs chunks, and calculating the exact IDAT length.",
      image: "/images/pico_c0rrupt.jpg",
      tags: ["HexEd.it / HxD", "pngcheck", "PNG Spec", "Python Bytearray"],
      time: "8 min read"
    },
    {
      title: "What Lies Within",
      slug: "picoctf-what-lies-within",
      platform: "PicoCTF",
      category: "Steganography",
      points: "150 PTS",
      tagline: "LSB Bit-Plane Extraction",
      description: "Extracting secret text hidden inside the least significant bits of an RGB image using zsteg, Aperi'Solve, and a quick custom Python script.",
      image: "/images/pico_what_lies_within.jpg",
      tags: ["Aperi'Solve", "zsteg", "LSB Bit-Planes", "Python PIL"],
      time: "5 min read"
    },
    {
      title: "like1000",
      slug: "picoctf-like1000",
      platform: "PicoCTF",
      category: "Automation",
      points: "250 PTS",
      tagline: "Russian Doll Nested Archives",
      description: "Extracting 1,000 nested TAR archives in seconds using a short Python loop with tarfile and automatic cleanup to get the flag.",
      image: "/images/pico_like1000.jpg",
      tags: ["Python tarfile", "TAR Archives", "Automation", "Garbage Collection"],
      time: "4 min read"
    },
    {
      title: "Shark on Wire 2",
      slug: "picoctf-shark-on-wire-2",
      platform: "PicoCTF",
      category: "Network Forensics",
      points: "300 PTS",
      tagline: "Covert Channels & UDP Port Stego",
      description: "Finding secret data smuggled across UDP source port numbers. We filter the packets in Wireshark and decode ASCII characters by subtracting 5000 from each port.",
      image: "/images/pico_shark_on_wire_2.jpg",
      tags: ["Wireshark", "UDP Stream Triage", "Port Steganography", "Python struct"],
      time: "7 min read"
    },
    {
      title: "Investigative Reversing 0",
      slug: "picoctf-investigative-reversing-0",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "300 PTS",
      tagline: "Trailing Appended Byte Math",
      description: "Decompiling a binary that appends altered characters right after the PNG IEND marker. We pull the trailing bytes in HxD and reverse the arithmetic shifts (+5 / -3).",
      image: "/images/pico_ir0.jpg",
      tags: ["Ghidra", "PNG IEND", "File Overlays", "Reverse Math"],
      time: "6 min read"
    },
    {
      title: "Investigative Reversing 1",
      slug: "picoctf-investigative-reversing-1",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "350 PTS",
      tagline: "Multi-Image Overlay Jigsaw",
      description: "Reversing how a binary splits a 26-character flag across 3 separate PNG images. We carve the bytes past each IEND and put the jigsaw pieces back in place.",
      image: "/images/pico_investigative_reversing_1.jpg",
      tags: ["Ghidra", "Multi-Image Carving", "Jigsaw Assembly", "Python Solver"],
      time: "8 min read"
    },
    {
      title: "Investigative Reversing 2",
      slug: "picoctf-investigative-reversing-2",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "350 PTS",
      tagline: "Bitmap LSB Deconstruction",
      description: "Reversing a custom BMP LSB encoder. Finding offset 2000, reading 8 LSB bits per character, and undoing the binary's +5 shift to recover the flag.",
      image: "/images/pico_ir2.jpg",
      tags: ["Ghidra", "Bitmap LSB", "HexEd.it", "Shift Inversion"],
      time: "7 min read"
    },
    {
      title: "Investigative Reversing 3",
      slug: "picoctf-investigative-reversing-3",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "400 PTS",
      tagline: "9-Byte Stride & Dummy Filler",
      description: "Overcoming interleaved dummy bytes in BMP steganography. We spot the 9-byte stride pattern in Ghidra and write a Python script that ignores the filler byte.",
      image: "/images/pico_ir3.jpg",
      tags: ["Ghidra", "Stride Analysis", "Dummy Skipping", "Binary Decompilation"],
      time: "8 min read"
    },
    {
      title: "So Meta",
      slug: "picoctf-so-meta",
      platform: "PicoCTF",
      category: "Image Metadata",
      points: "150 PTS",
      tagline: "EXIF & PNG Text Chunks",
      description: "Extracting the flag hidden directly inside an image's metadata text chunks using ExifTool, strings, and Python PIL.",
      image: "/images/pico_so_meta.jpg",
      tags: ["ExifTool", "strings", "PNG tEXt Chunks", "Python PIL"],
      time: "3 min read"
    },
    {
      title: "WhitePages",
      slug: "picoctf-whitepages",
      platform: "PicoCTF",
      category: "Whitespace Stego",
      points: "250 PTS",
      tagline: "Unicode Invisible Demodulation",
      description: "Decoding a text file that looks completely blank. We analyze the raw bytes and map Unicode EM spaces and normal spaces into binary 0s and 1s.",
      image: "/images/pico_whitepages.jpg",
      tags: ["Format-Hex", "CyberChef", "Unicode Stego", "Binary Demodulation"],
      time: "5 min read"
    },
    {
      title: "Extensions",
      slug: "picoctf-extensions",
      platform: "PicoCTF",
      category: "File Signatures",
      points: "150 PTS",
      tagline: "Magic Bytes & Header Triage",
      description: "Inspecting raw magic bytes on a misnamed text file, verifying that it is actually a PNG image, and changing the extension to view the flag.",
      image: "/images/pico_extensions.jpg",
      tags: ["Magic Bytes", "file", "Format-Hex", "File Signatures"],
      time: "3 min read"
    },
    {
      title: "m00nwalk",
      slug: "picoctf-m00nwalk",
      platform: "PicoCTF",
      category: "Audio Forensics",
      points: "250 PTS",
      tagline: "Apollo 11 SSTV Demodulation",
      description: "Decoding an SSTV audio signal from the Apollo 11 moon mission. We play the audio into Robot36 or Python PySSTV to draw the secret image line-by-line.",
      image: "/images/pico_m00nwalk.jpg",
      tags: ["SSTV", "Scottie 1", "Audio Forensics", "Robot36 / PySSTV"],
      time: "6 min read"
    },
    {
      title: "Shark on Wire 1",
      slug: "picoctf-shark-on-wire-1",
      platform: "PicoCTF",
      category: "Network Forensics",
      points: "150 PTS",
      tagline: "UDP Stream Follow & Decoy Triage",
      description: "Following UDP conversation streams in Wireshark, avoiding fake decoy flags, and pulling the real flag from Stream 5.",
      image: "/images/pico_shark_on_wire_1.jpg",
      tags: ["Wireshark", "UDP Stream Follow", "Decoy Trapping", "Scapy Reassembly"],
      time: "4 min read"
    }
  ];

  // Extract distinct categories & platforms & popular tags for the filter menu
  const allCategories = useMemo(() => {
    const cats = new Set(allChallenges.map((c) => c.category));
    return ["ALL", ...Array.from(cats).sort()];
  }, [allChallenges]);

  const allPlatforms = useMemo(() => {
    const plats = new Set(allChallenges.map((c) => c.platform));
    return ["ALL", ...Array.from(plats).sort()];
  }, [allChallenges]);

  const popularTags = useMemo(() => {
    const tagCount = {};
    allChallenges.forEach((c) => {
      c.tags.forEach((t) => {
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [allChallenges]);

  // Filtered challenges based on query, category, platform, and tag
  const filteredChallenges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allChallenges.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.platform.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "ALL" || c.category === selectedCategory;

      const matchesPlatform =
        selectedPlatform === "ALL" || c.platform === selectedPlatform;

      const matchesTag =
        selectedTag === "ALL" || c.tags.includes(selectedTag);

      return matchesQuery && matchesCategory && matchesPlatform && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedPlatform, selectedTag, allChallenges]);

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
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Universal Navigation Bar with Menu */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-20">
        
        {/* Search Bar & Filter Controls */}
        <div className="w-full max-w-3xl mx-auto px-4 mb-8 z-30 relative">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search writeups by name, tool, or concept (e.g. LSB, Wireshark, Ghidra)..." 
                className="w-full p-4 pl-12 pr-10 rounded-xl border border-zinc-800 bg-[#0d0d12]/90 focus:bg-[#111117] focus:border-emerald-500/60 focus:outline-none transition-all text-white placeholder-zinc-500 backdrop-blur-md font-mono text-xs md:text-sm shadow-inner" 
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50">
                <svg className="w-5 h-5 fill-current text-zinc-400" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white font-mono text-xs"
                >
                  ✕
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
              title="Filter by Category"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 4h20v4h-2v2h-2v2h-2v6h-4v-6h-2v-2h-2v-2h-2v-2h-2z"></path>
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
                    <span>📁</span> Filter by Category:
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
                      className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
                        selectedCategory === cat
                          ? "bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-emerald-500/50 hover:text-white"
                      }`}
                    >
                      {cat === "ALL" ? "🌟 All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform / Hub Filter Chips */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏛️</span> Filter by CTF / Source:
                  </span>
                  {selectedPlatform !== "ALL" && (
                    <button 
                      onClick={() => setSelectedPlatform("ALL")} 
                      className="font-mono text-[10px] text-zinc-400 hover:text-white underline"
                    >
                      Reset Source
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allPlatforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
                        selectedPlatform === plat
                          ? "bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-emerald-500/50 hover:text-white"
                      }`}
                    >
                      {plat === "ALL" ? "🌐 All Sources" : plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span> Filter by Tool / Concept:
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
                    className={`px-2.5 py-0.5 rounded font-mono text-[11px] transition-all ${
                      selectedTag === "ALL"
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    All Tools
                  </button>
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? "ALL" : tag)}
                      className={`px-2.5 py-0.5 rounded font-mono text-[11px] transition-all ${
                        selectedTag === tag
                          ? "bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-emerald-500/50 hover:text-white"
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
                    Found <strong>{filteredChallenges.length}</strong> matching writeups
                  </span>
                  <button 
                    onClick={clearAllFilters}
                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-mono text-xs transition-all"
                  >
                    ✕ Clear Filters
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Section Display Logic */}
        {!isFilteringActive ? (
          /* ========================================================================= */
          /* DEFAULT VIEW: The 3 Primary Category Hubs                                 */
          /* ========================================================================= */
          <div className="space-y-8">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                  Featured
                </span>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                  Writeup Hubs &amp; Categories
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">3 Hubs</span>
            </div>

            {/* The 3 Core Hub Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full">
              {primaryHubs.map((c) => {
                return (
                  <Link 
                    key={c.slug}
                    href={`/${c.slug}`} 
                    className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_15px_35px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
                  >
                    <div className="relative w-full h-44 overflow-hidden bg-black/80">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                      <Image 
                        src={c.image} 
                        alt={c.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                        priority
                      />
                      <div className="absolute top-3 left-3 z-20 flex gap-2">
                        <span className="bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                          {c.category}
                        </span>
                        <span className="bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded-full">
                          {c.points}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow relative z-20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                          {c.tagline}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                        {c.title}
                      </h3>

                      <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                        {c.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                        {c.tags.map((tag) => (
                          <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer CTA */}
                      <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                        <span>⏱ {c.time}</span>
                        <span className="text-emerald-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                          View Hub <span className="transform transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* FILTERED / SEARCH VIEW: Individual Matched Challenges                     */
          /* ========================================================================= */
          <div className="space-y-8">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                  Search Results
                </span>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                  Matching Challenges ({filteredChallenges.length})
                </h2>
              </div>
              <button 
                onClick={clearAllFilters}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                ← Back to All Hubs
              </button>
            </div>

            {filteredChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full">
                {filteredChallenges.map((c) => {
                  return (
                    <Link 
                      key={c.slug}
                      href={`/posts/${c.slug}`} 
                      className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_15px_35px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
                    >
                      <div className="relative w-full h-44 overflow-hidden bg-black/80">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <Image 
                          src={c.image} 
                          alt={c.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                          priority
                        />
                        <div className="absolute top-3 left-3 z-20 flex gap-2">
                          <span className="bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                            {c.category}
                          </span>
                          <span className="bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded-full">
                            {c.points}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 flex flex-col flex-grow relative z-20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                            {c.tagline}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                          {c.title}
                        </h3>

                        <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                          {c.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                          {c.tags.map((tag) => (
                            <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer CTA */}
                        <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                          <span>⏱ {c.time}</span>
                          <span className="text-emerald-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                            Read Guide <span className="transform transition-transform group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto p-12 bg-[#0e0e13]/80 border border-dashed border-zinc-800 rounded-2xl text-center space-y-4">
                <div className="text-3xl">🔍</div>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                  No Matching Writeups Found
                </h3>
                <p className="text-zinc-400 text-sm font-sans">
                  No challenges matched what you typed. Try a different tool name, category, or clear your filters.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-mono text-xs font-bold hover:bg-emerald-500/30 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
