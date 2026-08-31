import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFC0rruptWriteup() {
  const solverScript = `# Open the corrupted mystery file as raw bytes
with open("mystery", "rb") as f:
    data = bytearray(f.read())

# Fix 1: PNG Magic Header (Bytes 0 to 7)
data[0:8] = b"\\x89PNG\\r\\n\\x1a\\n"

# Fix 2: First chunk name -> IHDR (Bytes 12 to 15)
data[12:16] = b"IHDR"

# Fix 3: pHYs chunk data (Offset 0x46)
data[0x46:0x4A] = b"\\x00\\x00\\x16\\x25"

# Fix 4: IDAT chunk length and name (Offset 0x53)
data[0x53:0x5B] = b"\\x00\\x03\\x18\\x51IDAT"

# Save the fully repaired image
with open("fixed.png", "wb") as f:
    f.write(data)

print("🎉 Successfully repaired! fixed.png generated.")`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/picoctf" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to PicoCTF Hub
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-purple-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • FILE HEADER SURGERY
              <span className="animate-blink inline-block w-1.5 h-3 bg-purple-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            c0rrupt: PNG Binary Specification & Hex Reconstruction
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_c0rrupt.jpg" 
                alt="c0rrupt Challenge Analysis"
                fill
                className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#120d1c]/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Official Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;We found this file. Recover the flag. You can also find the file in <code>/problems/c0rrupt_0_1fcad1353b2255f250d60c14afed2100</code> on the shell server.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Forensics / File Repair</span>
                <span>● <strong>Points:</strong> 250 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#09070e] border border-purple-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided File
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  mystery
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 202,887 bytes</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Type: Raw Corrupted Binary</span>
              </div>
              <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 text-center truncate">
                Target: Valid PNG Image
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Beginner Breakdown */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#0f1118] border-l-4 border-purple-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-purple-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (Why did it break?)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              Imagine receiving a sealed shipping container. The barcode on the outside is smudged, the label that says what is inside is torn off, and the weight sticker doesn&apos;t match the contents. The customs inspector immediately refuses to process it. That is exactly what happens when your OS tries to open <code>mystery</code>. The challenge creator took a legitimate PNG image and intentionally sabotaged 4 specific barcode and header bytes so every image viewer rejects it as corrupted.
            </p>
          </div>
        </div>

        {/* Section 2: Deep Technical PNG Specification */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. The W3C PNG Binary Standard
          </h2>
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
            To repair any damaged image file, you must master the binary architecture of the <strong>PNG (Portable Network Graphics)</strong> standard. Every valid PNG has two components:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-xl">
            <pre className="leading-relaxed">
{`1. The 8-Byte Magic Header:
   Hex:   89  50  4E  47  0D  0A  1A  0A
   ASCII: \\x89  P   N   G  \\r  \\n \\x1a \\n

2. Sequential Data Chunks (Each chunk follows this exact 4-field rule):
   ┌──────────────────┬──────────────────┬──────────────────────────┬──────────────────┐
   │ Length (4 Bytes) │ Type (4 Bytes)   │ Data (Length Bytes)      │ CRC32 (4 Bytes)  │
   ├──────────────────┼──────────────────┼──────────────────────────┼──────────────────┤
   │ 00 00 00 0D      │ 49 48 44 52      │ Width, Height, Bit Depth │ 7C 8B AB 78      │
   │ (13 bytes data)  │ ("IHDR" ASCII)   │ Color Type, Compression  │ (Checksum test)  │
   └──────────────────┴──────────────────┴──────────────────────────┴──────────────────┘`}
            </pre>
          </div>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            If the chunk name is misspelled or the Length doesn&apos;t match the number of data bytes, the CRC32 check fails, and the image viewer aborts rendering.
          </p>
        </div>

        {/* Section 3: Diagnostic Step (pngcheck) */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            2. Diagnostic Reconnaissance with `pngcheck`
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Before touching any bytes, we run the automated diagnostic utility <code>pngcheck</code> to pinpoint the exact failing offsets:
          </p>

          <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-red-400 space-y-2">
            <div className="text-zinc-500">$ pngcheck -v mystery</div>
            <div>mystery:  not a PNG file (starts with 89 65 4e 34 0d 0a b0 aa)</div>
            <div className="text-yellow-400">ERROR: mystery is corrupted at offset 0x00000000</div>
          </div>
        </div>

        {/* Section 4: STEP-BY-STEP MANUAL METHOD */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-purple-500/30 pb-4">
            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: HANDS-ON MANUAL REPAIR
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              3. Manual Hex Surgery (Click-by-Click via Hex Editor)
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              Learn how to edit raw bytes manually using <strong>HexEd.it</strong> (in your browser) or <strong>HxD</strong> on Windows.
            </p>
          </div>

          {/* Prerequisite Box */}
          <div className="bg-[#100d1a] border border-purple-500/20 rounded-xl p-5 space-y-3 font-sans text-sm text-zinc-300">
            <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider">🛠️ Manual Setup Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-zinc-300">
              <li>Open <a href="https://hexed.it/" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline font-mono">https://hexed.it/</a> in Chrome/Edge or open <strong>HxD</strong>.</li>
              <li>Click <strong>Open file</strong> and select <code>mystery</code>.</li>
              <li><strong className="text-yellow-400">CRITICAL RULE:</strong> Make sure the mode at the bottom says <strong>OVR (Overwrite)</strong>, not <strong>INS (Insert)</strong>. (Insert pushes old bytes and ruins the file size).</li>
              <li>Never press Spacebar! The editor automatically advances to the next box after every 2 characters.</li>
            </ol>
          </div>

          {/* Detailed 4 Fix Cards */}
          <div className="space-y-6">
            
            {/* Fix 1 */}
            <div className="bg-[#0b0813] border border-purple-500/40 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-purple-400 uppercase tracking-wider">
                  Fix #1: The 8-Byte Magic Header (Offset 0x00000000)
                </span>
                <span className="text-xs font-mono text-zinc-500">Row 1, Bytes 0-7</span>
              </div>
              <p className="text-sm text-zinc-300 font-sans">
                <strong>Why it broke:</strong> The author replaced <code>.PNG</code> with <code>.eN4</code>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-black/80 rounded-lg border border-red-500/30">
                  <div className="text-zinc-500 mb-1">Current Corrupted Bytes:</div>
                  <div className="text-red-400 font-bold">89 65 4E 34 0D 0A B0 AA</div>
                  <div className="text-zinc-500 mt-1">ASCII: .eN4....</div>
                </div>
                <div className="p-3 bg-black/80 rounded-lg border border-emerald-500/30">
                  <div className="text-zinc-500 mb-1">Click byte 65 & Type:</div>
                  <div className="text-emerald-400 font-bold">89 50 4E 47 0D 0A 1A 0A</div>
                  <div className="text-zinc-500 mt-1">ASCII: .PNG\r\n\x1a\n</div>
                </div>
              </div>
            </div>

            {/* Fix 2 */}
            <div className="bg-[#0b0813] border border-purple-500/40 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-purple-400 uppercase tracking-wider">
                  Fix #2: First Chunk Type &rarr; IHDR (Offset 0x0000000C)
                </span>
                <span className="text-xs font-mono text-zinc-500">Row 1, Bytes 12-15</span>
              </div>
              <p className="text-sm text-zinc-300 font-sans">
                <strong>Why it broke:</strong> Right after the 4-byte length <code>00 00 00 0D</code>, the chunk type spells <code>C"DR</code> instead of <code>IHDR</code>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-black/80 rounded-lg border border-red-500/30">
                  <div className="text-zinc-500 mb-1">Current Corrupted Bytes:</div>
                  <div className="text-red-400 font-bold">43 22 44 52</div>
                  <div className="text-zinc-500 mt-1">ASCII: C"DR</div>
                </div>
                <div className="p-3 bg-black/80 rounded-lg border border-emerald-500/30">
                  <div className="text-zinc-500 mb-1">Click 43 & Type:</div>
                  <div className="text-emerald-400 font-bold">49 48 44 52</div>
                  <div className="text-zinc-500 mt-1">ASCII: IHDR</div>
                </div>
              </div>
            </div>

            {/* Fix 3 */}
            <div className="bg-[#0b0813] border border-purple-500/40 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-purple-400 uppercase tracking-wider">
                  Fix #3: pHYs Pixel Density Data (Offset 0x00000046)
                </span>
                <span className="text-xs font-mono text-zinc-500">Row 00000040</span>
              </div>
              <p className="text-sm text-zinc-300 font-sans">
                <strong>Why it broke:</strong> The <code>pHYs</code> chunk defines physical pixels per meter ($5669 \times 5669$). An extra corrupted byte <code>AA</code> threw off the chunk length and CRC checksum.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-black/80 rounded-lg border border-red-500/30">
                  <div className="text-zinc-500 mb-1">Current Corrupted Bytes:</div>
                  <div className="text-red-400 font-bold">AA 00 16 25 00 00 16 25 01</div>
                </div>
                <div className="p-3 bg-black/80 rounded-lg border border-emerald-500/30">
                  <div className="text-zinc-500 mb-1">Click AA & Type:</div>
                  <div className="text-emerald-400 font-bold">00 00 16 25 00 00 16 25 01</div>
                </div>
              </div>
            </div>

            {/* Fix 4 */}
            <div className="bg-[#0b0813] border border-purple-500/40 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-purple-400 uppercase tracking-wider">
                  Fix #4: IDAT Compressed Image Data (Offset 0x00000053)
                </span>
                <span className="text-xs font-mono text-zinc-500">Row 00000050</span>
              </div>
              <p className="text-sm text-zinc-300 font-sans">
                <strong>Why it broke:</strong> The actual image pixel data chunk header was scrambled from <code>IDAT</code> into <code>\xabDET</code> with an invalid length prefix.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-black/80 rounded-lg border border-red-500/30">
                  <div className="text-zinc-500 mb-1">Current Corrupted Bytes:</div>
                  <div className="text-red-400 font-bold">AA AA FF A5 AB 44 45 54</div>
                  <div className="text-zinc-500 mt-1">ASCII: ....DET</div>
                </div>
                <div className="p-3 bg-black/80 rounded-lg border border-emerald-500/30">
                  <div className="text-zinc-500 mb-1">Click AA & Type 8 Bytes:</div>
                  <div className="text-emerald-400 font-bold">00 03 18 51 49 44 41 54</div>
                  <div className="text-zinc-500 mt-1">ASCII: ...QIDAT (202,833 bytes)</div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#120d1c] border border-purple-500/30 p-4 rounded-xl text-center">
            <p className="text-xs md:text-sm text-zinc-300 font-mono">
              💾 In HexEd.it, click <strong>Export</strong> &rarr; Save as <code>fixed.png</code> &rarr; Open with Windows Photo Viewer!
            </p>
          </div>
        </div>

        {/* Section 5: FAST AUTOMATED SOLVER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-purple-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: AUTOMATED FAST SOLVE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                4. The 0.1-Second Python Fixer (`solve.py`)
              </h2>
            </div>
            <CopyButton text={solverScript} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            In competition environments, manually typing hex bytes is too slow. Once you know what chunks are broken, you write an automated Python script using <code>bytearray</code> to slice and replace the corrupted segments in memory in 1 millisecond:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{solverScript}</code>
            </pre>
          </div>
        </div>

        {/* Section 6: Restored Evidence & Flag */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            5. Restored Evidence & Extracted Flag
          </h2>

          <div className="bg-[#050508] border border-purple-500/30 rounded-2xl p-6 text-center space-y-5">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Visual Verification of Repaired Image (fixed.png):
            </p>
            
            <div className="relative w-full max-w-md mx-auto h-48 rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
              <Image 
                src="/images/pico_c0rrupt_fixed.png" 
                alt="c0rrupt Restored Image"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="inline-block bg-black border border-purple-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-purple-300 font-bold shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              picoCTF&#123;c0rrupt10n_15_n3v3r_50_b4d_534e7cb8&#125;
            </div>
          </div>
        </div>

        {/* Section 7: Key Takeaways Summary Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            6. DFIR Diagnostic Cheat Sheet
          </h3>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121217] text-purple-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Tool / Utility</th>
                  <th className="p-3">Syntax</th>
                  <th className="p-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">pngcheck</td>
                  <td className="p-3 text-purple-300">pngcheck -v file.png</td>
                  <td className="p-3 text-zinc-400">Verifies magic bytes, chunk sequence, CRC32 checksums, and reports offset of failure.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">HexEd.it / HxD</td>
                  <td className="p-3 text-purple-300">GUI Hex Editor (OVR mode)</td>
                  <td className="p-3 text-zinc-400">Allows manual byte-by-byte carving, patching, and binary inspection.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Python bytearray</td>
                  <td className="p-3 text-purple-300">data[start:end] = b&quot;...&quot;</td>
                  <td className="p-3 text-zinc-400">Instant programmatic byte patching in memory without installing external tools.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </article>
    </div>
  );
}
