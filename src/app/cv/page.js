"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CVPage() {
  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-6 pb-24">
        
        {/* CV Top Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl">
          <div>
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
              Curriculum Vitae
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
              Abdo — DFIR &amp; Security Researcher
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans mt-1">
              Specialized in Digital Forensics, Incident Response, and Reverse Engineering.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs shrink-0">
            <a 
              href="https://github.com/abdoskills" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all"
            >
              GitHub ↗
            </a>
            <button 
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <span>🖨️ Print / PDF</span>
            </button>
          </div>
        </div>

        {/* CV Container */}
        <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-10 space-y-10 backdrop-blur-xl shadow-2xl font-sans">
          
          {/* Section 1: Summary */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
              <span>01.</span> Executive Summary
            </h2>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              Cybersecurity researcher and Digital Forensics &amp; Incident Response (DFIR) practitioner with expertise in artifact carving, memory forensics, network packet disassembly, binary reverse engineering, and threat intelligence. Passionate about deconstructing malware behavior and authoring reproducible, dual-path forensic writeups.
            </p>
          </section>

          {/* Section 2: Technical Skills Matrix */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
              <span>02.</span> Technical Skills &amp; Competencies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 space-y-1.5">
                <strong className="text-white block font-mono text-emerald-300">Digital Forensics &amp; IR</strong>
                <p className="text-zinc-400">Volatility 3, KAPE, Autopsy, FTK Imager, ESE Database Carving (Windows.db), Event Log Triage (EVTX), Registry Analysis, macOS Mach-O Triage.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 space-y-1.5">
                <strong className="text-white block font-mono text-emerald-300">Reverse Engineering &amp; Malware</strong>
                <p className="text-zinc-400">Ghidra, x64dbg, IDA Pro, GDB, PE-Bear, HxD, File Signature Surgery, YARA Rule Writing, Crypto Routine Deobfuscation (AES, RC4, XOR).</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 space-y-1.5">
                <strong className="text-white block font-mono text-emerald-300">Network &amp; Steganography</strong>
                <p className="text-zinc-400">Wireshark, tshark, Scapy, PCAP Stream Reassembly, TCP Covert Channels, LSB Bit-Plane Decoding, SSTV Demodulation (Scottie 1).</p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 space-y-1.5">
                <strong className="text-white block font-mono text-emerald-300">Programming &amp; Scripting</strong>
                <p className="text-zinc-400">Python 3 (automation, PIL, struct, tarfile), PowerShell, Bash, C/C++ (decompilation reading), JavaScript / Next.js.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Selected Projects & Practical Research */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
              <span>03.</span> Projects &amp; Published Research
            </h2>

            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="text-base font-bold text-white">
                    PicoCTF 2019 Complete Forensics Masterclass
                  </h3>
                  <span className="font-mono text-xs text-emerald-400">13 Solved Writeups</span>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  Authored comprehensive dual-path walkthroughs (manual hex/Wireshark + automated Python scripts) covering PNG header surgery, BMP interleaved LSB steganography, 1,000-layer recursive TAR extraction, and Apollo 11 SSTV audio decoding.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="text-base font-bold text-white">
                    Arab Security Cyber Wargames (ASCWG 2026) Qualifications
                  </h3>
                  <span className="font-mono text-xs text-emerald-400">DFIR &amp; OSINT Track</span>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  Conducted forensic triage on infected macOS endpoints, decompiled trojanized Signal binaries in Ghidra to extract AES-256 keys, carved Windows.db ESE search databases, and traced Wasabi CoinJoin mixer transactions via TRACE-7 Peel-Chain clustering.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h3 className="text-base font-bold text-white">
                    Phobos Ransomware Static &amp; Dynamic Analysis
                  </h3>
                  <span className="font-mono text-xs text-emerald-400">Malware DFIR Lab</span>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  Decompiled cryptographic routines, analyzed registry persistence keys, unpacked payloads using x64dbg/Ghidra, and generated IOCs and YARA signatures for threat hunting detection.
                </p>
              </div>

            </div>
          </section>

          {/* Section 4: Focus Areas */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-emerald-400 font-mono uppercase tracking-wider border-b border-zinc-800 pb-2 flex items-center gap-2">
              <span>04.</span> Focus &amp; Interests
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              Active participant in CTF competitions (PicoCTF, ASCWG, CyberDefenders), focused on building open-source DFIR tools, dissecting emerging malware strains, and sharing clear cybersecurity writeups for the community.
            </p>
          </section>

        </div>

      </main>
    </div>
  );
}
