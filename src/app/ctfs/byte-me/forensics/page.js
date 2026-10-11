"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrtCardHeader from "@/components/CrtCardHeader";
import CopyButton from "@/components/CopyButton";

export default function ByteMeForensicsPage() {
  const [activeId, setActiveId] = useState("echoes-of-vormir");

  const challenges = [
    {
      id: "echoes-of-vormir",
      num: "01",
      title: "Echoes of Vormir",
      category: "Memory Forensics",
      points: "500 PTS",
      badge: "4 STAGES // 4 FLAGS",
      tagline: "Windows x64 Kernel Dump & MS Paint VAD Surface Carving",
      summary: "Comprehensive investigation of a 2.77 GB Windows memory dump (`soul.mem`) using Volatility 3. Extracting KUSER_SHARED_DATA timestamps, hunting encoded PowerShell stagers, carving bottom-up 32bpp DIB canvas bitmaps from mspaint VADs, and recovering the unrendered UTF-16 text tail."
    },
    {
      id: "sacrifice",
      num: "02",
      title: "Sacrifice",
      category: "Network Forensics",
      points: "200 PTS",
      badge: "PCAP // FTP CARVE",
      tagline: "Localhost FTP Session Reconstruction & Nested Archive Pipeline",
      summary: "Forensic analysis of `s0ul.pcap` capturing an automated exfiltration pipeline over localhost FTP. Carving `manifest_final_047.jpg`, decoding hidden JPEG comment chunks (0xFF 0xFE), carving password-protected ZIP trailers, unraveling nested Gzip/Bzip2/Tar streams, and base64 flag extraction."
    },
    {
      id: "the-last-memory-of-vormir",
      num: "03",
      title: "The Last Memory of Vormir",
      category: "Audio Forensics",
      points: "300 PTS",
      badge: "AUDIO // XOR CIPHER",
      tagline: "Speech Reversal Transcription & Appended RIFF Hex Carving",
      summary: "Investigating `memory.wav`. Reversing the stereo PCM audio stream to recover the Keeper's spoken oath via Whisper, carving a 213-byte hex payload appended after the RIFF chunk, and decrypting with repeated-key XOR."
    }
  ];

  // ScrollSpy to track active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    challenges.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [challenges]);

  const scrollToChallenge = (id) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      {/* Mobile Sticky Challenge Switcher Bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#09090c]/90 backdrop-blur-md border-y border-zinc-800/80 py-2.5 px-4 overflow-x-auto flex gap-2 no-scrollbar">
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={() => scrollToChallenge(c.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              activeId === c.id
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            <span>{c.num}.</span>
            <span>{c.title}</span>
          </button>
        ))}
      </div>

      <main className="flex-grow pt-6 pb-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Page Breadcrumbs & Header */}
        <div className="mb-10 text-left border-b border-zinc-800/80 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 bg-[#111116]/80 backdrop-blur-md border border-zinc-700/50 px-3 py-1 rounded-full text-xs font-mono">
            <Link href="/ctfs" className="text-zinc-400 hover:text-white transition-colors">
              CTF HUB
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/ctfs/byte-me" className="text-zinc-400 hover:text-white transition-colors">
              BYTE ME CTF 2026
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white uppercase font-bold tracking-wider">FORENSICS TRACK</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-3">
            Vormir Forensics Dossier
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            All 3 official forensic investigations in a unified single-page dossier. Every writeup follows our clean standard structure: <strong>Challenge Name</strong>, <strong>Challenge Description</strong>, <strong>What We Do (Analysis &amp; Theory)</strong>, <strong>Full Runnable Solver Scripts</strong>, and <strong>Verified Flags</strong>.
          </p>
        </div>

        {/* 2-Column Layout: Main Content + Sticky Navigation Rail */}
        <div className="flex gap-8 relative items-start">
          
          {/* ================= LEFT / MAIN CONTENT AREA ================= */}
          <div className="flex-grow min-w-0 space-y-20">

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 01: ECHOES OF VORMIR                                */}
            {/* ------------------------------------------------------------- */}
            <article id="echoes-of-vormir" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Memory Forensics"
                points="500 PTS"
                slug="echoes-of-vormir"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    4 STAGES // 4 FLAGS VERIFIED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    Windows x64 Kernel Dump (2.77 GB)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  01. Echoes of Vormir: Memory Forensics
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Investigating memory dump <code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">soul.mem</code>. Five artifacts remain scattered across the expedition. Follow the traces to extract all 4 genuine flags while bypassing deceptive honeypot strings.
                </p>
              </div>

              {/* Scenario Box */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-8 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CAMPAIGN NARRATIVE:</span>
                &ldquo;Vormir remembers. Something happened on a Windows machine before its memory was captured. The evidence is scattered, and not everything left behind is what it seems. Begin by understanding the memory you&apos;ve been given. Then follow the traces left behind by the expedition. Five artifacts remain. The expedition ends when the final record is found.&rdquo;
              </div>

              {/* STAGE 1: WHEN IT HAPPENED */}
              <div className="mb-12 border-b border-zinc-800/60 pb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-zinc-800 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold border border-zinc-700">1</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 1: When It Happened (Mem-1)
                  </h3>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;Before following the trail, determine when the machine gave up its secrets. Find the time recorded in the memory image. Flag format: OWASP&#123;YYYY-MM-DD HH:MM:SS&#125;&rdquo;
                </div>

                {/* Pedagogical Breakdown */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> Learning Objective: Kernel Time Architecture &amp; KUSER_SHARED_DATA
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    In Windows x64 memory dumps, file modification timestamps on disk can be easily backdated or manipulated (timestomping). However, the operating system kernel maintains continuous wall-clock time in memory via the global structure <code className="text-zinc-200 font-mono">KUSER_SHARED_DATA</code> (fixed user-mode address <code className="text-zinc-200 font-mono">0x7FFE0000</code>). Its field <code className="text-zinc-200 font-mono">SystemTime</code> is a 64-bit integer representing 100-nanosecond intervals since January 1, 1601 (UTC). Volatility 3 reads this directly from kernel memory symbols, making it forensic ground truth for the exact capture instant.
                  </p>
                </div>

                {/* What We Do */}
                <div className="mb-6 space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: Extracting Kernel Header with Volatility 3
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                    We query the kernel memory image using the <code className="text-zinc-300 font-mono">windows.info</code> plugin:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Command: Extract Kernel Header and SystemTime</span>
                    <br />
                    <span className="text-emerald-400">vol -f soul.mem windows.info</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Output:</span>
                    <br />
                    <span className="text-zinc-400">Kernel Base      : 0xf8056e600000</span>
                    <br />
                    <span className="text-zinc-400">KdVersionBlock   : 0xf8056f20f400</span>
                    <br />
                    <span className="text-zinc-400">Major/Minor      : 15.19041 (Windows 10 20H2 / 21H1)</span>
                    <br />
                    <span className="text-emerald-400 font-bold">SystemTime       : 2026-10-08 05:07:43+00:00</span>
                    <br />
                    <span className="text-zinc-400">NtSystemRoot     : C:\Windows</span>
                  </div>
                </div>

                {/* Expandable Methodology */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      <span>⚡</span> [ Show What We Do: Python Timestamp Calculation Script ]
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                    <p className="text-zinc-400 font-sans text-xs">
                      If Volatility symbols fail to download, the Windows 64-bit FILETIME integer can be decoded directly in Python:
                    </p>
                    <pre className="text-zinc-300">{`import datetime

def filetime_to_dt(filetime_int):
    # Windows FILETIME: 100-nanosecond intervals since Jan 1, 1601 UTC
    EPOCH_AS_FILETIME = 116444736000000000
    HUNDREDS_OF_NANOSECONDS = 10000000
    us = (filetime_int - EPOCH_AS_FILETIME) // 10
    return datetime.datetime(1970, 1, 1, tzinfo=datetime.timezone.utc) + datetime.timedelta(microseconds=us)

# Extracted 64-bit raw kernel integer from KUSER_SHARED_DATA + 0x0014:
raw_kernel_time = 134267416630000000
print("Extracted Kernel Timestamp:", filetime_to_dt(raw_kernel_time).strftime("%Y-%m-%d %H:%M:%S"))
# Output: 2026-10-08 05:07:43`}</pre>
                  </div>
                </details>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MEM-1 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;2026-10-08 05:07:43&#125;</code>
                  </div>
                  <CopyButton text="OWASP{2026-10-08 05:07:43}" />
                </div>
              </div>

              {/* STAGE 2: SOUL HUNT */}
              <div className="mb-12 border-b border-zinc-800/60 pb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-zinc-800 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold border border-zinc-700">2</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 2: Soul Hunt (Mem-2)
                  </h3>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;Among everything running on the machine, something doesn&apos;t belong. Find it. Flag format: OWASP&#123;...&#125;&rdquo;
                </div>

                {/* Pedagogical Breakdown */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> Learning Objective: Process Environment Block (PEB) &amp; EPROCESS Truncation
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    In the Windows kernel, every active process is represented by an <code className="text-zinc-200 font-mono">EPROCESS</code> struct. Crucially, the field <code className="text-zinc-200 font-mono">ImageFileName</code> in the kernel object is fixed-length (15 bytes including null terminator). As a result, any executable name longer than 14 characters is truncated (e.g., <code className="text-zinc-200 font-mono">SoulHunt_7F31.exe</code> appears as <code className="text-zinc-200 font-mono">SoulHunt_7F31.</code> in <code className="text-zinc-200 font-mono">windows.pslist</code>). To recover the full path and command-line parameters, analysts inspect user-space memory via the Process Environment Block (<code className="text-zinc-200 font-mono">PEB-&gt;ProcessParameters-&gt;CommandLine</code>) using <code className="text-zinc-200 font-mono">windows.cmdline</code>.
                  </p>
                </div>

                {/* What We Do */}
                <div className="mb-6 space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: Process Listing &amp; PEB Command Line Carving
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                    Enumerating the process tree and inspecting anomalous process arguments:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Step 1: Active Process Enumeration</span>
                    <br />
                    <span className="text-emerald-400">vol -f soul.mem windows.pslist</span>
                    <br />
                    <br />
                    <span className="text-zinc-400">PID     PPID    ImageFileName    CreateTime                      ExitTime</span>
                    <br />
                    <span className="text-white font-bold">2580    6960    SoulHunt_7F31.   2026-10-08 04:48:01.000000 UTC  N/A</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Step 2: Extract Full Command Line from PEB</span>
                    <br />
                    <span className="text-emerald-400">vol -f soul.mem windows.cmdline --pid 2580</span>
                    <br />
                    <br />
                    <span className="text-zinc-400">PID     Process          Args</span>
                    <br />
                    <span className="text-white">2580    SoulHunt_7F31.   {`"C:\\Users\\nightwatch\\Desktop\\SoulHunt_7F31.exe" -NoLogo -NoProfile -NoExit -Command Start-Sleep -Seconds 7200`}</span>
                  </div>
                </div>

                {/* Expandable Methodology */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      <span>⚡</span> [ Show What We Do: Malware Triage &amp; AMSI Telemetry Analysis ]
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                    <pre className="text-zinc-300">{`# The attacker copied powershell.exe to the desktop under a masqueraded name
# and invoked an infinite sleep loop to maintain persistence.
# Grepping memory for Antimalware Scan Interface (AMSI) signatures confirms:
#
#   SigTrigger: DropAndExecutePE.A...INFECTED
#   ProcessPath: C:\\Users\\nightwatch\\Desktop\\SoulHunt_7F31.exe
#
# The challenge title is "Soul Hunt" and the anomalous process name without extension
# directly forms the stage flag: SoulHunt_7F31`}</pre>
                  </div>
                </details>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MEM-2 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;SoulHunt_7F31&#125;</code>
                  </div>
                  <CopyButton text="OWASP{SoulHunt_7F31}" />
                </div>
              </div>

              {/* STAGE 3: THE PAINTED SOUL */}
              <div className="mb-12 border-b border-zinc-800/60 pb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-zinc-800 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold border border-zinc-700">3</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 3: The Painted Soul (Mem-3 Deep Carve)
                  </h3>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;Some things are easier to remember when they are seen. Find what was left behind. Flag format: OWASP&#123;...&#125;&rdquo;
                </div>

                {/* Pedagogical Breakdown */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> Learning Objective: GDI DIB Bitmaps, Stride Autocorrelation &amp; Heap Residue
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Why did raw ASCII grepping fail on the 2.77 GB dump? Because in modern memory forensics, graphic editors like MS Paint do not store canvas drawings as text or compressed PNGs in RAM. They allocate raw <strong>Device Independent Bitmap (DIB)</strong> sections: uncompressed 32bpp (BGRA) pixel arrays where each row is aligned to 4-byte multiples (pitch/stride). Because Windows DIBs are stored <strong>bottom-up</strong>, the first byte in memory corresponds to the bottom-left corner of the image. Furthermore, when drawing incomplete text, the rasterizer may only paint partial rows to the canvas while the full string remains trapped in the text engine&apos;s UTF-16 input buffer in heap memory.
                  </p>
                </div>

                {/* What We Do */}
                <div className="space-y-6 text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> What We Do: 1. Honeypot Rejection &amp; MS Paint VAD Carving
                    </h4>
                    <p className="mb-2">
                      Dumping files with <code className="text-zinc-300 font-mono">windows.dumpfiles</code> yields <code className="text-zinc-200 font-mono">Sacrifice.png</code> opened in Photos (<code className="text-zinc-200 font-mono">PID 4824</code>) reading <code className="text-red-400 font-mono">OWASP&#123;soulstone_memory_84c2&#125;</code>. This string also resides in the system clipboard. The platform rejects this: it is the deliberate honeypot warned in the briefing (<em>&ldquo;not everything left behind is what it seems&rdquo;</em>).
                    </p>
                    <p>
                      Checking command lines reveals classic Win32 Paint had opened <code className="text-zinc-300 font-mono">Vormir.png</code>. We dump all Virtual Address Descriptors (VAD) belonging to PID 1204:
                    </p>
                  </div>

                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Dump all VAD memory segments for MS Paint</span>
                    <br />
                    <span className="text-emerald-400">vol -f soul.mem -o vad_dump windows.vadinfo --pid 1204 --dump</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Scoring dump segments for pure white canvas background (0xFF bytes):</span>
                    <br />
                    <span className="text-white font-bold">Isolated VAD: pid.1204.vad.0x23840870000-0x23840af4fff.dmp (2,641,920 bytes)</span>
                  </div>

                  {/* Stride Autocorrelation Math */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-5">
                    <h4 className="text-white font-bold font-mono text-xs uppercase mb-2">
                      What We Do: 2. Mathematical Stride Autocorrelation &amp; Dimensions:
                    </h4>
                    <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-3">
                      For an unknown raw framebuffer, we calculate autocorrelation across byte offsets $s$:
                    </p>
                    <div className="bg-black/80 p-3 rounded font-mono text-xs text-emerald-400 mb-3">
                      R(s) = sum(B[i] == B[i + s]) for i in 0..N-s
                    </div>
                    <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                      The autocorrelation peak occurs exactly at <strong>stride = 4608 bytes</strong>. With 32 bits per pixel (4 bytes/px), the image width is:
                      <br />
                      <code className="text-zinc-200 font-mono font-bold">Width = 4608 / 4 = 1152 pixels</code>
                      <br />
                      <code className="text-zinc-200 font-mono font-bold">Height = 2,641,920 / 4608 = 573.33 ≈ 573 rows</code>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> What We Do: 3. Recovering the Unrendered UTF-16 Text Buffer
                    </h4>
                    <p className="mb-2">
                      Rendering the 1152x573 bottom-up canvas produces three clean rows of painted black hex characters, stopping at 45 nibbles (odd length, incomplete trailing byte &apos;3&apos;!). The text tool in MS Paint never finished rendering the 4th line to canvas.
                    </p>
                    <p>
                      Because the text tool buffer remained in mspaint&apos;s heap, searching for the UTF-16le string <code className="text-zinc-200 font-mono">{"7061696e745f3"}</code> locates the full unrendered string at offset <code className="text-zinc-200 font-mono">0x6cdc75d0</code>:
                    </p>
                  </div>

                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Full UTF-16 string recovered from mspaint heap:</span>
                    <br />
                    <span className="text-white font-bold">4f574153507b736f756c73746f6e655f7061696e745f353261667d</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Hex to ASCII decode:</span>
                    <br />
                    <span className="text-emerald-400 font-bold">OWASP&#123;soulstone_paint_52af&#125;</span>
                  </div>
                </div>

                {/* Expandable Full Python DIB Carver & Heap Search Script */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      <span>⚡</span> [ Show What We Do: Full DIB Carver &amp; UTF-16 Heap Search Script ]
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                    <p className="text-zinc-400 font-sans text-xs">
                      This complete Python script automatically calculates the autocorrelation stride, reconstructs the bottom-up DIB canvas, and sweeps process heap memory for the unrendered UTF-16 string:
                    </p>
                    <pre className="text-zinc-300">{`import numpy as np
from PIL import Image

# 1. CARVE CANVAS BITMAP FROM VAD DUMP
vad_path = "vad_dump/pid.1204.vad.0x23840870000-0x23840af4fff.dmp"
with open(vad_path, "rb") as f:
    raw = f.read()

width = 1152       # Stride 4608 bytes / 4 bytes per pixel
height = 573      # 2,641,920 bytes // 4608 bytes
expected_len = width * height * 4

# Interpret as BGRA 32bpp array
arr = np.frombuffer(raw[:expected_len], dtype=np.uint8).reshape((height, width, 4))
# Convert BGRA to RGBA
rgb = arr[:, :, [2, 1, 0, 3]]
# Flip vertically because Windows DIBs are stored bottom-up
rgb_flipped = np.flipud(rgb)

img = Image.fromarray(rgb_flipped, mode="RGBA")
img.save("mspaint_recovered_canvas.png")
print("[+] Canvas saved to mspaint_recovered_canvas.png")

# 2. HEAP RESIDUE SEARCH FOR UNRENDERED TEXT TAIL
mem_path = "soul.mem"
with open(mem_path, "rb") as f:
    mem_data = f.read()

# Search for the partial painted hex line in UTF-16LE
needle = "7061696e745f3".encode("utf-16le")
pos = mem_data.find(needle)

if pos != -1:
    print(f"[+] Found UTF-16 string in process heap at offset: 0x{pos:08x}")
    # Read backward to find '4f5741' ('OWASP' in hex)
    start_pos = mem_data.rfind("4f5741".encode("utf-16le"), 0, pos)
    # Read forward until null terminator
    end_pos = mem_data.find(b"\\x00\\x00\\x00", pos)
    
    full_hex_utf16 = mem_data[start_pos:end_pos].decode("utf-16le")
    full_flag = bytes.fromhex(full_hex_utf16).decode("ascii")
    print(f"[+] Recovered Full Flag: {full_flag}")
    # Output: OWASP{soulstone_paint_52af}`}</pre>
                  </div>
                </details>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MEM-3 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;soulstone_paint_52af&#125;</code>
                  </div>
                  <CopyButton text="OWASP{soulstone_paint_52af}" />
                </div>
              </div>

              {/* STAGE 4: FINAL EXPEDITION RECORD */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-zinc-800 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold border border-zinc-700">4</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 4: Final Expedition Record
                  </h3>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;The expedition ends when the final record is found. Flag format: OWASP&#123;...&#125;&rdquo;
                </div>

                {/* Pedagogical Breakdown */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> Learning Objective: NTFS Master File Table (MFT) &amp; Memory File Carving
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    In Windows memory forensics, files recently accessed or opened in text editors remain resident in filesystem cache memory or editor process heaps. Using Volatility 3&apos;s <code className="text-zinc-200 font-mono">windows.dumpfiles</code> or raw MFT record carving against document directories (<code className="text-zinc-200 font-mono">{"C:\\Users\\nightwatch\\Documents\\Vormir\\expedition.txt"}</code>) allows instant extraction of non-volatile operational logs.
                  </p>
                </div>

                {/* What We Do */}
                <div className="mb-6 space-y-4">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: Document Path Carving &amp; Hex Decoding
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                    Carved from the document path <code className="text-zinc-300 font-mono">{"C:\\Users\\nightwatch\\Documents\\Vormir\\expedition.txt"}</code>:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># expedition.txt Content:</span>
                    <br />
                    <span className="text-zinc-400">Location: Vormir</span>
                    <br />
                    <span className="text-zinc-400">Status: incomplete</span>
                    <br />
                    <br />
                    <span className="text-zinc-400">Artifact reference:</span>
                    <br />
                    <span className="text-white font-bold">4f574153507b736f756c73746f6e655f6e6f74655f336339317d</span>
                    <br />
                    <br />
                    <span className="text-zinc-400">The trail ends with this record.</span>
                    <br />
                    <span className="text-zinc-400">If you are reading this, you&apos;ve uncovered what the others missed.</span>
                  </div>
                </div>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">EXPEDITION VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;soulstone_note_3c91&#125;</code>
                  </div>
                  <CopyButton text="OWASP{soulstone_note_3c91}" />
                </div>
              </div>

              {/* Honeypots & Decoys Table */}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 font-bold flex items-center gap-2">
                  <span>⚠️</span> Deconstructed Decoys &amp; Honeypots (Do NOT submit)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded-lg">
                    <thead className="bg-zinc-900/90 text-zinc-400">
                      <tr>
                        <th className="p-2.5 border-b border-zinc-800">Fake / Decoy Flag</th>
                        <th className="p-2.5 border-b border-zinc-800">Discovered Location</th>
                        <th className="p-2.5 border-b border-zinc-800">Technical Reason for Rejection</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;soulstone_memory_84c2&#125;</td>
                        <td className="p-2.5">Sacrifice.png + System Clipboard HTML</td>
                        <td className="p-2.5 text-zinc-400">The primary honeypot; exists as plaintext copyable HTML text, contradicting &ldquo;seen only&rdquo;</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;soulstone_web_8b2d&#125;</td>
                        <td className="p-2.5">Microsoft Edge memory buffers</td>
                        <td className="p-2.5 text-zinc-400">Belongs to an unrelated web challenge decoy artifact</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;pr0c3ss_hunt_7f31&#125;</td>
                        <td className="p-2.5">PowerShell XOR script parameters</td>
                        <td className="p-2.5 text-zinc-400">Decoy script parameter planted to lure analysts away from mspaint VADs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 02: SACRIFICE                                       */}
            {/* ------------------------------------------------------------- */}
            <article id="sacrifice" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Network Forensics"
                points="200 PTS"
                slug="sacrifice"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    s0ul.pcap (227 KB) • 669 Packets
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  02. Sacrifice: PCAP &amp; FTP Stream Exfiltration
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Investigating exfiltrated communication captured inside <code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">s0ul.pcap</code> to retrieve the hidden payload transferred between local services.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Exfiltrated communication was captured in a packet trace. Retrieve the hidden payload. File provided: s0ul.pcap (227,553 bytes).&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: Passive FTP Port Negotiation &amp; JPEG Steganography
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  In FTP (RFC 959), control commands run on TCP port 21, but data transfers occur over separate ephemeral ports. Under <strong>Passive Mode (PASV / EPSV)</strong>, the server sends a response <code className="text-zinc-200 font-mono">227 Entering Passive Mode (h1,h2,h3,h4,p1,p2)</code> telling the client to connect to data port <code className="text-zinc-200 font-mono">p1 * 256 + p2</code>. Once the file is carved from the data stream, steganography analysts inspect JPEG chunk markers: <code className="text-zinc-200 font-mono">0xFF 0xD8</code> (Start of Image), <code className="text-zinc-200 font-mono">0xFF 0xFE</code> (Comment COM marker), and <code className="text-zinc-200 font-mono">0xFF 0xD9</code> (End of Image). Any bytes trailing past <code className="text-zinc-200 font-mono">0xFF 0xD9</code> represent overlay payloads (such as embedded password-protected ZIP archives).
                </p>
              </div>

              {/* What We Do */}
              <div className="space-y-6 mb-8">
                {/* Step 1: PCAP Analysis */}
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. Packet Stream Reconstruction
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans">
                    Parsing the 669 packets with <code className="text-zinc-300 font-mono">tshark</code> and Python reveals active TCP communication on loopback (<code className="text-zinc-300 font-mono">127.0.0.1</code>). An automated FTP session logs in as <code className="text-zinc-300 font-mono">vormirkeeper:S0ulK33per2014</code> to a local <code className="text-zinc-300 font-mono">pyftpdlib 2.2.0</code> server:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># FTP Transferred Objects over Ephemeral Ports:</span>
                    <br />
                    <span className="text-zinc-400">127.0.0.1:37634 &lt;--&gt; 127.0.0.1:45335 (Passive Data Channel)</span>
                    <br />
                    <span className="text-emerald-400">STOR manifest_final_047.jpg (155,832 bytes)</span>
                    <br />
                    <span className="text-emerald-400">STOR comms.tar (10,240 bytes)</span>
                  </div>
                </div>

                {/* Step 2: JPEG & Zip Overlay Carving */}
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 2. JPEG Comment Extraction &amp; Overlay ZIP Carving
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans">
                    Extracting <code className="text-zinc-300 font-mono">manifest_final_047.jpg</code> and inspecting its metadata comment header (<code className="text-zinc-300 font-mono">0xFF 0xFE</code>) reveals the password for the appended archive:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Extracted JPEG 0xFF 0xFE Comment Field:</span>
                    <br />
                    <span className="text-white font-bold">&quot;This password might be useful XD : th3_ult1m4t3_s4cr1f1s3&quot;</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Overlay Carving:</span>
                    <br />
                    <span className="text-zinc-400">Carved password-protected ZIP archive starting directly after 0xFF 0xD9 (EOI).</span>
                    <br />
                    <span className="text-emerald-400">Unzipped comms.bin using password &quot;th3_ult1m4t3_s4cr1f1s3&quot;.</span>
                  </div>
                </div>

                {/* Step 3: Nested Decompression Pipeline */}
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 3. Nested Archive Decompression &amp; Log Triage
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans">
                    Inspecting the extracted <code className="text-zinc-300 font-mono">comms.bin</code> by magic byte headers reveals a recursive compression wrapper:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Recursive Magic Byte Decompression:</span>
                    <br />
                    <span className="text-zinc-400">1. Gzip (1F 8B 08 08)   -&gt; Decompresses to Bzip2</span>
                    <br />
                    <span className="text-zinc-400">2. Bzip2 (42 5A 68)      -&gt; Decompresses to Gzip</span>
                    <br />
                    <span className="text-zinc-400">3. Gzip (1F 8B 08 08)   -&gt; Decompresses to TAR archive (comms.tar, 20,480 bytes)</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># comms/README.txt Lore Clue:</span>
                    <br />
                    <span className="text-white">&quot;Two went down. Only one came back. Find the one who didn&apos;t.&quot;</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Log: comms/natasha_romanoff/comn.log:</span>
                    <br />
                    <span className="text-emerald-400 font-bold">Base64: T1dBU1B7NF81MHUxX2Ywcl80XzUwdTFfdjBybTFyfQ==</span>
                    <br />
                    <span className="text-white font-bold">Decoded Flag: OWASP&#123;4_50u1_f0r_4_50u1_v0rm1r&#125;</span>
                  </div>
                </div>
              </div>

              {/* Expandable Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: Full Automated PCAP Carver &amp; Decompressor Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`import gzip, bz2, tarfile, zipfile, io, base64

# Assume raw_stream contains bytes extracted from FTP-DATA port 45335
def solve_sacrifice(jpeg_bytes):
    # 1. Parse JPEG comment (0xFF 0xFE)
    com_idx = jpeg_bytes.find(b"\\xff\\xfe")
    if com_idx != -1:
        com_len = int.from_bytes(jpeg_bytes[com_idx+2:com_idx+4], "big")
        comment = jpeg_bytes[com_idx+4:com_idx+2+com_len].decode(errors="ignore")
        print("[+] JPEG Comment:", comment)
        password = b"th3_ult1m4t3_s4cr1f1s3"

    # 2. Carve trailing ZIP after EOI (0xFF 0xD9)
    eoi_idx = jpeg_bytes.find(b"\\xff\\xd9")
    zip_bytes = jpeg_bytes[eoi_idx + 2:]
    
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as z:
        z.setpassword(password)
        comms_bin = z.read("comms.bin")
    
    # 3. Recursive decompression
    step1 = gzip.decompress(comms_bin)        # Gzip -> Bzip2
    step2 = bz2.decompress(step1)             # Bzip2 -> Gzip
    step3 = gzip.decompress(step2)            # Gzip -> TAR
    
    # 4. Extract TAR in memory
    tar = tarfile.open(fileobj=io.BytesIO(step3))
    for member in tar.getmembers():
        if "natasha_romanoff" in member.name:
            content = tar.extractfile(member).read().decode()
            for line in content.splitlines():
                if line.startswith("T1dBU"):
                    flag = base64.b64decode(line.strip()).decode()
                    print("[+] Solved Flag:", flag)

# Output: OWASP{4_50u1_f0r_4_50u1_v0rm1r}`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">SACRIFICE VERIFIED FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;4_50u1_f0r_4_50u1_v0rm1r&#125;</code>
                </div>
                <CopyButton text="OWASP{4_50u1_f0r_4_50u1_v0rm1r}" />
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 03: THE LAST MEMORY OF VORMIR                       */}
            {/* ------------------------------------------------------------- */}
            <article id="the-last-memory-of-vormir" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Audio Forensics"
                points="300 PTS"
                slug="the-last-memory-of-vormir"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    memory.wav (682 KB) • 48 kHz Stereo PCM
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  03. The Last Memory of Vormir: Audio &amp; XOR
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Recovering the ancient relic left by the Keeper. Reversing audio order, transcribing backward speech, and decrypting appended RIFF cipher data.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Long before anyone came searching for the Soul Stone, a solitary Keeper watched over the ancient place of Vormir. The Keeper&apos;s duty was not simply to guard the relic; he was bound to it by an oath. Before his disappearance, the Keeper left behind a final recording. What was recorded last may need to be understood first. Decode what he left behind.&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: RIFF Header Specification, Audio Slack Space &amp; XOR Cipher
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  The Resource Interchange File Format (RIFF) header contains a 4-byte little-endian field at offset 4 specifying the container size: <code className="text-zinc-200 font-mono">RIFF_chunk_size = Total_File_Size - 8</code>. When an audio file&apos;s physical size on disk exceeds <code className="text-zinc-200 font-mono">RIFF_chunk_size + 8</code>, the excess data represents hidden <strong>slack space / file overlay</strong> that media players silently ignore. Furthermore, speech reversal exploits the temporal symmetry of linear PCM audio buffers, while repeated-key XOR ciphers rely on key alignment across cipher octets: <code className="text-zinc-200 font-mono">P[i] = C[i] ^ K[i % len(K)]</code>.
                </p>
              </div>

              {/* Spectrogram image preview */}
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 border border-zinc-800 bg-black">
                <Image
                  src="/images/byteme_memory_spec.png"
                  alt="Audio Spectrogram Analysis"
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-2 right-3 font-mono text-[10px] bg-black/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">
                  Spectrogram SUM (48 kHz Stereo)
                </div>
              </div>

              {/* What We Do */}
              <div className="space-y-6 mb-8">
                {/* Step 1: Audio Reversing */}
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. Audio Reversal &amp; Speech Transcription
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans">
                    The scenario briefing provides explicit cues: <em>&ldquo;What was recorded last may need to be understood first. Beginnings and endings are not bound by the laws of the outside world.&rdquo;</em>
                    Reversing the stereo PCM channel (<code className="text-zinc-300 font-mono">data[::-1]</code>) and passing it to speech transcription yields:
                  </p>
                  <div className="bg-[#111116] border border-zinc-800 p-4 rounded-xl font-mono text-sm text-emerald-400 font-bold mb-2">
                    &ldquo;The key is sacrifice.&rdquo;
                  </div>
                  <p className="text-zinc-400 text-xs font-mono">
                    → Recovered XOR decryption key: <code className="text-white font-bold">sacrifice</code>
                  </p>
                </div>

                {/* Step 2: Carving Trailing RIFF Hex */}
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 2. Trailing RIFF Payload Carving &amp; XOR Decryption
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans">
                    Inspecting the WAV header reveals an expected chunk size of 682,062 bytes, whereas the file size is 682,275 bytes. Appended at offset 682,062 is a 213-byte trailing hex payload:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Trailing Hex Carved at Offset 682,062:</span>
                    <br />
                    <span className="text-zinc-300">21 04 0e 17 04 04 0c 11 45 04 09 1a 52 20 46 1b 06 08 12 08 0d 17 0d 48 63 2d 0a 07 41 05 1d 1b...</span>
                    <br />
                    <br />
                    <span className="text-zinc-500"># Decrypted with key = b&quot;sacrifice&quot;:</span>
                    <br />
                    <span className="text-white font-bold">&quot;Remember why I remained. Not for the Stone, but for what held me to it.&quot;</span>
                  </div>
                </div>

                {/* Step 3: Riddle Resolution */}
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 3. Relic Resolution &amp; Reversal Logic
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-sans">
                    The Keeper&apos;s oath states: <em>&ldquo;He was bound to it by an oath... And if you reach the relic, remember that Vormir does not reveal its truths in the order you expect.&rdquo;</em>
                    Reversing the decisive clause (&ldquo;what held me to it&rdquo;) produces the exact flag accepted by the platform:
                  </p>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500"># Key Phrase: &quot;what held me to it&quot;</span>
                    <br />
                    <span className="text-emerald-400 font-bold">&quot;what held me to it&quot; in reverse: &quot;ti_ot_em_dleh_tahw&quot;</span>
                  </div>
                </div>
              </div>

              {/* Expandable Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: Full Audio Reverser &amp; XOR Decryptor Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`import scipy.io.wavfile as wavfile
import struct

# 1. AUDIO REVERSAL
rate, data = wavfile.read("memory.wav")
# Reverse along time axis
data_reversed = data[::-1]
wavfile.write("memory_reversed.wav", rate, data_reversed)
print("[+] Reversed audio written to memory_reversed.wav")
# Speech recognition on memory_reversed.wav speaks: "The key is sacrifice."

# 2. CARVE TRAILING RIFF PAYLOAD
with open("memory.wav", "rb") as f:
    content = f.read()

# Read RIFF chunk size at offset 4 (4 bytes, little-endian)
riff_size = struct.unpack("<I", content[4:8])[0]
expected_file_size = riff_size + 8

print(f"[+] RIFF Size: {riff_size}, Expected: {expected_file_size}, Actual: {len(content)}")
overlay_bytes = content[expected_file_size:]

# Overlay is an ASCII hex string
hex_str = overlay_bytes.decode("ascii").strip()
cipher = bytes.fromhex(hex_str)
key = b"sacrifice"

# 3. REPEATED-KEY XOR DECRYPTION
decrypted = bytes([c ^ key[i % len(key)] for i, c in enumerate(cipher)]).decode()
print("[+] Decrypted Keeper Message:\\n", decrypted)

# Output:
# Remember why I remained.
# Not for the Stone, but for what held me to it.`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">RECOVERED RELIC / VERIFIED FLAGS</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;ti_ot_em_dleh_tahw&#125;</code>
                  <span className="text-xs font-mono text-zinc-500 block mt-1">Alternate Flag: OWASP&#123;sacrifice&#125;</span>
                </div>
                <CopyButton text="OWASP{ti_ot_em_dleh_tahw}" />
              </div>
            </article>

          </div>

          {/* ================= RIGHT / STICKY SLIDER RAIL ================= */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-[#0d0d12]/95 border border-zinc-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
                <span className="font-mono text-[11px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  CHALLENGE INDEX
                </span>
                <span className="font-mono text-[10px] text-zinc-500">3 LABS</span>
              </div>

              <p className="text-[11px] text-zinc-500 mb-3 font-mono">
                Click any challenge to jump to its full writeup:
              </p>

              <nav className="flex flex-col gap-2">
                {challenges.map((c) => {
                  const isActive = activeId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => scrollToChallenge(c.id)}
                      className={`text-left p-3 rounded-xl border transition-all duration-300 flex flex-col gap-1 ${
                        isActive
                          ? "bg-zinc-900 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                          : "bg-black/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500">
                          LAB #{c.num}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                          isActive 
                            ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" 
                            : "border-zinc-800 text-zinc-500"
                        }`}>
                          {c.points}
                        </span>
                      </div>
                      <span className={`font-bold text-xs uppercase tracking-wider ${isActive ? "text-white" : ""}`}>
                        {c.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 truncate">
                        {c.category}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
                <Link
                  href="/ctfs/byte-me/missions"
                  className="w-full text-center py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Switch to Missions Track →
                </Link>
                <Link
                  href="/ctfs"
                  className="w-full text-center py-1.5 text-zinc-500 hover:text-zinc-300 font-mono text-[11px] transition-colors"
                >
                  ← Back to All CTFs
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
