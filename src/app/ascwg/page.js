import Image from "next/image";
import Link from "next/link";

export default function ASCWGHub() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 text-gray-200 selection:bg-pink-500/30 selection:text-pink-200">
      
      {/* Top Header Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-50 relative">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back Home
        </Link>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-pink-500/10 text-pink-400 border border-pink-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></span>
            4 Active Forensic Missions
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-6 mb-14 text-center">
          <div className="mb-4 inline-block bg-[#111111]/80 backdrop-blur-md border border-pink-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-pink-400 uppercase tracking-[0.3em]">
              ASCWG QUALIFICATIONS 2026
              <span className="animate-blink inline-block w-1.5 h-3 bg-pink-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_rgba(236,72,153,0.4)]">
            ASCWG CTF
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Arab Security Cyber Wargames Qualifications. High-fidelity operational writeups exclusively covering <strong>Digital Forensics</strong> and <strong>OSINT</strong>.
          </p>
        </div>

        {/* 4 Premium Forensics & OSINT Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 w-full">
          
          {/* ========================================================================= */}
          {/* Card 1: The Thrushes (macOS Forensics) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/the-thrushes" 
            className="group relative bg-gradient-to-b from-[#161b22]/90 via-[#0f1318]/90 to-[#0a0d11]/90 rounded-3xl flex flex-col border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(6,182,212,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            {/* Image Header with Badge Overlay */}
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1318] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/thrushes_macho.jpg" 
                alt="The Thrushes - macOS Signal Mach-O Triage" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  macOS DFIR
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  MEDIUM
                </span>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-cyan-400/80 uppercase tracking-widest">
                  Signal App Reverse Engineering
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                The Thrushes
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Forensic triage of an infected macOS Ventura endpoint. Uncovering a trojanized Signal Desktop binary, decompiling malicious background threads in Ghidra, and extracting hardcoded AES-256 exfiltration keys.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Ghidra</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Mach-O 64-bit</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">macOS Triage</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">AES-CBC</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 7 min read</span>
                <span className="text-cyan-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 2: Do You Even Search Dude (Windows Forensics) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/search-dude" 
            className="group relative bg-gradient-to-b from-[#1c1813]/90 via-[#14120e]/90 to-[#0d0c0a]/90 rounded-3xl flex flex-col border border-amber-500/20 hover:border-amber-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/search_dude_disk.jpg" 
                alt="Do You Even Search Dude - Windows.db Disk Carving" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Windows Forensics
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  MEDIUM
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-amber-400/80 uppercase tracking-widest">
                  Windows Search Database Carving
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                Do You Even Search Dude
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Deep dive into Windows Search artifacts. Carving Extensible Storage Engine (ESE) <code>Windows.db</code> databases, parsing Program Compatibility Assistant (PCA) execution logs, and tracing malicious payload origins.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Windows.db</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">KAPE</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">ESE Database</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">PCA Artifacts</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 8 min read</span>
                <span className="text-amber-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 3: Sensor Confession (Network Forensics) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/sensor-confession" 
            className="group relative bg-gradient-to-b from-[#1f1214]/90 via-[#150d0e]/90 to-[#0d0809]/90 rounded-3xl flex flex-col border border-rose-500/20 hover:border-rose-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(244,63,94,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#150d0e] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/sensor_confession_fiber.jpg" 
                alt="Sensor Confession - PCAP Packet Extraction" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Network DFIR
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  MEDIUM
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-rose-400/80 uppercase tracking-widest">
                  Covert Channel Smuggling
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-rose-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                Sensor Confession
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Dissecting abnormal IoT sensor telemetry across enterprise PCAP captures. Extracting hidden ASCII payload bytes smuggled inside raw TCP Urgent Pointers and reconstructing the exfiltration stream.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Wireshark</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">tshark</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">TCP Urgent Pointer</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">PCAP Analysis</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 6 min read</span>
                <span className="text-rose-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 4: NightShade Vendor (Blockchain OSINT) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/nightshade-vendor" 
            className="group relative bg-gradient-to-b from-[#1a1224]/90 via-[#130d1c]/90 to-[#0b0711]/90 rounded-3xl flex flex-col border border-purple-500/20 hover:border-purple-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(168,85,247,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#130d1c] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/nightshade_bitcoin.jpg" 
                alt="NightShade Vendor - Bitcoin Blockchain OSINT" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-purple-500/40 text-purple-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Blockchain OSINT
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  HARD
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-purple-400/80 uppercase tracking-widest">
                  Dark Web Transaction Tracing
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                NightShade Vendor
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Advanced Bitcoin blockchain intelligence. Tracing dark web narcotics vendor addresses through Wasabi CoinJoin mixers, calculating peel-chain change outputs, and deanonymizing the mastermind wallet.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">TRACE-7</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Bitcoin UTXO</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Peel-Chains</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">CoinJoin Mixer</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 9 min read</span>
                <span className="text-purple-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
