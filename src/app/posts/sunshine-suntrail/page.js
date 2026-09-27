import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "suntrail: MSKLC Keyboard Layout Snake Trail Walkthrough | SunshineCTF 2026",
  description: "Reverse engineering a Microsoft Keyboard Layout Creator (.klc) file in SunshineCTF. Decoding Shift State 0 directional arrows and Shift State 1 hidden hex chars to trace a snake path across staggered QWERTY keyboard keys.",
};

export default function SuntrailWriteup() {
  const klcSnippet = `LAYOUT

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

  const flagText = "sun{qwerty_sucks}";

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-amber-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.3em]">
              SUNSHINECTF 2026 • FILE FORENSICS • KEYBOARD LAYOUTS
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            suntrail: MSKLC Keyboard Layout Snake Trail Walkthrough
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>6 min read</span>
            <span>•</span>
            <span className="text-amber-400">437 PTS</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET FILE</span>
              <span className="text-white font-bold">suntrail.klc</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FORMAT</span>
              <span className="text-amber-400 font-bold">MSKLC Config</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">ENCODING</span>
              <span className="text-cyan-400 font-bold">Unicode UTF-16LE</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">sun&#123;qwerty_su...&#125;</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-amber-400">01.</span> Initial Reconnaissance &amp; Format Triage
            </h2>
            <p className="mb-4">
              We were provided with a single file named <code className="text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20">suntrail.klc</code>. The challenge description: <em>&ldquo;im lost, but you can find the way!&rdquo;</em> paired with the hint pointing to <strong>Microsoft Keyboard Layout Creator</strong> (MSKLC).
            </p>
            <p className="mb-4">
              A <code className="text-zinc-200">.klc</code> file is a plain-text configuration file specifying scan codes, virtual keys, and shift states.
            </p>
            <div className="relative">
              <CopyButton text={klcSnippet} />
              <pre className="p-4 rounded-xl bg-[#0e0e13] border border-zinc-800 font-mono text-xs overflow-x-auto text-zinc-300">
                {klcSnippet}
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-amber-400">02.</span> Decoding the Two Shift State Columns
            </h2>
            <p className="mb-4">
              In MSKLC syntax, column 4 represents <strong>Shift State 0 (Default)</strong>, and column 5 represents <strong>Shift State 1 (Shifted)</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400 mb-6">
              <li>
                <strong className="text-zinc-200">Shift State 0 (Arrows):</strong>
                <code className="text-amber-300 ml-2">2198</code> (&searr; Down-Right),
                <code className="text-amber-300 ml-2">2192</code> (&rarr; Right),
                <code className="text-amber-300 ml-2">2196</code> (&nwarr; Up-Left),
                <code className="text-amber-300 ml-2">25a0</code> (&block; Stop).
              </li>
              <li>
                <strong className="text-zinc-200">Shift State 1 (Hidden ASCII):</strong>
                Hex characters directly representing ASCII text starting with <code className="text-emerald-400">0x0073 (&apos;s&apos;)</code>, <code className="text-emerald-400">0x0075 (&apos;u&apos;)</code>, <code className="text-emerald-400">0x006e (&apos;n&apos;)</code>, <code className="text-emerald-400">0x007b (&apos;&#123;&apos;)</code>...
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4 flex items-center gap-3">
              <span className="text-amber-400">03.</span> Following the Keyboard Snake Trail
            </h2>
            <p className="mb-4">
              Because standard QWERTY keyboard rows are mechanically staggered:
            </p>
            <div className="bg-[#0e0e13] border border-zinc-800 p-4 rounded-xl font-mono text-xs text-zinc-300 mb-6">
              Row 0: [Q] [W] [E] [R] [T]<br />
              Row 1:  [A] [S] [D] [F] [G] [H]<br />
              Row 2:   [Z] [X] [C] [V] [B] [N]
            </div>
            <p className="mb-4">
              Moving &searr; from <strong>Q</strong> lands on <strong>A</strong>. Moving &searr; from <strong>A</strong> lands on <strong>Z</strong>. Moving &rarr; from <strong>Z</strong> lands on <strong>X</strong>... following this trail key-by-key until the stop marker at <strong>H</strong>:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm font-mono border-collapse border border-zinc-800 bg-[#0d0d12] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                    <th className="p-2.5">Step</th>
                    <th className="p-2.5">Key</th>
                    <th className="p-2.5">Direction</th>
                    <th className="p-2.5">Next Key</th>
                    <th className="p-2.5">Char Hex</th>
                    <th className="p-2.5">Char</th>
                    <th className="p-2.5">Running Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr><td className="p-2.5">1</td><td className="p-2.5 font-bold text-white">Q</td><td className="p-2.5">&searr; (2198)</td><td className="p-2.5">A</td><td className="p-2.5">0073</td><td className="p-2.5 text-emerald-400">s</td><td className="p-2.5">s</td></tr>
                  <tr><td className="p-2.5">2</td><td className="p-2.5 font-bold text-white">A</td><td className="p-2.5">&searr; (2198)</td><td className="p-2.5">Z</td><td className="p-2.5">0075</td><td className="p-2.5 text-emerald-400">u</td><td className="p-2.5">su</td></tr>
                  <tr><td className="p-2.5">3</td><td className="p-2.5 font-bold text-white">Z</td><td className="p-2.5">&rarr; (2192)</td><td className="p-2.5">X</td><td className="p-2.5">006e</td><td className="p-2.5 text-emerald-400">n</td><td className="p-2.5">sun</td></tr>
                  <tr><td className="p-2.5">4</td><td className="p-2.5 font-bold text-white">X</td><td className="p-2.5">&nwarr; (2196)</td><td className="p-2.5">S</td><td className="p-2.5">007b</td><td className="p-2.5 text-emerald-400">&#123;</td><td className="p-2.5">sun&#123;</td></tr>
                  <tr><td className="p-2.5">5</td><td className="p-2.5 font-bold text-white">S</td><td className="p-2.5">&nwarr; (2196)</td><td className="p-2.5">W</td><td className="p-2.5">0071</td><td className="p-2.5 text-emerald-400">q</td><td className="p-2.5">sun&#123;q</td></tr>
                  <tr><td className="p-2.5">6</td><td className="p-2.5 font-bold text-white">W</td><td className="p-2.5">&rarr; (2192)</td><td className="p-2.5">E</td><td className="p-2.5">0077</td><td className="p-2.5 text-emerald-400">w</td><td className="p-2.5">sun&#123;qw</td></tr>
                  <tr><td className="p-2.5">7</td><td className="p-2.5 font-bold text-white">E</td><td className="p-2.5">&searr; (2198)</td><td className="p-2.5">D</td><td className="p-2.5">0065</td><td className="p-2.5 text-emerald-400">e</td><td className="p-2.5">sun&#123;qwe</td></tr>
                  <tr><td className="p-2.5">8</td><td className="p-2.5 font-bold text-white">D</td><td className="p-2.5">&searr; (2198)</td><td className="p-2.5">C</td><td className="p-2.5">0072</td><td className="p-2.5 text-emerald-400">r</td><td className="p-2.5">sun&#123;qwer</td></tr>
                  <tr><td className="p-2.5">9</td><td className="p-2.5 font-bold text-white">C</td><td className="p-2.5">&rarr; (2192)</td><td className="p-2.5">V</td><td className="p-2.5">0074</td><td className="p-2.5 text-emerald-400">t</td><td className="p-2.5">sun&#123;qwert</td></tr>
                  <tr><td className="p-2.5">10</td><td className="p-2.5 font-bold text-white">V</td><td className="p-2.5">&nwarr; (2196)</td><td className="p-2.5">F</td><td className="p-2.5">0079</td><td className="p-2.5 text-emerald-400">y</td><td className="p-2.5">sun&#123;qwerty</td></tr>
                  <tr><td className="p-2.5">11</td><td className="p-2.5 font-bold text-white">F</td><td className="p-2.5">&nwarr; (2196)</td><td className="p-2.5">R</td><td className="p-2.5">005f</td><td className="p-2.5 text-emerald-400">_</td><td className="p-2.5">sun&#123;qwerty_</td></tr>
                  <tr><td className="p-2.5">12</td><td className="p-2.5 font-bold text-white">R</td><td className="p-2.5">&rarr; (2192)</td><td className="p-2.5">T</td><td className="p-2.5">0073</td><td className="p-2.5 text-emerald-400">s</td><td className="p-2.5">sun&#123;qwerty_s</td></tr>
                  <tr><td className="p-2.5">13</td><td className="p-2.5 font-bold text-white">T</td><td className="p-2.5">&searr; (2198)</td><td className="p-2.5">G</td><td className="p-2.5">0075</td><td className="p-2.5 text-emerald-400">u</td><td className="p-2.5">sun&#123;qwerty_su</td></tr>
                  <tr><td className="p-2.5">14</td><td className="p-2.5 font-bold text-white">G</td><td className="p-2.5">&searr; (2198)</td><td className="p-2.5">B</td><td className="p-2.5">0063</td><td className="p-2.5 text-emerald-400">c</td><td className="p-2.5">sun&#123;qwerty_suc</td></tr>
                  <tr><td className="p-2.5">15</td><td className="p-2.5 font-bold text-white">B</td><td className="p-2.5">&rarr; (2192)</td><td className="p-2.5">N</td><td className="p-2.5">006b</td><td className="p-2.5 text-emerald-400">k</td><td className="p-2.5">sun&#123;qwerty_suck</td></tr>
                  <tr><td className="p-2.5">16</td><td className="p-2.5 font-bold text-white">N</td><td className="p-2.5">&nwarr; (2196)</td><td className="p-2.5">H</td><td className="p-2.5">0073</td><td className="p-2.5 text-emerald-400">s</td><td className="p-2.5">sun&#123;qwerty_sucks</td></tr>
                  <tr><td className="p-2.5">17</td><td className="p-2.5 font-bold text-white">H</td><td className="p-2.5">&block; (25a0)</td><td className="p-2.5">Stop</td><td className="p-2.5">007d</td><td className="p-2.5 text-emerald-400">&#125;</td><td className="p-2.5">sun&#123;qwerty_sucks&#125;</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Flag Section */}
          <section className="pt-6 border-t border-zinc-800/80">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mb-4">
              04. Flag Recovery
            </h2>
            <div className="relative bg-[#0d1217] border border-emerald-500/40 rounded-xl p-5 shadow-[0_0_25px_rgba(16,185,129,0.15)] flex justify-between items-center">
              <span className="font-mono text-lg md:text-xl text-emerald-400 font-bold tracking-wider">
                {flagText}
              </span>
              <CopyButton text={flagText} />
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
