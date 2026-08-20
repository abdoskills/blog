import Image from "next/image";
import Link from "next/link";

export default function CascadedFallacyWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-green-500/30 selection:text-green-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/cgwars" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CGWars Hub
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-green-400 uppercase tracking-[0.3em]">
              Smart Contract Forensics • DeFi
              <span className="animate-blink inline-block w-1.5 h-3 bg-green-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Cascaded Fallacy: DeFi Bank Drain Analysis
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/cascaded_fallacy.jpg" 
                alt="Cascaded Fallacy DeFi Hack"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            This lab focuses on tracing a multi-stage decentralized finance (DeFi) hack on the Ethereum Sepolia testnet. To understand this exploit, you don&apos;t need to be a blockchain wizard. We will break down exactly how the attacker tricked the bank, starting with a simple analogy before diving into the hard technical evidence.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: GenesisVault & Reentrancy
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine you go to an ATM to withdraw $100. The ATM hands you the cash, but right before it updates your account balance to zero, you quickly press "Withdraw" again. Because the machine hasn&apos;t updated its records yet, it hands you another $100. This is a <strong>Reentrancy Attack</strong>—tricking a computer program into giving you money multiple times before it realizes you&apos;re broke.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How was the GenesisVault initially drained?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Reentrancy Attack</code></p>
          </div>

          <p>
            The attacker exploited a classic state-update flaw. The smart contract sent ETH to the attacker using a low-level <code className="text-pink-400 bg-pink-400/10 px-1 rounded">call.value()</code> <em>before</em> deducting the user&apos;s internal balance. This violates the strict "Checks-Effects-Interactions" pattern.
          </p>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Blockscout Trace & Opcodes ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Query the Sepolia Blockscout API for the attacker&apos;s main transaction.</li>
                <li>Analyze the <strong>Internal Transactions</strong> trace.</li>
                <li>You will notice a highly nested execution trace where the <code className="text-zinc-300 bg-zinc-800 px-1 rounded">CALL</code> opcode transferring ETH is fired multiple times sequentially within a single transaction frame.</li>
                <li>The <code className="text-pink-400">Withdrawn</code> event is only emitted at the very end of the execution tree, confirming the state update was deferred until after the malicious fallback function finished executing.</li>
              </ol>
            </div>
          </details>

          {/* STAGE 2 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 2: PatchedVault & Broken Access Control
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Think of an exclusive club where you need a VIP ID card to enter. The bouncer asks, "Do you have an ID card?" You show them a picture of your friend&apos;s ID card. The bouncer says, "Yep, that&apos;s a valid ID card," and lets you in without checking if the face on the card matches <em>your</em> face. 
            </p>
          </div>

          <p>
            The <code className="text-pink-400 bg-pink-400/10 px-1 rounded">liquidate()</code> function was protected by an Access Control mechanism that required a specific GhostShare NFT. However, the contract failed to properly verify if the person calling the function (<code className="text-pink-400 bg-pink-400/10 px-1 rounded">msg.sender</code>) actually owned the NFT token ID passed in the parameters. The attacker simply passed the token ID of a legitimate admin, spoofing their authorization.
          </p>


          {/* STAGE 3 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 3: SignedVault & Signature Replay
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine writing a physical check for $100 and signing it. The bank cashes it. But what if the bank teller kept a photocopy of your signature and just pasted it onto a blank check the next day? To prevent this, real checks have unique Check Numbers (Nonces). If the bank sees the same Check Number twice, they reject it. This vault forgot to use Check Numbers.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> Why was the attacker able to reuse the admin&apos;s withdrawal signature?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Missing Nonce in EIP-712</code></p>
          </div>

          <p>
            Cryptographic signatures in Web3 must be unique to prevent replay attacks. The developers implemented{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                EIP-712
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                A standard for hashing and signing typed structured data in Ethereum.
              </span>
            </span>
            {' '}but omitted a <code className="text-pink-400 bg-pink-400/10 px-1 rounded">nonce</code> mapping in the signed struct. The attacker extracted the raw <code className="text-pink-400 bg-pink-400/10 px-1 rounded">v, r, s</code> ECDSA signature components from the blockchain history and submitted them again to siphon funds.
          </p>


          {/* STAGE 4 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 4: OracleVault & Price Manipulation
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine a bank uses a single local pawn shop to determine the price of gold. A thief walks into the pawn shop, dumps 10 tons of fake gold on the counter, and causes the local price of gold to crash to $1. The thief then runs across the street to the bank and says, "Look, gold is worthless now! Liquidate all your customers&apos; gold accounts and sell them to me for $1!" 
            </p>
          </div>

          <p>
            The final vault relied on a shallow <code className="text-pink-400 bg-pink-400/10 px-1 rounded">SpotPool</code> Automated Market Maker (AMM) as a price oracle. The attacker used a massive Flash Loan to temporarily dump tokens into the AMM, drastically crashing the spot price inside a single transaction block. 
          </p>
          <p>
            Because the vault did not use a{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                TWAP
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                Time-Weighted Average Price. Taking an average price over time prevents instant flash-crash manipulation.
              </span>
            </span>
            , it instantly calculated that all user collateral was worthless and permitted the attacker to trigger liquidations.
          </p>

          <hr className="border-zinc-800 my-12" />

          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Constructing the Final Flag
          </h3>
          
          <p className="mb-6">
            To solve the challenge, we had to piece together the entire kill-chain and identify the final destination of the stolen funds. The challenge required us to concatenate the specific vulnerability categories from each of the four stages, followed by the final laundering address.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">Stage 1: <code className="text-green-300">reentrancy</code></p>
            <p className="text-zinc-400 mb-2">Stage 2: <code className="text-green-300">accesscontrol</code></p>
            <p className="text-zinc-400 mb-2">Stage 3: <code className="text-green-300">signaturereplay</code></p>
            <p className="text-zinc-400 mb-2">Stage 4: <code className="text-green-300">oraclemanipulation</code></p>
            <br/>
            <p className="text-zinc-400 mb-2">Attacker Wallet (Funder): <code className="text-pink-300">0x0461c310002234a6a82B24136BB8323D08bc81c1</code></p>
            <p className="text-zinc-400 mb-2">Main Operation Wallet: <code className="text-pink-300">0x2bbd3717E662a46CD1A15bab9767C386b72bed68</code></p>
            <p className="text-zinc-400 mb-2">Exploit Contract (Weapon): <code className="text-pink-300">0x2B23F8d55Ff39A6C273B2Bd869D666FB4f160df7</code></p>
            <p className="text-zinc-400 mb-2">Final Destination (Launder): <code className="text-pink-300">0x071a8E8c5c0484B7A2fFA06530518DC9209e627f</code></p>
            <br/>
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;reentrancy_accesscontrol_signaturereplay_oraclemanipulation_0x071a8E8c5c0484B7A2fFA06530518DC9209e627f&#125;
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}
