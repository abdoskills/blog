import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

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

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
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

        {/* Executive Summary */}
        <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-sans mb-12">
          <div className="bg-[#0e1713]/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400 shadow-[0_0_15px_#34d399]"></div>
            <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-bold mb-2">
              🚨 Incident Overview: Axiom Financial Partners ($4.2B AUM)
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Axiom Financial Partners experienced a severe security incident resulting in credential theft, internal lateral movement, encrypted C2 beaconing, DNS covert channel communications, and exfiltration of ~25GB of sensitive merger and acquisition data.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> 15 Total Tasks</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> 4 Methods per Task (PowerShell, Python, Linux jq, GUI)</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">●</span> 1-Click Clipboard Copying</span>
            </div>
          </div>
        </div>

        {/* 15 Collapsible Task Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
              Investigation Tasks (1 – 15)
            </h2>
            <span className="text-xs font-mono text-zinc-500">Interactive Accordion Cards</span>
          </div>


          {/* ========================================================================= */}
          {/* TASK 1: Initial Compromise via MFA Push Bombing */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 1
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Initial Compromise via MFA Push Bombing
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  kyle.morrison
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the username of the account compromised via MFA push bombing?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">****.********</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Imagine a spam delivery driver repeatedly buzzing your apartment intercom at 3:00 AM every 30 seconds. Even if you know you didn't order food, you might eventually press the buzzer just to stop the persistent noise. This is MFA Push Fatigue. The attacker possessed the password, then bombarded the employee's phone with Okta Verify notifications until they hit 'Approve'.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>MFA Push Bombing (MFA Fatigue, MITRE ATT&CK T1621 - Multi-Factor Authentication Request Generation) occurs when an adversary who already possesses valid primary credentials repeatedly triggers push notifications to a user's mobile authenticator app. In Okta System Logs (okta_system_log.json), challenge events appear as user.mfa.challenge, denials appear as user.authentication.auth_via_mfa with outcome FAILURE and reason 'User rejected Okta Verify push notification', followed by outcome SUCCESS.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">okta_system_log.json • 8 Consecutive Push Rejections</span>
                  </div>
                  <CopyButton text={"2024-03-15T08:10:30Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)\n2024-03-15T08:12:00Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)\n2024-03-15T08:13:30Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)\n...\n2024-03-15T08:21:00Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)\n2024-03-15T08:22:14Z | kyle.morrison@axiomfp.com | 45.33.32.156 | SUCCESS (Accepted)"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>2024-03-15T08:10:30Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)<br/>2024-03-15T08:12:00Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)<br/>2024-03-15T08:13:30Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)<br/>...<br/>2024-03-15T08:21:00Z | kyle.morrison@axiomfp.com | 45.33.32.156 | FAILURE (Rejected)<br/>2024-03-15T08:22:14Z | kyle.morrison@axiomfp.com | 45.33.32.156 | SUCCESS (Accepted)</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\okta_system_log.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.outcome.reason -like \"*rejected*\" } |\n    Select-Object published, @{N='User';E={$_.actor.login}}, @{N='IP';E={$_.client.ipAddress}}, @{N='Result';E={$_.outcome.result}} | Format-Table -AutoSize"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\okta_system_log.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.outcome.reason -like "*rejected*" &#125; |<br/>    Select-Object published, @&#123;N='User';E=&#123;$_.actor.login&#125;&#125;, @&#123;N='IP';E=&#123;$_.client.ipAddress&#125;&#125;, @&#123;N='Result';E=&#123;$_.outcome.result&#125;&#125; | Format-Table -AutoSize</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/okta_system_log.json', 'r') as f: events = json.load(f)\nfor e in events:\n    if 'rejected' in str(e.get('outcome',{}).get('reason','')).lower():\n        print(f\"{e['published']} | {e['actor']['login']} | {e['client']['ipAddress']} | {e['outcome']['result']}\")"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/okta_system_log.json', 'r') as f: events = json.load(f)<br/>for e in events:<br/>    if 'rejected' in str(e.get('outcome',&#123;&#125;).get('reason','')).lower():<br/>        print(f"&#123;e['published']&#125; | &#123;e['actor']['login']&#125; | &#123;e['client']['ipAddress']&#125; | &#123;e['outcome']['result']&#125;")</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.outcome.reason | test(\"rejected\"; \"i\")) | \"\\(.published) | \\(.actor.login) | \\(.client.ipAddress) | \\(.outcome.result)\"' evidence/okta_system_log.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.outcome.reason | test("rejected"; "i")) | "\(.published) | \(.actor.login) | \(.client.ipAddress) | \(.outcome.result)"' evidence/okta_system_log.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/okta_system_log.json in VS Code / Notepad++.\n2. Press Ctrl + F and search for: rejected\n3. Locate actor.login on the matching lines to identify kyle.morrison@axiomfp.com."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/okta_system_log.json in VS Code / Notepad++.<br/>2. Press Ctrl + F and search for: rejected<br/>3. Locate actor.login on the matching lines to identify kyle.morrison@axiomfp.com.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Full login email: kyle.morrison@axiomfp.com -> Username component: kyle.morrison (matches ****.******** format).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  kyle.morrison
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 2: Attacker Source IP Address */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 2
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Attacker Source IP Address
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  45.33.32.156
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the attacker's source IP address used for the initial MFA bombing and subsequent VPN login?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">**.**.**.***</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Once the security door clicked open, the burglar entered through the main office VPN corridor. Security cameras at both Okta and Azure AD recorded the exact external IP address where the requests originated.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries leverage corporate VPN portals and cloud gateways to pivot inside after compromising credentials (MITRE ATT&CK T1133 - External Remote Services). Correlating Okta and Azure AD sign-in logs isolates external infrastructure and threat detection tags.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">azure_ad_signin_log.json • Anonymized Proxy Detection</span>
                  </div>
                  <CopyButton text={"{\n  \"createdDateTime\": \"2024-03-15T08:23:15.221Z\",\n  \"userPrincipalName\": \"kyle.morrison@axiomfp.com\",\n  \"appDisplayName\": \"Microsoft Azure Portal\",\n  \"ipAddress\": \"45.33.32.156\",\n  \"riskLevelDuringSignIn\": \"high\",\n  \"riskEventTypes\": [\"unfamiliarFeatures\", \"anonymizedIPAddress\"],\n  \"additionalDetails\": \"Sign-in from IP address associated with anonymizing proxy.\"\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "createdDateTime": "2024-03-15T08:23:15.221Z",<br/>  "userPrincipalName": "kyle.morrison@axiomfp.com",<br/>  "appDisplayName": "Microsoft Azure Portal",<br/>  "ipAddress": "45.33.32.156",<br/>  "riskLevelDuringSignIn": "high",<br/>  "riskEventTypes": ["unfamiliarFeatures", "anonymizedIPAddress"],<br/>  "additionalDetails": "Sign-in from IP address associated with anonymizing proxy."<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\okta_system_log.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.actor.login -eq 'kyle.morrison@axiomfp.com' -and $_.outcome.result -eq 'SUCCESS' } |\n    Select-Object published, @{N='Event';E={$_.eventType}}, @{N='IP';E={$_.client.ipAddress}}, @{N='TargetApp';E={$_.target.displayName -join ', '}}"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\okta_system_log.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.actor.login -eq 'kyle.morrison@axiomfp.com' -and $_.outcome.result -eq 'SUCCESS' &#125; |<br/>    Select-Object published, @&#123;N='Event';E=&#123;$_.eventType&#125;&#125;, @&#123;N='IP';E=&#123;$_.client.ipAddress&#125;&#125;, @&#123;N='TargetApp';E=&#123;$_.target.displayName -join ', '&#125;&#125;</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/azure_ad_signin_log.json') as f: azure = json.load(f)\nfor e in azure:\n    if 'kyle.morrison' in json.dumps(e):\n        print(f\"{e['createdDateTime']} | IP: {e['ipAddress']} | App: {e['appDisplayName']} | Risk: {e['riskEventTypes']}\")"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/azure_ad_signin_log.json') as f: azure = json.load(f)<br/>for e in azure:<br/>    if 'kyle.morrison' in json.dumps(e):<br/>        print(f"&#123;e['createdDateTime']&#125; | IP: &#123;e['ipAddress']&#125; | App: &#123;e['appDisplayName']&#125; | Risk: &#123;e['riskEventTypes']&#125;")</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.actor.login == \"kyle.morrison@axiomfp.com\" and .outcome.result == \"SUCCESS\") | \"\\(.published) | \\(.client.ipAddress) | \\(.target[].displayName)\"' evidence/okta_system_log.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.actor.login == "kyle.morrison@axiomfp.com" and .outcome.result == "SUCCESS") | "\(.published) | \(.client.ipAddress) | \(.target[].displayName)"' evidence/okta_system_log.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/azure_ad_signin_log.json in VS Code.\n2. Search for: kyle.morrison\n3. Locate ipAddress field (45.33.32.156) with risk detection 'anonymizedIPAddress'."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/azure_ad_signin_log.json in VS Code.<br/>2. Search for: kyle.morrison<br/>3. Locate ipAddress field (45.33.32.156) with risk detection 'anonymizedIPAddress'.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">The source IP across all MFA bombing events, VPN portal access, and Azure Portal sign-in is: 45.33.32.156 (matches **.**.**.***).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  45.33.32.156
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 3: Dropped Implant / Backdoor Filename */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 3
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Dropped Implant / Backdoor Filename
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  ProxyHealth.exe
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the filename of the backdoor/implant dropped on the compromised workstation?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">***********.***</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  To maintain a permanent foothold without getting kicked out, the attacker dropped a fake diagnostic program called ProxyHealth.exe disguised as legitimate network monitoring software.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries deploy custom binaries (MITRE ATT&CK T1204.002 - User Execution: Malicious File) disguised as administrative utilities to establish interactive command execution. Sysmon Event ID 1 captures process invocations, file paths, parent trees, and SHA256 hashes.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Sysmon Event ID 1 • MSI Installer Drop</span>
                  </div>
                  <CopyButton text={"{\n  \"TimeCreated\": \"2024-03-15T09:31:17\",\n  \"EventID\": 1,\n  \"Computer\": \"EXEC-WKSTN-01\",\n  \"Image\": \"C:\\Windows\\System32\\ProxyHealth.exe\",\n  \"CommandLine\": \"C:\\Windows\\System32\\ProxyHealth.exe --service --config=C:\\ProgramData\\Microsoft\\ProxyHealth\\config.enc\",\n  \"ParentImage\": \"C:\\Windows\\System32\\msiexec.exe\",\n  \"ParentCommandLine\": \"msiexec.exe /i C:\\Users\\kyle.morrison\\AppData\\Local\\Temp\\ProxyHealthSetup.msi /quiet\"\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "TimeCreated": "2024-03-15T09:31:17",<br/>  "EventID": 1,<br/>  "Computer": "EXEC-WKSTN-01",<br/>  "Image": "C:\Windows\System32\ProxyHealth.exe",<br/>  "CommandLine": "C:\Windows\System32\ProxyHealth.exe --service --config=C:\ProgramData\Microsoft\ProxyHealth\config.enc",<br/>  "ParentImage": "C:\Windows\System32\msiexec.exe",<br/>  "ParentCommandLine": "msiexec.exe /i C:\Users\kyle.morrison\AppData\Local\Temp\ProxyHealthSetup.msi /quiet"<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sysmon_events.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.EventID -eq 1 -and $_.User -like \"*kyle.morrison*\" } |\n    Select-Object TimeCreated, Computer, Image, CommandLine, ParentImage, ParentCommandLine | Format-Table -AutoSize"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sysmon_events.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.EventID -eq 1 -and $_.User -like "*kyle.morrison*" &#125; |<br/>    Select-Object TimeCreated, Computer, Image, CommandLine, ParentImage, ParentCommandLine | Format-Table -AutoSize</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sysmon_events.json') as f: events = json.load(f)\nfor e in events:\n    if e.get('EventID') == 1 and 'kyle.morrison' in str(e.get('User', '')):\n        print(f\"{e.get('TimeCreated')} | {e.get('Image')} | {e.get('CommandLine')}\")"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sysmon_events.json') as f: events = json.load(f)<br/>for e in events:<br/>    if e.get('EventID') == 1 and 'kyle.morrison' in str(e.get('User', '')):<br/>        print(f"&#123;e.get('TimeCreated')&#125; | &#123;e.get('Image')&#125; | &#123;e.get('CommandLine')&#125;")</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.EventID == 1 and (.User | test(\"kyle.morrison\"; \"i\"))) | \"\\(.TimeCreated) | \\(.Image) | \\(.CommandLine)\"' evidence/sysmon_events.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.EventID == 1 and (.User | test("kyle.morrison"; "i"))) | "\(.TimeCreated) | \(.Image) | \(.CommandLine)"' evidence/sysmon_events.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/sysmon_events.json.\n2. Search for: ProxyHealthSetup.msi or kyle.morrison.\n3. Locate the dropped binary: C:\\Windows\\System32\\ProxyHealth.exe."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/sysmon_events.json.<br/>2. Search for: ProxyHealthSetup.msi or kyle.morrison.<br/>3. Locate the dropped binary: C:\Windows\System32\ProxyHealth.exe.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Binary path: C:\Windows\System32\ProxyHealth.exe -> Filename: ProxyHealth.exe (matches ***********.***).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  ProxyHealth.exe
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 4: Symmetric Encryption Algorithm for C2 */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 4
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Symmetric Encryption Algorithm for C2
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  RC4
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What symmetric encryption algorithm does the malware use for C2 communications?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">***</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  The implant didn't want network firewalls reading its commands, so it wrapped all traffic in a lightweight stream cipher called RC4.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries use symmetric stream and block ciphers (MITRE ATT&CK T1573.001 - Encrypted Channel: Symmetric Cryptography) to encrypt network payloads. Static analysis on compiled Go binaries reveals cryptographic package imports and cipher runtime strings.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">proxyhealth_strings.json • Go Cryptographic Packages</span>
                  </div>
                  <CopyButton text={"\u2022 golang.org/x/crypto/rc4\n\u2022 crypto/rc4\n\u2022 arcfour stream cipher\n\u2022 TLS_RSA_WITH_RC4_128_SHA"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>• golang.org/x/crypto/rc4<br/>• crypto/rc4<br/>• arcfour stream cipher<br/>• TLS_RSA_WITH_RC4_128_SHA</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"(Get-Content .\\evidence\\proxyhealth_strings.json -Raw | ConvertFrom-Json).strings | Where-Object { $_ -match \"rc4|arcfour|cipher\" }"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>(Get-Content .\evidence\proxyhealth_strings.json -Raw | ConvertFrom-Json).strings | Where-Object &#123; $_ -match "rc4|arcfour|cipher" &#125;</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/proxyhealth_strings.json') as f: data = json.load(f)\nprint([s for s in data['strings'] if any(k in s.lower() for k in ['rc4', 'arcfour'])])"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/proxyhealth_strings.json') as f: data = json.load(f)<br/>print([s for s in data['strings'] if any(k in s.lower() for k in ['rc4', 'arcfour'])])</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"grep -iE \"rc4|arcfour\" evidence/proxyhealth_strings.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>grep -iE "rc4|arcfour" evidence/proxyhealth_strings.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/proxyhealth_strings.json in VS Code.\n2. Search for: rc4\n3. Observe: golang.org/x/crypto/rc4 and arcfour stream cipher."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/proxyhealth_strings.json in VS Code.<br/>2. Search for: rc4<br/>3. Observe: golang.org/x/crypto/rc4 and arcfour stream cipher.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">The algorithm is RC4 (also known as ARC4). Matches format *** (3 letters).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  RC4
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 5: Full C2 Domain Name */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 5
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Full C2 Domain Name
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  proxy-health-api.azurecloud-monitor.com
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the full C2 domain the implant beacons to?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">*****-******-***.**********-*******.***</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  The malware called home to a fake domain designed to fool security analysts into thinking it was a harmless Azure monitoring service.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Command & Control domains (MITRE ATT&CK T1071.001 - Web Protocols) mimic legitimate cloud services to blend into enterprise egress traffic. Sysmon Event ID 3 and DNS resolver logs reveal the connection endpoint.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Sysmon Event ID 3 & DNS Resolver Query</span>
                  </div>
                  <CopyButton text={"// Sysmon Event ID 3 (Network Connection):\nImage: C:\\Windows\\System32\\ProxyHealth.exe\nDestinationHostname: proxy-health-api.azurecloud-monitor.com\nDestinationIp: 193.42.33.114:443\n\n// DNS Resolver Log:\nquery_name: \"proxy-health-api.azurecloud-monitor.com\" -> answer: \"193.42.33.114\" "} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>// Sysmon Event ID 3 (Network Connection):<br/>Image: C:\Windows\System32\ProxyHealth.exe<br/>DestinationHostname: proxy-health-api.azurecloud-monitor.com<br/>DestinationIp: 193.42.33.114:443<br/><br/>// DNS Resolver Log:<br/>query_name: "proxy-health-api.azurecloud-monitor.com" -&gt; answer: "193.42.33.114" </code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sysmon_events.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.EventID -eq 3 -and $_.Image -like \"*ProxyHealth*\" } |\n    Select-Object DestinationHostname, DestinationIp, DestinationPort -Unique"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sysmon_events.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.EventID -eq 3 -and $_.Image -like "*ProxyHealth*" &#125; |<br/>    Select-Object DestinationHostname, DestinationIp, DestinationPort -Unique</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sysmon_events.json') as f: events = json.load(f)\nfor e in events:\n    if e.get('EventID') == 3 and 'proxyhealth' in str(e.get('Image', '')).lower():\n        print(f\"{e.get('DestinationHostname')} -> {e.get('DestinationIp')}:{e.get('DestinationPort')}\")"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sysmon_events.json') as f: events = json.load(f)<br/>for e in events:<br/>    if e.get('EventID') == 3 and 'proxyhealth' in str(e.get('Image', '')).lower():<br/>        print(f"&#123;e.get('DestinationHostname')&#125; -&gt; &#123;e.get('DestinationIp')&#125;:&#123;e.get('DestinationPort')&#125;")</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.EventID == 3 and (.Image | test(\"ProxyHealth\"; \"i\"))) | \"\\(.DestinationHostname) | \\(.DestinationIp)\"' evidence/sysmon_events.json | sort -u"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.EventID == 3 and (.Image | test("ProxyHealth"; "i"))) | "\(.DestinationHostname) | \(.DestinationIp)"' evidence/sysmon_events.json | sort -u</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/proxyhealth_strings.json in VS Code.\n2. Search for: azurecloud-monitor.com\n3. Locate domain: proxy-health-api.azurecloud-monitor.com."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/proxyhealth_strings.json in VS Code.<br/>2. Search for: azurecloud-monitor.com<br/>3. Locate domain: proxy-health-api.azurecloud-monitor.com.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">proxy (5) - health (6) - api (3) . azurecloud (10) - monitor (7) . com (3) -> proxy-health-api.azurecloud-monitor.com</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  proxy-health-api.azurecloud-monitor.com
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 6: Persistence Technique (MITRE ATT&CK ID) */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 6
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Persistence Technique (MITRE ATT&CK ID)
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  T1543.003
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">Which persistence technique was used to ensure the implant remained active on the system? (MITRE ATT&CK TECHNIQUE ID)</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">*********</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  If you turn your computer off and on again, regular programs close. By registering itself as a Windows Service, the malware ensures Windows boots it up automatically with highest SYSTEM privileges.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries abuse the Windows Service Control Manager to install malicious services (MITRE ATT&CK T1543.003 - Windows Service). Windows Security Event ID 4697 logs ServiceName, ServiceFileName, ServiceAccount, and ServiceStartType (2 = Auto Start).</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Windows Security Event ID 4697 • Service Installed</span>
                  </div>
                  <CopyButton text={"{\n  \"TimeCreated\": \"2024-03-15T03:31:45\",\n  \"EventID\": 4697,\n  \"Computer\": \"EXEC-WKSTN-01\",\n  \"EventData\": {\n    \"SubjectUserName\": \"kyle.morrison\",\n    \"ServiceName\": \"ProxyHealthSvc\",\n    \"ServiceStartType\": \"2\",\n    \"ServiceAccount\": \"LocalSystem\",\n    \"ServiceFileName\": \"C:\\Windows\\System32\\ProxyHealth.exe --service\"\n  }\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "TimeCreated": "2024-03-15T03:31:45",<br/>  "EventID": 4697,<br/>  "Computer": "EXEC-WKSTN-01",<br/>  "EventData": &#123;<br/>    "SubjectUserName": "kyle.morrison",<br/>    "ServiceName": "ProxyHealthSvc",<br/>    "ServiceStartType": "2",<br/>    "ServiceAccount": "LocalSystem",<br/>    "ServiceFileName": "C:\Windows\System32\ProxyHealth.exe --service"<br/>  &#125;<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\windows_security_events.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.EventID -eq 4697 -and $_.EventData.ServiceName -eq \"ProxyHealthSvc\" } |\n    Select-Object TimeCreated, @{N='Service';E={$_.EventData.ServiceName}}, @{N='Binary';E={$_.EventData.ServiceFileName}}"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\windows_security_events.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.EventID -eq 4697 -and $_.EventData.ServiceName -eq "ProxyHealthSvc" &#125; |<br/>    Select-Object TimeCreated, @&#123;N='Service';E=&#123;$_.EventData.ServiceName&#125;&#125;, @&#123;N='Binary';E=&#123;$_.EventData.ServiceFileName&#125;&#125;</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/windows_security_events.json') as f: events = json.load(f)\nfor e in events:\n    if e.get('EventID') == 4697 and 'proxyhealth' in json.dumps(e).lower():\n        print(json.dumps(e['EventData'], indent=2))"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/windows_security_events.json') as f: events = json.load(f)<br/>for e in events:<br/>    if e.get('EventID') == 4697 and 'proxyhealth' in json.dumps(e).lower():<br/>        print(json.dumps(e['EventData'], indent=2))</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.EventID == 4697 and (.EventData.ServiceName | test(\"ProxyHealth\"; \"i\"))) | \"\\(.TimeCreated) | \\(.EventData.ServiceName) | \\(.EventData.ServiceFileName)\"' evidence/windows_security_events.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.EventID == 4697 and (.EventData.ServiceName | test("ProxyHealth"; "i"))) | "\(.TimeCreated) | \(.EventData.ServiceName) | \(.EventData.ServiceFileName)"' evidence/windows_security_events.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/windows_security_events.json.\n2. Search for: ProxyHealthSvc or Event ID 4697.\n3. Review the newly registered Windows service."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/windows_security_events.json.<br/>2. Search for: ProxyHealthSvc or Event ID 4697.<br/>3. Review the newly registered Windows service.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Technique: Create or Modify System Process: Windows Service -> MITRE ID: T1543.003 (matches *********).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  T1543.003
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 7: Microsoft Tool Abused for LSASS Memory Dumping */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 7
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Microsoft Tool Abused for LSASS Memory Dumping
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  procdump
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">Which legitimate Microsoft tool did the attacker abuse to dump the LSASS process memory for credential theft?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">********</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Instead of bringing in a loud crowbar (custom malware), the burglar used a Microsoft-branded maintenance tool (ProcDump) to take a snapshot of the computer's password vault.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries abuse legitimate administrative binaries (Living off the Land / Sysinternals) to dump the memory of lsass.exe (MITRE ATT&CK T1003.001 - OS Credential Dumping: LSASS Memory). ProcDump produces full minidumps (-ma) while evading basic antivirus blocks.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Sysmon Event ID 1 • ProcDump LSASS Dump</span>
                  </div>
                  <CopyButton text={"{\n  \"TimeCreated\": \"2024-03-15T10:14:22\",\n  \"EventID\": 1,\n  \"Image\": \"C:\\Windows\\Temp\\procdump.exe\",\n  \"CommandLine\": \"procdump.exe -ma lsass.exe C:\\Windows\\Temp\\lsass.dmp\",\n  \"ParentImage\": \"C:\\Windows\\System32\\ProxyHealth.exe\",\n  \"User\": \"AXIOMFP\\kyle.morrison\"\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "TimeCreated": "2024-03-15T10:14:22",<br/>  "EventID": 1,<br/>  "Image": "C:\Windows\Temp\procdump.exe",<br/>  "CommandLine": "procdump.exe -ma lsass.exe C:\Windows\Temp\lsass.dmp",<br/>  "ParentImage": "C:\Windows\System32\ProxyHealth.exe",<br/>  "User": "AXIOMFP\kyle.morrison"<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sysmon_events.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.EventID -eq 1 -and ($_.CommandLine -like \"*lsass.dmp*\" -or $_.Image -like \"*procdump*\") } |\n    Select-Object TimeCreated, Computer, Image, CommandLine, ParentImage | Format-Table -AutoSize"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sysmon_events.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.EventID -eq 1 -and ($_.CommandLine -like "*lsass.dmp*" -or $_.Image -like "*procdump*") &#125; |<br/>    Select-Object TimeCreated, Computer, Image, CommandLine, ParentImage | Format-Table -AutoSize</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sysmon_events.json') as f: events = json.load(f)\nfor e in events:\n    if e.get('EventID') == 1 and 'lsass' in str(e.get('CommandLine', '')).lower():\n        print(f\"{e.get('TimeCreated')} | Tool: {e.get('Image')} | Cmd: {e.get('CommandLine')}\")"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sysmon_events.json') as f: events = json.load(f)<br/>for e in events:<br/>    if e.get('EventID') == 1 and 'lsass' in str(e.get('CommandLine', '')).lower():<br/>        print(f"&#123;e.get('TimeCreated')&#125; | Tool: &#123;e.get('Image')&#125; | Cmd: &#123;e.get('CommandLine')&#125;")</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.EventID == 1 and (.CommandLine | test(\"lsass\\\\.dmp\"; \"i\"))) | \"\\(.TimeCreated) | \\(.Image) | \\(.CommandLine)\"' evidence/sysmon_events.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.EventID == 1 and (.CommandLine | test("lsass\\.dmp"; "i"))) | "\(.TimeCreated) | \(.Image) | \(.CommandLine)"' evidence/sysmon_events.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/sysmon_events.json in VS Code.\n2. Search for: lsass.dmp\n3. Notice procdump.exe spawned by ProxyHealth.exe."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/sysmon_events.json in VS Code.<br/>2. Search for: lsass.dmp<br/>3. Notice procdump.exe spawned by ProxyHealth.exe.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Tool: procdump (without .exe). Matches ******** (8 letters: p-r-o-c-d-u-m-p).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  procdump
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 8: Service Account Harvested from LSASS Memory */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 8
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Service Account Harvested from LSASS Memory
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  svc_sharepoint_farm
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What service account credentials were harvested from the LSASS memory dump? (username only)</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">***_**********_****</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Inside the stolen LSASS memory dump, the hacker found a golden key: a high-privilege service account used by the corporate SharePoint server to access confidential merger files.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Dumping LSASS memory allows attackers to extract Kerberos tickets, NTLM password hashes, and cleartext credentials of service accounts (MITRE ATT&CK T1003.001). SharePoint audit logs reveal the stolen service account accessing sensitive documents immediately following the dump.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">sharepoint_audit_log.json • Unauthorized Access</span>
                  </div>
                  <CopyButton text={"{\n  \"CreationTime\": \"2024-03-15T10:33:24.000Z\",\n  \"Operation\": \"FileAccessed\",\n  \"UserId\": \"svc_sharepoint_farm@axiomfp.com\",\n  \"ClientIP\": \"10.10.20.30\",\n  \"SourceFileName\": \"AcquisitionTarget_DueDiligence_SigmaGroup.pptx\",\n  \"DownloadSize\": 89603579\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "CreationTime": "2024-03-15T10:33:24.000Z",<br/>  "Operation": "FileAccessed",<br/>  "UserId": "svc_sharepoint_farm@axiomfp.com",<br/>  "ClientIP": "10.10.20.30",<br/>  "SourceFileName": "AcquisitionTarget_DueDiligence_SigmaGroup.pptx",<br/>  "DownloadSize": 89603579<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sharepoint_audit_log.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.UserId -like \"svc_*\" } |\n    Select-Object CreationTime, UserId, ClientIP, Operation, SourceFileName -First 5 | Format-Table -AutoSize"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sharepoint_audit_log.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.UserId -like "svc_*" &#125; |<br/>    Select-Object CreationTime, UserId, ClientIP, Operation, SourceFileName -First 5 | Format-Table -AutoSize</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sharepoint_audit_log.json') as f: sp = json.load(f)\nprint(set(e['UserId'] for e in sp if 'svc_' in str(e.get('UserId',''))))"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sharepoint_audit_log.json') as f: sp = json.load(f)<br/>print(set(e['UserId'] for e in sp if 'svc_' in str(e.get('UserId',''))))</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.UserId | test(\"^svc_\"; \"i\")) | \"\\(.CreationTime) | \\(.UserId) | \\(.ClientIP)\"' evidence/sharepoint_audit_log.json | head -n 5"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.UserId | test("^svc_"; "i")) | "\(.CreationTime) | \(.UserId) | \(.ClientIP)"' evidence/sharepoint_audit_log.json | head -n 5</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/sharepoint_audit_log.json.\n2. Search for: svc_\n3. Locate: svc_sharepoint_farm@axiomfp.com."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/sharepoint_audit_log.json.<br/>2. Search for: svc_<br/>3. Locate: svc_sharepoint_farm@axiomfp.com.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Username only: svc_sharepoint_farm. Matches ***_**********_**** (svc_sharepoint_farm).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  svc_sharepoint_farm
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 9: NetBIOS Hostname of the Compromised Machine */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 9
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  NetBIOS Hostname of the Compromised Machine
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  EXEC-WKSTN-01
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the NetBIOS hostname of the initially compromised machine?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">*************</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Every computer on an enterprise network has a unique name badge. The compromised workstation of executive Kyle Morrison was labeled EXEC-WKSTN-01.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>The NetBIOS Hostname uniquely identifies the Windows endpoint (MITRE ATT&CK T1082 - System Information Discovery). It is logged in Sysmon and Windows Event headers and embedded in malware session tokens.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Sysmon Computer Tag & Binary String Prefix</span>
                  </div>
                  <CopyButton text={"\u2022 Sysmon Event Header: \"Computer\": \"EXEC-WKSTN-01\"\n\u2022 Static String in proxyhealth.bin: \"EXEC-WKSTN-01_\" "} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>• Sysmon Event Header: "Computer": "EXEC-WKSTN-01"<br/>• Static String in proxyhealth.bin: "EXEC-WKSTN-01_" </code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sysmon_events.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.User -like \"*kyle.morrison*\" } | Select-Object Computer -Unique"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sysmon_events.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.User -like "*kyle.morrison*" &#125; | Select-Object Computer -Unique</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sysmon_events.json') as f: events = json.load(f)\nprint(set(e['Computer'] for e in events if 'kyle.morrison' in str(e.get('User',''))))"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sysmon_events.json') as f: events = json.load(f)<br/>print(set(e['Computer'] for e in events if 'kyle.morrison' in str(e.get('User',''))))</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.User | test(\"kyle.morrison\"; \"i\")) | .Computer' evidence/sysmon_events.json | sort -u"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.User | test("kyle.morrison"; "i")) | .Computer' evidence/sysmon_events.json | sort -u</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/sysmon_events.json.\n2. Search for: kyle.morrison\n3. Check the 'Computer' field on matching events: EXEC-WKSTN-01."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/sysmon_events.json.<br/>2. Search for: kyle.morrison<br/>3. Check the 'Computer' field on matching events: EXEC-WKSTN-01.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Hostname: EXEC-WKSTN-01. Matches ************* (13 characters).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  EXEC-WKSTN-01
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 10: C: Drive Volume Serial Number for Key Derivation */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 10
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  C: Drive Volume Serial Number for Key Derivation
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  4B7A2C9E
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the volume serial number of the C: drive on the compromised machine, as used in the RC4 key derivation?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">********</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  To make sure its secret key couldn't be used on any other computer, the malware checked the hardware serial number of the victim's C: hard drive using a built-in Windows command.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Malware authors fingerprint the victim machine (MITRE ATT&CK T1082) using hardware properties such as the NTFS Volume Serial Number via WMIC.exe (logicaldisk get volumeserialnumber,deviceid) to generate machine-unique encryption keys.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Sysmon Event ID 1 • WMIC Hardware Query</span>
                  </div>
                  <CopyButton text={"{\n  \"TimeCreated\": \"2024-03-15T09:32:45\",\n  \"CommandLine\": \"wmic logicaldisk get volumeserialnumber,deviceid\",\n  \"Details\": \"DeviceID  VolumeSerialNumber\\r\\nC:        4B7A2C9E\\r\\nD:        A81F30C2\\r\\n\"\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "TimeCreated": "2024-03-15T09:32:45",<br/>  "CommandLine": "wmic logicaldisk get volumeserialnumber,deviceid",<br/>  "Details": "DeviceID  VolumeSerialNumber\r\nC:        4B7A2C9E\r\nD:        A81F30C2\r\n"<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sysmon_events.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.CommandLine -like \"*volumeserialnumber*\" } | Select-Object TimeCreated, CommandLine, Details | Format-List"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sysmon_events.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.CommandLine -like "*volumeserialnumber*" &#125; | Select-Object TimeCreated, CommandLine, Details | Format-List</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sysmon_events.json') as f: events = json.load(f)\nfor e in events:\n    if 'volumeserialnumber' in str(e.get('CommandLine','')).lower(): print(e.get('Details'))"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sysmon_events.json') as f: events = json.load(f)<br/>for e in events:<br/>    if 'volumeserialnumber' in str(e.get('CommandLine','')).lower(): print(e.get('Details'))</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.CommandLine | test(\"volumeserialnumber\"; \"i\")) | \"\\(.CommandLine)\\n\\(.Details)\"' evidence/sysmon_events.json"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.CommandLine | test("volumeserialnumber"; "i")) | "\(.CommandLine)\n\(.Details)"' evidence/sysmon_events.json</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/sysmon_events.json.\n2. Search for: volumeserialnumber\n3. Read the Details field showing C: 4B7A2C9E."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/sysmon_events.json.<br/>2. Search for: volumeserialnumber<br/>3. Read the Details field showing C: 4B7A2C9E.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Volume Serial for C: is 4B7A2C9E. Matches ******** (8 hex characters).</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  4B7A2C9E
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 11: Internal Pivot IP Address */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 11
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Internal Pivot IP Address
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  10.10.20.30
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What internal IP address did the attacker pivot to after obtaining the SharePoint service account credentials?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">IPv4 address</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  After stealing the master SharePoint key, the attacker hopped to a different server inside the office network (10.10.20.30) to perform their massive data exfiltration.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>After harvesting credentials from the executive workstation (10.10.20.15), the adversary pivoted laterally (MITRE ATT&CK T1021 - Remote Services) to 10.10.20.30 to coordinate document scraping and archive uploads.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">sharepoint_audit_log.json & proxy_access_log.txt</span>
                  </div>
                  <CopyButton text={"\u2022 SharePoint Audit Log: All FileAccessed events for svc_sharepoint_farm originate from ClientIP: 10.10.20.30\n\u2022 Proxy Access Log: Outbound PUT exfiltration uploads originate from ClientIP: 10.10.20.30"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>• SharePoint Audit Log: All FileAccessed events for svc_sharepoint_farm originate from ClientIP: 10.10.20.30<br/>• Proxy Access Log: Outbound PUT exfiltration uploads originate from ClientIP: 10.10.20.30</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\sharepoint_audit_log.json -Raw | ConvertFrom-Json |\n    Where-Object { $_.UserId -eq \"svc_sharepoint_farm@axiomfp.com\" } | Select-Object ClientIP -Unique"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\sharepoint_audit_log.json -Raw | ConvertFrom-Json |<br/>    Where-Object &#123; $_.UserId -eq "svc_sharepoint_farm@axiomfp.com" &#125; | Select-Object ClientIP -Unique</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/sharepoint_audit_log.json') as f: sp = json.load(f)\nprint(set(e['ClientIP'] for e in sp if e.get('UserId') == 'svc_sharepoint_farm@axiomfp.com'))"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/sharepoint_audit_log.json') as f: sp = json.load(f)<br/>print(set(e['ClientIP'] for e in sp if e.get('UserId') == 'svc_sharepoint_farm@axiomfp.com'))</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"jq -r '.[] | select(.UserId == \"svc_sharepoint_farm@axiomfp.com\") | .ClientIP' evidence/sharepoint_audit_log.json | sort -u"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>jq -r '.[] | select(.UserId == "svc_sharepoint_farm@axiomfp.com") | .ClientIP' evidence/sharepoint_audit_log.json | sort -u</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/sharepoint_audit_log.json.\n2. Search for: svc_sharepoint_farm\n3. Observe ClientIP: 10.10.20.30."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/sharepoint_audit_log.json.<br/>2. Search for: svc_sharepoint_farm<br/>3. Observe ClientIP: 10.10.20.30.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">Internal pivot IP address: 10.10.20.30.</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  10.10.20.30
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 12: Decrypted C2 Command */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 12
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Decrypted C2 Command
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  COMPRESS_AND_STAGE
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">Decrypt the captured C2 beacon (c2_session_capture.bin) using the derived RC4 key. What command was issued to the implant?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">********_***_*****</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  By taking Hostname + Hard Drive Serial (EXEC-WKSTN-01_4B7A2C9E) and computing its SHA-1 hash, we unlocked the encrypted C2 file. Inside was the attacker's order: 'COMPRESS_AND_STAGE'!
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>The implant formats a seed string 'EXEC-WKSTN-01_4B7A2C9E' and computes SHA-1 to yield the 20-byte RC4 key (0x345efe33e0c678491618618ff374c2c6f5411a8b). Stripping the 8-byte magic header ('C2SESS\x01\x00') reveals the JSON command payload.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">Decrypted c2_session_capture.bin JSON Payload</span>
                  </div>
                  <CopyButton text={"{\n  \"session\": \"2a4f1b9c\",\n  \"cmd\": \"COMPRESS_AND_STAGE\",\n  \"target\": \"axiom_q1_portfolio.7z\",\n  \"bytes\": 24999591936,\n  \"status\": 200\n}"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>&#123;<br/>  "session": "2a4f1b9c",<br/>  "cmd": "COMPRESS_AND_STAGE",<br/>  "target": "axiom_q1_portfolio.7z",<br/>  "bytes": 24999591936,<br/>  "status": 200<br/>&#125;</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"# Input: EXEC-WKSTN-01_4B7A2C9E | SHA1 -> 345efe33e0c678491618618ff374c2c6f5411a8b\n# CyberChef Recipe: Drop bytes (8) -> RC4 (Key: 345efe33e0c678491618618ff374c2c6f5411a8b)"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code># Input: EXEC-WKSTN-01_4B7A2C9E | SHA1 -&gt; 345efe33e0c678491618618ff374c2c6f5411a8b<br/># CyberChef Recipe: Drop bytes (8) -&gt; RC4 (Key: 345efe33e0c678491618618ff374c2c6f5411a8b)</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import hashlib\nraw = open('evidence/c2_session_capture.bin', 'rb').read()[8:]\nkey = hashlib.sha1(b'EXEC-WKSTN-01_4B7A2C9E').digest()\n# RC4 decrypt 'raw' using 'key' -> cmd: COMPRESS_AND_STAGE"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import hashlib<br/>raw = open('evidence/c2_session_capture.bin', 'rb').read()[8:]<br/>key = hashlib.sha1(b'EXEC-WKSTN-01_4B7A2C9E').digest()<br/># RC4 decrypt 'raw' using 'key' -&gt; cmd: COMPRESS_AND_STAGE</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"python3 -c \"import hashlib; k=hashlib.sha1(b'EXEC-WKSTN-01_4B7A2C9E').digest(); ...; print(decrypted)\""} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>python3 -c "import hashlib; k=hashlib.sha1(b'EXEC-WKSTN-01_4B7A2C9E').digest(); ...; print(decrypted)"</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. CyberChef: SHA1('EXEC-WKSTN-01_4B7A2C9E') -> 345efe33e0c678491618618ff374c2c6f5411a8b\n2. Load c2_session_capture.bin -> Recipe: Drop bytes (8), RC4 -> Decrypted JSON."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. CyberChef: SHA1('EXEC-WKSTN-01_4B7A2C9E') -&gt; 345efe33e0c678491618618ff374c2c6f5411a8b<br/>2. Load c2_session_capture.bin -&gt; Recipe: Drop bytes (8), RC4 -&gt; Decrypted JSON.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">COMPRESS (8) _ AND (3) _ STAGE (5) -> COMPRESS_AND_STAGE.</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  COMPRESS_AND_STAGE
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 13: Staged Archive Filename */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 13
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Staged Archive Filename
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  axiom_q1_portfolio.7z
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the filename of the archive created to stage the exfiltrated data?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">*****_**_*********.**</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Before smuggling 25GB of confidential documents out of the network, the attacker bundled them into a compressed 7-Zip file named axiom_q1_portfolio.7z and split it into chunks.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries compress and archive sensitive files prior to exfiltration (MITRE ATT&CK T1560.001 - Archive Collected Data). Splitting large archives into multi-part chunk files (.7z.0000, .7z.0001, etc.) allows smooth HTTP streaming.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">proxy_access_log.txt • Multi-Part 7z Chunk Uploads</span>
                  </div>
                  <CopyButton text={"1710500553.836  10.10.20.30 PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0000 ...\n1710500614.629  10.10.20.30 PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0001 ...\n...\n1710506073.679  10.10.20.30 PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0046 ..."} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>1710500553.836  10.10.20.30 PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0000 ...<br/>1710500614.629  10.10.20.30 PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0001 ...<br/>...<br/>1710506073.679  10.10.20.30 PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0046 ...</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\proxy_access_log.txt | Where-Object { $_ -match \"PUT\" -and $_ -match \"\\.7z\" } | Select-Object -First 3"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\proxy_access_log.txt | Where-Object &#123; $_ -match "PUT" -and $_ -match "\.7z" &#125; | Select-Object -First 3</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import re\nwith open('evidence/proxy_access_log.txt') as f: print(re.findall(r'uploads/([a-zA-Z0-9_\\.]+\\.7z)', f.read())[0])"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import re<br/>with open('evidence/proxy_access_log.txt') as f: print(re.findall(r'uploads/([a-zA-Z0-9_\.]+\.7z)', f.read())[0])</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"grep -oE \"[a-zA-Z0-9_\\.]+\\.7z\" evidence/proxy_access_log.txt | head -n 1"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>grep -oE "[a-zA-Z0-9_\.]+\.7z" evidence/proxy_access_log.txt | head -n 1</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/proxy_access_log.txt.\n2. Search for: .7z or uploads/\n3. Locate base archive name: axiom_q1_portfolio.7z."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/proxy_access_log.txt.<br/>2. Search for: .7z or uploads/<br/>3. Locate base archive name: axiom_q1_portfolio.7z.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">axiom (5) _ q1 (2) _ portfolio (9) . 7z (2) -> axiom_q1_portfolio.7z.</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  axiom_q1_portfolio.7z
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 14: Exfiltration Endpoint Domain Name */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 14
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Exfiltration Endpoint Domain Name
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  blob-sync-backup.s3-azure-cdn.com
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">What is the full domain name the attacker used as the exfiltration endpoint to upload the staged archive?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">****-****-******.**-*****-***.***</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  The stolen 25GB archive wasn't sent to a random sketchy IP; it was uploaded to a lookalike domain named blob-sync-backup.s3-azure-cdn.com designed to look like routine cloud storage backups.
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries exfiltrate data over HTTP/HTTPS to cloud storage endpoints or actor-controlled web servers masquerading as legitimate cloud sync providers (MITRE ATT&CK T1567 - Exfiltration Over Web Service).</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">proxy_access_log.txt • Exfiltration Destination URL</span>
                  </div>
                  <CopyButton text={"PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0000 DIRECT/193.42.33.118"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>PUT https://blob-sync-backup.s3-azure-cdn.com/uploads/axiom_q1_portfolio.7z.0000 DIRECT/193.42.33.118</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"Get-Content .\\evidence\\proxy_access_log.txt | Where-Object { $_ -match \"PUT\" -and $_ -match \"uploads\" } | ForEach-Object { ($_ -split \" \")[6] } | Select-Object -Unique"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>Get-Content .\evidence\proxy_access_log.txt | Where-Object &#123; $_ -match "PUT" -and $_ -match "uploads" &#125; | ForEach-Object &#123; ($_ -split " ")[6] &#125; | Select-Object -Unique</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"from urllib.parse import urlparse\nwith open('evidence/proxy_access_log.txt') as f:\n    for l in f:\n        if 'PUT ' in l and 'uploads/' in l:\n            print(urlparse(l.split()[6]).netloc); break"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>from urllib.parse import urlparse<br/>with open('evidence/proxy_access_log.txt') as f:<br/>    for l in f:<br/>        if 'PUT ' in l and 'uploads/' in l:<br/>            print(urlparse(l.split()[6]).netloc); break</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"grep \"PUT \" evidence/proxy_access_log.txt | awk '{print $7}' | cut -d'/' -f3 | sort -u"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>grep "PUT " evidence/proxy_access_log.txt | awk '&#123;print $7&#125;' | cut -d'/' -f3 | sort -u</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Open evidence/proxy_access_log.txt in VS Code.\n2. Search for: PUT https://\n3. Extract domain: blob-sync-backup.s3-azure-cdn.com."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Open evidence/proxy_access_log.txt in VS Code.<br/>2. Search for: PUT https://<br/>3. Extract domain: blob-sync-backup.s3-azure-cdn.com.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">blob (4) - sync (4) - backup (6) . s3 (2) - azure (5) - cdn (3) . com (3) -> blob-sync-backup.s3-azure-cdn.com.</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  blob-sync-backup.s3-azure-cdn.com
                </div>
              </div>

            </div>
          </details>


          {/* ========================================================================= */}
          {/* TASK 15: Decoding the Covert DNS Channel Message */}
          {/* ========================================================================= */}
          <details className="group bg-[#111111]/70 border border-zinc-800 rounded-2xl overflow-hidden my-6 transition-all duration-300 shadow-xl hover:border-emerald-500/40">
            <summary className="p-6 cursor-pointer list-none flex flex-col md:flex-row md:items-center justify-between gap-4 select-none bg-gradient-to-r from-[#111111] via-[#141a16] to-[#111111]">
              <div className="flex items-center gap-4">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  Task 15
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] group-hover:text-emerald-300 transition-colors">
                  Decoding the Covert DNS Channel Message
                </h3>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="bg-black/60 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider">
                  UNC3944_AXIOM_PWNED
                </span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300 text-lg">▼</span>
              </div>
            </summary>

            <div className="p-6 pt-2 border-t border-zinc-800/80 space-y-6 bg-[#0a0a0a]/90">
              
              {/* Question & Format */}
              <div className="bg-[#141414] border border-zinc-800 rounded-xl p-4 font-mono text-sm">
                <p className="text-zinc-400 font-bold mb-1 text-xs uppercase tracking-wider">Objective Question:</p>
                <p className="text-zinc-200 text-sm md:text-base mb-2 font-sans font-medium">Decode the covert message hidden in DNS subdomain queries found in the DNS resolver log. What is the full decoded string?</p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>Expected Format:</span>
                  <code className="text-pink-400 bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20">*******_*****_*****</code>
                </div>
              </div>

              {/* Beginner Analogy */}
              <div className="bg-[#111613] border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-md">
                <h4 className="text-emerald-400 font-bold mb-2 font-mono text-xs uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Like a spy whispering a secret code letter-by-letter over telephone calls, the malware hid one encrypted letter in every routine website address lookup. By XOR-decrypting each prefix with key 0x17, the threat actor's victory signature is revealed!
                </p>
              </div>

              {/* Concept & Theory */}
              <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-emerald-400/80">Forensic Concept & Theory</h4>
                <p>Adversaries use DNS tunneling (MITRE ATT&CK T1071.004) to transmit telemetry or messages across strict firewalls. The hardcoded configuration covert_dns_xor_key=0x17 XORs each 2-character hex subdomain prefix with 0x17 to produce ASCII characters.</p>
              </div>

              {/* Log Evidence Box with CopyButton */}
              <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner relative">
                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-zinc-500 text-xs">dns_resolver_log.json • 19 Covert Subdomain Queries</span>
                  </div>
                  <CopyButton text={"4268119e.t.proxy-health-api.azurecloud-monitor.com -> 0x42 ^ 0x17 = 'U'\n5917263d.t.proxy-health-api.azurecloud-monitor.com -> 0x59 ^ 0x17 = 'N'\n5456bdc5.t.proxy-health-api.azurecloud-monitor.com -> 0x54 ^ 0x17 = 'C'\n...\n538aa366.t.proxy-health-api.azurecloud-monitor.com -> 0x53 ^ 0x17 = 'D'"} />
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>4268119e.t.proxy-health-api.azurecloud-monitor.com -&gt; 0x42 ^ 0x17 = 'U'<br/>5917263d.t.proxy-health-api.azurecloud-monitor.com -&gt; 0x59 ^ 0x17 = 'N'<br/>5456bdc5.t.proxy-health-api.azurecloud-monitor.com -&gt; 0x54 ^ 0x17 = 'C'<br/>...<br/>538aa366.t.proxy-health-api.azurecloud-monitor.com -&gt; 0x53 ^ 0x17 = 'D'</code>
                </pre>
              </div>

              {/* 4 Investigation Methods with individual CopyButtons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Investigation Methods (Click to Expand & Copy Code)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Method A */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-emerald-400 font-bold flex justify-between items-center select-none">
                      <span>Method A: PowerShell</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"$events = Get-Content .\\evidence\\dns_resolver_log.json -Raw | ConvertFrom-Json\n$queries = $events | Where-Object { $_.query_name -like \"*.t.proxy-health-api.azurecloud-monitor.com*\" } | Select-Object -ExpandProperty query_name\n$decoded = ($queries | ForEach-Object { [char]([Convert]::ToByte(($_.Split('.')[0].Substring(0,2)), 16) -bxor 0x17) }) -join ''\nWrite-Output $decoded"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>$events = Get-Content .\evidence\dns_resolver_log.json -Raw | ConvertFrom-Json<br/>$queries = $events | Where-Object &#123; $_.query_name -like "*.t.proxy-health-api.azurecloud-monitor.com*" &#125; | Select-Object -ExpandProperty query_name<br/>$decoded = ($queries | ForEach-Object &#123; [char]([Convert]::ToByte(($_.Split('.')[0].Substring(0,2)), 16) -bxor 0x17) &#125;) -join ''<br/>Write-Output $decoded</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method B */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-blue-400 font-bold flex justify-between items-center select-none">
                      <span>Method B: Python</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"import json\nwith open('evidence/dns_resolver_log.json') as f: dns = json.load(f)\nqueries = [d['query_name'] for d in dns if '.t.proxy-health-api' in d.get('query_name','')]\nprint(''.join(chr(int(q.split('.')[0][:2], 16) ^ 0x17) for q in queries))"} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>import json<br/>with open('evidence/dns_resolver_log.json') as f: dns = json.load(f)<br/>queries = [d['query_name'] for d in dns if '.t.proxy-health-api' in d.get('query_name','')]<br/>print(''.join(chr(int(q.split('.')[0][:2], 16) ^ 0x17) for q in queries))</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method C */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-yellow-400 font-bold flex justify-between items-center select-none">
                      <span>Method C: Linux CLI / jq</span>
                      <span className="text-zinc-600 text-xs">code ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"grep -oE \"[a-f0-9]{8}\\.t\\.proxy-health\" evidence/dns_resolver_log.json | cut -c1-2 | while read h; do printf \"\\x$(printf %x $(( 0x$h ^ 0x17 )))\"; done; echo \"\""} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto">
                        <code>grep -oE "[a-f0-9]&#123;8&#125;\.t\.proxy-health" evidence/dns_resolver_log.json | cut -c1-2 | while read h; do printf "\x$(printf %x $(( 0x$h ^ 0x17 )))"; done; echo ""</code>
                      </pre>
                    </div>
                  </details>

                  {/* Method D */}
                  <details className="bg-[#121212] border border-zinc-800/80 rounded-lg p-3 hover:border-emerald-500/30 transition-colors">
                    <summary className="cursor-pointer text-pink-400 font-bold flex justify-between items-center select-none">
                      <span>Method D: GUI / Editor</span>
                      <span className="text-zinc-600 text-xs">steps ▼</span>
                    </summary>
                    <div className="mt-3 relative">
                      <div className="flex justify-end mb-1">
                        <CopyButton text={"1. Copy 19 hex prefixes from dns_resolver_log.json: 42 59 54 24 2e 23 23 48 56 4f 5e 58 5a 48 47 40 59 52 53\n2. CyberChef: From Hex -> XOR (Key: 17, Format: Hex) -> UNC3944_AXIOM_PWNED."} />
                      </div>
                      <pre className="p-3 bg-black rounded border border-zinc-800/60 text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                        <code>1. Copy 19 hex prefixes from dns_resolver_log.json: 42 59 54 24 2e 23 23 48 56 4f 5e 58 5a 48 47 40 59 52 53<br/>2. CyberChef: From Hex -&gt; XOR (Key: 17, Format: Hex) -&gt; UNC3944_AXIOM_PWNED.</code>
                      </pre>
                    </div>
                  </details>
                </div>
              </div>

              {/* Answer Formulation */}
              <div className="bg-[#0e1713] border border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Answer Formulation:</span>
                  <p className="text-zinc-300 text-xs md:text-sm font-sans">UNC3944 (7) _ AXIOM (5) _ PWNED (5) -> UNC3944_AXIOM_PWNED.</p>
                </div>
                <div className="bg-black border border-emerald-500/50 px-4 py-2 rounded-lg font-mono text-sm md:text-base text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  UNC3944_AXIOM_PWNED
                </div>
              </div>

            </div>
          </details>


        </div>

        {/* Task 15 Decryption Table */}
        <div className="my-16 space-y-6">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
            <span>📊 Task 15 Covert DNS XOR Matrix (Key: 0x17)</span>
          </h2>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#141414] text-emerald-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Timestamp (UTC)</th>
                  <th className="p-3">Subdomain Prefix</th>
                  <th className="p-3">Hex</th>
                  <th className="p-3">Dec</th>
                  <th className="p-3">XOR 0x17</th>
                  <th className="p-3 text-right">Decoded Char</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr><td className="p-3 font-bold text-zinc-500">1</td><td className="p-3">2024-03-15T11:28:08Z</td><td className="p-3 text-pink-400">4268119e</td><td className="p-3">0x42</td><td className="p-3">66</td><td className="p-3">66 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">U</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">2</td><td className="p-3">2024-03-15T11:28:24Z</td><td className="p-3 text-pink-400">5917263d</td><td className="p-3">0x59</td><td className="p-3">89</td><td className="p-3">89 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">N</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">3</td><td className="p-3">2024-03-15T11:28:33Z</td><td className="p-3 text-pink-400">5456bdc5</td><td className="p-3">0x54</td><td className="p-3">84</td><td className="p-3">84 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">C</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">4</td><td className="p-3">2024-03-15T11:28:49Z</td><td className="p-3 text-pink-400">2495462d</td><td className="p-3">0x24</td><td className="p-3">36</td><td className="p-3">36 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">3</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">5</td><td className="p-3">2024-03-15T11:28:58Z</td><td className="p-3 text-pink-400">2e5d0064</td><td className="p-3">0x2E</td><td className="p-3">46</td><td className="p-3">46 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">9</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">6</td><td className="p-3">2024-03-15T11:29:08Z</td><td className="p-3 text-pink-400">23db76b7</td><td className="p-3">0x23</td><td className="p-3">35</td><td className="p-3">35 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">4</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">7</td><td className="p-3">2024-03-15T11:29:18Z</td><td className="p-3 text-pink-400">233802d9</td><td className="p-3">0x23</td><td className="p-3">35</td><td className="p-3">35 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">4</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">8</td><td className="p-3">2024-03-15T11:29:35Z</td><td className="p-3 text-pink-400">4814c4f6</td><td className="p-3">0x48</td><td className="p-3">72</td><td className="p-3">72 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">9</td><td className="p-3">2024-03-15T11:29:46Z</td><td className="p-3 text-pink-400">569380c6</td><td className="p-3">0x56</td><td className="p-3">86</td><td className="p-3">86 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">A</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">10</td><td className="p-3">2024-03-15T11:29:57Z</td><td className="p-3 text-pink-400">4faba79d</td><td className="p-3">0x4F</td><td className="p-3">79</td><td className="p-3">79 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">X</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">11</td><td className="p-3">2024-03-15T11:30:08Z</td><td className="p-3 text-pink-400">5e9fc4b3</td><td className="p-3">0x5E</td><td className="p-3">94</td><td className="p-3">94 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">I</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">12</td><td className="p-3">2024-03-15T11:30:19Z</td><td className="p-3 text-pink-400">58b4498d</td><td className="p-3">0x58</td><td className="p-3">88</td><td className="p-3">88 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">O</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">13</td><td className="p-3">2024-03-15T11:30:30Z</td><td className="p-3 text-pink-400">5a73cceb</td><td className="p-3">0x5A</td><td className="p-3">90</td><td className="p-3">90 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">M</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">14</td><td className="p-3">2024-03-15T11:30:47Z</td><td className="p-3 text-pink-400">48678d19</td><td className="p-3">0x48</td><td className="p-3">72</td><td className="p-3">72 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">_</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">15</td><td className="p-3">2024-03-15T11:30:59Z</td><td className="p-3 text-pink-400">4796a5d8</td><td className="p-3">0x47</td><td className="p-3">71</td><td className="p-3">71 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">P</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">16</td><td className="p-3">2024-03-15T11:31:09Z</td><td className="p-3 text-pink-400">40632f5e</td><td className="p-3">0x40</td><td className="p-3">64</td><td className="p-3">64 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">W</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">17</td><td className="p-3">2024-03-15T11:31:26Z</td><td className="p-3 text-pink-400">59aeef31</td><td className="p-3">0x59</td><td className="p-3">89</td><td className="p-3">89 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">N</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">18</td><td className="p-3">2024-03-15T11:31:34Z</td><td className="p-3 text-pink-400">526bb775</td><td className="p-3">0x52</td><td className="p-3">82</td><td className="p-3">82 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">E</td></tr>
                <tr><td className="p-3 font-bold text-zinc-500">19</td><td className="p-3">2024-03-15T11:31:50Z</td><td className="p-3 text-pink-400">538aa366</td><td className="p-3">0x53</td><td className="p-3">83</td><td className="p-3">83 ⊕ 23</td><td className="p-3 text-right text-emerald-300 font-bold text-sm">D</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Master Solution Table */}
        <div className="my-16 space-y-6">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            Master Solution Reference Matrix (15/15)
          </h2>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-[#0a0a0a] shadow-xl">
            <table className="w-full text-left font-mono text-xs md:text-sm">
              <thead className="bg-[#141414] text-emerald-400 border-b border-zinc-800">
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
