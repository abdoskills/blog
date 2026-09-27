import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "NAS coal: PPTM Macro Forensics & PowerShell Base64 Deobfuscation | SunshineCTF 2026",
  description: "Forensic analysis of a malicious PowerPoint Macro-Enabled Presentation (.pptm) in SunshineCTF. Extracting VBA code via olevba, analyzing MediaCache.bas, and decoding UTF-16LE Base64 PowerShell payload to recover the flag.",
};

export default function NasCoalWriteup() {
  const vbaCode = `Option Explicit

Public Sub RefreshCache()
    Dim encoded As String
    Dim commandLine As String
    encoded = "JABjAGEAbQBwAGEAaQBnAG4AIAA9ACAAJwBzAHUAbgB7AHkAdQBwAF8AaQBzAHMAYQBfAGcAZQBtAH0AJwANAAoAJABzAG8AdQByAGMAZQAgAD0AIAAnAGgAdAB0AHAAcwA6AC8ALwBnAGUAbQAtAGMAYQBjAGgAZQAuAGUAeABhAG0AcABsAGUALgBpAG4AdgBhAGwAaQBkAC8AYwBvAGEAbAAuAGIAaQBuACcADQAKACQAZABlAHMAdABpAG4AYQB0AGkAbwBuACAAPQAgACcAYwBvAGEAbAAuAGIAaQBuACcADQAKAFsAcABzAGMAdQBzAHQAbwBtAG8AYgBqAGUAYwB0AF0AQAB7AE8AcABlAHIAYQB0AGkAbwBuAD0AJwBkAG8AdwBuAGwAbwBhAGQAJwA7ACAAQwBhAG0AcABhAGkAZwBuAD0AJABjAGEAbQBwAGEAaQBnAG4AOwAgAFMAbwB1AHIAYwBlAD0AJABzAG8AdQByAGMAZQA7ACAARABlAHMAdABpAG4AYQB0AGkAbwBuAD0AJABkAGUAcwB0AGkAbwBuAGQAaQBvAG4AfQANAAoA"
    commandLine = "powershell.exe -NoProfile -EncodedCommand " & encoded
    Debug.Print commandLine
End Sub`;

  const pwshDecode = `$encoded = "JABjAGEAbQBwAGEAaQBnAG4AIAA9ACAAJwBzAHUAbgB7AHkAdQBwAF8AaQBzAHMAYQBfAGcAZQBtAH0AJwANAAoAJABzAG8AdQByAGMAZQAgAD0AIAAnAGgAdAB0AHAAcwA6AC8ALwBnAGUAbQAtAGMAYQBjAGgAZQAuAGUAeABhAG0AcABsAGUALgBpAG4AdgBhAGwAaQBkAC8AYwBvAGEAbAAuAGIAaQBuACcADQAKACQAZABlAHMAdABpAG4AYQB0AGkAbwBuACAAPQAgACcAYwBvAGEAbAAuAGIAaQBuACcADQAKAFsAcABzAGMAdQBzAHQAbwBtAG8AYgBqAGUAYwB0AF0AQAB7AE8AcABlAHIAYQB0AGkAbwBuAD0AJwBkAG8AdwBuAGwAbwBhAGQAJwA7ACAAQwBhAG0AcABhAGkAZwBuAD0AJABjAGEAbQBwAGEAaQBnAG4AOwAgAFMAbwB1AHIAYwBlAD0AJABzAG8AdQByAGMAZQA7ACAARABlAHMAdABpAG4AYQB0AGkAbwBuAD0AJABkAGUAcwB0AGkAbwBuAGQAaQBvAG4AfQANAAoA"
[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String($encoded))`;

  const decodedOutput = `$campaign = 'sun{yup_issa_gem}'
$source = 'https://gem-cache.example.invalid/coal.bin'
$destination = 'coal.bin'
[pscustomobject]@{Operation='download'; Campaign=$campaign; Source=$source; Destination=$destination}`;

  const flagText = "sun{yup_issa_gem}";

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
              SUNSHINECTF 2026 • FORENSICS • MALWARE ANALYSIS
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            NAS coal: PPTM Macro Forensics &amp; PowerShell Base64 Deobfuscation
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>4 min read</span>
            <span>•</span>
            <span className="text-emerald-400">SunshineCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET FILE</span>
              <span className="text-white font-bold">gem_collection.pptm</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FORMAT</span>
              <span className="text-emerald-400 font-bold">OpenXML Macro PPTM</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">ANALYSIS TOOL</span>
              <span className="text-emerald-400 font-bold">olevba (oletools)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">sun&#123;yup_issa_gem&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/sunshine/nas_coal_olevba.png"
            alt="olevba macro extraction output"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: olevba extracting MediaCache.bas macro and detecting Base64 PowerShell execution</span>
            <span className="text-emerald-400 font-bold">OLE Analysis</span>
          </div>
        </div>

        {/* Section 1: Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-emerald-400">01.</span> Challenge Overview
          </h2>
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-xl p-6 mb-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              We are provided with a Microsoft PowerPoint Macro-Enabled Presentation named <code className="bg-zinc-800/80 text-emerald-300 px-2 py-0.5 rounded text-sm font-mono">gem_collection.pptm</code> accompanied by the hint:
            </p>
            <blockquote className="border-l-2 border-emerald-500/60 pl-4 py-1 italic text-zinc-400 font-mono text-sm bg-black/40 rounded-r">
              &quot;someone put coal in my gem collection :^(&quot;
            </blockquote>
            <p className="text-zinc-300 leading-relaxed mt-4">
              Under the hood, a <code className="bg-zinc-800/80 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">.pptm</code> file is an OpenXML ZIP archive containing slides, presentation properties, media files, and an embedded compound OLE binary <code className="bg-zinc-800/80 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">ppt/vbaProject.bin</code> containing compiled VBA macros.
            </p>
          </div>
        </section>

        {/* Section 2: Forensic Analysis with olevba */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-emerald-400">02.</span> Forensic Extraction with olevba
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            When handling untrusted macro-enabled Office documents (<code className="bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono">.docm</code>, <code className="bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono">.xlsm</code>, <code className="bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono">.pptm</code>), running them in a native desktop environment introduces execution risks. The forensic best practice is static dissection using <code className="bg-zinc-800/80 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">olevba</code> from the <strong className="text-white">oletools</strong> suite.
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden mb-6">
            <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>TERMINAL — OLEVBA EXTRACTION</span>
              <span className="text-emerald-400">bash</span>
            </div>
            <div className="p-4 font-mono text-sm text-zinc-300 overflow-x-auto">
              <code>olevba gem_collection.pptm</code>
            </div>
          </div>

          <p className="text-zinc-300 leading-relaxed mb-4">
            <code className="bg-zinc-800/80 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">olevba</code> parses the structured streams within <code className="bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono">ppt/vbaProject.bin</code>, extracts the VBA code modules, and automatically tags suspicious IOCs such as PowerShell invocations and Base64 strings.
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden mb-6">
            <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>MediaCache.bas — EXTRACTED VBA MACRO</span>
              <CopyButton text={vbaCode} />
            </div>
            <pre className="p-4 font-mono text-xs md:text-sm text-emerald-300/90 overflow-x-auto">
              <code>{vbaCode}</code>
            </pre>
          </div>
        </section>

        {/* Section 3: PowerShell Payload Deobfuscation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-emerald-400">03.</span> Decoding the PowerShell EncodedCommand
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            The VBA macro constructs a command line invoking <code className="bg-zinc-800/80 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono">powershell.exe -NoProfile -EncodedCommand &lt;Base64&gt;</code>. In PowerShell, <code className="text-white font-mono">-EncodedCommand</code> is formatted as a <strong>Base64-encoded UTF-16LE (Little-Endian Unicode)</strong> byte stream.
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden mb-6">
            <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>POWERSHELL DECODE ONE-LINER</span>
              <CopyButton text={pwshDecode} />
            </div>
            <pre className="p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto">
              <code>{pwshDecode}</code>
            </pre>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800/80 mb-6 bg-black">
            <Image
              src="/images/sunshine/nas_coal_decode.png"
              alt="CyberChef decoding Base64 to UTF-16LE text"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain object-center opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>FIGURE 2: CyberChef Recipe: From Base64 → Decode text (UTF-16LE)</span>
              <span className="text-emerald-400 font-bold">CyberChef</span>
            </div>
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden mb-6">
            <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>DECODED POWERSHELL PAYLOAD</span>
              <CopyButton text={decodedOutput} />
            </div>
            <pre className="p-4 font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto">
              <code>{decodedOutput}</code>
            </pre>
          </div>
        </section>

        {/* Collapsible Section 1: Additional Forensic Tools */}
        <section className="mb-6">
          <details className="group bg-[#0e0e13]/90 border border-zinc-800/90 rounded-xl overflow-hidden transition-all duration-300">
            <summary className="px-6 py-4 cursor-pointer font-mono text-sm text-zinc-300 font-semibold flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
              <span className="flex items-center gap-3">
                <span className="text-emerald-400">🔍</span>
                <span>Additional Forensic Tools for .pptm Files</span>
              </span>
              <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="px-6 pb-6 pt-2 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800/50 space-y-4">
              <p>Depending on the analytical scenario or enterprise environment, several complementary tools can inspect <code className="text-emerald-300 font-mono">.pptm</code> archives without triggering malware:</p>
              
              <div className="bg-black/50 p-4 rounded-lg border border-zinc-800">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-emerald-400">📦</span> 7-Zip Archive Inspection
                </h4>
                <p className="text-zinc-400 mb-2">
                  Since <code className="text-zinc-300 font-mono">.pptm</code> conforms to Office Open XML packaging, any archive utility (7-Zip, unzip) can unpack the contents:
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 font-mono text-xs">
                  <li><code className="text-emerald-300">ppt/vbaProject.bin</code> — Raw compiled OLE compound macro file</li>
                  <li><code className="text-emerald-300">ppt/media/</code> — Embedded raster assets, audio clips, and videos</li>
                  <li><code className="text-emerald-300">ppt/slides/</code> — XML slide definitions and visual text runs</li>
                </ul>
              </div>

              <div className="bg-black/50 p-4 rounded-lg border border-zinc-800">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-emerald-400">🐍</span> oledump.py (Didier Stevens)
                </h4>
                <p className="text-zinc-400 mb-2">
                  A forensic standard for analyzing individual OLE streams inside <code className="text-zinc-300 font-mono">vbaProject.bin</code>, decompressing VBA source streams, and identifying entry points:
                </p>
                <div className="bg-[#050508] p-3 rounded font-mono text-xs text-zinc-300">
                  <code>python oledump.py gem_collection.pptm</code>
                </div>
              </div>
            </div>
          </details>
        </section>

        {/* Collapsible Section 2: Visual GUI Walkthrough */}
        <section className="mb-12">
          <details className="group bg-[#0e0e13]/90 border border-zinc-800/90 rounded-xl overflow-hidden transition-all duration-300">
            <summary className="px-6 py-4 cursor-pointer font-mono text-sm text-zinc-300 font-semibold flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
              <span className="flex items-center gap-3">
                <span className="text-emerald-400">🖥️</span>
                <span>Alternative Method: Visual GUI Walkthrough (Microsoft PowerPoint)</span>
              </span>
              <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="px-6 pb-6 pt-2 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800/50 space-y-3">
              <p>In an isolated sandbox or analysis workstation with Microsoft PowerPoint installed:</p>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Launch <strong className="text-white">gem_collection.pptm</strong> inside PowerPoint without enabling macros.</li>
                <li>Press <kbd className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded font-mono text-xs">ALT + F11</kbd> to bring up the Visual Basic for Applications (VBA) IDE.</li>
                <li>In the left Project Explorer navigation pane, expand <strong className="text-white">VBAProject (gem_collection.pptm)</strong> &rarr; <strong className="text-white">Modules</strong> &rarr; double-click <strong className="text-emerald-400 font-mono">MediaCache</strong>.</li>
                <li>Copy the base64 string from <code className="text-emerald-300 font-mono">encoded = &quot;...&quot;</code>.</li>
                <li>Paste the string into CyberChef or PowerShell as shown above to immediately extract the <code className="text-emerald-300 font-mono">$campaign</code> variable.</li>
              </ol>
            </div>
          </details>
        </section>

        {/* Flag Section */}
        <section className="border-t border-zinc-800 pt-10">
          <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>
            <h3 className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em] mb-3">
              FLAG CAPTURED
            </h3>
            <div className="inline-flex items-center gap-3 bg-black/60 border border-emerald-500/50 px-5 py-3 rounded-xl max-w-full">
              <code className="font-mono text-base md:text-xl text-emerald-300 font-bold break-all">
                {flagText}
              </code>
              <CopyButton text={flagText} />
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
