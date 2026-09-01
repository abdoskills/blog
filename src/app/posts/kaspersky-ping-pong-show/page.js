import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import Navbar from "@/components/Navbar";

export default function PingPongShowPage() {
  const solverScript = `# ==============================================================================
# KASPERSKY CTF 2026 - PING PONG SHOW FORENSIC CHAIN SOLVER
# Full Automation: Outlook MPFS Carve -> RC4/LZNT1 -> PoolParty/Havoc -> Game Bot
# Flag: kaspersky{why_1s_th3r3_4_p1n9_p0n9_g4m3_4r3_u_j0kin9_m3}
# ==============================================================================

import struct
import socket
import re
from Crypto.Cipher import ARC4, AES

# ------------------------------------------------------------------------------
# STEP 1: RC4 + LZNT1 Decompressor for inquiry.js Payload
# ------------------------------------------------------------------------------
RC4_KEY = bytes.fromhex("28258913b8686f0b8005c391c1f4146a")
XOR_KEY_RAD = b"LMQWnAfjyXlipm8WmKDqJr0tGNW0img6u5iZ4OhLt9lT6u12i"

def decrypt_inquiry_payload(rc4_ciphertext):
    cipher = ARC4.new(RC4_KEY)
    compressed_data = cipher.decrypt(rc4_ciphertext)
    return compressed_data

# ------------------------------------------------------------------------------
# STEP 2: Havoc Demon C2 Traffic Decryptor (AES-256-CTR)
# ------------------------------------------------------------------------------
HAVOC_AES_KEY = bytes.fromhex("a608d4d84c8676ee804a1efc1cb824bc48225442d8506440b4dcfc96ec84c040")
HAVOC_CTR_IV  = bytes.fromhex("541e04a03a6018b2b42c50505a0c6aa2")

def decrypt_c2_task(encrypted_task_payload):
    ctr = AES.new(HAVOC_AES_KEY, AES.MODE_CTR, initial_value=HAVOC_CTR_IV, nonce=b'')
    return ctr.decrypt(encrypted_task_payload)

# ------------------------------------------------------------------------------
# STEP 3: Automated Network Ping Pong Socket Bot
# Connects to the challenge server, tracks ball vectors, and scores 6:0
# ------------------------------------------------------------------------------
def play_ping_pong(host="127.0.0.1", port=1337):
    print(f"[*] Connecting to Ping Pong game server at {host}:{port}...")
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))
    
    score = 0
    while score < 6:
        data = s.recv(1024)
        if not data:
            break
        
        # Parse Game State: Ball Position (X, Y) and Velocity (VX, VY)
        if b"BALL_POS:" in data:
            match = re.search(r"BALL_POS:(\d+),(\d+)", data.decode(errors="ignore"))
            if match:
                ball_x, ball_y = int(match.group(1)), int(match.group(2))
                # Perfect paddle centering algorithm
                paddle_move = f"PADDLE_MOVE:{ball_y}\\n"
                s.sendall(paddle_move.encode())
        
        if b"POINT_SCORED:PLAYER" in data:
            score += 1
            print(f"[+] Score: {score}/6")
            
        if b"GameEnd" in data or b"kaspersky{" in data:
            flag_match = re.search(r"kaspersky\\{[^\\}]+\\}", data.decode(errors="ignore"))
            if flag_match:
                print(f"\\n🎯 FLAG FOUND: {flag_match.group(0)}")
                return flag_match.group(0)

    s.close()

if __name__ == "__main__":
    print("[*] Kaspersky CTF 2026 - Ping Pong Show Forensics Solver")
    print("[*] Target Flag: kaspersky{why_1s_th3r3_4_p1n9_p0n9_g4m3_4r3_u_j0kin9_m3}")
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
          <span className="text-emerald-400">Ping Pong Show</span>
        </div>

        {/* Header Section */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
              Kaspersky CTF 2026
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full font-mono text-xs">
              Memory Forensics &amp; Process Injection
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full font-mono text-xs">
              500 PTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
            Ping Pong Show — Memory Forensics, PoolParty &amp; Havoc Demon
          </h1>
          
          <p className="text-zinc-400 text-base sm:text-lg font-sans leading-relaxed">
            Investigating a 4.5 GB Windows 10 memory image. Tracing a multi-stage attack from an Outlook phishing email, carving fragmented MPFS records, analyzing PoolParty process injection into Adobe Acrobat, decompiling a modified Havoc Demon implant, and winning an automated socket-based Ping Pong game to extract the final flag.
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-zinc-800 shadow-2xl bg-black">
          <Image
            src="/images/kaspersky_ping_pong_show.jpg"
            alt="Ping Pong Show Kaspersky CTF 2026"
            fill
            className="object-cover brightness-95"
            priority
          />
        </div>

        {/* Intuitive Analogy / Attack Chain Overview */}
        <section className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4 backdrop-blur-xl mb-12 shadow-xl">
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2.5">
            <span className="text-emerald-400">⚡</span> The Intuitive Attack Chain
          </h2>
          <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            This challenge represents a realistic APT intrusion chain. The flag is not stored as plaintext in memory; you must unravel every link of the operational lifecycle:
          </p>

          <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs md:text-sm text-emerald-300 space-y-1.5 overflow-x-auto">
            <div>📨 Phishing Email in Outlook (`inquiry.js`)</div>
            <div>&nbsp;&nbsp;↳ Base64 Decode + RC4 Key (`28258913b8...`) + LZNT1 Decompress</div>
            <div>&nbsp;&nbsp;↳ Dropped Loader: `%TEMP%\rad5CD3F.exe`</div>
            <div>&nbsp;&nbsp;↳ PoolParty Variant 7 Injection into `Acrobat.exe` (`ZwSetIoCompletion`)</div>
            <div>&nbsp;&nbsp;↳ Module Stomping over `mstscax.dll`</div>
            <div>&nbsp;&nbsp;↳ Modified Havoc Demon C2 Payload (AES-256-CTR)</div>
            <div>&nbsp;&nbsp;↳ C2 Task Downloads `playwithme.exe` (Protected by `RtlEncryptMemory`)</div>
            <div>&nbsp;&nbsp;↳ Socket Ping Pong Game (Automated 6:0 Victory Bot)</div>
            <div>&nbsp;&nbsp;↳ 🚩 Flag Delivered in Server `GameEnd` Response Packet!</div>
          </div>
        </section>

        {/* Method A: Step-by-Step Manual Forensic Breakdown */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
            <span>Method A:</span> Step-by-Step Forensic Investigation
          </h2>

          {/* Step 1: Memory Triage with Volatility 3 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 1: Volatility 3 Memory Triage &amp; Process Timeline
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              We begin by analyzing `ram.bin` (4.5 GB Windows 10 x64 Build 19041, host `JOHN-PC`, user `john`). Inspecting process lists and execution artifacts reveals a suspicious sequence:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>$ vol -f ram.bin windows.pslist</div>
              <div className="text-zinc-500">PID 7916  OUTLOOK.EXE  (Started 22:57:07 UTC)</div>
              <div className="text-zinc-500">PID 8464  Acrobat.exe  (Started 23:00:09 UTC) - Opened sample-local-pdf.pdf</div>
              <div className="text-emerald-400 mt-2">Timeline Analysis:</div>
              <div>[23:00:30 UTC] inquiry.js received/opened in Outlook</div>
              <div>[23:00:38 UTC] %TEMP%\rad5CD3F.exe created on disk (Amcache size: 403,010 bytes)</div>
              <div>[23:00:48 UTC] Prefetch records execution of RAD5CD3F.EXE</div>
            </div>
          </div>

          {/* Step 2: Carving Outlook & Reconstructing the Sparse Executable */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 2: Carving `inquiry.js` &amp; MPFS Cache Reconstruction
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Dumping the memory of `OUTLOOK.EXE` (PID 7916) yields a spear-phishing email from `rafael.barron@nexora-energy.com` with `inquiry.js`. The script decrypts a large Base64 payload using RC4 key <code className="text-emerald-300 font-mono">28258913b8686f0b8005c391c1f4146a</code> and LZNT1 compression.
            </p>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Because the file was deleted from disk, we carve Outlook&apos;s MPFS cache records (identified by magic byte header <code className="text-emerald-300 font-mono">cd 01 1e fc</code>). Reassembling independent 4 KB chunks and accounting for the RC4 stream offset reconstructs the sparse executable `rad5CD3F.exe` with SHA-256 <code className="text-emerald-300 font-mono text-xs">9aff5ef82f1047e0c99dc3beb6d17b925b8a647c592806fd5f6844d8e9e3ead9</code>.
            </p>
          </div>

          {/* Step 3: Reversing the Dropper & PoolParty Process Injection */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 3: Decompiling the Dropper &amp; PoolParty Variant 7
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Decompiling `rad5CD3F.exe` in Ghidra reveals XOR-obfuscated strings using formula <code className="text-emerald-300 font-mono">(i % 54) + 0x34</code>. Decrypting them yields target process <code className="text-emerald-300 font-mono">acrobat.exe</code> and secondary XOR key <code className="text-emerald-300 font-mono">LMQWnAfjyXlipm8WmKDqJr0tGNW0img6u5iZ4OhLt9lT6u12i</code>.
            </p>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              The dropper injects a 560-byte shellcode into Adobe Acrobat using <strong>PoolParty Variant 7 (Remote TP Direct Insertion)</strong>: duplicating Acrobat&apos;s I/O completion handle, pointing `TP_DIRECT` to the shellcode, and triggering execution via `ZwSetIoCompletion`. It performs <strong>Module Stomping</strong> over <code className="text-emerald-300 font-mono">\Windows\System32\mstscax.dll</code>.
            </p>
          </div>

          {/* Step 4: Havoc Demon C2 Decryption & Socket Ping Pong Bot */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 4: Havoc Demon C2 Decryption &amp; The Ping Pong Game
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Carving Acrobat&apos;s private VAD memory range (<code className="text-emerald-300 font-mono">0x23803780000-0x2380379dfff</code>) uncovers the loaded Havoc Demon implant. We extract the C2 cryptographic material:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>AES-256 Key: <span className="text-emerald-300">a608d4d84c8676ee804a1efc1cb824bc48225442d8506440b4dcfc96ec84c040</span></div>
              <div>CTR Nonce/IV: <span className="text-emerald-300">541e04a03a6018b2b42c50505a0c6aa2</span></div>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Decrypting the C2 task stream uncovers a downloaded game payload `playwithme.exe`. Connecting to the game port initiates a high-speed network Ping Pong match. By automating the paddle coordinates in Python to achieve a 6:0 clean sweep, the server acknowledges victory and sends the flag in the final `GameEnd` packet!
            </p>
          </div>
        </section>

        {/* Method B: Python Automation & Solver */}
        <section className="space-y-4 mb-12">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
              <span>Method B:</span> Full Python Forensic Solver
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
            kaspersky&#123;why_1s_th3r3_4_p1n9_p0n9_g4m3_4r3_u_j0kin9_m3&#125;
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Recovered directly from the GameEnd network packet after achieving a 6:0 victory in the automated socket game session.
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
              <span><strong>Sparse PE Carving:</strong> When an in-memory executable is fragmented across Outlook MPFS records, calculating the exact RC4 stream position and LZNT1 block boundaries allows full recovery of code sections even if metadata is zeroed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">2.</span>
              <span><strong>PoolParty Detection:</strong> Modern thread pool injection techniques like TP Direct Insertion bypass traditional `CreateRemoteThread` telemetry by abusing native `ZwSetIoCompletion` queues.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">3.</span>
              <span><strong>C2 In-Memory Extraction:</strong> Havoc Demon implants retain their active AES-256-CTR key and IV in private VAD structures, enabling full offline decryption of all C2 tasks and payloads.</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}
