import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="text-gray-200 p-4 transition-all duration-300 w-full z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center relative h-8">
          
          {/* Centered 'Skills' Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <span className="text-4xl font-extrabold text-white tracking-widest font-[family-name:var(--font-silkscreen)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                Skills
              </span>
            </Link>
          </div>
          
          {/* Search Icon placeholder */}
          <div className="absolute right-0 flex items-center justify-center w-8 h-8 opacity-70">
            <svg aria-hidden="true" focusable="false" className="w-5 h-5 fill-current" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16">
        
        {/* Search Bar section */}
        <div className="w-full max-w-3xl mx-auto px-4 mb-16 z-30 relative">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search forensic writeups, threat intel, CTFs..." 
                className="w-full p-4 pl-12 rounded-xl border border-gray-700 bg-zinc-900/60 focus:bg-zinc-900 focus:border-gray-400 focus:outline-none transition-all text-white placeholder-gray-500 backdrop-blur-md" 
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
              </div>
            </div>
            <button className="px-5 py-4 rounded-xl border transition-all flex items-center justify-center min-w-[60px] border-gray-700 bg-zinc-900/60 text-gray-400 hover:border-gray-500 hover:text-white backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4h20v4h-2v2h-2v2h-2v2h-2v6h-4v-6h-2v-2h-2v-2h-2v-2h-2z"></path></svg>
            </button>
          </div>
        </div>

        {/* 4 Featured Operations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6 w-full">
          
          {/* Card 1: Phobos Ransomware */}
          <Link href="/posts/phobos-ransomware-analysis" className="bg-[#111111]/70 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-zinc-600 group overflow-hidden">
            <div className="relative w-full h-44 overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/phobos_thumbnail.jpg" 
                alt="Phobos Ransomware Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-center mb-3">
                <div className="bg-zinc-800/60 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase">
                  MALWARE DFIR
                </div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white text-center leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  Phobos Ransomware Analysis
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-medium leading-relaxed text-center">
                Unpacking, Decrypting & Threat Intelligence
              </p>
            </div>
          </Link>

          {/* Card 2: ASCWG Hub */}
          <Link href="/ascwg" className="bg-[#111111]/70 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(236,72,153,0.25)] hover:border-pink-500/60 group overflow-hidden">
            <div className="relative w-full h-44 overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/ascwg_hub.jpg" 
                alt="ASCWG CTF Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-center mb-3">
                <div className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(236,72,153,0.2)]">
                  ASCWG 2026
                </div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white text-center leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  ASCWG CTF Hub
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-medium leading-relaxed text-center">
                Digital Forensics | Blockchain OSINT
              </p>
            </div>
          </Link>

          {/* Card 3: PicoCTF Hub */}
          <Link href="/picoctf" className="bg-[#111111]/70 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)] hover:border-purple-500/60 group overflow-hidden">
            <div className="relative w-full h-44 overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/picoctf_hub.jpg" 
                alt="PicoCTF Hub Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-center mb-3">
                <div className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                  PICOCTF FORENSICS
                </div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white text-center leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  PicoCTF Hub
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-medium leading-relaxed text-center">
                File Header Repair | LSB Stego | Network
              </p>
            </div>
          </Link>

          {/* Card 4: HackTheBox Hub */}
          <Link href="/hackthebox" className="bg-[#111111]/70 backdrop-blur-md rounded-2xl flex flex-col shadow-lg border-2 border-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(16,185,129,0.25)] hover:border-emerald-500/60 group overflow-hidden">
            <div className="relative w-full h-44 overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#111111] z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image 
                src="/images/hackthebox_hub.jpg" 
                alt="HackTheBox Hub Cover" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] contrast-[1.2]" 
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow relative z-20 bg-transparent">
              <div className="flex justify-center mb-3">
                <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-mono tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  SHERLOCKS & LABS
                </div>
              </div>
              <div className="mb-3 flex-grow">
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-500 text-gray-200 group-hover:text-white text-center leading-tight font-[family-name:var(--font-share-tech)] uppercase">
                  HackTheBox Hub
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-medium leading-relaxed text-center">
                Incident Response | DFIR | Malware
              </p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
