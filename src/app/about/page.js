import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  const skills = [
    {
      category: "Digital Forensics & Incident Response",
      tools: ["Memory Analysis (Volatility 3)", "Disk Forensics (KAPE, Autopsy, FTK)", "Windows Artifacts ($MFT, ESE, PCA, Prefetch)", "Network PCAP Triage (Wireshark, tshark)"]
    },
    {
      category: "Reverse Engineering & Malware Analysis",
      tools: ["Static Analysis (Ghidra, IDA Pro)", "Dynamic Debugging (x64dbg, GDB)", "Malware Deobfuscation & Unpacking", "File Header & Format Repair (HxD, pngcheck)"]
    },
    {
      category: "Steganography & Cryptography",
      tools: ["LSB Bit-Plane Steganography", "Audio Demodulation (SSTV Scottie 1)", "Unicode Whitespace Decoding", "Custom Cipher Decryption (AES, RC4, XOR)"]
    },
    {
      category: "Scripting & Tooling",
      tools: ["Python 3 (scapy, PIL, tarfile, struct)", "PowerShell & Bash Automation", "YARA Rule Engineering", "Linux & Windows Endpoint Triage"]
    }
  ];

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-6 pb-24">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              ABOUT ME • PROFILE &amp; FOCUS
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4">
            Hi, I&apos;m Abdo.
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            I specialize in <strong>Digital Forensics &amp; Incident Response (DFIR)</strong>, <strong>Reverse Engineering</strong>, and <strong>Malware Analysis</strong>. I enjoy breaking down complex challenges and building automated tools to solve them.
          </p>
        </header>

        {/* Bio Card */}
        <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-xl mb-12 shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2.5">
            <span className="text-emerald-400">⚡</span> What I Do
          </h2>
          
          <div className="space-y-4 text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            <p>
              I spend most of my time investigating forensic artifacts, analyzing malicious network traffic, decompiling binaries in Ghidra, and solving CTF challenges.
            </p>
            <p>
              When I solve a challenge, my goal is to explain <strong>both the manual step-by-step method</strong> (understanding the raw bytes and protocol mechanics) and <strong>the automated code</strong> (Python scripts and fast one-liners) so anyone can learn the fundamental concepts.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
            <Link 
              href="/cv" 
              className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-1.5"
            >
              <span>📄 View My CV</span>
            </Link>
            <Link 
              href="/picoctf" 
              className="px-4 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all"
            >
              <span>🧩 PicoCTF Walkthroughs (13)</span>
            </Link>
            <Link 
              href="/ascwg" 
              className="px-4 py-2 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-emerald-500/50 hover:text-white rounded-xl transition-all"
            >
              <span>⚔️ ASCWG CTF (4)</span>
            </Link>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Technical Arsenal
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Core Skills &amp; Toolkit
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
        </div>

        {/* Connect & Links */}
        <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 text-center space-y-4 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            Let&apos;s Connect
          </h3>
          <p className="text-zinc-400 text-sm font-sans max-w-md mx-auto">
            Feel free to check out my open-source projects, CTF solvers, or get in touch for security research.
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
              Download CV ⬇
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
