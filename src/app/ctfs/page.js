"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CtfsHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const challenges = [
    // --- Latest 2026 Additions ---
    {
      title: "Rogue Tower",
      slug: "picoctf-rogue-tower",
      platform: "PicoCTF",
      category: "Network Forensics",
      points: "350 PTS",
      tagline: "Cellular IMSI Catcher & KPA Decryption",
      description: "Analyzing cellular base station broadcast beacons, tracing victim IMSI registrations to an unauthorized tower, reassembling fragmented HTTP POST payloads, and executing a Known Plaintext Attack (KPA) XOR decryption.",
      image: "/images/pico_rogue_tower.jpg",
      tags: ["Wireshark", "tshark", "IMSI Catcher", "XOR Cipher", "KPA Decryption", "Cellular DFIR", "Rogue Tower", "rogue_tower", "PicoCTF 2026"],
      time: "6 min read"
    },
    {
      title: "Timeline 0",
      slug: "picoctf-timeline-0",
      platform: "PicoCTF",
      category: "Disk Forensics",
      points: "300 PTS",
      tagline: "Timestomping & Filesystem Outlier Analysis",
      description: "Forensic analysis of a raw ext4 partition image using The Sleuth Kit. Generating bodyfiles with fls, building chronological timelines with mactime, spotting an extreme 1985 timestomped outlier, and carving Inode 4945.",
      image: "/images/pico_timeline_0.jpg",
      tags: ["The Sleuth Kit", "fls", "mactime", "icat", "ext4 Forensics", "Timestomping", "Outlier Analysis", "Timeline 0", "timeline0", "PicoCTF 2026"],
      time: "5 min read"
    },
    {
      title: "Timeline 1",
      slug: "picoctf-timeline",
      platform: "PicoCTF",
      category: "Disk Forensics",
      points: "300 PTS",
      tagline: "Linux Filesystem MAC Timeline & Inode Carving",
      description: "Investigating a raw ext4 partition image from Timeline 1 using The Sleuth Kit. Generating bodyfiles with fls, sorting chronological MAC timelines with mactime, and carving suspect pre-shutdown artifacts with icat.",
      image: "/images/pico_timeline.jpg",
      tags: ["The Sleuth Kit", "fls", "mactime", "icat", "ext4 Forensics", "Timeline Analysis", "Timeline 1", "timeline", "PicoCTF 2026"],
      time: "5 min read"
    },

    // --- Kaspersky CTF 2026 ---
    {
      title: "Ping Pong Show",
      slug: "kaspersky-ping-pong-show",
      platform: "Kaspersky CTF",
      category: "Memory Forensics",
      points: "500 PTS",
      tagline: "PoolParty & Havoc Demon Reversing",
      description: "Investigating a 4.5 GB Windows 10 RAM dump. Carving Outlook phishing attachments, reversing PoolParty ThreadPool injection into Acrobat, and decrypting Havoc Demon C2 traffic.",
      image: "/images/kaspersky_ping_pong_show.jpg",
      tags: ["Volatility 3", "PoolParty", "Havoc Demon", "AES-CTR", "Outlook MPFS"],
      time: "10 min read"
    },
    {
      title: "Ryan Guzling",
      slug: "kaspersky-ryan-guzling",
      platform: "Kaspersky CTF",
      category: "macOS DFIR",
      points: "500 PTS",
      tagline: "CoreStorage Fusion Drive & FileVault",
      description: "Reassembling an Apple CoreStorage Fusion Drive split across SSD and HDD images. Carving an HFS+ trash volume to recover the FileVault recovery key and unlock the volume.",
      image: "/images/kaspersky_ryan_guzling.jpg",
      tags: ["CoreStorage", "FileVault", "HFS+", "SleuthKit", "hdiutil"],
      time: "8 min read"
    },
    {
      title: "Time to Install Arch",
      slug: "kaspersky-time-to-install-arch",
      platform: "Kaspersky CTF",
      category: "Network Forensics",
      points: "500 PTS",
      tagline: "TLS GREASE Covert Channel & DLL Sideloading",
      description: "Forensic analysis of a Windows Server 2016 VMDK and PCAP. Spotting GAC DLL sideloading, decoding a covert channel inside TLS GREASE 0x0a0a extensions, and ChaCha20 decryption.",
      image: "/images/kaspersky_time_to_install_arch.jpg",
      tags: ["Wireshark", "DLL Sideloading", "TLS GREASE", "ChaCha20", "tshark"],
      time: "9 min read"
    },

    // --- ASCWG 2026 ---
    {
      title: "The Thrushes",
      slug: "the-thrushes",
      platform: "ASCWG 2026",
      category: "macOS Forensics",
      points: "HARD",
      tagline: "Mach-O Reverse Engineering",
      description: "Decompiling a weaponized Signal app on macOS. We unpack the Mach-O binary, deobfuscate XOR routines, and recover command-and-control communication keys.",
      image: "/images/thrushes_macho.jpg",
      tags: ["Ghidra", "Mach-O", "macOS Triage", "XOR Cryptanalysis"],
      time: "8 min read"
    },
    {
      title: "Search-Dude",
      slug: "search-dude",
      platform: "ASCWG 2026",
      category: "Windows Forensics",
      points: "MEDIUM",
      tagline: "Windows.db & PCA AppHelp",
      description: "Recovering erased execution logs by carving Windows.db (Extensible Storage Engine) and correlating Program Compatibility Assistant (PCA) telemetry.",
      image: "/images/search_dude_disk.jpg",
      tags: ["Windows.db", "ESE Database", "PCA Telemetry", "AES Decryption"],
      time: "7 min read"
    },
    {
      title: "Sensor Confession",
      slug: "sensor-confession",
      platform: "ASCWG 2026",
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
      platform: "ASCWG 2026",
      category: "Blockchain OSINT",
      points: "MEDIUM",
      tagline: "CoinJoin Mixer De-Anonymization",
      description: "Tracking illicit Bitcoin transactions through a Wasabi CoinJoin mixer. Using the TRACE-7 Peel-Chain method and multi-input clustering to unmask the real destination.",
      image: "/images/nightshade_bitcoin.jpg",
      tags: ["TRACE-7", "CoinJoin Mixing", "Esplora API", "UTXO Graph"],
      time: "9 min read"
    },
    {
      title: "Cascaded Fallacy",
      slug: "cascaded-fallacy",
      platform: "ASCWG 2026",
      category: "Smart Contracts",
      points: "500 PTS",
      tagline: "DeFi Reentrancy & EVM Trace Carving",
      description: "Investigating a multi-stage decentralized finance exploit on the Ethereum Sepolia testnet. Analyzing internal opcode traces on Blockscout to spot reentrancy and broken access control.",
      image: "/images/cascaded_fallacy.jpg",
      tags: ["Solidity", "EVM Opcodes", "Reentrancy", "Sepolia Trace", "DeFi Forensics", "ASCWG 2026"],
      time: "8 min read"
    },
    {
      title: "Crypto Suite",
      slug: "crypto-suite",
      platform: "ASCWG 2026",
      category: "Cryptography",
      points: "450 PTS",
      tagline: "Lattice Reduction & Coppersmith Small Roots",
      description: "Solving advanced math CTF challenges using SageMath. Applying Coppersmith's small roots algorithm and solving Shortest Vector Problems (SVP) via LLL lattice reduction.",
      image: "/images/crypto_suite.jpg",
      tags: ["SageMath", "Lattice Reduction", "LLL Algorithm", "Coppersmith", "RSA", "ASCWG 2026"],
      time: "10 min read"
    },
    {
      title: "Sol-Net Node",
      slug: "sol-net",
      platform: "ASCWG 2026",
      category: "Web Security",
      points: "350 PTS",
      tagline: "Node Auth Bypass & OTP Webhook Interception",
      description: "Exploiting an authentication bypass on an enterprise telemetry gateway. Bypassing host header checks and redirecting outbound OTP webhooks in Burp Suite.",
      image: "/images/sol_net.jpg",
      tags: ["Burp Suite", "Auth Bypass", "Host Header Injection", "Webhook Interception", "Web Security", "ASCWG 2026"],
      time: "6 min read"
    },

    // --- PicoCTF Forensics ---
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
      title: "m00nwalk2",
      slug: "picoctf-m00nwalk2",
      platform: "PicoCTF",
      category: "Audio Forensics",
      points: "300 PTS",
      tagline: "SSTV Audio Demodulation & Steghide LSB Carving",
      description: "Decoding multi-layered radio audio signals. Demodulating Apollo-era SSTV frequency shifts to uncover steganographic clues, and extracting embedded payloads with steghide.",
      image: "/images/pico_m00nwalk.jpg",
      tags: ["SSTV", "steghide", "Audio Forensics", "LSB Steganography", "PicoCTF 2019"],
      time: "5 min read"
    },
    {
      title: "WebNet0",
      slug: "picoctf-webnet0",
      platform: "PicoCTF",
      category: "Network Forensics",
      points: "350 PTS",
      tagline: "TLS Decryption & RSA Key Injection",
      description: "Decrypting encrypted HTTPS packet captures using a server RSA private key. Importing keys into Wireshark's cryptographic dissector and carving cleartext HTTP response headers with tshark.",
      image: "/images/pico_webnet0.jpg",
      tags: ["Wireshark", "tshark", "TLS Decryption", "RSA Private Key", "HTTP Carving"],
      time: "4 min read"
    },
    {
      title: "B1g_Mac",
      slug: "picoctf-b1g-mac",
      platform: "PicoCTF",
      category: "Anti-Forensics",
      points: "350 PTS",
      tagline: "NTFS MACB Timestomping & Zip Extra Fields",
      description: "Recovering data exfiltrated into sub-second nanosecond NTFS Modification (Mtime) timestamps. Parsing PKWARE Extra Field 0x000A, reversing MinGW directory alternation, and carving the flag.",
      image: "/images/pico_b1g_mac.jpg",
      tags: ["NTFS MACB", "Timestomping", "FILETIME", "Zip Extra 0x000A", "Python struct"],
      time: "7 min read"
    },
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
      title: "extensions",
      slug: "picoctf-extensions",
      platform: "PicoCTF",
      category: "File Headers",
      points: "150 PTS",
      tagline: "MIME-Type & Magic Byte Triage",
      description: "A rogue file disguised with a fake .txt extension. Inspecting file signatures to reveal a hidden PNG image.",
      image: "/images/pico_extensions.jpg",
      tags: ["file / stat", "Magic Bytes", "Hex Triage", "MIME Validation"],
      time: "3 min read"
    },
    {
      title: "Investigative Reversing 0",
      slug: "picoctf-investigative-reversing-0",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "300 PTS",
      tagline: "ELF Binary Disassembly & Byte Shift",
      description: "Decompiling an x86-64 ELF binary in Ghidra. Reversing the character shift algorithm to recover the secret flag.",
      image: "/images/pico_ir0.jpg",
      tags: ["Ghidra", "GDB", "x86-64 Decompilation", "Python Reverser"],
      time: "7 min read"
    },
    {
      title: "Investigative Reversing 1",
      slug: "picoctf-investigative-reversing-1",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "350 PTS",
      tagline: "Multi-File Stego Injection",
      description: "Tracing binary execution that splits and injects flag bytes into three separate images based on custom modulo math.",
      image: "/images/pico_investigative_reversing_1.jpg",
      tags: ["Ghidra", "Multi-file Stego", "Byte Offset Carving", "Python"],
      time: "8 min read"
    },
    {
      title: "Investigative Reversing 2",
      slug: "picoctf-investigative-reversing-2",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "400 PTS",
      tagline: "BMP LSB Steganography & Cipher",
      description: "Reconstructing a custom encoding routine where encoded bytes were transformed and embedded into the least-significant bits of a 24-bit BMP image.",
      image: "/images/pico_ir2.jpg",
      tags: ["Ghidra", "BMP Spec", "Bit Manipulation", "Python Stego"],
      time: "9 min read"
    },
    {
      title: "Investigative Reversing 3",
      slug: "picoctf-investigative-reversing-3",
      platform: "PicoCTF",
      category: "Reverse Engineering",
      points: "450 PTS",
      tagline: "State Machine & Interleaved Bits",
      description: "The binary uses an alternating state machine to interleave flag bits across multiple file offsets with bitwise inversions.",
      image: "/images/pico_ir3.jpg",
      tags: ["Ghidra", "State Machine Reversal", "Bit Inversion", "Solver"],
      time: "10 min read"
    },
    {
      title: "like1000",
      slug: "picoctf-like1000",
      platform: "PicoCTF",
      category: "Archive Forensics",
      points: "250 PTS",
      tagline: "Matryoshka Tar Bomb Decompression",
      description: "Automating the extraction of 1,000 nested TAR archives in memory using Python tarfile to reveal the embedded flag.",
      image: "/images/pico_like1000.jpg",
      tags: ["Python tarfile", "Bash One-Liner", "Archive Forensics"],
      time: "4 min read"
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
    },
    {
      title: "Shark on Wire 2",
      slug: "picoctf-shark-on-wire-2",
      platform: "PicoCTF",
      category: "Network Forensics",
      points: "300 PTS",
      tagline: "UDP Destination Port Stego",
      description: "Decoding covert data smuggled inside UDP destination port numbers (offset 5000) using a custom Scapy packet script.",
      image: "/images/pico_shark_on_wire_2.jpg",
      tags: ["Scapy", "Wireshark", "Port Steganography", "Covert Channel"],
      time: "6 min read"
    },
    {
      title: "So Meta",
      slug: "picoctf-so-meta",
      platform: "PicoCTF",
      category: "Metadata Triage",
      points: "150 PTS",
      tagline: "Exif & XMP Metadata Carving",
      description: "Inspecting raw PNG metadata chunks using exiftool and strings to uncover hidden artist comment tags.",
      image: "/images/pico_so_meta.jpg",
      tags: ["exiftool", "strings", "PNG Metadata", "XMP Triage"],
      time: "3 min read"
    },
    {
      title: "What Lies Within",
      slug: "picoctf-what-lies-within",
      platform: "PicoCTF",
      category: "Steganography",
      points: "150 PTS",
      tagline: "LSB RGB Channel Extraction",
      description: "Extracting hidden text encoded in the Least Significant Bits (LSB) of an RGB image using zsteg and Python Pillow.",
      image: "/images/pico_what_lies_within.jpg",
      tags: ["zsteg", "LSB Steganography", "Pillow", "RGB Bitplanes"],
      time: "5 min read"
    },
    {
      title: "WhitePages",
      slug: "picoctf-whitepages",
      platform: "PicoCTF",
      category: "Steganography",
      points: "250 PTS",
      tagline: "Unicode Whitespace Binary Decoder",
      description: "Decoding binary sequences encoded with alternating Unicode spaces (U+0020 and U+2003) into readable ASCII text.",
      image: "/images/pico_whitepages.jpg",
      tags: ["Unicode Stego", "Hex Analysis", "Python Binary Decoder"],
      time: "5 min read"
    },

    // --- Threat Labs & Practical DFIR ---
    {
      title: "Phobos Ransomware Analysis",
      slug: "phobos-ransomware-analysis",
      platform: "Threat Labs",
      category: "Reverse Engineering",
      points: "ADVANCED",
      tagline: "Unpacking, Decrypting & Threat Intel",
      description: "Static and dynamic analysis of Phobos ransomware. Decompiling its crypto routine in Ghidra, mapping out persistence keys, and writing custom YARA detection rules.",
      image: "/images/phobos_thumbnail.jpg",
      tags: ["Ghidra", "Ransomware DFIR", "x64dbg", "Threat Intel", "YARA", "Threat Labs"],
      time: "12 min read"
    }
  ];

  // Distinct Platforms with prioritized ordering
  const platforms = useMemo(() => {
    const priority = ["ALL", "PicoCTF", "ASCWG 2026", "Kaspersky CTF", "Threat Labs"];
    const current = new Set(challenges.map((c) => c.platform));
    const result = priority.filter((p) => p === "ALL" || current.has(p));
    current.forEach((p) => {
      if (!result.includes(p)) result.push(p);
    });
    return result;
  }, [challenges]);

  const categories = useMemo(() => {
    const cats = new Set(challenges.map((c) => c.category));
    return ["ALL", ...Array.from(cats).sort()];
  }, [challenges]);

  // Filtered List
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return challenges.filter((c) => {
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.platform.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));

      const matchPlatform =
        selectedPlatform === "ALL" ||
        c.platform.toLowerCase() === selectedPlatform.toLowerCase() ||
        c.platform.toLowerCase().includes(selectedPlatform.toLowerCase());

      const matchCategory =
        selectedCategory === "ALL" ||
        c.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchQuery && matchPlatform && matchCategory;
    });
  }, [challenges, searchQuery, selectedPlatform, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-amber-500/30 selection:text-amber-200">
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Master Hub Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 text-center">
          <div className="mb-4 inline-flex max-w-full items-center justify-center bg-[#111111]/80 backdrop-blur-md border theme-border px-3 sm:px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-[10px] sm:text-xs theme-text uppercase tracking-wider sm:tracking-[0.3em] text-center">
              KASPERSKY • ASCWG • PICOCTF • CYBER WARGAMES
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-normal sm:tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_var(--accent-glow)] break-words">
            CTF Competitions
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            All CTF challenge solutions and operational breakdowns gathered in one place. Filter by competition, tool, or forensic category.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0d0d12]/90 border border-zinc-800/90 p-4 rounded-2xl backdrop-blur-xl">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by challenge, tool, or flag..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-zinc-800 text-white font-mono text-xs focus:outline-none theme-input transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* CTF Competition Filter Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    selectedPlatform === p
                      ? "theme-bg-solid text-black shadow-md scale-105"
                      : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:text-white hover:theme-border"
                  }`}
                >
                  {p === "ALL" ? "🌐 All CTFs" : p}
                </button>
              ))}
            </div>

          </div>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-zinc-500 mr-1 text-[11px] uppercase tracking-wider">Category:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedCategory === c
                    ? "theme-bg-dim theme-text border theme-border font-bold"
                    : "text-zinc-500 hover:text-zinc-300 bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono theme-badge px-3 py-1 rounded-full border">
              Showing {filtered.length} of {challenges.length} Challenges
            </span>
          </div>
          {(searchQuery || selectedPlatform !== "ALL" || selectedCategory !== "ALL") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedPlatform("ALL");
                setSelectedCategory("ALL");
              }}
              className="text-xs font-mono theme-text hover:underline"
            >
              ✕ Reset All Filters
            </button>
          )}
        </div>

        {/* All Challenge Cards Grid (Unified 120 FPS Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          {filtered.map((c) => {
            return (
              <Link 
                key={c.slug}
                href={`/posts/${c.slug}`} 
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-300 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
              >
                <div className="relative w-full h-44 overflow-hidden bg-black/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <Image 
                    src={c.image} 
                    alt={c.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                    priority
                  />
                  
                  {/* Top Badges: Competition Name + Points Pill */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="bg-black/90 backdrop-blur-md border theme-border theme-text font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      {c.platform}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded-full">
                      {c.points}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-20 min-w-0">
                  <div className="flex justify-between items-center mb-1.5 min-w-0">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                      {c.category} • {c.tagline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-white group-hover:theme-text transition-colors duration-200 font-[family-name:var(--font-share-tech)] uppercase tracking-wide break-words">
                    {c.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-2 break-words">
                    {c.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                    {c.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                    <span>⏱ {c.time}</span>
                    <span className="theme-cta font-bold flex items-center gap-1 transition-colors">
                      Read Breakdown <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}
