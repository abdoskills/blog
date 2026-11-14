"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";
import FollowMe from "@/components/FollowMe";

export default function BlackEnergyLabWriteup() {
  const [activeOpId, setActiveOpId] = useState("q1");

  const operations = [
    {
      id: "q1",
      num: "01",
      title: "Volatility Profile",
      badge: "WinXPSP2x86",
      tag: "PROFILE",
    },
    {
      id: "q2",
      num: "02",
      title: "Active Running Processes",
      badge: "19",
      tag: "PROCESSES",
    },
    {
      id: "q3",
      num: "03",
      title: "Process ID of cmd.exe",
      badge: "1960",
      tag: "PID",
    },
    {
      id: "q4",
      num: "04",
      title: "Suspicious Process Name",
      badge: "rootkit.exe",
      tag: "ROOTKIT",
    },
    {
      id: "q5",
      num: "05",
      title: "Code Injection Process",
      badge: "svchost.exe",
      tag: "INJECTION",
    },
    {
      id: "q6",
      num: "06",
      title: "Suspicious Kernel Driver",
      badge: "str.sys",
      tag: "DRIVER",
    },
    {
      id: "q7",
      num: "07",
      title: "Injected Stealth DLL",
      badge: "msxml3r.dll",
      tag: "UNLINKED",
    },
    {
      id: "q8",
      num: "08",
      title: "Injected DLL Base Address",
      badge: "0x980000",
      tag: "BASE ADDR",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const opIds = operations.map((o) => o.id);
      for (let i = opIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(opIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveOpId(opIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [operations]);

  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumbs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              HOME
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/labs/cyberdefenders" className="hover:text-amber-400 transition-colors">
              CYBERDEFENDERS
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 uppercase">BLACKENERGY LAB</span>
          </div>

          {/* Banner Graphic */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60 max-w-4xl mx-auto">
            <Image
              src="/images/cyberdefenders/blackenergy_banner.png"
              alt="CyberDefenders BlackEnergy Memory Forensics Banner"
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 border-b border-zinc-800 pb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                CyberDefenders
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-mono">
                Memory Forensics / Windows Incident Response
              </span>
              <span className="px-2.5 py-1 rounded bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-mono font-bold">
                BlackEnergy v2 Rootkit
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-4">
              CyberDefenders — BlackEnergy Memory Forensics Writeup
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              A multinational corporation has suffered a targeted cyber attack resulting in the theft and exfiltration of sensitive data. The intrusion was executed using a variant of the notorious <strong>BlackEnergy v2</strong> rootkit. The enterprise incident response team acquired a full physical RAM memory dump (<code className="text-amber-300 font-mono">CYBERDEF-567078-20230213-171333.raw</code>) from the infected host. Our mission is to dissect the dump using Volatility 2, trace malicious process ancestry, detect reflective code injection, identify the rogue kernel driver, and uncover unlinked stealth DLLs.
            </p>

            {/* Tactical Memory Forensics HUD */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0a0a0f] border border-zinc-800/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Target Memory Artifact &amp; Primary Forensic Indicators
                </span>
                <span className="text-[10px] font-mono text-zinc-500">LAB ARTIFACT: 99-BlackEnergy.zip</span>
              </div>

              {/* Memory Dump File Box */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Acquired RAM Dump:</span>
                  <code className="text-xs sm:text-sm font-mono text-amber-300 font-bold break-all">
                    CYBERDEF-567078-20230213-171333.raw (2.15 GB)
                  </code>
                </div>
                <CopyButton text="CYBERDEF-567078-20230213-171333.raw" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Volatility Profile</span>
                  <span className="text-amber-400 font-bold">WinXPSP2x86</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Injected Process</span>
                  <span className="text-red-400 font-bold">svchost.exe (PID 880)</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Base Address</span>
                  <span className="text-zinc-200 font-bold">0x980000 (PAGE_RWX)</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Kernel Driver</span>
                  <span className="text-red-300 font-bold">str.sys (Rootkit)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Lab Reference Box */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <div>
                  <span className="text-zinc-400">Official Lab Reference: </span>
                  <span className="text-white font-bold">CyberDefenders — BlackEnergy</span>
                </div>
              </div>
              <a
                href="https://cyberdefenders.org/blueteam-ctf-challenges/blackenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:text-amber-300 font-mono transition-colors shrink-0"
              >
                <span>Open on CyberDefenders.org</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Bar Quick Pills */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-wrap gap-2 pb-2">
              {operations.map((op) => (
                <button
                  key={op.id}
                  onClick={() => scrollToElement(op.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    activeOpId === op.id
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
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
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-2 font-mono text-xs shadow-xl">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold px-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Operations Index</span>
                  <span className="text-[10px] text-amber-400 font-bold">8 Questions</span>
                </div>
                {operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => scrollToElement(op.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between text-xs ${
                      activeOpId === op.id
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    <span className="truncate">{op.num}. {op.title}</span>
                    <span className="text-[10px] text-zinc-500 ml-1 shrink-0">{op.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* Q1 */}
              <section id="q1" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #1 • Volatility Profile Identification
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Which volatility profile would be best for this machine?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    The first step in any Windows memory analysis investigation is determining the correct kernel data block (<code className="text-amber-300">KDBG</code>) profile and operating system architecture. In Volatility 2, we execute the <code>imageinfo</code> plugin against the raw image:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw imageinfo</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw imageinfo" />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Plugin Output:</span>
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto">
{`Suggested Profile(s) : WinXPSP2x86, WinXPSP3x86 (Instantiated with WinXPSP2x86)
                     AS Layer1 : IA32PagedMemory (Kernel AS)
                     AS Layer2 : FileAddressSpace 
                      PAE type : No PAE
                           DTB : 0x39000L
                          KDBG : 0x8054cde0L
          Number of Processors : 1
     Image Type (Service Pack) : 3
                KPCR for CPU 0 : 0xffdff000L
             KUSER_SHARED_DATA : 0xffdf0000L
           Image date and time : 2023-02-13 18:29:11 UTC+0000
     Image local date and time : 2023-02-13 10:29:11 -0800`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    The primary suggested profile recommended by Volatility is <code className="text-amber-300 font-mono font-bold">WinXPSP2x86</code> (32-bit Windows XP Service Pack 2). We will instantiate this profile for all subsequent memory analysis commands.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">WinXPSP2x86</code>
                    </div>
                    <CopyButton text="WinXPSP2x86" />
                  </div>
                </div>
              </section>

              {/* Q2 */}
              <section id="q2" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #2 • Active Running Processes
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    How many processes were running when the image was acquired?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    We use the <code>pslist</code> plugin to walk the kernel doubly linked list of active process structures (<code>_EPROCESS</code> via <code>ActiveProcessLinks</code>):
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 pslist</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 pslist" />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Process Listing Output:</span>
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed">
{`Offset(V)  Name                    PID   PPID   Thds     Hnds   Sess  Wow64 Start                          Exit                          
---------- -------------------- ------ ------ ------ -------- ------ ------ ------------------------------ ------------------------------
0x89c037f8 System                    4      0     55      245 ------      0                                                              
0x89965020 smss.exe                368      4      3       19 ------      0 2023-02-14 04:54:15 UTC+0000                                 
0x89a98da0 csrss.exe               592    368     11      321      0      0 2023-02-14 04:54:15 UTC+0000                                 
0x89a88da0 winlogon.exe            616    368     18      508      0      0 2023-02-14 04:54:15 UTC+0000                                 
0x89938998 services.exe            660    616     15      240      0      0 2023-02-14 04:54:15 UTC+0000                                 
0x89aa0020 lsass.exe               672    616     21      335      0      0 2023-02-14 04:54:15 UTC+0000                                 
0x89aaa3d8 VBoxService.exe         832    660      9      115      0      0 2023-02-14 04:54:15 UTC+0000                                 
0x89aab590 svchost.exe             880    660     21      295      0      0 2023-02-13 17:54:16 UTC+0000                                 
0x89a9f6f8 svchost.exe             968    660     10      244      0      0 2023-02-13 17:54:17 UTC+0000                                 
0x89730da0 svchost.exe            1060    660     51     1072      0      0 2023-02-13 17:54:17 UTC+0000                                 
0x897289a8 svchost.exe            1108    660      5       78      0      0 2023-02-13 17:54:17 UTC+0000                                 
0x899adda0 svchost.exe            1156    660     13      192      0      0 2023-02-13 17:54:17 UTC+0000                                 
0x89733938 explorer.exe           1484   1440     14      489      0      0 2023-02-13 17:54:18 UTC+0000                                 
0x897075d0 spoolsv.exe            1608    660     10      106      0      0 2023-02-13 17:54:18 UTC+0000                                 
0x8969188 wscntfy.exe             480   1060      1       28      0      0 2023-02-13 17:54:30 UTC+0000                                 
0x8969d2a0 alg.exe                 540    660      5      102      0      0 2023-02-13 17:54:30 UTC+0000                                 
0x89982da0 VBoxTray.exe            376   1484     13      125      0      0 2023-02-13 17:54:30 UTC+0000                                 
0x8994a020 msmsgs.exe              636   1484      2      157      0      0 2023-02-13 17:54:30 UTC+0000                                 
0x89a0b2f0 taskmgr.exe            1880   1484      0 --------      0      0 2023-02-13 18:25:15 UTC+0000   2023-02-13 18:26:21 UTC+0000  
0x899dd740 rootkit.exe             964   1484      0 --------      0      0 2023-02-13 18:25:26 UTC+0000   2023-02-13 18:25:26 UTC+0000  
0x89a18da0 cmd.exe                1960    964      0 --------      0      0 2023-02-13 18:25:26 UTC+0000   2023-02-13 18:25:26 UTC+0000  
0x896c5020 notepad.exe             528   1484      0 --------      0      0 2023-02-13 18:26:55 UTC+0000   2023-02-13 18:27:46 UTC+0000  
0x89a0d180 notepad.exe            112   1484      0 --------      0      0 2023-02-13 18:28:25 UTC+0000   2023-02-13 18:28:40 UTC+0000  
0x899e6da0 notepad.exe            1444   1484      0 --------      0      0 2023-02-13 18:28:42 UTC+0000   2023-02-13 18:28:47 UTC+0000  
0x89a0fda0 DumpIt.exe              276   1484      1       25      0      0 2023-02-13 18:29:08 UTC+0000`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    The table lists <strong>25 total process entries</strong>. However, the question asks how many processes were actively running when the image was acquired. Looking closely at the <strong>Exit</strong> column reveals <strong>6 terminated processes</strong>:
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><code className="text-red-300">taskmgr.exe</code> (PID 1880) — Exited at 18:26:21 UTC</li>
                    <li><code className="text-red-300">rootkit.exe</code> (PID 964) — Exited at 18:25:26 UTC</li>
                    <li><code className="text-red-300">cmd.exe</code> (PID 1960) — Exited at 18:25:26 UTC</li>
                    <li><code className="text-red-300">notepad.exe</code> (PID 528) — Exited at 18:27:46 UTC</li>
                    <li><code className="text-red-300">notepad.exe</code> (PID 112) — Exited at 18:28:40 UTC</li>
                    <li><code className="text-red-300">notepad.exe</code> (PID 1444) — Exited at 18:28:47 UTC</li>
                  </ul>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    Active running processes: <code className="text-amber-300 font-mono font-bold">25 - 6 = 19</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">19</code>
                    </div>
                    <CopyButton text="19" />
                  </div>
                </div>
              </section>

              {/* Q3 */}
              <section id="q3" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #3 • Process ID Extraction
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the process ID of cmd.exe?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    The Process ID (PID) uniquely identifies execution instances in Windows memory. Looking at the <code>pslist</code> output from Question #2:
                  </p>

                  <div className="p-3 rounded-xl bg-[#050508] border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <code>0x89a18da0 cmd.exe 1960 964 0 -------- 0 0 2023-02-13 18:25:26 UTC+0000 2023-02-13 18:25:26 UTC+0000</code>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    The PID of <code>cmd.exe</code> is <code className="text-amber-300 font-mono font-bold">1960</code>. Notice its PPID (Parent Process ID) is <code>964</code> (<code className="text-red-300">rootkit.exe</code>), indicating the command prompt was invoked by the rootkit binary to execute immediate staging commands.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer (Process ID)</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">1960</code>
                    </div>
                    <CopyButton text="1960" />
                  </div>
                </div>
              </section>

              {/* Q4 */}
              <section id="q4" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #4 • Process Ancestry &amp; Suspicious Executable
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the name of the most suspicious process?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    To understand how processes relate to one another and spot rogue execution trees, we execute the <code>pstree</code> plugin:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 pstree</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 pstree" />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Process Tree Analysis:</span>
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed">
{` 0x89733938:explorer.exe                             1484   1440     14    489 2023-02-13 17:54:18 UTC+0000
. 0x896c5020:notepad.exe                              528   1484      0 ------ 2023-02-13 18:26:55 UTC+0000
. 0x89a0d180:notepad.exe                             112   1484      0 ------ 2023-02-13 18:28:25 UTC+0000
. 0x899dd740:rootkit.exe                              964   1484      0 ------ 2023-02-13 18:25:26 UTC+0000
.. 0x89a18da0:cmd.exe                                1960    964      0 ------ 2023-02-13 18:25:26 UTC+0000
. 0x89a0b2f0:taskmgr.exe                             1880   1484      0 ------ 2023-02-13 18:25:15 UTC+0000
. 0x899e6da0:notepad.exe                             1444   1484      0 ------ 2023-02-13 18:28:42 UTC+0000
. 0x89982da0:VBoxTray.exe                             376   1484     13    125 2023-02-13 17:54:30 UTC+0000
. 0x89a0fda0:DumpIt.exe                               276   1484      1     25 2023-02-13 18:29:08 UTC+0000
. 0x8994a020:msmsgs.exe                               636   1484      2    157 2023-02-13 17:54:30 UTC+0000`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    Under user shell <code className="text-zinc-200">explorer.exe</code> (PID 1484), a binary named <code className="text-red-400 font-bold">rootkit.exe</code> (PID 964) was executed. It immediately launched <code className="text-zinc-200">cmd.exe</code> (PID 1960) and exited. Legitimate Windows system utilities never use the name <code>rootkit.exe</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">rootkit.exe</code>
                    </div>
                    <CopyButton text="rootkit.exe" />
                  </div>
                </div>
              </section>

              {/* Q5 */}
              <section id="q5" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #5 • Code Injection &amp; Memory Allocation
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Which process shows the highest likelihood of code injection?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    To detect reflective DLL injection, process hollowing, and shellcode implants, we run the <code>malfind</code> plugin. <code>malfind</code> inspects the memory Virtual Address Descriptors (VAD) of all processes, looking for pages with <code className="text-red-300">PAGE_EXECUTE_READWRITE</code> (W+X) protection tags that are not backed by a disk file:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 malfind</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 malfind" />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Malfind Detection on PID 880:</span>
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed">
{`Process: svchost.exe Pid: 880 Address: 0x980000
Vad Tag: VadS Protection: PAGE_EXECUTE_READWRITE
Flags: CommitCharge: 9, MemCommit: 1, PrivateMemory: 1, Protection: 6

0x0000000000980000  4d 5a 90 00 03 00 00 00 04 00 00 00 ff ff 00 00   MZ..............
0x0000000000980010  b8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00   ........@.......
0x0000000000980020  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................
0x0000000000980030  00 00 00 00 00 00 00 00 00 00 00 00 f8 00 00 00   ................

0x0000000000980000 4d               DEC EBP
0x0000000000980001 5a               POP EDX
0x0000000000980002 90               NOP
0x0000000000980003 0003             ADD [EBX], AL`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Inside <code className="text-amber-300 font-bold">svchost.exe</code> (PID 880) at memory address <code className="text-zinc-200 font-mono">0x980000</code>:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><strong>Protection:</strong> <code className="text-red-300">PAGE_EXECUTE_READWRITE</code> (Writable and Executable)</li>
                    <li><strong>Magic Bytes:</strong> <code className="text-amber-300">4D 5A</code> (<code className="text-white">MZ</code> DOS header of a Portable Executable / DLL)</li>
                  </ul>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    To definitively prove what this injected payload is, we dump the memory segment to disk:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 malfind -p 880 -D ./dump/</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 malfind -p 880 -D ./dump/" />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    Uploading the dumped memory payload (<code>0x00980000.vvmem</code> / SHA-256: <code className="text-amber-300 font-mono break-all">8638ab1e5f9ba4cffc66400d36d47f7805733fae828a0cace9421d0bd83eaefa</code>) to VirusTotal confirms the payload: 22 security vendors flag it explicitly as <strong className="text-red-400">Rootkit.BlackEnergy</strong>!
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/blackenergy/Pasted_image_20261114142353.png"
                      alt="VirusTotal report confirming dumped injected memory payload is Rootkit.BlackEnergy"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer (Injected Process Name)</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">svchost.exe</code>
                    </div>
                    <CopyButton text="svchost.exe" />
                  </div>
                </div>
              </section>

              {/* Q6 */}
              <section id="q6" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #6 • Kernel Driver Persistence Artifact
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    There is an odd file referenced in the recent process. Provide the full path of that file.
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    Now that we know <code>svchost.exe</code> (PID 880) is compromised, we query its open kernel handles using the <code>handles</code> plugin, filtering exclusively for file handles (<code>-t File</code>):
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 handles -p 880 -t File</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 handles -p 880 -t File" />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">File Handles Listing (PID 880):</span>
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed">
{`Offset(V)     Pid     Handle     Access Type             Details
---------- ------ ---------- ---------- ---------------- -------
0x89a28890    880        0xc   0x100020 File             \\Device\\HarddiskVolume1\\WINDOWS\\system32
0x89a1a6f8    880       0x50   0x100001 File             \\Device\\KsecDD
0x89937358    880       0x68   0x100020 File             \\Device\\HarddiskVolume1\\WINDOWS\\WinSxS\\x86_Microsoft.Windows.Common-Controls...
0x899d0250    880       0xbc   0x12019f File             \\Device\\NamedPipe\\net\\NtControlPipe2
0x89a00f90    880      0x33c   0x12019f File             \\Device\\{9DD6AFA1-8646-4720-836B-EDCB1085864A}
0x89af0cf0    880      0x340   0x12019f File             \\Device\\HarddiskVolume1\\WINDOWS\\system32\\drivers\\str.sys
0x89958b78    880      0x3e4   0x12019f File             \\Device\\HarddiskVolume1\\WINDOWS\\system32\\config\\systemprofile\\...`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    At handle offset <code className="text-zinc-300 font-mono">0x340</code>, the process holds an active open handle to:
                  </p>
                  <code className="block p-3 rounded-xl bg-black/60 border border-zinc-800 text-red-300 font-mono text-xs break-all">
                    \Device\HarddiskVolume1\WINDOWS\system32\drivers\str.sys
                  </code>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    BlackEnergy v2 drops a kernel-mode driver (`str.sys`) to hook system routines and execute in Ring 0. Translating the NT device path to standard drive letter format gives: <code className="text-amber-300 font-mono font-bold">C:\WINDOWS\system32\drivers\str.sys</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer (Full File Path)</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">C:\WINDOWS\system32\drivers\str.sys</code>
                    </div>
                    <CopyButton text="C:\WINDOWS\system32\drivers\str.sys" />
                  </div>
                </div>
              </section>

              {/* Q7 */}
              <section id="q7" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #7 • Reflective DLL Injection &amp; PEB Unlinking
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the name of the injected dll file loaded from the recent process?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    When a DLL is loaded legitimately by Windows, the Windows Loader inserts pointers into three doubly linked lists inside the Process Environment Block (<code className="text-zinc-200">_PEB_LDR_DATA</code>):
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pl-2">
                    <li><code className="text-amber-300">InLoadOrderModuleList</code></li>
                    <li><code className="text-amber-300">InMemoryOrderModuleList</code></li>
                    <li><code className="text-amber-300">InInitializationOrderModuleList</code></li>
                  </ul>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    To evade detection by user-mode memory scanning tools, stealth malware unlinks its injected DLL from all three lists (PEB Unlinking). The <code>ldrmodules</code> plugin scans for modules that appear in memory but are missing or unlinked from these lists:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-amber-400 flex items-center justify-between">
                    <code>volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 ldrmodules -p 880</code>
                    <CopyButton text="volatility -f CYBERDEF-567078-20230213-171333.raw --profile=WinXPSP2x86 ldrmodules -p 880" />
                  </div>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <span className="text-zinc-500 font-bold block uppercase tracking-wider">Ldrmodules Output:</span>
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed">
{`Pid      Process              Base       InLoad InInit InMem MappedPath
-------- -------------------- ---------- ------ ------ ----- ----------
     880 svchost.exe          0x6f880000 True   True   True  \\WINDOWS\\AppPatch\\AcGenral.dll
     880 svchost.exe          0x01000000 True   False  True  \\WINDOWS\\system32\\svchost.exe
     880 svchost.exe          0x77f60000 True   True   True  \\WINDOWS\\system32\\shlwapi.dll
...
     880 svchost.exe          0x74980000 True   True   True  \\WINDOWS\\system32\\msxml3.dll
     880 svchost.exe          0x009a0000 False  False  False \\WINDOWS\\system32\\msxml3r.dll
     880 svchost.exe          0x77e70000 True   True   True  \\WINDOWS\\system32\\rpcrt4.dll`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    Notice that <code className="text-red-400 font-bold">msxml3r.dll</code> displays:
                  </p>
                  <code className="block p-2 rounded bg-black/60 text-red-300 font-mono text-xs border border-zinc-800">
                    InLoad: False | InInit: False | InMem: False
                  </code>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    Being unlinked across all three loader lists is a classic indicator of reflective DLL injection or PEB manipulation. The malicious DLL masquerades as the XML resource library (<code>msxml3r.dll</code>).
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer (DLL Name)</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">msxml3r.dll</code>
                    </div>
                    <CopyButton text="msxml3r.dll" />
                  </div>
                </div>
              </section>

              {/* Q8 */}
              <section id="q8" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      #8 • Injected DLL Base Virtual Address
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    What is the base address of the injected dll?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    Because the injected DLL was unlinked from the PEB, conventional plugins like <code>dlllist</code> will not display it. However, the Windows Memory Manager cannot conceal the underlying Virtual Address Descriptor (VAD) node where the executable payload was mapped into memory.
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    Returning to our <code>malfind</code> scan on <code>svchost.exe</code> (PID 880):
                  </p>

                  <div className="p-4 rounded-xl bg-[#09090e] border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2">
                    <pre className="text-zinc-400 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed">
{`Process: svchost.exe Pid: 880 Address: 0x980000
Vad Tag: VadS Protection: PAGE_EXECUTE_READWRITE
Flags: CommitCharge: 9, MemCommit: 1, PrivateMemory: 1, Protection: 6

0x0000000000980000  4d 5a 90 00 03 00 00 00 04 00 00 00 ff ff 00 00   MZ..............`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    The base virtual memory address where the injected DLL header (`MZ` signature) begins is <code className="text-amber-300 font-mono font-bold">0x980000</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">Answer (Base Address)</span>
                      <code className="text-sm sm:text-base font-mono text-amber-300 font-bold">0x980000</code>
                    </div>
                    <CopyButton text="0x980000" />
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Bottom Follow & Social Footer */}
          <div className="mt-16 max-w-4xl mx-auto">
            <FollowMe />
          </div>

        </div>
      </main>
    </div>
  );
}
