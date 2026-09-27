import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "u cut me off: PNG IHDR Height Tampering & CRC32 Repair | SunshineCTF 2026",
  description: "Forensic analysis of a cropped Discord screenshot in SunshineCTF. Calculating scanline byte counts from decompressed IDAT streams, identifying hidden image height, patching IHDR dimensions in hex, and recalculating CRC32.",
};

export default function UCutMeOffWriteup() {
  const pythonScript = `import struct, zlib

with open('hereyougo.png', 'rb') as f:
    data = bytearray(f.read())

# Correct height is 418 px (0x01A2) at offset 0x14 (byte 20)
struct.pack_into('>I', data, 20, 418)

# Recalculate CRC32 for IHDR chunk (offset 12 to 29)
new_crc = zlib.crc32(data[12:29]) & 0xFFFFFFFF
struct.pack_into('>I', data, 29, new_crc)

with open('recovered.png', 'wb') as f:
    f.write(data)

print("[+] Successfully repaired IHDR height and CRC!")`;

  const flagText = "sun{totallyoriginalchallengeidea}";

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-pink-500/30 selection:text-pink-200">
      
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
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-pink-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-pink-400 uppercase tracking-[0.3em]">
              SUNSHINECTF 2026 • FORENSICS • IMAGE STEGANOGRAPHY
              <span className="animate-blink inline-block w-1.5 h-3 bg-pink-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            u cut me off: PNG IHDR Height Tampering &amp; CRC32 Repair
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span className="text-pink-400">SunshineCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET FILE</span>
              <span className="text-white font-bold">hereyougo.png</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">HEADER HEIGHT</span>
              <span className="text-rose-400 font-bold">382 px (0x017E)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">REAL HEIGHT</span>
              <span className="text-emerald-400 font-bold">418 px (0x01A2)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">sun&#123;totallyorigi...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/sunshine/recovered_flag.png"
            alt="Recovered Discord message showing the flag"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Recovered PNG Revealing Hidden Discord Chat Input</span>
            <span className="text-pink-400 font-bold">+36 Pixels Restored</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-pink-400">01.</span> Challenge Overview &amp; PNG Structure
            </h2>
            <p className="mb-4">
              We received a single image named <code className="text-pink-300 bg-pink-950/40 px-1.5 py-0.5 rounded border border-pink-500/20">hereyougo.png</code> depicting a Discord chat. The message prompt at the bottom was abruptly truncated. Combined with the challenge title, this pointed directly to <strong>IHDR height tampering</strong>—a classic steganography technique where the displayed height in the file header is made smaller than the actual compressed image scanlines stored in the <code className="text-zinc-200">IDAT</code> chunk.
            </p>

            <div className="relative w-full aspect-[492/382] max-w-xl mx-auto rounded-2xl overflow-hidden border border-zinc-800/80 my-6 shadow-xl group bg-black">
              <Image
                src="/images/sunshine/hereyougo.png"
                alt="Original cropped hereyougo.png showing truncated message input"
                fill
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>ORIGINAL FILE: hereyougo.png (Truncated at bottom)</span>
                <span className="text-rose-400 font-bold">492 &times; 382 px</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-pink-400">02.</span> Scanline Derivation from Decompressed IDAT
            </h2>
            <p className="mb-4">
              In a non-interlaced RGBA PNG (color type 6, 8-bit depth), each scanline consists of 1 filter byte followed by 4 bytes per pixel:
            </p>
            <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl font-mono text-sm text-zinc-300 mb-6">
              Bytes per scanline = 1 + (Width &times; 4) = 1 + (492 &times; 4) = 1969 bytes
            </div>
            <p className="mb-4">
              Decompressing the raw <code className="text-zinc-200">IDAT</code> chunk data using Python gives:
            </p>
            <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl font-mono text-sm text-zinc-300 mb-6">
              Total Decompressed Bytes = 823,042 bytes<br />
              Actual Scanlines = 823,042 / 1,969 = <span className="text-emerald-400 font-bold">418 rows</span>
            </div>
            <p>
              The original header declared only <strong className="text-rose-400">382 rows</strong> (<code className="text-zinc-300">0x017E</code>). Exactly 36 scanlines were hidden in plain sight.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-pink-400">03.</span> Hex Modification &amp; CRC32 Patching
            </h2>
            <p className="mb-4">
              Opening the file in a hex editor (HxD / ImHex):
            </p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-sm font-mono border-collapse border border-zinc-800 bg-[#0d0d12] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                    <th className="p-3">Field</th>
                    <th className="p-3">Offset</th>
                    <th className="p-3">Original Hex</th>
                    <th className="p-3">Patched Hex</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-white">Height</td>
                    <td className="p-3">0x14 - 0x17</td>
                    <td className="p-3 text-rose-400">00 00 01 7E (382)</td>
                    <td className="p-3 text-emerald-400">00 00 01 A2 (418)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">IHDR CRC32</td>
                    <td className="p-3">0x1D - 0x20</td>
                    <td className="p-3 text-rose-400">40 84 29 28</td>
                    <td className="p-3 text-emerald-400">25 78 F5 7C</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <details className="group bg-[#0e0e13] border border-zinc-800 rounded-xl overflow-hidden my-6">
              <summary className="p-4 cursor-pointer font-mono text-sm text-pink-400 hover:text-pink-300 flex items-center justify-between list-none">
                <span>[ Python 1-Click Solver Script ]</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 pt-0 border-t border-zinc-800/60 bg-[#09090d]">
                <div className="relative mt-3">
                  <CopyButton text={pythonScript} />
                  <pre className="p-4 rounded-lg bg-black/60 font-mono text-xs overflow-x-auto text-zinc-300">
                    {pythonScript}
                  </pre>
                </div>
              </div>
            </details>
          </section>

          {/* Flag Section */}
          <section className="pt-6 border-t border-zinc-800/80">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4">
              04. Flag Recovery
            </h2>
            <p className="mb-4 text-zinc-300">
              Opening the repaired image reveals the full Discord input bar with the uncropped flag:
            </p>

            <div className="relative w-full aspect-[492/418] max-w-xl mx-auto rounded-2xl overflow-hidden border border-zinc-800/80 mb-6 shadow-2xl group bg-black">
              <Image
                src="/images/sunshine/recovered_flag.png"
                alt="Repaired PNG showing the uncropped flag in the Discord chat prompt"
                fill
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>RECOVERED FILE: recovered.png (Uncropped Flag Revealed)</span>
                <span className="text-emerald-400 font-bold">492 &times; 418 px (+36 px)</span>
              </div>
            </div>

            <div className="relative bg-[#0d1217] border border-emerald-500/40 rounded-xl p-5 shadow-[0_0_25px_rgba(16,185,129,0.15)] flex justify-between items-center">
              <span className="font-mono text-lg md:text-xl text-emerald-400 font-bold tracking-wider">
                {flagText}
              </span>
              <CopyButton text={flagText} />
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
