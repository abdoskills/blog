import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFLike1000Writeup() {
  const pythonScript = `import tarfile
import os

# Unpack from layer 1000 down to layer 1
for i in range(1000, 0, -1):
    tar_name = f"{i}.tar"
    if os.path.exists(tar_name):
        print(f"Extracting {tar_name}...")
        try:
            with tarfile.open(tar_name, "r") as tar:
                tar.extractall()
            # Clean up old tar file to save disk space
            os.remove(tar_name)
        except Exception as e:
            print(f"Error on {tar_name}: {e}")

# Clean up filler dummy file
if os.path.exists("filler.txt"):
    os.remove("filler.txt")

print("\\n🎉 Finished! Extracted flag.png.")`;

  const oneliner = `python -c "import tarfile,os; [([tarfile.open(f'{i}.tar').extractall(), os.remove(f'{i}.tar')] if os.path.exists(f'{i}.tar') else None) for i in range(1000,0,-1)]; os.remove('filler.txt') if os.path.exists('filler.txt') else None; print('Done! flag.png extracted.')"`;

  const bashLoop = `while [ -f [0-9]*.tar ]; do
    tar -xvf *.tar
    rm -f [0-9]*.tar
done
rm -f filler.txt
echo "Done! flag.png extracted."`;

  const powershellLoop = `while (Get-ChildItem -Filter "[0-9]*.tar") {
    $tar = (Get-ChildItem -Filter "[0-9]*.tar")[0]
    tar -xf $tar.Name
    Remove-Item $tar.FullName -Force
}
Remove-Item filler.txt -Force -ErrorAction SilentlyContinue
Write-Host "Done! flag.png extracted."`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/picoctf" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to PicoCTF
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-amber-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • ARCHIVE AUTOMATION
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            like1000: Automated Recursive TAR Decompression
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_like1000.jpg" 
                alt="like1000 Archive Unpacking"
                fill
                className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#1a160e]/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Official Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;This .tar file got tarred a lot. Also available at <code>/problems/like1000_0_369bbdea2672ad260f212633f7368499</code> on the shell server.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Forensics / Scripting</span>
                <span>● <strong>Points:</strong> 250 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#0e0c08] border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided File &amp; Solver
                </span>
                <a 
                  href="/downloads/like1000_solve.py" 
                  download="solve.py"
                  className="flex items-center gap-2 text-amber-300 hover:text-white font-mono text-sm font-bold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-2 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>⬇️ Download solve.py</span>
                </a>
                <span className="text-[11px] font-mono text-zinc-400 block mt-2">Size: 10 MB initial archive</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Type: 1,000 Nested POSIX TARs</span>
              </div>
              <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 text-center truncate">
                Dissector: Python tarfile / Shell Loop
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Intuitive Analogy */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#14120a] border-l-4 border-amber-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-amber-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (The Matryoshka Trap)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              This challenge is the digital equivalent of a <strong>Russian Nesting Doll</strong> (Matryoshka). You open box #1000, and inside you find box #999 and packing peanuts (<code>filler.txt</code>). You open #999, and inside is #998. Doing this by hand in 7-Zip or Finder would require clicking 1,000 times, taking over 3 hours and cluttering your storage drive with gigabytes of redundant archives. In DFIR and CTFs, the golden rule is: <strong>if a task repeats more than 3 times, automate it immediately!</strong>
            </p>
          </div>
        </div>

        {/* Section 2: Technical Breakdown of TAR Format */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. Anatomy of a POSIX TAR Archive
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Unlike ZIP or RAR archives which compress data, a standard <code>.tar</code> (Tape Archive) file simply packages multiple files sequentially in 512-byte blocks with a header block preceding each file:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-xl">
            <pre className="leading-relaxed">
{`┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ Header Block (512 Bytes)     │ File Data Blocks (N x 512 B) │ Next File Header / End (Null)│
│ Filename: "999.tar"          │ Raw bytes of 999.tar archive │ Filename: "filler.txt"       │
│ Mode, UID, GID, Size, UStar  │                              │                              │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘`}
            </pre>
          </div>
        </div>

        {/* Section 3: METHOD A - MANUAL TERMINAL LOOP */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-amber-500/30 pb-4">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: SHELL ONELINER &amp; LOOPING
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              2. Command-Line Batch Loops (Bash &amp; PowerShell)
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              If you don&apos;t want to write a full Python script, you can run a one-line terminal loop that unpacks and deletes in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Linux Bash Loop */}
            <div className="bg-[#120f08] border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-amber-400 uppercase">Linux / macOS (Bash)</span>
                <CopyButton text={bashLoop} />
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                A simple <code>while</code> loop that extracts the current tar, immediately removes the unpacked archive to conserve disk space, and continues until reaching layer 1:
              </p>
              <div className="p-4 bg-black rounded-lg border border-zinc-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre><code>{bashLoop}</code></pre>
              </div>
            </div>

            {/* Windows PowerShell Loop */}
            <div className="bg-[#120f08] border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-amber-400 uppercase">Windows 10/11 (PowerShell)</span>
                <CopyButton text={powershellLoop} />
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Native Windows PowerShell script using built-in <code>tar.exe</code> and <code>Remove-Item</code>:
              </p>
              <div className="p-4 bg-black rounded-lg border border-zinc-800 font-mono text-xs text-amber-300 overflow-x-auto">
                <pre><code>{powershellLoop}</code></pre>
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: METHOD B - PYTHON AUTOMATION SCRIPT & ONELINER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-amber-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: HIGH-SPEED PYTHON AUTOMATION &amp; ONELINER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                3. The 3-Second Python Solver (`solve.py`)
              </h2>
            </div>
            <CopyButton text={pythonScript} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Python&apos;s standard library includes the <code>tarfile</code> module, which allows in-memory extraction and fast file deletion. It counts backwards from <strong>1000 down to 1</strong> and unpacks the entire sequence in under 4 seconds:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
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

        {/* Section 5: Extracted Flag Box */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            4. Recovered Flag Image
          </h2>

          <div className="bg-[#050508] border border-amber-500/30 rounded-2xl p-6 text-center space-y-5">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Extracted Image Artifact (flag.png):
            </p>
            
            <div className="relative w-full max-w-sm mx-auto h-32 rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-xl">
              <Image 
                src="/images/pico_like1000_flag.png" 
                alt="like1000 Flag Image"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="inline-block bg-black border border-amber-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-amber-300 font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)]">
              picoCTF&#123;l0t5_0f_tar5&#125;
            </div>
          </div>
        </div>

        {/* Section 6: Key Takeaways Reference */}
        <div className="space-y-4 mb-12">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            5. Key Takeaways for Archive Forensics
          </h3>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121217] text-amber-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Principle</th>
                  <th className="p-3">Best Practice</th>
                  <th className="p-3">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">In-Flight Garbage Collection</td>
                  <td className="p-3 text-amber-300">os.remove(tar_name) inside loop</td>
                  <td className="p-3 text-zinc-400">Prevents filling up disk storage when dealing with recursive archives or zip-bombs.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Python tarfile Module</td>
                  <td className="p-3 text-amber-300">tarfile.open(path, &apos;r&apos;)</td>
                  <td className="p-3 text-zinc-400">Cross-platform, standard library with 0 third-party dependencies required.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Pattern Recognition</td>
                  <td className="p-3 text-amber-300">Nesting: 1000.tar &rarr; 999.tar</td>
                  <td className="p-3 text-zinc-400">Stop doing manual unzipping as soon as a decremental index pattern is spotted.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7: The Complete Investigation Path & Mental Roadmap */}
        <div className="bg-[#141008] border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              6. The Complete Investigation Path &amp; Mental Roadmap
            </h3>
          </div>
          
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Here is the step-by-step roadmap from initial archive inspection to extracting the final PNG flag:
          </p>

          <div className="space-y-4 font-mono text-xs text-zinc-300">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
              <div>
                <strong className="text-white block text-sm mb-1">Archive Inspection &amp; Pattern Identification</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Downloaded <code>1000.tar</code>. Extracted it once to reveal <code>999.tar</code> and <code>filler.txt</code>. Recognized the recursive nested pattern ($1000 \rightarrow 1$).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
              <div>
                <strong className="text-white block text-sm mb-1">Storage Strategy (Avoiding Disk Overflow)</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Realized that extracting 1,000 archives simultaneously would consume gigabytes of storage. Formulated the rule: immediately delete the parent archive as soon as its child is unpacked.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
              <div>
                <strong className="text-white block text-sm mb-1">Scripted Decompression Loop</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Wrote a Python script using <code>tarfile.open()</code> with a decremental loop <code>range(1000, 0, -1)</code> and <code>os.remove()</code> in-flight garbage collection.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
              <div>
                <strong className="text-white block text-sm mb-1">Execution &amp; Core Artifact Recovery</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Ran <code>solve.py</code>. Script unnested all 1,000 layers in 3.2 seconds, reaching layer <code>1.tar</code> and dropping <code>flag.png</code>.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-amber-500/40">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 5</span>
              <div>
                <strong className="text-white block text-sm mb-1">Flag Extraction</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Rendered <code>flag.png</code> to submit the flag: <code>picoCTF&#123;l0t5_0f_tar5&#125;</code>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </article>
    </div>
  );
}
