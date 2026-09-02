import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFWhatLiesWithinWriteup() {
  const pythonScript = `from PIL import Image

# 1. Load image and raw pixel raster data
img = Image.open('buildings.png')
pixels = img.load()
width, height = img.size

# 2. Extract the Least Significant Bit (LSB) from R, G, and B channels
bits = []
for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y][:3]
        bits.append(r & 1)  # Red channel LSB (0 or 1)
        bits.append(g & 1)  # Green channel LSB
        bits.append(b & 1)  # Blue channel LSB

# 3. Assemble consecutive 8 bits into 1 ASCII byte
byte_list = []
for i in range(0, len(bits), 8):
    byte_bits = bits[i:i+8]
    if len(byte_bits) == 8:
        val = 0
        for b in byte_bits:
            val = (val << 1) | b
        byte_list.append(val)

# 4. Decode as string and locate picoCTF flag
extracted_text = bytes(byte_list).decode('latin1', errors='ignore')

if "picoCTF{" in extracted_text:
    start_idx = extracted_text.index("picoCTF{")
    end_idx = extracted_text.index("}", start_idx) + 1
    print("🎉 Extracted Flag:", extracted_text[start_idx:end_idx])`;

  const oneliner = `python -c "from PIL import Image; img=Image.open('buildings.png'); px=img.load(); w,h=img.size; bits=[c&1 for y in range(h) for x in range(w) for c in px[x,y][:3]]; chars=[chr(int(''.join(map(str,bits[i:i+8])),2)) for i in range(0,len(bits),8)]; txt=''.join(chars); print(txt[txt.find('picoCTF{'):txt.find('}',txt.find('picoCTF{'))+1])"`;

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
              PICOCTF 2019 • FORENSICS • LSB STEGANOGRAPHY
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            What Lies Within: LSB Image Steganography Deconstruction
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_what_lies_within.jpg" 
                alt="What Lies Within Analysis"
                fill
                className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#0e161c]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Official Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;There&apos;s something in the building. Can you retrieve the flag?&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Steganography / LSB Carving</span>
                <span>● <strong>Points:</strong> 150 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#060c10] border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided File (Download &amp; Practice)
                </span>
                <a 
                  href="/downloads/buildings.png" 
                  download="buildings.png"
                  className="flex items-center gap-2 text-cyan-300 hover:text-white font-mono text-sm font-bold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3 py-2 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>⬇️ Download buildings.png</span>
                </a>
                <span className="text-[11px] font-mono text-zinc-400 block mt-2">Size: 625 KB • PNG Image</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Encoding: RGB 8-bit/channel</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 text-center truncate">
                Dissector: Aperi&apos;Solve / zsteg / PIL
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Intuitive Analogy */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#0a1116] border-l-4 border-cyan-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-cyan-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (How LSB Works)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              Every digital color is represented by numbers from <code>0</code> to <code>255</code> across Red, Green, and Blue. In binary, <code>254</code> is <code>11111110</code> and <code>255</code> is <code>11111111</code>. The human eye cannot tell the difference between shade 254 and shade 255. By flipping only the very last bit (the <strong>Least Significant Bit</strong>) of each pixel, an attacker can secretly store millions of secret binary 1s and 0s directly inside the image without modifying the visible picture!
            </p>
          </div>
        </div>

        {/* Section 2: Standard Forensic Checklist */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. The 5-Step Image Forensics Methodology
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Whenever investigating an image in a CTF or incident response investigation, follow this ordered testing pipeline:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-xl">
            <pre className="leading-relaxed">
{`[Image File: buildings.png]
     │
     ├── Step 1: Magic Header Check (Verify 89 50 4E 47 ...) ─────────> VALID
     ├── Step 2: Metadata Inspection (ExifTool author/comments) ───────> CLEAN
     ├── Step 3: Plaintext Strings (Check appended EOF strings) ───────> NONE
     ├── Step 4: Signature Carving (Binwalk / Foremost for ZIPs) ──────> NONE
     └── Step 5: LSB Steganography (zsteg / StegSolve / PIL) ─────────> 🎯 TARGET IDENTIFIED`}
            </pre>
          </div>
        </div>

        {/* Section 3: METHOD A - MANUAL & GUI ANALYSIS */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-cyan-500/30 pb-4">
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: MANUAL &amp; GUI STEGANOGRAPHY ANALYSIS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              2. Inspecting Bit-Planes (Aperi&apos;Solve, StegSolve, zsteg)
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              How to manually extract the secret payload using specialized stego utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tool 1: Aperi'Solve */}
            <div className="bg-[#0a1116] border border-cyan-500/40 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-cyan-400 uppercase">1. Aperi&apos;Solve (Web Platform)</span>
                <span className="text-xs font-mono text-zinc-500">GUI Online</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
                1. Navigate to <a href="https://www.aperisolve.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-mono">aperisolve.com</a>.<br />
                2. Upload <code>buildings.png</code>.<br />
                3. Scroll down to the <strong>zsteg Analysis</strong> section.<br />
                4. Notice the detected cleartext string:
              </p>
              <div className="p-3 bg-black rounded-lg border border-cyan-500/30 font-mono text-xs text-cyan-300">
                b1,rgb,lsb,xy .. text: &quot;picoCTF&#123;h1d1ng_1n_th3_b1t5&#125;&quot;
              </div>
            </div>

            {/* Tool 2: zsteg CLI */}
            <div className="bg-[#0a1116] border border-cyan-500/40 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-cyan-400 uppercase">2. zsteg (CLI Tool)</span>
                <span className="text-xs font-mono text-zinc-500">Terminal</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
                Run <code>zsteg</code> to test all permutation combinations (RGB/BGR, MSB/LSB, 1-bit to 8-bit):
              </p>
              <div className="p-3 bg-black rounded-lg border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                <div className="text-zinc-500">$ zsteg buildings.png</div>
                <div className="text-emerald-400">b1,rgb,lsb,xy .. text: &quot;picoCTF&#123;h1d1ng_1n_th3_b1t5&#125;&quot;</div>
              </div>
            </div>

          </div>

          {/* Breakdown of zsteg syntax */}
          <div className="bg-[#080d11] border border-zinc-800 rounded-xl p-5 space-y-2 font-mono text-xs">
            <div className="text-cyan-400 font-bold uppercase">Decoding the parameter `b1,rgb,lsb,xy`:</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-zinc-300 pt-2">
              <div className="p-2 bg-black rounded border border-zinc-800">
                <strong className="text-white block">b1</strong>
                1 bit per color channel
              </div>
              <div className="p-2 bg-black rounded border border-zinc-800">
                <strong className="text-white block">rgb</strong>
                Order: Red &rarr; Green &rarr; Blue
              </div>
              <div className="p-2 bg-black rounded border border-zinc-800">
                <strong className="text-white block">lsb</strong>
                Least Significant Bit (bit 0)
              </div>
              <div className="p-2 bg-black rounded border border-zinc-800">
                <strong className="text-white block">xy</strong>
                Left-to-right, row-by-row
              </div>
            </div>
          </div>

          {/* Hands-on Bit Table */}
          <div className="space-y-3 pt-2">
            <h4 className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Step-by-Step Bit Assembly (How the first 4 characters are born):
            </h4>
            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#090a0d]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#12161b] text-cyan-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Character</th>
                    <th className="p-3">8 Extracted Bits (R, G, B channels)</th>
                    <th className="p-3">Binary to Decimal</th>
                    <th className="p-3 text-right">ASCII Letter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-2.5 font-bold text-cyan-400">Byte 0</td><td className="p-2.5">0 1 1 1 0 0 0 0</td><td className="p-2.5">112</td><td className="p-2.5 text-right font-bold text-cyan-300 text-sm">&apos;p&apos;</td></tr>
                  <tr><td className="p-2.5 font-bold text-cyan-400">Byte 1</td><td className="p-2.5">0 1 1 0 1 0 0 1</td><td className="p-2.5">105</td><td className="p-2.5 text-right font-bold text-cyan-300 text-sm">&apos;i&apos;</td></tr>
                  <tr><td className="p-2.5 font-bold text-cyan-400">Byte 2</td><td className="p-2.5">0 1 1 0 0 0 1 1</td><td className="p-2.5">99</td><td className="p-2.5 text-right font-bold text-cyan-300 text-sm">&apos;c&apos;</td></tr>
                  <tr><td className="p-2.5 font-bold text-cyan-400">Byte 3</td><td className="p-2.5">0 1 1 0 1 1 1 1</td><td className="p-2.5">111</td><td className="p-2.5 text-right font-bold text-cyan-300 text-sm">&apos;o&apos;</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Section 4: METHOD B - AUTOMATED PYTHON SCRIPT & ONELINER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-cyan-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: CUSTOM PYTHON SOLVER &amp; ONELINER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                3. Pure Python LSB Bit Decoder (`solve.py`)
              </h2>
            </div>
            <CopyButton text={pythonScript} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Understanding the math behind LSB lets you write custom extractors with zero external stego tools using Python and the standard <code>PIL</code> (Pillow) library:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>

          {/* Terminal One-liner */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase">⚡ Terminal One-Liner (PowerShell / Bash):</span>
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
            4. Recovered Flag &amp; Verification
          </h2>

          <div className="bg-[#050508] border border-cyan-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Extracted Flag Payload:</p>
            <div className="inline-block bg-black border border-cyan-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-cyan-300 font-bold shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              picoCTF&#123;h1d1ng_1n_th3_b1t5&#125;
            </div>
            <p className="text-xs text-zinc-400 font-mono italic">
              (Literal meaning: &ldquo;hiding in the bits&rdquo; &mdash; a direct reference to LSB stego encoding).
            </p>
          </div>
        </div>

        {/* Section 6: Key Takeaways Reference Table */}
        <div className="space-y-4 mb-12">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            5. Steganography Tool Reference Matrix
          </h3>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121217] text-cyan-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Tool</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">Aperi&apos;Solve</td>
                  <td className="p-3 text-cyan-300">Web Browser</td>
                  <td className="p-3 text-zinc-400">Automated all-in-one suite running zsteg, steghide, exiftool, and binwalk simultaneously.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">zsteg</td>
                  <td className="p-3 text-cyan-300">Ruby CLI</td>
                  <td className="p-3 text-zinc-400">Gold-standard command-line tool for detecting LSB encoding in PNG and BMP formats.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">StegSolve</td>
                  <td className="p-3 text-cyan-300">Java Desktop</td>
                  <td className="p-3 text-zinc-400">Visual plane-by-plane inspection (Red 0, Green 0, Blue 0, Inverted bitplanes).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7: The Complete Investigation Path & Mental Roadmap */}
        <div className="bg-[#07131a] border border-cyan-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              6. The Complete Investigation Path &amp; Mental Roadmap
            </h3>
          </div>
          
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Here is the step-by-step mental roadmap followed to systematically uncover the payload:
          </p>

          <div className="space-y-4 font-mono text-xs text-zinc-300">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
              <div>
                <strong className="text-white block text-sm mb-1">Image Triage &amp; Metadata Inspection</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Downloaded <code>buildings.png</code>. Ran <code>exiftool</code> and <code>strings</code> to check for easy plain text comments or appended trailers. Results returned clean.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
              <div>
                <strong className="text-white block text-sm mb-1">Embedded File Carving</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Executed <code>binwalk -e buildings.png</code> to check if another archive or executable was concatenated inside the file. No hidden archives were found.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
              <div>
                <strong className="text-white block text-sm mb-1">Bitplane Stego Detection with zsteg / Aperi&apos;Solve</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Uploaded image to Aperi&apos;Solve and ran <code>zsteg buildings.png</code>. The scanner instantly identified ASCII flag text hiding on the 1-bit RGB LSB layer (<code>b1,rgb,lsb,xy</code>).
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
              <div>
                <strong className="text-white block text-sm mb-1">Algorithmic Verification via Python PIL</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Wrote a standalone <code>PIL</code> bitmask extractor script to independently verify the bit extraction math without relying on black-box tools.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-cyan-500/40">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 5</span>
              <div>
                <strong className="text-white block text-sm mb-1">Flag Capture</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Recovered the secret flag: <code>picoCTF&#123;h1d1ng_1n_th3_b1t5&#125;</code>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </article>
    </div>
  );
}
