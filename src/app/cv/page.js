"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function CVPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [layoutMode, setLayoutMode] = useState("flowcv"); // 'flowcv' or 'dossier'

  const certificates = [
    {
      title: "DFIR Foundations and Techniques — Professional Skills & Readiness",
      issuer: "Blue Cape Security",
      instructor: "Markus Schober, Lead Instructor",
      date: "July 2026",
      hours: "8 Hours Intensive Training",
      type: "Professional Credential",
      status: "Verified",
      file: "/certificates/blue-cape-security-dfir.pdf",
      isPdf: true,
      description:
        "Comprehensive hands-on digital forensics and incident response training focusing on enterprise evidence handling, volatile memory analysis, disk artifact parsing, and forensic readiness."
    },
    {
      title: "Capture The Flag Competition — Finalist & Qualification",
      issuer: "IEEE Computer Society & NTRA (National Telecom Regulatory Authority)",
      counselor: "Dr. Sherif Kichk & Sandy Saied",
      date: "October 2026",
      type: "Competitive CTF Finalist",
      status: "Verified",
      file: "/certificates/ieee-ntra-ctf-finalist.jpeg",
      isPdf: false,
      description:
        "Earned finalist status in the official IEEE / NTRA Capture The Flag competition, demonstrating high-pressure forensic triage, binary deconstruction, and threat scenario resolution."
    },
    {
      title: "H7CTF 2026 — Cybersecurity Capture The Flag",
      issuer: "H7TEX (Sponsored by OtterSec, Payatu, JSMON, aisafe)",
      credentialId: "H7CTF26 - JDUJ-CR48-J5LA",
      date: "September 2026",
      type: "Competition Credential",
      status: "Verified",
      verifyUrl: "https://app.h7tex.com/verify",
      file: "/certificates/h7ctf-2026-certificate.jpeg",
      isPdf: false,
      description:
        "Participated in international competitive cybersecurity operations focusing on network analysis, reverse engineering, web exploitation, and endpoint defense."
    },
    {
      title: "SOC Analyst Path — Security Operations & Threat Hunting",
      issuer: "Hack The Box (HTB)",
      date: "2024 — 2026",
      type: "Practical Curriculum",
      status: "Coursework Completed",
      description:
        "Completed specialized technical modules in Incident Handling Processes, Security Monitoring & SIEM Fundamentals, Malware Analysis, JavaScript Deobfuscation, YARA & Sigma Rules, and Splunk Detection Engineering."
    }
  ];

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200 print:bg-white print:text-black">
      
      {/* Hide Navbar during print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-4 pb-24 print:p-0 print:max-w-none">
        
        {/* Top Control Bar (Hidden in Print) */}
        <div className="print:hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Resume &amp; Dossier
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono text-xs text-zinc-400">
                {layoutMode === "flowcv" ? "FlowCV A4 Document View" : "CRT Terminal Dossier View"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-0.5">
              AbdelRahman Mohamed Hassan
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs shrink-0">
            {/* View Mode Toggle */}
            <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800">
              <button
                onClick={() => setLayoutMode("flowcv")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  layoutMode === "flowcv"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                FlowCV Paper
              </button>
              <button
                onClick={() => setLayoutMode("dossier")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  layoutMode === "dossier"
                    ? "bg-emerald-500 text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Dark Dossier
              </button>
            </div>

            <a 
              href="https://flowcv.com/resume/b95tjbs4nk2g"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Live FlowCV</span>
              <span>↗</span>
            </a>

            <a 
              href="/downloads/AbdelRahman_Mohamed_Hassan_CV.pdf"
              download
              className="px-3 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>PDF</span>
              <span>↓</span>
            </a>

            <button 
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              className="px-3.5 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* MODE 1: FLOWCV AUTHENTIC A4 PAPER LAYOUT                         */}
        {/* ================================================================= */}
        {layoutMode === "flowcv" && (
          <div className="bg-white text-zinc-900 rounded-none sm:rounded-lg shadow-2xl p-7 sm:p-12 md:p-16 space-y-7 border border-zinc-200/80 print:shadow-none print:border-none print:p-0 print:m-0 font-sans">
            
            {/* FlowCV Centered Header */}
            <div className="text-center space-y-2 pb-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-serif">
                AbdelRahman Mohamed Hassan
              </h1>
              <p className="text-sm sm:text-base italic text-zinc-700 font-serif">
                Junior Cyber Security Specialist
              </p>

              {/* Centered FlowCV Contact Strip with SVGs */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-zinc-700 pt-1 font-sans">
                <a href="mailto:AbdelrahmanMHasssan@gmail.com" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.68 20c1.414 0 2.56-1.194 2.56-2.667V10.5l-9.765 4.072a1.005 1.005 0 01-.475.095c-.232 0-.392-.034-.472-.099L1.76 10.5v6.833C1.76 18.806 2.906 20 4.32 20h15.36zM12 11.9l10.24-4.267v-.966C22.24 5.194 21.094 4 19.68 4H4.32C2.906 4 1.76 5.194 1.76 6.667v.966L12 11.9z"/></svg>
                  <span>AbdelrahmanMHasssan@gmail.com</span>
                </a>

                <span className="text-zinc-300">•</span>

                <a href="tel:01098857028" className="flex items-center gap-1.5 hover:text-black transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22.964 17.632l-.999 4.33a1.336 1.336 0 01-1.31 1.04c-10.834 0-19.65-8.816-19.65-19.66 0-.629.428-1.167 1.04-1.307l4.33-.998a1.352 1.352 0 011.54.778L9.912 6.48c.233.55.076 1.188-.386 1.565L7.214 9.942a15.021 15.021 0 006.854 6.852l1.892-2.312a1.337 1.337 0 011.567-.385l4.66 1.997c.596.258.923.91.777 1.538z"/></svg>
                  <span>01098857028</span>
                </a>

                <span className="text-zinc-300">•</span>

                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.3 24a39.034 39.034 0 01-4.5-4.707c-2.057-2.547-4.5-6.341-4.5-9.957-.002-3.775 2.191-7.18 5.556-8.625 3.364-1.445 7.237-.646 9.81 2.025 1.693 1.748 2.642 4.124 2.634 6.6 0 3.616-2.443 7.41-4.5 9.957A39.041 39.041 0 0112.3 24zm0-18.663c-1.378 0-2.651.762-3.34 2a4.127 4.127 0 000 3.999c.689 1.237 1.962 2 3.34 2 2.13 0 3.857-1.791 3.857-4 0-2.208-1.727-3.999-3.857-3.999z"/></svg>
                  <span>Cairo, Egypt</span>
                </span>

                <span className="text-zinc-300">•</span>

                <a href="https://linkedin.com/in/abdoskills" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span>linkedin.com/in/abdoskills</span>
                </a>

                <span className="text-zinc-300">•</span>

                <a href="https://github.com/abdoskills" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-700 hover:text-blue-900 transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  <span>github.com/abdoskills</span>
                </a>
              </div>
            </div>

            {/* Section: SUMMARY */}
            <div className="space-y-1.5">
              <div className="border-b-2 border-black pb-0.5">
                <h2 className="text-sm font-bold tracking-wider uppercase text-black font-sans">
                  SUMMARY
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-800 text-justify">
                Hands-on Junior Cyber Security Specialist specializing in Digital Forensics, Incident Response (DFIR), and Threat Hunting. Experienced in dissecting complex attack lifecycles across Windows and Linux environments by correlating volatile memory dumps, raw disk artifacts, network traffic (TCP/IP), and Windows Event Logs. Proven ability to identify in-memory credential theft (LSASS dumping), detect rootkit persistence in offline registry hives, and uncover fileless WMI malware. Adept at using enterprise forensics tooling (Volatility 3, KAPE, Sysinternals, Eric Zimmerman Tools) and authoring reproducible forensic walkthroughs.
              </p>
            </div>

            {/* Section: PROJECTS */}
            <div className="space-y-3">
              <div className="border-b-2 border-black pb-0.5">
                <h2 className="text-sm font-bold tracking-wider uppercase text-black font-sans">
                  PROJECTS
                </h2>
              </div>

              {/* Project 1 */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs sm:text-[13px] font-bold text-black">
                    Enterprise Incident Response Capstone (Operation Ghost Drift)
                  </h3>
                  <span className="text-[11px] italic text-zinc-600">Lead Investigator</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs sm:text-[12.5px] leading-relaxed text-zinc-800">
                  <li>Reconstructed a complete enterprise APT attack lifecycle by correlating evidence across 5 operational layers: Network PCAP, RAM dump, NTFS disk image, Registry hives, and Windows Event Logs.</li>
                  <li>Mathematically proved in-memory credential theft (LSASS dumping) by tracking Sysmon Event ID 10 with target process <code className="text-xs font-mono">lsass.exe</code> and GrantedAccess mask <code className="text-xs font-mono">0x1010</code>.</li>
                  <li>Uncovered stealth kernel-level rootkit persistence by parsing offline SYSTEM registry hive services for rogue boot-start drivers configured for privilege escalation.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs sm:text-[13px] font-bold text-black">
                    Endpoint Forensics &amp; Threat Hunting Scenarios
                  </h3>
                  <span className="text-[11px] italic text-zinc-600">Evidence Triage</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs sm:text-[12.5px] leading-relaxed text-zinc-800">
                  <li>Mapped attacker lateral movement and user execution trails using PECmd (Prefetch), Shellbags, and LNK Jumplist analysis to establish a definitive exfiltration timeline.</li>
                  <li>Detected deliberate anti-forensics timestomping by calculating sub-millisecond discrepancies between NTFS <code className="text-xs font-mono">$STANDARD_INFORMATION</code> and <code className="text-xs font-mono">$FILE_NAME</code> attributes.</li>
                  <li>Dissected fileless WMI malware persistence by auditing Sysmon Event IDs 19-21, isolating Base64-encoded PowerShell payloads hidden in CIM event consumers.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs sm:text-[13px] font-bold text-black">
                    Memory Forensics &amp; Network C2 Dissection
                  </h3>
                  <span className="text-[11px] italic text-zinc-600">Volatile Triage</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs sm:text-[12.5px] leading-relaxed text-zinc-800">
                  <li>Extracted injected payloads, VAD memory hooks, and stealth unmapped DLLs from raw memory dumps using Volatility 3 plugins (<code className="text-xs font-mono">windows.pslist</code>, <code className="text-xs font-mono">windows.vadinfo</code>, <code className="text-xs font-mono">windows.malfind</code>).</li>
                  <li>Conducted network packet analysis in Wireshark and tshark to isolate malware beacon intervals, reconstruct HTTP streams, and extract weaponized binary payloads.</li>
                </ul>
              </div>
            </div>

            {/* Section: CERTIFICATES & CREDENTIALS (NEW & CURATED) */}
            <div className="space-y-2">
              <div className="border-b-2 border-black pb-0.5">
                <h2 className="text-sm font-bold tracking-wider uppercase text-black font-sans">
                  CERTIFICATES &amp; CREDENTIALS
                </h2>
              </div>

              <div className="space-y-1.5 text-xs sm:text-[12.5px]">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-0.5">
                    <div>
                      <span 
                        onClick={() => cert.file && setSelectedCert(cert)}
                        className={`font-bold text-black ${cert.file ? "hover:underline cursor-pointer text-blue-900" : ""}`}
                      >
                        {cert.title}
                      </span>
                      <span className="text-zinc-600"> — {cert.issuer}</span>
                      {cert.credentialId && (
                        <span className="text-zinc-500 font-mono text-[11px]"> (ID: {cert.credentialId})</span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 shrink-0">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: TECHNICAL SKILLS (2-COLUMN FLOWCV GRID) */}
            <div className="space-y-2">
              <div className="border-b-2 border-black pb-0.5">
                <h2 className="text-sm font-bold tracking-wider uppercase text-black font-sans">
                  TECHNICAL SKILLS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-[12.5px]">
                <div>
                  <span className="font-bold text-black block">Endpoint Forensics</span>
                  <span className="text-zinc-700">NTFS $MFT, Prefetch, Shellbags, LNK Jumplists, Registry Hives, KAPE, EZTools</span>
                </div>
                <div>
                  <span className="font-bold text-black block">Memory Analysis</span>
                  <span className="text-zinc-700">Volatility 2 &amp; 3, VAD Tree Carving, DKOM, MemProcFS, WinDbg</span>
                </div>
                <div>
                  <span className="font-bold text-black block">Threat Hunting</span>
                  <span className="text-zinc-700">Sysmon (IDs 1, 3, 10, 19-21), Hayabusa, Event Logs, Sigma Rules, Splunk</span>
                </div>
                <div>
                  <span className="font-bold text-black block">Network Forensics</span>
                  <span className="text-zinc-700">Wireshark, TShark, PCAP Stream Reassembly, C2 Beacon Isolation</span>
                </div>
                <div>
                  <span className="font-bold text-black block">Malware Triage</span>
                  <span className="text-zinc-700">Ghidra, x64dbg, PE-Bear, HxD, Cryptographic Routine Deobfuscation</span>
                </div>
                <div>
                  <span className="font-bold text-black block">Scripting &amp; Tools</span>
                  <span className="text-zinc-700">Python 3 (Custom Forensic Parsers), PowerShell CLI, Bash, Timeline Explorer</span>
                </div>
              </div>
            </div>

            {/* Section: EDUCATION */}
            <div className="space-y-1">
              <div className="border-b-2 border-black pb-0.5">
                <h2 className="text-sm font-bold tracking-wider uppercase text-black font-sans">
                  EDUCATION
                </h2>
              </div>

              <div className="flex justify-between items-baseline text-xs sm:text-[12.5px]">
                <div>
                  <span className="font-bold text-black">Higher Technological Institute (HTI)</span>
                  <span className="text-zinc-700"> — Bachelor of Science in Computer Science</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">In Progress</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                Foundations: Computer Architecture, Operating System Internals, Data Structures &amp; Algorithms, File Processing, TCP/IP Networking.
              </p>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* MODE 2: DARK CRT TERMINAL DOSSIER VIEW                            */}
        {/* ================================================================= */}
        {layoutMode === "dossier" && (
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-10 space-y-10 backdrop-blur-xl shadow-2xl font-sans text-zinc-200">
            
            <header className="border-b border-zinc-800 pb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                    AbdelRahman Mohamed Hassan
                  </h1>
                  <p className="text-emerald-400 font-mono text-xs sm:text-sm mt-1 font-semibold">
                    Junior Cyber Security Specialist // DFIR &amp; Threat Hunting
                  </p>
                </div>

                <div className="text-xs font-mono text-zinc-400 space-y-1 text-left sm:text-right">
                  <div>Cairo, Egypt | +20 1098857028</div>
                  <div>AbdelrahmanMHasssan@gmail.com</div>
                  <div>LinkedIn: in/abdoskills • GitHub: abdoskills</div>
                </div>
              </div>
            </header>

            {/* Section 01: Summary */}
            <section className="space-y-3">
              <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2">
                <span>01.</span> Executive Summary
              </h2>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                Hands-on Junior Cyber Security Specialist specializing in Digital Forensics, Incident Response (DFIR), and Threat Hunting. Experienced in dissecting complex attack chains across Windows and Linux environments by correlating volatile memory dumps, raw disk artifacts, network traffic (TCP/IP), and Windows Event Logs. Proven ability to identify credential theft (LSASS dumping), detect rootkit persistence in offline registry hives, and uncover fileless WMI malware.
              </p>
            </section>

            {/* Section 02: Credentials */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2">
                <span>02.</span> Verified Credentials &amp; Certifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    onClick={() => cert.file && setSelectedCert(cert)}
                    className={`p-4 rounded-xl border transition-all ${
                      cert.file
                        ? "bg-black/50 border-zinc-800 hover:border-emerald-500/50 cursor-pointer group"
                        : "bg-black/30 border-zinc-800/60"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {cert.type}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-[11px] font-mono text-zinc-400 mt-1">
                      Issuer: <span className="text-zinc-300 font-semibold">{cert.issuer}</span>
                    </p>

                    {cert.file && (
                      <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                        <span>View Credential Artifact</span>
                        <span>↗</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 03: Projects */}
            <section className="space-y-5">
              <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2">
                <span>03.</span> Practical Incident Response Labs
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white">
                    Enterprise Incident Response Capstone (Operation Ghost Drift)
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300 pl-1">
                    <li>Correlated evidence across 5 layers: PCAP, RAM, NTFS disk, Registry, and Sysmon EVTX.</li>
                    <li>Proved LSASS memory credential dumping via Sysmon Event ID 10 with GrantedAccess 0x1010.</li>
                    <li>Uncovered stealth kernel-level rootkit persistence in offline SYSTEM registry hive services.</li>
                  </ul>
                </div>

                <div className="space-y-1.5 pt-2">
                  <h3 className="text-sm font-bold text-white">
                    Endpoint Forensics &amp; Lateral Movement Triage
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300 pl-1">
                    <li>Mapped attacker lateral movement using Prefetch (PECmd), Shellbags, and LNK Jumplist analysis.</li>
                    <li>Detected anti-forensics timestomping by calculating NTFS $STANDARD_INFO vs $FILE_NAME discrepancies.</li>
                    <li>Isolated fileless WMI malware persistence by auditing Sysmon Event IDs 19-21.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 04: Skills */}
            <section className="space-y-3">
              <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2">
                <span>04.</span> Technical Competencies
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-300 block">Endpoint Forensics</span>
                  <p className="text-zinc-300">NTFS $MFT, Prefetch, Shellbags, LNK, Registry Hives, KAPE, EZTools</p>
                </div>
                <div className="p-3 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-300 block">Memory &amp; Network</span>
                  <p className="text-zinc-300">Volatility 2 &amp; 3, VAD Carving, Wireshark, TShark, PCAP Stream Reassembly</p>
                </div>
              </div>
            </section>

          </div>
        )}

      </main>

      {/* Interactive Certificate View Modal (Hidden in Print) */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 print:hidden"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121316] border border-zinc-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  {selectedCert.type} // {selectedCert.issuer}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans mt-0.5">
                  {selectedCert.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="text-zinc-400 hover:text-white font-mono text-lg px-2 py-1 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {selectedCert.isPdf ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center space-y-3">
                <div className="text-3xl font-mono text-emerald-400 font-bold">[ PDF ]</div>
                <p className="text-xs text-zinc-300">
                  {selectedCert.title}
                </p>
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-emerald-500 text-black font-bold font-mono text-xs rounded-xl hover:bg-emerald-400 transition-all"
                >
                  Open Verified PDF Document ↗
                </a>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-zinc-800 max-h-[60vh] flex items-center justify-center bg-black/60">
                <img 
                  src={selectedCert.file} 
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[58vh]"
                />
              </div>
            )}

            <div className="flex flex-wrap justify-between items-center text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>Date: {selectedCert.date}</span>
              {selectedCert.verifyUrl && (
                <a 
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Verify at {selectedCert.verifyUrl.replace('https://', '')} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
