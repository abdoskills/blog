import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Welcome Call!: VoIP Telephony Forensics & Audio Backmasking | SunshineCTF 2026",
  description: "Comprehensive forensics writeup for SunshineCTF Welcome Call! Inspecting SIP handshakes and G.711 mu-law SDP parameters, extracting raw RTP voice streams, and reversing audio backmasking in Audacity.",
};

export default function WelcomeCallWriteup() {
  const pythonExtractScript = `from scapy.all import rdpcap, UDP
import audioop, wave

packets = rdpcap('welcomecall.pcap')
rtp_packets = []

for pkt in packets:
    if UDP in pkt and (pkt[UDP].dport == 4002 or pkt[UDP].sport == 4000):
        payload = bytes(pkt[UDP].payload)
        if len(payload) > 12 and (payload[0] >> 6) == 2:
            seq = int.from_bytes(payload[2:4], 'big')
            cc = payload[0] & 0x0F
            rtp_packets.append((seq, payload[12 + cc * 4:]))

rtp_packets.sort(key=lambda x: x[0])
raw_audio = b''.join([data for seq, data in rtp_packets])

# Convert G.711 mu-law into 16-bit linear PCM WAV
pcm_data = audioop.ulaw2lin(raw_audio, 2)

with wave.open('call.wav', 'wb') as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(8000)
    wf.writeframes(pcm_data)

print(f"Extracted {len(rtp_packets)} RTP packets -> call.wav")`;

  const flagText = "sun{thankyouforplaying}";

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
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
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-cyan-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-[0.3em]">
              SUNSHINECTF 2026 • NETWORK FORENSICS • VOIP &amp; AUDIO
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Welcome Call!: VoIP Telephony Forensics &amp; Audio Backmasking
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-cyan-400">SunshineCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET CAPTURE</span>
              <span className="text-white font-bold">welcomecall.pcap</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">PROTOCOLS</span>
              <span className="text-cyan-400 font-bold">SIP (5060) / RTP</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">AUDIO CODEC</span>
              <span className="text-amber-400 font-bold">G.711 PCMU (8kHz)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">sun&#123;thankyoufor...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/sunshine/welcome_voip.png"
            alt="VoIP Stream Analysis in Wireshark"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Wireshark VoIP Calls Dialog &amp; Audio Stream Player</span>
            <span className="text-cyan-400 font-bold">SIP / RTP Stream Analysis</span>
          </div>
        </div>

        {/* Official Challenge Prompt */}
        <div className="bg-[#0b1418]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Challenge Prompt
              </span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
              &ldquo;Welcome to Bsides Orlando! I just got a call from the flag factory, they said they were looking for their favorite CTFer?&rdquo;
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-cyan-400">01.</span> Initial Reconnaissance &amp; Traffic Inspection
            </h2>
            <p className="mb-4">
              We were provided with a single packet capture file: <code className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20">welcomecall.pcap</code>. The challenge prompt directly referenced a phone call, pointing straight towards Voice-over-IP (VoIP) network traffic.
            </p>
            <p className="mb-6">
              Opening the file in <strong>Wireshark</strong> and navigating to <strong>Statistics &rarr; Protocol Hierarchy</strong> immediately breaks down the packet distribution:
            </p>

            <div className="relative rounded-xl overflow-hidden border border-zinc-800 mb-6 bg-black">
              <Image 
                src="/images/sunshine/welcome_hierarchy.png" 
                alt="Wireshark Protocol Hierarchy" 
                width={800} 
                height={300} 
                className="w-full h-auto object-contain"
              />
            </div>

            <p>
              The capture consists exclusively of:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-zinc-400">
              <li><strong className="text-zinc-200">SIP (Session Initiation Protocol):</strong> 7 signaling packets establishing and terminating the session over UDP port 5060.</li>
              <li><strong className="text-zinc-200">RTP (Real-time Transport Protocol):</strong> 778 packets transmitting the digitized voice audio payload over dynamic UDP ports.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-cyan-400">02.</span> Analyzing the SIP Handshake
            </h2>
            <p className="mb-4">
              Applying the Wireshark filter <code className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded">sip</code> details the call session between caller <code className="text-zinc-200">192.0.2.10</code> and receiver <code className="text-zinc-200">192.0.2.20</code>:
            </p>

            <div className="relative rounded-xl overflow-hidden border border-zinc-800 mb-6 bg-black">
              <Image 
                src="/images/sunshine/welcome_sip.png" 
                alt="SIP Call Flow in Wireshark" 
                width={800} 
                height={300} 
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm font-mono border-collapse border border-zinc-800 bg-[#0d0d12] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                    <th className="p-3">Frame</th>
                    <th className="p-3">Source IP</th>
                    <th className="p-3">Destination IP</th>
                    <th className="p-3">SIP Method</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-3">1</td><td className="p-3">192.0.2.10</td><td className="p-3">192.0.2.20</td><td className="p-3 text-cyan-400">INVITE</td><td className="p-3">Call initiated to sip:board</td></tr>
                  <tr><td className="p-3">2</td><td className="p-3">192.0.2.20</td><td className="p-3">192.0.2.10</td><td className="p-3 text-amber-400">100 Trying</td><td className="p-3">Call progressing</td></tr>
                  <tr><td className="p-3">3</td><td className="p-3">192.0.2.20</td><td className="p-3">192.0.2.10</td><td className="p-3 text-blue-400">180 Ringing</td><td className="p-3">Endpoint ringing</td></tr>
                  <tr><td className="p-3">4</td><td className="p-3">192.0.2.20</td><td className="p-3">192.0.2.10</td><td className="p-3 text-emerald-400">200 OK</td><td className="p-3">Call accepted</td></tr>
                  <tr><td className="p-3">5</td><td className="p-3">192.0.2.10</td><td className="p-3">192.0.2.20</td><td className="p-3 text-purple-400">ACK</td><td className="p-3">Handshake completed</td></tr>
                  <tr><td className="p-3">784</td><td className="p-3">192.0.2.10</td><td className="p-3">192.0.2.20</td><td className="p-3 text-rose-400">BYE</td><td className="p-3">Call terminated after ~16s</td></tr>
                  <tr><td className="p-3">785</td><td className="p-3">192.0.2.20</td><td className="p-3">192.0.2.10</td><td className="p-3 text-emerald-400">200 OK</td><td className="p-3">Teardown acknowledged</td></tr>
                </tbody>
              </table>
            </div>

            <p>
              The <strong>Session Description Protocol (SDP)</strong> payload in Frame 1 and 4 confirmed the audio codec as <code className="text-zinc-200">G.711 &mu;-law (PCMU)</code> sampled at 8000 Hz with 20 ms packet intervals (160 bytes of audio per frame).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-cyan-400">03.</span> Extracting the Audio Stream
            </h2>
            <p className="mb-4">
              In Wireshark, the fastest extraction path is native:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-zinc-400">
              <li>Navigate to <strong className="text-zinc-200">Telephony &rarr; VoIP Calls</strong>.</li>
              <li>Select the detected call (<code className="text-zinc-300">anon &rarr; board</code>).</li>
              <li>Click <strong className="text-zinc-200">Play Streams</strong>, or select the stream and export it as a <code className="text-zinc-200">.wav</code> file.</li>
            </ol>

            <details className="group bg-[#0e0e13] border border-zinc-800 rounded-xl overflow-hidden my-6">
              <summary className="p-4 cursor-pointer font-mono text-sm text-cyan-400 hover:text-cyan-300 flex items-center justify-between list-none">
                <span>[ Optional: Automated Python Scapy Extractor ]</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 pt-0 border-t border-zinc-800/60 bg-[#09090d]">
                <div className="relative mt-3">
                  <CopyButton text={pythonExtractScript} />
                  <pre className="p-4 rounded-lg bg-black/60 font-mono text-xs overflow-x-auto text-zinc-300">
                    {pythonExtractScript}
                  </pre>
                </div>
              </div>
            </details>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-cyan-400">04.</span> Audio Forensics: Reversing the Backmasking
            </h2>
            <p className="mb-4">
              Playing <code className="text-zinc-200">call.wav</code> produced reversed speech sounds with clear syllable inflection, indicating the recording had been backmasked.
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-zinc-400">
              <li>Open <strong>Audacity</strong> and load <code className="text-zinc-200">call.wav</code>.</li>
              <li>Select the track (<code className="text-zinc-200">Ctrl + A</code>).</li>
              <li>Apply <strong className="text-zinc-200">Effect &rarr; Reverse</strong>.</li>
              <li>Play the audio track.</li>
            </ol>

            <div className="bg-[#0b1418] border-l-4 border-cyan-500 p-5 rounded-r-xl my-6">
              <h4 className="text-cyan-400 font-bold mb-1 font-mono text-sm">🎙️ REVERSED AUDIO TRANSCRIPT</h4>
              <p className="text-sm text-zinc-300 italic leading-relaxed">
                &ldquo;Welcome to BSides Orlando. The flag that you are looking for is sun with a left curly bracket. Thank you for playing. Right curly bracket. All lowercase no spaces. Thank you and have a good one.&rdquo;
              </p>
            </div>
          </section>

          {/* Flag Section */}
          <section className="pt-6 border-t border-zinc-800/80">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4">
              05. Flag Recovery
            </h2>
            <div className="relative bg-[#0d1217] border border-emerald-500/40 rounded-xl p-5 shadow-[0_0_25px_rgba(16,185,129,0.15)] flex justify-between items-center">
              <span className="font-mono text-lg md:text-xl text-emerald-400 font-bold tracking-wider">
                {flagText}
              </span>
              <CopyButton text={flagText} />
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
