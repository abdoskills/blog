import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFWhatLiesWithinWriteup() {
  const pythonScript = `from PIL import Image

img = Image.open('buildings.png')
pixels = img.load()
width, height = img.size

bits = []
for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y][:3]
        bits.append(r & 1)
        bits.append(g & 1)
        bits.append(b & 1)

# Group bits into 8-bit ASCII characters
byte_list = []
for i in range(0, len(bits), 8):
    byte_bits = bits[i:i+8]
    if len(byte_bits) == 8:
        val = 0
        for b in byte_bits:
            val = (val << 1) | b
        byte_list.append(val)

extracted_text = bytes(byte_list).decode('latin1', errors='ignore')

if "picoCTF{" in extracted_text:
    flag = extracted_text[extracted_text.index("picoCTF{"):extracted_text.index("}")+1]
    print("🎉 Extracted Flag:", flag)`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
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
        <div className="bg-[#0e161c]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-10 backdrop-blur-md">
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
                <span>● <strong>Category:</strong> Steganography</span>
                <span>● <strong>Points:</strong> 150 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#060c10] border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided File
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  buildings.png
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 625 KB • PNG Image</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Encoding: RGB 8-bit/color</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 text-center truncate">
                Method: LSB Extraction
              </div>
            </div>
          </div>
        </div>

        {/* Beginner Analogy */}
        <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#0d1318] border-l-4 border-cyan-500 p-5 rounded-r-xl shadow-md">
            <h4 className="text-cyan-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Every color in an image is made of Red, Green, and Blue numbers from 0 to 255. If a red pixel is changed from <code>254</code> to <code>255</code>, the human eye cannot perceive any difference. By changing the very last bit (the 1s and 0s) across thousands of pixels, an attacker can secretly spell out an entire confidential text document without altering the visible picture!
            </p>
          </div>
        </div>

        {/* Methodology Flow */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. Image Stego Forensic Checklist
          </h2>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`[Image File] 
     │
     ├── 1. File Magic Header (89 50 4E 47 ...)
     ├── 2. ExifTool Metadata Inspection (Author, Copyright, Comments)
     ├── 3. Strings Analysis (Appended payloads after IEND)
     ├── 4. Binwalk / Foremost (Concatenated archives / zip files)
     └── 5. LSB Steganography (zsteg / Aperi'Solve)  <-- Target Identified`}
            </pre>
          </div>
        </div>

        {/* Investigation Tools */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            2. Solving via Aperi'Solve & zsteg
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="bg-[#0a1116] border border-cyan-500/30 rounded-xl p-4 space-y-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">Aperi'Solve Analysis</span>
              <p className="text-zinc-400 font-sans text-xs">Upload <code>buildings.png</code> to Aperi'Solve and inspect zsteg report.</p>
              <div className="p-3 bg-black rounded border border-zinc-800 text-zinc-300">
                <code>b1,rgb,lsb,xy .. text: "picoCTF&#123;h1d1ng_1n_th3_b1t5&#125;"</code>
              </div>
            </div>

            <div className="bg-[#0a1116] border border-cyan-500/30 rounded-xl p-4 space-y-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">CLI Command</span>
              <p className="text-zinc-400 font-sans text-xs">Run zsteg directly in terminal:</p>
              <div className="p-3 bg-black rounded border border-zinc-800 text-zinc-300">
                <code>$ zsteg buildings.png</code>
              </div>
            </div>
          </div>
        </div>

        {/* Python Solver Script */}
        <div className="space-y-4 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              3. Python LSB Extractor (`solve.py`)
            </h2>
            <CopyButton text={pythonScript} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>
        </div>

        {/* Flag Box */}
        <div className="bg-[#050508] border border-cyan-500/30 rounded-2xl p-6 text-center space-y-4">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Extracted Secret Flag:</p>
          <div className="inline-block bg-black border border-cyan-500/50 px-6 py-3 rounded-xl font-mono text-base md:text-lg text-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            picoCTF&#123;h1d1ng_1n_th3_b1t5&#125;
          </div>
        </div>

      </article>
    </div>
  );
}
