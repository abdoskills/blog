import Image from "next/image";
import Link from "next/link";

export default function SensorConfessionWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-red-500/30 selection:text-red-200">
      
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
            <span className="font-mono text-xs text-red-400 uppercase tracking-[0.3em]">
              Network Forensics • ICS Sensors
              <span className="animate-blink inline-block w-1.5 h-3 bg-red-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Sensor Confession: Packet Analysis
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/sensor_confession.jpg" 
                alt="Sensor Confession Network Forensics"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            In "Sensor Confession," participants are thrown into a network forensics scenario involving anomalous traffic originating from industrial control sensors. The challenge required filtering through the noise of a massive PCAP file to find the specific protocol abuse used by the attacker to leak data.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: PCAP Triage & Protocol Analysis
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Think of network traffic like cars driving on a busy highway. Most of the cars are just regular commuters (normal data). But if you look closely, you might notice a fleet of identical delivery trucks repeatedly driving by, and each truck has a single letter painted on its roof. If you write down the letters as the trucks pass by, they spell out a secret message! In this challenge, the attacker hid the stolen flag by splitting it into tiny pieces and smuggling it inside the "headers" (the roof) of normal-looking network packets.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How was the flag exfiltrated from the sensor network?</p>
            <p className="text-red-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-red-300">Data Smuggling via Protocol Header Manipulation</code></p>
          </div>

          <p>
            By utilizing Wireshark and <code className="text-pink-400 bg-pink-400/10 px-1 rounded">tshark</code>, we filtered out the standard TCP handshakes and focused purely on anomalous packet lengths and malformed headers originating from the sensor subnet. The attacker was exploiting the{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                TCP Urgent Pointer
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A flag in the TCP header intended to prioritize data, rarely used today, making it perfect for stealthy data exfiltration.
              </span>
            </span>
            {' '}field—typically unused in modern networks—to slowly bleed the flag out over thousands of seemingly benign heartbeat packets, one byte at a time.
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">tshark_extraction.sh</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-pink-400">$</span> tshark -r capture.pcap -Y <span className="text-green-300">"ip.src == 10.0.5.55 &amp;&amp; tcp.urgent_pointer &gt; 0"</span> -T fields -e tcp.urgent_pointer | head -n 8<br/><br/>
                <span className="text-zinc-500"># Output (Hexadecimal values of ASCII chars):</span><br/>
                41 <span className="text-zinc-600 ml-4">// 'A'</span><br/>
                53 <span className="text-zinc-600 ml-4">// 'S'</span><br/>
                43 <span className="text-zinc-600 ml-4">// 'C'</span><br/>
                57 <span className="text-zinc-600 ml-4">// 'W'</span><br/>
                47 <span className="text-zinc-600 ml-4">// 'G'</span><br/>
                7b <span className="text-zinc-600 ml-4">// '&#123;'</span><br/>
                74 <span className="text-zinc-600 ml-4">// 't'</span><br/>
                33 <span className="text-zinc-600 ml-4">// '3'</span>
              </code>
            </pre>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Tshark Payload Extraction ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Load the PCAP and run statistics on endpoint conversations.</li>
                <li>Notice a high volume of packets communicating with an external IP on a non-standard port.</li>
                <li>Use <code className="text-pink-400">tshark -r capture.pcap -Y "ip.src == [SENSOR_IP]" -T fields -e tcp.urgent_pointer</code> (or equivalent manipulated field) to extract the smuggled bytes.</li>
                <li>Pipe the resulting hex stream into Python, convert to ASCII, and decode the final flag string.</li>
              </ol>
            </div>
          </details>
          <hr className="border-zinc-800 my-12" />

          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Constructing the Final Flag
          </h3>
          
          <p className="mb-6">
            The flag wasn&apos;t sitting in plain text in a single packet. It was fragmented across thousands of packets and smuggled within the TCP urgent pointer field. By extracting this specific field across the entire conversation stream, we rebuilt the original binary payload.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">Extraction Command: <code className="text-pink-300">tshark -r capture.pcap -T fields -e tcp.urgent_pointer</code></p>
            <p className="text-zinc-400 mb-4">Decoding Process: <code className="text-pink-300">Hexadecimal Stream to ASCII</code></p>
            
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;t3l3m3try_s3ns0r_d4t4_l34k_v14_tcp&#125;
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}
