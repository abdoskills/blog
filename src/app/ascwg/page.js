import Image from "next/image";
import Link from "next/link";

export default function ASCWGHub() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 text-gray-200 selection:bg-pink-500/30 selection:text-pink-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-50 relative">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back Home
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-10 pb-12">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-pink-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-pink-400 uppercase tracking-[0.3em]">
              ASCWG QUALIFICATIONS 2026
              <span className="animate-blink inline-block w-1.5 h-3 bg-pink-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            ASCWG CTF
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            Arab Security Cyber Wargames Qualifications. Specialized operational breakdowns exclusively covering <strong>Digital Forensics</strong> and <strong>OSINT</strong> challenges.
          </p>
        </div>

        {/* 4 Forensics & OSINT Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6 w-full">
          
          {/* The Thrushes */}
          <Link href="/posts/the-thrushes" className="bg-[#111111]/60 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(236,72,153,0.2)] hover:border-pink-500/50 group overflow-hidden">
            <div className="relative w-full h-48 overflow-hidden bg-black/50 border-b border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/the_thrushes.jpg" 
                alt="The Thrushes Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase">
                  FORENSICS
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  The Thrushes
                </h2>
                <p className="text-gray-400 text-sm font-sans leading-relaxed">
                  macOS Endpoint Triage and Backdoored Signal Mach-O Application Reverse Engineering.
                </p>
              </div>
            </div>
          </Link>

          {/* Search Dude */}
          <Link href="/posts/search-dude" className="bg-[#111111]/60 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(236,72,153,0.2)] hover:border-pink-500/50 group overflow-hidden">
            <div className="relative w-full h-48 overflow-hidden bg-black/50 border-b border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/search_dude.jpg" 
                alt="Search Dude Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase">
                  FORENSICS
                </div>
                <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#fb923c]"></div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  Do You Even Search Dude
                </h2>
                <p className="text-gray-400 text-sm font-sans leading-relaxed">
                  Windows.db ESE Database Forensic Carving and KAPE Execution Anchor Analysis.
                </p>
              </div>
            </div>
          </Link>

          {/* Sensor Confession */}
          <Link href="/posts/sensor-confession" className="bg-[#111111]/60 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(236,72,153,0.2)] hover:border-pink-500/50 group overflow-hidden">
            <div className="relative w-full h-48 overflow-hidden bg-black/50 border-b border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/sensor_confession.jpg" 
                alt="Sensor Confession Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase">
                  NETWORK FORENSICS
                </div>
                <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]"></div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  Sensor Confession
                </h2>
                <p className="text-gray-400 text-sm font-sans leading-relaxed">
                  PCAP Traffic Analysis and Covert TCP Urgent Pointer Protocol Exfiltration.
                </p>
              </div>
            </div>
          </Link>

          {/* NightShade Vendor */}
          <Link href="/posts/nightshade-vendor" className="bg-[#111111]/60 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(236,72,153,0.2)] hover:border-pink-500/50 group overflow-hidden">
            <div className="relative w-full h-48 overflow-hidden bg-black/50 border-b border-zinc-800/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/nightshade_vendor.jpg" 
                alt="Nightshade Vendor Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase">
                  BLOCKCHAIN OSINT
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  NightShade Vendor
                </h2>
                <p className="text-gray-400 text-sm font-sans leading-relaxed">
                  Dark Web Intelligence, Bitcoin Peel-Chains, and CoinJoin De-Anonymization via TRACE-7.
                </p>
              </div>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
