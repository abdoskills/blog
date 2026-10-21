import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ArchivedLabsPage() {
  const archivedChallenges = [
    {
      title: "Ping Pong Show",
      slug: "kaspersky-ping-pong-show",
      platform: "Kaspersky CTF",
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
      platform: "Kaspersky CTF",
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
      platform: "Kaspersky CTF",
      category: "Network Forensics",
      points: "500 PTS",
      tagline: "TLS GREASE Covert Channel & DLL Sideloading",
      description: "Forensic analysis of a Windows Server 2016 VMDK and PCAP. Spotting GAC DLL sideloading, decoding a covert channel inside TLS GREASE 0x0a0a extensions, and ChaCha20 decryption.",
      image: "/images/kaspersky_time_to_install_arch.jpg",
      tags: ["Wireshark", "DLL Sideloading", "TLS GREASE", "ChaCha20", "tshark"],
      time: "9 min read"
    },
    {
      title: "Phobos Ransomware Analysis",
      slug: "phobos-ransomware-analysis",
      platform: "Threat Labs",
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
      <Navbar />

      <main className="flex-grow pt-6 pb-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-3 sm:px-4 py-1.5 rounded-full">
            <Link href="/labs" className="text-zinc-400 hover:text-white transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-wider">
              ← THREAT LABS
            </Link>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="font-mono text-[10px] sm:text-xs text-amber-400 uppercase tracking-wider sm:tracking-[0.25em]">
              ARCHIVED LABS
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal sm:tracking-widest font-[family-name:var(--font-silkscreen)] mb-4">
            Archived Investigations
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Preserved operational breakdowns covering Windows 10 memory forensics, Apple CoreStorage recovery, TLS covert channels, and Phobos ransomware analysis.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-amber-400 font-bold">●</span> {archivedChallenges.length} Preserved Operations
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-lg text-zinc-300 flex items-center gap-2">
              <span className="text-amber-400 font-bold">●</span> Full Technical Writeups
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                ARCHIVED
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                Preserved Writeups ({archivedChallenges.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">Legacy Archive</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {archivedChallenges.map((c) => (
              <Link 
                key={c.slug}
                href={`/posts/${c.slug}`}
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl min-w-0"
              >
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
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {c.points}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:theme-text transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide break-words">
                    {c.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3 break-words">
                    {c.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                    {c.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                    <span>{c.time}</span>
                    <span className="theme-cta font-bold flex items-center gap-1 transition-colors">
                      Read Writeup <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
