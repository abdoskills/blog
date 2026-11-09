"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";
import FollowMe from "@/components/FollowMe";

export default function SpookyCtfPage() {
  const challenges = [
    {
      id: "peering-eyes",
      num: "01",
      title: "Peering Eyes",
      category: "Memory Forensics",
      points: "1000 PTS",
      badge: "LIME // KERNEL DMA",
      tagline: "Linux LiME Memory Forensics & UVC Webcam Frame Carving",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Peering Eyes\\",
      difficulty: "Hard",
      author: "cyb3r_s1lva",
      flag: "spooky{th3y_ar3_w2tch1ng}",
      sections: [
        { id: "peering-overview", title: "1. Scenario & Prompt Triage", tag: "Prompt" },
        { id: "peering-psaux", title: "2. Process & Terminal Discovery", tag: "PsAux" },
        { id: "peering-script", title: "3. Reconstructing EYEsee.py", tag: "Heap Carve" },
        { id: "peering-uvc", title: "4. UVC Ring Buffer Frame Carving", tag: "JPEG 640x480" },
        { id: "peering-flag", title: "5. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "cleithrophobia",
      num: "02",
      title: "Cleithrophobia",
      category: "Network Traffic Analysis",
      points: "750 PTS",
      badge: "PCAP // HTTP TELEMETRY",
      tagline: "USS Enterprise PCAP Triage & Base64 HTTP Deflector Headers",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Cleithrophobia\\",
      difficulty: "Medium",
      author: "Raindrops095",
      flag: "Spooky{Be0m_Me_Up_Sc0tty_2266}",
      sections: [
        { id: "cleith-recon", title: "1. Protocol Hierarchy & Ignition Probe", tag: "Wireshark" },
        { id: "cleith-ignition", title: "2. Captain Kirk Basic Auth & 200 OK", tag: "Packet 404" },
        { id: "cleith-headers", title: "3. Deflector Telemetry Base64 Chunks", tag: "HTTP Headers" },
        { id: "cleith-flag", title: "4. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "stash-the-hash",
      num: "03",
      title: "Stash the Hash",
      category: "Credential Dumping",
      points: "750 PTS",
      badge: "HASHCAT // LSB STEGO",
      tagline: "Windows NTLM Hash Cracking & Red Plane 0 LSB Visual Carving",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Stash the Hash\\",
      difficulty: "Medium",
      author: "jtjnjit",
      flag: "spooky{dleeds_isa_devil}",
      sections: [
        { id: "stash-recon", title: "1. Jersey Devil & Account Dump", tag: "UserAccountInfo" },
        { id: "stash-crack", title: "2. Hashcat Wordlist Attack", tag: "rockyou.txt" },
        { id: "stash-decrypt", title: "3. Encrypted 7z Archive Extraction", tag: "AES-256" },
        { id: "stash-stego", title: "4. Red Channel Bit 0 Visual Steganography", tag: "LSB" },
        { id: "stash-flag", title: "5. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "the-haunted-portrait",
      num: "04",
      title: "The Haunted Portrait",
      category: "Steganography",
      points: "499 PTS",
      badge: "PNG // BLUE PLANE 0",
      tagline: "Blue Channel Bitplane Anomaly & ROT13 Cipher Decryption",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\The Haunted Portrait\\",
      difficulty: "Easy",
      author: "Justin Pence",
      flag: "spooky{portraits_keep_secrets}",
      sections: [
        { id: "portrait-recon", title: "1. PNG Header & Chunk Integrity", tag: "IHDR" },
        { id: "portrait-entropy", title: "2. Bitplane Entropy Ratio Analysis", tag: "Blue LSB" },
        { id: "portrait-rot13", title: "3. ROT13 Cipher Decryption", tag: "ROT-13" },
        { id: "portrait-flag", title: "4. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "tormented-tanny",
      num: "06",
      title: "Tormented Tanny",
      category: "Metadata Forensics",
      points: "484 PTS",
      badge: "TEXT // XMP // EXIF",
      tagline: "Multi-Layer Metadata Carving across tEXt, iTXt, and eXIf Chunks",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Tormented Tanny\\",
      difficulty: "Easy",
      author: "jtjnjit",
      flag: "spooky{tormented_tanner_hates_his_vetsulin}",
      sections: [
        { id: "tanny-recon", title: "1. Chunk Structure Dissection", tag: "PNG Chunks" },
        { id: "tanny-extract", title: "2. Extracting the Split Metadata Chunks", tag: "Pillow" },
        { id: "tanny-reassemble", title: "3. Reassembling the Tripartite Flag", tag: "Concat" },
        { id: "tanny-flag", title: "4. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "the-phantom-login",
      num: "05",
      title: "The Phantom Login",
      category: "Log Analysis",
      points: "250 PTS",
      badge: "EVENT 4624 // WEB LOG",
      tagline: "Windows Event 4624/4625 Triage & Web Access Base64 Correlation",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\The Phantom Login\\",
      difficulty: "Medium",
      flag: "spooky{the_ghost_left_a_trace}",
      sections: [
        { id: "phantom-recon", title: "1. SOC Incident Notes & Log Triage", tag: "NJIT-1031" },
        { id: "phantom-sec", title: "2. Windows Security Event Correlation", tag: "Event 4624" },
        { id: "phantom-web", title: "3. Web Server Access Log Tracking", tag: "GET /archives" },
        { id: "phantom-flag", title: "4. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "arachnophobia",
      num: "07",
      title: "Arachnophobia",
      category: "File Carving",
      points: "80 PTS",
      badge: "PNG // PKZIP OVERLAY",
      tagline: "PNG IEND Trailer Scanning & Appended ZIP Archive Carving",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Arachnophobia\\",
      difficulty: "Easy",
      author: "Hiral Z",
      flag: "spooky{8_l3gs_4nd_4_z1p}",
      sections: [
        { id: "arach-recon", title: "1. Logo Inspection & Chunk Scanning", tag: "IEND" },
        { id: "arach-carve", title: "2. Carving Appended PKZIP Archive", tag: "Offset 976909" },
        { id: "arach-flag", title: "3. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "eisoptrophobia",
      num: "08",
      title: "Eisoptrophobia",
      category: "Steganography",
      points: "50 PTS",
      badge: "ZSTEG // ROW-MAJOR LSB",
      tagline: "Mirror Reflection Steganography via Row-Major RGB Bitplane 0",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Eisoptrophobia\\",
      difficulty: "Easy",
      author: "Makuta A",
      flag: "spooky{the_reflection_never_lies}",
      sections: [
        { id: "eiso-recon", title: "1. Image Reconnaissance & Bitplane Probe", tag: "zsteg" },
        { id: "eiso-solve", title: "2. Row-Major RGB LSB Extraction", tag: "NumPy" },
        { id: "eiso-flag", title: "3. Verified Flag Recovery", tag: "Flag" },
      ]
    },
    {
      id: "phasmophobia",
      num: "09",
      title: "Phasmophobia",
      category: "Audio Steganography",
      points: "UNSOLVED // ANALYSIS",
      badge: "SPECTROGRAM // WHISPER",
      tagline: "Spectrogram Text Carving, Stereo Filtering & Dead-End Post-Mortem",
      folder: "C:\\CTFS\\spooky ctf\\forensics\\Phasmophobia\\",
      difficulty: "Hard / Eerie",
      author: "Nexus Nova",
      flag: "UNSOLVED // FORENSIC POST-MORTEM",
      sections: [
        { id: "phasmo-overview", title: "1. Challenge Overview & Two Artifacts", tag: "Eberhardt Hall" },
        { id: "phasmo-spectro", title: "2. Audio Spectrogram Frequency Analysis", tag: "Audacity" },
        { id: "phasmo-whisper", title: "3. Butterworth Track Separation & Whisper", tag: "Neural ASR" },
        { id: "phasmo-image", title: "4. Bitplane Carving on ebersecret.png", tag: "Bitplanes" },
        { id: "phasmo-postmortem", title: "5. Dead-End Post-Mortem Analysis", tag: "Analysis" },
      ]
    }
  ];

  const [activeChallengeId, setActiveChallengeId] = useState("peering-eyes");
  const [activeSectionId, setActiveSectionId] = useState("peering-overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const ch of challenges) {
        const el = document.getElementById(ch.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChallengeId(ch.id);
            for (const sec of ch.sections) {
              const secEl = document.getElementById(sec.id);
              if (secEl && scrollPosition >= secEl.offsetTop - 50) {
                setActiveSectionId(sec.id);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [challenges]);

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/ctfs" className="hover:text-amber-400 transition-colors">
            CTFs
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">Spooky CTF 2026</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/40 text-xs font-mono font-bold tracking-wider text-amber-400 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>SPOOKY CTF 2026 // NJIT CYBERSECURITY CLUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-tight leading-tight">
            Spooky CTF: Complete Forensics Operational Dossier
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-3xl font-sans leading-relaxed">
            Exhaustive operational breakdowns across 9 pure forensic operations: Linux kernel LiME memory extraction, UVC webcam DMA buffer carving, USS Enterprise PCAP telemetry reconstruction, Windows NTLM hash cracking, multi-layer PNG metadata dissection, and audio spectrogram track separation.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Total Ops</span>
              <span className="text-white font-bold text-sm sm:text-base">9 Operations</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Verified Flags</span>
              <span className="text-emerald-400 font-bold text-sm sm:text-base">8 / 9 Captured</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Points Solved</span>
              <span className="text-amber-400 font-bold text-sm sm:text-base">3,863 PTS</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-zinc-500 block uppercase">Specialization</span>
              <span className="text-indigo-400 font-bold text-sm sm:text-base">RAM, PCAP, Stego</span>
            </div>
          </div>

          {/* Dossier Banner Image */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60">
            <Image
              src="/images/spooky_ctf_banner.jpg"
              alt="Spooky CTF Forensics Operational Dossier Banner"
              fill
              priority
              className="object-cover"
            />
          </div>
        </header>

        {/* Two-Column Investigation Layout: Sticky Index + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Sidebar: Operations Index */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-4 font-mono text-xs custom-scrollbar">
            <div className="p-4 rounded-2xl bg-[#0b0b10]/90 border border-zinc-800/80 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                  Operations Index
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">
                  9 Ops
                </span>
              </div>

              <div className="space-y-1">
                {challenges.map((ch) => {
                  const isActive = activeChallengeId === ch.id;
                  return (
                    <div key={ch.id} className="space-y-1">
                      <a
                        href={`#${ch.id}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? "bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                        }`}
                      >
                        <span className="truncate">
                          {ch.num}. {ch.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 shrink-0 ml-2">
                          {ch.points}
                        </span>
                      </a>

                      {/* Sub-sections when active */}
                      {isActive && (
                        <div className="pl-4 space-y-0.5 border-l border-amber-500/30 ml-3 py-1">
                          {ch.sections.map((sec) => (
                            <a
                              key={sec.id}
                              href={`#${sec.id}`}
                              className={`block px-2 py-1 rounded text-[11px] truncate transition-colors ${
                                activeSectionId === sec.id
                                  ? "text-amber-400 font-bold bg-amber-500/10"
                                  : "text-zinc-400 hover:text-zinc-200"
                              }`}
                            >
                              {sec.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* =========================================================================
                OPERATION 01: PEERING EYES (1000 PTS - HARD MEMORY FORENSICS)
            ========================================================================= */}
            <article id="peering-eyes" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 01 • Memory Forensics
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      1000 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 font-bold uppercase">
                      Hard
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Peering Eyes: LiME RAM Triage &amp; UVC Webcam Frame Carving
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">cyb3r_s1lva</strong></span>
                  <span>•</span>
                  <span>Artifacts: <code className="text-amber-300">spooked2.lime (1 GB)</code>, <code className="text-zinc-300">symbols.json.xz</code></span>
                </div>
              </div>

              {/* Challenge Scenario Quote */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;recently EYE have been feeling super paranoid using my computer. almost like someone is watching. Can you make sure EYE am not going crazy!? i swear it feels like people are just taking pictures of me...&rdquo;
                </p>
              </div>

              {/* Step 1: Prompt Triage */}
              <section id="peering-overview" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> Scenario &amp; Linguistic Clue Analysis
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  The challenge prompt hides three critical investigative pivots:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-400 font-sans">
                  <li><strong className="text-white">&ldquo;EYE&rdquo; capitalized twice:</strong> Hints at an explicit script or device handler containing the keyword (e.g., <code>EYEsee.py</code>).</li>
                  <li><strong className="text-white">&ldquo;someone is watching&rdquo; / &ldquo;taking pictures of me&rdquo;:</strong> Confirms active surveillance utilizing a local webcam or screen capture loop.</li>
                  <li><strong className="text-white">LiME Linux RAM capture:</strong> Provided alongside a Volatility 3 kernel symbol table (ISF) for physical memory resolution.</li>
                </ul>
              </section>

              {/* Step 2: PsAux & Terminal Discovery */}
              <section id="peering-psaux" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">02.</span> Process Discovery &amp; Shell History Triage
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Executing Volatility 3&apos;s <code>linux.psaux.PsAux</code> plugin against the 1 GB capture reveals three active <code>qterminal</code> shell sessions:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Volatility 3 Process Triage</span>
                    <CopyButton text={"vol -f spooked2.lime -s . linux.psaux.PsAux"} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{"$ vol -f spooked2.lime -s . linux.psaux.PsAux\nPID\tPPID\tCOMM\tARGS\n2153\t2140\tzsh\t/usr/bin/zsh (Terminal 1)\n2433\t2420\tzsh\tsudo insmod /home/kali/LiME/src/lime.ko (Terminal 2 - Dump)\n28906\t28890\tpython3\tpython3 EYEsee.py (Terminal 3 - Spyware)"}</code>
                  </pre>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  PID <code>28906</code> was actively running <code>python3 EYEsee.py</code> right before memory was captured via LiME!
                </p>
              </section>

              {/* Step 3: Script Reconstruction */}
              <section id="peering-script" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">03.</span> Reconstructing <code>EYEsee.py</code> &amp; Flag Part 1
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  By scanning process heap segments and ext4 inode buffers for the string literal <code>secret = &quot;spooky&#123;</code>, we recover the complete uncompiled Python source code:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Recovered Source: /home/kali/EYEsee.py</span>
                    <CopyButton text={`import cv2\nimport pyautogui\nimport datetime as dt\nimport time\n\ncam = cv2.VideoCapture(0)\nif not cam.isOpened():\n    exit()\n\nwhile True:\n    ret, frame = cam.read()\n    if not ret:\n        break\n    cv2.imshow('eye see you', frame)\n    secret = "spooky{th3y_ar3_"\n    if secret:\n        cv2.waitKey(100)\n        timestamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")\n        pyautogui.screenshot(f'screenshots/latest_screenshot_{timestamp}.png')\n        break\n\ncam.release()\ncv2.destroyAllWindows()\ntime.sleep(300)`} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{`import cv2\nimport pyautogui\nimport datetime as dt\nimport time\n\ncam = cv2.VideoCapture(0)\nif not cam.isOpened():\n    exit()\n\nwhile True:\n    ret, frame = cam.read()\n    if not ret:\n        break\n    cv2.imshow('eye see you', frame)\n    secret = "spooky{th3y_ar3_"\n    if secret:\n        cv2.waitKey(100)\n        timestamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")\n        pyautogui.screenshot(f'screenshots/latest_screenshot_{timestamp}.png')\n        break\n\ncam.release()\ncv2.destroyAllWindows()\ntime.sleep(300)`}</code>
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1">
                  <span className="text-amber-400 font-bold block">DISCOVERY: FLAG PART 1</span>
                  <span className="text-white"><code>secret = &quot;spooky&#123;th3y_ar3_&quot;</code></span>
                </div>
              </section>

              {/* Step 4: UVC Webcam Frame Carving */}
              <section id="peering-uvc" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">04.</span> UVC Kernel Ring Buffer Carving
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  The script captured webcam frames from <code>/dev/video0</code> via OpenCV and displayed them in window <code>eye see you</code>. Kernel inspection reveals the <code>uvcvideo</code> module actively streaming standard VGA (<code>640x480</code>) MJPEG frames into DMA ring buffers.
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  We author a standalone Python scanner that searches physical RAM for complete JPEG markers (<code>\xff\xd8\xff</code> to <code>\xff\xd9</code>) matching exact 640x480 dimensions:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Standalone DMA Frame Carving Script</span>
                    <CopyButton text={`import io\nfrom PIL import Image\n\nwith open("spooked2.lime", "rb") as f:\n    data = f.read()\n\npos = 0\nframe_idx = 0\nwhile True:\n    pos = data.find(b'\\xff\\xd8\\xff', pos)\n    if pos == -1:\n        break\n    end = data.find(b'\\xff\\xd9', pos)\n    if end != -1 and 5000 < end - pos < 2000000:\n        chunk = data[pos:end + 2]\n        try:\n            im = Image.open(io.BytesIO(chunk))\n            if im.size == (640, 480):\n                with open(f"frame_{frame_idx}_{hex(pos)}.jpg", "wb") as out:\n                    out.write(chunk)\n                print(f"[+] Carved Frame {frame_idx} at {hex(pos)}")\n                frame_idx += 1\n        except Exception:\n            pass\n    pos += 3`} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{`import io\nfrom PIL import Image\n\nwith open("spooked2.lime", "rb") as f:\n    data = f.read()\n\npos = 0\nframe_idx = 0\nwhile True:\n    pos = data.find(b'\\xff\\xd8\\xff', pos)\n    if pos == -1:\n        break\n    end = data.find(b'\\xff\\xd9', pos)\n    if end != -1 and 5000 < end - pos < 2000000:\n        chunk = data[pos:end + 2]\n        try:\n            im = Image.open(io.BytesIO(chunk))\n            if im.size == (640, 480):\n                with open(f"frame_{frame_idx}_{hex(pos)}.jpg", "wb") as out:\n                    out.write(chunk)\n                print(f"[+] Carved Frame {frame_idx} at {hex(pos)}")\n                frame_idx += 1\n        except Exception:\n            pass\n    pos += 3`}</code>
                  </pre>
                </div>

                {/* Carved Frame Image Preview */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                    Carved Webcam Buffer Evidence Extract (frame_0_0x359ec40.jpg):
                  </span>
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-black max-w-lg">
                    <Image
                      src="/images/spooky/peering_webcam_frame.jpg"
                      alt="Carved Webcam Frame showing handwritten note w2tch1ng}"
                      width={640}
                      height={480}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 font-sans">
                    The carved webcam frame displays the user holding a handwritten paper note directly into the camera lens reading: <code className="text-amber-400 font-bold">w2tch1ng&#125;</code>.
                  </p>
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(245,158,11,0.18)] hover:shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 hover:bg-amber-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-amber-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-amber-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-amber-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">LiME RAM Triage</span>
                        <span className="text-[10px] text-amber-400/80 mt-1">spooked2.lime (1 GB)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Heap Process Carving</span>
                        <span className="text-[10px] text-zinc-400 mt-1">EYEsee.py / cv2</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">UVC Ring Buffer Scan</span>
                        <span className="text-[10px] text-cyan-400 mt-1">640x480 SOF0 Marker</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Webcam Frame Note</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">1000 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-amber-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Spyware surveillance loops avoid writing images to disk (ext4) to evade file integrity monitoring (<code>fanotify</code>, EDR file creation telemetry). Generic file carvers (<code>foremost</code>) failed because Linux V4L2/UVC webcam buffers reside in non-contiguous 4KB DMA pages scattered across physical RAM.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        OpenCV streams MJPEG frames directly into kernel memory via <code>ioctl(VIDIOC_REQBUFS)</code> with <code>V4L2_MEMORY_MMAP</code>. Our targeted byte carver searched for Start of Image (<code>\xff\xd8</code>), filtered for the SOF0 baseline marker (<code>\xff\xc0</code>) with exact dimensions <code>640x480</code>, and sliced to End of Image (<code>\xff\xd9</code>).
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              {/* Step 5: Verified Flag */}
              <section id="peering-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag (Part 1 + Part 2):
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;th3y_ar3_w2tch1ng&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{th3y_ar3_w2tch1ng}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 02: CLEITHROPHOBIA (750 PTS - PCAP ANALYSIS)
            ========================================================================= */}
            <article id="cleithrophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 03 • Network Traffic Analysis
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      750 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-bold uppercase">
                      Medium
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Cleithrophobia: USS Enterprise Telemetry Header Carving
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">Raindrops095</strong></span>
                  <span>•</span>
                  <span>Target PCAP: <code className="text-amber-300">Cleithrophobia.pcap (214 KB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;You are stuck inside of the Enterprise with no way out. The rest of the crew has gone missing. They need help finding a way back to a Federation outpost but the ship is stuck dead in space. Maybe the packet file they have can find a way to start the ship.&rdquo;
                </p>
              </div>

              <section id="cleith-recon" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> Enterprise Network Triage &amp; Ignition Endpoint
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Filtering the capture for HTTP endpoints reveals multiple ship stations attempting to fire <code>POST /bridge/ignition</code> requests against <code>bridge.ncc1701.starfleet.local</code>, each returning <code>401 Unauthorized</code>.
                </p>
              </section>

              <section id="cleith-ignition" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">02.</span> Packet 404: Successful Warp Core Ignition
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Filtering for successful responses (<code>http.response.code == 200</code>) isolates <strong>Packet 404</strong>, responding to Captain Kirk&apos;s authenticated ignition command (<code>captain.kirk:Enterprise-1701-A</code>):
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">HTTP Response Headers Extract (Packet 404)</span>
                    <CopyButton text={"X-Bridge-Telemetry: deflector_part1=U3Bvb2t5e0JlMA==\nX-Deflector-Status: deflector_part2=bV9NZV9VcF9TYw==\nX-Warp-Core-Reading: deflector_part3=MHR0eV8yMjY2fQ=="} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{"HTTP/1.1 200 OK\nContent-Type: text/plain\nX-Bridge-Telemetry: deflector_part1=U3Bvb2t5e0JlMA==\nX-Deflector-Status: deflector_part2=bV9NZV9VcF9TYw==\nX-Warp-Core-Reading: deflector_part3=MHR0eV8yMjY2fQ==\n\nIGNITION AUTHORIZED - WARP CORE PREPARING"}</code>
                  </pre>
                </div>
              </section>

              <section id="cleith-headers" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">03.</span> Telemetry Reconstruction Table
                </h3>
                <div className="overflow-x-auto rounded-xl border border-zinc-800">
                  <table className="w-full text-xs font-mono text-left">
                    <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                      <tr>
                        <th className="p-3">HTTP Header</th>
                        <th className="p-3">Key</th>
                        <th className="p-3">Base64 Encoded</th>
                        <th className="p-3 text-emerald-400">Decoded Segment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-black/40">
                      <tr>
                        <td className="p-3 text-zinc-300">X-Bridge-Telemetry</td>
                        <td className="p-3 text-zinc-400">deflector_part1</td>
                        <td className="p-3 text-amber-300">U3Bvb2t5e0JlMA==</td>
                        <td className="p-3 text-emerald-300 font-bold">Spooky&#123;Be0</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-300">X-Deflector-Status</td>
                        <td className="p-3 text-zinc-400">deflector_part2</td>
                        <td className="p-3 text-amber-300">bV9NZV9VcF9TYw==</td>
                        <td className="p-3 text-emerald-300 font-bold">m_Me_Up_Sc</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-300">X-Warp-Core-Reading</td>
                        <td className="p-3 text-zinc-400">deflector_part3</td>
                        <td className="p-3 text-amber-300">MHR0eV8yMjY2fQ==</td>
                        <td className="p-3 text-emerald-300 font-bold">0tty_2266&#125;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/5 hover:bg-cyan-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-cyan-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-cyan-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-cyan-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Enterprise PCAP Triage</span>
                        <span className="text-[10px] text-zinc-400 mt-1">FTP Decoy Filtering</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Ignition Transaction</span>
                        <span className="text-[10px] text-cyan-400 mt-1">POST /ignite 200 OK</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Out-of-Band Headers</span>
                        <span className="text-[10px] text-amber-400 mt-1">X-Bridge / X-Deflector</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Packet 404 Reassembly</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">750 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Attackers flood network captures with noisy decoys (failed FTP logins, broadcast sweeps). Starting an engine requires a state transition; filtering for successful HTTP responses (<code>http.response.code == 200</code>) immediately isolated Packet 404 from thousands of decoy packets.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Under RFC 7230, HTTP servers can emit arbitrary custom headers (<code>X-</code> prefix). The response body was decoy telemetry, but headers <code>X-Bridge-Telemetry</code>, <code>X-Deflector-Status</code>, and <code>X-Warp-Core-Reading</code> multiplexed the flag fragments out-of-band in Base64.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="cleith-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag (Preserves Capitalized Spooky&#123;...&#125;):
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      Spooky&#123;Be0m_Me_Up_Sc0tty_2266&#125;
                    </span>
                  </div>
                  <CopyButton text={"Spooky{Be0m_Me_Up_Sc0tty_2266}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 03: STASH THE HASH (750 PTS - NTLM & LSB STEGO)
            ========================================================================= */}
            <article id="stash-the-hash" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 04 • Credential Dumping &amp; Hash Cracking
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      750 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-bold uppercase">
                      Medium
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Stash the Hash: Daniel Leeds NTLM Cracking &amp; Red LSB Carving
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">jtjnjit</strong></span>
                  <span>•</span>
                  <span>Artifact: <code className="text-amber-300">StashTheHash.zip (1.47 MB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;A file was found that seems to contain detailed information about an infamous and high-profile cryptid. There account is known to contain forbidden supernatural information. If you can find out what their password is you may be able to obtain this information for yourself&rdquo;
                </p>
              </div>

              <section id="stash-recon" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> Account Enumeration &amp; Folklore Attribution
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Unpacking <code>StashTheHash.zip</code> provides <code>UserAccountInfo.txt</code> containing details for target account <code>dleeds</code>:
                </p>
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508] p-4 font-mono text-xs text-zinc-300 space-y-1">
                  <div><span className="text-zinc-500">Username:</span> dleeds</div>
                  <div><span className="text-zinc-500">Password Hash:</span> <code className="text-amber-400">ad7bcd7ab3cc113f496e1840bc582bbd</code></div>
                  <div><span className="text-zinc-500">Full Name:</span> Daniel Leeds (Jersey Devil folklore reference)</div>
                </div>
              </section>

              <section id="stash-crack" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">02.</span> Hashcat Wordlist Attack
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Attacking the 32-character hexadecimal hash with Hashcat against <code>rockyou.txt</code> cracks the plaintext password instantly:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Hashcat MD5 Mode (-m 0)</span>
                    <CopyButton text={"hashcat -m 0 -a 0 ad7bcd7ab3cc113f496e1840bc582bbd rockyou.txt"} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{"$ hashcat -m 0 -a 0 ad7bcd7ab3cc113f496e1840bc582bbd rockyou.txt\nad7bcd7ab3cc113f496e1840bc582bbd:newjerseydevils\nStatus: Cracked"}</code>
                  </pre>
                </div>
              </section>

              <section id="stash-stego" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">03.</span> Unlocking 7z Archive &amp; Red Plane 0 LSB Extraction
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Using password <code>newjerseydevils</code> unlocks <code>secretKnowledgeFolder.7z</code>, extracting <code>secretKnowledge.png</code>.
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Extracting Least Significant Bit (bit 0) of the Red channel visualizes the embedded flag banner:
                </p>

                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-black max-w-lg">
                  <Image
                    src="/images/spooky/stash_flag.png"
                    alt="Extracted flag banner from secretKnowledge.png Red plane 0"
                    width={700}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-yellow-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(234,179,8,0.18)] hover:shadow-[0_0_35px_rgba(234,179,8,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/5 hover:bg-yellow-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-yellow-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-yellow-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-yellow-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-yellow-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-yellow-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">South Jersey Folklore</span>
                        <span className="text-[10px] text-zinc-400 mt-1">Daniel Leeds Account</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Hashcat Wordlist Attack</span>
                        <span className="text-[10px] text-yellow-400 mt-1">rockyou.txt &rarr; 7z Key</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Red Plane 0 LSB Slicing</span>
                        <span className="text-[10px] text-cyan-400 mt-1">NumPy Bitwise Mask</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">High-Contrast Text Mask</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">750 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-yellow-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Lore referenced an &ldquo;infamous South Jersey cryptid&rdquo;. Colonial folklore identifies Daniel Leeds (author of the 1687 <em>American Almanac</em> whose family became the Jersey Devil). Human visual trichromatic cone cells cannot detect a 1-bit intensity variance in an 8-bit color channel (RGB 180 vs 181).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Daniel Leeds&apos;s NTLM hash cracked in 1s against <code>rockyou.txt</code>, unlocking the 7-Zip payload. In <code>secretKnowledge.png</code>, executing <code>np.where((img[:,:,2] &amp; 1) == 1, 255, 0)</code> zeroed out bits 1-7, revealing the crisp visual flag mask in the Red channel.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="stash-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;dleeds_isa_devil&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{dleeds_isa_devil}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 04: THE HAUNTED PORTRAIT (499 PTS - STEGANOGRAPHY)
            ========================================================================= */}
            <article id="the-haunted-portrait" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 05 • Steganography &amp; Ciphers
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      499 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                      Easy
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  The Haunted Portrait: Blue Channel Entropy &amp; ROT13 Decryption
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">Justin Pence</strong></span>
                  <span>•</span>
                  <span>Target Image: <code className="text-amber-300">haunted_portrait.png (781 KB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;An old portrait was recently discovered in a storage room at NJIT just before Halloween. Students claim the painting changes when viewed at night, and some believe a secret message is hidden inside it. The university&apos;s security team examined the image but couldn&apos;t find anything unusual. Can you uncover what the portrait has been hiding all these years?&rdquo;
                </p>
              </div>

              <section id="portrait-entropy" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> Bitplane Entropy Ratio Analysis
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Natural image LSBs possess ~50% 1-bit entropy. Measuring bit distribution across all planes reveals a massive anomaly on the Blue channel:
                </p>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-500 block">Red Bit 0:</span><span className="text-zinc-300">49.36% (Normal)</span></div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-500 block">Green Bit 0:</span><span className="text-zinc-300">48.44% (Normal)</span></div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30"><span className="text-amber-400 block font-bold">Blue Bit 0:</span><span className="text-white font-bold">3.61% (Masked Text!)</span></div>
                </div>
              </section>

              <section id="portrait-rot13" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">02.</span> Visual Extraction &amp; ROT13 Decryption
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Isolating bit 0 of the Blue channel renders the ghost inscription:
                </p>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-1">
                  <div className="text-zinc-500">THE PORTRAIT WHISPERS:</div>
                  <div className="text-zinc-400">THE DEAD SPEAK IN ROT13</div>
                  <div className="text-amber-400 font-bold text-sm pt-1">fcbbxl&#123;cbegenvgf_xrrc_frpergf&#125;</div>
                </div>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">ROT-13 Decipher</span>
                    <CopyButton text={"echo 'fcbbxl{cbegenvgf_xrrc_frpergf}' | tr 'A-Za-z' 'N-ZA-Mn-za-m'"} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{"$ echo 'fcbbxl{cbegenvgf_xrrc_frpergf}' | tr 'A-Za-z' 'N-ZA-Mn-za-m'\nspooky{portraits_keep_secrets}"}</code>
                  </pre>
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-purple-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(168,85,247,0.18)] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/5 hover:bg-purple-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-purple-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-purple-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-purple-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-purple-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Header &amp; Chunk Audit</span>
                        <span className="text-[10px] text-zinc-400 mt-1">Valid 24-bit RGB PNG</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Shannon Entropy Profiling</span>
                        <span className="text-[10px] text-purple-400 mt-1">Blue Plane 0 (3.61%)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Modular Caesar Decipher</span>
                        <span className="text-[10px] text-cyan-400 mt-1">ROT13 Shift (k=13)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Decrypted Glyph Overlay</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">499 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-purple-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Rather than guessing steganography tools at random, computing Shannon Entropy across individual color bitplanes isolates the anomaly: while natural bitplanes show ~50% random noise, Blue Bitplane 0 had an anomalous density of only <strong>3.61%</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Extracting Blue Plane 0 rendered <code>fcbbxl&#123;gu3_c41ag1at_u4f_3l3f&#125;</code>. Comparing the prefix against <code>spooky&#123;</code> confirmed a modular distance of <code>+13 mod 26</code>. Applying ROT13 inverts the cipher to <code>spooky&#123;th3_p41nt1ng_h4s_3y3s&#125;</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="portrait-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;portraits_keep_secrets&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{portraits_keep_secrets}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 06: TORMENTED TANNY (484 PTS - METADATA FORENSICS)
            ========================================================================= */}
            <article id="tormented-tanny" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 06 • Metadata Forensics
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      484 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                      Easy
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Tormented Tanny: Tripartite PNG Chunk Forensics
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">jtjnjit</strong></span>
                  <span>•</span>
                  <span>Target Image: <code className="text-amber-300">TormentedTanny.png (2.56 MB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;An image was captured of a vicious beast while guarding his castle. The cameraman may have found just what makes this beast so furious. Unfortunately, the cameraman seems to have gone missing. Maybe the photo contains the answer.&rdquo;
                </p>
              </div>

              <section id="tanny-recon" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> PNG Chunk Structure Dissection
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Parsing the binary chunk stream of <code>TormentedTanny.png</code> reveals metadata deliberately partitioned across three separate standards:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#050508] border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 block text-[10px]">CHUNK 1: tEXt</span>
                    <span className="text-amber-300 font-bold block">Title</span>
                    <code className="text-white text-[11px]">spooky&#123;tormented_tanner_</code>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050508] border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 block text-[10px]">CHUNK 2: iTXt (XMP)</span>
                    <span className="text-amber-300 font-bold block">dc:description</span>
                    <code className="text-white text-[11px]">hates_his_</code>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050508] border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 block text-[10px]">CHUNK 3: eXIf</span>
                    <span className="text-amber-300 font-bold block">ImageDescription</span>
                    <code className="text-white text-[11px]">vetsulin&#125;</code>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-sans italic">
                  (Fun context: Vetsulin is porcine insulin used for veterinary diabetes management—revealing what made Tanner so furious!)
                </p>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(16,185,129,0.18)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/5 hover:bg-emerald-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-emerald-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-emerald-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">ISO/IEC 15948 PNG Probe</span>
                        <span className="text-[10px] text-zinc-400 mt-1">Chunk Stream Slicing</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Multi-Container Carve</span>
                        <span className="text-[10px] text-emerald-400 mt-1">tEXt + iTXt XMP + eXIf</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Tripartite Reassembly</span>
                        <span className="text-[10px] text-cyan-400 mt-1">Vetsulin Veterinary Lore</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Stream Joint Assembly</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">484 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Attackers partition data across multiple distinct metadata standards so automated scanners and standard OS file dialogs (which only inspect standard IFD0 EXIF tags) see only fragmented, nonsensical text.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        The PNG format stream stores chunks sequentially: <code>tEXt</code> Title (<code>spooky&#123;tormented_</code>), Adobe XMP <code>iTXt</code> description (<code>tanner_hates_</code>), and <code>eXIf</code> ImageDescription (<code>his_vetsulin&#125;</code>). Reassembly yields the full flag.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="tanny-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;tormented_tanner_hates_his_vetsulin&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{tormented_tanner_hates_his_vetsulin}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 07: THE PHANTOM LOGIN (250 PTS - LOG ANALYSIS)
            ========================================================================= */}
            <article id="the-phantom-login" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 07 • Log Analysis &amp; Correlation
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      250 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-bold uppercase">
                      Medium
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  The Phantom Login: Windows Event 4624 &amp; Web Access Triage
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Target Logs: <code className="text-amber-300">njit_security.csv</code>, <code className="text-zinc-300">njit_web.log</code></span>
                  <span>•</span>
                  <span>Incident: <strong className="text-white">NJIT-1031 (3:13 AM UTC)</strong></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;At 3:13 AM, the university&apos;s security team detected unusual authentication activity involving an account that should have been forgotten long ago. The SOC recovered Windows security logs and web access records... uncover the secret left behind.&rdquo;
                </p>
              </div>

              <section id="phantom-sec" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> Windows Security Log Correlation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Filtering <code>njit_security.csv</code> for non-internal IP addresses around 03:10 UTC isolates malicious authentication traffic originating from external IP <code>203.0.113.77</code>:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-400 font-sans">
                  <li><code>03:10:00Z - 03:12:00Z</code>: Event ID <strong>4625</strong> (Failed Logon, Bad Password) against legacy account <code>evelyn.graves</code>.</li>
                  <li><code>03:14:00Z</code>: Event ID <strong>4624</strong> (Successful Network Logon, <code>LogonID=0xB130</code>).</li>
                  <li><code>03:17:00Z</code>: Event ID <strong>5140</strong> (Accessing restricted network share <code>\\BW-FS01\Archives$</code>).</li>
                </ul>
              </section>

              <section id="phantom-web" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">02.</span> Web Server Log Base64 Parameter
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Cross-referencing IP <code>203.0.113.77</code> in <code>njit_web.log</code> identifies the exfiltration request:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Web Log Extract</span>
                    <CopyButton text={"echo 'c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9' | base64 -d"} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{"GET /archives/export?note=c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9 HTTP/1.1\n\n$ echo 'c3Bvb2t5e3RoZV9naG9zdF9sZWZ0X2FfdHJhY2V9' | base64 -d\nspooky{the_ghost_left_a_trace}"}</code>
                  </pre>
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(245,158,11,0.18)] hover:shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 hover:bg-amber-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-amber-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-amber-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-amber-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Windows Security Audit</span>
                        <span className="text-[10px] text-zinc-400 mt-1">Event 4624 (LogonType 3)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Foreign IP Correlation</span>
                        <span className="text-[10px] text-amber-400 mt-1">203.0.113.77 @ 03:13 UTC</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Web Access Log Trace</span>
                        <span className="text-[10px] text-cyan-400 mt-1">GET /archive/notes.php</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Base64 Export Parameter</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">250 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-amber-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Host authentication logs (Security.evtx) and web server access logs are orthogonal. Event 4624 confirms an authentication occurred, but cannot record what was done inside the application. Correlating both pinpointed the attacker&apos;s actions.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Querying <code>Security.evtx</code> for dormant user <code>evelyn.graves</code> at 03:13 UTC revealed LogonType 3 from IP <code>203.0.113.77</code>. Grepping <code>njit_web.log</code> for this IP uncovered a GET request with parameter <code>note=c3Bvb2t5...</code> which Base64-decoded into the flag.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="phantom-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;the_ghost_left_a_trace&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{the_ghost_left_a_trace}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 07: ARACHNOPHOBIA (80 PTS - FILE CARVING)
            ========================================================================= */}
            <article id="arachnophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 07 • File Carving
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      80 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                      Easy
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Arachnophobia: Appended PKZIP Archive Carving
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">Hiral Z</strong></span>
                  <span>•</span>
                  <span>Target Image: <code className="text-amber-300">tangled.png (977 KB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;Something about the SpookyCTF logo feels off… like something’s tangled in the webs&rdquo;
                </p>
              </div>

              <section id="arach-recon" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> IEND Chunk Boundary Analysis
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  A PNG file format strictly terminates at the <code>IEND</code> marker (<code>49 45 4E 44 AE 42 60 82</code>). Inspecting <code>tangled.png</code> reveals 214 bytes of appended overlay data after the IEND chunk at offset <code>976909</code> starting with magic bytes <code>50 4B 03 04</code> (PKZIP archive signature).
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Python Overlay Extraction One-Liner</span>
                    <CopyButton text={"python -c \"d = open('tangled.png','rb').read(); off = d.find(b'PK\\x03\\x04'); open('carved.zip','wb').write(d[off:])\""} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{"$ python -c \"d = open('tangled.png','rb').read(); off = d.find(b'PK\\x03\\x04'); open('carved.zip','wb').write(d[off:])\"\n$ unzip carved.zip\nArchive: carved.zip\n  inflating: flag.txt\n$ cat flag.txt\nspooky{8_l3gs_4nd_4_z1p}"}</code>
                  </pre>
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(16,185,129,0.18)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/5 hover:bg-emerald-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-emerald-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-emerald-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">PNG Spec Integrity Check</span>
                        <span className="text-[10px] text-zinc-400 mt-1">Valid Image Rendering</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">IEND Trailer Scan</span>
                        <span className="text-[10px] text-emerald-400 mt-1">Offset 976905 (0x0EE829)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">PKZIP Overlay Carve</span>
                        <span className="text-[10px] text-cyan-400 mt-1">Offset 976913 50 4B 03 04</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Extracted flag.txt</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">80 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        The PNG specification requires image renderers to cease parsing immediately upon reaching the <code>IEND</code> chunk. Any bytes appended past <code>IEND</code> are ignored by browsers, making trailer overlays an ideal polyglot malware vector.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Scanning the binary located <code>IEND</code> and its 4-byte CRC at offset 976905-976913. Slicing from offset 976913 immediately hit the PKZIP magic bytes (<code>50 4B 03 04</code>). Unzipping the sliced archive extracted <code>flag.txt</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="arach-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;8_l3gs_4nd_4_z1p&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{8_l3gs_4nd_4_z1p}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 08: EISOPTROPHOBIA (50 PTS - STEGANOGRAPHY)
            ========================================================================= */}
            <article id="eisoptrophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 09 • Steganography
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      50 PTS
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                      Easy
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Eisoptrophobia: Row-Major RGB LSB Extraction
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">Makuta A</strong></span>
                  <span>•</span>
                  <span>Target Image: <code className="text-amber-300">Eisoptrophobiactf.png (1.4 MB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-amber-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;Something strange is happening in the mirror. What appears to be an ordinary reflection may be hiding something more than meets the eye. Look closely, investigate the image, and uncover what lies beneath the surface.&rdquo;
                </p>
              </div>

              <section id="eiso-recon" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-amber-400">01.</span> Zsteg Channel Analysis &amp; Extraction
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Executing <code>zsteg -a</code> across color channels pinpoints an embedded null-terminated Base64 ASCII payload on channel <code>b1,rgb,lsb,xy</code>:
                </p>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050508]">
                  <div className="px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Zsteg Output</span>
                    <CopyButton text={"zsteg -a Eisoptrophobiactf.png"} />
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{"$ zsteg -a Eisoptrophobiactf.png\nb1,rgb,lsb,xy .. text: \"c3Bvb2t5e3RoZV9yZWZsZWN0aW9uX25ldmVyX2xpZXN9\"\n\n$ echo 'c3Bvb2t5e3RoZV9yZWZsZWN0aW9uX25ldmVyX2xpZXN9' | base64 -d\nspooky{the_reflection_never_lies}"}</code>
                  </pre>
                </div>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(16,185,129,0.18)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/5 hover:bg-emerald-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-emerald-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-emerald-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Mirror Reflection Clue</span>
                        <span className="text-[10px] text-zinc-400 mt-1">Optical Axis &amp; Scanlines</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">zsteg Mode Probing</span>
                        <span className="text-[10px] text-emerald-400 mt-1">b1,rgb,lsb,xy Detected</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Row-Major Bit Slicing</span>
                        <span className="text-[10px] text-cyan-400 mt-1">NumPy MSB-First Stream</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-emerald-400 font-bold">TARGET FLAG</span>
                        <span className="text-emerald-300 font-semibold text-[11px] mt-1">Base64 Decode</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-1">50 PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        &ldquo;Eisoptrophobia&rdquo; is the fear of mirrors and optical reflections. Steganography challenges use title hints to signal coordinate space transforms (horizontal scanlines vs column-major orders).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        <code>zsteg</code> flagged mode <code>b1,rgb,lsb,xy</code>. Slicing bit 0 across R, G, and B sequentially in row-major order (<code>xy</code>) and packing 8 bits per byte MSB-first produced the Base64 string that decoded directly into the flag.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="eiso-flag" className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0b0b12] border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Verified Flag:
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-white tracking-wide break-all">
                      spooky&#123;the_reflection_never_lies&#125;
                    </span>
                  </div>
                  <CopyButton text={"spooky{the_reflection_never_lies}"} />
                </div>
              </section>
            </article>

            {/* =========================================================================
                OPERATION 09: PHASMOPHOBIA (POST-MORTEM TECHNICAL ANALYSIS)
            ========================================================================= */}
            <article id="phasmophobia" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#09090e]/95 border border-zinc-800 shadow-2xl space-y-8 backdrop-blur-xl">
              
              <div className="border-b border-zinc-800 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 09 • Audio Steganography &amp; Forensics
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      Unsolved
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold uppercase">
                      Post-Mortem
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
                  Phasmophobia: Audio Spectrogram Carving &amp; Forensic Post-Mortem
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <span>Author: <strong className="text-white">Nexus Nova</strong></span>
                  <span>•</span>
                  <span>Artifacts: <code className="text-purple-300">PhasmophobiaChallenge.wav (3.34 MB)</code>, <code className="text-zinc-300">ebersecret.png (8.2 MB)</code></span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border-l-4 border-purple-500 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  Investigation Brief
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                  &ldquo;Whenever I see Eberhardt Hall...I get quite the heebie jeebies. Especially as Halloween draws near. That place just...feels like a haunted mansion. Matter of fact; I&apos;m pretty sure it is! I went in recently, and some eerie, haunting music started playing... where was it coming from? I followed it, and it led me to a dusty room with an old picture of Eberhardt Hall. Suddenly, whispers filled the air, speaking in some strange tongue I couldn&apos;t understand...&rdquo;
                </p>
              </div>

              <section id="phasmo-spectro" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-purple-400">01.</span> Spectrogram Text Carving &amp; Frequency Mapping
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Opening <code>PhasmophobiaChallenge.wav</code> in Audacity under Spectrogram view reveals hidden visual characters synthesized directly into frequency bands between 5,000 Hz and 9,500 Hz:
                </p>

                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-black">
                  <Image
                    src="/images/spooky/audacity_spec.png"
                    alt="Audacity Spectrogram showing carved text characters"
                    width={1000}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </section>

              <section id="phasmo-whisper" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-purple-400">02.</span> Butterworth Filtering &amp; Whisper ASR
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  To decipher the &ldquo;strange tongue whispers&rdquo;, we split the audio into isolated frequency bands using a 10th-order Butterworth filter:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-zinc-400 font-sans">
                  <li><strong>Lowpass &lt; 5,000 Hz:</strong> Isolates the haunting organ soundtrack without spectrogram distortion.</li>
                  <li><strong>Bandpass 5,000 Hz &ndash; 10,000 Hz:</strong> Isolates the synthetic whisper carriers.</li>
                  <li><strong>Time-Reversal + Whisper AI:</strong> Inverting audio phase and passing reversed tracks through OpenAI Whisper neural transcription to detect phonetic speech.</li>
                </ul>
              </section>

                            {/* =========================================================
                  GLOWING INTERACTIVE "IDEA" DISCLOSURE: WHY, HOW & MAP
              ========================================================= */}
              <details className="group rounded-2xl border border-purple-500/40 bg-gradient-to-br from-[#0c0d16] via-[#090a10] to-[#06060a] shadow-[0_0_20px_rgba(168,85,247,0.18)] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-all duration-300 overflow-hidden my-6">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/5 hover:bg-purple-500/15 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/60 font-mono text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center gap-1.5 animate-pulse">
                      <svg className="w-3.5 h-3.5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.828-7.915A4 4 0 0116 10a4 4 0 01-4 4z" />
                      </svg>
                      IDEA
                    </span>
                    <div className="text-left">
                      <span className="text-sm font-bold text-white font-mono tracking-wide block">
                        Core Threat Concept // The &ldquo;Why&rdquo;, &ldquo;How&rdquo; &amp; Tactical Map
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block">
                        Click to expand threat rationale, underlying OS mechanics, and tactical flow
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-purple-400 group-open:hidden">
                      EXPAND &darr;
                    </span>
                    <span className="text-[11px] font-mono text-purple-400 hidden group-open:inline">
                      COLLAPSE &uarr;
                    </span>
                    <svg className="w-4 h-4 text-purple-400 transform group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="p-5 sm:p-6 border-t border-purple-500/20 space-y-6 bg-black/40">
                  {/* Tactical Investigation Flow */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                      Tactical Investigation Map
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 01</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Dual-Artifact Threat Triage</span>
                        <span className="text-[10px] text-zinc-400 mt-1">WAV Audio + PNG Carrier</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 02</span>
                        <span className="text-white font-semibold text-[11px] mt-1">FFT Spectral Carving</span>
                        <span className="text-[10px] text-purple-400 mt-1">5-9.5 kHz Synthetic Glyphs</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold">PIVOT 03</span>
                        <span className="text-white font-semibold text-[11px] mt-1">Anti-Phase &amp; Neural ASR</span>
                        <span className="text-[10px] text-cyan-400 mt-1">Butterworth + Whisper AI</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/30 flex flex-col justify-between">
                        <span className="text-[10px] text-purple-400 font-bold">OUTCOME</span>
                        <span className="text-purple-300 font-semibold text-[11px] mt-1">Composite Stego Impasse</span>
                        <span className="text-[10px] text-purple-400 font-mono mt-1">Open Research</span>
                      </div>
                    </div>
                  </div>

                  {/* Why & How Concept Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-purple-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        The &ldquo;Why&rdquo; • Investigative Rationale
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Composite audio-visual challenges become brittle when the primary acoustic signal does not supply an unambiguous transposition key for the secondary image bitplane matrix. Documenting verified extractions and dead-ends is standard DFIR practice.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-cyan-500/20 space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        The &ldquo;How&rdquo; • Under-The-Hood Mechanics
                      </span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        A 2048-point FFT spectrogram isolated synthetic glyphs (<code>EBERHARDT_HAUNTED_1885</code>) in the 5-9.5 kHz band. Left-right channel phase cancellation paired with Butterworth filtering isolated a whisper track transcribed by OpenAI Whisper AI.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <section id="phasmo-postmortem" className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-purple-400">03.</span> Dead-End Analysis &amp; Technical Retrospective
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  While character fragments such as <code>spooped</code>, <code>axwwxml</code>, and <code>WWOLJ</code> were recovered from the audio spectrogram and Caesar-shifted against Eberhardt Hall lore, submission attempts failed during the competition due to non-standard character spacing or an unresolved composite cipher combining both the image (<code>ebersecret.png</code>) and audio artifacts. Documenting open mysteries and technical dead-ends remains essential for continuous forensic growth.
                </p>
              </section>
            </article>

            {/* Reusable Follow Me Component */}
            <FollowMe
              backHref="/ctfs"
              backLabel="Back to CTFs Hub"
              hubHref="/"
              hubLabel="Home"
            />

          </div>

        </div>

      </main>
    </div>
  );
}
