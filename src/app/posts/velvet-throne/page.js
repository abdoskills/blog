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
        <div className="space-y-12 text-lg text-zinc-300 leading-relaxed font-sans">
          
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

          {/* ========================================================================= */}
          {/* TASK 1 */}
          {/* ========================================================================= */}
          <section id="task-1" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase">Task 1</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                Initial Compromise via MFA Push Bombing
              </h2>
            </div>

            <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 font-mono text-sm">
              <p className="text-zinc-400 font-bold mb-1">Question:</p>
              <p className="text-zinc-200 mb-2">What is the username of the account compromised via MFA push bombing?</p>
              <p className="text-zinc-500 text-xs">Format: <code className="text-pink-400">****.********</code></p>
            </div>

            <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-lg">
              <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Imagine a spam delivery driver repeatedly buzzing your apartment intercom at 3:00 AM every 30 seconds. Even if you know you didn&apos;t order food, you might eventually press the buzzer just to stop the persistent noise. This is <strong>MFA Push Fatigue</strong>. The attacker possessed the password, then bombarded the employee&apos;s phone with Okta Verify notifications until they hit "Approve".
              </p>
            </div>

            <p>
              In Okta system logs (<code className="text-pink-400 bg-pink-400/10 px-1 rounded">okta_system_log.json</code>),{' '}
              <span className="relative group inline-block cursor-help z-50">
                <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                  MFA Push Bombing
                </code>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                  MITRE ATT&CK T1621: Spamming multi-factor push notifications until the victim mistakenly authorizes access.
                </span>
              </span>
              {' '}appears as rapid repeated <code className="text-zinc-300">user.authentication.auth_via_mfa</code> events with reason <code className="text-red-400">&quot;User rejected Okta Verify push notification&quot;</code> followed by a sudden <code className="text-emerald-400">&quot;SUCCESS&quot;</code>.
            </p>

            <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
              <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">okta_system_log.json • Raw Timeline Evidence</span>
              </div>
              <pre>
                <code className="text-zinc-300">
                  <span className="text-zinc-500">// 8 Consecutive Rejections followed by Approval:</span><br/>
                  2024-03-15T08:10:30Z | kyle.morrison@axiomfp.com | 45.33.32.156 | <span className="text-red-400">FAILURE (Rejected)</span><br/>
                  2024-03-15T08:12:05Z | kyle.morrison@axiomfp.com | 45.33.32.156 | <span className="text-red-400">FAILURE (Rejected)</span><br/>
                  ...<br/>
                  2024-03-15T08:21:00Z | kyle.morrison@axiomfp.com | 45.33.32.156 | <span className="text-red-400">FAILURE (Rejected)</span><br/>
                  2024-03-15T08:22:14Z | kyle.morrison@axiomfp.com | 45.33.32.156 | <span className="text-emerald-400 font-bold">SUCCESS (Accepted)</span>
                </code>
              </pre>
            </div>

            <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300">
              <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  [ SHOW METHODOLOGY: 4 Investigation Methods ]
                </span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="p-6 pt-0 border-t border-zinc-800/50 text-xs md:text-sm text-zinc-400 leading-relaxed bg-[#050505] space-y-4">
                <p className="mt-4"><strong>Method A (PowerShell):</strong></p>
                <pre className="bg-[#111111] p-3 rounded border border-zinc-800 text-zinc-300"><code>Get-Content .\evidence\okta_system_log.json -Raw | ConvertFrom-Json | Where-Object &#123; $_.outcome.reason -like "*rejected*" &#125; | Select-Object published, @&#123;N=&apos;User&apos;;E=&#123;$_.actor.login&#125;&#125;, @&#123;N=&apos;IP&apos;;E=&#123;$_.client.ipAddress&#125;&#125;</code></pre>
                <p><strong>Method B (Python):</strong></p>
                <pre className="bg-[#111111] p-3 rounded border border-zinc-800 text-zinc-300"><code>import json; [print(f"&#123;e['published']&#125; | &#123;e['actor']['login']&#125; | &#123;e['outcome']['result']&#125;") for e in json.load(open('evidence/okta_system_log.json')) if 'rejected' in str(e.get('outcome',&#123;&#125;).get('reason','')).lower()]</code></pre>
                <p><strong>Method C (Linux CLI / jq):</strong></p>
                <pre className="bg-[#111111] p-3 rounded border border-zinc-800 text-zinc-300"><code>jq -r &apos;.[] | select(.outcome.reason | test(&quot;rejected&quot;; &quot;i&quot;)) | &quot;\(.published) | \(.actor.login) | \(.outcome.result)&quot;&apos; evidence/okta_system_log.json</code></pre>
                <p><strong>Method D (VS Code / Notepad++):</strong> Search for string <code className="text-pink-400">rejected</code> to inspect <code className="text-emerald-300">actor.login</code>.</p>
              </div>
            </details>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 font-bold">Answer:</p>
              <p className="text-emerald-400 font-bold text-lg"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">kyle.morrison</code></p>
            </div>
          </section>

          <hr className="border-zinc-800 my-12" />

          {/* ========================================================================= */}
          {/* TASK 2 */}
          {/* ========================================================================= */}
          <section id="task-2" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase">Task 2</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                Attacker Source IP Address
              </h2>
            </div>

            <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 font-mono text-sm">
              <p className="text-zinc-400 font-bold mb-1">Question:</p>
              <p className="text-zinc-200 mb-2">What is the attacker&apos;s source IP address used for the initial MFA bombing and subsequent VPN login?</p>
              <p className="text-zinc-500 text-xs">Format: <code className="text-pink-400">**.**.**.***</code></p>
            </div>

            <p>
              Correlating Okta events with Azure AD sign-in logs (<code className="text-pink-400 bg-pink-400/10 px-1 rounded">azure_ad_signin_log.json</code>) reveals external adversary infrastructure accessing both the corporate VPN gateway and Microsoft Cloud Portal.
            </p>

            <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
              <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">azure_ad_signin_log.json • VPN Session Ingress</span>
              </div>
              <pre>
                <code className="text-zinc-300">
                  <span className="text-zinc-500">// Okta Session Start (08:23:01 UTC):</span><br/>
                  Target: Axiom VPN Portal | Client IP: <span className="text-emerald-400 font-bold">45.33.32.156</span><br/>
                  <br/>
                  <span className="text-zinc-500">// Azure AD Sign-in (08:23:15 UTC):</span><br/>
                  App: Microsoft Azure Portal | IP: <span className="text-emerald-400 font-bold">45.33.32.156</span> | Risk: <span className="text-red-400">anonymizedIPAddress</span>
                </code>
              </pre>
            </div>

            <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300">
              <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  [ SHOW METHODOLOGY: 4 Investigation Methods ]
                </span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="p-6 pt-0 border-t border-zinc-800/50 text-xs md:text-sm text-zinc-400 leading-relaxed bg-[#050505] space-y-4">
                <p className="mt-4"><strong>Method A (PowerShell):</strong></p>
                <pre className="bg-[#111111] p-3 rounded border border-zinc-800 text-zinc-300"><code>Get-Content .\evidence\okta_system_log.json -Raw | ConvertFrom-Json | Where-Object &#123; $_.actor.login -eq &apos;kyle.morrison@axiomfp.com&apos; -and $_.outcome.result -eq &apos;SUCCESS&apos; &#125; | Select-Object published, @&#123;N=&apos;IP&apos;;E=&#123;$_.client.ipAddress&#125;&#125;</code></pre>
                <p><strong>Method B (Python):</strong></p>
                <pre className="bg-[#111111] p-3 rounded border border-zinc-800 text-zinc-300"><code>import json; [print(e['ipAddress']) for e in json.load(open('evidence/azure_ad_signin_log.json')) if 'kyle.morrison' in json.dumps(e)]</code></pre>
                <p><strong>Method C (Linux CLI / jq):</strong></p>
                <pre className="bg-[#111111] p-3 rounded border border-zinc-800 text-zinc-300"><code>jq -r &apos;.[] | select(.actor.login == &quot;kyle.morrison@axiomfp.com&quot; and .outcome.result == &quot;SUCCESS&quot;) | .client.ipAddress&apos; evidence/okta_system_log.json</code></pre>
                <p><strong>Method D (VS Code / Notepad++):</strong> Filter `azure_ad_signin_log.json` for `kyle.morrison` and inspect `ipAddress`.</p>
              </div>
            </details>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 font-bold">Answer:</p>
              <p className="text-emerald-400 font-bold text-lg"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">45.33.32.156</code></p>
            </div>
          </section>

          <hr className="border-zinc-800 my-12" />

          {/* ========================================================================= */}
          {/* TASK 3, 4, 5, 6 */}
          {/* ========================================================================= */}
          <section id="tasks-implant" className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase">Tasks 3 – 6</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                Implant Execution, Cryptography & Persistence
              </h2>
            </div>

            <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-lg">
              <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Once inside the workstation, the hacker installed a fake program called <code>ProxyHealth.exe</code>. To make sure their spyware never gets turned off, they registered it as an automatic Windows System Service (<strong>T1543.003</strong>). To hide what it was sending home, it encrypted every packet using the lightweight <strong>RC4 stream cipher</strong>.
              </p>
            </div>

            {/* Task 3 & 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 3:</span> Dropped Implant Binary</p>
                <p className="text-zinc-300 text-xs mb-2">Q: Filename of the dropped backdoor implant?</p>
                <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">ProxyHealth.exe</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 4:</span> Symmetric C2 Encryption</p>
                <p className="text-zinc-300 text-xs mb-2">Q: Symmetric algorithm used for C2 communications?</p>
                <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">RC4</code></p>
              </div>
            </div>

            {/* Task 5 & 6 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 5:</span> Full C2 Domain Name</p>
                <p className="text-zinc-300 text-xs mb-2">Q: Full domain implant beacons to?</p>
                <p className="text-emerald-400 font-bold text-xs md:text-sm break-all"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">proxy-health-api.azurecloud-monitor.com</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 6:</span> Persistence Technique (MITRE)</p>
                <p className="text-zinc-300 text-xs mb-2">Q: MITRE technique for service persistence?</p>
                <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">T1543.003</code></p>
              </div>
            </div>

            <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
              <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">Sysmon Event ID 1 & 3 • Network C2 & Process Execution</span>
              </div>
              <pre>
                <code className="text-zinc-300">
                  <span className="text-zinc-500">// Sysmon Event ID 1 (Process Create):</span><br/>
                  Parent: msiexec.exe /i C:\Users\kyle.morrison\AppData\Local\Temp\ProxyHealthSetup.msi /quiet<br/>
                  Image: C:\Windows\System32\<span className="text-emerald-400 font-bold">ProxyHealth.exe</span><br/>
                  <br/>
                  <span className="text-zinc-500">// Sysmon Event ID 3 (Network Connect):</span><br/>
                  Process: ProxyHealth.exe<br/>
                  Destination: <span className="text-emerald-400 font-bold">proxy-health-api.azurecloud-monitor.com</span> (193.42.33.114:443)<br/>
                  <br/>
                  <span className="text-zinc-500">// Security Event ID 4697 (Service Install):</span><br/>
                  ServiceName: ProxyHealthSvc | StartType: 2 (Auto) | Technique: <span className="text-emerald-400 font-bold">T1543.003</span>
                </code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800 my-12" />

          {/* ========================================================================= */}
          {/* TASK 7, 8, 9, 10, 11 */}
          {/* ========================================================================= */}
          <section id="tasks-credentials" className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase">Tasks 7 – 11</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                LSASS Dumping, Key Seeding & Lateral Movement
              </h2>
            </div>

            <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-lg">
              <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Windows caches enterprise passwords in a memory vault called <strong>LSASS</strong>. Hackers abused a legitimate Microsoft tool called <strong>ProcDump</strong> to clone that vault without triggering antivirus alerts. Inside, they found the master SharePoint service account (<code>svc_sharepoint_farm</code>) and used it to pivot internally to IP <code>10.10.20.30</code>.
              </p>
            </div>

            {/* Task 7 & 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 7:</span> Abused Microsoft Tool</p>
                <p className="text-zinc-300 text-xs mb-2">Q: Legitimate tool abused for LSASS memory dump?</p>
                <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">procdump</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 8:</span> Harvested Service Account</p>
                <p className="text-zinc-300 text-xs mb-2">Q: Service account credentials harvested from LSASS?</p>
                <p className="text-emerald-400 font-bold text-base"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">svc_sharepoint_farm</code></p>
              </div>
            </div>

            {/* Task 9, 10, 11 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 9:</span> NetBIOS Hostname</p>
                <p className="text-emerald-400 font-bold text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">EXEC-WKSTN-01</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 10:</span> C: Volume Serial</p>
                <p className="text-emerald-400 font-bold text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">4B7A2C9E</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 11:</span> Internal Pivot Target</p>
                <p className="text-emerald-400 font-bold text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">10.10.20.30</code></p>
              </div>
            </div>

            <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
              <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">Sysmon Event ID 1 • Living off the Land LSASS Dump</span>
              </div>
              <pre>
                <code className="text-zinc-300">
                  <span className="text-pink-400">CommandLine:</span> C:\Windows\Temp\<span className="text-emerald-400 font-bold">procdump.exe</span> -ma lsass.exe C:\Windows\Temp\lsass.dmp<br/>
                  <span className="text-pink-400">ParentImage:</span> C:\Windows\System32\ProxyHealth.exe<br/>
                  <br/>
                  <span className="text-zinc-500">// WMIC Hardware Identifier Query for Key Seeding:</span><br/>
                  <span className="text-pink-400">Query:</span> wmic logicaldisk get volumeserialnumber,deviceid<br/>
                  <span className="text-emerald-300">C: 4B7A2C9E</span> | D: A81F30C2
                </code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800 my-12" />

          {/* ========================================================================= */}
          {/* TASK 12, 13, 14 */}
          {/* ========================================================================= */}
          <section id="tasks-exfiltration" className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase">Tasks 12 – 14</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                C2 Session Decryption & Data Staging
              </h2>
            </div>

            <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-lg">
              <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                By combining the computer name and hard drive serial number (<code>EXEC-WKSTN-01_4B7A2C9E</code>) and taking its SHA1 hash, we derived the attacker&apos;s RC4 key. Decrypting the intercepted session revealed their master command: compress 25GB of merger documents into <code>axiom_q1_portfolio.7z</code> and upload it to a spoofed Azure CDN bucket!
              </p>
            </div>

            {/* Task 12, 13, 14 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 12:</span> Decrypted Command</p>
                <p className="text-emerald-400 font-bold text-xs md:text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">COMPRESS_AND_STAGE</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 13:</span> Staged Archive</p>
                <p className="text-emerald-400 font-bold text-xs md:text-sm"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">axiom_q1_portfolio.7z</code></p>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                <p className="text-zinc-400 text-xs mb-1 font-bold"><span className="text-zinc-600">Task 14:</span> Exfil Endpoint</p>
                <p className="text-emerald-400 font-bold text-xs break-all"><code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">blob-sync-backup.s3-azure-cdn.com</code></p>
              </div>
            </div>

            <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
              <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-zinc-600">Python • Decryption of c2_session_capture.bin</span>
              </div>
              <pre>
                <code className="text-zinc-300">
                  <span className="text-pink-400">import</span> hashlib<br/>
                  <br/>
                  <span className="text-zinc-500">// 1. Compute derived SHA1 key:</span><br/>
                  key = hashlib.sha1(<span className="text-green-300">b&quot;EXEC-WKSTN-01_4B7A2C9E&quot;</span>).digest()<br/>
                  <br/>
                  <span className="text-zinc-500">// 2. Strip 8-byte magic header (&apos;C2SESS\x01\x00&apos;) and decrypt RC4 payload:</span><br/>
                  raw = open(<span className="text-green-300">&apos;c2_session_capture.bin&apos;</span>, <span className="text-green-300">&apos;rb&apos;</span>).read()[<span className="text-orange-300">8</span>:]<br/>
                  payload = rc4_decrypt(key, raw)<br/>
                  <br/>
                  <span className="text-zinc-500">// Resulting Decrypted JSON:</span><br/>
                  &#123;<br/>
                  &nbsp;&nbsp;<span className="text-orange-300">&quot;session&quot;</span>: <span className="text-green-300">&quot;2a4f1b9c&quot;</span>,<br/>
                  &nbsp;&nbsp;<span className="text-orange-300">&quot;cmd&quot;</span>: <span className="text-emerald-400 font-bold">&quot;COMPRESS_AND_STAGE&quot;</span>,<br/>
                  &nbsp;&nbsp;<span className="text-orange-300">&quot;target&quot;</span>: <span className="text-emerald-400 font-bold">&quot;axiom_q1_portfolio.7z&quot;</span>,<br/>
                  &nbsp;&nbsp;<span className="text-orange-300">&quot;bytes&quot;</span>: <span className="text-pink-400">24999591936</span><br/>
                  &#125;
                </code>
              </pre>
            </div>
          </section>

          <hr className="border-zinc-800 my-12" />

          {/* ========================================================================= */}
          {/* TASK 15 */}
          {/* ========================================================================= */}
          <section id="task-15" className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase">Task 15</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)]">
                Covert DNS Tunneling & Message Decoding
              </h2>
            </div>

            <div className="bg-[#111111] border border-zinc-800 rounded-xl p-5 font-mono text-sm">
              <p className="text-zinc-400 font-bold mb-1">Question:</p>
              <p className="text-zinc-200 mb-2">Decode the covert message hidden in DNS subdomain queries found in the DNS resolver log. What is the full decoded string?</p>
              <p className="text-zinc-500 text-xs">Format: <code className="text-pink-400">*******_*****_*****</code></p>
            </div>

            <div className="bg-[#111111] border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-lg">
              <h4 className="text-emerald-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When a computer asks where a website lives, it performs a DNS lookup. The attacker hid secret letters inside these lookups (e.g. <code>4268119e.t.proxy-health-api.com</code>). By taking the first two letters of each lookup and XOR-decrypting them with key <code>0x17</code>, we uncover the threat actor&apos;s victory signature: <strong>UNC3944_AXIOM_PWNED</strong>.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-5 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse"></div>
              <p className="text-zinc-400 mb-1 font-bold">Answer:</p>
              <p className="text-emerald-400 font-bold text-xl"><code className="bg-black/50 px-2 py-0.5 rounded text-emerald-300">UNC3944_AXIOM_PWNED</code></p>
            </div>

            {/* Decryption Table */}
            <h3 className="text-xl font-bold text-white font-mono mt-8 mb-4">
              📊 Byte-by-Byte XOR Decryption Matrix (Key = 0x17)
            </h3>

            <div className="overflow-x-auto my-6 border border-zinc-800 rounded-xl bg-[#0a0a0a]">
              <table className="w-full text-left font-mono text-xs md:text-sm">
                <thead className="bg-[#111111] text-emerald-400 border-b border-zinc-800">
                  <tr>
                    <th className="p-3">Subdomain Prefix</th>
                    <th className="p-3">Hex Byte</th>
                    <th className="p-3">Dec</th>
                    <th className="p-3">XOR 0x17</th>
                    <th className="p-3 text-right">Decoded Character</th>
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
          </section>

          <hr className="border-zinc-800 my-12" />

          {/* MASTER SOLUTION TABLE */}
          <section id="solution-summary">
            <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-6">
              Complete Solution Reference Matrix
            </h2>

            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#0a0a0a] shadow-xl">
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
          </section>

        </div>
      </article>
    </div>
  );
}
