import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ASCWGHub() {
  const challenges = [
    {
      title: "The Thrushes",
      slug: "the-thrushes",
      category: "macOS DFIR",
      points: "MEDIUM",
      tagline: "Signal App Reverse Engineering",
      description: "Investigating an infected macOS machine. We decompile a trojanized Signal Desktop binary in Ghidra, uncover hidden threads, and pull out hardcoded AES-256 keys.",
      image: "/images/thrushes_macho.jpg",
      tags: ["Ghidra", "Mach-O 64-bit", "macOS Triage", "AES-CBC"],
      time: "7 min read"
    },
    {
      title: "Do You Even Search Dude",
      slug: "search-dude",
      category: "Windows Forensics",
      points: "MEDIUM",
      tagline: "Windows Search Database Carving",
      description: "Carving Windows Search (Windows.db) ESE databases and parsing Program Compatibility Assistant (PCA) logs to trace how malware was executed on the host.",
      image: "/images/search_dude_disk.jpg",
      tags: ["Windows.db", "KAPE", "ESE Database", "PCA Artifacts"],
      time: "8 min read"
    },
    {
      title: "Sensor Confession",
      slug: "sensor-confession",
      category: "Network Forensics",
      points: "MEDIUM",
      tagline: "Covert Channel Smuggling",
      description: "Finding data hidden inside raw PCAP traffic. We inspect unusual TCP packets, spot data smuggled inside TCP Urgent Pointers, and reconstruct the full stream.",
      image: "/images/sensor_confession_fiber.jpg",
      tags: ["Wireshark", "tshark", "TCP Urgent Pointer", "PCAP Analysis"],
      time: "6 min read"
    },
    {
      title: "NightShade Vendor",
      slug: "nightshade-vendor",
      category: "Blockchain OSINT",
      points: "MEDIUM",
      tagline: "CoinJoin Mixer De-Anonymization",
      description: "Tracking illicit Bitcoin transactions through a Wasabi CoinJoin mixer. Using the TRACE-7 Peel-Chain method and multi-input clustering to unmask the real destination.",
      image: "/images/nightshade_bitcoin.jpg",
      tags: ["TRACE-7", "CoinJoin Mixing", "Esplora API", "UTXO Graph"],
      time: "9 min read"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-6 mb-14 text-center">
          <div className="mb-4 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              ARAB SECURITY CYBER WARGAMES 2026
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            ASCWG CTF
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Detailed walkthroughs for the ASCWG 2026 Qualifications, covering macOS endpoint triage, Windows artifact carving, covert packet analysis, and Bitcoin transaction tracking.
          </p>
        </div>

        {/* Category Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Qualifications Track
            </span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Solved Challenges
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">4 Guides</span>
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
                      {c.category}
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
                      Read Guide <span className="transform transition-transform group-hover:translate-x-1">→</span>
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
