import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PicoCTFHub() {
  const challenges = [
    {
      title: "c0rrupt",
      slug: "picoctf-c0rrupt",
      category: "File Repair",
      points: "250 PTS",
      tagline: "PNG Specification & Hex Patching",
      description: "Fixing a broken PNG file byte-by-byte in a hex editor. Restoring missing magic headers, repairing IHDR and pHYs chunks, and calculating the exact IDAT length.",
      image: "/images/pico_c0rrupt.jpg",
      tags: ["HexEd.it / HxD", "pngcheck", "PNG Spec", "Python Bytearray"],
      time: "8 min read"
    },
    {
      title: "What Lies Within",
      slug: "picoctf-what-lies-within",
      category: "Steganography",
      points: "150 PTS",
      tagline: "LSB Bit-Plane Extraction",
      description: "Extracting secret text hidden inside the least significant bits of an RGB image using zsteg, Aperi'Solve, and a quick custom Python script.",
      image: "/images/pico_what_lies_within.jpg",
      tags: ["Aperi'Solve", "zsteg", "LSB Bit-Planes", "Python PIL"],
      time: "5 min read"
    },
    {
      title: "like1000",
      slug: "picoctf-like1000",
      category: "Automation",
      points: "250 PTS",
      tagline: "Russian Doll Nested Archives",
      description: "Extracting 1,000 nested TAR archives in seconds using a short Python loop with tarfile and automatic cleanup to get the flag.",
      image: "/images/pico_like1000.jpg",
      tags: ["Python tarfile", "TAR Archives", "Automation", "Garbage Collection"],
      time: "4 min read"
    },
    {
      title: "Shark on Wire 2",
      slug: "picoctf-shark-on-wire-2",
      category: "Network Forensics",
      points: "300 PTS",
      tagline: "Covert Channels & UDP Port Stego",
      description: "Finding secret data smuggled across UDP source port numbers. We filter the packets in Wireshark and decode ASCII characters by subtracting 5000 from each port.",
      image: "/images/pico_shark_on_wire_2.jpg",
      tags: ["Wireshark", "UDP Stream Triage", "Port Steganography", "Python struct"],
      time: "7 min read"
    },
    {
      title: "Investigative Reversing 0",
      slug: "picoctf-investigative-reversing-0",
      category: "Reverse Engineering",
      points: "300 PTS",
      tagline: "Trailing Appended Byte Math",
      description: "Decompiling a binary that appends altered characters right after the PNG IEND marker. We pull the trailing bytes in HxD and reverse the arithmetic shifts (+5 / -3).",
      image: "/images/pico_ir0.jpg",
      tags: ["Ghidra", "PNG IEND", "File Overlays", "Reverse Math"],
      time: "6 min read"
    },
    {
      title: "Investigative Reversing 1",
      slug: "picoctf-investigative-reversing-1",
      category: "Reverse Engineering",
      points: "350 PTS",
      tagline: "Multi-Image Overlay Jigsaw",
      description: "Reversing how a binary splits a 26-character flag across 3 separate PNG images. We carve the bytes past each IEND and put the jigsaw pieces back in place.",
      image: "/images/pico_investigative_reversing_1.jpg",
      tags: ["Ghidra", "Multi-Image Carving", "Jigsaw Assembly", "Python Solver"],
      time: "8 min read"
    },
    {
      title: "Investigative Reversing 2",
      slug: "picoctf-investigative-reversing-2",
      category: "Reverse Engineering",
      points: "350 PTS",
      tagline: "Bitmap LSB Deconstruction",
      description: "Reversing a custom BMP LSB encoder. Finding offset 2000, reading 8 LSB bits per character, and undoing the binary's +5 shift to recover the flag.",
      image: "/images/pico_ir2.jpg",
      tags: ["Ghidra", "Bitmap LSB", "HexEd.it", "Shift Inversion"],
      time: "7 min read"
    },
    {
      title: "Investigative Reversing 3",
      slug: "picoctf-investigative-reversing-3",
      category: "Reverse Engineering",
      points: "400 PTS",
      tagline: "9-Byte Stride & Dummy Filler",
      description: "Overcoming interleaved dummy bytes in BMP steganography. We spot the 9-byte stride pattern in Ghidra and write a Python script that ignores the filler byte.",
      image: "/images/pico_ir3.jpg",
      tags: ["Ghidra", "Stride Analysis", "Dummy Skipping", "Binary Decompilation"],
      time: "8 min read"
    },
    {
      title: "So Meta",
      slug: "picoctf-so-meta",
      category: "Image Metadata",
      points: "150 PTS",
      tagline: "EXIF & PNG Text Chunks",
      description: "Extracting the flag hidden directly inside an image's metadata text chunks using ExifTool, strings, and Python PIL.",
      image: "/images/pico_so_meta.jpg",
      tags: ["ExifTool", "strings", "PNG tEXt Chunks", "Python PIL"],
      time: "3 min read"
    },
    {
      title: "WhitePages",
      slug: "picoctf-whitepages",
      category: "Whitespace Stego",
      points: "250 PTS",
      tagline: "Unicode Invisible Demodulation",
      description: "Decoding a text file that looks completely blank. We analyze the raw bytes and map Unicode EM spaces and normal spaces into binary 0s and 1s.",
      image: "/images/pico_whitepages.jpg",
      tags: ["Format-Hex", "CyberChef", "Unicode Stego", "Binary Demodulation"],
      time: "5 min read"
    },
    {
      title: "Extensions",
      slug: "picoctf-extensions",
      category: "File Signatures",
      points: "150 PTS",
      tagline: "Magic Bytes & Header Triage",
      description: "Inspecting raw magic bytes on a misnamed text file, verifying that it is actually a PNG image, and changing the extension to view the flag.",
      image: "/images/pico_extensions.jpg",
      tags: ["Magic Bytes", "file", "Format-Hex", "File Signatures"],
      time: "3 min read"
    },
    {
      title: "m00nwalk",
      slug: "picoctf-m00nwalk",
      category: "Audio Forensics",
      points: "250 PTS",
      tagline: "Apollo 11 SSTV Demodulation",
      description: "Decoding an SSTV audio signal from the Apollo 11 moon mission. We play the audio into Robot36 or Python PySSTV to draw the secret image line-by-line.",
      image: "/images/pico_m00nwalk.jpg",
      tags: ["SSTV", "Scottie 1", "Audio Forensics", "Robot36 / PySSTV"],
      time: "6 min read"
    },
    {
      title: "Shark on Wire 1",
      slug: "picoctf-shark-on-wire-1",
      category: "Network Forensics",
      points: "150 PTS",
      tagline: "UDP Stream Follow & Decoy Triage",
      description: "Following UDP conversation streams in Wireshark, avoiding fake decoy flags, and pulling the real flag from Stream 5.",
      image: "/images/pico_shark_on_wire_1.jpg",
      tags: ["Wireshark", "UDP Stream Follow", "Decoy Trapping", "Scapy Reassembly"],
      time: "4 min read"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-6 pb-20">
        
        {/* Hub Header */}
        <div className="max-w-4xl mx-auto px-6 mb-14 text-center">
          <div className="mb-4 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS &amp; REVERSING
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] mb-4 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            PicoCTF Hub
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Detailed step-by-step writeups for all 13 forensics challenges from PicoCTF 2019. Every guide includes manual hex/Wireshark steps, Python scripts, and clean cheat sheets.
          </p>
        </div>

        {/* Category Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
              Forensics 2019
            </span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              All 13 Solved Challenges
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">13 Guides</span>
        </div>

        {/* 13 Challenge Cards Grid (Unified Dynamic Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 w-full">
          {challenges.map((c) => {
            return (
              <Link 
                key={c.slug}
                href={`/posts/${c.slug}`} 
                className="group relative bg-[#0e0e13]/90 rounded-2xl flex flex-col border theme-card transition-all duration-500 hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
              >
                <div className="relative w-full h-44 overflow-hidden bg-black/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/40 z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <Image 
                    src={c.image} 
                    alt={c.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] contrast-[1.15]" 
                    priority
                  />
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md border theme-badge font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      {c.category}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded-full">
                      {c.points}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow relative z-20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                      {c.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:theme-text transition-colors duration-300 font-[family-name:var(--font-share-tech)] uppercase tracking-wide">
                    {c.title}
                  </h3>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                    {c.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-auto pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 mb-3">
                    {c.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 text-[10px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                    <span>⏱ {c.time}</span>
                    <span className="theme-cta font-bold flex items-center gap-1 transition-colors">
                      Read Guide <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </main>
    </div>
  );
}
