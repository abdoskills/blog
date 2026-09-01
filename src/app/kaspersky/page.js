import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function KasperskyHub() {
  const challenges = [
    {
      title: "Ping Pong Show",
      slug: "kaspersky-ping-pong-show",
      category: "Memory Forensics",
      points: "500 PTS",
      tagline: "PoolParty & Havoc Demon Reversing",
      description: "Investigating a 4.5 GB Windows 10 RAM dump. Carving Outlook phishing attachments, reversing PoolParty ThreadPool injection into Acrobat, and decrypting Havoc Demon C2 traffic.",
      image: "/images/kaspersky_ping_pong_show.jpg",
      tags: ["Volatility 3", "PoolParty", "Havoc Demon", "AES-CTR", "Outlook MPFS"],
      time: "10 min read"
    },
    {
      title: "Ryan Guzling",
      slug: "kaspersky-ryan-guzling",
      category: "macOS DFIR",
      points: "500 PTS",
      tagline: "CoreStorage Fusion Drive & FileVault",
      description: "Reassembling an Apple CoreStorage Fusion Drive split across SSD and HDD images. Carving an HFS+ trash volume to recover the FileVault recovery key and unlock the volume.",
      image: "/images/kaspersky_ryan_guzling.jpg",
      tags: ["CoreStorage", "FileVault", "HFS+", "SleuthKit", "hdiutil"],
      time: "8 min read"
    },
    {
      title: "Time to Install Arch",
      slug: "kaspersky-time-to-install-arch",
      category: "Network Forensics",
      points: "500 PTS",
      tagline: "TLS GREASE Covert Channel & DLL Sideloading",
      description: "Forensic analysis of a Windows Server 2016 VMDK and PCAP. Spotting GAC DLL sideloading, decoding a covert channel inside TLS GREASE 0x0a0a extensions, and ChaCha20 decryption.",
      image: "/images/kaspersky_time_to_install_arch.jpg",
      tags: ["Wireshark", "DLL Sideloading", "TLS GREASE", "ChaCha20", "tshark"],
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
              KASPERSKY CTF 2026 • FORENSICS TRACK
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            Kaspersky CTF
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Detailed walkthroughs for all 3 official forensics challenges from Kaspersky CTF 2026. Covering memory dumps, PoolParty process injection, Apple CoreStorage volume carving, and TLS covert channel cryptanalysis.
          </p>
        </div>

        {/* Category Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Forensics Track
            </span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Solved Challenges (3/3)
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">3 Writeups</span>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full">
          {challenges.map((c) => {
            return (
              <Link 
                key={c.slug}
                href={`/posts/${c.slug}`} 
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
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
                    <span className="bg-black/80 backdrop-blur-md border theme-badge font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
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

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:theme-text transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
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
                    <span className="theme-cta font-bold flex items-center gap-1 transition-colors">
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
