import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function SensorConfessionWriteup() {
  const pythonScript = `import pyshark

# Extract TCP urgent pointer bytes across the sensor conversation
cap = pyshark.FileCapture('sensor_dump.pcap', display_filter='ip.src == 10.0.5.55 && tcp.urgent_pointer > 0')

flag_chars = []
for pkt in cap:
    try:
        urg_val = int(pkt.tcp.urgent_pointer)
        flag_chars.append(chr(urg_val))
    except AttributeError:
        continue

flag = ''.join(flag_chars)
print("🎉 Reconstructed Sensor Flag:", flag)`;

  const oneliner = `tshark -r sensor_dump.pcap -Y "ip.src == 10.0.5.55 && tcp.urgent_pointer > 0" -T fields -e tcp.urgent_pointer | python -c "import sys; print(''.join([chr(int(x.strip(), 16)) for x in sys.stdin if x.strip()]))"`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-rose-500/30 selection:text-rose-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-rose-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-rose-400 uppercase tracking-[0.3em]">
              ASCWG QUALS • NETWORK FORENSICS • ICS PROTOCOL SMUGGLING
              <span className="animate-blink inline-block w-1.5 h-3 bg-rose-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Sensor Confession: ICS Telemetry Protocol Exfiltration
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/sensor_confession_fiber.jpg" 
                alt="Sensor Confession Network Forensics"
                fill
                className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#1c0e12]/90 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;Our perimeter IDS flagged anomalous telemetry between industrial SCADA sensor controllers. Deep packet inspection indicates covert data exfiltration hiding inside legitimate TCP protocol header fields. Analyze the PCAP to reconstruct the leak.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Network Forensics / Covert Channels</span>
                <span>● <strong>Platform:</strong> ASCWG Qualifications 2026</span>
                <span>● <strong>Flag Format:</strong> <code>ASCWG&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#0e0608] border border-rose-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided Artifacts
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  sensor_dump.pcap
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 94 MB • Packet Capture</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Protocol: TCP Urgent Pointer (URG)</span>
              </div>
              <div className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20 text-center truncate">
                Analyzer: Wireshark / TShark / Scapy
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            In &ldquo;Sensor Confession,&rdquo; participants are thrown into a network forensics scenario involving anomalous traffic originating from industrial control sensors. The challenge required filtering through the noise of a massive PCAP file to find the specific protocol abuse used by the attacker to leak data.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: PCAP Triage &amp; Protocol Analysis
          </h3>

          <div className="bg-[#111111] border-l-4 border-rose-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-rose-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN (The Smuggler&apos;s Truck Fleet)</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Think of network traffic like cars driving on a busy highway. Most of the cars are just regular commuters (normal data). But if you look closely, you might notice a fleet of identical delivery trucks repeatedly driving by, and each truck has a single letter painted on its roof. If you write down the letters as the trucks pass by, they spell out a secret message! In this challenge, the attacker hid the stolen flag by splitting it into tiny pieces and smuggling it inside the &ldquo;headers&rdquo; (the roof) of normal-looking network packets.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 shadow-[0_0_15px_#f43f5e] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How was the flag exfiltrated from the sensor network?</p>
            <p className="text-rose-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-rose-300">Data Smuggling via Protocol Header Manipulation (TCP URG)</code></p>
          </div>

          <p>
            By utilizing Wireshark and <code className="text-rose-400 bg-rose-400/10 px-1 rounded">tshark</code>, we filtered out standard TCP handshakes and focused purely on anomalous packet lengths and malformed headers originating from the sensor subnet. The attacker was exploiting the{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-rose-400 bg-rose-400/10 px-1.5 py-0.5 rounded border border-rose-400/20 hover:bg-rose-400/20 transition-colors">
                TCP Urgent Pointer
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A flag in the TCP header intended to prioritize data, rarely used today, making it perfect for stealthy data exfiltration.
              </span>
            </span>
            {' '}field—typically unused in modern networks—to slowly bleed the flag out over thousands of seemingly benign heartbeat packets, one byte at a time.
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">tshark_extraction.sh</span>
              </div>
              <CopyButton text={`tshark -r capture.pcap -Y "ip.src == 10.0.5.55 && tcp.urgent_pointer > 0" -T fields -e tcp.urgent_pointer`} />
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-rose-400">$</span> tshark -r capture.pcap -Y <span className="text-green-300">&quot;ip.src == 10.0.5.55 &amp;&amp; tcp.urgent_pointer &gt; 0&quot;</span> -T fields -e tcp.urgent_pointer | head -n 8<br/><br/>
                <span className="text-zinc-500"># Output (Hexadecimal values of ASCII chars):</span><br/>
                41 <span className="text-zinc-600 ml-4">// &apos;A&apos;</span><br/>
                53 <span className="text-zinc-600 ml-4">// &apos;S&apos;</span><br/>
                43 <span className="text-zinc-600 ml-4">// &apos;C&apos;</span><br/>
                57 <span className="text-zinc-600 ml-4">// &apos;W&apos;</span><br/>
                47 <span className="text-zinc-600 ml-4">// &apos;G&apos;</span><br/>
                7b <span className="text-zinc-600 ml-4">// &apos;&#123;&apos;</span><br/>
                74 <span className="text-zinc-600 ml-4">// &apos;t&apos;</span><br/>
                33 <span className="text-zinc-600 ml-4">// &apos;3&apos;</span>
              </code>
            </pre>
          </div>

          {/* Section: Python Script */}
          <div className="space-y-4 my-8">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                Automated Python Extractor (`extract_urg.py`):
              </span>
              <CopyButton text={pythonScript} />
            </div>
            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
              <pre><code>{pythonScript}</code></pre>
            </div>
            
            {/* Terminal One-liner */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-rose-400 font-bold uppercase">⚡ Terminal One-Liner (PowerShell / Bash):</span>
                <CopyButton text={oneliner} />
              </div>
              <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <code>{oneliner}</code>
              </div>
            </div>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Tshark Payload Extraction ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-rose-500">
                <li>Load the PCAP and run statistics on endpoint conversations.</li>
                <li>Notice a high volume of packets communicating with an external IP on a non-standard port.</li>
                <li>Use <code className="text-rose-400">tshark -r capture.pcap -Y &quot;ip.src == [SENSOR_IP]&quot; -T fields -e tcp.urgent_pointer</code> to extract the smuggled bytes.</li>
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
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;t3l3m3try_s3ns0r_d4t4_l34k_v14_tcp&#125;
            </p>
          </div>

          {/* Section: The Complete Investigation Path & Mental Roadmap */}
          <div className="bg-[#180a0e] border border-rose-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden my-12">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
              <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                The Complete Investigation Path &amp; Mental Roadmap
              </h3>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Here is the step-by-step roadmap from initial PCAP conversation analysis to decoding the smuggled TCP stream:
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Conversation Triage &amp; IP Isolation</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Ran Wireshark Statistics &rarr; Conversations. Filtered down to the suspicious SCADA telemetry stream originating from sensor IP <code>10.0.5.55</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Header Field Inspection</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Payload appeared as encrypted heartbeat noise. Inspected TCP header fields and spotted non-zero <code>tcp.urgent_pointer</code> values matching valid printable ASCII hex codes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
                <div>
                  <strong className="text-white block text-sm mb-1">TShark Extraction Filter</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Crafted extraction filter <code>ip.src == 10.0.5.55 &amp;&amp; tcp.urgent_pointer &gt; 0</code> to carve the sequential hex byte stream.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Stream Reassembly &amp; Decoding</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Piped extracted bytes into Python to assemble ASCII text: <code>41 53 43 57 47 ... &rarr; ASCWG&#123;...&#125;</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-rose-500/40">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 5</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Flag Submission</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Submitted recovered flag: <code>ASCWG&#123;t3l3m3try_s3ns0r_d4t4_l34k_v14_tcp&#125;</code>.
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
