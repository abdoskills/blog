import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function PicoCTFSharkOnWire2Writeup() {
  const pythonScript = `import struct

with open('capture.pcap', 'rb') as f:
    f.read(24) # Skip PCAP global header
    flag = ''
    while True:
        pkt_hdr = f.read(16)
        if len(pkt_hdr) < 16:
            break
        ts_sec, ts_usec, incl_len, orig_len = struct.unpack('<IIII', pkt_hdr)
        pkt_data = f.read(incl_len)
        
        # IP / UDP parsing (Ethernet header = 14 bytes)
        eth_type = struct.unpack('>H', pkt_data[12:14])[0]
        if eth_type == 0x0800: # IPv4
            ip_hdr = pkt_data[14:]
            if ip_hdr[9] == 17: # UDP protocol
                udp_hdr = ip_hdr[20:28]
                sport, dport = struct.unpack('>HH', udp_hdr[:4])
                if dport == 22 and sport > 5000:
                    flag += chr(sport - 5000)

print("🎉 Decoded Flag:", flag)`;

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
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              PICOCTF 2019 • FORENSICS • NETWORK STEGANOGRAPHY
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Shark on Wire 2: Network Steganography & UDP Port Carving
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
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

        {/* Challenge Overview Card */}
        <div className="bg-[#0b1814]/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400 shadow-[0_0_15px_#34d399]"></div>
          <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-bold mb-2">
            🎯 Mission Objective
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            We are tasked with investigating <code>capture.pcap</code>. The capture contains decoys and noise streams. We must bypass the troll flags, detect anomalous UDP traffic to destination port 22, and extract covert ASCII characters encoded in the source port numbers.
          </p>
          <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
            <span>● <strong>Category:</strong> Network Forensics</span>
            <span>● <strong>Points:</strong> 300 PTS</span>
            <span>● <strong>Flag:</strong> <code>picoCTF&#123;p1LLf3r3d_data_v1a_st3g0&#125;</code></span>
          </div>
        </div>

        {/* Beginner Breakdown */}
        <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#091410] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Normally, when you send data over a network, you put the message inside the packet envelope (the payload). If a spy wants to bypass network firewalls, they don't put the secret inside the envelope; they encode the secret in the <strong>return address port number</strong>! Each packet's source port is offset by 5000 (e.g. Port 5112 becomes <code>5112 - 5000 = 112 = 'p'</code>).
            </p>
          </div>
        </div>

        {/* Traps & Decoys */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            1. Beware of the Decoy Troll Flag
          </h2>

          <div className="bg-[#140d0e] border border-red-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold font-mono text-xs uppercase tracking-wider">
              <span>⚠️ Troll Decoy in UDP Stream 6</span>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              When inspecting UDP streams in Wireshark, Stream 6 contains a fake planted flag: <code>ico&#123;N0t_a_fLag&#125;</code>.
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

        {/* Port Decoding Table */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            2. Source Port Decoding Sequence
          </h2>

          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#141414] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Packet</th>
                  <th className="p-3">Source Port</th>
                  <th className="p-3">Formula</th>
                  <th className="p-3 text-right">Decoded ASCII</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr><td className="p-3">1</td><td className="p-3">5000</td><td className="p-3">Start Marker</td><td className="p-3 text-right text-zinc-500">—</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">2</td><td className="p-3">5112</td><td className="p-3">5112 - 5000 = 112</td><td className="p-3 text-right text-emerald-300 font-bold">p</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">3</td><td className="p-3">5105</td><td className="p-3">5105 - 5000 = 105</td><td className="p-3 text-right text-emerald-300 font-bold">i</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">4</td><td className="p-3">5099</td><td className="p-3">5099 - 5000 = 99</td><td className="p-3 text-right text-emerald-300 font-bold">c</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">5</td><td className="p-3">5111</td><td className="p-3">5111 - 5000 = 111</td><td className="p-3 text-right text-emerald-300 font-bold">o</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">6</td><td className="p-3">5067</td><td className="p-3">5067 - 5000 = 67</td><td className="p-3 text-right text-emerald-300 font-bold">C</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">7</td><td className="p-3">5084</td><td className="p-3">5084 - 5000 = 84</td><td className="p-3 text-right text-emerald-300 font-bold">T</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">8</td><td className="p-3">5070</td><td className="p-3">5070 - 5000 = 70</td><td className="p-3 text-right text-emerald-300 font-bold">F</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">9</td><td className="p-3">5123</td><td className="p-3">5123 - 5000 = 123</td><td className="p-3 text-right text-emerald-300 font-bold">&#123;</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Python Solver */}
        <div className="space-y-4 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              3. Automated PCAP Parser (`solve.py`)
            </h2>
            <CopyButton text={pythonScript} />
          </div>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
            <pre>
              <code>{pythonScript}</code>
            </pre>
          </div>
        </div>

        {/* Flag Box */}
        <div className="bg-[#050508] border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Decoded Network Flag:</p>
          <div className="inline-block bg-black border border-emerald-500/50 px-6 py-3 rounded-xl font-mono text-base md:text-lg text-emerald-300 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            picoCTF&#123;p1LLf3r3d_data_v1a_st3g0&#125;
          </div>
        </div>

      </article>
    </div>
  );
}
