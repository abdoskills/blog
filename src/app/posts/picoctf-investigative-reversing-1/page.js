import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFInvestigativeReversing1Writeup() {
  const solverScript = `with open('mystery.png', 'rb') as f:
    m1 = f.read()[-16:]
with open('mystery2.png', 'rb') as f:
    m2 = f.read()[-2:]
with open('mystery3.png', 'rb') as f:
    m3 = f.read()[-8:]

flag = [None] * 26

# Slot arithmetic from binary reverse engineering
flag[0] = chr(m2[0] - 0x15)  # 133 - 21 = 112 ('p')
flag[1] = chr(m3[0])         # 'i'
flag[2] = chr(m3[1])         # 'c'
flag[3] = chr(m2[1] - 4)     # 115 - 4 = 111 ('o')
flag[4] = chr(m1[0])         # 'C'
flag[5] = chr(m3[2])         # 'T'

for i in range(4):
    flag[6 + i] = chr(m1[1 + i])

for i in range(5):
    flag[10 + i] = chr(m3[3 + i])

for i in range(11):
    flag[15 + i] = chr(m1[5 + i])

print("🎉 Decoded Flag:", ''.join(flag))`;

  const oneliner = `python -c "m1=open('mystery.png','rb').read()[-16:]; m2=open('mystery2.png','rb').read()[-2:]; m3=open('mystery3.png','rb').read()[-8:]; f=[chr(m2[0]-21), chr(m3[0]), chr(m3[1]), chr(m2[1]-4), chr(m1[0]), chr(m3[2])] + [chr(m1[1+i]) for i in range(4)] + [chr(m3[3+i]) for i in range(5)] + [chr(m1[5+i]) for i in range(11)]; print(''.join(f))"`;

  const ghidraDecompiled = `int main(void) {
    FILE *flag_file = fopen("flag.txt", "r");
    FILE *f1 = fopen("mystery.png", "a");   // Append mode (writes past IEND)
    FILE *f2 = fopen("mystery2.png", "a");
    FILE *f3 = fopen("mystery3.png", "a");

    char flag[26];
    fread(flag, 26, 1, flag_file);

    // Distribution Sequence:
    fputc(flag[1], f3);          // mystery3.png gets flag[1]
    fputc(flag[0] + 21, f2);     // mystery2.png gets flag[0] + 21 (0x15)
    fputc(flag[2], f3);          // mystery3.png gets flag[2]
    fputc(flag[5], f3);          // mystery3.png gets flag[5]
    fputc(flag[4], f1);          // mystery.png  gets flag[4]

    // Indices 6..9 to mystery.png
    for (int i = 6; i <= 9; i++) {
        fputc(flag[i], f1);
    }
    fputc(flag[3] + 4, f2);      // mystery2.png gets flag[3] + 4

    // Indices 10..14 to mystery3.png
    for (int i = 10; i <= 14; i++) {
        fputc(flag[i], f3);
    }

    // Indices 15..25 to mystery.png
    for (int i = 15; i <= 25; i++) {
        fputc(flag[i], f1);
    }

    return 0;
}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
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
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • REVERSE ENGINEERING • MULTI-IMAGE CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Investigative Reversing 1: Multi-PNG Overlay Carving
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_investigative_reversing_1.jpg" 
                alt="Investigative Reversing 1 Analysis"
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
                &ldquo;We have recovered a binary and a few images. See if you can recover the flag.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Forensics / Reverse Engineering</span>
                <span>● <strong>Points:</strong> 350 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#050c0a] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided Files (Download & Practice)
                </span>
                <div className="flex flex-col gap-1.5 font-mono text-xs text-white">
                  <a href="/downloads/mystery_binary" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery (ELF 64-bit)
                  </a>
                  <a href="/downloads/mystery.png" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery.png
                  </a>
                  <a href="/downloads/mystery2.png" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery2.png
                  </a>
                  <a href="/downloads/mystery3.png" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery3.png
                  </a>
                </div>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center truncate">
                Dissector: Ghidra + HxD
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Intuitive Analogy */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#07130e] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (The Shredded Letter)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              Imagine an author writing a 26-letter secret password. Instead of mailing one letter, they tear the password into 3 pieces. They slip piece #1 into an envelope labeled <code>mystery.png</code>, piece #2 into <code>mystery2.png</code> (and add 21 to the first letter just to scramble it), and piece #3 into <code>mystery3.png</code>. They tape these scraps to the very outside bottom of each envelope (past the <code>IEND</code> seal). To solve it, we simply inspect the bottom of all 3 envelopes and solve the 26-slot jigsaw puzzle!
            </p>
          </div>
        </div>

        {/* Section 2: Reversing the Binary */}
        <div className="space-y-6 mb-12">
          <div className="flex justify-between items-end border-b border-emerald-500/30 pb-4">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                STEP 1: REVERSE ENGINEERING
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                1. Decompiling `mystery` in Ghidra
              </h2>
            </div>
            <CopyButton text={ghidraDecompiled} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Opening <code>mystery</code> in Ghidra and inspecting <code>main()</code> reveals the crucial clue: all three PNG files are opened with mode <code className="text-emerald-400 font-mono font-bold">&quot;a&quot;</code> (<strong>Append mode</strong>).
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre><code>{ghidraDecompiled}</code></pre>
          </div>

          <div className="bg-[#0a1116] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-2">
            <div className="text-emerald-400 font-bold uppercase">Mathematical Byte Distribution Summary:</div>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li><code>mystery.png</code> receives 16 bytes: <code className="text-zinc-200">flag[4], flag[6..9], flag[15..25]</code></li>
              <li><code>mystery2.png</code> receives 2 bytes: <code className="text-zinc-200">flag[0] + 21, flag[3] + 4</code></li>
              <li><code>mystery3.png</code> receives 8 bytes: <code className="text-zinc-200">flag[1], flag[2], flag[5], flag[10..14]</code></li>
              <li>Total: 16 + 2 + 8 = 26 bytes (Exact match for the 26-character flag).</li>
            </ul>
          </div>
        </div>

        {/* Section 3: METHOD A - STEP BY STEP MANUAL PEN & PAPER RECONSTRUCTION */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-emerald-500/30 pb-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: HANDS-ON MANUAL RECONSTRUCTION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              2. Manual Solution (Hex Editor & Pen &amp; Paper Table)
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              How a beginner can solve this by hand using just <strong>HxD / HexEd.it</strong> and an ASCII decimal chart.
            </p>
          </div>

          {/* Step 1 in Manual */}
          <div className="space-y-3">
            <h4 className="font-mono text-sm font-bold text-emerald-300 uppercase tracking-wider">
              Step 1: Extract Trailing Bytes Past `IEND` in Each Image
            </h4>
            <p className="text-xs md:text-sm text-zinc-300 font-sans">
              In any Hex Editor, jump to the end of each image file. Look immediately past the standard PNG end marker <code>IEND</code> (<code>49 45 4E 44 AE 42 60 82</code>):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#0a0a0a] rounded-xl border border-zinc-800 space-y-1">
                <span className="text-emerald-400 font-bold block">1. mystery.png (16 Bytes):</span>
                <div className="text-zinc-400 text-[11px]">43 46 7B 41 6E 31 5F 38 61 34 34 38 63 62 32 7D</div>
                <div className="text-white font-bold pt-1">ASCII: CF&#123;An1_8a448cb2&#125;</div>
              </div>
              <div className="p-4 bg-[#0a0a0a] rounded-xl border border-zinc-800 space-y-1">
                <span className="text-emerald-400 font-bold block">2. mystery2.png (2 Bytes):</span>
                <div className="text-zinc-400 text-[11px]">85 73</div>
                <div className="text-white font-bold pt-1">ASCII: \x85 and &apos;s&apos;</div>
              </div>
              <div className="p-4 bg-[#0a0a0a] rounded-xl border border-zinc-800 space-y-1">
                <span className="text-emerald-400 font-bold block">3. mystery3.png (8 Bytes):</span>
                <div className="text-zinc-400 text-[11px]">69 63 54 30 74 68 61 5F</div>
                <div className="text-white font-bold pt-1">ASCII: icT0tha_</div>
              </div>
            </div>
          </div>

          {/* Step 2 in Manual */}
          <div className="space-y-3">
            <h4 className="font-mono text-sm font-bold text-emerald-300 uppercase tracking-wider">
              Step 2: Solve the Math for the 2 Modified Characters
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-black rounded-xl border border-emerald-500/30 space-y-1">
                <span className="text-emerald-400 font-bold">Slot 0 Calculation:</span>
                <div className="text-zinc-300">mystery2[0] = 0x85 (Decimal 133)</div>
                <div className="text-emerald-300 font-bold text-sm">Slot 0 = 133 - 21 = 112 = &apos;p&apos;</div>
              </div>
              <div className="p-4 bg-black rounded-xl border border-emerald-500/30 space-y-1">
                <span className="text-emerald-400 font-bold">Slot 3 Calculation:</span>
                <div className="text-zinc-300">mystery2[1] = &apos;s&apos; (Decimal 115)</div>
                <div className="text-emerald-300 font-bold text-sm">Slot 3 = 115 - 4 = 111 = &apos;o&apos;</div>
              </div>
            </div>
          </div>

          {/* Full 26-Row Reconstruction Table */}
          <div className="space-y-3">
            <h4 className="font-mono text-sm font-bold text-emerald-300 uppercase tracking-wider">
              Step 3: Complete 26-Slot Reconstruction Matrix
            </h4>
            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#090a0d] shadow-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#12161b] text-emerald-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Slot Index</th>
                    <th className="p-3">Source File &amp; Position</th>
                    <th className="p-3">Encoded Byte</th>
                    <th className="p-3">Math / Operation</th>
                    <th className="p-3 text-right">Decoded Character</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-2.5 font-bold text-emerald-400">0</td><td className="p-2.5">mystery2.png [0]</td><td className="p-2.5">0x85 (133)</td><td className="p-2.5">133 - 21</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">p</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">1</td><td className="p-2.5">mystery3.png [0]</td><td className="p-2.5">&apos;i&apos; (105)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">i</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">2</td><td className="p-2.5">mystery3.png [1]</td><td className="p-2.5">&apos;c&apos; (99)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">c</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">3</td><td className="p-2.5">mystery2.png [1]</td><td className="p-2.5">&apos;s&apos; (115)</td><td className="p-2.5">115 - 4</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">o</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">4</td><td className="p-2.5">mystery.png [0]</td><td className="p-2.5">&apos;C&apos; (67)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">C</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">5</td><td className="p-2.5">mystery3.png [2]</td><td className="p-2.5">&apos;T&apos; (84)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">T</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">6</td><td className="p-2.5">mystery.png [1]</td><td className="p-2.5">&apos;F&apos; (70)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">F</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">7</td><td className="p-2.5">mystery.png [2]</td><td className="p-2.5">&apos;&#123;&apos; (123)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">&#123;</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">8</td><td className="p-2.5">mystery.png [3]</td><td className="p-2.5">&apos;A&apos; (65)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">A</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">9</td><td className="p-2.5">mystery.png [4]</td><td className="p-2.5">&apos;n&apos; (110)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">n</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">10</td><td className="p-2.5">mystery3.png [3]</td><td className="p-2.5">&apos;0&apos; (48)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">0</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">11</td><td className="p-2.5">mystery3.png [4]</td><td className="p-2.5">&apos;t&apos; (116)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">t</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">12</td><td className="p-2.5">mystery3.png [5]</td><td className="p-2.5">&apos;h&apos; (104)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">h</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">13</td><td className="p-2.5">mystery3.png [6]</td><td className="p-2.5">&apos;a&apos; (97)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">a</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">14</td><td className="p-2.5">mystery3.png [7]</td><td className="p-2.5">&apos;_&apos; (95)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">_</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">15</td><td className="p-2.5">mystery.png [5]</td><td className="p-2.5">&apos;1&apos; (49)</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">1</td></tr>
                  <tr><td className="p-2.5 font-bold text-emerald-400">16..25</td><td className="p-2.5">mystery.png [6..15]</td><td className="p-2.5">&apos;_8a448cb2&#125;&apos;</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5 text-right font-bold text-emerald-300 text-sm">_8a448cb2&#125;</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 4: METHOD B - AUTOMATED PYTHON SOLVER & ONELINER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-emerald-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: AUTOMATED SCRIPT & ONELINER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                3. Automated Python Solver (`solve.py`)
              </h2>
            </div>
            <CopyButton text={solverScript} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Automating the 26-slot reconstruction with a clean Python script:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre><code>{solverScript}</code></pre>
          </div>

          {/* Fast Oneliner */}
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

        {/* Section 5: Decoded Flag Box */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            4. Verified Flag
          </h2>

          <div className="bg-[#050508] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Decoded Flag Output:</p>
            <div className="inline-block bg-black border border-emerald-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-emerald-300 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              picoCTF&#123;An0tha_1_8a448cb2&#125;
            </div>
          </div>
        </div>

        {/* Section 6: Key Takeaways Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            5. Key Takeaways & Lessons
          </h3>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121217] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Principle</th>
                  <th className="p-3">Technical Rule</th>
                  <th className="p-3">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">Append Mode ("a")</td>
                  <td className="p-3 text-emerald-300">fopen(..., "a")</td>
                  <td className="p-3 text-zinc-400">Writes directly past the end of the file, creating trailing overlay data.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">PNG Terminator</td>
                  <td className="p-3 text-emerald-300">IEND (49 45 4E 44 ...)</td>
                  <td className="p-3 text-zinc-400">Standard PNG parsers stop reading at IEND; anything past it is hidden payload.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Byte Count Verification</td>
                  <td className="p-3 text-emerald-300">16 + 2 + 8 = 26 bytes</td>
                  <td className="p-3 text-zinc-400">Always sum extracted pieces against the initial buffer size to confirm zero data loss.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </article>
    </div>
  );
}
