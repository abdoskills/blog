import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Forensics Git 0: Linux Disk Partitioning & Inode Git Carving | PicoCTF 2026",
  description: "Forensic analysis of a 1 GB raw disk image using The Sleuth Kit (TSK). Mapping partition tables with mmls, calculating sector offsets, traversing directory trees with fls, and carving git commit artifacts.",
};

export default function PicoCTFForensicsGit0Writeup() {
  const mmlsCmd = `mmls.exe .\\disk.img`;
  const flsRootCmd = `fls.exe -o 1140736 .\\disk.img`;
  const flsHomeCmd = `fls.exe -o 1140736 -r .\\disk.img 64770`;
  const icatNoteCmd = `icat.exe -o 1140736 .\\disk.img 65692`;
  const icatCommitCmd = `icat.exe -o 1140736 .\\disk.img 65693`;
  const icatLogCmd = `icat.exe -o 1140736 .\\disk.img 65704`;
  const flagText = `picoCTF{g17_1n_7h3_d15k_041217d8}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Navigation */}
      <nav className="w-full p-4 sm:p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 sm:mb-6 inline-flex max-w-full bg-[#111111]/80 backdrop-blur-md border border-cyan-500/40 px-3 sm:px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-[10px] sm:text-xs text-cyan-400 uppercase tracking-wider sm:tracking-[0.3em] break-words">
              PICOCTF 2026 • FORENSICS • DISK PARTITIONING &amp; GIT CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight break-words">
            Forensics Git 0: Linux Disk Partitioning &amp; Inode Git Carving
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-cyan-400">PicoCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">TARGET IMAGE</span>
              <span className="text-white font-bold truncate block">disk.img (1 GB)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">SECTOR OFFSET</span>
              <span className="text-cyan-400 font-bold truncate block">1140736 (Root ext4)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">TARGET INODE</span>
              <span className="text-amber-400 font-bold truncate block">65693 (COMMIT_EDITMSG)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FLAG</span>
              <span className="text-emerald-400 font-bold truncate block">picoCTF&#123;g17_1n...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_git_0.jpg"
            alt="Linux Disk Partitioning and Git Inode Carving"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Digital Forensics Workbench &amp; Disk Sector Mapping</span>
            <span className="text-cyan-400 font-bold">The Sleuth Kit • mmls • fls • icat</span>
          </div>
        </div>

        {/* Challenge Summary */}
        <div className="bg-[#0b1418]/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Forensic Scenario
              </span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
              We are given a raw 1 GB hard drive image (<code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono text-xs">disk.img</code>). Unlike raw single partitions, attempting to run filesystem tools directly fails with <code className="text-amber-300 font-mono text-xs">Cannot determine file system type</code> because Sector 0 holds an MBR partition table. Using <strong>The Sleuth Kit</strong>, we map out the partition sectors using <code className="text-cyan-300 font-mono text-xs">mmls</code>, jump directly to the Linux root filesystem via sector offset <code className="text-cyan-300 font-mono text-xs">1140736</code>, locate an embedded Git repository in the user space, and carve out the flag from the Git commit metadata.
            </p>
          </div>
        </div>

        {/* Section 1: Partition Mapping */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">01.</span> Mapping Partitions with <code className="text-cyan-400">mmls</code>
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            To determine where the Linux filesystem starts on the 1 GB physical disk image, we inspect the partition table using <code className="text-cyan-300 font-mono">mmls</code>:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • LIST PARTITIONS</span>
              <CopyButton text={mmlsCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{mmlsCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// MBR Partition Layout:</div>
            <div>DOS Partition Table (Units in 512-byte sectors)</div>
            <div>Slot 002 (Start 0000002048, Length 0000614400): Linux (Boot)</div>
            <div>Slot 003 (Start 0000616448, Length 0000524288): Linux Swap</div>
            <div className="text-amber-400 font-bold">Slot 004 (Start 0001140736, Length 0000956416): Linux (Root ext4)</div>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            The primary root filesystem starts at <strong>Sector 1140736</strong> ($1,140,736 \times 512 = 584,056,832$ bytes). We supply this value with the <code className="text-cyan-300 font-mono">-o 1140736</code> switch in all subsequent commands.
          </p>
        </section>

        {/* Section 2: Traversing User Space */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">02.</span> Traversing User Space with <code className="text-cyan-400">fls</code>
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            First, we verify the root directories to find the Inode of <code className="text-cyan-300 font-mono">/home</code>:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • VIEW ROOT INODES</span>
              <CopyButton text={flsRootCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{flsRootCmd}</code>
            </pre>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            <code className="text-cyan-300 font-mono">/home</code> maps to <strong>Inode 64770</strong>. We recursively query inside Inode 64770:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • RECURSIVE HOME TRAVERSAL</span>
              <CopyButton text={flsHomeCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{flsHomeCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Discovered Git Repository Structure:</div>
            <div>/home/ctf-player/Code/secrets/</div>
            <div>├── .git/</div>
            <div className="text-cyan-300">│   ├── COMMIT_EDITMSG (Inode 65693)</div>
            <div className="text-cyan-300">│   └── logs/HEAD (Inode 65704)</div>
            <div className="text-amber-400">└── note.txt (Inode 65692)</div>
          </div>
        </section>

        {/* Section 3: Carving with icat */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">03.</span> Inode Carving with <code className="text-cyan-400">icat</code>
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            Using Sleuth Kit's <code className="text-cyan-300 font-mono">icat</code>, we carve raw file data directly by Inode without mounting:
          </p>

          {/* Target A: note.txt */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 block font-bold">1. Reading note.txt (Inode 65692):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{icatNoteCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300">
              <span className="text-zinc-500">// Output: </span>
              <span>The picoCTF flag format is &apos;picoCTF&#123;&#125;&apos; where there is some leetspeak phrase in between the curly braces</span>
            </div>
          </div>

          {/* Target B: COMMIT_EDITMSG */}
          <div className="space-y-2 pt-4">
            <span className="text-xs font-mono text-zinc-400 block font-bold">2. Reading COMMIT_EDITMSG (Inode 65693):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{icatCommitCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300">
              <span className="text-zinc-500">// Output: </span>
              <span className="text-emerald-400 font-bold">Wrap this phrase in the flag format: g17_1n_7h3_d15k_041217d8</span>
            </div>
          </div>

          {/* Target C: logs/HEAD */}
          <div className="space-y-2 pt-4">
            <span className="text-xs font-mono text-zinc-400 block font-bold">3. Verifying with Git Reflog (Inode 65704):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{icatLogCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              <span className="text-zinc-500">// Reflog Record: </span>
              <div>... commit (initial): Wrap this phrase in the flag format: g17_1n_7h3_d15k_041217d8</div>
            </div>
          </div>

          {/* Flag Box */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-[#0a1813] to-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="min-w-0 max-w-full">
                <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                  OFFICIAL CAPTURED FLAG
                </span>
                <span className="text-base sm:text-xl md:text-2xl font-mono font-bold text-white tracking-wide break-all block">
                  {flagText}
                </span>
              </div>
              <CopyButton text={flagText} />
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
