import Image from "next/image";
import Link from "next/link";

export default function PicoCTFHub() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 text-gray-200 selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Top Header Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-50 relative">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back Home
        </Link>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            PicoCTF Archive
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-6 mb-14 text-center">
          <div className="mb-4 inline-block bg-[#111111]/80 backdrop-blur-md border border-purple-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-[0.3em]">
              PICOCTF • DIGITAL FORENSICS REPOSITORY
              <span className="animate-blink inline-block w-1.5 h-3 bg-purple-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
            PicoCTF Hub
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Curated archive of <strong>Digital Forensics</strong>, <strong>Steganography</strong>, <strong>Binary Reconstruction</strong>, and <strong>Network Analysis</strong> writeups from PicoCTF.
          </p>
        </div>

        {/* Category Header: Forensics 2019 */}
        <div className="max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Forensics 2019
            </span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Core Forensic Investigations
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">5 Solved Missions</span>
        </div>

        {/* 4 Premium Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 w-full">
          
          {/* ========================================================================= */}
          {/* Card 1: c0rrupt (File Format Repair) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/picoctf-c0rrupt" 
            className="group relative bg-gradient-to-b from-[#181324]/90 via-[#100d1a]/90 to-[#0a0711]/90 rounded-3xl flex flex-col border border-purple-500/20 hover:border-purple-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(168,85,247,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#100d1a] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/pico_c0rrupt.jpg" 
                alt="c0rrupt - PNG Header & Chunk Repair" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-purple-500/40 text-purple-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  File Repair
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  250 PTS
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-purple-400/80 uppercase tracking-widest">
                  PNG Specification & Hex Patching
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                c0rrupt
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Deep byte-by-byte manual binary surgery. Reconstructing corrupted PNG magic headers, fixing corrupted <code>IHDR</code>/<code>pHYs</code> metadata chunks, and calculating <code>IDAT</code> stream lengths.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">HexEd.it / HxD</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">pngcheck</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">PNG Spec</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Python Bytearray</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 8 min read</span>
                <span className="text-purple-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 2: What Lies Within (Image Steganography) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/picoctf-what-lies-within" 
            className="group relative bg-gradient-to-b from-[#131d24]/90 via-[#0d141a]/90 to-[#080d11]/90 rounded-3xl flex flex-col border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(6,182,212,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d141a] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/pico_what_lies_within.jpg" 
                alt="What Lies Within - LSB Steganography" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Steganography
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  150 PTS
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-cyan-400/80 uppercase tracking-widest">
                  LSB Bit-Plane Extraction
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                What Lies Within
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Forensic investigation of least-significant bit (LSB) image steganography in RGB color channels. Extracting hidden ASCII strings using Aperi'Solve, zsteg, and custom Python PIL bit decoders.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Aperi'Solve</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">zsteg</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">LSB Bit-Planes</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Python PIL</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 5 min read</span>
                <span className="text-cyan-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 3: like1000 (Archive Unpacking Automation) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/picoctf-like1000" 
            className="group relative bg-gradient-to-b from-[#1b1913]/90 via-[#13120e]/90 to-[#0c0b09]/90 rounded-3xl flex flex-col border border-amber-500/20 hover:border-amber-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(245,158,11,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#13120e] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/pico_like1000.jpg" 
                alt="like1000 - Recursive TAR Extraction" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Automation
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  250 PTS
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-amber-400/80 uppercase tracking-widest">
                  Russian Doll Nested Archives
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                like1000
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Solving a 1,000-layer recursive TAR archive challenge in seconds. Writing automated Python extraction scripts using <code>tarfile</code> with in-flight garbage collection to extract the hidden flag.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Python tarfile</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">TAR Archives</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Automation</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Garbage Collection</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 4 min read</span>
                <span className="text-amber-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 4: Shark on Wire 2 (Network Steganography) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/picoctf-shark-on-wire-2" 
            className="group relative bg-gradient-to-b from-[#101b22]/90 via-[#0b1318]/90 to-[#070c10]/90 rounded-3xl flex flex-col border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(16,185,129,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1318] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/pico_shark_on_wire_2.jpg" 
                alt="Shark on Wire 2 - Network Steganography" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Network DFIR
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  300 PTS
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-emerald-400/80 uppercase tracking-widest">
                  UDP Port Header Steganography
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                Shark on Wire 2
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Bypassing decoy troll flags in Wireshark streams. Isolating anomalous UDP packets on SSH Port 22 and writing raw binary PCAP parsing scripts to decode source port steganography.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Wireshark</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">UDP Stego</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Decoy Bypassing</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">PCAP Struct</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 7 min read</span>
                <span className="text-emerald-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                  Explore Mission <span className="transform transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </Link>


          {/* ========================================================================= */}
          {/* Card 5: Investigative Reversing 1 (Multi-PNG Overlay Carving) */}
          {/* ========================================================================= */}
          <Link 
            href="/posts/picoctf-investigative-reversing-1" 
            className="group relative bg-gradient-to-b from-[#101b18]/90 via-[#0b1411]/90 to-[#070c0a]/90 rounded-3xl flex flex-col border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(16,185,129,0.2)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl md:col-span-2"
          >
            <div className="relative w-full h-56 md:h-64 overflow-hidden bg-black/80">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1411] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
              <Image 
                src="/images/pico_investigative_reversing_1.jpg" 
                alt="Investigative Reversing 1 - Multi-PNG Overlay Carving" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                priority
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Reverse Engineering
                </span>
                <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  350 PTS
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-7 flex flex-col flex-grow relative z-20">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs text-emerald-400/80 uppercase tracking-widest">
                  Binary Tracing &amp; Multi-Image Jigsaw Carving
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">SOLVED</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                Investigative Reversing 1
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Decompiling ELF binaries in Ghidra to reconstruct a 26-character flag split across the trailing overlays of three PNG files past the <code>IEND</code> marker with arithmetic encoding.
              </p>

              {/* Tags */}
              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2 mb-4">
                <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Ghidra</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">HxD / HexEd.it</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">PNG IEND Overlays</span>
                <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono px-2.5 py-0.5 rounded-md">Python Oneliner</span>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-1">
                <span>⏱ 9 min read</span>
                <span className="text-emerald-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
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
