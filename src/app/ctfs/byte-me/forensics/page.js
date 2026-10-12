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
      summary: "Analysis of the 2.77 GB Windows memory dump (`soul.mem`) with Volatility 3: extracting kernel timestamps from KUSER_SHARED_DATA, finding the masqueraded PowerShell process, carving the MS Paint canvas from VAD memory, and recovering the final expedition note.",
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
      summary: "Carving `manifest_final_047.jpg` from `s0ul.pcap`, getting the password from the JPEG comment, extracting the trailing ZIP archive, unpacking the nested archives, and decoding the flag from the exfiltration log.",
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
      summary: "Reversing the audio stream in `memory.wav` to get the spoken passphrase, carving 213 extra hex bytes appended past the RIFF chunk, and decrypting the text with repeating XOR.",
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
            Vormir Forensics
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            Writeup for all 3 forensics challenges from Byte Me CTF 2026: Windows memory forensics, FTP PCAP packet extraction, and audio steganography. Includes exact commands, python scripts, and flags.
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
                  We are given a 2.77 GB Windows memory dump (<code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">soul.mem</code>) split across 4 missions: finding the machine shutdown time, locating the suspicious running process, reconstructing drawn images out of MS Paint memory, and finding the final document.
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

                {/* How to solve */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    Finding the real system time
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Don&apos;t check the file properties in Windows Explorer because that only shows when the dump file was created or copied to your machine, not when the target system was running.
                    <br /><br />
                    The real time is stored in kernel memory inside the <code className="text-zinc-200 font-mono">KUSER_SHARED_DATA</code> structure at <code className="text-zinc-200 font-mono">0x7FFE0000</code>. The <code className="text-zinc-200 font-mono">SystemTime</code> field counts 100-nanosecond intervals since January 1, 1601 UTC. Volatility&apos;s <code className="text-zinc-200 font-mono">windows.info</code> plugin reads this structure directly.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    Step-by-Step Triage: Running Volatility 3
                  </h4>

                  {/* INPUT BOX */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT COMMAND ]</span>
                    <span className="text-emerald-400">vol -f soul.mem windows.info</span>
                  </div>

                  {/* OUTPUT BOX */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ EXACT RAW OUTPUT ]</span>
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
                      [ Result ]
                    </span>
                    Look at <code className="text-white font-mono font-bold">SystemTime : 2026-10-08 05:07:43+00:00</code>.
                    The system time when the dump was taken was <strong>2026-10-08 05:07:43 UTC</strong>.
                    Formatting into <code className="text-zinc-200 font-mono">OWASP&#123;YYYY-MM-DD HH:MM:SS&#125;</code> gives the flag.
                  </div>
                </div>

                {/* Expandable Python Solver */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      [ Show Standalone Python FILETIME Decoder Script ]
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

                {/* The Concept */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    Process listing and the 14-character name limit
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    When running <code className="text-zinc-200 font-mono">windows.pslist</code>, Volatility walks the list of <code className="text-zinc-200 font-mono">EPROCESS</code> structures in kernel memory.
                    <br /><br />
                    In Windows, the <code className="text-zinc-200 font-mono">ImageFileName</code> field in the <code className="text-zinc-200 font-mono">EPROCESS</code> block is fixed to 15 bytes (14 characters plus null terminator). If an executable name is longer, like <code className="text-zinc-200 font-mono">SoulHunt_7F31.exe</code>, the kernel cuts off the ending so it shows as <code className="text-zinc-200 font-mono">SoulHunt_7F31.</code> with a trailing dot. To see the full command line and real name, inspect the Process Environment Block (PEB) using <code className="text-zinc-200 font-mono">windows.cmdline</code>.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    Step-by-Step Triage: Hunting the Rogue Process
                  </h4>

                  {/* INPUT BOX 1 */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT 1: LIST RUNNING PROCESSES ]</span>
                    <span className="text-emerald-400">vol -f soul.mem windows.pslist</span>
                  </div>

                  {/* OUTPUT BOX 1 */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ RAW PROCESS LIST OUTPUT (SNIPPET) ]</span>
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
                      [ Finding the suspicious process ]
                    </span>
                    Look at PID <strong>2580</strong> spawned by PowerShell (PID 6960). The name is <code className="text-white font-mono font-bold">SoulHunt_7F31.</code>. We check its command line to see what it was doing.
                  </div>

                  {/* INPUT BOX 2 */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT 2: CARVE PROCESS ENVIRONMENT BLOCK (PEB) COMMANDLINE ]</span>
                    <span className="text-emerald-400">vol -f soul.mem windows.cmdline --pid 2580</span>
                  </div>

                  {/* OUTPUT BOX 2 */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ EXACT RAW OUTPUT ]</span>
                    <pre>{`PID     Process         Args
2580    SoulHunt_7F31.  "C:\\Users\\nightwatch\\Desktop\\SoulHunt_7F31.exe" -NoLogo -NoProfile -NoExit -Command Start-Sleep -Seconds 7200`}</pre>
                  </div>

                  {/* EXPLANATION 2 */}
                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ Process details ]
                    </span>
                    The process was executed from <code className="text-zinc-200 font-mono">C:\Users\nightwatch\Desktop\SoulHunt_7F31.exe</code> with <code className="text-zinc-200 font-mono">Start-Sleep -Seconds 7200</code>.
                    The flag is the artifact name: <code className="text-white font-mono font-bold">SoulHunt_7F31</code>.
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

                {/* The Concept */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    Why searching for the flag string fails
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Searching for <code className="text-zinc-200 font-mono">OWASP&#123;</code> across the memory dump gives zero matches. The prompt hints: <em>&ldquo;easier to remember when they are seen&rdquo;</em>. The flag was drawn as pixels on an MS Paint canvas rather than stored as text.
                    <br /><br />
                    There is also a decoy: dumping PNGs gives <code className="text-zinc-200 font-mono">Sacrifice.png</code> (opened in Photos, PID 4824) showing <code className="text-red-400 font-mono">OWASP&#123;soulstone_memory_84c2&#125;</code>. That is a fake flag.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-6 mb-6">
                  {/* STEP 1: TARGETING MS PAINT */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      Step 1: Dumping MS Paint (PID 1204) VAD memory
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      Checking the process list showed <code className="text-zinc-200 font-mono">mspaint.exe</code> (PID 1204) was running with an image open. MS Paint holds the active canvas in memory as an uncompressed bitmap (DIB) in its virtual address space (VAD). We dump the VAD regions for PID 1204:
                    </p>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                      <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: DUMP VAD MEMORY SEGMENTS ]</span>
                      <span className="text-emerald-400">vol -f soul.mem -o vad_dump windows.vadinfo --pid 1204 --dump</span>
                    </div>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                      <span className="text-zinc-500 block mb-1 font-bold">[ GENERATED ARTIFACTS ]</span>
                      Dumps ~94 files named <code className="text-zinc-400">pid.1204.vad.&lt;start&gt;-&lt;end&gt;.dmp</code> into the directory.
                    </div>
                  </div>

                  {/* STEP 2: SCORING FOR WHITE CANVAS */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      Step 2: Finding the canvas dump (white pixels)
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      To find which of the 94 dumped regions contains the canvas, we check for white background pixels. In bitmap data, white pixels are <code className="text-zinc-200 font-mono">0xFF</code>. A quick Python script checks which file is mostly <code className="text-zinc-200 font-mono">0xFF</code> bytes:
                    </p>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                      <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: PYTHON CANVAS DETECTOR ]</span>
                      <pre className="text-emerald-400">{`import glob
for f in glob.glob("vad_dump/*.dmp"):
    buf = open(f, "rb").read()
    if len(buf) > 500000 and buf.count(b"\\xff") / len(buf) > 0.8:
        print(f"[FOUND CANVAS] {f} -> Size: {len(buf):,} bytes")`}</pre>
                    </div>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                      <span className="text-zinc-500 block mb-1 font-bold">[ DETECTED CANVAS REGION ]</span>
                      <pre className="text-white font-bold">{`[FOUND CANVAS] vad_dump/pid.1204.vad.0x23840870000-0x23840af4fff.dmp -> Size: 2,641,920 bytes`}</pre>
                    </div>
                  </div>

                  {/* STEP 3: STRIDE AUTOCORRELATION MATH */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      Step 3: Calculating width and height
                    </h4>
                    <div className="bg-[#111116] border-l-4 border-zinc-500 p-4 rounded-r-xl mb-3 font-sans text-xs text-zinc-300 leading-relaxed">
                      The file has 2,641,920 bytes of raw pixels, but we need the dimensions to render it properly.
                      <br /><br />
                      By testing row stride correlation, the byte length of one row peaks at 4,608 bytes. Since 32bpp images use 4 bytes per pixel (BGRA), the width is 4,608 / 4 = 1,152 pixels. Dividing the total buffer by the stride gives 2,641,920 / 4,608 = 573 pixels height.
                    </div>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3 text-zinc-300">
                      <span className="text-zinc-500 block mb-1 font-bold">[ STRIDE CALCULATION ]</span>
                      Row Stride: <span className="text-emerald-400 font-bold">4,608 bytes per row</span>
                      <br />
                      Bits Per Pixel: <span className="text-zinc-400">32bpp (BGRA = 4 bytes per pixel)</span>
                      <br />
                      <span className="text-white font-bold">Image Width = 4,608 ÷ 4 = 1,152 pixels</span>
                      <br />
                      <span className="text-white font-bold">Image Height = 2,641,920 ÷ 4,608 = 573 pixels</span>
                    </div>

                    <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        [ Image Orientation ]
                      </span>
                      In Windows, GDI bitmaps are stored bottom-up by default: the first byte is the bottom-left pixel. Calling <code className="text-zinc-200 font-mono">np.flipud()</code> in Python flips it right side up.
                    </div>
                  </div>

                  {/* STEP 4: CARVED TEXT & THE MISSING TAIL */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      Step 4: Reading the carved canvas text
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      Rendering the 1152x573 canvas reveals hex characters written across three lines:
                    </p>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                      <span className="text-zinc-500 block mb-1 font-bold">[ CARVED HEX TEXT FROM CANVAS ]</span>
                      <span className="text-zinc-300">Line 1: 4f574153507b736</span>
                      <br />
                      <span className="text-zinc-300">Line 2: f756c73746f6e65</span>
                      <br />
                      <span className="text-zinc-300">Line 3: 5f7061696e745f3</span>
                    </div>

                    <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="text-amber-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        [ Incomplete hex string ]
                      </span>
                      Combining the three lines gives <code className="text-zinc-200 font-mono">4f574153507b736...5f7061696e745f3</code>, which is 45 characters long.
                      Hex strings need an even number of characters (2 chars per byte). 45 is odd, meaning the text was cut off before Paint finished drawing the final characters onto the canvas.
                    </div>
                  </div>

                  {/* STEP 5: RECOVERING UTF-16 HEAP BUFFER */}
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                      Step 5: Recovering the rest from UTF-16 heap memory
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                      Even if Paint didn&apos;t finish rendering the text onto the image canvas, what the user typed into the text box is still in process memory as UTF-16LE. We search <code className="text-zinc-200 font-mono">soul.mem</code> for the last visible fragment <code className="text-zinc-200 font-mono">7061696e745f3</code>:
                    </p>

                    <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                      <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: UTF-16 MEMORY SEARCH ]</span>
                      <span className="text-emerald-400">data.find(&quot;7061696e745f3&quot;.encode(&quot;utf-16le&quot;))</span>
                    </div>

                    <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                      <span className="text-zinc-500 block mb-1 font-bold">[ RECOVERED COMPLETE UTF-16 BUFFER (OFFSET 0x6cdc75d0) ]</span>
                      <span className="text-white font-bold">4f574153507b736f756c73746f6e655f7061696e745f353261667d</span>
                    </div>

                    <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                        [ Decoded text ]
                      </span>
                      The search finds the full buffer at offset <code className="text-zinc-200 font-mono">0x6cdc75d0</code>. The missing end bytes are <code className="text-emerald-400 font-mono">35 32 61 66 7d</code>, which decodes to <code className="text-white font-mono font-bold">52af&#125;</code>.
                      <br /><br />
                      Decoding the full hex gives: <code className="text-emerald-400 font-mono font-bold">OWASP&#123;soulstone_paint_52af&#125;</code>.
                    </div>
                  </div>
                </div>

                {/* Expandable Full Python DIB Carver & Heap Search Script */}
                <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-6 transition-all">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                    <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                      [ Show Complete DIB Carver &amp; UTF-16 Heap Search Python Script ]
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
    print(f"[+] Verified Decoded Flag: {flag}")
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

                {/* The Concept */}
                <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    Carving cached documents from memory
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Files recently opened by users stay cached in memory. Checking document paths for the user <code className="text-zinc-200 font-mono">nightwatch</code> points to <code className="text-zinc-200 font-mono">{"C:\\Users\\nightwatch\\Documents\\Vormir\\expedition.txt"}</code>. We can dump its contents directly from memory cache.
                  </p>
                </div>

                {/* Step-by-Step Execution */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    Step-by-Step Triage: Carving expedition.txt
                  </h4>

                  {/* INPUT BOX */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: CARVE RECENT DOCUMENT FROM MEMORY ]</span>
                    <span className="text-emerald-400">{`vol -f soul.mem windows.dumpfiles --virtaddr <expedition_txt_vad_address>`}</span>
                  </div>

                  {/* OUTPUT BOX */}
                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ RECOVERED expedition.txt CONTENT ]</span>
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
                      [ Decoding the artifact reference ]
                    </span>
                    The file contains a hex string under artifact reference:
                    <br />
                    <code className="text-white font-mono">bytes.fromhex(&quot;4f574153507b736f756c73746f6e655f6e6f74655f336339317d&quot;).decode()</code>
                    <br />
                    Decodes to: <code className="text-emerald-400 font-mono font-bold">OWASP&#123;soulstone_note_3c91&#125;</code>.
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
                  Decoys &amp; Honeypots Found (Do not submit)
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
                        <td className="p-2.5 text-zinc-400">Main decoy: copyable HTML text, which contradicts &ldquo;seen only&rdquo;</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;soulstone_web_8b2d&#125;</td>
                        <td className="p-2.5">Microsoft Edge memory buffers</td>
                        <td className="p-2.5 text-zinc-400">Belongs to an unrelated web challenge decoy artifact</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;pr0c3ss_hunt_7f31&#125;</td>
                        <td className="p-2.5">PowerShell XOR script parameters</td>
                        <td className="p-2.5 text-zinc-400">Decoy script parameter meant to distract from mspaint VADs</td>
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

              {/* The Concept */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  How FTP data channels work
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  FTP separates control commands from actual file transfers:
                  <br />
                  1. <strong>Control channel (Port 21)</strong>: Handles text commands like <code className="text-zinc-200 font-mono">USER</code>, <code className="text-zinc-200 font-mono">PASS</code>, and <code className="text-zinc-200 font-mono">PASV</code>.
                  <br />
                  2. <strong>Data channel (Passive port)</strong>: When entering passive mode, the server returns:
                  <code className="text-white font-mono block bg-black/50 p-2 my-1 rounded">227 Entering Passive Mode (127,0,0,1,177,23)</code>
                  To find the port number: multiply the 5th number by 256 and add the 6th number: <code className="text-emerald-400 font-mono">177 * 256 + 23 = 45335</code>.
                  The file bytes are transferred on port 45335, not port 21.
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-6 mb-8">
                {/* STEP 1: PCAP RECON */}
                <div id="sac-step-1" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    Step 1: Packet Stream Reconstruction &amp; FTP Credentials
                  </h4>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: TSHARK FILTER FOR FTP TRAFFIC ]</span>
                    <span className="text-emerald-400">tshark -r s0ul.pcap -Y &quot;ftp or ftp-data&quot;</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ EXTRACTED FTP CONVERSATION ]</span>
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
                    Step 2: Carving manifest_final_047.jpg &amp; Unlocking the Trailing ZIP
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    Carving the 155,832 bytes from port 45,335 gives <code className="text-zinc-200 font-mono">manifest_final_047.jpg</code>.
                    Checking the file shows two things:
                    <br /><br />
                    1. <strong>JPEG Comment (0xFF 0xFE):</strong> Inside the header there is a comment string:
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3 text-emerald-400">
                    <span className="text-zinc-500 block mb-1 font-bold">[ EXTRACTED JPEG COMMENT FIELD ]</span>
                    &quot;This password might be useful XD : th3_ult1m4t3_s4cr1f1s3&quot;
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    2. <strong>Trailing ZIP Archive (after 0xFF 0xD9):</strong>
                    JPEG files end at marker <code className="text-zinc-200 font-mono">0xFF 0xD9</code>.
                    Right after that marker are the bytes <code className="text-zinc-200 font-mono">50 4B 03 04</code> (<code className="text-zinc-200 font-mono">PK\x03\x04</code>), which is a ZIP archive appended to the image.
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: UNZIP TRAILING OVERLAY ]</span>
                    <span className="text-emerald-400">unzip -P &quot;th3_ult1m4t3_s4cr1f1s3&quot; carved_overlay.zip</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 block mb-1 font-bold">[ UNZIPPED OBJECT ]</span>
                    Extracted file: <code className="text-white font-bold">comms.bin</code>
                  </div>
                </div>

                {/* STEP 3: NESTED MATRYOSHKA DECOMPRESSION */}
                <div id="sac-step-3" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    Step 3: Decompressing the nested archives
                  </h4>
                  <div className="bg-[#111116] border-l-4 border-zinc-500 p-4 rounded-r-xl mb-3 font-sans text-xs text-zinc-300 leading-relaxed">
                    Checking the file signatures of <code className="text-zinc-200 font-mono">comms.bin</code> shows nested compression:
                  </div>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-1">
                    <div>1. <code className="text-yellow-400">1F 8B 08 08</code> (Gzip Header)  → Decompresses to Bzip2</div>
                    <div>2. <code className="text-yellow-400">42 5A 68</code> (Bzip2 Header)   → Decompresses to Gzip</div>
                    <div>3. <code className="text-yellow-400">1F 8B 08 08</code> (Gzip Header)  → Decompresses to <code className="text-emerald-400 font-bold">comms.tar</code> (20,480 bytes)</div>
                  </div>
                </div>

                {/* STEP 4: LORE TRIAGE & BASE64 DECODE */}
                <div id="sac-step-4" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    Step 4: Reading the log and decoding base64
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    Extracting <code className="text-zinc-200 font-mono">comms.tar</code> gives folders for the characters and a <code className="text-zinc-200 font-mono">README.txt</code>:
                  </p>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ README.txt CONTENT ]</span>
                    &ldquo;The stone does not bargain. Two went down. Only one came back. Find the one who didn&apos;t.&rdquo;
                  </div>

                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed mb-3">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ Finding the target folder ]
                    </span>
                    The prompt references the one who didn&apos;t come back from Vormir (Natasha Romanoff).
                    Checking her folder in the extracted archive:
                  </div>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: INSPECT NATASHA&apos;S LOG ]</span>
                    <span className="text-emerald-400">cat comms/natasha_romanoff/comn.log</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ EXTRACTED BASE64 STRING ]</span>
                    <span className="text-white font-bold">T1dBU1B7NF81MHUxX2Ywcl80XzUwdTFfdjBybTFyfQ==</span>
                  </div>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: BASE64 DECODE ]</span>
                    <span className="text-emerald-400">[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(&quot;T1dBU1B7NF81MHUxX2Ywcl80XzUwdTFfdjBybTFyfQ==&quot;))</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-emerald-400 font-bold">
                    [ DECODED FLAG ] → OWASP&#123;4_50u1_f0r_4_50u1_v0rm1r&#125;
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details id="sac-solver" className="scroll-mt-24 group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    [ Show Complete Standalone Python Pipeline Solver ]
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
                    print(f"[+] Recovered Flag: {flag}")

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

              {/* The Concept */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  Reversed audio and trailing file data
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Two things to check here:
                  <br /><br />
                  1. <strong>Reversing the audio:</strong> The prompt says &ldquo;what was recorded last may need to be understood first&rdquo;. Reversing the audio array (<code className="text-zinc-200 font-mono">data[::-1]</code>) makes the speech intelligible.
                  <br /><br />
                  2. <strong>Checking the WAV container size:</strong> WAV files store the chunk size at offset 4. If the actual file size on disk is larger than <code className="text-zinc-200 font-mono">ChunkSize + 8</code>, there is extra data appended past the end of the audio stream.
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
                    Step 1: Reversing the audio to get the voice key
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    We reverse the stereo PCM audio array in Python:
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: PYTHON AUDIO REVERSAL ]</span>
                    <pre className="text-emerald-400">{`import scipy.io.wavfile as wav
rate, data = wav.read("memory.wav")
wav.write("reversed.wav", rate, data[::-1])`}</pre>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ TRANSCRIBED SPOKEN AUDIO ]</span>
                    <span className="text-emerald-400 font-bold">&ldquo;The key is sacrifice.&rdquo;</span>
                  </div>

                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ Decryption key ]
                    </span>
                    The spoken phrase gives the XOR decryption key: <code className="text-white font-mono font-bold">sacrifice</code>.
                  </div>
                </div>

                {/* STEP 2: CARVING APPARENT SLACK SPACE */}
                <div id="audio-step-2" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    Step 2: Carving trailing hex data from the WAV file
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-3">
                    Next, we check the WAV header size against the actual file size:
                  </p>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3 text-zinc-300">
                    <span className="text-zinc-500 block mb-1 font-bold">[ WAV HEADER CALCULATION ]</span>
                    Offset 4-8 (Little Endian integer): <span className="text-white font-bold">682,054 bytes</span>
                    <br />
                    Expected File Length = 682,054 + 8 = <span className="text-white font-bold">682,062 bytes</span>
                    <br />
                    Actual File Size on Disk = <span className="text-yellow-400 font-bold">682,275 bytes</span>
                    <br />
                    Trailing Bytes = 682,275 - 682,062 = <span className="text-emerald-400 font-bold">213 bytes appended</span>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 mb-3 overflow-x-auto">
                    <span className="text-zinc-500 block mb-1 font-bold">[ EXTRACTED 213 BYTES FROM OFFSET 682,062 ]</span>
                    <span className="text-zinc-300">21 04 0e 17 04 04 0c 11 45 04 09 1a 52 20 46 1b 06 08 12 08 0d 17 0d 48 63 2d 0a 07 41 05 1d 1b...</span>
                  </div>
                </div>

                {/* STEP 3: XOR DECRYPTION */}
                <div id="audio-step-3" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 mb-2">
                    Step 3: Repeating XOR decryption
                  </h4>

                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ INPUT: REPEATING XOR CIPHER DECRYPTION ]</span>
                    <pre className="text-emerald-400">{`cipher = bytes.fromhex(hex_str)
key = b"sacrifice"
plaintext = bytes([c ^ key[i % len(key)] for i, c in enumerate(cipher)]).decode()
print(plaintext)`}</pre>
                  </div>

                  <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-white font-bold mb-3">
                    <span className="text-zinc-500 block mb-1 font-bold">[ DECRYPTED MESSAGE ]</span>
                    Remember why I remained.
                    <br />
                    Not for the Stone, but for what held me to it.
                  </div>

                  <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-sans text-zinc-300 leading-relaxed">
                    <span className="text-emerald-400 font-mono font-bold block mb-1 uppercase tracking-wider">
                      [ Flag derivation ]
                    </span>
                    The decrypted text says:
                    <br />
                    <em>&ldquo;Remember why I remained. Not for the Stone, but for what held me to it.&rdquo;</em>
                    <br /><br />
                    Following the hint to reverse what held him to it:
                    reversing <code className="text-white font-mono">&quot;what held me to it&quot;</code> gives <code className="text-emerald-400 font-mono font-bold">ti_ot_em_dleh_tahw</code>.
                    <br /><br />
                    Accepted flag: <code className="text-emerald-400 font-mono font-bold">OWASP&#123;ti_ot_em_dleh_tahw&#125;</code> (alternate: <code className="text-zinc-300 font-mono">OWASP&#123;sacrifice&#125;</code>).
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details id="audio-solver" className="scroll-mt-24 group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    [ Show Standalone Python Audio Reverser &amp; XOR Decryptor ]
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
