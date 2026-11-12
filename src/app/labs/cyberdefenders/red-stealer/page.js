"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";
import FollowMe from "@/components/FollowMe";

export default function RedStealerLabWriteup() {
  const [activeOpId, setActiveOpId] = useState("q1");

  const operations = [
    {
      id: "q1",
      num: "01",
      title: "Malware Category",
      badge: "Trojan",
      tag: "CATEGORY",
      sections: [
        { id: "q1-vt", title: "1. VirusTotal Detection Overview" },
        { id: "q1-msft", title: "2. Microsoft Engine Classification" },
      ]
    },
    {
      id: "q2",
      num: "02",
      title: "Associated File Name",
      badge: "wextract",
      tag: "MASQUERADE",
      sections: [
        { id: "q2-details", title: "1. VT Details & Original Filename" },
        { id: "q2-masq", title: "2. Masquerading (MITRE T1036.005)" },
      ]
    },
    {
      id: "q3",
      num: "03",
      title: "First Submission UTC",
      badge: "2023-10-06 04:41",
      tag: "HISTORY",
      sections: [
        { id: "q3-history", title: "1. VirusTotal Submission History" },
        { id: "q3-threat", title: "2. Threat Intel Timeline Analysis" },
      ]
    },
    {
      id: "q4",
      num: "04",
      title: "MITRE ATT&CK Technique",
      badge: "T1005",
      tag: "MITRE",
      sections: [
        { id: "q4-mbc", title: "1. Malware Behavior Catalog" },
        { id: "q4-stealer", title: "2. T1005: Data from Local System" },
      ]
    },
    {
      id: "q5",
      num: "05",
      title: "Connectivity Check Domain",
      badge: "facebook.com",
      tag: "CANARY",
      sections: [
        { id: "q5-dns", title: "1. Dynamic Sandbox DNS Resolutions" },
        { id: "q5-sandbox", title: "2. Anti-Analysis Egress Testing" },
      ]
    },
    {
      id: "q6",
      num: "06",
      title: "C2 IP & Destination Port",
      badge: "77.91.124.55:19071",
      tag: "C2 SOCKET",
      sections: [
        { id: "q6-traffic", title: "1. Memory Network Patterns" },
        { id: "q6-firewall", title: "2. Non-Standard High Port C2" },
      ]
    },
    {
      id: "q7",
      num: "07",
      title: "Varp0s YARA Rule",
      badge: "detect_Redline_Stealer",
      tag: "YARA",
      sections: [
        { id: "q7-bazaar", title: "1. MalwareBazaar Community Signatures" },
        { id: "q7-pattern", title: "2. In-Memory Bytecode Matching" },
      ]
    },
    {
      id: "q8",
      num: "08",
      title: "Malware Family Alias",
      badge: "RECORDSTEALER",
      tag: "ALIAS",
      sections: [
        { id: "q8-malpedia", title: "1. Malpedia / ThreatFox Attribution" },
        { id: "q8-hunting", title: "2. Cross-Vendor Threat Hunting" },
      ]
    },
    {
      id: "q9",
      num: "09",
      title: "Privilege Escalation DLL",
      badge: "ADVAPI32.dll",
      tag: "PE IMPORTS",
      sections: [
        { id: "q9-iat", title: "1. Import Address Table Analysis" },
        { id: "q9-priv", title: "2. Token Manipulation APIs (AdjustTokenPrivileges)" },
      ]
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const opIds = operations.map((o) => o.id);
      for (let i = opIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(opIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveOpId(opIds[i]);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/labs/cyberdefenders" className="hover:text-red-400 transition-colors">
              CYBERDEFENDERS
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-red-400 uppercase">RED STEALER LAB</span>
          </div>

          {/* Banner Graphic */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60 max-w-4xl mx-auto">
            <Image
              src="/images/cyberdefenders/red_stealer_banner.png"
              alt="CyberDefenders Red Stealer Lab Banner"
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 border-b border-zinc-800 pb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-mono font-bold">
                CyberDefenders
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-mono">
                Threat Intelligence / SOC Triage
              </span>
              <span className="px-2.5 py-1 rounded bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-mono font-bold">
                RedLine Stealer
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-4">
              CyberDefenders — Red Stealer Lab Writeup
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              You are part of the Threat Intelligence team in the SOC (Security Operations Center). An executable file has been discovered on a colleague&apos;s computer, suspected to be communicating with a Command and Control (C2) server. Your task is to investigate this executable via hash-based threat intelligence, mapping MITRE ATT&amp;CK techniques, extracting network indicators, matching community YARA signatures, and identifying privilege escalation vectors.
            </p>

            {/* Tactical Threat Intelligence HUD */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0a0a0f] border border-zinc-800/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Primary Indicators of Compromise (IOCs)
                </span>
                <span className="text-[10px] font-mono text-zinc-500">LAB ARTIFACT: FileHash.txt</span>
              </div>

              {/* SHA-256 Hash Box with Copy */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Target SHA-256 Hash:</span>
                  <code className="text-xs sm:text-sm font-mono text-amber-300 font-bold break-all">
                    248FCC901AFF4E4B4C48C91E4D78A939BF681C9A1BC24ADDC3551B32768F907B
                  </code>
                </div>
                <CopyButton text="248FCC901AFF4E4B4C48C91E4D78A939BF681C9A1BC24ADDC3551B32768F907B" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Primary C2 Socket</span>
                  <span className="text-red-400 font-bold">77.91.124.55:19071</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Egress Canary</span>
                  <span className="text-zinc-200 font-bold">facebook.com</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Masqueraded Name</span>
                  <span className="text-amber-300 font-bold">wextract.exe</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Malware Aliases</span>
                  <span className="text-red-300 font-bold">RECORDSTEALER</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Lab Reference Box */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                <div>
                  <span className="text-zinc-400">Official Lab Reference: </span>
                  <span className="text-white font-bold">CyberDefenders — Red Stealer</span>
                </div>
              </div>
              <a
                href="https://cyberdefenders.org/blueteam-ctf-challenges/red-stealer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 font-mono transition-colors shrink-0"
              >
                <span>Open on CyberDefenders.org</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Bar Quick Pills */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-wrap gap-2 pb-2">
              {operations.map((op) => (
                <button
                  key={op.id}
                  onClick={() => scrollToElement(op.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    activeOpId === op.id
                      ? "bg-red-500/20 text-red-300 border border-red-500/40 font-bold"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
                >
                  <span>{op.num}.</span>
                  <span>{op.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Section with Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-3 font-mono text-xs shadow-xl">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold px-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Operations Index</span>
                  <span className="text-[10px] text-red-400 font-bold">9 Questions</span>
                </div>
                {operations.map((op) => (
                  <div key={op.id} className="space-y-1">
                    <button
                      onClick={() => scrollToElement(op.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between text-xs ${
                        activeOpId === op.id
                          ? "bg-red-500/20 text-red-400 border border-red-500/30 font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      <span className="truncate">{op.num}. {op.title}</span>
                      <span className="text-[10px] text-zinc-500 ml-1 shrink-0">{op.tag}</span>
                    </button>
                    {activeOpId === op.id && (
                      <div className="pl-4 space-y-1 border-l border-zinc-800 ml-3">
                        {op.sections.map((s) => (
                          <div
                            key={s.id}
                            className="text-[11px] text-zinc-500 truncate py-0.5"
                          >
                            {s.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* Q1 */}
              <section id="q1" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q1 • Malware Classification
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Categorizing malware enables a quicker and clearer understanding of its unique behaviors and attack vectors. What category has Microsoft identified for that malware in VirusTotal?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // Vendor Categorization:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      When triaging an unknown binary in the SOC, the first milestone is establishing vendor consensus. Different antivirus vendors use proprietary naming conventions (e.g. Kasperskly might say <code className="text-red-300">Trojan-Dropper</code>, CrowdStrike might flag <code className="text-red-300">Win/Malicious_Confidence_100%</code>). Here, we need Microsoft&apos;s specific categorization string. A Trojan differs fundamentally from viruses or worms: it doesn&apos;t self-propagate across networks, but instead relies on masquerading or deceptive droppers to gain initial foothold.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-3 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      when u install zip file and extract u will find file named <code>filehash.txt</code> open it u will find hash:
                    </p>
                    <code className="block p-2 rounded bg-black/60 text-amber-300 break-all border border-zinc-800">
                      248FCC901AFF4E4B4C48C91E4D78A939BF681C9A1BC24ADDC3551B32768F907B
                    </code>
                    <p>
                      now for q1 go to virus total and search for hash. now u will notice categories is trogan dropper pua.
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112125840.png"
                      alt="VirusTotal detection categories overview"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    but in q he asked about microsoft soo search for it or <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">ctrl + f</kbd> and type microsoft u will find it under arrow u will find trojan and thats first q:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112125921.png"
                      alt="Microsoft detection string identifying Trojan"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">Trojan</code>
                    </div>
                    <CopyButton text="Trojan" />
                  </div>
                </div>
              </section>

              {/* Q2 */}
              <section id="q2" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q2 • Masqueraded File Name
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Clearly identifying the name of the malware file improves communication among the SOC team. What is the file name associated with this malware? (Note: Don&apos;t include the file extension in the name)
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // Why &quot;wextract&quot;?
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      In the Windows OS, <code className="text-amber-300">wextract.exe</code> is a legitimate, built-in system utility located in <code className="text-zinc-400">System32</code> used by Windows to decompress Cabinet (.cab) files. Threat actors frequently compile infostealers using the internal name or filename of legitimate Windows components (MITRE ATT&amp;CK <strong>T1036.005: Masquerading</strong>). To a hurried sysadmin or tier-1 SOC analyst looking at Task Manager, <code className="text-zinc-300">wextract</code> looks like benign background update activity rather than an infostealer siphoning browser credentials!
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      go to details the under it u will find the name. hackers change its name to make it hard for soc team to catch it:
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112130235.png"
                      alt="VirusTotal Details tab showing associated file name wextract"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (without extension)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">wextract</code>
                    </div>
                    <CopyButton text="wextract" />
                  </div>
                </div>
              </section>

              {/* Q3 */}
              <section id="q3" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q3 • First Submission Timestamp
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Knowing the exact timestamp of when the malware was first observed can help prioritize response actions. What is the UTC timestamp of the malware&apos;s first submission to VirusTotal?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // Timeline Reconstruction:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      The <strong>First Submission</strong> timestamp marks the earliest moment anywhere in the world this exact SHA-256 payload was captured—whether by an automated honeypot, an EDR upload, or an incident responder. In an active breach investigation, correlating this timestamp against internal firewall and web gateway logs tells the SOC whether the victim company was hit by an active, bleeding-edge zero-day campaign or if this is older, commodity malware that bypassed antivirus due to missing signature updates.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      in same page above names ther&apos;s history. Check the First Submission field:
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112130743.png"
                      alt="VirusTotal History section showing First Submission timestamp"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (UTC Timestamp)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">2023-10-06 04:41</code>
                    </div>
                    <CopyButton text="2023-10-06 04:41" />
                  </div>
                </div>
              </section>

              {/* Q4 */}
              <section id="q4" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q4 • MITRE ATT&amp;CK Technique ID
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Understanding the techniques used by malware helps in strategic security planning. What is the MITRE ATT&amp;CK technique ID for the malware collecting data from the local system prior to exfiltration?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // T1005: Data from Local System:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      RedLine Stealer is an information stealer purpose-built to loot endpoint data. Under the MITRE ATT&amp;CK framework, the primary collection phase technique is <strong>T1005 (Data from Local System)</strong>. Upon execution, RedLine targets user directories, crawling for stored credentials in Chromium and Gecko-based browsers (stored in SQLite <code className="text-amber-300">Login Data</code> and <code className="text-amber-300">Web Data</code> files), saved credit cards, crypto wallet folders (<code className="text-zinc-400">wallet.dat</code>, Metamask extensions), VPN configurations, and local system hardware specs.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      go to VirusTotal Behavior tab ➔ Malware Behavior Catalog (MBC) / MITRE ATT&amp;CK table:
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112131957.png"
                      alt="VirusTotal Malware Behavior Catalog showing MITRE technique T1005"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (MITRE ATT&amp;CK ID)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">T1005</code>
                    </div>
                    <CopyButton text="T1005" />
                  </div>
                </div>
              </section>

              {/* Q5 */}
              <section id="q5" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q5 • Network Connectivity Canary
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Following execution, the malware performs a connectivity check by resolving a well-known social-media domain before contacting its C2. Which single domain does it resolve for this check?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // The Egress Canary Technique:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Why would an infostealer query <code className="text-red-300">facebook.com</code>? This is known as a <strong>network canary</strong> or egress connectivity test. Malware authors know that attempting to connect immediately to an untrusted Russian or Bulletproof-hosted C2 IP (<code className="text-zinc-400">77.91.124.55</code>) might trip network intrusion detection before the malware even knows if it has active internet. By issuing a DNS query for a massive domain like <code className="text-amber-300">facebook.com</code>, the malware confirms two things: 1) The host has live WAN internet access, and 2) It is not running inside an air-gapped sandbox where all external domains return simulated loopback responses.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      in behavior tab look at DNS Resolutions. u will see well-known social-media domain:
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112132349.png"
                      alt="VirusTotal Behavior tab showing DNS query to facebook.com"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (Domain Name)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">facebook.com</code>
                    </div>
                    <CopyButton text="facebook.com" />
                  </div>
                </div>
              </section>

              {/* Q6 */}
              <section id="q6" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q6 • C2 IP &amp; Destination Port
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Once the malicious IP addresses are identified, network security devices such as firewalls can be configured to block traffic to and from these addresses. Can you provide the IP address and destination port the malware communicates with?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // High-Port C2 Socket Triage:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      RedLine Stealer communicates with its operator panel using raw TCP sockets over high, non-standard ports (here: <code className="text-red-300">19071</code>) utilizing custom binary serialization or Windows Communication Foundation (WCF) protocols. For a SOC analyst, this is an immediate high-fidelity indicator of compromise (IOC): outbound enterprise connections targeting raw public IPs on ephemeral/custom ports like 19071 rarely represent legitimate business traffic. Immediate action: block <code className="text-amber-300">77.91.124.55</code> at the perimeter firewall and query proxy logs to scope all impacted hosts.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      in memory patterns u will notice 2 (http, tcp). Locate the raw outbound socket connection:
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112132708.png"
                      alt="VirusTotal Network Communication showing C2 socket 77.91.124.55:19071"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (IP:Port Format)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">77.91.124.55:19071</code>
                    </div>
                    <CopyButton text="77.91.124.55:19071" />
                  </div>
                </div>
              </section>

              {/* Q7 */}
              <section id="q7" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q7 • MalwareBazaar YARA Signature
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    YARA rules are designed to identify specific malware patterns and behaviors. Using MalwareBazaar, what&apos;s the name of the YARA rule created by &quot;Varp0s&quot; that detects the identified malware?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // Hunting with Community YARA:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      While hashes are brittle (changing even if a single byte or compile timestamp shifts), <strong>YARA rules</strong> inspect structural characteristics—identifying specific bytecode sequences, unique function names, and memory structures regardless of compilation changes. Platforms like abuse.ch&apos;s <strong>MalwareBazaar</strong> index threat samples matched against vetted community YARA rules, empowering analysts to immediately import proven rules into their EDR/SIEM tools to hunt for other variant infections across the fleet.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      so he said in malwarebazaar so we will go there and search by hash again:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/red-stealer/Pasted_image_20261112132916.png"
                        alt="MalwareBazaar search for the sample hash"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/red-stealer/Pasted_image_20261112132922.png"
                        alt="MalwareBazaar YARA rule detect_Redline_Stealer by Varp0s"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (YARA Rule Name)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">detect_Redline_Stealer</code>
                    </div>
                    <CopyButton text="detect_Redline_Stealer" />
                  </div>
                </div>
              </section>

              {/* Q8 */}
              <section id="q8" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q8 • Malware Family Attribution &amp; Alias
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Understanding which malware families are targeting the organization helps in strategic security planning for the future and prioritizing resources based on the threat. Can you provide the different malware alias associated with the malicious IP address according to Malpedia?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // Cross-Referencing Threat Aliases:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Threat intelligence taxonomy is notoriously fragmented. When Proofpoint or Mandiant publish an emergency advisory about an ongoing infostealer campaign, they may refer to RedLine under an alternate campaign name such as <code className="text-red-300">RECORDSTEALER</code>. Platforms like Fraunhofer FKIE&apos;s <strong>Malpedia</strong> act as the central source of truth for cross-vendor nomenclature. Knowing your adversary&apos;s aliases ensures your SOC detection engineering rules don&apos;t miss threat feeds published under different vendor designations.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      we will search by malware name: <code>Redline</code> on Malpedia / ThreatFox. Click on RedLine Stealer to inspect the verified aliases:
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/red-stealer/Pasted_image_20261112133549.png"
                      alt="Malpedia entry for RedLine Stealer showing alias RECORDSTEALER"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (Malware Alias)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">RECORDSTEALER</code>
                    </div>
                    <CopyButton text="RECORDSTEALER" />
                  </div>
                </div>
              </section>

              {/* Q9 */}
              <section id="q9" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q9 • Privilege Escalation PE Imports
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    By identifying the malware&apos;s imported DLLs, we can configure security tools to monitor for the loading or unusual usage of these specific DLLs. Can you provide the DLL utilized by the malware for privilege escalation?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  {/* Human Analyst Deep Dive */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block">
                      The Human Analyst Perspective // Windows Token Privilege Escalation:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      Examining the Portable Executable (PE) <strong>Import Address Table (IAT)</strong> exposes the OS capabilities the binary requests from Windows. The malware explicitly imports <code className="text-amber-300">ADVAPI32.dll</code> (Advanced Windows 32 Base API), calling three key functions in tandem:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                      <li><code className="text-red-300">OpenProcessToken</code>: Obtains a handle to the current process token.</li>
                      <li><code className="text-red-300">LookupPrivilegeValueA</code>: Retrieves the LUID for high-privilege tokens (such as <code className="text-zinc-200">SeDebugPrivilege</code>).</li>
                      <li><code className="text-red-300">AdjustTokenPrivileges</code>: Enables elevated privileges inside the process context.</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                      By elevating its token rights, RedLine bypasses access controls, enabling it to open handles to other running user processes, read foreign memory spaces, and dump credentials from protected vaults.
                    </p>
                  </div>

                  {/* Operator Notes */}
                  <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs text-zinc-300">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Operator Workflow:</span>
                    <p>
                      back to VT look under Details ➔ Imports. will see the first dll reveals all sort of info related to privileges:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/red-stealer/Pasted_image_20261112133646.png"
                        alt="VirusTotal Imports table showing ADVAPI32.dll"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/red-stealer/Pasted_image_20261112133651.png"
                        alt="ADVAPI32 imported functions AdjustTokenPrivileges and OpenProcessToken"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (DLL Name)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">ADVAPI32.dll</code>
                    </div>
                    <CopyButton text="ADVAPI32.dll" />
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Bottom Follow & Social Footer */}
          <div className="mt-16 max-w-4xl mx-auto">
            <FollowMe />
          </div>

        </div>
      </main>
    </div>
  );
}
