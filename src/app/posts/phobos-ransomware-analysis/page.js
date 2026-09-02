import Image from "next/image";
import Link from "next/link";

export default function PhobosWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-green-500/30 selection:text-green-200">
      
      {/* Navbar / Top Bar */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to Threat Labs
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-4 py-1.5 rounded-full">
            <span className="font-mono text-xs text-green-400 uppercase tracking-[0.3em]">Reverse Engineering • DFIR</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Unpacking Phobos Ransomware: A Reverse Engineering Journey
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 13, 2026</span>
          </div>

          {/* Hero Image */}
          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-700/40 bg-[#111111]/30 backdrop-blur-md p-1">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
              <Image 
                src="/images/phobos_thumbnail.jpg" 
                alt="Phobos Ransomware Analysis"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            If you&apos;ve spent any time analyzing ransomware, you know that the actual encryption algorithm is usually the least interesting part of the malware. The real puzzle is figuring out how it evades detection, digs its claws into the registry, and sets the stage before pulling the trigger.
          </p>
          
          <p>
            Recently, I tore apart a sample of Phobos ransomware (associated with the 8Base campaign) for a CyberDefenders lab. Instead of just dumping the Indicators of Compromise (IoCs), I want to walk you through exactly how I approached this binary using Ghidra, ProcMon, and a bit of Python.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* Section 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            1. The Initial Foothold & Evasion
          </h3>
          
          <p>The first thing that stood out when looking at the PE headers was a glaring lie.</p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> Which legitimate DLL is the malware masquerading as?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">ole32.dll</code></p>
          </div>

          <p>
            By inspecting the Portable Executable (PE) headers using tools like PEStudio or CFF Explorer, I saw that the <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">OriginalFilename</code> property claimed the file was <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">ole32.dll</code>. This is a classic masquerading technique. The authors hope a lazy analyst or a baseline Antivirus scan will see a legitimate Windows COM library and look the other way.
          </p>

          {/* Interactive Deep Dive Accordion */}
          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: PEStudio Analysis ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <p className="mb-4 mt-4">To uncover the masquerading attempt without executing the malware, follow these steps in a safe sandbox environment:</p>
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Open <strong>PEStudio</strong> and drag-and-drop the suspicious executable into the interface.</li>
                <li>Navigate to the <strong>Version</strong> tab in the left-hand directory tree.</li>
                <li>Look at the metadata embedded by the compiler. You will find the <code className="text-zinc-300 bg-zinc-800 px-1 rounded">OriginalFilename</code> string.</li>
                <li>Compare this string (<code className="text-pink-400">ole32.dll</code>) against the actual filename of the executable dropped on disk. The mismatch is an immediate red flag indicating the malware author is attempting to hide behind a legitimate Microsoft binary name.</li>
              </ol>
            </div>
          </details>

          <p>However, firing up ProcMon quickly revealed its true intentions.</p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What is the first API function the malware calls?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">CreateProcessW</code></p>
          </div>

          <p>
            Lacking Administrator rights upon execution, its very first API call was <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">CreateProcessW</code> to spawn an elevated instance of itself. Once it had Admin rights, it didn&apos;t write custom code to bypass the firewall. It simply abused native Windows tools.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What&apos;s the first command the malware uses to turn off a critical security measure?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">netsh advfirewall set currentprofile state off</code></p>
          </div>

          <p>By silently spawning a command shell to execute that command, the front door was kicked wide open.</p>

          <hr className="border-zinc-800 my-12" />

          {/* Section 2 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            2. Identifying the Variant & Cryptography
          </h3>
          
          <p>
            I wanted to know exactly what version of Phobos I was dealing with, but standard string extraction came up empty. The version strings were obfuscated.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What is the malware&apos;s version?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">2.9.1</code></p>
          </div>

          <p>
            During dynamic analysis, I stumbled across a developer backdoor. If you create a dummy file named <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">suppo</code> and place it in the same directory as the executable, the malware enters a hidden debug mode. It generates a log file that helpfully spills its own secrets.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What is the hashing algorithm used by the malware?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">0D55F8833</code></p>
          </div>

          <p>
            Instead of reading thousands of lines of Assembly, I searched the memory in Ghidra for standard cryptographic constants. This led me straight to <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">0xEDB88320</code>—the universal magic constant for CRC32.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* Section 3 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            3. Digging in for the Long Haul (Persistence)
          </h3>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What is the address of the function used for persistence?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">sub_401236</code></p>
          </div>

          <p>
            To find out how Phobos survives a reboot, I jumped into Ghidra&apos;s Symbol Tree and filtered the Imports for registry APIs. I found a call to <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">RegSetValueExW</code>. By tracing the Cross-References (XREFs) backward, I landed in a worker function. Tracing back one more step revealed the Master persistence function controlling the worker.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* Section 4 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            4. The Need for Speed (Encryption Optimization)
          </h3>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> The file size is compared to a specific value. Could you provide this value?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">180000</code></p>
          </div>

          <p>
            Encrypting massive 50GB database files takes hours, giving the victim time to pull the plug. Phobos is smarter than that. By analyzing the <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">GetFileSize</code> API logic, I noticed the malware checking file sizes against the hex value <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">0x180000</code> (which translates to exactly 180,000 bytes, or about 1.5MB).
          </p>
          
          <ul className="list-disc pl-6 space-y-2 marker:text-green-500">
            <li>If a file is smaller than 1.5MB, it encrypts the whole thing.</li>
            <li>If a file is larger, it utilizes <strong>Partial Encryption</strong>—skipping the middle and only destroying the file headers and footers.</li>
          </ul>

          <p>The file is permanently corrupted, but the encryption finishes in seconds instead of hours.</p>

        </div>
      </article>
    </div>
  );
}