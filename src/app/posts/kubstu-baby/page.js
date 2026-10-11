import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Baby (WORKSTATION-23): Windows Triage & Persistence | KubSTU CTF 2026 Autumn",
  description: "Forensic investigation of a compromised workstation triage folder. Tracing downloaded malware execution via PSReadLine, discovering hidden C2 configs in ProgramData, and analyzing VBScript persistence in Startup.",
};

export default function KubstuBabyWriteup() {
  const psReadLineContent = `Get-ChildItem C:\\Users\\Alex\\Downloads
Start-Process C:\\Users\\Alex\\Downloads\\InvoiceViewer.exe
Get-Date
Get-Process OneDrive`;

  const agentStateContent = `[sync]
profile=onedrive-update
transport=tcp
endpoint=198.51.100.23:4444
last_status=connected
note=Documentation-only TEST-NET endpoint; no network activity is possible.`;

  const vbsContent = `' INERT TRAINING ARTIFACT — comments only; does not execute instructions.
' Claimed task name: OneDriveUpdate
' Intended target recorded in related state: %APPDATA%\\Microsoft\\OneDrive\\RuntimeBroker.exe
' The file is placed in the Startup directory to model persistence evidence.`;

  const flagText = `KubSTU{InvoiceViewer.exe|198.51.100.23:4444|OneDriveUpdate.vbs}`;

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        {/* Breadcrumb Pill */}
        <div className="mb-6 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-800 px-3 sm:px-4 py-1.5 rounded-full">
          <Link href="/ctfs" className="text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider">
            ← CTF HUB
          </Link>
          <span className="text-zinc-600 font-mono text-xs">/</span>
          <span className="font-mono text-xs text-white uppercase tracking-wider">
            KubSTU CTF 2026 Autumn // FORENSICS
          </span>
        </div>

        {/* Title Header */}
        <header className="mb-10 space-y-3 border-b border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
              ENDPOINT FORENSICS
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
              WORKSTATION-23
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
              WINDOWS ARTIFACTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-tight">
            Baby (WORKSTATION-23)
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Forensic analysis of a compromised Windows host triage image. We investigate downloaded payloads, find which executable was launched, locate the hidden C2 endpoint in application cache files, and extract the persistence script from the user Startup directory.
          </p>
        </header>

        {/* Challenge Summary Box */}
        <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-2xl p-6 mb-10 space-y-4">
          <h2 className="text-sm font-mono uppercase text-zinc-400 tracking-wider font-bold">
            Investigation Objective
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-black/50 border border-zinc-800/80 p-3 rounded-xl">
              <span className="text-zinc-500 block mb-1">Target Host</span>
              <span className="text-white font-bold">WORKSTATION-23</span>
            </div>
            <div className="bg-black/50 border border-zinc-800/80 p-3 rounded-xl">
              <span className="text-zinc-500 block mb-1">Target User</span>
              <span className="text-white font-bold">Alex</span>
            </div>
            <div className="bg-black/50 border border-zinc-800/80 p-3 rounded-xl">
              <span className="text-zinc-500 block mb-1">Flag Format</span>
              <span className="text-emerald-400 font-bold">KubSTU&#123;A|B|C&#125;</span>
            </div>
          </div>
        </div>

        {/* Question 1 */}
        <section className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 text-black font-bold font-mono text-xs px-2 py-0.5 rounded">
              Q1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
              What did the user download?
            </h2>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            First, open the Downloads folder:
          </p>
          <div className="bg-black/80 border border-zinc-800 p-3 rounded-xl font-mono text-xs text-zinc-300">
            C:\CTFS\KubSTU CTF 2026 Autumn\Baby\WORKSTATION-23\C\Users\Alex\Downloads
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Inside the directory, there are three files:
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-zinc-400 font-mono space-y-1">
            <li><code className="text-zinc-200">InvoiceViewer.exe</code> (280 bytes)</li>
            <li><code className="text-zinc-200">Invoice_April.pdf</code> (127 bytes)</li>
            <li><code className="text-zinc-200">ZoomInstaller.exe</code> (146 bytes)</li>
          </ul>

          <p className="text-zinc-300 text-sm leading-relaxed">
            To know which one was actually executed, check the PowerShell command history in:
          </p>
          <div className="bg-black/80 border border-zinc-800 p-3 rounded-xl font-mono text-xs text-zinc-300">
            C:\CTFS\KubSTU CTF 2026 Autumn\Baby\WORKSTATION-23\C\Users\Alex\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm">
            Opening <code className="text-zinc-200 font-mono">ConsoleHost_history.txt</code> reveals the exact commands typed by the user:
          </p>
          <pre className="bg-[#0b0b10] border border-zinc-800 p-4 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
{psReadLineContent}
          </pre>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            We can also confirm the download URL in Chrome history (<code className="text-zinc-300 font-mono">Users\Alex\AppData\Local\Google\Chrome\User Data\Default\History</code>):
          </p>
          <div className="bg-black/60 border border-zinc-800 p-3 rounded-xl font-mono text-xs text-zinc-400">
            http://198.51.100.23:8080/InvoiceViewer.exe
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-xs font-mono text-emerald-300 flex justify-between items-center">
            <span>ANSWER 1:</span>
            <strong className="text-white text-sm">InvoiceViewer.exe</strong>
          </div>
        </section>

        {/* Question 2 */}
        <section className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 text-black font-bold font-mono text-xs px-2 py-0.5 rounded">
              Q2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
              What is the address of the C2 server? (including the port)
            </h2>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            The URL found in Chrome history (<code className="text-zinc-200 font-mono">http://198.51.100.23:8080/InvoiceViewer.exe</code>) is only the download server, not the command-and-control connection.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            To find the real C2 server endpoint, check the agent state cache located at:
          </p>
          <div className="bg-black/80 border border-zinc-800 p-3 rounded-xl font-mono text-xs text-zinc-300">
            C:\CTFS\KubSTU CTF 2026 Autumn\Baby\WORKSTATION-23\C\ProgramData\.cache\agent_state.dat
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm">
            Opening <code className="text-zinc-200 font-mono">agent_state.dat</code> gives the configuration:
          </p>
          <pre className="bg-[#0b0b10] border border-zinc-800 p-4 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
{agentStateContent}
          </pre>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            The sync profile uses TCP transport to communicate with the endpoint at <code className="text-white font-mono">198.51.100.23:4444</code>.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-xs font-mono text-emerald-300 flex justify-between items-center">
            <span>ANSWER 2:</span>
            <strong className="text-white text-sm">198.51.100.23:4444</strong>
          </div>
        </section>

        {/* Question 3 */}
        <section className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 text-black font-bold font-mono text-xs px-2 py-0.5 rounded">
              Q3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)]">
              What software was used to implement the persistence mechanism?
            </h2>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            To check persistence, look in the user&apos;s Startup folder:
          </p>
          <div className="bg-black/80 border border-zinc-800 p-3 rounded-xl font-mono text-xs text-zinc-300">
            C:\CTFS\KubSTU CTF 2026 Autumn\Baby\WORKSTATION-23\C\Users\Alex\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Inside the Startup folder, there is a script named <code className="text-white font-mono">OneDriveUpdate.vbs</code>.
          </p>
          <pre className="bg-[#0b0b10] border border-zinc-800 p-4 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
{vbsContent}
          </pre>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            The VBScript file placed directly in the Startup directory is what triggers the payload on user login.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-xs font-mono text-emerald-300 flex justify-between items-center">
            <span>ANSWER 3:</span>
            <strong className="text-white text-sm">OneDriveUpdate.vbs</strong>
          </div>
        </section>

        {/* Final Flag Section */}
        <section className="mt-12 p-6 sm:p-8 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              FLAG SUBMISSION
            </span>
            <span className="text-xs font-mono text-zinc-500">KubSTU&#123;Q1|Q2|Q3&#125;</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-black border border-zinc-800 p-4 rounded-xl">
            <code className="text-sm sm:text-base font-mono text-emerald-300 font-bold break-all">
              {flagText}
            </code>
            <CopyButton text={flagText} />
          </div>
        </section>
      </main>
    </div>
  );
}
