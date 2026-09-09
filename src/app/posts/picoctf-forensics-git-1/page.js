import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Forensics Git 1: Tracing Deleted Commits & Git Internal Object Carving | PicoCTF 2026",
  description: "Forensic analysis of a raw disk image using The Sleuth Kit (TSK). Tracing Git reflogs to discover deleted commits, navigating the Git DAG (Commit -> Tree -> Blob), and inflating zlib-compressed objects.",
};

export default function PicoCTFForensicsGit1Writeup() {
  const mmlsCmd = `mmls.exe .\\disk.img`;
  const commitCheckCmd = `icat.exe -o 1140736 .\\disk.img 65693`;
  const reflogCmd = `icat.exe -o 1140736 .\\disk.img 65704`;
  const pythonCommitCmd = `python -c "import subprocess, zlib; print(zlib.decompress(subprocess.check_output(['icat.exe', '-o', '1140736', '.\\disk.img', '65700'])))"`;
  const pythonTreeCmd = `python -c "import subprocess, zlib; print(zlib.decompress(subprocess.check_output(['icat.exe', '-o', '1140736', '.\\disk.img', '65698'])))"`;
  const pythonBlobCmd = `python -c "import subprocess, zlib; print(zlib.decompress(subprocess.check_output(['icat.exe', '-o', '1140736', '.\\disk.img', '65695'])))"`;
  const gitCatCmd = `git cat-file -p f150f47a5dabfb4397706aa18905df936595a86e`;
  const flagText = `picoCTF{g17_r3m3mb3r5_d4ddf904}`;

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
              PICOCTF 2026 • FORENSICS • GIT INTERNALS &amp; REFLOG CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight break-words">
            Forensics Git 1: Tracing Deleted Commits &amp; Git Object Carving
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>7 min read</span>
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
              <span className="text-zinc-500 block mb-1 text-[11px]">INITIAL COMMIT</span>
              <span className="text-cyan-400 font-bold truncate block">177789af... (Add flag)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FLAG BLOB</span>
              <span className="text-amber-400 font-bold truncate block">Inode 65695 (flag.txt)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FLAG</span>
              <span className="text-emerald-400 font-bold truncate block">picoCTF&#123;g17_r3...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_git_1.jpg"
            alt="Git Internal Object Carving and Reflog Forensics"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Forensic Lab Workbench &amp; Git Internal DAG Reconstruction</span>
            <span className="text-cyan-400 font-bold">Commit &rarr; Tree &rarr; Blob &bull; zlib Inflate</span>
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
              Investigating a raw 1 GB ext4 disk image (<code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono text-xs">disk.img</code>). In this scenario, checking the latest commit message yields <code className="text-amber-300 font-mono text-xs">Remove flag</code> &mdash; the author attempted to sanitize and delete sensitive evidence. However, Git is an immutable append-only object database. By reading Git reflogs (<code className="text-cyan-300 font-mono text-xs">logs/HEAD</code>) and following the internal object chain (<strong>Commit &rarr; Tree &rarr; Blob</strong>), we extract the deleted file object from <code className="text-cyan-300 font-mono text-xs">.git/objects/</code> and inflate the zlib stream to recover the flag.
            </p>
          </div>
        </div>

        {/* Section 1: Spotting the Deletion */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">01.</span> Spotting the Deletion &amp; Inspecting the Reflog
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            After locating the repository at Sector offset <code className="text-cyan-300 font-mono">1140736</code>, reading the latest commit message via <code className="text-cyan-300 font-mono">COMMIT_EDITMSG</code> (Inode 65693) shows:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • CHECK COMMIT_EDITMSG</span>
              <CopyButton text={commitCheckCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
              <code>{commitCheckCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-amber-400 font-bold">
            Remove flag
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            To discover previous commits where the flag was originally added, we read Git&apos;s reflog history via <code className="text-cyan-300 font-mono">logs/HEAD</code> (Inode 65704):
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • DUMP GIT REFLOG</span>
              <CopyButton text={reflogCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{reflogCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Git Reflog History:</div>
            <div className="text-emerald-400 font-bold">000000... 177789af0b300e043ea8f54ea57d6cee352291ae commit (initial): Add flag</div>
            <div className="text-zinc-400">177789... 5fb8194539c770a830b8ba089a50778c07072b03 commit: Remove flag</div>
          </div>
        </section>

        {/* Section 2: Git Object Architecture */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">02.</span> Git Internal Architecture: Commit &rarr; Tree &rarr; Blob
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            In Git, every object is stored in <code className="text-cyan-300 font-mono">.git/objects/xx/yyyy...</code>, where <code className="text-cyan-300 font-mono">xx</code> is the first 2 hex characters of its 40-character SHA-1 hash. Objects are compressed using <strong>zlib</strong>.
          </p>

          {/* Sub-step 1: Commit */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 block font-bold">1. Decompressing the Commit Object (Inode 65700, folder &quot;17&quot;):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{pythonCommitCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              b&apos;commit 179\x00tree <span className="text-amber-400 font-bold">a62340e078686778969b9a555fc722147cf14e5a</span>\nauthor... Add flag\n&apos;
            </div>
          </div>

          {/* Sub-step 2: Tree */}
          <div className="space-y-2 pt-4">
            <span className="text-xs font-mono text-zinc-400 block font-bold">2. Decompressing the Tree Object (Inode 65698, folder &quot;a6&quot;):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{pythonTreeCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              b&apos;tree 36\x00100644 flag.txt\x00<span className="text-emerald-400 font-bold">\xf1P\xf4z]\xab\xfbC... (Hash: f150f47a5dabfb...)</span>&apos;
            </div>
          </div>

          {/* Sub-step 3: Blob */}
          <div className="space-y-2 pt-4">
            <span className="text-xs font-mono text-zinc-400 block font-bold">3. Decompressing the Flag Blob (Inode 65695, folder &quot;f1&quot;):</span>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                <code>{pythonBlobCmd}</code>
              </pre>
            </div>
            <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-400 font-bold">
              b&apos;blob 31\x00picoCTF&#123;g17_r3m3mb3r5_d4ddf904&#125;&apos;
            </div>
          </div>
        </section>

        {/* Section 3: Non-Python Extraction */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">03.</span> Alternative Extraction Methods (Zero Code)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0a0a0f] border border-zinc-800 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-white font-mono mb-2">🟢 Method A: CyberChef (GUI)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Dump the object to disk via <code className="text-cyan-300">icat ... 65695 &gt; blob.bin</code>, open CyberChef, and apply the <strong className="text-white">Zlib Inflate</strong> recipe to view the flag without programming.
              </p>
            </div>
            <div className="bg-[#0a0a0f] border border-zinc-800 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-white font-mono mb-2">🔵 Method B: Git Native CLI</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Git provides its own decompression tool. Running pretty-print auto-inflates any object:
              </p>
              <pre className="p-2 bg-black/60 rounded text-[11px] font-mono text-cyan-300 overflow-x-auto">
                <code>{gitCatCmd}</code>
              </pre>
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
