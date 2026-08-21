import Image from "next/image";
import Link from "next/link";

export default function SearchDudeWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-orange-500/30 selection:text-orange-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ascwg" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to ASCWG Hub
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-orange-400 uppercase tracking-[0.3em]">
              Digital Forensics • Windows 
              <span className="animate-blink inline-block w-1.5 h-3 bg-orange-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Do You Even Search Dude: KAPE Triage
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/search_dude_disk.jpg" 
                alt="Windows Forensics Search"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            A CEO&apos;s workstation was compromised. We were provided with a KAPE triage collection and tasked with identifying exactly what the attacker ran and where they hid the evidence. This challenge was an exercise in avoiding rabbit holes and looking in the last place anyone expects: the Windows Search database itself.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: The Execution Anchor
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              If a burglar breaks into a house, they usually leave footprints near the window they smashed. In Windows, every time a program is run, the operating system quietly takes notes about it (like "Program Compatibility" logs) just in case the program crashes later. We found a footprint showing that a fake program called `OfficeUpdater.exe` was launched. But searching for the stolen goods inside that file was a trap! The burglar actually hid the loot inside the house&apos;s own security ledger.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_15px_#f97316] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> Where did the attacker hide the actual payload data?</p>
            <p className="text-orange-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-orange-300">The Windows Search Database (Windows.db)</code></p>
          </div>

          <p>
            Initial investigation revealed an execution record for <code className="text-pink-400 bg-pink-400/10 px-1 rounded">C:\Users\user\AppData\Local\Temp\OfficeUpdater.exe</code> via the{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                Program Compatibility Assistant (PCA)
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A Windows service that monitors programs for compatibility issues. Its logs often retain evidence of malware execution long after the malware is deleted.
              </span>
            </span>
            . Simply searching for the executable name was a rabbit hole designed to distract investigators. The actual flag was hidden within Windows Search database residue.
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">Windows.db [System.Search.AutoSummary]</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-zinc-500">Offset(h)  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span><br/>
                00000000   <span className="text-orange-300">41 00 00 00 01 00 00 00 10 00 00 00 00 00 00 00</span>  <span className="text-zinc-500">A...............</span><br/>
                00000010   <span className="text-pink-300">a3 f1 c8 9b 72 1e 5a 44 8f 3c 11 22 4a 99 bb 01</span>  <span className="text-zinc-500">£ñÈ.r.ZD.&lt;."J.».</span><br/>
                00000020   <span className="text-pink-300">... [48 Bytes High-Entropy Ciphertext] ...     </span>  <span className="text-zinc-500">................</span><br/>
                <br/>
                <span className="text-zinc-500"># Decryption using PCA AppHelp SolutionID (Key):</span><br/>
                <span className="text-pink-400">&gt;</span> python decrypt_blob.py --key <span className="text-green-300">"{'{'}A92B31-..."</span> --data payload.bin<br/>
                <span className="text-zinc-300">SUCCESS: ASCWG{'{'}c0mp4t_s0luti0n_h1d_th3_k3y_w1thin{'}'}</span>
              </code>
            </pre>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Windows.db & PCA AppHelp Decryption ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Navigated to <code className="text-pink-400">ProgramData\Microsoft\Search\Data\Applications\Windows\Windows.db</code>.</li>
                <li>Correlated the execution of <code className="text-pink-400">OfficeUpdater.exe</code> with suspicious binary data found in the <code className="text-pink-400">System.Search.AutoSummary</code> entries.</li>
                <li>Extracted a 64-byte blob: 16 bytes of structured data and 48 bytes of high-entropy ciphertext.</li>
                <li>Recovered the PCA <code className="text-pink-400">AppHelp</code> metadata from the registry/event logs, which provided a <code className="text-pink-400">SolutionID</code>.</li>
                <li>Used the <code className="text-pink-400">SolutionID</code> as the cryptographic key to decrypt the 48-byte blob, revealing the final string.</li>
              </ol>
            </div>
          </details>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">Decrypted Flag: <code className="text-green-300">ASCWG&#123;c0mp4t_s0luti0n_h1d_th3_k3y_w1thin&#125;</code></p>
          </div>

        </div>
      </article>
    </div>
  );
}
