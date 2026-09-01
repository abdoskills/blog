import Image from "next/image";
import Link from "next/link";

export default function ThreatLabsHub() {
  const challenges = [
    {
      title: "Phobos Ransomware Analysis",
      slug: "phobos-ransomware-analysis",
      platform: "Malware DFIR Lab",
      category: "Reverse Engineering",
      points: "ADVANCED",
      tagline: "Unpacking, Decrypting & Threat Intel",
      description: "Static and dynamic analysis of Phobos ransomware. Decompiling its crypto routine in Ghidra, mapping out persistence keys, and writing custom YARA detection rules.",
      image: "/images/phobos_thumbnail.jpg",
      tags: ["Ghidra", "Ransomware DFIR", "x64dbg", "Threat Intel", "YARA"],
      time: "12 min read"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Header Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-6xl mx-auto z-50 relative">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back Home
        </Link>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Hands-on Labs
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-6 mb-14 text-center">
          <div className="mb-4 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              CYBERDEFENDERS • BLUE TEAM • FORENSIC LABS
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            DFIR &amp; Threat Labs
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Hands-on walkthroughs and case studies covering malware reverse engineering, memory dump analysis, threat hunting, and blue team forensics.
          </p>
        </div>

        {/* Category Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Lab Investigations
            </span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Deep Dives &amp; Analyses
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">Guides &amp; Labs</span>
        </div>

        {/* Challenge Cards Grid (Unified Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full">
          {challenges.map((c) => {
            return (
              <Link 
                key={c.slug}
                href={`/posts/${c.slug}`} 
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_15px_35px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
              >
                <div className="relative w-full h-44 overflow-hidden bg-black/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <Image 
                    src={c.image} 
                    alt={c.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                    priority
                  />
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      {c.platform}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded-full">
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

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                    {c.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                    {c.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                    {c.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                    <span>⏱ {c.time}</span>
                    <span className="text-emerald-400 group-hover:text-white font-bold flex items-center gap-1 transition-colors">
                      Read Investigation <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Incoming CyberDefenders / Blue Team Lab Card */}
          <div className="bg-[#0e0e13]/40 border border-dashed border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center items-center text-center backdrop-blur-md min-h-[300px]">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg mb-3">
              🛡️
            </div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold mb-1">
              CyberDefenders &amp; Blue Team Labs
            </span>
            <p className="text-zinc-500 text-xs font-sans max-w-xs">
              More memory analysis, Volatility 3 plugins, and network packet investigations are coming soon.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
