"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrtCardHeader from "@/components/CrtCardHeader";
import CopyButton from "@/components/CopyButton";

export default function SunshinePage() {
  const challenges = [
    {
      id: "sunshine-welcome-call",
      num: "01",
      title: "Welcome Call!",
      category: "Network Forensics",
      points: "100 PTS",
      badge: "VOIP // RTP AUDIO",
      tagline: "VoIP Telephony Forensics & Audio Backmasking",
      summary: "Inspecting SIP handshakes and G.711 mu-law SDP parameters, extracting raw RTP voice streams via Python and Wireshark, and reversing audio backmasking in Audacity to recover the flag.",
      sections: [
        { id: "sun-call-overview", title: "SIP Handshake & Codec Triage", tag: "SIP / SDP" },
        { id: "sun-call-rtp", title: "RTP Extraction Script & Conversion", tag: "Scapy" },
        { id: "sun-call-audio", title: "Audio Backmasking in Audacity", tag: "Reversal" },
        { id: "sun-call-flag", title: "Verified Flag", tag: "Flag" },
      ]
    },
    {
      id: "sunshine-u-cut-me-off",
      num: "02",
      title: "u cut me off",
      category: "Steganography",
      points: "150 PTS",
      badge: "PNG // IHDR REPAIR",
      tagline: "PNG IHDR Height Tampering & CRC32 Repair",
      summary: "Forensic analysis of a cropped Discord screenshot. Calculating scanline byte counts from decompressed IDAT streams, identifying hidden image height, patching IHDR dimensions in hex, and recalculating CRC32.",
      sections: [
        { id: "sun-cut-overview", title: "01. PNG Structure & Tampering", tag: "IHDR" },
        { id: "sun-cut-scanlines", title: "02. Scanline Derivation from IDAT", tag: "Math" },
        { id: "sun-cut-hex", title: "03. Hex Patching & CRC32 Repair", tag: "HxD" },
        { id: "sun-cut-flag", title: "04. Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "sunshine-suntrail",
      num: "03",
      title: "suntrail",
      category: "Forensics",
      points: "250 PTS",
      badge: "MSKLC // GRAPH THEORY",
      tagline: "MSKLC Keyboard Layout Snake Trail Walkthrough",
      summary: "Reverse engineering a Microsoft Keyboard Layout Creator (.klc) file. Decoding Shift State 0 directional arrows and Shift State 1 hidden hex chars to trace a snake path across staggered QWERTY keyboard keys.",
      sections: [
        { id: "sun-trail-recon", title: "01. Format Triage & MSKLC", tag: "KLC" },
        { id: "sun-trail-decode", title: "02. Decoding Shift States", tag: "Arrows" },
        { id: "sun-trail-concept", title: "03. Mechanical Stagger & Graph", tag: "Zigzag" },
        { id: "sun-trail-table", title: "State Transition Trace Table", tag: "Path" },
        { id: "sun-trail-flag", title: "04. Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "sunshine-nas-coal",
      num: "04",
      title: "NAS coal",
      category: "Forensics",
      points: "425 PTS",
      badge: "PPTM // OLEVBA MACRO",
      tagline: "PPTM Macro Forensics & PowerShell Base64 Deobfuscation",
      summary: "Forensic analysis of a malicious PowerPoint Macro-Enabled Presentation (.pptm). Extracting VBA code via olevba, analyzing MediaCache.bas, and decoding UTF-16LE Base64 PowerShell payload to recover the flag.",
      sections: [
        { id: "sun-coal-overview", title: "01. Challenge Overview", tag: "PPTM" },
        { id: "sun-coal-olevba", title: "02. Forensic Extraction with olevba", tag: "VBA" },
        { id: "sun-coal-pwsh", title: "03. Decoding EncodedCommand", tag: "UTF-16LE" },
        { id: "sun-coal-flag", title: "Flag Captured", tag: "Flag" },
      ]
    },
    {
      id: "sunshine-my-eyes-burn",
      num: "05",
      title: "my eyes burn",
      category: "Forensics",
      points: "300 PTS",
      badge: "DEADKEY // FINITE AUTOMATA",
      tagline: "MSKLC Dead Key Finite State Machine",
      summary: "Reverse engineering a Microsoft Keyboard Layout Creator (.klc) file. Analyzing dead key chaining and state transitions from scancode 29 to Unicode U+2600 (Black Sun With Rays) to extract the flag.",
      sections: [
        { id: "sun-eyes-overview", title: "01. Challenge Overview", tag: "Prompt" },
        { id: "sun-eyes-chain", title: "02. Dead Key Chaining Mechanics", tag: "FSM" },
        { id: "sun-eyes-trace", title: "03. State Machine Execution Trace", tag: "Transitions" },
        { id: "sun-eyes-solver", title: "04. Automated Python Script", tag: "Solver" },
        { id: "sun-eyes-flag", title: "Flag Captured", tag: "Flag" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("sunshine-welcome-call");
  const [activeSectionId, setActiveSectionId] = useState("sun-call-overview");

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

  // Scripts
  const welcomePythonScript = `from scapy.all import rdpcap, UDP
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

  const cutPythonScript = `import struct, zlib

with open('hereyougo.png', 'rb') as f:
    data = bytearray(f.read())

# Correct height is 418 px (0x01A2) at offset 0x14 (byte 20)
struct.pack_into('>I', data, 20, 418)

# Recalculate CRC32 for IHDR chunk (offset 12 to 29)
new_crc = zlib.crc32(data[12:29]) & 0xFFFFFFFF
struct.pack_into('>I', data, 29, new_crc)

with open('recovered.png', 'wb') as f:
    f.write(data)

print("[+] Successfully repaired IHDR height and CRC!")`;

  const trailKlcSnippet = `LAYOUT

10\tQ\t0\t2198\t0073\t-1
11\tW\t0\t2192\t0077\t-1
12\tE\t0\t2198\t0065\t-1
13\tR\t0\t2192\t0073\t-1
14\tT\t0\t2198\t0075\t-1

1e\tA\t0\t2198\t0075\t-1
1f\tS\t0\t2196\t0071\t-1
20\tD\t0\t2198\t0072\t-1
21\tF\t0\t2196\t005f\t-1
22\tG\t0\t2198\t0063\t-1
23\tH\t0\t25a0\t007d\t-1

2c\tZ\t0\t2192\t006e\t-1
2d\tX\t0\t2196\t007b\t-1
2e\tC\t0\t2192\t0074\t-1
2f\tV\t0\t2196\t0079\t-1
30\tB\t0\t2192\t006b\t-1
31\tN\t0\t2196\t0073\t-1`;

  const trailPythonScript = `import re

KEY_MAP = {
    (0,0): 'Q', (0,1): 'W', (0,2): 'E', (0,3): 'R', (0,4): 'T',
    (1,0): 'A', (1,1): 'S', (1,2): 'D', (1,3): 'F', (1,4): 'G', (1,5): 'H',
    (2,0): 'Z', (2,1): 'X', (2,2): 'C', (2,3): 'V', (2,4): 'B', (2,5): 'N'
}
COORD_MAP = {v: k for k, v in KEY_MAP.items()}

moves, payloads = {}, {}
with open('suntrail.klc', 'r', encoding='utf-16le', errors='ignore') as f:
    for line in f:
        m = re.match(r'^[0-9a-fA-F]+\\s+([A-Z])\\s+0\\s+([0-9a-fA-F]+)\\s+([0-9a-fA-F]+)', line)
        if m:
            key, arrow, char_hex = m.groups()
            moves[key] = arrow.lower()
            payloads[key] = chr(int(char_hex, 16))

curr = 'Q'
flag = []
while curr in moves:
    flag.append(payloads[curr])
    arrow = moves[curr]
    if arrow == '25a0': break
    r, c = COORD_MAP[curr]
    if arrow == '2198': curr = KEY_MAP[(r + 1, c)]
    elif arrow == '2192': curr = KEY_MAP[(r, c + 1)]
    elif arrow == '2196': curr = KEY_MAP[(r - 1, c)]

print("[+] Recovered Flag:", "".join(flag))`;

  const trailTableRows = [
    { step: 1, key: "Q", dir: "↘ (2198)", next: "A", hex: "0073", char: "s", run: "s" },
    { step: 2, key: "A", dir: "↘ (2198)", next: "Z", hex: "0075", char: "u", run: "su" },
    { step: 3, key: "Z", dir: "→ (2192)", next: "X", hex: "006e", char: "n", run: "sun" },
    { step: 4, key: "X", dir: "↖ (2196)", next: "S", hex: "007b", char: "{", run: "sun{" },
    { step: 5, key: "S", dir: "↖ (2196)", next: "W", hex: "0071", char: "q", run: "sun{q" },
    { step: 6, key: "W", dir: "→ (2192)", next: "E", hex: "0077", char: "w", run: "sun{qw" },
    { step: 7, key: "E", dir: "↘ (2198)", next: "D", hex: "0065", char: "e", run: "sun{qwe" },
    { step: 8, key: "D", dir: "↘ (2198)", next: "C", hex: "0072", char: "r", run: "sun{qwer" },
    { step: 9, key: "C", dir: "→ (2192)", next: "V", hex: "0074", char: "t", run: "sun{qwert" },
    { step: 10, key: "V", dir: "↖ (2196)", next: "F", hex: "0079", char: "y", run: "sun{qwerty" },
    { step: 11, key: "F", dir: "↖ (2196)", next: "R", hex: "005f", char: "_", run: "sun{qwerty_" },
    { step: 12, key: "R", dir: "→ (2192)", next: "T", hex: "0073", char: "s", run: "sun{qwerty_s" },
    { step: 13, key: "T", dir: "↘ (2198)", next: "G", hex: "0075", char: "u", run: "sun{qwerty_su" },
    { step: 14, key: "G", dir: "↘ (2198)", next: "B", hex: "0063", char: "c", run: "sun{qwerty_suc" },
    { step: 15, key: "B", dir: "→ (2192)", next: "N", hex: "006b", char: "k", run: "sun{qwerty_suck" },
    { step: 16, key: "N", dir: "↖ (2196)", next: "H", hex: "0073", char: "s", run: "sun{qwerty_sucks" },
    { step: 17, key: "H", dir: "■ (25a0)", next: "Stop", hex: "007d", char: "}", run: "sun{qwerty_sucks}" },
  ];

  const nasVbaCode = `Option Explicit

Public Sub RefreshCache()
    Dim encoded As String
    Dim commandLine As String
    encoded = "JABjAGEAbQBwAGEAaQBnAG4AIAA9ACAAJwBzAHUAbgB7AHkAdQBwAF8AaQBzAHMAYQBfAGcAZQBtAH0AJwANAAoAJABzAG8AdQByAGMAZQAgAD0AIAAnAGgAdAB0AHAAcwA6AC8ALwBnAGUAbQAtAGMAYQBjAGgAZQAuAGUAeABhAG0AcABsAGUALgBpAG4AdgBhAGwAaQBkAC8AYwBvAGEAbAAuAGIAaQBuACcADQAKACQAZABlAHMAdABpAG4AYQB0AGkAbwBuACAAPQAgACcAYwBvAGEAbAAuAGIAaQBuACcADQAKAFsAcABzAGMAdQBzAHQAbwBtAG8AYgBqAGUAYwB0AF0AQAB7AE8AcABlAHIAYQB0AGkAbwBuAD0AJwBkAG8AdwBuAGwAbwBhAGQAJwA7ACAAQwBhAG0AcABhAGkAZwBuAD0AJABjAGEAbQBwAGEAaQBnAG4AOwAgAFMAbwB1AHIAYwBlAD0AJABzAG8AdQByAGMAZQA7ACAARABlAHMAdABpAG4AYQB0AGkAbwBuAD0AJABkAGUAcwB0AGkAbwBuAGQAaQBvAG4AfQANAAoA"
    commandLine = "powershell.exe -NoProfile -EncodedCommand " & encoded
    Debug.Print commandLine
End Sub`;

  const nasPwshDecode = `$encoded = "JABjAGEAbQBwAGEAaQBnAG4AIAA9ACAAJwBzAHUAbgB7AHkAdQBwAF8AaQBzAHMAYQBfAGcAZQBtAH0AJwANAAoAJABzAG8AdQByAGMAZQAgAD0AIAAnAGgAdAB0AHAAcwA6AC8ALwBnAGUAbQAtAGMAYQBjAGgAZQAuAGUAeABhAG0AcABsAGUALgBpAG4AdgBhAGwAaQBkAC8AYwBvAGEAbAAuAGIAaQBuACcADQAKACQAZABlAHMAdABpAG4AYQB0AGkAbwBuACAAPQAgACcAYwBvAGEAbAAuAGIAaQBuACcADQAKAFsAcABzAGMAdQBzAHQAbwBtAG8AYgBqAGUAYwB0AF0AQAB7AE8AcABlAHIAYQB0AGkAbwBuAD0AJwBkAG8AdwBuAGwAbwBhAGQAJwA7ACAAQwBhAG0AcABhAGkAZwBuAD0AJABjAGEAbQBwAGEAaQBnAG4AOwAgAFMAbwB1AHIAYwBlAD0AJABzAG8AdQByAGMAZQA7ACAARABlAHMAdABpAG4AYQB0AGkAbwBuAD0AJABkAGUAcwB0AGkAbwBuAGQAaQBvAG4AfQANAAoA"
[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String($encoded))`;

  const nasDecodedOutput = `$campaign = 'sun{yup_issa_gem}'
$source = 'https://gem-cache.example.invalid/coal.bin'
$destination = 'coal.bin'
[pscustomobject]@{Operation='download'; Campaign=$campaign; Source=$source; Destination=$destination}`;

  const eyesKlcLayout = `29\tOEM_3\t0\t0060@\t007e\t-1`;
  const eyesDeadKeySnippet = `DEADKEY\t0060
0073\t02d0@

DEADKEY\t02d0
0075\t02ed@
...
DEADKEY\t02b0
007d\t2600`;

  const eyesPythonSolver = `import re

with open('boardwriter.klc', 'r', encoding='utf-16le', errors='ignore') as f:
    content = f.read()

deadkey_blocks = re.findall(r'DEADKEY\\s+([0-9a-fA-F]+)\\s*\\n([0-9a-fA-F]+)\\s+([0-9a-fA-F]+@?)', content)

transitions = {}
for state, in_char_hex, next_state in deadkey_blocks:
    transitions[state.lower()] = (int(in_char_hex, 16), next_state.lower())

current_state = '0060'
flag_chars = []

while True:
    if current_state not in transitions: break
    in_code, next_target = transitions[current_state]
    flag_chars.append(chr(in_code))
    if next_target == '2600':
        print(f"[+] Reached Sun Symbol (U+2600)! Flag: {''.join(flag_chars)}")
        break
    current_state = next_target.rstrip('@')`;

  const eyesTransitions = [
    { step: 1, current: "0060", hex: "0x0073", char: "s", next: "02d0@" },
    { step: 2, current: "02d0", hex: "0x0075", char: "u", next: "02ed@" },
    { step: 3, current: "02ed", hex: "0x006e", char: "n", next: "02b4@" },
    { step: 4, current: "02b4", hex: "0x007b", char: "{", next: "02ef@" },
    { step: 5, current: "02ef", hex: "0x0070", char: "p", next: "02ba@" },
    { step: 6, current: "02ba", hex: "0x0072", char: "r", next: "02c9@" },
    { step: 7, current: "02c9", hex: "0x0061", char: "a", next: "02d3@" },
    { step: 8, current: "02d3", hex: "0x0069", char: "i", next: "02e9@" },
    { step: 9, current: "02e9", hex: "0x0073", char: "s", next: "02bd@" },
    { step: 10, current: "02bd", hex: "0x0065", char: "e", next: "02cd@" },
    { step: 11, current: "02cd", hex: "0x0074", char: "t", next: "02e4@" },
    { step: 12, current: "02e4", hex: "0x0068", char: "h", next: "02d8@" },
    { step: 13, current: "02d8", hex: "0x0065", char: "e", next: "02ee@" },
    { step: 14, current: "02ee", hex: "0x0073", char: "s", next: "02d4@" },
    { step: 15, current: "02d4", hex: "0x0075", char: "u", next: "02e1@" },
    { step: 16, current: "02e1", hex: "0x006e", char: "n", next: "02b0@" },
    { step: 17, current: "02b0", hex: "0x007d", char: "}", next: "2600 (Black Sun With Rays)" },
  ];

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
            <span className="text-white uppercase font-bold tracking-wider">SUNSHINECTF 2026 DOSSIER</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-3">
            SunshineCTF 2026: Forensics Operations Dossier
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            Full technical writeups for all 5 SunshineCTF forensics challenges: VoIP telephony stream carving, PNG IHDR height tampering, MSKLC typewriter snake trail graph walking, PPTM VBA macro deobfuscation, and dead key finite state machine analysis.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="flex gap-8 relative items-start">
          
          {/* ================= LEFT / MAIN CONTENT AREA ================= */}
          <div className="flex-grow min-w-0 space-y-20">

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 01: WELCOME CALL!                                   */}
            {/* ------------------------------------------------------------- */}
            <article id="sunshine-welcome-call" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="SunshineCTF 2026"
                category="Network Forensics"
                points="100 PTS"
                slug="sunshine-welcome-call"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    VOIP // RTP AUDIO
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    100 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  Welcome Call!: VoIP Telephony Forensics &amp; Audio Backmasking
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Inspecting SIP handshakes and G.711 mu-law SDP parameters, extracting raw RTP voice streams via Python and Wireshark, and reversing audio backmasking in Audacity to recover the flag.
                </p>
              </div>

              {/* Step 1 */}
              <div id="sun-call-overview" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-cyan-400">Step 1:</span> SIP Handshake &amp; Codec Triage
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Analyzing `welcomecall.pcap` reveals a SIP voice call handshake on UDP port 5060. The SDP parameters specify a G.711 mu-law audio stream negotiated between ports 4000 and 4002.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-lg"><span className="text-zinc-500 block">CAPTURE</span><span className="text-white font-bold">welcomecall.pcap</span></div>
                  <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-lg"><span className="text-zinc-500 block">PROTOCOLS</span><span className="text-cyan-400 font-bold">SIP (5060) / RTP</span></div>
                  <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-lg"><span className="text-zinc-500 block">CODEC</span><span className="text-amber-400 font-bold">G.711 PCMU (8kHz)</span></div>
                  <div className="bg-[#0e0e13] border border-zinc-800 p-3 rounded-lg"><span className="text-zinc-500 block">AUDIO</span><span className="text-emerald-400 font-bold">Backmasked Speech</span></div>
                </div>
              </div>

              {/* Step 2 */}
              <div id="sun-call-rtp" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-cyan-400 uppercase font-bold">RTP Audio Carving Script (`extract_rtp.py`):</span>
                  <CopyButton text={welcomePythonScript} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
                  <pre><code>{welcomePythonScript}</code></pre>
                </div>
              </div>

              {/* Step 3 */}
              <div id="sun-call-audio" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-2">
                  <span className="text-cyan-400">Step 3:</span> Audio Backmasking in Audacity
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Playing `call.wav` plays an incomprehensible reversed speech pattern. Loading the file into Audacity, selecting all audio, and applying <strong>Effect &rarr; Reverse</strong> immediately produces clear spoken English: <em>&ldquo;Thank you for playing... The flag is sun open bracket thankyouforplaying close bracket&rdquo;</em>.
                </p>
              </div>

              {/* Flag */}
              <div id="sun-call-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>sun&#123;thankyouforplaying&#125;</code>
                    <CopyButton text="sun{thankyouforplaying}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 02: U CUT ME OFF                                    */}
            {/* ------------------------------------------------------------- */}
            <article id="sunshine-u-cut-me-off" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="SunshineCTF 2026"
                category="Steganography"
                points="150 PTS"
                slug="sunshine-u-cut-me-off"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-pink-500/10 text-pink-400 border border-pink-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    PNG // IHDR REPAIR
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    150 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  u cut me off: PNG IHDR Height Tampering &amp; CRC32 Repair
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Forensic analysis of a cropped Discord screenshot. Calculating scanline byte counts from decompressed IDAT streams, identifying hidden image height, patching IHDR dimensions in hex, and recalculating CRC32.
                </p>
              </div>

              {/* Step 1 */}
              <div id="sun-cut-overview" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-pink-400">01.</span> Challenge Overview &amp; PNG Structure
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  We received a single image named <code className="text-pink-300 bg-pink-950/40 px-1.5 py-0.5 rounded">hereyougo.png</code> depicting a Discord chat. The message prompt at the bottom was abruptly truncated, pointing directly to IHDR height tampering.
                </p>
              </div>

              {/* Step 2 */}
              <div id="sun-cut-scanlines" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-pink-400">02.</span> Scanline Derivation from Decompressed IDAT
                </h3>
                <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl font-mono text-xs text-zinc-300 space-y-1">
                  <div>Bytes per scanline = 1 + (Width &times; 4) = 1 + (492 &times; 4) = 1969 bytes</div>
                  <div>Total Decompressed Bytes = 823,042 bytes</div>
                  <div>Actual Scanlines = 823,042 / 1,969 = <span className="text-emerald-400 font-bold">418 rows</span> (Header declared only 382 rows!)</div>
                </div>
              </div>

              {/* Step 3 */}
              <div id="sun-cut-hex" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-pink-400">03.</span> Hex Modification &amp; CRC32 Patching
                </h3>
                <div className="overflow-x-auto my-3">
                  <table className="w-full text-left text-xs font-mono border-collapse border border-zinc-800 bg-[#0d0d12] rounded-xl">
                    <thead>
                      <tr className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                        <th className="p-2.5">Field</th>
                        <th className="p-2.5">Offset</th>
                        <th className="p-2.5">Original Hex</th>
                        <th className="p-2.5">Patched Hex</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr><td className="p-2.5 font-bold text-white">Height</td><td className="p-2.5">0x14 - 0x17</td><td className="p-2.5 text-rose-400">00 00 01 7E (382)</td><td className="p-2.5 text-emerald-400">00 00 01 A2 (418)</td></tr>
                      <tr><td className="p-2.5 font-bold text-white">IHDR CRC32</td><td className="p-2.5">0x1D - 0x20</td><td className="p-2.5 text-rose-400">40 84 29 28</td><td className="p-2.5 text-emerald-400">25 78 F5 7C</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-pink-400 font-bold uppercase">Python 1-Click Solver Script:</span>
                  <CopyButton text={cutPythonScript} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre><code>{cutPythonScript}</code></pre>
                </div>
              </div>

              {/* Flag */}
              <div id="sun-cut-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>sun&#123;totallyoriginalchallengeidea&#125;</code>
                    <CopyButton text="sun{totallyoriginalchallengeidea}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 03: SUNTRAIL                                        */}
            {/* ------------------------------------------------------------- */}
            <article id="sunshine-suntrail" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="SunshineCTF 2026"
                category="Forensics"
                points="250 PTS"
                slug="sunshine-suntrail"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    MSKLC // GRAPH THEORY
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    250 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  suntrail: MSKLC Keyboard Layout Snake Trail Walkthrough
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Reverse engineering a Microsoft Keyboard Layout Creator (.klc) file. Decoding Shift State 0 directional arrows and Shift State 1 hidden hex chars to trace a snake path across staggered QWERTY keyboard keys.
                </p>
              </div>

              {/* Step 1 */}
              <div id="sun-trail-recon" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-amber-400">01.</span> Initial Reconnaissance &amp; Format Triage
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  We were provided with a single file named <code className="text-amber-300">suntrail.klc</code>. A <code className="text-zinc-200">.klc</code> file is a plain-text configuration file specifying scan codes, virtual keys, and shift states.
                </p>
                <div className="bg-[#0e0e13] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre><code>{trailKlcSnippet}</code></pre>
                </div>
              </div>

              {/* Step 2 */}
              <div id="sun-trail-decode" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-amber-400">02.</span> Decoding the Two Shift State Columns
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-zinc-400">
                  <li><strong className="text-zinc-200">Shift State 0 (Arrows):</strong> <code className="text-amber-300">2198</code> (↘), <code className="text-amber-300">2192</code> (→), <code className="text-amber-300">2196</code> (↖), <code className="text-amber-300">25a0</code> (■ Stop)</li>
                  <li><strong className="text-zinc-200">Shift State 1 (Hidden ASCII):</strong> Hex chars representing ASCII text: 0x0073 (&apos;s&apos;), 0x0075 (&apos;u&apos;), 0x006e (&apos;n&apos;)...</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div id="sun-trail-concept" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-amber-400">03.</span> The Core Concept: Mechanical Stagger &amp; Directed Graph
                </h3>
                <div className="bg-[#0e0e13] border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 space-y-1">
                  <div>[Cycle 1] Q ↘ A ↘ Z → X ↖ S ↖ W → E &rarr; <span className="text-emerald-400 font-bold">s u n &#123; q w</span></div>
                  <div>[Cycle 2] E ↘ D ↘ C → V ↖ F ↖ R → T &rarr; <span className="text-emerald-400 font-bold">e r t y _ s</span></div>
                  <div>[Cycle 3] T ↘ G ↘ B → N ↖ H &rarr; <span className="text-emerald-400 font-bold">u c k s &#125;</span></div>
                </div>
              </div>

              {/* Table */}
              <div id="sun-trail-table" className="scroll-mt-28 space-y-4 mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border-collapse border border-zinc-800 bg-[#0d0d12] rounded-xl">
                    <thead>
                      <tr className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                        <th className="p-2">Step</th>
                        <th className="p-2">Key</th>
                        <th className="p-2">Direction</th>
                        <th className="p-2">Next</th>
                        <th className="p-2">Char</th>
                        <th className="p-2">Running Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      {trailTableRows.map((r) => (
                        <tr key={r.step}>
                          <td className="p-2">{r.step}</td>
                          <td className="p-2 font-bold text-white">{r.key}</td>
                          <td className="p-2">{r.dir}</td>
                          <td className="p-2">{r.next}</td>
                          <td className="p-2 text-emerald-400 font-bold">{r.char}</td>
                          <td className="p-2">{r.run}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-xs text-amber-400 font-bold uppercase">Python Automated Graph Walker:</span>
                  <CopyButton text={trailPythonScript} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre><code>{trailPythonScript}</code></pre>
                </div>
              </div>

              {/* Flag */}
              <div id="sun-trail-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>sun&#123;qwerty_sucks&#125;</code>
                    <CopyButton text="sun{qwerty_sucks}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 04: NAS COAL                                        */}
            {/* ------------------------------------------------------------- */}
            <article id="sunshine-nas-coal" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="SunshineCTF 2026"
                category="Forensics"
                points="425 PTS"
                slug="sunshine-nas-coal"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    PPTM // OLEVBA MACRO
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    425 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  NAS coal: PPTM Macro Forensics &amp; PowerShell Base64 Deobfuscation
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Forensic analysis of a malicious PowerPoint Macro-Enabled Presentation (.pptm). Extracting VBA code via olevba, analyzing MediaCache.bas, and decoding UTF-16LE Base64 PowerShell payload to recover the flag.
                </p>
              </div>

              {/* Step 1 */}
              <div id="sun-coal-overview" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-emerald-400">01.</span> Challenge Overview
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  We are provided with a Microsoft PowerPoint Macro-Enabled Presentation named <code className="bg-zinc-800 text-emerald-300 px-1.5 py-0.5 rounded font-mono">gem_collection.pptm</code> containing compiled VBA macros inside <code className="font-mono">ppt/vbaProject.bin</code>.
                </p>
              </div>

              {/* Step 2 */}
              <div id="sun-coal-olevba" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold">MediaCache.bas: Extracted VBA Macro:</span>
                  <CopyButton text={nasVbaCode} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-emerald-300/90 overflow-x-auto">
                  <pre><code>{nasVbaCode}</code></pre>
                </div>
              </div>

              {/* Step 3 */}
              <div id="sun-coal-pwsh" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-emerald-400">03.</span> Decoding PowerShell EncodedCommand
                </h3>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre><code>{nasDecodedOutput}</code></pre>
                </div>
              </div>

              {/* Flag */}
              <div id="sun-coal-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>sun&#123;yup_issa_gem&#125;</code>
                    <CopyButton text="sun{yup_issa_gem}" />
                  </div>
                </div>
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* CHALLENGE 05: MY EYES BURN                                    */}
            {/* ------------------------------------------------------------- */}
            <article id="sunshine-my-eyes-burn" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="SunshineCTF 2026"
                category="Forensics"
                points="300 PTS"
                slug="sunshine-my-eyes-burn"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    DEADKEY // FINITE AUTOMATA
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    300 PTS
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-share-tech)] mb-2">
                  my eyes burn: MSKLC Dead Key Finite State Machine
                </h2>
                <p className="text-zinc-400 text-sm font-sans">
                  Reverse engineering a Microsoft Keyboard Layout Creator (.klc) file. Analyzing dead key chaining and state transitions from scancode 29 to Unicode U+2600 (Black Sun With Rays) to extract the flag.
                </p>
              </div>

              {/* Step 1 */}
              <div id="sun-eyes-overview" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-amber-400">01.</span> Challenge Overview
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  We are given a single file named <code className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded font-mono">boardwriter.klc</code>. The prompt indicates that typing a specific keystroke sequence produces a &ldquo;sun&rdquo; glyph.
                </p>
              </div>

              {/* Step 2 */}
              <div id="sun-eyes-chain" className="scroll-mt-28 space-y-4 mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
                  <span className="text-amber-400">02.</span> Dead Key Chaining Mechanics
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Scancode 29 is mapped to <code className="text-amber-300 font-mono">0060@</code> (entering Dead Key state). The dead key transition outputs another dead key with <code className="text-amber-400 font-bold">@</code>, forming a finite state machine that terminates at <code className="text-amber-300 font-bold font-mono">U+2600 (Black Sun With Rays)</code>.
                </p>
              </div>

              {/* Step 3 */}
              <div id="sun-eyes-trace" className="scroll-mt-28 space-y-4 mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse border border-zinc-800 bg-[#0d0d12] rounded-xl">
                    <thead>
                      <tr className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                        <th className="p-2.5">STEP</th>
                        <th className="p-2.5">CURRENT DEAD KEY</th>
                        <th className="p-2.5">INPUT HEX</th>
                        <th className="p-2.5">INPUT CHAR</th>
                        <th className="p-2.5">NEXT STATE / OUTPUT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      {eyesTransitions.map((r) => (
                        <tr key={r.step}>
                          <td className="p-2.5 text-zinc-500">{r.step}</td>
                          <td className="p-2.5 text-zinc-300 font-semibold">{r.current}</td>
                          <td className="p-2.5 text-amber-400/90">{r.hex}</td>
                          <td className="p-2.5 text-amber-300 font-bold">{r.char}</td>
                          <td className={`p-2.5 ${r.step === 17 ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>{r.next}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step 4 */}
              <div id="sun-eyes-solver" className="scroll-mt-28 space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-amber-400 font-bold uppercase">Automated Python Script (`solve_deadkeys.py`):</span>
                  <CopyButton text={eyesPythonSolver} />
                </div>
                <div className="bg-[#050508] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <pre><code>{eyesPythonSolver}</code></pre>
                </div>
              </div>

              {/* Flag */}
              <div id="sun-eyes-flag" className="scroll-mt-28 space-y-4">
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="text-zinc-400 mb-1 font-bold text-xs uppercase tracking-wider">Final Submitted Flag:</div>
                  <div className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm font-bold flex items-center justify-between gap-2">
                    <code>sun&#123;praisethesun&#125;</code>
                    <CopyButton text="sun{praisethesun}" />
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
                  5 LABS
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
