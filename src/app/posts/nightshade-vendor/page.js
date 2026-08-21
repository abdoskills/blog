import Image from "next/image";
import Link from "next/link";

export default function NightshadeVendorWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-green-500/30 selection:text-green-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ascwg" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to ASCWG Hub
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-green-400 uppercase tracking-[0.3em]">
              OSINT • Blockchain Tracing
              <span className="animate-blink inline-block w-1.5 h-3 bg-green-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            NightShade Vendor: CoinJoin De-Anonymization
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/nightshade_vendor.jpg" 
                alt="Nightshade Vendor Trace"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            Following stolen cryptocurrency isn&apos;t just "clicking the next address" on a block explorer. A competent launderer splits the pot dozens of ways, sends decoy value in every direction, and finally pushes the remainder through a crypto mixer. 
          </p>
          <p>
            This lab focuses on tracing illicit funds from a dark web vendor alias ("NightShade"). We utilized a deterministic peel-chain methodology known as the <strong>TRACE-7 Protocol</strong> to track the primary stolen pot, cut through the noise, and de-anonymize the threat actor.
          </p>

          <p>
            By tracking all identical outputs from the CoinJoin and finding the specific transaction that consumed the greatest number of them, we proved that those distinct mixed outputs shared a single owner. The vendor collapsed their own anonymity set via multi-input clustering, completely defeating the mixer and allowing us to extract the final identification flag.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* TRACE-7 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1 & 2: The Peel-Chain Walk
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              When a criminal steals $100,000, they rarely spend it all at once. They will send $99,000 to a new wallet, and spend $1,000 on a fake ID. Then they send $98,000 to another wallet, and spend $1,000 on server hosting. This leaves a trail of "peels" (the small spends) and the "pot" (the main bulk of money moving forward). In blockchain tracing, we ignore the peels and relentlessly follow the biggest pot.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How do we separate the "peel" from the "pot"?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Always follow the output with the greatest integer value.</code></p>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Esplora API Automation ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <p className="mb-4 mt-4">Manual clicking through block explorers fails against highly active wallets. We automated the TRACE-7 walk using a Python script interacting with the Esplora REST API:</p>
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Paginate through the entry address history using <code className="text-pink-400">/api/address/&#123;addr&#125;/txs/chain</code>.</li>
                <li>Find the transaction that drains the most satoshis from the target.</li>
                <li>Recursively fetch the <code className="text-pink-400">/api/tx/&#123;txid&#125;/outspends</code> to trace the maximum output value forward automatically.</li>
              </ol>
            </div>
          </details>

          {/* MIX DETECTION */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 3: CoinJoin De-Anonymization
          </h3>

          <p>
            Eventually, the target transaction entered a{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                CoinJoin
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A collaborative Bitcoin transaction where multiple users mix their funds into identical outputs, obscuring ownership.
              </span>
            </span>
            . The mix was identified mathematically by finding $\ge 5$ inputs and $\ge 5$ identical outputs (the denomination <code className="text-pink-400 bg-pink-400/10 px-1 rounded">d</code>). 
          </p>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A CoinJoin is like 10 people throwing identical $100 bills onto a table, shuffling them around, and each taking one back. If you tracked a criminal&apos;s $100 bill to that table, you have no idea which of the 10 bills he walked away with. <br/><br/>
              But... what if the criminal walked away with <em>two</em> of those $100 bills, and went to buy a $200 TV with them? By spending them together, the criminal just proved to the whole world that those two specific bills belong to the exact same person. The disguise is ruined!
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><strong>The Fatal Operational Security Flaw</strong></p>
            <p className="text-zinc-300">
              A Bitcoin transaction can only be cryptographically signed by the party holding the private keys to <em>all</em> of its inputs. The NightShade vendor subsequently spent multiple identical outputs from the CoinJoin within a single consolidation transaction.
            </p>
          </div>

          <p>
            By tracking all identical outputs from the CoinJoin and finding the specific transaction that consumed the greatest number of them, we proved that those distinct mixed outputs shared a single owner. The vendor collapsed their own anonymity set via multi-input clustering, completely defeating the mixer and allowing us to extract the final identification flag.
          </p>

          <hr className="border-zinc-800 my-12" />

          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Constructing the Final Flag
          </h3>
          
          <p className="mb-6">
            The challenge required us to collect six evidence tokens (T1–T6) across our investigation—including the number of exchanges used, the true identity of the vendor, and the Peel-Chain metrics. To retrieve the final flag, we concatenated all six tokens sequentially and generated a SHA-256 hash.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">Token Concatenation: <code className="text-pink-300">T1 + T2 + T3 + T4 + T5 + T6</code></p>
            <p className="text-zinc-400 mb-2">Hash Algorithm: <code className="text-pink-300">SHA-256</code></p>
            <p className="text-zinc-400 mb-4">Format: <code className="text-pink-300">First 32 hex characters of the digest</code></p>
            
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;eed6ca7d462ef13d0f2ed13b1f7510fd&#125;
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}
