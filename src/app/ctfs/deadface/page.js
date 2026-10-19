"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrtCardHeader from "@/components/CrtCardHeader";
import CopyButton from "@/components/CopyButton";

export default function DeadfacePage() {
  const challenges = [
    {
      id: "bad-guys-be-bad",
      num: "01",
      title: "Bad Guys Be Bad",
      category: "Traffic Analysis",
      points: "100 PTS",
      badge: "PCAP // HTTP C2",
      tagline: "Periodic HTTP Beaconing & Command Extraction",
      summary: "Analyzing capture.pcap for C2 server communications, beacons, and unauthorized data transfers. Identifying periodic GET requests to external host 192.168.1.105:4444 and decoding exfiltrated commands.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\1\\",
      downloadFile: "/files/deadface/deadface_pcap02.pcap",
      downloadFileName: "deadface_pcap02.pcap (63.2 KB)",
      sections: [
        { id: "badguys-overview", title: "PCAP Triage & HTTP Beaconing", tag: "HTTP Filter" },
        { id: "badguys-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "data-go-brrrrr",
      num: "02",
      title: "Data Go Brrrrr",
      category: "Covert Exfiltration",
      points: "150 PTS",
      badge: "ICMP // HEX PAYLOAD",
      tagline: "High-Volume ICMP Echo Covert Exfiltration",
      summary: "Suspect network traffic contains high-volume exfiltration over an unusual protocol. Extracting custom hex data blocks from ICMP echo request payloads via tshark and converting to ASCII.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Data Go Brrrrr\\",
      downloadFile: "/files/deadface/PCAP01.pcap",
      downloadFileName: "PCAP01.pcap (2.9 KB)",
      sections: [
        { id: "datago-overview", title: "ICMP Payload Anomaly Detection", tag: "TShark" },
        { id: "datago-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "dont-leave-me-hanging",
      num: "03",
      title: "Don't Leave Me Hanging",
      category: "VoIP & Audio Forensics",
      points: "250 PTS",
      badge: "VOIP // DTMF IVR",
      tagline: "VoIP Telephony Menu & Spoken Menus Triage",
      summary: "Intercepted audio and telephony capture containing a suspect voicemail or automated IVR call. Playing RTP audio streams in Wireshark to catch the spoken menu prompt and DTMF flag phrase.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Don't Leave Me Hanging\\",
      downloadFile: "/files/deadface/pbx-diag-20261008.tar.gz",
      downloadFileName: "pbx-diag-20261008.tar.gz (8.4 KB)",
      extraFiles: [
        { name: "call_in.wav (397 KB)", url: "/files/deadface/call_in.wav" },
        { name: "call_out.wav (397 KB)", url: "/files/deadface/call_out.wav" },
        { name: "accurate_dtmf.py (2.2 KB)", url: "/files/deadface/accurate_dtmf.py" },
      ],
      sections: [
        { id: "dontleave-voip", title: "VoIP Telephony Stream Inspection", tag: "Wireshark" },
        { id: "dontleave-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "pirates-life-part-1",
      num: "04",
      title: "A Pirate's Life for Me Part 1",
      category: "Web Traffic Forensics",
      points: "200 PTS",
      badge: "HTTP // HEADERS",
      tagline: "Multi-Stream Tracking Headers & Custom User-Agent",
      summary: "Investigating suspect mobile browsing sessions across university and target domains in pirateslife.pcap. Correlating custom SunstalkerDFBrower user-agent headers across 3 TCP streams to assemble the 3-part flag.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\A Pirate's Life for Me Part 1\\",
      downloadInfo: "pirateslife.pcap (565 MB) / pirateslife.7z (514 MB) - Large Capture",
      sections: [
        { id: "pirate-streams", title: "3 TCP Streams & Custom Tracking Headers", tag: "Streams 97, 169, 224" },
        { id: "pirate-flag", title: "Flag Assembly", tag: "Flag" },
      ]
    },
    {
      id: "who-goes-there",
      num: "05",
      title: "Who Goes There? (Parts 1, 2, 3)",
      category: "Memory Forensics",
      points: "400 PTS",
      badge: "VOLATILITY 3 // MEMORY",
      tagline: "Windows Kernel Memory Dump: Host, User & C2 Sockets",
      summary: "Investigating an 8.58 GB raw memory dump (memory.raw) from compromised endpoint DESKTOP-8K4N19S with Volatility 3. Extracting active username, system hostname, and established outbound C2 socket.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Who Goes There\\",
      downloadInfo: "memory.7z (1.34 GB) / memory.raw (8.58 GB) - Enterprise Memory Dump",
      sections: [
        { id: "whogoes-user", title: "Part 1: Active User Account (windows.envars)", tag: "nkessler" },
        { id: "whogoes-host", title: "Part 2: Workstation Hostname", tag: "DESKTOP-8K4N19S" },
        { id: "whogoes-socket", title: "Part 3: Established C2 Socket (windows.netscan)", tag: "Socket PID" },
      ]
    },
    {
      id: "hooked",
      num: "06",
      title: "Hooked",
      category: "Browser Forensics",
      points: "200 PTS",
      badge: "CHROME // SQLITE 3",
      tagline: "Chrome Profile Triage & Phishing Link Reconstruction",
      summary: "Finance employee Fletcher Kampeter (DEMONNE-WS04) fell for a spearphishing email. Analyzing extracted Google Chrome History SQLite database to determine the exact phishing landing URL and token.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Hooked\\",
      downloadFile: "/files/deadface/CTF_Caches_Kampeter_1.zip",
      downloadFileName: "CTF_Caches_Kampeter_1.zip (9.0 KB)",
      extraFiles: [
        { name: "inspect_history.py (1.3 KB)", url: "/files/deadface/inspect_history.py" },
      ],
      sections: [
        { id: "hooked-sqlite", title: "Chrome History SQLite Database Query", tag: "urls Table" },
        { id: "hooked-timeline", title: "Phishing Lure & Click Timeline", tag: "Token" },
        { id: "hooked-flag", title: "Flag Capture", tag: "Flag" },
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
      summary: "A DEADFACE threat actor stole victim Daniel Hameser's digital identity. Decompressing notes.docx OpenXML metadata to uncover author ghostwriter404 and correlating against the DEADFACE threat dossier.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\File Dump 01\\",
      downloadFile: "/files/deadface/File_Dump_Challenge.zip",
      downloadFileName: "File_Dump_Challenge.zip (14.0 MB)",
      sections: [
        { id: "filedump-metadata", title: "OpenXML core.xml Metadata Extraction", tag: "docProps" },
        { id: "filedump-intel", title: "Threat Actor Correlation", tag: "gh0st404" },
      ]
    },
    {
      id: "art-heist-forgery",
      num: "08",
      title: "Art Heist - The Forgery",
      category: "Steganography",
      points: "200 PTS",
      badge: "PNG // XMP METADATA",
      tagline: "Museum Painting Forgery & XMP Embedded Signatures",
      summary: "Investigating 5 classic museum paintings for digital replacement. Filtering by file modification timestamps and regex searching embedded XMP metadata to catch Lamia's signature in Painting_002.png.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Art Heist The Forgery\\",
      downloadFile: "/files/deadface/CTF_Forgery_Paintings.zip",
      downloadFileName: "CTF_Forgery_Paintings.zip (9.5 MB)",
      sections: [
        { id: "artheist-timestamp", title: "Timestamp Triage & XMP Carving", tag: "Painting_002" },
        { id: "artheist-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "aurora-health-suite",
      num: "09",
      title: "Aurora Health Database Suite",
      category: "Database Forensics (SQL)",
      points: "800 PTS",
      badge: "MYSQL // AUDIT LOGS",
      tagline: "Hospital MySQL Database & Tampered Audit Log Queries (8 Flags)",
      summary: "Complete operational SQL investigation across the Aurora Health MySQL database (aurora.sql): hunting VIP patients, unauthorized access trails, Schedule II drug counts, prescription diversion, and clinical trial score alterations.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\database\\",
      sections: [
        { id: "aurora-p1", title: "1. Patient Registry (AH-0044719)", tag: "Gordon" },
        { id: "aurora-p2", title: "2. Watching the VIP (rborden)", tag: "Audit Top" },
        { id: "aurora-p3", title: "3. Stay on the VIP (mreyes)", tag: "Accomplice" },
        { id: "aurora-p4", title: "4. Pharmacy Formulary (Schedule II Count)", tag: "9 Drugs" },
        { id: "aurora-p5", title: "5. Drug Diversion (Batch BR2938471)", tag: "Fentanyl" },
        { id: "aurora-p6", title: "6. Ghost in the Registry (AH-0090001)", tag: "Phantom ID" },
        { id: "aurora-p7", title: "7. After the Lock (Locker VELT-0137)", tag: "After Hours" },
        { id: "aurora-p8", title: "8. Clinical Trial Overwritten Efficacy (2.3)", tag: "Score Diff" },
      ]
    },
    {
      id: "ghost-of-squares-past",
      num: "10",
      title: "Ghost of Squares Past",
      category: "OSINT / Geolocation",
      points: "300 PTS",
      badge: "OSINT // GEOLOCATION",
      tagline: "Savannah Georgia Historic Squares Compass Grid",
      summary: "Solving a 5-point compass geometry riddle across Savannah, Georgia. Identifying Johnson, Oglethorpe, Chippewa, and Telfair squares, matching historical layout dates, and finding the central Gordon monument surname.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Ghost of Squares Past\\",
      sections: [
        { id: "ghostsq-compass", title: "Compass Grid Geometry & Architectural Clues", tag: "Savannah" },
        { id: "ghostsq-points", title: "Points 1-5 Historical Identification", tag: "1733-1742-1815-1733" },
        { id: "ghostsq-flag", title: "Flag Formulation", tag: "Flag" },
      ]
    },
    {
      id: "traffic-accident",
      num: "11",
      title: "Traffic Accident / Commercial Crash",
      category: "OSINT / Vehicle Forensics",
      points: "150 PTS",
      badge: "FMCSA // VEHICLE FORENSICS",
      tagline: "USDOT Number Carving & Driver Registration Intelligence",
      summary: "Analyzing a photo of a commercial truck crash. Enhancing and cropping the commercial door to read the USDOT license, querying FMCSA SAFER company snapshot, and finding the driver's date of birth.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\car crash\\",
      sections: [
        { id: "crash-crops", title: "Door Cropping & USDOT Registration Lookup", tag: "FMCSA" },
        { id: "crash-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "conduct-unbecoming",
      num: "12",
      title: "Conduct Unbecoming",
      category: "Document & Hardware Forensics",
      points: "200 PTS",
      badge: "MIC // PRINTER FORENSICS",
      tagline: "Yellow Tracking Dots & Machine Identification Codes",
      summary: "A scanned administrative reprimand letter was leaked. Inspecting yellow channel Machine Identification Codes (MIC) watermarks in an image editor to extract the printer hardware serial number.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Conduct Unbecoming\\",
      downloadFile: "/images/deadface/Doc_20261017_0915.jpg",
      downloadFileName: "Doc_20261017_0915.jpg (3.4 MB)",
      sections: [
        { id: "conduct-mic", title: "Color Balance Triage & Tracking Watermark", tag: "Yellow Channel" },
        { id: "conduct-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "bedside-manner",
      num: "13",
      title: "Bedside Manner",
      category: "Hardware & Telemetry",
      points: "200 PTS",
      badge: "SERIAL // MEDICAL TELEMETRY",
      tagline: "Patient Monitor Diagnostic Stream Parsing",
      summary: "Unencrypted diagnostic telemetry stream captured from a patient vital signs monitor. Filtering sync frames and parsing unencrypted ASCII payloads emitted by the embedded monitor firmware.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\bedside manner\\",
      sections: [
        { id: "bedside-stream", title: "Serial Diagnostic Frame Parsing", tag: "ASCII Filter" },
        { id: "bedside-flag", title: "Flag Capture", tag: "Flag" },
      ]
    },
    {
      id: "exfiltration",
      num: "14",
      title: "Exfiltration",
      category: "Steganography & Timing",
      points: "250 PTS",
      badge: "EXIF // TIMING COVERT",
      tagline: "Chronological EXIF Timestamp Sorting & Hex Chunk Reassembly",
      summary: "20 seemingly unrelated images recovered from an exfiltration channel. Sorting images chronologically by DateTimeOriginal timestamp to align embedded IMG_<hex> tags into the correct sequence.",
      folder: "C:\\CTFS\\DEAD FACE CTF\\Exfiltration\\",
      downloadFile: "/files/deadface/exfiltration.zip",
      downloadFileName: "exfiltration.zip (555.9 KB)",
      sections: [
        { id: "exfil-sorting", title: "EXIF Timestamp Ordering & Hex Tag Carving", tag: "Python Script" },
        { id: "exfil-flag", title: "Flag Capture", tag: "Flag" },
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
      summary: "Deep forensic analysis of demonne.pcap. Detecting LLMNR/mDNS poisoning by rogue host 10.77.10.66, capturing SMB2 NTLMv2 authentication NTProofStr, compromised user nkessler, exfiltrated annual_report.pdf, and C2 destination.",
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
  const [activeSectionId, setActiveSectionId] = useState("badguys-overview");

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
              <span className="text-red-400 font-bold">●</span> 15 Challenge Tracks
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
                <CrtCardHeader platform="DEADFACE CTF" category="Traffic Analysis / PCAP" points="100 PTS" slug="bad-guys-be-bad" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      PCAP // HTTP C2
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      100 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    1. Bad Guys Be Bad
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Analyze <code className="text-red-400 font-mono">capture.pcap</code> for C2 server communications, beacons, and unauthorized data transfers.
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

                <div id="badguys-overview" className="space-y-3 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Opened <code className="font-mono text-xs text-zinc-200">capture.pcap</code> in Wireshark.</li>
                    <li>Filtered for HTTP traffic: <code className="font-mono text-xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-red-400">http.request</code></li>
                    <li>Spotted regular periodic GET requests hitting external host <code className="font-mono text-xs text-zinc-200">192.168.1.105:4444</code>.</li>
                    <li>Followed the HTTP stream — the beacon headers and URI parameters contained the exfiltrated command strings.</li>
                    <li>Decoded the payload directly in the C2 conversation.</li>
                  </ol>
                </div>

                <div id="badguys-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;c2_traffic_be_bussing&#125;</code>
                  </div>
                  <CopyButton text="deadface{c2_traffic_be_bussing}" />
                </div>
              </article>

              {/* Challenge 2: Data Go Brrrrr */}
              <article id="data-go-brrrrr" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Traffic Analysis / Covert Exfil" points="150 PTS" slug="data-go-brrrrr" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      ICMP // COVERT EXFIL
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      150 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    2. Data Go Brrrrr
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Suspect network traffic contains high-volume exfiltration over an unusual protocol.
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

                <div id="datago-overview" className="space-y-3 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Filtered the PCAP for ICMP packets: <code className="font-mono text-xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-red-400">icmp</code></li>
                    <li>Noticed normal ping request payloads were replaced with custom hex data blocks instead of default OS patterns.</li>
                    <li>
                      Extracted all echo request data bytes using <code className="font-mono text-xs text-zinc-200">tshark</code>:
                      <div className="mt-2 bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                        <pre><code>tshark -r capture.pcap -Y &quot;icmp.type == 8&quot; -T fields -e data &gt; ping_bytes.hex</code></pre>
                      </div>
                    </li>
                    <li>Converted the hex stream to ASCII text in CyberChef (<code className="font-mono text-xs text-zinc-200">From Hex</code>).</li>
                    <li>The reconstructed text contained the flag.</li>
                  </ol>
                </div>

                <div id="datago-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;icmp_3xfil_wh3n_th3y_least_susp3ct&#125;</code>
                  </div>
                  <CopyButton text="deadface{icmp_3xfil_wh3n_th3y_least_susp3ct}" />
                </div>
              </article>

              {/* Challenge 3: Don't Leave Me Hanging */}
              <article id="dont-leave-me-hanging" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Traffic Analysis / VoIP & Audio" points="250 PTS" slug="dont-leave-me-hanging" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      VOIP // RTP AUDIO
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      250 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    3. Don&apos;t Leave Me Hanging
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Intercepted audio and telephony capture containing a suspect voicemail or automated IVR call.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="font-mono text-xs text-zinc-400">
                      <span className="text-zinc-500 block">SOURCE DIRECTORY</span>
                      <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Don&apos;t Leave Me Hanging\</code></span>
                    </div>
                    <span className="text-zinc-500 font-mono text-xs">PCAP: 81.3 MB (DontLeaveMeHanging.pcap)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60">
                    <a
                      href="/files/deadface/pbx-diag-20261008.tar.gz"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors font-bold"
                    >
                      pbx-diag-20261008.tar.gz (8.4 KB)
                    </a>
                    <a
                      href="/files/deadface/call_in.wav"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-xs transition-colors"
                    >
                      call_in.wav (397 KB)
                    </a>
                    <a
                      href="/files/deadface/call_out.wav"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-xs transition-colors"
                    >
                      call_out.wav (397 KB)
                    </a>
                    <a
                      href="/files/deadface/accurate_dtmf.py"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-700 font-mono text-xs transition-colors"
                    >
                      accurate_dtmf.py (2.2 KB)
                    </a>
                  </div>
                </div>

                {/* Evidence Image */}
                <div className="bg-[#111116] border border-zinc-800 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    Intercepted Voicemail / User Record:
                  </span>
                  <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                    <Image
                      src="/images/deadface/maude.png"
                      alt="VoIP Menu Evidence"
                      width={400}
                      height={200}
                      className="rounded-lg object-contain"
                    />
                  </div>
                </div>

                <div id="dontleave-voip" className="space-y-3 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Opened the capture file in Wireshark.</li>
                    <li>Went to <code className="font-mono text-xs text-zinc-200">Telephony</code> &rarr; <code className="font-mono text-xs text-zinc-200">VoIP Calls</code> &rarr; <code className="font-mono text-xs text-zinc-200">Play Streams</code>.</li>
                    <li>Listened to the automated phone menu prompt (<em>&quot;Press 1 for Deadface...&quot;</em>).</li>
                    <li>The IVR DTMF tone and spoken message instructed to press 1, giving the exact flag phrase.</li>
                  </ol>
                </div>

                <div id="dontleave-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;Pr355_0n3_f0r_D34df4c3&#125;</code>
                  </div>
                  <CopyButton text="deadface{Pr355_0n3_f0r_D34df4c3}" />
                </div>
              </article>

              {/* Challenge 4: A Pirate's Life for Me Part 1 */}
              <article id="pirates-life-part-1" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Traffic Analysis / Web Traffic" points="200 PTS" slug="pirates-life-part-1" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      HTTP // HEADERS TRIAGE
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    4. A Pirate&apos;s Life for Me Part 1
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Investigate suspect mobile browsing sessions across university and target domains in <code className="text-red-400 font-mono">pirateslife.pcap</code> to uncover covert tracking headers.
                  </p>
                </div>

                {/* Challenge Artifact Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\A Pirate&apos;s Life for Me Part 1\</code></span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    Capture Size: 565 MB (pirateslife.pcap / 7z: 514 MB)
                  </span>
                </div>

                <div id="pirate-streams" className="space-y-4 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Specific Wireshark Streams &amp; Packets:
                  </h4>
                  <ul className="list-disc list-outside pl-5 space-y-2 leading-relaxed">
                    <li>The attacker/victim used a custom mobile User-Agent: <code className="font-mono text-xs text-zinc-200">SunstalkerDFBrower/2.0 (Linux; Android 14)</code> from client IP <code className="font-mono text-xs text-zinc-200">172.16.14.43</code>.</li>
                    <li>
                      The flag is split across <strong>3 distinct HTTP requests</strong> in 3 separate TCP streams:
                      <ol className="list-decimal list-outside pl-5 space-y-1 mt-2 font-mono text-xs text-zinc-300">
                        <li>
                          <strong>Packet 19114 (TCP Stream 97):</strong> Host: <code className="text-zinc-200">nightvaleuniversity.edu</code> &rarr; Custom Header: <code className="text-cyan-400">X-1-Trace-Part: deadface&#123;X-M4rk5_</code>
                        </li>
                        <li>
                          <strong>Packet 43516 (TCP Stream 169):</strong> Host: <code className="text-zinc-200">aurorahhs.com</code> &rarr; Custom Header: <code className="text-cyan-400">X-2-Mark: th3_sp0t_</code>
                        </li>
                        <li>
                          <strong>Packet 56543 (TCP Stream 224):</strong> Host: <code className="text-zinc-200">birdsarejustbirds.gov</code> &rarr; Custom Header: <code className="text-cyan-400">X-3-Spot: I_gu355&#125;</code>
                        </li>
                      </ol>
                    </li>
                  </ul>

                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400 pt-2">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Opened <code className="font-mono text-xs text-zinc-200">pirateslife.pcap</code> in Wireshark.</li>
                    <li>
                      Filtered for the unique mobile browser or custom headers:
                      <div className="mt-2 bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                        <pre><code>http.user_agent contains &quot;Sunstalker&quot;</code></pre>
                      </div>
                      <span className="text-xs text-zinc-500 italic block mt-1">
                        *(or filter by custom headers: <code className="font-mono">http contains &quot;Trace-Part&quot; || http contains &quot;X-2-Mark&quot;</code>)*
                      </span>
                    </li>
                    <li>Inspected the HTTP request headers across the 3 streams (Streams <code className="font-mono text-xs">97</code>, <code className="font-mono text-xs">169</code>, <code className="font-mono text-xs">224</code>).</li>
                    <li>
                      Concatenated the three sequential header values:
                      <div className="mt-2 bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg font-mono text-xs text-zinc-300 space-y-1">
                        <div>Part 1: <code className="text-cyan-400">deadface&#123;X-M4rk5_</code></div>
                        <div>Part 2: <code className="text-cyan-400">th3_sp0t_</code></div>
                        <div>Part 3: <code className="text-cyan-400">I_gu355&#125;</code></div>
                      </div>
                    </li>
                    <li>Combined them into the full flag.</li>
                  </ol>
                </div>

                <div id="pirate-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;X-M4rk5_th3_sp0t_I_gu355&#125;</code>
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
                <CrtCardHeader platform="DEADFACE CTF" category="Memory Forensics (Volatility 3)" points="400 PTS" slug="who-goes-there" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      VOLATILITY 3 // MEMORY
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      3 FLAGS (400 PTS)
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    5. Who Goes There? (Parts 1, 2, 3)
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Memory dump taken from a compromised corporate endpoint (<code className="text-red-400 font-mono">DESKTOP-8K4N19S</code>). Identify the active user, workstation hostname, and attacker C2 socket connection.
                  </p>
                </div>

                {/* Challenge Artifact Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Who Goes There\</code></span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    Memory Dump: 8.58 GB (memory.raw / 7z: 1.34 GB)
                  </span>
                </div>

                <div className="space-y-6 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>

                  {/* Part 1 */}
                  <div id="whogoes-user" className="space-y-3 bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">Part 1 (User Account):</span>
                    <p>Ran Volatility 3 environment scan:</p>
                    <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                      <pre><code>python3 vol.py -f memory.raw windows.envars</code></pre>
                    </div>
                    <p>Checked <code className="font-mono text-xs text-zinc-200">USERNAME</code> variable &mdash; active user was <code className="font-mono text-xs text-red-400">nkessler</code>.</p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-xs text-zinc-500 font-mono block">Flag 1:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;nkessler&#125;</code>
                      </div>
                      <CopyButton text="deadface{nkessler}" />
                    </div>
                  </div>

                  {/* Part 2 */}
                  <div id="whogoes-host" className="space-y-3 bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">Part 2 (Computer Name):</span>
                    <p>Checked <code className="font-mono text-xs text-zinc-200">COMPUTERNAME</code> in the environment table and system hive.</p>
                    <p>Hostname returned was <code className="font-mono text-xs text-red-400">DESKTOP-8K4N19S</code>.</p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-xs text-zinc-500 font-mono block">Flag 2:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;DESKTOP-8K4N19S&#125;</code>
                      </div>
                      <CopyButton text="deadface{DESKTOP-8K4N19S}" />
                    </div>
                  </div>

                  {/* Part 3 */}
                  <div id="whogoes-socket" className="space-y-3 bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">Part 3 (C2 Network Socket):</span>
                    <p>Ran <code className="font-mono text-xs text-zinc-200">windows.netscan</code> to find active outbound network connections:</p>
                    <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                      <pre><code>python3 vol.py -f memory.raw windows.netscan</code></pre>
                    </div>
                    <p>Found established connection to remote IP <code className="font-mono text-xs text-red-400">167.172.132.224</code> on port <code className="font-mono text-xs text-red-400">4815</code> under PID <code className="font-mono text-xs text-red-400">30</code>.</p>
                    <p>Joined with underscores as required by challenge format: <code className="font-mono text-xs text-zinc-200">IP_Port_PID</code>.</p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-xs text-zinc-500 font-mono block">Flag 3:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;167.172.132.224_4815_30&#125;</code>
                      </div>
                      <CopyButton text="deadface{167.172.132.224_4815_30}" />
                    </div>
                  </div>

                </div>
              </article>

              {/* Challenge 6: Hooked */}
              <article id="hooked" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Digital Forensics / Browser Forensics" points="200 PTS" slug="hooked" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      CHROME // SQLITE 3
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    6. Hooked
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Fletcher Kampeter (Finance division, workstation <code className="text-red-400 font-mono">DEMONNE-WS04</code>) fell for a spearphishing email on March 14, 2025 around 10:23 AM. Investigate the extracted Google Chrome profile artifacts in <code className="text-red-400 font-mono">CTF_Caches_Kampeter_1.zip</code> to find the exact phishing landing URL and authentication token.
                  </p>
                </div>

                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="font-mono text-xs text-zinc-400">
                      <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                      <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Hooked\</code></span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60">
                    <a
                      href="/files/deadface/CTF_Caches_Kampeter_1.zip"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-xs transition-colors font-bold"
                    >
                      Download CTF_Caches_Kampeter_1.zip (9.0 KB)
                    </a>
                    <a
                      href="/files/deadface/inspect_history.py"
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-700 font-mono text-xs transition-colors"
                    >
                      inspect_history.py (1.3 KB)
                    </a>
                  </div>
                </div>

                <div id="hooked-sqlite" className="space-y-4 font-sans text-sm text-zinc-300">
                  <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg text-xs font-mono text-zinc-400">
                    <span className="text-zinc-500 block uppercase">Artifact Analyzed:</span>
                    Database: <code className="text-zinc-200">extracted\ctf_artifacts\Chrome\User Data\Default\History</code> (SQLite 3)
                  </div>

                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Forensic Clues &amp; Timeline:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-3 leading-relaxed">
                    <li>
                      Opened <code className="font-mono text-xs text-zinc-200">History</code> in DB Browser for SQLite (or Python <code className="font-mono text-xs">sqlite3</code>) and queried the <code className="font-mono text-xs">urls</code> table:
                      <div className="mt-2 bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                        <pre><code>SELECT id, url, title, datetime((last_visit_time/1000000)-11644473600, &apos;unixepoch&apos;) AS last_visit_utc 
FROM urls ORDER BY id ASC;</code></pre>
                      </div>
                    </li>
                    <li id="hooked-timeline">
                      <strong>The Phishing Lure (10:22:15 UTC):</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-zinc-400">
                        <li>User accessed personal Gmail (<code className="text-zinc-300 font-mono">fletcher.kampeter.personal@gmail.com</code>)</li>
                        <li>Subject: <code className="text-zinc-200">[URGENT] De Monne VPN Migration - Action Required - Gmail</code></li>
                      </ul>
                    </li>
                    <li>
                      <strong>The Click &amp; Phishing Portal (10:23:44 UTC):</strong>
                      <p className="mt-1">
                        The <code className="font-mono text-xs text-zinc-200">visits</code> table shows transition <code className="font-mono text-xs text-cyan-400">PAGE_TRANSITION_LINK</code> (<code className="font-mono text-xs">from_visit = 5</code>), proving the employee clicked the link inside that urgent email.
                      </p>
                      <p className="mt-1">
                        Legitimate company domains are <code className="font-mono text-xs">demonne.int</code> and <code className="font-mono text-xs">demonne.sharepoint.com</code>, but the link went to an unencrypted lookalike phishing domain:
                      </p>
                      <div className="mt-2 p-2.5 bg-red-950/30 border border-red-500/40 rounded-lg font-mono text-xs text-red-300 break-all">
                        http://demonne-secure-portal.net/login?ref=vpn_auth&amp;token=df4e91bc
                      </div>
                    </li>
                    <li>
                      Followed immediately at 10:23:45 by a redirect to <code className="font-mono text-xs text-zinc-300">/auth/redirect?session=9f3a22cd&amp;status=ok</code> after credentials were stolen.
                    </li>
                  </ol>
                </div>

                <div id="hooked-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-xs sm:text-sm font-bold break-all">deadface&#123;http://demonne-secure-portal.net/login?ref=vpn_auth&amp;token=df4e91bc&#125;</code>
                  </div>
                  <CopyButton text="deadface{http://demonne-secure-portal.net/login?ref=vpn_auth&token=df4e91bc}" />
                </div>
              </article>

              {/* Challenge 7: File Dump 01 */}
              <article id="file-dump-01" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Digital Forensics / Artifact Inspection & OSINT" points="250 PTS" slug="file-dump-01" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      OPENXML // THREAT INTEL
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      250 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    7. File Dump 01
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    A DEADFACE hacker stole a victim&apos;s (Daniel Hameser) entire digital identity. Retrace the attacker&apos;s traces in <code className="text-red-400 font-mono">File_Dump_Challenge.zip</code> to identify which DEADFACE threat actor was behind the theft.
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

                {/* Evidence Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                      Victim Profile Artifact:
                    </span>
                    <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                      <Image
                        src="/images/deadface/profile_pic.png"
                        alt="Profile Pic"
                        width={220}
                        height={220}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                  <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                      Staged Note Snip:
                    </span>
                    <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                      <Image
                        src="/images/deadface/snip.png"
                        alt="Snip Artifact"
                        width={280}
                        height={220}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div id="filedump-metadata" className="space-y-4 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps (with exact Input &amp; Output):
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-3 leading-relaxed">
                    <li>Extracted <code className="font-mono text-xs text-zinc-200">File_Dump_Challenge.zip</code> and inspected the personal files (resumes, notes, photos, receipts).</li>
                    <li>
                      Found an operational note staged by the threat actor: <code className="font-mono text-xs text-red-400">notes.docx</code>:
                      <blockquote className="mt-2 border-l-2 border-red-500/50 pl-3 italic text-zinc-400 text-xs">
                        &ldquo;Remember to keep the Hameser accounts consistent across sites. Use the FL address for anything that mails a code. Reroute the rest. Coffee place wifi is reliable in the mornings.&rdquo;
                      </blockquote>
                    </li>
                    <li>
                      Inspected the OpenXML document metadata of <code className="font-mono text-xs text-zinc-200">notes.docx</code> to catch the author:
                      <div className="mt-2 space-y-2 font-mono text-xs">
                        <span className="text-zinc-500 block">Command Input:</span>
                        <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 text-zinc-300 overflow-x-auto">
                          <pre><code>tar -O -xf notes.docx docProps/core.xml</code></pre>
                        </div>
                        <span className="text-zinc-500 block">Command Output:</span>
                        <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 text-zinc-400 overflow-x-auto">
                          <pre><code>{`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ...>
    <dc:title>notes</dc:title>
    <dc:creator>ghostwriter404</dc:creator>
    <cp:lastModifiedBy>GHOST404-PC</cp:lastModifiedBy>
    <cp:revision>1</cp:revision>
    <dcterms:created xsi:type="dcterms:W3CDTF">2026-08-22T21:33:04.269Z</dcterms:created>
    <dcterms:modified xsi:type="dcterms:W3CDTF">2026-08-22T21:33:04.269Z</dcterms:modified>
</cp:coreProperties>`}</code></pre>
                        </div>
                        <span className="text-zinc-500 italic block">
                          *(Alternatively, in Windows Explorer: Right-click <code className="font-mono">notes.docx</code> &rarr; <strong>Properties</strong> &rarr; <strong>Details</strong> &rarr; Authors: <code className="text-zinc-300">ghostwriter404</code>, Last saved by: <code className="text-zinc-300">GHOST404-PC</code>)*
                        </span>
                      </div>
                    </li>
                    <li id="filedump-intel">
                      Correlated the creator <code className="font-mono text-xs text-red-400">ghostwriter404</code> and machine <code className="font-mono text-xs text-red-400">GHOST404-PC</code> against the official DEADFACE threat dossier (<code className="font-mono text-xs">d34th</code>, <code className="font-mono text-xs">mort1cia</code>, <code className="font-mono text-xs">spookyboi</code>, <code className="font-mono text-xs">gh0st404</code>, <code className="font-mono text-xs">lamia415</code>, <code className="font-mono text-xs">luciafer</code>, <code className="font-mono text-xs">sunstalker</code>), which immediately identifies the operative as <strong><code className="text-red-400 font-mono">gh0st404</code></strong> (or <code className="font-mono">ghost404</code>).
                    </li>
                  </ol>
                </div>

                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;ghost404&#125;</code>
                  </div>
                  <CopyButton text="deadface{ghost404}" />
                </div>
              </article>

              {/* Challenge 8: Art Heist - The Forgery */}
              <article id="art-heist-forgery" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Digital Forensics / Steganography" points="200 PTS" slug="art-heist-forgery" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      PNG // XMP METADATA
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    8. Art Heist - The Forgery
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    5 classic museum paintings were investigated for forgery. One was replaced with a digital copy signed by the hacker Lamia.
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

                {/* Evidence Image */}
                <div className="bg-[#111116] border border-zinc-800 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    Forged Artwork Evidence (Painting_003 / Museum Specimen):
                  </span>
                  <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                    <Image
                      src="/images/deadface/Painting_003.png"
                      alt="Forged Painting"
                      width={380}
                      height={300}
                      className="rounded-lg object-contain"
                    />
                  </div>
                </div>

                <div id="artheist-timestamp" className="space-y-4 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps (with exact Input &amp; Output):
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-3 leading-relaxed">
                    <li>Extracted paintings <code className="font-mono text-xs text-zinc-200">Painting_001.png</code> through <code className="font-mono text-xs text-zinc-200">Painting_005.png</code>.</li>
                    <li>Checked file modification timestamps &mdash; four paintings were dated Sept 1, 2026, while <code className="font-mono text-xs text-red-400">Painting_002.png</code> stood out with a newer timestamp of Oct 14, 2026.</li>
                    <li>
                      Searched for embedded text / metadata signatures across all paintings:
                      <div className="mt-2 space-y-2 font-mono text-xs">
                        <span className="text-zinc-500 block">Command Input:</span>
                        <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 text-zinc-300 overflow-x-auto">
                          <pre><code>Select-String -Path &quot;Painting_*.png&quot; -Pattern &quot;deadface&quot;</code></pre>
                        </div>
                        <span className="text-zinc-500 italic block">*(or <code className="font-mono">exiftool Painting_002.png</code>)*</span>
                        <span className="text-zinc-500 block">Command Output:</span>
                        <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 text-emerald-400 overflow-x-auto">
                          <pre><code>Painting_002.png:20:  &lt;dc:identifier&gt;deadface&#123;L4MIA_SIGNS_HER_WORK&#125;&lt;/dc:identifier&gt;</code></pre>
                        </div>
                      </div>
                    </li>
                    <li>
                      Inspecting the full XMP metadata chunk confirmed Lamia&apos;s forger signature:
                      <div className="mt-2 bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                        <pre><code>{`<dc:creator>Leonardo da Vinci / LAMIA</dc:creator>
<dc:rights>LAMIA temporary acquisition</dc:rights>
<dc:identifier>deadface{L4MIA_SIGNS_HER_WORK}</dc:identifier>`}</code></pre>
                      </div>
                    </li>
                  </ol>
                </div>

                <div id="artheist-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;L4MIA_SIGNS_HER_WORK&#125;</code>
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
                  Database &amp; SQL Forensics (Aurora Health Suite)
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  All queries were executed against the Aurora Health MySQL database (<code className="text-red-400 font-mono">aurora.sql</code>).
                </p>
              </div>

              {/* Schema Image */}
              <div className="bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-red-400 uppercase font-bold tracking-wider">
                    Aurora Health Relational Schema Reference:
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Folder: C:\CTFS\DEAD FACE CTF\database\</span>
                </div>
                <div className="flex justify-center bg-black/60 p-3 rounded-2xl border border-zinc-800/60">
                  <Image
                    src="/images/deadface/2.png"
                    alt="Aurora Health Database Schema"
                    width={900}
                    height={450}
                    className="rounded-xl object-contain w-full max-w-3xl"
                  />
                </div>
              </div>

              {/* 8 SQL Sub-Challenges */}
              <div className="space-y-6">
                
                {/* SQL 1: Patient Registry */}
                <div id="aurora-p1" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      9. Patient Registry
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">SQL Triage</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    Retrieve the patient ID for the targeted individual admitted under suspicious circumstances.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT patient_id, first_name, last_name, admission_date 
FROM patients 
WHERE first_name = 'Gordon' OR notes LIKE '%admit%';`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;AH-0044719&#125;</code>
                    </div>
                    <CopyButton text="deadface{AH-0044719}" />
                  </div>
                </div>

                {/* SQL 2: Watching the VIP */}
                <div id="aurora-p2" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      10. Watching the VIP
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Audit Logs</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    Determine which staff user account logged repeated unauthorized queries against VIP patient <code className="text-zinc-200 font-mono">AH-0044719</code>.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT username, COUNT(*) AS access_count 
FROM audit_logs 
WHERE record_id = 'AH-0044719' 
GROUP BY username 
ORDER BY access_count DESC;`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Top User Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;rborden&#125;</code>
                    </div>
                    <CopyButton text="deadface{rborden}" />
                  </div>
                </div>

                {/* SQL 3: Stay on the VIP */}
                <div id="aurora-p3" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      11. Stay on the VIP
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Accomplice Triage</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    After <code className="text-zinc-200 font-mono">rborden</code> went dark, another user took over surveillance of the VIP patient.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT username, timestamp, action 
FROM audit_logs 
WHERE record_id = 'AH-0044719' 
  AND username != 'rborden' 
ORDER BY timestamp ASC;`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Accomplice User Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;mreyes&#125;</code>
                    </div>
                    <CopyButton text="deadface{mreyes}" />
                  </div>
                </div>

                {/* SQL 4: Pharmacy Formulary */}
                <div id="aurora-p4" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      12. Pharmacy Formulary
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Controlled Substances</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    Count the total number of Schedule II controlled substances currently cataloged in the hospital pharmacy database.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT COUNT(*) 
FROM medications 
WHERE schedule = 'II' AND status = 'active';`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Medication Count Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;9&#125;</code>
                    </div>
                    <CopyButton text="deadface{9}" />
                  </div>
                </div>

                {/* SQL 5: Drug Diversion */}
                <div id="aurora-p5" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      13. Drug Diversion
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Prescription Audit</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    Find the batch number of the diverted fentanyl / opioid prescription flagged in audit alerts.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT p.batch_number, p.patient_id, p.med_id, a.flag_reason 
FROM prescriptions p 
JOIN audit_alerts a ON p.prescription_id = a.prescription_id 
WHERE a.flag_reason LIKE '%diversion%' OR p.status = 'diverted';`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Diverted Batch Number Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;BR2938471&#125;</code>
                    </div>
                    <CopyButton text="deadface{BR2938471}" />
                  </div>
                </div>

                {/* SQL 6: Ghost in the Registry */}
                <div id="aurora-p6" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      14. Ghost in the Registry
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Phantom Records</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    A phantom patient record was surreptitiously created without valid physician signoff.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT patient_id, first_name, last_name, attending_physician 
FROM patients 
WHERE attending_physician IS NULL OR patient_id LIKE '%9000%';`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Phantom ID Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;AH-0090001&#125;</code>
                    </div>
                    <CopyButton text="deadface{AH-0090001}" />
                  </div>
                </div>

                {/* SQL 7: After the Lock */}
                <div id="aurora-p7" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      15. After the Lock
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Vault Access Logs</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    Which electronic medicine cabinet / vault locker was breached right after hours?
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT vault_id, access_time, user_id 
FROM vault_access_logs 
WHERE TIME(access_time) > '21:00:00' 
ORDER BY access_time ASC 
LIMIT 1;`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Breached Locker Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;VELT-0137&#125;</code>
                    </div>
                    <CopyButton text="deadface{VELT-0137}" />
                  </div>
                </div>

                {/* SQL 8: Clinical Trial Overwritten Efficacy */}
                <div id="aurora-p8" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                      16. Clinical Trial Overwritten Efficacy
                    </h4>
                    <span className="font-mono text-xs text-zinc-500">Data Tampering</span>
                  </div>
                  <p className="text-sm text-zinc-300">
                    An insider tampered with clinical trial efficacy metrics. Find the exact altered efficacy score value.
                  </p>
                  <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre><code>{`SELECT trial_id, original_score, altered_score, (altered_score - original_score) AS diff 
FROM clinical_trials_audit 
WHERE altered_score IS NOT NULL;`}</code></pre>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">Altered Difference Flag:</span>
                      <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;2.3&#125;</code>
                    </div>
                    <CopyButton text="deadface{2.3}" />
                  </div>
                </div>

              </div>

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
                <CrtCardHeader platform="DEADFACE CTF" category="OSINT / Historical Geolocation" points="300 PTS" slug="ghost-of-squares-past" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      OSINT // GEOLOCATION
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

                {/* Challenge Artifact Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACTS</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\Ghost of Squares Past\</code></span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    Photographic Markers Included
                  </span>
                </div>

                {/* Images Evidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                      Marker Point 2 (East / Oglethorpe Square):
                    </span>
                    <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                      <Image
                        src="/images/deadface/point 2.png"
                        alt="Marker Point 2"
                        width={400}
                        height={260}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                  <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                      Marker Point 4 (West / Telfair Square &amp; Academy):
                    </span>
                    <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                      <Image
                        src="/images/deadface/point 4.png"
                        alt="Marker Point 4"
                        width={400}
                        height={260}
                        className="rounded-lg object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div id="ghostsq-compass" className="space-y-4 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Detailed OSINT Walkthrough:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-3 leading-relaxed">
                    <li>
                      <strong>Understanding the Compass Grid:</strong>
                      <p className="mt-1">
                        The challenge arranged five historic locations across Savannah, Georgia in a compass cross pattern:
                        <strong>Point 1 (North)</strong>, <strong>Point 2 (East)</strong>, <strong>Point 3 (South)</strong>, <strong>Point 4 (West)</strong>, and <strong>Point 5 (Center)</strong>.
                      </p>
                      <code className="text-xs text-red-300 font-mono mt-1 block">Format: deadface&#123;YYYY(North)-YYYY(East)-YYYY(South)-YYYY(West)-surname(Center)&#125;</code>
                    </li>
                    <li id="ghostsq-points">
                      <strong>Point 1 (North): Johnson Square (<code>1733</code>):</strong>
                      <p className="mt-1 text-zinc-400 text-xs">
                        <em>Riddle clues:</em> &ldquo;First of them all, where the city began / A banker&apos;s green heart... / A Quaker from Rhode Island sleeps under stone here&rdquo;.
                      </p>
                      <p className="mt-1">
                        Savannah was founded in 1733 by James Oglethorpe. The very first square laid out was <strong>Johnson Square</strong> (in the banking/financial district). Rhode Island Quaker Major General Nathanael Greene is buried beneath its central 50ft marble obelisk. Laid out: <strong><code className="text-red-400 font-mono">1733</code></strong>.
                      </p>
                    </li>
                    <li>
                      <strong>Point 3 (South): Chippewa Square (<code>1815</code>):</strong>
                      <p className="mt-1 text-zinc-400 text-xs">
                        <em>Riddle clues:</em> &ldquo;Where a feather once drifted and a founder stands tall / battle of a northern frontier eighteen-twelve drawing near / the newest of all&rdquo;.
                      </p>
                      <p className="mt-1">
                        The drifting feather opening scene in <em>Forrest Gump</em> (1994) was filmed at a bus stop bench in <strong>Chippewa Square</strong>. The central bronze statue is Georgia&apos;s founder, James Oglethorpe. Named after the War of 1812 Battle of Chippawa. Laid out: <strong><code className="text-red-400 font-mono">1815</code></strong>.
                      </p>
                    </li>
                    <li>
                      <strong>Point 4 (West): Telfair Square (<code>1733</code>):</strong>
                      <p className="mt-1 text-zinc-400 text-xs">
                        <em>Photo analysis on <code className="font-mono">point 4.png</code>:</em> Looked across the street at the classical yellow Regency-style building flanked by front steps with heroic statues (Michelangelo and Phidias).
                      </p>
                      <p className="mt-1">
                        Google Lens / Street View identifies this building as the <strong>Telfair Academy of Arts and Sciences</strong> (121 Barnard St) facing <strong>Telfair Square</strong> (originally St. James Square), directly west of the central Bull Street line. Laid out: <strong><code className="text-red-400 font-mono">1733</code></strong>.
                      </p>
                    </li>
                    <li>
                      <strong>Point 2 (East): Oglethorpe Square (<code>1742</code>):</strong>
                      <p className="mt-1 text-zinc-400 text-xs">
                        <em>Photo analysis on <code className="font-mono">point 2.png</code>:</em> Brick pathways, live oaks with Spanish moss, and surrounding historic brick townhouses.
                      </p>
                      <p className="mt-1">
                        With North (Johnson Sq on Bull St), South (Chippewa Sq on Bull St), and West (Telfair Sq on President St), the corresponding eastern square on President St is <strong>Oglethorpe Square</strong> (at Abercorn St). Laid out: <strong><code className="text-red-400 font-mono">1742</code></strong>.
                      </p>
                    </li>
                    <li>
                      <strong>Point 5 (Center): Wright Square &amp; The Monument Surname (<code>gordon</code>):</strong>
                      <p className="mt-1">
                        The geometric intersection of the North-South axis (Bull Street) and East-West axis (President Street) is <strong>Wright Square</strong>. In the center stands the massive 47-foot monument dedicated to <strong>William Washington Gordon</strong> (1796&ndash;1842, founder of Central of Georgia Railroad). The lone surname carved in the stone base is <strong>Gordon</strong>.
                      </p>
                    </li>
                    <li>
                      <strong>Flag Construction:</strong>
                      <p className="mt-1 font-mono text-xs text-zinc-300">
                        North (<code className="text-cyan-400">1733</code>) - East (<code className="text-cyan-400">1742</code>) - South (<code className="text-cyan-400">1815</code>) - West (<code className="text-cyan-400">1733</code>) - Center (<code className="text-cyan-400">gordon</code>)
                      </p>
                    </li>
                  </ol>
                </div>

                <div id="ghostsq-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;1733-1742-1815-1733-gordon&#125;</code>
                  </div>
                  <CopyButton text="deadface{1733-1742-1815-1733-gordon}" />
                </div>
              </article>

              {/* Challenge 18: Traffic Accident / Commercial Crash */}
              <article id="traffic-accident" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="OSINT / Vehicle Forensics" points="150 PTS" slug="traffic-accident" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      FMCSA // VEHICLE FORENSICS
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      150 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    18. Traffic Accident / Car Crash
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Photo of a commercial truck crash. Locate the DOT license info and determine the driver&apos;s date of birth.
                  </p>
                </div>

                {/* Challenge Artifact Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACTS</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\car crash\</code></span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    Crash Scenes &amp; Crop Enhancements
                  </span>
                </div>

                {/* Images Evidence */}
                <div className="space-y-4">
                  <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                      Full Scene Overview:
                    </span>
                    <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                      <Image
                        src="/images/deadface/truck_crash.png"
                        alt="Truck Crash Scene"
                        width={600}
                        height={340}
                        className="rounded-lg object-contain w-full max-w-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                        Door USDOT Zoom:
                      </span>
                      <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                        <Image
                          src="/images/deadface/usdot_crop.png"
                          alt="USDOT Zoom"
                          width={260}
                          height={140}
                          className="rounded-lg object-contain"
                        />
                      </div>
                    </div>
                    <div className="bg-[#111116] border border-zinc-800 p-3 rounded-2xl space-y-2">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                        Door Cabin Crop:
                      </span>
                      <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                        <Image
                          src="/images/deadface/door_crop.png"
                          alt="Door Crop"
                          width={260}
                          height={140}
                          className="rounded-lg object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div id="crash-crops" className="space-y-3 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Enhanced and cropped the commercial truck door to expose the USDOT number.</li>
                    <li>Queried the FMCSA (Federal Motor Carrier Safety Administration) SAFER company snapshot.</li>
                    <li>Pulled the accident report and state driver registration records for the identified driver.</li>
                    <li>Extracted driver&apos;s date of birth in <code className="font-mono text-xs text-zinc-200">MM_DD_YYYY</code> format: <code className="font-mono text-xs text-red-400">08_10_1961</code>.</li>
                  </ol>
                </div>

                <div id="crash-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;08_10_1961&#125;</code>
                  </div>
                  <CopyButton text="deadface{08_10_1961}" />
                </div>
              </article>

              {/* Challenge 19: Conduct Unbecoming */}
              <article id="conduct-unbecoming" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Document & Printer Forensics" points="200 PTS" slug="conduct-unbecoming" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      MIC // PRINTER FORENSICS
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    19. Conduct Unbecoming
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    A scanned administrative reprimand letter was leaked. Identify the serial number of the office printer that produced it.
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

                {/* Evidence Image */}
                <div className="bg-[#111116] border border-zinc-800 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    Scanned Reprimand Document:
                  </span>
                  <div className="flex justify-center bg-black/50 p-2 rounded-xl">
                    <Image
                      src="/images/deadface/Doc_20261017_0915.jpg"
                      alt="Scanned Document"
                      width={450}
                      height={580}
                      className="rounded-lg object-contain max-h-[480px] w-auto"
                    />
                  </div>
                </div>

                <div id="conduct-mic" className="space-y-3 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Opened <code className="font-mono text-xs text-zinc-200">Doc_20261017_0915.jpg</code> in an image editor.</li>
                    <li>Adjusted color balance / saturation on the yellow channel to inspect Machine Identification Codes (yellow tracking dots / printer watermark).</li>
                    <li>Decoded the printer ID stamp stamped at the document margin: <code className="font-mono text-xs text-red-400 font-bold">NVU-PRINT-17</code>.</li>
                  </ol>
                </div>

                <div id="conduct-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;NVU-PRINT-17&#125;</code>
                  </div>
                  <CopyButton text="deadface{NVU-PRINT-17}" />
                </div>
              </article>

              {/* Challenge 20: Bedside Manner */}
              <article id="bedside-manner" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Hardware / Medical Telemetry" points="200 PTS" slug="bedside-manner" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      SERIAL // FIRMWARE TELEMETRY
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      200 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    20. Bedside Manner
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Unencrypted diagnostic telemetry stream captured from a patient vital signs monitor.
                  </p>
                </div>

                {/* Challenge Artifact Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE ARTIFACT</span>
                    <span className="text-zinc-200">Folder: <code className="text-red-400">C:\CTFS\DEAD FACE CTF\bedside manner\</code></span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                    Serial Diagnostic Stream
                  </span>
                </div>

                <div id="bedside-stream" className="space-y-3 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps:
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 leading-relaxed">
                    <li>Inspected serial diagnostic dump file.</li>
                    <li>Filtered out sync frames and parsed unencrypted ASCII data emitted by the monitor firmware.</li>
                    <li>Reconstructed the message string directly from the telemetry feed.</li>
                  </ol>
                </div>

                <div id="bedside-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;un3ncrypt3d_b4bbl3_fr0m_th3_sku11&#125;</code>
                  </div>
                  <CopyButton text="deadface{un3ncrypt3d_b4bbl3_fr0m_th3_sku11}" />
                </div>
              </article>

              {/* Challenge 21: Exfiltration */}
              <article id="exfiltration" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Steganography / Metadata & Timing Forensics" points="250 PTS" slug="exfiltration" />
                
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      EXIF // TIMING COVERT
                    </span>
                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                      250 PTS
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                    21. Exfiltration
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    20 seemingly unrelated images (<code className="text-red-400 font-mono">image_01.jpg</code> to <code className="text-red-400 font-mono">image_20.jpg</code>) were recovered from an exfiltration channel. Uncover the hidden data channel and reconstruct the flag.
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

                <div id="exfil-sorting" className="space-y-4 font-sans text-sm text-zinc-300">
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-red-400">
                    Retrace / Steps (with exact Input &amp; Output):
                  </h4>
                  <ol className="list-decimal list-outside pl-5 space-y-3 leading-relaxed">
                    <li>Extracted <code className="font-mono text-xs text-zinc-200">exfiltration.zip</code>, yielding 20 photos with randomized names (<code className="font-mono text-xs">image_01.jpg</code> through <code className="font-mono text-xs">image_20.jpg</code>).</li>
                    <li>
                      Inspected EXIF metadata across the images and noticed two key artifacts:
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-zinc-400">
                        <li>Each file has an exact <code className="font-mono text-zinc-300">DateTimeOriginal</code> timestamp recorded on <code className="font-mono text-zinc-300">2026:06:01</code> between <code className="font-mono text-zinc-300">14:02:17</code> and <code className="font-mono text-zinc-300">15:12:29</code>.</li>
                        <li>Each file has an embedded identifier tag containing hex digits: <code className="font-mono text-zinc-300">IMG_&lt;hex&gt;</code> (e.g. <code className="font-mono text-zinc-300">IMG_6465</code>, <code className="font-mono text-zinc-300">IMG_61</code>, <code className="font-mono text-zinc-300">IMG_7469</code>).</li>
                      </ul>
                    </li>
                    <li>
                      Sorting the photos chronologically by EXIF timestamp orders the hex chunks sequentially:
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 mt-1">
                        <div>image_07: <code className="text-cyan-400">6465 (de)</code></div>
                        <div>image_14: <code className="text-cyan-400">61 (a)</code></div>
                        <div>image_03: <code className="text-cyan-400">6466 (df)</code></div>
                        <div>image_19: <code className="text-cyan-400">61 (a)</code></div>
                        <div>image_01: <code className="text-cyan-400">6365 (ce)</code></div>
                        <div>image_12: <code className="text-cyan-400">7b (&#123;)</code></div>
                        <div>image_17: <code className="text-cyan-400">6e67 (ng)</code></div>
                        <div>image_11: <code className="text-cyan-400">7d (&#125;)</code></div>
                      </div>
                    </li>
                    <li>
                      Executed extraction &amp; decoding script:
                      <div className="mt-2 space-y-2 font-mono text-xs">
                        <span className="text-zinc-500 block">Command Input:</span>
                        <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 text-zinc-300 overflow-x-auto">
                          <pre><code>{`python -c "
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
"`}</code></pre>
                        </div>
                        <span className="text-zinc-500 block">Command Output:</span>
                        <div className="bg-[#050508] border border-zinc-800 rounded-xl p-3 text-emerald-400 overflow-x-auto">
                          <pre><code>Hex String: 64656164666163657b74696d696e672d69732d65766572797468696e677d
Flag: deadface&#123;timing-is-everything&#125;</code></pre>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>

                <div id="exfil-flag" className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block uppercase">Submitted Flag:</span>
                    <code className="text-emerald-400 font-mono text-sm font-bold">deadface&#123;timing-is-everything&#125;</code>
                  </div>
                  <CopyButton text="deadface{timing-is-everything}" />
                </div>
              </article>

              {/* ============================================================= */}
              {/* BONUS: UNINVITED GUEST PCAP SERIES                            */}
              {/* ============================================================= */}
              <div className="border-b border-zinc-800 pb-2 pt-6">
                <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold">Category 05 (Bonus PCAP Series)</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)]">
                  Uninvited Guest: SMB &amp; LLMNR Poisoning Series
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Full 5-operation deep dive across <code className="text-red-400 font-mono">demonne.pcap</code> (7.6 MB) by @syyntax.
                </p>
              </div>

              <article id="uninvited-guest" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-6">
                <CrtCardHeader platform="DEADFACE CTF" category="Network Forensics / SMB Poisoning" points="500 PTS" slug="uninvited-guest" />
                
                {/* Challenge Download Bar */}
                <div className="bg-[#111116] border border-zinc-800 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500 block">SOURCE PCAP ARTIFACT</span>
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
                  
                  {/* Op 1: Rogue Responder IP */}
                  <div id="uninvited-p1" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                        1. Uninvited Guest (Rogue Responder IP)
                      </h4>
                      <span className="font-mono text-xs text-zinc-500">LLMNR / mDNS</span>
                    </div>
                    <p className="text-sm text-zinc-300">
                      Nathan&apos;s workstation (<code className="font-mono text-xs">10.77.10.20</code>) queried local multicast (<code className="font-mono text-xs">dmf-field-01.local</code> / <code className="font-mono text-xs">dmf-field-01</code>). Host <code className="font-mono text-xs text-red-400 font-bold">10.77.10.66</code> responded claiming to be the target server.
                    </p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-mono block">Rogue Responder IP Flag:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;10.77.10.66&#125;</code>
                      </div>
                      <CopyButton text="deadface{10.77.10.66}" />
                    </div>
                  </div>

                  {/* Op 2: NTProofStr */}
                  <div id="uninvited-p2" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                        2. Challenge Accepted (First SMB NTLMv2 NTProofStr)
                      </h4>
                      <span className="font-mono text-xs text-zinc-500">NTLMSSP</span>
                    </div>
                    <p className="text-sm text-zinc-300">
                      Filtered by <code className="font-mono text-xs text-zinc-200">ntlmssp.ntlmv2_response.ntproofstr</code> in Frame 1489 (<code className="font-mono text-xs text-zinc-300">Session Setup Request, NTLMSSP_AUTH</code>).
                    </p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-mono block">16-Byte NTProofStr Flag:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;5a2342014fe7f28997ce4dcd09f6b7f8&#125;</code>
                      </div>
                      <CopyButton text="deadface{5a2342014fe7f28997ce4dcd09f6b7f8}" />
                    </div>
                  </div>

                  {/* Op 3: Compromised User */}
                  <div id="uninvited-p3" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                        3. Name to a Face (Compromised User)
                      </h4>
                      <span className="font-mono text-xs text-zinc-500">Identity Triage</span>
                    </div>
                    <p className="text-sm text-zinc-300">
                      The NTLMSSP authentication payload authenticated as local corporate domain user <code className="font-mono text-xs text-red-400 font-bold">nkessler</code>.
                    </p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-mono block">Compromised User Flag:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;nkessler&#125;</code>
                      </div>
                      <CopyButton text="deadface{nkessler}" />
                    </div>
                  </div>

                  {/* Op 4: Exfiltrated Document */}
                  <div id="uninvited-p4" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                        4. Crown Jewels (Exfiltrated Document)
                      </h4>
                      <span className="font-mono text-xs text-zinc-500">SMB Read Carve</span>
                    </div>
                    <p className="text-sm text-zinc-300">
                      Inspecting SMB2 Read requests from the rogue server revealed file exfiltration of <code className="font-mono text-xs text-red-400 font-bold">annual_report.pdf</code>.
                    </p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-mono block">Exfiltrated Document Flag:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;annual_report.pdf&#125;</code>
                      </div>
                      <CopyButton text="deadface{annual_report.pdf}" />
                    </div>
                  </div>

                  {/* Op 5: External C2 Destination */}
                  <div id="uninvited-p5" className="bg-[#0e0e13] border border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] text-cyan-400">
                        5. Public Offering (External C2 Destination)
                      </h4>
                      <span className="font-mono text-xs text-zinc-500">C2 Exfil Socket</span>
                    </div>
                    <p className="text-sm text-zinc-300">
                      Correlating external TCP egress sockets in the PCAP showed data pushed to external remote host <code className="font-mono text-xs text-red-400 font-bold">167.172.132.224</code> on port <code className="font-mono text-xs text-red-400 font-bold">4815</code>.
                    </p>
                    <div className="flex justify-between items-center bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                      <div>
                        <span className="text-[11px] text-zinc-500 font-mono block">C2 Destination Flag:</span>
                        <code className="text-emerald-400 font-mono font-bold text-sm">deadface&#123;167.172.132.224_4815&#125;</code>
                      </div>
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
