"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function CVPage() {
  const [selectedCert, setSelectedCert] = useState(null);

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24 print:p-0 print:max-w-none">
        
        {/* CV Top Action Bar (Hidden in Print) */}
        <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl">
          <div>
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
              Curriculum Vitae // HR &amp; Technical Dossier
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
              AbdelRahman Mohamed Hassan
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans mt-1">
              Junior Cyber Security Specialist | Digital Forensics &amp; Incident Response (DFIR) | SOC Analyst
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs shrink-0">
            <a 
              href="/downloads/AbdelRahman_Mohamed_Hassan_CV.pdf"
              download
              className="px-3.5 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Download PDF</span>
              <span>↓</span>
            </a>

            <button 
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <span>Print Resume</span>
            </button>
          </div>
        </div>

        {/* Main Printable CV Paper Container */}
        <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-10 space-y-10 backdrop-blur-xl shadow-2xl font-sans print:bg-white print:border-none print:shadow-none print:p-0 print:space-y-6 print:text-black">
          
          {/* Header Block */}
          <header className="border-b border-zinc-800 pb-6 print:border-zinc-300 print:pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight print:text-black font-sans">
                  AbdelRahman Mohamed Hassan
                </h1>
                <p className="text-emerald-400 font-mono text-xs sm:text-sm mt-1 font-semibold print:text-zinc-800">
                  Junior Cyber Security Specialist // DFIR &amp; Threat Hunting
                </p>
              </div>

              {/* Contact Information */}
              <div className="text-xs font-mono text-zinc-400 space-y-1 text-left sm:text-right print:text-zinc-700">
                <div>Cairo, Egypt | +20 1098857028</div>
                <div>
                  <a href="mailto:AbdelrahmanMHasssan@gmail.com" className="hover:text-emerald-400 transition-colors print:text-black">
                    AbdelrahmanMHasssan@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <a href="https://www.linkedin.com/in/abdoskills" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors print:text-black">
                    LinkedIn: in/abdoskills
                  </a>
                  <span>•</span>
                  <a href="https://github.com/abdoskills" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors print:text-black">
                    GitHub: abdoskills
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Section 01: Professional Summary */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2 print:text-black print:border-zinc-300">
              <span>01.</span> Professional Summary
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
              Hands-on Junior Cyber Security Specialist specializing in Digital Forensics, Incident Response (DFIR), and Threat Hunting. Experienced in dissecting complex attack chains across Windows and Linux environments by correlating volatile memory dumps, raw disk artifacts, network traffic (TCP/IP), and Windows Event Logs. Proven ability to identify credential theft (LSASS dumping), detect rootkit persistence in offline registry hives, and uncover fileless WMI malware. Adept at using enterprise forensics tooling (Volatility 3, KAPE, Sysinternals, Eric Zimmerman Tools) and authoring reproducible, dual-path forensic walkthroughs.
            </p>
          </section>

          {/* Section 02: Verified Certifications & Coursework */}
          <section className="space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2 print:border-zinc-300">
              <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-2 print:text-black">
                <span>02.</span> Verified Credentials &amp; Certifications
              </h2>
              <span className="font-mono text-[11px] text-zinc-400 print:hidden">
                Click credentials for details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  onClick={() => cert.file && setSelectedCert(cert)}
                  className={`p-4 rounded-xl border transition-all ${
                    cert.file
                      ? "bg-black/50 border-zinc-800 hover:border-emerald-500/50 cursor-pointer group"
                      : "bg-black/30 border-zinc-800/60"
                  } print:bg-white print:border-zinc-300 print:p-3`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 print:bg-zinc-100 print:text-black print:border-zinc-300">
                      {cert.type}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 print:text-zinc-600">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors print:text-black">
                    {cert.title}
                  </h3>

                  <p className="text-[11px] font-mono text-zinc-400 mt-1 print:text-zinc-700">
                    Issuer: <span className="text-zinc-300 font-semibold print:text-black">{cert.issuer}</span>
                  </p>

                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">
                      Credential ID: <span className="text-zinc-200">{cert.credentialId}</span>
                    </p>
                  )}

                  {cert.hours && (
                    <p className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">
                      Scope: <span className="text-zinc-200">{cert.hours}</span>
                    </p>
                  )}

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed print:text-zinc-700">
                    {cert.description}
                  </p>

                  {cert.file && (
                    <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 group-hover:translate-x-0.5 transition-transform print:hidden">
                      <span>View Credential Artifact</span>
                      <span>↗</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 03: Core Technical Competencies */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2 print:text-black print:border-zinc-300">
              <span>03.</span> Technical Competencies &amp; Tooling
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800/80 space-y-2 print:bg-white print:border-zinc-300 print:p-2">
                <strong className="text-white block font-mono text-xs uppercase tracking-wide border-b border-zinc-800/60 pb-1 text-emerald-300 print:text-black">
                  Endpoint &amp; Disk Forensics
                </strong>
                <p className="text-zinc-300 leading-relaxed print:text-zinc-800">
                  NTFS $MFT &amp; $LogFile Parsing, Anti-Forensics Timestomping Detection ($STANDARD_INFO vs $FILE_NAME), Prefetch (PECmd), Shellbags, LNK Jumplists, Registry Hives (SYSTEM, SAM, SOFTWARE, Amcache), ESE Windows.db Database Carving.
                </p>
                <div className="font-mono text-[11px] text-zinc-400 print:text-zinc-600">
                  Tools: KAPE, FTK Imager, Autopsy, Zimmerman Tools (EZTools), MFTECmd, JLECmd, Registry Explorer.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800/80 space-y-2 print:bg-white print:border-zinc-300 print:p-2">
                <strong className="text-white block font-mono text-xs uppercase tracking-wide border-b border-zinc-800/60 pb-1 text-emerald-300 print:text-black">
                  Memory Forensics &amp; Process Triage
                </strong>
                <p className="text-zinc-300 leading-relaxed print:text-zinc-800">
                  Volatile RAM Analysis, Virtual Address Descriptor (VAD) Tree Carving, DKOM Process Unlinking Detection, Kernel System Time Verification (KUSER_SHARED_DATA), In-Memory PEB Command-Line Recovery, Malicious DLL &amp; Shellcode Extraction.
                </p>
                <div className="font-mono text-[11px] text-zinc-400 print:text-zinc-600">
                  Tools: Volatility 2 &amp; 3, MemProcFS, WinDbg, Sysinternals (Procmon, Process Explorer).
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800/80 space-y-2 print:bg-white print:border-zinc-300 print:p-2">
                <strong className="text-white block font-mono text-xs uppercase tracking-wide border-b border-zinc-800/60 pb-1 text-emerald-300 print:text-black">
                  Threat Hunting &amp; Detection Engineering
                </strong>
                <p className="text-zinc-300 leading-relaxed print:text-zinc-800">
                  Sysmon Telemetry Analysis (Event IDs 1, 3, 10, 11, 19-21), LSASS Dumping &amp; Mimikatz Detection, WMI Persistence Hunting, Event Log Forensics (Security, System, PowerShell 4104), Sigma Rule Authoring, YARA Rule Development.
                </p>
                <div className="font-mono text-[11px] text-zinc-400 print:text-zinc-600">
                  Tools: Hayabusa, Chainsaw, Splunk, Event Viewer, Timeline Explorer, YARA.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-zinc-800/80 space-y-2 print:bg-white print:border-zinc-300 print:p-2">
                <strong className="text-white block font-mono text-xs uppercase tracking-wide border-b border-zinc-800/60 pb-1 text-emerald-300 print:text-black">
                  Network Forensics &amp; Malware Triage
                </strong>
                <p className="text-zinc-300 leading-relaxed print:text-zinc-800">
                  PCAP Stream Dissection, C2 Beaconing Periodic Pattern Identification, Malicious HTTP/FTP Payload Extraction, Covert TCP Channels, Static PE Header Analysis, Cryptographic Routine Isolation (AES, RC4, XOR).
                </p>
                <div className="font-mono text-[11px] text-zinc-400 print:text-zinc-600">
                  Tools: Wireshark, TShark, NetworkMiner, Ghidra, x64dbg, PE-Bear, HxD.
                </div>
              </div>
            </div>
          </section>

          {/* Section 04: Practical Incident Response Experience & Enterprise Lab Simulations */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2 print:text-black print:border-zinc-300">
              <span>04.</span> Practical DFIR Experience &amp; Enterprise Lab Investigations
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              
              {/* Scenario 1 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Enterprise Incident Response Capstone // Multi-Stage APT Attack Reconstruction
                  </h3>
                  <span className="font-mono text-xs text-emerald-400 print:text-zinc-600">
                    Lead Forensic Investigator
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-zinc-300 leading-relaxed print:text-zinc-800 pl-1">
                  <li>
                    Reconstructed a multi-stage enterprise attack killchain by correlating forensic evidence across 5 operational layers: Network PCAP, RAM dump, NTFS disk image, Registry hives, and Windows Event Logs.
                  </li>
                  <li>
                    Mathematically proved in-memory credential theft (LSASS dumping) by tracking Sysmon Event ID 10 with target process <code className="font-mono bg-zinc-900 px-1 py-0.5 rounded text-zinc-200 print:bg-transparent print:text-black">lsass.exe</code> and GrantedAccess mask <code className="font-mono bg-zinc-900 px-1 py-0.5 rounded text-zinc-200 print:bg-transparent print:text-black">0x1010</code>.
                  </li>
                  <li>
                    Uncovered stealth kernel-level rootkit persistence by parsing offline SYSTEM registry hive services, pinpointing rogue boot-start drivers configured for privilege elevation.
                  </li>
                </ul>
              </div>

              {/* Scenario 2 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Endpoint Forensics &amp; Lateral Movement Threat Hunting
                  </h3>
                  <span className="font-mono text-xs text-emerald-400 print:text-zinc-600">
                    Hands-on Evidence Triage
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-zinc-300 leading-relaxed print:text-zinc-800 pl-1">
                  <li>
                    Mapped attacker lateral movement and user execution trails using PECmd (Prefetch), Shellbags, and LNK Jumplist analysis to establish a definitive timestamped timeline of exfiltration.
                  </li>
                  <li>
                    Detected deliberate anti-forensic timestomping by calculating sub-millisecond discrepancies between NTFS <code className="font-mono bg-zinc-900 px-1 py-0.5 rounded text-zinc-200 print:bg-transparent print:text-black">$STANDARD_INFORMATION</code> and <code className="font-mono bg-zinc-900 px-1 py-0.5 rounded text-zinc-200 print:bg-transparent print:text-black">$FILE_NAME</code> attributes.
                  </li>
                  <li>
                    Investigated fileless WMI malware persistence by auditing Sysmon Event IDs 19, 20, and 21, extracting obfuscated Base64 PowerShell commands embedded within CIM repository event consumers.
                  </li>
                </ul>
              </div>

              {/* Scenario 3 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Memory Forensics &amp; Network C2 Dissection
                  </h3>
                  <span className="font-mono text-xs text-emerald-400 print:text-zinc-600">
                    Traffic &amp; Volatile Memory Triage
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-zinc-300 leading-relaxed print:text-zinc-800 pl-1">
                  <li>
                    Carved injected DLLs and unmapped memory sections from raw memory dumps using Volatility 3 plugins (<code className="font-mono text-zinc-200 print:text-black">windows.pslist</code>, <code className="font-mono text-zinc-200 print:text-black">windows.vadinfo</code>, <code className="font-mono text-zinc-200 print:text-black">windows.malfind</code>).
                  </li>
                  <li>
                    Conducted network traffic packet analysis in Wireshark and tshark to isolate malware beacon intervals, reconstruct HTTP streams, and extract weaponized binary payloads.
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Section 05: Competitive CTF Achievements & Published Research */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2 print:text-black print:border-zinc-300">
              <span>05.</span> Competitive Achievements &amp; Published Research
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/60 space-y-1.5 print:bg-white print:border-zinc-300 print:p-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <h3 className="font-bold text-white print:text-black">
                    IEEE / NTRA Capture The Flag Competition — Finalist
                  </h3>
                  <span className="font-mono text-[11px] text-emerald-400 print:text-zinc-700">
                    Official Qualification
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Qualified to the national finals in the official Capture The Flag competition organized by IEEE Mansoura Student Branch in partnership with Egypt&apos;s National Telecom Regulatory Authority (NTRA).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/60 space-y-1.5 print:bg-white print:border-zinc-300 print:p-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <h3 className="font-bold text-white print:text-black">
                    Arab Security Cyber Wargames (ASCWG 2026) Qualifications
                  </h3>
                  <span className="font-mono text-[11px] text-emerald-400 print:text-zinc-700">
                    DFIR &amp; OSINT Track
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Executed triage on compromised macOS endpoints, reverse-engineered trojanized binaries in Ghidra to extract hardcoded AES-256 keys, carved ESE Windows.db search databases, and mapped Bitcoin CoinJoin mixer transactions via peel-chain clustering.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/60 space-y-1.5 print:bg-white print:border-zinc-300 print:p-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <h3 className="font-bold text-white print:text-black">
                    ByteMe CTF 2026 — Masterclass Memory &amp; Network DFIR Track
                  </h3>
                  <span className="font-mono text-[11px] text-emerald-400 print:text-zinc-700">
                    100% Track Completion
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Solved full memory triage track: recovered kernel boot timestamps via KUSER_SHARED_DATA, carved hidden canvas pixel buffers from unmapped VAD memory, and audited FTP network traffic to identify insider exfiltration.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/60 space-y-1.5 print:bg-white print:border-zinc-300 print:p-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                  <h3 className="font-bold text-white print:text-black">
                    Technical Cybersecurity Portfolio &amp; Published Writeups
                  </h3>
                  <span className="font-mono text-[11px] text-emerald-400 print:text-zinc-700">
                    25+ Published Articles
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Author of dual-path forensic walkthroughs (manual analysis + standalone automated Python solver scripts) covering steganography, ransomware deconstruction (Phobos), disk forensics, and network protocol carving. Accessible at <a href="https://www.abdoskills.me" className="text-emerald-400 hover:underline print:text-black">abdoskills.me</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 06: Education & Academic Credentials */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800/80 pb-2 flex items-center gap-2 print:text-black print:border-zinc-300">
              <span>06.</span> Education &amp; Academic Credentials
            </h2>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-white print:text-black">
                  Higher Technological Institute (HTI)
                </h3>
                <p className="text-zinc-400 print:text-zinc-700">
                  Bachelor of Science in Computer Science — In Progress
                </p>
              </div>
              <span className="font-mono text-xs text-zinc-500 mt-1 sm:mt-0 print:text-zinc-600">
                Cairo, Egypt
              </span>
            </div>

            <p className="text-xs text-zinc-400 print:text-zinc-600">
              Key Academic Foundations: Computer Architecture, Operating System Internals, Data Structures &amp; Algorithms, File Processing, TCP/IP Networking, C/C++ Programming.
            </p>
          </section>

        </div>

      </main>

      {/* Interactive Certificate View Modal (Hidden in Print) */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 print:hidden animate-fade-in"
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
