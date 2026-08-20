import Image from "next/image";
import Link from "next/link";

export default function VelvetThroneWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/hackthebox" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to HackTheBox Hub
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-emerald-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.3em]">
              HTB SHERLOCK • HARD • DFIR / INCIDENT RESPONSE
              <span className="animate-blink inline-block w-1.5 h-3 bg-emerald-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            VelvetThrone: Enterprise Breach & Covert DNS Forensics
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 21, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/velvet_throne.jpg" 
                alt="VelvetThrone Sherlock Analysis"
                fill
                className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          {/* Executive Summary */}
          <div className="bg-[#0e1713]/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400 shadow-[0_0_15px_#34d399]"></div>
            <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-bold mb-2">
              🚨 Incident Overview: Axiom Financial Partners ($4.2B AUM)
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Axiom Financial Partners experienced a sophisticated enterprise intrusion attributed to threat group <strong>UNC3944 (Scattered Spider)</strong>. The threat actor executed an end-to-end campaign spanning MFA Push Fatigue, Living-off-the-Land memory dumping, custom Go implant execution with machine-seeded RC4 encryption, lateral movement to internal SharePoint assets, and covert DNS data exfiltration.
            </p>
          </div>

          <hr className="border-zinc-800 my-12" />

          {/* PHASE 1: INITIAL ACCESS */}
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Phase 1: Initial Access & MFA Fatigue
          </h2>

          <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine a delivery driver repeatedly ringing your doorbell at 3:00 AM every 30 seconds. Even if you know you didn&apos;t order a package, you might eventually open the door just to make the noise stop. This is <strong>MFA Push Bombing</strong>. The attacker already stole the victim&apos;s password, then spammed their phone with authentication prompts until the tired employee accidentally hit "Approve".
            </p>
          </div>

          {/* Task 1 Card */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Task 1:</span> Compromised Account Username</p>
            <p className="text-emerald-400 font-bold text-base"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">kyle.morrison</code></p>
          </div>

          <p>
            Reviewing Okta system logs (<code className="text-pink-400 bg-pink-400/10 px-1 rounded">okta_system_log.json</code>) revealed 8 consecutive rejections between <code className="text-zinc-300">08:10:30</code> and <code className="text-zinc-300">08:21:00 UTC</code> for user <code className="text-emerald-400">kyle.morrison@axiomfp.com</code> from IP <code className="text-pink-400">45.33.32.156</code>, followed by an approved session at <code className="text-zinc-300">08:22:14 UTC</code>.
          </p>

          {/* Task 2 Card */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Task 2:</span> Attacker Source IP Address</p>
            <p className="text-emerald-400 font-bold text-base"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">45.33.32.156</code></p>
          </div>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">PowerShell • Okta & Azure AD Log Correlation</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-pink-400">PS&gt;</span> Get-Content .\evidence\okta_system_log.json -Raw | ConvertFrom-Json |<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;Where-Object &#123; $_.outcome.reason -like "*rejected*" &#125; |<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;Select-Object published, @&#123;N=<span className="text-green-300">&apos;User&apos;</span>;E=&#123;$_.actor.login&#125;&#125;, @&#123;N=<span className="text-green-300">&apos;IP&apos;</span>;E=&#123;$_.client.ipAddress&#125;&#125;, @&#123;N=<span className="text-green-300">&apos;Result&apos;</span>;E=&#123;$_.outcome.result&#125;&#125;<br/>
                <br/>
                <span className="text-zinc-500"># Output:</span><br/>
                2024-03-15T08:10:30Z | kyle.morrison@axiomfp.com | <span className="text-pink-400">45.33.32.156</span> | FAILURE (Rejected)<br/>
                2024-03-15T08:22:14Z | kyle.morrison@axiomfp.com | <span className="text-pink-400">45.33.32.156</span> | <span className="text-emerald-400">SUCCESS</span>
              </code>
            </pre>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: 4 Ways to Triage Okta / Azure Logs ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505] space-y-4">
              <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-emerald-400">
                <li><strong>Method A (PowerShell):</strong> Parse with <code className="text-pink-400">ConvertFrom-Json</code> and filter on <code className="text-zinc-300">outcome.reason -like &quot;*rejected*&quot;</code>.</li>
                <li><strong>Method B (Python):</strong> Load with <code className="text-pink-400">json.load()</code> and inspect <code className="text-zinc-300">e[&apos;client&apos;][&apos;ipAddress&apos;]</code>.</li>
                <li><strong>Method C (Linux jq):</strong> <code className="text-pink-400">jq -r &apos;.[] | select(.outcome.reason | test(&quot;rejected&quot;; &quot;i&quot;))&apos;</code>.</li>
                <li><strong>Method D (VS Code / Notepad++):</strong> Search for string <code className="text-pink-400">rejected</code> to spot the prompt flood.</li>
              </ul>
            </div>
          </details>

          <hr className="border-zinc-800 my-12" />

          {/* PHASE 2: WORKSTATION COMPROMISE & IMPLANT */}
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Phase 2: Workstation Compromise & Implant Analysis
          </h2>

          <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Once inside via VPN, the attacker installed a fake program named <code>ProxyHealth.exe</code> disguised as a routine network diagnostic service. To make sure the malware restarts automatically every time the computer reboots, they registered it as an official Windows Service (<strong>Persistence</strong>).
            </p>
          </div>

          {/* Task 3 & 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 3:</span> Dropped Implant Filename</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">ProxyHealth.exe</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 4:</span> Symmetric C2 Encryption</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">RC4</code></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 5:</span> Full C2 Domain Name</p>
              <p className="text-emerald-400 font-bold text-xs md:text-sm break-all"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">proxy-health-api.azurecloud-monitor.com</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 6:</span> Persistence Technique (MITRE)</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">T1543.003</code></p>
            </div>
          </div>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">Sysmon Event ID 1 & Windows Event ID 4697</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-zinc-500">// Process Execution & Service Installation Evidence:</span><br/>
                <span className="text-pink-400">ParentImage:</span> msiexec.exe /i C:\Users\kyle.morrison\AppData\Local\Temp\ProxyHealthSetup.msi /quiet<br/>
                <span className="text-pink-400">Image:</span> C:\Windows\System32\<span className="text-emerald-400 font-bold">ProxyHealth.exe</span><br/>
                <span className="text-pink-400">ServiceName:</span> ProxyHealthSvc (AutoStart = 2, Account = LocalSystem)<br/>
                <br/>
                <span className="text-zinc-500">// Extracted Strings from Go Binary (proxyhealth_strings.json):</span><br/>
                <span className="text-emerald-300">golang.org/x/crypto/rc4</span><br/>
                <span className="text-emerald-300">arcfour stream cipher</span>
              </code>
            </pre>
          </div>

          <hr className="border-zinc-800 my-12" />

          {/* PHASE 3: LSASS DUMPING & LATERAL MOVEMENT */}
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Phase 3: LSASS Dumping & Internal Lateral Movement
          </h2>

          <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Windows keeps decrypted corporate passwords in a secure vault process called <strong>LSASS</strong>. Hackers use a legitimate Microsoft administrative tool called <strong>ProcDump</strong> to take a snapshot of that memory vault to steal service account passwords, letting them log into internal SharePoint databases.
            </p>
          </div>

          {/* Task 7, 8, 9, 10, 11 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 7:</span> Abused Microsoft Tool</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">procdump</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 8:</span> Harvested Service Account</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">svc_sharepoint_farm</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 9:</span> NetBIOS Hostname</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">EXEC-WKSTN-01</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 10:</span> C: Volume Serial Number</p>
              <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">4B7A2C9E</code></p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Task 11:</span> Internal Pivot Target IP Address</p>
            <p className="text-emerald-400 font-bold text-base"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">10.10.20.30</code></p>
          </div>

          <hr className="border-zinc-800 my-12" />

          {/* PHASE 4: C2 DECRYPTION */}
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Phase 4: Reverse Engineering & C2 Decryption
          </h2>

          <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The attacker encrypted their command traffic so defenders couldn&apos;t read it. But the malware created its encryption key using pieces of the victim computer itself: <code>Hostname + Hard Drive Serial Number</code>. By hashing those two values together, we unlocked the encrypted traffic file and read the attacker&apos;s secret commands!
            </p>
          </div>

          {/* Task 12, 13, 14 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 12:</span> Decrypted Command</p>
              <p className="text-emerald-400 font-bold text-xs md:text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">COMPRESS_AND_STAGE</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 13:</span> Staged Archive</p>
              <p className="text-emerald-400 font-bold text-xs md:text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">axiom_q1_portfolio.7z</code></p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 text-xs"><span className="text-zinc-600">Task 14:</span> Exfiltration Endpoint</p>
              <p className="text-emerald-400 font-bold text-xs break-all"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">blob-sync-backup.s3-azure-cdn.com</code></p>
            </div>
          </div>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">Python • RC4 Key Derivation & Decryption Script</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-pink-400">import</span> hashlib, json<br/>
                <br/>
                <span className="text-zinc-500"># 1. Derive Key: SHA1(&quot;EXEC-WKSTN-01_4B7A2C9E&quot;)</span><br/>
                key = hashlib.sha1(<span className="text-green-300">b&quot;EXEC-WKSTN-01_4B7A2C9E&quot;</span>).digest()<br/>
                <br/>
                <span className="text-zinc-500"># 2. Strip 8-byte C2 header and decrypt ciphertext via RC4</span><br/>
                ciphertext = open(<span className="text-green-300">&apos;c2_session_capture.bin&apos;</span>, <span className="text-green-300">&apos;rb&apos;</span>).read()[<span className="text-orange-300">8</span>:]<br/>
                decrypted_json = rc4_decrypt(key, ciphertext)<br/>
                <br/>
                <span className="text-zinc-500"># Decrypted Payload:</span><br/>
                &#123;<br/>
                &nbsp;&nbsp;<span className="text-orange-300">&quot;session&quot;</span>: <span className="text-green-300">&quot;2a4f1b9c&quot;</span>,<br/>
                &nbsp;&nbsp;<span className="text-orange-300">&quot;cmd&quot;</span>: <span className="text-emerald-400 font-bold">&quot;COMPRESS_AND_STAGE&quot;</span>,<br/>
                &nbsp;&nbsp;<span className="text-orange-300">&quot;target&quot;</span>: <span className="text-emerald-400 font-bold">&quot;axiom_q1_portfolio.7z&quot;</span>,<br/>
                &nbsp;&nbsp;<span className="text-orange-300">&quot;bytes&quot;</span>: <span className="text-pink-400">24999591936</span><br/>
                &#125;
              </code>
            </pre>
          </div>

          <hr className="border-zinc-800 my-12" />

          {/* PHASE 5: COVERT DNS TUNNELING */}
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Phase 5: Covert DNS Channel Decoding (Task 15)
          </h2>

          <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When a computer looks up a website like <code>google.com</code>, it asks a DNS server. The attacker used this routine system to send secret messages! By hiding one encrypted letter inside each subdomain lookup (e.g. <code>4268119e.t.proxy-health-api.com</code>) and encrypting it with a simple XOR key (<code>0x17</code>), they whispered the threat actor&apos;s victory message out of the network.
            </p>
          </div>

          {/* Task 15 Card */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Task 15:</span> Decoded Covert DNS Message</p>
            <p className="text-emerald-400 font-bold text-xl"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">UNC3944_AXIOM_PWNED</code></p>
          </div>

          {/* Byte by Byte Table */}
          <h3 className="text-xl font-bold text-white font-mono mt-8 mb-4">
            📊 Byte-by-Byte XOR Decryption Matrix (Key = 0x17)
          </h3>

          <div className="overflow-x-auto my-6 border border-zinc-800 rounded-xl bg-[#0a0a0a]">
            <table className="w-full text-left font-mono text-xs md:text-sm">
              <thead className="bg-[#111111] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Prefix</th>
                  <th className="p-3">Hex Byte</th>
                  <th className="p-3">Dec</th>
                  <th className="p-3">XOR 0x17</th>
                  <th className="p-3 text-right">Char</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr><td className="p-3 text-pink-400">4268119e</td><td className="p-3">0x42</td><td className="p-3">66</td><td className="p-3">66 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">U</td></tr>
                <tr><td className="p-3 text-pink-400">5917263d</td><td className="p-3">0x59</td><td className="p-3">89</td><td className="p-3">89 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">N</td></tr>
                <tr><td className="p-3 text-pink-400">5456bdc5</td><td className="p-3">0x54</td><td className="p-3">84</td><td className="p-3">84 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">C</td></tr>
                <tr><td className="p-3 text-pink-400">2495462d</td><td className="p-3">0x24</td><td className="p-3">36</td><td className="p-3">36 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">3</td></tr>
                <tr><td className="p-3 text-pink-400">2e5d0064</td><td className="p-3">0x2E</td><td className="p-3">46</td><td className="p-3">46 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">9</td></tr>
                <tr><td className="p-3 text-pink-400">23db76b7</td><td className="p-3">0x23</td><td className="p-3">35</td><td className="p-3">35 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">4</td></tr>
                <tr><td className="p-3 text-pink-400">233802d9</td><td className="p-3">0x23</td><td className="p-3">35</td><td className="p-3">35 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">4</td></tr>
                <tr><td className="p-3 text-pink-400">4814c4f6</td><td className="p-3">0x48</td><td className="p-3">72</td><td className="p-3">72 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">_</td></tr>
                <tr><td className="p-3 text-pink-400">569380c6</td><td className="p-3">0x56</td><td className="p-3">86</td><td className="p-3">86 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">A</td></tr>
                <tr><td className="p-3 text-pink-400">4faba79d</td><td className="p-3">0x4F</td><td className="p-3">79</td><td className="p-3">79 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">X</td></tr>
                <tr><td className="p-3 text-pink-400">5e9fc4b3</td><td className="p-3">0x5E</td><td className="p-3">94</td><td className="p-3">94 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">I</td></tr>
                <tr><td className="p-3 text-pink-400">58b4498d</td><td className="p-3">0x58</td><td className="p-3">88</td><td className="p-3">88 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">O</td></tr>
                <tr><td className="p-3 text-pink-400">5a73cceb</td><td className="p-3">0x5A</td><td className="p-3">90</td><td className="p-3">90 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">M</td></tr>
                <tr><td className="p-3 text-pink-400">48678d19</td><td className="p-3">0x48</td><td className="p-3">72</td><td className="p-3">72 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">_</td></tr>
                <tr><td className="p-3 text-pink-400">4796a5d8</td><td className="p-3">0x47</td><td className="p-3">71</td><td className="p-3">71 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">P</td></tr>
                <tr><td className="p-3 text-pink-400">40632f5e</td><td className="p-3">0x40</td><td className="p-3">64</td><td className="p-3">64 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">W</td></tr>
                <tr><td className="p-3 text-pink-400">59aeef31</td><td className="p-3">0x59</td><td className="p-3">89</td><td className="p-3">89 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">N</td></tr>
                <tr><td className="p-3 text-pink-400">526bb775</td><td className="p-3">0x52</td><td className="p-3">82</td><td className="p-3">82 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">E</td></tr>
                <tr><td className="p-3 text-pink-400">538aa366</td><td className="p-3">0x53</td><td className="p-3">83</td><td className="p-3">83 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold">D</td></tr>
              </tbody>
            </table>
          </div>

          <hr className="border-zinc-800 my-12" />

          {/* MASTER SOLUTION TABLE */}
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Complete Forensic Solution Summary Table
          </h2>

          <div className="overflow-x-auto my-6 border border-zinc-800 rounded-xl bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left font-mono text-xs md:text-sm">
              <thead className="bg-[#111111] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Investigation Objective</th>
                  <th className="p-3">Extracted Flag / Value</th>
                  <th className="p-3">Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr><td className="p-3 font-bold text-emerald-400">1</td><td className="p-3">Compromised user account</td><td className="p-3 text-emerald-300 font-bold">kyle.morrison</td><td className="p-3 text-zinc-500">****.********</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">2</td><td className="p-3">Attacker source IP address</td><td className="p-3 text-emerald-300 font-bold">45.33.32.156</td><td className="p-3 text-zinc-500">**.**.**.***</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">3</td><td className="p-3">Dropped backdoor implant binary</td><td className="p-3 text-emerald-300 font-bold">ProxyHealth.exe</td><td className="p-3 text-zinc-500">***********.***</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">4</td><td className="p-3">Symmetric C2 encryption algorithm</td><td className="p-3 text-emerald-300 font-bold">RC4</td><td className="p-3 text-zinc-500">***</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">5</td><td className="p-3">Full C2 beacon domain</td><td className="p-3 text-emerald-300 font-bold">proxy-health-api.azurecloud-monitor.com</td><td className="p-3 text-zinc-500">Domain</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">6</td><td className="p-3">Persistence technique ID</td><td className="p-3 text-emerald-300 font-bold">T1543.003</td><td className="p-3 text-zinc-500">*********</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">7</td><td className="p-3">Microsoft tool abused for LSASS dump</td><td className="p-3 text-emerald-300 font-bold">procdump</td><td className="p-3 text-zinc-500">********</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">8</td><td className="p-3">Harvested service account</td><td className="p-3 text-emerald-300 font-bold">svc_sharepoint_farm</td><td className="p-3 text-zinc-500">***_**********_****</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">9</td><td className="p-3">NetBIOS hostname of target workstation</td><td className="p-3 text-emerald-300 font-bold">EXEC-WKSTN-01</td><td className="p-3 text-zinc-500">*************</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">10</td><td className="p-3">C: drive volume serial number</td><td className="p-3 text-emerald-300 font-bold">4B7A2C9E</td><td className="p-3 text-zinc-500">********</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">11</td><td className="p-3">Internal pivot destination IP</td><td className="p-3 text-emerald-300 font-bold">10.10.20.30</td><td className="p-3 text-zinc-500">IPv4</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">12</td><td className="p-3">Decrypted C2 payload command</td><td className="p-3 text-emerald-300 font-bold">COMPRESS_AND_STAGE</td><td className="p-3 text-zinc-500">********_***_*****</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">13</td><td className="p-3">Staged archive filename</td><td className="p-3 text-emerald-300 font-bold">axiom_q1_portfolio.7z</td><td className="p-3 text-zinc-500">*****_**_*********.**</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">14</td><td className="p-3">Exfiltration cloud endpoint domain</td><td className="p-3 text-emerald-300 font-bold">blob-sync-backup.s3-azure-cdn.com</td><td className="p-3 text-zinc-500">Domain</td></tr>
                <tr><td className="p-3 font-bold text-emerald-400">15</td><td className="p-3">Decoded covert DNS message</td><td className="p-3 text-emerald-300 font-bold">UNC3944_AXIOM_PWNED</td><td className="p-3 text-zinc-500">*******_*****_*****</td></tr>
              </tbody>
            </table>
          </div>

        </div>
      </article>
    </div>
  );
}
