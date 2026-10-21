import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CyberDefendersHub() {
  const challenges = [
    {
      title: "OpenWire Lab",
      slug: "openwire",
      href: "/labs/cyberdefenders/openwire",
      platform: "CyberDefenders",
      category: "Network Forensics / PCAP Analysis",
      points: "8 QUESTIONS",
      tagline: "Apache ActiveMQ RCE & OpenWire PCAP Triage",
      description: "Investigating an Apache ActiveMQ exploitation on port 61616. Tracking primary and staging C2 servers, analyzing OpenWire protocol headers, identifying dropped reverse shells, and tracing source code patches.",
      image: "/images/cyberdefenders/Pasted_image_20261021091036.png",
      tags: ["Wireshark", "Network Forensics", "Apache ActiveMQ", "CVE-2023-46604", "OpenWire", "PCAP Analysis"],
      downloadFile: "/files/cyberdefenders/153-OpenWire.zip",
      downloadFileName: "153-OpenWire.zip (2.04 MB)",
      time: "8 min read"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-grow pt-6 pb-20">
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-3 sm:px-4 py-1.5 rounded-full animate-glow-pulse">
            <Link href="/labs" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-wider">
              ← THREAT LABS
            </Link>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="font-mono text-[10px] sm:text-xs text-emerald-400 uppercase tracking-wider sm:tracking-[0.25em]">
              CYBERDEFENDERS
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal sm:tracking-widest font-[family-name:var(--font-silkscreen)] mb-4">
            CyberDefenders Labs
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Hands-on blue team investigations, enterprise PCAP stream triage, and threat hunting operational writeups.
          </p>

          {/* Metrics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> 1 Active Investigation
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> 8 Verified Answers
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">●</span> Direct Artifact Downloads
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                CHALLENGES
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                Published Labs ({challenges.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">CyberDefenders Track</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((c) => (
              <div 
                key={c.slug}
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl min-w-0"
              >
                {/* Banner Image */}
                {c.image && (
                  <Link href={c.href} className="relative w-full h-48 overflow-hidden bg-black/60 border-b border-zinc-800/80 block">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}

                <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-20 min-w-0">
                  <div className="flex justify-between items-center mb-2 min-w-0">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                      {c.tagline}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap">
                      {c.points}
                    </span>
                  </div>

                  <Link href={c.href}>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:theme-text transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide break-words">
                      {c.title}
                    </h3>
                  </Link>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3 break-words">
                    {c.description}
                  </p>

                  {/* Artifact Download Pill */}
                  <div className="mb-4">
                    <a
                      href={c.downloadFile}
                      download
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs font-mono transition-colors w-full justify-center"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download {c.downloadFileName}
                    </a>
                  </div>

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
                    <Link href={c.href} className="theme-cta font-bold flex items-center gap-1 transition-colors">
                      Read Investigation <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
