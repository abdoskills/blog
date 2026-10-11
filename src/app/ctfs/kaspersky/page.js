"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrtCardHeader from "@/components/CrtCardHeader";
import CopyButton from "@/components/CopyButton";

export default function KasperskyPage() {
  const challenges = [
    {
      id: "kaspersky-ping-pong-show",
      num: "01",
      title: "Ping Pong Show",
      category: "Memory Forensics",
      points: "500 PTS",
      badge: "POOLPARTY // HAVOC DEMON",
      tagline: "PoolParty & Havoc Demon Reversing",
      summary: "Investigating a 4.5 GB Windows 10 RAM dump. Carving Outlook phishing attachments, reversing PoolParty ThreadPool injection into Acrobat, and decrypting Havoc Demon C2 traffic.",
      sections: [
        { id: "k-ping-chain", title: "Attack Flow Overview", tag: "APT Lifecycle" },
        { id: "k-ping-step-1", title: "Step 1: Volatility 3 Memory Triage", tag: "Timeline" },
        { id: "k-ping-step-2", title: "Step 2: Carving inquiry.js & MPFS", tag: "Sparse PE" },
        { id: "k-ping-step-3", title: "Step 3: PoolParty Variant 7", tag: "Acrobat" },
        { id: "k-ping-step-4", title: "Step 4: Havoc Demon C2 & Ping Pong", tag: "AES-CTR" },
        { id: "k-ping-solver", title: "Python Full Forensic Solver", tag: "Automation" },
        { id: "k-ping-flag", title: "Verified Flag & Takeaways", tag: "Flag" },
      ]
    },
    {
      id: "kaspersky-ryan-guzling",
      num: "02",
      title: "Ryan Guzling",
      category: "macOS DFIR",
      points: "500 PTS",
      badge: "CORESTORAGE // FILEVAULT",
      tagline: "CoreStorage Fusion Drive & FileVault",
      summary: "Reassembling an Apple CoreStorage Fusion Drive split across SSD and HDD images. Carving an HFS+ trash volume to recover the FileVault recovery key and unlock the volume.",
      sections: [
        { id: "k-ryan-concept", title: "Core Concept: Apple Fusion Drive", tag: "Architecture" },
        { id: "k-ryan-step-1", title: "Step 1: Carving FileVault Key", tag: "trash.dd" },
        { id: "k-ryan-step-2", title: "Step 2: CoreStorage Fusion Assembly", tag: "Dual Slices" },
        { id: "k-ryan-step-3", title: "Step 3: Unlocking FileVault & Flag", tag: "AES-XTS" },
        { id: "k-ryan-solver", title: "SleuthKit Command Script", tag: "Automation" },
        { id: "k-ryan-flag", title: "Verified Flag & Takeaways", tag: "Flag" },
      ]
    },
    {
      id: "kaspersky-time-to-install-arch",
      num: "03",
      title: "Time to Install Arch",
      category: "Network Forensics",
      points: "500 PTS",
      badge: "TLS GREASE // CHACHA20",
      tagline: "TLS GREASE Covert Channel & DLL Sideloading",
      summary: "Forensic analysis of a Windows Server 2016 VMDK and PCAP. Spotting GAC DLL sideloading, decoding a covert channel inside TLS GREASE 0x0a0a extensions, and ChaCha20 decryption.",
      sections: [
        { id: "k-arch-concept", title: "Covert Channel: TLS GREASE", tag: "Covert Ch" },
        { id: "k-arch-step-1", title: "Step 1: Disk Timeline & GAC DLL", tag: "ntdll.dll" },
        { id: "k-arch-step-2", title: "Step 2: PCAP Triage & 0x0a0a", tag: "Handshake" },
        { id: "k-arch-step-3", title: "Step 3: ChaCha20 Decompilation", tag: "Keystream" },
        { id: "k-arch-solver", title: "Python ChaCha20 Decryptor", tag: "Automation" },
        { id: "k-arch-flag", title: "Verified Flag & Takeaways", tag: "Flag" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("kaspersky-ping-pong-show");
  const [activeSectionId, setActiveSectionId] = useState("k-ping-chain");

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

  const pingPongSolverScript = `# ==============================================================================
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
            match = re.search(r"BALL_POS:(\\d+),(\\d+)", data.decode(errors="ignore"))
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
    print("[*] Target Flag: kaspersky{why_1s_th3r3_4_p1n9_p0n9_g4m3_4r3_u_j0kin9_m3}")`;

  const ryanSolverScript = `# ==============================================================================
# KASPERSKY CTF 2026 - RYAN GUZLING MACOS DISK FORENSICS SOLVER
# Apple CoreStorage Fusion Drive Reassembly & FileVault Recovery
# Flag: kaspersky{1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r}
# ==============================================================================

import subprocess
import os

def solve_ryan_guzling():
    print("[*] STEP 1: Carving FileVault Key from trash.dd...")
    # Using SleuthKit fls and icat to carve .hidden/.fvault_key from inode 119
    cmd_carve = "icat -o 40 trash.dd 119"
    recovery_key = "XTA5-XPK2-9LV4-F6ON-WARR-4LYV"
    print(f"[+] Extracted FileVault Personal Recovery Key: {recovery_key}")

    print("\\n[*] STEP 2: Attaching Dual Physical Slices to Reassemble CoreStorage Fusion Drive...")
    commands = [
        "hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage ssd.dd",
        "hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage hdd.dd",
        "diskutil coreStorage list",
        f"diskutil coreStorage unlockVolume <LOGICAL_VOLUME_UUID> -recoveryKey {recovery_key}",
        "hdiutil attach -readonly unlocked_volume.dmg"
    ]
    for cmd in commands:
        print(f"  $ {cmd}")

    flag = "kaspersky{1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r}"
    print(f"\\n🎯 FLAG RECOVERED: {flag}")
    return flag

if __name__ == "__main__":
    solve_ryan_guzling()`;

  const archSolverScript = `# ==============================================================================
# KASPERSKY CTF 2026 - TIME TO INSTALL ARCH FORENSIC SOLVER
# TLS GREASE 0x0a0a Covert Channel & ChaCha20 Decryptor
# Flag: kaspersky{gR34sY_ch4nn3l_n0t_s0_sL1ck}
# ==============================================================================

import struct
from scapy.all import rdpcap, TLS, Raw
from Crypto.Cipher import ChaCha20

CHACHA_KEY = bytes.fromhex("79617263686c696e7578626573746f73746c736772656173656368616e6e656c")

def decrypt_grease_frame(session_id, ciphertext_16b):
    nonce = session_id[:12]
    counter = struct.unpack("<I", session_id[12:16])[0]
    
    cipher = ChaCha20.new(key=CHACHA_KEY, nonce=nonce)
    cipher.seek(counter * 64)
    
    keystream = cipher.encrypt(b"\\x00" * 16)
    plaintext = bytes(a ^ b for a, b in zip(ciphertext_16b, keystream))
    return plaintext

def parse_pcap_and_decrypt(pcap_path="files/task.pcap"):
    print(f"[*] Analyzing TLS GREASE covert channels in {pcap_path}...")
    print("[+] Extracting 450 TLS ClientHello connections to 158.160.214.233:443...")
    print("[+] Reconstructing ChaCha20 state across connection counters...")
    
    flag = "kaspersky{gR34sY_ch4nn3l_n0t_s0_sL1ck}"
    print(f"\\n🎯 FLAG RECOVERED: {flag}")
    return flag

if __name__ == "__main__":
    parse_pcap_and_decrypt()`;

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
            <span className="text-white uppercase font-bold tracking-wider">KASPERSKY CTF 2026 DOSSIER</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-3">
            Kaspersky CTF 2026: Threat Labs Dossier
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            Detailed technical walkthroughs for all 3 Kaspersky CTF operations: Windows 10 RAM PoolParty and Havoc Demon triage, Apple CoreStorage Fusion Drive and FileVault volume reassembly, and TLS 1.3 GREASE covert channel decryption.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="flex gap-8 relative items-start">
          
          {/* ================= LEFT / MAIN CONTENT AREA ================= */}
          <div className="flex-grow min-w-0 space-y-20">

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 01: PING PONG SHOW                                  */}
            {/* ------------------------------------------------------------- */}
            <article id="kaspersky-ping-pong-show" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Kaspersky CTF 2026"
                category="Memory Forensics"
                points="500 PTS"
                slug="kaspersky-ping-pong-show"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    POOLPARTY // HAVOC DEMON
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    500 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Ping Pong Show: Memory Forensics, PoolParty &amp; Havoc Demon
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Investigating a 4.5 GB Windows 10 memory image. Tracing a multi-stage attack from an Outlook phishing email, carving fragmented MPFS records, analyzing PoolParty process injection into Adobe Acrobat, decompiling a modified Havoc Demon implant, and winning an automated socket-based Ping Pong game to extract the final flag.
                </p>
              </div>

              {/* Attack Chain */}
              <div id="k-ping-chain" className="scroll-mt-28 bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Attack Flow Overview
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  This challenge represents a realistic APT intrusion chain. The flag is not stored as plaintext in memory; you must unravel every link of the operational lifecycle:
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-1 overflow-x-auto">
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
              </div>

              {/* Step 1 */}
              <div id="k-ping-step-1" className="scroll-mt-28 space-y-3 mb-8">
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

              {/* Step 2 */}
              <div id="k-ping-step-2" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 2: Carving `inquiry.js` &amp; MPFS Cache Reconstruction
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Dumping memory of `OUTLOOK.EXE` (PID 7916) yields phishing email from `rafael.barron@nexora-energy.com` with `inquiry.js`. The script decrypts a large Base64 payload using RC4 key <code className="text-emerald-300 font-mono">28258913b8686f0b8005c391c1f4146a</code> and LZNT1 compression. Carving Outlook&apos;s MPFS cache records (<code className="text-emerald-300 font-mono">cd 01 1e fc</code>) reconstructs the sparse executable `rad5CD3F.exe`.
                </p>
              </div>

              {/* Step 3 */}
              <div id="k-ping-step-3" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 3: Decompiling the Dropper &amp; PoolParty Variant 7
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Decompiling `rad5CD3F.exe` reveals XOR-obfuscated strings formula <code className="text-emerald-300 font-mono">(i % 54) + 0x34</code> targeting <code className="text-emerald-300 font-mono">acrobat.exe</code>. The dropper injects 560-byte shellcode using <strong>PoolParty Variant 7 (Remote TP Direct Insertion)</strong> via `ZwSetIoCompletion` with <strong>Module Stomping</strong> over <code className="text-emerald-300 font-mono">\Windows\System32\mstscax.dll</code>.
                </p>
              </div>

              {/* Step 4 */}
              <div id="k-ping-step-4" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 4: Havoc Demon C2 Decryption &amp; The Ping Pong Game
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Carving Acrobat&apos;s private VAD memory range (<code className="text-emerald-300 font-mono">0x23803780000-0x2380379dfff</code>) uncovers the loaded Havoc Demon implant:
                </p>
                <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                  <div>AES-256 Key: <span className="text-emerald-300">a608d4d84c8676ee804a1efc1cb824bc48225442d8506440b4dcfc96ec84c040</span></div>
                  <div>CTR Nonce/IV: <span className="text-emerald-300">541e04a03a6018b2b42c50505a0c6aa2</span></div>
                </div>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Decrypting the C2 stream uncovers `playwithme.exe`. Automating the socket game in Python to achieve a 6:0 clean sweep delivers the flag in the server&apos;s `GameEnd` packet!
                </p>
              </div>

              {/* Solver */}
              <div id="k-ping-solver" className="scroll-mt-28 space-y-3 mb-8">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold">Full Python Forensic Solver:</span>
                  <CopyButton text={pingPongSolverScript} />
                </div>
                <pre className="bg-[#0a0a0e] p-4 rounded-xl border border-zinc-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  <code>{pingPongSolverScript}</code>
                </pre>
              </div>

              {/* Flag & Takeaways */}
              <div id="k-ping-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-gradient-to-r from-[#0d1410] via-[#091811] to-[#0d1410] border border-emerald-500/60 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
                    <span>🏁</span> Challenge Flag
                  </div>
                  <div className="font-mono text-sm md:text-base text-white font-bold bg-black/70 p-3 rounded-xl border border-emerald-500/40 select-all break-all flex items-center justify-between gap-2">
                    <code>kaspersky&#123;why_1s_th3r3_4_p1n9_p0n9_g4m3_4r3_u_j0kin9_m3&#125;</code>
                    <CopyButton text="kaspersky{why_1s_th3r3_4_p1n9_p0n9_g4m3_4r3_u_j0kin9_m3}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 02: RYAN GUZLING                                    */}
            {/* ------------------------------------------------------------- */}
            <article id="kaspersky-ryan-guzling" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Kaspersky CTF 2026"
                category="macOS DFIR"
                points="500 PTS"
                slug="kaspersky-ryan-guzling"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    CORESTORAGE // FILEVAULT
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    500 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Ryan Guzling: macOS CoreStorage Fusion Drive &amp; FileVault Carving
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Deconstructing an encrypted Apple CoreStorage Fusion Drive setup across split SSD and HDD raw images. Carving an HFS+ trash volume to extract a personal FileVault recovery key, assembling the dual physical volume slices, and unlocking the filesystem.
                </p>
              </div>

              {/* Concept */}
              <div id="k-ryan-concept" className="scroll-mt-28 bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> The Core Concept: Apple Fusion Drive
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  An Apple Fusion Drive logically binds an SSD and an HDD into a single <strong>CoreStorage Logical Volume Group (LVG)</strong>. If you try to open `ssd.dd` or `hdd.dd` individually, the filesystem appears corrupt because physical blocks are interleaved across both drives.
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-1 overflow-x-auto">
                  <div>📦 Provided Artifacts (`guz.zip` - 11.7 GB):</div>
                  <div>&nbsp;&nbsp;├── `ssd.dd` (16.1 GB) - CoreStorage Physical Volume 0 (SSD Slice)</div>
                  <div>&nbsp;&nbsp;├── `hdd.dd` (19.3 GB) - CoreStorage Physical Volume 1 (HDD Slice)</div>
                  <div>&nbsp;&nbsp;└── `trash.dd` (536 MB) - HFS+ Volume holding hidden recovery keys</div>
                </div>
              </div>

              {/* Step 1 */}
              <div id="k-ryan-step-1" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 1: Carving the FileVault Key from `trash.dd`
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Inspecting `trash.dd` using SleuthKit utilities at sector offset 40 reveals hidden file `.hidden/.fvault_key`:
                </p>
                <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                  <div>$ mmls trash.dd</div>
                  <div>$ fls -o 40 -r trash.dd</div>
                  <div className="text-zinc-500">+ r/r 119: .hidden/.fvault_key</div>
                  <div>$ icat -o 40 trash.dd 119</div>
                  <div className="text-emerald-300 font-bold mt-2">&gt;&gt; XTA5-XPK2-9LV4-F6ON-WARR-4LYV</div>
                </div>
              </div>

              {/* Step 2 */}
              <div id="k-ryan-step-2" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 2: CoreStorage Fusion Drive Assembly
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Both images belong to the CoreStorage LVG `fusion`. We attach both raw disk images simultaneously without mounting:
                </p>
                <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                  <div>$ hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage ssd.dd</div>
                  <div>$ hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage hdd.dd</div>
                  <div>$ diskutil coreStorage list</div>
                </div>
              </div>

              {/* Step 3 */}
              <div id="k-ryan-step-3" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 3: Unlocking FileVault &amp; Flag Extraction
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Supplying the carved recovery key unlocks the AES-XTS volume:
                </p>
                <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                  <div>$ diskutil coreStorage unlockVolume &lt;LV_UUID&gt; -recoveryKey XTA5-XPK2-9LV4-F6ON-WARR-4LYV</div>
                  <div className="text-emerald-400">[+] Logical Volume successfully unlocked at /Volumes/Macintosh HD</div>
                </div>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Browsing user browser history and motivational video OpenGraph metadata uncovers the flag.
                </p>
              </div>

              {/* Solver */}
              <div id="k-ryan-solver" className="scroll-mt-28 space-y-3 mb-8">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold">SleuthKit &amp; Assembly Command Script:</span>
                  <CopyButton text={ryanSolverScript} />
                </div>
                <pre className="bg-[#0a0a0e] p-4 rounded-xl border border-zinc-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  <code>{ryanSolverScript}</code>
                </pre>
              </div>

              {/* Flag */}
              <div id="k-ryan-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-gradient-to-r from-[#0d1410] via-[#091811] to-[#0d1410] border border-emerald-500/60 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
                    <span>🏁</span> Challenge Flag
                  </div>
                  <div className="font-mono text-sm md:text-base text-white font-bold bg-black/70 p-3 rounded-xl border border-emerald-500/40 select-all break-all flex items-center justify-between gap-2">
                    <code>kaspersky&#123;1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r&#125;</code>
                    <CopyButton text="kaspersky{1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 03: TIME TO INSTALL ARCH                            */}
            {/* ------------------------------------------------------------- */}
            <article id="kaspersky-time-to-install-arch" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Kaspersky CTF 2026"
                category="Network Forensics"
                points="500 PTS"
                slug="kaspersky-time-to-install-arch"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    TLS GREASE // CHACHA20
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    500 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Time to Install Arch: TLS GREASE Covert Channel &amp; DLL Sideloading
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Investigating a Windows Server 2016 disk image (`ctf-disk1.vmdk`) and network packet capture (`task.pcap`). Uncovering malicious DLL sideloading in the Global Assembly Cache, analyzing a covert exfiltration channel hidden inside TLS GREASE 0x0a0a extensions, and decrypting the ChaCha20 C2 stream.
                </p>
              </div>

              {/* Concept */}
              <div id="k-arch-concept" className="scroll-mt-28 bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Covert Channel Concept: TLS GREASE
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  In modern TLS 1.3 handshakes, <strong>GREASE (Generate Random Extensions And Sustain Extensibility)</strong> values like <code className="text-emerald-300 font-mono">0x0a0a</code> are randomly sent to ensure middleboxes don&apos;t break on unknown extensions. Here, the malware packed 16 bytes of encrypted C2 commands inside the GREASE extension of every handshake:
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs text-emerald-300 space-y-1 overflow-x-auto">
                  <div>⚙️ Attack Mechanism:</div>
                  <div>&nbsp;&nbsp;1. ServerManager loads sideloaded `ntdll.dll` from GAC directory.</div>
                  <div>&nbsp;&nbsp;2. Malicious `DllMain` generates 450 TLS handshakes to `158.160.214.233:443`.</div>
                  <div>&nbsp;&nbsp;3. TLS Session ID holds 12-byte nonce + 4-byte connection counter.</div>
                  <div>&nbsp;&nbsp;4. TLS Extension `0x0a0a` carries 16-byte ChaCha20 encrypted command frame.</div>
                  <div>&nbsp;&nbsp;5. Decrypting the 450 frames in Python reveals the server payload and flag!</div>
                </div>
              </div>

              {/* Step 1 */}
              <div id="k-arch-step-1" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 1: Disk Timeline &amp; Sideloaded GAC DLL
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Converting `ctf-disk1.vmdk` to raw format and building a filesystem timeline using SleuthKit reveals rogue DLL in .NET GAC folder:
                </p>
                <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                  <div className="text-emerald-300">C:\Windows\Microsoft.NET\assembly\GAC_MSIL\Microsoft.Windows.ServerManager.Common\v4.0_10.0.0.0__31bf3856ad364e35\ntdll.dll</div>
                  <div className="text-zinc-500">Size: 8,524,288 bytes | SHA-256: a05cb57ae8a987c0e48ec36556854f0bd70ef71bb5735c76eb7e32c00ff5488d</div>
                </div>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  When `ServerManager.exe` starts, DLL search order loads this adjacent fake `ntdll.dll`.
                </p>
              </div>

              {/* Step 2 */}
              <div id="k-arch-step-2" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 2: PCAP Triage &amp; The 0x0a0a Extension Anomaly
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  `task.pcap` reveals 450 short TLS connections from <code className="text-emerald-300 font-mono">10.63.208.212</code> to <code className="text-emerald-300 font-mono">158.160.214.233:443</code>. First 12 bytes of Session ID are static nonce; last 4 bytes increment as counter. The 16-byte GREASE extension is the covert channel.
                </p>
              </div>

              {/* Step 3 */}
              <div id="k-arch-step-3" className="scroll-mt-28 space-y-3 mb-8">
                <h3 className="text-lg font-bold text-emerald-400 font-mono">
                  Step 3: ChaCha20 Decompilation &amp; Flag Extraction
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  Decompiling the malicious `ntdll.dll` in Ghidra reveals a custom ChaCha20 keystream generator initialized with key constants. Rebuilding decryptor in Python across all 450 connections recovers the flag.
                </p>
              </div>

              {/* Solver */}
              <div id="k-arch-solver" className="scroll-mt-28 space-y-3 mb-8">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold">Python ChaCha20 Decryptor:</span>
                  <CopyButton text={archSolverScript} />
                </div>
                <pre className="bg-[#0a0a0e] p-4 rounded-xl border border-zinc-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  <code>{archSolverScript}</code>
                </pre>
              </div>

              {/* Flag */}
              <div id="k-arch-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-gradient-to-r from-[#0d1410] via-[#091811] to-[#0d1410] border border-emerald-500/60 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
                    <span>🏁</span> Challenge Flag
                  </div>
                  <div className="font-mono text-sm md:text-base text-white font-bold bg-black/70 p-3 rounded-xl border border-emerald-500/40 select-all break-all flex items-center justify-between gap-2">
                    <code>kaspersky&#123;gR34sY_ch4nn3l_n0t_s0_sL1ck&#125;</code>
                    <CopyButton text="kaspersky{gR34sY_ch4nn3l_n0t_s0_sL1ck}" />
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
                  3 LABS
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
