import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFWhitePagesWriteup() {
  const pythonScript = `# Read the raw UTF-8 whitespace characters
with open('whitepages.txt', 'rb') as f:
    raw = f.read()

# Decode UTF-8 string
text = raw.decode('utf-8')

# Map EM SPACE (\\u2003) -> 0 and ASCII SPACE (' ') -> 1
binary_str = text.replace('\\u2003', '0').replace(' ', '1')

# Convert 8-bit binary chunks into ASCII bytes
flag_bytes = bytes([
    int(binary_str[i:i+8], 2) 
    for i in range(0, len(binary_str) - len(binary_str) % 8, 8)
])

print("🎉 Decoded Flag:")
print(flag_bytes.decode('utf-8', errors='ignore'))`;

  const oneliner = `python -c "t=open('whitepages.txt','rb').read().decode('utf-8').replace('\\u2003','0').replace(' ','1'); print(bytes([int(t[i:i+8],2) for i in range(0,len(t)-len(t)%8,8)]).decode('utf-8',errors='ignore'))"`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • WHITESPACE STEGANOGRAPHY
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            WhitePages: Unicode Whitespace Steganography &amp; Binary Demodulation
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_whitepages.jpg" 
                alt="WhitePages Analysis"
                fill
                className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#0b1814]/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Official Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;I stop and consider the numbers... I look at the white page and I find nothing.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Forensics / Whitespace Stego</span>
                <span>● <strong>Points:</strong> 250 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#050c0a] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided File (Download &amp; Practice)
                </span>
                <a 
                  href="/downloads/whitepages.txt" 
                  download="whitepages.txt"
                  className="flex items-center gap-2 text-emerald-300 hover:text-white font-mono text-sm font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>⬇️ Download whitepages.txt</span>
                </a>
                <span className="text-[11px] font-mono text-zinc-400 block mt-2">Size: 2,770 Bytes • UTF-8 Text</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center truncate">
                Method: Invisible Spaces $\rightarrow$ Binary
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Intuitive Analogy */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#07130e] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (Invisible Ink with Wide &amp; Narrow Spaces)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              If someone hands you a piece of paper that looks totally blank, you might think it has no information. But if you look under a microscope, you notice the document is filled with thousands of spaces: some are normal narrow spaces (<code>0x20</code>), and some are extra-wide Unicode &ldquo;EM Spaces&rdquo; (<code>\u2003</code>). Because there are exactly two types of spaces, they form a secret binary code: <strong>Wide = 0</strong>, <strong>Narrow = 1</strong>!
            </p>
          </div>
        </div>

        {/* Section 2: Hex & Byte Analysis */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-emerald-500/30 pb-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              HEX DUMP &amp; BYTE IDENTIFICATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              1. Inspecting the 2,770 Bytes
            </h2>
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Running <code>Format-Hex</code> reveals the entire 2.7 KB file consists of only two repeating UTF-8 byte sequences:
          </p>

          <div className="p-4 bg-[#050508] border border-zinc-800 rounded-xl font-mono text-xs text-zinc-300 overflow-x-auto">
            <pre><code>{`00000000   E2 80 83 E2 80 83 E2 80 83 E2 80 83 20 E2 80 83  ............ ...
00000010   20 E2 80 83 E2 80 83 20 20 20 E2 80 83 E2 80 83   ....   ....`}</code></pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black border border-emerald-500/30">
              <span className="text-emerald-400 font-bold block mb-1">Character 1: U+2003 (EM Space)</span>
              <p className="text-zinc-400">Bytes: <code>E2 80 83</code> &rarr; Mapped to Binary <strong>0</strong></p>
            </div>
            <div className="p-3 rounded-xl bg-black border border-emerald-500/30">
              <span className="text-emerald-400 font-bold block mb-1">Character 2: 0x20 (ASCII Space)</span>
              <p className="text-zinc-400">Bytes: <code>20</code> &rarr; Mapped to Binary <strong>1</strong></p>
            </div>
          </div>
        </div>

        {/* Section 3: METHOD B - AUTOMATED PYTHON SCRIPT & ONELINER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-emerald-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: AUTOMATED PYTHON PARSER &amp; ONELINER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                2. Automated Extraction Script (`solve.py`)
              </h2>
            </div>
            <CopyButton text={pythonScript} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase">⚡ Terminal One-Liner (PowerShell / Bash):</span>
              <CopyButton text={oneliner} />
            </div>
            <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
              <code>{oneliner}</code>
            </div>
          </div>
        </div>

        {/* Section 4: Decoded Flag Box */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            3. Decoded Flag
          </h2>

          <div className="bg-[#050508] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Extracted Secret Flag:</p>
            <div className="inline-block bg-black border border-emerald-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-emerald-300 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)] break-all">
              picoCTF&#123;not_all_spaces_are_created_equal_f6166971531e3ad3b35138611330bba8&#125;
            </div>
          </div>
        </div>

        {/* Section 5: The Complete Investigation Path & Mental Roadmap */}
        <div className="bg-[#081510] border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              4. The Complete Investigation Path &amp; Mental Roadmap
            </h3>
          </div>
          
          <div className="space-y-4 font-mono text-xs text-zinc-300">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
              <div>
                <strong className="text-white block text-sm mb-1">File Size vs Visual Discrepancy</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Observed that <code>whitepages.txt</code> appeared visually empty in text editors despite having a file size of 2,770 bytes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
              <div>
                <strong className="text-white block text-sm mb-1">Hex Signature &amp; Unicode Analysis</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Inspected raw bytes and identified exactly two distinct symbols: <code>0xE2 0x80 0x83</code> (EM Space) and <code>0x20</code> (Standard Space).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-emerald-500/40">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
              <div>
                <strong className="text-white block text-sm mb-1">Binary Demodulation &amp; Flag Recovery</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Mapped the two whitespace characters to binary 0 and 1, grouped into 8-bit ASCII bytes, and extracted the flag: <code>picoCTF&#123;not_all_spaces_are_created_equal_...&#125;</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
