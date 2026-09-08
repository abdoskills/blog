import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Rogue Tower: Cellular IMSI Catcher & Exfiltration Analysis | PicoCTF 2026",
  description: "Forensic analysis of a rogue cellular base station packet capture. Detecting unauthorized cell beacons, tracking victim IMSI registrations, and decrypting XOR-encrypted HTTP exfiltration.",
};

export default function PicoCTFRogueTowerWriteup() {
  const tsharkBeacon = `tshark -r rogue_tower.pcap -Y "udp.port == 55000" -T fields -e data.text`;
  const tsharkVictim = `tshark -r rogue_tower.pcap -Y "http.user_agent contains '92058'" -T fields -e ip.src -e http.user_agent`;
  const tsharkExtract = `tshark -r rogue_tower.pcap -Y "http.request.method == POST" -T fields -e http.file_data`;
  const pythonSolver = `python -c "import base64; b = base64.b64decode('QFFWWnZjfkxCCFJABmhbBFxUakEFQAtFb1xXVgEHAAQBRQ=='); key = b'08555787'; print(bytes([x ^ key[i % len(key)] for i, x in enumerate(b)]).decode())"`;
  const flagText = `picoCTF{r0gu3_c3ll_t0w3r_dbc40831}`;

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
              PICOCTF 2026 • FORENSICS • CELLULAR &amp; NETWORK DFIR
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Rogue Tower: Cellular IMSI Catcher &amp; Exfiltration Analysis
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-cyan-400">PicoCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">EVIDENCE PCAP</span>
              <span className="text-white font-bold">rogue_tower.pcap</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">ROGUE TOWER</span>
              <span className="text-red-400 font-bold">CELLID: 92058</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">VICTIM IMSI</span>
              <span className="text-amber-400 font-bold">310410308555787</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">RECOVERED FLAG</span>
              <span className="text-emerald-400 font-bold">picoCTF&#123;r0gu3...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_rogue_tower.jpg"
            alt="Cellular IMSI Catcher & Rogue Base Station Forensics"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Cellular RF Interception &amp; Packet Dissection</span>
            <span className="text-cyan-400 font-bold">SDR Beacon Triage &amp; KPA Decryption</span>
          </div>
        </div>

        {/* Challenge Scenario */}
        <div className="bg-[#0b1418]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Challenge Scenario
              </span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
              An unauthorized cellular base station (IMSI Catcher / Stingray) was detected operating in the area, spoofing mobile network beacons to lure devices away from commercial carrier towers. Our objective is to analyze the captured packet trace (<code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono text-xs">rogue_tower.pcap</code>), identify the rogue tower, trace the compromised handset, and reconstruct the exfiltrated flag.
            </p>
          </div>
        </div>

        {/* Section 1: Spotting the Fake Cell Tower */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">01.</span> Spotting the Rogue Base Station
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Cellular base stations broadcast identity beacons so mobile devices can negotiate connections. In the PCAP, filtering for UDP broadcast traffic on port 55000 displays these advertised towers:
          </p>

          <div className="rounded-xl overflow-hidden border border-zinc-800/80 bg-[#08080c] shadow-lg mb-6">
            <div className="bg-[#12121a] px-4 py-2 flex items-center justify-between border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <span>WIRESHARK BEACON DISCOVERY: UDP 55000</span>
            </div>
            <div className="relative aspect-[16/6] w-full bg-black">
              <Image 
                src="/images/rogue_tower/beacon.png"
                alt="Wireshark UDP Tower Beacons"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>TERMINAL • TSHARK BEACON FILTER</span>
              <CopyButton text={tsharkBeacon} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{tsharkBeacon}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300">
            <div className="text-zinc-500">// Terminal Output:</div>
            <div>CARRIER: Verizon PLMN=310410 CELLID=15606</div>
            <div>CARRIER: AT&amp;T PLMN=310410 CELLID=15607</div>
            <div className="text-red-400 font-bold">UNAUTHORIZED-TEST-NETWORK PLMN=00101 CELLID=92058</div>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            While packets 1 and 2 broadcast legitimate carriers, <strong>Frame 14</strong> broadcasts an explicit <code className="text-red-400">UNAUTHORIZED-TEST-NETWORK</code> with <code className="text-red-400">CELLID=92058</code>.
          </p>
        </section>

        {/* Section 2: Identifying the Compromised Endpoint */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">02.</span> Tracking the Compromised Handset
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Next, we filter HTTP registration requests to see which handset attached to the rogue tower by searching for cell identifier <code className="text-red-400">92058</code>:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>TERMINAL • IDENTIFY VICTIM BY CELLID</span>
              <CopyButton text={tsharkVictim} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{tsharkVictim}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs text-zinc-300">
            <span className="text-amber-400 font-bold">10.100.50.122</span>
            <span className="text-zinc-400"> &nbsp; MobileDevice/1.0 (IMSI:</span>
            <span className="text-cyan-300 font-bold">310410308555787</span>
            <span className="text-zinc-400">; CELL:</span>
            <span className="text-red-400 font-bold">92058</span>
            <span className="text-zinc-400">)</span>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            Device <code className="text-amber-300">10.100.50.122</code> connected directly to the rogue cell. Its International Mobile Subscriber Identity is <code className="text-cyan-300">IMSI: 310410308555787</code>.
          </p>
        </section>

        {/* Section 3: Data Exfiltration via HTTP POST */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">03.</span> Exfiltration Reconstruction &amp; Stream Reassembly
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Following the HTTP connection from <code className="text-amber-300">10.100.50.122</code>, we see the endpoint establishing cleartext POST requests to <code className="text-zinc-200">198.51.100.58:443</code>:
          </p>

          <div className="rounded-xl overflow-hidden border border-zinc-800/80 bg-[#08080c] shadow-lg mb-6">
            <div className="bg-[#12121a] px-4 py-2 flex items-center justify-between border-b border-zinc-800 text-xs font-mono text-zinc-400">
              <span>WIRESHARK HTTP STREAM FOLLOW</span>
            </div>
            <div className="relative aspect-[16/7] w-full bg-black">
              <Image 
                src="/images/rogue_tower/stream.png"
                alt="Wireshark HTTP Stream Exfiltration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            Across frames 17 through 22, the payload is transmitted in 6 consecutive POST requests:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#0b0b10] border border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-500 block">Frame 17 (9 B)</span>
              <span className="text-cyan-300">QFFWWnZjf</span>
            </div>
            <div className="bg-[#0b0b10] border border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-500 block">Frame 18 (9 B)</span>
              <span className="text-cyan-300">kxCCFJABm</span>
            </div>
            <div className="bg-[#0b0b10] border border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-500 block">Frame 19 (9 B)</span>
              <span className="text-cyan-300">hbBFxUakE</span>
            </div>
            <div className="bg-[#0b0b10] border border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-500 block">Frame 20 (9 B)</span>
              <span className="text-cyan-300">FQAtFb1xX</span>
            </div>
            <div className="bg-[#0b0b10] border border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-500 block">Frame 21 (9 B)</span>
              <span className="text-cyan-300">VgEHAAQBR</span>
            </div>
            <div className="bg-[#0b0b10] border border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-500 block">Frame 22 (3 B)</span>
              <span className="text-cyan-300">Q==</span>
            </div>
          </div>

          <div className="bg-[#0a0a0f] p-4 rounded-xl border border-zinc-800 font-mono text-xs space-y-2">
            <span className="text-zinc-500">// Reassembled Base64 String:</span>
            <div className="text-emerald-400 break-all select-all font-bold">
              QFFWWnZjfkxCCFJABmhbBFxUakEFQAtFb1xXVgEHAAQBRQ==
            </div>
          </div>
        </section>

        {/* Section 4: Cryptanalysis & Flag Recovery */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)]">
            <span className="text-cyan-400">04.</span> Known Plaintext Attack (KPA) &amp; XOR Decryption
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Base64 decoding produces 34 raw bytes of ciphertext. Since flags adhere to the standard prefix <code className="text-cyan-300">picoCTF&#123;</code>, we perform a <strong>Known Plaintext Attack</strong> to calculate the keystream:
          </p>

          <div className="bg-[#0e0e14] p-5 rounded-xl border border-zinc-800/80 font-mono text-xs space-y-2">
            <div className="text-zinc-400">Ciphertext[0..7] ⊕ &quot;picoCTF&#123;&quot; = Keystream</div>
            <div className="text-cyan-300 pl-4">0x40 ⊕ &apos;p&apos; (0x70) = &apos;0&apos;</div>
            <div className="text-cyan-300 pl-4">0x51 ⊕ &apos;i&apos; (0x69) = &apos;8&apos;</div>
            <div className="text-cyan-300 pl-4">0x56 ⊕ &apos;c&apos; (0x63) = &apos;5&apos;</div>
            <div className="text-cyan-300 pl-4">0x5A ⊕ &apos;o&apos; (0x6F) = &apos;5&apos;</div>
            <div className="text-cyan-300 pl-4">0x76 ⊕ &apos;C&apos; (0x43) = &apos;5&apos;</div>
            <div className="text-cyan-300 pl-4">0x63 ⊕ &apos;T&apos; (0x54) = &apos;7&apos;</div>
            <div className="text-cyan-300 pl-4">0x7E ⊕ &apos;F&apos; (0x46) = &apos;8&apos;</div>
            <div className="text-cyan-300 pl-4">0x4C ⊕ &apos;&#123;&apos; (0x7B) = &apos;7&apos;</div>
            <div className="pt-2 border-t border-zinc-800 text-amber-400 font-bold">
              Recovered Key: &quot;08555787&quot; (matches last 8 digits of IMSI: 310410308555787)
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
              Option A: Decrypt via Python One-Liner
            </h3>
            <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
              <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
                <span>TERMINAL • PYTHON SOLVER</span>
                <CopyButton text={pythonSolver} />
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                <code>{pythonSolver}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
              Option B: Decrypt via CyberChef
            </h3>
            <div className="bg-[#0b0e14] p-5 rounded-xl border border-zinc-800/80 text-sm space-y-2">
              <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                <li>Paste input: <code className="text-cyan-300 font-mono text-xs">QFFWWnZjfkxCCFJABmhbBFxUakEFQAtFb1xXVgEHAAQBRQ==</code></li>
                <li>Add recipe: <strong className="text-white">From Base64</strong></li>
                <li>Add recipe: <strong className="text-white">XOR</strong> with Key: <code className="text-amber-300 font-mono text-xs">08555787</code> (Type: UTF8)</li>
              </ol>
            </div>
          </div>

          {/* Flag Box */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-[#0a1813] to-emerald-950/40 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                  OFFICIAL CAPTURED FLAG
                </span>
                <span className="text-xl md:text-2xl font-mono font-bold text-white tracking-wide">
                  {flagText}
                </span>
              </div>
              <CopyButton text={flagText} />
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
