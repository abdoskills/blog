import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "B1g_Mac: Anti-Forensic Timestomping & NTFS Extra Field Carving | PicoCTF Forensics",
  description: "Complete multi-method breakdown of PicoCTF B1g_Mac: Fast Track one-liner, beginner-friendly step-by-step, terminal CLI scripts, GUI hex inspection, Ghidra binary decompilation, and real-world DFIR timestomp detection.",
};

export default function PicoCTFB1gMacWriteup() {
  const onelinerFast = `python -c "import zipfile, struct; z=zipfile.ZipFile('b1g_mac.zip'); print(''.join(chr((m&0xffff)>>8)+chr(m&0xff) for m in [struct.unpack('<Q', f.extra[12:20])[0] for f in z.infolist() if ' - Copy.bmp' in f.filename]))"`;

  const pythonDetailedScript = `import zipfile
import struct

# Open evidence container preserving raw 64-bit NTFS Extra Fields
zip_path = "b1g_mac.zip"
flag_chars = []

print(f"{'Target File':<26} | {'Raw Mtime':<18} | {'Low 16-bit':<10} | {'Decoded'}")
print("-" * 68)

with zipfile.ZipFile(zip_path, "r") as z:
    for info in z.infolist():
        # Adversary's alternating toggle processed only '- Copy.bmp'
        if " - Copy.bmp" in info.filename:
            # Tag 0x000A layout: Offset 12:20 holds 8-byte LE Modification Time (Mtime)
            mtime = struct.unpack("<Q", info.extra[12:20])[0]
            low16 = mtime & 0xFFFF
            
            # Big-endian character unpacking: (byte1 << 8) | byte2
            c1 = chr((low16 >> 8) & 0xFF)
            c2 = chr(low16 & 0xFF)
            chunk = c1 + c2
            flag_chars.append(chunk)
            
            print(f"{info.filename:<26} | 0x{mtime:016x} | 0x{low16:04x}     | '{chunk}'")

final_flag = "".join(flag_chars)
print("-" * 68)
print(f"🎉 Fully Reconstructed Flag: {final_flag}")`;

  const decompiledC = `// Decompiled logic of _encodeBytes @ 0x401530 in main.exe
void encodeBytes(char byte1, char byte2, uint32_t *target_dword) {
    // Pack two characters into a 16-bit big-endian word
    uint32_t payload = ((uint8_t)byte1 << 8) | (uint8_t)byte2;
    
    // Clear lower 16 bits of dwLowDateTime and insert the payload
    *target_dword = (*target_dword & 0xFFFF0000) | payload;
}

// Directory alternation loop in walk_dir @ 0x401957
int toggle = 1;
while (FindNextFileA(hFind, &findData)) {
    if (toggle == 1) {
        // PROCESSED: Inject 2 bytes into LastWriteTime (Mtime)
        hideInFile(findData.cFileName, flag_ptr);
        flag_ptr += 2;
    } else {
        // SKIPPED: Original un-copied file left intact as camouflage
    }
    toggle = 1 - toggle; // Invert toggle for next file
}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-amber-500/30 selection:text-amber-200">
      
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
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border theme-border px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs theme-text uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • ANTI-FORENSICS TIMESTOMPING
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            B1g_Mac: Anti-Forensic Timestomping &amp; NTFS Extra Field Carving
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>7 min read</span>
            <span>•</span>
            <span className="theme-text">PicoCTF 2019</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET ARTIFACT</span>
              <span className="text-white font-bold">b1g_mac.zip</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TECHNIQUE</span>
              <span className="text-amber-400 font-bold">NTFS Timestomping</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">EXTRA FIELD TAG</span>
              <span className="text-cyan-400 font-bold">0x000A (PKWARE NTFS)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">picoCTF&#123;M4cTim35!&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group">
          <Image
            src="/images/pico_b1g_mac.jpg"
            alt="Windows NTFS MACB Timestomping & Forensic Timestamp Carving"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: NTFS MACB Nanosecond Precision &amp; Steganographic Ingestion</span>
            <span className="text-amber-400 font-bold">100-ns FILETIME Resolution</span>
          </div>
        </div>

        {/* Persona Switcher Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-zinc-800 p-6 rounded-2xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🧭</span>
            <h2 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
              Choose Your Investigation Track
            </h2>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            This writeup is engineered to serve both quick speedrunners and forensic analysts seeking full theoretical depth:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <a href="#fast-track" className="p-3 bg-black/50 border border-amber-500/30 rounded-xl hover:border-amber-400 transition-colors block">
              <strong className="text-amber-400 block mb-1">⚡ Fast Track (TL;DR)</strong>
              <span>1-liner solver &amp; quick byte table for instant capture.</span>
            </a>
            <a href="#beginner-dive" className="p-3 bg-black/50 border border-purple-500/30 rounded-xl hover:border-purple-400 transition-colors block">
              <strong className="text-purple-400 block mb-1">🪜 Step-by-Step Dive</strong>
              <span>Complete theory of NTFS MACB, FILETIME &amp; Zip traps.</span>
            </a>
            <a href="#all-methods" className="p-3 bg-black/50 border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-colors block">
              <strong className="text-cyan-400 block mb-1">🛠️ Multi-Tool Arsenal</strong>
              <span>Terminal CLI, GUI Hex Editor, Ghidra &amp; CyberChef.</span>
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 font-sans space-y-12">

          {/* ========================================================================= */}
          {/* SECTION 1: FAST TRACK / SPEEDRUNNER                                       */}
          {/* ========================================================================= */}
          <section id="fast-track" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                1. ⚡ Fast Track Solver (For Advanced CTF Players)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              If you already understand the mechanics of timestomping and need the <strong>instant programmatic solution</strong> without reading background context:
            </p>

            <div className="bg-[#0a0a0e] border border-amber-500/40 rounded-xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Universal 1-Line Python Flag Solver (Linux / macOS / Windows)
                </span>
                <CopyButton text={onelinerFast} label="Copy 1-Liner" />
              </div>
              <pre className="text-xs font-mono text-amber-200 overflow-x-auto p-4 bg-black/70 rounded-lg border border-zinc-800 leading-relaxed">
                <code>{onelinerFast}</code>
              </pre>
            </div>

            {/* Flag Output Card */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
              <p className="text-zinc-400 mb-2 font-bold">Decoded Flag Output:</p>
              <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words font-mono">
                picoCTF&#123;M4cTim35!&#125;
              </p>
            </div>

            {/* Forensic Byte Breakdown Table */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                📊 Per-File Extracted Byte Matrix
              </h3>
              <div className="overflow-x-auto border border-zinc-800 rounded-xl">
                <table className="w-full text-left font-mono text-xs divide-y divide-zinc-800">
                  <thead className="bg-zinc-900/80 text-zinc-400 uppercase">
                    <tr>
                      <th className="p-3">Filename</th>
                      <th className="p-3">64-bit FILETIME (Mtime)</th>
                      <th className="p-3">Low 16-bit Payload</th>
                      <th className="p-3">Decoded Characters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 bg-black/40">
                    <tr>
                      <td className="p-3 text-white font-semibold">Item01 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e36149337069</td>
                      <td className="p-3 text-amber-400 font-bold">0x7069</td>
                      <td className="p-3 text-emerald-400 font-bold">'p', 'i'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item02 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e36158b2636f</td>
                      <td className="p-3 text-amber-400 font-bold">0x636f</td>
                      <td className="p-3 text-emerald-400 font-bold">'c', 'o'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item03 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e36162d44354</td>
                      <td className="p-3 text-amber-400 font-bold">0x4354</td>
                      <td className="p-3 text-emerald-400 font-bold">'C', 'T'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item04 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e3616ff1467b</td>
                      <td className="p-3 text-amber-400 font-bold">0x467b</td>
                      <td className="p-3 text-emerald-400 font-bold">'F', '&#123;'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item05 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e361797a4d34</td>
                      <td className="p-3 text-amber-400 font-bold">0x4d34</td>
                      <td className="p-3 text-emerald-400 font-bold">'M', '4'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item06 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e361de356354</td>
                      <td className="p-3 text-amber-400 font-bold">0x6354</td>
                      <td className="p-3 text-emerald-400 font-bold">'c', 'T'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item07 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e361ef7f696d</td>
                      <td className="p-3 text-amber-400 font-bold">0x696d</td>
                      <td className="p-3 text-emerald-400 font-bold">'i', 'm'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">Item08 - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e36218073335</td>
                      <td className="p-3 text-amber-400 font-bold">0x3335</td>
                      <td className="p-3 text-emerald-400 font-bold">'3', '5'</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">ItemTest - Copy.bmp</td>
                      <td className="p-3 text-zinc-400">0x01d4e3690675217d</td>
                      <td className="p-3 text-amber-400 font-bold">0x217d</td>
                      <td className="p-3 text-emerald-400 font-bold">'!', '&#125;'</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* SECTION 2: BEGINNER DEEP DIVE (THEORY & CONCEPTS)                         */}
          {/* ========================================================================= */}
          <section id="beginner-dive" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-purple-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                2. 🪜 The Deep Dive: How Anti-Forensic Timestomping Works
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              To master this challenge from the ground up, you must understand three core forensic concepts that real-world incident responders encounter during malware outbreaks:
            </p>

            <div className="space-y-4">
              <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-purple-400 font-mono mb-2">
                  Concept 1: What is "MACB" in Digital Forensics?
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  In forensic investigations, <strong>MACB</strong> stands for the four core filesystem timestamps:
                </p>
                <ul className="text-xs text-zinc-400 space-y-1 font-mono list-disc list-inside">
                  <li><strong className="text-white">M (Modified / LastWriteTime):</strong> When file content was last changed.</li>
                  <li><strong className="text-white">A (Accessed / LastAccessTime):</strong> When the file was last opened/read.</li>
                  <li><strong className="text-white">C (Created / MFT Entry Change Time):</strong> When the MFT record metadata was updated.</li>
                  <li><strong className="text-white">B (Birth / CreationTime):</strong> When the file was first created on disk.</li>
                </ul>
              </div>

              <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-purple-400 font-mono mb-2">
                  Concept 2: Windows FILETIME &amp; The Nanosecond Blindspot
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                  Windows NTFS does not store timestamps as human-readable strings like <code className="text-amber-300">"2026-09-05 14:30:00"</code>. Instead, it uses a 64-bit integer called a <strong>FILETIME</strong>:
                </p>
                <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 mb-3">
                  1 FILETIME unit = 100 nanoseconds (10^-7 seconds) since January 1, 1601 UTC.
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Windows Explorer and standard UI file properties dialogs only show time rounded to seconds. The lowest 16 bits of a 64-bit FILETIME correspond to mere fractions of a millisecond! An attacker can replace those lowest 16 bits with secret characters, and to any standard user looking at Windows Explorer, the file date looks <strong>100% normal and untouched</strong>.
                </p>
              </div>

              <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-base font-bold text-purple-400 font-mono mb-2">
                  Concept 3: The ZIP Trap (Why Standard Unzip Fails)
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  When you extract a zip archive using basic utilities like standard Linux <code className="text-amber-300">unzip</code>, the tool only extracts standard DOS 2-second resolution timestamps and <strong>discards the Windows 64-bit NTFS timestamps</strong>! 
                  However, modern zip archivers preserve extended attributes inside <strong>PKWARE Extra Field Tag 0x000A</strong>. If you extract raw bytes from the archive itself, the forensic fidelity is 100% preserved.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* SECTION 3: ALL METHODS FOR SOLVING                                        */}
          {/* ========================================================================= */}
          <section id="all-methods" className="scroll-mt-24 space-y-8">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                3. 🛠️ The Multi-Method Arsenal: Terminal, GUI, &amp; Reversing
              </h2>
            </div>

            {/* METHOD A: TERMINAL CLI */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30">
                  METHOD A
                </span>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                  Terminal &amp; Scripting Route (Python / PowerShell / Bash)
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Using Python's built-in <code className="text-cyan-300">zipfile</code> and <code className="text-cyan-300">struct</code> modules, we can directly parse the 36-byte NTFS extra fields without extracting a single file to disk:
              </p>

              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                    Detailed Forensic Reconstruction Script (extract_timestamps.py)
                  </span>
                  <CopyButton text={pythonDetailedScript} label="Copy Script" />
                </div>
                <pre className="text-xs font-mono text-zinc-300 overflow-x-auto p-4 bg-black/70 rounded-lg border border-zinc-800 leading-relaxed">
                  <code>{pythonDetailedScript}</code>
                </pre>
              </div>
            </div>

            {/* METHOD B: REVERSE ENGINEERING */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono text-xs font-bold border border-purple-500/30">
                  METHOD B
                </span>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                  Binary Reversing with Ghidra / x64dbg (Inspecting main.exe)
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                If we load <code className="text-purple-300">main.exe</code> into Ghidra or x64dbg, we find intact MinGW DWARF symbols revealing the exact encoding algorithm:
              </p>

              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Decompiled Encoding &amp; Directory Traversal Logic
                  </span>
                  <CopyButton text={decompiledC} label="Copy C Code" />
                </div>
                <pre className="text-xs font-mono text-purple-200 overflow-x-auto p-4 bg-black/70 rounded-lg border border-zinc-800 leading-relaxed">
                  <code>{decompiledC}</code>
                </pre>
              </div>

              <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl text-xs text-zinc-300 space-y-2">
                <strong className="text-purple-300 block">💡 Why Only the "- Copy.bmp" Files Contain the Flag:</strong>
                <p>
                  Windows file enumeration via <code className="text-white">FindFirstFileA</code> sorts filenames in ASCII collation order: space (<code className="text-amber-300">0x20</code>) comes before dot (<code className="text-amber-300">0x2E</code>). Thus, <code className="text-white">Item01 - Copy.bmp</code> is evaluated first (with <code className="text-white">toggle = 1</code>), receiving the first 2 characters. Then <code className="text-white">Item01.bmp</code> is evaluated (with <code className="text-white">toggle = 0</code>), skipping it!
                </p>
              </div>
            </div>

            {/* METHOD C: GUI HEX EDITOR & 7-ZIP */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  METHOD C
                </span>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                  GUI Route: 7-Zip &amp; Hex Editor (HxD / 010 Editor)
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                For analysts who prefer visual graphical tools without writing code:
              </p>

              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                  <strong className="text-emerald-400 block text-sm mb-1">Step 1: Open b1g_mac.zip in 7-Zip GUI</strong>
                  <p className="text-zinc-400 font-sans">
                    Right-click <code className="text-white">b1g_mac.zip</code> &gt; <strong>7-Zip &gt; Open archive</strong>. Do not drag-and-drop files out to Windows Explorer, as standard Explorer will drop the sub-second timestamps.
                  </p>
                </div>
                <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                  <strong className="text-emerald-400 block text-sm mb-1">Step 2: Inspect Extra Attributes in Hex Editor</strong>
                  <p className="text-zinc-400 font-sans">
                    Open <code className="text-white">b1g_mac.zip</code> in <strong>HxD</strong> or <strong>010 Editor</strong>. Search for the bytes <code className="text-white">0A 00</code> (Tag 0x000A) following each local file header. Notice the last two bytes of the first 8-byte timestamp are ASCII readable: <code className="text-emerald-400">70 69</code> (<code className="text-white">'pi'</code>), <code className="text-emerald-400">63 6F</code> (<code className="text-white">'co'</code>), <code className="text-emerald-400">43 54</code> (<code className="text-white">'CT'</code>)!
                  </p>
                </div>
              </div>
            </div>

          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* SECTION 4: REAL-WORLD DFIR DETECTION & LESSONS                            */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-red-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                4. 🛡️ Real-World DFIR Takeaways: How Incident Responders Catch Timestomping
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              In actual enterprise threat incidents (such as APT attacks and ransomware pre-staging), adversaries frequently use tools like <code className="text-red-400">timestomp</code>, Meterpreter, or custom Win32 API scripts to alter file modification dates to match <code className="text-white">C:\Windows\System32</code> binaries.
            </p>

            <div className="bg-[#140a0a] border border-red-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-red-400 font-mono uppercase tracking-wider">
                How Forensic Analysts Detect Timestomped Files:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl">
                  <strong className="text-white block mb-1">1. $STANDARD_INFORMATION vs $FILE_NAME Discrepancy</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    In the NTFS Master File Table ($MFT), files have two attribute sets: <code className="text-amber-300">$SI (0x10)</code> and <code className="text-cyan-300">$FN (0x30)</code>. User-mode APIs like <code className="text-white">SetFileTime()</code> only alter <code className="text-amber-300">$SI</code>! The kernel preserves the real original timestamps in <code className="text-cyan-300">$FN</code>. Running Eric Zimmerman's <code className="text-white">MFTECmd.exe</code> flags this instantly.
                  </p>
                </div>

                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl">
                  <strong className="text-white block mb-1">2. Zeroed Milliseconds / Nanoseconds Pattern</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Crude timestompers often copy timestamps from existing system files or round nanoseconds to <code className="text-amber-300">.0000000</code>. A timestamp ending in exactly zero nanoseconds in a modern operating system is a major forensic red flag.
                  </p>
                </div>

                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl">
                  <strong className="text-white block mb-1">3. USN Journal &amp; $LogFile Inconsistencies</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Even if an adversary modifies both MFT records, the NTFS Change Journal ($UsnJrnl) records file write and rename sequences in chronological order, revealing when the metadata alteration actually occurred.
                  </p>
                </div>

                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl">
                  <strong className="text-white block mb-1">4. Hayabusa &amp; Sigma Event Log Rules</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Sysmon Event ID 2 (<code className="text-white">File creation time changed</code>) explicitly detects and logs any process that calls <code className="text-white">SetFileTime</code> to alter a file's birth date.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
