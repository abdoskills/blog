import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "m00nwalk2: Audio Steganography & SSTV Puzzle Deconstruction | PicoCTF Forensics",
  description: "Comprehensive forensics writeup for PicoCTF m00nwalk2. Demodulating Slow Scan Television (SSTV) audio signals, correlating clue notes, and carving hidden payloads via steghide.",
};

export default function PicoCTFM00nwalk2Writeup() {
  const sstvCmd = `sstv -d clue1.wav -o clue1.png\nsstv -d clue2.wav -o clue2.png\nsstv -d clue3.wav -o clue3.png`;
  const steghideLinux = `steghide extract -sf message.wav -p hidden_stegosaurus\ncat steganopayload*.txt`;
  const steghidePowerShell = `steghide extract -sf message.wav -p hidden_stegosaurus\nGet-Content steganopayload*.txt`;

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
              PICOCTF 2019 • FORENSICS • AUDIO STEGANOGRAPHY
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            m00nwalk2: Audio Steganography &amp; SSTV Puzzle Deconstruction
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span className="text-cyan-400">PicoCTF 2019</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET AUDIO</span>
              <span className="text-white font-bold">message.wav</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">SSTV CLUES</span>
              <span className="text-cyan-400 font-bold">clue[1-3].wav</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">STEGO UTILITY</span>
              <span className="text-amber-400 font-bold">steghide 0.5.1</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">picoCTF&#123;the_answer...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_m00nwalk2.jpg"
            alt="Audio Steganography & SSTV Demodulation"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Multilayer Steganography in Space Transmissions</span>
            <span className="text-cyan-400 font-bold">SSTV Demodulation &amp; LSB Carving</span>
          </div>
        </div>

        {/* Official Challenge Prompt */}
        <div className="bg-[#0b1418]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Official Challenge Prompt
              </span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
              &ldquo;Re-visit the last scene. More clues, same tunes. The flag is not in the same place.&rdquo;
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span>● <strong>Category:</strong> Forensics / Audio Steganography</span>
              <span>● <strong>Platform:</strong> PicoCTF 2019</span>
              <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 font-sans space-y-12">

          {/* SECTION 1: THE SCENARIO */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                1. Dual-Layer Steganography Architecture
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              In <strong>m00nwalk 1</strong>, decoding <code className="text-white">message.wav</code> with an SSTV decoder directly rendered an image displaying the flag <code className="text-cyan-300">picoCTF&#123;beep_boop_im_in_space&#125;</code>.
            </p>

            <p className="text-sm leading-relaxed">
              In <strong>m00nwalk2</strong>, we are given four audio files: <code className="text-white">message.wav</code>, <code className="text-white">clue1.wav</code>, <code className="text-white">clue2.wav</code>, and <code className="text-white">clue3.wav</code>. If we decode <code className="text-white">message.wav</code> again, it merely presents the identical decoy picture. The real payload is hidden via a dual-layer scheme:
            </p>

            <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-400 space-y-1">
              <p><strong className="text-cyan-400">Layer 1 (Macro / Analog Signal):</strong> Audio frequency modulation decoded into raster SSTV images (Clues 1, 2, 3).</p>
              <p><strong className="text-amber-400">Layer 2 (Micro / Sample LSBs):</strong> Encrypted ciphertext injected into the uncompressed PCM audio bytes of message.wav via steghide.</p>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 2: DEMODULATING CLUES */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                2. Demodulating the Clues with SSTV
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              We process each audio clue through the command-line SSTV decoder:
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-amber-400 font-bold uppercase">⚡ Terminal Command:</span>
                <CopyButton text={sstvCmd} />
              </div>
              <div className="bg-black/70 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <pre><code>{sstvCmd}</code></pre>
              </div>
            </div>

            {/* Visual Grid of Decoded Clues */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Clue 1 */}
              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  CLUE 1: Passphrase
                </span>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 bg-black">
                  <Image 
                    src="/images/m00nwalk2/clue1.png" 
                    alt="Clue 1: Password hidden_stegosaurus" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Shows a stegosaurus note: <strong className="text-white">Password: hidden_stegosaurus</strong>.
                </p>
              </div>

              {/* Clue 2 */}
              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  CLUE 2: Environment
                </span>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 bg-black">
                  <Image 
                    src="/images/m00nwalk2/clue2.png" 
                    alt="Clue 2: The quieter you are, the more you can hear" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Official Kali Linux motto: <em className="text-white">&ldquo;The quieter you are, the more you can HEAR&rdquo;</em>.
                </p>
              </div>

              {/* Clue 3 */}
              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  CLUE 3: Tool
                </span>
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 bg-black">
                  <Image 
                    src="/images/m00nwalk2/clue3.png" 
                    alt="Clue 3: Alan Eliasen the FutureBoy" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-400 font-sans">
                  Names Alan Eliasen (creator of FutureBoy.us), whose steganography service runs on <strong className="text-white">steghide</strong>.
                </p>
              </div>

            </div>

            {/* Decoy Audio Note */}
            <div className="bg-black/50 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-zinc-800">
                <Image 
                  src="/images/m00nwalk2/result.png" 
                  alt="Decoy SSTV image from message.wav" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs text-zinc-400 space-y-1">
                <strong className="text-white block text-sm">Decoy Verification (result.png)</strong>
                <p>
                  Decoding <code className="text-cyan-300">message.wav</code> reveals the original decoy image with the m00nwalk 1 flag. This confirms the author&apos;s hint: the true flag is embedded elsewhere within the carrier file.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 3: EXTRACTING WITH STEGHIDE */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                3. Carving Hidden LSB Data with Steghide
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Uncompressed 16-bit WAV files store sample amplitudes ranging from -32,768 to +32,767. <code className="text-white">steghide</code> encrypts the payload with our passphrase (<code className="text-emerald-400">hidden_stegosaurus</code>) and alters the Least Significant Bit (LSB) of pseudo-randomly selected audio samples. This tiny alteration is completely inaudible to humans and invisible to SSTV demodulators.
            </p>

            {/* Terminal Commands */}
            <div className="space-y-4">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase">🐧 Linux / Kali CLI:</span>
                  <CopyButton text={steghideLinux} />
                </div>
                <div className="bg-black/70 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre><code>{steghideLinux}</code></pre>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-cyan-400 font-bold uppercase">🪟 Windows PowerShell:</span>
                  <CopyButton text={steghidePowerShell} />
                </div>
                <div className="bg-black/70 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre><code>{steghidePowerShell}</code></pre>
                </div>
              </div>

            </div>

            {/* Terminal Output */}
            <div className="p-4 bg-black/80 border border-zinc-800 rounded-xl font-mono text-xs space-y-1 text-zinc-400">
              <p className="text-zinc-500"># steghide execution output</p>
              <p>wrote extracted data to &quot;steganopayload12154.txt&quot;.</p>
              <p className="text-emerald-400 font-bold pt-2">picoCTF&#123;the_answer_lies_hidden_in_plain_sight&#125;</p>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 4: THE FLAG */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
              4. Extracted Flag
            </h2>

            <div className="bg-[#050508] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Decrypted Secret Flag:</p>
              <div className="inline-block bg-black border border-emerald-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-emerald-300 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                picoCTF&#123;the_answer_lies_hidden_in_plain_sight&#125;
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 5: SUMMARY MATRIX */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
              5. Summary Matrix
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded-xl overflow-hidden">
                <thead className="bg-[#0e0e13] text-zinc-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Step</th>
                    <th className="p-3">Objective</th>
                    <th className="p-3">Tool</th>
                    <th className="p-3">Exact Command</th>
                    <th className="p-3">Key Finding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  <tr className="hover:bg-zinc-900/50">
                    <td className="p-3 text-cyan-400 font-bold">1</td>
                    <td className="p-3">Demodulate Clue 1</td>
                    <td className="p-3 font-sans">sstv</td>
                    <td className="p-3 font-mono text-[11px]">sstv -d clue1.wav -o clue1.png</td>
                    <td className="p-3 text-emerald-400">hidden_stegosaurus</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50">
                    <td className="p-3 text-cyan-400 font-bold">2</td>
                    <td className="p-3">Demodulate Clue 2</td>
                    <td className="p-3 font-sans">sstv</td>
                    <td className="p-3 font-mono text-[11px]">sstv -d clue2.wav -o clue2.png</td>
                    <td className="p-3 text-amber-400">Kali Linux Stego Suite</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50">
                    <td className="p-3 text-cyan-400 font-bold">3</td>
                    <td className="p-3">Demodulate Clue 3</td>
                    <td className="p-3 font-sans">sstv</td>
                    <td className="p-3 font-mono text-[11px]">sstv -d clue3.wav -o clue3.png</td>
                    <td className="p-3 text-cyan-400">FutureBoy =&gt; steghide</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50">
                    <td className="p-3 text-cyan-400 font-bold">4</td>
                    <td className="p-3">Carve Payload</td>
                    <td className="p-3 font-sans">steghide</td>
                    <td className="p-3 font-mono text-[11px]">steghide extract -sf message.wav -p ...</td>
                    <td className="p-3 text-emerald-400">steganopayload12154.txt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

      </article>
    </div>
  );
}
