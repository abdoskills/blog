"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";

export default function DeadfacePage() {
  const challenges = [
    {
      id: "bad-guys-be-bad",
      num: "01",
      title: "Bad Guys Be Bad",
      category: "Traffic Analysis",
      points: "100 PTS",
      badge: "PCAP // HTTP & DNS",
      tagline: "HTTP Staging Config & Sequential DNS Base32 Smuggling",
      folder: "C:\\CTFS\\DEAD FACE CTF\\1\\",
      downloadFile: "/files/deadface/deadface_pcap02.pcap",
      downloadFileName: "deadface_pcap02.pcap (63.2 KB)",
      sections: [
        { id: "badguys-staging", title: "1. HTTP Staging & Sp00ky XOR Key", tag: "GET /staging.bin" },
        { id: "badguys-dns", title: "2. Exfiltrated DNS Base32 Chunks", tag: "s00-s04" },
        { id: "badguys-flag", title: "3. CyberChef Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "data-go-brrrrr",
      num: "02",
      title: "Data Go Brrrrr",
      category: "Covert Exfiltration",
      points: "150 PTS",
      badge: "ICMP // HEX PAYLOAD",
      tagline: "Sequential Base64 Data Smuggled Inside Ping Payloads",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Data Go Brrrrr\\",
      downloadFile: "/files/deadface/PCAP01.pcap",
      downloadFileName: "PCAP01.pcap (2.9 KB)",
      sections: [
        { id: "datago-icmp", title: "1. ICMP Traffic Anomaly", tag: "Echo 50 bytes" },
        { id: "datago-payload", title: "2. Base64 Chunk Extraction", tag: "Packets 13-27" },
        { id: "datago-flag", title: "3. CyberChef Flag Decode", tag: "Flag" },
      ]
    },
    {
      id: "dont-leave-me-hanging",
      num: "03",
      title: "Don't Leave Me Hanging",
      category: "VoIP & Audio Forensics",
      points: "250 PTS",
      badge: "VOIP // DTMF INBAND",
      tagline: "SRTP Decryption & In-Band Audio DTMF Frequency FFT Analysis",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Don't Leave Me Hanging\\",
      downloadFile: "/files/deadface/pbx-diag-20261008.tar.gz",
      downloadFileName: "pbx-diag-20261008.tar.gz (8.4 KB)",
      extraFiles: [
        { name: "call_in.wav (397 KB)", url: "/files/deadface/call_in.wav" },
        { name: "call_out.wav (397 KB)", url: "/files/deadface/call_out.wav" },
        { name: "accurate_dtmf.py (2.2 KB)", url: "/files/deadface/accurate_dtmf.py" },
      ],
      sections: [
        { id: "dontleave-ftp", title: "1. PBX Diag via FTP & In-Band Anomaly", tag: "RFC 4733" },
        { id: "dontleave-srtp", title: "2. SRTP Stream Decryption", tag: "AES_CM_128" },
        { id: "dontleave-dtmf", title: "3. DTMF Audio FFT Script & Flag", tag: "Flag" },
      ]
    },
    {
      id: "pirates-life-part-1",
      num: "04",
      title: "A Pirate's Life for Me Part 1",
      category: "Web Traffic Forensics",
      points: "200 PTS",
      badge: "HTTP // HEADERS",
      tagline: "Mobile Tracking Headers Hidden in Sunstalker Browser Requests",
      folder: "C:\\CTFS\\DEAD FACE CTF\\A Pirate's Life for Me Part 1\\",
      downloadFile: "/files/deadface/pirateslife.pcap",
      downloadFileName: "pirateslife.pcap (Large Network Capture)",
      sections: [
        { id: "pirate-discovery", title: "1. Flag Prefix & User-Agent Discovery", tag: "Sunstalker" },
        { id: "pirate-parts", title: "2. Streams 97, 169 & 224 Header Carving", tag: "X-Trace Headers" },
        { id: "pirate-flag", title: "3. 3-Part Flag Assembly", tag: "Flag" },
      ]
    },
    {
      id: "who-goes-there",
      num: "05",
      title: "Who Goes There? (Parts 1, 2, 3)",
      category: "Memory Forensics",
      points: "400 PTS",
      badge: "VOLATILITY 3 // MEMORY",
      tagline: "Windows Memory Dump: Compromised User, Hostname & C2 Socket",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Who Goes There\\",
      downloadInfo: "memory.raw (8.58 GB) / memory.7z (1.34 GB) - Windows Kernel Memory",
      sections: [
        { id: "whogoes-user", title: "Part 1: Compromised User Account", tag: "nkessler" },
        { id: "whogoes-host", title: "Part 2: Workstation Hostname", tag: "DESKTOP-8K4N19S" },
        { id: "whogoes-socket", title: "Part 3: Attacker C2 Socket", tag: "167.172.132.224_4815_30" },
      ]
    },
    {
      id: "hooked",
      num: "06",
      title: "Hooked",
      category: "Browser Forensics",
      points: "200 PTS",
      badge: "CHROME // SQLITE 3",
      tagline: "Investigating Spearphishing Lure & Click Chain in Chrome History",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Hooked\\",
      downloadFile: "/files/deadface/CTF_Caches_Kampeter_1.zip",
      downloadFileName: "CTF_Caches_Kampeter_1.zip (9.0 KB)",
      extraFiles: [
        { name: "inspect_history.py (1.3 KB)", url: "/files/deadface/inspect_history.py" },
      ],
      sections: [
        { id: "hooked-db", title: "1. Chrome Profile & SQLite Triage", tag: "History DB" },
        { id: "hooked-chain", title: "2. Visits Table Click Chain", tag: "PAGE_TRANSITION_LINK" },
        { id: "hooked-flag", title: "3. Phishing Landing URL & Token", tag: "Flag" },
      ]
    },
    {
      id: "file-dump-01",
      num: "07",
      title: "File Dump 01",
      category: "Artifact Inspection & OSINT",
      points: "250 PTS",
      badge: "OPENXML // THREAT INTEL",
      tagline: "Stolen Digital Identity & OpenXML Metadata Attacker Fingerprint",
      folder: "C:\\CTFS\\DEAD FACE CTF\\File Dump 01\\",
      downloadFile: "/files/deadface/File_Dump_Challenge.zip",
      downloadFileName: "File_Dump_Challenge.zip (14.0 MB)",
      sections: [
        { id: "filedump-files", title: "1. Victim Identity & Staged Notes", tag: "notes.docx" },
        { id: "filedump-xml", title: "2. OpenXML core.xml Metadata", tag: "ghostwriter404" },
        { id: "filedump-flag", title: "3. Threat Actor Correlation", tag: "gh0st404" },
      ]
    },
    {
      id: "art-heist-forgery",
      num: "08",
      title: "Art Heist - The Forgery",
      category: "Steganography & Metadata",
      points: "200 PTS",
      badge: "PNG // XMP METADATA",
      tagline: "Detecting Swapped Museum Forgery & Carving Lamia's XMP Signature",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Art Heist The Forgery\\",
      downloadFile: "/files/deadface/CTF_Forgery_Paintings.zip",
      downloadFileName: "CTF_Forgery_Paintings.zip (9.5 MB)",
      sections: [
        { id: "artheist-timestamp", title: "1. Timestamp Triage Across Paintings", tag: "Painting_002.png" },
        { id: "artheist-xmp", title: "2. Embedded XMP Signature", tag: "dc:identifier" },
        { id: "artheist-flag", title: "3. Forgery Attribution Flag", tag: "Flag" },
      ]
    },
    {
      id: "aurora-health-suite",
      num: "09",
      title: "Aurora Health Database Suite",
      category: "Database Forensics (SQL)",
      points: "800 PTS",
      badge: "MYSQL // 8 OPS",
      tagline: "Hospital MySQL Database & Tampered Audit Log Queries (8 Flags)",
      folder: "C:\\CTFS\\DEAD FACE CTF\\database\\",
      downloadInfo: "aurora.sql (MySQL Schema & Audit Logs)",
      sections: [
        { id: "aurora-p1", title: "9. Patient Registry (AH-0044719)", tag: "Gordon" },
        { id: "aurora-p2", title: "10. Watching the VIP (rborden)", tag: "Audit Count" },
        { id: "aurora-p3", title: "11. Stay on the VIP (mreyes)", tag: "Accomplice" },
        { id: "aurora-p4", title: "12. Pharmacy Formulary (Count 9)", tag: "Schedule II" },
        { id: "aurora-p5", title: "13. Drug Diversion (BR2938471)", tag: "Fentanyl" },
        { id: "aurora-p6", title: "14. Ghost in Registry (AH-0090001)", tag: "Phantom ID" },
        { id: "aurora-p7", title: "15. After the Lock (VELT-0137)", tag: "After Hours" },
        { id: "aurora-p8", title: "16. Clinical Trial Score (2.3)", tag: "Efficacy Diff" },
      ]
    },
    {
      id: "ghost-of-squares-past",
      num: "10",
      title: "Ghost of Squares Past",
      category: "OSINT / Historical Geolocation",
      points: "300 PTS",
      badge: "OSINT // SAVANNAH",
      tagline: "Savannah Georgia Historic Squares Compass Grid & Monument Riddle",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Ghost of Squares Past\\",
      sections: [
        { id: "ghostsq-compass", title: "1. Compass Grid & Photo Analysis", tag: "point 2 & 4" },
        { id: "ghostsq-points", title: "2. Points 1-5 Historical Identification", tag: "1733-1742-1815-1733" },
        { id: "ghostsq-flag", title: "3. Central Monument & Flag", tag: "gordon" },
      ]
    },
    {
      id: "traffic-accident",
      num: "11",
      title: "Traffic Accident / Car Crash",
      category: "OSINT / Forensics",
      points: "150 PTS",
      badge: "FMCSA // SAFER",
      tagline: "Commercial Vehicle Registration Carving & Corporate Founding Date",
      folder: "C:\\CTFS\\DEAD FACE CTF\\car crash\\",
      sections: [
        { id: "crash-crop", title: "1. USDOT Stencil Carving", tag: "USDOT: 080806" },
        { id: "crash-safer", title: "2. FMCSA SAFER Database Lookup", tag: "J.B. HUNT" },
        { id: "crash-flag", title: "3. Founding Date Flag", tag: "08_10_1961" },
      ]
    },
    {
      id: "conduct-unbecoming",
      num: "12",
      title: "Conduct Unbecoming",
      category: "Document & Printer Forensics",
      points: "200 PTS",
      badge: "MIC // YELLOW DOTS",
      tagline: "Machine Identification Codes (MIC) Tracking Dots Decoded",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Conduct Unbecoming\\",
      downloadFile: "/images/deadface/Doc_20261017_0915.jpg",
      downloadFileName: "Doc_20261017_0915.jpg (3.4 MB)",
      sections: [
        { id: "conduct-scan", title: "1. Letter Inspection & Blue Channel Inversion", tag: "Yellow Dots" },
        { id: "conduct-matrix", title: "2. Dot Matrix Byte Decoding", tag: "8 Cols x 13 Rows" },
        { id: "conduct-flag", title: "3. Printer Asset Serial Flag", tag: "NVU-PRINT-17" },
      ]
    },
    {
      id: "exfiltration",
      num: "13",
      title: "Exfiltration",
      category: "Steganography & Timing Forensics",
      points: "250 PTS",
      badge: "EXIF // TIMING COVERT",
      tagline: "Chronological EXIF Timestamp Sorting & Hex Chunk Reassembly",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Exfiltration\\",
      downloadFile: "/files/deadface/exfiltration.zip",
      downloadFileName: "exfiltration.zip (555.9 KB)",
      sections: [
        { id: "exfil-triage", title: "1. 20 Images EXIF Metadata Inspection", tag: "DateTimeOriginal" },
        { id: "exfil-script", title: "2. Automated Chronological Reassembler", tag: "Python Script" },
        { id: "exfil-flag", title: "3. Flag Recovery", tag: "timing-is-everything" },
      ]
    },
    {
      id: "bedside-manner",
      num: "14",
      title: "Bedside Manner",
      category: "Hardware & Telemetry",
      points: "200 PTS",
      badge: "SERIAL // TELEMETRY",
      tagline: "Patient Vital Signs Monitor Diagnostic ASCII Stream Parsing",
      folder: "C:\\CTFS\\DEAD FACE CTF\\bedside manner\\",
      sections: [
        { id: "bedside-stream", title: "1. Serial Diagnostic Frame Parsing", tag: "ASCII Filter" },
        { id: "bedside-flag", title: "2. Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "uninvited-guest",
      num: "15",
      title: "Uninvited Guest PCAP Series",
      category: "Network Forensics",
      points: "500 PTS",
      badge: "SMB // RESPONDER LLMNR",
      tagline: "LLMNR/mDNS Poisoning, SMB NTLMv2 & C2 Exfiltration (5 Flags)",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Uninvited Guest\\",
      downloadFile: "/files/deadface/demonne.pcap",
      downloadFileName: "demonne.pcap (7.6 MB)",
      sections: [
        { id: "uninvited-p1", title: "1. Rogue Responder IP (10.77.10.66)", tag: "LLMNR / mDNS" },
        { id: "uninvited-p2", title: "2. Challenge Accepted (NTProofStr)", tag: "NTLMv2" },
        { id: "uninvited-p3", title: "3. Name to a Face (Compromised User)", tag: "nkessler" },
        { id: "uninvited-p4", title: "4. Crown Jewels (annual_report.pdf)", tag: "SMB Read" },
        { id: "uninvited-p5", title: "5. Public Offering (External C2 Destination)", tag: "167.172.132.224:4815" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("bad-guys-be-bad");
  const [activeSectionId, setActiveSectionId] = useState("badguys-staging");

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
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-red-500/30 selection:text-red-200">
      <Navbar />

      <main className="flex-grow pt-6 pb-20">
        {/* Hub Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-center">
          {/* Breadcrumb Pill */}
          <div className="mb-4 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-3 sm:px-4 py-1.5 rounded-full">
            <Link href="/ctfs" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-wider">
              ← CTF HUB
            </Link>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="font-mono text-[10px] sm:text-xs text-red-400 uppercase tracking-wider sm:tracking-[0.25em]">
              DEADFACE CTF 2026 // OPERATIONAL DOSSIER
              <span className="animate-blink inline-block w-1.5 h-3 bg-red-400 ml-2 align-middle"></span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-normal sm:tracking-widest font-[family-name:var(--font-silkscreen)] mb-4">
            DEADFACE CTF
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-sans max-w-3xl mx-auto leading-relaxed">
            Complete technical writeups across Network Traffic Analysis, Volatility 3 Memory Forensics, Chrome SQLite Artifacts, Aurora Health Database SQL, Savannah OSINT, and LLMNR/SMB Poisoning.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-red-400 font-bold">●</span> 20 Core CTF Challenges
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> 25 Verified Flags Extracted
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">●</span> Exact Commands &amp; SQL Queries
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-amber-400 flex items-center gap-2">
              <span className="text-amber-400 font-bold">●</span> Downloadable Artifacts Included
            </div>
          </div>

          {/* Banner Graphic */}
          <div className="mt-8 max-w-4xl mx-auto relative rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl group">
            <Image
              src="/images/deadface_ctf_banner.jpg"
              alt="DEADFACE CTF Banner"
              width={1200}
              height={675}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-102"
              priority
            />
          </div>
        </div>

        {/* Content Section with Sticky Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-3 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold px-2 pb-2 border-b border-zinc-800">
                  Operations Index
                </div>
                {challenges.map((c) => (
                  <div key={c.id} className="space-y-1">
                    <button
                      onClick={() => scrollToElement(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between text-xs ${
                        activeChallengeId === c.id
                          ? "bg-red-500/20 text-red-400 border border-red-500/30 font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      <span className="truncate">{c.num}. {c.title}</span>
                      <span className="text-[10px] text-zinc-500 ml-1 shrink-0">{c.badge.split(" ")[0]}</span>
                    </button>
                    {activeChallengeId === c.id && (
                      <div className="pl-4 space-y-1 border-l border-zinc-800 ml-3">
                        {c.sections.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => scrollToElement(s.id)}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] truncate block ${
                              activeSectionId === s.id
                                ? "text-white font-semibold"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">

              {/* ============================================================= */}
              {/* CATEGORY: TRAFFIC ANALYSIS & NETWORK FORENSICS                */}
              {/* ============================================================= */}
              <div className="border-b border-zinc-800 pb-2">
                <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold">Category 01</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)]">
                  Traffic Analysis &amp; Network Forensics
                </h2>
              </div>

              {/* Challenge 1: Bad Guys Be Bad */}
              <article id="bad-guys-be-bad" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Traffic Analysis // DNS Tunneling &amp; HTTP Staging
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      100 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    1. Bad Guys Be Bad
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Trace suspicious network activity, locate an external staging configuration, and recover the secret exfiltrated by DEADFACE.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\1\</code></span>
                  </div>
                  <a
                    href="/files/deadface/deadface_pcap02.pcap"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download deadface_pcap02.pcap (63.2 KB)
                  </a>
                </div>

                {/* Retrace / Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div>
                      <p className="text-zinc-200 font-semibold mb-1">
                        1. Opened <code className="text-red-400 font-mono">deadface_pcap02.pcap</code> in Wireshark.
                      </p>
                    </div>

                    <div id="badguys-staging" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        2. Discovered HTTP Staging &amp; Secret XOR Key:
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Filtered for the staging server connection:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>ip.addr == 45.13.37.7 &amp;&amp; tcp.port == 8080</code>
                      </div>
                      <p className="text-zinc-300 text-sm">
                        Followed the TCP stream on the GET <code className="text-zinc-200 bg-black/60 px-1 py-0.5 rounded font-mono">/staging.bin</code> request and guess what The server returned the attacker&apos;s staging config:
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019162638.png"
                          alt="Wireshark TCP Stream showing staging.bin configuration"
                          width={950}
                          height={500}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3.5 font-mono text-xs text-zinc-300 space-y-1">
                        <div>mode=exfil</div>
                        <div>channel=dns</div>
                        <div>xor_key=Sp00ky</div>
                        <div>target=exfil.deadface-c2</div>
                      </div>

                      <p className="text-zinc-300 text-sm italic">
                        This showed that data was being smuggled out over <strong className="text-white">DNS</strong> using the repeating XOR key <strong className="text-red-400 font-mono">Sp00ky</strong> surprised? yeah me too ( u alone )
                      </p>
                    </div>

                    <div id="badguys-dns" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        3. Collected Exfiltrated DNS Chunks:
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Filtered Wireshark for the tunneling domain:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>dns.qry.name contains &quot;exfil.deadface-c2.net&quot;</code>
                      </div>
                      <p className="text-zinc-400 text-xs">
                        Extracted the ordered query subdomains (<code className="text-red-400">s00</code> through <code className="text-red-400">s04</code>):
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 space-y-1">
                        <div>s00-G4KVCVANDAYB</div>
                        <div>s01-KS2TLETCOASR</div>
                        <div>s02-KYGRAMBPKJKT</div>
                        <div>s03-IGZGANBVSBI6</div>
                        <div>s04-FY</div>
                      </div>

                      <p className="text-zinc-400 text-xs">
                        Stripped the <code className="text-zinc-300">s00-</code> prefixes and joined the Base32 chunks in sequence:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-300 break-all select-all">
                        G4KVCVANDAYBKS2TLETCOASRKYGRAMBPKJKTIGZGANBVSBI6FY
                      </div>

                      <p className="text-zinc-300 text-sm italic">
                        intersting right?
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019162407.png"
                          alt="DNS Query Subdomains in Wireshark"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div id="badguys-flag" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        4. Decoded Flag in CyberChef:
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Pasted the concatenated string into CyberChef with this recipe:
                      </p>
                      <ol className="list-decimal list-inside text-xs font-mono text-zinc-300 space-y-1 pl-2">
                        <li>From Base32</li>
                        <li>XOR (Key: <code className="text-red-400 font-bold">Sp00ky</code>, UTF8)</li>
                      </ol>
                      <p className="text-zinc-400 text-xs">
                        Output decoded directly into the flag:
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019162419.png"
                          alt="CyberChef Base32 and XOR Decode"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;c2_traffic_be_bussing&#125;
                    </span>
                    <span className="text-xs text-zinc-500 font-mono block">easy right ? ;0</span>
                  </div>
                  <CopyButton text="deadface{c2_traffic_be_bussing}" />
                </div>
              </article>

              {/* Challenge 2: Data Go Brrrrr */}
              <article id="data-go-brrrrr" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Traffic Analysis // Covert Exfil
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      150 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    2. Data Go Brrrrr
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Detect high-volume exfiltration concealed inside an unexpected protocol.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Data Go Brrrrr\</code></span>
                  </div>
                  <a
                    href="/files/deadface/PCAP01.pcap"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download PCAP01.pcap (2.9 KB)
                  </a>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="datago-icmp" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        1. Identified ICMP Traffic Anomaly:
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Filtered <code className="text-red-400 font-mono">PCAP01.pcap</code> for ICMP packets:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>icmp</code>
                      </div>
                      <p className="text-zinc-300 text-xs">
                        Baseline traffic showed standard 90-byte pings to the gateway <code className="text-zinc-200 font-mono">192.168.1.1</code>. However, a burst of 50-byte requests appeared targeting an external host <code className="text-red-400 font-mono">10.10.14.7</code>:
                      </p>
                      <p className="text-zinc-300 text-sm italic">
                        soo guess what !
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019164013.png"
                          alt="Wireshark ICMP Echo Request burst targeting 10.10.14.7"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <p className="text-zinc-400 text-xs italic">u guessed??</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        2. Isolated Exfiltration Requests: <span className="text-zinc-500 font-normal italic">( hope u think of that too )</span>
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Filtered specifically for the outbound packets to the suspect IP:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>icmp &amp;&amp; ip.dst == 10.10.14.7</code>
                      </div>
                      <p className="text-zinc-300 text-xs">
                        This isolated 8 distinct Echo Requests (Packets 13, 15, 17, 19, 21, 23, 25, 27):
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019164405.png"
                          alt="Filtered ICMP Echo Requests 13 through 27"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div id="datago-payload" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        3. Inspected Payload Data (Base64 Chunks):
                      </p>
                      <p className="text-zinc-300 text-xs">
                        Selected Packet 13 and expanded the ICMP data field (<code className="text-red-400 font-mono">Data (8 bytes)</code>). Instead of default ping padding, the payload contained custom ASCII characters <code className="text-amber-300 font-mono">ZGVhZGZh</code>:
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019164004.png"
                          alt="ICMP Payload custom ASCII bytes"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <p className="text-zinc-300 text-sm italic">
                        guess what :) there&apos;s more
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Checking each outbound request revealed sequential 8-byte Base64 chunks:
                      </p>

                      <div className="overflow-x-auto my-3">
                        <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded-lg overflow-hidden">
                          <thead className="bg-[#111116] text-zinc-400 border-b border-zinc-800">
                            <tr>
                              <th className="p-2.5">Packet</th>
                              <th className="p-2.5">Hex Data</th>
                              <th className="p-2.5">ASCII (Base64 Chunk)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/60 bg-[#07070a]">
                            <tr><td className="p-2.5 font-bold text-white">Packet 13</td><td className="p-2.5 text-zinc-400">5a4756685a475a68</td><td className="p-2.5 text-emerald-400">ZGVhZGZh</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 15</td><td className="p-2.5 text-zinc-400">5932563761574e74</td><td className="p-2.5 text-emerald-400">Y2V7aWNt</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 17</td><td className="p-2.5 text-zinc-400">6346387a65475a70</td><td className="p-2.5 text-emerald-400">cF8zeGZp</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 19</td><td className="p-2.5 text-zinc-400">6246393361444e75</td><td className="p-2.5 text-emerald-400">bF93aDNu</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 21</td><td className="p-2.5 text-zinc-400">5833526f4d336c66</td><td className="p-2.5 text-emerald-400">X3RoM3lf</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 23</td><td className="p-2.5 text-zinc-400">6247566863335266</td><td className="p-2.5 text-emerald-400">bGVhc3Rf</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 25</td><td className="p-2.5 text-zinc-400">6333567a63444e6a</td><td className="p-2.5 text-emerald-400">c3VzcDNj</td></tr>
                            <tr><td className="p-2.5 font-bold text-white">Packet 27</td><td className="p-2.5 text-zinc-400">6448303d</td><td className="p-2.5 text-emerald-400">dH0=</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div id="datago-flag" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        4. Reassembled &amp; Decoded in CyberChef:
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Concatenated the chunks into the full Base64 string:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-300 break-all select-all">
                        ZGVhZGZhY2V7aWNtcF8zeGZpbF93aDNuX3RoM3lfbGVhc3Rfc3VzcDNjdH0=
                      </div>
                      <p className="text-zinc-400 text-xs">
                        Decoded using the <code className="text-zinc-200 font-mono">From Base64</code> recipe to recover the flag:
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019164230.png"
                          alt="CyberChef Base64 Decode output"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;icmp_3xfil_wh3n_th3y_least_susp3ct&#125;
                    </span>
                    <span className="text-xs text-zinc-500 font-mono block">it was good not easy or easy idk u decide 0;</span>
                  </div>
                  <CopyButton text="deadface{icmp_3xfil_wh3n_th3y_least_susp3ct}" />
                </div>
              </article>

              {/* Challenge 3: Don't Leave Me Hanging */}
              <article id="dont-leave-me-hanging" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Traffic Analysis // VoIP &amp; Audio
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      250 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    3. Don&apos;t Leave Me Hanging <span className="text-sm font-sans font-normal text-zinc-500">( listen to him its long challenge)</span>
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Investigate anomalous help desk telephony traffic, bypass SRTP stream encryption, and recover secret in-band audio tones.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACTS</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Don&apos;t Leave Me Hanging\</code></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="/files/deadface/pbx-diag-20261008.tar.gz"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      pbx-diag-20261008.tar.gz
                    </a>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs">
                      DontLeaveMeHanging.pcap (83 MB Local)
                    </span>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="dontleave-ftp" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        1. Intercepted PBX Diagnostics via FTP:
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Filtered <code className="text-red-400 font-mono">DontLeaveMeHanging.pcap</code> for FTP file transfers:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>ftp || ftp-data</code>
                      </div>
                      <p className="text-zinc-300 text-xs">
                        Identified user <code className="text-white font-mono font-bold">mkowalski</code> downloading the PBX diagnostic archive <code className="text-red-400 font-mono">pbx-diag-20261008.tar.gz</code> from the PBX server (<code className="text-zinc-200 font-mono">10.20.200.5</code>):
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019165900.png"
                          alt="Wireshark FTP file transfer analysis"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        2. Analyzed PBX Logs &amp; Discovered In-Band Audio Anomaly:
                      </p>
                      <p className="text-zinc-300 text-xs">
                        Extracted the archive to inspect the Asterisk PBX logs (<code className="text-zinc-200 font-mono">messages.log</code>) and SSL secrets (<code className="text-zinc-200 font-mono">tls-keys.log</code>).
                      </p>
                      <p className="text-zinc-300 text-xs">
                        Standard VoIP systems transmit dial tones as out-of-band network events (RFC 4733). However, a critical warning in <code className="text-zinc-200 font-mono">messages.log</code> revealed that extension <code className="text-amber-400 font-mono">2003</code> was misconfigured:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-amber-300">
                        WARNING: PJSIP/2003-697966fb: endpoint dtmf_mode=inband; DTMF from caller is passed through in audio, not as RFC 4733 events
                      </div>
                      <p className="text-zinc-300 text-xs">
                        This meant the touch-tones were <strong className="text-white">not</strong> separate packets—they were audible sound frequencies baked directly into the call&apos;s voice audio:
                      </p>
                      <p className="text-zinc-500 text-xs italic">
                        (don&apos;t be surprised idk what this shit mean -_- )
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019175036.png"
                          alt="Asterisk messages.log showing DTMF inband warning"
                          width={950}
                          height={400}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div id="dontleave-srtp" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        3. Extracted Session Key &amp; Decrypted SRTP Stream:
                      </p>
                      <p className="text-zinc-300 text-xs">
                        The SIP call setup was protected by TLS, but feeding <code className="text-zinc-200 font-mono">tls-keys.log</code> into Wireshark revealed the decrypted SDP media negotiation, including the cryptographic master key:
                      </p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-cyan-400 break-all select-all">
                        a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:6Kfv2L8Ox5SyjPMENXNamcCD2CQ3bu4OoGK/G8t2
                      </div>
                      <p className="text-zinc-300 text-xs">
                        The actual call audio was carried over UDP ports <code className="text-zinc-200 font-mono">14740</code> &amp; <code className="text-zinc-200 font-mono">7078</code> and encrypted with <strong className="text-white">SRTP (AES Counter Mode)</strong>, preventing standard audio players from reading it.
                      </p>
                      <p className="text-zinc-300 text-xs">
                        Used <code className="text-red-400 font-mono">srtp_fixed.py</code> to derive session keys per RFC 3711 and strip the 10-byte HMAC auth tags, decrypting raw payload into a playable WAV file (<code className="text-zinc-200 font-mono">call_in_fixed.wav</code>).
                      </p>
                    </div>

                    <div id="dontleave-dtmf" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">
                        4. Decoded DTMF Audio Frequencies into the Flag:
                      </p>
                      <p className="text-zinc-300 text-xs">
                        Because standard tools struggled with the audio stream, wrote a custom Python decoder (<code className="text-red-400 font-mono">decode_dtmf_fixed.py</code>) to run FFT frequency analysis over 50ms windows matching the DTMF frequency grid (697–941 Hz low / 1209–1633 Hz high):
                      </p>

                      <div className="bg-[#050508] border border-zinc-800/80 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-80">
<pre>{`import wave
import numpy as np

ROW_FREQS = [697, 770, 852, 941]
COL_FREQS = [1209, 1336, 1477, 1633]
KEY_MAP = {
    (697, 1209): '1', (697, 1336): '2', (697, 1477): '3',
    (770, 1209): '4', (770, 1336): '5', (770, 1477): '6',
    (852, 1209): '7', (852, 1336): '8', (852, 1477): '9',
    (941, 1209): '*', (941, 1336): '0', (941, 1477): '#'
}

with wave.open('call_in_fixed.wav', 'rb') as wf:
    data = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16)
    rate = wf.getframerate()

win, hop = int(rate * 0.05), int(rate * 0.025)
tones, curr, count = [], None, 0
for i in range(0, len(data) - win, hop):
    chunk = data[i:i+win] * np.hamming(win)
    fft, freqs = np.abs(np.fft.rfft(chunk)), np.fft.rfftfreq(win, 1.0 / rate)
    r_best = min(ROW_FREQS, key=lambda rf: abs(freqs[np.argmax(fft)] - rf))
    c_best = min(COL_FREQS, key=lambda cf: abs(freqs[np.argmax(fft)] - cf))
    r_val = max(fft[np.argmin(np.abs(freqs - rf))] for rf in ROW_FREQS)
    c_val = max(fft[np.argmin(np.abs(freqs - cf))] for cf in COL_FREQS)
    k = KEY_MAP.get((r_best, c_best)) if (r_val > 50000 and c_val > 50000) else None
    if k == curr:
        count += 1
    else:
        if curr and count >= 2: tones.append(curr)
        curr, count = k, 1
if curr and count >= 2: tones.append(curr)

digits = "".join(tones)
print("Detected tones:", digits)`}</pre>
                      </div>

                      <p className="text-zinc-400 text-xs">
                        Executed the script against <code className="text-zinc-200 font-mono">call_in_fixed.wav</code>:
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019171320.png"
                          alt="Python DTMF FFT decoder execution output"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <p className="text-zinc-400 text-xs">
                        Extracted 96 sequential touch-tone digits and mapped them into 3-digit ASCII decimal values:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-emerald-400 space-y-1">
                        <div>100 (&apos;d&apos;)  101 (&apos;e&apos;)  097 (&apos;a&apos;)  100 (&apos;d&apos;)  102 (&apos;f&apos;)  097 (&apos;a&apos;)</div>
                        <div>099 (&apos;c&apos;)  101 (&apos;e&apos;)  123 (&apos;&#123;&apos;)  080 (&apos;P&apos;)  114 (&apos;r&apos;)  051 (&apos;3&apos;)</div>
                        <div>053 (&apos;5&apos;)  053 (&apos;5&apos;)  095 (&apos;_&apos;)  048 (&apos;0&apos;)  110 (&apos;n&apos;)  051 (&apos;3&apos;)</div>
                        <div>095 (&apos;_&apos;)  102 (&apos;f&apos;)  048 (&apos;0&apos;)  114 (&apos;r&apos;)  095 (&apos;_&apos;)  068 (&apos;D&apos;)</div>
                        <div>051 (&apos;3&apos;)  052 (&apos;4&apos;)  100 (&apos;d&apos;)  102 (&apos;f&apos;)  052 (&apos;4&apos;)  099 (&apos;c&apos;)</div>
                        <div>051 (&apos;3&apos;)  125 (&apos;&#125;&apos;)</div>
                      </div>

                      <p className="text-zinc-300 text-sm font-semibold italic">
                        fr that was SOLID PEAK challenge ( nvm was good)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;Pr355_0n3_f0r_D34df4c3&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{Pr355_0n3_f0r_D34df4c3}" />
                </div>
              </article>

              {/* Challenge 4: A Pirate's Life for Me Part 1 */}
              <article id="pirates-life-part-1" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Traffic Analysis // Web Traffic
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    4. A Pirate&apos;s Life for Me Part 1
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Mobile web tracking headers hiding flag parts across 3 separate HTTP requests.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-zinc-400">
                    <div><span className="text-zinc-500">Client IP:</span> <code className="text-zinc-200">172.16.14.43</code></div>
                    <div><span className="text-zinc-500">User-Agent:</span> <code className="text-red-400">SunstalkerDFBrower/2.0 (Linux; Android 14)</code></div>
                  </div>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\A Pirate&apos;s Life for Me Part 1\</code></span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs">
                    pirateslife.pcap (565 MB Local Capture)
                  </span>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="pirate-discovery" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Open pirateslife.pcap in Wireshark.</p>
                      <p className="text-zinc-200 font-semibold">2. Apply this display filter:</p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>(http.user_agent contains &quot;Sunstalker&quot;)</code>
                      </div>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019185251.png"
                          alt="Wireshark display filter for Sunstalker"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <div className="bg-[#07070a] border border-zinc-800/80 p-4 rounded-xl space-y-2 text-zinc-300 text-xs">
                        <p className="italic text-zinc-400">u would ask me how u knowed filter sunstalker</p>
                        <p className="text-zinc-300">discover it by yourself</p>
                        <p className="text-zinc-200 font-bold">first Search packet details for the flag prefix (<code className="text-red-400 font-mono">Ctrl + F</code> ➔ String: <code className="text-red-400 font-mono">deadface</code>)</p>
                      </div>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019190636.png"
                          alt="Searching packet details for deadface string"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <div className="space-y-1 text-xs text-zinc-300 pl-2">
                        <p>then hit enter boom u see first of flag</p>
                        <p>now why search by Sunstalker</p>
                        <p>look closely above flag</p>
                        <p className="text-amber-400 font-bold font-mono">User-Agent???</p>
                        <p className="text-emerald-400 font-bold font-mono">yp Sunstalker</p>
                        <p className="italic text-zinc-400">ez right?</p>
                      </div>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Pasted_image_20261019190619.png"
                          alt="Wireshark showing Sunstalker User-Agent header"
                          width={950}
                          height={450}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>http.user_agent contains &quot;Sunstalker&quot;</code>
                      </div>
                    </div>

                    <div id="pirate-parts" className="space-y-6">
                      {/* Part 1 */}
                      <div className="space-y-2 bg-[#07070a] border border-zinc-800/80 p-4 rounded-xl">
                        <h4 className="font-bold text-white text-sm">Part 1 — Packet 19114 (TCP Stream 97)</h4>
                        <ul className="text-xs space-y-1 text-zinc-300">
                          <li>• Jumped to Packet <code className="text-zinc-100 font-mono">19114</code> (<code className="text-red-400 font-mono">Ctrl + G</code>).</li>
                          <li>• Expanded <strong>Hypertext Transfer Protocol</strong> in the Packet Details pane:</li>
                          <li className="pl-4">• <strong>Host:</strong> <code className="text-zinc-200 font-mono">nightvaleuniversity.edu</code></li>
                          <li className="pl-4">• <strong>Custom Header:</strong> <code className="text-red-400 font-mono font-bold">X-1-Trace-Part: deadface&#123;X-M4rk5_</code></li>
                        </ul>
                        <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-lg bg-black/50">
                          <Image
                            src="/images/deadface/Pasted_image_20261019185417.png"
                            alt="Packet 19114 custom X-1-Trace-Part header"
                            width={950}
                            height={400}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>

                      {/* Part 2 */}
                      <div className="space-y-2 bg-[#07070a] border border-zinc-800/80 p-4 rounded-xl">
                        <h4 className="font-bold text-white text-sm">Part 2 — Packet 43516 (TCP Stream 169)</h4>
                        <ul className="text-xs space-y-1 text-zinc-300">
                          <li>• Jumped to Packet <code className="text-zinc-100 font-mono">43516</code> (<code className="text-red-400 font-mono">Ctrl + G</code>).</li>
                          <li>• Expanded <strong>Hypertext Transfer Protocol</strong> in the Packet Details pane:</li>
                          <li className="pl-4">• <strong>Host:</strong> <code className="text-zinc-200 font-mono">aurorahhs.com</code></li>
                          <li className="pl-4">• <strong>Custom Header:</strong> <code className="text-red-400 font-mono font-bold">X-2-Mark: th3_sp0t_</code></li>
                        </ul>
                        <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-lg bg-black/50">
                          <Image
                            src="/images/deadface/Pasted_image_20261019185500.png"
                            alt="Packet 43516 custom X-2-Mark header"
                            width={950}
                            height={400}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>

                      {/* Part 3 */}
                      <div className="space-y-2 bg-[#07070a] border border-zinc-800/80 p-4 rounded-xl">
                        <h4 className="font-bold text-white text-sm">Part 3 — Packet 56543 (TCP Stream 224)</h4>
                        <ul className="text-xs space-y-1 text-zinc-300">
                          <li>• Jumped to Packet <code className="text-zinc-100 font-mono">56543</code> (<code className="text-red-400 font-mono">Ctrl + G</code>).</li>
                          <li>• Expanded <strong>Hypertext Transfer Protocol</strong> in the Packet Details pane:</li>
                          <li className="pl-4">• <strong>Host:</strong> <code className="text-zinc-200 font-mono">birdsarejustbirds.gov</code></li>
                          <li className="pl-4">• <strong>Custom Header:</strong> <code className="text-red-400 font-mono font-bold">X-3-Spot: I_gu355&#125;</code></li>
                        </ul>
                        <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-lg bg-black/50">
                          <Image
                            src="/images/deadface/Pasted_image_20261019185525.png"
                            alt="Packet 56543 custom X-3-Spot header"
                            width={950}
                            height={400}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <div id="pirate-flag" className="space-y-2 bg-[#111116] border border-zinc-800 p-4 rounded-xl">
                      <h4 className="font-bold text-white text-sm font-mono uppercase tracking-wider">Flag Assembly:</h4>
                      <ul className="text-xs space-y-1 font-mono text-zinc-300">
                        <li>• <span className="text-zinc-500">Part 1 (Packet 19114):</span> <code className="text-emerald-400">deadface&#123;X-M4rk5_</code></li>
                        <li>• <span className="text-zinc-500">Part 2 (Packet 43516):</span> <code className="text-emerald-400">th3_sp0t_</code></li>
                        <li>• <span className="text-zinc-500">Part 3 (Packet 56543):</span> <code className="text-emerald-400">I_gu355&#125;</code></li>
                        <li>• <span className="text-zinc-500">Combined Flag:</span> <code className="text-red-400 font-bold select-all">deadface&#123;X-M4rk5_th3_sp0t_I_gu355&#125;</code></li>
                      </ul>
                      <p className="text-xs text-zinc-500 italic mt-2">
                        btw i write packets to make it easier for u u can discover by yourself &lt;3
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;X-M4rk5_th3_sp0t_I_gu355&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{X-M4rk5_th3_sp0t_I_gu355}" />
                </div>
              </article>

              {/* ============================================================= */}
              {/* CATEGORY: DIGITAL FORENSICS & MEMORY ANALYSIS                 */}
              {/* ============================================================= */}
              <div className="border-b border-zinc-800 pb-2 pt-6">
                <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold">Category 02</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)]">
                  Digital Forensics &amp; Memory Analysis
                </h2>
              </div>

              {/* Challenge 5: Who Goes There? */}
              <article id="who-goes-there" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Memory Forensics (Volatility 3)
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      400 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    5. Who Goes There? (Parts 1, 2, 3)
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Investigate a raw Windows memory dump to determine the compromised user account, the target computer hostname, and the active remote C2 socket connection.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Who Goes There\</code></span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    memory.raw (8.58 GB) / memory.7z (1.34 GB)
                  </span>
                </div>

                {/* Subparts */}
                <div className="space-y-6">
                  {/* Part 1 */}
                  <div id="whogoes-user" className="space-y-3 bg-[#07070a] border border-zinc-800/80 p-5 rounded-2xl">
                    <h4 className="font-bold text-white text-base font-[family-name:var(--font-share-tech)]">
                      Part 1: Identifying the Compromised User Account
                    </h4>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      When analyzing a Windows memory image to find who was actively working on the machine, the fastest way without dumping SAM hashes is checking process environment blocks. Every user process inherits environment variables like <code className="text-red-400 font-mono">USERNAME</code>:
                    </p>
                    <p className="text-xs text-zinc-500 italic font-mono">simple af</p>

                    <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                      <code>vol -f memory.raw windows.envars --variable USERNAME</code>
                    </div>

                    <p className="text-zinc-400 text-xs font-mono font-semibold">Terminal Output:</p>
                    <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
<pre>{`PID     Process         Variable    Value
-------------------------------------------
3300    powershell.exe  USERNAME    nkessler
4112    explorer.exe    USERNAME    nkessler
8120    cmd.exe         USERNAME    nkessler`}</pre>
                    </div>

                    <p className="text-zinc-300 text-xs">
                      <strong>Analysis:</strong> Processes running in the interactive desktop session (<code className="text-zinc-200 font-mono">explorer.exe</code>) as well as active shells belonged to <code className="text-emerald-400 font-mono font-bold">nkessler</code>.
                    </p>

                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag 1</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;nkessler&#125;</code>
                      </div>
                      <CopyButton text="deadface{nkessler}" />
                    </div>
                  </div>

                  {/* Part 2 */}
                  <div id="whogoes-host" className="space-y-3 bg-[#07070a] border border-zinc-800/80 p-5 rounded-2xl">
                    <h4 className="font-bold text-white text-base font-[family-name:var(--font-share-tech)]">
                      Part 2: Extracting the Workstation Hostname
                    </h4>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      Similarly, rather than parsing registry hives or running <code className="text-zinc-200 font-mono">dumpregistry</code>, the machine&apos;s NetBIOS / DNS hostname is constantly referenced in process environment blocks under <code className="text-red-400 font-mono">COMPUTERNAME</code>:
                    </p>

                    <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                      <code>vol -f memory.raw windows.envars --variable COMPUTERNAME</code>
                    </div>

                    <p className="text-zinc-400 text-xs font-mono font-semibold">Terminal Output:</p>
                    <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
<pre>{`PID     Process         Variable        Value
---------------------------------------------------------
4112    explorer.exe    COMPUTERNAME    DESKTOP-8K4N19S
3300    powershell.exe  COMPUTERNAME    DESKTOP-8K4N19S`}</pre>
                    </div>

                    <p className="text-zinc-300 text-xs">
                      <strong>Analysis:</strong> The system hostname is <code className="text-emerald-400 font-mono font-bold">DESKTOP-8K4N19S</code>.
                    </p>

                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag 2</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;DESKTOP-8K4N19S&#125;</code>
                      </div>
                      <CopyButton text="deadface{DESKTOP-8K4N19S}" />
                    </div>
                  </div>

                  {/* Part 3 */}
                  <div id="whogoes-socket" className="space-y-3 bg-[#07070a] border border-zinc-800/80 p-5 rounded-2xl">
                    <h4 className="font-bold text-white text-base font-[family-name:var(--font-share-tech)]">
                      Part 3: Pinpointing the Attacker C2 Socket
                    </h4>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      To find the attacker&apos;s active command-and-control connection, I needed to inspect the network sockets open in memory at the time of the capture. Running <code className="text-red-400 font-mono">windows.netscan</code> scans memory pools for network endpoint structures:
                    </p>

                    <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                      <code>vol -f memory.raw windows.netscan | findstr &quot;ESTABLISHED&quot;</code>
                    </div>

                    <p className="text-zinc-400 text-xs font-mono font-semibold">Terminal Output:</p>
                    <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
<pre>{`Offset          Proto   Local Address       Foreign Address         State           PID     Owner
---------------------------------------------------------------------------------------------------------
0xd208271e5010  TCPv4   10.77.10.25:49812   167.172.132.224:4815    ESTABLISHED     30      svchost.exe`}</pre>
                    </div>

                    <p className="text-zinc-300 text-xs">
                      <strong>Analysis:</strong> An active established socket was connected out to remote external IP <code className="text-amber-400 font-mono font-bold">167.172.132.224</code> on port <code className="text-amber-400 font-mono font-bold">4815</code> under PID <code className="text-amber-400 font-mono font-bold">30</code>.
                      The challenge requires formatting the connection as <code className="text-zinc-200 font-mono">IP_Port_PID</code>:
                      <br />
                      <code className="text-zinc-300">167.172.132.224</code> + <code className="text-zinc-300">4815</code> + <code className="text-zinc-300">30</code> ➔ <code className="text-emerald-400 font-mono font-bold">167.172.132.224_4815_30</code>
                    </p>

                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag 3</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;167.172.132.224_4815_30&#125;</code>
                      </div>
                      <CopyButton text="deadface{167.172.132.224_4815_30}" />
                    </div>
                  </div>
                </div>
              </article>

              {/* Challenge 6: Hooked */}
              <article id="hooked" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Digital Forensics // Browser Forensics
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    6. Hooked
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Fletcher fell for a spearphishing attack on March 14, 2025 around 10:23 AM. Investigate extracted Google Chrome profile artifacts to identify the exact phishing landing URL and token.
                  </p>
                  <div className="mt-2 text-xs font-mono text-zinc-500">
                    Target Endpoint: Workstation <code className="text-zinc-300">DEMONNE-WS04</code> (Fletcher Kampeter, Finance division)
                  </div>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Hooked\</code></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="/files/deadface/CTF_Caches_Kampeter_1.zip"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      CTF_Caches_Kampeter_1.zip (9.0 KB)
                    </a>
                    <a
                      href="/files/deadface/inspect_history.py"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-mono text-xs transition-colors shrink-0"
                    >
                      inspect_history.py
                    </a>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Forensic Analysis &amp; Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="hooked-db" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Inspected Extracted Chrome Artifacts:</p>
                      <p className="text-zinc-300 text-xs">
                        Unpacked <code className="text-red-400 font-mono">CTF_Caches_Kampeter_1.zip</code>, revealing standard Google Chrome user profile databases:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300">
<pre>{`extracted\ctf_artifacts\Chrome\User Data\Default\
  ├── History          (SQLite 3: URLs, timestamps, transition types)
  ├── Login Data       (SQLite 3: saved autofill & submitted credentials)
  └── Cookies`}</pre>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">2. Queried Chrome History &amp; Converted Timestamps:</p>
                      <p className="text-zinc-300 text-xs">
                        Chrome stores timestamps as WebKit epoch (microseconds since January 1, 1601 UTC). Ran <code className="text-red-400 font-mono">inspect_history.py</code> to query the <code className="text-zinc-200 font-mono">urls</code> table and convert timestamps:
                      </p>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>python inspect_history.py</code>
                      </div>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Terminal Output:</p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto max-h-60">
<pre>{`=== URLS ===
ID: 1 | 2025-03-14 09:05:10 | https://confluence.demonne.int/wiki/IT/VPNSetup
ID: 2 | 2025-03-14 09:47:32 | https://demonne.sharepoint.com/sites/finance/Shared%20Documents
ID: 3 | 2025-03-14 10:01:55 | https://www.reuters.com/markets/
ID: 4 | 2025-03-14 10:22:15 | https://mail.google.com/mail/u/0/#inbox/FMfcgzQXKlwJqTvBnDpCmRsYhWxGbVkL
      Title: [URGENT] De Monne VPN Migration - Action Required - Gmail
ID: 5 | 2025-03-14 10:22:31 | https://mail.google.com/mail/u/0/#inbox
ID: 6 | 2025-03-14 10:23:44 | http://demonne-secure-portal.net/login?ref=vpn_auth&token=df4e91bc
      Title: De Monne Financial - Secure Employee Portal
ID: 7 | 2025-03-14 10:23:45 | http://demonne-secure-portal.net/auth/redirect?session=9f3a22cd&status=ok`}</pre>
                      </div>
                    </div>

                    <div id="hooked-chain" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">3. Traced the Click Chain via <code className="text-red-400 font-mono">visits</code> Table:</p>
                      <p className="text-zinc-300 text-xs">
                        Checking the <code className="text-zinc-200 font-mono">visits</code> table verified that URL ID 6 originated directly from the open webmail session (<code className="text-zinc-200 font-mono">from_visit = 5</code>):
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-cyan-400 overflow-x-auto">
                        <code>ID: 6 | URL_ID: 6 | Time: 2025-03-14 10:23:44 | From: 5 | Transition: 838860801 (PAGE_TRANSITION_LINK)</code>
                      </div>
                      <p className="text-zinc-300 text-xs">
                        Transition code <code className="text-zinc-200 font-mono">838860801</code> (<code className="text-amber-300 font-mono">PAGE_TRANSITION_LINK</code>) proves the employee clicked the link inside the urgent VPN migration email. The destination was an HTTP lookalike phishing domain:
                        <br />
                        <code className="text-emerald-400 font-mono font-bold">http://demonne-secure-portal.net/login?ref=vpn_auth&amp;token=df4e91bc</code>
                      </p>
                    </div>

                    <div id="hooked-flag" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">4. Confirmed Credential Capture in <code className="text-red-400 font-mono">Login Data</code>:</p>
                      <p className="text-zinc-300 text-xs">
                        Querying the <code className="text-zinc-200 font-mono">logins</code> table in <code className="text-zinc-200 font-mono">Login Data</code> showed that the victim entered corporate credentials on the malicious site:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300">
<pre>{`=== LOGIN DATA ===
('http://demonne-secure-portal.net/login', 'http://demonne-secure-portal.net/auth/verify', 'f.kampeter@demonne.com')`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-xs sm:text-sm text-red-400 font-bold select-all break-all">
                      deadface&#123;http://demonne-secure-portal.net/login?ref=vpn_auth&amp;token=df4e91bc&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{http://demonne-secure-portal.net/login?ref=vpn_auth&token=df4e91bc}" />
                </div>
              </article>

              {/* Challenge 7: File Dump 01 */}
              <article id="file-dump-01" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Digital Forensics // Artifact Inspection &amp; OSINT
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      250 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    7. File Dump 01
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    A DEADFACE operative stole a victim&apos;s (Daniel Hameser) entire digital identity. Retrace the attacker&apos;s traces in the stolen file dump to identify which threat actor orchestrated the attack.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\File Dump 01\</code></span>
                  </div>
                  <a
                    href="/files/deadface/File_Dump_Challenge.zip"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download File_Dump_Challenge.zip (14.0 MB)
                  </a>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Forensic Analysis &amp; Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="filedump-files" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Unpacked the Victim&apos;s Stolen Identity Files:</p>
                      <p className="text-zinc-300 text-xs">
                        Extracted <code className="text-red-400 font-mono">File_Dump_Challenge.zip</code>, containing personal resumes, receipts, photos, and staged documents belonging to Daniel Hameser:
                      </p>

                      <div className="my-3 max-w-sm rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/profile_pic_1.png"
                          alt="Stolen identity profile photo"
                          width={400}
                          height={400}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">2. Identified Operational Note Staged by the Attacker:</p>
                      <p className="text-zinc-300 text-xs">
                        Found <code className="text-red-400 font-mono">notes.docx</code>, which revealed the adversary&apos;s instructions for staging accounts across sites:
                      </p>
                      <blockquote className="border-l-2 border-amber-400 pl-3 italic text-zinc-300 text-xs bg-[#07070a] p-3 rounded-r-lg">
                        &quot;Remember to keep the Hameser accounts consistent across sites. Use the FL address for anything that mails a code. Reroute the rest. Coffee place wifi is reliable in the mornings.&quot;
                      </blockquote>
                      <p className="text-zinc-300 text-xs">
                        Also included a cropped snippet of an Apple Specialist store location used for scouting:
                      </p>

                      <div className="my-3 max-w-md rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/snip_1.png"
                          alt="Apple Specialist store map scout crop"
                          width={600}
                          height={300}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div id="filedump-xml" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">3. Extracted OpenXML Metadata from <code className="text-red-400 font-mono">notes.docx</code>:</p>
                      <p className="text-zinc-300 text-xs">
                        Modern <code className="text-zinc-200 font-mono">.docx</code> files are zipped OpenXML packages. Extracted <code className="text-zinc-200 font-mono">docProps/core.xml</code> to inspect the embedded creator metadata:
                      </p>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>tar -O -xf notes.docx docProps/core.xml</code>
                      </div>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Terminal Output:</p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
<pre>{`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ...>
    <dc:title>notes</dc:title>
    <dc:creator>ghostwriter404</dc:creator>
    <cp:lastModifiedBy>GHOST404-PC</cp:lastModifiedBy>
    <cp:revision>1</cp:revision>
    <dcterms:created xsi:type="dcterms:W3CDTF">2026-08-22T21:33:04.269Z</dcterms:created>
    <dcterms:modified xsi:type="dcterms:W3CDTF">2026-08-22T21:33:04.269Z</dcterms:modified>
</cp:coreProperties>`}</pre>
                      </div>

                      <p className="text-zinc-400 text-xs italic">
                        (Alternatively, in Windows Explorer: Right-click notes.docx ➔ Properties ➔ Details ➔ Authors: ghostwriter404, Last saved by: GHOST404-PC).
                      </p>
                    </div>

                    <div id="filedump-flag" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">4. Correlated with DEADFACE Threat Actors:</p>
                      <p className="text-zinc-300 text-xs">
                        The creator <strong className="text-red-400 font-mono">ghostwriter404</strong> and machine name <strong className="text-red-400 font-mono">GHOST404-PC</strong> directly map to the known DEADFACE operative <strong className="text-emerald-400 font-mono font-bold">gh0st404</strong> (alias: <code className="text-zinc-300 font-mono">ghost404</code>).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;gh0st404&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{gh0st404}" />
                </div>
              </article>

              {/* Challenge 8: Art Heist - The Forgery */}
              <article id="art-heist-forgery" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Digital Forensics // Steganography &amp; Metadata
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    8. Art Heist - The Forgery
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Five classic museum paintings returned to the Turla Gallery were digitized. An intelligence report claims DEADFACE operative Lamia swapped one original with a digital forgery.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Art Heist The Forgery\</code></span>
                  </div>
                  <a
                    href="/files/deadface/CTF_Forgery_Paintings.zip"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download CTF_Forgery_Paintings.zip (9.5 MB)
                  </a>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="artheist-timestamp" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Timestamp Triage Across Archive:</p>
                      <ul className="text-xs space-y-1 text-zinc-300">
                        <li>• Unpacked <code className="text-red-400 font-mono">CTF_Forgery_Paintings.zip</code> containing <code className="text-zinc-200 font-mono">Painting_001.png</code> through <code className="text-zinc-200 font-mono">Painting_005.png</code>.</li>
                        <li>• Inspected file modification timestamps in File Explorer:</li>
                        <li className="pl-4">• Four paintings shared an identical creation timestamp of <strong>September 1, 2026</strong>.</li>
                        <li className="pl-4">• <code className="text-amber-300 font-mono font-bold">Painting_002.png</code> stood out with a much newer timestamp of <strong>October 14, 2026</strong>.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">2. Inspected the Forged Artwork:</p>
                      <p className="text-zinc-300 text-xs">
                        Opening <code className="text-red-400 font-mono">Painting_002.png</code> revealed the hacked parody artwork (&quot;Mona Lisa Loading&quot;):
                      </p>

                      <div className="my-3 max-w-sm rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Painting_002.png"
                          alt="Forged Painting_002.png artwork"
                          width={400}
                          height={400}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div id="artheist-xmp" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">3. Extracted Embedded XMP Metadata:</p>
                      <p className="text-zinc-300 text-xs">
                        Searched for embedded text / metadata signatures across all paintings:
                      </p>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <code>Select-String -Path &quot;Painting_*.png&quot; -Pattern &quot;deadface&quot;</code>
                      </div>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Terminal Output:</p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
<pre>{`Painting_002.png:20:  <dc:identifier>deadface{L4MIA_SIGNS_HER_WORK}</dc:identifier>`}</pre>
                      </div>

                      <p className="text-zinc-300 text-xs">
                        Reading the full XMP metadata chunk (<code className="text-zinc-200 font-mono">exiftool Painting_002.png</code>) confirmed Lamia&apos;s forger attribution:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
<pre>{`<dc:creator>Leonardo da Vinci / LAMIA</dc:creator>
<dc:title>Mona Lisa Loading</dc:title>
<dc:rights>LAMIA temporary acquisition</dc:rights>
<dc:identifier>deadface{L4MIA_SIGNS_HER_WORK}</dc:identifier>`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div id="artheist-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;L4MIA_SIGNS_HER_WORK&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{L4MIA_SIGNS_HER_WORK}" />
                </div>
              </article>

              {/* ============================================================= */}
              {/* CATEGORY: DATABASE & SQL FORENSICS (AURORA HEALTH)            */}
              {/* ============================================================= */}
              <div className="border-b border-zinc-800 pb-2 pt-6">
                <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold">Category 03</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)]">
                  Database &amp; SQL Forensics (Aurora Health)
                </h2>
              </div>

              {/* Aurora Health Suite (Challenges 9 to 16) */}
              <article id="aurora-health-suite" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      MySQL Database // 8 Investigation Flags
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      800 PTS TOTAL
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    Aurora Health Hospital Database Suite (Challenges 9 – 16)
                  </h3>
                  <div className="mt-3 space-y-1">
                    <blockquote className="border-l-2 border-red-500/50 pl-3 italic text-zinc-300 text-xs">
                      All queries were executed against the Aurora Health MySQL database (<code className="text-red-400 font-mono">aurora.sql</code>).
                    </blockquote>
                    <p className="text-xs text-zinc-500 font-mono italic pl-3">
                      some hidden skills finally ;0
                    </p>
                  </div>
                </div>

                {/* Database Schema Reference */}
                <div className="space-y-2">
                  <p className="text-zinc-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    Reference Schema Image:
                  </p>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/deadface/2.png"
                      alt="Aurora Health Database MySQL Schema"
                      width={950}
                      height={450}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* 8 Operations Grid */}
                <div className="space-y-6">
                  {/* 9. Patient Registry */}
                  <div id="aurora-p1" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        9. Patient Registry
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> Retrieve the patient ID for the targeted individual admitted under suspicious circumstances.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT patient_id, first_name, last_name, admission_date 
FROM patients 
WHERE first_name = 'Gordon' OR notes LIKE '%admit%';`}</pre>
                    </div>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;AH-0044719&#125;</code>
                      </div>
                      <CopyButton text="deadface{AH-0044719}" />
                    </div>
                  </div>

                  {/* 10. Watching the VIP */}
                  <div id="aurora-p2" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        10. Watching the VIP
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> Determine which staff user account logged repeated unauthorized queries against VIP patient <code className="text-red-400 font-mono">AH-0044719</code>.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT username, COUNT(*) AS access_count 
FROM audit_logs 
WHERE record_id = 'AH-0044719' 
GROUP BY username 
ORDER BY access_count DESC;`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Top user was <code className="text-emerald-400 font-mono font-bold">rborden</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;rborden&#125;</code>
                      </div>
                      <CopyButton text="deadface{rborden}" />
                    </div>
                  </div>

                  {/* 11. Stay on the VIP */}
                  <div id="aurora-p3" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        11. Stay on the VIP
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> After <code className="text-zinc-200 font-mono">rborden</code> went dark, another user took over surveillance of the VIP patient.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT username, timestamp, action 
FROM audit_logs 
WHERE record_id = 'AH-0044719' 
  AND username != 'rborden' 
ORDER BY timestamp ASC;`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Accomplice user was <code className="text-emerald-400 font-mono font-bold">mreyes</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;mreyes&#125;</code>
                      </div>
                      <CopyButton text="deadface{mreyes}" />
                    </div>
                  </div>

                  {/* 12. Pharmacy Formulary */}
                  <div id="aurora-p4" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        12. Pharmacy Formulary
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> Count the total number of Schedule II controlled substances currently cataloged in the hospital pharmacy database.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT COUNT(*) 
FROM medications 
WHERE schedule = 'II' AND status = 'active';`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Count is <code className="text-emerald-400 font-mono font-bold">9</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;9&#125;</code>
                      </div>
                      <CopyButton text="deadface{9}" />
                    </div>
                  </div>

                  {/* 13. Drug Diversion */}
                  <div id="aurora-p5" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        13. Drug Diversion
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> Find the batch number of the diverted fentanyl / opioid prescription flagged in audit logs.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT p.batch_number, p.patient_id, p.med_id, a.flag_reason 
FROM prescriptions p 
JOIN audit_alerts a ON p.prescription_id = a.prescription_id 
WHERE a.flag_reason LIKE '%diversion%' OR p.status = 'diverted';`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Batch number <code className="text-emerald-400 font-mono font-bold">BR2938471</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;BR2938471&#125;</code>
                      </div>
                      <CopyButton text="deadface{BR2938471}" />
                    </div>
                  </div>

                  {/* 14. Ghost in the Registry */}
                  <div id="aurora-p6" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        14. Ghost in the Registry
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> A phantom patient record was surreptitiously created without valid physician signoff.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT patient_id, first_name, last_name, attending_physician 
FROM patients 
WHERE attending_physician IS NULL OR patient_id LIKE '%9000%';`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Phantom ID <code className="text-emerald-400 font-mono font-bold">AH-0090001</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;AH-0090001&#125;</code>
                      </div>
                      <CopyButton text="deadface{AH-0090001}" />
                    </div>
                  </div>

                  {/* 15. After the Lock */}
                  <div id="aurora-p7" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        15. After the Lock
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> Which electronic medicine cabinet / vault locker was breached right after hours?
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT vault_id, access_time, user_id 
FROM vault_access_logs 
WHERE TIME(access_time) > '21:00:00' 
ORDER BY access_time ASC 
LIMIT 1;`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Locker ID <code className="text-emerald-400 font-mono font-bold">VELT-0137</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;VELT-0137&#125;</code>
                      </div>
                      <CopyButton text="deadface{VELT-0137}" />
                    </div>
                  </div>

                  {/* 16. Clinical Trial Overwritten Efficacy */}
                  <div id="aurora-p8" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-base font-[family-name:var(--font-share-tech)]">
                        16. Clinical Trial Overwritten Efficacy
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">100 PTS</span>
                    </div>
                    <p className="text-zinc-300 text-xs">
                      <strong>Description:</strong> An insider tampered with the clinical trial efficacy metrics. Find the exact altered efficacy score value.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono font-semibold">Query:</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`SELECT trial_id, original_score, altered_score, (altered_score - original_score) AS diff 
FROM clinical_trials_audit 
WHERE altered_score IS NOT NULL;`}</pre>
                    </div>
                    <p className="text-zinc-400 text-xs"><strong>Result:</strong> Tampered score change is <code className="text-emerald-400 font-mono font-bold">2.3</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span>
                        <code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;2.3&#125;</code>
                      </div>
                      <CopyButton text="deadface{2.3}" />
                    </div>
                  </div>
                </div>
              </article>

              {/* ============================================================= */}
              {/* CATEGORY: OSINT, HARDWARE, STEGANOGRAPHY & TELEMETRY          */}
              {/* ============================================================= */}
              <div className="border-b border-zinc-800 pb-2 pt-6">
                <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold">Category 04</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)]">
                  OSINT, Hardware, Steganography &amp; Telemetry
                </h2>
              </div>

              {/* Challenge 17: Ghost of Squares Past */}
              <article id="ghost-of-squares-past" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      OSINT // Historical Geolocation
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      300 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    17. Ghost of Squares Past
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Identify four historic squares in Savannah, Georgia from monument photos and determine their establishment dates.
                  </p>
                </div>

                {/* Evidence Photos */}
                <div id="ghostsq-compass" className="space-y-4">
                  <p className="text-zinc-400 text-xs font-mono font-semibold uppercase tracking-wider">Image Evidence:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-xl space-y-2">
                      <span className="text-xs font-mono text-zinc-400 block font-bold">Marker Point 2 (East)</span>
                      <div className="rounded-lg overflow-hidden border border-zinc-800">
                        <Image
                          src="/images/deadface/point_2.png"
                          alt="Savannah Marker Point 2"
                          width={500}
                          height={350}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                    <div className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-xl space-y-2">
                      <span className="text-xs font-mono text-zinc-400 block font-bold">Marker Point 4 (West)</span>
                      <div className="rounded-lg overflow-hidden border border-zinc-800">
                        <Image
                          src="/images/deadface/point_4.png"
                          alt="Savannah Marker Point 4 - Telfair Academy"
                          width={500}
                          height={350}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps (Detailed OSINT Walkthrough):
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-4 text-xs">
                    <div className="space-y-1">
                      <p className="font-semibold text-zinc-200">1. Understanding the Compass Grid:</p>
                      <p className="text-zinc-400">The challenge arranged five historic locations across Savannah, Georgia in a compass cross pattern: Point 1 (North), Point 2 (East), Point 3 (South), Point 4 (West), and Point 5 (Center).</p>
                      <p className="font-mono text-zinc-400">Format: <code className="text-amber-300">deadface&#123;YYYY(North)-YYYY(East)-YYYY(South)-YYYY(West),surname(Center)&#125;</code></p>
                    </div>

                    <div id="ghostsq-points" className="space-y-3">
                      <div className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-lg space-y-1">
                        <p className="font-semibold text-white">2. Point 1 (North): Johnson Square (1733):</p>
                        <p className="italic text-zinc-400">&quot;First of them all, where the city began / A banker&apos;s green heart... / A Quaker from Rhode Island sleeps under stone here&quot;</p>
                        <p className="text-zinc-300">Savannah was founded in 1733 by James Oglethorpe. The very first square laid out was <strong>Johnson Square</strong> (in the banking/financial district). Rhode Island Quaker Major General Nathanael Greene is buried beneath its central 50ft marble obelisk. Year Laid Out: <strong className="text-emerald-400 font-mono">1733</strong>.</p>
                      </div>

                      <div className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-lg space-y-1">
                        <p className="font-semibold text-white">3. Point 3 (South): Chippewa Square (1815):</p>
                        <p className="italic text-zinc-400">&quot;Where a feather once drifted and a founder stands tall / battle of a northern frontier eighteen-twelve drawing near / the newest of all&quot;</p>
                        <p className="text-zinc-300">The drifting feather opening scene in <em>Forrest Gump</em> (1994) was filmed at a bus stop bench in <strong>Chippewa Square</strong>. The central bronze statue is Georgia&apos;s founder, James Oglethorpe. Named after the War of 1812 Battle of Chippawa. Year Laid Out: <strong className="text-emerald-400 font-mono">1815</strong>.</p>
                      </div>

                      <div className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-lg space-y-1">
                        <p className="font-semibold text-white">4. Point 4 (West): Telfair Square (1733):</p>
                        <p className="text-zinc-300">Photo analysis on <code className="text-zinc-200">point 4.png</code>: classical yellow Regency-style building with front steps and heroic statues (Michelangelo and Phidias). Google Lens identifies the <strong>Telfair Academy of Arts and Sciences</strong> facing <strong>Telfair Square</strong>. Year Laid Out: <strong className="text-emerald-400 font-mono">1733</strong>.</p>
                      </div>

                      <div className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-lg space-y-1">
                        <p className="font-semibold text-white">5. Point 2 (East): Oglethorpe Square (1742):</p>
                        <p className="text-zinc-300">Photo analysis on <code className="text-zinc-200">point 2.png</code>: brick pathways, live oaks with Spanish moss, and historic townhouses. Along President St directly opposite Telfair Square sits <strong>Oglethorpe Square</strong>. Year Laid Out: <strong className="text-emerald-400 font-mono">1742</strong>.</p>
                      </div>

                      <div id="ghostsq-flag" className="bg-[#07070a] border border-zinc-800/80 p-3 rounded-lg space-y-1">
                        <p className="font-semibold text-white">6. Point 5 (Center): Wright Square &amp; The Monument Surname (gordon):</p>
                        <p className="text-zinc-300">The intersection of Bull Street (North-South) and President Street (East-West) is <strong>Wright Square</strong>. In its center stands the massive 47-foot monument dedicated to <strong>William Washington Gordon</strong> (1796–1842). The lone surname carved in the stone base is <strong className="text-emerald-400 font-mono font-bold">gordon</strong>.</p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#111116] border border-zinc-800 rounded-lg">
                      <p className="text-zinc-400">7. Flag Construction:</p>
                      <p className="font-mono text-zinc-300">North (1733) - East (1742) - South (1815) - West (1733) - Center (gordon)</p>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;1733-1742-1815-1733-gordon&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{1733-1742-1815-1733-gordon}" />
                </div>
              </article>

              {/* Challenge 18: Traffic Accident / Car Crash */}
              <article id="traffic-accident" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      OSINT // Forensics
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      150 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    18. Traffic Accident / Car Crash
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    A photo of a traffic accident involving a commercial truck was recovered. Determine which company owns the truck and when that company was founded.
                  </p>
                  <div className="mt-2 text-xs font-mono text-zinc-500">
                    Flag Format: <code className="text-zinc-300">deadface&#123;MM_DD_YYYY&#125;</code>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Scene Inspection (<code className="text-red-400 font-mono">truck_crash.png</code>):</p>
                      <p className="text-zinc-300 text-xs">
                        Opened the provided photo showing a multi-vehicle collision at an intersection involving a commercial box truck and a black sedan:
                      </p>

                      <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/truck_crash.png"
                          alt="Traffic collision scene with commercial truck"
                          width={950}
                          height={500}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div id="crash-crop" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">2. Isolating Vehicle Markings:</p>
                      <p className="text-zinc-300 text-xs">
                        Zoomed in along the upper right portion of the white cargo box to look for commercial registration stencil markings required by federal law:
                      </p>

                      <div className="my-3 max-w-sm rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/usdot_crop.png"
                          alt="USDOT 080806 stenciled marking crop"
                          width={400}
                          height={200}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-amber-300">
                        USDOT: 080806
                      </div>
                    </div>

                    <div id="crash-safer" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">3. FMCSA SAFER Carrier Lookup:</p>
                      <p className="text-zinc-300 text-xs">
                        Queried the official Federal Motor Carrier Safety Administration (FMCSA) SAFER Company Snapshot database (<code className="text-zinc-200 font-mono">https://safer.fmcsa.dot.gov/CompanySnapshot.aspx</code>) using USDOT number <code className="text-red-400 font-mono">80806</code>:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 space-y-1">
                        <div><strong className="text-white">Legal Name:</strong> J.B. HUNT TRANSPORT INC</div>
                        <div><strong className="text-white">DBA:</strong> J.B. HUNT</div>
                        <div><strong className="text-white">Entity Type:</strong> Carrier</div>
                        <div><strong className="text-white">Physical Address:</strong> 615 J.B. HUNT CORPORATE DRIVE, LOWELL, AR 72745</div>
                      </div>
                    </div>

                    <div id="crash-flag" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">4. Founding Date OSINT:</p>
                      <p className="text-zinc-300 text-xs">
                        Checked public corporate records / Wikipedia for J.B. Hunt:
                      </p>
                      <ul className="text-xs space-y-1 text-zinc-300 pl-2">
                        <li>• <strong>Founded:</strong> August 10, 1961 (by Johnnie Bryan Hunt &amp; Johnelle Hunt)</li>
                        <li>• Formatting to <code className="text-zinc-200 font-mono">MM_DD_YYYY</code>:</li>
                        <li className="pl-4">• Month: August ➔ <code className="text-emerald-400 font-mono">08</code></li>
                        <li className="pl-4">• Day: 10 ➔ <code className="text-emerald-400 font-mono">10</code></li>
                        <li className="pl-4">• Year: 1961 ➔ <code className="text-emerald-400 font-mono">1961</code></li>
                        <li className="pl-4">• Combined: <code className="text-red-400 font-mono font-bold">08_10_1961</code></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;08_10_1961&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{08_10_1961}" />
                </div>
              </article>

              {/* Challenge 19: Conduct Unbecoming */}
              <article id="conduct-unbecoming" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Document &amp; Printer Forensics
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    19. Conduct Unbecoming
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    A scanned administrative disciplinary letter from Night Veil University was leaked. Identify the serial number / asset ID of the office printer that produced the document.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Conduct Unbecoming\</code></span>
                  </div>
                  <a
                    href="/images/deadface/Doc_20261017_0915.jpg"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download Doc_20261017_0915.jpg (3.4 MB)
                  </a>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="conduct-scan" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Document Inspection (<code className="text-red-400 font-mono">Doc_20261017_0915.jpg</code>):</p>
                      <p className="text-zinc-300 text-xs">
                        Opened the provided scan of an official student reprimand letter addressed to Cornelius Kellerman from Dr. Margaret Finch (Office of Student Conduct):
                      </p>

                      <div className="my-3 max-w-lg rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                        <Image
                          src="/images/deadface/Doc_20261017_0915.jpg"
                          alt="Official disciplinary letter scan"
                          width={700}
                          height={900}
                          className="w-full h-auto object-contain"
                        />
                      </div>

                      <p className="text-zinc-300 text-xs">
                        The challenge prompt asks for the specific <strong>equipment asset ID</strong> used to print the physical document. This points directly to <strong className="text-amber-300">Machine Identification Codes (MIC)</strong>  faint yellow tracking dots embedded by color laser printers into printed documents to identify the device model, serial number, and timestamp.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">2. Isolating the Yellow Tracking Dots:</p>
                      <p className="text-zinc-300 text-xs">
                        Yellow toner absorbs blue light while reflecting red and green. Therefore, decomposing the image into its RGB components and inspecting the inverted <strong>Blue channel</strong> (or boosting contrast/levels on faint background pixels) makes yellow tracking dots stand out as dark, clearly defined dots against the white page.
                      </p>
                      <p className="text-zinc-300 text-xs">
                        Scanning the margins revealed a repeating pattern in the lower right margin (around coordinates X ≈ 2330–2420, Y ≈ 3020–3180).
                        The dots form a clean rectangular grid: <strong>8 columns</strong> spaced evenly 12 pixels apart across 13 rows.
                      </p>
                    </div>

                    <div id="conduct-matrix" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">3. Decoding the Dot Matrix:</p>
                      <p className="text-zinc-300 text-xs">
                        Each row consists of an 8-bit byte (MSB to LSB), where a dot represents <code className="text-emerald-400 font-mono">1</code> and blank space represents <code className="text-zinc-500 font-mono">0</code>:
                      </p>

                      <div className="overflow-x-auto my-3">
                        <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded-lg overflow-hidden">
                          <thead className="bg-[#111116] text-zinc-400 border-b border-zinc-800">
                            <tr>
                              <th className="p-2.5">Row</th>
                              <th className="p-2.5">Binary (Dots)</th>
                              <th className="p-2.5">Hex</th>
                              <th className="p-2.5">Decoded ASCII</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/60 bg-[#07070a] text-zinc-300">
                            <tr><td className="p-2.5">Row 0</td><td className="p-2.5">11111111</td><td className="p-2.5">0xFF</td><td className="p-2.5 text-zinc-500">Sync / Alignment Header</td></tr>
                            <tr><td className="p-2.5">Row 1</td><td className="p-2.5">01001110</td><td className="p-2.5">0x4E</td><td className="p-2.5 text-emerald-400 font-bold">N</td></tr>
                            <tr><td className="p-2.5">Row 2</td><td className="p-2.5">01010110</td><td className="p-2.5">0x56</td><td className="p-2.5 text-emerald-400 font-bold">V</td></tr>
                            <tr><td className="p-2.5">Row 3</td><td className="p-2.5">01010101</td><td className="p-2.5">0x55</td><td className="p-2.5 text-emerald-400 font-bold">U</td></tr>
                            <tr><td className="p-2.5">Row 4</td><td className="p-2.5">00101101</td><td className="p-2.5">0x2D</td><td className="p-2.5 text-emerald-400 font-bold">-</td></tr>
                            <tr><td className="p-2.5">Row 5</td><td className="p-2.5">01010000</td><td className="p-2.5">0x50</td><td className="p-2.5 text-emerald-400 font-bold">P</td></tr>
                            <tr><td className="p-2.5">Row 6</td><td className="p-2.5">01010010</td><td className="p-2.5">0x52</td><td className="p-2.5 text-emerald-400 font-bold">R</td></tr>
                            <tr><td className="p-2.5">Row 7</td><td className="p-2.5">01001001</td><td className="p-2.5">0x49</td><td className="p-2.5 text-emerald-400 font-bold">I</td></tr>
                            <tr><td className="p-2.5">Row 8</td><td className="p-2.5">01001110</td><td className="p-2.5">0x4E</td><td className="p-2.5 text-emerald-400 font-bold">N</td></tr>
                            <tr><td className="p-2.5">Row 9</td><td className="p-2.5">01010100</td><td className="p-2.5">0x54</td><td className="p-2.5 text-emerald-400 font-bold">T</td></tr>
                            <tr><td className="p-2.5">Row 10</td><td className="p-2.5">00101101</td><td className="p-2.5">0x2D</td><td className="p-2.5 text-emerald-400 font-bold">-</td></tr>
                            <tr><td className="p-2.5">Row 11</td><td className="p-2.5">00110001</td><td className="p-2.5">0x31</td><td className="p-2.5 text-emerald-400 font-bold">1</td></tr>
                            <tr><td className="p-2.5">Row 12</td><td className="p-2.5">00110111</td><td className="p-2.5">0x37</td><td className="p-2.5 text-emerald-400 font-bold">7</td></tr>
                          </tbody>
                        </table>
                      </div>

                      <p className="text-zinc-300 text-xs">
                        Concatenating the decoded ASCII characters produces: <code className="text-red-400 font-mono font-bold">NVU-PRINT-17</code>.
                      </p>
                      <p className="text-zinc-500 text-xs italic font-mono">
                        if u have life don&apos;t try do it by your hands
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div id="conduct-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;NVU-PRINT-17&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{NVU-PRINT-17}" />
                </div>
              </article>

              {/* Challenge 20: Exfiltration */}
              <article id="exfiltration" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Steganography // Metadata &amp; Timing Forensics
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      250 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    20. Exfiltration
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    20 seemingly unrelated images (image_01.jpg to image_20.jpg) were recovered from an exfiltration channel. Uncover the covert data channel and reconstruct the flag.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Exfiltration\</code></span>
                  </div>
                  <a
                    href="/files/deadface/exfiltration.zip"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download exfiltration.zip (555.9 KB)
                  </a>
                </div>

                {/* Steps */}
                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider font-mono">
                    Retrace / Steps:
                  </p>

                  <div className="pl-4 border-l-2 border-red-500/30 space-y-6">
                    <div id="exfil-triage" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">1. Archive Extraction &amp; Initial Triage:</p>
                      <p className="text-zinc-300 text-xs">
                        Extracted <code className="text-red-400 font-mono">exfiltration.zip</code>, yielding 20 JPEG images named <code className="text-zinc-200 font-mono">image_01.jpg</code> through <code className="text-zinc-200 font-mono">image_20.jpg</code>. Standard checks for appended files after JPEG End of Image marker (<code className="text-zinc-200 font-mono">FF D9</code>) showed 0 bytes, confirming steganography was embedded within standard image headers.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">2. EXIF Metadata Inspection:</p>
                      <p className="text-zinc-300 text-xs">
                        Inspected the image EXIF tags across all 20 images and noticed two key patterns:
                      </p>
                      <ul className="text-xs space-y-1 text-zinc-300 pl-2">
                        <li>• <strong>Timestamp (<code className="text-zinc-200 font-mono">DateTimeOriginal</code>):</strong> Each file has an exact timestamp recorded on <code className="text-zinc-200 font-mono">2026:06:01</code> between <code className="text-zinc-200 font-mono">14:02:17</code> and <code className="text-zinc-200 font-mono">15:12:29</code>.</li>
                        <li>• <strong>Embedded Hex Tag:</strong> The Document Name / Image Identifier tag holds a hex string prefixed by <code className="text-amber-400 font-mono">IMG_</code> (e.g. <code className="text-zinc-200 font-mono">IMG_6465</code>, <code className="text-zinc-200 font-mono">IMG_61</code>, <code className="text-zinc-200 font-mono">IMG_7469</code>).</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <p className="text-zinc-200 font-semibold">3. Chronological Sorting &amp; Covert Stream:</p>
                      <p className="text-zinc-300 text-xs">
                        The filenames <code className="text-zinc-200 font-mono">image_01.jpg</code> through <code className="text-zinc-200 font-mono">image_20.jpg</code> are randomized decoys. Sorting the images chronologically by their EXIF timestamp orders the hex chunks sequentially:
                      </p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-lg p-3 font-mono text-xs text-zinc-300 space-y-1">
                        <div>image_07.jpg (14:02:17) ➔ 6465 (&apos;de&apos;)</div>
                        <div>image_14.jpg (14:04:52) ➔ 61 (&apos;a&apos;)</div>
                        <div>image_03.jpg (14:08:11) ➔ 6466 (&apos;df&apos;)</div>
                        <div>image_19.jpg (14:11:36) ➔ 61 (&apos;a&apos;)</div>
                        <div>image_01.jpg (14:13:09) ➔ 6365 (&apos;ce&apos;)</div>
                        <div>image_12.jpg (14:18:44) ➔ 7b (&apos;&#123;&apos;)</div>
                        <div>...</div>
                        <div>image_17.jpg (15:07:42) ➔ 6e67 (&apos;ng&apos;)</div>
                        <div>image_11.jpg (15:12:29) ➔ 7d (&apos;&#125;&apos;)</div>
                      </div>
                    </div>

                    <div id="exfil-script" className="space-y-3">
                      <p className="text-zinc-200 font-semibold">4. Automated Solver Script:</p>
                      <p className="text-zinc-300 text-xs">
                        Wrote a Python one-liner to parse EXIF timestamps and hex tags, sort chronologically, and decode the assembled hex stream:
                      </p>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Command Input:</p>
                      <div className="bg-[#050508] border border-zinc-800/80 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
<pre>{`python -c "
import glob, re
items = []
for f in glob.glob('extracted/*.jpg'):
    d = open(f, 'rb').read()
    ts = re.search(rb'(\\d{4}:\\d{2}:\\d{2} \\d{2}:\\d{2}:\\d{2})', d).group(1).decode()
    hx = re.search(rb'IMG_([0-9a-fA-F]+)', d).group(1).decode()
    items.append((ts, hx))
items.sort(key=lambda x: x[0])
hex_str = ''.join(x[1] for x in items)
print('Hex String:', hex_str)
print('Flag:', bytes.fromhex(hex_str).decode())
"`}</pre>
                      </div>

                      <p className="text-zinc-400 text-xs font-mono font-semibold">Command Output:</p>
                      <div className="bg-[#0e0e13] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-zinc-300 space-y-1">
                        <div><strong className="text-white">Hex String:</strong> <span className="text-amber-300">64656164666163657b74696d696e672d69732d65766572797468696e677d</span></div>
                        <div><strong className="text-white">Flag:</strong> <span className="text-red-400 font-bold select-all">deadface&#123;timing-is-everything&#125;</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flag Bar */}
                <div id="exfil-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;timing-is-everything&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{timing-is-everything}" />
                </div>
              </article>

              {/* Concluding Message Box From User Writeup */}
              <div className="bg-gradient-to-r from-red-500/10 via-zinc-900 to-black border border-red-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xl">
                <p className="font-mono text-base sm:text-lg text-white font-bold">
                  If u got here then THX for reading my writeups really appretiate it &lt;3
                </p>
                <p className="text-zinc-400 text-sm font-sans">
                  hope u learned AND haved fun
                </p>
                <div className="font-mono text-xs tracking-[0.25em] text-red-400 font-bold uppercase pt-2">
                  !!! UNTIL NEXT CTF !!!
                </div>
              </div>

              {/* ============================================================= */}
              {/* ADDITIONAL CTF CHALLENGES PRESERVED                           */}
              {/* ============================================================= */}
              <div className="border-b border-zinc-800 pb-2 pt-6">
                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-bold">Additional Operations</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)]">
                  Bonus Tracks: Hardware Telemetry &amp; LLMNR/SMB
                </h2>
              </div>

              {/* Bedside Manner */}
              <article id="bedside-manner" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Hardware // Medical Telemetry
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    Bedside Manner
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Unencrypted diagnostic telemetry stream captured from a patient vital signs monitor. Filtering sync frames and parsing unencrypted ASCII payloads emitted by embedded monitor firmware.
                  </p>
                </div>

                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\bedside manner\</code></span>
                  </div>
                </div>

                <div id="bedside-stream" className="space-y-3 font-sans text-sm text-zinc-300">
                  <p className="text-zinc-300 text-xs">
                    Examined the serial diagnostic stream for frame delimiters (<code className="text-red-400 font-mono">0xAA 0x55</code> sync header) and extracted embedded diagnostic ASCII text strings from vital sensor telemetry frames.
                  </p>
                </div>

                <div id="bedside-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">Captured Flag</span>
                    <span className="font-mono text-sm sm:text-base text-red-400 font-bold select-all">
                      deadface&#123;b3ds1d3_m4nn3r_s1gn4l&#125;
                    </span>
                  </div>
                  <CopyButton text="deadface{b3ds1d3_m4nn3r_s1gn4l}" />
                </div>
              </article>

              {/* Uninvited Guest PCAP Series */}
              <article id="uninvited-guest" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Network Forensics // SMB Poisoning
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      500 PTS TOTAL
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    Uninvited Guest PCAP Series (5 Operations)
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Deep forensic analysis of <code className="text-red-400 font-mono">demonne.pcap</code>: LLMNR/mDNS poisoning, capturing SMB2 NTLMv2 authentication NTProofStr, compromised user nkessler, exfiltrated annual_report.pdf, and C2 destination.
                  </p>
                </div>

                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Uninvited Guest\</code></span>
                  </div>
                  <a
                    href="/files/deadface/demonne.pcap"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors shrink-0 font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Download demonne.pcap (7.6 MB)
                  </a>
                </div>

                <div className="space-y-6">
                  {/* Op 1 */}
                  <div id="uninvited-p1" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <h4 className="text-white font-bold text-sm">1. Uninvited Guest (Rogue Responder IP)</h4>
                    <p className="text-zinc-300 text-xs">Nathan&apos;s workstation asked the local network to resolve a file-server name (<code className="text-zinc-200 font-mono">llmnr || mdns || nbns</code>). Host <code className="text-red-400 font-mono font-bold">10.77.10.66</code> supplied the poisoned spoofed answer.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div><span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span><code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;10.77.10.66&#125;</code></div>
                      <CopyButton text="deadface{10.77.10.66}" />
                    </div>
                  </div>

                  {/* Op 2 */}
                  <div id="uninvited-p2" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <h4 className="text-white font-bold text-sm">2. Challenge Accepted (First SMB NTLMv2 NTProofStr)</h4>
                    <p className="text-zinc-300 text-xs">Inspected Nathan&apos;s first SMB NTLMv2 authentication session setup (Frame 1512) and extracted the 16-byte NTProofStr security blob.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div><span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span><code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;5a2342014fe7f28997ce4dcd09f6b7f8&#125;</code></div>
                      <CopyButton text="deadface{5a2342014fe7f28997ce4dcd09f6b7f8}" />
                    </div>
                  </div>

                  {/* Op 3 */}
                  <div id="uninvited-p3" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <h4 className="text-white font-bold text-sm">3. Name to a Face (Compromised User)</h4>
                    <p className="text-zinc-300 text-xs">Parsed the NTLMSSP authentication payload username field, confirming compromised corporate identity <code className="text-emerald-400 font-mono font-bold">nkessler</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div><span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span><code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;nkessler&#125;</code></div>
                      <CopyButton text="deadface{nkessler}" />
                    </div>
                  </div>

                  {/* Op 4 */}
                  <div id="uninvited-p4" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <h4 className="text-white font-bold text-sm">4. Crown Jewels (Exfiltrated Document)</h4>
                    <p className="text-zinc-300 text-xs">Tracked SMB2 Read / Create file operations on rogue share <code className="text-zinc-200 font-mono">\\10.77.10.66\public</code>. The stolen document was <code className="text-emerald-400 font-mono font-bold">annual_report.pdf</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div><span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span><code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;annual_report.pdf&#125;</code></div>
                      <CopyButton text="deadface{annual_report.pdf}" />
                    </div>
                  </div>

                  {/* Op 5 */}
                  <div id="uninvited-p5" className="bg-[#07070a] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
                    <h4 className="text-white font-bold text-sm">5. Public Offering (External C2 Destination)</h4>
                    <p className="text-zinc-300 text-xs">Identified anomalous outbound external TCP socket connection carrying exfiltrated report data to remote endpoint <code className="text-emerald-400 font-mono font-bold">167.172.132.224:4815</code>.</p>
                    <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-xl flex justify-between items-center">
                      <div><span className="text-[10px] font-mono text-zinc-500 uppercase block">Flag</span><code className="text-red-400 font-mono text-sm font-bold select-all">deadface&#123;167.172.132.224_4815&#125;</code></div>
                      <CopyButton text="deadface{167.172.132.224_4815}" />
                    </div>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
