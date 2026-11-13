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
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Trojanized MSI Hash (SHA-256):</span>
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
                  <p>
                    When investigating a software supply chain breach, the very first step for any threat intelligence analyst is determining the <strong>blast radius</strong>: which specific software versions were signed with the compromised certificates and pushed through the vendor&apos;s automatic update channels?
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> Official vendor advisories and emergency agency alerts (CISA, CrowdStrike, Mandiant).
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> In supply chain compromises, attackers poison specific build releases. The affected software vendor and government response bodies publish verified lists of backdoored build numbers.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Search Google for: <code className="text-amber-300">"3CX" "supply chain" "affected versions" windows advisory</code> or reference <a href="https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-101a" target="_blank" rel="noopener noreferrer" className="text-red-400 underline hover:text-red-300">CISA Advisory AA23-101A</a>.
                    </p>
                  </div>

                  <p>
                    Both 3CX&apos;s emergency bulletin and CISA&apos;s alert confirmed that exactly <strong>2</strong> Windows desktop application versions were poisoned by the adversary:
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><code className="text-red-300">18.12.407</code> (Windows Desktop App)</li>
                    <li><code className="text-red-300">18.12.416</code> (Windows Desktop App)</li>
                  </ul>

                  <p className="text-xs text-zinc-500 italic">
                    Note: While macOS versions (18.11.1213, 18.12.402, 18.12.407, and 18.12.416) were also compromised via trojanized Electron frameworks, the question specifically asks for the number of affected <strong>Windows</strong> versions.
                  </p>

                  {/* Reference Links */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
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
                  <p>
                    Every Windows Installer (<code>.msi</code>) package generated by build frameworks (such as WiX or Advanced Installer) embeds internal database properties, including the exact compiler generation timestamp. Establishing this creation time allows threat analysts to reconstruct when the build pipeline was poisoned versus when the binary was pushed live.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> VirusTotal ➔ <strong>Details</strong> tab ➔ <strong>History</strong> section.
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> VirusTotal extracts OLE / MSI Composite Document properties, parsing the internal summary information stream (<code className="text-amber-300">\x05SummaryInformation</code>) that records the official authoring date in UTC.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Search VirusTotal for the sample hash: <code className="text-amber-300">59e1edf4d82fae4978e97512b0331b7eb21dd4b838b850ba46794d9c7a2c0983</code>. Navigate to <strong>Details</strong>, and read the <strong>Creation Time</strong> under <strong>History</strong>.
                    </p>
                  </div>

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
                    Under the <strong>History</strong> block, the creation time recorded for <code>3CXDesktopApp-18.12.416.msi</code> is <code className="text-red-300">2023-03-13 06:33:26 UTC</code>.
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
                  <p>
                    Software installers package dozens of legitimate dependencies (audio codecs, graphics libraries, Electron runtime components). Supply chain attackers conceal their trojanized implants inside these legitimate bundles so the files land on disk signed and nestled directly in the application folder.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> VirusTotal ➔ <strong>Relations</strong> tab ➔ <strong>Bundled Files</strong> table.
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> The Relations tab unpacks the MSI archive and scans each extracted sub-binary against security engines, surfacing individual implants with high positive detection ratios.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> On the MSI report page, select <strong>Relations</strong>. Use the browser search (<kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">Ctrl + F</kbd>) to search for <code className="text-amber-300">dll</code>. Sort or inspect the bundled files by detection score.
                    </p>
                  </div>

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
                    Among the 86 bundled files inside the installer, two prominent Win32 DLLs light up with dozens of malicious vendor detections:
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><code className="text-red-300">ffmpeg.dll</code> (54 / 70 detections — the initial loader responsible for beaconing and reading encrypted payloads)</li>
                    <li><code className="text-red-300">d3dcompiler_47.dll</code> (44 / 68 detections — legitimate Microsoft DirectX compiler trojanized with an encrypted shellcode payload appended to its overlay)</li>
                  </ul>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (Comma-separated DLLs)</span>
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
                  <p>
                    Rather than dropping an obvious standalone executable like <code>malware.exe</code>, advanced persistent threats (APTs) leverage <strong>DLL Side-Loading</strong>. In this mechanism, a completely legitimate, trusted, and often signed executable (here: <code>3CXDesktopApp.exe</code>) searches its local directory for a dependency (<code>ffmpeg.dll</code>) upon launch. The malicious DLL is loaded into the legitimate application process space without triggering endpoint detection alarms.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> VirusTotal ➔ <strong>Behavior</strong> tab ➔ MITRE ATT&amp;CK Matrix (Defense Evasion / Persistence).
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> Dynamic sandbox engines observe the Windows DLL search order hijacking behavior during execution and automatically tag the corresponding MITRE ATT&amp;CK sub-technique.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Under Behavior, scroll to MITRE ATT&amp;CK tactics and look for <em>Hijack Execution Flow: DLL Side-Loading</em>.
                    </p>
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
                    The MITRE ATT&amp;CK framework categorizes DLL Side-Loading under sub-technique ID <code className="text-red-300">T1574.002</code> (parent technique <code className="text-zinc-300">T1574: Hijack Execution Flow</code>).
                  </p>

                  {/* Reference Link */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
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

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (MITRE Technique ID)</span>
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
                  <p>
                    Understanding how security vendors classify an implant allows detection engineers to write robust Sigma and YARA rules. While specific campaign names vary across vendors (e.g., Kaspersky might tag <code>Trojan.Win64.DllHijack</code>, while CrowdStrike or Microsoft tag family variants), the primary <strong>threat category</strong> provides the universal functional taxonomy.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> VirusTotal ➔ <strong>Detection</strong> tab ➔ <strong>Security Vendors&apos; Analysis</strong>.
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> The top bar aggregates the universal threat category labels (Trojan, Worm, Ransomware, Adware) agreed upon across engine heuristics.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Inspect the <em>Threat categories</em> pill badges or review individual vendor detection strings (Antiy-AVL, Kaspersky, ESET).
                    </p>
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/3cx-supply-chain/Pasted_image_20261113155931.png"
                      alt="VirusTotal detection showing Trojan threat category"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    Both Antiy-AVL (<code className="text-zinc-200">Trojan/Win64.DLLhijack</code>) and Kaspersky (<code className="text-zinc-200">HEUR:Trojan.Win64.DllHijack.gen</code>) unanimously categorize the payload as a <strong>Trojan</strong>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (Threat Category)</span>
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
                  <p>
                    Nation-state threat actors design their payloads to remain dormant when detonated inside automated analysis sandboxes. If the malware detects virtualization artifacts, debugger ports, or sandbox hypervisors, it refuses to decrypt its secondary stage or initiate C2 beaconing.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> VirusTotal ➔ <strong>Behavior</strong> tab (under <code>ffmpeg.dll</code>) ➔ <strong>Defense Evasion</strong>.
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> Sandboxes monitor API sleep calls (<code className="text-amber-300">SleepEx</code>, evasive delay loops) and system checks querying hardware strings, mapping them directly to MITRE ATT&amp;CK evasion techniques.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Search for <code className="text-amber-300">Virtualization</code> or <code className="text-amber-300">Sandbox Evasion</code> in the MITRE behavioral summary.
                    </p>
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
                    The MITRE ATT&amp;CK technique covering all virtualization and sandbox environment checks is <code className="text-red-300">T1497</code> (specifically sub-technique <code className="text-zinc-300">T1497.003: Time-Based Evasion</code>, where the malware executed a 7-day sleep cycle to outlast automated sandbox runtimes).
                  </p>

                  {/* Reference Link */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
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

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (MITRE Technique ID)</span>
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
                  <p>
                    Beyond generic sleep calls, <code>ffmpeg.dll</code> explicitly probes for host system artifacts associated with commercial virtualization software. Hypervisors often expose virtual device driver names, specific registry keys, and communication I/O ports that malware authors target to detect when they are running inside a virtualized security sandbox.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> VirusTotal ➔ <code>ffmpeg.dll</code> ➔ <strong>Behavior</strong> tab ➔ <strong>System Checks</strong> (<code className="text-amber-300">T1497.001</code>).
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> Dynamic sandbox analysis hooks Windows APIs (such as <code className="text-amber-300">RegOpenKeyEx</code> and <code className="text-amber-300">SetupDiGetClassDevs</code>) to detect when an executable queries hypervisor hardware signatures.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Search the page for <code className="text-amber-300">anti-VM</code>. Look at the description under System Checks: <code className="text-zinc-300">reference anti-VM strings targeting...</code>
                    </p>
                  </div>

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
                    The dynamic behavioral trace specifically flags: <code className="text-red-300">reference anti-VM strings targeting VMware</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (Hypervisor Name)</span>
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
                  <p>
                    Automated sandboxes often fall short when dealing with multi-component steganographic payloads. In the 3CX campaign, the malicious <code>ffmpeg.dll</code> read encrypted shellcode appended to the overlay of the legitimate <code>d3dcompiler_47.dll</code> binary. Unpacking this stage required identifying the underlying symmetric stream cipher used by the loader.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: Where &amp; Why to Search</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> Leading Threat Intelligence blogs from incident responders (Mandiant, CrowdStrike, SentinelOne).
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> When malware uses custom steganography and shellcode extraction (tools like <strong>SIGFLIP</strong> and <strong>DAVESHELL</strong>), automated sandboxes cannot automatically determine the cipher without manual reverse engineering in IDA Pro / Ghidra. Incident response firms publish these deep-dive findings.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Search Google for: <code className="text-amber-300">"ffmpeg.dll" "3cx" "SIGFLIP" OR "stream cipher" OR "encryption algorithm"</code>, or consult Mandiant&apos;s comprehensive 3CX writeup.
                    </p>
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

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    As detailed in Mandiant&apos;s technical analysis, the malicious DLL utilized an open-source payload steganography utility known as <strong>SIGFLIP</strong>. SIGFLIP locates the embedded shellcode (DAVESHELL) using the sync marker byte sequence <code className="text-amber-300">FEEDFACE</code> and decrypts it using an <strong>RC4 stream-cipher</strong> before executing it in memory.
                  </p>

                  {/* Reference Links */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
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
                      href="https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-delivering-trojanized-3cxdesktopapp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>SentinelOne: SmoothOperator In-Depth</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (Encryption Cipher)</span>
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
                    In cybersecurity threat intelligence, attributing an intrusion to an Advanced Persistent Threat (APT) group is never based on a single artifact or speculation. False flag operations and shared open-source tools mean analysts must establish <strong>convergent lines of evidence</strong> across infrastructure, code similarities, initial intrusion vectors, and victimology.
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 text-xs">
                    <span className="text-red-400 font-mono font-bold uppercase block">Threat Intel Guidance: How Analysts Establish Attribution</span>
                    <p className="text-zinc-400">
                      <strong>Where:</strong> Forensic post-incident retrospectives published by threat research teams (Mandiant/Google Cloud, CrowdStrike Falcon OverWatch, SentinelLabs, Sophos).
                    </p>
                    <p className="text-zinc-400">
                      <strong>Why:</strong> Incident responders tracking nation-state activity clusters maintain multi-year telemetry databases connecting C2 IP allocations, domain registration patterns, and private malware codebases.
                    </p>
                    <p className="text-zinc-400">
                      <strong>How:</strong> Search: <code className="text-amber-300">"3CX" supply chain attribution "Mandiant" OR "CrowdStrike" "UNC4736" OR "Lazarus"</code>.
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 font-semibold pt-1">
                    Security researchers definitively linked the 3CX supply chain attack to the North Korean state-sponsored <strong>Lazarus Group</strong> (tracked by Mandiant as <strong>UNC4736</strong> and CrowdStrike as <strong>Labyrinth Chollima</strong>) through four primary forensic pillars:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs">
                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">1. Shared C2 Infrastructure</span>
                      <p className="text-zinc-400 leading-relaxed">
                        The secondary payload communications initiated by <code className="text-zinc-300">d3dcompiler_47.dll</code> connected to command-and-control servers hosted on IP blocks previously observed in Lazarus campaigns—specifically overlapping with historic <strong>AppleJeus</strong> operations targeting digital asset exchanges.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">2. Identical Malware Codebase</span>
                      <p className="text-zinc-400 leading-relaxed">
                        The trojanized 3CX binaries contained unique string handling routines, custom RC4 decryption functions, and multi-stage loader logic identical to verified Lazarus malware families, specifically <strong>MATA</strong> (Dacls) and <strong>POOLRAT</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">3. Cascading Supply Chain Breach</span>
                      <p className="text-zinc-400 leading-relaxed">
                        Mandiant&apos;s incident response investigation uncovered that 3CX was breached via another supply chain compromise: an infected 3CX software engineer had downloaded a compromised version of <strong>Trading Technologies&apos; X_TRADER</strong> application in 2022—an operation attributed directly to Lazarus. Attackers used stolen credentials from this employee to pivot into 3CX&apos;s Windows and macOS build environments.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/90 space-y-2">
                      <span className="font-mono text-red-400 font-bold block">4. Surgical Financial Victimology</span>
                      <p className="text-zinc-400 leading-relaxed">
                        While the poisoned 3CX update was automatically distributed to over 600,000 corporate customers worldwide, the threat actors selectively pushed their interactive secondary backdoors only to high-value cryptocurrency, web3, and financial institutions—the signature objective of North Korean financially motivated state operations.
                      </p>
                    </div>
                  </div>

                  {/* Reference Links */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <a
                      href="https://cloud.google.com/blog/topics/threat-intelligence/3cx-software-supply-chain-compromise"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>Mandiant: Uncovering UNC4736</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a
                      href="https://www.crowdstrike.com/blog/crowdstrike-falcon-under-attack-3cx-desktop-app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <span>CrowdStrike: Labyrinth Chollima Attribution</span>
                      <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-red-950/20 border border-red-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">Answer (APT Group)</span>
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
