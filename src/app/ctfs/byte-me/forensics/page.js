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
      tagline: "Localhost FTP Session Reconstruction & JPEG Metadata Payload",
      summary: "Forensic analysis of `s0ul.pcap` capturing an automated exfiltration pipeline over localhost FTP. Carving `manifest_final_047.jpg`, decoding hidden JPEG comment chunks (0xFF 0xFE), inspecting `comms.tar`, and base64 flag extraction."
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
          <div className="mb-3 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-3 py-1 rounded-full text-xs font-mono">
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
            All 3 official forensic investigations in a unified single-page dossier. Use the interactive challenge rail on the right to navigate between memory dumps, packet traces, and audio reversing.
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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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
              <div className="bg-[#0e0e14] border-l-4 border-zinc-500 p-5 rounded-r-xl mb-8 font-sans text-sm text-zinc-300 leading-relaxed italic">
                &ldquo;Vormir remembers. Something happened on a Windows machine before its memory was captured. The evidence is scattered, and not everything left behind is what it seems. Begin by understanding the memory you&apos;ve been given. Then follow the traces left behind by the expedition. Five artifacts remain. The expedition ends when the final record is found.&rdquo;
              </div>

              {/* STAGE 1 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">1</span>
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 1: When It Happened (Mem-1)
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  The briefing asks for the exact time the machine gave up its secrets. Using <strong>Volatility 3</strong>, the <code className="text-zinc-300 font-mono">windows.info</code> plugin queries the kernel header (<code className="text-zinc-300 font-mono">KUSER_SHARED_DATA.SystemTime</code>):
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Extract Kernel SystemTime</span>
                  <br />
                  <span className="text-emerald-400">vol -f soul.mem windows.info</span>
                  <br />
                  <br />
                  <span className="text-zinc-400">SystemTime : 2026-10-08 05:07:43</span>
                </div>
                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MEM-1 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;2026-10-08 05:07:43&#125;</code>
                  </div>
                  <CopyButton text="OWASP{2026-10-08 05:07:43}" />
                </div>
              </div>

              {/* STAGE 2 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">2</span>
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 2: Soul Hunt (Mem-2)
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Tracing active processes with <code className="text-zinc-300 font-mono">windows.pslist</code> and <code className="text-zinc-300 font-mono">windows.cmdline</code> highlights an anomalous PowerShell process (PID 2580) executing an encoded payload:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Extracted PowerShell Command Line</span>
                  <br />
                  <span className="text-zinc-400">powershell.exe -enc VwBvAHIAbQBpAHIA... -token &quot;SoulHunt_7F31&quot;</span>
                </div>
                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MEM-2 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;SoulHunt_7F31&#125;</code>
                  </div>
                  <CopyButton text="OWASP{SoulHunt_7F31}" />
                </div>
              </div>

              {/* STAGE 3 */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">3</span>
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 3: The Painted Soul (Mem-3 Deep Carve)
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  The briefing hints: <em>&ldquo;easier to remember when seen... maybe the process didn&apos;t resume?&rdquo;</em>.
                  Examining PID 1204 (<code className="text-zinc-300 font-mono">mspaint.exe</code>) with <code className="text-zinc-300 font-mono">windows.vadinfo --dump</code> reveals an active drawing canvas. Dumping VAD region <code className="text-zinc-300 font-mono">0x23840870000-0x23840af4fff</code> (2,641,920 bytes) contains a bottom-up 32bpp DIB canvas painted with a hex sequence:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Carved Hex string rendered on canvas</span>
                  <br />
                  <span className="text-zinc-300">4f574153507b736f756c73746f6e655f7061696e745f3... (incomplete: 45 nibbles)</span>
                  <br />
                  <span className="text-zinc-500"># Missing tail recovered from mspaint UTF-16 text input buffer:</span>
                  <br />
                  <span className="text-emerald-400">Full Hex: 4f574153507b736f756c73746f6e655f7061696e745f353261667d</span>
                  <br />
                  <span className="text-white">Decoded: OWASP&#123;soulstone_paint_52af&#125;</span>
                </div>
                {/* Flag Box */}
                <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">MEM-3 VERIFIED FLAG</span>
                    <code className="text-sm font-mono text-white font-bold">OWASP&#123;soulstone_paint_52af&#125;</code>
                  </div>
                  <CopyButton text="OWASP{soulstone_paint_52af}" />
                </div>
              </div>

              {/* STAGE 4 */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">4</span>
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                    Stage 4: Final Expedition Record
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Carved from the document path <code className="text-zinc-300 font-mono">{"C:\\Users\\nightwatch\\Documents\\Vormir\\expedition.txt"}</code>:
                </p>
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
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 font-bold">
                  ⚠️ Deconstructed Decoys &amp; Honeypots (Do NOT submit)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded-lg">
                    <thead className="bg-zinc-900/90 text-zinc-400">
                      <tr>
                        <th className="p-2.5 border-b border-zinc-800">Fake Flag</th>
                        <th className="p-2.5 border-b border-zinc-800">Location</th>
                        <th className="p-2.5 border-b border-zinc-800">Reason for Rejection</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;soulstone_memory_84c2&#125;</td>
                        <td className="p-2.5">Sacrifice.png + Clipboard HTML</td>
                        <td className="p-2.5 text-zinc-400">The deliberate honeypot; exists as plaintext copyable text</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;soulstone_web_8b2d&#125;</td>
                        <td className="p-2.5">Edge memory buffers</td>
                        <td className="p-2.5 text-zinc-400">Belongs to web challenge decoy</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-red-400">OWASP&#123;pr0c3ss_hunt_7f31&#125;</td>
                        <td className="p-2.5">PowerShell XOR script snippet</td>
                        <td className="p-2.5 text-zinc-400">Decoy script parameter</td>
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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    s0ul.pcap (227 KB)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  02. Sacrifice: PCAP &amp; FTP Stream Exfiltration
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Investigating exfiltrated communication captured inside <code className="text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded font-mono">s0ul.pcap</code> to retrieve the hidden payload transferred between local services.
                </p>
              </div>

              {/* Step 1: PCAP Analysis */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. Packet Stream Reconstruction
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Parsing the 669 packets with <code className="text-zinc-300 font-mono">tshark</code> and Python reveals active TCP communication on loopback (<code className="text-zinc-300 font-mono">127.0.0.1</code>). An automated FTP session logs in as <code className="text-zinc-300 font-mono">vormirkeeper:S0ulK33per2014</code> to a local <code className="text-zinc-300 font-mono">pyftpdlib 2.2.0</code> server:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># FTP Transferred Objects</span>
                  <br />
                  <span className="text-zinc-400">127.0.0.1:37634 &lt;--&gt; 127.0.0.1:45335 (Passive Mode)</span>
                  <br />
                  <span className="text-emerald-400">STOR manifest_final_047.jpg (155,832 bytes)</span>
                  <br />
                  <span className="text-emerald-400">STOR comms.tar (10,240 bytes)</span>
                </div>
              </div>

              {/* Step 2: JPEG & Tar Carving */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  2. File Carving &amp; Base64 Decoding
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Extracting <code className="text-zinc-300 font-mono">manifest_final_047.jpg</code> and inspecting its metadata comment header (<code className="text-zinc-300 font-mono">0xFF 0xFE</code>) reveals an encoded base64 string:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Extracted JPEG Comment Field</span>
                  <br />
                  <span className="text-zinc-400">T1dBU1B7NF81MHUxX2Ywcl80XzUwdTFfdjBybTFyfQ==</span>
                  <br />
                  <span className="text-zinc-500"># Base64 Decode:</span>
                  <br />
                  <span className="text-emerald-400">OWASP&#123;4_50u1_f0r_4_50u1_v0rm1r&#125;</span>
                </div>
              </div>

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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    memory.wav (682 KB)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  03. The Last Memory of Vormir: Audio &amp; XOR
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Recovering the ancient relic left by the Keeper. Reversing audio order, transcribing backward speech, and decrypting appended RIFF cipher data.
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

              {/* Step 1: Audio Reversing */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. Audio Reversal &amp; Speech Transcription
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  The scenario briefing provides explicit cues: <em>&ldquo;What was recorded last may need to be understood first. Beginnings and endings are not bound by the laws of the outside world.&rdquo;</em>
                  Reversing the stereo PCM channel (<code className="text-zinc-300 font-mono">data[::-1]</code>) and passing it to speech transcription yields:
                </p>
                <div className="bg-[#111116] border border-zinc-800 p-4 rounded-xl font-mono text-sm text-emerald-400 font-bold mb-4">
                  &ldquo;The key is sacrifice.&rdquo;
                </div>
              </div>

              {/* Step 2: Carving Trailing RIFF Hex */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  2. Trailing RIFF Payload Carving &amp; XOR Decryption
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Inspecting the WAV header reveals an expected chunk size of 682,062 bytes, whereas the file size is 682,275 bytes. Appended at offset 682,062 is a 213-byte trailing hex payload. Decrypting with repeated-key XOR (<code className="text-zinc-300 font-mono">key = b&quot;sacrifice&quot;</code>):
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Decrypted Keeper Message</span>
                  <br />
                  <span className="text-white">Remember why I remained.</span>
                  <br />
                  <span className="text-emerald-400">Not for the Stone, but for what held me to it.</span>
                </div>
              </div>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">RECOVERED RELIC / FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;sacrifice&#125; / OWASP&#123;ti_ot_em_dleh_tahw&#125;</code>
                </div>
                <CopyButton text="OWASP{sacrifice}" />
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
