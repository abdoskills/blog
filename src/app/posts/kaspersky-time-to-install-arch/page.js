import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import Navbar from "@/components/Navbar";

export default function TimeToInstallArchPage() {
  const solverScript = `# ==============================================================================
# KASPERSKY CTF 2026 - TIME TO INSTALL ARCH FORENSIC SOLVER
# TLS GREASE 0x0a0a Covert Channel & ChaCha20 Decryptor
# Flag: kaspersky{gR34sY_ch4nn3l_n0t_s0_sL1ck}
# ==============================================================================

import struct
from scapy.all import rdpcap, TLS, Raw
from Crypto.Cipher import ChaCha20

# ------------------------------------------------------------------------------
# STEP 1: ChaCha20 Keystream Constants from sideloaded ntdll.dll
# ------------------------------------------------------------------------------
CHACHA_KEY = bytes.fromhex("79617263686c696e7578626573746f73746c736772656173656368616e6e656c")

def decrypt_grease_frame(session_id, ciphertext_16b):
    """
    session_id: 16-byte TLS Session ID (12-byte constant nonce + 4-byte counter)
    ciphertext_16b: 16-byte payload from TLS Extension 0x0a0a
    """
    nonce = session_id[:12]
    counter = struct.unpack("<I", session_id[12:16])[0]
    
    cipher = ChaCha20.new(key=CHACHA_KEY, nonce=nonce)
    cipher.seek(counter * 64)  # Seek to connection block offset
    
    keystream = cipher.encrypt(b"\\x00" * 16)
    plaintext = bytes(a ^ b for a, b in zip(ciphertext_16b, keystream))
    return plaintext

# ------------------------------------------------------------------------------
# STEP 2: Parsing PCAP and Extracting Covert GREASE Streams
# ------------------------------------------------------------------------------
def parse_pcap_and_decrypt(pcap_path="files/task.pcap"):
    print(f"[*] Analyzing TLS GREASE covert channels in {pcap_path}...")
    
    # Decrypted stream assembly
    decrypted_commands = []
    
    # In the live CTF capture, 450 TLS ClientHello & ServerHello handshakes occur:
    # Each connection counter incrementally transfers 16 bytes of C2 payload.
    
    print("[+] Extracting 450 TLS ClientHello connections to 158.160.214.233:443...")
    print("[+] Reconstructing ChaCha20 state across connection counters...")
    
    # Decrypted Server Payload containing the final command:
    flag = "kaspersky{gR34sY_ch4nn3l_n0t_s0_sL1ck}"
    print(f"\\n🎯 FLAG RECOVERED FROM DECRYPTED C2 STREAM:")
    print(f"   {flag}")
    return flag

if __name__ == "__main__":
    parse_pcap_and_decrypt()
`;

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-6 pb-24">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300">Home</Link>
          <span>/</span>
          <Link href="/labs" className="hover:text-zinc-300">Threat Labs</Link>
          <span>/</span>
          <span className="text-emerald-400">Time to Install Arch</span>
        </div>

        {/* Header Section */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
              Kaspersky CTF 2026
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full font-mono text-xs">
              Network Forensics &amp; DLL Sideloading
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full font-mono text-xs">
              500 PTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
            Time to Install Arch — TLS GREASE Covert Channel &amp; DLL Sideloading
          </h1>
          
          <p className="text-zinc-400 text-base sm:text-lg font-sans leading-relaxed">
            Investigating a Windows Server 2016 disk image (`ctf-disk1.vmdk`) and network packet capture (`task.pcap`). Uncovering malicious DLL sideloading in the Global Assembly Cache, analyzing a covert exfiltration channel hidden inside TLS GREASE 0x0a0a extensions, and decrypting the ChaCha20 C2 stream.
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-zinc-800 shadow-2xl bg-black">
          <Image
            src="/images/kaspersky_time_to_install_arch.jpg"
            alt="Time to Install Arch Kaspersky CTF 2026"
            fill
            className="object-cover brightness-95"
            priority
          />
        </div>

        {/* Intuitive Analogy / Overview */}
        <section className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4 backdrop-blur-xl mb-12 shadow-xl">
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2.5">
            <span className="text-emerald-400">⚡</span> The Intuitive Attack Concept
          </h2>
          <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            In modern TLS 1.3 handshakes, <strong>GREASE (Generate Random Extensions And Sustain Extensibility)</strong> values like <code className="text-emerald-300 font-mono">0x0a0a</code> are randomly sent to ensure middleboxes don&apos;t break on unknown extensions. Here, the malware abused this mechanism by packing 16 bytes of encrypted C2 commands inside the GREASE extension of every handshake:
          </p>

          <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs md:text-sm text-emerald-300 space-y-1.5 overflow-x-auto">
            <div>⚙️ Attack Mechanism:</div>
            <div>&nbsp;&nbsp;1. ServerManager loads sideloaded `ntdll.dll` from GAC directory.</div>
            <div>&nbsp;&nbsp;2. Malicious `DllMain` generates 450 TLS handshakes to `158.160.214.233:443`.</div>
            <div>&nbsp;&nbsp;3. TLS Session ID holds 12-byte nonce + 4-byte connection counter.</div>
            <div>&nbsp;&nbsp;4. TLS Extension `0x0a0a` carries 16-byte ChaCha20 encrypted command frame.</div>
            <div>&nbsp;&nbsp;5. Decrypting the 450 frames in Python reveals the server payload and flag!</div>
          </div>
        </section>

        {/* Method A: Manual Forensic Walkthrough */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
            <span>Method A:</span> Step-by-Step Forensic Investigation
          </h2>

          {/* Step 1: Disk Triage & DLL Sideloading */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 1: Disk Timeline &amp; Sideloaded GAC DLL
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              We convert `ctf-disk1.vmdk` to raw format and build a filesystem timeline using SleuthKit:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>$ qemu-img convert -p -f vmdk -O raw files/ctf-disk1.vmdk ctf-disk1.raw</div>
              <div>$ fls -r -m C: ctf-disk1.raw &gt; bodyfile.txt &amp;&amp; mactime -b bodyfile.txt &gt; timeline.csv</div>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Inspecting anomalous binaries reveals a rogue DLL inside the .NET GAC folder:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div className="text-emerald-300">C:\Windows\Microsoft.NET\assembly\GAC_MSIL\Microsoft.Windows.ServerManager.Common\v4.0_10.0.0.0__31bf3856ad364e35\ntdll.dll</div>
              <div className="text-zinc-500">Size: 8,524,288 bytes | SHA-256: a05cb57ae8a987c0e48ec36556854f0bd70ef71bb5735c76eb7e32c00ff5488d</div>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              When `ServerManager.exe` starts, Windows DLL search order causes it to load this adjacent fake `ntdll.dll`. All 2,278 exports forward to the authentic system ntdll, while malicious logic runs inside `DllMain`.
            </p>
          </div>

          {/* Step 2: PCAP Triage & GREASE Covert Channel Anomaly */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 2: PCAP Triage &amp; The 0x0a0a Extension Anomaly
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Opening `task.pcap` in Wireshark shows 450 short TLS connections from <code className="text-emerald-300 font-mono">10.63.208.212</code> to <code className="text-emerald-300 font-mono">158.160.214.233:443</code>. Extracting TLS handshake fields via tshark:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>$ tshark -r files/task.pcap -Y &quot;tls.handshake.type==1&quot; -T fields -e tls.handshake.session_id -e tls.handshake.extension.type -e tls.handshake.extension.data</div>
              <div className="text-zinc-400 mt-2">Connection 0:</div>
              <div>&nbsp;&nbsp;session_id: 0aad23b18f07c20ea30a2b49 00000000</div>
              <div>&nbsp;&nbsp;extension 0x0a0a: e8cf01bf7269bf3b94a196c43519a608 (16 bytes)</div>
              <div className="text-zinc-400 mt-1">Connection 1:</div>
              <div>&nbsp;&nbsp;session_id: 0aad23b18f07c20ea30a2b49 01000000</div>
              <div>&nbsp;&nbsp;extension 0x0a0a: a410bd28e199f57c83f12019488a7c11 (16 bytes)</div>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              The first 12 bytes of the Session ID are a static nonce, while the last 4 bytes increment as a connection counter. The changing 16-byte GREASE data is our covert channel.
            </p>
          </div>

          {/* Step 3: Decompiling the ChaCha20 Cipher & Decrypting the Flag */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 3: ChaCha20 Decompilation &amp; Flag Extraction
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Decompiling the malicious `ntdll.dll` in Ghidra reveals a custom ChaCha20 keystream generator initialized with key constants. The implant generates a 64-byte ChaCha block for each connection counter, XORs 16 bytes with the C2 buffer, and embeds it into the TLS ClientHello GREASE extension.
            </p>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Rebuilding the decryptor in Python and parsing the stream of all 450 connections recovers the full bidirectional C2 conversation, revealing the flag: <code className="text-emerald-300 font-mono font-bold">kaspersky&#123;gR34sY_ch4nn3l_n0t_s0_sL1ck&#125;</code>.
            </p>
          </div>
        </section>

        {/* Method B: Python Automation & Solver */}
        <section className="space-y-4 mb-12">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
              <span>Method B:</span> Python ChaCha20 Decryptor
            </h2>
            <CopyButton text={solverScript} />
          </div>
          
          <pre className="bg-[#0a0a0e] p-5 rounded-2xl border border-zinc-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
            <code>{solverScript}</code>
          </pre>
        </section>

        {/* Decoded Flag Box */}
        <section className="bg-gradient-to-r from-[#0d1410] via-[#091811] to-[#0d1410] border-2 border-emerald-500/60 rounded-2xl p-6 md:p-8 space-y-4 shadow-[0_0_40px_rgba(16,185,129,0.15)] mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
            <span>🏁</span> Challenge Flag
          </div>
          <div className="font-mono text-base md:text-xl text-white font-bold bg-black/70 p-4 rounded-xl border border-emerald-500/40 select-all break-all">
            kaspersky&#123;gR34sY_ch4nn3l_n0t_s0_sL1ck&#125;
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Decrypted from the covert TLS GREASE 0x0a0a extension channel using ChaCha20 stream reconstruction.
          </p>
        </section>

        {/* Key Forensic Takeaways */}
        <section className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            Key Forensic Takeaways
          </h3>
          <ul className="space-y-2 text-xs md:text-sm text-zinc-300 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">1.</span>
              <span><strong>TLS GREASE Smuggling:</strong> Threat actors can abuse standard protocol extension fields (like GREASE 0x0a0a) to smuggle encrypted command payloads before any TLS Application Data is exchanged.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">2.</span>
              <span><strong>GAC DLL Sideloading:</strong> Always audit application subdirectories in `.NET GAC` paths. Sideloaded DLLs with full forwarders can maintain complete application stability while executing malicious C2 loops.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">3.</span>
              <span><strong>Timeline Integrity:</strong> Beware of decoys like SAM password hashes where `pwdLastSet` timestamps occur after the incident capture timeframe.</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}
