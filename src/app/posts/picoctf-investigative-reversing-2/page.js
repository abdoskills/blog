import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFInvestigativeReversing2Writeup() {
  const pythonScript = `# Read the encoded BMP image
with open('encoded.bmp', 'rb') as f:
    data = f.read()

offset = 2000  # Starting offset identified from decompilation
flag = []

# 50 characters, 8 bytes per character (LSB)
for i in range(50):
    val = 0
    for bit in range(8):
        byte = data[offset + i * 8 + bit]
        lsb = byte & 1
        val |= (lsb << bit)
    flag.append(chr(val + 5))  # Apply inverse math (+5)

print("🎉 Decoded Flag:", ''.join(flag))`;

  const oneliner = `python -c "d=open('encoded.bmp','rb').read(); print(''.join(chr(sum(((d[2000+i*8+b]&1)<<b) for b in range(8))+5) for i in range(50)))"`;

  const decompilerC = `// Ghidra Decompilation: mystery (main & codedChar)
int main(void) {
    FILE *orig_bmp = fopen("original.bmp", "r");
    FILE *enc_bmp  = fopen("encoded.bmp", "a");

    // 1. Copy first 2000 bytes directly (Offset 0x7D0)
    for (int i = 0; i < 2000; i++) {
        char b = fgetc(orig_bmp);
        fputc(b, enc_bmp);
    }

    char flag[50];
    fread(flag, 50, 1, flag_file);

    // 2. Encode 50 characters using LSB Steganography
    for (int i = 0; i < 50; i++) {
        char val = flag[i] - 5; // Subtracted 5 from each character!
        for (int bit = 0; bit < 8; bit++) {
            char orig_b = fgetc(orig_bmp);
            char enc_b  = codedChar(bit, val, orig_b);
            fputc(enc_b, enc_bmp);
        }
    }
    // ...
}

char codedChar(int bit, char val, char orig_byte) {
    char bit_val = (val >> bit) & 1;            // Extract 1 bit
    char result  = (orig_byte & 0xFE) | bit_val; // Replace lowest bit of image byte
    return result;
}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/picoctf" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to PicoCTF Hub
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • REVERSE ENGINEERING • BITMAP LSB CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Investigative Reversing 2: Bitmap LSB Deconstruction &amp; Shift Recovery
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_ir2.jpg" 
                alt="Investigative Reversing 2 Analysis"
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
                &ldquo;We have recovered another binary and an image. See what was modified this time.&rdquo;
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
                  Provided Files (Download &amp; Practice)
                </span>
                <div className="flex flex-col gap-1.5 font-mono text-xs text-white">
                  <a href="/downloads/ir2_mystery" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ mystery (ELF 64-bit)
                  </a>
                  <a href="/downloads/ir2_encoded.bmp" download className="text-emerald-400 hover:underline flex items-center gap-1.5">
                    ⬇️ encoded.bmp (1.5 MB)
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
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (The Even/Odd Morse Code)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              Suppose a spy wants to send a secret number. Instead of writing the number down, he gives you a list of 8 large numbers. If a number is <strong>Even</strong>, it represents a <strong>0</strong>. If a number is <strong>Odd</strong>, it represents a <strong>1</strong>. By reading the even/odd state of 8 consecutive pixels in an uncompressed Bitmap image, you get an 8-bit binary number. Then add 5 to reveal the secret letter!
            </p>
          </div>
        </div>

        {/* Section 2: Decompiler Analysis */}
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
            <CopyButton text={decompilerC} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{decompilerC}</code>
            </pre>
          </div>
        </div>

        {/* Section 3: METHOD A - MANUAL BIT RECONSTRUCTION */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-emerald-500/30 pb-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: STEP-BY-STEP MANUAL LSB DECODING
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              2. Manual LSB Bit Assembly for Character 0 (&apos;p&apos;)
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              Jump to offset <code>0x7D0</code> (Decimal: <code>2000</code>) in HxD and inspect the first 8 bytes: <code>BC C1 BC BD BC BD C1 BC</code>.
            </p>
          </div>

          <div className="space-y-3">
            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#090a0d] shadow-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#12161b] text-emerald-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Byte Position</th>
                    <th className="p-3">Hex Byte</th>
                    <th className="p-3">Even or Odd?</th>
                    <th className="p-3">LSB Bit</th>
                    <th className="p-3">Bit Weight</th>
                    <th className="p-3 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-2.5">Byte 0 (Bit 0)</td><td className="p-2.5 font-bold text-emerald-400">BC</td><td className="p-2.5 text-zinc-400">Even</td><td className="p-2.5">0</td><td className="p-2.5">2⁰ = 1</td><td className="p-2.5 text-right font-bold">0</td></tr>
                  <tr><td className="p-2.5">Byte 1 (Bit 1)</td><td className="p-2.5 font-bold text-emerald-400">C1</td><td className="p-2.5 text-pink-400">Odd</td><td className="p-2.5">1</td><td className="p-2.5">2¹ = 2</td><td className="p-2.5 text-right font-bold text-emerald-300">2</td></tr>
                  <tr><td className="p-2.5">Byte 2 (Bit 2)</td><td className="p-2.5 font-bold text-emerald-400">BC</td><td className="p-2.5 text-zinc-400">Even</td><td className="p-2.5">0</td><td className="p-2.5">2² = 4</td><td className="p-2.5 text-right font-bold">0</td></tr>
                  <tr><td className="p-2.5">Byte 3 (Bit 3)</td><td className="p-2.5 font-bold text-emerald-400">BD</td><td className="p-2.5 text-pink-400">Odd</td><td className="p-2.5">1</td><td className="p-2.5">2³ = 8</td><td className="p-2.5 text-right font-bold text-emerald-300">8</td></tr>
                  <tr><td className="p-2.5">Byte 4 (Bit 4)</td><td className="p-2.5 font-bold text-emerald-400">BC</td><td className="p-2.5 text-zinc-400">Even</td><td className="p-2.5">0</td><td className="p-2.5">2⁴ = 16</td><td className="p-2.5 text-right font-bold">0</td></tr>
                  <tr><td className="p-2.5">Byte 5 (Bit 5)</td><td className="p-2.5 font-bold text-emerald-400">BD</td><td className="p-2.5 text-pink-400">Odd</td><td className="p-2.5">1</td><td className="p-2.5">2⁵ = 32</td><td className="p-2.5 text-right font-bold text-emerald-300">32</td></tr>
                  <tr><td className="p-2.5">Byte 6 (Bit 6)</td><td className="p-2.5 font-bold text-emerald-400">C1</td><td className="p-2.5 text-pink-400">Odd</td><td className="p-2.5">1</td><td className="p-2.5">2⁶ = 64</td><td className="p-2.5 text-right font-bold text-emerald-300">64</td></tr>
                  <tr><td className="p-2.5">Byte 7 (Bit 7)</td><td className="p-2.5 font-bold text-emerald-400">BC</td><td className="p-2.5 text-zinc-400">Even</td><td className="p-2.5">0</td><td className="p-2.5">2⁷ = 128</td><td className="p-2.5 text-right font-bold">0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Calculation: $0 + 2 + 0 + 8 + 0 + 32 + 64 + 0 = 106 + 5 = \mathbf{112} = \text{&apos;p&apos;}$.
            </p>
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
              picoCTF&#123;n3xt_0n30000000000000000000000000ce8d5cad&#125;
            </div>
          </div>
        </div>

        {/* Section 6: The Complete Investigation Path & Mental Roadmap */}
        <div className="bg-[#081510] border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              5. The Complete Investigation Path &amp; Mental Roadmap
            </h3>
          </div>
          
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Here is the step-by-step mental roadmap from binary decompilation to LSB flag recovery:
          </p>

          <div className="space-y-4 font-mono text-xs text-zinc-300">
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
              <div>
                <strong className="text-white block text-sm mb-1">Decompilation &amp; Offset Discovery</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Opened <code>mystery</code> in Ghidra. Traced the initial 2000-byte loop to locate the starting payload offset: <code>2000</code> (<code>0x7D0</code>).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
              <div>
                <strong className="text-white block text-sm mb-1">Steganography Algorithm Identification</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Analyzed <code>codedChar()</code>: spotted <code>(orig &amp; 0xFE) | bit_val</code> confirming Least Significant Bit (LSB) embedding across 8 bytes per character.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
              <div>
                <strong className="text-white block text-sm mb-1">Mathematical Shift Reversal</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Identified <code>flag[i] - 5</code> in the encoding loop, requiring an addition of 5 during bitstream recovery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-emerald-500/40">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
              <div>
                <strong className="text-white block text-sm mb-1">Flag Capture</strong>
                <p className="text-zinc-400 font-sans text-xs">
                  Submitted recovered 50-character flag: <code>picoCTF&#123;n3xt_0n30000000000000000000000000ce8d5cad&#125;</code>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </article>
    </div>
  );
}
