import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ThreatLabsHub() {
  const labCategories = [
    {
      title: "CYBER DEFENDERS",
      slug: "cyberdefenders",
      href: "/labs/cyberdefenders",
      platform: "CyberDefenders",
      category: "Threat Defense & SOC",
      points: "1 ACTIVE LAB",
      badgeColor: "emerald",
      tagline: "Network Forensics & Threat Hunting Scenarios",
      description: "Hands-on threat analysis and network forensics scenarios simulating real-world security incidents. From Apache ActiveMQ RCE (CVE-2023-46604) and PCAP stream triage to memory dumps and malware artifact analysis.",
      image: "/images/cyber_defense_labs.jpg",
      tags: ["CyberDefenders", "Network Forensics", "ActiveMQ RCE", "CVE-2023-46604", "Wireshark", "Threat Hunting"],
      time: "1 Lab Available"
    },
    {
      title: "ARCHIVED LABS",
      slug: "archive",
      href: "/labs/archive",
      platform: "Legacy Threat Archive",
      category: "Archived Investigations",
      points: "4 ARCHIVED LABS",
      badgeColor: "amber",
      tagline: "Legacy DFIR, Memory Forensics & Reverse Engineering",
      description: "Preserved historical technical writeups including Windows 10 RAM PoolParty triage, Apple CoreStorage Fusion Drive recovery, TLS GREASE covert channels, and Phobos ransomware reversing.",
      image: "/images/phobos_thumbnail.jpg",
      tags: ["Archive", "Phobos Ransomware", "Memory Forensics", "CoreStorage", "TLS GREASE", "Ghidra"],
      time: "4 Preserved Guides"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14 text-center">
          <div className="mb-4 inline-flex max-w-full bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-3 sm:px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-[10px] sm:text-xs text-emerald-400 uppercase tracking-wider sm:tracking-[0.3em] break-words">
              CYBERDEFENDERS • BLUE TEAM LABS • THREAT ARCHIVE
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-normal sm:tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 break-words">
            DFIR &amp; Threat Labs
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Hands-on deep dives covering enterprise network PCAP analysis, malware staging triage, vulnerability reverse engineering, and threat hunting.
          </p>
        </div>

        {/* Category Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Lab Tracks
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Investigation Tracks ({labCategories.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">Active &amp; Archived</span>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 sm:px-6 w-full">
          {labCategories.map((c) => {
            const isEmerald = c.badgeColor === "emerald";
            return (
              <Link 
                key={c.slug}
                href={c.href} 
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl min-w-0"
              >
                {/* Banner Image */}
                {c.image && (
                  <div className="relative w-full h-48 overflow-hidden bg-black/60 border-b border-zinc-800/80">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="p-5 flex flex-col flex-grow relative z-20 min-w-0">
                  <div className="flex justify-between items-center mb-2 min-w-0">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                      {c.tagline}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap ${
                      isEmerald 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    }`}>
                      {c.points}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:theme-text transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide break-words">
                    {c.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans line-clamp-3 break-words">
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
                    <span>{c.time}</span>
                    <span className="theme-cta font-bold flex items-center gap-1 transition-colors">
                      {isEmerald ? "Open Platform" : "Browse Archive"} <span className="transform transition-transform group-hover:translate-x-1">→</span>
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
