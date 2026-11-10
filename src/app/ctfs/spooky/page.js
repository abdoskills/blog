"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";
import FollowMe from "@/components/FollowMe";

function ScreenshotCard({ src, caption, alt = "Evidence Screenshot" }) {
  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-black/60 shadow-xl my-5 group transition-all hover:border-zinc-700">
      <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300 font-bold">{caption}</span>
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 uppercase tracking-wider">
          Evidence Screenshot
        </span>
      </div>
      <div className="p-3 sm:p-4 flex justify-center bg-black/50">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="rounded-xl max-h-[580px] w-auto max-w-full object-contain border border-zinc-800/60 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>
    </div>
  );
}

function CodeBox({ title, code }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] overflow-hidden my-4 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 font-mono text-xs text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
          <span className="text-zinc-300">{title}</span>
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FlagCard({ flag, note }) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/90 to-zinc-900/90 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      <div className="space-y-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Verified Captured Flag
        </span>
        <code className="text-base sm:text-xl font-mono font-bold text-white selection:bg-emerald-500/30">
          {flag}
        </code>
        {note && <p className="text-xs text-zinc-400 font-sans">{note}</p>}
      </div>
      <CopyButton text={flag} />
    </div>
  );
}

export default function SpookyCtfPage() {
  const challenges = [
    {
      id: "peering-eyes",
      num: "01",
      title: "Peering Eyes",
      category: "Memory Forensics",
      points: "1000 PTS",
      badge: "LIME // KERNEL DMA",
      tagline: "Linux LiME Physical Memory & UVC Webcam Carving",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Peering Eyes\\",
      flag: "spooky{th3y_ar3_w2tch1ng}",
      sections: [
        { id: "peering-prompt", title: "Scenario & Prompt" },
        { id: "peering-think", title: "What should u think of ?:" },
        { id: "peering-basics", title: "Understanding LiME & Memory" },
        { id: "peering-work", title: "NOW FOR WORK !!" },
        { id: "peering-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "cleithrophobia",
      num: "02",
      title: "Cleithrophobia",
      category: "Network Traffic Analysis",
      points: "750 PTS",
      badge: "WIRESHARK // TCP STREAM",
      tagline: "Wireshark Protocol Analysis & Custom HTTP Headers",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Cleithrophobia\\",
      flag: "Spooky{Be0m_Me_Up_Sc0tty_2266}",
      sections: [
        { id: "cleith-prompt", title: "Scenario & Prompt" },
        { id: "cleith-port8080", title: "Why http.response.code 200 Showed Nothing" },
        { id: "cleith-work", title: "Now for real work how would i get that flag" },
        { id: "cleith-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "stash-the-hash",
      num: "03",
      title: "Stash the Hash",
      category: "Credential Dumping",
      points: "750 PTS",
      badge: "HASHCAT // LSB STEGO",
      tagline: "SAM Database, Hashcat & LSB Stego",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Stash the Hash\\",
      flag: "spooky{dleeds_isa_devil}",
      sections: [
        { id: "stash-prompt", title: "Scenario & Prompt" },
        { id: "stash-think", title: "WHAT U SHOULD KNOWN" },
        { id: "stash-basics", title: "WE SHOULD KNOW WHAT WE DEAK WITH !" },
        { id: "stash-work", title: "NOW FOR WORK" },
        { id: "stash-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "the-phantom-login",
      num: "04",
      title: "The Phantom Login",
      category: "Windows Log Forensics",
      points: "250 PTS",
      badge: "EVENT 4624 // WEB LOG",
      tagline: "Windows Event ID 4624 & Web Access Logs",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\The Phantom Login\\",
      flag: "spooky{the_ghost_left_a_trace}",
      sections: [
        { id: "phantom-prompt", title: "Scenario & Phantom_Login.zip" },
        { id: "phantom-basics", title: "Understanding Event ID 4624" },
        { id: "phantom-work", title: "FOR REAL WORK !" },
        { id: "phantom-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "tormented-tanny",
      num: "05",
      title: "Tormented Tanny",
      category: "Metadata Forensics",
      points: "484 PTS",
      badge: "TEXT // XMP // EXIF",
      tagline: "PNG Chunks & EXIF Tag Analysis",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Tormented Tanny\\",
      flag: "spooky{tormented_tanner_hates_his_vetsulin}",
      sections: [
        { id: "tanny-prompt", title: "Scenario & Dog Photo" },
        { id: "tanny-basics", title: "Understanding PNG Metadata Anatomy" },
        { id: "tanny-work", title: "NOW FOR WORK (CyberChef)" },
        { id: "tanny-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "the-haunted-portrait",
      num: "06",
      title: "The Haunted Portrait",
      category: "Steganography",
      points: "499 PTS",
      badge: "BLUE PLANE 0 // ROT13",
      tagline: "Blue Plane 0 LSB & ROT13 Cipher",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\The Haunted Portrait\\",
      flag: "spooky{portraits_keep_secrets}",
      sections: [
        { id: "portrait-prompt", title: "Scenario & Clues" },
        { id: "portrait-basics", title: "Understanding Bitplanes & ROT13" },
        { id: "portrait-work", title: "StegSolve & CyberChef ROT13" },
        { id: "portrait-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "arachnophobia",
      num: "07",
      title: "Arachnophobia",
      category: "File Carving",
      points: "500 PTS",
      badge: "POLYGLOT // PKZIP",
      tagline: "Polyglot PNG & Appended ZIP Archive",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Arachnophobia\\",
      flag: "spooky{8_l3gs_4nd_4_z1p}",
      sections: [
        { id: "arachno-prompt", title: "Scenario & Tangled Web" },
        { id: "arachno-basics", title: "Understanding PNG Anatomy & Polyglots" },
        { id: "arachno-work", title: "FOR WORK !! (7-Zip & flag.txt)" },
        { id: "arachno-summary", title: "Summary & Flag" },
      ]
    },
    {
      id: "eisoptrophobia",
      num: "08",
      title: "Eisoptrophobia",
      category: "Steganography",
      points: "50 PTS",
      badge: "ZSTEG // SEQUENTIAL LSB",
      tagline: "Sequential LSB Bit-Unpacking & Base64 Decoding",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Eisoptrophobia\\",
      flag: "spooky{the_reflection_never_lies}",
      sections: [
        { id: "eiso-prompt", title: "Scenario & Mirror Reflection" },
        { id: "eiso-basics", title: "Understanding Sequential LSB & solve.py" },
        { id: "eiso-work", title: "NOW FOR WORK! (Python solver)" },
        { id: "eiso-summary", title: "Summary & Flag" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("peering-eyes");
  const [activeSectionId, setActiveSectionId] = useState("peering-prompt");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const ch of challenges) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChallengeId(ch.id);
            for (const sec of ch.sections) {
              const secEl = document.getElementById(sec.id);
              if (secEl && scrollPosition >= secEl.offsetTop - 50) {
                setActiveSectionId(sec.id);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [challenges]);

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/ctfs" className="hover:text-amber-400 transition-colors">
            CTFs
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">Spooky CTF 2026</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/40 text-xs font-mono font-bold tracking-wider text-amber-400 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>SPOOKY CTF 2026 // MASTER DIGITAL FORENSICS MANUAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-tight leading-tight">
            Spooky CTF 2026: Master Digital Forensics Manual (Zero-Knowledge Detective Edition)
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-3xl font-sans leading-relaxed">
            The complete 8-operation Digital Forensics &amp; Incident Response walkthrough. Written with pure detective reasoning: from first-look prompt analysis, mental triage, anomaly identification, and realistic forensic workflows across Wireshark, StegSolve, CyberChef, HxD, and 7-Zip.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Operations</span>
              <span className="text-white font-bold text-sm sm:text-base">8 Operations</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Captured Flags</span>
              <span className="text-emerald-400 font-bold text-sm sm:text-base">8 / 8 Solved</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Points Solved</span>
              <span className="text-amber-400 font-bold text-sm sm:text-base">4,283 PTS</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Domain</span>
              <span className="text-indigo-400 font-bold text-sm sm:text-base">Pure DFIR</span>
            </div>
          </div>

          {/* Dossier Banner Image */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60">
            <Image
              src="/images/spooky_ctf_banner.jpg"
              alt="Spooky CTF Forensics Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
        </header>

        {/* Two-Column Layout: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-4 font-mono text-xs custom-scrollbar">
            <div className="p-4 rounded-2xl bg-[#0b0b10]/90 border border-zinc-800/80 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                  Operations Index
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">
                  8 Ops
                </span>
              </div>

              <div className="space-y-1">
                {challenges.map((ch) => {
                  const isActive = activeChallengeId === ch.id;
                  return (
                    <div key={ch.id} className="space-y-1">
                      <a
                        href={`#${ch.id}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                        }`}
                      >
                        <span className="truncate">
                          {ch.num}. {ch.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 shrink-0 ml-2">
                          {ch.points}
                        </span>
                      </a>

                      {isActive && (
                        <div className="pl-4 space-y-0.5 border-l border-amber-500/30 ml-3 py-1">
                          {ch.sections.map((sec) => (
                            <a
                              key={sec.id}
                              href={`#${sec.id}`}
                              className={`block px-2 py-1 rounded text-[11px] truncate transition-colors ${
                                activeSectionId === sec.id
                                  ? "text-amber-400 font-bold bg-amber-500/10"
                                  : "text-zinc-400 hover:text-zinc-200"
                              }`}
                            >
                              {sec.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* =========================================================================
                OPERATION 01: PEERING EYES (1000 PTS)
            ========================================================================= */}
            <article id="peering-eyes" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 01 • Memory Forensics
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    1000 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  1. Peering Eyes
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\Peering Eyes\</code></span>
                  <span>•</span>
                  <span>Target: <code className="text-amber-300">spooked2.lime (1 GB)</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{th3y_ar3_w2tch1ng}" />

              {/* Scenario & Prompt */}
              <section id="peering-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When we opens this challenge, we are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;Someone is watching me... taking pictures of me. I managed to capture the physical memory of my machine right as it happened. Can you find out who is watching?&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The File: <code className="text-white">spooked2.lime (exactly 1 GB)</code></span>
                </div>
              </section>

              {/* What should u think of ?: */}
              <section id="peering-think" className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-300 font-mono">
                  What should u think of ?:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: What is a .lime file?</strong>
                    LiME stands for <strong>Linux Memory Extractor</strong>. It is a kernel module used in digital forensics to acquire raw, volatile physical memory (RAM) from a running Linux machine without altering disk state.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: What does &ldquo;taking pictures of me&rdquo; mean on Linux?</strong>
                    To take pictures from a webcam on Linux, software interacts with the Video4Linux2 subsystem (<code>/dev/video0</code>) driven by the <code>uvcvideo</code> USB kernel driver.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 3: How was the spyware written?</strong>
                    Adversaries and CTF authors almost always write rapid surveillance scripts using Python (<code>opencv-python</code> / <code>cv2</code> or <code>pygame</code>).
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 4: Where do the photos live?</strong>
                    Even if the attacker deletes the photos from the hard drive or never writes them to disk at all, the camera hardware streams raw JPEG frames directly into volatile kernel memory buffers via Direct Memory Access (DMA)! Both the Python surveillance script and the raw pictures are still floating inside this 1 GB dump!
                  </li>
                </ul>
              </section>

              {/* Understanding LiME & Linux Memory */}
              <section id="peering-basics" className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                    somethings u should know like basics we will summary it under name (Understanding LiME &amp; Linux Memory)
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                    <li>
                      <strong className="text-white">The Ephemeral Nature of RAM:</strong> When power is cut, RAM vanishes. LiME works by copying every physical memory page sequentially from address <code>0x00000000</code> to the top of RAM into a single raw image file.
                    </li>
                    <li>
                      <strong className="text-white">Python String Structures in RAM (<code>PyUnicodeObject</code>):</strong> When a Python program executes, Python compiles the script into bytecode objects and creates string variables on the process heap. Python strings are stored contiguously in memory as ASCII/UTF-8. Even if an attacker executes code filelessly in memory, string literals like <code>secret = &quot;spooky&#123;...&quot;</code> remain completely intact in physical RAM until overwritten.
                    </li>
                    <li>
                      <strong className="text-white">UVC Video Frame Buffering:</strong> USB Webcams deliver frames using the Motion-JPEG (MJPEG) protocol. Every standard JPEG photo starts with the unique 4-byte magic signature <code>FF D8 FF E0</code> (JFIF standard) or <code>FF D8 FF DB</code> and ends with the End of Image (EOI) marker <code>FF D9</code>. By scanning the 1 GB memory file for these byte boundaries, we can carve out the exact pictures captured by the webcam!
                    </li>
                  </ol>
                </div>
              </section>

              {/* SO NOW U WOULD THINK WHAT SHOULD I DO */}
              <section className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono">
                  SO NOW U WOULD THINK WHAT SHOULD I DO
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  CTF flags always begin with the format string <code>spooky&#123;</code>. Searching for the string <code>spooky&#123;</code> across the 1 GB dump hits physical offset <code>0x227e3290</code>. Inspecting the surrounding memory reveals a carved snippet of the attacker&apos;s surveillance script:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#07070b]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                    Discovered inside Python Process Heap at 0x227e3290
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{`secret = "spooky{th3y_ar3_"
msg = "eye see you"`}</code>
                  </pre>
                </div>

                <p className="text-xs sm:text-sm text-emerald-300 font-mono font-bold">
                  This gives us Part 1 of the flag: <code>spooky&#123;th3y_ar3_</code>
                </p>

                <div className="space-y-2 pt-2">
                  <h5 className="text-xs sm:text-sm font-bold text-zinc-200 font-mono">
                    Step 2: Discovering the Webcam Snapshot
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    Looking further down in the memory dump around the Python process, we observe imports for camera capture libraries (<code>cv2.VideoCapture</code>). The script snapped photos directly from <code>/dev/video0</code>! Scanning physical memory for raw JPEG boundaries (<code>\xFF\xD8\xFF\xE0</code>) discovers 4 valid JPEG frames buffered in kernel video memory around offset <code>0x359ec40</code>.
                  </p>
                </div>
              </section>

              {/* NOW FOR WORK !! */}
              <section id="peering-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  NOW FOR WORK !!
                </h4>

                {/* Step 1 */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Discover the Python Spyware Script &amp; Part 1
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'cd "C:\\CTFS\\spooky ctf\\forensics\\Peering Eyes"; python dump_part1.py'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Directly seeks to physical memory offset <code>0x227e3290</code> to read the Python process heap string literals, bypassing quoting issues in PowerShell.
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400 overflow-x-auto whitespace-pre">
{`Found Python String Literal in RAM:\n-----------------------------------\n  [+] eye see you\n  [+] spooky{th3y_ar3_\n-----------------------------------\nPart 1 Recovered: spooky{th3y_ar3_`}
                    </pre>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110092544.png"
                    caption="Step 1 Evidence Capture // dump_part1.py Output"
                  />
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Carve the Raw Webcam JPEG Frames from Memory
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'cd "C:\\CTFS\\spooky ctf\\forensics\\Peering Eyes"; Get-ChildItem webcam_frames\*.jpg | Select-Object Name, Length'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Lists the four uncompressed JPEG frames carved from the kernel&apos;s UVC DMA memory ring buffers.
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110091551.png"
                    caption="Step 2 Evidence Capture // Carved Webcam JPEG Frames"
                  />
                </div>

                {/* Step 3 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 3: Open the Webcam Photo &amp; Recover Part 2
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'cd "C:\\CTFS\\spooky ctf\\forensics\\Peering Eyes"; Start-Process "webcam_frames\frame_0_0x359ec40.jpg"'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Opens the carved photo in Windows Photos. The image shows the physical webcam view: a subject holding up a handwritten sticky note directly in front of the lens reading <code>w2tch1ng&#125;</code>!
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/frame_0_0x359ec40.jpg"
                    caption="Step 3 Evidence Capture // Webcam Photo frame_0_0x359ec40.jpg (w2tch1ng})"
                  />
                </div>
              </section>

              {/* Summary */}
              <section id="peering-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Part 1 (Memory Heap String):</strong> <code className="text-amber-300">spooky&#123;th3y_ar3_</code></li>
                  <li>• <strong>Part 2 (Webcam Carved Frame):</strong> <code className="text-amber-300">w2tch1ng&#125;</code></li>
                  <li>• <strong>Complete Flag:</strong> <strong className="text-emerald-400">spooky&#123;th3y_ar3_w2tch1ng&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Clue Tie-In:</strong> The prompt whispered <em>&ldquo;someone is watching...&rdquo;</em>. Recombining the RAM heap and the webcam snapshot spells out the creepy truth: <em>&ldquo;they are watching&rdquo;</em>.
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">spooked2.lime (1 GB RAM)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">RAM Offset 0x227e3290</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">UVC Carve frame_0</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;th3y_ar3_w2tch1ng&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 02: CLEITHROPHOBIA (750 PTS)
            ========================================================================= */}
            <article id="cleithrophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 02 • Network Traffic Analysis
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    750 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  2. Cleithrophobia
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\Cleithrophobia\</code></span>
                  <span>•</span>
                  <span>Target: <code className="text-amber-300">Cleithrophobia.pcap</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="Spooky{Be0m_Me_Up_Sc0tty_2266}" />

              {/* Phase 1: Scenario & Prompt */}
              <section id="cleith-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> Phase 1: The First 30 Seconds (The Player&apos;s Mental Triage)
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;The USS Enterprise is trapped in a spatial rift and systems are dead in space. Starfleet crew members attempted emergency ignition over the ship&apos;s local network, but almost all attempts were unauthorized. Recover the bridge telemetry.&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The File: <code className="text-white">Cleithrophobia.pcap (1.4 MB)</code></span>
                </div>

                <h4 className="text-sm font-bold text-amber-300 font-mono pt-2">
                  What goes through the investigator&apos;s mind:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: What does &ldquo;Cleithrophobia&rdquo; mean?</strong>
                    Cleithrophobia is the morbid fear of being trapped or locked in an enclosed space.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: What is a .pcap file?</strong>
                    A PCAP (Packet Capture) file is a recorded capture of network traffic. Our primary investigative tool is <strong>Wireshark</strong>.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 3: How do we triage thousands of packets without getting lost?</strong>
                    The prompt says crew members attempted ignition (<code>/bridge/ignition</code>), but almost all were unauthorized. In web traffic, ignition requests are sent over HTTP.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 4: Where would telemetry keys be stored?</strong>
                    Security-conscious systems and CTF authors frequently exfiltrate credentials out-of-band via custom HTTP response headers (<code>X-*</code>) encoded in Base64! (sometimes)
                  </li>
                </ul>
              </section>

              {/* Port 8080 explanation */}
              <section id="cleith-port8080" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  1. U may ask Why we didn&apos;t try to see when he got and log in for saving time on searching http.response.code == 200 even i tried but it Shows Nothing by Default: WHY !?
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  In network captures, standard HTTP runs on port 80. However, the USS Enterprise bridge server was running on a non-standard alternate port: <strong>TCP Port 8080</strong> (<code>141.112.236.212:8080</code>).
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li>Wireshark dissects the client&apos;s request (<strong>Packet 404</strong>: <code>POST /bridge/ignition HTTP/1.1</code>) as <code>HTTP</code>.</li>
                  <li>But for the server&apos;s immediate reply (<strong>Packet 405</strong>), Wireshark classifies it at the transport layer under protocol <strong><code>TCP</code></strong> (<code>TCP payload (251 bytes)</code>), rather than automatically running the HTTP dissector on it.</li>
                  <li>Because Wireshark tagged Packet 405 as <code>TCP</code> instead of <code>HTTP</code>, the filter <code>http.response.code</code> does <strong>not</strong> evaluate on Packet 405—causing <code>http.response.code == 200</code> to return a nothing!</li>
                </ul>
              </section>

              {/* Real work */}
              <section id="cleith-work" className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                    Now for real work how would i get that flag
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                    first thing u should think of filter not search by luck. we search for attempts for emergency ignition let&apos;s use word &ldquo;log in&rdquo;, so u will see http for requests and what happened.
                  </p>
                </div>

                {/* Step 1 */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Filter for HTTP Traffic or Frame Content
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-300">
                    In Wireshark, filter by: <code>http</code> or <code>frame contains &quot;ignition&quot;</code> for speciefic result but we will use http. We found many http so in CTF it said &ldquo;members attempted emergency ignition&rdquo;.
                  </p>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110101039.png"
                    caption="Step 1 Evidence Capture // Wireshark HTTP Filter & Packet 404"
                  />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    oh nice so Scanning the filtered requests, locate <strong>Packet 404</strong>: <code>POST /bridge/ignition HTTP/1.1</code> (from Captain Kirk&apos;s terminal to <code>bridge.ncc1701.starfleet.local:8080</code>).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Follow TCP Stream 65
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-300">
                    Right-clicking <strong>Packet 404</strong> &rarr; <strong>Follow &rarr; TCP Stream</strong> (or inspecting Packet 405) displays the server&apos;s response:
                  </p>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#07070b]">
                    <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                      TCP Stream 65 Response
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`HTTP/1.1 200 OK\nContent-Type: text/plain\nX-Bridge-Telemetry: deflector_part1=U3Bvb2t5e0JlMA==\nX-Deflector-Status: deflector_part2=bV9NZV9VcF9TYw==\nX-Warp-Core-Reading: deflector_part3=MHR0eV8yMjY2fQ==\n\nIGNITION AUTHORIZED - WARP CORE PREPARING`}
                    </pre>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110100238.png"
                    caption="Step 2 Evidence Capture // Wireshark Follow TCP Stream Window"
                  />
                </div>

                {/* Step 3 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 3: Spotting the Base64 Telemetry Headers
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                    The server returned three custom Starfleet headers:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-xs font-mono text-zinc-300">
                    <li><code>X-Bridge-Telemetry: deflector_part1=U3Bvb2t5e0JlMA==</code></li>
                    <li><code>X-Deflector-Status: deflector_part2=bV9NZV9VcF9TYw==</code></li>
                    <li><code>X-Warp-Core-Reading: deflector_part3=MHR0eV8yMjY2fQ==</code></li>
                  </ol>
                  <p className="text-xs text-zinc-400">Every value ends with <code>==</code> (a classic 4-byte Base64 block)!</p>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 mt-2">
                    <span className="text-xs font-bold text-amber-400 font-mono block">
                      Now Decode the Three Base64 Fragments
                    </span>
                    <p className="text-xs text-zinc-300 font-sans">
                      <strong>CyberChef Human Operator Action:</strong> or use chatgpt ;-;
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-zinc-300 font-sans">
                      <li>Open CyberChef: <code>https://gchq.github.io/CyberChef/</code></li>
                      <li>Drag the <strong>From Base64</strong> recipe into the Recipe pane.</li>
                      <li>Decode each chunk:
                        <ul className="pl-6 space-y-0.5 text-xs font-mono text-emerald-400 mt-1">
                          <li><code>U3Bvb2t5e0JlMA==</code> &rarr; <code>Spooky&#123;Be0</code></li>
                          <li><code>bV9NZV9VcF9TYw==</code> &rarr; <code>m_Me_Up_Sc</code></li>
                          <li><code>MHR0eV8yMjY2fQ==</code> &rarr; <code>0tty_2266&#125;</code></li>
                        </ul>
                      </li>
                    </ol>
                    <p className="text-xs font-mono text-zinc-300 pt-1">
                      so Expected Output: <code className="text-emerald-400 font-bold">Spooky&#123;Be0m_Me_Up_Sc0tty_2266&#125;</code>
                    </p>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section id="cleith-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Part 1:</strong> <code className="text-amber-300">Spooky&#123;Be0</code></li>
                  <li>• <strong>Part 2:</strong> <code className="text-amber-300">m_Me_Up_Sc</code></li>
                  <li>• <strong>Part 3:</strong> <code className="text-amber-300">0tty_2266&#125;</code></li>
                  <li>• <strong>Complete Flag:</strong> <strong className="text-emerald-400">Spooky&#123;Be0m_Me_Up_Sc0tty_2266&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Clue Tie-In:</strong> <em>&ldquo;Beam Me Up Scotty&rdquo;</em> is the most famous catchphrase in sci-fi history (spoken by Captain Kirk to chief engineer Montgomery Scott). <code>2266</code> is the exact year in Star Trek canon when the USS Enterprise began its legendary five-year mission!
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Cleithrophobia.pcap</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Packet 404 &rarr; TCP Stream 65</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">3x Base64 Headers</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">Spooky&#123;Be0m_Me_Up_Sc0tty_2266&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 03: STASH THE HASH (750 PTS)
            ========================================================================= */}
            <article id="stash-the-hash" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 03 • Credential Dumping
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    750 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  3. Stash the Hash
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\Stash the Hash\</code></span>
                  <span>•</span>
                  <span>Target Files: <code className="text-amber-300">UserAccountInfo.txt, secretKnowledgeFolder.7z, flag.png</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{dleeds_isa_devil}" />

              {/* Scenario & Prompt */}
              <section id="stash-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When U opens this challenge, U are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;Daniel Leeds has stashed his most prized secrets in an encrypted vault, but he forgot that his password hash was captured in his account record. Can you recover his secret?&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The Files: <code className="text-white">UserAccountInfo.txt (plaintext account record), secretKnowledgeFolder.7z (encrypted archive)</code></span>
                </div>
              </section>

              {/* WHAT U SHOULD KNOWN */}
              <section id="stash-think" className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-300 font-mono">
                  WHAT U SHOULD KNOWN ( just kidding we are learn)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: What is the attack chain?</strong>
                    This is a classic 2-stage pivot:
                    <ol className="list-decimal list-inside pl-2 pt-1 space-y-0.5">
                      <li>Recover the password hash from <code>UserAccountInfo.txt</code>.</li>
                      <li>Crack the hash to find Daniel&apos;s plaintext password.</li>
                      <li>Unlock <code>secretKnowledgeFolder.7z</code> to extract whatever payload is inside. (next steps u shouldn&apos;t know that only u know (UserAccountInfo.txt is what u should inspect))</li>
                      <li>Perform forensics on the extracted file (<code>flag.png</code>).</li>
                    </ol>
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: Why can&apos;t we see anything in flag.png? (we will got to it later but nvm just know that)</strong>
                    When extracted, <code>flag.png</code> appears to be a regular graphic. The secret is not written in plain sight. In image forensics, secrets are embedded into the <strong>Least Significant Bit (LSB)</strong> of color channels.
                  </li>
                </ul>
              </section>

              {/* WE SHOULD KNOW WHAT WE DEAK WITH ! */}
              <section id="stash-basics" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  WE SHOULD KNOW WHAT WE DEAK WITH !
                </h4>
                <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li>
                    <strong className="text-white">One-Way Hashes &amp; Dictionary Attacks:</strong> Cryptographic hash functions (MD5, NTLM) produce fixed-length digests (32 hex characters). You cannot reverse a hash mathematically. However, humans pick passwords based on favorite sports teams, hobbies, or regional culture. By comparing the hash against billions of known words (the <code>rockyou.txt</code> wordlist) or online databases (CrackStation), we recover the original plaintext password.
                  </li>
                  <li>
                    <strong className="text-white">LSB Bitplane Steganography: ( JUST LET AI DO THIS its boring af)</strong> Every digital color image is made of pixels. Each pixel has three 8-bit color channels: Red, Green, and Blue (values 0 to 255).
                    <ul className="list-disc list-inside pl-4 pt-1 space-y-0.5 text-zinc-400">
                      <li>Bit 7 is the Most Significant Bit (stores overall brightness).</li>
                      <li>Bit 0 is the Least Significant Bit (stores fine noise).</li>
                    </ul>
                    Changing Bit 0 from <code>0</code> to <code>1</code> shifts a color value from 214 to 215—a change of 1/256, which is completely invisible to human vision! Forensic tools like <strong>StegSolve</strong> isolate only Bit 0 across all pixels, converting the invisible bit pattern into a high-contrast black-and-white visual message!
                  </li>
                </ol>
              </section>

              {/* NOW FOR WORK */}
              <section id="stash-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  NOW FOR WORK
                </h4>

                {/* Step 1 */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Read the User Account &amp; Password Hash
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'Get-Content UserAccountInfo.txt'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Displays the user account record: Username <code>dleeds</code> with MD5 hash <code>ad7bcd7ab3cc113f496e1840bc582bbd</code>.
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400 overflow-x-auto whitespace-pre">{`Username: dleeds\nHash: ad7bcd7ab3cc113f496e1840bc582bbd`}</pre>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110092636.png"
                    caption="Step 1 Evidence Capture // UserAccountInfo.txt"
                  />
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Crack the Hash &amp; Display Plaintext Password
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'cd "C:\\..\\Stash the Hash"; Write-Host "Hash: ad7bcd7ab3cc113f496e1840bc582bbd -> Plaintext: newjerseydevils" -ForegroundColor Green'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Looking up the hash on CrackStation reveals the password: <code>newjerseydevils</code>.
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110092701.png"
                    caption="Step 2 Evidence Capture // Cracked Password: newjerseydevils"
                  />
                </div>

                {/* Step 3 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 3: Extract the 7-Zip Vault
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <strong className="text-amber-400 font-mono block">7-Zip Human Operator Action:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Right-click <code>secretKnowledgeFolder.7z</code> &rarr; <strong>7-Zip</strong> &rarr; <strong>Extract Here</strong>.</li>
                      <li>When prompted for the password, enter: <code>newjerseydevils</code></li>
                      <li>Click <strong>OK</strong> to extract <code>flag.png</code>.</li>
                    </ol>
                  </div>
                  <CodeBox
                    title="Terminal Alternative (PowerShell)"
                    code={'& "C:\\Program Files\\7-Zip\\7z.exe" x -pnewjerseydevils "C:\\CTFS\\spooky ctf\\forensics\\Stash the Hash\\secretKnowledgeFolder.7z" -y'}
                  />
                </div>

                {/* Step 4 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 4: Inspect Red Plane 0 in StegSolve (or Generate Visual LSB PNG) ( let ai do it ;-;)
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <strong className="text-amber-400 font-mono block">StegSolve Human Operator Action:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open StegSolve (<code>java -jar stegsolve.jar</code>).</li>
                      <li>Open <code>flag.png</code>.</li>
                      <li>Click the bottom right arrow button <code>&gt;</code> to cycle through planes until you reach <strong>Red plane 0</strong>.</li>
                      <li>Read the white text displayed across the screen: <code>spooky&#123;dleeds_isa_devil&#125;</code>.</li>
                    </ol>
                  </div>
                  <CodeBox
                    title="Terminal Visualizer (Generates lsb_flag.png to view directly)"
                    code={`cd "C:\\CTFS\\spooky ctf\\forensics\\Stash the Hash"; python -c "from PIL import Image; import numpy as np; arr=np.array(Image.open('flag.png')); b=(arr[:,:,0]&1)*255; Image.fromarray(b.astype(np.uint8)).save('lsb_flag.png'); print('Saved lsb_flag.png successfully!')"; Start-Process "lsb_flag.png"`}
                  />
                  <ScreenshotCard
                    src="/images/spooky/flag.png"
                    caption="Step 4 Evidence Capture // flag.png (Red Plane 0 LSB)"
                  />
                </div>
              </section>

              {/* Summary */}
              <section id="stash-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  so summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Password:</strong> <code className="text-amber-300">newjerseydevils</code></li>
                  <li>• <strong>Flag:</strong> <strong className="text-emerald-400">spooky&#123;dleeds_isa_devil&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Clue Tie-In:</strong> In New Jersey folklore, Daniel Leeds was an early colonial figure associated with the Leeds family legend of the &ldquo;Jersey Devil&rdquo; (which also gave New Jersey&apos;s NHL hockey team its name!). Daniel Leeds is indeed a devil!
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">UserAccountInfo.txt</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Hash: newjerseydevils</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">7-Zip &rarr; flag.png</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Red plane 0</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;dleeds_isa_devil&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 04: THE PHANTOM LOGIN (250 PTS)
            ========================================================================= */}
            <article id="the-phantom-login" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 04 • Windows Log Forensics
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    250 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  4. The Phantom Login
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\The Phantom Login\</code></span>
                  <span>•</span>
                  <span>Archive: <code className="text-amber-300">Phantom_Login.zip (4.9 KB)</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{the_ghost_left_a_trace}" />

              {/* Scenario & Prompt */}
              <section id="phantom-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When U open this challenge, U are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;At 3:13 AM on Halloween, an obsolete user account triggered an alarm on the NJIT server. Trace the intruder&apos;s steps across the logs.&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The Archive: <code className="text-white">Phantom_Login.zip</code></span>
                  <div className="pl-4 space-y-0.5 text-xs text-zinc-300 font-sans">
                    <p>Extracting this zip file gives you:</p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400">
                      <li><code>njit_security.csv</code>: Windows security event log exported as a CSV table.</li>
                      <li><code>njit_web.log</code>: Web application access records (this is where the intruder&apos;s web requests and hash are found!).</li>
                      <li><code>case_notes.txt</code>: Background case brief from the NJIT SOC.</li>
                      <li><em>(Note: There is NO .pcap file in this challenge! The web activity was logged directly in <code>njit_web.log</code>)</em>.</li>
                    </ul>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-amber-300 font-mono pt-2">
                  What goes through the investigator&apos;s mind:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: What is the DFIR methodology?</strong>
                    This is a classic incident response correlation task:
                    <ol className="list-decimal list-inside pl-2 pt-1 space-y-0.5">
                      <li>Find WHO logged in and from WHAT IP address in the Windows event record (<code>njit_security.csv</code>).</li>
                      <li>Search for that IP address in the web server log (<code>njit_web.log</code>) to see WHAT actions they performed!</li>
                    </ol>
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: What event ID marks a login?</strong>
                    In Windows Security logs, <strong>Event ID 4624</strong> indicates a successful user logon.
                  </li>
                </ul>
              </section>

              {/* Understanding Event ID 4624 */}
              <section id="phantom-basics" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  U should be Understanding Event ID 4624 &amp; Web Correlation
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li>
                    <strong className="text-white">Windows Logon Auditing:</strong> Every time someone authenticates to Windows, the Local Security Authority Subsystem Service (LSASS) writes Event 4624 into the security log (exported here as <code>njit_security.csv</code>).
                    <ul className="list-disc list-inside pl-4 pt-1 space-y-0.5 text-zinc-400">
                      <li><code>TargetUserName</code>: The username (e.g. <code>evelyn.graves</code>).</li>
                      <li><code>LogonType</code>: How they connected (Logon Type 3 = Network connection).</li>
                      <li><code>IpAddress</code>: The remote IP address (e.g. <code>203.0.113.77</code>).</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-white">Web Access Logs (<code>njit_web.log</code>):</strong> Web servers log every single HTTP request. When a remote attacker browses the web application, their source IP address is stamped on every request:
                    <code className="block mt-1 text-emerald-400 bg-black/40 p-2 rounded">Timestamp src=ClientIP user=Username &quot;METHOD /path?query HTTP/1.1&quot; status=StatusCode</code>
                    Query parameters like <code>?note=...</code> frequently store base64-encoded session tokens or leaked data!
                  </li>
                </ol>
              </section>

              {/* FOR REAL WORK ! */}
              <section id="phantom-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  FOR REAL WORK !
                </h4>

                {/* Step 1 */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Trace the Attacker&apos;s Web Request in Notepad
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <strong className="text-amber-400 font-mono block">Human Operator Action:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open <code>njit_web.log</code> in Notepad: <code>notepad &quot;C:\CTFS\spooky ctf\forensics\The Phantom Login\extracted\njit_web.log&quot;</code></li>
                      <li>When reading through the log entries, notice this suspicious request:
                        <code className="block mt-1 text-emerald-400 bg-black/40 p-2 rounded">GET /archives/export?note=c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9 HTTP/1.1</code>
                      </li>
                    </ol>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110092953.png"
                    caption="Step 1 Evidence Capture // Notepad view of njit_web.log"
                  />
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Decode the Base64 Note Parameter
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <strong className="text-amber-400 font-mono block">Decoder Options:</strong>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Option A (CyberChef / AI):</strong> Paste <code>c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9</code> into CyberChef with the <code>From Base64</code> recipe.</li>
                      <li><strong>Option B (Ready-to-Paste PowerShell):</strong></li>
                    </ul>
                  </div>
                  <CodeBox
                    title="PowerShell Base64 Decoder"
                    code="[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9'))"
                  />
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400">spooky&#123;the_ghost_left_a_trace&#125;</pre>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110093127.png"
                    caption="Step 2 Evidence Capture // Decoded Flag Output"
                  />
                  <p className="text-xs font-mono text-amber-400 font-bold pt-1">
                    THIS WAS EASY AF;-; NEXT!
                  </p>
                </div>
              </section>

              {/* Summary */}
              <section id="phantom-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Username:</strong> <code className="text-amber-300">evelyn.graves</code> (a ghost from the grave!)</li>
                  <li>• <strong>Intrusion Artifact:</strong> <code className="text-zinc-300">c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9</code></li>
                  <li>• <strong>Decoded Flag:</strong> <strong className="text-emerald-400">spooky&#123;the_ghost_left_a_trace&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Clue Tie-In:</strong> The phantom logged in at 3:13 AM on Halloween, but no matter how ghostly the intruder is, the digital audit logs never lie—the ghost left a trace!
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Phantom_Login.zip</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">njit_security.csv (Event 4624)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">njit_web.log in Notepad</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;the_ghost_left_a_trace&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 05: TORMENTED TANNY (484 PTS)
            ========================================================================= */}
            <article id="tormented-tanny" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 05 • Metadata Forensics
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    484 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  5. Tormented Tanny
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\Tormented Tanny\</code></span>
                  <span>•</span>
                  <span>Target File: <code className="text-amber-300">TormentedTanny.png (866 KB)</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{tormented_tanner_hates_his_vetsulin}" />

              {/* Scenario & Prompt */}
              <section id="tanny-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When U open this challenge, U are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;Tanner is furious and tormented! We managed to capture this snapshot of him, but the photographer encrypted the secret across the image&apos;s headers and metadata. Can you find why Tanner is so furious?&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The File: <code className="text-white">TormentedTanny.png (866 KB)</code></span>
                </div>
                <ScreenshotCard
                  src="/images/spooky/TormentedTanny.png"
                  caption="Target Image // TormentedTanny.png"
                />

                <h4 className="text-sm font-bold text-amber-300 font-mono pt-2">
                  What goes through the investigator&apos;s mind:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: Does the image show the secret visually?</strong>
                    Double-clicking <code>TormentedTanny.png</code> opens a portrait photo of an agitated domestic dog named Tanner. There is no text drawn on the image itself.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: What does &ldquo;across the image&apos;s headers and metadata&rdquo; mean?</strong>
                    The author is explicitly telling us that the flag was hidden in the file&apos;s metadata headers.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 3: Why do basic EXIF viewers only find part of the flag?</strong>
                    PNG files do not store metadata in a single place like JPEGs do. PNG files use different chunk types (<code>tEXt</code>, <code>iTXt</code>, <code>eXIf</code>). The author split the flag into three pieces across three different chunk types so that superficial tools miss the full picture!
                  </li>
                </ul>
              </section>

              {/* Understanding PNG Metadata Anatomy */}
              <section id="tanny-basics" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  Understanding PNG Metadata Anatomy
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  PNG files are structured as a series of sequential chunks. Each chunk has a length, a 4-byte chunk type name, data, and a CRC32 checksum:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li><strong><code>tEXt</code> Chunks:</strong> Stores uncompressed ASCII text formatted as <code>keyword\0text</code>. Used for standard attributes like <code>Title</code>, <code>Author</code>, and <code>Software</code>.</li>
                  <li><strong><code>iTXt</code> Chunks:</strong> International text chunks that support UTF-8 and XML data. Adobe Photoshop uses <code>iTXt</code> to embed <strong>XMP (Extensible Metadata Platform)</strong> data structures (<code>XML:com.adobe.xmp</code>).</li>
                  <li><strong><code>eXIf</code> Chunks:</strong> Introduced in modern PNG extensions to store standard TIFF/EXIF tag dictionaries. EXIF Tag <code>0x010E</code> (Decimal 270) represents <code>ImageDescription</code>.</li>
                </ol>
                <p className="text-xs text-zinc-400 pt-1">
                  By scattering the three pieces across these distinct layers, anyone inspecting only standard EXIF or only standard PNG text will only see a fragment!
                </p>
              </section>

              {/* what can we do ? */}
              <section className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono">
                  what can we do ?
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 1: Open in Hex Editor (HxD) or CyberChef Strings</strong>
                    A human analyst opens <code>TormentedTanny.png</code> in <strong>HxD</strong> (or runs CyberChef Strings filter) and searches for the flag prefix <code>spooky</code>:
                    <br />At offset <code>0x000021</code> directly inside the <code>tEXt</code> chunk header: <code>Title: spooky&#123;tormented_tanner_</code> &rarr; <strong>Part 1</strong>!
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 2: Inspecting the XMP XML Metadata</strong>
                    Scrolling down into the <code>iTXt</code> chunk containing Adobe XMP data:
                    <code>&lt;dc:description&gt;&lt;rdf:Alt&gt;&lt;rdf:li xml:lang=&apos;x-default&apos;&gt;hates_his_&lt;/rdf:li&gt;&lt;/rdf:Alt&gt;&lt;/dc:description&gt;</code>
                    <br />The description reads: <code>hates_his_</code> &rarr; <strong>Part 2</strong>!
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 3: Inspecting EXIF Tag 270</strong>
                    Examining the <code>eXIf</code> chunk at tag <code>0x010E</code> (<code>ImageDescription</code>): <code>vetsulin&#125;</code> &rarr; <strong>Part 3</strong>!
                  </div>
                </div>
              </section>

              {/* NOW FOR WORK */}
              <section id="tanny-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  NOW FOR WORK
                </h4>

                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Extract and Assemble the Split Metadata
                  </h5>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs sm:text-sm text-zinc-300">
                    <strong className="text-amber-400 font-mono block">CyberChef Step-by-Step Operator Action (Click-by-Click):</strong>
                    <ol className="list-decimal list-inside space-y-1.5 pl-1">
                      <li>Open CyberChef in your web browser: <code>https://gchq.github.io/CyberChef/</code></li>
                      <li><strong>Load the Image into Input:</strong> Open File Explorer to <code>C:\CTFS\spooky ctf\forensics\Tormented Tanny\</code> and drag <code>TormentedTanny.png</code> directly into the large white <strong>Input</strong> pane.</li>
                      <li><strong>Add the Strings Recipe:</strong> In the top-left search box under <strong>Operations</strong>, type <code>Strings</code>. Double-click on <strong>Strings</strong> to move it into the middle <strong>Recipe</strong> pane.</li>
                      <li><strong>Find the Three Flag Pieces in the Output:</strong> Click inside the Output box, press <code>Ctrl + F</code>, and type <code>spooky</code>:</li>
                    </ol>
                    <pre className="p-3 bg-black/60 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed mt-2">
{`tEXtTitle\nspooky{tormented_tanner_                             <-- Part 1 (Title Chunk)\n <rdf:Description rdf:about=''\n  <dc:description>\n    <rdf:li xml:lang='x-default'>hates_his_</rdf:li>   <-- Part 2 (XMP Description Chunk)\n  </dc:description>\n </rdf:Description>\nvetsulin}                                            <-- Part 3 (EXIF Tag 270 ImageDescription)`}
                    </pre>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Fast Notepad++ / HxD Alternative (5 Seconds):</strong>
                    <p className="mt-1">Right-click <code>TormentedTanny.png</code> &rarr; <strong>Edit with Notepad++</strong> (or open in <strong>HxD</strong>), press <code>Ctrl + F</code>, search <code>spooky</code>, and read all 3 lines directly!</p>
                  </div>

                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110135650.png"
                    caption="Step 1 Evidence Capture // Notepad++ / HxD String Search"
                  />

                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={`cd "C:\\CTFS\\spooky ctf\\forensics\\Tormented Tanny"; python -c "from PIL import Image; img=Image.open('TormentedTanny.png'); print('Part 1 (Title Chunk)     :', img.info['Title']); print('Part 2 (XMP Description) :', 'hates_his_'); print('Part 3 (EXIF Tag 270)    :', img.getexif()[270]); print('--------------------------------------------------'); print('Assembled Complete Flag  :', img.info['Title'] + 'hates_his_' + img.getexif()[270])"`}
                  />

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400 overflow-x-auto whitespace-pre">
{`Part 1 (Title Chunk)     : spooky{tormented_tanner_\nPart 2 (XMP Description) : hates_his_\nPart 3 (EXIF Tag 270)    : vetsulin}\n--------------------------------------------------\nAssembled Complete Flag  : spooky{tormented_tanner_hates_his_vetsulin}`}
                    </pre>
                  </div>

                  <p className="text-xs font-mono text-amber-400 font-bold pt-1">
                    easy right? ;-;
                  </p>
                </div>
              </section>

              {/* Summary */}
              <section id="tanny-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  Phase 5: Reassembling the Flag &amp; Witty Clue Resolution
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Part 1 (tEXt Title):</strong> <code className="text-amber-300">spooky&#123;tormented_tanner_</code></li>
                  <li>• <strong>Part 2 (iTXt XMP Description):</strong> <code className="text-amber-300">hates_his_</code></li>
                  <li>• <strong>Part 3 (eXIf ImageDescription):</strong> <code className="text-amber-300">vetsulin&#125;</code></li>
                  <li>• <strong>Complete Flag:</strong> <strong className="text-emerald-400">spooky&#123;tormented_tanner_hates_his_vetsulin&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Witty Clue Resolution:</strong> What is <em>Vetsulin</em>? Vetsulin is veterinary porcine insulin used to treat diabetes in domestic pets (dogs and cats)! Tanner had canine diabetes and was tormented every day by having to get his insulin shots!
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">TormentedTanny.png (866 KB)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">tEXt Title Chunk</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">iTXt XMP XML</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">eXIf Tag 270</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;tormented_tanner_hates_his_vetsulin&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 06: THE HAUNTED PORTRAIT (499 PTS)
            ========================================================================= */}
            <article id="the-haunted-portrait" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 06 • Steganography
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    499 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  6. The Haunted Portrait
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\The Haunted Portrait\</code></span>
                  <span>•</span>
                  <span>Target File: <code className="text-amber-300">portrait.png (1.2 MB)</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{portraits_keep_secrets}" />

              {/* Scenario & Prompt */}
              <section id="portrait-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When U open this challenge, U are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;An eerie Victorian portrait hangs in the hallway. Guests whisper that the spirits inside communicate through ancient ciphers. The dead speak in ROT13.&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The File: <code className="text-white">portrait.png (1.2 MB)</code></span>
                </div>

                <h4 className="text-sm font-bold text-amber-300 font-mono pt-2">
                  What should be on your mind:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: What is the biggest clue in the prompt?</strong>
                    <em>&ldquo;The dead speak in ROT13&rdquo;</em>. The author explicitly tells us that whatever secret text we uncover will be encoded using the ROT13 substitution cipher!
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: Does the file have hidden archives or metadata?</strong>
                    Checking the file in HxD shows no appended ZIP archives (ends at <code>IEND</code>), and <code>exiftool</code> reveals no hidden metadata strings.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 3: Where is the secret hiding?</strong>
                    When text is not in metadata or appended to the file, it is embedded visually into the <strong>bitplanes</strong> of the image. The tool of choice for every human steganographer is <strong>StegSolve</strong>!
                  </li>
                </ul>
              </section>

              {/* Understanding Bitplanes & ROT13 */}
              <section id="portrait-basics" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  Understanding Bitplanes &amp; ROT13 ( LET AI SOLVE THIS &lt;3)
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li>
                    <strong className="text-white">Bitplane Isolation:</strong> In a 24-bit RGB image, every pixel is composed of 8 bits of Red, 8 bits of Green, and 8 bits of Blue.
                    Bit 7 has a numerical weight of 128 (significant visual impact), while Bit 0 has a numerical weight of 1 (imperceptible visual impact). When an author uses Bit 0 to paint text, normal image viewers blend all 24 bits together, rendering the text invisible. But when StegSolve extracts Bit 0 of the Blue channel in isolation, every bit becomes either pure white (<code>1</code>) or pure black (<code>0</code>), making the hidden letters immediately readable.
                  </li>
                  <li>
                    <strong className="text-white">The ROT13 Cipher:</strong> ROT13 is a simple Caesar cipher that shifts every alphabetical character 13 places forward in the alphabet (A &harr; N, B &harr; O, etc.). Because the alphabet has 26 letters, applying ROT13 a second time restores the original plaintext.
                  </li>
                </ol>
              </section>

              {/* hAAAAA '-' i hate png challenges */}
              <section className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono">
                  hAAAAA &apos;-&apos; i hate png challenges
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 1: Open portrait.png in StegSolve</strong>
                    Opening <code>portrait.png</code> in StegSolve and clicking the <code>&lt;</code> / <code>&gt;</code> arrow buttons to cycle through the bitplanes:
                    <ul className="list-disc list-inside pl-2 text-zinc-400 text-xs">
                      <li>Red planes (7 down to 0) show only random static.</li>
                      <li>Green planes (7 down to 0) show random static.</li>
                      <li>Cycling to <strong>Blue plane 0</strong>: Across the canvas, high-contrast black-and-white letters emerge: <code>fcbbxl&#123;cbegenvgf_xrrc_frpergf&#125;</code></li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 2: Recognizing the Flag Signature</strong>
                    Notice the character structure: <code>fcbbxl&#123;...&#125;</code> matches the exact length and shape of <code>spooky</code>:
                    f shifted by 13 &rarr; s, c shifted by 13 &rarr; p, b shifted by 13 &rarr; o, b shifted by 13 &rarr; o, x shifted by 13 &rarr; k, l shifted by 13 &rarr; y. It is pure ROT13!
                  </div>
                </div>
              </section>

              {/* explained more here ;-; */}
              <section id="portrait-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  explained more here ;-;
                </h4>

                {/* Step 1 */}
                <div className="space-y-2">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Inspect Blue Plane 0 in StegSolve
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono block">StegSolve Human Operator Action:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open StegSolve (<code>java -jar stegsolve.jar</code>).</li>
                      <li>Open <code>portrait.png</code>.</li>
                      <li>Click the bottom right arrow <code>&gt;</code> until you reach <strong>Blue plane 0</strong>.</li>
                      <li>Read the text on screen: <code>fcbbxl&#123;cbegenvgf_xrrc_frpergf&#125;</code>.</li>
                    </ol>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Decode ROT13 in CyberChef or Terminal
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                    <strong className="text-amber-400 font-mono block">CyberChef Human Operator Action:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open CyberChef: <code>https://gchq.github.io/CyberChef/</code></li>
                      <li>Paste the input: <code>fcbbxl&#123;cbegenvgf_xrrc_frpergf&#125;</code></li>
                      <li>Add the recipe: <strong>ROT13</strong> (Amount: 13).</li>
                      <li>Decoded Output: <code className="text-emerald-400 font-bold">spooky&#123;portraits_keep_secrets&#125;</code>.</li>
                    </ol>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110144820.png"
                    caption="Step 2 Evidence Capture // CyberChef ROT13 Decoded Flag"
                  />
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell) ( WAS AI )"
                    code={`cd "C:\\CTFS\\spooky ctf\\forensics\\The Haunted Portrait"; python -c "import codecs; cipher='fcbbxl{cbegenvgf_xrrc_frpergf}'; print('Blue Plane 0 Ciphertext :', cipher); print('Decoded Plaintext Flag  :', codecs.decode(cipher, 'rot_13'))"`}
                  />
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400 overflow-x-auto whitespace-pre">
{`Blue Plane 0 Ciphertext : fcbbxl{cbegenvgf_xrrc_frpergf}\nDecoded Plaintext Flag  : spooky{portraits_keep_secrets}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section id="portrait-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Ciphertext (Blue Plane 0):</strong> <code className="text-amber-300">fcbbxl&#123;cbegenvgf_xrrc_frpergf&#125;</code></li>
                  <li>• <strong>Decoded Flag:</strong> <strong className="text-emerald-400">spooky&#123;portraits_keep_secrets&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Clue Tie-In:</strong> The prompt whispered that <em>&ldquo;the dead speak in ROT13&rdquo;</em>, and the message on Blue Plane 0 confirmed the truth: <em>&ldquo;portraits keep secrets&rdquo;</em>.
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">portrait.png (1.2 MB)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">StegSolve Blue plane 0</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">ROT13 Decoder</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;portraits_keep_secrets&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 07: ARACHNOPHOBIA (500 PTS)
            ========================================================================= */}
            <article id="arachnophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 07 • File Carving
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    500 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  7. Arachnophobia
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\Arachnophobia\</code></span>
                  <span>•</span>
                  <span>Target File: <code className="text-amber-300">tangled.png (955 KB)</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{8_l3gs_4nd_4_z1p}" />

              <ScreenshotCard
                src="/images/spooky/tangled.png"
                caption="Target Image // tangled.png"
              />

              {/* Scenario & Prompt */}
              <section id="arachno-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When U investigator opens this challenge, U are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;Spiders have woven something intricate inside this web. It looks like an ordinary picture of a spider, but can you untangle what is trapped inside?&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The File: <code className="text-white">tangled.png (955 KB)</code></span>
                </div>

                <h4 className="text-sm font-bold text-amber-300 font-mono pt-2">
                  What should goes through your mind: (i hope)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: Does the image look weird?</strong>
                    Double-clicking <code>tangled.png</code> opens a standard picture of a spider in a web. No visible text, no hidden writing in the dark areas.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: What do the prompt words mean?</strong>
                    The words <em>&ldquo;tangled&rdquo;</em> and <em>&ldquo;trapped inside the web&rdquo;</em> indicate that something foreign was embedded into the file.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 3: What is the file size?</strong>
                    An 800x600 digital drawing of a spider should typically be around 200–400 KB. At nearly 1 MB, the file is heavier than expected. In CTF forensics, extra weight almost always means <strong>trailing data appended after the end of the image</strong>.
                  </li>
                </ul>
              </section>

              {/* Understanding PNG Anatomy & Polyglots */}
              <section id="arachno-basics" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  Understanding PNG Anatomy &amp; Polyglots
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li><strong>PNG Chunks &amp; The <code>IEND</code> Marker:</strong> Every valid PNG starts with the 8 magic bytes <code>89 50 4E 47 0D 0A 1A 0A</code> (<code>.PNG....</code>) and officially terminates with a 12-byte chunk called <strong><code>IEND</code></strong>: <code>00 00 00 00 49 45 4E 44 AE 42 60 82</code>.</li>
                  <li><strong>The Golden Rule of Image Viewers:</strong> When Windows Photos or a web browser reads a PNG, the moment it encounters <code>IEND</code>, <strong>it stops reading</strong>. Even if you append a 500 MB video or a <code>.zip</code> archive directly after <code>IEND</code>, the image still opens completely normally!</li>
                  <li><strong>Appended Archive Polyglots:</strong> ZIP archives begin with the magic bytes <code>50 4B 03 04</code> (<code>PK..</code>). Archivers like 7-Zip scan files for this signature regardless of where it appears in the file.</li>
                </ol>
              </section>

              {/* now whole idea is 0-0 */}
              <section className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono">
                  now whole idea is 0-0
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 1: Check the End of the File in HxD (Hex Editor)</strong>
                    Opening <code>tangled.png</code> in a Hex Editor (<strong>HxD</strong>) and pressing <code>Ctrl + End</code> to jump to the very bottom:
                    <pre className="p-3 bg-black/60 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed mt-2">
{`Offset       00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F   Decoded Text\n-----------------------------------------------------------------------------\n000EE800:   00 00 00 00 49 45 4E 44  AE 42 60 82 50 4B 03 04   ....IEND.B\`.PK..\n000EE810:   14 00 08 00 08 00 A4 9A  4E 5D 00 00 00 00 00 00   ........N]......\n000EE820:   00 00 00 00 00 00 08 00  20 00 66 6C 61 67 2E 74   ........ .flag.t\n000EE830:   78 74 75 78 0B 00 01 04  00 00 00 00 04 00 00 00   xtux............`}
                    </pre>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">The &ldquo;Aha!&rdquo; Discovery Moment:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>At offset <code>0x000EE804</code>: <code>49 45 4E 44</code> &rarr; <strong><code>IEND</code></strong>. The PNG officially ended right here!</li>
                      <li>At offset <code>0x000EE80C</code>: <strong><code>50 4B 03 04</code></strong> &rarr; <strong><code>PK..</code></strong>. The universal magic signature of a <strong>PKZip archive</strong>!</li>
                      <li>At offset <code>0x000EE82A</code>: the filename <strong><code>flag.txt</code></strong> is visible in plain ASCII text.</li>
                    </ol>
                    <p className="text-xs text-amber-300 font-mono pt-1">A complete ZIP file containing flag.txt is glued to the back of this PNG! MAGIC!!!! i got bored</p>
                  </div>
                </div>
              </section>

              {/* FOR WORK !! ( i hope u still here its boring af) */}
              <section id="arachno-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  FOR WORK !! ( i hope u still here its boring af)
                </h4>

                {/* Step 1 */}
                <div className="space-y-2">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Extract the Appended Archive
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono block">Method A: The GUI Approach (7-Zip):</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Right-click <code>tangled.png</code>.</li>
                      <li>Hover over <strong>7-Zip</strong> &rarr; click <strong>Open archive</strong>.</li>
                      <li>7-Zip jumps directly to the <code>PK</code> bytes at offset <code>0xEE80C</code> and displays <code>flag.txt</code>.</li>
                      <li>Drag <code>flag.txt</code> out into the folder.</li>
                    </ol>
                  </div>
                  <CodeBox
                    title="Method B: Terminal Extraction (CLI)"
                    code={'cd "C:\\..\\Arachnophobia"; & "C:\\Program Files\\7-Zip\\7z.exe" e -y tangled.png'}
                  />
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Read the Carved flag.txt
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'cd "C:\\CTFS\\spooky ctf\\forensics\\Arachnophobia"; Get-Content flag.txt'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Displays the contents of <code>flag.txt</code> extracted from the polyglot file.
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400">spooky&#123;8_l3gs_4nd_4_z1p&#125;</pre>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110145352.png"
                    caption="Step 2 Evidence Capture // Extracted flag.txt"
                  />
                </div>
              </section>

              {/* Summary */}
              <section id="arachno-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Flag:</strong> <strong className="text-emerald-400">spooky&#123;8_l3gs_4nd_4_z1p&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Witty Clue Resolution:</strong> Spiders have <strong>8 legs</strong>. The challenge was a <strong>PNG + a ZIP</strong>. Flag: <code>8_l3gs_4nd_4_z1p</code> (<em>&ldquo;8 legs and a zip&rdquo;</em>).
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">tangled.png (955 KB)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Locate IEND chunk</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">PKZip magic bytes (50 4B 03 04)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">7-Zip &rarr; flag.txt</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;8_l3gs_4nd_4_z1p&#125;</span>
                  </div>
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 08: EISOPTROPHOBIA (50 PTS)
            ========================================================================= */}
            <article id="eisoptrophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 08 • Steganography
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono text-xs font-bold">
                    50 PTS
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  8. Eisoptrophobia
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Folder: <code className="text-zinc-300">C:\CTFS\spooky ctf\forensics\Eisoptrophobia\</code></span>
                  <span>•</span>
                  <span>Target Files: <code className="text-amber-300">Eisoptrophobiactf.png, solve.py</code></span>
                </div>
              </div>

              {/* Flag Banner */}
              <FlagCard flag="spooky{the_reflection_never_lies}" />

              {/* Scenario & Prompt */}
              <section id="eiso-prompt" className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">#</span> When U open this challenge, U are given:
                </h3>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">1. The Prompt:</span>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    &ldquo;Eisoptrophobia is the morbid fear of mirrors and reflections. Look closely into the glass... the pixels reflect a hidden message.&rdquo;
                  </p>
                  <span className="text-xs font-mono font-bold text-zinc-400 block pt-1">2. The File: <code className="text-white">Eisoptrophobiactf.png (400x400 image)</code></span>
                </div>

                <h4 className="text-sm font-bold text-amber-300 font-mono pt-2">
                  What should goes through your mind:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 1: Does the image have appended data or weird metadata?</strong>
                    Opening in HxD shows the file cleanly ends at <code>IEND</code>. <code>exiftool</code> reveals standard headers with no extra fields.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 2: Does StegSolve show text on any visual bitplane?</strong>
                    Cycling through StegSolve planes shows subtle pixel noise, but <strong>no readable letters</strong> drawn on any plane.
                  </li>
                  <li className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                    <strong className="text-white block font-mono text-xs mb-1">• Question 3: Why is no text drawn visually?</strong>
                    Because this is <strong>Sequential Data Steganography</strong>, not Visual Steganography! The author did not draw a picture of the flag; they converted the flag characters into binary bits and embedded them sequentially into the Least Significant Bits of the pixel stream (<code>b1,rgb,lsb,xy</code>).
                  </li>
                </ul>
              </section>

              {/* Understanding Sequential LSB & The solve.py Architecture */}
              <section id="eiso-basics" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold font-mono text-amber-400 uppercase tracking-wider">
                  Understanding Sequential LSB &amp; The solve.py Architecture (solve.py is code i did for solve this ;-; )
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <li>
                    <strong className="text-white">How Sequential LSB Embedding Works:</strong> Every ASCII character is 8 bits (1 byte). For example, <code>&apos;s&apos;</code> is ASCII 115 = <code>01110011</code>. Each pixel contains 3 color bytes: Red, Green, and Blue. The embedder replaces Bit 0 of each color channel with one bit of the message:
                    <ul className="list-disc list-inside pl-4 pt-1 space-y-0.5 text-zinc-400">
                      <li>Pixel 1: Red bit 0 = bit 0, Green bit 0 = bit 1, Blue bit 0 = bit 2</li>
                      <li>Pixel 2: Red bit 0 = bit 3, Green bit 0 = bit 4, Blue bit 0 = bit 5</li>
                      <li>Pixel 3: Red bit 0 = bit 6, Green bit 0 = bit 7 (Complete byte assembled!)</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-white">The Industry-Standard Format (<code>b1,rgb,lsb,xy</code>):</strong>
                    <ul className="list-disc list-inside pl-4 pt-1 space-y-0.5 text-zinc-400">
                      <li><code>b1</code>: 1 bit per color channel.</li>
                      <li><code>rgb</code>: Channels read in order: Red &rarr; Green &rarr; Blue.</li>
                      <li><code>lsb</code>: Least Significant Bit of the byte read first.</li>
                      <li><code>xy</code>: Pixels scanned in row-major order (top-to-bottom, left-to-right).</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-white">Explaining solve.py Line-by-Line (Zero-Knowledge):</strong>
                    <pre className="p-3 bg-black/60 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed mt-2">
{`# 1. Load image into a NumPy array of shape (Height, Width, 3 channels)\narr = np.array(Image.open(img_path))\n\n# 2. Extract bit 0 across R, G, B channels using bitwise AND (& 1), then flatten into a 1D bitstream\nbits = (arr[:, :, [0, 1, 2]] & 1).flatten()\n\n# 3. Truncate to a multiple of 8 and reshape into groups of 8 bits (1 byte each)\nn = (len(bits) // 8) * 8\nb = bits[:n].reshape(-1, 8)\n\n# 4. Pack the 8 bits MSB-first by multiplying against binary weights [128, 64, 32, 16, 8, 4, 2, 1]\nweights = 1 << np.arange(7, -1, -1)\ndata = np.dot(b, weights).astype(np.uint8).tobytes()\n\n# 5. The payload is null-terminated (\x00). Extract the Base64 string and decode it!\nb64_str = data.split(b'\x00')[0].decode('ascii')\nflag = base64.b64decode(b64_str).decode('utf-8')`}
                    </pre>
                  </li>
                </ol>
              </section>

              {/* so the idea is */}
              <section className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono">
                  so the idea is
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 1: The zsteg Discovery</strong>
                    If an investigator runs the industry-standard steganography analysis tool <code>zsteg</code> on the image:
                    <pre className="p-2 bg-black/60 rounded text-emerald-400 font-mono text-xs mt-1">zsteg Eisoptrophobiactf.png</pre>
                    <code>zsteg</code> immediately spits out: <code>b1,rgb,lsb,xy .. text: &quot;c3Bvb2t5e3RoZV9yZWZsZWN0aW9uX25ldmVyX2xpZXN9&quot;</code>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1">
                    <strong className="text-white font-mono block">Step 2: The Base64 Signature</strong>
                    The extracted string is <code>c3Bvb2t5e3RoZV9yZWZsZWN0aW9uX25ldmVyX2xpZXN9</code>. Every seasoned CTF player recognizes the prefix <code>c3Bvb2t5</code>: In Base64 encoding, the word <code>spooky</code> encodes to <code>c3Bvb2t5</code>. This guarantees that decoding this Base64 payload will yield the flag!
                  </div>
                </div>
              </section>

              {/* NOW FOR WORK! */}
              <section id="eiso-work" className="space-y-6">
                <h4 className="text-base sm:text-lg font-bold text-emerald-400 font-mono border-b border-zinc-800 pb-2">
                  NOW FOR WORK!
                </h4>

                {/* Step 1 */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 1: Run the Standalone Python Solver
                  </h5>
                  <CodeBox
                    title="Ready-to-Paste Terminal Command (PowerShell)"
                    code={'cd "C:\\CTFS\\spooky ctf\\forensics\\Eisoptrophobia"; python solve.py'}
                  />
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono">Why That Will Be:</strong> Executes <code>solve.py</code> to unpack the row-order LSB bits, isolate the null-terminated Base64 string, and decode it into plaintext.
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                    <span className="text-zinc-500 font-bold block uppercase">Expected Output:</span>
                    <pre className="text-emerald-400">Flag: spooky&#123;the_reflection_never_lies&#125;</pre>
                  </div>
                  <ScreenshotCard
                    src="/images/spooky/Pasted_image_20261110145726.png"
                    caption="Step 1 Evidence Capture // python solve.py Output"
                  />
                </div>

                {/* Step 2 */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/60">
                  <h5 className="text-sm font-bold text-white font-mono">
                    Step 2: Manual CyberChef Verification
                  </h5>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                    <strong className="text-amber-400 font-mono block">CyberChef Human Operator Action:</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open CyberChef: <code>https://gchq.github.io/CyberChef/</code></li>
                      <li>Input: <code>c3Bvb2t5e3RoZV9yZWZsZWN0aW9uX25ldmVyX2xpZXN9</code></li>
                      <li>Recipe: <strong>From Base64</strong></li>
                      <li>Output: <code className="text-emerald-400 font-bold">spooky&#123;the_reflection_never_lies&#125;</code></li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section id="eiso-summary" className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                  summary
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
                  <li>• <strong>Extracted Base64 Payload:</strong> <code className="text-zinc-300">c3Bvb2t5e3RoZV9yZWZsZWN0aW9uX25ldmVyX2xpZXN9</code></li>
                  <li>• <strong>Decoded Flag:</strong> <strong className="text-emerald-400">spooky&#123;the_reflection_never_lies&#125;</strong></li>
                  <li className="font-sans text-zinc-400 pt-1">
                    • <strong>The Clue Tie-In:</strong> Eisoptrophobia is the fear of mirrors and reflections. Looking deep into the pixel reflections proved that <em>&ldquo;the reflection never lies&rdquo;</em>.
                  </li>
                </ul>

                {/* Flowchart */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Tactical Flow Map</span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Eisoptrophobiactf.png (400x400)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Sequential LSB (b1,rgb,lsb,xy)</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">Null-terminated Base64 string</span>
                    <span className="text-amber-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700">From Base64</span>
                    <span className="text-emerald-400">&rarr;</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">spooky&#123;the_reflection_never_lies&#125;</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900/60 to-emerald-500/10 border border-amber-500/30 text-center font-mono text-xs sm:text-sm text-amber-300 font-bold pt-3 pb-3 mt-4">
                  THANKS for reading hope u like it  &lt;3
                </div>
              </section>
            </article>

          </div>
        </div>

        {/* Global Footer & Socials */}
        <div className="mt-20 pt-12 border-t border-zinc-800">
          <FollowMe />
        </div>

      </main>
    </div>
  );
}
