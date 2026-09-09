import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Forensics Git 2: Recovering Deleted Directory Trees & Rescuing Git Artifacts | PicoCTF 2026",
  description: "Forensic analysis of a raw disk image using The Sleuth Kit (TSK). Tracing missing file sequences, traversing nested Git subtrees (Commit -> Root Tree -> Subdirectory Tree -> Blob), and inflating zlib-compressed chat logs.",
};

export default function PicoCTFForensicsGit2Writeup() {
  const mmlsCmd = `mmls.exe .\\disk.img`;
  const flsCmd = `fls.exe -o 1140736 -r .\\disk.img 64770`;
  const reflogCmd = `icat.exe -o 1140736 .\\disk.img 65707`;
  const commitCmd = `python -c "import subprocess, zlib; print(zlib.decompress(subprocess.check_output(['icat.exe', '-o', '1140736', '.\\disk.img', '65735'])))"`;
  const rootTreeCmd = `python -c "import subprocess, zlib; print(zlib.decompress(subprocess.check_output(['icat.exe', '-o', '1140736', '.\\disk.img', '65734'])))"`;
  const logsTreeCmd = `python -c "import subprocess, zlib; print(zlib.decompress(subprocess.check_output(['icat.exe', '-o', '1140736', '.\\disk.img', '65732'])))"`;
  const solveScript = `import subprocess
import zlib

inode = "65730"  # Inode for 3.txt compressed blob (hash 717864...)
cmd = ["icat.exe", "-o", "1140736", ".\\\\disk.img", inode]
raw_compressed = subprocess.check_output(cmd)
decompressed = zlib.decompress(raw_compressed)
print(decompressed.decode('utf-8', errors='ignore'))`;
  const flagText = `picoCTF{g17_r35cu3_16ac6bf3}`;

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
              PICOCTF 2026 • FORENSICS • NESTED SUBTREE &amp; BLOB RESCUE
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight break-words">
            Forensics Git 2: Recovering Deleted Directory Trees &amp; Git Artifacts
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>8 min read</span>
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
              <span className="text-zinc-500 block mb-1 text-[11px]">SUSPECT COMMIT</span>
              <span className="text-cyan-400 font-bold truncate block">e80b38... (Commit 4)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">RESCUED BLOB</span>
              <span className="text-amber-400 font-bold truncate block">Inode 65730 (3.txt)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FLAG</span>
              <span className="text-emerald-400 font-bold truncate block">picoCTF&#123;g17_r35cu3...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_git_2.jpg"
            alt="Git Nested Tree and Blob Rescue Forensics"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Minimalist Dark Glass UI &amp; Git Directed Acyclic Graph (DAG) Traversal</span>
            <span className="text-cyan-400 font-bold">Commit &rarr; Root Tree &rarr; Subtree &rarr; Blob</span>
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
              Investigating a raw 1 GB ext4 disk image (<code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono text-xs">disk.img</code>) containing a developer repository (<code className="text-cyan-300 font-mono text-xs">killer-chat-app</code>). In the repository&apos;s log archive, files <code className="text-cyan-300 font-mono text-xs">1.txt</code>, <code className="text-cyan-300 font-mono text-xs">2.txt</code>, and <code className="text-cyan-300 font-mono text-xs">4.txt</code> are present, but <strong className="text-amber-400">3.txt is missing</strong>. Through Git reflog analysis, we discover that Commit 4 (<code className="text-cyan-300 font-mono text-xs">&quot;Add secret hideout chat log&quot;</code>) added the file before Commit 5 deleted it. By walking Git&apos;s hierarchical nested tree objects (Commit &rarr; Root Tree &rarr; Subdirectory Tree &rarr; Blob), we carve the deleted blob from the ext4 filesystem and decompress the hidden secret.
            </p>
          </div>
        </div>

        {/* Section 1: Spotting the Missing Sequence Gap */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">01.</span> Spotting the Sequence Anomaly &amp; Reflog Triage
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            After locating the primary ext4 filesystem at Sector offset <code className="text-cyan-300 font-mono">1140736</code> via <code className="text-cyan-300 font-mono">mmls</code>, we inspect user space using <code className="text-cyan-300 font-mono">fls</code>:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • LIST DIRECTORY CONTENTS WITH FLS</span>
              <CopyButton text={flsCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{flsCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Filesystem listing inside killer-chat-app:</div>
            <div>+ d/d 65664:   killer-chat-app</div>
            <div>+++ d/d 65704:  logs</div>
            <div>++++ r/r 65711: 1.txt</div>
            <div>++++ r/r 65705: 2.txt</div>
            <div className="text-rose-400 font-bold">! MISSING: 3.txt is completely absent from the directory</div>
            <div>++++ r/r 65736: 4.txt</div>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            To determine what happened to <code className="text-amber-300 font-mono">3.txt</code>, we dump Git&apos;s reflog history from <code className="text-cyan-300 font-mono">logs/HEAD</code> (Inode 65707):
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • DUMP REFLOG</span>
              <CopyButton text={reflogCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
              <code>{reflogCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1.5 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Reflog Commit Log Sequence:</div>
            <div className="text-zinc-400">... commit: Add video game chat log</div>
            <div className="text-zinc-400">... commit: Add TV show chat log</div>
            <div className="text-emerald-400 font-bold">582763... e80b38b3322a5ba32ac07076ef5eeb4a59449875 commit: Add secret hideout chat log</div>
            <div className="text-rose-400 font-bold">e80b38... 2151ef0ccc15aed1ab88e1afdc7484aaeff211c4 commit: Remove secret hideout log</div>
            <div className="text-zinc-400">2151ef... 01533f718556a0e59f1467dae4fa462eed82c2a1 commit: Add random chat log</div>
          </div>
        </section>

        {/* Section 2: Navigating the Multi-Level Git Tree */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">02.</span> Multi-Tiered Git DAG Traversal (Commit &rarr; Root &rarr; Subtree &rarr; Blob)
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            Because <code className="text-cyan-300 font-mono">3.txt</code> was placed inside a subdirectory (<code className="text-cyan-300 font-mono">logs/</code>), Git maintains a <strong>hierarchical tree structure</strong>. Each directory level is its own separate tree object (mode <code className="text-cyan-300 font-mono">40000</code>).
          </p>

          {/* Sub-step 1 */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 block font-bold">1. Decompressing Commit 4 (Hash e80b38..., Inode 65735):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{commitCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              b&apos;commit 246 tree <span className="text-amber-400 font-bold">ead27e2bd5a0fc22868ffb629a768f82dfcda11c</span>
... Add secret hideout chat log&apos;
            </div>
          </div>

          {/* Sub-step 2 */}
          <div className="space-y-2 pt-4">
            <span className="text-xs font-mono text-zinc-400 block font-bold">2. Decompressing Root Tree (Hash ead27e..., Inode 65734):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{rootTreeCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              b&apos;tree 99 100755 client... <span className="text-purple-400 font-bold">40000 logs &quot;÷ÐÉ½...</span>100755 server...&apos;
              <div className="text-zinc-500 mt-1">// First byte &quot; (0x22) reveals Subtree Hash starting with 22f7d0c9... (Inode 65732)</div>
            </div>
          </div>

          {/* Sub-step 3 */}
          <div className="space-y-2 pt-4">
            <span className="text-xs font-mono text-zinc-400 block font-bold">3. Decompressing Logs Subtree (Hash 22f7d0..., Inode 65732):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{logsTreeCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              b&apos;tree 99 100644 1.txt... 100644 2.txt... <span className="text-emerald-400 font-bold">100644 3.txt qxdD3ç... (Hash: 7178644433e7cb...)</span>&apos;
              <div className="text-zinc-500 mt-1">// Character &apos;q&apos; (0x71) locates Blob in folder .git/objects/71/ (Inode 65730)</div>
            </div>
          </div>
        </section>

        {/* Section 3: Extraction & Flag Capture */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">03.</span> Inflating the Hidden Chat Log &amp; Flag Capture
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            Having located the raw zlib-compressed object for <code className="text-cyan-300 font-mono">3.txt</code> at Inode <code className="text-cyan-300 font-mono">65730</code>, we execute an automated extraction script:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>PYTHON • SOLVE.PY</span>
              <CopyButton text={solveScript} />
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              <code>{solveScript}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Recovered Chat Log Transcript:</div>
            <div>blob 188</div>
            <div>Rex: Meet at the old arcade basement for the secret hideout.</div>
            <div className="text-emerald-400 font-bold">Jay: Ask Rusty at the door and use password picoCTF&#123;g17_r35cu3_16ac6bf3&#125;.</div>
            <div>Rex: Bring the decoder map so we can plan the route.</div>
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
