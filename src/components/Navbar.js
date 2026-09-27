"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const checkMode = () => {
      if (typeof document !== "undefined") {
        setIsLight(document.documentElement.getAttribute("data-theme") === "light");
      }
    };
    checkMode();
    const obs = new MutationObserver(checkMode);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  // Close menu on click outside or ESC key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
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



        {/* Right: Quick Links + Menu Button */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          
          {/* Quick Desktop Links */}
          <nav className="hidden sm:flex items-center gap-1 font-mono text-xs">
            <Link 
              href="/ctfs" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/ctfs" || pathname === "/picoctf" || pathname === "/ascwg" || pathname === "/kaspersky"
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              CTFs
            </Link>
            <Link 
              href="/labs" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/labs" 
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              Threat Labs
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/about" 
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              About
            </Link>
            <Link 
              href="/cv" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/cv" 
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              CV
            </Link>
          </nav>

          {/* Light / Dark CRT Mode Toggle */}
          <button
            onClick={() => {
              if (typeof document === "undefined") return;
              const isCurrentLight = document.documentElement.getAttribute("data-theme") === "light";
              if (isCurrentLight) {
                document.documentElement.removeAttribute("data-theme");
                try { localStorage.setItem("abdoskills_mode", "dark"); } catch {}
              } else {
                document.documentElement.setAttribute("data-theme", "light");
                try { localStorage.setItem("abdoskills_mode", "light"); } catch {}
              }
              setIsOpen(false);
            }}
            aria-label="Toggle CRT Mode"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-800 bg-[#0d0d12]/90 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all font-mono text-sm"
            title={isLight ? "Switch to CRT Night 📺" : "Switch to CRT Day ☀️"}
          >
            <span>{isLight ? "☀️" : "📺"}</span>
          </button>

          {/* Hamburger / Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md ${
              isOpen 
                ? "theme-bg-solid font-bold border-transparent" 
                : "bg-[#0d0d12]/90 border-zinc-800 text-zinc-300 hover:theme-border hover:text-white"
            }`}
          >
            <span className="relative w-4 h-4 flex flex-col justify-center gap-1">
              <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
            </span>
            <span className="font-bold">Menu</span>
          </button>

          {/* Floating Dropdown Drawer with CRT Terminal Motif */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-xl bg-[#111114]/95 border border-zinc-700/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden animate-fadeIn z-50 select-none">
              
              {/* CRT Terminal Header */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-black/80 border-b border-zinc-800 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                </div>
                <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">
                  SYS.MENU // TERMINAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff] animate-pulse" />
              </div>

              <div className="p-4 space-y-4">
                {/* Section 1: Writeups & Hubs */}
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2 font-bold">
                    [01] WRITEUPS &amp; CATEGORIES
                  </span>
                  <div className="flex flex-col gap-1">
                    <Link 
                      href="/ctfs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">CTF Competitions</strong>
                          <span className="text-[11px] text-zinc-500">Sunshine, Kaspersky, ASCWG, PicoCTF</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">40</span>
                    </Link>

                    <Link 
                      href="/labs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">DFIR &amp; Threat Labs</strong>
                          <span className="text-[11px] text-zinc-500">Malware &amp; Blue Team Investigations</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">LAB</span>
                    </Link>
                  </div>
                </div>

                {/* Section 2: Profile & Career */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2 font-bold">
                    [02] ABOUT &amp; RESUME
                  </span>
                  <div className="flex flex-col gap-1">
                    <Link 
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">About Me</strong>
                          <span className="text-[11px] text-zinc-500">Profile, Focus &amp; Tools</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white">→</span>
                    </Link>

                    <Link 
                      href="/cv"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">Curriculum Vitae</strong>
                          <span className="text-[11px] text-zinc-500">Experience, Certs &amp; PDF</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">PDF</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}
