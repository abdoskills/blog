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
        <div className="bg-[#120d1c]/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-10 backdrop-blur-md">
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

        {/* Section 1: Beginner Breakdown */}
        <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#0f1118] border-l-4 border-purple-500 p-5 rounded-r-xl shadow-md">
            <h4 className="text-purple-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Imagine receiving an envelope where someone smudged the recipient's name and postal code. The mail carrier won't deliver it. Every PNG image file follows a rigid postal rulebook: it MUST start with a signature (<code>89 50 4E 47...</code>) and organize its pixels into labeled boxes called <strong>chunks</strong> (<code>IHDR</code>, <code>pHYs</code>, <code>IDAT</code>). The challenge author intentionally replaced a few letters with random gibberish to trip up image decoders.
            </p>
          </div>
        </div>

        {/* Section 2: Technical Theory */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. Anatomy of a PNG Chunk
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Every chunk in a PNG file is formatted into 4 mandatory fields:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`┌────────────────┬────────────────┬──────────────────────────┬────────────────┐
│ Length (4 B)   │ Chunk Type (4B)│ Chunk Data (N Bytes)     │ CRC32 (4 B)    │
│ 00 00 00 0D    │ I H D R        │ Width, Height, Bit depth │ 7C 8B AB 78    │
└────────────────┴────────────────┴──────────────────────────┴────────────────┘`}
            </pre>
          </div>
        </div>

        {/* Section 3: The 4 Forensic Corruptions */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            2. Identifying the 4 Broken Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {/* Fix 1 */}
            <div className="bg-[#100d1a] border border-purple-500/30 rounded-xl p-4 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider">#1 The Magic Header (Offset 0x00)</span>
              <p className="text-zinc-400 font-sans text-xs">The signature tells operating systems this is a PNG.</p>
              <div className="p-2 bg-black rounded border border-zinc-800 space-y-1">
                <div className="text-red-400">- 89 65 4E 34 0D 0A B0 AA (.eN4....)</div>
                <div className="text-emerald-400">+ 89 50 4E 47 0D 0A 1A 0A (.PNG....)</div>
              </div>
            </div>

            {/* Fix 2 */}
            <div className="bg-[#100d1a] border border-purple-500/30 rounded-xl p-4 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider">#2 First Chunk Name (Offset 0x0C)</span>
              <p className="text-zinc-400 font-sans text-xs">Every PNG must start with the IHDR header chunk.</p>
              <div className="p-2 bg-black rounded border border-zinc-800 space-y-1">
                <div className="text-red-400">- 43 22 44 52 (C"DR)</div>
                <div className="text-emerald-400">+ 49 48 44 52 (IHDR)</div>
              </div>
            </div>

            {/* Fix 3 */}
            <div className="bg-[#100d1a] border border-purple-500/30 rounded-xl p-4 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider">#3 pHYs Chunk Data (Offset 0x46)</span>
              <p className="text-zinc-400 font-sans text-xs">Extra corrupted byte corrupted pixel density fields.</p>
              <div className="p-2 bg-black rounded border border-zinc-800 space-y-1">
                <div className="text-red-400">- AA 00 16 25 00 00 16 25 01</div>
                <div className="text-emerald-400">+ 00 00 16 25 00 00 16 25 01</div>
              </div>
            </div>

            {/* Fix 4 */}
            <div className="bg-[#100d1a] border border-purple-500/30 rounded-xl p-4 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider">#4 IDAT Image Data (Offset 0x53)</span>
              <p className="text-zinc-400 font-sans text-xs">Principal image payload chunk length & name.</p>
              <div className="p-2 bg-black rounded border border-zinc-800 space-y-1">
                <div className="text-red-400">- AA AA FF A5 AB 44 45 54 (..DET)</div>
                <div className="text-emerald-400">+ 00 03 18 51 49 44 41 54 (..IDAT)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Python Automated Solver */}
        <div className="space-y-4 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              3. Automated Python Solver (`solve.py`)
            </h2>
            <CopyButton text={solverScript} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{solverScript}</code>
            </pre>
          </div>
        </div>

        {/* Section 5: Restored Evidence & Flag */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            4. Restored Flag & Visual Output
          </h2>

          <div className="bg-[#050508] border border-purple-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Restored Image Output (fixed.png):</p>
            <div className="relative w-full max-w-md mx-auto h-48 rounded-xl overflow-hidden border border-zinc-800 bg-black">
              <Image 
                src="/images/pico_c0rrupt_fixed.png" 
                alt="c0rrupt Restored Image"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="inline-block bg-black border border-purple-500/50 px-6 py-3 rounded-xl font-mono text-base md:text-lg text-purple-300 font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              picoCTF&#123;c0rrupt10n_15_n3v3r_50_b4d_534e7cb8&#125;
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
