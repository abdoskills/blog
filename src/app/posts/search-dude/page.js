import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function SearchDudeWriteup() {
  const pythonScript = `from Crypto.Cipher import AES
import hashlib

# 1. SolutionID extracted from PCA AppHelp database
solution_id = "{A92B31C4-7D4F-4A92-B582-82E9104A7F11}"
key = hashlib.sha256(solution_id.encode('utf-16le')).digest()[:16]

# 2. 48-byte ciphertext blob extracted from Windows.db System.Search.AutoSummary
ciphertext = bytes.fromhex("a3f1c89b721e5a448f3c11224a99bb012f5a89b0...")

cipher = AES.new(key, AES.MODE_CBC, iv=b"\\x00"*16)
decrypted = cipher.decrypt(ciphertext)

print("🎉 Decrypted Flag:", decrypted.decode('utf-8', errors='ignore'))`;

  const oneliner = `python -c "from Crypto.Cipher import AES; import hashlib; k=hashlib.sha256('{A92B31C4-7D4F-4A92-B582-82E9104A7F11}'.encode('utf-16le')).digest()[:16]; print(AES.new(k,AES.MODE_CBC,b'\\x00'*16).decrypt(bytes.fromhex('...')).decode('latin1'))"`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-orange-500/30 selection:text-orange-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-amber-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.3em]">
              ASCWG QUALS • WINDOWS FORENSICS • ESE CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Do You Even Search Dude: Windows.db &amp; PCA AppHelp Triage
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
                className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#1c170e]/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;A CEO&apos;s corporate workstation was compromised. The attacker attempted to evade disk forensics by wiping standard execution logs. Analyze the Windows.db Extensible Storage Engine (ESE) database and KAPE triage collection to reconstruct the executed malware payload.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Windows Forensics / ESE Database Carving</span>
                <span>● <strong>Platform:</strong> ASCWG Qualifications 2026</span>
                <span>● <strong>Flag Format:</strong> <code>ASCWG&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#0e0b06] border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided Artifacts
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 3h16m-16 4h16" /></svg>
                  Windows.db / KAPE.zip
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 285 MB • ESE Database</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Path: Windows\Windows.edb</span>
              </div>
              <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 text-center truncate">
                Parser: ESEDatabaseView / NirSoft
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            A CEO&apos;s workstation was compromised. We were provided with a KAPE triage collection and tasked with identifying exactly what the attacker ran and where they hid the evidence. This challenge was an exercise in avoiding rabbit holes and looking in the last place anyone expects: the Windows Search database itself.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: The Execution Anchor
          </h3>

          <div className="bg-[#141008] border-l-4 border-amber-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-amber-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN (Footprints in the Registry)</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              If a burglar breaks into a house, they usually leave footprints near the window they smashed. In Windows, every time a program is run, the operating system quietly takes notes about it (like &ldquo;Program Compatibility&rdquo; logs) just in case the program crashes later. We found a footprint showing that a fake program called <code>OfficeUpdater.exe</code> was launched. But searching for the stolen goods inside that file was a trap! The burglar actually hid the loot inside the house&apos;s own security ledger.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 shadow-[0_0_15px_#f59e0b] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> Where did the attacker hide the actual payload data?</p>
            <p className="text-amber-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-amber-300">The Windows Search Database (Windows.db)</code></p>
          </div>

          <p>
            Initial investigation revealed an execution record for <code className="text-amber-400 bg-amber-400/10 px-1 rounded">C:\Users\user\AppData\Local\Temp\OfficeUpdater.exe</code> via the{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 hover:bg-amber-400/20 transition-colors">
                Program Compatibility Assistant (PCA)
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A Windows service that monitors programs for compatibility issues. Its logs often retain evidence of malware execution long after the malware is deleted.
              </span>
            </span>
            . Simply searching for the executable name was a rabbit hole designed to distract investigators. The actual flag was hidden within Windows Search database residue.
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">Windows.db [System.Search.AutoSummary]</span>
              </div>
              <CopyButton text={`python decrypt_blob.py --key "{A92B31-..." --data payload.bin`} />
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-zinc-500">Offset(h)  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span><br/>
                00000000   <span className="text-orange-300">41 00 00 00 01 00 00 00 10 00 00 00 00 00 00 00</span>  <span className="text-zinc-500">A...............</span><br/>
                00000010   <span className="text-amber-300">a3 f1 c8 9b 72 1e 5a 44 8f 3c 11 22 4a 99 bb 01</span>  <span className="text-zinc-500">£ñÈ.r.ZD.&lt;.&quot;J.».</span><br/>
                00000020   <span className="text-amber-300">... [48 Bytes High-Entropy Ciphertext] ...     </span>  <span className="text-zinc-500">................</span><br/>
                <br/>
                <span className="text-zinc-500"># Decryption using PCA AppHelp SolutionID (Key):</span><br/>
                <span className="text-amber-400">&gt;</span> python decrypt_blob.py --key <span className="text-green-300">&quot;&#123;A92B31-...&#125;&quot;</span> --data payload.bin<br/>
                <span className="text-zinc-300">SUCCESS: ASCWG&#123;c0mp4t_s0luti0n_h1d_th3_k3y_w1thin&#125;</span>
              </code>
            </pre>
          </div>

          {/* Section: Python Script */}
          <div className="space-y-4 my-8">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                Automated Python Decryptor (`decrypt_blob.py`):
              </span>
              <CopyButton text={pythonScript} />
            </div>
            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
              <pre><code>{pythonScript}</code></pre>
            </div>
            
            {/* Terminal One-liner */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-amber-400 font-bold uppercase">⚡ Terminal One-Liner (PowerShell / Bash):</span>
                <CopyButton text={oneliner} />
              </div>
              <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <code>{oneliner}</code>
              </div>
            </div>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Windows.db &amp; PCA AppHelp Decryption ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-amber-500">
                <li>Navigated to <code className="text-amber-400">ProgramData\Microsoft\Search\Data\Applications\Windows\Windows.db</code>.</li>
                <li>Correlated the execution of <code className="text-amber-400">OfficeUpdater.exe</code> with suspicious binary data found in the <code className="text-amber-400">System.Search.AutoSummary</code> entries.</li>
                <li>Extracted a 64-byte blob: 16 bytes of structured data and 48 bytes of high-entropy ciphertext.</li>
                <li>Recovered the PCA <code className="text-amber-400">AppHelp</code> metadata from the registry/event logs, which provided a <code className="text-amber-400">SolutionID</code>.</li>
                <li>Used the <code className="text-amber-400">SolutionID</code> as the cryptographic key to decrypt the 48-byte blob, revealing the final string.</li>
              </ol>
            </div>
          </details>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2 font-bold">Decrypted Final Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;c0mp4t_s0luti0n_h1d_th3_k3y_w1thin&#125;
            </p>
          </div>

          {/* Section: The Complete Investigation Path & Mental Roadmap */}
          <div className="bg-[#141008] border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden my-12">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
              <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                The Complete Investigation Path &amp; Mental Roadmap
              </h3>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Here is the step-by-step roadmap from initial KAPE triage to decrypting the hidden ESE database blob:
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Execution Triage &amp; Avoiding Rabbit Holes</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Discovered PCA execution entry for <code>OfficeUpdater.exe</code>. Confirmed the executable was an empty decoy placed to distract analysts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Extensible Storage Engine (ESE) Carving</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Loaded <code>Windows.db</code> into ESEDatabaseView. Scanned <code>System.Search.AutoSummary</code> table and located high-entropy 48-byte binary blob residue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Key Hunting in PCA AppHelp Metadata</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Cross-referenced Windows Event Logs and found the PCA Compatibility database <code>SolutionID</code> GUID.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Automated Cryptographic Decryption</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Derived the AES key via UTF-16LE SHA-256 and decrypted the 48-byte blob using Python.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-amber-500/40">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 5</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Flag Capture</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Extracted the final flag: <code>ASCWG&#123;c0mp4t_s0luti0n_h1d_th3_k3y_w1thin&#125;</code>.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
