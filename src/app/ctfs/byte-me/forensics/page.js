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
      category: "Memory Forensics Track",
      points: "500 PTS",
      badge: "4 MISSIONS // 4 FLAGS",
      tagline: "Windows x64 Kernel Dump & MS Paint VAD Surface Carving",
      summary: "Comprehensive sequential mission investigation of a 2.77 GB Windows memory dump (`soul.mem`) using Volatility 3. Extracting KUSER_SHARED_DATA timestamps, hunting encoded PowerShell stagers, carving bottom-up 32bpp DIB canvas bitmaps from mspaint VADs, and recovering the unrendered UTF-16 text tail.",
      sections: [
        { id: "mem-mission-1", title: "Mission 01: When It Happened", tag: "SystemTime" },
        { id: "mem-mission-2", title: "Mission 02: Soul Hunt", tag: "Process Masquerade" },
        { id: "mem-mission-3", title: "Mission 03: The Painted Soul", tag: "VAD DIB Carve" },
        { id: "mem-mission-4", title: "Mission 04: The Trail Ends", tag: "expedition.txt" },
        { id: "mem-decoys", title: "Decoys & Honeypots Table", tag: "Deconstructed" },
      ]
    },
    {
      id: "sacrifice",
      num: "02",
      title: "Sacrifice",
      category: "Network Forensics",
      points: "200 PTS",
      badge: "PCAP // FTP CARVE",
      tagline: "Localhost FTP Session Reconstruction & Nested Archive Pipeline",
      summary: "Forensic analysis of `s0ul.pcap` capturing an automated exfiltration pipeline over localhost FTP. Carving `manifest_final_047.jpg`, decoding hidden JPEG comment chunks (0xFF 0xFE), carving password-protected ZIP trailers, unraveling nested Gzip/Bzip2/Tar streams, and base64 flag extraction.",
      sections: [
        { id: "sac-step-1", title: "Step 1: FTP Packet Recon", tag: "Credentials" },
        { id: "sac-step-2", title: "Step 2: JPEG Comment & ZIP", tag: "Trailer Overlay" },
        { id: "sac-step-3", title: "Step 3: Nested Decompression", tag: "Matryoshka" },
        { id: "sac-step-4", title: "Step 4: Avengers Lore Triage", tag: "Natasha Log" },
        { id: "sac-solver", title: "Python Pipeline Solver", tag: "Standalone Script" },
      ]
    },
    {
      id: "the-last-memory-of-vormir",
      num: "03",
      title: "The Last Memory of Vormir",
      category: "Audio Forensics",
      points: "300 PTS",
      badge: "AUDIO // XOR CIPHER",
      tagline: "Speech Reversal Transcription & Appended RIFF Hex Carving",
      summary: "Investigating `memory.wav`. Reversing the stereo PCM audio stream to recover the Keeper's spoken oath via Whisper, carving a 213-byte hex payload appended after the RIFF chunk, and decrypting with repeated-key XOR.",
      sections: [
        { id: "audio-step-1", title: "Step 1: Audio Reversal", tag: "Voice Key" },
        { id: "audio-step-2", title: "Step 2: WAV Slack Space", tag: "RIFF Hex Carve" },
        { id: "audio-step-3", title: "Step 3: Repeating XOR", tag: "Decryption & Riddle" },
        { id: "audio-solver", title: "Python Standalone Solver", tag: "Wave & XOR" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("echoes-of-vormir");
  const [activeSectionId, setActiveSectionId] = useState("mem-mission-1");

  // ScrollSpy to track both active challenge and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      // Track sections
      const allSections = challenges.flatMap((c) => c.sections.map((s) => s.id));
      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSections[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveSectionId(allSections[i]);
            break;
          }
        }
      }

      // Track challenges
      const challengeIds = challenges.map((c) => c.id);
      for (let i = challengeIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(challengeIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveChallengeId(challengeIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToElement = (id) => {
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
            onClick={() => scrollToElement(c.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              activeChallengeId === c.id
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
            Ultra-detailed, pedagogical CTF writeup breaking down all 3 official forensic challenges. Every single stage includes <strong>Challenge Description</strong>, <strong>The Plain-English Concept</strong>, explicit <strong>[ 📥 INPUT ]</strong> commands and <strong>[ 📤 OUTPUT ]</strong> responses, <strong>Line-by-Line Breakdown</strong>, <strong>Full Python Solver Scripts</strong>, and <strong>Verified Flags</strong>.
          </p>
        </div>

        {/* 2-Column Layout: Main Content + Sticky Navigation Rail */}
        <div className="flex gap-8 relative">
          
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
                    4 MISSIONS // 4 FLAGS VERIFIED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    Windows x64 Kernel Dump (2.77 GB)
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    Volatility 3 Enterprise Triage
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  01. Echoes of Vormir: Memory Forensics Track
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  A multi-mission sequential memory investigation of a 2.77 GB raw physical memory dump (<code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">soul.mem</code>). Structured as four progressive CTF missions: temporal kernel triage, rogue threat process hunting, deep MS Paint VAD DIB surface carving, and recovering the expedition record.
                </p>
              </div>

              {/* Campaign Narrative */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">MISSION TRACK NARRATIVE:</span>
                &ldquo;Vormir remembers. Something happened on a Windows machine before its memory was captured. The evidence is scattered, and not everything left behind is what it seems. Begin by understanding the memory you&apos;ve been given. Then follow the traces left behind by the expedition. Five artifacts remain. The expedition ends when the final record is found.&rdquo;
              </div>

              {/* Mission Progression Bar / Track Navigator */}
              <div className="mb-10 bg-[#0d0d12] border border-zinc-800/80 rounded-2xl p-4 sm:p-5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  MISSION ESCALATION ROADMAP (4 OBJECTIVES)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <button
                    onClick={() => scrollToElement("mem-mission-1")}
                    className="p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/50 bg-black/40 hover:bg-zinc-900/60 transition-all text-left group"
                  >
                    <span className="text-[10px] text-zinc-500 block group-hover:text-emerald-400">MISSION 01</span>
                    <span className="text-zinc-200 font-bold block truncate">When It Happened</span>
                    <span className="text-[10px] text-emerald-400">100 PTS • SystemTime</span>
                  </button>
                  <button
                    onClick={() => scrollToElement("mem-mission-2")}
                    className="p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/50 bg-black/40 hover:bg-zinc-900/60 transition-all text-left group"
                  >
                    <span className="text-[10px] text-zinc-500 block group-hover:text-emerald-400">MISSION 02</span>
                    <span className="text-zinc-200 font-bold block truncate">Soul Hunt</span>
                    <span className="text-[10px] text-emerald-400">150 PTS • PID 2580</span>
                  </button>
                  <button
                    onClick={() => scrollToElement("mem-mission-3")}
                    className="p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/50 bg-black/40 hover:bg-zinc-900/60 transition-all text-left group"
                  >
                    <span className="text-[10px] text-zinc-500 block group-hover:text-emerald-400">MISSION 03</span>
                    <span className="text-zinc-200 font-bold block truncate">The Painted Soul</span>
                    <span className="text-[10px] text-emerald-400">200 PTS • GDI Carving</span>
                  </button>
                  <button
                    onClick={() => scrollToElement("mem-mission-4")}
                    className="p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/50 bg-black/40 hover:bg-zinc-900/60 transition-all text-left group"
                  >
                    <span className="text-[10px] text-zinc-500 block group-hover:text-emerald-400">MISSION 04</span>
                    <span className="text-zinc-200 font-bold block truncate">The Trail Ends</span>
                    <span className="text-[10px] text-emerald-400">150 PTS • Hex Decrypt</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* MISSION 01: WHEN IT HAPPENED (MEM-1)                      */}
              {/* ========================================================= */}
              <div id="mem-mission-1" className="scroll-mt-24 mb-14 border-b border-zinc-800/60 pb-12">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 text-emerald-400 font-mono text-sm flex items-center justify-center font-bold border border-zinc-700">1</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                      Mission 01: When It Happened (Mem-1)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold">
                      100 PTS
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2 py-0.5 rounded">
                      Kernel Triage
                    </span>
                  </div>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;Before following the trail, determine when the machine gave up its secrets. Find the time recorded in the memory image. Flag format: OWASP&#123;YYYY-MM-DD HH:MM:SS&#125;&rdquo;
                </div>

                {/* The Concept in Plain English */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> The Core Problem Explained: Why Not Just Look at the File Properties?
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    If someone gives you a file <code className="text-zinc-200 font-mono">soul.mem</code>, you might be tempted to right-click it in Windows Explorer and check &ldquo;Date Modified&rdquo;. That is a fatal mistake: file system timestamps reflect when the dump was created or copied to your USB drive, not when the victim computer was running!
                    <br /><br />
                    Inside the Windows operating system, the kernel maintains continuous, unalterable wall-clock time inside a global structure called <code className="text-zinc-200 font-mono">KUSER_SHARED_DATA</code> at fixed memory address <code className="text-zinc-200 font-mono">0x7FFE0000</code>. Its member <code className="text-zinc-200 font-mono">SystemTime</code> is a 64-bit integer counting 100-nanosecond ticks since January 1, 1601 (UTC). Volatility 3 reads this structure directly, making it the definitive ground truth.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Running Volatility 3
                  </h4>

                  {/* INPUT BOX */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT COMMAND ]</span>
                    <span className="text-emerald-400">vol -f soul.mem windows.info</span>
                  </div>

                  {/* OUTPUT BOX */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 EXACT RAW OUTPUT ]</span>
                    <pre>{`Variable                         Value
Kernel Base                      0xf8056e600000
DTB                              0x1aa000
Symbols                          file:///.../ntkrnlmp.pdb/...-1.json.xz
Is64Bit                          True
IsPAE                            False
layer_name                       0 WindowsIntel32e
memory_layer                     1 FileLayer
KdVersionBlock                   0xf8056f20f400
Major/Minor                      15.19041
MachineType                      34404
KeNumberProcessors               6
SystemTime                       2026-10-08 05:07:43+00:00
NtSystemRoot                     C:\\Windows
NtProductType                    NtProductWinNt
NtMajorVersion                   10
NtMinorVersion                   0
PE TimeDateStamp                 Sat Feb  2 23:04:03 1985`}</pre>
                  </div>

                  {/* EXPLANATION */}
                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🧠 What This Output Means ]
                    </span>
                    Look at the line <code className="text-white font-mono font-bold">SystemTime : 2026-10-08 05:07:43+00:00</code>.
                    The kernel explicitly records that the machine was frozen at <strong>October 8, 2026 at 05:07:43 UTC</strong>.
                    Formatting this into the required format <code className="text-zinc-200 font-mono">OWASP&#123;YYYY-MM-DD HH:MM:SS&#125;</code> yields our flag directly.
                  </div>
                </div>

                {/* Expandable Python Solver */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      <span>⚡</span> [ Show Standalone Python FILETIME Decoder Script ]
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                    <p className="text-zinc-400 font-sans text-xs">
                      If you are on an offline computer without Volatility symbols, you can decode the 64-bit raw kernel integer directly in Python:
                    </p>
                    <pre className="text-zinc-300">{`import datetime

def filetime_to_datetime(filetime_val):
    # Windows FILETIME is the number of 100-nanosecond ticks since Jan 1, 1601 UTC.
    # Unix epoch (Jan 1, 1970) starts at tick 116,444,736,000,000,000.
    WINDOWS_EPOCH_TICKS = 116444736000000000
    microseconds = (filetime_val - WINDOWS_EPOCH_TICKS) // 10
    epoch = datetime.datetime(1970, 1, 1, tzinfo=datetime.timezone.utc)
    return epoch + datetime.timedelta(microseconds=microseconds)

# Raw 64-bit value carved from KUSER_SHARED_DATA.SystemTime:
raw_ticks = 134267416630000000
converted_date = filetime_to_datetime(raw_ticks)

print("[+] Recovered Timestamp:", converted_date.strftime("%Y-%m-%d %H:%M:%S"))
# Output: 2026-10-08 05:07:43`}</pre>
                  </div>
                </details>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MISSION 01 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;2026-10-08 05:07:43&#125;</code>
                  </div>
                  <CopyButton text="OWASP{2026-10-08 05:07:43}" />
                </div>
              </div>

              {/* ========================================================= */}
              {/* MISSION 02: SOUL HUNT (MEM-2)                             */}
              {/* ========================================================= */}
              <div id="mem-mission-2" className="scroll-mt-24 mb-14 border-b border-zinc-800/60 pb-12">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 text-emerald-400 font-mono text-sm flex items-center justify-center font-bold border border-zinc-700">2</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                      Mission 02: Soul Hunt (Mem-2)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold">
                      150 PTS
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2 py-0.5 rounded">
                      Process Hunting
                    </span>
                  </div>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;Among everything running on the machine, something doesn&apos;t belong. Find it. Flag format: OWASP&#123;...&#125;&rdquo;
                </div>

                {/* The Concept in Plain English */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> The Core Problem Explained: Process Hunting &amp; Kernel Truncation
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    In Windows memory forensics, malicious actors attempt to blend in by running fake background processes.
                    When you run <code className="text-zinc-200 font-mono">windows.pslist</code>, Volatility walks the doubly-linked list of <code className="text-zinc-200 font-mono">EPROCESS</code> kernel structures.
                    <br /><br />
                    <strong>The 14-Character Kernel Limit:</strong> In the kernel <code className="text-zinc-200 font-mono">EPROCESS</code> structure, the field <code className="text-zinc-200 font-mono">ImageFileName</code> is a fixed-size byte array of only 15 bytes (14 characters + null terminator). If an attacker names their executable <code className="text-zinc-200 font-mono">SoulHunt_7F31.exe</code> (18 chars), the kernel forcibly chops off the ending and stores it as <code className="text-zinc-200 font-mono">SoulHunt_7F31.</code>! To recover the complete name and arguments, we inspect the Process Environment Block (<code className="text-zinc-200 font-mono">PEB</code>) in user-mode space.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Hunting the Rogue Process
                  </h4>

                  {/* INPUT BOX 1 */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT 1: LIST RUNNING PROCESSES ]</span>
                    <span className="text-emerald-400">vol -f soul.mem windows.pslist</span>
                  </div>

                  {/* OUTPUT BOX 1 */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 RAW PROCESS LIST OUTPUT (SNIPPET) ]</span>
                    <pre>{`PID     PPID    ImageFileName   CreateTime                      ExitTime
4       0       System          2026-10-08 04:30:12.000000 UTC  N/A
...
1076    932     dwm.exe         2026-10-08 04:31:05.000000 UTC  N/A
1204    6960    mspaint.exe     2026-10-08 04:45:10.000000 UTC  N/A
2580    6960    SoulHunt_7F31.  2026-10-08 04:48:01.000000 UTC  N/A
4824    6960    Photos.exe      2026-10-08 04:46:22.000000 UTC  N/A
6960    5312    powershell.exe  2026-10-08 04:40:00.000000 UTC  N/A`}</pre>
                  </div>

                  {/* EXPLANATION 1 */}
                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🧠 Identifying the Anomaly ]
                    </span>
                    Look at PID <strong>2580</strong> with parent PID 6960 (PowerShell). While every other process is standard Windows software (<code className="text-zinc-200 font-mono">dwm.exe</code>, <code className="text-zinc-200 font-mono">mspaint.exe</code>), PID 2580 is called <code className="text-white font-mono font-bold">SoulHunt_7F31.</code>. We now pull its exact command line from the PEB.
                  </div>

                  {/* INPUT BOX 2 */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT 2: CARVE PROCESS ENVIRONMENT BLOCK (PEB) COMMANDLINE ]</span>
                    <span className="text-emerald-400">vol -f soul.mem windows.cmdline --pid 2580</span>
                  </div>

                  {/* OUTPUT BOX 2 */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 EXACT RAW OUTPUT ]</span>
                    <pre>{`PID     Process         Args
2580    SoulHunt_7F31.  "C:\\Users\\nightwatch\\Desktop\\SoulHunt_7F31.exe" -NoLogo -NoProfile -NoExit -Command Start-Sleep -Seconds 7200`}</pre>
                  </div>

                  {/* EXPLANATION 2 */}
                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🧠 What The Threat Actor Did ]
                    </span>
                    The attacker copied <code className="text-zinc-200 font-mono">powershell.exe</code> to the desktop, renamed it to <code className="text-zinc-200 font-mono">SoulHunt_7F31.exe</code>, and executed an infinite two-hour sleep loop (<code className="text-zinc-200 font-mono">Start-Sleep -Seconds 7200</code>) to maintain a stealthy background session.
                    Matching the challenge title &ldquo;Soul Hunt&rdquo;, the flag is the name of this malicious artifact: <code className="text-white font-mono font-bold">SoulHunt_7F31</code>.
                  </div>
                </div>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MISSION 02 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;SoulHunt_7F31&#125;</code>
                  </div>
                  <CopyButton text="OWASP{SoulHunt_7F31}" />
                </div>
              </div>

              {/* ========================================================= */}
              {/* MISSION 03: THE PAINTED SOUL (MEM-3 DEEP CARVE)           */}
              {/* ========================================================= */}
              <div id="mem-mission-3" className="scroll-mt-24 mb-14 border-b border-zinc-800/60 pb-12">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 text-emerald-400 font-mono text-sm flex items-center justify-center font-bold border border-zinc-700">3</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                      Mission 03: The Painted Soul (Mem-3 Deep Carve)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold">
                      200 PTS
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2 py-0.5 rounded">
                      VAD GDI Carving
                    </span>
                  </div>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;Some things are easier to remember when they are seen. Find what was left behind. Flag format: OWASP&#123;...&#125;&rdquo;
                </div>

                {/* The Concept in Plain English */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> The Core Problem Explained: Why Grepping for Text Completely Fails
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    If you write a Python script to search for <code className="text-zinc-200 font-mono">b&quot;OWASP&#123;&quot;</code> across the entire 2.77 GB dump, you get exactly <strong>ZERO</strong> ASCII matches.
                    The prompt explicitly gives you the clue: <em>&ldquo;easier to remember when they are <strong>SEEN</strong>&rdquo;</em>.
                    The flag was never saved as a text string; it was <strong>drawn on a graphic canvas as pixels</strong>!
                    <br /><br />
                    <strong>The Honeypot Decoy:</strong> If you dump all cached PNG files from disk, you find <code className="text-zinc-200 font-mono">Sacrifice.png</code> opened in Photos (<code className="text-zinc-200 font-mono">PID 4824</code>), showing the text <code className="text-red-400 font-mono">OWASP&#123;soulstone_memory_84c2&#125;</code>. This is a trap! It exists as plaintext in the clipboard. The briefing warned: <em>&ldquo;not everything left behind is what it seems&rdquo;</em>.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-6 mb-6">
                  {/* STEP 1: TARGETING MS PAINT */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> Step 1: Targeting MS Paint (PID 1204) &amp; Dumping Virtual Address Descriptors (VAD)
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      Checking active command lines showed that classic Win32 Paint had <code className="text-zinc-200 font-mono">{"C:\\Users\\nightwatch\\Pictures\\Vormir.png"}</code> opened. Because the image file was fragmented across non-contiguous physical RAM pages, disk file carving failed. However, Paint holds the uncompressed canvas in its private heap as a GDI Device Independent Bitmap (DIB). We dump every memory region (VAD) of PID 1204:
                    </p>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: DUMP VAD MEMORY SEGMENTS ]</span>
                      <span className="text-emerald-400">vol -f soul.mem -o vad_dump windows.vadinfo --pid 1204 --dump</span>
                    </div>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📤 GENERATED ARTIFACTS ]</span>
                      Dumps ~94 files named <code className="text-zinc-400">pid.1204.vad.&lt;start&gt;-&lt;end&gt;.dmp</code> into the directory.
                    </div>
                  </div>

                  {/* STEP 2: SCORING FOR WHITE CANVAS */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> Step 2: Isolating the Drawing Canvas via White-Pixel Heuristics
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      How do you know which of the 94 dumps contains the image canvas? An MS Paint drawing has a predominantly white background. In digital imaging, pure white is represented as byte value <code className="text-zinc-200 font-mono">0xFF</code> (255). We write a quick 3-line Python scanner to count which file contains over 80% <code className="text-zinc-200 font-mono">0xFF</code> bytes:
                    </p>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: PYTHON CANVAS DETECTOR ]</span>
                      <pre className="text-emerald-400">{`import glob
for f in glob.glob("vad_dump/*.dmp"):
    buf = open(f, "rb").read()
    if len(buf) > 500000 and buf.count(b"\\xff") / len(buf) > 0.8:
        print(f"[FOUND CANVAS] {f} -> Size: {len(buf):,} bytes")`}</pre>
                    </div>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📤 DETECTED CANVAS REGION ]</span>
                      <pre className="text-white font-bold">{`[FOUND CANVAS] vad_dump/pid.1204.vad.0x23840870000-0x23840af4fff.dmp -> Size: 2,641,920 bytes`}</pre>
                    </div>
                  </div>

                  {/* STEP 3: STRIDE AUTOCORRELATION MATH */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> Step 3: Determining Width &amp; Height via Stride Autocorrelation
                    </h4>
                    <div className="bg-[#111116] border-l-4 border-zinc-500 p-4 rounded-r-xl mb-3 font-sans text-xs text-zinc-300 leading-relaxed">
                      We have 2,641,920 bytes of raw pixel data, but we don&apos;t know the width or height! If you render raw pixels with the wrong width, the picture looks like static noise on a broken TV.
                      <br /><br />
                      To discover the true width, we run <strong>Stride Autocorrelation</strong>: we slide the memory buffer across itself at different offsets $s$. Because every row in a drawing has similar white margin borders, the signal correlation spikes sharply when $s$ equals the exact byte length of one row (the stride/pitch):
                    </div>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3 text-zinc-300">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📐 MATHEMATICAL STRIDE CALCULATION ]</span>
                      Autocorrelation Peak: <span className="text-emerald-400 font-bold">stride = 4,608 bytes per row</span>
                      <br />
                      Bits Per Pixel: <span className="text-zinc-400">32bpp (BGRA = 4 bytes per pixel)</span>
                      <br />
                      <span className="text-white font-bold">Image Width = 4,608 ÷ 4 = 1,152 pixels</span>
                      <br />
                      <span className="text-white font-bold">Image Height = 2,641,920 ÷ 4,608 = 573.33 ≈ 573 pixels</span>
                    </div>

                    <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        [ ⚠️ Why Was the Image Upside Down? ]
                      </span>
                      In Windows GDI architecture, 32bpp Device Independent Bitmaps (DIBs) are stored <strong>bottom-up</strong> by default! The first byte in the memory buffer is the <em>bottom-left</em> pixel of the drawing, not the top-left! In Python, we simply call <code className="text-zinc-200 font-mono">np.flipud(array)</code> to orient it upright.
                    </div>
                  </div>

                  {/* STEP 4: CARVED TEXT & THE MISSING TAIL */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> Step 4: Reading the Canvas &amp; The Truncation Dilemma
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      Rendering the recovered 1152x573 canvas displays black painted hex characters on a white background:
                    </p>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📤 CARVED HEX TEXT FROM CANVAS ]</span>
                      <span className="text-zinc-300">Line 1: 4f574153507b736</span>
                      <br />
                      <span className="text-zinc-300">Line 2: f756c73746f6e65</span>
                      <br />
                      <span className="text-zinc-300">Line 3: 5f7061696e745f3</span>
                    </div>

                    <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="text-amber-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        [ ⚠️ The Mystery of the 45th Nibble ]
                      </span>
                      Notice that the combined string <code className="text-zinc-200 font-mono">4f574153507b736...5f7061696e745f3</code> has only <strong>45 characters</strong>!
                      Hex strings must always have an <em>even</em> number of characters (2 characters = 1 byte). 45 is odd! The character <code className="text-zinc-200 font-mono">&apos;3&apos;</code> at the end is half of a byte!
                      <br /><br />
                      The challenge narrative explicitly told us: <em>&ldquo;...maybe the process didn&apos;t resume?&rdquo;</em>
                      The victim had typed the flag into MS Paint&apos;s Text Tool, but the computer was frozen and dumped before Paint finished rasterizing the fourth line of text onto the canvas!
                    </div>
                  </div>

                  {/* STEP 5: RECOVERING UTF-16 HEAP BUFFER */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="text-emerald-400">⚡</span> Step 5: Hunting the Unrendered Tail in Paint&apos;s UTF-16 Heap
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      Even though the canvas bitmap was incomplete, what a user types into Windows software remains preserved in the process heap memory as a <strong>UTF-16LE string</strong>!
                      We search <code className="text-zinc-200 font-mono">soul.mem</code> for the UTF-16 bytes of the last visible line <code className="text-zinc-200 font-mono">7061696e745f3</code> (&ldquo;paint_3&rdquo;):
                    </p>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: UTF-16 MEMORY SEARCH ]</span>
                      <span className="text-emerald-400">data.find(&quot;7061696e745f3&quot;.encode(&quot;utf-16le&quot;))</span>
                    </div>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                      <span className="text-zinc-500 block mb-1 font-bold">[ 📤 RECOVERED COMPLETE UTF-16 BUFFER (OFFSET 0x6cdc75d0) ]</span>
                      <span className="text-white font-bold">4f574153507b736f756c73746f6e655f7061696e745f353261667d</span>
                    </div>

                    <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        [ 🎯 The Missing Tail Identified ]
                      </span>
                      Comparing the two strings:
                      <br />
                      Canvas Hex (Line 1-3): <code className="text-zinc-400 font-mono">4f574153507b736f756c73746f6e655f7061696e745f3...</code>
                      <br />
                      Recovered Buffer Tail: <code className="text-emerald-400 font-mono font-bold">...353261667d</code>
                      <br /><br />
                      Hex <code className="text-emerald-400 font-mono">35 32 61 66 7d</code> decodes directly to <code className="text-white font-mono font-bold">5 2 a f &#125;</code>!
                      <br />
                      Full decoded string: <code className="text-emerald-400 font-mono font-bold">OWASP&#123;soulstone_paint_52af&#125;</code>
                    </div>
                  </div>
                </div>

                {/* Expandable Full Python DIB Carver & Heap Search Script */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      <span>⚡</span> [ Show Complete DIB Carver &amp; UTF-16 Heap Search Python Script ]
                    </span>
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                    <pre className="text-zinc-300">{`import numpy as np
from PIL import Image

# ==============================================================================
# PART 1: CARVE BOTTOM-UP DIB SECTION FROM VAD DUMP
# ==============================================================================
vad_path = "vad_dump/pid.1204.vad.0x23840870000-0x23840af4fff.dmp"
with open(vad_path, "rb") as f:
    raw_bytes = f.read()

width = 1152       # Stride: 4608 bytes / 4 bytes per pixel (32bpp)
height = 573      # Total size 2,641,920 // 4608 bytes
expected_length = width * height * 4

# Interpret raw bytes as BGRA 32-bit pixel array
arr = np.frombuffer(raw_bytes[:expected_length], dtype=np.uint8).reshape((height, width, 4))

# Convert BGRA order to standard RGBA
rgba = arr[:, :, [2, 1, 0, 3]]

# Windows DIB bitmaps are stored bottom-up; flip vertically
upright_image = np.flipud(rgba)

img = Image.fromarray(upright_image, mode="RGBA")
img.save("recovered_mspaint_canvas.png")
print("[+] Canvas successfully carved and saved to recovered_mspaint_canvas.png")

# ==============================================================================
# PART 2: HUNT UNRENDERED TEXT BUFFER IN PROCESS HEAP MEMORY
# ==============================================================================
with open("soul.mem", "rb") as f:
    mem = f.read()

# Search for the partial hex needle in UTF-16LE encoding:
needle = "7061696e745f3".encode("utf-16le")
offset = mem.find(needle)

if offset != -1:
    print(f"[+] Found UTF-16 buffer match at memory offset: 0x{offset:08x}")
    start_offset = mem.rfind("4f5741".encode("utf-16le"), 0, offset)
    end_offset = mem.find(b"\\x00\\x00\\x00", offset)
    
    full_hex_utf16 = mem[start_offset:end_offset].decode("utf-16le")
    flag = bytes.fromhex(full_hex_utf16).decode("ascii")
    print(f"[🎯] Verified Decoded Flag: {flag}")
    # Output: OWASP{soulstone_paint_52af}`}</pre>
                  </div>
                </details>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MISSION 03 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;soulstone_paint_52af&#125;</code>
                  </div>
                  <CopyButton text="OWASP{soulstone_paint_52af}" />
                </div>
              </div>

              {/* ========================================================= */}
              {/* MISSION 04: FINAL EXPEDITION RECORD (MEM-4)               */}
              {/* ========================================================= */}
              <div id="mem-mission-4" className="scroll-mt-24 mb-10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-800 text-emerald-400 font-mono text-sm flex items-center justify-center font-bold border border-zinc-700">4</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                      Mission 04: The Trail Ends (Final Expedition Record)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold">
                      150 PTS
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2 py-0.5 rounded">
                      Hex Slack Carving
                    </span>
                  </div>
                </div>

                {/* Challenge Description */}
                <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                  <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                  &ldquo;The expedition ends when the final record is found. Flag format: OWASP&#123;...&#125;&rdquo;
                </div>

                {/* The Concept in Plain English */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> The Core Problem Explained: File Carving from Filesystem Cache
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Even when an explorer window or text editor is closed, files that were accessed remain cached in the Windows operating system filesystem cache or Master File Table (MFT) buffer memory.
                    By checking document paths for user <code className="text-zinc-200 font-mono">nightwatch</code>, we locate the file <code className="text-zinc-200 font-mono">{"C:\\Users\\nightwatch\\Documents\\Vormir\\expedition.txt"}</code>.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Carving expedition.txt
                  </h4>

                  {/* INPUT BOX */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: CARVE RECENT DOCUMENT FROM MEMORY ]</span>
                    <span className="text-emerald-400">{`vol -f soul.mem windows.dumpfiles --virtaddr <expedition_txt_vad_address>`}</span>
                  </div>

                  {/* OUTPUT BOX */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 RECOVERED expedition.txt CONTENT ]</span>
                    <pre>{`Location: Vormir
Status: incomplete

Artifact reference:
4f574153507b736f756c73746f6e655f6e6f74655f336339317d

The trail ends with this record.
If you are reading this, you've uncovered what the others missed.
The journey is complete.

Well done, traveler.`}</pre>
                  </div>

                  {/* EXPLANATION */}
                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🧠 Hex Decoding the Record ]
                    </span>
                    The file explicitly provides the final artifact reference in hexadecimal:
                    <br />
                    <code className="text-white font-mono">bytes.fromhex(&quot;4f574153507b736f756c73746f6e655f6e6f74655f336339317d&quot;).decode()</code>
                    <br />
                    Decodes directly to: <code className="text-emerald-400 font-mono font-bold">OWASP&#123;soulstone_note_3c91&#125;</code>.
                  </div>
                </div>

                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MISSION 04 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;soulstone_note_3c91&#125;</code>
                  </div>
                  <CopyButton text="OWASP{soulstone_note_3c91}" />
                </div>
              </div>

              {/* Honeypots & Decoys Table */}
              <div id="mem-decoys" className="scroll-mt-24 mt-8 pt-6 border-t border-zinc-800">
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
                  We are provided with a network packet trace <code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">s0ul.pcap</code> capturing an automated exfiltration pipeline.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Exfiltrated communication was captured in a packet trace. Retrieve the hidden payload. File provided: s0ul.pcap (227,553 bytes).&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: How FTP Exfiltration Works
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  In FTP (File Transfer Protocol), communication is split into two channels:
                  <br />
                  1. <strong>Control Channel (Port 21)</strong>: Sends text commands like <code className="text-zinc-200 font-mono">USER</code>, <code className="text-zinc-200 font-mono">PASS</code>, and <code className="text-zinc-200 font-mono">PASV</code>.
                  <br />
                  2. <strong>Data Channel (Ephemeral Port)</strong>: When a client issues a <code className="text-zinc-200 font-mono">PASV</code> request, the server responds with:
                  <code className="text-white font-mono block bg-black/50 p-2 my-1 rounded">227 Entering Passive Mode (127,0,0,1,177,23)</code>
                  How do you know what port the file is transferred over?
                  Multiply the 5th number by 256 and add the 6th number: <code className="text-emerald-400 font-mono">Port = 177 × 256 + 23 = 45,335</code>!
                  The actual file bytes never travel on port 21; they travel on port 45,335!
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-6 mb-8">
                {/* STEP 1: PCAP RECON */}
                <div id="sac-step-1" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 1: Packet Stream Reconstruction &amp; FTP Credentials
                  </h4>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: TSHARK FILTER FOR FTP TRAFFIC ]</span>
                    <span className="text-emerald-400">tshark -r s0ul.pcap -Y &quot;ftp or ftp-data&quot;</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 EXTRACTED FTP CONVERSATION ]</span>
                    <pre>{`127.0.0.1 -> 127.0.0.1  FTP: USER vormirkeeper
127.0.0.1 <- 127.0.0.1  FTP: 331 Password required for vormirkeeper.
127.0.0.1 -> 127.0.0.1  FTP: PASS S0ulK33per2014
127.0.0.1 <- 127.0.0.1  FTP: 230 User logged in.
127.0.0.1 -> 127.0.0.1  FTP: PASV
127.0.0.1 <- 127.0.0.1  FTP: 227 Entering Passive Mode (127,0,0,1,177,23)
127.0.0.1 -> 127.0.0.1  FTP: STOR manifest_final_047.jpg (155,832 bytes transferred)`}</pre>
                  </div>
                </div>

                {/* STEP 2: JPEG COMMENT & ZIP OVERLAY */}
                <div id="sac-step-2" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 2: Carving manifest_final_047.jpg &amp; Unlocking the Trailing ZIP
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    We carve the 155,832 bytes from port 45,335 into <code className="text-zinc-200 font-mono">manifest_final_047.jpg</code>.
                    Inspecting its binary markers reveals two critical secrets:
                    <br /><br />
                    1. <strong>The JPEG Comment Marker (0xFF 0xFE):</strong> Directly inside the header sits a plaintext comment:
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3 text-emerald-400">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 EXTRACTED JPEG COMMENT FIELD ]</span>
                    &quot;This password might be useful XD : th3_ult1m4t3_s4cr1f1s3&quot;
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    2. <strong>The Trailing ZIP Overlay (0xFF 0xD9):</strong>
                    In the JPEG standard, byte sequence <code className="text-zinc-200 font-mono">0xFF 0xD9</code> marks the <strong>End of Image (EOI)</strong>. Standard image viewers stop reading there.
                    However, directly following <code className="text-zinc-200 font-mono">0xFF 0xD9</code> are bytes <code className="text-zinc-200 font-mono">50 4B 03 04</code> (<code className="text-zinc-200 font-mono">PK\x03\x04</code>) — the universal file signature of a ZIP archive!
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: UNZIP TRAILING OVERLAY ]</span>
                    <span className="text-emerald-400">unzip -P &quot;th3_ult1m4t3_s4cr1f1s3&quot; carved_overlay.zip</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 UNZIPPED OBJECT ]</span>
                    Extracted file: <code className="text-white font-bold">comms.bin</code>
                  </div>
                </div>

                {/* STEP 3: NESTED MATRYOSHKA DECOMPRESSION */}
                <div id="sac-step-3" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 3: Russian Doll (Matryoshka) Recursive Decompression
                  </h4>
                  <div className="bg-[#111116] border-l-4 border-zinc-500 p-4 rounded-r-xl mb-3 font-sans text-xs text-zinc-300 leading-relaxed">
                    Checking the file signature of <code className="text-zinc-200 font-mono">comms.bin</code> reveals a multi-layered nested compression scheme:
                  </div>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-1">
                    <div>1. <code className="text-yellow-400">1F 8B 08 08</code> (Gzip Header)  → Decompresses to Bzip2 format</div>
                    <div>2. <code className="text-yellow-400">42 5A 68</code> (Bzip2 Header)   → Decompresses to a second Gzip archive</div>
                    <div>3. <code className="text-yellow-400">1F 8B 08 08</code> (Gzip Header)  → Decompresses to <code className="text-emerald-400 font-bold">comms.tar</code> (20,480 bytes)</div>
                  </div>
                </div>

                {/* STEP 4: LORE TRIAGE & BASE64 DECODE */}
                <div id="sac-step-4" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 4: Avengers Lore Triage &amp; Base64 Decoding
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    Extracting <code className="text-zinc-200 font-mono">comms.tar</code> produces character folders for the Avengers and a <code className="text-zinc-200 font-mono">README.txt</code>:
                  </p>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 README.txt CONTENT ]</span>
                    &ldquo;The stone does not bargain. Two went down. Only one came back. Find the one who didn&apos;t.&rdquo;
                  </div>

                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed mb-3">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🧠 Marvel Vormir Lore Resolution ]
                    </span>
                    In <em>Avengers: Endgame</em>, Clint Barton and Natasha Romanoff traveled to Vormir. Natasha made the ultimate sacrifice and died on Vormir.
                    We open her communication transcript:
                  </div>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: INSPECT NATASHA&apos;S LOG ]</span>
                    <span className="text-emerald-400">cat comms/natasha_romanoff/comn.log</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 EXTRACTED BASE64 STRING ]</span>
                    <span className="text-white font-bold">T1dBU1B7NF81MHUxX2Ywcl80XzUwdTFfdjBybTFyfQ==</span>
                  </div>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: BASE64 DECODE ]</span>
                    <span className="text-emerald-400">[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(&quot;T1dBU1B7NF81MHUxX2Ywcl80XzUwdTFfdjBybTFyfQ==&quot;))</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-emerald-400 font-bold">
                    [ 📤 DECODED FLAG ] → OWASP&#123;4_50u1_f0r_4_50u1_v0rm1r&#125;
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details id="sac-solver" className="scroll-mt-24 group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Complete Standalone Python Pipeline Solver ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`import gzip, bz2, tarfile, zipfile, io, base64

def solve_sacrifice_challenge(carved_jpeg_bytes):
    # 1. Locate JPEG comment marker 0xFF 0xFE
    com_pos = carved_jpeg_bytes.find(b"\\xff\\xfe")
    com_len = int.from_bytes(carved_jpeg_bytes[com_pos+2 : com_pos+4], "big")
    password = b"th3_ult1m4t3_s4cr1f1s3"
    print(f"[+] Found JPEG Comment Password: {password.decode()}")

    # 2. Slice trailing ZIP after End of Image (0xFF 0xD9)
    eoi_pos = carved_jpeg_bytes.find(b"\\xff\\xd9")
    zip_bytes = carved_jpeg_bytes[eoi_pos + 2 :]

    # 3. Unzip comms.bin using extracted password
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as z:
        z.setpassword(password)
        comms_bin = z.read("comms.bin")

    # 4. Russian doll nested decompression
    level1_bz2 = gzip.decompress(comms_bin)       # Gzip -> Bzip2
    level2_gz  = bz2.decompress(level1_bz2)      # Bzip2 -> Gzip
    level3_tar = gzip.decompress(level2_gz)       # Gzip -> TAR Archive

    # 5. Extract TAR in-memory and parse Natasha's log
    tar = tarfile.open(fileobj=io.BytesIO(level3_tar))
    for member in tar.getmembers():
        if "natasha_romanoff" in member.name:
            data = tar.extractfile(member).read().decode()
            for line in data.splitlines():
                if line.startswith("T1dBU"):
                    flag = base64.b64decode(line.strip()).decode()
                    print(f"[🎯] Recovered Flag: {flag}")

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
                  We are provided with an eerie audio file <code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">memory.wav</code>. When played forwards, it sounds like unintelligible demonic garble.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Long before anyone came searching for the Soul Stone, a solitary Keeper watched over the ancient place of Vormir. The Keeper&apos;s duty was not simply to guard the relic; he was bound to it by an oath. Before his disappearance, the Keeper left behind a final recording. What was recorded last may need to be understood first. Decode what he left behind.&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: Reverse Speech &amp; RIFF Slack Space
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  This challenge combines two distinct forensic concepts:
                  <br /><br />
                  1. <strong>Reverse Audio (Backmasking):</strong> Sound is recorded as an array of amplitudes across time. If speech is reversed, our ears cannot decode it forward. By reversing the array along the time axis (<code className="text-zinc-200 font-mono">data[::-1]</code>), the spoken words become crystal clear.
                  <br /><br />
                  2. <strong>RIFF Slack Space Anomaly:</strong> A canonical WAV file contains a 4-byte header at offset 4 defining its container size. If <code className="text-zinc-200 font-mono">RealFileSize &gt; ContainerSize + 8</code>, extra secret data has been glued onto the end of the file outside the audio container! Media players ignore this data, but hex editors reveal it immediately.
                </p>
              </div>

              {/* Spectrogram Preview */}
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-8 border border-zinc-800 bg-black">
                <Image
                  src="/images/byteme_memory_spec.png"
                  alt="Audio Spectrogram Analysis"
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-2 right-3 font-mono text-[10px] bg-black/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">
                  Spectrogram Analysis (48 kHz Stereo)
                </div>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-6 mb-8">
                {/* STEP 1: AUDIO REVERSAL */}
                <div id="audio-step-1" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 1: Reversing Audio &amp; Transcribing the Keeper&apos;s Voice
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    The prompt instructs: <em>&ldquo;What was recorded last may need to be understood first.&rdquo;</em>
                    We reverse the stereo PCM audio array in Python:
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: PYTHON AUDIO REVERSAL ]</span>
                    <pre className="text-emerald-400">{`import scipy.io.wavfile as wav
rate, data = wav.read("memory.wav")
wav.write("reversed.wav", rate, data[::-1])`}</pre>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 TRANSCRIBED SPOKEN AUDIO (WHISPER / AUDACITY) ]</span>
                    <span className="text-emerald-400 font-bold">&ldquo;The key is sacrifice.&rdquo;</span>
                  </div>

                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🔑 Decryption Key Discovered ]
                    </span>
                    The spoken phrase directly gives us our XOR decryption key: <code className="text-white font-mono font-bold">sacrifice</code>.
                  </div>
                </div>

                {/* STEP 2: CARVING APPARENT SLACK SPACE */}
                <div id="audio-step-2" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 2: Carving Appended Trailing RIFF Hex Payload
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    Next, we parse the WAV container header structure:
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3 text-zinc-300">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📐 WAV HEADER CALCULATION ]</span>
                    Offset 4-8 (Little Endian integer): <span className="text-white font-bold">682,054 bytes</span>
                    <br />
                    Expected File Length = 682,054 + 8 = <span className="text-white font-bold">682,062 bytes</span>
                    <br />
                    Actual File Size on Disk = <span className="text-yellow-400 font-bold">682,275 bytes</span>
                    <br />
                    Discrepancy (Trailing Slack Space) = 682,275 - 682,062 = <span className="text-emerald-400 font-bold">213 bytes appended!</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 EXTRACTED 213 BYTES FROM OFFSET 682,062 ]</span>
                    <span className="text-zinc-300">21 04 0e 17 04 04 0c 11 45 04 09 1a 52 20 46 1b 06 08 12 08 0d 17 0d 48 63 2d 0a 07 41 05 1d 1b...</span>
                  </div>
                </div>

                {/* STEP 3: XOR DECRYPTION */}
                <div id="audio-step-3" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="text-emerald-400">⚡</span> Step 3: Repeated-Key XOR Decryption &amp; Riddle Resolution
                  </h4>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: REPEATING XOR CIPHER DECRYPTION ]</span>
                    <pre className="text-emerald-400">{`cipher = bytes.fromhex(hex_str)
key = b"sacrifice"
plaintext = bytes([c ^ key[i % len(key)] for i, c in enumerate(cipher)]).decode()
print(plaintext)`}</pre>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-white font-bold mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ 📤 DECRYPTED KEEPER MESSAGE ]</span>
                    Remember why I remained.
                    <br />
                    Not for the Stone, but for what held me to it.
                  </div>

                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ 🧠 Riddle &amp; Relic Reversal Resolution ]
                    </span>
                    The prompt instructs:
                    <br />
                    1. <em>&ldquo;Remember why I remained.&rdquo;</em> (Line 1 of decrypted text).
                    <br />
                    2. <em>&ldquo;And what appears to reveal the truth may conceal the path to it.&rdquo;</em> (Line 2 reveals the truth: &ldquo;what held me to it&rdquo;).
                    <br />
                    3. <em>&ldquo;Vormir does not reveal its truths in the order you expect.&rdquo;</em> (Reverse the decisive clause).
                    <br /><br />
                    Reversing the phrase <code className="text-white font-mono">&quot;what held me to it&quot;</code> produces:
                    <br />
                    <code className="text-emerald-400 font-mono font-bold">ti_ot_em_dleh_tahw</code>
                    <br />
                    Accepted Flag: <code className="text-emerald-400 font-mono font-bold">OWASP&#123;ti_ot_em_dleh_tahw&#125;</code> (and alternate: <code className="text-zinc-300 font-mono">OWASP&#123;sacrifice&#125;</code>).
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details id="audio-solver" className="scroll-mt-24 group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Standalone Python Audio Reverser &amp; XOR Decryptor ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`import scipy.io.wavfile as wavfile
import struct

# 1. TIME-REVERSAL AUDIO RECONSTRUCTION
rate, samples = wavfile.read("memory.wav")
reversed_samples = samples[::-1]
wavfile.write("reversed_memory.wav", rate, reversed_samples)
print("[+] Reversed audio exported. Speech transcription reveals: 'The key is sacrifice.'")

# 2. CARVE TRAILING RIFF SLACK SPACE
with open("memory.wav", "rb") as f:
    raw_content = f.read()

# Offset 4 holds little-endian 32-bit chunk size:
riff_chunk_size = struct.unpack("<I", raw_content[4:8])[0]
expected_eof = riff_chunk_size + 8

print(f"[+] Expected Container EOF: {expected_eof}, Physical File Size: {len(raw_content)}")
trailing_hex = raw_content[expected_eof:].decode("ascii").strip()

# 3. REPEATED-KEY XOR DECRYPTION
cipher_bytes = bytes.fromhex(trailing_hex)
key = b"sacrifice"

decrypted_message = bytes([b ^ key[i % len(key)] for i, b in enumerate(cipher_bytes)]).decode()
print("\\n[+] Decrypted Keeper Message:\\n", decrypted_message)

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
          {/* ================= RIGHT / STICKY SLIDER RAIL ================= */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-24 self-start">
            <div className="max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar bg-[#0d0d12]/95 border border-zinc-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 shrink-0">
                <span className="font-mono text-[11px] text-zinc-300 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  CHALLENGE INDEX
                </span>
                <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-bold">
                  3 LABS
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 mb-3 font-mono shrink-0">
                Click any challenge to jump to its full writeup:
              </p>

              {/* Navigation List */}
              <nav className="flex flex-col gap-2.5 overflow-y-auto no-scrollbar pr-0.5">
                {challenges.map((c) => {
                  const isChallengeActive = activeChallengeId === c.id;
                  return (
                    <div
                      key={c.id}
                      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        isChallengeActive
                          ? "bg-zinc-900/90 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                          : "bg-black/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      {/* Main Challenge Jump Button */}
                      <button
                        onClick={() => scrollToElement(c.id)}
                        className="w-full text-left p-3 flex flex-col gap-1 focus:outline-none transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-[10px] uppercase font-bold ${
                            isChallengeActive ? "text-zinc-300" : "text-zinc-500"
                          }`}>
                            LAB #{c.num}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                              isChallengeActive
                                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10 font-bold"
                                : "border-zinc-800 text-zinc-500"
                            }`}
                          >
                            {c.points}
                          </span>
                        </div>
                        <span className={`font-bold text-xs uppercase tracking-wider ${
                          isChallengeActive ? "text-white" : "text-zinc-300"
                        }`}>
                          {c.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 truncate">
                          {c.category}
                        </span>
                      </button>

                      {/* Content Headers / Stages Sub-Menu */}
                      {c.sections && c.sections.length > 0 && (
                        <div className={`border-t border-zinc-800/80 px-2.5 py-2 space-y-1 transition-all ${
                          isChallengeActive ? "bg-black/60 block" : "hidden hover:block"
                        }`}>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block px-1 mb-1 font-bold">
                            CONTENT HEADERS:
                          </span>
                          {c.sections.map((sec) => {
                            const isSecActive = activeSectionId === sec.id;
                            return (
                              <button
                                key={sec.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToElement(sec.id);
                                }}
                                className={`w-full text-left px-2 py-1 rounded text-[11px] font-mono transition-all flex items-center justify-between gap-1.5 ${
                                  isSecActive
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                                }`}
                              >
                                <span className="truncate flex items-center gap-1.5">
                                  <span className={isSecActive ? "text-emerald-400 font-bold" : "text-zinc-600"}>
                                    {isSecActive ? "▶" : "•"}
                                  </span>
                                  <span>{sec.title}</span>
                                </span>
                                <span className="text-[9px] text-zinc-500 shrink-0 font-normal">
                                  {sec.tag}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col gap-2 shrink-0">
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
