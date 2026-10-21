"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";

export default function OpenWireLabWriteup() {
  const [activeOpId, setActiveOpId] = useState("q1");

  const operations = [
    {
      id: "q1",
      num: "01",
      title: "C2 Server IP",
      badge: "146.190.21.91",
      tag: "C2",
      sections: [
        { id: "q1-conv", title: "1. Statistics ➔ Conversations" },
        { id: "q1-openwire", title: "2. OpenWire TCP Stream" },
      ]
    },
    {
      id: "q2",
      num: "02",
      title: "Exploited Port",
      badge: "61616",
      tag: "PORT",
      sections: [
        { id: "q2-filter", title: "1. Filter ip.src == 146.190.21.91" },
      ]
    },
    {
      id: "q3",
      num: "03",
      title: "Vulnerable Service",
      badge: "ActiveMQ",
      tag: "SVC",
      sections: [
        { id: "q3-header", title: "1. WireFormatInfo ProviderName" },
        { id: "q3-vt", title: "2. VirusTotal Cross-Check" },
      ]
    },
    {
      id: "q4",
      num: "04",
      title: "Second C2 (Staging)",
      badge: "128.199.52.72",
      tag: "STAGE",
      sections: [
        { id: "q4-ext", title: "1. External IPs Analysis" },
        { id: "q4-stream", title: "2. Payload HTTP Stream" },
      ]
    },
    {
      id: "q5",
      num: "05",
      title: "Dropped Executable",
      badge: "docker",
      tag: "EXEC",
      sections: [
        { id: "q5-name", title: "1. Reverse Shell Disguise" },
      ]
    },
    {
      id: "q6",
      num: "06",
      title: "Invoked Java Class",
      badge: "ProcessBuilder",
      tag: "JAVA",
      sections: [
        { id: "q6-xml", title: "1. Raw XML Payload" },
        { id: "q6-class", title: "2. ProcessBuilder Command Exec" },
      ]
    },
    {
      id: "q7",
      num: "07",
      title: "Vulnerability CVE",
      badge: "CVE-2023-46604",
      tag: "CVE",
      sections: [
        { id: "q7-cve", title: "1. ActiveMQ OpenWire RCE CVE" },
      ]
    },
    {
      id: "q8",
      num: "08",
      title: "Vendor Patch Method",
      badge: "createThrowable",
      tag: "PATCH",
      sections: [
        { id: "q8-patch", title: "1. GitHub Commit Validation Step" },
      ]
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
          if (top <= scrollPosition) {
            setActiveOpId(opIds[i]);
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
            <span className="text-emerald-400 uppercase">OPENWIRE LAB</span>
          </div>

          {/* Banner Graphic */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60 max-w-4xl mx-auto">
            <Image
              src="/images/cyberdefenders/openwire_banner.png"
              alt="CyberDefenders OpenWire Lab Banner"
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 border-b border-zinc-800 pb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                CyberDefenders
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-mono">
                Network Forensics / PCAP Analysis
              </span>
              <span className="px-2.5 py-1 rounded bg-red-950/40 text-red-400 border border-red-800/40 text-xs font-mono">
                CVE-2023-46604
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-4">
              🛡️ CyberDefenders — OpenWire Lab Writeup
            </h1>

            {/* Key IPs Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#0a0a0f] border border-zinc-800">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold block mb-2">
                Key IPs Identified:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Victim Server</span>
                  <span className="text-zinc-200 font-bold">134.209.197.3</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-red-400/80 block text-[10px] uppercase">Primary Attacker / C2</span>
                  <span className="text-red-300 font-bold">146.190.21.91</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-amber-400/80 block text-[10px] uppercase">Second C2 (Staging)</span>
                  <span className="text-amber-300 font-bold">128.199.52.72</span>
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
                    153-OpenWire.zip (2.04 MB)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Source: <code className="text-zinc-300 bg-black/50 px-1 py-0.5 rounded">C:\CTFS\CyberDefenders\OpenWire Lab</code> (contains <code className="text-zinc-300">c119-OpenWire.pcap</code>)
                  </p>
                </div>
                <a
                  href="/files/cyberdefenders/153-OpenWire.zip"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all duration-300 shadow-md hover:shadow-emerald-500/25 shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download 153-OpenWire.zip
                </a>
              </div>
            </div>

            {/* Official Lab Reference Box */}
            <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <div>
                  <span className="text-zinc-400">Official Lab Reference: </span>
                  <span className="text-white font-bold">CyberDefenders — OpenWire (Lab #153)</span>
                </div>
              </div>
              <a
                href="https://cyberdefenders.org/blueteam-ctf-challenges/openwire/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-mono transition-colors shrink-0"
              >
                <span>Open on CyberDefenders.org</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                    activeOpId === op.id
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
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
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-3 font-mono text-xs shadow-xl">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold px-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Operations Index</span>
                  <span className="text-[10px] text-emerald-400 font-bold">8 Questions</span>
                </div>
                {operations.map((op) => (
                  <div key={op.id} className="space-y-1">
                    <button
                      onClick={() => scrollToElement(op.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between text-xs ${
                        activeOpId === op.id
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      <span className="truncate">{op.num}. {op.title}</span>
                      <span className="text-[10px] text-zinc-500 ml-1 shrink-0">{op.tag}</span>
                    </button>
                    {activeOpId === op.id && (
                      <div className="pl-4 space-y-1 border-l border-zinc-800 ml-3">
                        {op.sections.map((s) => (
                          <div
                            key={s.id}
                            className="text-[11px] text-zinc-500 truncate py-0.5"
                          >
                            {s.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* Q1 */}
              <section id="q1" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q1 • C2 Communication
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q1: By identifying the C2 IP, we can block traffic to and from this IP, helping to contain the breach and prevent further data exfiltration or command execution. Can you provide the IP of the C2 server that communicated with our server?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    First thing you should think of is going to <strong>Statistics ➔ Conversations</strong> to get a summary of all IPs and see what actually happened.
                  </p>
                  <p>
                    When you look at the IPv4 conversations, you will notice only 1 IP has a huge amount of data transferred (~5 MB). That is our C2 server communicating with our server (high data transfer usually means an exploit payload, staging files, or exfiltration).
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021090314.png"
                      alt="Wireshark IPv4 Conversations showing C2 traffic"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <h3 className="text-base font-bold text-white pt-2">
                    Alternative Method:
                  </h3>
                  <p>
                    Right when you open the PCAP, you&apos;ll immediately notice the <strong>OpenWire</strong> protocol in the packet list. Looks sus at first glance!
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021091036.png"
                      alt="OpenWire protocol in Wireshark packet list"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    Right-click any of those packets ➔ <strong>Follow ➔ TCP Stream</strong>:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021091131.png"
                      alt="Follow TCP Stream showing attacker IP"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="font-semibold text-white">
                    Boom🔥  you found the target attacker IP: <code className="text-emerald-400 bg-black/60 px-1 py-0.5 rounded font-mono">146.190.21.91</code>
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">146.190.21.91</code>
                    </div>
                    <CopyButton text="146.190.21.91" />
                  </div>
                </div>
              </section>

              {/* Q2 */}
              <section id="q2" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q2 • Exploited Service Port
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q2: Initial entry points are critical to trace the attack vector back. What is the port number of the service the adversary exploited?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    That&apos;s easy Now that we know the attacker&apos;s IP from Q1, we just filter for it in Wireshark:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 flex items-center justify-between">
                    <code>ip.src == 146.190.21.91</code>
                    <CopyButton text="ip.src == 146.190.21.91" />
                  </div>

                  <p>
                    Look at the destination port on our server:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021091604.png"
                      alt="Wireshark display filter showing destination port 61616"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p className="font-semibold text-white">
                    Easy 🤙;-;🤙 The destination port being hit is <code className="text-emerald-400 bg-black/60 px-1 py-0.5 rounded font-mono">61616</code>.
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">61616</code>
                    </div>
                    <CopyButton text="61616" />
                  </div>
                </div>
              </section>

              {/* Q3 */}
              <section id="q3" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q3 • Vulnerable Service Name
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q3: Following up on the previous question, what is the name of the service found to be vulnerable?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    We need details about what service is running on that port. How do we find it? Look at the response packet mentioned in the first question:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021092005.png"
                      alt="Response packet in packet list"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                    <li>Click on the packet and expand <strong>OpenWire (WireFormatInfo)</strong> in the packet details pane.</li>
                    <li>Under the properties/entries, look at <code className="text-emerald-400 font-mono">ProviderName</code>:</li>
                  </ol>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021092115.png"
                      alt="ProviderName showing ActiveMQ"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    The answer is <strong>Apache ActiveMQ</strong>.
                  </p>

                  <p className="italic text-zinc-400">
                    (Or you can just search the attacker&apos;s IP on VirusTotal to see community reports referencing ActiveMQ!)
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021092524.png"
                      alt="VirusTotal community reports for attacker IP"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">Apache ActiveMQ</code>
                    </div>
                    <CopyButton text="Apache ActiveMQ" />
                  </div>
                </div>
              </section>

              {/* Q4 */}
              <section id="q4" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q4 • Second C2 Server
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q4: The attacker&apos;s infrastructure often involves multiple components. What is the IP of the second C2 server?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    Go back to <strong>Statistics ➔ Conversations ➔ IPv4</strong>. There aren&apos;t many IPs that talked to our server:
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-mono text-xs text-zinc-300">
                    <li>Our Server: <span className="text-white font-bold">134.209.197.3</span></li>
                    <li>First Attacker C2: <span className="text-red-400 font-bold">146.190.21.91</span></li>
                  </ul>
                  <p>
                    That leaves only two other external IPs. Based on the question format, it points to <code className="text-amber-400 font-mono">128.199.52.72</code>.
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021092836.png"
                      alt="IPv4 conversations list showing second external IP"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <h3 className="text-base font-bold text-white pt-2">
                    But we need to learn, so let&apos;s verify:
                  </h3>
                  <p>
                    Filter for the suspicious IP to see what traffic occurred between it and our server:
                  </p>

                  <div className="bg-[#050508] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 flex items-center justify-between">
                    <code>ip.addr == 128.199.52.72</code>
                    <CopyButton text="ip.addr == 128.199.52.72" />
                  </div>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021093325.png"
                      alt="Wireshark filter results for 128.199.52.72"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    Following the stream reveals HTTP traffic downloading a malicious payload (<code className="text-red-400 font-mono">docker</code> binary):
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021093606.png"
                      alt="HTTP stream revealing download of docker binary"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">128.199.52.72</code>
                    </div>
                    <CopyButton text="128.199.52.72" />
                  </div>
                </div>
              </section>

              {/* Q5 */}
              <section id="q5" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q5 • Dropped Reverse Shell
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q5: Attackers usually leave traces on the disk. What is the name of the reverse shell executable dropped on the server?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    lol we literally just found this in the previous question while following the HTTP stream from the second C2!
                  </p>
                  <p>
                    The downloaded file is disguised as <code className="text-red-400 bg-black/60 px-1 py-0.5 rounded font-mono font-bold">docker</code>
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">docker</code>
                    </div>
                    <CopyButton text="docker" />
                  </div>
                </div>
              </section>

              {/* Q6 */}
              <section id="q6" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q6 • Invoked Java Class
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q6: What Java class was invoked by the XML file to run the exploit?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <h3 className="text-base font-bold text-white">
                    💡 The Approach:
                  </h3>
                  <p>
                    Easy one! Inspect the HTTP response that requested <code className="text-zinc-200 bg-black/60 px-1 py-0.5 rounded font-mono">invoice.xml</code> / <code className="text-zinc-200 bg-black/60 px-1 py-0.5 rounded font-mono">poc.xml</code>:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021093954.png"
                      alt="HTTP response requesting XML exploit payload"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    Follow the HTTP stream to inspect the raw XML payload:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021094059.png"
                      alt="Raw XML payload showing ProcessBuilder class"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    Inside the XML bean definition, the class invoked to execute the command is <code className="text-emerald-400 bg-black/60 px-1 py-0.5 rounded font-mono font-bold">java.lang.ProcessBuilder</code>
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">java.lang.ProcessBuilder</code>
                    </div>
                    <CopyButton text="java.lang.ProcessBuilder" />
                  </div>
                </div>
              </section>

              {/* Q7 */}
              <section id="q7" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q7 • Vulnerability CVE Identifier
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q7: To better understand the specific security flaw exploited, can you identify the CVE identifier associated with this vulnerability?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    Check VirusTotal or Google the combination of <strong>Apache ActiveMQ + OpenWire RCE + 61616</strong>.
                  </p>
                  <p>
                    In VirusTotal: press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono">Ctrl + F</kbd> and search for <code className="text-amber-400 font-mono">CVE</code>:
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021100937.png"
                      alt="VirusTotal search for CVE pointing to CVE-2023-46604"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    It points directly to <code className="text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded font-mono font-bold">CVE-2023-46604</code>
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">CVE-2023-46604</code>
                    </div>
                    <CopyButton text="CVE-2023-46604" />
                  </div>
                </div>
              </section>

              {/* Q8 */}
              <section id="q8" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q8 • Vendor Patch Method
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q8: The vendor addressed the vulnerability by adding a validation step to ensure that only valid <code className="text-zinc-300">Throwable</code> classes can be instantiated, preventing exploitation. In which Java class and method was this validation step added?
                  </h2>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p className="italic">
                    You might ask: <em>How do you get source code from only a PCAP file????</em>
                  </p>
                  <p>
                    Let me tell you :0
                    <br />
                    You already have the two most important clues:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 font-mono text-xs text-zinc-300">
                    <li><strong>Software:</strong> Apache ActiveMQ</li>
                    <li><strong>Vulnerability:</strong> CVE-2023-46604</li>
                  </ol>
                  <p>
                    Where do all project files and commits get pushed? Yep, <strong>GitHub</strong>!
                  </p>
                  <p>
                    Searching the ActiveMQ GitHub repository commits for <code className="text-emerald-400 font-mono">CVE-2023-46604</code> (or googling the patch details if you&apos;re lazy like me 0-0):
                  </p>

                  <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                    <Image
                      src="/images/cyberdefenders/Pasted_image_20261021173243.png"
                      alt="ActiveMQ GitHub patch commit showing BaseDataStreamMarshaller.createThrowable"
                      width={1100}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  <p>
                    The patch added the validation step inside:
                    <br />
                    <code className="text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded font-mono font-bold">
                      BaseDataStreamMarshaller.createThrowable
                    </code>
                  </p>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">Answer</span>
                      <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold">BaseDataStreamMarshaller.createThrowable</code>
                    </div>
                    <CopyButton text="BaseDataStreamMarshaller.createThrowable" />
                  </div>
                </div>
              </section>

              {/* Wrap-Up */}
              <section className="p-6 rounded-2xl bg-[#0a0a0f] border border-zinc-800 text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  🏁 Wrap-Up
                </h3>
                <p className="text-zinc-400 text-sm">
                  Hope you liked the writeup! &lt;3
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Link
                    href="/labs/cyberdefenders"
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors"
                  >
                    ← Back to CyberDefenders Labs
                  </Link>
                  <Link
                    href="/labs"
                    className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-colors"
                  >
                    Threat Labs Hub →
                  </Link>
                </div>
              </section>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
