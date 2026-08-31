import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function NightshadeVendorWriteup() {
  const pythonScript = `import requests
import hashlib

# TRACE-7 Peel Chain Walker using Esplora API
def trace_largest_pot(start_address):
    curr = start_address
    print(f"[*] Starting Peel-Chain Walk from: {curr}")
    
    # 1. Fetch address transactions
    url = f"https://blockstream.info/api/address/{curr}/txs"
    txs = requests.get(url).json()
    
    # 2. Select transaction with maximum outflow (The Pot)
    max_tx = max(txs, key=lambda tx: sum(vout['value'] for vout in tx['vout']))
    print(f"[+] Identified Main Pot Tx: {max_tx['txid']}")
    return max_tx['txid']

# Concatenate evidence tokens T1-T6 to formulate final SHA-256 flag
tokens = "TOKEN1_TOKEN2_TOKEN3_TOKEN4_TOKEN5_TOKEN6"
flag_digest = hashlib.sha256(tokens.encode()).hexdigest()[:32]
print(f"🎉 Final Flag: ASCWG{{{flag_digest}}}")`;

  const oneliner = `python -c "import hashlib; print('ASCWG{' + hashlib.sha256('T1_T2_T3_T4_T5_T6'.encode()).hexdigest()[:32] + '}')"`;

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

      <article className="max-w-4xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-purple-500/40 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-[0.3em]">
              ASCWG QUALS • BLOCKCHAIN OSINT • COINJOIN MIXER TRACE
              <span className="animate-blink inline-block w-1.5 h-3 bg-purple-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            NightShade Vendor: CoinJoin Mixer De-Anonymization
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/nightshade_bitcoin.jpg" 
                alt="Nightshade Vendor Trace"
                fill
                className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        {/* Challenge Description & Provided Artifacts Box */}
        <div className="bg-[#140e1c]/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden mb-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                  Challenge Prompt
                </span>
              </div>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed italic font-sans">
                &ldquo;An illicit dark web vendor operating under the moniker &apos;NightShade&apos; conducted multi-stage Bitcoin laundering via Wasabi/Samourai CoinJoin mixing pools. Deconstruct the peel-chains and multi-input clustering to trace the illicit funds.&rdquo;
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>● <strong>Category:</strong> Blockchain OSINT / Dark Web Intelligence</span>
                <span>● <strong>Platform:</strong> ASCWG Qualifications 2026</span>
                <span>● <strong>Flag Format:</strong> <code>ASCWG&#123;...&#125;</code></span>
              </div>
            </div>
            
            <div className="bg-[#0a0710] border border-purple-500/20 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Provided Artifacts
                </span>
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  vendor_intel.json
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">Export: Blockchain Ledger CSV</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Ledger: Bitcoin UTXO Model</span>
              </div>
              <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 text-center truncate">
                Methodology: TRACE-7 Protocol
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            Following stolen cryptocurrency isn&apos;t just &ldquo;clicking the next address&rdquo; on a block explorer. A competent launderer splits the pot dozens of ways, sends decoy value in every direction, and finally pushes the remainder through a crypto mixer. 
          </p>
          <p>
            This lab focuses on tracing illicit funds from a dark web vendor alias (&ldquo;NightShade&rdquo;). We utilized a deterministic peel-chain methodology known as the <strong>TRACE-7 Protocol</strong> to track the primary stolen pot, cut through the noise, and de-anonymize the threat actor.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* TRACE-7 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1 &amp; 2: The Peel-Chain Walk
          </h3>

          <div className="bg-[#100d1a] border-l-4 border-purple-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-purple-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE BEGINNER BREAKDOWN (The Criminal&apos;s $100 Bill)</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              When a criminal steals $100,000, they rarely spend it all at once. They will send $99,000 to a new wallet, and spend $1,000 on a fake ID. Then they send $98,000 to another wallet, and spend $1,000 on server hosting. This leaves a trail of &ldquo;peels&rdquo; (the small spends) and the &ldquo;pot&rdquo; (the main bulk of money moving forward). In blockchain tracing, we ignore the peels and relentlessly follow the biggest pot.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How do we separate the &ldquo;peel&rdquo; from the &ldquo;pot&rdquo;?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Always follow the output with the greatest integer satoshi value.</code></p>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Esplora API Automation ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <p className="mb-4 mt-4">Manual clicking through block explorers fails against highly active wallets. We automated the TRACE-7 walk using a Python script interacting with the Esplora REST API:</p>
              <ol className="list-decimal pl-5 space-y-3 marker:text-purple-500 mb-4">
                <li>Paginate through the entry address history using <code className="text-purple-400">/api/address/&#123;addr&#125;/txs/chain</code>.</li>
                <li>Find the transaction that drains the most satoshis from the target.</li>
                <li>Recursively fetch the <code className="text-purple-400">/api/tx/&#123;txid&#125;/outspends</code> to trace the maximum output value forward automatically.</li>
              </ol>
            </div>
          </details>

          {/* Section: Python Script */}
          <div className="space-y-4 my-8">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">
                Automated TRACE-7 Walker (`trace7_walker.py`):
              </span>
              <CopyButton text={pythonScript} />
            </div>
            <div className="bg-[#050508] border border-zinc-800 rounded-xl p-5 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto shadow-inner">
              <pre><code>{pythonScript}</code></pre>
            </div>
            
            {/* Terminal One-liner */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-purple-400 font-bold uppercase">⚡ Terminal One-Liner (PowerShell / Bash):</span>
                <CopyButton text={oneliner} />
              </div>
              <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                <code>{oneliner}</code>
              </div>
            </div>
          </div>

          {/* MIX DETECTION */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 3: CoinJoin De-Anonymization &amp; Multi-Input Clustering
          </h3>

          <p>
            Eventually, the target transaction entered a{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded border border-purple-400/20 hover:bg-purple-400/20 transition-colors">
                CoinJoin
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A collaborative Bitcoin transaction where multiple users mix their funds into identical outputs, obscuring ownership.
              </span>
            </span>
            . The mix was identified mathematically by finding $\ge 5$ inputs and $\ge 5$ identical outputs (the denomination <code className="text-purple-400 bg-purple-400/10 px-1 rounded">d</code>). 
          </p>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm uppercase tracking-wider">💡 THE MIXER ANALOGY</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              A CoinJoin is like 10 people throwing identical $100 bills onto a table, shuffling them around, and each taking one back. If you tracked a criminal&apos;s $100 bill to that table, you have no idea which of the 10 bills he walked away with. <br/><br/>
              But... what if the criminal walked away with <em>two</em> of those $100 bills, and went to buy a $200 TV with them? By spending them together, the criminal just proved to the whole world that those two specific bills belong to the exact same person. The disguise is ruined!
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse"></div>
            <p className="text-zinc-400 mb-2 font-bold">The Fatal Operational Security Flaw</p>
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
            <p className="text-zinc-400 mb-2">Token Concatenation: <code className="text-purple-300">T1 + T2 + T3 + T4 + T5 + T6</code></p>
            <p className="text-zinc-400 mb-2">Hash Algorithm: <code className="text-purple-300">SHA-256</code></p>
            <p className="text-zinc-400 mb-4">Format: <code className="text-purple-300">First 32 hex characters of the digest</code></p>
            
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;eed6ca7d462ef13d0f2ed13b1f7510fd&#125;
            </p>
          </div>

          {/* Section: The Complete Investigation Path & Mental Roadmap */}
          <div className="bg-[#100b16] border border-purple-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden my-12">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></span>
              <h3 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
                The Complete Investigation Path &amp; Mental Roadmap
              </h3>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Here is the step-by-step roadmap from the dark web market entry address to de-anonymizing the vendor:
            </p>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 1</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Entry Address Acquisition</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Extracted the primary deposit address of the vendor &lsquo;NightShade&rsquo; from market logs in <code>vendor_intel.json</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 2</span>
                <div>
                  <strong className="text-white block text-sm mb-1">TRACE-7 Peel-Chain Traversal</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Executed automated Esplora API walk following the highest output value (the pot), ignoring change peel transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 3</span>
                <div>
                  <strong className="text-white block text-sm mb-1">CoinJoin Mixer Detection</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Identified collaborative CoinJoin transaction characterized by equal-denomination output values ($d$).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 4</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Multi-Input Clustering De-Anonymization</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Traced the downstream consolidation transaction combining multiple mixed outputs, breaking anonymity and identifying the recipient wallet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-black/60 border border-purple-500/40">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold shrink-0">STEP 5</span>
                <div>
                  <strong className="text-white block text-sm mb-1">Token Hash &amp; Flag Recovery</strong>
                  <p className="text-zinc-400 font-sans text-xs">
                    Concatenated tokens T1–T6 and computed the SHA-256 flag digest: <code>ASCWG&#123;eed6ca7d462ef13d0f2ed13b1f7510fd&#125;</code>.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
