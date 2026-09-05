import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "B1g_Mac: Reversing Windows Timestomper & WinDbg EIP Hijacking | PicoCTF Forensics",
  description: "Complete walkthrough of PicoCTF B1g_Mac: 7-Zip timestamp preservation, Ghidra static analysis of the hidden decode routine, and WinDbg EIP register hijacking to extract picoCTF{M4cTim35!}.",
};

export default function PicoCTFB1gMacWriteup() {
  const windbgCommands = `0:000> bp main+0x1c20
0:000> g
Breakpoint 0 hit
eax=00000000 ebx=00000001 ecx=d6f69950 edx=00000000 esi=00c62fc8 edi=00000030
eip=00401c20 esp=0061fe40 ebp=0061fea8 iopl=0         nv up ei pl zr na pe nc
00401c20 e8c3110000      call    main+0x2de8 (00402de8)

# Hijack the Instruction Pointer (EIP) directly to the hidden decode function!
0:000> r eip=main+0x1afe
0:000> g`;

  const onelinerFast = `python -c "import zipfile, struct; z=zipfile.ZipFile('b1g_mac.zip'); print(''.join(chr((m&0xffff)>>8)+chr(m&0xff) for m in [struct.unpack('<Q', f.extra[12:20])[0] for f in z.infolist() if ' - Copy.bmp' in f.filename]))"`;

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
              PICOCTF 2019 • REVERSING &amp; FORENSICS • WINDBG EIP HIJACK
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            B1g_Mac: Reversing Windows Timestomper &amp; WinDbg EIP Hijacking
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="theme-text">PicoCTF 2019</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET BINARY</span>
              <span className="text-white font-bold">main.exe (x86 PE32)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">DYNAMIC TOOL</span>
              <span className="text-amber-400 font-bold">WinDbg / x64dbg</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">STATIC TOOL</span>
              <span className="text-cyan-400 font-bold">Ghidra Decompiler</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">RECOVERED FLAG</span>
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
            <span>FIGURE 1: Windows NTFS MACB Timestamp Hiding &amp; Reversing Workflow</span>
            <span className="text-amber-400 font-bold">WinDbg EIP Redirection</span>
          </div>
        </div>

        {/* Quick Executive Summary */}
        <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-zinc-800 p-6 rounded-2xl mb-12 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
              Executive Methodology: The 3-Step Attack Vector
            </h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            In this challenge, an adversary wrote a custom 32-bit Windows binary (<code className="text-white">main.exe</code>) to hide sensitive data inside NTFS file modification timestamps. Rather than writing a script to manually parse raw timestamp bytes, we can <strong>leverage the executable's own unreferenced decoding routine</strong> by redirecting the Instruction Pointer (<code className="text-amber-400">EIP</code>) in a debugger!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs pt-2">
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-xl">
              <strong className="text-amber-400 block mb-1">1. 7-Zip Extraction</strong>
              <span className="text-zinc-400">Preserves original NTFS 64-bit timestamps without OS modification.</span>
            </div>
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-xl">
              <strong className="text-purple-400 block mb-1">2. Ghidra Analysis</strong>
              <span className="text-zinc-400">Locates hidden uncalled decode routine at <code>main + 0x1AFE</code>.</span>
            </div>
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-xl">
              <strong className="text-cyan-400 block mb-1">3. WinDbg EIP Hijack</strong>
              <span className="text-zinc-400">Sets breakpoint &amp; points <code>EIP</code> to decode function to print flag!</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 font-sans space-y-12">

          {/* ========================================================================= */}
          {/* STEP 1: FILE PREPARATION & THE 7-ZIP REQUIREMENT                          */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                Step 1: File Preparation &amp; The 7-Zip Trap
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Before touching any debugger or reverse engineering tool, there is a <strong>critical forensic trap</strong> that trips up almost every beginner:
            </p>

            <div className="p-5 bg-amber-950/20 border border-amber-500/40 rounded-xl text-sm text-zinc-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <strong className="text-amber-400 font-mono uppercase tracking-wider">
                  Why Must 7-Zip Be Used For Extraction?
                </strong>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                When you extract <code className="text-white">b1g_mac.zip</code> using the standard Windows built-in utility (<em>Right-click &gt; Extract All...</em>), the Windows Explorer shell writes new files to disk and <strong>updates their modification dates to the current system time</strong>. This immediately overwrites the sub-second nanosecond data and <strong>permanently destroys the encoded flag!</strong>
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                By contrast, <strong>7-Zip</strong> preserves the exact 64-bit Windows <code className="text-white">FILETIME</code> attributes stored inside the ZIP archive's <strong>PKWARE NTFS Extra Field (Tag 0x000A)</strong>, keeping the encoded flag intact.
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl font-mono text-xs">
              <span className="text-zinc-500 block mb-1">CORRECT EXTRACTION PROCEDURE:</span>
              <code className="text-emerald-400">
                Right-Click b1g_mac.zip &gt; 7-Zip &gt; Extract to &quot;b1g_mac\&quot;
              </code>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* STEP 2: STATIC REVERSING IN GHIDRA                                        */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-purple-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                Step 2: Static Analysis in Ghidra (Finding the Hidden Decode Function)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Opening <code className="text-white">main.exe</code> in <strong>Ghidra</strong> reveals the entire program architecture:
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-[#0e0e13]/90 border border-zinc-800 rounded-xl space-y-3">
                <strong className="text-purple-400 font-mono text-sm block">
                  1. The Normal Execution Flow in main():
                </strong>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  The program begins in <code className="text-white">main</code>. At instruction <code className="text-amber-300">0x00401c20</code>, it attempts to open and read <code className="text-white">flag.txt</code>. If the file does not exist on your machine, it terminates immediately with an error:
                </p>
                <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg text-xs font-mono text-red-400">
                  &quot;No flag found, please make sure this is run on the server&quot;
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  If <code className="text-white">flag.txt</code> were present, it would call a function named <code className="text-cyan-300">_listdir</code> (at <code className="text-white">0x00401cb7</code>) with parameter <code className="text-amber-300">0</code> to perform the hiding (timestomping) into the <code className="text-white">test/</code> directory.
                </p>
              </div>

              {/* Ghidra Screenshots Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 space-y-2">
                  <div className="relative h-28 w-full rounded-lg overflow-hidden border border-zinc-800">
                    <Image 
                      src="/images/b1g_mac/ghidra_symbol_tree.png" 
                      alt="Ghidra Symbol Tree showing _listdir" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 block text-center">
                    FIGURE 2: Ghidra Symbol Tree with <code className="text-cyan-300">_listdir</code>
                  </span>
                </div>

                <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 space-y-2">
                  <div className="relative h-28 w-full rounded-lg overflow-hidden border border-zinc-800">
                    <Image 
                      src="/images/b1g_mac/ghidra_call_listdir.png" 
                      alt="Ghidra Disassembly calling _listdir" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 block text-center">
                    FIGURE 3: Disassembly at <code className="text-amber-300">00401cb7 CALL _listdir</code>
                  </span>
                </div>
              </div>

              <div className="p-5 bg-purple-950/20 border border-purple-500/40 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔍</span>
                  <strong className="text-purple-300 font-mono text-sm">
                    How Ghidra Identifies the Hidden Decode Function:
                  </strong>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Inspecting the functions list in Ghidra reveals an <strong>unreferenced function at address <code>0x00401afe</code> (<code className="text-white">main + 0x1afe</code>)</strong>:
                </p>
                <ul className="text-xs text-zinc-300 space-y-1 font-mono list-disc list-inside">
                  <li>This function is never called by <code className="text-white">main</code> under normal execution.</li>
                  <li>It invokes <code className="text-cyan-300">_listdir</code> with parameter <strong className="text-emerald-400">1</strong> (the decode flag).</li>
                  <li>When invoked with parameter <code className="text-emerald-400">1</code>, <code className="text-cyan-300">_listdir</code> reads the timestamps of all files in <code className="text-white">test/</code>, extracts the lower 16 bits of each <code className="text-white">LastWriteTime</code>, and <strong>prints the decoded flag to the console!</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* STEP 3: DYNAMIC REVERSING & EIP HIJACKING IN WINDBG                       */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                Step 3: Dynamic Analysis in WinDbg (The EIP Register Hijack)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Because the decode function already exists inside the binary, we don't need to write a standalone script. We can <strong>run the program in a debugger and force execution to jump directly to the decode method!</strong>
            </p>

            {/* WinDbg Execution Breakdown */}
            <div className="space-y-4">
              <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-2 text-xs font-mono">
                <strong className="text-cyan-400 block text-sm">WinDbg Step-by-Step Commands:</strong>
                <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                  <li>
                    <strong>Attach/Launch Target:</strong> Open <code className="text-white">main.exe</code> in WinDbg (<em>File &gt; Open Executable</em>). Make sure the working directory contains the extracted <code className="text-white">test/</code> folder.
                  </li>
                  <li>
                    <strong>Set Breakpoint:</strong> Set a breakpoint right before the program reads <code className="text-white">flag.txt</code>:
                    <div className="p-2 bg-black border border-zinc-800 rounded my-1 text-amber-300">
                      0:000&gt; bp main+0x1c20
                    </div>
                  </li>
                  <li>
                    <strong>Run to Breakpoint:</strong> Execute with <code className="text-white">g</code> (Go). The breakpoint is hit at <code className="text-cyan-300">00401c20</code>.
                  </li>
                  <li>
                    <strong>Hijack the Instruction Pointer (EIP):</strong> What is the purpose of setting EIP? The Instruction Pointer controls which instruction the CPU will execute next. By changing EIP to <code className="text-amber-400">main+0x1afe</code>, we skip the missing <code className="text-white">flag.txt</code> check entirely and jump straight into the decode function:
                    <div className="p-2 bg-black border border-zinc-800 rounded my-1 text-amber-300">
                      0:000&gt; r eip=main+0x1afe
                    </div>
                  </li>
                  <li>
                    <strong>Resume Execution:</strong> Type <code className="text-white">g</code> to run!
                  </li>
                </ol>
              </div>

              {/* Real WinDbg Screenshot from User */}
              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-2xl space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    FIGURE 4: WinDbg Live Session (Setting Breakpoint &amp; Modifying EIP)
                  </span>
                  <CopyButton text={windbgCommands} label="Copy WinDbg Commands" />
                </div>
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-zinc-800">
                  <Image 
                    src="/images/b1g_mac/windbg_eip_hijack.png" 
                    alt="WinDbg Live EIP Hijack session" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Real Output Console Screenshot from User */}
              <div className="bg-[#0a0a0e] border border-green-500/30 rounded-xl p-4 shadow-2xl space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  FIGURE 5: Live Execution Output — Flag Captured!
                </span>
                <div className="relative w-full aspect-[32/9] rounded-lg overflow-hidden border border-zinc-800">
                  <Image 
                    src="/images/b1g_mac/decoded_flag_console.png" 
                    alt="Console output displaying the captured flag" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Final Flag Box */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
              <p className="text-zinc-400 mb-2 font-bold">Captured Flag:</p>
              <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words font-mono">
                picoCTF&#123;M4cTim35!&#125;
              </p>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* STEP 4: ALTERNATIVE QUICK PYTHON ROUTE                                    */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                Alternative Fast Track: 1-Line Python Solver (No Debugger Needed)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              If you are on Linux or macOS without access to WinDbg, you can extract the exact same timestamps directly from the ZIP Extra Field (Tag <code className="text-amber-300">0x000A</code>) using Python:
            </p>

            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Direct Extra Field Parser (1-Liner)
                </span>
                <CopyButton text={onelinerFast} label="Copy Script" />
              </div>
              <pre className="text-xs font-mono text-amber-200 overflow-x-auto p-4 bg-black/70 rounded-lg border border-zinc-800 leading-relaxed">
                <code>{onelinerFast}</code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* ========================================================================= */}
          {/* STEP 5: CORE CONCEPTUAL QA & SUMMARY                                      */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-blue-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                Core Conceptual Q&amp;A (English &amp; بالعربية)
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-1">
                <strong className="text-amber-400 block text-sm">Q1: Why must 7-Zip be used for extraction?</strong>
                <p className="text-zinc-300 font-sans text-xs">
                  Standard Windows extraction alters file timestamps on creation, overwriting the encoded flag. 7-Zip preserves the exact original 64-bit NTFS <code className="text-white">FILETIME</code> timestamps stored in the ZIP archive.
                </p>
              </div>

              <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-1">
                <strong className="text-purple-400 block text-sm">Q2: How does Ghidra help identify the decode function?</strong>
                <p className="text-zinc-300 font-sans text-xs">
                  Ghidra shows that <code className="text-white">_listdir</code> takes a parameter: <code className="text-white">0</code> to encode/hide bytes and <code className="text-white">1</code> to decode bytes. Looking for functions calling <code className="text-white">_listdir</code> with <code className="text-white">1</code> reveals the unreferenced decode function at <code className="text-white">0x00401afe</code>.
                </p>
              </div>

              <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-1">
                <strong className="text-cyan-400 block text-sm">Q3: What is the purpose of setting the EIP?</strong>
                <p className="text-zinc-300 font-sans text-xs">
                  The Instruction Pointer (EIP) dictates CPU execution. Setting <code className="text-white">EIP = main+0x1afe</code> forces the CPU to jump directly to the hidden decode method, bypassing the missing <code className="text-white">flag.txt</code> check and printing the flag from the timestomped files.
                </p>
              </div>

              {/* Arabic Summary Box */}
              <div className="p-5 bg-[#0f172a]/80 border border-cyan-500/30 rounded-xl space-y-2 text-right" dir="rtl">
                <strong className="text-cyan-400 block text-sm font-sans">ملخص التحدي باللغة العربية:</strong>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  يعتمد تحدي <strong>B1g_Mac</strong> على الهندسة العكسية لبرنامج ويندوز لإيجاد علم مخفي داخل الطوابع الزمنية (Timestamps) لملفات الصور:
                </p>
                <ul className="text-xs text-zinc-300 space-y-1 font-sans list-disc list-inside">
                  <li><strong>تحضير الملفات:</strong> استخراج الملفات باستخدام <strong>7-Zip</strong> للحفاظ على الطوابع الزمنية الأصلية بدقة النانوثانية.</li>
                  <li><strong>التحليل الساكن (Ghidra):</strong> فحص دالة <code>main</code> واكتشاف دالة فك التشفير غير المستدعاة عند العنوان <code>0x00401afe</code>.</li>
                  <li><strong>التحليل الديناميكي (WinDbg):</strong> وضع نقطة توقف <code>bp main+0x1c20</code> وتغيير مؤشر التعليمات <code>r eip=main+0x1afe</code> لتخطي فحص <code>flag.txt</code> وتشغيل دالة فك التشفير مباشرة وطباعة العلم!</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
