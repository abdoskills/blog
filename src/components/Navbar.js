"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="w-full relative z-50 text-zinc-200">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 flex justify-between items-center relative">
        
        {/* Left: Back / Brand */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
          >
            {pathname !== "/" && (
              <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            )}
            <span className="font-bold text-white tracking-wider font-[family-name:var(--font-silkscreen)] text-lg">
              Skills
            </span>
          </Link>
        </div>

        {/* Center: Subtle Title / Breadcrumb */}
        <div className="hidden md:flex items-center gap-2">
          {pathname === "/picoctf" && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              PicoCTF Master Hub
            </span>
          )}
          {pathname === "/ascwg" && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              ASCWG 2026 CTF
            </span>
          )}
          {pathname === "/kaspersky" && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Kaspersky CTF 2026
            </span>
          )}
          {pathname === "/labs" && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              DFIR &amp; Threat Labs
            </span>
          )}
          {pathname === "/about" && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              About Me
            </span>
          )}
          {pathname === "/cv" && (
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Curriculum Vitae
            </span>
          )}
        </div>

        {/* Right: Quick Links + Menu Button */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          
          {/* Quick Desktop Links */}
          <nav className="hidden sm:flex items-center gap-1 font-mono text-xs">
            <Link 
              href="/picoctf" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/picoctf" 
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              PicoCTF
            </Link>
            <Link 
              href="/ascwg" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/ascwg" 
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              ASCWG
            </Link>
            <Link 
              href="/kaspersky" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/kaspersky" 
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              Kaspersky
            </Link>
            <Link 
              href="/labs" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/labs" 
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              Labs
            </Link>
          </nav>

          {/* Hamburger / Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md ${
              isOpen 
                ? "bg-emerald-500 text-black font-bold border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                : "bg-[#0d0d12]/90 border-zinc-800 text-zinc-300 hover:border-emerald-500/50 hover:text-white"
            }`}
          >
            <span className="relative w-4 h-4 flex flex-col justify-center gap-1">
              <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
            </span>
            <span className="font-bold">Menu</span>
          </button>

          {/* Floating Dropdown Drawer */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 rounded-2xl bg-[#0d0d12]/95 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-4 space-y-4 animate-fadeIn z-50">
              
              {/* Section 1: Writeups & Hubs */}
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2">
                  📂 Writeups &amp; Hubs
                </span>
                <div className="flex flex-col gap-1">
                  <Link 
                    href="/picoctf"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-emerald-300 transition-all border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400 text-base">🧩</span>
                      <div>
                        <strong className="block text-white text-xs font-mono">PicoCTF 2019 Hub</strong>
                        <span className="text-[11px] text-zinc-500">13 Forensics Challenges</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">13</span>
                  </Link>

                  <Link 
                    href="/ascwg"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-emerald-300 transition-all border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400 text-base">⚔️</span>
                      <div>
                        <strong className="block text-white text-xs font-mono">ASCWG 2026 CTF</strong>
                        <span className="text-[11px] text-zinc-500">macOS, ESE, Bitcoin</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">4</span>
                  </Link>

                  <Link 
                    href="/kaspersky"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-emerald-300 transition-all border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400 text-base">🛡️</span>
                      <div>
                        <strong className="block text-white text-xs font-mono">Kaspersky CTF 2026</strong>
                        <span className="text-[11px] text-zinc-500">PoolParty, CoreStorage, TLS</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">3</span>
                  </Link>

                  <Link 
                    href="/labs"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-emerald-300 transition-all border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400 text-base">🧪</span>
                      <div>
                        <strong className="block text-white text-xs font-mono">DFIR &amp; Threat Labs</strong>
                        <span className="text-[11px] text-zinc-500">Malware &amp; Blue Team</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Lab</span>
                  </Link>
                </div>
              </div>

              {/* Section 2: Profile & Career */}
              <div className="pt-3 border-t border-zinc-800/80">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2">
                  👤 About &amp; Resume
                </span>
                <div className="flex flex-col gap-1">
                  <Link 
                    href="/about"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-emerald-300 transition-all border border-transparent hover:border-zinc-800"
                  >
                    <span className="text-emerald-400">⚡</span>
                    <div>
                      <strong className="block text-white text-xs font-mono">About Me</strong>
                      <span className="text-[11px] text-zinc-500">Background, Skills &amp; Focus</span>
                    </div>
                  </Link>

                  <Link 
                    href="/cv"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-emerald-300 transition-all border border-transparent hover:border-zinc-800"
                  >
                    <span className="text-emerald-400">📄</span>
                    <div>
                      <strong className="block text-white text-xs font-mono">CV / Resume</strong>
                      <span className="text-[11px] text-zinc-500">Skills, Experience &amp; PDF</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Quick Footer Links */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500 px-2">
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  🏠 Home
                </Link>
                <a 
                  href="https://github.com/abdoskills" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  GitHub ↗
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}
