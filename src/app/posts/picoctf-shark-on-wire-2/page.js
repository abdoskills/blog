import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFSharkOnWire2Writeup() {
  const pythonScript = `import struct

# Open raw PCAP file
with open('capture.pcap', 'rb') as f:
    f.read(24)  # Skip 24-byte PCAP global header
    flag = ''
    while True:
        pkt_hdr = f.read(16)
        if len(pkt_hdr) < 16:
            break
        # Unpack PCAP packet header (timestamp, captured length)
        ts_sec, ts_usec, incl_len, orig_len = struct.unpack('<IIII', pkt_hdr)
        pkt_data = f.read(incl_len)
        
        # Parse Ethernet Header (14 bytes)
        eth_type = struct.unpack('>H', pkt_data[12:14])[0]
        if eth_type == 0x0800:  # IPv4 Protocol
            ip_hdr = pkt_data[14:]
            protocol = ip_hdr[9]
            if protocol == 17:  # UDP Protocol
                udp_hdr = ip_hdr[20:28]
                sport, dport = struct.unpack('>HH', udp_hdr[:4])
                
                # Check for packets sent to destination port 22 with port > 5000
                if dport == 22 and sport > 5000:
                    flag += chr(sport - 5000)

print("🎉 Decoded Network Flag:", flag)`;

  const tsharkCommand = `tshark -r capture.pcap -Y "udp.dstport == 22" -T fields -e udp.srcport`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/picoctf" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to PicoCTF Hub
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • NETWORK STEGANOGRAPHY
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Shark on Wire 2: Network Steganography & UDP Port Carving
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/pico_shark_on_wire_2.jpg" 
                alt="Shark on Wire 2 Analysis"
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
                &ldquo;We found this packet capture. Recover the flag that was pilfered from the network.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Network Forensics / PCAP Analysis</span>
                <span>● <strong>Points:</strong> 300 PTS</span>
                <span>● <strong>Flag Format:</strong> <code>picoCTF&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#050c0a] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided File
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                  capture.pcap
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 115 KB • Packet Capture</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Type: Wireshark / libpcap</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center truncate">
                Target: UDP Port 22 Stream
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: The Intuitive Analogy */}
        <div className="space-y-6 text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#07130e] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-md">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE INTUITIVE ANALOGY (The Spy's Return Address)</h4>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              When normal people mail letters, they write the message inside the envelope (the payload) and put their house address on the back. If a spy wants to send a secret message past government mail censors, they leave the inside of the envelope completely blank (or write generic filler like &ldquo;hello&rdquo;), but they intentionally write specific <strong>fake return postal codes</strong> that spell out secret numbers! This is called <strong>Network Header Steganography</strong>.
            </p>
          </div>
        </div>

        {/* Section 2: Identifying the Decoy Traps */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. Beware of the Decoy Troll Flags
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            When you first open <code>capture.pcap</code> in Wireshark, the challenge author planted intentional traps to deceive automated flag scrapers:
          </p>

          {/* Decoy Box */}
          <div className="bg-[#140d0e] border border-red-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold font-mono text-xs uppercase tracking-wider">
              <span>⚠️ Trap Alert: Decoy in UDP Stream 6</span>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              In Wireshark, following UDP Stream 6 displays an apparent flag. But looking at the text carefully reveals:
            </p>
            <div className="p-3 bg-black rounded-lg border border-red-500/40 font-mono text-xs text-red-300">
              ico&#123;N0t_a_fLag&#125;
            </div>
            <p className="text-xs text-zinc-400 font-sans">
              This is a decoy designed to trick analysts who stop searching after finding the first regex match.
            </p>
            <div className="relative w-full max-w-md mx-auto h-40 rounded-xl overflow-hidden border border-zinc-800 bg-black">
              <Image 
                src="/images/pico_shark_stream6.png" 
                alt="Decoy Flag Stream 6"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Section 3: METHOD A - MANUAL WIRESHARK INVESTIGATION */}
        <div className="space-y-8 mb-14">
          <div className="border-b border-emerald-500/30 pb-4">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
              METHOD A: HANDS-ON WIRESHARK INVESTIGATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
              2. Manual Wireshark Filtering & Port Decoding
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-sans">
              Step-by-step manual process to locate anomalous traffic and decode each byte by hand.
            </p>
          </div>

          <div className="bg-[#0b1814] border border-emerald-500/20 rounded-xl p-5 space-y-4 font-sans text-sm text-zinc-300">
            <h4 className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">🔍 Step-by-Step Wireshark Workflow:</h4>
            <ol className="list-decimal list-inside space-y-2 text-zinc-300">
              <li>Open <code>capture.pcap</code> in Wireshark.</li>
              <li>Apply the display filter for anomalous UDP traffic to destination port 22:
                <div className="my-2 p-2.5 bg-black rounded font-mono text-xs text-emerald-300 border border-emerald-500/30">
                  udp.dstport == 22
                </div>
                <span className="text-xs text-zinc-400 block mt-1">
                  (Note: Port 22 is SSH, which is strictly TCP. Seeing UDP packets to Port 22 is an immediate red flag).
                </span>
              </li>
              <li>Notice the packet sequence: Packet 1 payload is <code>start</code>, Packets 2–33 payload is filler <code>aaaaa</code>, and the final packet is <code>end</code>.</li>
              <li>Look at the <strong>Source Port</strong> column: Port numbers range from <code>5049</code> to <code>5125</code>.</li>
              <li>Subtract <code>5000</code> from each Source Port to get the decimal ASCII character code!</li>
            </ol>
          </div>

          {/* Complete Manual Decoding Table */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Complete Manual Character-by-Character Decoding Table:
            </h4>
            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#090a0d] shadow-xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#12161b] text-emerald-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Pkt #</th>
                    <th className="p-3">Source Port</th>
                    <th className="p-3">Math (Port - 5000)</th>
                    <th className="p-3">ASCII Decimal</th>
                    <th className="p-3 text-right">Decoded Character</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-2.5 text-zinc-500">1</td><td className="p-2.5">5000</td><td className="p-2.5 text-zinc-500">Start Marker</td><td className="p-2.5 text-zinc-500">—</td><td className="p-2.5 text-right text-zinc-500">[START]</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">2</td><td className="p-2.5 text-emerald-400 font-bold">5112</td><td className="p-2.5">5112 - 5000</td><td className="p-2.5">112</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">p</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">3</td><td className="p-2.5 text-emerald-400 font-bold">5105</td><td className="p-2.5">5105 - 5000</td><td className="p-2.5">105</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">i</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">4</td><td className="p-2.5 text-emerald-400 font-bold">5099</td><td className="p-2.5">5099 - 5000</td><td className="p-2.5">99</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">c</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">5</td><td className="p-2.5 text-emerald-400 font-bold">5111</td><td className="p-2.5">5111 - 5000</td><td className="p-2.5">111</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">o</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">6</td><td className="p-2.5 text-emerald-400 font-bold">5067</td><td className="p-2.5">5067 - 5000</td><td className="p-2.5">67</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">C</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">7</td><td className="p-2.5 text-emerald-400 font-bold">5084</td><td className="p-2.5">5084 - 5000</td><td className="p-2.5">84</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">T</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">8</td><td className="p-2.5 text-emerald-400 font-bold">5070</td><td className="p-2.5">5070 - 5000</td><td className="p-2.5">70</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">F</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">9</td><td className="p-2.5 text-emerald-400 font-bold">5123</td><td className="p-2.5">5123 - 5000</td><td className="p-2.5">123</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">&#123;</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">10</td><td className="p-2.5 text-emerald-400 font-bold">5112</td><td className="p-2.5">5112 - 5000</td><td className="p-2.5">112</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">p</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">11</td><td className="p-2.5 text-emerald-400 font-bold">5049</td><td className="p-2.5">5049 - 5000</td><td className="p-2.5">49</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">1</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">12</td><td className="p-2.5 text-emerald-400 font-bold">5076</td><td className="p-2.5">5076 - 5000</td><td className="p-2.5">76</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">L</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">13</td><td className="p-2.5 text-emerald-400 font-bold">5076</td><td className="p-2.5">5076 - 5000</td><td className="p-2.5">76</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">L</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">14</td><td className="p-2.5 text-emerald-400 font-bold">5102</td><td className="p-2.5">5102 - 5000</td><td className="p-2.5">102</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">f</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">15</td><td className="p-2.5 text-emerald-400 font-bold">5051</td><td className="p-2.5">5051 - 5000</td><td className="p-2.5">51</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">16</td><td className="p-2.5 text-emerald-400 font-bold">5114</td><td className="p-2.5">5114 - 5000</td><td className="p-2.5">114</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">r</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">17</td><td className="p-2.5 text-emerald-400 font-bold">5051</td><td className="p-2.5">5051 - 5000</td><td className="p-2.5">51</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">18</td><td className="p-2.5 text-emerald-400 font-bold">5100</td><td className="p-2.5">5100 - 5000</td><td className="p-2.5">100</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">d</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">19</td><td className="p-2.5 text-emerald-400 font-bold">5095</td><td className="p-2.5">5095 - 5000</td><td className="p-2.5">95</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">20</td><td className="p-2.5 text-emerald-400 font-bold">5100</td><td className="p-2.5">5100 - 5000</td><td className="p-2.5">100</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">d</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">21</td><td className="p-2.5 text-emerald-400 font-bold">5097</td><td className="p-2.5">5097 - 5000</td><td className="p-2.5">97</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">a</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">22</td><td className="p-2.5 text-emerald-400 font-bold">5116</td><td className="p-2.5">5116 - 5000</td><td className="p-2.5">116</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">t</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">23</td><td className="p-2.5 text-emerald-400 font-bold">5097</td><td className="p-2.5">5097 - 5000</td><td className="p-2.5">97</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">a</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">24</td><td className="p-2.5 text-emerald-400 font-bold">5095</td><td className="p-2.5">5095 - 5000</td><td className="p-2.5">95</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">25</td><td className="p-2.5 text-emerald-400 font-bold">5118</td><td className="p-2.5">5118 - 5000</td><td className="p-2.5">118</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">v</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">26</td><td className="p-2.5 text-emerald-400 font-bold">5049</td><td className="p-2.5">5049 - 5000</td><td className="p-2.5">49</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">1</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">27</td><td className="p-2.5 text-emerald-400 font-bold">5097</td><td className="p-2.5">5097 - 5000</td><td className="p-2.5">97</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">a</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">28</td><td className="p-2.5 text-emerald-400 font-bold">5095</td><td className="p-2.5">5095 - 5000</td><td className="p-2.5">95</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">29</td><td className="p-2.5 text-emerald-400 font-bold">5115</td><td className="p-2.5">5115 - 5000</td><td className="p-2.5">115</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">s</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">30</td><td className="p-2.5 text-emerald-400 font-bold">5116</td><td className="p-2.5">5116 - 5000</td><td className="p-2.5">116</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">t</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">31</td><td className="p-2.5 text-emerald-400 font-bold">5051</td><td className="p-2.5">5051 - 5000</td><td className="p-2.5">51</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">32</td><td className="p-2.5 text-emerald-400 font-bold">5103</td><td className="p-2.5">5103 - 5000</td><td className="p-2.5">103</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">g</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">33</td><td className="p-2.5 text-emerald-400 font-bold">5048</td><td className="p-2.5">5048 - 5000</td><td className="p-2.5">48</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">0</td></tr>
                  <tr><td className="p-2.5 font-bold text-zinc-400">34</td><td className="p-2.5 text-emerald-400 font-bold">5125</td><td className="p-2.5">5125 - 5000</td><td className="p-2.5">125</td><td className="p-2.5 text-right text-emerald-300 font-bold text-sm">&#125;</td></tr>
                  <tr><td className="p-2.5 text-zinc-500">35</td><td className="p-2.5">5000</td><td className="p-2.5 text-zinc-500">End Marker</td><td className="p-2.5 text-zinc-500">—</td><td className="p-2.5 text-right text-zinc-500">[END]</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 4: METHOD B - AUTOMATED PYTHON PARSER */}
        <div className="space-y-6 mb-14">
          <div className="border-b border-emerald-500/30 pb-4 flex justify-between items-end">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                METHOD B: AUTOMATED RAW PCAP PARSER
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider mt-3">
                3. High-Performance Python PCAP Parser (`solve.py`)
              </h2>
            </div>
            <CopyButton text={pythonScript} />
          </div>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            By reading the raw binary structure of the PCAP file using Python&apos;s <code>struct</code> module, you can parse all network frames and extract the flag without needing Wireshark installed:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>
        </div>

        {/* Section 5: Decoded Flag Box */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            4. Decoded Flag & Verification
          </h2>

          <div className="bg-[#050508] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Extracted Secret Flag:</p>
            <div className="inline-block bg-black border border-emerald-500/60 px-8 py-3.5 rounded-xl font-mono text-base md:text-xl text-emerald-300 font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              picoCTF&#123;p1LLf3r3d_data_v1a_st3g0&#125;
            </div>
            <p className="text-xs text-zinc-400 font-mono italic">
              (Literal meaning: &ldquo;pilfered data via stego&rdquo; &mdash; covert channel exfiltration via network ports).
            </p>
          </div>
        </div>

        {/* Section 6: Key Takeaways Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            5. Network Forensic Investigation Matrix
          </h3>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#121217] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Technique</th>
                  <th className="p-3">Detection Filter</th>
                  <th className="p-3">Forensic Indicator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-white">Protocol Anomaly</td>
                  <td className="p-3 text-emerald-300">udp.dstport == 22</td>
                  <td className="p-3 text-zinc-400">SSH service communicates over TCP; UDP traffic on port 22 is an intentional covert channel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Header Steganography</td>
                  <td className="p-3 text-emerald-300">udp.srcport - 5000</td>
                  <td className="p-3 text-zinc-400">Payload is filled with dummy characters (`aaaaa`) while real bytes are hidden in port numbers.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Decoy Traps</td>
                  <td className="p-3 text-emerald-300">udp.stream eq 6</td>
                  <td className="p-3 text-zinc-400">Challenge authors plant fake troll strings (`ico&#123;N0t_a_fLag&#125;`) to misdirect analysts.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </article>
    </div>
  );
}
