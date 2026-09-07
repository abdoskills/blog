import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Shark on Wire 2: Network Steganography & UDP Port Carving | PicoCTF Forensics",
  description: "Hands-on network forensics breakdown of PicoCTF Shark on Wire 2. Detecting protocol anomalies, uncovering UDP source port covert channels, and automated extraction via Python & tshark.",
};

export default function PicoCTFSharkOnWire2Writeup() {
  const psOneLiner = `(& "C:\\Program Files\\Wireshark\\tshark.exe" -r .\\capture.pcap -Y "udp.dstport == 22 && udp.srcport > 5000" -T fields -e udp.srcport | ForEach-Object { [char]([int]$_ - 5000) }) -join ''`;

  const linuxOneLiner = `tshark -r capture.pcap -Y "udp.dstport == 22 && udp.srcport > 5000" -T fields -e udp.srcport | awk '{printf "%c", $1-5000}'`;

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
                
                # Filter for packets to destination port 22 with port > 5000
                if dport == 22 and sport > 5000:
                    flag += chr(sport - 5000)

print("Decoded Network Flag:", flag)`;

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
              PICOCTF 2019 • NETWORK FORENSICS • COVERT CHANNELS
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Shark on Wire 2: Network Steganography &amp; UDP Port Carving
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 31, 2026</span>
            <span>•</span>
            <span className="text-emerald-400">PicoCTF 2019</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">EVIDENCE PCAP</span>
              <span className="text-white font-bold">capture.pcap</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET SERVICE</span>
              <span className="text-emerald-400 font-bold">UDP Port 22 (SSH)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">COVERT ENCODING</span>
              <span className="text-amber-400 font-bold">Source Port - 5000</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FINAL FLAG</span>
              <span className="text-emerald-400 font-bold">picoCTF&#123;p1LLf3...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group">
          <Image
            src="/images/pico_shark_on_wire_2.jpg"
            alt="Shark on Wire 2 Analysis"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Network Header Steganography &amp; UDP Covert Channel Analysis</span>
            <span className="text-emerald-400 font-bold">Wireshark Protocol Dissection</span>
          </div>
        </div>

        {/* Challenge Description Box */}
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
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Provided File (Download &amp; Practice)
                </span>
                <a 
                  href="/downloads/shark_on_wire_2_capture.pcap" 
                  download="capture.pcap"
                  className="flex items-center gap-2 text-emerald-300 hover:text-white font-mono text-sm font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>⬇️ Download capture.pcap</span>
                </a>
                <span className="text-[11px] font-mono text-zinc-400 block mt-2">Size: 115 KB • Packet Capture</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Type: Wireshark / libpcap</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center truncate">
                Target: UDP Port 22 Stream
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 font-sans space-y-12">

          {/* SECTION 1: THE INTUITIVE ANALOGY */}
          <section className="space-y-4">
            <div className="bg-[#07130e] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-md">
              <h3 className="text-emerald-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider m-0">
                💡 The Intuitive Analogy: The Spy&apos;s Return Address
              </h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed m-0">
                When ordinary people mail letters, they write the message inside the envelope (the payload) and put their address on the back. If a spy wants to exfiltrate secret data past mail censors who inspect letter contents, they write generic filler inside every envelope (like &ldquo;hello&rdquo; or &ldquo;aaaaa&rdquo;), but they intentionally forge <strong>fake return postal codes</strong> that encode secret ASCII bytes! This is called <strong>Network Header Steganography (Covert Channel)</strong>.
              </p>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 2: THE DECOY TROLL TRAP */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-red-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                1. Beware of the Decoy Troll Flags (Stream 6)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              When you first open <code className="text-white">capture.pcap</code> in Wireshark and begin inspecting UDP streams, the challenge author planted an intentional trap to deceive automated regex flag scrapers:
            </p>

            <div className="bg-[#140d0e] border border-red-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold font-mono text-xs uppercase tracking-wider">
                <span>⚠️ Trap Alert: Decoy in UDP Stream 6</span>
              </div>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                In Wireshark, right-clicking any UDP packet and selecting <em>Follow ➔ UDP Stream</em> on <strong>Stream 6</strong> displays what looks like a flag at first glance:
              </p>
              <div className="p-3 bg-black rounded-lg border border-red-500/40 font-mono text-xs text-red-300">
                ico&#123;N0t_a_fLag&#125;
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                If you look closely, the prefix is missing the &ldquo;p&rdquo; and literally spells <strong>&ldquo;N0t_a_fLag&rdquo;</strong>. Stop right there: this is a troll decoy. The real flag is hidden elsewhere.
              </p>
              <div className="flex justify-center">
                <Image 
                  src="/images/pico_shark_stream6.png" 
                  alt="Decoy Flag in UDP Stream 6" 
                  width={680} 
                  height={220} 
                  className="w-full max-w-md h-auto rounded-lg border border-zinc-800 shadow-md"
                />
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 3: THE DISCOVERY: SENTINELS IN STREAM 32 & STREAM 60 */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                2. The Discovery: Transmission Sentinels (Stream 32 &amp; Stream 60)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              When scanning through the capture&apos;s UDP conversations with <strong>Show text as: ASCII</strong>, two specific streams immediately catch our attention:
            </p>

            <ul className="text-xs font-mono text-zinc-300 space-y-1 list-disc list-inside">
              <li><strong className="text-cyan-400">Stream 32:</strong> Transmits a single 5-byte payload: <code className="text-white bg-black/50 px-2 py-0.5 rounded border border-zinc-800">start</code></li>
              <li><strong className="text-emerald-400">Stream 60:</strong> Transmits a single 3-byte payload: <code className="text-white bg-black/50 px-2 py-0.5 rounded border border-zinc-800">end</code></li>
            </ul>

            {/* Screenshots 1 & 2: Stream 32 and Stream 60 Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  FIGURE 2: Stream 32 — The &ldquo;start&rdquo; Sentinel
                </span>
                <div className="flex justify-center">
                  <Image 
                    src="/images/shark_on_wire_2/wireshark_stream32_start.png" 
                    alt="Wireshark Follow UDP Stream 32 showing start payload" 
                    width={1292} 
                    height={1560} 
                    className="w-full max-w-sm h-auto rounded-lg border border-zinc-800 shadow-md"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Stream 32 marks the exact beginning of the secret exfiltration channel.
                </p>
              </div>

              <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  FIGURE 3: Stream 60 — The &ldquo;end&rdquo; Sentinel
                </span>
                <div className="flex justify-center">
                  <Image 
                    src="/images/shark_on_wire_2/wireshark_stream60_end.png" 
                    alt="Wireshark Follow UDP Stream 60 showing end payload" 
                    width={1286} 
                    height={1636} 
                    className="w-full max-w-sm h-auto rounded-lg border border-zinc-800 shadow-md"
                  />
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Stream 60 signals that the entire exfiltrated payload has completed transmission.
                </p>
              </div>
            </div>

            <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl font-mono text-xs space-y-1 text-zinc-400">
              <p><strong className="text-white">Forensic Principle:</strong> In covert network communications, attackers use <em>sentinel tokens</em> (like &ldquo;start&rdquo; and &ldquo;end&rdquo;) to synchronize the receiver so it knows exactly when to begin and stop capturing the leaked data.</p>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 4: CRACKING THE COVERT CHANNEL */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                3. Cracking the Covert Channel (Anomalous UDP to Port 22)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Now comes the crucial question: <em>What happened between Stream 32 and Stream 60?</em>
            </p>

            <div className="p-4 bg-[#141008] border border-amber-500/30 rounded-xl space-y-2 text-xs font-sans text-zinc-300">
              <strong className="text-amber-400 font-mono text-sm block">The Protocol Anomaly:</strong>
              <p>
                Inspecting the destination port of both sentinels shows they are targeting <strong>port 22</strong>:
              </p>
              <div className="p-2 bg-black font-mono text-amber-300 rounded border border-zinc-800">
                udp.dstport == 22
              </div>
              <p>
                In standard networking, <strong>port 22 is SSH (Secure Shell)</strong>, which runs exclusively over <strong>TCP</strong>. Seeing <strong>UDP packets</strong> hitting port 22 is a glaring red flag that traffic is abusing the port as a covert channel!
              </p>
            </div>

            <p className="text-sm leading-relaxed">
              Applying the filter <code className="text-emerald-400">udp.dstport == 22</code> displays a sequence of 35 packets:
            </p>

            {/* Screenshot 3: Wireshark Packet List with Red Box */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                FIGURE 4: Anomalous UDP Packets to Port 22 with Encoded Source Ports
              </span>
              <div className="w-full overflow-x-auto">
                <Image 
                  src="/images/shark_on_wire_2/wireshark_port22_covert_channels.png" 
                  alt="Wireshark packet list showing source ports 5112, 5105, 5099 to destination port 22" 
                  width={1938} 
                  height={1144} 
                  className="w-full h-auto rounded-lg border border-zinc-800 shadow-md"
                />
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Notice the red rectangle: while every packet payload contains identical dummy text (<code className="text-zinc-300">aaaaa</code>), the <strong>Source Ports</strong> change on every single packet!
              </p>
            </div>

            <div className="p-5 bg-black/70 border border-emerald-500/30 rounded-xl space-y-3">
              <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold m-0">
                🧮 Why Subtract 5000? (The Mathematical Logic)
              </h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed m-0">
                In standard ASCII, printable characters live between decimal values <strong>32</strong> (&apos; &apos;) and <strong>126</strong> (&apos;~&apos;). For example:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs text-center">
                <div className="bg-black/60 p-2 rounded border border-zinc-800">&apos;p&apos; = 112</div>
                <div className="bg-black/60 p-2 rounded border border-zinc-800">&apos;i&apos; = 105</div>
                <div className="bg-black/60 p-2 rounded border border-zinc-800">&apos;c&apos; = 99</div>
                <div className="bg-black/60 p-2 rounded border border-zinc-800">&apos;o&apos; = 111</div>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed m-0">
                Operating systems reserve ports 0–1023 for privileged system services. To transmit these characters as valid, non-privileged ephemeral UDP ports, the sender simply added an offset of <strong>5000</strong>:
              </p>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-xs text-emerald-400 text-center font-bold">
                Source Port = 5000 + ASCII_BYTE &nbsp;➔&nbsp; ASCII_BYTE = Source Port - 5000
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 5: DECODING THE FLAG (MANUAL UI VS SCRIPT) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-purple-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                4. Decoding the Flag: Manual Converter vs. Automated Script
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Subtracting 5000 from each packet between the <code className="text-cyan-300">start</code> (Packet 1104, port 5000) and <code className="text-emerald-300">end</code> sentinels yields 33 decimal byte values:
            </p>

            <div className="p-3 bg-black/80 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              112 105 99 111 67 84 70 123 112 49 76 76 102 51 114 51 100 95 100 97 116 97 95 118 49 97 95 115 116 51 103 48 125
            </div>

            {/* Screenshot 4: Decimal to ASCII Online Converter */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                FIGURE 5: Converting Decimal Source Ports to ASCII Characters
              </span>
              <div className="flex justify-center">
                <Image 
                  src="/images/shark_on_wire_2/decimal_ascii_flag_decode.png" 
                  alt="Online Decimal to ASCII converter displaying decoded flag" 
                  width={1232} 
                  height={1248} 
                  className="w-full max-w-lg h-auto rounded-lg border border-zinc-800 shadow-md"
                />
              </div>
            </div>

            {/* The Human Transcription Trap Alert */}
            <div className="bg-[#141008] border border-amber-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase tracking-wider">
                <span>⚠️ The Human Transcription Trap</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Notice in manual conversion: typing 33 decimal numbers by hand from Wireshark into a web converter is prone to human error! Notice that packets 1141 and 1143 are both port <strong className="text-white">5076</strong> (<code className="text-amber-300">5076 - 5000 = 76</code> = <code className="text-amber-300">&apos;L&apos;</code>). If an analyst accidentally skips one identical number or typo-transcribes, the flag submission fails.
              </p>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                That is why in professional digital forensics, we write automated scripts or CLI pipelines to extract the exact bytes without human transcription error.
              </p>
            </div>

            {/* Complete Decoding Table */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider m-0">
                Complete Packet-by-Packet Decoding Table:
              </h4>
              <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#090a0d] shadow-xl max-h-96">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#12161b] text-emerald-400 border-b border-zinc-800 sticky top-0">
                    <tr>
                      <th className="p-3">Pkt #</th>
                      <th className="p-3">Source Port</th>
                      <th className="p-3">Math (Port - 5000)</th>
                      <th className="p-3">ASCII Decimal</th>
                      <th className="p-3 text-right">Decoded Character</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    <tr><td className="p-2 text-zinc-500">1104</td><td className="p-2">5000</td><td className="p-2 text-zinc-500">5000 - 5000 = 0</td><td className="p-2 text-zinc-500">—</td><td className="p-2 text-right text-cyan-400">[START]</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1106</td><td className="p-2 text-emerald-400 font-bold">5112</td><td className="p-2">5112 - 5000</td><td className="p-2">112</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">p</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1118</td><td className="p-2 text-emerald-400 font-bold">5105</td><td className="p-2">5105 - 5000</td><td className="p-2">105</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">i</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1122</td><td className="p-2 text-emerald-400 font-bold">5099</td><td className="p-2">5099 - 5000</td><td className="p-2">99</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">c</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1124</td><td className="p-2 text-emerald-400 font-bold">5111</td><td className="p-2">5111 - 5000</td><td className="p-2">111</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">o</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1129</td><td className="p-2 text-emerald-400 font-bold">5067</td><td className="p-2">5067 - 5000</td><td className="p-2">67</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">C</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1131</td><td className="p-2 text-emerald-400 font-bold">5084</td><td className="p-2">5084 - 5000</td><td className="p-2">84</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">T</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1133</td><td className="p-2 text-emerald-400 font-bold">5070</td><td className="p-2">5070 - 5000</td><td className="p-2">70</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">F</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1135</td><td className="p-2 text-emerald-400 font-bold">5123</td><td className="p-2">5123 - 5000</td><td className="p-2">123</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">&#123;</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1137</td><td className="p-2 text-emerald-400 font-bold">5112</td><td className="p-2">5112 - 5000</td><td className="p-2">112</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">p</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1139</td><td className="p-2 text-emerald-400 font-bold">5049</td><td className="p-2">5049 - 5000</td><td className="p-2">49</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">1</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1141</td><td className="p-2 text-emerald-400 font-bold">5076</td><td className="p-2">5076 - 5000</td><td className="p-2">76</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">L</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1143</td><td className="p-2 text-emerald-400 font-bold">5076</td><td className="p-2">5076 - 5000</td><td className="p-2">76</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">L</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1145</td><td className="p-2 text-emerald-400 font-bold">5102</td><td className="p-2">5102 - 5000</td><td className="p-2">102</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">f</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1147</td><td className="p-2 text-emerald-400 font-bold">5051</td><td className="p-2">5051 - 5000</td><td className="p-2">51</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1162</td><td className="p-2 text-emerald-400 font-bold">5114</td><td className="p-2">5114 - 5000</td><td className="p-2">114</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">r</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1164</td><td className="p-2 text-emerald-400 font-bold">5051</td><td className="p-2">5051 - 5000</td><td className="p-2">51</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1166</td><td className="p-2 text-emerald-400 font-bold">5100</td><td className="p-2">5100 - 5000</td><td className="p-2">100</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">d</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1172</td><td className="p-2 text-emerald-400 font-bold">5095</td><td className="p-2">5095 - 5000</td><td className="p-2">95</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1178</td><td className="p-2 text-emerald-400 font-bold">5100</td><td className="p-2">5100 - 5000</td><td className="p-2">100</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">d</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1180</td><td className="p-2 text-emerald-400 font-bold">5097</td><td className="p-2">5097 - 5000</td><td className="p-2">97</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">a</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1187</td><td className="p-2 text-emerald-400 font-bold">5116</td><td className="p-2">5116 - 5000</td><td className="p-2">116</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">t</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1189</td><td className="p-2 text-emerald-400 font-bold">5097</td><td className="p-2">5097 - 5000</td><td className="p-2">97</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">a</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1192</td><td className="p-2 text-emerald-400 font-bold">5095</td><td className="p-2">5095 - 5000</td><td className="p-2">95</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1196</td><td className="p-2 text-emerald-400 font-bold">5118</td><td className="p-2">5118 - 5000</td><td className="p-2">118</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">v</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1199</td><td className="p-2 text-emerald-400 font-bold">5049</td><td className="p-2">5049 - 5000</td><td className="p-2">49</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">1</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1267</td><td className="p-2 text-emerald-400 font-bold">5097</td><td className="p-2">5097 - 5000</td><td className="p-2">97</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">a</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1272</td><td className="p-2 text-emerald-400 font-bold">5095</td><td className="p-2">5095 - 5000</td><td className="p-2">95</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1274</td><td className="p-2 text-emerald-400 font-bold">5115</td><td className="p-2">5115 - 5000</td><td className="p-2">115</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">s</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1276</td><td className="p-2 text-emerald-400 font-bold">5116</td><td className="p-2">5116 - 5000</td><td className="p-2">116</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">t</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1284</td><td className="p-2 text-emerald-400 font-bold">5051</td><td className="p-2">5051 - 5000</td><td className="p-2">51</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1286</td><td className="p-2 text-emerald-400 font-bold">5103</td><td className="p-2">5103 - 5000</td><td className="p-2">103</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">g</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1296</td><td className="p-2 text-emerald-400 font-bold">5048</td><td className="p-2">5048 - 5000</td><td className="p-2">48</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">0</td></tr>
                    <tr><td className="p-2 font-bold text-zinc-400">1301</td><td className="p-2 text-emerald-400 font-bold">5125</td><td className="p-2">5125 - 5000</td><td className="p-2">125</td><td className="p-2 text-right text-emerald-300 font-bold text-sm">&#125;</td></tr>
                    <tr><td className="p-2 text-zinc-500">1303</td><td className="p-2">5000</td><td className="p-2 text-zinc-500">5000 - 5000 = 0</td><td className="p-2 text-zinc-500">—</td><td className="p-2 text-right text-emerald-400">[END]</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 6: FAST TERMINAL ROUTE (TSHARK ONE-LINERS) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                5. The Fast Terminal Route (tshark One-Liners)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Why do manual math when you can extract and decode all 33 characters directly in your shell in a single second?
            </p>

            {/* Windows PowerShell Command */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-5 shadow-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Windows PowerShell One-Liner:
                </span>
                <CopyButton text={psOneLiner} />
              </div>
              <pre className="text-xs font-mono text-cyan-200 overflow-x-auto p-3 bg-black/70 rounded-lg border border-zinc-800">
                <code>{psOneLiner}</code>
              </pre>
            </div>

            {/* Linux / macOS Command */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-5 shadow-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Linux / macOS One-Liner (awk):
                </span>
                <CopyButton text={linuxOneLiner} />
              </div>
              <pre className="text-xs font-mono text-zinc-300 overflow-x-auto p-3 bg-black/70 rounded-lg border border-zinc-800">
                <code>{linuxOneLiner}</code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 7: STANDALONE PYTHON PARSER */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                6. Standalone Python PCAP Parser (`solve.py`)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              If Wireshark or tshark are not available on your target machine, you can parse the raw binary PCAP structure using Python&apos;s standard library (no <code className="text-white">scapy</code> or external dependencies required):
            </p>

            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">solve.py</span>
                <CopyButton text={pythonScript} />
              </div>
              <pre>
                <code>{pythonScript}</code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 8: FORENSIC MATRIX & FINAL FLAG */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-purple-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                7. Forensic Takeaway: Network Steganography in DFIR
              </h2>
            </div>

            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#09090d]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#121217] text-emerald-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Technique</th>
                    <th className="p-3">Detection Filter</th>
                    <th className="p-3">Forensic Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-white">Protocol Anomaly</td>
                    <td className="p-3 text-emerald-300">udp.dstport == 22</td>
                    <td className="p-3 text-zinc-400">SSH communicates exclusively via TCP; UDP traffic on port 22 is an immediate red flag indicating data exfiltration.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Header Steganography</td>
                    <td className="p-3 text-emerald-300">udp.srcport - 5000</td>
                    <td className="p-3 text-zinc-400">DPI (Deep Packet Inspection) checking only payloads sees harmless filler (`aaaaa`), while data is hidden in headers.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Transmission Sentinels</td>
                    <td className="p-3 text-emerald-300">udp.stream eq 32 / 60</td>
                    <td className="p-3 text-zinc-400">Attackers employ explicit start/end markers to synchronize receiving listeners across noisy networks.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Final Flag Box */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-emerald-500/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-2 font-bold">Captured Flag:</p>
              <p className="text-white bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words font-mono">
                picoCTF&#123;p1LLf3r3d_data_v1a_st3g0&#125;
              </p>
              <p className="text-xs text-zinc-500 mt-2 italic">
                (Decoded meaning: &ldquo;pilfered data via stego&rdquo;)
              </p>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
