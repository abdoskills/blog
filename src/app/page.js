import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const hubs = [
    {
      title: "PicoCTF Master Hub",
      slug: "picoctf",
      category: "13 MISSIONS",
      points: "PICOCTF",
      tagline: "File Repair • LSB • PCAP • SSTV",
      description: "Complete archive of 13 forensic writeups covering PNG byte surgery, multi-image reverse engineering, whitespace steganography, and Apollo 11 audio demodulation.",
      image: "/images/picoctf_hub.jpg",
      tags: ["PNG Spec", "Ghidra", "Wireshark", "SSTV", "LSB Stego"],
      time: "13 Missions",
      color: "purple"
    },
    {
      title: "ASCWG CTF Hub",
      slug: "ascwg",
      category: "4 MISSIONS",
      points: "QUALIFICATIONS",
      tagline: "macOS • Windows • ICS • Blockchain",
      description: "Elite qualification challenges from Arab Security Cyber Wargames. Covers macOS Signal trojan triage, Windows.db ESE carving, SCADA TCP smuggling, and CoinJoin tracing.",
      image: "/images/ascwg_hub.jpg",
      tags: ["macOS Mach-O", "Windows.db", "TRACE-7", "TCP URG"],
      time: "4 Missions",
      color: "pink"
    },
    {
      title: "DFIR & Threat Labs",
      slug: "labs",
      category: "MULTI-PLATFORM",
      points: "IR / DFIR",
      tagline: "CyberDefenders • HTB • Blue Team",
      description: "Multi-platform operational deep dives across CyberDefenders, HackTheBox Sherlocks, Enterprise Incident Response, Memory Forensics, and Malware Analysis.",
      image: "/images/cyber_defense_labs.jpg",
      tags: ["Incident Response", "Phobos Malware", "VelvetThrone", "CyberDefenders"],
      time: "Enterprise Labs",
      color: "emerald"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-gray-200 selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Navigation Bar */}
      <nav className="text-gray-200 p-4 transition-all duration-300 w-full z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center relative h-8">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <span className="text-4xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                Skills
              </span>
            </Link>
          </div>
          
          <div className="absolute right-0 flex items-center justify-center w-8 h-8 opacity-70">
            <svg aria-hidden="true" focusable="false" className="w-5 h-5 fill-current" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-20">
        
        {/* Search Bar section */}
        <div className="w-full max-w-3xl mx-auto px-4 mb-14 z-30 relative">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search forensic writeups, threat intel, CTFs, solvers..." 
                className="w-full p-4 pl-12 rounded-xl border border-gray-700 bg-zinc-900/60 focus:bg-zinc-900 focus:border-purple-400 focus:outline-none transition-all text-white placeholder-gray-500 backdrop-blur-md font-mono text-sm" 
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
              </div>
            </div>
            <button className="px-5 py-4 rounded-xl border transition-all flex items-center justify-center min-w-[60px] border-gray-700 bg-zinc-900/60 text-gray-400 hover:border-purple-500 hover:text-white backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4h20v4h-2v2h-2v2h-2v2h-2v6h-4v-6h-2v-2h-2v-2h-2v-2h-2z"></path></svg>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Primary Archives
            </span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Forensic &amp; Threat Intelligence Hubs
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">3 Core Repositories</span>
        </div>

        {/* The 3 Core Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full">
          {hubs.map((c) => {
            const colorClass = 
              c.color === "purple" ? "border-purple-500/20 hover:border-purple-400/60 hover:shadow-[0_15px_45px_rgba(168,85,247,0.2)] text-purple-400" :
              c.color === "pink" ? "border-pink-500/20 hover:border-pink-400/60 hover:shadow-[0_15px_45px_rgba(236,72,153,0.2)] text-pink-400" :
              "border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[0_15px_45px_rgba(16,185,129,0.2)] text-emerald-400";

            const badgeBorder = 
              c.color === "purple" ? "border-purple-500/40 text-purple-300" :
              c.color === "pink" ? "border-pink-500/40 text-pink-300" :
              "border-emerald-500/40 text-emerald-300";

            const glowText = 
              c.color === "purple" ? "group-hover:text-purple-300" :
              c.color === "pink" ? "group-hover:text-pink-300" :
              "group-hover:text-emerald-300";

            const footerText = 
              c.color === "purple" ? "text-purple-400" :
              c.color === "pink" ? "text-pink-400" :
              "text-emerald-400";

            return (
              <Link 
                key={c.slug}
                href={`/${c.slug}`} 
                className={`group relative bg-gradient-to-b from-[#111115]/90 via-[#0d0d12]/90 to-[#07070a]/90 rounded-2xl flex flex-col border ${colorClass} transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl`}
              >
                <div className="relative w-full h-44 overflow-hidden bg-black/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <Image 
                    src={c.image} 
                    alt={c.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                    priority
                  />
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <span className={`bg-black/70 backdrop-blur-md border ${badgeBorder} font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md`}>
                      {c.category}
                    </span>
                    <span className="bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded-full">
                      {c.points}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow relative z-20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                      {c.tagline}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 text-white ${glowText} transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide`}>
                    {c.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                    {c.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                    {c.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                    <span>⏱ {c.time}</span>
                    <span className={`${footerText} group-hover:text-white font-bold flex items-center gap-1 transition-colors`}>
                      Enter Repository <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}
