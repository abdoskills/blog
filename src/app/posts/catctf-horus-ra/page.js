import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "HORUS Ra: Multi-Stage Fileless Malware DFIR & Horus Protector | CAT CTF 2026",
  description: "Comprehensive Incident Response investigation of a multi-stage credential stealer. Analyzing Edge browser artifacts, double extension masquerading, PowerShell event log stagers, registry chunk reassembly with dnfile, and Wireshark C2 PCAP analysis for MoDi RAT.",
};

export default function HorusRaWriteup() {
  const psStagerCmd = `powershell.exe -WindowStyle Hidden -Command [AppDomain]::CurrentDomain.Load([Convert]::FromBase64String((-join (Get-ItemProperty -Path 'HKCU:\\Software\\esBbIgyFlZcXjUl' -Name 's').s | ForEach-Object { $_[-1..-($_.Length)] }))); [v.v]::v('esBbIgyFlZcXjUl')`;

  const pythonReassembleScript = `import dnfile
from Registry import Registry

# 1. Open the Administrator's NTUSER.DAT registry hive
triage_ntuser = r"C:\\CTFS\\Icat\\1\\Triage\\C\\Users\\Administrator\\NTUSER.DAT"
reg = Registry.Registry(triage_ntuser)

# 2. Extract and reassemble the 8 segments from the 'donn' subkey
donn_key = reg.open(r"Software\\esBbIgyFlZcXjUl\\donn")
full_hex = "".join(donn_key.value(f"segment{i}").value() for i in range(1, 9))

# 3. Reverse the hex string to recover the original PE bytes
pe_bytes = bytes.fromhex(full_hex[::-1])

# 4. Parse the .NET metadata in memory using dnfile
dn = dnfile.dnPE(data=pe_bytes)

# 5. Locate the stealer class and inspect its methods
for t in dn.net.mdtables.TypeDef:
    if t.TypeName == "COVIDPickers":
        print("Class Name:", t.TypeName)
        methods = [m.row.Name for m in t.MethodList]
        mail_methods = [
            m for m in methods 
            if any(app in m for app in ["Outlook", "Foxmail"]) and ("Speed" in m or "Passwords" in m)
        ]
        browser_methods = [
            m for m in methods 
            if any(app in m for app in ["Chrome", "Microsoft", "Opera", "Brave"])
        ][:3]

        print("Mail Methods   :", mail_methods)
        print("Browser Methods:", browser_methods)`;

  const pythonReassembleOutput = `Class Name: COVIDPickers
Mail Methods   : ['Outlook_Speed', 'GetOutlookPasswords', 'Foxmail_Speed']
Browser Methods: ['Chrome_Canary_Speed', 'Chrome_Speed', 'Microsoft_Speed']`;

  const flagText = `CATF{cheat3rs_will_alw4ys_be_th3r3}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Navigation */}
      <nav className="w-full p-4 sm:p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="text-xs font-mono text-zinc-400 hover:text-cyan-400 flex items-center gap-2 transition-colors border border-zinc-800/80 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md"
        >
          <span>←</span> Back to All CTFs
        </Link>
        <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/50 px-3 py-1 rounded-full">
          CAT CTF 2026 • DFIR Case
        </span>
      </nav>

      {/* Main Post Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-red-950/40 text-red-400 border border-red-800/50 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
              Incident Response
            </span>
            <span className="bg-purple-950/40 text-purple-400 border border-purple-800/50 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full">
              Malware DFIR
            </span>
            <span className="bg-cyan-950/40 text-cyan-400 border border-cyan-800/50 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full">
              500 PTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 uppercase font-[family-name:var(--font-share-tech)]">
            HORUS Ra: Multi-Stage Fileless Malware DFIR & Horus Protector
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-6 font-sans">
            End-to-end incident response investigation of a multi-stage credential theft and C2 deployment campaign. 
            From Edge browser SQLite triage and double-extension masquerading to PowerShell Event ID 400 stagers, registry chunk reassembly with Python <code className="text-cyan-300 font-mono text-xs bg-black/50 px-1 py-0.5 rounded">dnfile</code>, and PCAP stream reconstruction of MoDi RAT.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-4 border-t border-zinc-800/80">
            <span>⏱ 16 min read</span>
            <span>•</span>
            <span>Platform: CAT CTF 2026</span>
            <span>•</span>
            <span>Artifacts: C: Drive Triage & Outbound-Traffic.pcap</span>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/catctf_horus_ra.jpg"
            alt="HORUS Ra Tactical Architecture Card"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: Horus Protector & MoDi RAT Infection Chain DAG</span>
            <span className="text-cyan-400 font-bold">Multi-Stage Forensic Triage</span>
          </div>
        </div>

        {/* Executive Triage Dashboard */}
        <section className="mb-12 bg-[#0c0d14]/90 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Incident Response Executive Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono mb-6">
            <div className="bg-black/50 p-3.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block mb-1">INITIAL DELIVERY</span>
              <span className="text-zinc-200 font-bold">Google Drive / Report.zip</span>
              <span className="text-emerald-400 text-[10px] block mt-1">Double Ext: .pdf.vbe</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block mb-1">EXECUTION & PERSISTENCE</span>
              <span className="text-zinc-200 font-bold">PowerShell Stager & Tasks</span>
              <span className="text-purple-400 text-[10px] block mt-1">Injected: AddInProcess32.exe</span>
            </div>
            <div className="bg-black/50 p-3.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block mb-1">MALWARE & C2</span>
              <span className="text-zinc-200 font-bold">Horus Protector / MoDi RAT</span>
              <span className="text-cyan-400 text-[10px] block mt-1">144.91.92.251:2025 (Boss2019)</span>
            </div>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            During an incident triage on a compromised Windows workstation, an analyst is provided with a compressed C: drive triage package and a packet capture (<code className="text-cyan-300 font-mono text-xs">Outbound-Traffic.pcap</code>). Through 12 investigative milestones, we reconstruct the complete intrusion lifecycle: weaponized download, execution via obfuscated registry stagers, country-check bypass, modular .NET payload reassembly, scheduled task persistence, and encrypted network exfiltration.
          </p>
        </section>

        {/* Investigation Breakdown: All 12 Questions */}
        <div className="space-y-12">

          {/* Q1 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q1</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Initial Delivery: Malware Download URL
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What is the complete download URL from which the initial malware was retrieved?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              To identify where the intrusion began, we examine the victim workstation’s web browser history. Inspecting the user profile under <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">C:\Users\Administrator\AppData\Local\Microsoft\Edge\User Data\Default\</code>, we extract the SQLite database file <code className="text-zinc-200 font-mono text-xs">History</code>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Opening <code className="text-zinc-200 font-mono text-xs">History</code> inside <strong>DB Browser for SQLite</strong> and navigating to the <code className="text-cyan-300 font-mono text-xs">downloads</code> table reveals the exact download event for <code className="text-yellow-300 font-mono text-xs">Report.zip</code>:
            </p>

            {/* Screenshot 1 */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 mb-4 bg-black">
              <Image
                src="/images/horus_ra/q1_edge_history_sqlite.png"
                alt="Edge History SQLite database downloads table inspection"
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-zinc-400">ANSWER (Q1):</span>
              <code className="text-xs font-mono text-emerald-400 break-all select-all">
                https://drive.usercontent.google.com/download?id=1A88Zbr0kciLs2fSsOLVTguFSkRu3r6WD&export=download&confirm=t&uuid=e88f9ed7-f9bf-4f9c-918f-6988fdf0a244
              </code>
            </div>
          </div>

          {/* Q2 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q2</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                MITRE ATT&CK: Malicious File Disguise Technique
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: With reference to the MITRE ATT&CK framework, identify the technique ID corresponding to the method used to disguise the malicious file.</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Checking the user’s <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">Downloads</code> folder and recent interaction artifacts under <code className="text-zinc-200 font-mono text-xs">AppData\Roaming\Microsoft\Windows\Recent\</code>, we observe that the compressed archive <code className="text-yellow-300 font-mono text-xs">Report.zip</code> unpacked into a suspicious file named:
            </p>
            <div className="bg-black/50 border border-zinc-800 p-3 rounded-xl mb-4">
              <code className="text-cyan-400 font-mono text-sm font-bold">Data-Analysis-Report.pdf.vbe</code>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              By appending a trusted document extension (<code className="text-zinc-200 font-mono text-xs">.pdf</code>) before the executable VBScript Encoded extension (<code className="text-zinc-200 font-mono text-xs">.vbe</code>), the threat actor tricks Windows File Explorer into masking the executable nature of the file. In the MITRE ATT&CK Matrix, this technique falls under <strong>Masquerading: Double File Extension</strong>.
            </p>

            {/* Screenshots 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
                <Image
                  src="/images/horus_ra/q2_downloads_report_zip.png"
                  alt="Downloads folder containing Report.zip"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
                <Image
                  src="/images/horus_ra/q2_recent_data_analysis_report.png"
                  alt="Recent folder showing Data-Analysis-Report.pdf.vbe link"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">ANSWER (Q2):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">T1036.007</code>
            </div>
          </div>

          {/* Q3 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q3</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Execution: Fileless PowerShell Command
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: Identify the PowerShell command launched following the opening of the malicious file.</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              When investigating execution artifacts, standard console history (<code className="text-zinc-400 font-mono text-xs">ConsoleHost_history.txt</code>) may be blank if launched by a script. We turn to Windows Event Logs at <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">C:\Windows\System32\winevt\Logs\Windows PowerShell.evtx</code>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Filtering on <strong>Event ID 400</strong> (Engine State Transition) and inspecting the <code className="text-zinc-200 font-mono text-xs">HostApplication</code> property captures the exact stager command executed by the VBE script:
            </p>

            {/* Screenshots 4 & 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
                <Image
                  src="/images/horus_ra/q3_powershell_evtx.png"
                  alt="Windows PowerShell.evtx in Event Viewer"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black">
                <Image
                  src="/images/horus_ra/q3_event_id_400_stager.png"
                  alt="Event ID 400 HostApplication stager command"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-zinc-800 mb-4">
              <div className="bg-zinc-900/80 px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>PowerShell Stager-1 Command</span>
                <CopyButton text={psStagerCmd} />
              </div>
              <pre className="p-4 text-xs font-mono bg-black/80 text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all">
                {psStagerCmd}
              </pre>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong>Deobfuscation Rationale:</strong> The command retrieves the registry string <code className="text-zinc-200 font-mono">HKCU:\Software\esBbIgyFlZcXjUl\s</code>, reverses its characters (<code className="text-zinc-200 font-mono">$_[-1..-($_.Length)]</code>), decodes the resulting Base64 string into raw .NET assembly bytes, and loads it straight into volatile memory via <code className="text-cyan-300 font-mono">[AppDomain]::CurrentDomain.Load(...)</code>.
            </p>
          </div>

          {/* Q4 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q4</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Stager-1 Executable: SHA-256 Hash Recovery
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What is the SHA-256 hash of the first-stage executable, which serves as the entry point for the execution of stage two?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Opening the user hive <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">C:\Users\Administrator\NTUSER.DAT</code> in <strong>Registry Explorer</strong>, we navigate to:
            </p>
            <div className="bg-black/50 border border-zinc-800 p-3 rounded-xl mb-4 font-mono text-xs text-cyan-400">
              HKCU\Software\esBbIgyFlZcXjUl
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              We extract the string stored inside the value named <code className="text-yellow-300 font-mono text-xs">s</code>. Reversing the character order and passing the string through <strong>CyberChef</strong> (<code className="text-zinc-300 font-mono text-xs">Reverse → From Base64</code>) recovers the raw Windows PE binary (<code className="text-zinc-300 font-mono text-xs">Stager-1.exe</code>).
            </p>
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-zinc-400">SHA-256 (Q4):</span>
              <code className="text-xs font-mono text-emerald-400 font-bold select-all">
                7a8e7a884237f556ed5a0a3f81c76487df4cfe05d205f107e2bd0f6ff1b63965
              </code>
            </div>
          </div>

          {/* Q5 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q5</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Process Injection Target (Stager-2)
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: Stager-2 initially constructs potential file paths to launch a process and perform code injection. What process will be spawned to deliver the injected code?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Examining the other registry values under <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">HKCU\Software\esBbIgyFlZcXjUl</code>, the value named <code className="text-yellow-300 font-mono text-xs">i</code> (denoting injection target) explicitly defines the Microsoft .NET surrogate process to be hollowed out:
            </p>
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">ANSWER (Q5):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">AddInProcess32.exe</code>
            </div>
          </div>

          {/* Q6 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q6</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Geofencing: Literal String Verification
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: In the second-stage routine, the malware verifies the system’s country/language before downloading an additional payload. What literal string does it check for?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              The value named <code className="text-yellow-300 font-mono text-xs">r</code> in the same registry key contains the second-stage executable in reversed format. After inverting the byte stream and saving it as <code className="text-zinc-200 font-mono text-xs">Stager-2.exe</code>, we decompile the .NET assembly in <strong>dnSpy</strong>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              In the execution routine, the malware queries <code className="text-cyan-300 font-mono text-xs">InputLanguage.CurrentInputLanguage.TwoLetterISOLanguageName</code> (checking for <code className="text-zinc-200 font-mono text-xs">&quot;fr&quot;</code>) and verifies that geolocation telemetry contains the literal string:
            </p>
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">LITERAL STRING (Q6):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">France</code>
            </div>
          </div>

          {/* Q7 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q7</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Threat Intelligence: Malware Distribution Service
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What is the name of the malware distribution service responsible for this campaign?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              In Stager-2, once the France geolocation check passes, the malware attempts to download secondary payload staging files from <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">144.91.92.251/MoDi.txt</code>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Correlating this C2 indicator (<code className="text-zinc-300 font-mono text-xs">144.91.92.251</code>) and the infection chain (VBE script → Registry Stager → France Geofencing → MoDiRAT) against cybersecurity threat intelligence reports from SonicWall and Seqrite reveals the distribution infrastructure:
            </p>
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">DISTRIBUTION SERVICE (Q7):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">Horus Protector</code>
            </div>
          </div>

          {/* Q8 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q8</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Final Payload: Registry Reassembly & Credential Harvester Class
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: In the final payload stage, what class handles credential theft from browsers and mail applications?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Navigating to the registry subkey <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">HKCU\Software\esBbIgyFlZcXjUl\donn</code>, the threat actor fragmented the final compiled payload across 8 chunks: <code className="text-zinc-200 font-mono text-xs">segment1</code> through <code className="text-zinc-200 font-mono text-xs">segment8</code>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Rather than manually copying and converting 8 hex values, we can write an automated Python script leveraging <code className="text-cyan-300 font-mono text-xs">python-registry</code> to extract all chunks directly from <code className="text-zinc-200 font-mono text-xs">NTUSER.DAT</code>, reverse the hex payload, and parse the resulting .NET metadata dynamically using <code className="text-cyan-300 font-mono text-xs">dnfile</code>:
            </p>

            <div className="relative rounded-xl overflow-hidden border border-zinc-800 mb-4">
              <div className="bg-zinc-900/80 px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>reassemble_donn.py (.NET Metadata Parser)</span>
                <CopyButton text={pythonReassembleScript} />
              </div>
              <pre className="p-4 text-xs font-mono bg-black/80 text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                {pythonReassembleScript}
              </pre>
            </div>

            <div className="bg-black/50 border border-zinc-800 p-3 rounded-xl mb-4 font-mono text-xs text-emerald-400">
              <pre className="whitespace-pre-wrap">{pythonReassembleOutput}</pre>
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">CREDENTIAL STEALER CLASS (Q8):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">COVIDPickers</code>
            </div>
          </div>

          {/* Q9 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q9</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Persistence Mechanism: Malicious Scheduled Task File
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What is the full path of the malicious file that maintains persistent access for the attacker?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Inspecting Windows Scheduled Tasks under <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">C:\Windows\System32\Tasks\</code>, we identify a rogue task named <code className="text-yellow-300 font-mono text-xs">esBbIgyFlZcXjUl</code>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Parsing the XML task definition reveals the target file executed at user logon to maintain persistence:
            </p>

            {/* Screenshot 6 */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 mb-4 bg-black">
              <Image
                src="/images/horus_ra/q9_scheduled_task_vbs.png"
                alt="Scheduled task XML definition pointing to esBbIgyFlZcXjUl.vbs"
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-zinc-400">PERSISTENCE PATH (Q9):</span>
              <code className="text-xs font-mono text-emerald-400 font-bold select-all">
                C:\Users\Administrator\AppData\Roaming\esBbIgyFlZcXjUl.vbs
              </code>
            </div>
          </div>

          {/* Q10 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q10</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                PCAP Analysis: Data Exfiltration C2 Endpoint
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What destination IP address and port number did the attacker use to initiate data exfiltration?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Switching from disk triage to network traffic analysis, we open <code className="text-cyan-300 font-mono text-xs bg-black/40 px-1.5 py-0.5 rounded">Outbound-Traffic.pcap</code> in <strong>Wireshark</strong>.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Filtering for external TCP connections reveals continuous non-standard outbound traffic establishing connections to port 2025:
            </p>

            {/* Screenshot 7 */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 mb-4 bg-black">
              <Image
                src="/images/horus_ra/q10_pcap_tcp_stream.png"
                alt="Wireshark TCP conversation showing connection to 144.91.92.251:2025"
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">C2 ENDPOINT (Q10):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">144.91.92.251:2025</code>
            </div>
          </div>

          {/* Q11 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q11</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                RAT Identification: MoDi RAT Version & PDB Carving
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What RAT name and version were used during the campaign?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Performing a <strong>Follow TCP Stream</strong> on the outbound session to port 2025 reveals the staging handshake protocol:
            </p>
            <div className="bg-black/50 border border-zinc-800 p-3 rounded-xl mb-4 font-mono text-xs text-purple-300 break-all">
              plugin||Startup.Class1||TVqQAAMAAAAEAAAA//8AALgAAAAAAAA...
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Decoding the Base64 payload (<code className="text-zinc-200 font-mono text-xs">Startup.dll</code>) in CyberChef and inspecting the embedded debug directory strings reveals the developer’s local PDB symbol path:
            </p>
            <div className="bg-black/50 border border-zinc-800 p-3 rounded-xl mb-4 font-mono text-xs text-emerald-400 break-all">
              C:\Users\Administrator\Desktop\Files\MoDi RAT V0.1 Build1\Cleint\Startup\obj\Debug\Startup.pdb
            </div>

            {/* Screenshot 8 */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 mb-4 bg-black">
              <Image
                src="/images/horus_ra/q11_pcap_modirat_stream.png"
                alt="Wireshark TCP stream following showing plugin Base64 data and Startup.pdb"
                fill
                className="object-contain"
              />
            </div>

            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">RAT IDENTITY (Q11):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">MoDi RAT V0.1</code>
            </div>
          </div>

          {/* Q12 */}
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Q12</span>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)]">
                Exfiltration Attribution: Attacker Operator Tag
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-400 mb-4">
              <em>Question: What operator tag is consistently appended to the metadata of each exfiltration request?</em>
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Examining the subsequent telemetry and beaconing packets within the stream, every exfiltrated credential bundle and client heartbeat prepends a static operator campaign identifier:
            </p>
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">OPERATOR TAG (Q12):</span>
              <code className="text-sm font-mono text-emerald-400 font-bold">Boss2019</code>
            </div>
          </div>

        </div>

        {/* Final Flag Showcase */}
        <section className="mt-14 mb-16 bg-gradient-to-br from-emerald-950/40 via-[#0e0e13] to-black border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase">
                Challenge Complete • Official Flag Captured
              </h3>
              <p className="text-xs font-mono text-emerald-400">
                All 12 investigation milestones resolved successfully.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-emerald-500/30 bg-black/80 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <code className="text-base sm:text-xl font-mono text-emerald-300 font-bold select-all break-all">
              {flagText}
            </code>
            <CopyButton text={flagText} />
          </div>
        </section>

        {/* Key Forensic Lessons */}
        <section className="mb-16 border-t border-zinc-800/80 pt-10">
          <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider mb-6">
            Incident Responder Key Takeaways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl">
              <span className="text-cyan-400 font-bold block mb-1.5">1. Fileless .NET In-Memory Loading</span>
              <p className="text-zinc-400 leading-relaxed">
                Adversaries avoid disk-based detection by storing reversed Base64 strings in arbitrary registry keys (HKCU) and invoking <code className="text-zinc-200">[AppDomain]::CurrentDomain.Load()</code>. Always inspect PowerShell Event ID 400 and ScriptBlock logs (ID 4104).
              </p>
            </div>
            <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl">
              <span className="text-purple-400 font-bold block mb-1.5">2. Multi-Segment Registry Payloads</span>
              <p className="text-zinc-400 leading-relaxed">
                By splitting payloads into segments (<code className="text-zinc-200">segment1..segment8</code>), malware bypasses static size heuristics. Using Python scripts with <code className="text-zinc-200">Registry</code> and <code className="text-zinc-200">dnfile</code> allows automated reconstruction without relying on manual copy-pasting.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
