import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "WebNet0: Decrypting TLS Traffic with RSA Private Keys | PicoCTF Forensics",
  description: "Hands-on network forensics breakdown of PicoCTF WebNet0. Importing RSA private keys into Wireshark, decrypting SSL/TLS packet captures, and carving hidden HTTP response headers with tshark.",
};

export default function PicoCTFWebNet0Writeup() {
  const tsharkCmd = `& "C:\\Program Files\\Wireshark\\tshark.exe" -r .\\capture.pcap -Y "http" -V | Select-String "pico"`;
  const tsharkLinux = `tshark -r capture.pcap -Y "http" -V | grep -i "pico"`;

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
              PICOCTF 2019 • NETWORK FORENSICS • TLS DECRYPTION
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            WebNet0: Decrypting TLS Traffic with RSA Private Keys
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>4 min read</span>
            <span>•</span>
            <span className="text-cyan-400">PicoCTF 2019</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">EVIDENCE PCAP</span>
              <span className="text-white font-bold">capture.pcap</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">CRYPTO KEY</span>
              <span className="text-cyan-400 font-bold">picopico.key (RSA)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">DISSECTOR TOOL</span>
              <span className="text-amber-400 font-bold">Wireshark &amp; tshark</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">picoCTF&#123;nongshim...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group">
          <Image
            src="/images/pico_webnet0.jpg"
            alt="TLS Decryption and Packet Capture Analysis"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Decrypting TLS Sessions via Server RSA Private Key</span>
            <span className="text-cyan-400 font-bold">Wireshark Cryptographic Dissector</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 font-sans space-y-12">

          {/* SECTION 1: THE SCENARIO */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                1. The Scenario &amp; The Encrypted TLS Problem
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              We are handed two files:
            </p>
            <ul className="text-xs font-mono text-zinc-300 space-y-1 list-disc list-inside">
              <li><strong className="text-white">capture.pcap:</strong> A packet capture of a client browsing a website over HTTPS (port 443).</li>
              <li><strong className="text-white">picopico.key:</strong> An RSA private key in PEM format.</li>
            </ul>

            <p className="text-sm leading-relaxed">
              Opening <code className="text-white">capture.pcap</code> in Wireshark shows traffic between client port <code className="text-cyan-300">57581</code> and server port <code className="text-cyan-300">443</code>. If you attempt to follow the stream, the application data is encrypted inside TLS records:
            </p>

            <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-400">
              [Client Hello] ➔ [Server Hello] ➔ [Certificate] ➔ [Client Key Exchange] ➔ [Application Data (Encrypted)]
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 2: WIRESHARK RSA SETUP */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                2. Loading the RSA Private Key in Wireshark
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Because the web server in this capture negotiated an RSA key exchange cipher suite (<code className="text-amber-300">TLS_RSA_WITH_AES_...</code>), having the server's private key allows us to decrypt the session pre-master secret.
            </p>

            <div className="space-y-3 font-mono text-xs text-zinc-300">
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl space-y-1">
                <strong className="text-amber-400 block text-sm">Step-by-Step Configuration:</strong>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400 font-sans text-xs">
                  <li>In Wireshark, press <strong className="text-white">Ctrl + Shift + P</strong> (or go to <em>Edit ➔ Preferences</em>).</li>
                  <li>In the left sidebar, click <strong className="text-white">RSA Keys</strong>.</li>
                  <li>Click <strong className="text-cyan-400">Add new keyfile...</strong> and select <code className="text-white">picopico.key</code>.</li>
                  <li>Click <strong className="text-white">OK</strong>.</li>
                </ol>
              </div>
            </div>

            {/* Real Screenshot 1: Wireshark Preferences */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                FIGURE 2: Adding picopico.key to Wireshark RSA Keys Preferences
              </span>
              <div className="flex justify-center">
                <Image 
                  src="/images/webnet0/wireshark_rsa_import.png" 
                  alt="Wireshark RSA Keys configuration window" 
                  width={1394}
                  height={1106}
                  className="w-full max-w-2xl h-auto rounded-lg border border-zinc-800 shadow-md"
                />
              </div>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 3: INSPECTING DECRYPTED HTTP */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                3. Inspecting Decrypted HTTP Traffic &amp; Finding the Flag
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Once the key is saved, reload the capture (<strong className="text-white">Ctrl + R</strong>). Wireshark decrypts the TLS payloads on the fly, and bright green HTTP packets immediately appear in the packet list!
            </p>

            {/* Real Screenshot 2: Decrypted HTTP Traffic List */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                FIGURE 3: TLS Traffic Decrypted into Cleartext HTTP Packets
              </span>
              <div className="w-full overflow-x-auto">
                <Image 
                  src="/images/webnet0/decrypted_http_stream.png" 
                  alt="Decrypted HTTP packets in Wireshark packet list" 
                  width={2878}
                  height={686}
                  className="w-full h-auto rounded-lg border border-zinc-800 shadow-md"
                />
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Look at <strong className="text-white">Packet 32</strong>: it's an <code className="text-emerald-400">HTTP/1.1 200 OK</code> response from the web server.
            </p>

            {/* Real Screenshot 3 & 4: Packet 32 & HTTP Flag Header */}
            <div className="space-y-4">
              <div className="bg-black/60 border border-zinc-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-mono text-zinc-400 block">
                  FIGURE 4: Target Response (Packet 32 — HTTP/1.1 200 OK)
                </span>
                <div className="w-full overflow-x-auto">
                  <Image 
                    src="/images/webnet0/packet_32_highlight.png" 
                    alt="Packet 32 HTTP 200 OK selected" 
                    width={2880}
                    height={28}
                    className="w-full h-auto rounded border border-zinc-800"
                  />
                </div>
              </div>

              <div className="bg-black/60 border border-zinc-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-mono text-zinc-400 block text-center">
                  FIGURE 5: Custom Header in Packet Details Tree (<code className="text-cyan-300">Pico-Flag</code>)
                </span>
                <div className="flex justify-center">
                  <Image 
                    src="/images/webnet0/http_flag_header.png" 
                    alt="Pico-Flag header containing flag in HTTP tree" 
                    width={948}
                    height={524}
                    className="w-full max-w-xl h-auto rounded-lg border border-zinc-800 shadow-md"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Expanding the <strong>Hypertext Transfer Protocol</strong> tree reveals that the server returned a custom HTTP response header:
            </p>

            <div className="p-4 bg-black/70 border border-zinc-800 rounded-xl font-mono text-xs space-y-1 text-zinc-400">
              <p>HTTP/1.1 200 OK</p>
              <p>Server: Apache/2.4.29 (Ubuntu)</p>
              <p className="text-emerald-400 font-bold">Pico-Flag: picoCTF&#123;nongshim.shrimp.crackers&#125;</p>
              <p>Content-Length: 821</p>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 4: FAST TERMINAL CLI */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-cyan-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                4. The Fast Terminal Route (tshark CLI)
              </h2>
            </div>

            <p className="text-sm leading-relaxed">
              Once Wireshark has the key loaded in its preferences profile, you can dump decrypted HTTP headers straight from the terminal with a single command:
            </p>

            {/* Windows PowerShell Command */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-5 shadow-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Windows PowerShell Command:
                </span>
                <CopyButton text={tsharkCmd} label="Copy Command" />
              </div>
              <pre className="text-xs font-mono text-cyan-200 overflow-x-auto p-3 bg-black/70 rounded-lg border border-zinc-800">
                <code>{tsharkCmd}</code>
              </pre>
            </div>

            {/* Real Screenshot 5: Terminal Output */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 shadow-xl space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                FIGURE 6: Terminal Extraction Output via tshark
              </span>
              <div className="w-full overflow-x-auto">
                <Image 
                  src="/images/webnet0/tshark_cli_grep.png" 
                  alt="tshark command extracting picoCTF flag" 
                  width={2302}
                  height={180}
                  className="w-full h-auto rounded-lg border border-zinc-800 shadow-md"
                />
              </div>
            </div>

            {/* Linux Alternative */}
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Linux / macOS Alternative:
                </span>
                <CopyButton text={tsharkLinux} label="Copy Command" />
              </div>
              <pre className="text-xs font-mono text-zinc-300 overflow-x-auto p-3 bg-black/70 rounded-lg border border-zinc-800">
                <code>{tsharkLinux}</code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800" />

          {/* SECTION 5: FORENSIC LESSON */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <span className="w-2.5 h-6 bg-purple-500 rounded-full"></span>
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] m-0">
                5. Forensic Takeaway: Why RSA Key Exchange is Obsolete
              </h2>
            </div>

            <div className="bg-[#141008] border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-amber-400 font-mono uppercase tracking-wider">
                RSA Key Exchange vs. Perfect Forward Secrecy (PFS):
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-1">
                  <strong className="text-white block mb-1">Static RSA Key Exchange (Legacy):</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    The client encrypts the session key using the server&apos;s static public key. If an investigator (or attacker) gets the server&apos;s private key years later, <strong>100% of historical recorded traffic can be passively decrypted</strong>.
                  </p>
                </div>

                <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-1">
                  <strong className="text-emerald-400 block mb-1">Diffie-Hellman / PFS (Modern TLS 1.3):</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Every session negotiates unique, disposable keys (<code className="text-white">ECDHE</code>). Even if the server&apos;s master private key is leaked, past captures cannot be decrypted. In modern DFIR, analysts must capture the browser&apos;s <code className="text-white">SSLKEYLOGFILE</code> in memory to decrypt traffic.
                  </p>
                </div>
              </div>
            </div>

            {/* Flag Output Card */}
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
              <p className="text-zinc-400 mb-2 font-bold">Decrypted Final Flag:</p>
              <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words font-mono">
                picoCTF&#123;nongshim.shrimp.crackers&#125;
              </p>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
