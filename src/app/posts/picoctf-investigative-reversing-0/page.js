import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFInvestigativeReversing0Writeup() {
  const pythonScript = `# Open mystery.png and read the raw trailing bytes
with open('mystery.png', 'rb') as f:
    data = f.read()

# Grab last 26 bytes appended past the PNG IEND marker
encoded = data[-26:]

# Reconstruct flag using inverse mathematics
flag = (
    ''.join(chr(encoded[i]) for i in range(6)) +          # Unchanged: "picoCT"
    ''.join(chr(encoded[i] - 5) for i in range(6, 15)) +   # Subtract 5
    chr(encoded[15] + 3) +                                 # Add 3
    ''.join(chr(encoded[i]) for i in range(16, 26))        # Unchanged: "_35f69dab}"
)

print("🎉 Decoded Flag:", flag)`;

  const oneliner = `python -c "d=open('mystery.png','rb').read()[-26:]; print(''.join(chr(d[i]) for i in range(6)) + ''.join(chr(d[i]-5) for i in range(6,15)) + chr(d[15]+3) + ''.join(chr(d[i]) for i in range(16,26)))"`;

  const decompiledC = `int main(void) {
    FILE *flag_file = fopen("flag.txt", "r");
    FILE *png_file  = fopen("mystery.png", "a"); // "a" = Append to end of file!

    char flag[26];
    fread(flag, 26, 1, flag_file);

    // 1. First 6 characters written as-is: "picoCT"
    for (int i = 0; i < 6; i++) {
        fputc(flag[i], png_file);
    }

    // 2. Characters 6 to 14 have 5 added to their ASCII values
    for (int i = 6; i <= 14; i++) {
        fputc(flag[i] + 5, png_file);
    }

    // 3. Character 15 has 3 subtracted from its ASCII value
    fputc(flag[15] - 3, png_file);

    // 4. Remaining characters (indices 16..25) written as-is
    for (int i = 16; i <= 25; i++) {
        fputc(flag[i], png_file);
    }

    fclose(png_file);
    fclose(flag_file);
    return 0;
}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
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
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • REVERSE ENGINEERING • FILE OVERLAY CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Investigative Reversing 0: Appended Byte Math &amp; PNG Overlay Extraction
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_ir0.jpg" 
                alt="Investigative Reversing 0 Analysis"
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
                &ldquo;We have recovered a binary and an image. See if you can figure out what it did to hide the flag.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Forensics / Reverse Engineering</span>
                <span>● <strong>Points:</strong> 300 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#050c0a] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided Files (Download &amp; Practice)
                </span>
                <div className="flex flex-col gap-1.5 font-mono text-xs text-white">
                  <a href="/downloads/ir0_mystery" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery (ELF 64-bit)
                  </a>
                  <a href="/downloads/ir0_mystery.png" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery.png
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
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (The Envelope Sticky Note)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              Imagine you seal a letter inside an envelope (a valid PNG file). After sealing the envelope with wax (the <code>IEND</code> marker), you tape a sticky note onto the outside back of the envelope with a message where some letters are shifted by $+5$ in the alphabet. Standard mail scanning machines only look at the address on the front and ignore anything taped past the seal. To read the secret, we just look past the seal and shift the letters back!
            </p>
          </div>
        </div>

        {/* Section 2: Decompiling mystery */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-emerald-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                DECOMPILATION ANALYSIS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                1. Inspecting the `mystery` Binary
              </h2>
            </div>
            <CopyButton text={decompiledC} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Opening the ELF binary in Ghidra reveals that it reads a 26-byte flag from <code>flag.txt</code> and writes it directly to <code>mystery.png</code> using append mode (<code>&quot;a&quot;</code>):
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{decompiledC}</code>
            </pre>
          </div>
        </div>

        {/* Section 3: METHOD A - MANUAL HEX CALCULATION */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-emerald-500/30 pb-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: STEP-BY-STEP MANUAL CARVING
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              2. Manual Hex Extraction &amp; Arithmetic Table
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              Open <code>mystery.png</code> in HxD or HexEd.it, scroll past the <code>IEND</code> marker (<code>49 45 4E 44 AE 42 60 82</code>), and inspect the 26 trailing bytes:
            </p>
          </div>

          <div className="p-3 bg-black border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
            70 69 63 6F 43 54 4B 80 6B 35 7A 73 69 64 36 71 5F 33 35 66 36 39 64 61 62 7D
          </div>

          {/* Full Manual Table */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Character-by-Character Reverse Mathematics:
            </h4>
            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#090a0d] shadow-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#12161b] text-emerald-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Index</th>
                    <th className="p-3">Encoded Byte</th>
                    <th className="p-3">ASCII Decimal</th>
                    <th className="p-3">Operation</th>
                    <th className="p-3">Decoded Decimal</th>
                    <th className="p-3 text-right">Decoded Char</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-2.5 text-zinc-500">0</td><td className="p-2.5">70 (&apos;p&apos;)</td><td className="p-2.5">112</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">112</td><td className="p-2.5 text-right text-emerald-300 font-bold">p</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">1</td><td className="p-2.5">69 (&apos;i&apos;)</td><td className="p-2.5">105</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">105</td><td className="p-2.5 text-right text-emerald-300 font-bold">i</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">2</td><td className="p-2.5">63 (&apos;c&apos;)</td><td className="p-2.5">99</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">99</td><td className="p-2.5 text-right text-emerald-300 font-bold">c</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">3</td><td className="p-2.5">6F (&apos;o&apos;)</td><td className="p-2.5">111</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">111</td><td className="p-2.5 text-right text-emerald-300 font-bold">o</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">4</td><td className="p-2.5">43 (&apos;C&apos;)</td><td className="p-2.5">67</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">67</td><td className="p-2.5 text-right text-emerald-300 font-bold">C</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">5</td><td className="p-2.5">54 (&apos;T&apos;)</td><td className="p-2.5">84</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">84</td><td className="p-2.5 text-right text-emerald-300 font-bold">T</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">6</td><td className="p-2.5 text-emerald-400">4B (&apos;K&apos;)</td><td className="p-2.5">75</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">70</td><td className="p-2.5 text-right text-emerald-300 font-bold">F</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">7</td><td className="p-2.5 text-emerald-400">80</td><td className="p-2.5">128</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">123</td><td className="p-2.5 text-right text-emerald-300 font-bold">&#123;</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">8</td><td className="p-2.5 text-emerald-400">6B (&apos;k&apos;)</td><td className="p-2.5">107</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">102</td><td className="p-2.5 text-right text-emerald-300 font-bold">f</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">9</td><td className="p-2.5 text-emerald-400">35 (&apos;5&apos;)</td><td className="p-2.5">53</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">48</td><td className="p-2.5 text-right text-emerald-300 font-bold">0</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">10</td><td className="p-2.5 text-emerald-400">7A (&apos;z&apos;)</td><td className="p-2.5">122</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">117</td><td className="p-2.5 text-right text-emerald-300 font-bold">u</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">11</td><td className="p-2.5 text-emerald-400">73 (&apos;s&apos;)</td><td className="p-2.5">115</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">110</td><td className="p-2.5 text-right text-emerald-300 font-bold">n</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">12</td><td className="p-2.5 text-emerald-400">69 (&apos;i&apos;)</td><td className="p-2.5">105</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">100</td><td className="p-2.5 text-right text-emerald-300 font-bold">d</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">13</td><td className="p-2.5 text-emerald-400">64 (&apos;d&apos;)</td><td className="p-2.5">100</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">95</td><td className="p-2.5 text-right text-emerald-300 font-bold">_</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">14</td><td className="p-2.5 text-emerald-400">36 (&apos;6&apos;)</td><td className="p-2.5">54</td><td className="p-2.5 text-pink-400 font-bold">- 5</td><td className="p-2.5">49</td><td className="p-2.5 text-right text-emerald-300 font-bold">1</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">15</td><td className="p-2.5 text-emerald-400">71 (&apos;q&apos;)</td><td className="p-2.5">113</td><td className="p-2.5 text-cyan-400 font-bold">+ 3</td><td className="p-2.5">116</td><td className="p-2.5 text-right text-emerald-300 font-bold">t</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">16..25</td><td className="p-2.5 text-zinc-400">_35f69dab&#125;</td><td className="p-2.5 text-zinc-400">—</td><td className="p-2.5 text-zinc-500">Unchanged</td><td className="p-2.5">—</td><td className="p-2.5 text-right text-emerald-300 font-bold">_35f69dab&#125;</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 4: METHOD B - AUTOMATED PYTHON SCRIPT & ONELINER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-emerald-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: AUTOMATED PYTHON PARSER &amp; ONELINER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                3. Automated Extraction Script (`solve.py`)
              </h2>
            </div>
            <CopyButton text={pythonScript} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>

          {/* Terminal One-liner */}
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
            4. Decoded Flag
          </h2>

          <div className="bg-[#050508] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Extracted Secret Flag:</p>
            <div className="inline-block bg-black border border-emerald-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-emerald-300 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              picoCTF&#123;f0und_1t_35f69dab&#125;
            </div>
          </div>
        </div>

        {/* Section 6: Key Takeaways */}
        <div className="space-y-4 mb-12">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            5. Forensic Key Takeaways
          </h3>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121217] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Concept</th>
                  <th className="p-3">Indicator</th>
                  <th className="p-3">Reversing Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">Append Mode ("a")</td>
                  <td className="p-3 text-emerald-300">fopen(..., &quot;a&quot;)</td>
                  <td className="p-3 text-zinc-400">Check for bytes after PNG IEND terminator (49 45 4E 44 AE 42 60 82).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Shift Encoding</td>
                  <td className="p-3 text-emerald-300">flag[i] + 5</td>
                  <td className="p-3 text-zinc-400">Apply exact inverse mathematical operation (subtract 5).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7: The Complete Investigation Path & Mental Roadmap */}
        <div className="bg-[#081510] border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              6. The Complete Investigation Path &amp; Mental Roadmap
            </h3>
          </div>
          
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Here is the step-by-step mental roadmap from binary decompilation to flag recovery:
          </p>

          <div className="space-y-4 font-mono text-xs text-zinc-300">
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
              <div>
                <strong className="text-white block text-sm mb-1">Decompiling the Binary</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Loaded <code>mystery</code> in Ghidra. Located <code>main()</code> and identified <code>fopen(..., &quot;a&quot;)</code> writing 26 bytes to the end of <code>mystery.png</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
              <div>
                <strong className="text-white block text-sm mb-1">Carving Trailing Bytes</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Opened <code>mystery.png</code> in HxD, navigated past the <code>IEND</code> marker, and extracted the raw 26 bytes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
              <div>
                <strong className="text-white block text-sm mb-1">Applying Inverse Arithmetic</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Subtracted 5 from characters 6..14, added 3 to character 15, and preserved the remaining characters unchanged.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-emerald-500/40">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
              <div>
                <strong className="text-white block text-sm mb-1">Flag Capture</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Constructed and verified the final flag: <code>picoCTF&#123;f0und_1t_35f69dab&#125;</code>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </article>
    </div>
  );
}
