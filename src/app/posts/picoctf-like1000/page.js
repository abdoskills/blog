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

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-amber-500/30 selection:text-amber-200">
      
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
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-amber-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • ARCHIVE AUTOMATION
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            like1000: Automated Recursive TAR Decompression
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
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

        {/* Challenge Overview Card */}
        <div className="bg-[#1a160e]/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 shadow-[0_0_15px_#fbbf24]"></div>
          <h3 className="text-amber-400 font-mono text-sm uppercase tracking-widest font-bold mb-2">
            🎯 Mission Objective
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            We are given a 10MB archive named <code>1000.tar</code>. Extracting it produces <code>999.tar</code> and a dummy text file. This repeats 1,000 times like a Russian Matryoshka doll. We must automate the unpacking and cleanup process to retrieve <code>flag.png</code>.
          </p>
          <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
            <span>● <strong>Category:</strong> Forensics / Scripting</span>
            <span>● <strong>Points:</strong> 250 PTS</span>
            <span>● <strong>Flag:</strong> <code>picoCTF&#123;l0t5_0f_tar5&#125;</code></span>
          </div>
        </div>

        {/* Beginner Breakdown */}
        <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#13110a] border-l-4 border-amber-500 p-5 rounded-r-xl shadow-md">
            <h4 className="text-amber-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Think of wrapping a birthday present inside 1,000 gift boxes, one inside the other. Opening them one by one by hand would take 3 hours and clutter your room with cardboard. Instead, we write a 10-line Python robot that unboxes each layer and recycles the empty box in under 3 seconds!
            </p>
          </div>
        </div>

        {/* Python Solver Script */}
        <div className="space-y-4 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              1. Automated Python Solver (`solve.py`)
            </h2>
            <CopyButton text={pythonScript} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>
        </div>

        {/* Extracted Output & Flag */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            2. Extracted Flag Image
          </h2>

          <div className="bg-[#050508] border border-amber-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Extracted Image Output (flag.png):</p>
            <div className="relative w-full max-w-sm mx-auto h-32 rounded-xl overflow-hidden border border-zinc-800 bg-black">
              <Image 
                src="/images/pico_like1000_flag.png" 
                alt="like1000 Flag Image"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="inline-block bg-black border border-amber-500/50 px-6 py-3 rounded-xl font-mono text-base md:text-lg text-amber-300 font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              picoCTF&#123;l0t5_0f_tar5&#125;
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
