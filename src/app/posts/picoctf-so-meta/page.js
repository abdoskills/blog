import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFSoMetaWriteup() {
  const pythonScript = `from PIL import Image

# Open the image file using PIL
img = Image.open('pico_img.png')

# Extract PNG metadata text chunks
flag = img.info.get('Artist')
print("🎉 Extracted Artist Tag Flag:", flag)`;

  const oneliner = `python -c "from PIL import Image; print(Image.open('pico_img.png').info.get('Artist'))"`;

  const stringsCommand = `strings pico_img.png | grep -i "picoCTF"`;

  const exiftoolCommand = `exiftool pico_img.png`;

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
              PICOCTF 2019 • FORENSICS • IMAGE METADATA
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            So Meta: EXIF &amp; PNG Text Chunk Metadata Carving
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_so_meta.jpg" 
                alt="So Meta Analysis"
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
                &ldquo;Find the flag in this picture. Look beyond the pixels.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Forensics / Image Metadata</span>
                <span>● <strong>Points:</strong> 150 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#050c0a] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided File (Download &amp; Practice)
                </span>
                <a 
                  href="/downloads/so_meta_result.png" 
                  download="pico_img.png"
                  className="flex items-center gap-2 text-emerald-300 hover:text-white font-mono text-sm font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>⬇️ Download pico_img.png</span>
                </a>
                <span className="text-[11px] font-mono text-zinc-400 block mt-2">Size: 108 KB • PNG Image</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center truncate">
                Target: PNG tEXt Chunk (Artist)
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Intuitive Analogy */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#07130e] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (The Photographer&apos;s Stamp)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              When a painter finishes a masterpiece, they sign their signature at the bottom corner of the frame. In digital photos, cameras and graphic editors embed metadata &ldquo;stamps&rdquo; into the file (such as Camera Model, Timestamp, and Artist Name). The title &ldquo;So Meta&rdquo; is a direct hint to check the image&apos;s metadata chunks before trying complex pixel steganography!
            </p>
          </div>
        </div>

        {/* Section 2: METHOD A - COMMAND LINE TOOLS */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-emerald-500/30 pb-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: HANDS-ON CLI FORENSICS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              1. Extracting Metadata via ExifTool &amp; Strings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>Option 1: ExifTool</span>
                <CopyButton text={exiftoolCommand} />
              </div>
              <pre className="text-zinc-300"><code>{`$ exiftool pico_img.png
File Name   : pico_img.png
File Type   : PNG
Software    : Adobe ImageReady
Artist      : picoCTF{s0_m3ta_74af23ab}`}</code></pre>
            </div>

            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>Option 2: Strings &amp; Grep</span>
                <CopyButton text={stringsCommand} />
              </div>
              <pre className="text-zinc-300"><code>{`$ strings pico_img.png | grep "picoCTF"
picoCTF{s0_m3ta_74af23ab}`}</code></pre>
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
            <div className="inline-block bg-black border border-emerald-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-emerald-300 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              picoCTF&#123;s0_m3ta_74af23ab&#125;
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
                <strong className="text-white block text-sm mb-1">Title &amp; Challenge Clue Triage</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Recognized &ldquo;So Meta&rdquo; as a direct hint toward metadata structures (EXIF / XMP / PNG text chunks).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
              <div>
                <strong className="text-white block text-sm mb-1">Metadata Inspection</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Ran <code>exiftool</code> and <code>strings</code> to dump all non-pixel text records embedded in the PNG.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-emerald-500/40">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
              <div>
                <strong className="text-white block text-sm mb-1">Flag Extraction</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Found the flag stored inside the <code>Artist</code> chunk: <code>picoCTF&#123;s0_m3ta_74af23ab&#125;</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
