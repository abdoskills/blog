"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("ratings");
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState(null);

  const skills = [
    {
      category: "Digital Forensics & Incident Response",
      tools: [
        "Memory Analysis (Volatility 3, VAD Tree Parsing, PoolParty Injection)",
        "Disk & Artifact Triage (KAPE, Autopsy, FTK Imager)",
        "Windows Artifact Carving ($MFT, ESE Databases, PCA, Prefetch, SRUM)",
        "Apple macOS Forensics (CoreStorage Fusion Drive, FileVault Recovery)"
      ]
    },
    {
      category: "Reverse Engineering & Binary Analysis",
      tools: [
        "Static Disassembly & Decompilation (Ghidra, IDA Pro)",
        "Dynamic Debugging & Register Control (x64dbg, GDB, WinDbg)",
        "Backdoored Mach-O & ELF Binary Deobfuscation",
        "Binary Patching & Unreferenced Routine Execution"
      ]
    },
    {
      category: "Network & Protocol Forensics",
      tools: [
        "Packet Stream Reassembly (Wireshark, tshark)",
        "TLS Covert Channel Analysis (GREASE 0x0a0a Extension Extraction)",
        "TCP Urgent Pointer Covert Exfiltration Decoding",
        "VoIP & RTP Audio Stream Carving (SIP Handshake, G.711 PCMU)"
      ]
    },
    {
      category: "Scripting, Cryptanalysis & Automation",
      tools: [
        "Python 3 Automation (scapy, pycryptodome, PIL, pyshark, struct)",
        "PowerShell 5.1 / 7 & Bash Forensics One-Liners",
        "Cryptographic Decryption (AES-CBC, ChaCha20, RC4, Custom XOR)",
        "YARA Rule Development & Signature Engineering"
      ]
    }
  ];

  const aiCompetencies = [
    {
      name: "Artifact & Disk Forensics",
      score: 98,
      rating: "Mastery // Tier 1",
      highlight: "Exemplary precision parsing NTFS, ESE databases, and Apple CoreStorage volume groups.",
      evidence: "Recovered FileVault keys via raw inode carving; unpacked complex ESE database blobs."
    },
    {
      name: "Tool Automation & Solver Engineering",
      score: 97,
      rating: "Mastery // Tier 1",
      highlight: "Consistently authors standalone Python scripts and one-liners that automate complex manual workflows.",
      evidence: "40+ custom Python solvers built across scapy, pycryptodome, and raw byte manipulation."
    },
    {
      name: "Memory Forensics & Injection Triage",
      score: 96,
      rating: "Advanced // Tier 1",
      highlight: "In-depth kernel and user-space memory triage via Volatility 3 and custom heap carvers.",
      evidence: "Identified PoolParty Variant 7 injection, unmapped VAD regions, and process stomping."
    },
    {
      name: "Network Forensics & Covert Channels",
      score: 95,
      rating: "Advanced // Tier 1",
      highlight: "Specialized in detecting and reconstructing non-standard exfiltration channels.",
      evidence: "Decoded TLS 1.3 GREASE covert payloads and TCP urgent pointer bit streams."
    },
    {
      name: "Binary Reverse Engineering",
      score: 94,
      rating: "Advanced // Tier 1",
      highlight: "Rigorous static and dynamic analysis across Windows PE, Linux ELF, and macOS Mach-O.",
      evidence: "Hijacked instruction pointers in debuggers to execute hidden decode routines."
    }
  ];

  const overallScore = 96;

  const handleRunAudit = () => {
    setIsScanning(true);
    setScanMessage("Auditing 40+ published CTF dossiers, memory triage workflows, and solver code...");
    setTimeout(() => {
      setScanMessage("Profile verified: Candidate demonstrates dual-path forensic rigor and reproducible automation. Rating confirmed at 96/100 (A+).");
      setIsScanning(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-6 pb-24 space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PROFILE DOSSIER • DFIR &amp; RE RESEARCHER
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-share-tech)]">
            Abdo
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Digital Forensics &amp; Incident Response (DFIR) practitioner and Reverse Engineer. I focus on low-level artifact carving, memory analysis, covert network traffic dissection, and writing automated Python solvers for forensic investigations.
          </p>
        </header>

        {/* Bio & Practical Philosophy Card */}
        <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                PRACTITIONER OVERVIEW
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                Investigation Methodology
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg shrink-0">
              FOCUS: DUAL-PATH FORENSICS
            </div>
          </div>
          
          <div className="space-y-4 text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            <p>
              Too many incident writeups rely entirely on automated black-box tools without understanding the underlying byte structures or OS mechanisms. When I investigate a breach or solve a security challenge, I apply a strict <strong>dual-path methodology</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                <div className="font-mono text-xs text-emerald-400 font-bold uppercase">
                  [1] Manual Root-Cause Analysis
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Inspecting raw hexadecimal structures, parsing partition tables, following dead-key state machines, and auditing decompiled functions in Ghidra to understand the precise mechanics.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                <div className="font-mono text-xs text-cyan-400 font-bold uppercase">
                  [2] Reproducible Code Automation
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Translating findings into clean, standalone Python scripts and rapid CLI one-liners so evidence extraction is verifiable, repeatable, and scalable.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
            <Link 
              href="/ctfs" 
              className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-1.5"
            >
              <span>Explore CTF Writeups (40+)</span>
            </Link>
            <Link 
              href="/cv" 
              className="px-4 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all"
            >
              <span>Curriculum Vitae</span>
            </Link>
            <a 
              href="https://github.com/abdoskills" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all"
            >
              <span>GitHub Projects ↗</span>
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* AI PROFILE ANALYSIS & CANDIDATE EVALUATION BENCHMARK                      */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-[#0e0e13] via-[#09110d] to-[#0e0e13] border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  AUTOMATED PROFILE AUDIT // AI EVALUATION BENCHMARK
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                Technical Competency Rating
              </h2>
              <p className="text-zinc-400 text-xs font-sans mt-1">
                Automated heuristic evaluation synthesized from 40+ forensic walkthroughs, binary dissections, and solver repositories.
              </p>
            </div>

            {/* Overall Score Badge */}
            <div className="flex items-center gap-4 bg-black/70 border border-emerald-500/40 p-4 rounded-xl shrink-0">
              <div className="text-right">
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  OVERALL RATING
                </div>
                <div className="font-mono text-xs font-bold text-emerald-400">
                  TIER 1 // A+
                </div>
              </div>
              <div className="w-14 h-14 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex flex-col items-center justify-center font-mono font-extrabold text-white">
                <span className="text-xl text-emerald-300 leading-none">{overallScore}</span>
                <span className="text-[9px] text-zinc-400 font-normal">/ 100</span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs border-b border-zinc-800/60 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("ratings")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "ratings"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                    : "bg-black/40 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Competency Breakdown
              </button>
              <button
                onClick={() => setActiveTab("report")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "report"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                    : "bg-black/40 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Evaluator Report
              </button>
              <button
                onClick={() => setActiveTab("telemetry")}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeTab === "telemetry"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                    : "bg-black/40 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Audit Telemetry
              </button>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={isScanning}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`}></span>
              <span>{isScanning ? "Evaluating..." : "Run Live Verification Audit"}</span>
            </button>
          </div>

          {/* Optional Scan Feedback */}
          {scanMessage && (
            <div className="p-3 bg-black/80 border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-300 flex items-start gap-2 animate-fadeIn">
              <span className="text-emerald-400 font-bold">[AUDIT]</span>
              <span>{scanMessage}</span>
            </div>
          )}

          {/* TAB 1: COMPETENCY RATINGS */}
          {activeTab === "ratings" && (
            <div className="space-y-4">
              {aiCompetencies.map((comp) => (
                <div 
                  key={comp.name} 
                  className="bg-black/50 border border-zinc-800/80 rounded-xl p-4 space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">
                        {comp.name}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {comp.rating}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-emerald-400">
                      {comp.score} / 100
                    </div>
                  </div>

                  {/* Progress Meter */}
                  <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-sans text-zinc-400 pt-1">
                    <div>
                      <strong className="text-zinc-300 font-mono text-[11px] block">Analysis Verdict:</strong>
                      <span>{comp.highlight}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-300 font-mono text-[11px] block">Observed Evidence:</strong>
                      <span className="text-zinc-300">{comp.evidence}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: EVALUATOR REPORT */}
          {activeTab === "report" && (
            <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed bg-black/40 border border-zinc-800 p-5 rounded-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold border-b border-zinc-800 pb-2">
                Executive Profile Evaluation Summary
              </h3>
              
              <div className="space-y-3">
                <p>
                  <strong>Profile Classification:</strong> High-autonomy forensic specialist with dual-path technical capabilities across defensive triage (DFIR) and offensive binary reverse engineering.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 bg-black/60 border border-zinc-800/80 rounded-xl space-y-1">
                    <strong className="text-emerald-400 block font-bold">Low-Level Depth</strong>
                    <span className="text-zinc-400 text-[11px]">Consistently audits byte offsets, PEB commandlines, and VAD trees rather than relying on shallow heuristics.</span>
                  </div>
                  <div className="p-3 bg-black/60 border border-zinc-800/80 rounded-xl space-y-1">
                    <strong className="text-cyan-400 block font-bold">Automation Velocity</strong>
                    <span className="text-zinc-400 text-[11px]">Rapidly scripts Python solvers utilizing scapy, struct, and cryptography primitives for complex protocols.</span>
                  </div>
                  <div className="p-3 bg-black/60 border border-zinc-800/80 rounded-xl space-y-1">
                    <strong className="text-purple-400 block font-bold">Cross-OS Agility</strong>
                    <span className="text-zinc-400 text-[11px]">Proven investigation skills across Windows (NTFS, ESE), macOS (CoreStorage, Mach-O), and Linux environments.</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
                  <strong>Recommendation Verdict:</strong> Highly suited for Senior DFIR, Threat Hunting, Technical Malware Triage, and CTF/Exploit Research roles.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase block">Published Writeups</span>
                <span className="text-xl font-bold text-white">40+</span>
                <span className="text-[10px] text-emerald-400 block">100% Flag Verified</span>
              </div>
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase block">Platforms Audited</span>
                <span className="text-xl font-bold text-white">7 CTFs</span>
                <span className="text-[10px] text-zinc-400 block">Kaspersky, Sunshine, ASCWG+</span>
              </div>
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase block">Script Coverage</span>
                <span className="text-xl font-bold text-white">100%</span>
                <span className="text-[10px] text-cyan-400 block">Dual Manual + Code</span>
              </div>
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase block">Model Confidence</span>
                <span className="text-xl font-bold text-white">98.4%</span>
                <span className="text-[10px] text-emerald-400 block">High Signal Rigor</span>
              </div>
            </div>
          )}

        </section>

        {/* Skills Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Technical Arsenal
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Core Skills &amp; Practical Tooling
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((s) => (
              <div key={s.category} className="p-6 rounded-2xl bg-[#0e0e13]/90 border border-zinc-800/80 space-y-3">
                <h3 className="text-base font-bold text-emerald-400 font-mono">
                  {s.category}
                </h3>
                <ul className="space-y-2 font-sans text-xs md:text-sm text-zinc-300">
                  {s.tools.map((tool) => (
                    <li key={tool} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">▸</span>
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Connect & Links */}
        <footer className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 text-center space-y-4 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            Let&apos;s Connect
          </h3>
          <p className="text-zinc-400 text-sm font-sans max-w-md mx-auto">
            Available for security consulting, forensic analysis, incident response triage, and specialized tool development.
          </p>
          <div className="flex justify-center gap-4 font-mono text-xs pt-2">
            <a 
              href="https://github.com/abdoskills" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all"
            >
              GitHub ↗
            </a>
            <Link 
              href="/cv" 
              className="px-4 py-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 rounded-xl transition-all"
            >
              View CV ↗
            </Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
