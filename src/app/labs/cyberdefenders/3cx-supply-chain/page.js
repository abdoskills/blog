"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";
import FollowMe from "@/components/FollowMe";

export default function ThreeCXSupplyChainLabWriteup() {
  const [activeOpId, setActiveOpId] = useState("q1");

  const operations = [
    {
      id: "q1",
      num: "01",
      title: "Compromised Windows Versions",
      badge: "2",
      tag: "SCOPE",
    },
    {
      id: "q2",
      num: "02",
      title: "MSI UTC Creation Time",
      badge: "2023-03-13 06:33:26",
      tag: "TIMESTAMP",
    },
    {
      id: "q3",
      num: "03",
      title: "Dropped Malicious DLLs",
      badge: "ffmpeg.dll, d3dcompiler_47.dll",
      tag: "IMPLANTS",
    },
    {
      id: "q4",
      num: "04",
      title: "DLL Side-Loading MITRE ID",
      badge: "T1574.002",
      tag: "TECHNIQUE",
    },
    {
      id: "q5",
      num: "05",
      title: "Malware Classification",
      badge: "Trojan",
      tag: "CATEGORY",
    },
    {
      id: "q6",
      num: "06",
      title: "Sandbox Evasion MITRE ID",
      badge: "T1497",
      tag: "EVASION",
    },
    {
      id: "q7",
      num: "07",
      title: "Targeted Hypervisor",
      badge: "VMware",
      tag: "ANTI-VM",
    },
    {
      id: "q8",
      num: "08",
      title: "Payload Encryption Cipher",
      badge: "RC4",
      tag: "CRYPTO",
    },
    {
      id: "q9",
      num: "09",
      title: "APT Group Attribution",
      badge: "Lazarus",
      tag: "ATTRIBUTION",
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
          if (scrollPosition >= top) {
            setActiveOpId(opIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [operations]);

  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-red-200">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
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
            <span className="text-red-400 uppercase">3CX SUPPLY CHAIN LAB</span>
          </div>

          {/* Banner Graphic */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60 max-w-4xl mx-auto">
            <Image
              src="/images/cyberdefenders/3cx_supply_chain_banner.png"
              alt="CyberDefenders 3CX Supply Chain Lab Banner"
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
                Threat Intelligence / Supply Chain Triage
              </span>
              <span className="px-2.5 py-1 rounded bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-mono font-bold">
                Lazarus Group (UNC4736)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-4">
              CyberDefenders — 3CX Supply Chain Lab Writeup
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              Following an automated software update to the 3CX desktop communications application, enterprise workstations exhibited anomalous outbound beaconing to rogue infrastructure, degraded performance, and unexpected DLL drops. As a Threat Intelligence analyst, your mission is to investigate the compromised MSI package, trace the DLL side-loading chain, map the anti-analysis evasion tactics, examine the cryptographic routines, and establish forensic attribution back to the adversary.
            </p>

            {/* Tactical Threat Intelligence HUD */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0a0a0f] border border-zinc-800/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Primary Threat Indicators &amp; Attribution Scope
                </span>
                <span className="text-[10px] font-mono text-zinc-500">LAB ARTIFACT: 3CXDesktopApp-18.12.416.msi</span>
              </div>

              {/* SHA-256 Hash Box with Copy */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Target SHA-256 Hash:</span>
                  <code className="text-xs sm:text-sm font-mono text-amber-300 font-bold break-all">
                    59e1edf4d82fae4978e97512b0331b7eb21dd4b838b850ba46794d9c7a2c0983
                  </code>
                </div>
                <CopyButton text="59e1edf4d82fae4978e97512b0331b7eb21dd4b838b850ba46794d9c7a2c0983" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Side-Loaded Implants</span>
                  <span className="text-red-400 font-bold">ffmpeg.dll / d3dcompiler</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Primary Tradecraft</span>
                  <span className="text-zinc-200 font-bold">T1574.002 (DLL Side-Load)</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Payload Cipher</span>
                  <span className="text-amber-300 font-bold">RC4 (SIGFLIP Stego)</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Attributed APT</span>
                  <span className="text-red-300 font-bold">Lazarus (UNC4736)</span>
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
                  <span className="text-white font-bold">CyberDefenders — 3CX Supply Chain</span>
                </div>
              </div>
              <a
                href="https://cyberdefenders.org/blueteam-ctf-challenges/3cx-supply-chain/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 font-mono transition-colors shrink-0"
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
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-2 font-mono text-xs shadow-xl">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold px-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Operations Index</span>
                  <span className="text-[10px] text-red-400 font-bold">9 Questions</span>
                </div>
                {operations.map((op) => (
                  <button
                    key={op.id}
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
                      Q1 • Incident Scope &amp; Versioning
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    How many versions of 3CX running on Windows have been flagged as malware?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p className="font-mono text-xs sm:text-sm text-red-300">
                    u should knwo how to think so we will follow these step  Where to search ➔ Why search here ➔ How to search
                  </p>

                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> Official vendor security bulletins and emergency government/agency advisories (3CX official advisory, CISA Alert AA23-101A).
                    </li>
                    <li>
                      <strong>Why search here:</strong> In a software supply chain breach, the adversary compromises the build pipeline and signs malicious updates with legitimate vendor certificates. The affected vendor and cybersecurity agencies immediately scope the <strong>blast radius</strong> and publish the exact affected version numbers. You should never guess when authoritative advisories publish verified version tables.
                    </li>
                    <li>
                      <strong>How to search:</strong> Search Google for: <code className="text-amber-300 bg-black/50 px-1 py-0.5 rounded font-mono">&quot;3CX&quot; &quot;supply chain&quot; &quot;affected versions&quot; windows advisory</code> or check CISA&apos;s official advisory directly.
                    </li>
                  </ul>

                  <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href="https://www.3cx.com/blog/news/desktopapp-security-alert/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>3CX Official Security Bulletin</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-101a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>CISA Advisory AA23-101A</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    Both advisories confirmed that exactly <strong>2</strong> Windows desktop application versions were compromised:
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><code className="text-red-300">18.12.407</code> (Windows)</li>
                    <li><code className="text-red-300">18.12.416</code> (Windows)</li>
                  </ul>

                  <p className="text-xs text-zinc-500 italic">
                    (Note: While four Mac versions were also trojanized, the question specifically focuses on Windows).
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">2</code>
                    </div>
                    <CopyButton text="2" />
                  </div>
                </div>
              </section>

              {/* Q2 */}
              <section id="q2" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q2 • Binary Compilation Forensics
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What&apos;s the UTC creation time of the .msi malware?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> VirusTotal ➔ <strong>Details</strong> tab ➔ <strong>History</strong> section.
                    </li>
                    <li>
                      <strong>Why search here:</strong> Windows Installer (<code>.msi</code>) packages and Portable Executables (PE) embed internal compilation and database authoring timestamps in their OLE <code>\x05SummaryInformation</code> stream. Comparing this creation time against file submission dates and external log timestamps helps threat hunters determine when the build server was hijacked versus when the tainted update was distributed.
                    </li>
                    <li>
                      <strong>How to search:</strong> Paste the MSI SHA-256 hash (<code className="text-amber-300 bg-black/50 px-1 py-0.5 rounded font-mono break-all">59e1edf4d82fae4978e97512b0331b7eb21dd4b838b850ba46794d9c7a2c0983</code>) into VirusTotal. Click the <strong>Details</strong> tab and scroll down to the <strong>History</strong> section. Look for the <strong>Creation Time</strong> field.
                    </li>
                  </ul>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113144636.png"
                      alt="VirusTotal Details tab showing MSI Creation Time"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    Under History, the creation time is recorded as: <code className="text-red-300 font-mono">2023-03-13 06:33:26 UTC</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (UTC Timestamp)</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">2023-03-13 06:33:26</code>
                    </div>
                    <CopyButton text="2023-03-13 06:33:26" />
                  </div>
                </div>
              </section>

              {/* Q3 */}
              <section id="q3" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q3 • Bundled Payload Extraction
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Which malicious DLLs were dropped by the .msi file?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> VirusTotal ➔ <strong>Relations</strong> tab ➔ <strong>Bundled Files</strong> / <strong>Dropped Files</strong>.
                    </li>
                    <li>
                      <strong>Why search here:</strong> An MSI file is essentially a compressed database archive that unpacks numerous files into the target application directory. Attackers hide trojanized DLLs among dozens of legitimate dependencies. VirusTotal automatically extracts these bundled sub-files and scans each one individually, surfacing dropped binaries with high detection ratios.
                    </li>
                    <li>
                      <strong>How to search:</strong> In VirusTotal&apos;s report for the MSI, open the <strong>Relations</strong> tab. Scroll to the <strong>Bundled Files</strong> section. Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">Ctrl + F</kbd> and type <code className="text-amber-300 font-mono">dll</code> to filter through the extracted libraries. Check which DLLs have significant malicious detection counts.
                    </li>
                  </ul>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113145133.png"
                        alt="VirusTotal Relations tab selection"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113145213.png"
                        alt="Bundled files showing ffmpeg.dll and d3dcompiler_47.dll"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Two Win32 DLLs stand out with high detection scores:
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><code className="text-red-300">ffmpeg.dll</code> (54/70 detections — the primary loader that performs beaconing and reads encrypted shellcode)</li>
                    <li><code className="text-red-300">d3dcompiler_47.dll</code> (44/68 detections — legitimate Microsoft DirectX compiler with encrypted payload shellcode appended to its overlay)</li>
                  </ul>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">ffmpeg.dll, d3dcompiler_47.dll</code>
                    </div>
                    <CopyButton text="ffmpeg.dll, d3dcompiler_47.dll" />
                  </div>
                </div>
              </section>

              {/* Q4 */}
              <section id="q4" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q4 • Execution Hijacking Tradecraft
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the MITRE Technique ID employed by the .msi files to load the malicious DLL?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> VirusTotal ➔ <strong>Behavior</strong> tab ➔ <strong>MITRE ATT&amp;CK Tactics and Techniques</strong> (under Defense Evasion / Persistence).
                    </li>
                    <li>
                      <strong>Why search here:</strong> When legitimate software launches, it searches specific directories to load required DLLs. If an attacker places a malicious DLL with the expected name in the application directory, the signed program loads the malicious code instead. This technique is known as <strong>DLL Side-Loading</strong>, allowing the adversary to execute code within a trusted process context without triggering suspicious execution alerts.
                    </li>
                    <li>
                      <strong>How to search:</strong> Under the Behavior tab, expand the MITRE ATT&amp;CK taxonomy. Locate the technique mapped under <em>Defense Evasion</em> describing loading dependencies / DLL search order hijacking: <strong>Hijack Execution Flow: DLL Side-Loading</strong>.
                    </li>
                  </ul>

                  <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href="https://attack.mitre.org/techniques/T1574/002/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>MITRE ATT&amp;CK T1574.002 Specification</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113155531.png"
                      alt="VirusTotal MITRE ATT&CK card showing DLL Side-Loading T1574.002"
                      width={600}
                      height={200}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    The MITRE ATT&amp;CK ID is: <code className="text-red-300 font-mono font-bold">T1574.002</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">T1574.002</code>
                    </div>
                    <CopyButton text="T1574.002" />
                  </div>
                </div>
              </section>

              {/* Q5 */}
              <section id="q5" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q5 • Vendor Threat Taxonomy
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the malware family / threat category of the two malicious DLLs?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> VirusTotal ➔ <strong>Detection</strong> tab ➔ <strong>Security Vendors&apos; Analysis</strong> and popular threat category badges.
                    </li>
                    <li>
                      <strong>Why search here:</strong> Different antivirus engines use varying names for campaign strains, but they converge on universal functional <strong>threat categories</strong> (e.g., Trojan, Worm, Ransomware, Adware). Identifying the threat category helps SOC teams establish the baseline nature of the threat.
                    </li>
                    <li>
                      <strong>How to search:</strong> Check the <em>Threat categories</em> pills at the top of the Detection tab, or inspect individual vendor strings (such as Antiy-AVL and Kaspersky).
                    </li>
                  </ul>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113155931.png"
                      alt="VirusTotal detection showing Trojan threat category"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    Notice:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li>Antiy-AVL flags: <code className="text-red-300">Trojan/Win64.DLLhijack</code></li>
                    <li>Kaspersky flags: <code className="text-red-300">HEUR:Trojan.Win64.DllHijack.gen</code></li>
                    <li>Threat category pill: <code className="text-zinc-200">trojan</code></li>
                  </ul>

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

              {/* Q6 */}
              <section id="q6" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q6 • Anti-Analysis &amp; Sandbox Evasion
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the MITRE ID for the virtualization/sandbox evasion techniques used by the two malicious DLLs?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> VirusTotal ➔ <strong>Behavior</strong> tab (under <code>ffmpeg.dll</code>) ➔ <strong>MITRE ATT&amp;CK</strong> (Defense Evasion).
                    </li>
                    <li>
                      <strong>Why search here:</strong> Nation-state malware authors implement anti-analysis routines so their malware remains dormant when analyzed inside automated sandbox environments (such as Cuckoo, Any.Run, or corporate mail gateway sandboxes). If the malware detects virtualization or sleep throttling, it aborts execution to avoid exposing its C2 infrastructure.
                    </li>
                    <li>
                      <strong>How to search:</strong> In the Behavior tab for <code>ffmpeg.dll</code>, search for <code className="text-amber-300 font-mono">Virtualization</code> or <code className="text-amber-300 font-mono">Sandbox Evasion</code>. The MITRE framework groups all anti-virtualization and sleep delay checks under one parent technique.
                    </li>
                  </ul>

                  <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href="https://attack.mitre.org/techniques/T1497/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>MITRE ATT&amp;CK T1497 Specification</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113160813.png"
                        alt="Virtualization/Sandbox Evasion T1497 badge"
                        width={600}
                        height={200}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                      <Image
                        src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113160840.png"
                        alt="MITRE ATT&CK Defense Evasion showing T1497.003 Time-Based Evasion"
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    The MITRE ATT&amp;CK ID is: <code className="text-red-300 font-mono font-bold">T1497</code> (specifically <code className="text-zinc-300">T1497.003</code> for Time-Based Evasion, where the malware executed extended sleep cycles to outlast sandbox timeouts).
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">T1497</code>
                    </div>
                    <CopyButton text="T1497" />
                  </div>
                </div>
              </section>

              {/* Q7 */}
              <section id="q7" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q7 • Anti-VM Artifact Probing
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Which hypervisor is targeted by the anti-analysis techniques in the ffmpeg.dll file?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> VirusTotal ➔ <code>ffmpeg.dll</code> report ➔ <strong>Behavior</strong> tab ➔ <strong>System Checks</strong> (<code className="text-amber-300 font-mono">T1497.001</code>).
                    </li>
                    <li>
                      <strong>Why search here:</strong> Hypervisors expose specific virtual hardware signatures (e.g., VMware I/O communication ports, specific display adapter strings, registry keys like <code>HARDWARE\\DEVICEMAP\\Scsi</code>). Sandboxes monitor API calls that query these hardware signatures to identify targeted hypervisors.
                    </li>
                    <li>
                      <strong>How to search:</strong> In the dynamic analysis summary, look under <em>System Checks</em>. Search the page for <code className="text-amber-300 font-mono">anti-VM</code> to see which hypervisor string the malware referenced.
                    </li>
                  </ul>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113161143.png"
                      alt="VirusTotal Activity Summary showing anti-VM strings targeting VMware"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    The behavioral engine notes: <code className="text-red-300 font-mono">reference anti-VM strings targeting VMWare</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">VMware</code>
                    </div>
                    <CopyButton text="VMware" />
                  </div>
                </div>
              </section>

              {/* Q8 */}
              <section id="q8" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q8 • Cryptographic Unpacking Analysis
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What encryption algorithm is used by the ffmpeg.dll file?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-xs text-zinc-300 font-sans pl-1">
                    <li>
                      <strong>Where to search:</strong> In-depth Threat Intelligence technical blogs and reverse engineering reports from incident response teams (Mandiant/Google Cloud, CrowdStrike, SentinelOne).
                    </li>
                    <li>
                      <strong>Why search here:</strong> Automated sandboxes often cannot decrypt multi-stage steganographic shellcode that relies on custom extraction routines. In the 3CX breach, <code>ffmpeg.dll</code> read encrypted shellcode appended to <code>d3dcompiler_47.dll</code> using a tool called <strong>SIGFLIP</strong>. Incident responders decompiled these routines in Ghidra/IDA Pro and published the exact stream cipher used.
                    </li>
                    <li>
                      <strong>How to search:</strong> Search Google for: <code className="text-amber-300 bg-black/50 px-1 py-0.5 rounded font-mono">&quot;ffmpeg.dll&quot; &quot;3cx&quot; &quot;SIGFLIP&quot; OR &quot;stream cipher&quot; OR &quot;encryption algorithm&quot;</code>, or read Mandiant&apos;s comprehensive incident report.
                    </li>
                  </ul>

                  <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href="https://cloud.google.com/blog/topics/threat-intelligence/3cx-software-supply-chain-compromise"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>Mandiant: 3CX Software Supply Chain Compromise</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://www.crowdstrike.com/blog/crowdstrike-falcon-under-attack-3cx-desktop-app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>CrowdStrike: Falcon Under Attack</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-delivering-trojanized-3cxdesktopapp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>SentinelOne: SmoothOperator In-Depth</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113161518.png"
                      alt="Threat Intelligence excerpt detailing SIGFLIP and RC4 stream-cipher"
                      width={1000}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider font-mono">The technical report details:</span>
                    <blockquote className="border-l-2 border-red-500/50 pl-3 italic text-zinc-400">
                      &quot;The loaded malicious DLLs contains and uses SIGFLIP and DAVESHELL to decrypt and load the payload into memory from the other dropped malicious executable. SIGFLIP relies on <strong className="text-amber-300">RC4 stream-cipher</strong> to decrypt the payload of choice and uses the byte sequence FEEDFACE to find the shellcode, in this case DAVESHELL, during the decryption stage.&quot;
                    </blockquote>
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">RC4</code>
                    </div>
                    <CopyButton text="RC4" />
                  </div>
                </div>
              </section>

              {/* Q9 */}
              <section id="q9" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q9 • Threat Actor Attribution
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Which group is responsible for this attack?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    When answering attribution in threat intelligence, analysts never rely on a single artifact. Security researchers definitively linked the 3CX supply chain attack to the North Korean state-sponsored <strong>Lazarus Group</strong> (tracked as <strong>UNC4736</strong> by Mandiant and <strong>Labyrinth Chollima</strong> by CrowdStrike) through <strong>four convergent pillars of forensic evidence</strong>:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs">
                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">1. Shared Infrastructure:</span>
                      <p className="text-zinc-400 leading-relaxed">
                        The secondary payload dropped by <code className="text-zinc-300">d3dcompiler_47.dll</code> reached out to C2 domains hosted on IP addresses previously used by Lazarus. Specifically, these IPs overlapped with earlier <strong>AppleJeus</strong> campaigns targeting cryptocurrency firms.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">2. Identical Malware Codebase:</span>
                      <p className="text-zinc-400 leading-relaxed">
                        The trojanized 3CX binaries contained exact code patterns, string-handling routines, custom RC4 decryption functions, and multi-stage loader logic identical to known Lazarus malware families like <strong>MATA</strong> (Dacls) and <strong>POOLRAT</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">3. Cascading Supply Chain Breach:</span>
                      <p className="text-zinc-400 leading-relaxed">
                        Mandiant&apos;s incident response investigation traced the initial breach back to <strong>Trading Technologies&apos; X_TRADER</strong> software, which Lazarus had compromised in 2022. The attackers stole credentials from an infected 3CX employee&apos;s machine to pivot into 3CX&apos;s Windows and macOS build environments.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">4. Targeted Financial Victimology:</span>
                      <p className="text-zinc-400 leading-relaxed">
                        While the poisoned update reached hundreds of thousands of organizations globally, the attackers only deployed second-stage interactive backdoors to high-value cryptocurrency, web3, and financial firms. This selective targeting is a classic signature of North Korean financially motivated state operations.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href="https://cloud.google.com/blog/topics/threat-intelligence/3cx-software-supply-chain-compromise"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>Mandiant: Head in the Clouds - Uncovering UNC4736</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-101a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>CISA Cybersecurity Advisory AA23-101A</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://news.sophos.com/en-us/2023/03/29/3cx-desktop-app-supply-chain-compromise/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>Sophos: 3CX Desktop App Supply Chain In-Depth</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-red-300 font-bold">Lazarus</code>
                    </div>
                    <CopyButton text="Lazarus" />
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
