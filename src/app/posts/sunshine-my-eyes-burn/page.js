import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "my eyes burn: MSKLC Dead Key Finite State Machine Forensics | SunshineCTF 2026",
  description: "Reverse engineering a Microsoft Keyboard Layout Creator (.klc) file in SunshineCTF. Analyzing dead key chaining and state transitions from scancode 29 to Unicode U+2600 (Black Sun With Rays) to extract the flag.",
};

export default function MyEyesBurnWriteup() {
  const klcLayoutSnippet = `LAYOUT

// Key Scancode, VirtualKey, CapsLock, State 0 (Normal), State 1 (Shift)
29\tOEM_3\t0\t0060@\t007e\t-1`;

  const deadKeySnippet = `DEADKEY\t0060
0073\t02d0@

DEADKEY\t02d0
0075\t02ed@
...
DEADKEY\t02b0
007d\t2600`;

  const pythonSolverScript = `import re

with open('boardwriter.klc', 'r', encoding='utf-16le', errors='ignore') as f:
    content = f.read()

# Parse all DEADKEY definitions
# DEADKEY <state> \\n <char_hex> \\t <next_state_or_output>
deadkey_blocks = re.findall(r'DEADKEY\\s+([0-9a-fA-F]+)\\s*\\n([0-9a-fA-F]+)\\s+([0-9a-fA-F]+@?)', content)

transitions = {}
for state, in_char_hex, next_state in deadkey_blocks:
    transitions[state.lower()] = (int(in_char_hex, 16), next_state.lower())

# Trace from initial dead key 0060 until terminal output 2600 (Sun symbol)
current_state = '0060'
flag_chars = []

while True:
    if current_state not in transitions:
        break
    in_code, next_target = transitions[current_state]
    flag_chars.append(chr(in_code))
    
    if next_target == '2600':
        print(f"[+] Reached Sun Symbol (U+2600)! Flag: {''.join(flag_chars)}")
        break
    current_state = next_target.rstrip('@')`;

  const transitions = [
    { step: 1, current: "0060", hex: "0x0073", char: "s", next: "02d0@" },
    { step: 2, current: "02d0", hex: "0x0075", char: "u", next: "02ed@" },
    { step: 3, current: "02ed", hex: "0x006e", char: "n", next: "02b4@" },
    { step: 4, current: "02b4", hex: "0x007b", char: "{", next: "02ef@" },
    { step: 5, current: "02ef", hex: "0x0070", char: "p", next: "02ba@" },
    { step: 6, current: "02ba", hex: "0x0072", char: "r", next: "02c9@" },
    { step: 7, current: "02c9", hex: "0x0061", char: "a", next: "02d3@" },
    { step: 8, current: "02d3", hex: "0x0069", char: "i", next: "02e9@" },
    { step: 9, current: "02e9", hex: "0x0073", char: "s", next: "02bd@" },
    { step: 10, current: "02bd", hex: "0x0065", char: "e", next: "02cd@" },
    { step: 11, current: "02cd", hex: "0x0074", char: "t", next: "02e4@" },
    { step: 12, current: "02e4", hex: "0x0068", char: "h", next: "02d8@" },
    { step: 13, current: "02d8", hex: "0x0065", char: "e", next: "02ee@" },
    { step: 14, current: "02ee", hex: "0x0073", char: "s", next: "02d4@" },
    { step: 15, current: "02d4", hex: "0x0075", char: "u", next: "02e1@" },
    { step: 16, current: "02e1", hex: "0x006e", char: "n", next: "02b0@" },
    { step: 17, current: "02b0", hex: "0x007d", char: "}", next: "2600 (☀)" },
  ];

  const flagText = "sun{praisethesun}";

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
              SUNSHINECTF 2026 • FILE FORENSICS • FINITE STATE AUTOMATA
              <span className="animate-blink inline-block w-1.5 h-3 bg-amber-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            my eyes burn: MSKLC Dead Key Finite State Machine
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>4 min read</span>
            <span>•</span>
            <span className="text-amber-400">SunshineCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TARGET FILE</span>
              <span className="text-white font-bold">boardwriter.klc</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TRIGGER KEY</span>
              <span className="text-amber-400 font-bold">OEM_3 (0060@)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">TERMINAL SYMBOL</span>
              <span className="text-amber-400 font-bold">U+2600 (☀)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-4 rounded-xl">
              <span className="text-zinc-500 block mb-1">FLAG</span>
              <span className="text-emerald-400 font-bold">sun&#123;praisethesun&#125;</span>
            </div>
          </div>
        </header>

        {/* Section 1: Challenge Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-amber-400">01.</span> Challenge Overview
          </h2>
          <div className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-xl p-6 mb-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              We are given a single file named <code className="bg-zinc-800/80 text-amber-300 px-2 py-0.5 rounded text-sm font-mono">boardwriter.klc</code> with the following description:
            </p>
            <blockquote className="border-l-2 border-amber-500/60 pl-4 py-1 italic text-zinc-400 font-mono text-sm bg-black/40 rounded-r">
              &quot;anon hasn&apos;t been outside in years, so he put the sun in his keyboard. find the flag he types to bring it out.&quot;
            </blockquote>
            <p className="text-zinc-300 leading-relaxed mt-4">
              The file extension indicates a <strong className="text-white">Microsoft Keyboard Layout Creator (.klc)</strong> source configuration file. The prompt indicates that typing a specific keystroke sequence produces a &quot;sun&quot; glyph.
            </p>
          </div>
        </section>

        {/* Section 2: Structure & Dead Key Mechanics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-amber-400">02.</span> Dead Key Chaining Mechanics
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Opening <code className="bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono">boardwriter.klc</code> (encoded in UTF-16LE), two sections immediately explain how input handling has been customized:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                <span className="text-amber-400">#1</span> The Dead Key Trigger in LAYOUT
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                In the main key mapping table, scancode <code className="text-amber-300 font-mono">29</code> (the backtick/tilde key <code className="text-zinc-200 font-mono">` / ~</code>) is mapped to <code className="text-amber-300 font-mono">0060@</code>.
              </p>
              <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>boardwriter.klc — LAYOUT SECTION</span>
                </div>
                <pre className="p-4 font-mono text-xs md:text-sm text-amber-300 overflow-x-auto">
                  <code>{klcLayoutSnippet}</code>
                </pre>
              </div>
              <p className="text-zinc-400 text-xs mt-2">
                In MSKLC syntax, an appended <code className="text-amber-400 font-bold">@</code> signifies that the keypress enters a <strong>Dead Key state</strong> rather than emitting a printable character.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
                <span className="text-amber-400">#2</span> The DEADKEY State Machine
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Normally, dead keys compose accented characters (e.g. <code className="text-zinc-200 font-mono">´</code> + <code className="text-zinc-200 font-mono">e</code> &rarr; <code className="text-zinc-200 font-mono">é</code>). But MSKLC allows a dead key transition to point to <em>another dead key</em> by appending <code className="text-amber-400 font-bold">@</code> to the output code point:
              </p>
              <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>boardwriter.klc — RECURSIVE DEADKEY BLOCKS</span>
                </div>
                <pre className="p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto">
                  <code>{deadKeySnippet}</code>
                </pre>
              </div>
              <p className="text-zinc-400 text-xs mt-2">
                This chaining constructs a strict finite state machine. The chain culminates when input <code className="text-amber-300 font-mono">007d</code> (<code className="text-white font-mono">&#125;</code>) in state <code className="text-amber-300 font-mono">02b0</code> produces Unicode point <code className="text-amber-400 font-bold font-mono">U+2600</code>: <strong className="text-amber-300 text-base">☀ (BLACK SUN WITH RAYS)</strong>!
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Transition Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-amber-400">03.</span> State Machine Execution Trace
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Following the state transitions step-by-step from initial trigger <code className="bg-zinc-800/80 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono">0060</code> until termination at <code className="bg-zinc-800/80 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono">U+2600</code> reveals the exact sequence of typed keys:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden shadow-xl mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400">
                    <th className="p-3 text-center">STEP</th>
                    <th className="p-3">CURRENT DEAD KEY</th>
                    <th className="p-3">INPUT HEX</th>
                    <th className="p-3 text-center">INPUT CHAR</th>
                    <th className="p-3">NEXT STATE / OUTPUT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {transitions.map((row) => (
                    <tr key={row.step} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="p-3 text-center text-zinc-500 font-bold">{row.step}</td>
                      <td className="p-3 text-zinc-300 font-semibold">{row.current}</td>
                      <td className="p-3 text-amber-400/90">{row.hex}</td>
                      <td className="p-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                          {row.char}
                        </span>
                      </td>
                      <td className={`p-3 font-semibold ${row.step === 17 ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
                        {row.next}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Python Solver Automation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white font-[family-name:var(--font-share-tech)] flex items-center gap-3">
            <span className="text-amber-400">04.</span> Automated Parsing Script
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Instead of manually clicking through 17 nested blocks, we can parse and walk the layout graph programmatically using Python:
          </p>

          <div className="bg-[#050508] border border-zinc-800 rounded-xl overflow-hidden mb-6">
            <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>SOLVE_DEADKEYS.PY</span>
              <CopyButton text={pythonSolverScript} />
            </div>
            <pre className="p-4 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto">
              <code>{pythonSolverScript}</code>
            </pre>
          </div>
        </section>

        {/* Flag Section */}
        <section className="border-t border-zinc-800 pt-10">
          <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900/60 to-amber-950/40 border border-amber-500/40 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
            <h3 className="font-mono text-xs text-amber-400 uppercase tracking-[0.3em] mb-3">
              FLAG CAPTURED
            </h3>
            <div className="inline-flex items-center gap-3 bg-black/60 border border-amber-500/50 px-5 py-3 rounded-xl max-w-full">
              <code className="font-mono text-base md:text-xl text-amber-300 font-bold break-all">
                {flagText}
              </code>
              <CopyButton text={flagText} />
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
