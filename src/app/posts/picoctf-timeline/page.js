import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Timeline: Linux Filesystem MAC Timeline Analysis | PicoCTF 2026",
  description: "Forensic analysis of a raw ext4 partition image using The Sleuth Kit (TSK). Reconstructing chronological MAC timelines with fls and mactime to identify suspect pre-shutdown activity.",
};

export default function PicoCTFTimelineWriteup() {
  const flsCmd = `fls -m / -r ./partition4.img | Out-File -Encoding ascii body.txt`;
  const mactimeCmd = `mactime -b body.txt -d -z UTC > timeline.csv`;
  const filterCmd = `mactime -b body.txt -d -z UTC 2025-12-01 | Select-Object -Last 30`;
  const icatCmd = `icat.exe ./partition4.img 32716`;
  const decodeCmd = `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("NTczNDE3aDEzcl83aDRuXzdoM18xNDU3XzU4NTI3YmIyMjIK"))`;
  const flagText = `picoCTF{573417h13r_7h4n_7h3_1457_58527bb222}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-cyan-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.3em]">
              PICOCTF 2026 • FORENSICS • DISK &amp; FILESYSTEM DFIR
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight break-words">
            Timeline: Linux Filesystem MAC Timeline Analysis
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span className="text-cyan-400">PicoCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">TARGET IMAGE</span>
              <span className="text-white font-bold truncate block">partition4.img</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">TOOLCHAIN</span>
              <span className="text-cyan-400 font-bold truncate block">fls, mactime, icat</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">ANOMALY INODE</span>
              <span className="text-amber-400 font-bold truncate block">32716 (/etc/chat)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FLAG</span>
              <span className="text-emerald-400 font-bold truncate block">picoCTF&#123;573417...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_timeline.jpg"
            alt="Linux Filesystem MAC Timeline Forensics"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Digital Forensics Laboratory &amp; Filesystem Inode Triage</span>
            <span className="text-cyan-400 font-bold">The Sleuth Kit • Bodyfile • mactime</span>
          </div>
        </div>

        {/* Challenge Summary */}
        <div className="bg-[#0b1418]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Forensic Scenario
              </span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
              We are tasked with investigating a raw ext4 partition image (<code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono text-xs">partition4.img</code>) to determine what happened on the operating system before it was powered down. Using <strong>The Sleuth Kit</strong>, we extract metadata into a standardized bodyfile, compile a chronological MAC timeline, trace the pre-shutdown event horizon, and carve out the hidden flag artifact.
            </p>
          </div>
        </div>

        {/* Section 1: Generating the Bodyfile */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">01.</span> Generating the Filesystem Bodyfile with <code className="text-cyan-400">fls</code>
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Without mounting the filesystem, <code className="text-cyan-300">fls</code> recursively traverses directory trees and parses inode metadata structures directly into the Sleuth Kit bodyfile format:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • DUMP BODYFILE</span>
              <CopyButton text={flsCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{flsCmd}</code>
            </pre>
          </div>

          <div className="bg-[#131109] border border-amber-500/40 p-4 rounded-xl text-xs font-mono text-amber-200">
            <strong>⚠ Forensic Field Note:</strong> In Windows PowerShell 5.1, the default redirection operator (<code className="text-amber-300">&gt; body.txt</code>) writes UTF-16 LE with byte-order marks. Perl scripts like <code className="text-amber-300">mactime</code> expect standard ASCII/UTF-8. Always pipe through <code className="text-amber-300">Out-File -Encoding ascii</code> to prevent null-byte corruption!
          </div>
        </section>

        {/* Section 2: Compiling Chronological Timeline */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">02.</span> Compiling the Chronological Timeline with <code className="text-cyan-400">mactime</code>
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Next, we run <code className="text-cyan-300">mactime</code> to translate Unix Epoch timestamps into human-readable chronological sequences:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • GENERATE CSV TIMELINE</span>
              <CopyButton text={mactimeCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{mactimeCmd}</code>
            </pre>
          </div>
        </section>

        {/* Section 3: Anomaly Triage */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">03.</span> The Pre-Shutdown Event Horizon
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Filtering for activity on <strong>December 1, 2025</strong> reveals the system&apos;s final active moments:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • FILTER FINAL SESSION</span>
              <CopyButton text={filterCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{filterCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300">
            <div className="text-zinc-500">// Chronological Observations:</div>
            <div>Mon Dec 01 2025 21:50:23 UTC — /root/.ash_history (poweroff executed)</div>
            <div className="text-amber-400 font-bold">Mon Dec 01 2025 21:50:07 UTC — /etc/chat (Inode 32716, 49 bytes, macb)</div>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            Exactly 16 seconds before the administrator typed <code className="text-zinc-100 font-mono">poweroff</code>, a brand-new file named <code className="text-amber-300 font-mono">/etc/chat</code> was created with flag <code className="text-amber-300 font-mono">macb</code> (Modified, Accessed, Changed, Born).
          </p>
        </section>

        {/* Section 4: Carving with icat & Decoding */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">04.</span> Inode Carving &amp; Base64 Decoding
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Using <code className="text-cyan-300 font-mono">icat</code>, we stream the raw data blocks mapped to Inode 32716 directly without mounting the partition:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>TERMINAL • CARVE INODE WITH ICAT</span>
              <CopyButton text={icatCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{icatCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300">
            <span className="text-zinc-500">// Output: </span>
            <span className="text-cyan-300">NTczNDE3aDEzcl83aDRuXzdoM18xNDU3XzU4NTI3YmIyMjIK</span>
          </div>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • BASE64 DECODE</span>
              <CopyButton text={decodeCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              <code>{decodeCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300">
            <span className="text-zinc-500">// Decoded Plaintext: </span>
            <span className="text-emerald-400 font-bold break-all block sm:inline">573417h13r_7h4n_7h3_1457_58527bb222</span>
            <span className="text-zinc-500 block text-[11px] mt-1">(L33tspeak: &quot;stealthier_than_the_last_58527bb222&quot;)</span>
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
