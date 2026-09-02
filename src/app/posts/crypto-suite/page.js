import Image from "next/image";
import Link from "next/link";

export default function CryptoSuiteWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-green-500/30 selection:text-green-200">
      
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-block bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-xs text-green-400 uppercase tracking-[0.3em]">
              Cryptography • Lattices • ZKP
              <span className="animate-blink inline-block w-1.5 h-3 bg-green-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Cryptography CTF Suite: Advanced Math Attacks
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/crypto_suite.jpg" 
                alt="Crypto Suite Analysis"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            Cryptography can feel like absolute magic. But at the end of the day, it is just math. And when math is implemented poorly, it breaks. This writeup details three advanced cryptography challenges. For each, we provide a simple real-world analogy so you can understand the concept, followed by the heavy math required to execute the attack.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* CRYPTO 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            1. Complex Polynomial Root Recovery (Crypto 1)
          </h3>
          
          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine you are trying to guess a secret recipe where you only know the final taste of the soup. Normally, this is impossible because there are infinite ways to make soup. But what if you know the chef <em>only</em> measures ingredients in whole cups (1 cup, 2 cups... never 1.5 cups)? Because the possibilities are locked to whole numbers, we can use a "mathematical sorting machine" (Lattice Reduction) to test combinations until we find the exact recipe that creates that taste.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What vulnerability was exploited to recover the secret key?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Shortest Vector Problem (SVP) in Lattices</code></p>
          </div>

          <p>
            The objective was to recover a 24-byte key vector where each coefficient <code className="text-pink-400 bg-pink-400/10 px-1 rounded">A_k</code> was constrained strictly between 0 and 255 (a byte). We were given a high-precision complex root <code className="text-pink-400 bg-pink-400/10 px-1 rounded">x</code> of a polynomial equation. Because the unknown coefficients were bounded integers, this system of equations maps directly to solving the Shortest Vector Problem (SVP) in a lattice.
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">SageMath Console</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-pink-400">sage:</span> N = 1007845705359... <span className="text-zinc-500"># (RSA Modulus)</span><br/>
                <span className="text-pink-400">sage:</span> P.&lt;x&gt; = PolynomialRing(Zmod(N))<br/>
                <span className="text-pink-400">sage:</span> f = (padded_prefix * 2^256 + x)^3 - c<br/>
                <br/>
                <span className="text-zinc-500"># Coppersmith's Method for Small Roots</span><br/>
                <span className="text-pink-400">sage:</span> roots = f.small_roots(X=2^256, beta=1, epsilon=0.03)<br/>
                <span className="text-pink-400">sage:</span> <span className="text-blue-300">print</span>(roots[0])<br/>
                <br/>
                <span className="text-green-300">14705318086055172266874834220021644781404179346</span><br/>
                <span className="text-zinc-500"># Hex Conversion -> b'ASCWG&#123;sm4ll_r00ts_h4ck&#125;'</span>
              </code>
            </pre>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Kannan&apos;s Embedding & LLL ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>We centered the integer constraints by substituting <code className="text-pink-400">A_k = 128 + delta_k</code>.</li>
                <li>We scaled the real and imaginary components of the polynomial root by <code className="text-pink-400">10^35</code> to convert floating-point precision into large integers.</li>
                <li>We constructed a <code className="text-zinc-300 bg-zinc-800 px-1 rounded">25x27</code> integer basis matrix representing Kannan&apos;s embedding.</li>
                <li>Applying <strong>Cohen&apos;s Algorithm (Exact Integer LLL)</strong> reduced the lattice, identifying an extremely short vector that perfectly contained our original <code className="text-pink-400">delta_k</code> key bytes.</li>
              </ol>
            </div>
          </details>

          {/* CRYPTO 2 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            2. Flawed ZKP Identification Protocol (Crypto 2)
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              In a Zero-Knowledge Proof, you prove you know a secret without revealing it. Imagine a blindfolded guard asks you to pick a colored ball from a bag, then asks you what color it is. If you answer correctly, you pass. <br/><br/>
              But what if the guard is poorly trained and says: "Tell me a color, <em>then</em> I will pick a ball to match it!" You can just say "Red," and he is forced to pull a red ball. The order of the conversation is reversed, completely destroying the security.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How was the Zero-Knowledge Proof bypassed?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Interactive Message Inversion (HVZK Attack)</code></p>
          </div>

          <p>
            In a secure Sigma protocol, the prover must commit a cryptographic value <code className="text-pink-400 bg-pink-400/10 px-1 rounded">K</code> <em>before</em> the server responds with a random challenge <code className="text-pink-400 bg-pink-400/10 px-1 rounded">e</code>. The target server&apos;s implementation erroneously asked the prover for their final mathematical response <code className="text-pink-400 bg-pink-400/10 px-1 rounded">M</code> <strong>before</strong> generating the challenge, and only later asked for <code className="text-pink-400 bg-pink-400/10 px-1 rounded">K</code>.
          </p>
          <p>
            By setting <code className="text-pink-400 bg-pink-400/10 px-1 rounded">M</code> equal to the subgroup order <code className="text-pink-400 bg-pink-400/10 px-1 rounded">q</code>, we exploited Fermat&apos;s Little Theorem to mathematically zero out the secret. When the server finally revealed <code className="text-pink-400 bg-pink-400/10 px-1 rounded">e</code>, we computed <code className="text-pink-400 bg-pink-400/10 px-1 rounded">K = y^(-e) mod p</code> dynamically, forging a perfectly valid transcript without knowing the discrete logarithm flag.
          </p>


          {/* CRYPTO 3 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            3. Supersingular Isogeny Diffie-Hellman (Crypto 3)
          </h3>
          
          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Standard cryptography is like locking a door with a key. Quantum computers act like a sledgehammer that breaks the door down entirely. <strong>Isogenies</strong> are a "Post-Quantum" idea: instead of locking a door, you hide the treasure at the end of a massive, complex maze. Even a sledgehammer can&apos;t help you navigate a maze. However, in this challenge, the maze creator accidentally dropped breadcrumbs (auxiliary points) that let us trace the exact path to the treasure.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> What method was used to derive the shared j-invariant?</p>
            <p className="text-green-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-green-300">Vélu&apos;s Formulas for Isogeny Chains</code></p>
          </div>

          <p>
            The goal was to compute a degree-3 isogeny chain over 73 steps. Due to the way SIDH public keys are structured, Alice must share auxiliary torsion points so Bob can compute the shared secret. Unfortunately, this extra information is exactly what makes SIDH vulnerable to devastating path-recovery attacks.
          </p>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: 73-Step Point Evaluation ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Start from Alice&apos;s curve <code className="text-pink-400">E1</code> with kernel generator <code className="text-pink-400">R_0</code>.</li>
                <li>Evaluate 73 successive isogeny steps using <strong>Vélu&apos;s Formulas</strong>.</li>
                <li>At each step, calculate the new curve parameters and push forward the torsion basis points mathematically.</li>
                <li>Extract the final <code className="text-pink-400">j-invariant</code> (the isomorphism class identifier of the shared curve) and serialize it through SHA-256 to generate the key.</li>
              </ol>
            </div>
          </details>

        </div>
      </article>
    </div>
  );
}
